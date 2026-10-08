import { useState } from 'react';
import { Reveal } from '../components/ui.jsx';

export default function Contact() {
  const [note, setNote] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    if (!name || !data.get('email')) {
      setNote({ ok: false, msg: 'Please fill in your name and email.' });
      return;
    }
    setNote({ ok: true, msg: `Thank you, ${name}! Our admissions office will contact you within one working day.` });
    e.target.reset();
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <Reveal dir="left">
            <p className="eyebrow">Contact Us</p>
            <h2>Come and see us</h2>
            <p className="lead">Book a campus tour or send us a message — we’d love to meet your family.</p>
            <div className="contact-list">
              <div className="contact-item">
                <span className="ico">📍</span>
                <div>
                  <b>Visit</b>
                  <span>Success Drive, Green Valley Estate, Nairobi</span>
                </div>
              </div>
              <div className="contact-item">
                <span className="ico">📞</span>
                <div>
                  <b>Call</b>
                  <a href="tel:+254700000000">+254 700 000 000</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="ico">✉️</span>
                <div>
                  <b>Email</b>
                  <a href="mailto:info@sosacademy.ac.ke">info@sosacademy.ac.ke</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="ico">🕒</span>
                <div>
                  <b>Office hours</b>
                  <span>Mon – Fri: 8:00am – 4:30pm · Sat: 9:00am – 12:00pm</span>
                </div>
              </div>
            </div>
            <div className="socials">
              <a href="#top" aria-label="Facebook">FB</a>
              <a href="#top" aria-label="Instagram">IG</a>
              <a href="#top" aria-label="X">X</a>
              <a href="#top" aria-label="YouTube">YT</a>
            </div>
          </Reveal>
          <Reveal dir="right">
            <form className="contact-form card" onSubmit={submit} noValidate>
              <h3>Send us a message</h3>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="c-name">Full name</label>
                  <input id="c-name" name="name" type="text" placeholder="Jane Doe" required />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" placeholder="jane@example.com" required />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">Phone</label>
                  <input id="c-phone" name="phone" type="tel" placeholder="+254 700 000 000" />
                </div>
                <div className="field">
                  <label htmlFor="c-grade">Grade of interest</label>
                  <select id="c-grade" name="grade" defaultValue="Nursery">
                    {['Nursery', 'Primary (1–6)', 'Secondary (7–12)'].map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" name="message" rows="4" placeholder="Tell us about your child…" />
                </div>
              </div>
              <button type="submit" className="btn btn-gold" style={{ marginTop: '1.2rem' }}>Send Message</button>
              <p className={`form-note ${note ? (note.ok ? 'ok' : 'err') : ''}`} role="status">{note?.msg}</p>
            </form>
          </Reveal>
        </div>
        <Reveal className="map-frame">
          <iframe
            title="School location map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=36.75%2C-1.35%2C36.87%2C-1.24&layer=mapnik"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
