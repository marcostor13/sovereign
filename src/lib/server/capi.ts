import { createHash } from 'node:crypto';
import { clientIp } from './http';

/**
 * Meta Conversions API (server-side).
 *
 * Se activa con `PUBLIC_META_PIXEL_ID` + `META_CAPI_TOKEN`. El `event_id` es
 * el mismo que el navegador envía al píxel, así Meta deduplica ambos. Para
 * eventos repetibles (progreso de video) se usa un id determinista por lead,
 * de modo que un reintento nunca cuenta dos veces.
 *
 * `META_TEST_EVENT_CODE` manda los eventos a "Test Events" del Events Manager.
 */

const API_VERSION = 'v21.0';

const sha256 = (v: string) => createHash('sha256').update(v).digest('hex');
const norm = (v?: string) => (v || '').trim().toLowerCase();

export interface CapiUser {
  email?: string;
  phone?: string; // E.164
  firstName?: string;
  state?: string; // código de dos letras
  country?: string;
  externalId?: string;
  fbp?: string;
  fbc?: string;
}

export interface CapiEvent {
  name: string;
  eventId: string;
  sourceUrl?: string;
  user: CapiUser;
  custom?: Record<string, unknown>;
  request?: Request;
  clientAddress?: string;
  /** `website` para eventos de navegador; `system_generated` para webhooks/CRM. */
  actionSource?: 'website' | 'system_generated' | 'physical_store' | 'crm';
}

export async function sendCapi(event: CapiEvent) {
  const pixel = process.env.PUBLIC_META_PIXEL_ID || import.meta.env.PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return false;

  const u = event.user;
  const firstName = norm(u.firstName).split(/\s+/)[0];
  const user_data: Record<string, unknown> = {
    em: u.email ? [sha256(norm(u.email))] : undefined,
    ph: u.phone ? [sha256(u.phone.replace(/\D/g, ''))] : undefined,
    fn: firstName ? [sha256(firstName)] : undefined,
    st: u.state ? [sha256(norm(u.state))] : undefined,
    country: [sha256(norm(u.country || 'us'))],
    external_id: u.externalId ? [sha256(u.externalId)] : undefined,
    fbp: u.fbp,
    fbc: u.fbc,
  };

  if (event.request) {
    user_data.client_ip_address = clientIp(event.request, event.clientAddress);
    user_data.client_user_agent = event.request.headers.get('user-agent') || undefined;
  }

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: event.name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: event.actionSource || 'website',
        event_source_url: event.sourceUrl,
        user_data,
        custom_data: event.custom,
      },
    ],
  };

  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error(`[capi] ${event.name} respondió ${res.status}: ${await res.text().catch(() => '')}`);
    return res.ok;
  } catch (err) {
    console.error(`[capi] fallo al enviar ${event.name}:`, err);
    return false;
  }
}

/** Dispara varios eventos sin bloquear la respuesta al visitante más de lo necesario. */
export const sendCapiAll = (events: CapiEvent[]) => Promise.allSettled(events.map(sendCapi));
