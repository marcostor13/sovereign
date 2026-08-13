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
  socials: [
    { id: 'linkedin' as IconName, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { id: 'instagram' as IconName, label: 'Instagram', href: 'https://www.instagram.com/' },
    { id: 'facebook' as IconName, label: 'Facebook', href: 'https://www.facebook.com/' },
    { id: 'youtube' as IconName, label: 'YouTube', href: 'https://www.youtube.com/' },
  ],
} as const;

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
      { label: 'Banca Mía™', href: '/estrategias/banca-mia', desc: 'Conviértete en tu propia fuente de capital' },
    ],
  },
  {
    label: 'Educación',
    href: '/academia',
    children: [
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
  lead: 'Diseñamos estrategias patrimoniales personalizadas que protegen, preservan y multiplican tu patrimonio con visión, objetividad y propósito.',
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
    { n: '04', icon: 'gear' as IconName, title: 'Implementation', text: 'Implementamos la estrategia con las mejores compañías y estructuras disponibles en el mercado.' },
    { n: '05', icon: 'infinity' as IconName, title: 'Lifetime Partnership', text: 'Te acompañamos de por vida, revisando, ajustando y optimizando tu estrategia continuamente.' },
  ],
} as const;

export const strategiesSection = {
  index: '03',
  eyebrow: 'Lo que diseñamos',
  title: 'Estrategias que diseñamos',
  lead: 'Seis disciplinas que se combinan en una sola arquitectura. Ninguna se vende suelta: se diseñan juntas.',
} as const;

export const numbers = {
  eyebrow: 'Sovereign en números',
  items: [
    { value: 250, prefix: '+', suffix: '', label: 'Familias asesoradas' },
    { value: 75, prefix: '+', suffix: 'M', label: 'En patrimonio protegido' },
    { value: 15, prefix: '+', suffix: '', label: 'Años de experiencia' },
    { value: 100, prefix: '', suffix: '%', label: 'Compromiso con tu legado' },
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
  lead: 'Sovereign Capital Solutions nació de una convicción incómoda: la mayoría de las familias con patrimonio no tienen una estrategia. Tienen productos sueltos, comprados en momentos distintos, a personas distintas, que nunca hablaron entre sí.',
  body: [
    'Nuestro trabajo empieza donde termina la venta tradicional. Antes de recomendar cualquier instrumento entendemos la historia completa: el negocio, la familia, las obligaciones, los miedos y lo que quieres que siga existiendo cuando tú ya no estés.',
    'Somos independientes. No pertenecemos a ninguna institución que nos obligue a colocar su inventario, lo que nos permite acceder a las mejores compañías y estructuras disponibles en el mercado y elegir según tu caso, no según una cuota.',
    'Y no desaparecemos después de implementar. Una estrategia patrimonial que no se revisa envejece mal: cambian tus ingresos, tu familia, la legislación y tus objetivos. Por eso la última etapa de nuestro método no termina nunca.',
  ],
  pillarsTitle: 'Los principios que no negociamos',
  pillarsLead: 'Cinco valores que funcionan como filtro de cada decisión que tomamos por ti.',
  pillars: [
    { icon: 'lock' as IconName, title: 'Discreción', text: 'Tu información financiera es tuya. Trabajamos con la reserva que exige un patrimonio serio.' },
    { icon: 'scale' as IconName, title: 'Ética', text: 'Si una estrategia no te conviene te lo decimos, aunque signifique no hacer negocio.' },
    { icon: 'target' as IconName, title: 'Independencia', text: 'Sin cuotas de colocación ni lealtades a una sola compañía. Sólo criterio.' },
    { icon: 'infinity' as IconName, title: 'Compromiso', text: 'Acompañamiento de por vida: revisamos, ajustamos y respondemos.' },
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
    { q: '¿Cuál es el patrimonio mínimo para trabajar con ustedes?', a: 'No fijamos un mínimo rígido. Trabajamos con quienes tienen algo que proteger y disposición a seguir un proceso. En la primera conversación evaluamos juntos si nuestro enfoque aporta valor a tu caso; si no lo aporta, te lo decimos.' },
    { q: '¿Cómo cobran ustedes?', a: 'Nuestra compensación proviene de las compañías con las que implementamos, no de un honorario que salga de tu bolsillo. Te explicamos con total transparencia cómo funciona antes de que tomes cualquier decisión.' },
    { q: '¿Sustituyen a mi contador o a mi abogado?', a: 'No. Trabajamos con ellos. La arquitectura patrimonial funciona cuando el diseño financiero, el fiscal y el legal apuntan en la misma dirección. Coordinamos con tus asesores actuales o te presentamos profesionales de confianza.' },
    { q: '¿Cuánto tiempo toma implementar una estrategia?', a: 'El diseño suele tomar entre dos y cuatro semanas desde la sesión de Discovery. La implementación depende de las estructuras involucradas y de los procesos de suscripción: típicamente entre cuatro y ocho semanas adicionales.' },
    { q: '¿Qué pasa si mi situación cambia?', a: 'Se ajusta. La quinta etapa del Método Sovereign™ es acompañamiento de por vida: revisamos la estrategia al menos una vez al año y cada vez que ocurre un cambio relevante en tu vida, tu negocio o la legislación.' },
    { q: '¿Trabajan con personas fuera de Estados Unidos?', a: 'Sí. Atendemos a familias y empresarios de varios países. Las estructuras disponibles varían según la residencia fiscal y lo evaluamos caso por caso en la consulta inicial.' },
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
    consent: 'Autorizo a Sovereign Capital Solutions a contactarme por los medios proporcionados.',
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
    { label: 'Descargo de Responsabilidad', href: '/legal/descargo' },
  ],
  credit: 'Sitio web diseñado por Sovereign CS',
} as const;

export const legalPages = {
  'aviso-legal': {
    title: 'Aviso Legal',
    updated: 'Última actualización: enero de 2026',
    body: [
      'Sovereign Capital Solutions es una firma de estrategia patrimonial privada. El contenido de este sitio tiene fines informativos y educativos y no constituye asesoría legal, fiscal, contable ni una oferta de venta de instrumentos financieros.',
      'Las estrategias descritas requieren un análisis individual y su disponibilidad depende de la residencia fiscal, de la situación patrimonial y de los requisitos de suscripción de cada compañía emisora.',
      'El uso de este sitio no crea una relación de asesoría entre el usuario y Sovereign Capital Solutions. Dicha relación se establece únicamente mediante acuerdo escrito.',
      'Las marcas Método Sovereign™ y Banca Mía™ identifican metodologías propias de la firma y no describen un producto financiero registrado.',
    ],
  },
  privacidad: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: enero de 2026',
    body: [
      'Recopilamos únicamente la información que nos proporcionas voluntariamente a través de nuestros formularios de contacto: nombre, correo electrónico, teléfono y el contexto que decidas compartir.',
      'Utilizamos esa información exclusivamente para contactarte, coordinar tu consulta y darte seguimiento. No vendemos, alquilamos ni compartimos tus datos con terceros con fines comerciales.',
      'Conservamos los datos durante el tiempo necesario para atender tu solicitud y cumplir con las obligaciones legales aplicables.',
      'Puedes solicitar en cualquier momento el acceso, la rectificación o la eliminación de tus datos escribiendo a nuestro correo de contacto. Atenderemos la solicitud dentro de los plazos legales aplicables.',
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
