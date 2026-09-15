/**
 * Embudo Banca Mía™ con Whole Life — copy y configuración
 * (docs/03_Landing_Whole_Life_Banca_Mia.md).
 *
 * Regla de oro: cada bloque que nombra "Banca Mía™" o "Banca Infinita" dice
 * también "estrategia con seguro de vida Whole Life", y la página deja claro
 * que no es un banco ni una cuenta bancaria.
 */
import type { Option, Step, TrustItem } from './funnels';
import type { IconName } from './site';

export const wlSeo = {
  title: 'Banca Infinita en español: cómo funciona realmente con Whole Life | Banca Mía™',
  description:
    'Masterclass gratuita para empresarios: cómo funciona una póliza Whole Life para liquidez, PUA, dividendos, préstamos, MEC, costos y quién NO debería usarla. Explicado sin mitos.',
} as const;

export const wlHeadlines = {
  A: 'Banca Mía™: cómo algunos empresarios crean su propia reserva de capital con un seguro de vida Whole Life.',
  B: 'La Banca Infinita no es un banco, no es dinero infinito y no es gratis. Entonces, ¿por qué la usan tantos empresarios?',
} as const;

export type WlVariant = keyof typeof wlHeadlines;

export const masterclass = {
  name: 'Liquidez para empresarios: cómo funciona realmente la Banca Infinita (y cuándo NO usarla)',
  minutes: 38,
  chapters: [
    { at: 0, label: 'Quién te enseña y por qué una clase sin mitos' },
    { at: 180, label: 'Por qué el capital atado es el gran problema del empresario' },
    { at: 480, label: 'La anatomía de una póliza Whole Life diseñada para liquidez' },
    { at: 1080, label: 'Los 4 mitos que más dinero le cuestan a la gente' },
    { at: 1380, label: 'La tabla honesta de quién sí y quién no' },
    { at: 1680, label: 'Un caso ilustrativo de un empresario en Florida, año por año' },
    { at: 1980, label: 'Las 8 pruebas que debes exigir antes de comprar' },
  ],
  /** Segundo a partir del cual aparece la invitación al diagnóstico. */
  ctaAt: 1200,
} as const;

export const wlHero = {
  eyebrow: 'Masterclass gratuita para empresarios · En español',
  lead: 'En 38 minutos te explicamos, sin mitos, cómo funciona una póliza Whole Life participante diseñada para acumular valor en efectivo, cómo se usan los préstamos sobre la póliza, qué cuesta y en qué casos NO conviene.',
  tag: 'Estrategia con seguro de vida Whole Life · No es un banco ni una cuenta bancaria · Los dividendos no están garantizados',
  bullets: [
    'Base, adiciones pagadas (PUA), dividendos y préstamos, explicados con diagramas',
    'Los 5 errores que hacen fracasar una estrategia de Banca Infinita',
    'La tabla honesta de quién sí y quién no debería usarla',
  ],
  cta: 'Ver la masterclass ahora',
  mobileCta: 'Ver masterclass',
  shortcut: 'Ya conozco el concepto → Aplicar al diagnóstico',
  micro: 'Acceso inmediato · Gratis · Sin tarjeta · Tus datos son confidenciales',
  formTitle: 'Accede gratis a la masterclass',
} as const;

export const wlTrust: TrustItem[] = [
  { icon: 'shield', label: 'Agente licenciado' },
  { icon: 'pin', label: 'Brickell, Miami' },
  { icon: 'user', label: '100% en español' },
  { icon: 'doc', label: 'Educación antes que venta' },
];

export const wlRegistro = {
  negocio: {
    question: '¿Tienes negocio propio o eres independiente?',
    options: [
      { value: 'negocio', label: 'Sí, tengo negocio' },
      { value: 'independiente', label: 'Soy independiente / 1099' },
      { value: 'empleado', label: 'No, soy empleado' },
    ] satisfies Option[],
  },
  estado: { question: 'Estado de residencia' },
  interes: {
    question: '¿Qué te interesa más?',
    options: [
      { value: 'liquidez', label: 'Liquidez para mi negocio' },
      { value: 'legado', label: 'Legado familiar' },
      { value: 'conservadora', label: 'Alternativa conservadora' },
      { value: 'aprender', label: 'Solo aprender' },
    ] satisfies Option[],
  },
} as const;

export const wlProblem = {
  title: 'Tu negocio genera dinero. Pero, ¿quién controla tu capital?',
  cards: [
    { icon: 'bank' as IconName, title: 'Cada compra grande pasa por el banco.', text: 'Camiones, equipo, inventario: aplicaciones, tasas y condiciones que no controlas.' },
    { icon: 'chart' as IconName, title: 'Flujo de caja irregular.', text: 'Meses buenos y meses difíciles, sin una reserva estructurada.' },
    { icon: 'drop' as IconName, title: 'El dinero “parado” pierde valor.', text: 'La cuenta de ahorro rinde poco y la bolsa te quita el sueño.' },
    { icon: 'family' as IconName, title: '¿Y si te pasa algo?', text: 'Tu familia y tu negocio dependen de ti.' },
  ],
  closing: 'Existe una estrategia que muchos empresarios usan para planear su liquidez. Tiene ventajas reales y también costos y riesgos reales. Te explicamos ambos.',
} as const;

export const wlWhat = {
  title: 'Banca Mía™ en 20 segundos',
  body: '<strong>Banca Mía™</strong> es nuestra metodología de administración de capital basada en la <strong>Banca Infinita (Infinite Banking Concept, IBC)</strong>. Usa un <strong>seguro de vida permanente Whole Life participante</strong>: tiene prima contractual, beneficio por fallecimiento y valor en efectivo garantizados si se cumplen las condiciones de la póliza. Puede recibir dividendos, pero <strong>no están garantizados</strong>.',
  notTitle: 'Lo que NO es',
  not: 'No es un banco, no es una cuenta bancaria, no es una inversión en el mercado y no es un producto que legalmente se llame “Banca Infinita”. Es una forma de administrar un seguro de vida.',
} as const;

export const wlPolicy = {
  title: 'Las 4 piezas de una póliza diseñada para liquidez',
  blocks: [
    { icon: 'shield' as IconName, title: 'Prima base', text: 'Sostiene las garantías y la cobertura; incluye costos y compensación.', warn: '' },
    { icon: 'plus' as IconName, title: 'PUA y dividendos', text: 'Las adiciones pagadas (PUA) compran seguro adicional y aumentan los valores. Los dividendos pueden comprar más PUA.', warn: 'Los dividendos no están garantizados.' },
    { icon: 'lock' as IconName, title: 'Valor de rescate', text: 'El efectivo disponible si cancelas, neto de deuda.', warn: 'Puede ser bajo en los primeros años.' },
    { icon: 'coins' as IconName, title: 'Préstamo', text: 'La aseguradora te presta usando la póliza como garantía.', warn: 'Cobra interés.' },
  ],
  note: 'No existe una proporción universal base/PUA. Depende de tu edad, salud, aseguradora, necesidad de cobertura y flujo sostenible, y siempre debe quedar por debajo del límite MEC.',
} as const;

export const wlCycle = {
  title: 'Cómo se usa en la práctica',
  steps: [
    { title: 'Capitalizas', text: 'Pagas prima base + PUA de forma disciplinada.' },
    { title: 'Acumulas', text: 'Crece el valor en efectivo garantizado (y los dividendos, si se pagan).' },
    { title: 'Accedes', text: 'Pides un préstamo a la aseguradora con la póliza como garantía para una compra planificada.' },
    { title: 'Repagas', text: 'Con un plan explícito de pago de capital e intereses a la aseguradora.' },
    { title: 'Revisas', text: 'Ilustración in-force anual, límite MEC y beneficiarios.' },
  ],
  legend: 'Mientras existe un préstamo, la póliza sigue funcionando según sus reglas. El interés no pagado se capitaliza. La deuda reduce el beneficio por fallecimiento y, si consume el valor disponible, puede provocar la caducidad de la póliza y consecuencias fiscales.',
} as const;

export const wlMyths = {
  title: 'Lo que te han contado vs lo que dice el contrato',
  heads: ['Mito', 'Realidad'],
  rows: [
    { myth: 'Te conviertes en tu propio banco.', truth: 'Pides prestado a la aseguradora con tu póliza como garantía. No es un banco.' },
    { myth: 'Te pagas intereses a ti mismo.', truth: 'El interés se paga a la aseguradora. Los aportes adicionales pueden aumentar los valores, pero no son el pago del interés.' },
    { myth: 'Es dinero infinito.', truth: 'El acceso está limitado por el valor en efectivo disponible y la deuda existente.' },
    { myth: 'La tasa de dividendos es tu rendimiento.', truth: 'La tasa anunciada no es tu rendimiento neto. Compara la TIR (IRR) del valor de rescate en los años 1, 5, 10 y 20.' },
    { myth: 'Desde el año 1 tienes todo tu dinero disponible.', truth: 'El valor de rescate puede ser bajo al inicio. Cancelar temprano puede ser costoso.' },
    { myth: 'Es libre de impuestos siempre.', truth: 'En una póliza no-MEC bien administrada, ciertos préstamos pueden evitar impuesto corriente. Si se convierte en MEC o caduca con deuda, puede haber impuestos y penalidades.' },
  ],
} as const;

export const wlLearn = {
  title: 'En la masterclass verás',
  items: [
    { at: 'Minuto 3', text: 'Por qué el capital atado es el gran problema del empresario' },
    { at: 'Minuto 8', text: 'La anatomía de una póliza Whole Life diseñada para liquidez' },
    { at: 'Minuto 18', text: 'Los 4 mitos que más dinero le cuestan a la gente' },
    { at: 'Minuto 23', text: 'La tabla honesta de quién sí y quién no' },
    { at: 'Minuto 28', text: 'Un caso ilustrativo (hipotético) de un empresario en Florida, año por año' },
    { at: 'Minuto 33', text: 'Las 8 pruebas que debes exigir antes de comprar' },
  ],
  cta: 'Quiero ver la masterclass',
} as const;

export const wlFit = {
  title: 'Esta estrategia no es para todos. Y está bien.',
  yesTitle: 'Puede ser una buena herramienta si:',
  yes: [
    'Tienes una necesidad real de seguro permanente',
    'Tienes ingreso y excedente estables, fondo de emergencia y deuda cara bajo control',
    'Tu horizonte es de 10–15 años o más',
    'Prefieres garantías, disciplina y menor volatilidad',
    'Eres empresario o tienes una familia que planea compras, reservas o legado',
    'Estás dispuesto a revisar y ajustar el plan cada año',
  ],
  noTitle: 'No suele ser adecuada si:',
  no: [
    'Solo necesitas cobertura temporal al menor costo',
    'Necesitas liquidez total o ganancias rápidas en los primeros años',
    'Tu ingreso es inestable o no puedes sostener la prima base',
    'Buscas el mayor rendimiento de mercado',
    'Tu salud o edad hacen que el diseño sea poco eficiente',
    'Esperas préstamos gratis, “dinero infinito” o una ventaja fiscal automática',
  ],
  micro: '¿Te interesa más el potencial de crecimiento que las garantías? Mira nuestra explicación del IUL.',
} as const;

export const wlRepeat = {
  title: 'Mira la masterclass gratis, hoy',
  lead: 'Acceso inmediato. 38 minutos que te ahorran años de malentendidos.',
} as const;

export const wlFaq = [
  { q: '¿La Banca Mía™ es un banco o una cuenta?', a: 'No. Es una metodología de administración de capital que usa un seguro de vida Whole Life participante.' },
  { q: '¿Qué es garantizado y qué no?', a: 'El valor en efectivo garantizado sigue el calendario contractual si se pagan las primas. Los dividendos no están garantizados y pueden subir, bajar o ser cero.' },
  { q: '¿Cuánto tarda en ser eficiente?', a: 'No hay un año universal. Depende del diseño, la edad y la aseguradora. Por eso revisamos la TIR del valor de rescate año por año.' },
  { q: '¿Cómo funcionan los préstamos?', a: 'La aseguradora presta usando la póliza como garantía y cobra interés (fijo o variable según el contrato). El interés no pagado se capitaliza y la deuda reduce el beneficio por fallecimiento.' },
  { q: '¿Qué es una MEC y por qué importa?', a: 'Si la póliza supera el 7-pay test, se convierte en MEC: las distribuciones tributan primero como ganancia y puede aplicar una penalidad del 10% antes de los 59½ años. Diseñamos con margen bajo ese límite.' },
  { q: '¿Las primas son deducibles para mi negocio?', a: 'Las primas personales normalmente no son deducibles. Consulta tu caso con tu contador; lo invitamos a la reunión si quieres.' },
  { q: '¿Qué pasa si un año no puedo pagar las PUA?', a: 'Parte de la prima es obligatoria (base) y parte flexible (PUA). Lo diseñamos para que la base sea sostenible.' },
  { q: '¿Whole Life o IUL?', a: 'Whole Life: prima fija y más garantías. IUL: más flexibilidad y potencial ligado a un índice, con cargos variables. Tienes la explicación completa del IUL en /iul.' },
  { q: '¿Quién califica?', a: 'La aseguradora evalúa la edad, la salud, la nicotina, el historial médico, la ocupación, las finanzas, la residencia y el monto. Puede aprobar, recargar, posponer o declinar.' },
  { q: '¿La consulta tiene costo?', a: 'No. El Diagnóstico de Capital es sin costo ni compromiso.' },
] as const;

/* --- /banca-mia/masterclass ---------------------------------------------- */

export const wlMasterclassPage = {
  welcome: 'Bienvenido, {nombre}. Tu masterclass está lista.',
  welcomeAnon: 'Tu masterclass está lista.',
  chaptersTitle: 'Capítulos',
  stickyText: '¿Crees que esto puede encajar con tu negocio?',
  stickyCta: 'Aplicar al Diagnóstico de Capital',
  downloadsTitle: 'Material descargable',
  downloads: [
    { key: 'wl', title: 'Guía “Whole Life para Banca Infinita de la A a la Z”', text: 'El respaldo escrito de la masterclass, con fuentes.' },
  ],
  checklistTitle: 'Checklist: 8 pruebas antes de comprar',
  checklist: [
    '¿Te mostraron la columna garantizada y no solo la proyectada?',
    '¿Conoces la TIR del valor de rescate en los años 1, 5, 10 y 20?',
    '¿El diseño queda con margen por debajo del límite MEC?',
    '¿Sabes qué parte de la prima es base obligatoria y qué parte es PUA flexible?',
    '¿Probaron la ilustración con dividendos reducidos 1–2 puntos?',
    '¿Entiendes la tasa del préstamo, si es fija o variable, y cómo se capitaliza?',
    '¿Tienes un plan de repago explícito para cada préstamo?',
    '¿Hay una revisión anual in-force agendada con tu asesor?',
  ],
  calcTitle: 'Calculadora de costo de oportunidad',
  qaTitle: 'Sesión de preguntas en vivo',
  qaText: 'Último jueves de cada mes, por Zoom. Trae tus dudas sobre la masterclass.',
  qaCta: 'Reservar lugar',
  pending: 'La masterclass se está terminando de publicar. Mientras tanto, puedes aplicar al Diagnóstico de Capital o descargar la guía.',
  noAccess: 'Para ver la masterclass, primero regístrate gratis.',
  noAccessCta: 'Registrarme',
  legal: 'Contenido educativo sobre seguros de vida Whole Life participantes. Caso ilustrativo e hipotético. Los dividendos no están garantizados. Los préstamos generan interés y reducen el beneficio por fallecimiento. Sujeto a suscripción (underwriting).',
} as const;

/* --- /banca-mia/diagnostico ---------------------------------------------- */

export const wlDiagnostico = {
  title: 'Diagnóstico de Capital Banca Mía™',
  lead: 'Responde 10 preguntas (3 minutos). Si vemos que la estrategia con seguro de vida Whole Life puede encajar, eliges el horario de tu consulta privada de 45–60 minutos. Si no, te lo diremos y te recomendaremos una alternativa.',
  submit: 'Ver mi resultado',
  steps: [
    {
      key: 'aniosNegocio',
      type: 'combo',
      question: '¿A qué se dedica tu negocio y cuántos años lleva operando?',
      text: { key: 'negocio', label: 'Tipo de negocio', placeholder: 'Ej.: construcción, transporte, restaurante…' },
      options: [
        { value: '<2', label: 'Menos de 2 años' },
        { value: '2-5', label: '2–5 años' },
        { value: '>5', label: 'Más de 5 años' },
      ],
    },
    {
      key: 'ingresos',
      type: 'single',
      question: 'Ingresos anuales aproximados (negocio u hogar)',
      options: [
        { value: '<100k', label: 'Menos de US$100k' },
        { value: '100-250k', label: 'US$100–250k' },
        { value: '250k-1m', label: 'US$250k–1M' },
        { value: '>1m', label: 'Más de US$1M' },
      ],
    },
    {
      key: 'excedente',
      type: 'single',
      question: 'Excedente mensual que podrías destinar de forma sostenible',
      options: [
        { value: '<500', label: 'Menos de US$500' },
        { value: '500-1500', label: 'US$500–1,500' },
        { value: '1500-5000', label: 'US$1,500–5,000' },
        { value: '>5000', label: 'Más de US$5,000' },
      ],
    },
    {
      key: 'fondoEmergencia',
      type: 'single',
      question: '¿Tienes fondo de emergencia y la deuda de alto interés bajo control?',
      options: [
        { value: 'si', label: 'Sí' },
        { value: 'parcial', label: 'Parcialmente' },
        { value: 'no', label: 'No' },
      ],
    },
    {
      key: 'uso',
      type: 'multi',
      question: '¿Para qué usarías la liquidez?',
      hint: 'Puedes elegir varias.',
      options: [
        { value: 'inventario', label: 'Inventario o equipo' },
        { value: 'vehiculos', label: 'Vehículos' },
        { value: 'bienes-raices', label: 'Bienes raíces' },
        { value: 'educacion', label: 'Educación de hijos' },
        { value: 'reserva', label: 'Reserva de emergencia del negocio' },
        { value: 'legado', label: 'Legado' },
      ],
    },
    {
      key: 'horizonte',
      type: 'single',
      question: 'Horizonte de la estrategia',
      options: [
        { value: '<10', label: 'Menos de 10 años' },
        { value: '10-15', label: '10–15 años' },
        { value: '>15', label: 'Más de 15 años' },
      ],
    },
    {
      key: 'valora',
      type: 'single',
      question: '¿Qué valoras más?',
      options: [
        { value: 'garantias', label: 'Garantías y estabilidad' },
        { value: 'crecimiento', label: 'Máximo potencial de crecimiento' },
        { value: 'balance', label: 'Un balance' },
      ],
    },
    {
      key: 'edad',
      type: 'single',
      question: 'Rango de edad',
      options: [
        { value: '18-30', label: '18–30' },
        { value: '31-45', label: '31–45' },
        { value: '46-55', label: '46–55' },
        { value: '56-65', label: '56–65' },
        { value: '66+', label: '66 o más' },
      ],
    },
    {
      key: 'contador',
      type: 'single',
      question: '¿Trabajas con un contador?',
      options: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
      ],
    },
    { key: 'estado', type: 'state', question: '¿En qué estado resides?', hint: 'Solo asesoramos donde tenemos licencia vigente.' },
    { key: 'contacto', type: 'contact', question: 'Confirma tus datos', hint: 'Si ya te registraste en este dispositivo, los precargamos.' },
  ] satisfies Step[],
  results: {
    A: {
      title: '{nombre}, tu perfil tiene los elementos que buscamos para diseñar una estrategia Banca Mía™.',
      text: 'Elige el horario de tu Diagnóstico de Capital. Te recomendamos invitar a tu pareja o a tu contador.',
    },
    D: {
      title: '{nombre}, por tu perfil conviene comparar IUL y Whole Life.',
      text: 'Valoras el potencial de crecimiento, y eso cambia el diseño. En la consulta revisaremos las dos herramientas lado a lado, con sus garantías, costos y riesgos, para que elijas con criterio.',
    },
    B: {
      title: 'Gracias por tu honestidad, {nombre}.',
      text: 'Hoy esta estrategia probablemente no sea tu mejor paso. Una póliza Whole Life necesita un excedente sostenible y un horizonte largo. Te recomendamos primero fortalecer tu fondo de emergencia y reducir la deuda cara. Te enviamos la guía y te invitamos a nuestras sesiones gratuitas de preguntas.',
      guide: 'Descargar guía',
      talk: 'Quiero hablar con un asesor igualmente',
    },
    C: {
      title: 'Gracias, {nombre}. Aún no atendemos tu estado.',
      text: 'Solo podemos asesorarte donde tenemos licencia vigente. Te sumamos a la lista de espera y te avisaremos en cuanto podamos atenderte.',
      guide: 'Descargar guía',
    },
  },
  guests: '¿Quién más asistirá? Puedes añadir a tu pareja, contador o socio como invitado al agendar.',
} as const;

/* --- /banca-mia/gracias --------------------------------------------------- */

export const wlThanks = {
  titleWithDate: 'Tu Diagnóstico de Capital está confirmado: {fecha}, {hora}.',
  title: 'Tu Diagnóstico de Capital está confirmado.',
  lead: 'Recibirás la confirmación por email y un recordatorio por WhatsApp.',
  checklistTitle: 'Cómo prepararte',
  checklist: [
    'Un estimado de ingresos y gastos mensuales del negocio (no hace falta enviar documentos)',
    'La lista de compras grandes previstas a 5 años y cómo las financias hoy (tasa y plazo)',
    'Tus seguros de vida actuales, personales y del negocio',
    'Las preguntas que quieras hacerle a tu contador',
    'Invita a tu pareja, socio o contador: la decisión es mejor en compañía',
  ],
  meetingTitle: 'Qué pasará en la reunión',
  meeting: [
    'Haremos el mapa de capital de tu negocio: ingresos, estacionalidad y compras previstas.',
    'Revisaremos tu situación personal: familia, seguros actuales y retiro.',
    'Te explicaremos la estrategia usando tu propia compra recurrente como ejemplo.',
    'Evaluaremos con honestidad si encaja. Si encaja, diseñaremos dos escenarios para una segunda reunión.',
  ],
} as const;
