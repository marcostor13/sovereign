import type { APIRoute } from 'astro';
import { clean, clientIp, json, rateLimited, readJson } from '../../../../lib/server/http';
import { recordLead } from '../../../../lib/server/leads';
import { sendCapi } from '../../../../lib/server/capi';
import { readToken } from '../../../../lib/server/token';

/**
 * Progreso de la masterclass. Idempotente: el `event_id` de CAPI es
 * determinista por lead e hito, y el proceso recuerda qué hitos ya registró.
 */
export const prerender = false;

const MILESTONES = [25, 50, 75, 95] as const;
const CAPI_EVENTS: Partial<Record<(typeof MILESTONES)[number], string>> = {
  50: 'VioMasterclass50',
  95: 'VioMasterclass95',
};

const seen = new Set<string>();

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const payload = await readJson(request);
  if (!payload) return json({ ok: false, error: 'invalid_json' }, 400);

  const leadId = readToken(payload.token);
  if (!leadId) return json({ ok: false, error: 'invalid_token' }, 401);

  const percent = Number(payload.percent) as (typeof MILESTONES)[number];
  if (!MILESTONES.includes(percent)) return json({ ok: false, error: 'invalid_percent' }, 422);

  if (rateLimited(`wl-video:${clientIp(request, clientAddress)}`, 20)) return json({ ok: false, error: 'rate_limited' }, 429);

  const key = `${leadId}:${percent}`;
  if (seen.has(key)) return json({ ok: true, duplicate: true });
  seen.add(key);
  if (seen.size > 50_000) seen.clear();

  await recordLead({
    type: 'video_progress',
    leadId,
    producto: 'WL',
    stage: percent >= 50 ? 'vio_masterclass' : 'registrado',
    tags: [`video:${percent}`],
    percent,
  });

  const name = CAPI_EVENTS[percent];
  if (name) {
    await sendCapi({
      name,
      eventId: `${leadId}-video${percent}`,
      sourceUrl: clean(payload.pageUrl, 500) || undefined,
      request,
      clientAddress,
      user: { externalId: leadId, fbp: clean(payload.fbp, 200) || undefined, fbc: clean(payload.fbc, 300) || undefined },
      custom: { percent },
    });
  }

  return json({ ok: true });
};
