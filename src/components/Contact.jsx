import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }
  return (
    <section className="section contact" id="contact">
      <div className="section__head">
        <p className="section__eyebrow">Contact</p>
        <h2 className="section__title">We would love to hear from you</h2>
      </div>
      <div className="contact__grid">
        <div className="contact__info">
          <p><strong>Spring of Success Academy</strong></p>
          <p>123 Learning Lane, Greenwood City</p>
          <p>Phone: +1 (555) 010-1234</p>
          <p>Email: hello@springofsuccess.edu</p>
        </div>
        {submitted ? (
          <div className="contact__success">
            <p>Thank you! We will be in touch soon.</p>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input type="text" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" required />
            </label>
            <label>
              <span>Message</span>
              <textarea rows="4" required />
            </label>
            <button type="submit" className="btn btn--primary">Send Message</button>
          </form>
        )}
      </div>
    </section>
  )
}
