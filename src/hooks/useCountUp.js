import { useEffect, useRef, useState } from 'react';

/** Counts from 0 to `end` when the element scrolls into view. Returns [ref, value]. */
export function useCountUp(end, duration = 1600) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVal(end);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(end * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return [ref, val];
}
