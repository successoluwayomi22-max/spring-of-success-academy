import { useState } from 'react'
import Icon from './Icon.jsx'
import { Button, Reveal, SectionHeading } from './UI.jsx'

const steps = [
  { title: 'Discover the school', copy: 'Book a campus tour, attend an open morning or explore our virtual experience.' },
  { title: 'Submit your application', copy: 'Complete the online form with records, a short learner profile and family details.' },
  { title: 'Family conversation', copy: 'A warm, two-way meeting so we can understand your child and answer your questions.' },
  { title: 'Welcome and enrol', copy: 'Receive your offer, confirm your place and join our new-family induction programme.' },
]

const faqs = [
  { q: 'When does the application cycle open?', a: 'Applications for the next academic year open each September and are reviewed on a rolling basis.' },
  { q: 'Do you offer tours for prospective families?', a: 'Yes. We host weekly campus visits and an open morning each term — book through the admissions office.' },
  { q: 'Is financial support available?', a: 'A limited number of merit and need-based awards are offered each year. Details are shared during the application process.' },
  { q: 'What is the typical class size?', a: 'Classes are kept small — usually 18 to 22 learners — so every child receives personal attention.' },
]

export default function Admissions() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <section id="admissions" className="admissions" aria-label="Admissions">
      <div className="admissions__intro">
        <Reveal>
          <SectionHeading eyebrow="Admissions" title="Begin your journey with us" description="A clear, supportive process designed to help your family find the right fit." />
        </Reveal>
        <Reveal delay={120}>
          <div className="admissions__cta">
            <strong>Applications open for 2026–2027</strong>
            <p>Secure your place with our straightforward online application. Our admissions team supports you at every step.</p>
            <Button href="#contact" icon="arrow">Apply Now</Button>
            <small>Need a conversation first? <a href="#contact">Talk to our team</a></small>
          </div>
        </Reveal>
      </div>
      <div className="admissions__process">
        <SectionHeading eyebrow="How to join" title="Four steps to enrolment" />
        <ol className="process">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 90}>
              <li className="process__step">
                <span className="process__number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{step.title}</strong>
                <p>{step.copy}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
      <div className="admissions__grid">
        <Reveal>
          <div className="admissions__card">
            <Icon name="calendar" />
            <strong>Key dates</strong>
            <ul>
              <li><span>Applications open</span><em>1 September 2026</em></li>
              <li><span>Open Morning</span><em>14 October 2026</em></li>
              <li><span>Offer day</span><em>12 March 2027</em></li>
              <li><span>Induction week</span><em>18 August 2027</em></li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="admissions__card">
            <Icon name="shield" />
            <strong>What we look for</strong>
            <ul>
              <li><Icon name="check" size={16} /> Curiosity and a willingness to learn</li>
              <li><Icon name="check" size={16} /> Kindness and respect for others</li>
              <li><Icon name="check" size={16} /> A supportive family partnership</li>
              <li><Icon name="check" size={16} /> Readiness for the applied year group</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="admissions__card admissions__card--wide">
            <Icon name="book" />
            <strong>Frequently asked questions</strong>
            <ul className="faq">
              {faqs.map((item, index) => (
                <li key={item.q} className={openFaq === index ? 'is-open' : ''}>
                  <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                    <span>{item.q}</span>
                    <Icon name="chevronDown" size={18} />
                  </button>
                  <p>{item.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}