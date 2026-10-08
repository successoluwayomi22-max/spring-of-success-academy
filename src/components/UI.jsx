import { useCountUp } from '../hooks/useCountUp.js';
import { useReveal } from '../hooks/useReveal.js';

export function Reveal({ as: Tag = 'div', className = '', delay = 0, dir = '', children, ...rest }) {
  const ref = useReveal();
  const cls = ['reveal', dir === 'left' && 'reveal-l', dir === 'right' && 'reveal-r', className].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={cls} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

export function Stat({ end, suffix = '', label }) {
  const [ref, val] = useCountUp(end);
  return (
    <div className="stat" ref={ref}>
      <b>{val}</b>
      <span>{label}</span>
    </div>
  );
}

/** Magnetic button: gently follows cursor. Disabled on touch / reduced motion. */
export function Magnetic({ as: Tag = 'a', className = '', children, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <Tag ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
    </Tag>
  );
}

import { useRef } from 'react';

/** 3D tilt wrapper for cards */
export function Tilt({ className = '', children, max = 10, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(1.02)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div className="tilt-wrap">
      <div ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
        {children}
      </div>
    </div>
  );
}
