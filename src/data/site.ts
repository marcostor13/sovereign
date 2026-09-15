/**
 * Sovereign Capital Solutions — capa de contenido.
 *
 * Toda la copy institucional del sitio vive aquí; las plantillas sólo la
 * renderizan. Cambiar un teléfono, una promesa de marca o un pilar del método
 * es editar este archivo, nunca el markup.
 *
 * Las estrategias y los artículos de la Academia viven en `src/content/`
 * como colecciones de contenido (Markdown) porque crecen con el tiempo.
 */

import { consent } from './compliance';

export type IconName =
  | 'shield' | 'drop' | 'growth' | 'legacy' | 'lock' | 'target' | 'scale'
  | 'briefcase' | 'user' | 'chart' | 'family' | 'star'
  | 'search' | 'doc' | 'compass' | 'gear' | 'infinity'
  | 'coins' | 'bank' | 'phone' | 'mail' | 'pin' | 'calendar' | 'clock'
  | 'arrow' | 'play' | 'plus' | 'check' | 'quote'
  | 'linkedin' | 'instagram' | 'facebook' | 'youtube';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

export const brand = {
  name: 'Sovereign',
  surname: 'Capital Solutions',
  descriptor: 'Private Wealth Strategies',
  signature: 'Estrategia. Protección. Legado.',
  promise: 'Educamos primero. Diseñamos después. Implementamos al final.',
  triad: ['Educamos', 'Diseñamos', 'Protegemos'],
  founded: 2024,
} as const;

export const contact = {
  phone: '(305) 587-4200',
  phoneHref: 'tel:+13055874200',
  email: 'sovereigncapitalsolutions@gmail.com',
  address: 'Brickell, Miami, Florida',
  hours: 'Lunes a viernes · 9:00 – 18:00 EST',
  /**
   * Perfiles reales de la firma. Un ícono que lleva a la portada genérica de la
   * red resta credibilidad: mientras `href` esté vacío, el ícono no se muestra.
   */
  socials: [
    { id: 'linkedin' as IconName, label: 'LinkedIn', href: '' },
    { id: 'instagram' as IconName, label: 'Instagram', href: '' },
    { id: 'facebook' as IconName, label: 'Facebook', href: '' },
    { id: 'youtube' as IconName, label: 'YouTube', href: '' },
  ].filter((s) => s.href),
};

export const cta = {
  primary: 'Agenda tu consulta estratégica privada',
  primaryShort: 'Agenda tu consulta',
  secondary: 'Conoce nuestro enfoque',
  discover: 'Descubre Banca Mía™',
  more: 'Conoce más',
  read: 'Leer artículo',
  explore: 'Explorar la Academia',
  allStrategies: 'Ver todas las estrategias',
} as const;

export const nav: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre Nosotros', href: '/nosotros' },
  {
    label: 'Estrategias',
    href: '/estrategias',
    children: [
      { label: 'Protección Patrimonial', href: '/estrategias/proteccion-patrimonial', desc: 'La capa que sostiene todo lo demás' },
      { label: 'Acceso a Liquidez', href: '/estrategias/acceso-a-liquidez', desc: 'Usa tu capital sin desarmarlo' },
      { label: 'Acumulación Tax Advantaged', href: '/estrategias/acumulacion-tax-advantaged', desc: 'Crece por lo que conservas' },
      { label: 'Planificación Empresarial', href: '/estrategias/planificacion-empresarial', desc: 'Continuidad y sucesión del negocio' },
      { label: 'Legado y Sucesión', href: '/estrategias/legado-y-sucesion', desc: 'Transferencia por decisión, no por ley' },
      { label: 'Banca Mía™', href: '/estrategias/banca-mia', desc: 'Protección, acumulación y acceso estratégico a capital' },
    ],
  },
  {
    label: 'Educación',
    href: '/academia',
    children: [
      { label: 'IUL sin mitos', href: '/iul', desc: 'Diagnóstico de 2 minutos' },
      { label: 'Masterclass Banca Mía™', href: '/banca-mia', desc: 'Whole Life para empresarios, gratis' },
      { label: 'Academia Sovereign', href: '/academia', desc: 'Artículos y análisis' },
      { label: 'Método Sovereign™', href: '/nosotros#metodo', desc: 'Nuestras cinco etapas' },
      { label: 'Webinars', href: '/recursos#webinars', desc: 'Sesiones en vivo' },
    ],
  },
  {
    label: 'Recursos',
    href: '/recursos',
    children: [
      { label: 'Guías y eBooks', href: '/recursos#guias', desc: 'Material descargable' },
      { label: 'Calculadora', href: '/recursos#calculadora', desc: 'Costo de oportunidad' },
      { label: 'Preguntas frecuentes', href: '/recursos#faq', desc: 'Las dudas de siempre' },
    ],
  },
  { label: 'Contacto', href: '/contacto' },
];

/** Una línea del titular del hero; `accent` la pinta en oro. */
export interface HeroLine {
  text: string;
  accent?: boolean;
}

export const hero = {
  eyebrow: 'Estrategia · Protección · Legado',
  titleLines: [
    { text: 'Las grandes fortunas' },
    { text: 'no se construyen' },
    { text: 'por casualidad.' },
    { text: 'Se diseñan', accent: true },
    { text: 'con estrategia.', accent: true },
  ] as HeroLine[],
  lead: 'Diseñamos estrategias patrimoniales personalizadas que protegen, preservan y fortalecen tu patrimonio con visión, objetividad y propósito.',
  scroll: 'Desliza',
  pillars: [
    { icon: 'shield' as IconName, label: 'Protección', sub: 'Patrimonial' },
    { icon: 'drop' as IconName, label: 'Liquidez', sub: 'Inteligente' },
    { icon: 'growth' as IconName, label: 'Crecimiento', sub: 'Sostenible' },
    { icon: 'legacy' as IconName, label: 'Legado', sub: 'Generacional' },
    { icon: 'lock' as IconName, label: 'Libertad', sub: 'Financiera' },
    { icon: 'target' as IconName, label: 'Independencia', sub: 'Total' },
    { icon: 'scale' as IconName, label: 'Ética', sub: 'Profesional' },
  ],
} as const;

export const values = ['Discreción', 'Ética', 'Independencia', 'Compromiso', 'Excelencia'] as const;

export const audience = {
  index: '01',
  eyebrow: 'A quién servimos',
  title: '¿A quién ayudamos?',
  lead: 'Trabajamos con quienes ya construyeron algo valioso y quieren que dure más que ellos.',
  items: [
    {
      id: 'empresarios',
      icon: 'briefcase' as IconName,
      title: 'Empresarios',
      text: 'Estructuramos y protegemos tu patrimonio personal y empresarial para asegurar continuidad y crecimiento.',
      points: ['Separación entre patrimonio personal y empresarial', 'Continuidad ante lo imprevisto', 'Acuerdos entre socios debidamente fondeados'],
    },
    {
      id: 'profesionales',
      icon: 'user' as IconName,
      title: 'Profesionales',
      text: 'Diseñamos estrategias inteligentes para médicos, abogados, ejecutivos y profesionales de altos ingresos.',
      points: ['Eficiencia fiscal sobre ingresos altos', 'Protección frente a responsabilidad', 'Acumulación fuera de la volatilidad'],
    },
    {
      id: 'inversionistas',
      icon: 'chart' as IconName,
      title: 'Inversionistas',
      text: 'Te ayudamos a diversificar, proteger y acceder a tu capital sin depender del mercado.',
      points: ['Diversificación realmente no correlacionada', 'Acceso a liquidez sin liquidar', 'Control del riesgo de secuencia'],
    },
    {
      id: 'familias',
      icon: 'family' as IconName,
      title: 'Familias',
      text: 'Creamos soluciones que protegen tu estilo de vida y construyen un legado para las próximas generaciones.',
      points: ['Protección del estilo de vida', 'Educación financiera familiar', 'Transferencia ordenada y privada'],
    },
    {
      id: 'empresarias',
      icon: 'star' as IconName,
      title: 'Empresarias',
      text: 'Estrategias patrimoniales diseñadas para mujeres líderes que desean crecer, proteger y dejar huella.',
      points: ['Independencia financiera real', 'Patrimonio a nombre propio', 'Legado con propósito'],
    },
  ],
} as const;

export const method = {
  index: '02',
  eyebrow: 'Nuestra metodología exclusiva',
  title: 'Método Sovereign™',
  lead: 'Cinco etapas que convierten una conversación en una arquitectura patrimonial viva, revisada año tras año.',
  steps: [
    { n: '01', icon: 'search' as IconName, title: 'Discovery', text: 'Conocemos tu historia, tus objetivos y lo que realmente importa para ti.' },
    { n: '02', icon: 'doc' as IconName, title: 'Analysis', text: 'Analizamos tu situación financiera y patrimonial para identificar oportunidades y riesgos.' },
    { n: '03', icon: 'compass' as IconName, title: 'Architecture', text: 'Diseñamos una estrategia personalizada alineada con tus objetivos de vida y legado.' },
    { n: '04', icon: 'gear' as IconName, title: 'Implementation', text: 'Implementamos la estrategia utilizando compañías y estructuras cuidadosamente seleccionadas de acuerdo con las necesidades y objetivos del cliente.' },
    { n: '05', icon: 'infinity' as IconName, title: 'Ongoing Partnership', text: 'Te acompañamos en el tiempo, revisando y ajustando tu estrategia conforme evolucionan tus objetivos y circunstancias.' },
  ],
} as const;

export const strategiesSection = {
  index: '03',
  eyebrow: 'Lo que diseñamos',
  title: 'Estrategias que diseñamos',
  lead: 'Seis disciplinas que se combinan en una sola arquitectura. Ninguna se vende suelta: se diseñan juntas.',
} as const;

/**
 * Cifras de la banda de números. Sólo datos verificables: en publicidad de
 * seguros una cifra sin respaldo (familias, patrimonio, años) es un riesgo
 * regulatorio y de credibilidad. Cuando existan datos reales y documentados,
 * se añaden aquí.
 */
export const numbers = {
  eyebrow: 'Cómo trabajamos',
  items: [
    { value: 45, prefix: '', suffix: ' min', label: 'Consulta inicial sin costo' },
    { value: 5, prefix: '', suffix: '', label: 'Etapas del Método Sovereign™' },
    { value: 2, prefix: '', suffix: '', label: 'Idiomas de asesoría: español e inglés' },
  ],
} as const;

export const academySection = {
  index: '04',
  eyebrow: 'Academia Sovereign',
  title: 'Educación que empodera. Conocimiento que transforma.',
  lead: 'Publicamos lo que normalmente se explica sólo puertas adentro. Si vas a decidir sobre tu patrimonio, decide informado.',
  filterAll: 'Todos',
  searchPlaceholder: 'Buscar en la Academia…',
  empty: 'No encontramos artículos con ese criterio.',
  minRead: 'min',
} as const;

export const about = {
  eyebrow: 'Sobre nosotros',
  title: 'No vendemos productos. Diseñamos arquitectura patrimonial.',
  lead: 'Sovereign Capital Solutions nació de una convicción: demasiadas familias construyen patrimonio sin una estrategia que conecte cada una de sus decisiones financieras. Acumulan productos adquiridos en momentos distintos, con objetivos distintos, que nunca fueron diseñados para trabajar como una sola estructura.',
  body: [
    'Nuestro trabajo empieza donde termina la venta tradicional. Antes de recomendar cualquier instrumento entendemos la historia completa: el negocio, la familia, las obligaciones, los miedos y lo que quieres que siga existiendo cuando tú ya no estés.',
    'Nuestro proceso empieza con tus objetivos, no con un producto específico. Evaluamos las soluciones disponibles dentro de las compañías y productos a los que tenemos acceso para determinar cuáles pueden ajustarse mejor a tu situación, tu elegibilidad y tus objetivos.',
    'Y no desaparecemos después de implementar. Una estrategia patrimonial que no se revisa envejece mal: cambian tus ingresos, tu familia, la legislación y tus objetivos. Por eso la última etapa de nuestro método es de acompañamiento continuo.',
  ],
  pillarsTitle: 'Los principios que no negociamos',
  pillarsLead: 'Cinco valores que funcionan como filtro de cada decisión que tomamos por ti.',
  pillars: [
    { icon: 'lock' as IconName, title: 'Discreción', text: 'Tu información financiera es tuya. Trabajamos con la reserva que exige un patrimonio serio.' },
    { icon: 'scale' as IconName, title: 'Ética', text: 'Si una estrategia no te conviene te lo decimos, aunque signifique no hacer negocio.' },
    { icon: 'target' as IconName, title: 'Independencia', text: 'Primero la estrategia, después el producto. El criterio lo marca tu situación, nunca una cuota de colocación.' },
    { icon: 'infinity' as IconName, title: 'Compromiso', text: 'Acompañamiento continuo: revisamos, ajustamos y respondemos.' },
    { icon: 'star' as IconName, title: 'Excelencia', text: 'Cada estructura se diseña como si fuera a auditarla la próxima generación. Porque lo hará.' },
  ],
  differenceTitle: 'La diferencia Sovereign',
  differenceLead: 'Dos formas de acercarse al mismo patrimonio. Sólo una sobrevive treinta años.',
  differenceHeads: ['El enfoque tradicional', 'El enfoque Sovereign'],
  difference: [
    { a: 'Empieza con un producto', b: 'Empieza con tu historia y tus objetivos' },
    { a: 'Resuelve una necesidad aislada', b: 'Diseña un sistema que integra protección, liquidez, crecimiento y legado' },
    { a: 'Termina en la firma', b: 'La firma es el punto de partida del acompañamiento' },
    { a: 'Mide comisiones colocadas', b: 'Mide patrimonio protegido y transferido' },
    { a: 'Habla con una sola persona de la familia', b: 'Prepara a la siguiente generación para recibir' },
  ],
} as const;

/**
 * Página del fundador. Una sola fotografía institucional: la firma trasciende a
 * su fundador, pero el visitante debe poder ponerle rostro a la visión.
 * Basta con dejar `founder.jpg` en `src/assets/img/` para que aparezca el
 * retrato; sin ese archivo se muestra la lámina de marca.
 */
export const founder = {
  eyebrow: 'El fundador',
  name: 'Oswald Gonzalez',
  role: 'Founder & CEO',
  credentials: 'Civil Engineer · Real Estate Broker · Licensed Life, Health & Annuity Agent',
  tagline: 'De la ingeniería de grandes proyectos a la arquitectura patrimonial.',
  photoAlt: 'Oswald Gonzalez, fundador de Sovereign Capital Solutions',
  intro: 'Aprendí a construir estructuras. Hoy diseño estrategias para proteger lo que otros tardaron una vida en construir.',
  blocks: [
    {
      title: 'Dos décadas construyendo',
      text: 'Mi carrera profesional estuvo vinculada a la ingeniería, la construcción y proyectos de gran escala en distintos países. Ese mundo me enseñó algo que todavía define mi manera de pensar.',
    },
    {
      title: 'Nada importante debe construirse sin un diseño',
      text: 'En ingeniería, antes de construir se estudia el terreno, se calculan los riesgos, se diseña la estructura y se proyecta cómo deberá responder durante décadas. Con el tiempo entendí que el patrimonio debería tratarse con la misma disciplina.',
    },
    {
      title: 'Lo que vi en Real Estate',
      text: 'Conocí personas capaces de generar ingresos, adquirir propiedades y construir empresas que, sin embargo, no tenían una estrategia integral para proteger lo construido, mantener liquidez y preparar la transferencia de su patrimonio.',
    },
    {
      title: 'De esa visión nace Sovereign',
      text: 'No para comenzar preguntando qué producto financiero comprar, sino para hacer primero las preguntas más importantes.',
    },
  ],
  questions: [
    '¿Qué estás construyendo?',
    '¿Qué necesitas proteger?',
    '¿Qué quieres conservar?',
    '¿Y qué deseas dejar cuando ya no estés?',
  ],
  closing: 'Acumular patrimonio es solamente una parte de la historia. La verdadera estrategia consiste en diseñar qué ocurrirá con él durante tu vida y después de ella.',
  quote: 'Durante años diseñé estructuras donde el margen de error era mínimo. Hoy aplico esa misma disciplina al diseño de estrategias para proteger patrimonio, crear liquidez y construir legado.',
} as const;

export const resources = {
  eyebrow: 'Recursos',
  title: 'Herramientas para decidir mejor',
  lead: 'Material práctico para que entiendas tu situación antes de sentarte con nosotros.',
  guidesTitle: 'Guías y eBooks',
  guides: [
    { title: 'Guía Banca Mía™', text: 'Cómo funciona la metodología paso a paso, con ejemplos numéricos.', tag: 'PDF · 24 páginas', icon: 'lock' as IconName },
    { title: 'Checklist de Protección Patrimonial', text: 'Las 18 preguntas que deberías poder responder sobre tu patrimonio.', tag: 'PDF · 8 páginas', icon: 'shield' as IconName },
    { title: 'Manual de Sucesión Familiar', text: 'Cómo preparar a la siguiente generación para recibir con criterio.', tag: 'PDF · 31 páginas', icon: 'legacy' as IconName },
  ],
  guideCta: 'Solicitar acceso',
  webinarsTitle: 'Webinars',
  webinars: [
    { title: 'Banca Mía™ en la práctica', date: 'Último miércoles de cada mes', text: 'Sesión en vivo de 45 minutos con casos reales y preguntas abiertas.' },
    { title: 'Sucesión sin conflicto', date: 'Trimestral', text: 'Para familias empresarias que quieren ordenar la transición antes de que sea urgente.' },
  ],
  webinarCta: 'Reservar lugar',
  calc: {
    title: 'Calculadora de costo de oportunidad',
    lead: 'Dos puntos de rendimiento parecen poco en un estado de cuenta mensual. Ajusta los valores y observa lo que representan en tu horizonte real.',
    fields: {
      amount: 'Capital inicial',
      contribution: 'Aporte anual',
      years: 'Horizonte',
      rateA: 'Rendimiento neto tradicional',
      rateB: 'Rendimiento neto con estructura eficiente',
    },
    years: 'años',
    labelA: 'Enfoque tradicional',
    labelB: 'Enfoque Sovereign',
    diff: 'Diferencia al final del horizonte',
    contributed: 'Capital aportado',
    note: 'Cálculo ilustrativo de interés compuesto anual. No constituye una proyección de resultados ni una recomendación de inversión. Los resultados reales dependen de tu situación particular, de la estructura contratada y de la legislación vigente.',
  },
  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Necesito tener un patrimonio mínimo para trabajar con Sovereign?',
      a: 'No establecemos un patrimonio mínimo. Trabajamos con personas, familias y empresarios que desean proteger lo que han construido, fortalecer su posición financiera o comenzar a desarrollar una estrategia patrimonial de largo plazo. La consulta inicial nos permite determinar si podemos aportar valor a tu situación.',
    },
    {
      q: '¿Sovereign trabaja con una sola compañía?',
      a: 'Nuestro proceso comienza con tus objetivos, no con un producto específico. Evaluamos las soluciones disponibles dentro de las compañías y productos a los que tenemos acceso para determinar cuáles pueden ajustarse mejor a tu situación, elegibilidad y objetivos.',
    },
    {
      q: '¿Cómo somos compensados?',
      a: 'Dependiendo de la estrategia y de los productos implementados, Sovereign Capital Solutions puede recibir compensación de las compañías proveedoras. Antes de cualquier implementación, explicamos de manera clara cómo funciona nuestra compensación y los costos asociados al producto o estrategia seleccionada.',
    },
    {
      q: '¿Sustituyen a mi contador o a mi abogado?',
      a: 'No. Nuestro trabajo no sustituye el asesoramiento legal, contable o fiscal. La arquitectura patrimonial funciona cuando el diseño financiero, el fiscal y el legal apuntan en la misma dirección: cuando una estrategia involucra esas áreas, recomendamos que sea revisada con los profesionales correspondientes y podemos colaborar con tus asesores actuales cuando resulte apropiado.',
    },
    {
      q: '¿Cuánto tiempo toma implementar una estrategia?',
      a: 'Cada estrategia es diferente. Después de la sesión inicial analizamos tus objetivos y diseñamos las alternativas apropiadas. El tiempo de implementación dependerá de las soluciones seleccionadas, los requisitos de las compañías y, cuando corresponda, los procesos de suscripción. Te acompañamos durante cada etapa del proceso.',
    },
    {
      q: '¿Qué pasa si mi situación cambia?',
      a: 'La estrategia puede evolucionar contigo. Nuestro enfoque contempla seguimiento periódico para revisar cambios relevantes en tu vida, tu negocio, tus objetivos o tus circunstancias y evaluar si corresponde realizar ajustes.',
    },
    {
      q: '¿Trabajan con personas fuera de Estados Unidos?',
      a: 'Podemos atender consultas de personas y familias internacionales. La disponibilidad e implementación de determinadas estrategias o productos dependerá del país de residencia, jurisdicción, elegibilidad y requisitos regulatorios aplicables. Cada caso se evalúa individualmente.',
    },
  ],
} as const;

export const finalCta = {
  eyebrow: 'El siguiente paso',
  title: 'El mejor momento para diseñar tu legado es ahora.',
  lead: 'Agenda tu consulta estratégica privada y descubre cómo podemos ayudarte a proteger tu patrimonio y tu futuro. Sin costo, sin compromiso y sin presentación de ventas.',
  points: ['45 minutos, en privado', 'Sin costo ni compromiso', 'Con diagnóstico inicial'],
} as const;

export const contactPage = {
  eyebrow: 'Contacto',
  title: 'Agenda tu consulta estratégica privada',
  lead: 'Cuéntanos brevemente tu situación. Un asesor senior te contactará dentro de las siguientes 24 horas hábiles para coordinar una conversación privada de 45 minutos.',
  directTitle: 'Prefiero escribir directamente',
  infoTitle: 'Información de contacto',
  expect: {
    title: 'Qué ocurre después',
    steps: [
      { n: '01', text: 'Recibimos tu solicitud y la revisa un asesor senior, no un centro de llamadas.' },
      { n: '02', text: 'Te contactamos en menos de 24 horas hábiles para coordinar día y hora.' },
      { n: '03', text: 'Conversamos 45 minutos en privado. Sin presentación de ventas y sin compromiso.' },
    ],
  },
  form: {
    legendA: 'Sobre ti',
    legendB: 'Sobre tu situación',
    name: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    profile: 'Tu perfil',
    profileOptions: ['Empresario / Empresaria', 'Profesional de altos ingresos', 'Inversionista', 'Familia', 'Otro'],
    interest: 'Qué te interesa',
    interestPlaceholder: 'Selecciona una opción',
    message: 'Cuéntanos brevemente tu situación',
    messagePlaceholder: 'Opcional. Mientras más contexto tengamos, mejor será la primera conversación.',
    consent: consent.contact,
    submit: 'Solicitar consulta privada',
    sending: 'Enviando…',
    successTitle: 'Solicitud recibida',
    success: 'Gracias. Un asesor senior te contactará dentro de las próximas 24 horas hábiles.',
    errorTitle: 'No pudimos enviar tu solicitud',
    error: 'Ocurrió un problema al enviar el formulario. Escríbenos directamente y lo resolvemos:',
    required: 'Este campo es obligatorio',
    invalidEmail: 'Ingresa un correo electrónico válido',
    invalidPhone: 'Ingresa un teléfono válido',
    consentRequired: 'Necesitamos tu autorización para poder contactarte',
  },
} as const;

export const footer = {
  columns: [
    {
      title: 'Navegación',
      links: [
        { label: 'Inicio', href: '/' },
        { label: 'Sobre Nosotros', href: '/nosotros' },
        { label: 'Estrategias', href: '/estrategias' },
        { label: 'Educación', href: '/academia' },
        { label: 'Recursos', href: '/recursos' },
        { label: 'Contacto', href: '/contacto' },
      ],
    },
    {
      title: 'Estrategias',
      links: [
        { label: 'Protección Patrimonial', href: '/estrategias/proteccion-patrimonial' },
        { label: 'Acceso a Liquidez', href: '/estrategias/acceso-a-liquidez' },
        { label: 'Acumulación Tax Advantaged', href: '/estrategias/acumulacion-tax-advantaged' },
        { label: 'Planificación Empresarial', href: '/estrategias/planificacion-empresarial' },
        { label: 'Legado y Sucesión', href: '/estrategias/legado-y-sucesion' },
        { label: 'Banca Mía™', href: '/estrategias/banca-mia' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Academia Sovereign', href: '/academia' },
        { label: 'Guías y eBooks', href: '/recursos#guias' },
        { label: 'Calculadora', href: '/recursos#calculadora' },
        { label: 'Webinars', href: '/recursos#webinars' },
        { label: 'Preguntas frecuentes', href: '/recursos#faq' },
      ],
    },
  ],
  contactTitle: 'Contáctanos',
  followTitle: 'Síguenos',
  rights: 'Todos los derechos reservados.',
  legal: [
    { label: 'Aviso Legal', href: '/legal/aviso-legal' },
    { label: 'Privacidad', href: '/legal/privacidad' },
    { label: 'Términos', href: '/legal/terminos' },
    { label: 'Consentimiento de comunicaciones', href: '/legal/consentimiento-comunicaciones' },
    { label: 'Descargo de Responsabilidad', href: '/legal/descargo' },
  ],
  regulatoryTitle: 'Información regulatoria',
} as const;

export const legalPages = {
  'aviso-legal': {
    title: 'Aviso Legal',
    updated: 'Última actualización: enero de 2026',
    body: [
      'Sovereign Capital Solutions es una firma de estrategia patrimonial privada. El contenido de este sitio tiene fines informativos y educativos y no constituye asesoría legal, fiscal, contable ni una oferta de venta de instrumentos financieros.',
      'Las estrategias descritas requieren un análisis individual y su disponibilidad depende de la residencia fiscal, de la situación patrimonial y de los requisitos de suscripción de cada compañía emisora.',
      'El uso de este sitio no crea una relación de asesoría entre el usuario y Sovereign Capital Solutions. Dicha relación se establece únicamente mediante acuerdo escrito.',
      'Las marcas Método Sovereign™ y Banca Mía™ identifican metodologías propias de la firma y no describen un producto financiero registrado. Banca Mía™ es una estrategia basada en seguros de vida Whole Life participantes: no es un banco, una cuenta bancaria ni un producto de inversión.',
      'Los productos de seguro de vida que se mencionan en este sitio son emitidos por aseguradoras autorizadas y los ofrece un agente de seguros de vida licenciado únicamente en los estados donde mantiene licencia vigente. Su contratación está sujeta a suscripción (underwriting), disponibilidad por estado y a los términos de cada contrato.',
    ],
  },
  privacidad: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: septiembre de 2026',
    body: [
      'Recopilamos la información que nos proporcionas voluntariamente en nuestros formularios (nombre, correo electrónico, teléfono, estado de residencia y las respuestas de los diagnósticos) y datos técnicos de navegación (dirección IP, tipo de navegador, páginas visitadas y parámetros de campaña como UTM).',
      'Utilizamos esa información para contactarte, coordinar tu consulta, enviarte el material educativo que solicitaste y darte seguimiento. Guardamos también un registro del consentimiento que otorgaste (texto aceptado, fecha, IP y navegador) como prueba de autorización.',
      'Usamos herramientas de medición y publicidad (Meta Pixel y Conversions API, Google Analytics) para saber qué contenidos resultan útiles y medir nuestras campañas. Estas herramientas pueden usar cookies e identificadores del navegador. Los datos de contacto que se comparten con ellas viajan cifrados mediante hash.',
      'No vendemos, alquilamos ni compartimos tus datos personales con terceros para sus propios fines de marketing. En particular, los números de teléfono y el consentimiento para mensajes de texto (SMS/WhatsApp) no se comparten con terceros ni con afiliados con fines de marketing. Sólo los tratan los proveedores que nos prestan servicios (CRM, agenda, mensajería), bajo obligación de confidencialidad.',
      'Conservamos los datos durante el tiempo necesario para atender tu solicitud y cumplir con las obligaciones legales aplicables.',
      'Puedes solicitar en cualquier momento el acceso, la rectificación o la eliminación de tus datos escribiendo a nuestro correo de contacto, y dejar de recibir mensajes respondiendo STOP o usando el enlace de baja de cada email. Atenderemos la solicitud dentro de los plazos legales aplicables.',
    ],
  },
  terminos: {
    title: 'Términos de Uso',
    updated: 'Última actualización: septiembre de 2026',
    body: [
      'Al usar este sitio aceptas estos términos. El contenido, los diagnósticos, los simuladores y las masterclasses son educativos: no constituyen una oferta, una cotización, una ilustración oficial ni asesoría legal, fiscal o financiera.',
      'El resultado de un diagnóstico en línea es orientativo y se basa sólo en tus respuestas. La elegibilidad real para un seguro de vida la determina la aseguradora mediante su proceso de suscripción (underwriting), que puede aprobar, recargar, posponer o declinar una solicitud.',
      'Las consultas son sin costo y sin compromiso. Si decides contratar un producto, Sovereign Capital Solutions puede recibir compensación de la aseguradora; te explicaremos cómo funciona antes de cualquier implementación.',
      'Sólo asesoramos a residentes de los estados donde mantenemos licencia vigente. Las solicitudes de otros estados quedan en lista de espera.',
      'Te comprometes a proporcionar información veraz y a no usar los formularios para enviar datos de terceros sin su autorización. Podemos modificar estos términos; la versión vigente es la publicada en esta página.',
    ],
  },
  'consentimiento-comunicaciones': {
    title: 'Aviso de Consentimiento de Comunicaciones',
    updated: 'Última actualización: septiembre de 2026',
    body: [
      'Cuando marcas la casilla de consentimiento en nuestros formularios autorizas a Sovereign Capital Solutions a contactarte por llamada, SMS, WhatsApp y email, incluso mediante sistemas automatizados o mensajes pregrabados, al número y correo que proporcionaste, para darte información sobre seguros de vida, enviarte el material solicitado y coordinar tu consulta.',
      'El consentimiento no es condición de compra de ningún producto o servicio. La casilla nunca viene marcada de antemano.',
      'La frecuencia de los mensajes varía según tu interacción. Pueden aplicar tarifas de mensajes y datos de tu operador.',
      'Puedes revocar tu consentimiento en cualquier momento: responde STOP a cualquier SMS o WhatsApp, pide que no te llamemos durante una llamada, o escríbenos a nuestro correo de contacto. Para ayuda, responde HELP.',
      'Guardamos un registro del texto que aceptaste, su versión, la fecha, la dirección IP y el navegador desde el que lo hiciste, como prueba de consentimiento. Nunca compramos, vendemos ni compartimos listas de contactos.',
    ],
  },
  descargo: {
    title: 'Descargo de Responsabilidad',
    updated: 'Última actualización: enero de 2026',
    body: [
      'Los ejemplos, cifras y calculadoras presentados en este sitio son ilustrativos. No representan una proyección de resultados futuros ni una garantía de desempeño.',
      'Los resultados reales dependen de la estructura contratada, del comportamiento de los mercados, de la legislación vigente y de las circunstancias particulares de cada persona.',
      'Antes de tomar cualquier decisión patrimonial recomendamos consultar con tu asesor fiscal y legal.',
      'Sovereign Capital Solutions no asume responsabilidad por decisiones tomadas exclusivamente con base en el contenido de este sitio.',
    ],
  },
} as const;

export const ui = {
  menu: 'Menú',
  close: 'Cerrar',
  notFound: 'Página no encontrada',
  notFoundText: 'La página que buscas no existe o cambió de dirección. Desde aquí puedes volver al inicio o escribirnos directamente.',
  goHome: 'Volver al inicio',
  related: 'Sigue leyendo',
  inThisStrategy: 'Qué incluye',
  outcome: 'El resultado',
  otherStrategies: 'Otras estrategias',
  talkAbout: 'Hablemos de tu caso',
  skip: 'Saltar al contenido',
  backToAcademy: 'Volver a la Academia',
  backToStrategies: 'Volver a estrategias',
  index: 'Índice',
  publishedOn: 'Publicado el',
} as const;
