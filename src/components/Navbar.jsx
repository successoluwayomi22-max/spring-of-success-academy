import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { Button, Logo } from './UI.jsx'
import { navLinks } from '../data/siteData.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
      const sections = navLinks.map(([, id]) => document.getElementById(id)).filter(Boolean)
      const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= 150)
      if (current) setActive(current.id)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', close)
    document.body.classList.toggle('menu-open', open)
    return () => {
      document.removeEventListener('keydown', close)
      document.body.classList.remove('menu-open')
    }
  }, [open])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar__inner">
        <Logo />
        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          <div className="nav-links__mobile-head"><Logo /><button onClick={() => setOpen(false)} aria-label="Close menu"><Icon name="close" /></button></div>
          <div className="nav-links__items">
            {navLinks.map(([label, id]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </div>
          <div className="nav-links__mobile-cta"><Button href="#admissions" onClick={() => setOpen(false)}>Apply for admission</Button></div>
        </nav>
        <div className="navbar__actions">
          <Button href="#admissions" className="navbar__apply">Apply Now</Button>
          <button className="menu-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-label="Open menu"><Icon name="menu" /></button>
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true"><i /></div>
    </header>
  )
}