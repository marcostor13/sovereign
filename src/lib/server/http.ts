/**
 * Primitivas compartidas por los endpoints de `src/pages/api/`.
 * Sólo se importan desde código de servidor.
 */

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export const obj = (v: unknown): Record<string, unknown> =>
  v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {};

/**
 * IP real del visitante. Detrás de Cloudflare/Coolify la conexión llega desde
 * el proxy, así que se prefieren sus cabeceras.
 */
export const clientIp = (request: Request, fallback?: string) =>
  request.headers.get('cf-connecting-ip') ||
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  request.headers.get('x-real-ip') ||
  fallback ||
  'unknown';

/* --- Límite de envíos por IP (ventana en memoria) ------------------------ */

const buckets = new Map<string, number[]>();

export function rateLimited(key: string, max = 6, windowMs = 60_000) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > 5000) {
    for (const [k, times] of buckets) if (!times.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return hits.length > max;
}

/* --- Teléfono ------------------------------------------------------------- */

/**
 * Normaliza a E.164. Para +1 exige 10 dígitos nacionales; para el resto, entre
 * 7 y 12. Devuelve '' si no es válido.
 */
export function toE164(country: string, phone: string) {
  const cc = country.replace(/\D/g, '').slice(0, 3) || '1';
  let digits = phone.replace(/\D/g, '');
  // Si la persona escribió el prefijo del país dentro del número, no se duplica.
  if (digits.startsWith(cc) && digits.length > (cc === '1' ? 10 : 9)) digits = digits.slice(cc.length);
  if (cc === '1' ? digits.length !== 10 : digits.length < 7 || digits.length > 12) return '';
  return `+${cc}${digits}`;
}

/* --- Cloudflare Turnstile (opcional) ------------------------------------- */

export async function turnstileOk(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== 'string' || !token) return false;

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(6000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    // Si Cloudflare no responde no se pierde el lead: el honeypot y el límite
    // por IP siguen activos.
    console.error('[turnstile] verificación no disponible:', err);
    return true;
  }
}
