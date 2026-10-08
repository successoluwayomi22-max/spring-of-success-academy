import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../components/ui.jsx';
import { createRenderer, addRealisticLighting, makeSky, makeGrassTexture, makeAsphaltTexture, makeBuilding, makeTree } from '../three/realistic.js';

const STOPS = [
  { ico: '🏛️', name: 'Main Gate & Plaza', desc: 'Where every school day begins.' },
  { ico: '🔬', name: 'Science Block', desc: 'Three labs, one spirit of discovery.' },
  { ico: '📖', name: 'Library', desc: 'Two floors of quiet, books and focus.' },
  { ico: '🏀', name: 'Sports Complex', desc: 'Courts, pitch and pool.' },
  { ico: '🎭', name: 'Arts Centre', desc: 'Music, dance and a 400-seat stage.' },
  { ico: '🌳', name: 'The Green Quad', desc: 'Shaded lawns where friendships grow.' },
];

/** 3D "street view" style walkthrough: a first-person flight through low-poly campus buildings. */
export default function VirtualTour() {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const flyRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => { };
    const canvas = canvasRef.current;
    if (!canvas) return;

    import('three').then((THREE) => {
      if (disposed) return;
      const renderer = createRenderer(canvas);
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xcfe4d8, 40, 120);
      scene.add(makeSky());
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 300);

      // Textured grass ground
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(300, 300),
        new THREE.MeshStandardMaterial({ map: makeGrassTexture(), roughness: 1 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      // Paved walkway with edge lines
      const path = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 200),
        new THREE.MeshStandardMaterial({ map: makeAsphaltTexture(), roughness: 1 })
      );
      path.rotation.x = -Math.PI / 2;
      path.position.y = 0.02;
      path.receiveShadow = true;
      scene.add(path);

      // Buildings lining the path — realistic facades
      const builds = [];
      const roofColors = [0x9a4a3a, 0x7a5230, 0x5a6e78, 0x9a4a3a, 0x7a5230, 0x9a4a3a];
      for (let s = 0; s < STOPS.length; s++) {
        const side = s % 2 === 0 ? -1 : 1;
        const z = -s * 22 - 10;
        const g = makeBuilding(8, 6, 4 + (s % 3) * 2, roofColors[s]);
        g.position.set(side * 9, 0, z);
        g.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
        scene.add(g);
        builds.push(g);
      }

      // Trees along the path — natural canopies
      for (let i = 0; i < 30; i++) {
        const tree = makeTree(0.9 + Math.random() * 0.6);
        tree.position.set((i % 2 ? 7.5 : -7.5) + (Math.random() - 0.5), 0, -i * 5 - 4);
        tree.rotation.y = Math.random() * Math.PI * 2;
        scene.add(tree);
      }

      addRealisticLighting(scene, [14, 26, 18]);

      const resize = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize);

      // Flight path along z; flyTo returns a target camera position
      const camPos = new THREE.Vector3(0, 2.2, 6);
      const goal = camPos.clone();
      flyRef.current = (i) => {
        const b = builds[i];
        goal.set(b.position.x * 0.45, 2.6, b.position.z + 12);
      };

      let raf = 0;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        camPos.lerp(goal, 0.045);
        camera.position.copy(camPos);
        camera.lookAt(0, 2.2, camPos.z - 24);
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        renderer.dispose();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, []);

  const pick = (i) => {
    setActive(i);
    flyRef.current?.(i);
  };

  return (
    <section className="tour section" id="tour">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Virtual Tour</p>
          <h2>Walk the campus from anywhere</h2>
          <p className="lead">Select a stop and take a 3D stroll through the academy.</p>
        </Reveal>
        <div className="tour-grid">
          <Reveal dir="left" className="tour-stage">
            <canvas id="tour-canvas" ref={canvasRef} aria-label="3D virtual campus tour" />
            <div className="tour-overlay">
              <h3>{STOPS[active].name}</h3>
              <p>{STOPS[active].desc}</p>
            </div>
          </Reveal>
          <Reveal dir="right" className="tour-stops">
            {STOPS.map((s, i) => (
              <button
                key={s.name}
                className={`tour-stop ${active === i ? 'active' : ''}`}
                onClick={() => pick(i)}
              >
                <span className="ico">{s.ico}</span>
                <div>
                  <b>{s.name}</b>
                  <span>{s.desc}</span>
                </div>
              </button>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
