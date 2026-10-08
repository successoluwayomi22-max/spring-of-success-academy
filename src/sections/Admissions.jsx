import { Reveal } from '../components/ui.jsx';

const STEPS = [
  ['Enquire', 'Submit the online enquiry form or visit our admissions office.'],
  ['Visit', 'Tour the campus with your child and meet our teachers.'],
  ['Assessment', 'A friendly age-appropriate assessment helps us place your child well.'],
  ['Enrol', 'Receive your offer letter and welcome pack — welcome to the family!'],
];

const REQUIREMENTS = [
  'Completed application form',
  'Copy of birth certificate',
  'Two passport-size photos',
  'Previous school report (Grade 1+)',
  'Non-refundable application fee',
];

const FAQS = [
  ['When do applications open?', 'We accept applications year-round. Main intakes are in January and September.'],
  ['Do you offer scholarships?', 'Yes — merit and need-based scholarships cover up to 100% of tuition for qualifying students.'],
  ['Is transport available?', 'School buses serve most nearby estates with supervised pick-up and drop-off.'],
];

export default function Admissions() {
  return (
    <section className="admissions section" id="admissions">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Admissions</p>
          <h2>Joining Spring of Success is easy</h2>
        </Reveal>
        <div className="adm-grid">
          <div className="adm-steps">
            {STEPS.map(([title, desc], i) => (
              <Reveal key={title} className="adm-step" delay={i * 100}>
                <span className="adm-step-num">{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="adm-panel">
            <Reveal dir="right" className="adm-box card">
              <h3>What you’ll need</h3>
              <ul>
                {REQUIREMENTS.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </Reveal>
            <Reveal dir="right" delay={120} className="adm-cta">
              <h3>Ready to apply?</h3>
              <p>Applications for the next intake are open now.</p>
              <a href="#contact" className="btn btn-gold">Start Application</a>
            </Reveal>
            <div className="faq">
              {FAQS.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
