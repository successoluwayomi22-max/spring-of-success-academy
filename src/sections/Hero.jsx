import { useEffect, useRef } from 'react';
import { Magnetic } from '../components/ui.jsx';

/** Rotating wireframe globe + floating school blocks rendered with three.js */
export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    let disposed = false;
    const canvas = canvasRef.current;
    if (!canvas || !window.matchMedia('(min-width: 760px)').matches) return;

    Promise.all([import('three')]).then(([THREE]) => {
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.set(0, 1.2, 7);

      const group = new THREE.Group();
      scene.add(group);

      // Wireframe globe
      const globe = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.6, 2),
        new THREE.MeshBasicMaterial({ color: 0x2a6b55, wireframe: true, transparent: true, opacity: 0.35 })
      );
      group.add(globe);

      // Golden floating "blocks" (school buildings motif)
      const blockMat = new THREE.MeshStandardMaterial({ color: 0xd9a441, metalness: 0.3, roughness: 0.4 });
      const blocks = [];
      for (let i = 0; i < 14; i++) {
        const h = 0.3 + Math.random() * 0.8;
        const block = new THREE.Mesh(new THREE.BoxGeometry(0.35, h, 0.35), blockMat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.6;
        block.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
        block.lookAt(0, 0, 0);
        blocks.push(block);
        group.add(block);
      }

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(4, 6, 5);
      scene.add(key);

      const resize = () => {
        const w = canvas.clientWidth || canvas.parentElement.clientWidth;
        const h = canvas.clientHeight || canvas.parentElement.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize);

      let mx = 0;
      const onMove = (e) => { mx = (e.clientX / innerWidth - 0.5) * 0.6; };
      window.addEventListener('pointermove', onMove);

      const clock = new THREE.Clock();
      const animate = () => {
        raf = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        group.rotation.y = t * 0.12 + mx;
        group.rotation.x = Math.sin(t * 0.2) * 0.08;
        blocks.forEach((b, i) => {
          b.position.y += Math.sin(t * 1.4 + i) * 0.0012;
        });
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onMove);
        renderer.dispose();
      };
    });

    return () => { disposed = true; cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero" id="top">
      <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="hero-fade" />
      <div className="hero-content">
        <p className="hero-school">Spring of Success Academy</p>
        <h1>Where young minds grow into <em>confident leaders</em></h1>
        <p>
          From nursery to secondary, we blend academic excellence with character,
          creativity and technology — on a green, modern campus built for the future.
        </p>
        <div className="hero-ctas">
          <Magnetic as="a" href="#admissions" className="btn btn-gold">Apply for Admission</Magnetic>
          <Magnetic as="a" href="#campus" className="btn btn-outline">Explore the Campus</Magnetic>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><b>25+</b><span>Years of excellence</span></div>
          <div className="hero-stat"><b>1,200</b><span>Students enrolled</span></div>
          <div className="hero-stat"><b>98%</b><span>University placement</span></div>
          <div className="hero-stat"><b>60+</b><span>Expert teachers</span></div>
        </div>
      </div>
      <a className="scroll-hint" href="#about">Scroll</a>
    </section>
  );
}
