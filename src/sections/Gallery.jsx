import { useState } from 'react';
import { Reveal } from '../components/ui.jsx';

const PHOTOS = [
  ['Campus quadrangle', 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=900&q=70'],
  ['Graduation day', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=70'],
  ['Chemistry lab', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=70'],
  ['Sports field', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=70'],
  ['Music recital', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=600&q=70'],
  ['Library study', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=70'],
  ['Robotics workshop', 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=600&q=70'],
  ['Swimming team', 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=900&q=70'],
];

export default function Gallery() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Gallery</p>
          <h2>Moments from our campus</h2>
        </Reveal>
        <div className="gallery-grid">
          {PHOTOS.map(([cap, src], i) => (
            <Reveal
              key={src}
              as="button"
              delay={i * 50}
              className="gallery-item"
              onClick={() => setOpen(src)}
              aria-label={`View photo: ${cap}`}
            >
              <img src={src} alt={cap} loading="lazy" />
              <span className="cap">{cap}</span>
            </Reveal>
          ))}
        </div>
      </div>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button className="lightbox-close" aria-label="Close" onClick={() => setOpen(null)}>✕</button>
          <img src={open} alt="Gallery photo enlarged" />
        </div>
      )}
    </section>
  );
}
