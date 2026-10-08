import { useEffect, useState } from 'react';
import { Reveal } from '../components/ui.jsx';

const TESTIMONIALS = [
  {
    quote: 'The teachers here see potential in every child. My daughter went from shy to leading the debate team in one year.',
    name: 'Mary Achieng',
    role: 'Parent, Grade 5',
  },
  {
    quote: 'The robotics lab and science fairs made me realise engineering was my future. I start at university next year.',
    name: 'Brian Otieno',
    role: 'Alumnus, Class of 2024',
  },
  {
    quote: 'Small classes, real care and high standards. Choosing this academy was the best decision for our son.',
    name: 'David & Sarah Kimani',
    role: 'Parents, Grade 9',
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), 6500);
    return () => clearInterval(t);
  }, [n]);

  return (
    <section className="testimonials section on-dark">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow">Testimonials</p>
          <h2>What our community says</h2>
        </Reveal>
        <div className="testi-stage">
          {TESTIMONIALS.map((t, idx) => (
            <figure
              key={t.name}
              className="testi-slide"
              style={{
                opacity: i === idx ? 1 : 0,
                transform: i === idx
                  ? 'none'
                  : `rotateY(${idx > i ? -22 : 22}deg) translateX(${idx > i ? -40 : 40}px)`,
                pointerEvents: i === idx ? 'auto' : 'none',
                zIndex: i === idx ? 2 : 1,
              }}
              aria-hidden={i !== idx}
            >
              <div className="quote">“</div>
              <blockquote>{t.quote}</blockquote>
              <figcaption className="testi-who">
                <span className="testi-ava">{t.name[0]}</span>
                <div>
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="testi-nav">
          <button className="testi-btn" aria-label="Previous testimonial" onClick={() => setI((i - 1 + n) % n)}>←</button>
          <div className="testi-dots">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                className={`testi-dot ${i === idx ? 'active' : ''}`}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
              />
            ))}
          </div>
          <button className="testi-btn" aria-label="Next testimonial" onClick={() => setI((i + 1) % n)}>→</button>
        </div>
      </div>
    </section>
  );
}
