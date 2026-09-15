import type { APIRoute } from 'astro';
import { clean, isEmail, json, obj, readJson } from '../../../lib/server/http';
import { consentRecord, newLeadId, parseTracking, recordLead } from '../../../lib/server/leads';
import { sendCapi } from '../../../lib/server/capi';
import { eventIdFrom, guard, pageUrlFrom } from '../../../lib/server/funnel';

/**
 * Descarga de las guías "de la A a la Z". Sólo pide nombre y email (con
 * consentimiento de email). Si la guía está publicada (`GUIDE_URL_IUL` /
 * `GUIDE_URL_WL`) se devuelve el enlace; si no, el CRM la envía por correo.
 */
export const prerender = false;

const GUIDES = {
  iul: { product: 'IUL' as const, env: 'GUIDE_URL_IUL', name: 'IUL de la A a la Z' },
  wl: { product: 'WL' as const, env: 'GUIDE_URL_WL', name: 'Whole Life para Banca Infinita de la A a la Z' },
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const payload = await readJson(request);
  if (!payload) return json({ ok: false, error: 'invalid_json' }, 400);

  const blocked = await guard(request, clientAddress, payload, 'guia');
  if (blocked) return blocked;

  const key = clean(payload.guide, 4) as keyof typeof GUIDES;
  const guide = GUIDES[key];
  const nombre = clean(payload.nombre, 120);
  const email = clean(payload.email, 160).toLowerCase();

  const errors: Record<string, string> = {};
  if (!guide) errors.guide = 'invalid';
  if (!nombre) errors.nombre = 'required';
  if (!isEmail(email)) errors.email = 'invalid';
  if (obj(payload.consent).accepted !== true) errors.consent = 'required';
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const leadId = newLeadId();
  const tracking = parseTracking(payload.tracking);
  const pageUrl = pageUrlFrom(payload, request);

  const stored = await recordLead({
    type: 'descarga_guia',
    leadId,
    producto: guide.product,
    stage: 'nurturing',
    tags: [`producto:${guide.product}`, `guia:${key}`],
    guide: guide.name,
    contact: { nombre, email },
    tracking,
    consentLog: [consentRecord('guide', request, clientAddress, pageUrl)],
  });
  if (!stored) return json({ ok: false, error: 'storage_unavailable' }, 500);

  await sendCapi({
    name: 'DescargaGuia',
    eventId: eventIdFrom(payload, leadId),
    sourceUrl: pageUrl,
    request,
    clientAddress,
    user: { email, firstName: nombre, externalId: leadId, fbp: tracking.fbp, fbc: tracking.fbc },
    custom: { content_name: guide.name },
  });

  return json({ ok: true, downloadUrl: process.env[guide.env] || null });
};
