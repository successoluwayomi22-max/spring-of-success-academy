export default function Hero({ onExplore }) {
  return (
    <section className="hero">
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">Welcome to</p>
        <h1 className="hero__title">Spring of Success Academy</h1>
        <p className="hero__subtitle">Rooted in character. Rising through knowledge. A place where every child discovers their unique brilliance.</p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={onExplore}>Explore Our Campus</button>
          <a className="btn btn--ghost" href="#admissions">Begin Admissions</a>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll to discover</span>
      </div>
    </section>
  )
}
