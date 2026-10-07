export default function Academics() {
  const stages = [
    { name: 'Early Years', age: 'Ages 3–5', desc: 'Play-based discovery that builds confidence, language and a love of learning.' },
    { name: 'Primary', age: 'Ages 5–11', desc: 'A rich, enquiry-led curriculum with strong foundations in literacy, numeracy and the arts.' },
    { name: 'Secondary', age: 'Ages 11–16', desc: 'Specialist teaching, deep thinking and real-world projects that prepare students for the future.' },
  ]
  return (
    <section className="section academics" id="academics">
      <div className="section__head">
        <p className="section__eyebrow">Academics</p>
        <h2 className="section__title">Learning that inspires at every stage</h2>
      </div>
      <div className="academics__stages">
        {stages.map((s) => (
          <article className="stage" key={s.name}>
            <span className="stage__age">{s.age}</span>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
