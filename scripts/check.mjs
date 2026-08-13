/**
 * Comprobación funcional de las piezas interactivas del sitio.
 *
 *   node scripts/check.mjs [--base=http://localhost:4330]
 *
 * No sustituye a una suite de tests: es una verificación rápida de que el
 * menú móvil, el filtro de la Academia, la calculadora y el formulario
 * siguen funcionando después de un cambio.
 */
import { chromium } from 'playwright';

const flags = Object.fromEntries(
  process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => {
    const [k, v = 'true'] = a.replace(/^--/, '').split('=');
    return [k, v];
  }),
);

const base = flags.base || 'http://localhost:4330';
const browser = await chromium.launch();
const results = [];
const record = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '  ok  ' : ' FALLA'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

/* --- 1. Menú móvil ------------------------------------------------------ */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
  await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });

  const burger = page.locator('[data-burger]');
  record('hamburguesa visible en móvil', await burger.isVisible());

  await burger.click();
  await page.waitForTimeout(600);
  record('el panel móvil se abre', await page.locator('.drawer.is-open').count() === 1);
  record(
    'el panel bloquea el scroll del fondo',
    await page.evaluate(() => document.body.classList.contains('is-locked')),
  );

  await page.locator('.drawer summary').first().click();
  await page.waitForTimeout(300);
  record('los submenús se despliegan', await page.locator('.drawer-sub a').first().isVisible());

  await page.keyboard.press('Escape');
  await page.waitForTimeout(700);
  record('Escape cierra el panel', await page.locator('.drawer.is-open').count() === 0);

  // Nada debe desbordar horizontalmente en móvil.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  record('sin desbordamiento horizontal (390px)', overflow <= 0, `${overflow}px`);
  await page.close();
}

/* --- 2. Academia: filtro y búsqueda ------------------------------------- */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/academia`, { waitUntil: 'domcontentloaded' });

  const total = await page.locator('[data-post]').count();
  record('se listan todos los artículos', total === 6, `${total}`);

  await page.locator('[data-filter="Legado"]').click();
  await page.waitForTimeout(200);
  const filtered = await page.locator('[data-post]:not([hidden])').count();
  record('el filtro por categoría reduce el listado', filtered === 1, `${filtered} visible(s)`);

  await page.locator('[data-filter="*"]').click();
  await page.locator('[data-search]').fill('impuesto');
  await page.waitForTimeout(350);
  const searched = await page.locator('[data-post]:not([hidden])').count();
  record('la búsqueda filtra por texto', searched >= 1 && searched < total, `${searched} resultado(s)`);

  await page.locator('[data-search]').fill('zzzzz');
  await page.waitForTimeout(350);
  record('se muestra el estado vacío', await page.locator('[data-empty]').isVisible());

  record(
    'el estado queda reflejado en la URL',
    page.url().includes('q=zzzzz'),
    new URL(page.url()).search,
  );
  await page.close();
}

/* --- 3. Calculadora ------------------------------------------------------ */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/recursos`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);

  const before = await page.locator('[data-val="diff"]').textContent();
  const barH = await page.evaluate(
    () => getComputedStyle(document.querySelector('[data-bar="b"]')).height,
  );
  record('las barras del gráfico tienen altura', parseFloat(barH) > 20, barH);

  await page.locator('[data-in="years"]').fill('40');
  await page.waitForTimeout(250);
  const after = await page.locator('[data-val="diff"]').textContent();
  record('la calculadora reacciona a los controles', before !== after, `${before} → ${after}`);
  await page.close();
}

/* --- 4. Formulario de contacto ------------------------------------------ */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/contacto`, { waitUntil: 'domcontentloaded' });

  await page.locator('.cform-submit').click();
  await page.waitForTimeout(250);
  const shown = await page.locator('[data-error-for="name"]').textContent();
  record('la validación de cliente bloquea el envío vacío', !!shown?.trim(), shown ?? '');

  await page.fill('#cf-name', 'Cliente de prueba');
  await page.fill('#cf-email', 'correo-malo');
  await page.fill('#cf-phone', '3055551234');
  await page.locator('.cform-submit').click();
  await page.waitForTimeout(250);
  record(
    'detecta un correo inválido',
    !!(await page.locator('[data-error-for="email"]').textContent())?.trim(),
  );

  await page.fill('#cf-email', 'prueba@ejemplo.com');
  // La casilla real está oculta por diseño; se activa desde su etiqueta,
  // igual que haría una persona.
  await page.locator('.check-text').click();
  record(
    'la etiqueta activa la casilla de consentimiento',
    await page.locator('input[name="consent"]').isChecked(),
  );

  await page.locator('.cform-submit').click();
  await page.waitForTimeout(1200);
  record('el envío válido muestra confirmación', await page.locator('[data-state-ok]').isVisible());
  await page.close();
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} comprobaciones correctas`);
process.exit(failed.length ? 1 : 0);
