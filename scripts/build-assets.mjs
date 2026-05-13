import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'iconsf.PNG');
const assetsDir = path.join(root, 'assets');

await fs.mkdir(assetsDir, { recursive: true });

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const logo = sharp(source).rotate();

await Promise.all([
  logo.clone().resize(32, 32, { fit: 'contain', background: transparent }).png().toFile(path.join(assetsDir, 'favicon-32.png')),
  logo.clone().resize(180, 180, { fit: 'contain', background: transparent }).png().toFile(path.join(assetsDir, 'apple-touch-icon.png')),
  logo.clone().resize(96, 96, { fit: 'contain', background: transparent }).png().toFile(path.join(assetsDir, 'logo-96.png')),
  logo.clone().resize(128, 128, { fit: 'contain', background: transparent }).webp({ quality: 86, effort: 6 }).toFile(path.join(assetsDir, 'logo.webp')),
  logo.clone().resize(128, 128, { fit: 'contain', background: transparent }).avif({ quality: 54, effort: 6 }).toFile(path.join(assetsDir, 'logo.avif'))
]);

const previewSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.84" numOctaves="4" seed="7"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 .22"/>
      </feComponentTransfer>
    </filter>
    <linearGradient id="metal" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="#0b0a07"/>
      <stop offset=".42" stop-color="#161207"/>
      <stop offset="1" stop-color="#070807"/>
    </linearGradient>
    <radialGradient id="glow" cx=".28" cy=".2" r=".9">
      <stop stop-color="#d8bd78" stop-opacity=".28"/>
      <stop offset=".58" stop-color="#54dec5" stop-opacity=".08"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#metal)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <path d="M0 474 C196 392 286 512 472 442 C683 362 770 138 1200 172 L1200 630 L0 630 Z" fill="#f1eadb" opacity=".035"/>
  <rect width="1200" height="630" filter="url(#grain)" opacity=".95"/>
  <text x="90" y="155" font-family="Sora, Manrope, sans-serif" font-size="36" fill="#d8bd78" letter-spacing="3">AETHERCORE</text>
  <text x="90" y="292" font-family="Sora, Manrope, sans-serif" font-size="74" fill="#f1eadb">Local-first AI</text>
  <text x="90" y="372" font-family="Sora, Manrope, sans-serif" font-size="74" fill="#b9b1a3">that executes.</text>
  <text x="92" y="452" font-family="IBM Plex Mono, monospace" font-size="25" fill="#b9b1a3">Planner -> Executor -> Critic · Files stay on device</text>
</svg>`;

await sharp(Buffer.from(previewSvg))
  .jpeg({ quality: 82, progressive: true })
  .toFile(path.join(assetsDir, 'social-preview.jpg'));

const outputs = await fs.readdir(assetsDir);
console.log(`Generated ${outputs.length} optimized assets in assets/`);
