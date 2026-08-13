import type { APIRoute } from 'astro';
import { appendFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

/**
 * Recepción de solicitudes de consulta.
 *
 * Se ejecuta en el servidor (el resto del sitio es estático). Valida en el
 * back-end además del navegador, porque la validación de cliente es una
 * comodidad, no una defensa.
 *
 * Entrega, en este orden:
 *   1. `CONTACT_WEBHOOK_URL`  → reenvía el lead (Zapier, Make, CRM, n8n…).
 *   2. Siempre                → deja constancia en `CONTACT_LOG_PATH`.
 *
 * Configúralo en el entorno de Coolify. Sin webhook el formulario sigue
 * funcionando y las solicitudes quedan registradas en disco.
 */
export const prerender = false;

const LOG_PATH = process.env.CONTACT_LOG_PATH || './data/leads.jsonl';
const WEBHOOK = process.env.CONTACT_WEBHOOK_URL;

const MAX = { name: 120, email: 160, phone: 40, profile: 60, interest: 80, message: 4000 };

// Ventana simple en memoria: frena el envío repetido desde una misma IP.
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

const rateLimited = (ip: string) => {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);

  // Evita que el mapa crezca sin control en procesos de larga vida.
  if (recent.size > 5000) {
    for (const [key, times] of recent) {
      if (!times.some((t) => now - t < WINDOW_MS)) recent.delete(key);
    }
  }

  return hits.length > MAX_PER_WINDOW;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Campo trampa: sólo lo rellenan los bots. Se responde 200 a propósito
  // para no darles señal de que fueron detectados.
  if (clean(payload.company, 200)) return json({ ok: true });

  const ip = clientAddress || 'unknown';
  if (rateLimited(ip)) return json({ ok: false, error: 'rate_limited' }, 429);

  const data = {
    name: clean(payload.name, MAX.name),
    email: clean(payload.email, MAX.email),
    phone: clean(payload.phone, MAX.phone),
    profile: clean(payload.profile, MAX.profile),
    interest: clean(payload.interest, MAX.interest),
    message: clean(payload.message, MAX.message),
    consent: payload.consent === true,
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = 'required';
  if (!data.email) errors.email = 'required';
  else if (!isEmail(data.email)) errors.email = 'invalid';
  if (!data.phone) errors.phone = 'required';
  if (!data.consent) errors.consent = 'required';

  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const record = {
    ...data,
    receivedAt: new Date().toISOString(),
    source: request.headers.get('referer') || 'directo',
    userAgent: request.headers.get('user-agent') || '',
  };

  if (WEBHOOK) {
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) console.error(`[contacto] webhook respondió ${res.status}`);
    } catch (err) {
      console.error('[contacto] fallo al enviar al webhook:', err);
    }
  }

  try {
    await mkdir(dirname(LOG_PATH), { recursive: true });
    await appendFile(LOG_PATH, `${JSON.stringify(record)}\n`, 'utf8');
  } catch (err) {
    console.error('[contacto] no se pudo escribir el registro:', err);
    // Si además no hay webhook, el lead se habría perdido: hay que avisar.
    if (!WEBHOOK) return json({ ok: false, error: 'storage_unavailable' }, 500);
  }

  console.log(`[contacto] nueva solicitud de ${record.name} <${record.email}>`);

  return json({ ok: true });
};
