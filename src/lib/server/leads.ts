import { appendFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { clean, clientIp, isEmail, obj, toE164 } from './http';
import { consent as consentTexts, type ConsentKind } from '../../data/compliance';

/**
 * Registro y reenvío de leads de los embudos.
 *
 *  - `LEADS_LOG_PATH`    → una línea JSON por evento (append-only). Es también
 *                          la prueba de consentimiento: nunca se reescribe.
 *  - `LEADS_WEBHOOK_URL` → CRM (Maya, GoHighLevel, HubSpot vía Zapier/Make/n8n).
 *
 * Cada evento lleva `leadId`, así que las actualizaciones (progreso de video,
 * diagnóstico, cita) se reconstruyen en el CRM sin mutar registros previos.
 */

const LOG_PATH = () => process.env.LEADS_LOG_PATH || './data/funnels.jsonl';
const WEBHOOK = () => process.env.LEADS_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL;

export const newLeadId = () => randomUUID();

export interface Contact {
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
}

/** Valida y normaliza el bloque de contacto. Devuelve errores por campo. */
export function parseContact(raw: unknown): { contact: Contact; errors: Record<string, string> } {
  const c = obj(raw);
  const pais = clean(c.pais, 5) || '+1';
  const contact: Contact = {
    nombre: clean(c.nombre, 120),
    email: clean(c.email, 160).toLowerCase(),
    telefono: toE164(pais, clean(c.telefono, 40)),
    pais,
  };

  const errors: Record<string, string> = {};
  if (!contact.nombre) errors.nombre = 'required';
  if (!isEmail(contact.email)) errors.email = 'invalid';
  if (!contact.telefono) errors.telefono = 'invalid';
  return { contact, errors };
}

export interface ConsentRecord {
  accepted: true;
  kind: ConsentKind;
  text: string;
  version: string;
  ip: string;
  ua: string;
  ts: string;
  pageUrl: string;
}

/**
 * Construye el registro de consentimiento con el texto que el servidor sabe
 * que se mostró (no el que manda el cliente), su versión, IP y user agent.
 */
export function consentRecord(kind: ConsentKind, request: Request, clientAddress: string | undefined, pageUrl: string): ConsentRecord {
  return {
    accepted: true,
    kind,
    text: consentTexts[kind],
    version: consentTexts.version,
    ip: clientIp(request, clientAddress),
    ua: request.headers.get('user-agent') || '',
    ts: new Date().toISOString(),
    pageUrl,
  };
}

const TRACKING_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'fbp', 'fbc', 'landingVariant'] as const;

export type Tracking = Partial<Record<(typeof TRACKING_KEYS)[number], string>>;

export function parseTracking(raw: unknown): Tracking {
  const t = obj(raw);
  const out: Tracking = {};
  for (const k of TRACKING_KEYS) {
    const v = clean(t[k], 300);
    if (v) out[k] = v;
  }
  return out;
}

export interface LeadEvent {
  type: string;
  leadId: string;
  producto: 'IUL' | 'WL' | 'IUL+WL' | 'GENERAL';
  stage: string;
  tags: string[];
  [key: string]: unknown;
}

export async function recordLead(event: LeadEvent) {
  const record = { ...event, receivedAt: new Date().toISOString() };
  const webhook = WEBHOOK();
  let delivered = false;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(8000),
      });
      delivered = res.ok;
      if (!res.ok) console.error(`[leads] el CRM respondió ${res.status} (${event.type})`);
    } catch (err) {
      console.error('[leads] fallo al enviar al CRM:', err);
    }
  }

  try {
    const path = LOG_PATH();
    await mkdir(dirname(path), { recursive: true });
    await appendFile(path, `${JSON.stringify(record)}\n`, 'utf8');
    return true;
  } catch (err) {
    console.error('[leads] no se pudo escribir el registro:', err);
    // Sin disco y sin CRM el lead se perdería: el endpoint debe fallar.
    return delivered;
  }
}
