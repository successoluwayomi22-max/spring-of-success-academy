export default function Departments() {
  const depts = [
    { name: 'Mathematics', icon: '➗', desc: 'From number sense to advanced problem-solving.' },
    { name: 'Sciences', icon: '🔬', desc: 'Hands-on discovery across biology, chemistry and physics.' },
    { name: 'Languages & Literature', icon: '📚', desc: 'Reading, writing and eloquence in multiple languages.' },
    { name: 'Creative Arts', icon: '🎨', desc: 'Music, drama, visual art and design thinking.' },
    { name: 'Physical Education', icon: '⚽', desc: 'Fitness, teamwork and the joy of movement.' },
    { name: 'Computing & AI', icon: '💻', desc: 'Coding, robotics and digital literacy for the future.' },
  ]
  return (
    <section className="section departments" id="departments">
      <div className="section__head">
        <p className="section__eyebrow">Departments</p>
        <h2 className="section__title">Specialist teams, shared purpose</h2>
      </div>
      <div className="departments__grid">
        {depts.map((d) => (
          <div className="dept" key={d.name}>
            <span className="dept__icon" aria-hidden="true">{d.icon}</span>
            <h3>{d.name}</h3>
            <p>{d.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
