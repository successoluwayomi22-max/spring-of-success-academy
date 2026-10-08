import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../components/ui.jsx';
import { createRenderer, addRealisticLighting, makeSky, makeGrassTexture, makeBuilding, makeTree } from '../three/realistic.js';

const STOPS = [
  { id: 'gate', label: 'Main Gate', desc: 'Welcoming entrance with the academy crest and security post.', color: 0xd9a441 },
  { id: 'labs', label: 'Science Labs', desc: 'Fully equipped physics, chemistry and biology laboratories.', color: 0x3f8f6f },
  { id: 'library', label: 'Library', desc: 'A quiet two-storey library with 20,000+ titles and digital research stations.', color: 0xd9a441 },
  { id: 'sports', label: 'Sports Complex', desc: 'Football pitch, basketball courts, swimming pool and athletics track.', color: 0x3f8f6f },
  { id: 'arts', label: 'Arts Centre', desc: 'Music rooms, dance studio and a 400-seat auditorium.', color: 0xd9a441 },
  { id: 'dorms', label: 'Boarding Houses', desc: 'Comfortable supervised dormitories with study lounges.', color: 0x3f8f6f },
];

/** Interactive 3D campus: a stylised low-poly campus you can orbit; chips fly the camera to buildings. */
export default function CampusExplorer() {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const apiRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => { };
    const canvas = canvasRef.current;
    if (!canvas) return;

    import('three').then((THREE) => {
      if (disposed) return;
      const renderer = createRenderer(canvas);
      const scene = new THREE.Scene();
      scene.add(makeSky());
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 300);

      const world = new THREE.Group();
      scene.add(world);

      // Ground — textured grass
      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(40, 64),
        new THREE.MeshStandardMaterial({ map: makeGrassTexture(), roughness: 1 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      world.add(ground);

      // Crossing paths — warm paving
      const pathMat = new THREE.MeshStandardMaterial({ color: 0xcfc4a6, roughness: 1 });
      [[0, 0, 0], [0, 0, Math.PI / 2]].forEach(([, , ry]) => {
        const path = new THREE.Mesh(new THREE.PlaneGeometry(70, 3), pathMat);
        path.rotation.x = -Math.PI / 2;
        path.rotation.z = ry;
        path.position.y = 0.02;
        path.receiveShadow = true;
        world.add(path);
      });

      // Buildings — one realistic building per stop, placed around the circle
      const roofColors = [0x9a4a3a, 0x7a5230, 0x9a4a3a, 0x5a6e78, 0x7a5230, 0x9a4a3a];
      const buildings = STOPS.map((stop, i) => {
        const a = (i / STOPS.length) * Math.PI * 2;
        const r = 12;
        const g = makeBuilding(5, 4.5, 4 + (i % 3) * 1.6, roofColors[i]);
        g.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
        g.lookAt(0, 0, 0);
        world.add(g);
        return g;
      });

      // Trees — natural irregular canopies
      for (let i = 0; i < 46; i++) {
        const tree = makeTree(0.8 + Math.random() * 0.7);
        const a = Math.random() * Math.PI * 2;
        const r = 7 + Math.random() * 24;
        tree.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
        tree.rotation.y = Math.random() * Math.PI * 2;
        world.add(tree);
      }

      addRealisticLighting(scene, [18, 28, 12]);

      // Simple orbit controls (drag to rotate, wheel to zoom)
      let theta = 0.6, phi = 1.05, radius = 30;
      let dragging = false, px = 0, py = 0;
      const onDown = (e) => { dragging = true; px = e.clientX; py = e.clientY; };
      const onMove = (e) => {
        if (!dragging) return;
        theta -= (e.clientX - px) * 0.005;
        phi = Math.min(Math.max(phi - (e.clientY - py) * 0.004, 0.35), 1.4);
        px = e.clientX; py = e.clientY;
      };
      const onUp = () => { dragging = false; };
      const onWheel = (e) => {
        e.preventDefault();
        radius = Math.min(Math.max(radius + e.deltaY * 0.02, 14), 46);
      };
      canvas.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      canvas.addEventListener('wheel', onWheel, { passive: false });

      const resize = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize);

      // Camera target — chips fly the camera to the active building
      const target = new THREE.Vector3(0, 2, 0);
      let goalTheta = theta, goalPhi = phi, goalRadius = radius;
      apiRef.current = (i) => {
        const b = buildings[i];
        goalTheta = Math.atan2(b.position.z, b.position.x) + 0.6;
        goalPhi = 1.0;
        goalRadius = 9;
      };

      let raf = 0;
      const clock = new THREE.Clock();
      const animate = () => {
        raf = requestAnimationFrame(animate);
        const dt = clock.getDelta();
        if (!dragging) goalTheta += dt * 0.05; // gentle idle orbit
        theta += (goalTheta - theta) * 0.06;
        phi += (goalPhi - phi) * 0.06;
        radius += (goalRadius - radius) * 0.06;
        camera.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        );
        camera.lookAt(target);
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('wheel', onWheel);
        renderer.dispose();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, []);

  const pick = (i) => {
    setActive(i);
    apiRef.current?.(i);
  };

  const stop = STOPS[active];

  return (
    <section className="campus section on-dark" id="campus">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Virtual Campus</p>
          <h2>Explore our campus in 3D</h2>
          <p className="lead">Drag to orbit, scroll to zoom, or pick a destination to fly there.</p>
        </Reveal>
        <div className="campus-grid">
          <Reveal dir="left">
            <div className="campus-stage">
              <canvas id="campus-canvas" ref={canvasRef} aria-label="Interactive 3D campus map" />
              <span className="campus-hint">Drag to orbit · Scroll to zoom</span>
            </div>
          </Reveal>
          <Reveal dir="right">
            <div className="campus-list" role="tablist" aria-label="Campus locations">
              {STOPS.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active === i}
                  className={`campus-chip ${active === i ? 'active' : ''}`}
                  onClick={() => pick(i)}
                >
                  <span className="dot" />{s.label}
                </button>
              ))}
            </div>
            <div className="campus-info" key={stop.id}>
              <h3>{stop.label}</h3>
              <p>{stop.desc}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
