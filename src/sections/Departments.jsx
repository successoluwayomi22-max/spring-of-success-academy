import { Reveal } from '../components/ui.jsx';

const DEPTS = [
  { ico: '🔬', name: 'Sciences', desc: 'Physics, chemistry and biology in fully equipped labs.', bg: 'linear-gradient(135deg, #123a2f, #1a4a3c)' },
  { ico: '📐', name: 'Mathematics', desc: 'From foundations to further maths and olympiad training.', bg: 'linear-gradient(135deg, #1a4a3c, #0d2b23)' },
  { ico: '💻', name: 'ICT & Robotics', desc: 'Coding, robotics and digital design studios.', bg: 'linear-gradient(135deg, #2a6b55, #123a2f)' },
  { ico: '📚', name: 'Languages', desc: 'English, Kiswahili and French with a debating society.', bg: 'linear-gradient(135deg, #123a2f, #2a6b55)' },
  { ico: '🎨', name: 'Creative Arts', desc: 'Visual art, music, drama and an annual production.', bg: 'linear-gradient(135deg, #1a4a3c, #123a2f)' },
  { ico: '⚽', name: 'Sports Science', desc: 'Athletics, ball games, swimming and fitness.', bg: 'linear-gradient(135deg, #0d2b23, #1a4a3c)' },
];

export default function Departments() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Departments</p>
          <h2>Six departments, one standard: excellent</h2>
        </Reveal>
        <div className="dept-grid">
          {DEPTS.map((d, i) => (
            <Reveal key={d.name} delay={i * 80} className="dept" data-ico={d.ico} style={{ background: d.bg }}>
              <h3>{d.name}</h3>
              <p>{d.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
