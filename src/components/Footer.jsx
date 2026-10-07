export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <p className="footer__brand">Spring of Success Academy</p>
          <p>Rooted in character. Rising through knowledge.</p>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          <a href="#about">About</a>
          <a href="#academics">Academics</a>
          <a href="#admissions">Admissions</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} Spring of Success Academy. All rights reserved.</p>
      </div>
    </footer>
  )
}
