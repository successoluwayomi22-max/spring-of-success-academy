import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { ArrowLink, Image, SectionHeading } from './UI.jsx'
import { campusLocations } from '../data/siteData.js'

export default function CampusExplorer() {
  const [activeId, setActiveId] = useState(campusLocations[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const timerRef = useRef(null)
  const active = useMemo(() => campusLocations.find((location) => location.id === activeId), [activeId])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleSelect = (id) => {
    if (id === activeId) {
      setShowDetail((state) => !state)
      return
    }
    setShowDetail(false)
    setActiveId(id)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowDetail(true), 320)
  }

  return (
    <section id="campus" className="campus" aria-label="Interactive 3D campus explorer">
      <div className="campus__head">
        <SectionHeading eyebrow="A campus designed to inspire" title="Walk through our school" description="Discover the environments that shape everyday learning, creativity and wellbeing." align="center" />
      </div>
      <div className="campus__stage">
        <div className="campus__world">
          <div className="iso-campus">
            <div className="iso-aerial">
              <div className="aerial-grass" />
              <div className="aerial-path aerial-path--main" />
              <div className="aerial-path aerial-path--cross" />
              <div className="aerial-path aerial-path--walk" />
            </div>
            <div className="building building--academic">
              <div className="building-body building-body--main">
                <div className="roof roof--tile" />
                <div className="facade facade--cream">
                  <div className="window-grid window-grid--large">
                    <div className="win" /><div className="win" /><div className="win" /><div className="win" /><div className="win" /><div className="win" />
                    <div className="win" /><div className="win" /><div className="win" /><div className="win" /><div className="win" /><div className="win" />
                  </div>
                  <div className="door door--main"><div className="door-arch" /></div>
                </div>
              </div>
              <div className="building-body building-body--wing">
                <div className="roof roof--tile" />
                <div className="facade facade--cream facade--side">
                  <div className="window-grid window-grid--small">
                    <div className="win" /><div className="win" /><div className="win" />
                    <div className="win" /><div className="win" /><div className="win" />
                  </div>
                </div>
              </div>
              <div className="chimney chimney--1" />
              <div className="chimney chimney--2" />
            </div>
            <div className="building building--science">
              <div className="building-body">
                <div className="roof roof--flat" />
                <div className="facade facade--stone">
                  <div className="window-grid window-grid--medium">
                    <div className="win" /><div className="win" /><div className="win" /><div className="win" />
                    <div className="win" /><div className="win" /><div className="win" /><div className="win" />
                  </div>
                  <div className="door door--side" />
                </div>
              </div>
              <div className="antenna" />
            </div>
            <div className="building building--arts">
              <div className="building-body">
                <div className="roof roof--pitched" />
                <div className="facade facade--warm">
                  <div className="window-grid window-grid--wide">
                    <div className="win win--tall" /><div className="win win--tall" /><div className="win win--tall" />
                  </div>
                  <div className="door door--double" />
                </div>
              </div>
            </div>
            <div className="building building--library">
              <div className="building-body">
                <div className="roof roof--glass" />
                <div className="facade facade--glass">
                  <div className="glass-panel glass-panel--1" />
                  <div className="glass-panel glass-panel--2" />
                  <div className="glass-panel glass-panel--3" />
                </div>
              </div>
            </div>
            <div className="tree tree--oak tree--1"><span className="foliage foliage--round" /><span className="trunk" /></div>
            <div className="tree tree--oak tree--2"><span className="foliage foliage--round" /><span className="trunk" /></div>
            <div className="tree tree--pine tree--3"><span className="foliage foliage--cone" /><span className="trunk" /></div>
            <div className="tree tree--pine tree--4"><span className="foliage foliage--cone" /><span className="trunk" /></div>
            <div className="tree tree--maple tree--5"><span className="foliage foliage--full" /><span className="trunk" /></div>
            <div className="tree tree--maple tree--6"><span className="foliage foliage--full" /><span className="trunk" /></div>
            <div className="tree tree--birch tree--7"><span className="foliage foliage--light" /><span className="trunk trunk--light" /></div>
            <div className="tree tree--oak tree--8"><span className="foliage foliage--round" /><span className="trunk" /></div>
            <div className="garden garden--1"><span className="hedge" /><span className="flower flower--1" /><span className="flower flower--2" /><span className="flower flower--3" /></div>
            <div className="garden garden--2"><span className="hedge hedge--low" /></div>
            <div className="garden garden--3"><span className="flower flower--4" /><span className="flower flower--5" /><span className="flower flower--6" /></div>
            <div className="bench bench--1"><span className="bench-seat" /><span className="bench-leg" /><span className="bench-leg" /></div>
            <div className="bench bench--2"><span className="bench-seat" /><span className="bench-leg" /><span className="bench-leg" /></div>
            <div className="sports-field">
              <div className="field-grass" />
              <div className="court-line court-line--1" />
              <div className="court-line court-line--2" />
              <div className="court-line court-line--3" />
              <div className="goal goal--1" />
              <div className="goal goal--2" />
            </div>
            <div className="parking">
              <div className="parking-mark parking-mark--1" />
              <div className="parking-mark parking-mark--2" />
              <div className="parking-mark parking-mark--3" />
            </div>
            {campusLocations.map((location) => (
              <button
                key={location.id}
                className={`location-pin ${activeId === location.id ? 'is-active' : ''}`}
                style={{ left: `${location.position[0]}%`, top: `${location.position[1]}%`, '--pin-color': location.color }}
                onClick={() => handleSelect(location.id)}
                aria-label={`Explore ${location.name}`}
                aria-pressed={activeId === location.id}
              >
                <span className="pin-dot"><Icon name={location.icon} size={12} /></span>
              </button>
            ))}
          </div>
        </div>
        <aside className={`campus__detail ${showDetail ? 'is-open' : ''}`} aria-live="polite">
          <div className="campus__detail-head">
            <Icon name={active.icon} size={24} />
            <div>
              <small>{active.eyebrow}</small>
              <strong>{active.name}</strong>
            </div>
          </div>
          <div className="campus__detail-image"><Image src={active.image} alt={active.name} /></div>
          <p>{active.description}</p>
          <ArrowLink href="#gallery">See it in the gallery</ArrowLink>
        </aside>
      </div>
      <ul className="campus__list" role="list">
        {campusLocations.map((location) => (
          <li key={location.id}>
            <button className={`campus__card ${activeId === location.id ? 'is-active' : ''}`} onClick={() => handleSelect(location.id)} style={{ '--hc': location.color }}>
              <Icon name={location.icon} size={20} />
              <strong>{location.name}</strong>
              <span>{location.eyebrow}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

