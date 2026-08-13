/**
 * Captura una página por tramos verticales, para revisar el diseño completo
 * sin generar una única imagen inmanejable.
 *
 *   node scripts/sections.mjs /ruta [--w=1440] [--step=900]
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const args = process.argv.slice(2);
const flags = Object.fromEntries(
  args.filter((a) => a.startsWith('--')).map((a) => {
    const [k, v = 'true'] = a.replace(/^--/, '').split('=');
    return [k, v];
  }),
);

const route = args.find((a) => !a.startsWith('--')) || '/';
const width = Number(flags.w || 1440);
const step = Number(flags.step || 900);
const outDir = flags.out || '/tmp/shots';
const name = flags.name || (route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-'));

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height: step },
  reducedMotion: 'reduce',
});
const page = await context.newPage();

const problems = [];
page.on('console', (m) => m.type() === 'error' && problems.push(m.text()));
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));

const base = flags.base || 'http://localhost:4321';
await page.goto(`${base}${route}`, { waitUntil: 'networkidle', timeout: 45000 });

// Recorre la página una vez para disparar lazy-loading y observers.
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const go = () => {
      y += window.innerHeight * 0.8;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) requestAnimationFrame(go);
      else { window.scrollTo(0, 0); setTimeout(resolve, 300); }
    };
    go();
  });
});

const total = await page.evaluate(() => document.body.scrollHeight);
const parts = Math.ceil(total / step);
console.log(`altura total ${total}px · ${parts} tramos de ${step}px`);

for (let i = 0; i < parts; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * step);
  await page.waitForTimeout(220);
  const file = `${outDir}/${name}-p${i}.png`;
  await page.screenshot({ path: file });
  console.log(file);
}

if (problems.length) console.log('\nErrores:', [...new Set(problems)].join('\n  '));

await browser.close();
