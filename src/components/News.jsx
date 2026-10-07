export default function News() {
  const stories = [
    { date: 'Sept 2026', title: 'Welcome to a new academic year', excerpt: 'We are thrilled to welcome our new and returning families.' },
    { date: 'Aug 2026', title: 'Outstanding results celebrated', excerpt: 'Students achieved exceptional outcomes across all key stages.' },
    { date: 'Jul 2026', title: 'Summer showcase of learning', excerpt: 'Creativity and innovation shone at our annual exhibition.' },
  ]
  return (
    <section className="section news" id="news">
      <div className="section__head">
        <p className="section__eyebrow">News</p>
        <h2 className="section__title">Stories from our community</h2>
      </div>
      <div className="news__grid">
        {stories.map((s) => (
          <article className="news-card" key={s.title}>
            <span className="news-card__date">{s.date}</span>
            <h3>{s.title}</h3>
            <p>{s.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
