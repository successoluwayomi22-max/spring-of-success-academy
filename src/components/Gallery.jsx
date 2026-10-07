export default function Gallery() {
  const images = [
    { label: 'Modern classrooms' },
    { label: 'Science labs' },
    { label: 'Sports facilities' },
    { label: 'Creative arts studios' },
    { label: 'Library & reading' },
    { label: 'Outdoor learning' },
  ]
  return (
    <section className="section gallery" id="gallery">
      <div className="section__head">
        <p className="section__eyebrow">Gallery</p>
        <h2 className="section__title">A glimpse inside our school</h2>
      </div>
      <div className="gallery__grid">
        {images.map((img, i) => (
          <figure className="gallery__item" key={i}>
            <div className="gallery__placeholder" aria-hidden="true">
              <span>{img.label}</span>
            </div>
            <figcaption>{img.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
