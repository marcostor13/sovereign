import sharp from 'sharp';
// Imagen para compartir en redes: recorte 1200x630 del hero con velo navy,
// para que el texto superpuesto de las plataformas siga siendo legible.
const veil = Buffer.from(
  `<svg width="1200" height="630"><rect width="1200" height="630" fill="#050c16" opacity="0.45"/></svg>`
);
await sharp('src/assets/img/hero.png')
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .composite([{ input: veil, blend: 'over' }])
  .png({ quality: 88 })
  .toFile('public/og.png');
console.log('public/og.png listo');
