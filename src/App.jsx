import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Academics from './components/Academics.jsx'
import Departments from './components/Departments.jsx'
import StudentLife from './components/StudentLife.jsx'
import Admissions from './components/Admissions.jsx'
import CampusExplorer from './components/CampusExplorer.jsx'
import News from './components/News.jsx'
import Gallery from './components/Gallery.jsx'
import VirtualTour from './components/VirtualTour.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const cursorRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setLoading(false)
      return undefined
    }
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse || !cursorRef.current) return undefined
    const handle = (event) => {
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }
    window.addEventListener('pointermove', handle, { passive: true })
    return () => window.removeEventListener('pointermove', handle)
  }, [])

  const scrollToCampus = () => {
    document.getElementById('campus')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div ref={cursorRef} className="cursor-spotlight" aria-hidden="true" />
      <div className={`loader ${loading ? 'is-visible' : ''}`} aria-hidden={!loading}>
        <div className="loader__mark">
          <span>Spring of Success</span>
          <small>Preparing your visit</small>
        </div>
      </div>
      <Navbar />
      <main id="main-content">
        <Hero onExplore={scrollToCampus} />
        <About />
        <Academics />
        <Departments />
        <CampusExplorer />
        <StudentLife />
        <Admissions />
        <News />
        <Gallery />
        <VirtualTour />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}