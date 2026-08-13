/**
 * Capturas de revisión visual.
 *
 *   node scripts/shots.mjs [ruta...] [--w=1440] [--full] [--out=dir]
 *
 * Usa prefers-reduced-motion para que los bloques con revelado por scroll
 * aparezcan ya visibles en la captura completa.
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

const paths = args.filter((a) => !a.startsWith('--'));
const routes = paths.length ? paths : ['/'];

const base = flags.base || 'http://localhost:4321';
const width = Number(flags.w || 1440);
const height = Number(flags.h || 900);
const outDir = flags.out || '/tmp/shots';
const fullPage = flags.full === 'true';

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: Number(flags.dpr || 1),
  reducedMotion: 'reduce',
});

const page = await context.newPage();
const problems = [];
page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
page.on('requestfailed', (r) => problems.push(`request failed: ${r.url()} — ${r.failure()?.errorText}`));

for (const route of routes) {
  const url = `${base}${route}`;
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });

  // Recorre la página para disparar lazy-loading e IntersectionObserver.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.8;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) requestAnimationFrame(step);
        else { window.scrollTo(0, 0); setTimeout(resolve, 250); }
      };
      step();
    });
  });

  await page.waitForTimeout(500);

  const name = (route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-')) + `-${width}${fullPage ? '-full' : ''}`;
  const file = `${outDir}/${name}.png`;
  await page.screenshot({ path: file, fullPage });

  console.log(`${res?.status()}  ${url}  ->  ${file}`);
}

if (problems.length) {
  console.log('\nIncidencias:');
  [...new Set(problems)].forEach((p) => console.log('  ' + p));
}

await browser.close();
