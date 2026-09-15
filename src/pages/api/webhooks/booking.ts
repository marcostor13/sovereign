import type { APIRoute } from 'astro';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { json, obj } from '../../../lib/server/http';
import { recordLead } from '../../../lib/server/leads';
import { sendCapi } from '../../../lib/server/capi';

/**
 * Webhook de agenda (Cal.com). Configurar en Cal.com → Settings → Developer →
 * Webhooks, con el mismo secreto en `CAL_WEBHOOK_SECRET`.
 *
 * BOOKING_CREATED → etapa `cita_agendada` en el CRM + evento `Schedule` en CAPI.
 * El `leadId` viaja como `metadata[leadId]` en la URL de la agenda.
 */
export const prerender = false;

const validSignature = (raw: string, header: string | null, secret: string) => {
  if (!header) return false;
  const expected = createHmac('sha256', secret).update(raw).digest();
  const given = Buffer.from(header.replace(/^sha256=/, ''), 'hex');
  return given.length === expected.length && timingSafeEqual(given, expected);
};

export const POST: APIRoute = async ({ request }) => {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) return json({ ok: false, error: 'not_configured' }, 501);

  const raw = await request.text();
  if (!validSignature(raw, request.headers.get('x-cal-signature-256'), secret)) {
    return json({ ok: false, error: 'invalid_signature' }, 401);
  }

  let body: Record<string, unknown>;
  try {
    body = obj(JSON.parse(raw));
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  const trigger = String(body.triggerEvent || '');
  const p = obj(body.payload);
  const attendee = obj(Array.isArray(p.attendees) ? p.attendees[0] : undefined);
  const metadata = obj(p.metadata);
  const responses = obj(p.responses);
  const leadId = String(metadata.leadId || '') || `booking-${String(p.uid || Date.now())}`;
  const uid = String(p.uid || leadId);

  const stage = trigger === 'BOOKING_CANCELLED' ? 'cita_cancelada' : trigger === 'BOOKING_RESCHEDULED' ? 'cita_reagendada' : 'cita_agendada';

  await recordLead({
    type: 'booking',
    leadId,
    producto: 'GENERAL',
    stage,
    tags: [`agenda:${trigger.toLowerCase()}`],
    booking: {
      uid,
      title: p.title,
      startTime: p.startTime,
      endTime: p.endTime,
      timeZone: attendee.timeZone,
      attendee: { name: attendee.name, email: attendee.email },
      guests: responses.guests,
    },
  });

  if (trigger === 'BOOKING_CREATED') {
    await sendCapi({
      name: 'Schedule',
      eventId: `booking-${uid}`,
      actionSource: 'system_generated',
      user: { email: String(attendee.email || '') || undefined, firstName: String(attendee.name || '') || undefined, externalId: leadId },
    });
  }

  return json({ ok: true });
};
