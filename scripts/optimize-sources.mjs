/**
 * Reencoda la fotografía de origen a JPEG de alta calidad.
 * Son fotos: el PNG las guardaba a 8-9 MB sin ninguna ganancia visual, y
 * encarecía mucho la generación de AVIF durante el build.
 */
import sharp from 'sharp';
import { readdir, unlink, stat } from 'node:fs/promises';

const dir = 'src/assets/img';
const MAX_W = 2600;

for (const file of await readdir(dir)) {
  if (!file.endsWith('.png')) continue;
  const src = `${dir}/${file}`;
  const out = src.replace(/\.png$/, '.jpg');
  const before = (await stat(src)).size;
  const meta = await sharp(src).metadata();

  await sharp(src)
    .resize({ width: Math.min(meta.width ?? MAX_W, MAX_W), withoutEnlargement: true })
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(out);

  const after = (await stat(out)).size;
  await unlink(src);
  console.log(
    `${file} -> ${out.split('/').pop()}  ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(2)}MB`,
  );
}
