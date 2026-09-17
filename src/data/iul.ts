/**
 * Landing IUL sin mitos — copy y configuración (docs/02_Landing_IUL.md).
 * Las plantillas en `src/pages/iul*.astro` sólo renderizan este archivo.
 */
import type { Step, TrustItem } from './funnels';
import type { IconName } from './site';

export const iulSeo = {
  title: 'IUL en español: qué es, cómo funciona y si es para ti',
  description:
    'Guía honesta del seguro de vida IUL: cap, floor, participación, cargos, préstamos e impuestos. Haz el diagnóstico de 2 minutos con un asesor licenciado en español.',
} as const;

/** Variantes del titular para el test A/B (cada una vive en su URL). */
export const iulHeadlines = {
  A: 'IUL sin mitos: protección de por vida y valor en efectivo, explicados con honestidad.',
  B: 'Antes de contratar un IUL, entiende lo que casi nadie te explica.',
  C: 'Protege a tu familia y haz crecer tu valor en efectivo, sin pérdidas por caídas del índice.',
} as const;

export type IulVariant = keyof typeof iulHeadlines;

export const iulHero = {
  eyebrow: 'Seguro de vida universal indexado · Asesoría en español',
  lead: 'Un IUL puede ser una herramienta potente para la protección familiar y como complemento del retiro, siempre que se diseñe bien, se financie de forma sostenible y se revise cada año. Haz el diagnóstico de 2 minutos y descubre si tiene sentido para ti.',
  /** Matiz obligatorio cuando el titular habla de "sin pérdidas" (variante C). */
  nuance: 'El piso de 0% evita acreditaciones negativas por el índice, pero los cargos de la póliza siguen aplicando.',
  bullets: [
    'Explicación clara de cap, floor, participación y cargos',
    'Ilustraciones probadas en escenarios conservadores, no optimistas',
    'Asesor con licencia en los 50 estados, en español, sin costo y sin compromiso',
  ],
  cta: 'Hacer mi diagnóstico IUL',
  ctaAlt: 'Prefiero descargar la guía gratuita',
  micro: 'Sin costo · 2 minutos · Tus datos son confidenciales',
  videoCaption: 'Mensaje del asesor: qué es y qué no es un IUL',
} as const;

export const iulTrust: TrustItem[] = [
  { icon: 'shield', label: 'Licencia en los 50 estados' },
  { icon: 'pin', label: 'Oficina en Miami, FL', detail: 'Atención en todo EE.UU.' },
  { icon: 'user', label: '100% en español' },
  { icon: 'calendar', label: 'Consulta de 45 min sin costo' },
];

export const iulCoverage = {
  title: 'Vivas donde vivas en Estados Unidos, te podemos asesorar.',
  lead: 'Tenemos licencia vigente de seguros de vida en los 50 estados y el Distrito de Columbia. El diagnóstico y la consulta son a distancia, en español, y la póliza la emite una aseguradora autorizada en tu estado.',
  ctaLabel: 'Hacer mi diagnóstico IUL',
} as const;

export const iulProblem = {
  title: 'Quieres proteger a tu familia y hacer crecer tu dinero, pero…',
  cards: [
    { title: '“Me dijeron que gana lo mismo que el S&P 500.”', text: 'Y no te explicaron el cap ni la participación.' },
    { title: '“No sé si mi 401(k) es suficiente.”', text: 'Y te preocupa lo que pasará con los impuestos en el retiro.' },
    { title: '“No entiendo la ilustración.”', text: 'Una hoja con números que suben y suben, sin explicación.' },
    { title: '“Si me pasa algo, ¿qué pasa con los míos?”', text: 'Y el seguro del trabajo desaparece si cambias de empleo.' },
  ],
  closing: 'No necesitas más promesas. Necesitas entender la herramienta.',
} as const;

export const iulWhat = {
  title: '¿Qué es un IUL?',
  body: 'Un IUL (Indexed Universal Life) es un <strong>seguro de vida universal indexado</strong>: puede durar toda la vida si se mantiene financiado, paga un beneficio por fallecimiento y acumula valor en efectivo (cash value). El interés se calcula con una fórmula vinculada a un índice externo, <strong>pero tu dinero no se invierte directamente en acciones ni en el índice.</strong>',
} as const;

export const iulFlow = {
  title: 'Así se mueve cada dólar dentro de tu póliza',
  steps: [
    { icon: 'coins' as IconName, title: 'Prima', text: 'Flexible dentro de límites. Pagar el mínimo no garantiza una acumulación fuerte.' },
    { icon: 'doc' as IconName, title: 'Cargos', text: 'Costo del seguro (COI), gastos administrativos, riders y posibles cargos de índice.' },
    { icon: 'growth' as IconName, title: 'Valor en efectivo', text: 'Cuenta fija y/o segmentos indexados, menos retiros y préstamos.' },
    { icon: 'family' as IconName, title: 'Acceso y beneficio', text: 'Retiros, préstamos y beneficio por fallecimiento, sujetos al contrato.' },
  ],
  note: 'El costo del seguro (COI) normalmente aumenta con la edad. Por eso el diseño y los aportes sostenibles son clave.',
} as const;

export const iulSimulator = {
  title: 'Lo que realmente significan cap, floor y participación',
  lead: 'Mueve la variación del índice y observa cuánto interés se acreditaría con una fórmula típica. Nada de esto se guarda.',
  index: 'Variación del índice en el año',
  participation: 'Participación',
  cap: 'Cap (límite)',
  floor: 'Floor (piso)',
  result: 'Interés acreditado',
  beforeCharges: 'antes de cargos',
  examples: 'Ejemplos',
  exampleUp: 'Índice +12%',
  exampleDown: 'Índice −10%',
  warning:
    'El floor de 0% evita una acreditación negativa causada por el índice, <strong>pero no impide que el costo del seguro y otros cargos reduzcan tu valor en efectivo.</strong> El rendimiento no es el del S&P 500 completo y normalmente no incluye dividendos. Cap y participación pueden cambiar según el contrato.',
  legal: 'Ejemplo ilustrativo y educativo. No representa un producto específico ni un rendimiento esperado.',
} as const;

export const iulMyths = {
  title: 'Mitos del IUL que debes conocer antes de firmar',
  heads: ['Mito', 'Realidad'],
  rows: [
    { myth: 'Ganas lo mismo que la bolsa, sin riesgo.', truth: 'Recibes un interés según una fórmula con cap y participación. No hay pérdidas por caída del índice, pero los cargos siguen.' },
    { myth: 'Es gratis tener tu dinero ahí.', truth: 'Hay carga sobre primas, COI, cargos administrativos, riders y cargos de rescate en los primeros años.' },
    { myth: 'Los préstamos son dinero gratis.', truth: 'Los préstamos generan interés y reducen el valor disponible y el beneficio por fallecimiento.' },
    { myth: 'Es un retiro libre de impuestos garantizado.', truth: 'En una póliza no-MEC bien administrada, ciertos préstamos y retiros pueden evitar impuesto corriente. Si la póliza caduca con deuda, puede haber impuestos.' },
    { myth: 'La ilustración es lo que vas a ganar.', truth: 'La ilustración es una proyección. Las garantías del contrato son las que mandan.' },
  ],
} as const;

export const iulFit = {
  title: 'Seamos honestos: ¿un IUL tiene sentido para ti?',
  yesTitle: 'Puede ser muy buena herramienta si:',
  yes: [
    'Tienes una necesidad real de seguro permanente',
    'Tu flujo de caja es estable y tu horizonte es de 10–15 años o más',
    'Puedes sostener los aportes incluso en años bajos',
    'Buscas acumulación con diferimiento fiscal y acceso complementario, no liquidez inmediata',
    'Planeas legado familiar, protección del negocio o un complemento de retiro, después de cubrir tus reservas básicas',
  ],
  noTitle: 'No suele ser adecuado si:',
  no: [
    'Solo necesitas una cobertura temporal económica',
    'Podrías necesitar el dinero en los primeros años',
    'Tienes ingresos inestables, deuda cara o no tienes fondo de emergencia',
    'Buscas capturar todo el rendimiento bursátil',
    'No quieres revisiones anuales ni posibles aportes adicionales',
  ],
  micro: 'Si estás en la columna de la derecha, igual te ayudamos: te diremos qué alternativa tiene más sentido.',
  cta: 'Descubrir si califico',
} as const;

export const iulMethod = {
  title: 'Cómo trabajamos contigo',
  eyebrow: 'Método Sovereign™',
  steps: [
    { n: '01', icon: 'search' as IconName, title: 'Discovery', text: 'Entendemos tu familia, ingresos, metas y coberturas actuales.' },
    { n: '02', icon: 'doc' as IconName, title: 'Analysis', text: 'Evaluamos idoneidad y alternativas (incluidas las que no son IUL).' },
    { n: '03', icon: 'compass' as IconName, title: 'Architecture', text: 'Diseñamos la póliza (beneficio, aportes, límite MEC) y la probamos en escenarios conservadores: 0%, 4–5% y cap reducido.' },
    { n: '04', icon: 'gear' as IconName, title: 'Implementation', text: 'Aplicación y suscripción (underwriting) con acompañamiento.' },
    { n: '05', icon: 'infinity' as IconName, title: 'Ongoing Partnership', text: 'Ilustración in-force y revisión cada año.' },
  ],
} as const;

export const iulQuiz = {
  title: 'Diagnóstico IUL de 2 minutos',
  lead: 'Responde 7 preguntas y te diremos con honestidad si un IUL puede tener sentido para ti.',
  submit: 'Ver mi resultado',
  steps: [
    {
      key: 'objetivo',
      type: 'single',
      question: '¿Cuál es tu objetivo principal?',
      options: [
        { value: 'familia', label: 'Proteger a mi familia' },
        { value: 'retiro', label: 'Complementar mi retiro' },
        { value: 'legado', label: 'Dejar un legado' },
        { value: 'negocio', label: 'Proteger mi negocio' },
        { value: 'entender', label: 'Solo quiero entender el IUL' },
      ],
    },
    {
      key: 'edad',
      type: 'single',
      question: '¿En qué rango de edad estás?',
      options: [
        { value: '18-27', label: '18–27' },
        { value: '28-40', label: '28–40' },
        { value: '41-55', label: '41–55' },
        { value: '56-65', label: '56–65' },
        { value: '66+', label: '66 o más' },
      ],
    },
    { key: 'estado', type: 'state', question: '¿En qué estado vives?', hint: 'Tenemos licencia en los 50 estados y DC: te asesoramos por videollamada estés donde estés.' },
    {
      key: 'aporte',
      type: 'single',
      question: '¿Cuánto podrías destinar al mes, de forma sostenible, por 10 años o más?',
      options: [
        { value: '<200', label: 'Menos de US$200' },
        { value: '200-500', label: 'US$200–500' },
        { value: '500-1000', label: 'US$500–1,000' },
        { value: '1000-2500', label: 'US$1,000–2,500' },
        { value: '2500+', label: 'Más de US$2,500' },
      ],
    },
    {
      key: 'fondoEmergencia',
      type: 'single',
      question: '¿Tienes un fondo de emergencia de al menos 3 meses?',
      options: [
        { value: 'si', label: 'Sí' },
        { value: 'en-proceso', label: 'En proceso' },
        { value: 'no', label: 'No' },
      ],
    },
    {
      key: 'horizonte',
      type: 'single',
      question: '¿Cuándo crees que podrías necesitar ese dinero?',
      options: [
        { value: '<5', label: 'Menos de 5 años' },
        { value: '5-10', label: '5–10 años' },
        { value: '>10', label: 'Más de 10 años' },
      ],
    },
    {
      key: 'seguroActual',
      type: 'single',
      question: '¿Tienes seguro de vida actualmente?',
      options: [
        { value: 'no', label: 'No' },
        { value: 'term', label: 'Sí, term' },
        { value: 'trabajo', label: 'Sí, por mi trabajo' },
        { value: 'permanente', label: 'Sí, permanente' },
      ],
    },
    { key: 'contacto', type: 'contact', question: '¿A dónde te enviamos tu resultado?', hint: 'Lo verás en pantalla al instante.' },
  ] satisfies Step[],
  results: {
    A: {
      title: 'Buenas noticias, {nombre}: un IUL podría encajar con tu perfil.',
      text: 'Según tus respuestas, cumples varios criterios clave: horizonte largo y aportes sostenibles. El siguiente paso es una consulta de 45 minutos para revisar tu caso y, si tiene sentido, preparar una ilustración conservadora. Sin costo y sin compromiso.',
      partner: '¿Tu pareja participa en las decisiones financieras? Invítala a la consulta.',
    },
    B: {
      title: 'Gracias, {nombre}. Te vamos a ser honestos.',
      text: 'Con lo que nos contaste, un IUL quizás no sea tu mejor primer paso ahora. Normalmente recomendamos tener un fondo de emergencia y un horizonte de al menos 10 años. Te enviamos la guía “IUL de la A a la Z” para que tomes una decisión informada. Si quieres, también podemos revisar alternativas contigo.',
      guide: 'Descargar guía',
      talk: 'Hablar igual con un asesor',
    },
    C: {
      title: 'Gracias, {nombre}. Aún no atendemos tu estado.',
      text: 'Tenemos licencia en los 50 estados y DC, pero todavía no en tu territorio. Te sumamos a la lista de espera y te avisaremos cuando podamos atenderte. Mientras tanto, la guía “IUL de la A a la Z” te ayudará a evaluar cualquier propuesta con criterio.',
      guide: 'Descargar guía',
    },
  },
} as const;

export const iulFaq = [
  { q: '¿El IUL es una inversión?', a: 'No. Es un seguro de vida. El valor en efectivo recibe interés según una fórmula ligada a un índice, pero no se invierte directamente en el mercado.' },
  { q: '¿Puedo perder dinero?', a: 'Un floor de 0% evita acreditaciones negativas por el índice, pero los cargos de la póliza pueden reducir el valor en efectivo, sobre todo si se financia con poco.' },
  { q: '¿Cuánto cuesta?', a: 'Depende de la edad, la salud, el monto de cobertura y el diseño. La prima definitiva se conoce después de la suscripción (underwriting).' },
  { q: '¿Qué pasa si dejo de pagar?', a: 'La póliza puede seguir con el valor acumulado mientras cubra los cargos. Si no alcanza, puede requerir aportes o caducar.' },
  { q: '¿Es libre de impuestos?', a: 'El beneficio por fallecimiento generalmente se excluye del impuesto federal sobre la renta. En pólizas no-MEC bien administradas, ciertos préstamos y retiros pueden evitar impuesto corriente. Consulta a un profesional fiscal.' },
  { q: '¿Qué es una MEC?', a: 'Una póliza que supera el límite del 7-pay test. Pierde parte de sus ventajas fiscales en las distribuciones. Por eso diseñamos por debajo de ese límite.' },
  { q: '¿Quién califica?', a: 'La aseguradora evalúa la edad, la salud, la nicotina, el historial médico, la ocupación, las finanzas, la residencia y el monto. Puede aprobar, recargar, posponer o declinar.' },
  { q: '¿IUL o Whole Life?', a: 'El IUL ofrece flexibilidad y potencial ligado a un índice; el Whole Life ofrece más garantías y prima fija. Si te importan más las garantías, mira nuestra explicación de Banca Mía™ con Whole Life en /banca-mia.' },
  { q: '¿La consulta tiene costo?', a: 'No. Son 45 minutos sin costo ni compromiso.' },
] as const;

export const iulFinal = {
  title: 'La pregunta correcta no es cuánto puedes ganar, sino si tu póliza puede mantenerse vigente en escenarios conservadores.',
  text: 'Hablemos 45 minutos. Si un IUL no es para ti, te lo diremos.',
  cta: 'Hacer mi diagnóstico',
  guide: 'Descargar la guía “IUL de la A a la Z”',
} as const;

export const iulThanks = {
  titleWithDate: '¡Listo, {nombre}! Tu consulta está agendada para el {fecha} a las {hora}.',
  title: '¡Listo! Tu consulta está agendada.',
  lead: 'Recibirás la confirmación por email y un recordatorio por WhatsApp. Esto es lo que va a pasar y cómo prepararte.',
  checklistTitle: 'Para aprovechar la reunión, ten a mano:',
  checklist: [
    'Tus coberturas actuales (póliza del trabajo, term u otras)',
    'Una idea de tu presupuesto mensual sostenible',
    'Tus metas a 10 y 20 años',
    'A tu pareja, si participa en las decisiones financieras: invítala',
  ],
  meetingTitle: 'Qué pasará en la consulta',
  meeting: [
    'Entenderemos tu situación: familia, ingresos, coberturas y metas.',
    'Te explicaremos cómo funciona un IUL, con sus costos y riesgos.',
    'Revisaremos juntos si tiene sentido para ti. Si no lo tiene, te lo diremos.',
    'Si encaja, acordaremos preparar una ilustración conservadora.',
  ],
} as const;
