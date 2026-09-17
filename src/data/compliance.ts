/**
 * Sovereign Capital Solutions — datos regulatorios y de operación de embudos.
 *
 * Todo lo que un regulador, una aseguradora o Meta pueden pedir ver en una
 * página vive aquí: agencia, agente, licencias, estados atendidos, textos de
 * consentimiento y advertencias. Las plantillas sólo lo renderizan.
 *
 * ⚠️ Antes de pautar: completar `agent.npn` y `licenses[].number`. Mientras falten, el build lo avisa en consola y las
 * plantillas ocultan la línea en vez de mostrar un marcador.
 */

export interface License {
  /** Código postal del estado (FL, TX…). */
  code: string;
  name: string;
  /** Número de licencia en ese estado. Vacío = pendiente de cargar. */
  number: string;
}

export const agency = {
  name: 'Sovereign Capital Solutions',
  street: '6355 NW 36th St',
  suite: 'Suite 405',
  city: 'Virginia Gardens',
  region: 'FL',
  postalCode: '33166',
  /** Dirección completa en una línea (pies legales, contacto). */
  address: '6355 NW 36th St, Suite 405, Virginia Gardens, FL 33166',
} as const;

export const agent = {
  name: 'Oswald Gonzalez',
  role: 'Founder & CEO',
  title: 'Agente de seguros de vida licenciado',
  /** National Producer Number. Vacío = pendiente de cargar. */
  npn: '',
  languages: ['Español', 'English'],
  bio: 'Ingeniero civil y broker de bienes raíces antes que asesor. Trabaja con familias y dueños de negocio latinos con un principio simple: primero se entiende la herramienta, después se decide. Asesora en español y en inglés.',
  bioBusiness: 'Viene del mundo de la construcción y los bienes raíces: conoce de primera mano el flujo de caja irregular, las compras de equipo y la dependencia del crédito. Por eso explica la estrategia con el lenguaje del negocio y con sus costos a la vista.',
  quoteIul: 'Prefiero perder una venta que venderte algo que no entiendes.',
  quoteWl: 'La estrategia se administra: no funciona en piloto automático.',
  /** Búsqueda pública de licencias del Florida DFS (estado de residencia). */
  verifyUrl: 'https://licenseesearch.fldfs.com/',
  verifyLabel: 'Verificar licencia en el Florida DFS',
} as const;

/**
 * Licencia de residente (Florida). Es la opción rápida del paso "estado" de
 * los formularios y la que se muestra con número cuando exista.
 */
export const licenses: License[] = [
  { code: 'FL', name: 'Florida', number: '' },
];

export const usStates: { code: string; name: string }[] = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'Distrito de Columbia'],
  ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawái'], ['ID', 'Idaho'], ['IL', 'Illinois'],
  ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Luisiana'],
  ['ME', 'Maine'], ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Míchigan'], ['MN', 'Minnesota'],
  ['MS', 'Misisipi'], ['MO', 'Misuri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'],
  ['NH', 'Nuevo Hampshire'], ['NJ', 'Nueva Jersey'], ['NM', 'Nuevo México'], ['NY', 'Nueva York'],
  ['NC', 'Carolina del Norte'], ['ND', 'Dakota del Norte'], ['OH', 'Ohio'], ['OK', 'Oklahoma'],
  ['OR', 'Oregón'], ['PA', 'Pensilvania'], ['PR', 'Puerto Rico'], ['RI', 'Rhode Island'],
  ['SC', 'Carolina del Sur'], ['SD', 'Dakota del Sur'], ['TN', 'Tennessee'], ['TX', 'Texas'],
  ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'],
  ['WV', 'Virginia Occidental'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
].map(([code, name]) => ({ code, name }));

/**
 * Cobertura nacional: licencia de residente en Florida y de no residente en el
 * resto del país. Los territorios (Puerto Rico) requieren licencia propia y
 * quedan fuera: sus solicitudes van a lista de espera.
 */
export const coverage = {
  excluded: ['PR'],
  /** Forma corta para sellos y titulares. */
  short: '50 estados + DC',
  /** Forma larga para frases: "licenciado en …". */
  long: 'los 50 estados y el Distrito de Columbia',
} as const;

/** Estados donde hay licencia vigente: alimentan los formularios y la calificación. */
export const licensedStates = usStates.map((s) => s.code).filter((c) => !(coverage.excluded as readonly string[]).includes(c));

export const stateName = (code: string) => usStates.find((s) => s.code === code)?.name ?? code;

/** "agente … licenciado en {licensedStatesText}" */
export const licensedStatesText = coverage.long;

/** Líneas de licencia listas para mostrar; omite las que aún no tienen número. */
export const licenseLines = licenses.filter((l) => l.number).map((l) => `${l.code} #${l.number}`);

/* ---------------------------------------------------------------------------
   Consentimiento (TCPA). El texto exacto aceptado se guarda con cada lead, así
   que cualquier cambio de redacción debe ir acompañado de un cambio de versión.
   --------------------------------------------------------------------------- */

export const consent = {
  version: '2026-09',
  iul: 'Acepto que Sovereign Capital Solutions me contacte por llamada, SMS, WhatsApp y email, incluso mediante sistemas automatizados, al número y correo proporcionados, para darme información sobre seguros de vida y agendar mi consulta. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. Puedo cancelar respondiendo STOP. Acepto la Política de Privacidad y los Términos.',
  wholeLife: 'Acepto que Sovereign Capital Solutions me contacte por llamada, SMS, WhatsApp y email, incluso mediante sistemas automatizados, al número y correo proporcionados, para enviarme material educativo, información sobre estrategias con seguros de vida y la coordinación de mi consulta. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. Puedo cancelar en cualquier momento respondiendo STOP. He leído la Política de Privacidad y los Términos.',
  contact: 'Acepto que Sovereign Capital Solutions me contacte por llamada, SMS, WhatsApp y email, incluso mediante sistemas automatizados, al número y correo proporcionados, para coordinar mi consulta. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. Puedo cancelar respondiendo STOP. Acepto la Política de Privacidad y los Términos.',
  guide: 'Acepto recibir la guía y contenido educativo de Sovereign Capital Solutions por email. Puedo darme de baja en cualquier momento. Acepto la Política de Privacidad.',
} as const;

export type ConsentKind = keyof Omit<typeof consent, 'version'>;

export const legalLinks = {
  privacy: '/legal/privacidad',
  terms: '/legal/terminos',
  consent: '/legal/consentimiento-comunicaciones',
} as const;

/* ---------------------------------------------------------------------------
   Advertencias
   --------------------------------------------------------------------------- */

export const disclosures = {
  general: 'Los productos de seguro de vida son emitidos por aseguradoras autorizadas en el estado de residencia del cliente y están sujetos a la aprobación de la suscripción (underwriting), a la disponibilidad por estado y a los términos del contrato. Sovereign Capital Solutions no es un banco ni una firma de inversión. El contenido de este sitio es educativo y no sustituye la póliza, una ilustración oficial ni asesoría legal, fiscal o financiera. Consulte a un profesional fiscal.',
  iul: 'Un IUL es un seguro de vida universal indexado; no es una inversión en valores ni una cuenta bursátil. Las tasas de interés acreditadas, los caps, las tasas de participación y los cargos pueden cambiar según el contrato. Las ilustraciones son proyecciones no garantizadas. Los préstamos y retiros reducen el valor en efectivo y el beneficio por fallecimiento, y pueden generar consecuencias fiscales.',
  wholeLife: 'Banca Mía™ es una metodología educativa y de planificación de Sovereign Capital Solutions basada en seguros de vida Whole Life participantes. No es un banco, una cuenta bancaria ni un producto de inversión. Los dividendos no están garantizados. Los préstamos sobre la póliza generan interés, reducen el valor en efectivo y el beneficio por fallecimiento, y pueden provocar la caducidad de la póliza y consecuencias fiscales. Cancelar en los primeros años puede generar pérdidas. Las primas personales normalmente no son deducibles.',
  iulShort: 'Seguro de vida universal indexado. No es una inversión directa en el mercado. Sujeto a aprobación de la aseguradora. Resultados no garantizados.',
  wholeLifeShort: 'Estrategia basada en seguro de vida Whole Life. No es un banco ni una cuenta bancaria. Los dividendos no están garantizados. Los préstamos generan interés y reducen el beneficio por fallecimiento. Sujeto a aprobación.',
} as const;

/** Fecha de la última revisión editorial de los materiales de los embudos. */
export const reviewedOn = 'septiembre de 2026';

/* ---------------------------------------------------------------------------
   Aviso de build: datos regulatorios pendientes. No rompe el build (el sitio
   debe poder desplegarse), pero queda a la vista en cada compilación.
   --------------------------------------------------------------------------- */

const pending: string[] = [];
if (!agent.npn) pending.push('agent.npn');
licenses.filter((l) => !l.number).forEach((l) => pending.push(`licenses.${l.code}.number`));

if (pending.length && typeof process !== 'undefined' && !(globalThis as { __complianceWarned?: boolean }).__complianceWarned) {
  (globalThis as { __complianceWarned?: boolean }).__complianceWarned = true;
  console.warn(`[compliance] Datos regulatorios pendientes en src/data/compliance.ts: ${pending.join(', ')}`);
}
