import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (options.once !== false) observer.unobserve(node)
      } else if (options.once === false) {
        setInView(false)
      }
    }, { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px 0px -40px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [options.once, options.rootMargin, options.threshold])

  return [ref, inView]
}

export function useCountUp(end, active, duration = 1600) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return undefined
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.round(end * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, duration, end])

  return value
}