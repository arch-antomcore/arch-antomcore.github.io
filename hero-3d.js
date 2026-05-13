import * as THREE from 'three';

export const initHero3D = () => {
  const mount = document.getElementById('hero-3d');
  const hero = document.getElementById('hero');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPowerDevice =
    window.innerWidth < 768 ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4);

  document.documentElement.classList.toggle('low-power', Boolean(lowPowerDevice));

let webglSupported = false;
try {
  const canvas = document.createElement('canvas');
  webglSupported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
} catch (e) {
  webglSupported = false;
}

if (mount && hero && webglSupported && mount.dataset.aether3dReady !== 'true') {
  mount.dataset.aether3dReady = 'true';
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07070a, 0.085);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.set(0, 0.15, 6.2);

  const renderer = new THREE.WebGLRenderer({
    antialias: !lowPowerDevice,
    alpha: true,
    stencil: false,
    powerPreference: lowPowerDevice ? 'low-power' : 'high-performance'
  });
  renderer.setClearColor(0x07070a, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPowerDevice ? 1 : 1.25));
  mount.appendChild(renderer.domElement);

  const network = new THREE.Group();
  scene.add(network);

  const particleCount = lowPowerDevice ? (window.innerWidth < 768 ? 32 : 56) : 128;
  const maxSegments = particleCount * (lowPowerDevice ? 4 : 6);
  const basePositions = new Float32Array(particleCount * 3);
  const particlePositions = new Float32Array(particleCount * 3);
  const linePositions = new Float32Array(maxSegments * 6);

  for (let i = 0; i < particleCount; i += 1) {
    const radius = 1.35 + Math.random() * 2.7;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const i3 = i * 3;

    basePositions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
    basePositions[i3 + 1] = Math.cos(phi) * radius * 0.7;
    basePositions[i3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    particlePositions[i3] = basePositions[i3];
    particlePositions[i3 + 1] = basePositions[i3 + 1];
    particlePositions[i3 + 2] = basePositions[i3 + 2];
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0xd8bd78,
      size: 0.035,
      transparent: true,
      opacity: 0.62,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  network.add(particles);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setDrawRange(0, 0);

  const lines = new THREE.LineSegments(
    lineGeometry,
    new THREE.LineBasicMaterial({
      color: 0xa1895b,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  network.add(lines);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.85, lowPowerDevice ? 1 : 2),
    new THREE.MeshBasicMaterial({
      color: 0x52442e,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  core.rotation.set(0.4, -0.2, 0.15);
  network.add(core);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(3.2, 0.015, 12, lowPowerDevice ? 56 : 72),
    new THREE.MeshBasicMaterial({
      color: 0xc8a45d,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  halo.rotation.set(1.12, 0.18, -0.42);
  network.add(halo);

  const prismGroup = new THREE.Group();
  const prismVertices = [
    [-0.9, -0.72, 0.32], [0, 0.94, 0.32], [0.9, -0.72, 0.32],
    [-0.72, -0.56, -0.32], [0, 0.76, -0.32], [0.72, -0.56, -0.32]
  ];
  const prismEdges = [
    [0, 1], [1, 2], [2, 0],
    [3, 4], [4, 5], [5, 3],
    [0, 3], [1, 4], [2, 5],
    [0, 4], [2, 4]
  ];
  const prismPositions = new Float32Array(prismEdges.length * 6);

  prismEdges.forEach(([a, b], index) => {
    const offset = index * 6;
    prismPositions.set(prismVertices[a], offset);
    prismPositions.set(prismVertices[b], offset + 3);
  });

  const prism = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(prismPositions, 3)),
    new THREE.LineBasicMaterial({
      color: 0xb066ff,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  prismGroup.add(prism);
  prismGroup.scale.setScalar(1.42);
  prismGroup.position.z = -0.6;
  network.add(prismGroup);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let width = 1;
  let height = 1;
  let frameId = 0;
  let visible = true;
  let pageVisible = !document.hidden;
  let running = false;
  let lastInteraction = performance.now();
  let renderCount = 0;

  const resize = () => {
    const rect = mount.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const updateNetwork = (time, refreshLines = true) => {
    const limit = width < 768 ? 0.88 : 1.02;
    let segmentIndex = 0;

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const wave = time * (0.55 + (i % 9) * 0.012);
      particlePositions[i3] = basePositions[i3] + Math.sin(wave + i) * 0.075 + pointer.x * 0.16;
      particlePositions[i3 + 1] = basePositions[i3 + 1] + Math.cos(wave * 0.82 + i) * 0.052 + pointer.y * 0.1;
      particlePositions[i3 + 2] = basePositions[i3 + 2] + Math.sin(wave * 0.7 + i * 0.4) * 0.08;
    }

    if (refreshLines) {
      for (let i = 0; i < particleCount; i += 1) {
        const ai = i * 3;

        for (let j = i + 1; j < particleCount; j += 1) {
          if (segmentIndex >= maxSegments) break;

          const bi = j * 3;
          const dx = particlePositions[ai] - particlePositions[bi];
          const dy = particlePositions[ai + 1] - particlePositions[bi + 1];
          const dz = particlePositions[ai + 2] - particlePositions[bi + 2];

          if ((dx * dx) + (dy * dy) + (dz * dz) > limit) continue;

          const li = segmentIndex * 6;
          linePositions[li] = particlePositions[ai];
          linePositions[li + 1] = particlePositions[ai + 1];
          linePositions[li + 2] = particlePositions[ai + 2];
          linePositions[li + 3] = particlePositions[bi];
          linePositions[li + 4] = particlePositions[bi + 1];
          linePositions[li + 5] = particlePositions[bi + 2];
          segmentIndex += 1;
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, segmentIndex * 2);
    }

    particleGeometry.attributes.position.needsUpdate = true;
  };

  const render = (timeMs = 0) => {
    if (!running) return;

    if (lowPowerDevice && timeMs - lastInteraction > 9000) {
      stop();
      renderer.render(scene, camera);
      return;
    }

    const time = timeMs * 0.001;
    pointer.x += (target.x - pointer.x) * 0.055;
    pointer.y += (target.y - pointer.y) * 0.055;

    renderCount += 1;
    updateNetwork(time, renderCount % (lowPowerDevice ? 4 : 2) === 0);

    network.rotation.y = time * 0.045 + pointer.x * 0.12;
    network.rotation.x = -0.08 + pointer.y * 0.08;
    core.rotation.y = time * 0.11;
    core.rotation.x = 0.4 + Math.sin(time * 0.35) * 0.04;
    halo.rotation.z = -0.42 + time * 0.035;
    prismGroup.rotation.y = time * 0.07 + pointer.x * 0.08;
    prismGroup.rotation.x = Math.sin(time * 0.22) * 0.06 + pointer.y * 0.04;

    camera.position.x += (pointer.x * 0.42 - camera.position.x) * 0.035;
    camera.position.y += (0.15 + pointer.y * 0.26 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);

    frameId = window.requestAnimationFrame(render);
  };

  const start = () => {
    if (running || prefersReducedMotion || !visible || !pageVisible) return;
    running = true;
    frameId = window.requestAnimationFrame(render);
  };

  const stop = () => {
    running = false;
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      start();
    } else {
      stop();
    }
  }, { threshold: 0.02 });

  hero.addEventListener('pointermove', (event) => {
    lastInteraction = performance.now();
    start();
    const rect = hero.getBoundingClientRect();
    target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    target.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
    if (pageVisible) start();
    else stop();
  });

  let resizeHeroTimeout;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeHeroTimeout);
    resizeHeroTimeout = window.setTimeout(resize, 150);
  }, { passive: true });
  
  window.addEventListener('scroll', () => {
    if (!visible) return;
    lastInteraction = performance.now();
    start();
  }, { passive: true });
  observer.observe(hero);
  resize();
  updateNetwork(0);
  renderer.render(scene, camera);

  if (!prefersReducedMotion) start();

  window.__aetherHero3D = {
    get running() {
      return running;
    },
    stop,
    start
  };
}

const loopMount = document.getElementById('loop-3d');
const loopSection = document.getElementById('how');

if (loopMount && loopSection && webglSupported && loopMount.dataset.aether3dReady !== 'true') {
  loopMount.dataset.aether3dReady = 'true';
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0, 0, 5.4);

  const renderer = new THREE.WebGLRenderer({
    antialias: !lowPowerDevice,
    alpha: true,
    stencil: false,
    powerPreference: lowPowerDevice ? 'low-power' : 'high-performance'
  });
  renderer.setClearColor(0x080a0a, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPowerDevice ? 1 : 1.15));
  loopMount.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const orbitalMaterials = [
    new THREE.MeshBasicMaterial({
      color: 0x54dec5,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    }),
    new THREE.MeshBasicMaterial({
      color: 0xd8bd78,
      transparent: true,
      opacity: 0.13,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    }),
    new THREE.MeshBasicMaterial({
      color: 0xb066ff,
      transparent: true,
      opacity: 0.11,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  ];

  const orbitA = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.006, 8, lowPowerDevice ? 72 : 96), orbitalMaterials[0]);
  const orbitB = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.005, 8, lowPowerDevice ? 80 : 112), orbitalMaterials[1]);
  const orbitC = new THREE.Mesh(new THREE.TorusGeometry(2.02, 0.004, 8, lowPowerDevice ? 88 : 120), orbitalMaterials[2]);
  orbitA.rotation.set(1.28, 0.12, 0.22);
  orbitB.rotation.set(1.05, 0.82, -0.38);
  orbitC.rotation.set(0.72, -0.58, 0.62);
  group.add(orbitA, orbitB, orbitC);

  const nodeCount = lowPowerDevice ? (window.innerWidth < 768 ? 18 : 28) : 42;
  const nodePositions = new Float32Array(nodeCount * 3);
  const nodeBase = new Float32Array(nodeCount * 3);

  for (let i = 0; i < nodeCount; i += 1) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 1.18 + ((i % 7) * 0.11);
    const i3 = i * 3;

    nodeBase[i3] = Math.cos(angle) * radius;
    nodeBase[i3 + 1] = Math.sin(angle * 1.7) * 0.42;
    nodeBase[i3 + 2] = Math.sin(angle) * radius * 0.62;

    nodePositions[i3] = nodeBase[i3];
    nodePositions[i3 + 1] = nodeBase[i3 + 1];
    nodePositions[i3 + 2] = nodeBase[i3 + 2];
  }

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

  const nodes = new THREE.Points(
    nodeGeometry,
    new THREE.PointsMaterial({
      color: 0x54dec5,
      size: 0.045,
      transparent: true,
      opacity: 0.58,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  group.add(nodes);

  const trianglePositions = new Float32Array([
    -1.25, -0.72, 0,
    0, 1.12, 0,
    1.25, -0.72, 0,
    1.25, -0.72, 0,
    -1.25, -0.72, 0
  ]);
  const triangle = new THREE.Line(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(trianglePositions, 3)),
    new THREE.LineBasicMaterial({
      color: 0xb066ff,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  triangle.position.z = -0.18;
  group.add(triangle);

  const target = { x: 0, y: 0 };
  const pointer = { x: 0, y: 0 };
  let frameId = 0;
  let visible = true;
  let pageVisible = !document.hidden;
  let running = false;
  let lastInteraction = performance.now();

  const resize = () => {
    const rect = loopMount.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const updateNodes = (time) => {
    for (let i = 0; i < nodeCount; i += 1) {
      const i3 = i * 3;
      const phase = time * 0.46 + i * 0.38;
      nodePositions[i3] = nodeBase[i3] + Math.sin(phase) * 0.035;
      nodePositions[i3 + 1] = nodeBase[i3 + 1] + Math.cos(phase * 0.8) * 0.05;
      nodePositions[i3 + 2] = nodeBase[i3 + 2] + Math.sin(phase * 0.7) * 0.035;
    }

    nodeGeometry.attributes.position.needsUpdate = true;
  };

  const render = (timeMs = 0) => {
    if (!running) return;

    if (lowPowerDevice && timeMs - lastInteraction > 8000) {
      stop();
      renderer.render(scene, camera);
      return;
    }

    const time = timeMs * 0.001;
    pointer.x += (target.x - pointer.x) * 0.045;
    pointer.y += (target.y - pointer.y) * 0.045;

    updateNodes(time);

    group.rotation.y = Math.sin(time * 0.18) * 0.14 + pointer.x * 0.12;
    group.rotation.x = -0.12 + Math.cos(time * 0.16) * 0.05 + pointer.y * 0.08;
    orbitA.rotation.z = time * 0.16;
    orbitB.rotation.z = -time * 0.11;
    orbitC.rotation.z = time * 0.07;
    triangle.rotation.y = Math.sin(time * 0.2) * 0.18;

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(render);
  };

  const start = () => {
    if (running || prefersReducedMotion || !visible || !pageVisible) return;
    running = true;
    frameId = window.requestAnimationFrame(render);
  };

  const stop = () => {
    running = false;
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  }, { threshold: 0.04 });

  loopSection.addEventListener('pointermove', (event) => {
    lastInteraction = performance.now();
    start();
    const rect = loopSection.getBoundingClientRect();
    target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    target.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
    if (pageVisible) start();
    else stop();
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(resize, 150);
  }, { passive: true });
  
  window.addEventListener('scroll', () => {
    if (!visible) return;
    lastInteraction = performance.now();
    start();
  }, { passive: true });

  observer.observe(loopSection);
  resize();
  updateNodes(0);
  renderer.render(scene, camera);

  if (!prefersReducedMotion) start();

  window.__aetherLoop3D = {
    get running() {
      return running;
    },
    stop,
    start
  };
}
};
