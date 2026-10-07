export default function Testimonials() {
  const quotes = [
    { quote: 'Our children have blossomed — they are curious, kind and confident.', author: 'Parent, Year 4' },
    { quote: 'The teachers truly see every student and help them shine.', author: 'Student, Year 9' },
    { quote: 'A school where parents feel welcomed and students feel known.', author: 'Parent, Year 1' },
  ]
  return (
    <section className="section testimonials" id="testimonials">
      <div className="section__head">
        <p className="section__eyebrow">Voices</p>
        <h2 className="section__title">What our community says</h2>
      </div>
      <div className="testimonials__grid">
        {quotes.map((q) => (
          <blockquote className="quote" key={q.author}>
            <p>"{q.quote}"</p>
            <cite>— {q.author}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
