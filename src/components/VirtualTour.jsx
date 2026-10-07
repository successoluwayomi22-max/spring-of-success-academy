export default function VirtualTour() {
  return (
    <section className="section virtual-tour" id="virtual-tour">
      <div className="section__head">
        <p className="section__eyebrow">Virtual Tour</p>
        <h2 className="section__title">Explore our campus from anywhere</h2>
      </div>
      <div className="virtual-tour__frame" role="img" aria-label="Virtual campus tour preview">
        <div className="virtual-tour__play" aria-hidden="true">▶</div>
        <p>Take a 360° walkthrough of our classrooms, grounds and facilities.</p>
      </div>
    </section>
  )
}
