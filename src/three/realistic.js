import * as THREE from 'three';

/** Procedural grass texture (two-tone blade noise) — no external assets needed. */
export function makeGrassTexture(size = 256, base = '#4d8f5f') {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * size, y = Math.random() * size;
    const shade = 30 + Math.random() * 40;
    g.strokeStyle = `rgba(${shade + 30},${shade + 70},${shade + 40},0.5)`;
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + (Math.random() - 0.5) * 4, y - 3 - Math.random() * 3);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(14, 14);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Asphalt/road texture with speckle noise. */
export function makeAsphaltTexture(size = 128) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  g.fillStyle = '#5c5f58';
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 900; i++) {
    g.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)';
    g.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 40);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Building facade texture: rows of windows on a warm plaster wall. */
export function makeFacadeTexture(w = 256, h = 256, wall = '#e9e2d0', glass = '#7fa8b8') {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = wall;
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 300; i++) {
    g.fillStyle = `rgba(120,110,90,${Math.random() * 0.04})`;
    g.fillRect(Math.random() * w, Math.random() * h, 3, 3);
  }
  const cols = 4, rows = 3;
  const cw = w / cols, ch = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cw + cw * 0.18, y = r * ch + ch * 0.2;
      const ww = cw * 0.64, wh = ch * 0.55;
      g.fillStyle = glass;
      g.fillRect(x, y, ww, wh);
      const grad = g.createLinearGradient(x, y, x, y + wh);
      grad.addColorStop(0, 'rgba(255,255,255,0.35)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(x, y, ww, wh);
      g.strokeStyle = '#8a8070';
      g.lineWidth = 3;
      g.strokeRect(x, y, ww, wh);
      g.beginPath(); g.moveTo(x + ww / 2, y); g.lineTo(x + ww / 2, y + wh);
      g.moveTo(x, y + wh / 2); g.lineTo(x + ww, y + wh / 2);
      g.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Natural tree: tapered trunk + 2–3 irregular leaf clusters. */
export function makeTree(scale = 1) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12 * scale, 0.2 * scale, 1.6 * scale, 7),
    new THREE.MeshStandardMaterial({ color: 0x6b4f35, roughness: 1 })
  );
  trunk.position.y = 0.8 * scale;
  trunk.castShadow = true;
  g.add(trunk);
  const leaf = new THREE.MeshStandardMaterial({ color: 0x3e7d4f, roughness: 0.95, flatShading: true });
  const puffs = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < puffs; i++) {
    const r = (0.75 + Math.random() * 0.4) * scale;
    const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), leaf);
    puff.position.set(
      (Math.random() - 0.5) * 0.7 * scale,
      (1.7 + i * 0.55 + Math.random() * 0.3) * scale,
      (Math.random() - 0.5) * 0.7 * scale
    );
    puff.castShadow = true;
    g.add(puff);
  }
  return g;
}

/** Realistic outdoor lighting: warm shadow-casting sun + sky/ground hemisphere bounce. */
export function addRealisticLighting(scene, sunPos = [14, 22, 10]) {
  const hemi = new THREE.HemisphereLight(0xbfd9ff, 0x3f6b4a, 0.9);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1d6, 2.2);
  sun.position.set(...sunPos);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 90;
  const d = 40;
  sun.shadow.camera.left = -d;
  sun.shadow.camera.right = d;
  sun.shadow.camera.top = d;
  sun.shadow.camera.bottom = -d;
  sun.shadow.bias = -0.0004;
  scene.add(sun);
  return sun;
}

/** Vertical sky gradient dome. */
export function makeSky(top = '#7fb3e8', bottom = '#e8f2e4') {
  const c = document.createElement('canvas');
  c.width = 2; c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, top);
  grad.addColorStop(1, bottom);
  g.fillStyle = grad;
  g.fillRect(0, 0, 2, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(
    new THREE.SphereGeometry(120, 24, 16),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide })
  );
}

/** Renderer tuned for realism: soft shadows, ACES tone mapping, sRGB output. */
export function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  return renderer;
}

/** School building with window facade, roof and entrance steps. */
export function makeBuilding(w = 6, d = 5, h = 5, roofColor = 0x9a4a3a) {
  const g = new THREE.Group();
  const facade = makeFacadeTexture();
  const wallMat = new THREE.MeshStandardMaterial({ map: facade, roughness: 0.85 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [
    wallMat, wallMat.clone(),
    new THREE.MeshStandardMaterial({ color: 0xd9d2bf, roughness: 0.9 }),
    new THREE.MeshStandardMaterial({ color: 0xb9b2a0, roughness: 0.95 }),
    wallMat.clone(), wallMat.clone(),
  ]);
  body.position.y = h / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  g.add(body);
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.6, 0.5, d + 0.6),
    new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.7 })
  );
  roof.position.y = h + 0.25;
  roof.castShadow = true;
  g.add(roof);
  const step = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.35, 1),
    new THREE.MeshStandardMaterial({ color: 0xc9c2b0, roughness: 1 })
  );
  step.position.set(0, 0.17, d / 2 + 0.5);
  g.add(step);
  return g;
}
