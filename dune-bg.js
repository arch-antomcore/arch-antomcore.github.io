export function initDuneBackground() {
  const canvas = document.getElementById('dune-canvas');
  if (!canvas || canvas.dataset.aetherDuneReady === 'true') return;
  canvas.dataset.aetherDuneReady = 'true';
  const scene = canvas.closest('#dune-scene');
  const root = document.documentElement;

  const ctx = canvas.getContext('2d', {
    alpha: false,
    desynchronized: true,
  });
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPowerDevice =
    window.innerWidth < 768 ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4);

  const PALETTE = {
    bg: '#0c0b08',
    shadowDeep: '#080705',
    shadowMid: '#131109',
    shadowRim: '#1f1c14',
    crestDim: '#2e2818',
    crestMid: '#4a3e28',
    crestWarm: '#7a6540',
    crestLight: '#b8976a',
    crestGlow: '#d4b07c',
    crestPeak: '#e8cfa0',
    crestSpec: '#f5e8c8',
  };

  const quality = {
    samples: lowPowerDevice ? 10 : 14,
    tileSpacing: 1.25,
    scrollEase: prefersReducedMotion ? 1 : 0.14,
    idleEpsilon: 0.35,
  };

  let width = 1;
  let height = 1;
  let dpr = 1;
  let scrollY = window.scrollY;
  let targetScrollY = window.scrollY;
  let frameId = 0;
  let running = false;
  let pageVisible = !document.hidden;
  let activeUntil = 0;
  let lastFrame = 0;
  let tileCount = 4;

  const frameInterval = 1000 / 60;

  function requestDraw(duration = 1200) {
    activeUntil = Math.max(activeUntil, performance.now() + duration);
    if (running || !pageVisible) return;

    running = true;
    frameId = window.requestAnimationFrame(draw);
  }

  function updateScroll() {
    targetScrollY = window.scrollY;
    requestDraw(1400);
  }

  function resize() {
    width = Math.max(1, window.innerWidth);
    height = Math.max(1, window.innerHeight);

    const maxDpr = width < 768 ? 0.85 : lowPowerDevice ? 1 : 1.15;
    dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    tileCount = measureTileCount(height);
    requestDraw(1800);
  }

  function draw(timeMs = 0) {
    frameId = 0;

    if (!pageVisible) {
      running = false;
      return;
    }

    if (lastFrame && timeMs - lastFrame < frameInterval - 0.75) {
      frameId = window.requestAnimationFrame(draw);
      return;
    }

    lastFrame = timeMs;
    const scrollDelta = targetScrollY - scrollY;
    scrollY += scrollDelta * quality.scrollEase;
    if (Math.abs(scrollDelta) < quality.idleEpsilon) scrollY = targetScrollY;

    const t = prefersReducedMotion ? 0 : timeMs * 0.00009;
    renderScene(t);

    const scrollSettled = Math.abs(targetScrollY - scrollY) < quality.idleEpsilon;
    const keepAnimating = !prefersReducedMotion && timeMs < activeUntil;

    if (!scrollSettled || keepAnimating) {
      frameId = window.requestAnimationFrame(draw);
    } else {
      running = false;
    }
  }

  function renderScene(time) {
    const W = width;
    const H = height;
    const parallax = prefersReducedMotion ? 0 : scrollY * 0.055;
    const grainY = prefersReducedMotion ? 0 : -scrollY * 0.032;
    const grainX = prefersReducedMotion ? 0 : Math.sin(time * 2.1 + scrollY * 0.0012) * 7;

    scene?.style.setProperty('--sand-grain-y', `${grainY.toFixed(2)}px`);
    scene?.style.setProperty('--sand-grain-x', `${grainX.toFixed(2)}px`);
    root.style.setProperty('--sand-ambient-y', `${(-parallax * 0.42).toFixed(2)}px`);

    ctx.fillStyle = PALETTE.bg;
    ctx.fillRect(0, 0, W, H);

    const warmX = W * 0.18 + Math.sin(time) * 36;
    const warmY = H * 0.82 + Math.cos(time) * 28 - parallax * 0.36;
    const ambientGrad = ctx.createRadialGradient(warmX, warmY, 0, warmX, warmY, W * 0.82);
    ambientGrad.addColorStop(0, 'rgba(92,70,34,0.30)');
    ambientGrad.addColorStop(0.46, 'rgba(39,30,15,0.16)');
    ambientGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ambientGrad;
    ctx.fillRect(0, 0, W, H);

    const topGlow = ctx.createLinearGradient(0, 0, W, H);
    topGlow.addColorStop(0, 'rgba(232,207,160,0.105)');
    topGlow.addColorStop(0.38, 'rgba(28,25,16,0.055)');
    topGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, W, H);

    const tealX = W * 0.82 - Math.cos(time * 1.2) * 24;
    const tealY = H * 0.16 - Math.sin(time * 1.2) * 18 + parallax * 0.12;
    const ambientTeal = ctx.createRadialGradient(tealX, tealY, 0, tealX, tealY, W * 0.52);
    ambientTeal.addColorStop(0, 'rgba(30,60,55,0.06)');
    ambientTeal.addColorStop(0.5, 'rgba(15,35,30,0.026)');
    ambientTeal.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ambientTeal;
    ctx.fillRect(0, 0, W, H);

    const powderY = H * 0.46 - parallax * 0.18;
    const powder = ctx.createRadialGradient(W * 0.52, powderY, 0, W * 0.52, powderY, W * 0.78);
    powder.addColorStop(0, 'rgba(241,234,219,0.022)');
    powder.addColorStop(0.58, 'rgba(216,189,120,0.024)');
    powder.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = powder;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = lowPowerDevice ? 0.12 : 0.18;
    const drift = prefersReducedMotion ? 0 : Math.sin(time * 2.4) * 4;
    const spacing = lowPowerDevice ? 22 : 18;
    for (let y = -spacing; y < H + spacing; y += spacing) {
      for (let x = -spacing; x < W + spacing; x += spacing) {
        const sparkle = Math.sin((x * 12.9898 + y * 78.233) * 0.003 + time * 1.4);
        if (sparkle < 0.62) continue;
        ctx.fillStyle = `rgba(232,207,160,${(sparkle - 0.6) * 0.05})`;
        ctx.fillRect(x + drift, y - drift * 0.55, 1, 1);
      }
    }
    ctx.restore();
  }

  function measureTileCount(H) {
    const scrollMax = Math.max(0, document.documentElement.scrollHeight - H);
    const scrollScreens = scrollMax / Math.max(1, H);
    const needed = Math.ceil((scrollScreens * 0.35) / quality.tileSpacing) + 4;
    return Math.min(lowPowerDevice ? 7 : 9, Math.max(4, needed));
  }

  function buildRidges(W, H, t, sy) {
    const syNorm = sy / H;
    const p1 = syNorm * 0.08;
    const p2 = syNorm * 0.15;
    const p3 = syNorm * 0.22;
    const p4 = syNorm * 0.35;
    const p5 = syNorm * 0.04;

    const o1 = Math.sin(t * 1.0) * 0.03;
    const o2 = Math.cos(t * 1.3) * 0.03;
    const o3 = Math.sin(t * 0.8) * 0.04;
    const o4 = Math.cos(t * 1.5) * 0.04;

    const ridges = [];
    const numTiles = tileCount;

    for (let i = 0; i < numTiles; i += 1) {
      const offsetY = i * quality.tileSpacing;
      ridges.push({
        crest: sCurve(W, H, 0.15 + o1, 0.32 - p5 + offsetY, 0.42, 0.15 - p5 + o2 + offsetY, 0.75, 0.22 - p5 + offsetY, 1.02 - o1, 0.35 - p5 + offsetY),
        fill: sCurve(W, H, 0.15 + o1, 0.60 - p5 + offsetY, 0.42, 0.35 - p5 + o2 + offsetY, 0.75, 0.45 - p5 + offsetY, 1.02 - o1, 0.60 - p5 + offsetY),
        intensity: 0.12,
        thickness: H * 0.03,
        shadowW: H * 0.22,
      });
    }

    for (let i = 0; i < numTiles; i += 1) {
      const offsetY = i * quality.tileSpacing;
      ridges.push({
        crest: sCurve(W, H, 0.08 - o2, 0.58 - p1 + o1 + offsetY, 0.35 + o1, -0.08 - p1 + offsetY, 0.68 - o2, 0.30 - p1 + offsetY, 1.05, 0.55 - p1 + offsetY),
        fill: sCurve(W, H, 0.08 - o2, 1.00 - p1 + offsetY, 0.35 + o1, 0.30 - p1 + offsetY, 0.68 - o2, 0.65 - p1 + offsetY, 1.05, 1.00 - p1 + offsetY),
        intensity: 0.22,
        thickness: H * 0.04,
        shadowW: H * 0.32,
      });
    }

    for (let i = 0; i < numTiles; i += 1) {
      const offsetY = i * quality.tileSpacing;
      ridges.push({
        crest: sCurve(W, H, -0.05, 0.78 - p2 + offsetY, 0.22 + o3, 0.20 - p2 + o2 + offsetY, 0.55, 0.50 - p2 + o1 + offsetY, 1.08 + o2, 0.72 - p2 + offsetY),
        fill: sCurve(W, H, -0.05, 1.00 - p2 + offsetY, 0.22 + o3, 0.55 - p2 + o2 + offsetY, 0.55, 0.78 - p2 + o1 + offsetY, 1.08 + o2, 1.00 - p2 + offsetY),
        intensity: 0.42,
        thickness: H * 0.052,
        shadowW: H * 0.40,
      });
    }

    for (let i = 0; i < numTiles; i += 1) {
      const offsetY = i * quality.tileSpacing;
      ridges.push({
        crest: sCurve(W, H, -0.08 + o4, 0.90 - p3 + offsetY, 0.20 - o1, 0.32 - p3 + o4 + offsetY, 0.50 + o2, 0.62 - p3 + offsetY, 1.06 - o3, 0.38 - p3 + offsetY),
        fill: sCurve(W, H, -0.08 + o4, 1.10 - p3 + offsetY, 0.20 - o1, 0.68 - p3 + o4 + offsetY, 0.50 + o2, 0.88 - p3 + offsetY, 1.06 - o3, 1.10 - p3 + offsetY),
        intensity: i === 0 ? 0.82 + Math.sin(t * 2) * 0.05 : 0.65,
        thickness: H * 0.068,
        shadowW: H * 0.52,
      });
    }

    for (let i = 0; i < numTiles; i += 1) {
      const offsetY = i * quality.tileSpacing;
      ridges.push({
        crest: sCurve(W, H, -0.10, 1.08 - p4 + o3 + offsetY, 0.18 + o2, 0.70 - p4 + offsetY, 0.48 - o1, 0.92 - p4 + o2 + offsetY, 1.08, 0.65 - p4 + offsetY),
        fill: sCurve(W, H, -0.10, 1.40 - p4 + offsetY, 0.18 + o2, 1.08 - p4 + offsetY, 0.48 - o1, 1.28 - p4 + offsetY, 1.08, 1.40 - p4 + offsetY),
        intensity: 0.55,
        thickness: H * 0.065,
        shadowW: H * 0.45,
      });
    }

    return ridges;
  }

  function sCurve(W, H, x0, y0, x1, y1, x2, y2, x3, y3) {
    return {
      p0: { x: x0 * W, y: y0 * H },
      cp1: { x: x1 * W, y: y1 * H },
      cp2: { x: x2 * W, y: y2 * H },
      p3: { x: x3 * W, y: y3 * H },
    };
  }

  function drawRidge(context, ridge, W, H) {
    const { crest, fill, intensity, thickness, shadowW } = ridge;

    context.save();
    context.beginPath();
    context.moveTo(fill.p0.x, fill.p0.y);
    context.bezierCurveTo(fill.cp1.x, fill.cp1.y, fill.cp2.x, fill.cp2.y, fill.p3.x, fill.p3.y);
    context.lineTo(crest.p3.x, crest.p3.y);
    context.bezierCurveTo(crest.cp2.x, crest.cp2.y, crest.cp1.x, crest.cp1.y, crest.p0.x, crest.p0.y);
    context.closePath();

    const shadowGrad = context.createLinearGradient(0, crest.p0.y, 0, fill.p3.y);
    shadowGrad.addColorStop(0, `rgba(12, 10, 6, ${0.45 * intensity})`);
    shadowGrad.addColorStop(0.5, `rgba(12, 10, 6, ${0.15 * intensity})`);
    shadowGrad.addColorStop(1, 'rgba(12, 10, 6, 0)');
    context.fillStyle = shadowGrad;
    context.fill();
    context.restore();

    const pts = sampleBezier(crest, quality.samples);

    pts.forEach((pt, i) => {
      if (i === 0) return;
      const prev = pts[i - 1];

      const dx = pt.x - prev.x;
      const dy = pt.y - prev.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 0.001) return;

      const nx = -dy / len;
      const ny = dx / len;
      const x0 = pt.x + nx * thickness;
      const y0 = pt.y + ny * thickness;
      const x1 = pt.x - nx * shadowW;
      const y1 = pt.y - ny * shadowW;
      const x2 = prev.x - nx * shadowW;
      const y2 = prev.y - ny * shadowW;
      const x3 = prev.x + nx * thickness;
      const y3 = prev.y + ny * thickness;

      const stripGrad = context.createLinearGradient(x0, y0, x1, y1);
      const a = intensity;
      stripGrad.addColorStop(0.00, `rgba(245,232,200,${a * 0.06})`);
      stripGrad.addColorStop(0.02, `rgba(230,205,160,${a * 0.18})`);
      stripGrad.addColorStop(0.05, `rgba(200,168,110,${a * 0.38})`);
      stripGrad.addColorStop(0.10, `rgba(160,128,72,${a * 0.55})`);
      stripGrad.addColorStop(0.18, `rgba(100,80,40,${a * 0.40})`);
      stripGrad.addColorStop(0.40, `rgba(30,20,8,${a * 0.10})`);
      stripGrad.addColorStop(1.00, 'rgba(0,0,0,0)');

      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(x3, y3);
      context.closePath();
      context.fillStyle = stripGrad;
      context.fill();
    });

    const crestGrad = context.createLinearGradient(0, 0, W, 0);
    const alphaBase = intensity * 0.65;
    crestGrad.addColorStop(0, 'rgba(245,228,185,0)');
    crestGrad.addColorStop(0.15, `rgba(245,228,185,${alphaBase})`);
    crestGrad.addColorStop(0.85, `rgba(245,228,185,${alphaBase})`);
    crestGrad.addColorStop(1, 'rgba(245,228,185,0)');

    context.save();
    context.beginPath();
    context.moveTo(crest.p0.x, crest.p0.y);
    context.bezierCurveTo(crest.cp1.x, crest.cp1.y, crest.cp2.x, crest.cp2.y, crest.p3.x, crest.p3.y);
    context.strokeStyle = crestGrad;
    context.lineWidth = lerp(1, 2.5, intensity);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();

    const bloomGrad1 = context.createLinearGradient(0, 0, W, 0);
    const bloomAlpha1 = intensity * 0.12;
    bloomGrad1.addColorStop(0, 'rgba(230,200,140,0)');
    bloomGrad1.addColorStop(0.15, `rgba(230,200,140,${bloomAlpha1})`);
    bloomGrad1.addColorStop(0.85, `rgba(230,200,140,${bloomAlpha1})`);
    bloomGrad1.addColorStop(1, 'rgba(230,200,140,0)');

    context.strokeStyle = bloomGrad1;
    context.lineWidth = lerp(4, 12, intensity);
    context.stroke();

    const bloomGrad2 = context.createLinearGradient(0, 0, W, 0);
    const bloomAlpha2 = intensity * 0.05;
    bloomGrad2.addColorStop(0, 'rgba(230,200,140,0)');
    bloomGrad2.addColorStop(0.15, `rgba(230,200,140,${bloomAlpha2})`);
    bloomGrad2.addColorStop(0.85, `rgba(230,200,140,${bloomAlpha2})`);
    bloomGrad2.addColorStop(1, 'rgba(230,200,140,0)');

    context.strokeStyle = bloomGrad2;
    context.lineWidth = lerp(12, 28, intensity);
    context.stroke();
    context.restore();
  }

  function drawSpecularVeil(context, W, H, t) {
    const x1 = W * 0.28 + Math.sin(t * 0.5) * 50;
    const y1 = H * 0.52 + Math.cos(t * 0.5) * 50;
    const grad1 = context.createRadialGradient(x1, y1, 0, x1, y1, W * 0.55);
    grad1.addColorStop(0, 'rgba(180,145,80,0.08)');
    grad1.addColorStop(0.4, 'rgba(120,90,45,0.04)');
    grad1.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = grad1;
    context.fillRect(0, 0, W, H);

    const x2 = W * 0.55 - Math.sin(t) * 30;
    const y2 = H * 0.42 - Math.cos(t) * 30;
    const grad2 = context.createRadialGradient(x2, y2, 0, x2, y2, W * 0.4);
    grad2.addColorStop(0, 'rgba(140,110,60,0.06)');
    grad2.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = grad2;
    context.fillRect(0, 0, W, H);
  }

  function sampleBezier(b, n) {
    const pts = [];
    for (let i = 0; i <= n; i += 1) {
      const t = i / n;
      const mt = 1 - t;
      pts.push({
        x: mt * mt * mt * b.p0.x + 3 * mt * mt * t * b.cp1.x + 3 * mt * t * t * b.cp2.x + t * t * t * b.p3.x,
        y: mt * mt * mt * b.p0.y + 3 * mt * mt * t * b.cp1.y + 3 * mt * t * t * b.cp2.y + t * t * t * b.p3.y,
      });
    }
    return pts;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  let resizeTimer = 0;
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 120);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
    if (pageVisible) {
      lastFrame = 0;
      requestDraw(1200);
    } else if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      running = false;
    }
  });

  resize();
  requestDraw(prefersReducedMotion ? 0 : 3500);
}
