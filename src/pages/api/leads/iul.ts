import type { APIRoute } from 'astro';
import { json, readJson, obj } from '../../../lib/server/http';
import { consentRecord, newLeadId, parseContact, parseTracking, recordLead } from '../../../lib/server/leads';
import { sendCapiAll, type CapiEvent } from '../../../lib/server/capi';
import { bookingUrl, eventIdFrom, guard, pageUrlFrom } from '../../../lib/server/funnel';
import { IUL_OPTIONS, isOption, qualifyIul } from '../../../lib/funnels/qualify';
import { licensedStates, usStates } from '../../../data/compliance';

/**
 * Diagnóstico IUL (landing /iul).
 * La calificación se recalcula aquí: el resultado que ve el visitante sale del
 * servidor, no del navegador.
 */
export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const payload = await readJson(request);
  if (!payload) return json({ ok: false, error: 'invalid_json' }, 400);

  const blocked = await guard(request, clientAddress, payload, 'iul');
  if (blocked) return blocked;

  const a = obj(payload.answers);
  const answers = {
    objetivo: String(a.objetivo ?? ''),
    edad: String(a.edad ?? ''),
    estado: String(a.estado ?? '').toUpperCase(),
    aporte: String(a.aporte ?? ''),
    fondoEmergencia: String(a.fondoEmergencia ?? ''),
    horizonte: String(a.horizonte ?? ''),
    seguroActual: String(a.seguroActual ?? ''),
  };

  const errors: Record<string, string> = {};
  (Object.keys(IUL_OPTIONS) as (keyof typeof IUL_OPTIONS)[]).forEach((k) => {
    if (!isOption(IUL_OPTIONS[k], answers[k])) errors[k] = 'invalid';
  });
  if (!usStates.some((s) => s.code === answers.estado)) errors.estado = 'invalid';

  const { contact, errors: contactErrors } = parseContact(payload.contact);
  Object.assign(errors, contactErrors);
  if (obj(payload.consent).accepted !== true) errors.consent = 'required';

  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const q = qualifyIul(answers, licensedStates);
  const leadId = newLeadId();
  const tracking = parseTracking(payload.tracking);
  const pageUrl = pageUrlFrom(payload, request);
  const eventId = eventIdFrom(payload, leadId);
  const booking = q.result === 'A' ? bookingUrl('iul', contact, leadId) : null;

  const stored = await recordLead({
    type: 'lead',
    leadId,
    producto: 'IUL',
    stage: q.qualifies ? 'calificado' : 'nurturing',
    tags: ['producto:IUL', `califica:${q.qualifies}`, `score:${q.score}`, `resultado:${q.result}`, `prioridad:${q.priority}`],
    result: q.result,
    score: q.score,
    priority: q.priority,
    answers,
    contact,
    tracking,
    consentLog: [consentRecord('iul', request, clientAddress, pageUrl)],
  });

  if (!stored) return json({ ok: false, error: 'storage_unavailable' }, 500);

  const user = {
    email: contact.email,
    phone: contact.telefono,
    firstName: contact.nombre,
    state: answers.estado,
    externalId: leadId,
    fbp: tracking.fbp,
    fbc: tracking.fbc,
  };
  const events: CapiEvent[] = [
    { name: 'Lead', eventId, sourceUrl: pageUrl, user, request, clientAddress, custom: { content_name: 'diagnostico_iul' } },
  ];
  if (q.result === 'A') {
    events.push({
      name: 'LeadCalificado',
      eventId: `${eventId}-q`,
      sourceUrl: pageUrl,
      user,
      request,
      clientAddress,
      custom: { value: q.score, currency: 'USD', content_name: 'diagnostico_iul' },
    });
  }
  await sendCapiAll(events);

  console.log(`[iul] lead ${leadId} → ${q.result} (score ${q.score})`);

  return json({ ok: true, leadId, result: q.result, score: q.score, bookingUrl: booking });
};
