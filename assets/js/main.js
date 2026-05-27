

let prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => { prefersReduced = e.matches; });
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    setTimeout(() => $('#boot')?.classList.add('is-hidden'), 150);
  });
});
setTimeout(() => $('#boot')?.classList.add('is-hidden'), 2200); // Fallback

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function debounce(fn, ms) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

const globalCursor = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
let tickingCursor = false;
window.addEventListener('pointermove', (e) => {
  if (!tickingCursor) {
    requestAnimationFrame(() => {
      globalCursor.x = e.clientX;
      globalCursor.y = e.clientY;
      tickingCursor = false;
    });
    tickingCursor = true;
  }
}, { passive: true });

function initMatrixCanvas() {
  const canvas = $('#matrix');
  if (!canvas || prefersReduced) return;

  const ctx = canvas.getContext('2d');
  const chars = '01ΛAETHERCOREARLIPCFTS5RUSTCEFXLSXLOCALVAULTUPLINKGATEJSONLBIAGENTΣΔ'.split('');
  const dpr = Math.min(devicePixelRatio || 1, 1.8);
  const pointer = { x: innerWidth * 0.5, y: innerHeight * 0.5, tx: innerWidth * 0.5, ty: innerHeight * 0.5, nx: 0, ny: 0 };
  let width = 0, height = 0, baseSize = 16, columns = [], velocity = 0, lastScroll = scrollY, lastTime = performance.now();

  let isVisible = true;
  let lastGlowX = -9999, lastGlowY = -9999, cachedGlow = null;

  function randomChar() {
    return chars[(Math.random() * chars.length) | 0];
  }

  function createColumn(i, total) {
    const depth = 0.45 + Math.random() * 1.4;
    const size = baseSize * (0.82 + depth * 0.26 + Math.random() * 0.16);
    const spacing = size * (0.62 + Math.random() * 0.14);
    const span = width / Math.max(1, total - 1);
    const x = i * span + (Math.random() - 0.5) * size * 1.6;
    const length = Math.round(8 + depth * 10 + Math.random() * 10);
    return {
      x,
      y: Math.random() * (height + length * spacing) - length * spacing,
      depth,
      size,
      spacing,
      length,
      speed: 34 + depth * 28 + Math.random() * 38,
      alpha: 0.08 + depth * 0.09 + Math.random() * 0.08,
      swing: (Math.random() - 0.5) * 28 * dpr,
      phase: Math.random() * Math.PI * 2,
      text: Array.from({ length }, randomChar)
    };
  }

  function resize() {
    width = canvas.width = Math.floor(innerWidth * dpr);
    height = canvas.height = Math.floor(innerHeight * dpr);
    baseSize = 14.5 * dpr;
    const count = Math.max(24, Math.ceil(innerWidth / 26));
    if (columns.length < count) {
      for (let i = columns.length; i < count; i++) columns.push(createColumn(i, count));
    } else if (columns.length > count) {
      columns.length = count;
    }
    const span = width / Math.max(1, count - 1);
    columns.forEach((col, i) => {
       col.x = i * span + (Math.random() - 0.5) * col.size * 1.6;
    });
  }

  const fpsInterval = 1000 / 24; // Cap a 24 FPS for perf
  let lastFrameTime = performance.now();

  function draw(now) {
    if (!isVisible) return;
    const elapsed = now - lastFrameTime;
    if (elapsed < fpsInterval) {
      requestAnimationFrame(draw);
      return;
    }
    lastFrameTime = now - (elapsed % fpsInterval);

    const dt = Math.min(2.2, (now - lastTime) / 16.6667 || 1);
    lastTime = now;

    const deltaScroll = clamp(scrollY - lastScroll, -30, 30);
    lastScroll = scrollY;
    velocity = lerp(velocity, deltaScroll, 0.045);
    velocity = clamp(velocity, -40, 40);

    pointer.tx = globalCursor.x;
    pointer.ty = globalCursor.y;

    pointer.x = lerp(pointer.x, pointer.tx, 0.055);
    pointer.y = lerp(pointer.y, pointer.ty, 0.055);
    pointer.nx = (pointer.x / Math.max(1, innerWidth) - 0.5) * 2;
    pointer.ny = (pointer.y / Math.max(1, innerHeight) - 0.5) * 2;

    ctx.fillStyle = 'rgba(253, 247, 226, 0.18)';
    ctx.fillRect(0, 0, width, height);

    const glowX = pointer.x * dpr;
    const glowY = pointer.y * dpr;
    if (Math.abs(glowX - lastGlowX) > 0.5 || Math.abs(glowY - lastGlowY) > 0.5 || !cachedGlow) {
      lastGlowX = glowX;
      lastGlowY = glowY;
      const minDim = width < height ? width : height;
      cachedGlow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, minDim * 0.24);
      cachedGlow.addColorStop(0, 'rgba(15, 159, 117, 0.055)');
      cachedGlow.addColorStop(0.42, 'rgba(124, 58, 237, 0.026)');
      cachedGlow.addColorStop(1, 'rgba(253, 247, 226, 0)');
    }
    ctx.fillStyle = cachedGlow;
    ctx.fillRect(0, 0, width, height);

    columns.forEach((col) => {
      if (Math.random() > 0.92) col.text[(Math.random() * col.text.length) | 0] = randomChar();

      const headX = col.x + Math.sin(now * 0.00034 * (1 + col.depth) + col.phase) * col.swing + pointer.nx * 20 * col.depth * dpr;
      const headY = col.y + pointer.ny * 7 * col.depth * dpr - velocity * 0.6 * col.depth;
      const distPointer = Math.abs(headX - glowX);
      const pointerBoost = clamp(1 - distPointer / (width * 0.12), 0, 1);

      ctx.strokeStyle = `rgba(15, 96, 76, ${clamp(col.alpha * 0.22 + pointerBoost * 0.05, 0, 0.18)})`;
      ctx.lineWidth = Math.max(1, col.depth * 0.7 * dpr);
      ctx.beginPath();
      ctx.moveTo(headX, headY - col.spacing * 0.35);
      ctx.lineTo(headX, headY + col.length * col.spacing * 0.54);
      ctx.stroke();

      ctx.font = `${col.size}px ui-monospace, Menlo, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < col.length; i++) {
        const y = headY - i * col.spacing;
        if (y < -col.size * 2 || y > height + col.size * 2) continue;
        const fade = 1 - i / col.length;
        const highlight = i === 0 ? 0.32 : i < 3 ? 0.14 : 0;
        const alpha = clamp(col.alpha * fade * fade + highlight + pointerBoost * 0.07 * fade, 0, 0.92);
        if (i === 0) ctx.fillStyle = `rgba(15, 60, 48, ${alpha})`;
        else if (i < 4) ctx.fillStyle = `rgba(25, 96, 76, ${alpha})`;
        else ctx.fillStyle = `rgba(38, 139, 110, ${alpha * 0.65})`;
        ctx.fillText(col.text[i], headX, y);
      }

      col.y += (col.speed + Math.abs(velocity) * 0.18) * dt * 0.38;
      if (col.y - col.length * col.spacing > height + 120 * dpr) {
        const replacement = createColumn(((columns.indexOf(col) / Math.max(1, columns.length - 1)) * columns.length) | 0, columns.length);
        col.y = -Math.random() * height * 0.45 - col.length * col.spacing;
        col.phase = replacement.phase;
        col.swing = replacement.swing;
      }
    });

    if (isVisible) {
      requestAnimationFrame(draw);
    }
  }

  resize();
  addEventListener('resize', debounce(resize, 150), { passive: true });

  const observer = new IntersectionObserver((entries) => {
    const visible = entries[0].isIntersecting;
    if (visible && !isVisible) {
      isVisible = true;
      lastTime = performance.now();
      requestAnimationFrame(draw);
    } else {
      isVisible = visible;
    }
  }, { threshold: 0, rootMargin: '150px' });
  observer.observe(canvas);

  draw(performance.now());
}

async function initWebGL() {
  const canvas = $('#webgl');
  if (!canvas || prefersReduced) return;
  let THREE;
  try { THREE = await import('../vendor/three.module.min.js'); }
  catch (e) { console.warn('WebGL unavailable', e); return; }

  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { console.warn('WebGL renderer init failed', e); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.3));

  // Memory management
  window.addEventListener('unload', () => {
    try {
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      kernel.geometry.dispose();
      kernel.material.dispose();
      torusA.geometry.dispose();
      torusA.material.dispose();
      torusB.geometry.dispose();
      torusB.material.dispose();
    } catch (e) { /* safe cleanup */ }
  }, { once: true });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 11);
  const group = new THREE.Group();
  scene.add(group);

  const particles = innerWidth < 700 ? 800 : 1600;
  const positions = new Float32Array(particles * 3);
  const original = new Float32Array(particles * 3);
  const colors = new Float32Array(particles * 3);
  const colorA = new THREE.Color(0x0f9f75);
  const colorB = new THREE.Color(0x7c3aed);
  const colorC = new THREE.Color(0xb45309);

  for (let i = 0; i < particles; i++) {
    const ring = i % 5;
    const radius = ring === 0 ? 2.3 + Math.random() * 1.3 : 2.2 + Math.random() * 6.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
    const z = radius * Math.cos(phi) * 0.62 - Math.random() * 5.6;
    positions[i * 3] = original[i * 3] = x;
    positions[i * 3 + 1] = original[i * 3 + 1] = y;
    positions[i * 3 + 2] = original[i * 3 + 2] = z;
    const c = i % 17 === 0 ? colorC : (i % 4 === 0 ? colorB : colorA);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const particleMat = new THREE.PointsMaterial({ size: 0.038, vertexColors: true, transparent: true, opacity: 0.76, blending: THREE.NormalBlending, depthWrite: false });
  const points = new THREE.Points(particleGeo, particleMat);
  group.add(points);

  const kernel = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.9, 1),
    new THREE.MeshBasicMaterial({ color: 0x0f9f75, wireframe: true, transparent: true, opacity: 0.18, blending: THREE.NormalBlending })
  );
  kernel.position.set(3.9, -0.2, -2.1);
  group.add(kernel);

  const torusA = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.85, 0.014, 170, 8, 2, 3),
    new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.24, blending: THREE.NormalBlending })
  );
  torusA.position.set(3.9, -0.2, -1.8);
  group.add(torusA);

  const torusB = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.35, 0.01, 170, 8, 3, 4),
    new THREE.MeshBasicMaterial({ color: 0xb45309, transparent: true, opacity: 0.18, blending: THREE.NormalBlending })
  );
  torusB.position.set(-3.8, 1.8, -2.4);
  group.add(torusB);

  let mouseX = 0, mouseY = 0;
  let isVisible = true;

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', debounce(resize, 150), { passive: true });
  resize();

  const clock = new THREE.Clock();
  const glFpsInterval = 1000 / 30; // Cap WebGL at 30 FPS
  let glLastFrame = performance.now();
  function tick() {
    if (!isVisible) return;
    const now = performance.now();
    const elapsed = now - glLastFrame;
    if (elapsed < glFpsInterval) {
      requestAnimationFrame(tick);
      return;
    }
    glLastFrame = now - (elapsed % glFpsInterval);
    mouseX = (globalCursor.x / innerWidth - 0.5) * 2;
    mouseY = (globalCursor.y / innerHeight - 0.5) * 2;
    const t = clock.getElapsedTime();
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = scrollY / maxScroll;
    group.rotation.y = t * 0.028 + mouseX * 0.04 + progress * 1.2;
    group.rotation.x = Math.sin(t * 0.22) * 0.035 + mouseY * 0.035;
    kernel.rotation.x += 0.004 + progress * 0.0009;
    kernel.rotation.y += 0.005;
    torusA.rotation.x += 0.005;
    torusA.rotation.y -= 0.007;
    torusB.rotation.x -= 0.003;
    torusB.rotation.y += 0.006;

    const arr = particleGeo.attributes.position.array;
    const phase = progress * Math.PI * 2;
    for (let i = 0; i < particles; i++) {
      const k = i * 3;
      const ox = original[k], oy = original[k + 1], oz = original[k + 2];
      const swirl = Math.sin(t * 0.42 + i * 0.027 + phase) * 0.15;
      arr[k] = ox + Math.cos(t * 0.18 + i) * 0.035 + swirl * (oy * .09);
      arr[k + 1] = oy + Math.sin(t * 0.25 + i * 0.31) * 0.035 - progress * 0.35;
      arr[k + 2] = oz + Math.cos(t * 0.2 + i * 0.02) * 0.06;
    }
    particleGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    if (isVisible) {
      requestAnimationFrame(tick);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries[0].isIntersecting;
    if (visible && !isVisible) {
      isVisible = true;
      clock.getDelta(); // reset clock delta to avoid large jump
      requestAnimationFrame(tick);
    } else {
      isVisible = visible;
    }
  }, { threshold: 0 });
  observer.observe(canvas);

  tick();
}




function initProcessorCanvas() {
  const backCanvas = $('#processorRainBack');
  const frontCanvas = $('#processorRainFront');
  const core = $('#processorCore');
  const logo = $('#processorCenterLogo');
  if (!backCanvas || !frontCanvas || !core) return;
  if (prefersReduced) {
    if (logo) logo.style.transform = 'translate3d(0,0,0) scale(1)';
    return;
  }

  const backCtx = backCanvas.getContext('2d');
  const frontCtx = frontCanvas.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 1.7);
  const rootStyles = getComputedStyle(document.documentElement);
  const monoFont = rootStyles.getPropertyValue('--mono').trim() || 'ui-monospace, monospace';
  const chars = ['0', '1'];
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, glow: 0 };
  const logoMotion = { x: 0, y: 0, r: 0 };
  const layers = { back: [], front: [] };
  let width = 1, height = 1, rect = core.getBoundingClientRect();
  let lastTime = performance.now();

  function randomDigit() {
    return chars[(Math.random() * chars.length) | 0];
  }

  function fillDigits(stream) {
    stream.text = Array.from({ length: stream.length }, randomDigit);
  }

  function resetStream(stream, randomY = false) {
    stream.x = width * (0.08 + Math.random() * 0.84);
    stream.y = randomY
      ? Math.random() * (height + stream.length * stream.size) - stream.length * stream.size
      : -(Math.random() * height * 0.55) - stream.length * stream.size;
    stream.swing = (Math.random() - 0.5) * width * (stream.layer === 'front' ? 0.05 : 0.07);
    stream.phase = Math.random() * Math.PI * 2;
    fillDigits(stream);
  }

  function seedLayer(name, specs) {
    layers[name].length = 0;
    specs.forEach((spec) => {
      for (let i = 0; i < spec.count; i++) {
        const stream = {
          layer: name,
          depth: spec.depth,
          size: spec.size * (0.92 + Math.random() * 0.3),
          speed: spec.minSpeed + Math.random() * (spec.maxSpeed - spec.minSpeed),
          alpha: spec.alphaA + Math.random() * (spec.alphaB - spec.alphaA),
          length: spec.minLength + ((Math.random() * (spec.maxLength - spec.minLength + 1)) | 0),
          lineAlpha: spec.lineAlpha,
          x: 0,
          y: 0,
          swing: 0,
          phase: 0,
          text: []
        };
        resetStream(stream, true);
        layers[name].push(stream);
      }
    });
    layers[name].sort((a, b) => a.depth - b.depth);
  }

  function seedStreams() {
    const backSpecs = innerWidth < 700
      ? [
          { count: 22, size: 11.5 * dpr, minSpeed: 42, maxSpeed: 64, alphaA: 0.11, alphaB: 0.22, depth: 0.26, minLength: 12, maxLength: 20, lineAlpha: 0.12 },
          { count: 16, size: 14.5 * dpr, minSpeed: 56, maxSpeed: 82, alphaA: 0.18, alphaB: 0.30, depth: 0.56, minLength: 14, maxLength: 22, lineAlpha: 0.16 },
          { count: 10, size: 18 * dpr, minSpeed: 72, maxSpeed: 106, alphaA: 0.24, alphaB: 0.38, depth: 0.90, minLength: 16, maxLength: 24, lineAlpha: 0.19 }
        ]
      : [
          { count: 34, size: 12.5 * dpr, minSpeed: 42, maxSpeed: 68, alphaA: 0.10, alphaB: 0.22, depth: 0.24, minLength: 13, maxLength: 22, lineAlpha: 0.12 },
          { count: 24, size: 16.5 * dpr, minSpeed: 58, maxSpeed: 92, alphaA: 0.17, alphaB: 0.32, depth: 0.58, minLength: 15, maxLength: 24, lineAlpha: 0.16 },
          { count: 14, size: 21 * dpr, minSpeed: 76, maxSpeed: 118, alphaA: 0.24, alphaB: 0.42, depth: 0.94, minLength: 17, maxLength: 26, lineAlpha: 0.19 }
        ];
    const frontSpecs = innerWidth < 700
      ? [
          { count: 12, size: 15 * dpr, minSpeed: 50, maxSpeed: 78, alphaA: 0.18, alphaB: 0.34, depth: 0.78, minLength: 10, maxLength: 18, lineAlpha: 0.12 },
          { count: 9, size: 19 * dpr, minSpeed: 62, maxSpeed: 92, alphaA: 0.24, alphaB: 0.42, depth: 1.10, minLength: 11, maxLength: 19, lineAlpha: 0.14 }
        ]
      : [
          { count: 19, size: 16 * dpr, minSpeed: 52, maxSpeed: 82, alphaA: 0.18, alphaB: 0.34, depth: 0.80, minLength: 10, maxLength: 18, lineAlpha: 0.12 },
          { count: 16, size: 21 * dpr, minSpeed: 66, maxSpeed: 98, alphaA: 0.24, alphaB: 0.44, depth: 1.14, minLength: 11, maxLength: 20, lineAlpha: 0.15 }
        ];
    seedLayer('back', backSpecs);
    seedLayer('front', frontSpecs);
  }

  function resize() {
    rect = core.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width * 1.22 * dpr));
    height = Math.max(1, Math.floor(rect.height * 1.1 * dpr));
    [backCanvas, frontCanvas].forEach((canvas) => {
      canvas.width = width;
      canvas.height = height;
    });
    seedStreams();
  }

  function onPointerMove(e) {
    const nx = (e.clientX - (rect.left + rect.width * 0.5)) / Math.max(1, rect.width * 0.5);
    const ny = (e.clientY - (rect.top + rect.height * 0.5)) / Math.max(1, rect.height * 0.5);
    pointer.tx = clamp(nx, -1.18, 1.18);
    pointer.ty = clamp(ny, -1.18, 1.18);
    pointer.glow = 1;
  }

  function onPointerLeave() {
    pointer.tx = 0;
    pointer.ty = 0;
  }

  core.addEventListener('pointermove', onPointerMove, { passive: true });
  core.addEventListener('pointerleave', onPointerLeave, { passive: true });

  let lastCx = -9999, lastCy = -9999, lastRadius = -9999, lastGlowVal = -9999, cachedGlow = null;

  function drawBackdrop(ctx, t) {
    const cx = width * (0.5 + pointer.x * 0.03);
    const cy = height * (0.5 + pointer.y * 0.038);
    const radius = Math.min(width, height) * 0.36;
    const glowVal = pointer.glow;

    if (Math.abs(cx - lastCx) > 0.5 || Math.abs(cy - lastCy) > 0.5 || Math.abs(radius - lastRadius) > 0.5 || Math.abs(glowVal - lastGlowVal) > 0.02 || !cachedGlow) {
      lastCx = cx;
      lastCy = cy;
      lastRadius = radius;
      lastGlowVal = glowVal;
      cachedGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      cachedGlow.addColorStop(0, `rgba(15,159,117,${0.045 + glowVal * 0.015})`);
      cachedGlow.addColorStop(0.30, 'rgba(124,58,237,0.022)');
      cachedGlow.addColorStop(0.60, 'rgba(217,119,6,0.012)');
      cachedGlow.addColorStop(1, 'rgba(253,247,226,0)');
    }
    ctx.fillStyle = cachedGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(42,37,27,0.04)';
    ctx.lineWidth = 1.1 * dpr;
    for (let i = 0; i < 9; i++) {
      const offset = i / 8 - 0.5;
      const x = width * 0.5 + offset * width * 0.62 + pointer.x * 14 * (i + 1) * 0.08;
      ctx.beginPath();
      ctx.moveTo(x, height * 0.08);
      ctx.lineTo(x + Math.sin(t * 0.82 + i) * 16 * dpr, height * 0.92);
      ctx.stroke();
    }
  }

  function drawLayer(ctx, streams, layerName, t, dt) {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
    if (layerName === 'back') drawBackdrop(ctx, t);

    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const logoRadius = Math.min(width, height) * 0.14;
    const pointerX = centerX + pointer.x * width * 0.18;
    const pointerY = centerY + pointer.y * height * 0.18;

    streams.forEach((stream) => {
      if (Math.random() > (layerName === 'front' ? 0.82 : 0.88)) stream.text[(Math.random() * stream.text.length) | 0] = randomDigit();

      const sway = Math.sin(t * (0.56 + stream.depth * 0.35) + stream.phase) * stream.swing;
      const parallaxX = pointer.x * 34 * stream.depth * dpr;
      const parallaxY = pointer.y * 16 * stream.depth * dpr;
      const x = stream.x + sway + parallaxX;
      const headY = stream.y + parallaxY;

      const distCenterX = Math.abs(x - centerX);
      const centerFactor = layerName === 'back' && distCenterX < logoRadius * 1.3 ? 0.52 : 1;
      const distPointer = Math.hypot(x - pointerX, headY - pointerY);
      const pointerBoost = clamp(1 - distPointer / (Math.min(width, height) * 0.24), 0, 1);

      ctx.font = `${stream.size}px ${monoFont}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = `rgba(15, 159, 117, ${clamp(stream.lineAlpha * centerFactor * 0.45 + pointerBoost * 0.05, 0, 0.22)})`;
      ctx.lineWidth = Math.max(1, stream.depth * dpr * 0.84);
      ctx.beginPath();
      ctx.moveTo(x, headY + stream.size * 0.36);
      ctx.lineTo(x, headY + stream.size * stream.length * 0.56);
      ctx.stroke();

      for (let i = 0; i < stream.length; i++) {
        const y = headY - i * stream.size * 0.8;
        if (y < -stream.size * 1.5 || y > height + stream.size * 1.5) continue;
        const fade = 1 - i / stream.length;
        const distanceToLogo = Math.hypot(x - centerX, y - centerY);
        const logoOcclusion = layerName === 'back' && distanceToLogo < logoRadius ? 0.42 : 1;
        let alpha = stream.alpha * fade * fade * centerFactor * logoOcclusion + pointerBoost * 0.08 * fade + (layerName === 'front' ? 0.035 * fade : 0);
        alpha = clamp(alpha, 0, 0.92);
        let color = `rgba(42, 37, 27, ${alpha})`;
        if (i === 0) color = `rgba(15, 159, 117, ${clamp(alpha + (layerName === 'front' ? 0.26 : 0.14), 0, 0.92)})`;
        else if (i < 3) color = `rgba(124, 58, 237, ${clamp(alpha * 1.22, 0, layerName === 'front' ? 0.72 : 0.78)})`;
        ctx.fillStyle = color;
        ctx.fillText(stream.text[i], x, y);
      }

      const accel = 1 + pointerBoost * 0.12;
      stream.y += stream.speed * dt * 0.046 * accel;
      if (stream.y - stream.length * stream.size > height + 96 * dpr) resetStream(stream, false);
    });
  }

  let isVisible = true;

  function animateLogo(now) {
    if (!logo) return;
    logoMotion.x = lerp(logoMotion.x, pointer.tx, 0.075);
    logoMotion.y = lerp(logoMotion.y, pointer.ty, 0.075);
    logoMotion.r = lerp(logoMotion.r, pointer.tx * 5.8, 0.055);
    const fx = Math.sin(now * 0.0011) * 6 + logoMotion.x * 20;
    const fy = Math.cos(now * 0.00135) * 7 + logoMotion.y * 15;
    const scale = 1 + Math.sin(now * 0.0016) * 0.03 + pointer.glow * 0.015;
    logo.style.transform = `translate3d(${fx}px, ${fy}px, 0) rotate(${logoMotion.r}deg) scale(${scale})`;
  }

  const fpsInterval = 1000 / 40; // Cap a 40 FPS
  let lastFrameTime = performance.now();

  function draw(now) {
    if (!isVisible) return;
    const elapsed = now - lastFrameTime;
    if (elapsed < fpsInterval) {
      requestAnimationFrame(draw);
      return;
    }
    lastFrameTime = now - (elapsed % fpsInterval);

    const dt = Math.min(2.2, (now - lastTime) / 16.6667 || 1);
    lastTime = now;
    pointer.x = lerp(pointer.x, pointer.tx, 0.08);
    pointer.y = lerp(pointer.y, pointer.ty, 0.08);
    pointer.glow = lerp(pointer.glow, pointer.tx || pointer.ty ? 1 : 0.46, 0.05);

    drawLayer(backCtx, layers.back, 'back', now * 0.001, dt);
    drawLayer(frontCtx, layers.front, 'front', now * 0.00145, dt);
    animateLogo(now);
    if (isVisible) {
      requestAnimationFrame(draw);
    }
  }

  resize();
  addEventListener('resize', debounce(resize, 150), { passive: true });

  const observer = new IntersectionObserver((entries) => {
    const visible = entries[0].isIntersecting;
    if (visible && !isVisible) {
      isVisible = true;
      lastTime = performance.now();
      requestAnimationFrame(draw);
    } else {
      isVisible = visible;
    }
  }, { threshold: 0, rootMargin: '150px' });
  observer.observe(core);

  draw(performance.now());
}

function initGSAP() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger || prefersReduced) {
    $$('.reveal').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
    $$('.stage-card').forEach((el) => { el.style.position = 'relative'; el.style.opacity = 1; el.style.visibility = 'visible'; el.style.marginBottom = '16px'; });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ force3D: true, nullTargetWarn: false });
  gsap.defaults({ ease: 'power3.out' });

  gsap.to('.boot img', { rotate: 360, duration: 2.2, ease: 'none', repeat: -1 });

  $$('.reveal').forEach((el) => {
    if (el.closest('.hero')) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(el, { y: 28, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: .82,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 68%', scrub: 0.32 }
    });
  });

  gsap.from('.hero-title > span', {
    yPercent: 112,
    opacity: 0,
    rotateX: -30,
    transformOrigin: 'left bottom',
    stagger: 0.12,
    duration: 1.4,
    ease: 'expo.out',
    delay: 0.18
  });

  gsap.fromTo('.hero__actions .btn, .metrics > div', { y: 18, opacity: 0 }, {
    y: 0,
    opacity: 1,
    duration: 1.05,
    stagger: 0.08,
    ease: 'power3.out',
    delay: 0.42
  });

  gsap.to('.hero:not(.page-hero) .hero__machine', {
    y: -92,
    rotateZ: 2.4,
    ease: 'none',
    scrollTrigger: { trigger: '.hero:not(.page-hero)', start: 'top top', end: 'bottom top', scrub: 1.2 }
  });
  gsap.to('.hero:not(.page-hero) .hero__content', {
    y: 64,
    opacity: .72,
    ease: 'none',
    scrollTrigger: { trigger: '.hero:not(.page-hero)', start: '55% top', end: 'bottom top', scrub: 1.12 }
  });

  gsap.to('.hero:not(.page-hero) .machine-card', {
    rotateY: -7,
    rotateX: 3.4,
    y: -26,
    ease: 'none',
    scrollTrigger: { trigger: '.hero:not(.page-hero)', start: 'top top', end: 'bottom top', scrub: 1.15 }
  });
  gsap.to('.hero:not(.page-hero) .runtime-brief', {
    y: -18,
    rotate: -2.4,
    ease: 'none',
    scrollTrigger: { trigger: '.hero:not(.page-hero)', start: 'top top', end: 'bottom top', scrub: 1.18 }
  });

  // Processor rain now stays independent from scroll. Motion comes from the local cursor field only.
  gsap.fromTo('.chip-hud', { autoAlpha: 0, y: 28, scale: .97 }, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    stagger: .14,
    duration: 1.05,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.processor-visual', start: 'top 68%', toggleActions: 'play none none reverse' }
  });

  const cards = $$('.stage-card');
  if (cards.length) {
    const compactPipeline = window.matchMedia('(max-width: 980px)').matches;

    if (compactPipeline) {
      cards.forEach((card) => {
        card.classList.add('is-active');
        card.style.pointerEvents = 'auto';
      });
      gsap.set(cards, { clearProps: 'all' });
      gsap.set('.progress-rail span', { width: '100%' });
    } else {
      gsap.set(cards, { autoAlpha: 0, y: 96, scale: .945, rotateX: 10, pointerEvents: 'none' });
      gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, pointerEvents: 'auto' });
      cards[0].classList.add('is-active');

      const progressRailSpan = document.querySelector('.progress-rail span');
      let activeCardIndex = -1;

      const setActive = (index) => {
        if (index === activeCardIndex) return;
        activeCardIndex = index;
        cards.forEach((card, i) => {
          const isActive = i === index;
          card.classList.toggle('is-active', isActive);
          card.style.pointerEvents = isActive ? 'auto' : 'none';
          card.style.zIndex = isActive ? String(cards.length + 2) : String(i + 1);
        });
      };

      const syncActiveFromRenderedCard = () => {
        let bestIndex = 0;
        let bestScore = -Infinity;
        cards.forEach((card, i) => {
          const opacity = Number(gsap.getProperty(card, 'opacity')) || 0;
          const y = Math.abs(Number(gsap.getProperty(card, 'y')) || 0);
          const score = opacity - y * 0.002;
          if (score > bestScore) {
            bestScore = score;
            bestIndex = i;
          }
        });
        setActive(bestIndex);
      };

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', overwrite: 'auto' },
        onUpdate: syncActiveFromRenderedCard,
        scrollTrigger: {
          trigger: '.pipeline',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.72,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRailSpan) progressRailSpan.style.width = `${self.progress * 100}%`;
          }
        }
      });

      cards.forEach((card, i) => {
        gsap.set(card, { zIndex: i + 1 });
        const at = i * 1.08;
        tl.to(card, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .48 }, at);
        tl.to(card, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .42 }, at + .48);
        if (i < cards.length - 1) tl.to(card, { autoAlpha: 0, y: -92, scale: .945, rotateX: -9, duration: .46 }, at + .92);
      });

      syncActiveFromRenderedCard();
    }

    gsap.to('.pipeline-orbit', {
      rotate: 28,
      scale: 1.09,
      ease: 'none',
      scrollTrigger: { trigger: '.pipeline', start: 'top bottom', end: 'bottom top', scrub: 1.15 }
    });
  }

  gsap.to('.marquee--left .marquee__track', {
    xPercent: -9,
    ease: 'none',
    scrollTrigger: { trigger: '.marquee-section', start: 'top bottom', end: 'bottom top', scrub: 1.2 }
  });
  gsap.to('.marquee--right .marquee__track', {
    xPercent: 9,
    ease: 'none',
    scrollTrigger: { trigger: '.marquee-section', start: 'top bottom', end: 'bottom top', scrub: 1.2 }
  });

  // General Panel Animation
  $$('.lab-console, .cta-card, .status-note').forEach((panel) => {
    gsap.fromTo(panel, { y: 28, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: .86,
      ease: 'power3.out',
      scrollTrigger: { trigger: panel, start: 'top 78%', toggleActions: 'play none none reverse' }
    });
  });

  // Responsive Media Query helper
  let mm = gsap.matchMedia();

  // 1. Capacidades
  const capCards = $$('.cap-card');
  $$('.cap-system__brief, .cap-card').forEach((block, index) => {
    gsap.fromTo(block, { y: 26, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.72,
      delay: Math.min(index * 0.035, 0.18),
      ease: 'power3.out',
      scrollTrigger: { trigger: block, start: 'top 86%', toggleActions: 'play none none reverse' }
    });
  });

  if (capCards.length) {
    const activateCap = (target) => {
      capCards.forEach((card) => card.classList.toggle('is-active', card === target));
    };
    capCards.forEach((card) => {
      card.addEventListener('mouseenter', () => activateCap(card));
      card.addEventListener('focusin', () => activateCap(card));
    });
  }

  // 2. Soberania de Dados (3D Card Stack)
  const deckWrapper = $('.deck-wrapper');
  const deckCards = $$('.deck-card');
  if (deckWrapper && deckCards.length) {
    mm.add("(min-width: 981px)", () => {
      gsap.set(deckCards[0], { zIndex: 3, transformOrigin: "center bottom" });
      gsap.set(deckCards[1], { zIndex: 2, scale: 0.92, y: 30, rotateX: -5, opacity: 0.8, transformOrigin: "center bottom" });
      gsap.set(deckCards[2], { zIndex: 1, scale: 0.84, y: 60, rotateX: -10, opacity: 0.5, transformOrigin: "center bottom" });

      let activeDeckIndex = -1;
      const syncDeckState = () => {
        let bestIndex = 0;
        let bestOpacity = -Infinity;
        deckCards.forEach((card, i) => {
          const opacity = Number(gsap.getProperty(card, 'opacity')) || 0;
          if (opacity > bestOpacity) {
            bestOpacity = opacity;
            bestIndex = i;
          }
        });
        if (bestIndex === activeDeckIndex) return;
        activeDeckIndex = bestIndex;
        deckCards.forEach((card, i) => {
          const isActive = i === bestIndex;
          card.classList.toggle('active', isActive);
          card.style.pointerEvents = isActive ? 'auto' : 'none';
          card.style.zIndex = isActive ? String(deckCards.length + 2) : String(deckCards.length - i);
        });
      };

      const tl = gsap.timeline({
        onUpdate: syncDeckState,
        scrollTrigger: {
          trigger: '.proof-deck-section',
          start: 'top top',
          end: () => `+=${innerHeight * 2}`,
          pin: true,
          scrub: 0.85,
          invalidateOnRefresh: true,
        }
      });

      tl.to(deckCards[0], {
        x: -150,
        y: -80,
        rotation: -8,
        scale: 0.9,
        opacity: 0,
        ease: 'power1.inOut'
      })
      .to(deckCards[1], {
        scale: 1,
        y: 0,
        rotateX: 0,
        opacity: 1,
        ease: 'power1.inOut'
      }, 0)
      .to(deckCards[2], {
        scale: 0.92,
        y: 30,
        rotateX: -5,
        opacity: 0.8,
        ease: 'power1.inOut'
      }, 0);

      tl.to(deckCards[1], {
        x: 150,
        y: -80,
        rotation: 8,
        scale: 0.9,
        opacity: 0,
        ease: 'power1.inOut'
      })
      .to(deckCards[2], {
        scale: 1,
        y: 0,
        rotateX: 0,
        opacity: 1,
        ease: 'power1.inOut'
      }, '>');

      syncDeckState();
    });

    mm.add("(max-width: 980px)", () => {
      gsap.set(deckCards, { clearProps: 'all' });
    });
  }

  // 3. Produto Switcher (Tabs & Previews)
  const switcherContainer = $('.product-switcher-container');
  const tabs = $$('.switcher-tab');
  const panels = $$('.switcher-panel');
  const slider = $('.switcher-slider');

  if (switcherContainer && tabs.length && panels.length && slider) {
    const updateSlider = (activeTab) => {
      const parentRect = activeTab.parentElement.getBoundingClientRect();
      const rect = activeTab.getBoundingClientRect();
      gsap.to(slider, {
        left: rect.left - parentRect.left,
        width: rect.width,
        duration: 0.38,
        ease: 'power3.out'
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        panels.forEach(p => p.classList.remove('active'));
        const targetId = `panel-${tab.dataset.target}`;
        const targetPanel = $(`#${targetId}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
          gsap.fromTo(targetPanel.querySelectorAll('.panel-info > *, .panel-preview'), 
            { y: 15, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
          );
        }
        updateSlider(tab);
      });
    });

    window.addEventListener('resize', () => {
      const activeTab = $('.switcher-tab.active');
      if (activeTab) updateSlider(activeTab);
    });

    setTimeout(() => {
      const activeTab = $('.switcher-tab.active');
      if (activeTab) updateSlider(activeTab);
    }, 200);
  }

  // 4. BI MVP (Spreadsheet Simulator)
  const mvpSteps = $$('.mvp-step');
  const mvpSheetTitle = $('#mvp-sheet-title');
  const mvpSheetStatus = $('#mvp-sheet-status');
  const mvpSheetTable = $('#mvp-sheet-table');
  const mvpInsightTitle = $('#mvp-insight-title');
  const mvpInsightSummary = $('#mvp-insight-summary');
  const mvpInsightList = $('#mvp-insight-list');

  if (mvpSteps.length && mvpSheetTitle && mvpSheetStatus && mvpSheetTable && mvpInsightTitle && mvpInsightSummary && mvpInsightList) {
    const data = [
      {
        title: "OBJETIVOS_2026.XLSX",
        status: "PRONTO // LOCAL",
        table: `<thead><tr><th>Objetivo</th><th>Como medir</th><th>Peso</th><th>Status</th></tr></thead>
<tbody>
  <tr><td>Leitura local</td><td>Arquivo aberto sem upload automático</td><td>40%</td><td>Em teste</td></tr>
  <tr><td>Paridade BI</td><td>Comparar totais com revisão manual</td><td>40%</td><td>Em teste</td></tr>
  <tr><td>Experiência</td><td>10 dias com operadores reais</td><td>20%</td><td>Ativo</td></tr>
</tbody>`,
        insightTitle: "Arquivo recebido",
        insight: "A planilha entra no workspace local e o Aether mostra o que será analisado antes de gerar qualquer saída.",
        points: ["Abas reconhecidas", "Objetivos claros", "Riscos de envio reduzidos"]
      },
      {
        title: "METRICAS_BI.XLSX",
        status: "MEDINDO // QUALIDADE",
        table: `<thead><tr><th>Método</th><th>Tempo</th><th>Precisão</th><th>Revisão</th></tr></thead>
<tbody>
  <tr><td>Revisão manual</td><td>45m</td><td>Referência</td><td>Verificada</td></tr>
  <tr><td>Aether local</td><td>1.8s</td><td>99.6%</td><td>Comparada</td></tr>
  <tr><td>Ajuste humano</td><td>2m</td><td>Final</td><td>Aprovada</td></tr>
</tbody>`,
        insightTitle: "Medição legível",
        insight: "O preview mostra tempo economizado, diferença contra revisão manual e onde o operador ainda precisa validar.",
        points: ["Precisão comparada", "Tempo reduzido", "Revisão humana preservada"]
      },
      {
        title: "ROTINA_TESTADORES.XLSX",
        status: "PILOTO // 10 DIAS",
        table: `<thead><tr><th>Perfil</th><th>Empresa</th><th>Dia</th><th>Rotina</th></tr></thead>
<tbody>
  <tr><td>Financeiro</td><td>Série B S/A</td><td>4/10</td><td>Conciliação bancária</td></tr>
  <tr><td>Controladoria</td><td>Logística Ltda</td><td>9/10</td><td>Forecast trimestral</td></tr>
  <tr><td>Diretoria</td><td>Varejo Corp</td><td>2/10</td><td>Custo operacional</td></tr>
</tbody>`,
        insightTitle: "Uso no mundo real",
        insight: "A validação acompanha tarefas de rotina e registra onde a análise ajuda mais sem esconder aprovação e revisão.",
        points: ["Cenários reais", "Feedback por perfil", "Adoção medida por tarefa"]
      },
      {
        title: "DATALAKE_LOCAL.DB",
        status: "CRUZANDO // MULTI-XLSX",
        table: `<thead><tr><th>Planilha</th><th>Registros</th><th>Relação</th><th>Chave</th></tr></thead>
<tbody>
  <tr><td>Vendas_2025</td><td>15.400 linhas</td><td>Cliente</td><td>vendas_id</td></tr>
  <tr><td>Clientes_CRM</td><td>2.200 linhas</td><td>Cliente</td><td>crm_id</td></tr>
  <tr><td>Metas_Anual</td><td>12 linhas</td><td>Mês/Ano</td><td>meta_id</td></tr>
</tbody>`,
        insightTitle: "Relações encontradas",
        insight: "Em vez de mostrar consulta técnica, o painel explica quais planilhas conversam entre si e qual relatório pode sair dali.",
        points: ["Cliente liga vendas ao CRM", "Metas entram por mês", "Relatório consolidado sugerido"]
      },
      {
        title: "RELATORIO_OUTPUT.XLSX",
        status: "APROVADO // SAÍDA",
        table: `<thead><tr><th>Ação</th><th>O que muda</th><th>Aprovação</th><th>Status</th></tr></thead>
<tbody>
  <tr><td>Ler arquivo</td><td>Sem alteração</td><td>Permitida</td><td>Concluído</td></tr>
  <tr><td>Salvar XLSX</td><td>Novo relatório</td><td>Operador aprovou</td><td>Pronto</td></tr>
  <tr><td>Exportar PDF</td><td>Cópia executiva</td><td>Operador aprovou</td><td>Pronto</td></tr>
</tbody>`,
        insightTitle: "Saída sob controle",
        insight: "A alteração no arquivo aparece como ação sensível, com autorização visível antes da gravação.",
        points: ["Novo XLSX criado", "PDF opcional", "Trilha de aprovação registrada"]
      },
      {
        title: "VALOR_RETORNO.XLSX",
        status: "CONCLUÍDO // DECISÃO",
        table: `<thead><tr><th>Pilar</th><th>Antes</th><th>Com Aether</th><th>Valor final</th></tr></thead>
<tbody>
  <tr><td>Privacidade</td><td>Envio difícil de governar</td><td>Local-first</td><td>Exposição reduzida</td></tr>
  <tr><td>Velocidade</td><td>Rotina manual</td><td>Automação assistida</td><td>Tempo recuperado</td></tr>
  <tr><td>Governança</td><td>Aprovação dispersa</td><td>Gate explícito</td><td>Trilha auditável</td></tr>
</tbody>`,
        insightTitle: "Decisão mais clara",
        insight: "O resultado final fala a língua do negócio: o que mudou, que risco foi reduzido e qual decisão ficou mais fácil.",
        points: ["Resumo executivo", "Anexos prontos", "Próxima ação destacada"]
      }
    ];

    const activateStep = (idx) => {
      mvpSteps.forEach((step, sIdx) => {
        step.classList.toggle('active', sIdx === idx);
      });
      mvpSheetTitle.textContent = data[idx].title;
      mvpSheetStatus.textContent = data[idx].status;
      mvpSheetTable.innerHTML = data[idx].table;
      mvpInsightTitle.textContent = data[idx].insightTitle;
      mvpInsightSummary.textContent = data[idx].insight;
      mvpInsightList.innerHTML = data[idx].points.map((point) => `<span>${point}</span>`).join('');

      gsap.fromTo(mvpSheetTable.querySelectorAll('tbody tr'), 
        { opacity: 0, x: -8 }, 
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      );
      gsap.fromTo(mvpInsightList.querySelectorAll('span'),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.28, stagger: 0.045, ease: 'power2.out' }
      );
    };

    mvpSteps.forEach((step, idx) => {
      step.addEventListener('click', () => activateStep(idx));
      step.addEventListener('mouseenter', () => activateStep(idx));
    });

    mm.add("(min-width: 981px)", () => {
      ScrollTrigger.create({
        trigger: '.mvp-interactive-container',
        start: 'top 60%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * mvpSteps.length), mvpSteps.length - 1);
          activateStep(idx);
        }
      });
    });

    activateStep(0);
  }

  // 5. Glowing Scroll-Driven Timeline
  const timelineContainer = $('.timeline-container');
  const timelineItems = $$('.timeline-item');
  const timelineGlow = $('.timeline-line-glow');

  if (timelineContainer && timelineItems.length && timelineGlow) {
    ScrollTrigger.create({
      trigger: timelineContainer,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(timelineGlow, { height: `${progress * 100}%` });
        
        const count = timelineItems.length;
        timelineItems.forEach((item, idx) => {
          const threshold = (idx) / (count - 1 || 1);
          if (progress >= threshold * 0.95) {
            item.classList.add('active');
          } else {
            if (idx > 0) item.classList.remove('active');
          }
        });
      }
    });
  }

  // 6. Scroll-Highlight Vision Spans
  const visionSpans = $$('.vision-inner p span');
  if (visionSpans.length) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.vision',
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: 0.5,
      }
    });
    visionSpans.forEach((span) => {
      tl.to(span, {
        color: '#2a251b',
        textShadow: 'none',
        duration: 0.3
      }, '+=0.05');
    });
  }

  addEventListener('load', () => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, { once: true });

  $$('.semantic-grid').forEach((grid) => {
    const semanticCards = $$('.semantic-card', grid);
    if (!semanticCards.length) return;
    gsap.fromTo(semanticCards, { y: 32, opacity: 0, scale: 0.97 }, {
      y: 0, opacity: 1, scale: 1,
      duration: 0.7, stagger: 0.06, ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: grid, start: 'top 82%', toggleActions: 'play none none none' }
    });
  });

  $$('.validation-grid').forEach((grid) => {
    const validationCards = $$('.validation-card', grid);
    if (!validationCards.length) return;
    gsap.fromTo(validationCards, { y: 28, opacity: 0, scale: 0.97 }, {
      y: 0, opacity: 1, scale: 1,
      duration: 0.7, stagger: 0.08, ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: grid, start: 'top 82%', toggleActions: 'play none none none' }
    });
  });

  const animateMotionGroup = (rootSelector, itemSelector, options = {}) => {
    $$(rootSelector).forEach((root) => {
      if (root.classList.contains('reveal') && !options.allowRevealRoot) return;

      const targets = $$(itemSelector, root).filter((item) => (
        !item.dataset.motionDone
        && !item.classList.contains('reveal')
      ));
      if (!targets.length) return;

      targets.forEach((item) => { item.dataset.motionDone = 'true'; });
      const motionVars = {
        y: options.y ?? 26,
        x: options.x ?? 0,
        opacity: 0,
        scale: options.scale ?? 0.985
      };
      const settleVars = {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: options.duration ?? 0.72,
        stagger: options.stagger ?? 0.065,
        ease: options.ease ?? 'power3.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: root,
          start: options.start ?? 'top 84%',
          toggleActions: options.toggleActions ?? 'play none none none'
        }
      };
      if (options.clearTransform) settleVars.clearProps = 'transform';
      gsap.fromTo(targets, motionVars, settleVars);
    });
  };

  [
    ['.trinity-grid', '.trinity-card'],
    ['.cap-grid', '.cap'],
    ['.audiences-grid', '.audience-card'],
    ['.runtime-stack__track', '.stack-card', { x: 20, y: 0, scale: 0.99, stagger: 0.035, start: 'top 86%', clearTransform: true }],
    ['.compare-table tbody', 'tr', { y: 18, scale: 1, stagger: 0.045, start: 'top 88%', clearTransform: true }],
    ['.faq-accordion-wrapper', '.faq-item', { y: 18, stagger: 0.075, allowRevealRoot: true, clearTransform: true }],
    ['.cta-side', ':scope > div'],
    ['.mvp-steps', '.mvp-step'],
    ['.timeline-items', '.timeline-item', { x: -18, y: 0, stagger: 0.085 }],
    ['.product-switcher-container', '.switcher-tab'],
    ['.section-heading', ':scope > *', { y: 18, stagger: 0.055 }],
    ['.validation-roadmap', '.validation-roadmap__head, .validation-steps li', { y: 18, stagger: 0.065, allowRevealRoot: true, clearTransform: true }],
    ['.proof-grid, .status-grid', '.cap, .status-note']
  ].forEach(([rootSelector, itemSelector, options]) => {
    animateMotionGroup(rootSelector, itemSelector, options || {});
  });

  const lifeWords = $$('.life-scroll__word');
  const lifeTrack = $('.life-scroll__track');
  const lifeFrame = $('.life-scroll__frame');
  if (lifeWords.length && lifeTrack) {
    const wordHeight = () => lifeWords[0]?.getBoundingClientRect().height || 96;
    const setLifeProgress = (progress = 0) => {
      const holdAdjusted = clamp(progress / 0.82, 0, 1);
      const index = clamp(Math.round(holdAdjusted * (lifeWords.length - 1)), 0, lifeWords.length - 1);
      const y = -(wordHeight() * (lifeWords.length - 1) * holdAdjusted);
      gsap.set(lifeTrack, { y });
      lifeWords.forEach((word, i) => word.classList.toggle('is-active', i === index));
      if (lifeFrame) {
        lifeFrame.classList.add('is-live');
        lifeFrame.style.setProperty('--px', `${30 + holdAdjusted * 46}%`);
        lifeFrame.style.setProperty('--py', `${42 + Math.sin(holdAdjusted * Math.PI) * 18}%`);
      }
    };

    ScrollTrigger.create({
      trigger: '.life-scroll',
      start: 'top top',
      end: () => `+=${Math.max(innerHeight * 4.8, lifeWords.length * innerHeight * 0.92)}`,
      scrub: 1.08,
      invalidateOnRefresh: true,
      onUpdate: (self) => setLifeProgress(self.progress),
      onEnter: () => lifeFrame?.classList.add('is-live'),
      onLeave: () => setLifeProgress(1),
      onLeaveBack: () => setLifeProgress(0)
    });

    gsap.fromTo('.life-scroll__frame', { scale: .98, opacity: .82 }, {
      scale: 1,
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.life-scroll', start: 'top 78%', end: 'top 30%', scrub: .72 }
    });

    gsap.to('.life-scroll__meta span', {
      y: -10,
      opacity: .9,
      stagger: .08,
      ease: 'none',
      scrollTrigger: { trigger: '.life-scroll', start: 'top 65%', end: 'center center', scrub: .85 }
    });

    setLifeProgress(0);
  }

}

function initTiltCards() {
  if (prefersReduced) return;
  $$('.tilt-card').forEach((card) => {
    if (card.closest('.hero__machine')) return;

    let rect;
    card.addEventListener('pointerenter', () => { rect = card.getBoundingClientRect(); });
    card.addEventListener('pointermove', (e) => {
      rect ||= card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const ry = (x - .5) * 3.2;
      const rx = -((y - .5) * 3.2);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      card.style.transform = `translate3d(0,-2px,0) perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

function initHeroMachineMagnet() {
  const machine = $('.hero__machine');
  if (!machine || prefersReduced) return;

  let rect = machine.getBoundingClientRect();
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  let active = false;

  const updateRect = () => { rect = machine.getBoundingClientRect(); };

  machine.addEventListener('pointerenter', () => {
    active = true;
    updateRect();
    machine.classList.add('is-magnetic');
  });

  machine.addEventListener('pointermove', (e) => {
    const x = (e.clientX - (rect.left + rect.width * 0.5)) / Math.max(1, rect.width * 0.5);
    const y = (e.clientY - (rect.top + rect.height * 0.5)) / Math.max(1, rect.height * 0.5);
    targetX = clamp(x, -1, 1);
    targetY = clamp(y, -1, 1);
  }, { passive: true });

  machine.addEventListener('pointerleave', () => {
    active = false;
    targetX = 0;
    targetY = 0;
    machine.classList.remove('is-magnetic');
  });

  addEventListener('resize', debounce(updateRect, 150), { passive: true });
  let scrollRAF = null;
  const onScroll = () => {
    if (!scrollRAF) {
      scrollRAF = requestAnimationFrame(() => {
        updateRect();
        scrollRAF = null;
      });
    }
  };
  addEventListener('scroll', onScroll, { passive: true });

  const tick = () => {
    currentX = lerp(currentX, targetX, active ? 0.1 : 0.075);
    currentY = lerp(currentY, targetY, active ? 0.1 : 0.075);

    machine.style.setProperty('--machine-x', `${currentX * 14}px`);
    machine.style.setProperty('--machine-y', `${currentY * 10}px`);
    machine.style.setProperty('--machine-rx', `${currentY * -2.2}deg`);
    machine.style.setProperty('--machine-ry', `${currentX * 3.4}deg`);
    machine.style.setProperty('--brief-x', `${currentX * -9}px`);
    machine.style.setProperty('--brief-y', `${currentY * -6}px`);

    requestAnimationFrame(tick);
  };

  tick();
}

function initMagnetic() {
  if (prefersReduced) return;
  $$('.magnetic').forEach((el) => {
    let rect;
    el.addEventListener('pointerenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('pointermove', (e) => {
      rect ||= el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(${x * 0.035}px, ${y * 0.045}px, 0)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

function initMarqueeSafety() {
  $$('.marquee__track').forEach((track) => {
    const groups = $$('.marquee__group', track);
    if (groups.length < 2) return;
    // Fill very wide displays, preserving a seamless 50% animation loop.
    const cloneCount = Math.ceil(innerWidth / Math.max(1, groups[0].scrollWidth));
    for (let i = 0; i < Math.max(0, cloneCount); i++) {
      track.appendChild(groups[0].cloneNode(true));
      track.appendChild(groups[1].cloneNode(true));
    }
  });
}


function initInteractivePanels() {
  if (prefersReduced) return;
  $$('.stage-card, .lab-console, .cta-card, .vision-inner, .status-note, .life-scroll__frame, .semantic-card, .validation-card').forEach((panel) => {
    let rect;
    const updateRect = () => { rect = panel.getBoundingClientRect(); };
    panel.addEventListener('pointerenter', updateRect, { passive: true });
    panel.addEventListener('pointermove', (e) => {
      rect ||= panel.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
      const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100;
      panel.style.setProperty('--px', `${x}%`);
      panel.style.setProperty('--py', `${y}%`);
    }, { passive: true });
    panel.addEventListener('pointerleave', () => {
      panel.style.removeProperty('--px');
      panel.style.removeProperty('--py');
    });
  });
}



function initAetherSlider() {
  const slider = $('[data-aether-slider]');
  if (!slider) return;
  const slides = $$('.aether-slide', slider);
  if (!slides.length) return;

  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
  let timer;

  const setActive = (index, userDriven = false) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === activeIndex);
      slide.setAttribute('aria-expanded', i === activeIndex ? 'true' : 'false');
    });
    if (userDriven) restart();
  };

  const restart = () => {
    clearInterval(timer);
    if (prefersReduced || matchMedia('(hover: none)').matches) return;
    timer = setInterval(() => setActive(activeIndex + 1), 4200);
  };

  slides.forEach((slide, index) => {
    slide.setAttribute('role', 'button');
    slide.setAttribute('tabindex', '0');
    slide.addEventListener('pointerenter', () => setActive(index, true), { passive: true });
    slide.addEventListener('click', () => setActive(index, true));
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActive(index, true);
      }
    });
  });

  slider.addEventListener('pointerenter', () => clearInterval(timer), { passive: true });
  slider.addEventListener('pointerleave', restart, { passive: true });
  setActive(activeIndex);
  restart();
}


function initSparks() {
  const gsap = window.gsap;
  const Physics2DPlugin = window.Physics2DPlugin;
  if (!gsap || prefersReduced) return;
  if (Physics2DPlugin) gsap.registerPlugin(Physics2DPlugin);
  $$('[data-sparks]').forEach((btn) => {
    btn.addEventListener('pointerenter', () => {
      for (let i = 0; i < 12; i++) {
        const s = document.createElement('i');
        s.style.position = 'fixed';
        s.style.left = `${btn.getBoundingClientRect().left + btn.offsetWidth / 2}px`;
        s.style.top = `${btn.getBoundingClientRect().top + btn.offsetHeight / 2}px`;
        s.style.width = '5px';
        s.style.height = '5px';
        s.style.borderRadius = '99px';
        s.style.background = i % 3 === 0 ? '#0f9f75' : (i % 3 === 1 ? '#7c3aed' : '#b45309');
        s.style.pointerEvents = 'none';
        s.style.zIndex = '999';
        document.body.appendChild(s);
        const angle = -120 + Math.random() * 240;
        if (Physics2DPlugin) {
          gsap.to(s, { duration: .75 + Math.random() * .25, physics2D: { velocity: 80 + Math.random() * 90, angle, gravity: 260 }, opacity: 0, scale: 0, ease: 'power2.out', onComplete: () => s.remove() });
        } else {
          gsap.to(s, { duration: .75, x: Math.cos(angle) * 80, y: Math.sin(angle) * 80, opacity: 0, scale: 0, onComplete: () => s.remove() });
        }
      }
    });
  });
}

function initForm() {
  const forms = $$('.access-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = $('button', form);
      const input = $('input', form);
      if (!btn || !input) return;
      
      const textNode = Array.from(btn.childNodes).find(node => node.nodeType === 3);
      const originalText = textNode ? textNode.textContent.trim() : '';
      
      if (textNode) {
        textNode.textContent = input.value ? 'Solicitação registrada ✓ ' : 'Digite seu email primeiro ';
      }
      
      if (input.value) {
        input.value = '';
      }
      
      setTimeout(() => {
        if (textNode) {
          textNode.textContent = originalText + ' ';
        }
      }, 1800);
    });
  });
}

// === SCROLL PROGRESS BAR ===
function initScrollProgress() {
  const bar = $('.scroll-progress');
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = window.scrollY / maxScroll;
    bar.style.transform = `scaleX(${progress})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}
initScrollProgress();

// === PAGE TRANSITIONS ===
function initPageTransitions() {
  const isInternalHref = (href) => {
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      return false;
    }

    try {
      const url = new URL(href, window.location.href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) return;

    const href = link.getAttribute('href');
    if (!isInternalHref(href)) return;

    const url = new URL(href, window.location.href);
    const isSamePageAnchor = url.pathname === window.location.pathname && url.search === window.location.search && url.hash;
    if (isSamePageAnchor) return;

    event.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => {
      window.location.href = url.href;
    }, 320);
  });
}
initPageTransitions();

initMatrixCanvas();
initWebGL();
initProcessorCanvas();
initMarqueeSafety();
initTiltCards();
initHeroMachineMagnet();
initMagnetic();
initAetherSlider();
initSparks();
initForm();
initGSAP();

// ============================================
// ENGINE — ProximityHacker
// ============================================
const HACK_RADIUS = 30;
const HACK_CHARS = '!<>-_\/[]{}—=+*^?#________@$%&01';
const SCRAMBLE_MIN = 5;
const SCRAMBLE_MAX = 12;
const SCRAMBLE_SPEED = 40;

class ProximityHacker {
    constructor(element) {
        this.element = element;
        this.originalHTML = element.innerHTML;
        this.chars = [];
        this.isInViewport = false;
        this.isInitialized = false;
        this.observe();
    }
    init() {
        this.chars = [];
        const textNodes = [];
        const walker = document.createTreeWalker(this.element, NodeFilter.SHOW_TEXT);
        let node;

        while ((node = walker.nextNode())) {
            if (node.nodeValue && node.nodeValue.trim()) textNodes.push(node);
        }

        textNodes.forEach((textNode) => this.wrapTextNode(textNode));
        this.updatePositions();
    }
    destroy() {
        this.element.innerHTML = this.originalHTML;
        this.chars = [];
        this.isInitialized = false;
    }
    createChar(char) {
        const span = document.createElement('span');
        span.className = 'hack-char';
        span.textContent = char;
        span.setAttribute('data-char', char);
        this.chars.push({ span, original: char, isHacked: false, x: 0, y: 0, width: 0, height: 0 });
        return span;
    }
    wrapTextNode(textNode) {
        const fragment = document.createDocumentFragment();
        const tokens = textNode.nodeValue.split(/(\s+)/);

        tokens.forEach((token) => {
            if (!token) return;
            if (/^\s+$/.test(token)) {
                fragment.appendChild(document.createTextNode(token));
                return;
            }

            const word = document.createElement('span');
            word.className = 'hack-word';
            Array.from(token).forEach((char) => word.appendChild(this.createChar(char)));
            fragment.appendChild(word);
        });

        textNode.parentNode.replaceChild(fragment, textNode);
    }
    observe() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                this.isInViewport = e.isIntersecting;
                if (!e.isIntersecting && this.isInitialized) {
                    this.destroy();
                }
            });
        }, { threshold: 0.05 });
        observer.observe(this.element);
    }
    updatePositions() {
        const sx = window.scrollX || window.pageXOffset;
        const sy = window.scrollY || window.pageYOffset;
        this.chars.forEach((c) => {
            const r = c.span.getBoundingClientRect();
            c.x = r.left + r.width / 2 + sx;
            c.y = r.top + r.height / 2 + sy;
            c.width = r.width;
            c.height = r.height;
        });
    }
    update(cursorX, cursorY, isMoving) {
        if (!this.isInViewport) return;

        const sx = window.scrollX || window.pageXOffset;
        const sy = window.scrollY || window.pageYOffset;
        const cx = cursorX + sx;
        const cy = cursorY + sy;

        const rect = this.element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2 + sx;
        const elementCenterY = rect.top + rect.height / 2 + sy;
        const distToContainer = Math.hypot(cx - elementCenterX, cy - elementCenterY);

        const activationRadius = Math.max(rect.width, rect.height) / 2 + 150;

        if (distToContainer < activationRadius) {
            if (!this.isInitialized) {
                this.init();
                this.isInitialized = true;
            }

            if (isMoving && Math.random() < 0.04) {
                this.updatePositions();
            }

            this.chars.forEach((c) => {
                const dx = cx - c.x;
                const dy = cy - c.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < HACK_RADIUS && isMoving) {
                    if (!c.isHacked) {
                        c.isHacked = true;
                        c.span.classList.add('hacked');
                        this.scramble(c);
                    }
                } else {
                    if (c.isHacked) {
                        c.isHacked = false;
                        c.span.classList.remove('hacked');
                        c.span.textContent = c.original;
                        if (Math.random() < 0.1) {
                            setTimeout(() => { if (!c.isHacked) c.span.textContent = c.original; }, 100);
                        }
                    }
                }
            });
        } else {
            if (this.isInitialized) {
                this.destroy();
            }
        }
    }
    scramble(c) {
        let i = 0;
        const max = SCRAMBLE_MIN + Math.floor(Math.random() * (SCRAMBLE_MAX - SCRAMBLE_MIN));
        const interval = setInterval(() => {
            if (!c.isHacked) { clearInterval(interval); c.span.textContent = c.original; return; }
            if (i >= max) {
                clearInterval(interval);
                c.span.textContent = (Math.random() < 0.3) ? HACK_CHARS[Math.floor(Math.random() * HACK_CHARS.length)] : c.original;
                return;
            }
            c.span.textContent = HACK_CHARS[Math.floor(Math.random() * HACK_CHARS.length)];
            i++;
        }, SCRAMBLE_SPEED + Math.random() * 30);
    }
}

function initProximityHacker() {
    if (prefersReduced) return;
    const hackers = [];
    let cursorX = 0, cursorY = 0, isMoving = false, moveTimer;
    let loopActive = false;
    document.querySelectorAll('.hack-text').forEach(el => {
        if (el.matches('h1, h2, .hero-title') || el.closest('.section-heading, .page-hero')) return;
        hackers.push(new ProximityHacker(el));
    });
    
    function loop() {
        hackers.forEach(h => h.update(cursorX, cursorY, isMoving));
        if (isMoving) {
            requestAnimationFrame(loop);
        } else {
            loopActive = false;
        }
    }
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX; cursorY = e.clientY; isMoving = true;
        clearTimeout(moveTimer); 
        moveTimer = setTimeout(() => {
            isMoving = false;
        }, 150);
        if (!loopActive) {
            loopActive = true;
            requestAnimationFrame(loop);
        }
    }, { passive: true });
}
initProximityHacker();

function initMobileMenu() {
    const toggleBtn = $('#navToggle');
    const overlay = $('#navOverlay');
    if (!toggleBtn || !overlay) return;

    toggleBtn.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        overlay.setAttribute('aria-hidden', isExpanded);
        overlay.classList.toggle('is-open', !isExpanded);
        document.body.classList.toggle('is-locked', !isExpanded);

        if (!isExpanded) {
            const links = $$('.nav-overlay__links a', overlay);
            if (window.gsap && !prefersReduced) {
                window.gsap.fromTo(links, 
                    { y: 20, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
                );
            }
        }
    });

    $$('.nav-overlay__links a', overlay).forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.setAttribute('aria-expanded', 'false');
            overlay.setAttribute('aria-hidden', 'true');
            overlay.classList.remove('is-open');
            document.body.classList.remove('is-locked');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
            toggleBtn.setAttribute('aria-expanded', 'false');
            overlay.setAttribute('aria-hidden', 'true');
            overlay.classList.remove('is-open');
            document.body.classList.remove('is-locked');
            toggleBtn.focus();
        }
    });
}
initMobileMenu();

function initFAQ() {
    const items = $$('details.faq-item');
    items.forEach((item) => {
        const summary = $('.faq-question', item);
        const answer = $('.faq-answer', item);
        if (!summary || !answer) return;

        summary.addEventListener('click', () => {
            const willOpen = !item.open;
            if (!willOpen || !window.gsap || prefersReduced) return;

            requestAnimationFrame(() => {
                window.gsap.fromTo(answer,
                    { opacity: 0, y: -8, scaleY: 0.985 },
                    { opacity: 1, y: 0, scaleY: 1, duration: 0.34, ease: 'power3.out', clearProps: 'transform' }
                );
            });
        });
    });
}
initFAQ();
