export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <span className="brand-badge">S</span>
              <span className="brand-name">
                Spring of Success
                <small>Academy</small>
              </span>
            </a>
            <p>A modern nursery, primary and secondary school dedicated to academic excellence, character and innovation.</p>
          </div>
          <div>
            <h4>School</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#academics">Academics</a></li>
              <li><a href="#life">Student Life</a></li>
              <li><a href="#news">News & Events</a></li>
            </ul>
          </div>
          <div>
            <h4>Admissions</h4>
            <ul>
              <li><a href="#admissions">How to Apply</a></li>
              <li><a href="#admissions">Requirements</a></li>
              <li><a href="#admissions">Scholarships</a></li>
              <li><a href="#contact">Visit the Campus</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+254700000000">+254 700 000 000</a></li>
              <li><a href="mailto:info@sosacademy.ac.ke">info@sosacademy.ac.ke</a></li>
              <li><a href="#contact">Campus Directions</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Spring of Success Academy. All rights reserved.</span>
          <span>Excellence · Character · Innovation</span>
        </div>
      </div>
    </footer>
  );
}
