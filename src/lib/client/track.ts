/**
 * Medición en el navegador: atribución (UTM, fbclid) y eventos hacia Meta
 * Pixel y GA4. Si ninguno está configurado, todo es un no-op silencioso.
 *
 * Los eventos que también se envían por Conversions API usan el mismo
 * `eventId` que el servidor, así Meta los deduplica.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const ATTR_COOKIE = 'sov_attr';
const ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const;
const THIRTY_DAYS = 60 * 60 * 24 * 30;

const STANDARD_META = new Set(['PageView', 'ViewContent', 'Lead', 'Schedule', 'CompleteRegistration']);

const GA_NAMES: Record<string, string> = {
  ViewContent: 'scroll_50',
  QuizStart: 'quiz_start',
  QuizStep: 'quiz_step',
  Lead: 'generate_lead',
  LeadCalificado: 'qualified_lead',
  SimuladorUso: 'simulator_use',
  DescargaGuia: 'download_guide',
  InicioDiagnostico: 'application_start',
  UsoCalculadora: 'calculator_use',
  Schedule: 'book_appointment',
};

/** Eventos que sólo van a GA4 (demasiado granulares para Meta). */
const GA_ONLY = new Set(['QuizStep']);

export const readCookie = (name: string) =>
  document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))?.slice(name.length + 1);

const writeCookie = (name: string, value: string, maxAge = THIRTY_DAYS) => {
  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
};

/** Guarda la atribución del anuncio durante 30 días (última interacción con UTM gana). */
export function captureAttribution() {
  const params = new URLSearchParams(location.search);
  const fresh: Record<string, string> = {};
  ATTR_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) fresh[k] = v.slice(0, 300);
  });

  if (Object.keys(fresh).length) writeCookie(ATTR_COOKIE, encodeURIComponent(JSON.stringify(fresh)));

  // `_fbc` a partir de fbclid, con el formato que espera Meta.
  if (fresh.fbclid && !readCookie('_fbc')) writeCookie('_fbc', `fb.1.${Date.now()}.${fresh.fbclid}`, THIRTY_DAYS * 3);
}

export function getTracking(landingVariant?: string) {
  let attr: Record<string, string> = {};
  try {
    attr = JSON.parse(decodeURIComponent(readCookie(ATTR_COOKIE) || '')) || {};
  } catch {
    attr = {};
  }
  return {
    ...attr,
    fbp: readCookie('_fbp'),
    fbc: readCookie('_fbc'),
    landingVariant,
  };
}

export const newEventId = () =>
  (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`).replace(/[^\w-]/g, '');

export function track(name: string, params: Record<string, unknown> = {}, eventId?: string) {
  try {
    if (window.fbq && !GA_ONLY.has(name)) {
      const method = STANDARD_META.has(name) ? 'track' : 'trackCustom';
      window.fbq(method, name, params, eventId ? { eventID: eventId } : undefined);
    }
    window.gtag?.('event', GA_NAMES[name] || name, params);
  } catch {
    /* la medición nunca debe romper la página */
  }
}
