import { execSync } from 'child_process';
import { readFileSync, writeFileSync, renameSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';

// Install sharp if not available
try { await import('sharp'); } catch { execSync('npm install sharp', { stdio: 'inherit' }); }
const sharp = (await import('sharp')).default;

const ROOT = '.';
const ASSETS = join(ROOT, 'assets');

async function compressImage(inputPath, outputPath, options = {}) {
  const { maxWidth = 800, quality = 80, format = 'webp' } = options;
  const input = sharp(readFileSync(inputPath));
  const meta = await input.metadata();
  
  let pipeline = input;
  if (meta.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }
  
  if (format === 'webp') {
    pipeline = pipeline.webp({ quality, effort: 6 });
  } else if (format === 'png') {
    pipeline = pipeline.png({ quality: Math.min(quality, 100), compressionLevel: 9 });
  }
  
  const buffer = await pipeline.toBuffer();
  writeFileSync(outputPath, buffer);
  
  const originalSize = readFileSync(inputPath).length;
  const newSize = buffer.length;
  console.log(`  ${basename(inputPath)}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${((1 - newSize/originalSize) * 100).toFixed(1)}% reduction)`);
  return { originalSize, newSize };
}

async function main() {
  console.log('=== AetherSite Image Compression ===\n');
  let totalOriginal = 0, totalNew = 0;

  // 1. iconsf.PNG → iconsf.webp (it's a logo, max 192px)
  console.log('1. Logo (iconsf.PNG):');
  const iconResult = await compressImage(
    join(ROOT, 'iconsf.PNG'),
    join(ROOT, 'iconsf.webp'),
    { maxWidth: 192, quality: 85, format: 'webp' }
  );
  totalOriginal += iconResult.originalSize;
  totalNew += iconResult.newSize;

  // 2. Photo gallery images in Ft/
  console.log('\n2. Photo gallery (Ft/):');
  const ftImages = [
    'cora-pursley-dupe.jpeg',
    'julie-marchant-dupe.jpeg',
    'olive-gawlik-dupe.jpeg',
    'sheh-mclean-dupe.jpeg',
    'sophie- wolber-dupe.jpeg'
  ];
  
  for (const img of ftImages) {
    const inputPath = join(ASSETS, 'Ft', img);
    const outputName = img.replace(/\.(jpeg|jpg|png)$/i, '.webp');
    const outputPath = join(ASSETS, 'Ft', outputName);
    if (existsSync(inputPath)) {
      const result = await compressImage(inputPath, outputPath, { maxWidth: 1200, quality: 78, format: 'webp' });
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
    }
  }

  // 3. Stack logos  
  console.log('\n3. Stack logos:');
  const stackImages = ['aethercore.png', 'gemma-4.png', 'nousresearch.png', 'ollama.png', 'sqlite.png'];
  for (const img of stackImages) {
    const inputPath = join(ASSETS, 'stack', img);
    const outputName = img.replace(/\.png$/i, '.webp');
    const outputPath = join(ASSETS, 'stack', outputName);
    if (existsSync(inputPath)) {
      const result = await compressImage(inputPath, outputPath, { maxWidth: 256, quality: 82, format: 'webp' });
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
    }
  }

  // 4. logo-96.png
  console.log('\n4. Other assets:');
  if (existsSync(join(ASSETS, 'logo-96.png'))) {
    const result = await compressImage(
      join(ASSETS, 'logo-96.png'),
      join(ASSETS, 'logo-96.webp'),
      { maxWidth: 96, quality: 85, format: 'webp' }
    );
    totalOriginal += result.originalSize;
    totalNew += result.newSize;
  }

  console.log(`\n=== TOTAL ===`);
  console.log(`Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Compressed: ${(totalNew / 1024).toFixed(0)} KB`);
  console.log(`Reduction: ${((1 - totalNew/totalOriginal) * 100).toFixed(1)}%`);
}

main().catch(console.error);
