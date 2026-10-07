export default function StudentLife() {
  const items = [
    { title: 'Clubs & Societies', desc: 'From debate to drone club, there is something for every passion.' },
    { title: 'Sports & Wellbeing', desc: 'Competitive and recreational sport, plus a strong wellbeing programme.' },
    { title: 'Leadership', desc: 'Student council, mentoring and community action projects.' },
    { title: 'Arts & Performance', desc: 'Concerts, exhibitions, productions and creative showcases year-round.' },
  ]
  return (
    <section className="section student-life" id="student-life">
      <div className="section__head">
        <p className="section__eyebrow">Student Life</p>
        <h2 className="section__title">A community where every child belongs</h2>
      </div>
      <div className="student-life__grid">
        {items.map((item) => (
          <article className="life-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
