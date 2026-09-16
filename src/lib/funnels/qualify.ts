/**
 * Reglas de calificación de los embudos IUL y Whole Life / Banca Mía™.
 *
 * Funciones puras y sin imports: las usa el navegador para mostrar el
 * resultado al instante y el servidor para decidir de verdad (nunca se confía
 * en lo que calcula el cliente). También se ejecutan tal cual con `node --test`.
 *
 * Los valores de cada respuesta son claves estables (no el texto visible), de
 * modo que se puede cambiar la redacción de una opción sin romper la lógica.
 */

export type Result = 'A' | 'B' | 'C' | 'D';

/* ---------------------------------------------------------------------------
   IUL
   --------------------------------------------------------------------------- */

export const IUL_OPTIONS = {
  objetivo: ['familia', 'retiro', 'legado', 'negocio', 'entender'],
  edad: ['18-27', '28-40', '41-55', '56-65', '66+'],
  aporte: ['<200', '200-500', '500-1000', '1000-2500', '2500+'],
  fondoEmergencia: ['si', 'en-proceso', 'no'],
  horizonte: ['<5', '5-10', '>10'],
  seguroActual: ['no', 'term', 'trabajo', 'permanente'],
} as const;

export interface IulAnswers {
  objetivo: string;
  edad: string;
  estado: string;
  aporte: string;
  fondoEmergencia: string;
  horizonte: string;
  seguroActual: string;
}

export interface Qualification {
  result: Result;
  qualifies: boolean;
  score: number;
  /** Prioridad para el CRM: `alta` pasa directo al asesor senior. */
  priority: 'alta' | 'normal' | 'nurturing';
}

const rank = (list: readonly string[], value: string) => list.indexOf(value);

export function qualifyIul(a: IulAnswers, licensedStates: readonly string[]): Qualification {
  const inState = licensedStates.includes(a.estado);
  const ageOk = a.edad !== '66+' && rank(IUL_OPTIONS.edad, a.edad) >= 0;
  const contributionOk = rank(IUL_OPTIONS.aporte, a.aporte) >= rank(IUL_OPTIONS.aporte, '200-500');
  const horizonOk = a.horizonte === '5-10' || a.horizonte === '>10';

  const qualifies = ageOk && inState && contributionOk && horizonOk;

  const score =
    (rank(IUL_OPTIONS.aporte, a.aporte) >= rank(IUL_OPTIONS.aporte, '500-1000') ? 2 : 0) +
    (a.horizonte === '>10' ? 2 : 0) +
    (a.objetivo === 'retiro' || a.objetivo === 'legado' ? 1 : 0) +
    (a.seguroActual === 'no' ? 1 : 0) +
    (a.fondoEmergencia === 'si' ? 1 : 0);

  let result: Result;
  if (qualifies && a.fondoEmergencia !== 'no') result = 'A';
  else if (!inState) result = 'C';
  else result = 'B';

  return {
    result,
    qualifies: result === 'A',
    score,
    priority: result !== 'A' ? 'nurturing' : score >= 4 ? 'alta' : 'normal',
  };
}

/* ---------------------------------------------------------------------------
   Whole Life / Banca Mía™
   --------------------------------------------------------------------------- */

/** Preguntas del primer paso del embudo (no califican: segmentan). */
export const WL_REGISTRO_OPTIONS = {
  negocio: ['negocio', 'independiente', 'empleado'],
  interes: ['liquidez', 'legado', 'conservadora', 'aprender'],
} as const;

export const WL_OPTIONS = {
  aniosNegocio: ['<2', '2-5', '>5'],
  ingresos: ['<100k', '100-250k', '250k-1m', '>1m'],
  excedente: ['<500', '500-1500', '1500-5000', '>5000'],
  fondoEmergencia: ['si', 'parcial', 'no'],
  uso: ['inventario', 'vehiculos', 'bienes-raices', 'educacion', 'reserva', 'legado'],
  horizonte: ['<10', '10-15', '>15'],
  valora: ['garantias', 'crecimiento', 'balance'],
  edad: ['18-30', '31-45', '46-55', '56-65', '66+'],
  contador: ['si', 'no'],
} as const;

export interface WholeLifeAnswers {
  negocio?: string;
  aniosNegocio: string;
  ingresos: string;
  excedente: string;
  fondoEmergencia: string;
  uso: string[];
  horizonte: string;
  valora: string;
  edad: string;
  contador: string;
  estado: string;
}

export function qualifyWholeLife(a: WholeLifeAnswers, licensedStates: readonly string[]): Qualification {
  const inState = licensedStates.includes(a.estado);
  const surplusRank = rank(WL_OPTIONS.excedente, a.excedente);

  const qualifies =
    surplusRank >= rank(WL_OPTIONS.excedente, '500-1500') &&
    (a.horizonte === '10-15' || a.horizonte === '>15') &&
    (a.fondoEmergencia === 'si' || a.fondoEmergencia === 'parcial') &&
    inState &&
    a.edad !== '66+' &&
    rank(WL_OPTIONS.edad, a.edad) >= 0;

  const surplusPoints = [0, 1, 3, 4][surplusRank] ?? 0;
  const score =
    surplusPoints +
    (a.horizonte === '>15' ? 2 : 1) +
    (rank(WL_OPTIONS.ingresos, a.ingresos) >= rank(WL_OPTIONS.ingresos, '250k-1m') ? 2 : 0) +
    (a.aniosNegocio === '>5' ? 1 : 0) +
    (a.valora === 'garantias' ? 1 : 0);

  let result: Result;
  if (qualifies && a.valora === 'crecimiento') result = 'D';
  else if (qualifies) result = 'A';
  else if (!inState) result = 'C';
  else result = 'B';

  return {
    result,
    qualifies,
    score,
    priority: !qualifies ? 'nurturing' : score >= 7 ? 'alta' : 'normal',
  };
}

/** Validación de pertenencia: una respuesta fuera de catálogo invalida el envío. */
export const isOption = (list: readonly string[], value: unknown): value is string =>
  typeof value === 'string' && list.includes(value);
