import { useState } from 'react';
import { Reveal } from '../components/ui.jsx';

const ITEMS = [
  {
    tag: 'Achievement',
    date: 'Mar 12, 2025',
    title: 'Regional Science Fair Champions — Again!',
    desc: 'Our Form 3 team took first place with a solar-powered water purification prototype.',
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=70',
  },
  {
    tag: 'Campus',
    date: 'Feb 28, 2025',
    title: 'New Innovation & Robotics Lab Opens',
    desc: 'A purpose-built lab with 3D printers, laser cutters and 30 workstations is now open to all grades.',
    img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=900&q=70',
  },
  {
    tag: 'Sports',
    date: 'Feb 10, 2025',
    title: 'Athletics Team Sweeps County Meet',
    desc: 'Eight gold medals across track and field events — our best season yet.',
    img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=70',
  },
];

const FILTERS = ['All', 'Achievement', 'Campus', 'Sports'];

export default function News() {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? ITEMS : ITEMS.filter((n) => n.tag === filter);

  return (
    <section className="section" id="news">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">News & Events</p>
          <h2>What’s happening at the academy</h2>
        </Reveal>
        <div className="filters" role="tablist" aria-label="Filter news">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="news-grid">
          {shown.map((n, i) => (
            <Reveal key={n.title} delay={i * 90} as="article" className="news-card card">
              <div className="thumb">
                <img src={n.img} alt="" loading="lazy" />
              </div>
              <div className="body">
                <span className="news-tag">{n.tag}</span>
                <time className="news-date">{n.date}</time>
                <h3>{n.title}</h3>
                <p>{n.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
