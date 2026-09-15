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
  record('se listan todos los artículos', total === 8, `${total}`);

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

/* --- 5. Landing IUL: simulador y diagnóstico completo ------------------- */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/iul`, { waitUntil: 'domcontentloaded' });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  record('IUL: sin desbordamiento horizontal (390px)', overflow <= 0, `${overflow}px`);
  record('IUL: CTA fijo visible en móvil', await page.locator('[data-sticky-cta]').isVisible());
  record('IUL: footer con aviso legal del IUL', (await page.locator('.lf').textContent())?.includes('seguro de vida universal indexado'));

  await page.locator('[data-preset="-10"]').click();
  record('IUL: el simulador aplica el floor', (await page.locator('[data-val="credit"]').textContent())?.trim() === '0.0%');

  const quiz = page.locator('[data-stepform]');
  const pick = async (value) => {
    await quiz.locator(`fieldset:not([hidden]) label:has(input[value="${value}"])`).click();
    await page.waitForTimeout(420);
  };

  await quiz.scrollIntoViewIfNeeded();
  await quiz.locator('[data-next]').click();
  record('IUL: no avanza sin respuesta', !!(await quiz.locator('fieldset:not([hidden]) [data-step-error]').textContent())?.trim());

  for (const v of ['retiro', '28-40', 'FL', '500-1000', 'si', '>10', 'no']) await pick(v);
  record('IUL: llega al paso de contacto', await quiz.locator('fieldset[data-type="contact"]:not([hidden])').count() === 1);

  await quiz.locator('[name="nombre"]').fill('Prueba Check');
  await quiz.locator('[name="email"]').fill('check@ejemplo.com');
  await quiz.locator('[name="telefono"]').fill('3055551234');
  await quiz.locator('[data-submit]').click();
  await page.waitForTimeout(300);
  record('IUL: exige consentimiento TCPA', !!(await quiz.locator('[data-error-for="consent"]').textContent())?.trim());

  await quiz.locator('.sf-check-text').click({ position: { x: 5, y: 5 } });
  await quiz.locator('[data-submit]').click();
  await page.locator('[data-result="A"]:not([hidden])').waitFor({ timeout: 8000 }).catch(() => {});
  record('IUL: perfil calificado muestra resultado A', await page.locator('[data-result="A"]').isVisible());
  record('IUL: el resultado saluda por nombre', (await page.locator('[data-result="A"] h3').textContent())?.includes('Prueba'));
  await page.close();
}

/* --- 6. Banca Mía™: registro → masterclass → diagnóstico --------------- */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/banca-mia`, { waitUntil: 'domcontentloaded' });

  record('WL: la regla de oro aparece en el hero', (await page.locator('.wl-golden').textContent())?.includes('No es un banco'));

  const form = page.locator('#registro-hero [data-stepform]');
  await form.locator('label:has(input[value="negocio"])').click();
  await form.locator('label:has(input[name="estado"][value="FL"])').click();
  await form.locator('label:has(input[value="liquidez"])').click();
  await form.locator('[name="nombre"]').fill('Empresaria Check');
  await form.locator('[name="email"]').fill('wl@ejemplo.com');
  await form.locator('[name="telefono"]').fill('3055559876');
  await form.locator('.sf-check-text').click({ position: { x: 5, y: 5 } });
  await Promise.all([page.waitForURL(/\/banca-mia\/masterclass\?t=/, { timeout: 8000 }).catch(() => {}), form.locator('[data-submit]').click()]);
  record('WL: el registro lleva a la masterclass con token', /\/banca-mia\/masterclass\?t=/.test(page.url()), new URL(page.url()).pathname);
  record('WL: la masterclass saluda por nombre', (await page.locator('[data-welcome]').textContent())?.includes('Empresaria'));

  await page.goto(`${base}/banca-mia/diagnostico`, { waitUntil: 'domcontentloaded' });
  const dg = page.locator('[data-stepform]');
  const pick = async (sel) => {
    await dg.locator(`fieldset:not([hidden]) label:has(${sel})`).first().click();
    await page.waitForTimeout(420);
  };

  await dg.locator('fieldset:not([hidden]) input[type="text"]').fill('Construcción');
  await pick('input[value=">5"]');
  await dg.locator('[data-next]').click();
  await pick('input[value="250k-1m"]');
  await pick('input[value="1500-5000"]');
  await pick('input[value="si"]');
  await pick('input[value="inventario"]');
  await dg.locator('[data-next]').click();
  await pick('input[value=">15"]');
  await pick('input[value="crecimiento"]');
  await pick('input[value="46-55"]');
  await pick('input[value="si"]');
  await pick('input[value="FL"]');
  record('WL: el contacto llega precargado', (await dg.locator('[name="email"]').inputValue()) === 'wl@ejemplo.com');

  await dg.locator('.sf-check-text').click({ position: { x: 5, y: 5 } });
  await dg.locator('[data-submit]').click();
  await page.locator('[data-result="D"]:not([hidden])').waitFor({ timeout: 8000 }).catch(() => {});
  record('WL: prefiere crecimiento → resultado D (comparar con IUL)', await page.locator('[data-result="D"]').isVisible());
  await page.close();
}

/* --- 7. Sitio: arreglos del diagnóstico -------------------------------- */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
  const html = await page.content();
  record('portada: sin contadores en 0 en el HTML', !/data-count="\d+"[^>]*>0</.test(html));
  record('portada: sin enlaces a redes genéricas', !/href="https:\/\/www\.(instagram|facebook|linkedin|youtube)\.com\/"/.test(html));
  record('portada: bloque regulatorio en el pie', await page.locator('.footer-reg').isVisible());
  record('portada: enlaza a los dos embudos', (await page.locator('a[href="/iul"]').count()) > 0 && (await page.locator('a[href="/banca-mia"]').count()) > 0);
  await page.close();
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} comprobaciones correctas`);
process.exit(failed.length ? 1 : 0);
