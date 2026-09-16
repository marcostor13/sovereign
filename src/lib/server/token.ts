import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

/**
 * Token de continuidad del lead entre los dos pasos del embudo Banca Mía™
 * (HMAC-SHA256, 30 días).
 *
 * Sólo transporta el `leadId` y la expiración: nunca datos personales, porque
 * viaja en la URL. Firmado con `LEAD_TOKEN_SECRET`; sin secreto configurado se
 * usa uno efímero por proceso (válido en desarrollo, se invalida al reiniciar).
 */

let ephemeral: Buffer | undefined;

const secret = () => {
  const s = process.env.LEAD_TOKEN_SECRET;
  if (s) return s;
  if (!ephemeral) {
    ephemeral = randomBytes(32);
    console.warn('[token] LEAD_TOKEN_SECRET no está definido: se usa un secreto temporal.');
  }
  return ephemeral;
};

const b64 = (buf: Buffer | string) => Buffer.from(buf).toString('base64url');
const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest();

export const TOKEN_TTL_DAYS = 30;

export function issueToken(leadId: string) {
  const payload = b64(JSON.stringify({ l: leadId, x: Date.now() + TOKEN_TTL_DAYS * 86_400_000 }));
  return `${payload}.${b64(sign(payload))}`;
}

export function readToken(token: unknown): string | null {
  if (typeof token !== 'string' || token.length > 400) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;

  const expected = sign(payload);
  const given = Buffer.from(sig, 'base64url');
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { l?: string; x?: number };
    if (!data.l || !data.x || data.x < Date.now()) return null;
    return data.l;
  } catch {
    return null;
  }
}
