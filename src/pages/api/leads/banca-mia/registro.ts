import type { APIRoute } from 'astro';
import { json, readJson, obj } from '../../../../lib/server/http';
import { consentRecord, newLeadId, parseContact, parseTracking, recordLead } from '../../../../lib/server/leads';
import { sendCapi } from '../../../../lib/server/capi';
import { issueToken } from '../../../../lib/server/token';
import { eventIdFrom, guard, pageUrlFrom } from '../../../../lib/server/funnel';
import { WL_REGISTRO_OPTIONS as REGISTRO_OPTIONS, isOption } from '../../../../lib/funnels/qualify';
import { licensedStates, usStates } from '../../../../data/compliance';

/** Registro a la masterclass Banca Mía™ (landing /banca-mia). */
export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const payload = await readJson(request);
  if (!payload) return json({ ok: false, error: 'invalid_json' }, 400);

  const blocked = await guard(request, clientAddress, payload, 'wl-registro');
  if (blocked) return blocked;

  const a = obj(payload.answers);
  const answers = {
    negocio: String(a.negocio ?? ''),
    estado: String(a.estado ?? '').toUpperCase(),
    interes: String(a.interes ?? ''),
  };

  const errors: Record<string, string> = {};
  if (!isOption(REGISTRO_OPTIONS.negocio, answers.negocio)) errors.negocio = 'invalid';
  if (!isOption(REGISTRO_OPTIONS.interes, answers.interes)) errors.interes = 'invalid';
  if (!usStates.some((s) => s.code === answers.estado)) errors.estado = 'invalid';

  const { contact, errors: contactErrors } = parseContact(payload.contact);
  Object.assign(errors, contactErrors);
  if (obj(payload.consent).accepted !== true) errors.consent = 'required';

  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const leadId = newLeadId();
  const tracking = parseTracking(payload.tracking);
  const pageUrl = pageUrlFrom(payload, request);
  const eventId = eventIdFrom(payload, leadId);
  const inState = licensedStates.includes(answers.estado);

  const stored = await recordLead({
    type: 'registro_masterclass',
    leadId,
    producto: 'WL',
    stage: 'registrado',
    tags: ['producto:WL', `negocio:${answers.negocio}`, `interes:${answers.interes}`, `estado_licencia:${inState}`],
    answers,
    contact,
    tracking,
    consentLog: [consentRecord('wholeLife', request, clientAddress, pageUrl)],
  });

  if (!stored) return json({ ok: false, error: 'storage_unavailable' }, 500);

  await sendCapi({
    name: 'Lead',
    eventId,
    sourceUrl: pageUrl,
    request,
    clientAddress,
    user: {
      email: contact.email,
      phone: contact.telefono,
      firstName: contact.nombre,
      state: answers.estado,
      externalId: leadId,
      fbp: tracking.fbp,
      fbc: tracking.fbc,
    },
    custom: { content_name: 'masterclass_banca_mia' },
  });

  console.log(`[banca-mia] registro ${leadId}`);

  return json({ ok: true, leadId, token: issueToken(leadId) });
};
