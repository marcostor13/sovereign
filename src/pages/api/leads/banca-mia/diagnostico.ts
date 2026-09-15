import type { APIRoute } from 'astro';
import { clean, json, readJson, obj } from '../../../../lib/server/http';
import { consentRecord, newLeadId, parseContact, parseTracking, recordLead } from '../../../../lib/server/leads';
import { sendCapiAll, type CapiEvent } from '../../../../lib/server/capi';
import { readToken } from '../../../../lib/server/token';
import { bookingUrl, eventIdFrom, guard, pageUrlFrom } from '../../../../lib/server/funnel';
import { WL_OPTIONS, isOption, qualifyWholeLife } from '../../../../lib/funnels/qualify';
import { licensedStates, usStates } from '../../../../data/compliance';

/** Diagnóstico de Capital Banca Mía™ (/banca-mia/diagnostico). */
export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const payload = await readJson(request);
  if (!payload) return json({ ok: false, error: 'invalid_json' }, 400);

  const blocked = await guard(request, clientAddress, payload, 'wl-diagnostico');
  if (blocked) return blocked;

  const a = obj(payload.answers);
  const answers = {
    negocio: clean(a.negocio, 120),
    aniosNegocio: String(a.aniosNegocio ?? ''),
    ingresos: String(a.ingresos ?? ''),
    excedente: String(a.excedente ?? ''),
    fondoEmergencia: String(a.fondoEmergencia ?? ''),
    uso: Array.isArray(a.uso) ? a.uso.map(String).filter((u) => isOption(WL_OPTIONS.uso, u)) : [],
    horizonte: String(a.horizonte ?? ''),
    valora: String(a.valora ?? ''),
    edad: String(a.edad ?? ''),
    contador: String(a.contador ?? ''),
    estado: String(a.estado ?? '').toUpperCase(),
  };

  const errors: Record<string, string> = {};
  (['aniosNegocio', 'ingresos', 'excedente', 'fondoEmergencia', 'horizonte', 'valora', 'edad', 'contador'] as const).forEach((k) => {
    if (!isOption(WL_OPTIONS[k], answers[k])) errors[k] = 'invalid';
  });
  if (!answers.uso.length) errors.uso = 'required';
  if (!usStates.some((s) => s.code === answers.estado)) errors.estado = 'invalid';

  const { contact, errors: contactErrors } = parseContact(payload.contact);
  Object.assign(errors, contactErrors);
  if (obj(payload.consent).accepted !== true) errors.consent = 'required';

  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  // Si llega desde la masterclass, se continúa el mismo lead.
  const tokenLead = readToken(payload.token);
  const leadId = tokenLead || newLeadId();
  const q = qualifyWholeLife(answers, licensedStates);
  const tracking = parseTracking(payload.tracking);
  const pageUrl = pageUrlFrom(payload, request);
  const eventId = eventIdFrom(payload, leadId);
  const product = q.result === 'D' ? 'IUL+WL' : 'WL';
  const booking = q.result === 'A' || q.result === 'D' ? bookingUrl('wl', contact, leadId) : null;

  const stored = await recordLead({
    type: 'diagnostico',
    leadId,
    producto: product,
    stage: q.qualifies ? 'aplico' : 'nurturing',
    tags: [
      `producto:${product}`,
      `califica:${q.qualifies}`,
      `score:${q.score}`,
      `resultado:${q.result}`,
      `prioridad:${q.priority}`,
      ...(q.priority === 'alta' ? ['asesor:senior'] : []),
      ...(answers.contador === 'si' ? ['invitar:contador'] : []),
    ],
    result: q.result,
    score: q.score,
    priority: q.priority,
    answers,
    contact,
    tracking,
    consentLog: [consentRecord('wholeLife', request, clientAddress, pageUrl)],
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
  const events: CapiEvent[] = [];
  if (!tokenLead) {
    events.push({ name: 'Lead', eventId, sourceUrl: pageUrl, user, request, clientAddress, custom: { content_name: 'diagnostico_banca_mia' } });
  }
  if (q.qualifies) {
    events.push({
      name: 'LeadCalificado',
      eventId: `${eventId}-q`,
      sourceUrl: pageUrl,
      user,
      request,
      clientAddress,
      custom: { value: q.score, currency: 'USD', content_name: 'diagnostico_banca_mia' },
    });
  }
  await sendCapiAll(events);

  console.log(`[banca-mia] diagnóstico ${leadId} → ${q.result} (score ${q.score})`);

  return json({ ok: true, leadId, result: q.result, score: q.score, bookingUrl: booking });
};
