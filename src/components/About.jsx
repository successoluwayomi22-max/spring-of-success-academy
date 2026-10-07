export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section__head">
        <p className="section__eyebrow">About Us</p>
        <h2 className="section__title">A school built on wonder, warmth and high expectations</h2>
      </div>
      <div className="about__grid">
        <div className="about__card">
          <span className="about__icon" aria-hidden="true">🌱</span>
          <h3>Our Mission</h3>
          <p>To nurture curious, compassionate and confident learners who lead with integrity and embrace challenge.</p>
        </div>
        <div className="about__card">
          <span className="about__icon" aria-hidden="true">🌟</span>
          <h3>Our Vision</h3>
          <p>To be a beacon of future-facing education — blending academic rigour with creativity, character and care.</p>
        </div>
        <div className="about__card">
          <span className="about__icon" aria-hidden="true">💛</span>
          <h3>Our Values</h3>
          <p>Respect. Resilience. Responsibility. Wonder. These values guide everything we do, every day.</p>
        </div>
      </div>
    </section>
  )
}
