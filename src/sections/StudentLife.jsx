import { Reveal } from '../components/ui.jsx';

const CARDS = [
  {
    cap: 'Science Fair',
    sub: 'Innovation Day 2025',
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=70',
  },
  {
    cap: 'Inter-house Athletics',
    sub: 'Annual sports season',
    img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=70',
  },
  {
    cap: 'Art & Music Gala',
    sub: 'Creative arts showcase',
    img: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=900&q=70',
  },
  {
    cap: 'Library Reading Week',
    sub: 'Celebrating literacy',
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=70',
  },
  {
    cap: 'Robotics Club',
    sub: 'Building tomorrow today',
    img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=900&q=70',
  },
  {
    cap: 'Community Service Day',
    sub: 'Students giving back',
    img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=70',
  },
];

export default function StudentLife() {
  return (
    <section className="section" id="life">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Student Life</p>
          <h2>Life beyond the classroom</h2>
          <p className="lead">
            45+ clubs, competitive sports, arts and service — every student finds
            their place to shine.
          </p>
        </Reveal>
        <div className="life-grid">
          {CARDS.map((c, i) => (
            <Reveal key={c.cap} delay={i * 70} as="figure" className="life-card">
              <img src={c.img} alt={c.cap} loading="lazy" />
              <figcaption>
                {c.cap}
                <small>{c.sub}</small>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
