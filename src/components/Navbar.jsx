import { useEffect, useState } from 'react';
import { Magnetic } from './ui.jsx';

const LINKS = [
  ['About', '#about'],
  ['Academics', '#academics'],
  ['Campus', '#campus'],
  ['Student Life', '#life'],
  ['Admissions', '#admissions'],
  ['News', '#news'],
  ['Contact', '#contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    LINKS.forEach(([, id]) => {
      const el = document.querySelector(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="brand" href="#top">
            <span className="brand-badge">S</span>
            <span className="brand-name">
              Spring of Success
              <small>Academy</small>
            </span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href} className={active === href ? 'active' : ''}>{label}</a>
            ))}
          </nav>
          <Magnetic as="a" href="#admissions" className="btn btn-gold nav-cta">Apply Now</Magnetic>
          <button className="nav-burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </header>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="#admissions" className="btn btn-gold" onClick={() => setOpen(false)}>Apply Now</a>
        </nav>
      )}
    </>
  );
}
