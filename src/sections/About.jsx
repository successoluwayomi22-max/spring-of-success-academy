import { Reveal, Stat, Tilt } from '../components/ui.jsx';

const VALUES = [
  ['🎓', 'Excellence', 'High standards in every classroom, every day.'],
  ['🌱', 'Character', 'Integrity, empathy and responsibility are taught, not assumed.'],
  ['💡', 'Innovation', 'STEM, robotics and digital learning from the earliest years.'],
  ['🌍', 'Community', 'Service projects that connect students to the world around them.'],
];

export default function About() {
  return (
    <>
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <Reveal dir="left" className="about-visual">
              <div className="about-photo">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=70"
                  alt="Students working together on the school campus"
                  loading="lazy"
                />
              </div>
              <div className="about-float">
                <div>
                  <b>25+</b>
                  <span>Years of excellence</span>
                </div>
              </div>
            </Reveal>
            <Reveal dir="right">
              <p className="eyebrow">About the Academy</p>
              <h2>A school built on excellence, character & innovation</h2>
              <p className="lead">
                Spring of Success Academy is a nursery, primary and secondary school where
                every learner is known by name and challenged to grow — academically,
                socially and morally.
              </p>
              <div className="value-list">
                {VALUES.map(([ico, title, desc]) => (
                  <div className="value" key={title}>
                    <span className="value-ico">{ico}</span>
                    <div>
                      <b>{title}</b>
                      <span>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <blockquote className="principal-quote">
                “We don’t just prepare students for exams — we prepare them for life.”
                <footer>— Mrs. Grace Wanjiru, Principal</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="stats-band section on-dark">
        <div className="container">
          <div className="stats-grid">
            <Stat end={1200} suffix="+" label="Students enrolled" />
            <Stat end={60} suffix="+" label="Expert teachers" />
            <Stat end={98} suffix="%" label="University placement" />
            <Stat end={45} suffix="+" label="Clubs & societies" />
            <Stat end={25} suffix="+" label="Years of service" />
          </div>
        </div>
      </section>
    </>
  );
}
