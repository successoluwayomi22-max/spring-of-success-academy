import { Reveal } from '../components/ui.jsx';

const LEVELS = [
  {
    lvl: 'Early Years',
    title: 'Nursery & Pre-Unit',
    desc: 'Play-based learning that builds curiosity, confidence and early literacy in a warm, safe environment.',
    items: ['Phonics & early numeracy', 'Montessori-style activity areas', 'Daily outdoor play'],
    ages: 'Ages 3 – 5',
  },
  {
    lvl: 'Primary',
    title: 'Grades 1 – 6',
    desc: 'A strong academic core enriched with arts, sports and technology, guided by caring subject teachers.',
    items: ['CBC-aligned curriculum', 'Robotics & coding club', 'Swimming from Grade 1'],
    ages: 'Ages 6 – 12',
  },
  {
    lvl: 'Secondary',
    title: 'Grades 7 – 12',
    desc: 'Rigorous preparation for national and international examinations with dedicated university guidance.',
    items: ['Science, arts & tech pathways', 'University counselling', 'Leadership programmes'],
    ages: 'Ages 13 – 18',
  },
];

export default function Academics() {
  return (
    <section className="section" id="academics">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow">Academics</p>
          <h2>One journey, three milestones</h2>
          <p className="lead">A seamless path from the first day of nursery to university acceptance.</p>
        </Reveal>
        <div className="acad-cards">
          {LEVELS.map((l, i) => (
            <Reveal key={l.title} delay={i * 120} className="acad-card">
              <p className="lvl">{l.lvl}</p>
              <h3>{l.title}</h3>
              <p>{l.desc}</p>
              <ul>
                {l.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <span className="ages">{l.ages}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
