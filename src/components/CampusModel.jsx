import Icon from './Icon.jsx'

const windows = Array.from({ length: 18 }, (_, index) => index)

export default function CampusModel({ onExplore, interactive = true }) {
  return (
    <div className={`campus-model ${interactive ? 'campus-model--interactive' : ''}`} aria-label="Interactive architectural model of the academy campus">
      <div className="campus-model__ground">
        <div className="campus-model__path" />
        <div className="campus-model__lawn campus-model__lawn--one" />
        <div className="campus-model__lawn campus-model__lawn--two" />
      </div>
      <div className="school-building school-building--left">
        <div className="building__front">{windows.slice(0, 6).map((item) => <span className="building__window" key={item} />)}</div>
        <div className="building__side" />
        <div className="building__roof" />
      </div>
      <div className="school-building school-building--main">
        <div className="building__front">
          <div className="building__name">Spring of Success</div>
          {windows.map((item) => <span className="building__window" key={item} />)}
          <div className="building__entrance"><i /><i /><b /></div>
        </div>
        <div className="building__side" />
        <div className="building__roof" />
        <div className="building__tower"><span>SSA</span></div>
      </div>
      <div className="school-building school-building--right">
        <div className="building__front">{windows.slice(0, 8).map((item) => <span className="building__window" key={item} />)}</div>
        <div className="building__side" />
        <div className="building__roof" />
      </div>
      <div className="model-tree model-tree--one"><i /><b /></div>
      <div className="model-tree model-tree--two"><i /><b /></div>
      <div className="model-tree model-tree--three"><i /><b /></div>
      <div className="model-people model-people--one"><i /><b /></div>
      <div className="model-people model-people--two"><i /><b /></div>
      {interactive && (
        <button className="model-explore" onClick={onExplore} aria-label="Explore the campus model">
          <Icon name="compass" size={18} /><span>Explore campus</span>
        </button>
      )}
    </div>
  )
}