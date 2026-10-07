import { useRef } from 'react'
import Icon from './Icon.jsx'
import { useCountUp, useInView } from '../hooks/useInView.js'

export function Logo({ light = false, compact = false }) {
  return (
    <a href="#home" className={`brand ${light ? 'brand--light' : ''}`} aria-label="Spring of Success Academy home">
      <svg className="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M7 16.5 24 8l17 8.5L24 25 7 16.5Z" fill="currentColor" opacity=".18" />
        <path d="M12 20v13c7-3 12 2 12 2V24.5L12 20Zm24 0v13c-7-3-12 2-12 2V24.5L36 20Z" fill="currentColor" />
        <path d="M24 24c0-7.8 3.3-12.6 10-15-1 7-4.3 11.5-10 15Z" fill="#d5ad5c" />
        <path d="M24 23c-.6-5.4-3.4-8.8-8.5-10.3.7 5 3.5 8.2 8.5 10.3Z" fill="#89a68e" />
      </svg>
      {!compact && <span className="brand__text"><strong>Spring of Success</strong><small>Academy</small></span>}
    </a>
  )
}

export function Button({ href, children, variant = 'primary', icon = 'arrow', className = '', onClick, type, ...props }) {
  const ref = useRef(null)
  const handleMove = (event) => {
    if (!ref.current || window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${(event.clientX - rect.left - rect.width / 2) * 0.12}px`)
    ref.current.style.setProperty('--my', `${(event.clientY - rect.top - rect.height / 2) * 0.12}px`)
  }
  const reset = () => {
    ref.current?.style.setProperty('--mx', '0px')
    ref.current?.style.setProperty('--my', '0px')
  }
  const shared = {
    ref,
    className: `button button--${variant} ${className}`,
    onPointerMove: handleMove,
    onPointerLeave: reset,
    onClick,
    ...props,
  }
  const content = <><span>{children}</span>{icon && <Icon name={icon} size={17} />}</>
  return href ? <a href={href} {...shared}>{content}</a> : <button type={type || 'button'} {...shared}>{content}</button>
}

export function Eyebrow({ children, light = false }) {
  return <span className={`eyebrow ${light ? 'eyebrow--light' : ''}`}><i />{children}</span>
}

export function SectionHeading({ eyebrow, title, description, align = 'left', light = false, action }) {
  return (
    <div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}>
      <div>
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="section-heading__action">{action}</div>}
    </div>
  )
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, inView] = useInView()
  return <Tag ref={ref} className={`reveal ${inView ? 'is-visible' : ''} ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</Tag>
}

export function TiltCard({ children, className = '', as: Tag = 'article' }) {
  const ref = useRef(null)
  const move = (event) => {
    if (!ref.current || window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    ref.current.style.setProperty('--rx', `${y * -5}deg`)
    ref.current.style.setProperty('--ry', `${x * 7}deg`)
    ref.current.style.setProperty('--spot-x', `${(x + 0.5) * 100}%`)
    ref.current.style.setProperty('--spot-y', `${(y + 0.5) * 100}%`)
  }
  const reset = () => {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }
  return <Tag ref={ref} className={`tilt-card ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</Tag>
}

export function Counter({ value, suffix, label }) {
  const [ref, visible] = useInView({ threshold: 0.5 })
  const count = useCountUp(value, visible)
  return (
    <div className="stat" ref={ref}>
      <strong>{count.toLocaleString()}<em>{suffix}</em></strong>
      <span>{label}</span>
    </div>
  )
}

export function Image({ src, alt, className = '', eager = false }) {
  return <img src={src} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} decoding="async" />
}

export function ArrowLink({ href, children, light = false, onClick }) {
  return <a href={href} className={`arrow-link ${light ? 'arrow-link--light' : ''}`} onClick={onClick}><span>{children}</span><Icon name="arrow" size={18} /></a>
}