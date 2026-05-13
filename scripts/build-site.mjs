import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const files = [
  'index.html',
  'styles.css',
  'tailwind.css',
  'main.js',
  'icons.js',
  'hero-3d.js',
  'tailwind.config.js',
  'tailwind.input.css'
];
const dirs = ['assets', 'vendor'];

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });

for (const file of files) {
  await fs.copyFile(path.join(root, file), path.join(dist, file));
}

for (const dir of dirs) {
  await fs.cp(path.join(root, dir), path.join(dist, dir), { recursive: true });
}

console.log(`Built deployable site in ${path.relative(root, dist)}/`);
