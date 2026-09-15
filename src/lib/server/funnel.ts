import { clean, clientIp, json, rateLimited, turnstileOk } from './http';
import type { Contact } from './leads';

/**
 * Filtros comunes a todos los envíos de los embudos: campo trampa, límite por
 * IP y Turnstile. Devuelve una respuesta si el envío debe cortarse aquí.
 */
export async function guard(
  request: Request,
  clientAddress: string | undefined,
  payload: Record<string, unknown>,
  scope: string,
): Promise<Response | null> {
  // Campo trampa: sólo lo rellenan los bots. Se responde como un envío normal
  // para no darles señal de que fueron detectados.
  if (clean(payload.website, 200)) return json({ ok: true, result: 'B' });

  const ip = clientIp(request, clientAddress);
  if (rateLimited(`${scope}:${ip}`)) return json({ ok: false, error: 'rate_limited' }, 429);

  if (!(await turnstileOk(payload.turnstile, ip))) return json({ ok: false, error: 'challenge_failed' }, 403);

  return null;
}

/** Id de evento compartido con el píxel del navegador (deduplicación). */
export const eventIdFrom = (payload: Record<string, unknown>, fallback: string) =>
  clean(payload.eventId, 80).replace(/[^\w-]/g, '') || fallback;

/**
 * URL de la agenda (Cal.com o Calendly) con los datos precargados. Se lee en
 * tiempo de ejecución para poder cambiar de agenda sin recompilar.
 */
export function bookingUrl(product: 'iul' | 'wl', contact: Contact, leadId: string) {
  const base = product === 'iul' ? process.env.PUBLIC_BOOKING_URL_IUL : process.env.PUBLIC_BOOKING_URL_WL;
  const raw = base || process.env.PUBLIC_BOOKING_URL;
  if (!raw) return null;

  try {
    const url = new URL(raw);
    url.searchParams.set('name', contact.nombre);
    url.searchParams.set('email', contact.email);
    // Cal.com lo devuelve en el webhook; Calendly lo ignora sin error.
    url.searchParams.set('metadata[leadId]', leadId);
    url.searchParams.set('embed', 'true');
    return url.href;
  } catch {
    console.error('[booking] URL de agenda inválida:', raw);
    return null;
  }
}

/** Página desde la que se envió, validada contra el propio sitio. */
export function pageUrlFrom(payload: Record<string, unknown>, request: Request) {
  const given = clean(payload.pageUrl, 500);
  const referer = request.headers.get('referer') || '';
  const candidate = given || referer;
  try {
    const u = new URL(candidate);
    return `${u.origin}${u.pathname}`;
  } catch {
    return '';
  }
}
