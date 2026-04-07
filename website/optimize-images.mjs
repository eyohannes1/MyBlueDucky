import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import path from 'path';

const QUALITY = 80;
const MAX_WIDTH = 1920;
const GALLERY_MAX_WIDTH = 1200;
const THUMB_MAX_WIDTH = 600;

async function getImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImages(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath, maxWidth) {
  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const info = await sharp(filePath).metadata();

  const pipeline = sharp(filePath);

  // Resize if wider than max
  if (info.width > maxWidth) {
    pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(webpPath);

  const origSize = (await stat(filePath)).size;
  const newSize = (await stat(webpPath)).size;
  const savings = ((1 - newSize / origSize) * 100).toFixed(1);

  console.log(`${path.basename(filePath)} -> .webp | ${(origSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB (${savings}% smaller)`);

  return { origSize, newSize };
}

async function main() {
  const publicDir = path.resolve('public');

  // Process assets/images
  const assetImages = await getImages(path.join(publicDir, 'assets', 'images'));
  // Process gallery
  const galleryImages = await getImages(path.join(publicDir, 'gallery'));

  let totalOrig = 0, totalNew = 0;

  console.log('\n--- Asset Images ---');
  for (const img of assetImages) {
    const { origSize, newSize } = await optimizeImage(img, MAX_WIDTH);
    totalOrig += origSize;
    totalNew += newSize;
  }

  console.log('\n--- Gallery Images ---');
  for (const img of galleryImages) {
    const { origSize, newSize } = await optimizeImage(img, GALLERY_MAX_WIDTH);
    totalOrig += origSize;
    totalNew += newSize;
  }

  console.log(`\n=== TOTAL: ${(totalOrig/1024/1024).toFixed(1)}MB -> ${(totalNew/1024/1024).toFixed(1)}MB (${((1-totalNew/totalOrig)*100).toFixed(1)}% smaller) ===`);
}

main().catch(console.error);
