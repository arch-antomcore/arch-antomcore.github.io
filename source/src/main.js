import './styles.css';
import * as THREE from 'three';
import Lenis from 'lenis';
import SplitType from 'split-type';
import { createNoise3D } from 'simplex-noise';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';



const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

window.addEventListener('load', () => {
  setTimeout(() => $('#boot')?.classList.add('is-hidden'), 520);
});
setTimeout(() => $('#boot')?.classList.add('is-hidden'), 2200);

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function lerp(a, b, t) { return a + (b - a) * t; }

function initSmoothScroll() {
  if (prefersReduced || !Lenis) return;
  const lenis = new Lenis({
    duration: 1.18,
    smoothWheel: true,
    wheelMultiplier: 0.92,
    touchMultiplier: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });
  lenis.on('scroll', () => ScrollTrigger?.update?.());
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function initCursorOrb() {
  const orb = $('.cursor-orb');
  if (!orb || prefersReduced) return;
  let x = innerWidth * 0.5, y = innerHeight * 0.5;
  let tx = x, ty = y;
  window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  const tick = () => {
    x = lerp(x, tx, 0.09);
    y = lerp(y, ty, 0.09);
    orb.style.transform = `translate3d(${x - 140}px, ${y - 140}px, 0)`;
    requestAnimationFrame(tick);
  };
  tick();
}

function initMatrixCanvas() {
  const canvas = $('#matrix');
  if (!canvas || prefersReduced) return;

  const ctx = canvas.getContext('2d');
  const chars = '01ΛAETHERCOREARLIPCFTS5RUSTCEFXLSXLOCALVAULTUPLINKGATEJSONLBIAGENTΣΔ'.split('');
  const dpr = Math.min(devicePixelRatio || 1, 1.8);
  const pointer = { x: innerWidth * 0.5, y: innerHeight * 0.5, tx: innerWidth * 0.5, ty: innerHeight * 0.5, nx: 0, ny: 0 };
  let width = 0, height = 0, baseSize = 16, columns = [], velocity = 0, lastScroll = scrollY, lastTime = performance.now();

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
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    baseSize = 14.5 * dpr;
    const count = Math.max(36, Math.ceil(innerWidth / 18));
    columns = Array.from({ length: count }, (_, i) => createColumn(i, count));
  }

  function draw(now) {
    const dt = Math.min(2.2, (now - lastTime) / 16.6667 || 1);
    lastTime = now;

    const deltaScroll = scrollY - lastScroll;
    lastScroll = scrollY;
    velocity = lerp(velocity, deltaScroll, 0.045);

    pointer.x = lerp(pointer.x, pointer.tx, 0.055);
    pointer.y = lerp(pointer.y, pointer.ty, 0.055);
    pointer.nx = (pointer.x / Math.max(1, innerWidth) - 0.5) * 2;
    pointer.ny = (pointer.y / Math.max(1, innerHeight) - 0.5) * 2;

    ctx.fillStyle = 'rgba(5, 7, 13, 0.075)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'screen';

    const glowX = pointer.x * dpr;
    const glowY = pointer.y * dpr;
    const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.min(width, height) * 0.24);
    glow.addColorStop(0, 'rgba(96,255,192,0.075)');
    glow.addColorStop(0.42, 'rgba(86,245,212,0.032)');
    glow.addColorStop(1, 'rgba(5,7,13,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    columns.forEach((col) => {
      if (Math.random() > 0.92) col.text[(Math.random() * col.text.length) | 0] = randomChar();

      const headX = col.x + Math.sin(now * 0.00034 * (1 + col.depth) + col.phase) * col.swing + pointer.nx * 20 * col.depth * dpr;
      const headY = col.y + pointer.ny * 7 * col.depth * dpr - velocity * 0.6 * col.depth;
      const distPointer = Math.abs(headX - glowX);
      const pointerBoost = clamp(1 - distPointer / (width * 0.12), 0, 1);

      ctx.strokeStyle = `rgba(58, 205, 120, ${clamp(col.alpha * 0.45 + pointerBoost * 0.08, 0, 0.38)})`;
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
        if (i === 0) ctx.fillStyle = `rgba(232,255,244,${alpha})`;
        else if (i < 4) ctx.fillStyle = `rgba(136,255,209,${alpha})`;
        else ctx.fillStyle = `rgba(84,235,172,${alpha})`;
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

    requestAnimationFrame(draw);
  }

  addEventListener('pointermove', (event) => {
    pointer.tx = event.clientX;
    pointer.ty = event.clientY;
  }, { passive: true });

  resize();
  addEventListener('resize', resize, { passive: true });
  draw(performance.now());
}

function initWebGL() {
  const canvas = $('#webgl');
  if (!canvas || prefersReduced) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { console.warn('WebGL unavailable', e); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.6));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 11);
  const group = new THREE.Group();
  scene.add(group);

  const particles = innerWidth < 700 ? 1200 : 2400;
  const positions = new Float32Array(particles * 3);
  const original = new Float32Array(particles * 3);
  const colors = new Float32Array(particles * 3);
  const colorA = new THREE.Color(0x56f5d4);
  const colorB = new THREE.Color(0x8b5cf6);
  const colorC = new THREE.Color(0xf6ce78);

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
  const particleMat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.76, blending: THREE.AdditiveBlending, depthWrite: false });
  const points = new THREE.Points(particleGeo, particleMat);
  group.add(points);

  const kernel = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.9, 1),
    new THREE.MeshBasicMaterial({ color: 0x56f5d4, wireframe: true, transparent: true, opacity: 0.10, blending: THREE.AdditiveBlending })
  );
  kernel.position.set(3.9, -0.2, -2.1);
  group.add(kernel);

  const torusA = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.85, 0.014, 170, 8, 2, 3),
    new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending })
  );
  torusA.position.set(3.9, -0.2, -1.8);
  group.add(torusA);

  const torusB = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.35, 0.01, 170, 8, 3, 4),
    new THREE.MeshBasicMaterial({ color: 0xf6ce78, transparent: true, opacity: 0.19, blending: THREE.AdditiveBlending })
  );
  torusB.position.set(-3.8, 1.8, -2.4);
  group.add(torusB);

  let mouseX = 0, mouseY = 0;
  addEventListener('pointermove', (event) => {
    mouseX = (event.clientX / innerWidth - 0.5) * 2;
    mouseY = (event.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize, { passive: true });
  resize();

  const noise3D = createNoise3D();
  const clock = new THREE.Clock();
  function tick() {
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
      const n = noise3D(ox * 0.08, oy * 0.08, t * 0.08 + progress);
      const swirl = (Math.sin(t * 0.42 + i * 0.027 + phase) + n) * 0.12;
      arr[k] = ox + Math.cos(t * 0.18 + i) * 0.035 + swirl * (oy * .09);
      arr[k + 1] = oy + Math.sin(t * 0.25 + i * 0.31) * 0.035 - progress * 0.35;
      arr[k + 2] = oz + Math.cos(t * 0.2 + i * 0.02) * 0.06;
    }
    particleGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
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
  let lastScroll = scrollY, scrollVelocity = 0, lastTime = performance.now();

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

  function drawBackdrop(ctx, t) {
    const cx = width * (0.5 + pointer.x * 0.03);
    const cy = height * (0.5 + pointer.y * 0.038) - scrollVelocity * 0.35;
    const radius = Math.min(width, height) * 0.36;

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    glow.addColorStop(0, `rgba(92,255,176,${0.055 + pointer.glow * 0.018})`);
    glow.addColorStop(0.30, 'rgba(86,245,212,0.035)');
    glow.addColorStop(0.60, 'rgba(22,163,74,0.026)');
    glow.addColorStop(1, 'rgba(5,7,13,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(84,255,146,0.12)';
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
    ctx.globalCompositeOperation = 'screen';
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
      const parallaxY = pointer.y * 16 * stream.depth * dpr - scrollVelocity * 1.1 * stream.depth;
      const x = stream.x + sway + parallaxX;
      const headY = stream.y + parallaxY;

      const distCenterX = Math.abs(x - centerX);
      const centerFactor = layerName === 'back' && distCenterX < logoRadius * 1.3 ? 0.52 : 1;
      const distPointer = Math.hypot(x - pointerX, headY - pointerY);
      const pointerBoost = clamp(1 - distPointer / (Math.min(width, height) * 0.24), 0, 1);

      ctx.font = `${stream.size}px ${monoFont}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = `rgba(56, 189, 110, ${clamp(stream.lineAlpha * centerFactor + pointerBoost * 0.08, 0, 0.34)})`;
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
        let color = `rgba(110,255,166,${alpha})`;
        if (i === 0) color = `rgba(234,255,242,${clamp(alpha + (layerName === 'front' ? 0.26 : 0.14), 0, 0.92)})`;
        else if (i < 3) color = `rgba(140,255,211,${clamp(alpha * 1.22, 0, layerName === 'front' ? 0.72 : 0.78)})`;
        ctx.fillStyle = color;
        ctx.fillText(stream.text[i], x, y);
      }

      const accel = 1 + clamp(Math.abs(scrollVelocity) * 0.012, 0, 1.4) + pointerBoost * 0.14;
      stream.y += stream.speed * dt * 0.046 * accel;
      if (stream.y - stream.length * stream.size > height + 96 * dpr) resetStream(stream, false);
    });
  }

  function animateLogo(now) {
    if (!logo) return;
    logoMotion.x = lerp(logoMotion.x, pointer.tx, 0.075);
    logoMotion.y = lerp(logoMotion.y, pointer.ty, 0.075);
    logoMotion.r = lerp(logoMotion.r, pointer.tx * 5.8, 0.055);
    const fx = Math.sin(now * 0.0011) * 6 + logoMotion.x * 20;
    const fy = Math.cos(now * 0.00135) * 7 + logoMotion.y * 15 - scrollVelocity * 0.1;
    const scale = 1 + Math.sin(now * 0.0016) * 0.03 + pointer.glow * 0.015;
    logo.style.transform = `translate3d(${fx}px, ${fy}px, 0) rotate(${logoMotion.r}deg) scale(${scale})`;
  }

  function draw(now) {
    const dt = Math.min(2.2, (now - lastTime) / 16.6667 || 1);
    lastTime = now;
    const deltaScroll = scrollY - lastScroll;
    lastScroll = scrollY;
    scrollVelocity = lerp(scrollVelocity, deltaScroll, 0.08);
    pointer.x = lerp(pointer.x, pointer.tx, 0.08);
    pointer.y = lerp(pointer.y, pointer.ty, 0.08);
    pointer.glow = lerp(pointer.glow, pointer.tx || pointer.ty ? 1 : 0.46, 0.05);

    drawLayer(backCtx, layers.back, 'back', now * 0.001, dt);
    drawLayer(frontCtx, layers.front, 'front', now * 0.00145, dt);
    animateLogo(now);
    requestAnimationFrame(draw);
  }

  resize();
  addEventListener('resize', resize, { passive: true });
  draw(performance.now());
}

function initGSAP() {
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
      gsap.set(el, { y: 0, opacity: 1, filter: 'blur(0px)' });
      return;
    }

    gsap.fromTo(el, { y: 36, opacity: 0, filter: 'blur(4px)' }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: .72,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 86%', end: 'top 68%', scrub: 0.38 }
    });
  });

  gsap.from('.hero-title > span', {
    yPercent: 112,
    opacity: 0,
    rotateX: -30,
    transformOrigin: 'left bottom',
    stagger: 0.09,
    duration: 1.2,
    ease: 'expo.out',
    delay: 0.22
  });

  gsap.fromTo('.hero__actions .btn, .metrics > div', { y: 18, opacity: 0, filter: 'blur(3px)' }, {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    duration: 1.05,
    stagger: 0.08,
    ease: 'power3.out',
    delay: 0.42
  });

  gsap.to('.hero__machine', {
    y: -92,
    rotateZ: 2.4,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
  });
  gsap.to('.hero__content', {
    y: 88,
    opacity: .4,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '55% top', end: 'bottom top', scrub: 1.12 }
  });

  gsap.to('.machine-card', {
    rotateY: -7,
    rotateX: 3.4,
    y: -26,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.15 }
  });
  gsap.to('.runtime-terminal', {
    y: -18,
    rotate: -2.4,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.18 }
  });

  gsap.to('.processor-core', {
    scale: 1.095,
    rotate: 4.5,
    y: -32,
    filter: 'drop-shadow(0 96px 240px rgba(86,245,212,.20))',
    ease: 'none',
    scrollTrigger: { trigger: '.processor-section', start: 'top bottom', end: 'bottom top', scrub: 1.16 }
  });
  gsap.fromTo('.processor-rain--back', { autoAlpha: .82, scale: .985, filter: 'blur(.35px)' }, {
    autoAlpha: 1,
    scale: 1,
    filter: 'blur(0px)',
    ease: 'none',
    scrollTrigger: { trigger: '.processor-section', start: 'top 80%', end: 'center center', scrub: 1 }
  });
  gsap.to('.processor-rain--back', {
    yPercent: -8,
    xPercent: 2.4,
    ease: 'none',
    scrollTrigger: { trigger: '.processor-section', start: 'top bottom', end: 'bottom top', scrub: 1.2 }
  });
  gsap.to('.processor-rain--front', {
    yPercent: -14,
    xPercent: 4.2,
    ease: 'none',
    scrollTrigger: { trigger: '.processor-section', start: 'top bottom', end: 'bottom top', scrub: 1.25 }
  });
  gsap.to('.processor-center-logo', {
    y: -18,
    rotate: -4.5,
    scale: 1.08,
    ease: 'none',
    scrollTrigger: { trigger: '.processor-section', start: 'top 72%', end: 'bottom top', scrub: 1.15 }
  });
  gsap.fromTo('.processor-logo-aura', { autoAlpha: .26, scale: .84 }, {
    autoAlpha: .98,
    scale: 1.1,
    stagger: .1,
    ease: 'none',
    scrollTrigger: { trigger: '.processor-section', start: 'top 72%', end: 'center center', scrub: 1 }
  });
  gsap.fromTo('.chip-hud', { autoAlpha: 0, y: 28, scale: .97, filter: 'blur(4px)' }, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
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

      const setActive = (index) => {
        cards.forEach((card, i) => {
          card.classList.toggle('is-active', i === index);
          card.style.pointerEvents = i === index ? 'auto' : 'none';
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: '.pipeline',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          onUpdate: (self) => {
            gsap.to('.progress-rail span', { width: `${self.progress * 100}%`, duration: .18, overwrite: true });
            setActive(clamp(Math.round(self.progress * (cards.length - 1)), 0, cards.length - 1));
          }
        }
      });

      cards.forEach((card, i) => {
        const at = i * 1.08;
        tl.to(card, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .48 }, at);
        tl.to(card, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .42 }, at + .48);
        if (i < cards.length - 1) tl.to(card, { autoAlpha: 0, y: -92, scale: .945, rotateX: -9, duration: .46 }, at + .92);
      });
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

  $$('.trinity-card, .cap').forEach((card) => {
    gsap.to(card, {
      y: -30,
      rotateX: 1.5,
      ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.15 }
    });
  });

  $$('.lab-console, .cta-card, .status-note').forEach((panel) => {
    gsap.fromTo(panel, { y: 28, opacity: 0, filter: 'blur(4px)' }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: .86,
      ease: 'power3.out',
      scrollTrigger: { trigger: panel, start: 'top 78%', toggleActions: 'play none none reverse' }
    });
  });

  gsap.fromTo('.vision-inner', { scale: .93, opacity: .34, filter: 'blur(5px)' }, {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    ease: 'none',
    scrollTrigger: { trigger: '.vision', start: 'top bottom', end: 'center center', scrub: 1.05 }
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

    gsap.fromTo('.life-scroll__frame', { scale: .98, opacity: .82, filter: 'blur(3px)' }, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
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
    let rect;
    card.addEventListener('pointerenter', () => { rect = card.getBoundingClientRect(); });
    card.addEventListener('pointermove', (e) => {
      rect ||= card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const ry = (x - .5) * 7;
      const rx = -((y - .5) * 7);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
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
      el.style.transform = `translate(${x * 0.07}px, ${y * 0.09}px)`;
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
  $$('.stage-card, .lab-console, .cta-card, .vision-inner, .status-note, .life-scroll__frame').forEach((panel) => {
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
        s.style.background = i % 3 ? '#56f5d4' : '#f6ce78';
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
  const form = $('.access-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = $('button', form);
    const input = $('input', form);
    btn.textContent = input.value ? 'Solicitação registrada ✓' : 'Digite seu email primeiro';
    setTimeout(() => { btn.textContent = 'Solicitar acesso ↗'; }, 1800);
  });
}

initSmoothScroll();
initCursorOrb();
initMatrixCanvas();
initWebGL();
initProcessorCanvas();
initMarqueeSafety();
initTiltCards();
initMagnetic();
initAetherSlider();
initSparks();
initForm();
initGSAP();
