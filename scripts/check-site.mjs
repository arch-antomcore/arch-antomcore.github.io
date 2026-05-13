import fs from 'node:fs';

const requiredAssets = [
  'assets/favicon-32.png',
  'assets/apple-touch-icon.png',
  'assets/logo-96.png',
  'assets/logo.webp',
  'assets/logo.avif',
  'assets/social-preview.jpg'
];

const html = fs.readFileSync('index.html', 'utf8');
const cdnPattern = /(cdn\.tailwind|bootstrap-icons|fonts\.google|cdnjs|https:\/\/cdn|https:\/\/fonts|unpkg|jsdelivr)/i;

if (cdnPattern.test(html)) {
  throw new Error('External CDN reference found in index.html');
}

for (const asset of requiredAssets) {
  if (!fs.existsSync(asset)) {
    throw new Error(`Missing generated asset: ${asset}`);
  }
}

console.log('Site checks passed.');
