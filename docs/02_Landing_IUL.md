# Landing Page — IUL sin mitos (Sovereign Capital Solutions)

Especificación completa para diseñar, redactar, construir y medir la landing del embudo IUL.

---

## 1. Ficha de la landing

| Campo | Valor |
|---|---|
| URL | `https://sovereigncapitalsolutions.com/iul` (variantes de test: `/iul-a`, `/iul-b`) |
| Objetivo principal | Que el visitante complete el **Diagnóstico IUL de 2 minutos** y agende la **Consulta estratégica privada (45 min, sin costo)** |
| Objetivo secundario | Descargar la guía **"IUL de la A a la Z"** (quien no califica o no está listo) |
| Tráfico | Meta Ads (Reels/Feed de IG y FB), retargeting, WhatsApp, orgánico |
| Idioma | Español neutro; términos técnicos en inglés entre paréntesis |
| Avatar | Profesional o dueño de negocio latino de 28–55 años, con familia, ingreso estable, interés en protección y retiro |
| Promesa central | Entender de verdad cómo funciona un IUL y saber, con honestidad, si es para ti |
| Tono | Experto, cercano, sereno, transparente. Cero hype, cero lujo ostentoso |
| Metas de conversión | ≥8% visita → lead (frío) · ≥55% leads calificados · ≥35% calificados → cita |
| KPI técnico | LCP < 2.0 s en 4G, CLS < 0.1, Lighthouse móvil ≥ 90 |

---

## 2. Estructura (orden de secciones)

```
0. Barra superior mínima (logo + teléfono + botón)     ← SIN menú de navegación
1. HERO (titular + subtítulo + CTA + video del asesor)
2. Barra de confianza (licencia, Brickell, en español, sin costo)
3. "¿Te suena familiar?" (problema)
4. Qué es un IUL en 20 segundos
5. Cómo funciona el dinero (diagrama de 4 pasos)
6. Cap, floor y participación con un ejemplo (interactivo)
7. Mito vs realidad
8. ¿Es para ti? / NO es para ti
9. El Método Sovereign™ (5 fases)
10. Quién te asesora (bio + licencia)
11. Testimonios (cuando existan)
12. DIAGNÓSTICO IUL (quiz de varios pasos) ← ancla #diagnostico
13. Preguntas frecuentes
14. CTA final + alternativa (descargar guía)
15. Footer legal completo
```

CTA fijo en móvil (sticky bottom bar): **"Hacer mi diagnóstico (2 min)"** → scroll a `#diagnostico`.

---

## 3. Contenido sección por sección (copy listo)

### 0. Barra superior

- Logo Sovereign Capital Solutions (a la izquierda), sin enlaces de salida
- A la derecha: `(305) 587-4200` (click-to-call) + botón secundario "Agendar consulta"

### 1. HERO

**Pre-titular (etiqueta):** `SEGURO DE VIDA UNIVERSAL INDEXADO · ASESORÍA EN ESPAÑOL`

**Titular (H1), elegir una variante para el test A/B:**

- A: **"IUL sin mitos: protección de por vida y valor en efectivo, explicados con honestidad."**
- B: **"Antes de contratar un IUL, entiende lo que casi nadie te explica."**
- C: **"Protege a tu familia y haz crecer tu valor en efectivo, sin pérdidas por caídas del índice."** (ir con el matiz del subtítulo)

**Subtítulo:**
"Un IUL puede ser una herramienta potente para la protección familiar y como complemento del retiro, siempre que se diseñe bien, se financie de forma sostenible y se revise cada año. Haz el diagnóstico de 2 minutos y descubre si tiene sentido para ti."

**Bullets (3, con íconos de check):**

- Explicación clara de cap, floor, participación y cargos
- Ilustraciones probadas en escenarios conservadores, no optimistas
- Asesor con licencia, en español, sin costo y sin compromiso

**CTA primario:** `Hacer mi diagnóstico IUL →` (ancla `#diagnostico`)
**CTA secundario (link de texto):** `Prefiero descargar la guía gratuita`

**Visual:** video vertical u horizontal (60–90 s) del asesor en la oficina de Brickell, con miniatura con rostro y botón de play. Autoplay silenciado con subtítulos. Guion del video:
> "Hola, soy [Nombre], asesor licenciado de Sovereign Capital Solutions. Si estás viendo esto, probablemente te han hablado del IUL como si fuera la bolsa sin riesgo. No es exactamente así. En esta página te explico cómo funciona de verdad, qué cuesta, qué riesgos tiene y quién no debería contratarlo. Si al final crees que puede encajar contigo, haz el diagnóstico y conversemos."

**Microtexto debajo del CTA:** "Sin costo · 2 minutos · Tus datos son confidenciales"

### 2. Barra de confianza (4 ítems horizontales, en móvil en grilla 2×2)

- [ícono escudo] Agente licenciado · Lic. #[XXXXXX] (FL)
- [ícono ubicación] Brickell, Miami
- [ícono idioma] 100% en español
- [ícono calendario] Consulta de 45 min sin costo

(Íconos en SVG lineales, no emojis. Si se nombran aseguradoras con las que se trabaja, solo con autorización escrita.)

### 3. "¿Te suena familiar?" (problema)

**H2:** "Quieres proteger a tu familia y hacer crecer tu dinero, pero…"

Tarjetas (4):

1. **"Me dijeron que gana lo mismo que el S&P 500."** Y no te explicaron el cap ni la participación.
2. **"No sé si mi 401(k) es suficiente."** Y te preocupa lo que pasará con los impuestos en el retiro.
3. **"No entiendo la ilustración."** Una hoja con números que suben y suben, sin explicación.
4. **"Si me pasa algo, ¿qué pasa con los míos?"** Y el seguro del trabajo desaparece si cambias de empleo.

Cierre: "No necesitas más promesas. Necesitas entender la herramienta."

### 4. Qué es un IUL en 20 segundos

**H2:** "¿Qué es un IUL?"

"Un IUL (Indexed Universal Life) es un **seguro de vida universal indexado**: puede durar toda la vida si se mantiene financiado, paga un beneficio por fallecimiento y acumula valor en efectivo. El interés se calcula con una fórmula vinculada a un índice externo, **pero tu dinero no se invierte directamente en acciones ni en el índice.**"

### 5. Cómo funciona el dinero (diagrama horizontal en desktop, vertical en móvil)

**H2:** "Así se mueve cada dólar dentro de tu póliza"

| 1. Prima | 2. Cargos | 3. Valor en efectivo | 4. Acceso y beneficio |
|---|---|---|---|
| Flexible dentro de límites. Pagar el mínimo no garantiza una acumulación fuerte. | Costo del seguro (COI), gastos administrativos, riders y posibles cargos de índice. | Cuenta fija y/o segmentos indexados, menos retiros y préstamos. | Retiros, préstamos y beneficio por fallecimiento, sujetos al contrato. |

Nota bajo el diagrama: "El costo del seguro (COI) normalmente aumenta con la edad. Por eso el diseño y los aportes sostenibles son clave."

### 6. Cap, floor y participación (componente interactivo)

**H2:** "Lo que realmente significan cap, floor y participación"

**Simulador simple (JS en el cliente, sin guardar datos):**

- Slider "Variación del índice en el año": de −20% a +25%
- Inputs fijos editables: Participación 80%, Cap 8%, Floor 0%
- Resultado: `Interés acreditado = max(floor, min(índice × participación, cap))`
- Mostrar dos ejemplos precargados:
  - Índice +12% × 80% = 9.6% → con cap de 8% → **se acredita 8%**
  - Índice −10% → floor de 0% → **se acredita 0% antes de cargos**

**Advertencia (caja destacada, color de alerta suave):**
"El floor de 0% evita una acreditación negativa causada por el índice, **pero no impide que el costo del seguro y otros cargos reduzcan tu valor en efectivo.** El rendimiento no es el del S&P 500 completo y normalmente no incluye dividendos. Cap y participación pueden cambiar según el contrato."

Texto legal bajo el simulador: "Ejemplo ilustrativo y educativo. No representa un producto específico ni un rendimiento esperado."

### 7. Mito vs realidad (acordeón o tabla de 2 columnas)

**H2:** "Mitos del IUL que debes conocer antes de firmar"

| Mito | Realidad |
|---|---|
| "Ganas lo mismo que la bolsa, sin riesgo." | Recibes un interés según una fórmula con cap y participación. No hay pérdidas por caída del índice, pero los cargos siguen. |
| "Es gratis tener tu dinero ahí." | Hay carga sobre primas, COI, cargos administrativos, riders y cargos de rescate en los primeros años. |
| "Los préstamos son dinero gratis." | Los préstamos generan interés y reducen el valor disponible y el beneficio por fallecimiento. |
| "Es un retiro libre de impuestos garantizado." | En una póliza no-MEC bien administrada, ciertos préstamos y retiros pueden evitar impuesto corriente. Si la póliza caduca con deuda, puede haber impuestos. |
| "La ilustración es lo que vas a ganar." | La ilustración es una proyección. Las garantías del contrato son las que mandan. |

### 8. ¿Es para ti?

**H2:** "Seamos honestos: ¿un IUL tiene sentido para ti?"

Dos columnas (verde / gris):

**Puede ser muy buena herramienta si:**

- Tienes una necesidad real de seguro permanente
- Tu flujo de caja es estable y tu horizonte es de 10–15 años o más
- Puedes sostener los aportes incluso en años bajos
- Buscas acumulación con diferimiento fiscal y acceso complementario, no liquidez inmediata
- Planeas legado familiar, protección del negocio o un complemento de retiro, después de cubrir tus reservas básicas

**No suele ser adecuado si:**

- Solo necesitas una cobertura temporal económica
- Podrías necesitar el dinero en los primeros años
- Tienes ingresos inestables, deuda cara o no tienes fondo de emergencia
- Buscas capturar todo el rendimiento bursátil
- No quieres revisiones anuales ni posibles aportes adicionales

**Microcopy:** "Si estás en la columna de la derecha, igual te ayudamos: te diremos qué alternativa tiene más sentido."
**CTA:** `Descubrir si califico →`

### 9. El Método Sovereign™

**H2:** "Cómo trabajamos contigo"

Línea de tiempo de 5 pasos:

1. **Discovery:** entendemos tu familia, ingresos, metas y coberturas actuales.
2. **Analysis:** evaluamos idoneidad y alternativas (incluidas las que no son IUL).
3. **Architecture:** diseñamos la póliza (beneficio, aportes, límite MEC) y la probamos en escenarios conservadores: 0%, 4–5% y cap reducido.
4. **Implementation:** aplicación y suscripción (underwriting) con acompañamiento.
5. **Ongoing Partnership:** ilustración in-force y revisión cada año.

### 10. Quién te asesora

- Foto profesional (medio cuerpo, oficina real)
- **Nombre, cargo**, "Agente de seguros de vida licenciado en: FL, TX, …"
- NPN y número de licencia por estado
- Bio de 3 líneas: trayectoria, enfoque "educación antes que venta", idiomas
- Cita: *"Prefiero perder una venta que venderte algo que no entiendes."*
- Enlace para verificar la licencia (por ejemplo, la búsqueda de licencias del Florida DFS)

### 11. Testimonios

- 3 testimonios en video corto o texto con foto, nombre (o iniciales) y ciudad
- **Solo sobre la experiencia:** claridad, trato, confianza. **Nunca** rendimientos ni cifras de la póliza
- Autorización escrita guardada; si hubo compensación, divulgarlo
- Si aún no hay testimonios: **ocultar la sección** (no poner placeholders)

### 12. DIAGNÓSTICO IUL (quiz de varios pasos) — `#diagnostico`

**H2:** "Diagnóstico IUL de 2 minutos"
**Subtítulo:** "Responde 7 preguntas y te diremos con honestidad si un IUL puede tener sentido para ti."

**UX:** una pregunta por pantalla, botones grandes tipo tarjeta (sin dropdowns en móvil), barra de progreso, botón "Atrás", guardar el progreso en memoria. Los datos de contacto van **al final** (paso 8).

| Paso | Pregunta | Tipo | Opciones |
|---|---|---|---|
| 1 | ¿Cuál es tu objetivo principal? | Opción única | Proteger a mi familia · Complementar mi retiro · Dejar un legado · Proteger mi negocio · Solo quiero entender el IUL |
| 2 | ¿En qué rango de edad estás? | Opción única | 18–27 · 28–40 · 41–55 · 56–65 · 66+ |
| 3 | ¿En qué estado vives? | Select con búsqueda | Estados con licencia + "Otro estado" |
| 4 | ¿Cuánto podrías destinar al mes, de forma sostenible, por 10 años o más? | Opción única | Menos de US$200 · US$200–500 · US$500–1,000 · US$1,000–2,500 · Más de US$2,500 |
| 5 | ¿Tienes un fondo de emergencia de al menos 3 meses? | Opción única | Sí · En proceso · No |
| 6 | ¿Cuándo crees que podrías necesitar ese dinero? | Opción única | Menos de 5 años · 5–10 años · Más de 10 años |
| 7 | ¿Tienes seguro de vida actualmente? | Opción única | No · Sí, term · Sí, por mi trabajo · Sí, permanente |
| 8 | Datos de contacto | Inputs | Nombre · Email · WhatsApp (con selector de país, por defecto +1) · Casilla de consentimiento |

**Texto de la casilla de consentimiento (obligatoria, NO premarcada):**
> ☐ Acepto que Sovereign Capital Solutions me contacte por llamada, SMS, WhatsApp y email, incluso mediante sistemas automatizados, al número y correo proporcionados, para darme información sobre seguros de vida y agendar mi consulta. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. Puedo cancelar respondiendo STOP. Acepto la [Política de Privacidad] y los [Términos].

**Botón:** `Ver mi resultado →`

**Lógica de resultado (en el frontend y validada en el backend):**

```
califica = edad ∈ [18–65]
        && estado ∈ ESTADOS_LICENCIA
        && aporte >= "US$200–500"
        && horizonte != "Menos de 5 años"

score = (aporte >= 500 ? 2 : 0) + (horizonte == ">10" ? 2 : 0)
      + (objetivo ∈ [retiro, legado] ? 1 : 0) + (seguro_actual == "No" ? 1 : 0)
      + (fondo_emergencia == "Sí" ? 1 : 0)

if califica && fondo_emergencia != "No":
    → Resultado A "Un IUL podría tener sentido para ti" + CALENDARIO embebido
      evento CAPI: LeadCalificado (value = score)
elif estado ∉ ESTADOS_LICENCIA:
    → Resultado C "Aún no atendemos tu estado" + guía PDF + lista de espera
else:
    → Resultado B "Antes de un IUL, te conviene asegurar tu base"
      + guía PDF + oferta de consulta general (sin presión)
      evento CAPI: Lead
```

**Resultado A (pantalla):**

- H3: "Buenas noticias, {nombre}: un IUL podría encajar con tu perfil."
- Texto: "Según tus respuestas, cumples varios criterios clave: horizonte largo y aportes sostenibles. El siguiente paso es una consulta de 45 minutos para revisar tu caso y, si tiene sentido, preparar una ilustración conservadora. Sin costo y sin compromiso."
- Calendario embebido (Cal.com / CRM) con nombre, email y teléfono ya precargados
- Bajo el calendario: "¿Tu pareja participa en las decisiones financieras? Invítala a la consulta."

**Resultado B:**

- H3: "Gracias, {nombre}. Te vamos a ser honestos."
- Texto: "Con lo que nos contaste, un IUL quizás no sea tu mejor primer paso ahora. Normalmente recomendamos tener un fondo de emergencia y un horizonte de al menos 10 años. Te enviamos la guía 'IUL de la A a la Z' para que tomes una decisión informada. Si quieres, también podemos revisar alternativas contigo."
- Botones: `Descargar guía` · `Hablar igual con un asesor`

### 13. Preguntas frecuentes (acordeón; marcar con schema FAQPage)

1. **¿El IUL es una inversión?** No. Es un seguro de vida. El valor en efectivo recibe interés según una fórmula ligada a un índice, pero no se invierte directamente en el mercado.
2. **¿Puedo perder dinero?** Un floor de 0% evita acreditaciones negativas por el índice, pero los cargos de la póliza pueden reducir el valor en efectivo, sobre todo si se financia con poco.
3. **¿Cuánto cuesta?** Depende de la edad, la salud, el monto de cobertura y el diseño. La prima definitiva se conoce después de la suscripción (underwriting).
4. **¿Qué pasa si dejo de pagar?** La póliza puede seguir con el valor acumulado mientras cubra los cargos. Si no alcanza, puede requerir aportes o caducar.
5. **¿Es libre de impuestos?** El beneficio por fallecimiento generalmente se excluye del impuesto federal sobre la renta. En pólizas no-MEC bien administradas, ciertos préstamos y retiros pueden evitar impuesto corriente. Consulta a un profesional fiscal.
6. **¿Qué es una MEC?** Una póliza que supera el límite del 7-pay test. Pierde parte de sus ventajas fiscales en las distribuciones. Por eso diseñamos por debajo de ese límite.
7. **¿Quién califica?** La aseguradora evalúa la edad, la salud, la nicotina, el historial médico, la ocupación, las finanzas, la residencia y el monto. Puede aprobar, recargar, posponer o declinar.
8. **¿IUL o Whole Life?** El IUL ofrece flexibilidad y potencial ligado a un índice; el Whole Life ofrece más garantías y prima fija. [Ver Banca Mía™ →](/banca-mia)
9. **¿La consulta tiene costo?** No. Son 45 minutos sin costo ni compromiso.
10. **¿Atienden en todo EE.UU.?** Solo en los estados donde tenemos licencia vigente: [lista].

### 14. CTA final

**H2:** "La pregunta correcta no es cuánto puedes ganar, sino si tu póliza puede mantenerse vigente en escenarios conservadores."
**Texto:** "Hablemos 45 minutos. Si un IUL no es para ti, te lo diremos."
**Botones:** `Hacer mi diagnóstico →` · `Descargar la guía "IUL de la A a la Z"` (modal con nombre + email + consentimiento de email)

### 15. Footer legal (completo, visible, fuente de al menos 12 px)

> **Sovereign Capital Solutions** · Brickell, Miami, FL · (305) 587-4200 · [email]
> [Nombre del agente], agente de seguros de vida licenciado. NPN [XXXX]. Licencias: FL #[XXXX], TX #[XXXX]…
> Los productos de seguro de vida son emitidos por aseguradoras autorizadas y están sujetos a la aprobación de la suscripción (underwriting), a la disponibilidad por estado y a los términos del contrato. Un IUL es un seguro de vida universal indexado; no es una inversión en valores ni una cuenta bursátil. Las tasas de interés acreditadas, los caps, las tasas de participación y los cargos pueden cambiar según el contrato. Las ilustraciones son proyecciones no garantizadas. Los préstamos y retiros reducen el valor en efectivo y el beneficio por fallecimiento, y pueden generar consecuencias fiscales. Este contenido es educativo y no sustituye la póliza, una ilustración oficial ni asesoría legal, fiscal o financiera. Consulte a un profesional fiscal.
> [Política de Privacidad] · [Términos] · [Aviso de consentimiento de comunicaciones] · © 2026

---

## 4. Guía de diseño (UI)

| Elemento | Especificación |
|---|---|
| Estilo | Premium sobrio (banca privada), mucho espacio en blanco, fotografía real. Sin stock de dinero, fajos de billetes, autos de lujo ni gráficos de subidas exponenciales |
| Paleta (adaptar a la marca actual) | Azul marino `#0B1F3A` (primario) · Dorado apagado `#B8955A` (acentos y CTA secundario) · Marfil `#F7F4EE` (fondos) · Gris texto `#2B2F36` · Verde confianza `#2F7D5B` (checks) · Ámbar `#B7791F` (advertencias). CTA primario: dorado sobre marino o marino sobre marfil, con contraste AA |
| Tipografía | Titulares: *Playfair Display* o *Cormorant Garamond* (600). Cuerpo: *Inter* o *Source Sans 3* (400/500), 17–18 px en móvil |
| Modo oscuro | No es necesario en la landing (fondo claro fijo con tokens definidos) |
| Grid | Máx. 1140 px; en móvil, padding lateral de 16 px |
| Botones | Altura ≥ 52 px, radio de 10 px, texto en verbo + beneficio, flecha → |
| Íconos | Lucide o Phosphor lineales, 1.5 px |
| Diagramas | SVG inline (flujo de 4 pasos, cap/floor), animaciones suaves al hacer scroll (respetar `prefers-reduced-motion`) |
| Fotos | Asesor real, oficina de Brickell, familias latinas diversas (licencia de uso verificada) |
| Accesibilidad | WCAG 2.1 AA: labels en inputs, foco visible, contraste ≥ 4.5:1, video con subtítulos |
| Móvil primero | Más del 85% del tráfico de Meta llega por móvil: diseñar a 390 px primero; CTA sticky; quiz a pantalla completa |

---

## 5. Especificación técnica

### 5.1 Build

- **Framework:** Angular 18+ con SSR/prerender (`@angular/ssr`) o Astro (página estática + islas para el quiz y el simulador). Debe renderizar el HTML completo sin JS para SEO y velocidad.
- **Hosting:** Coolify (contenedor Nginx) detrás de Cloudflare (caché, HTTP/3, compresión Brotli).
- **Imágenes:** AVIF/WebP, `srcset`, lazy-load (excepto el póster del hero), dimensiones explícitas.
- **Fuentes:** `font-display: swap`, subset latino, preload solo del titular.
- **Video:** Vimeo/Wistia con facade (cargar el iframe al hacer clic); póster AVIF.
- **Scripts de terceros:** Pixel/GA4 con carga diferida y consentimiento; nada que bloquee el render.

### 5.2 Backend de leads (NestJS)

```
POST /api/leads/iul
Body: {
  answers: { objetivo, edad, estado, aporte, fondoEmergencia, horizonte, seguroActual },
  contact: { nombre, email, telefono, pais },
  consent: { accepted: true, text: "<texto exacto>", version: "2026-09" },
  tracking: { utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, fbp, fbc, landingVariant },
  meta: { userAgent, ip (del servidor), timestamp, pageUrl }
}
```

Flujo del endpoint:

1. Validación (class-validator): email RFC, teléfono E.164 (libphonenumber), consentimiento en `true`
2. Honeypot + rate limit (IP) + Cloudflare Turnstile invisible
3. Calcular `califica` y `score` en el servidor (no confiar en el cliente)
4. Guardar en MongoDB: colección `leads` + subdocumento `consentLog` inmutable (texto, versión, IP, timestamp)
5. Enviar al CRM (webhook) con etiquetas `producto:IUL`, `califica:true/false`, `score:n`, `utm_*`
6. Disparar Meta Conversions API (server-side) con `event_id` compartido con el píxel (deduplicación):
   - `Lead` (siempre)
   - `LeadCalificado` (custom, si califica), con `value = score`
7. Disparar WhatsApp de bienvenida (plantilla aprobada) desde el CRM en menos de 60 s
8. Responder `{ result: "A" | "B" | "C", bookingUrl }`

### 5.3 Eventos de medición

| Evento | Dónde | Píxel | CAPI | GA4 |
|---|---|---|---|---|
| `PageView` | Carga | ✓ | ✓ | `page_view` |
| `ViewContent` | 50% de scroll | ✓ | — | `scroll_50` |
| `QuizStart` (custom) | Paso 1 respondido | ✓ | — | `quiz_start` |
| `QuizStep` (custom, param `step`) | Cada paso | — | — | `quiz_step` |
| `Lead` | Envío del paso 8 | ✓ | ✓ | `generate_lead` |
| `LeadCalificado` (custom) | Resultado A | ✓ | ✓ | `qualified_lead` |
| `Schedule` | Webhook de agenda confirmada | — | ✓ | `book_appointment` |
| `SimuladorUso` (custom) | Mover el slider | ✓ | — | `simulator_use` |
| `DescargaGuia` (custom) | Envío del modal | ✓ | ✓ | `download_guide` |
| `CitaAsistida` / `PolizaEmitida` | CRM (offline) | — | ✓ | — |

Parámetros de usuario para CAPI: `em`, `ph`, `fn`, `st`, `country` hasheados con SHA-256, `fbp`, `fbc`, `client_ip_address`, `client_user_agent`.

### 5.4 SEO / AEO

- `<title>`: "IUL en español: qué es, cómo funciona y si es para ti | Sovereign Capital Solutions"
- `meta description`: "Guía honesta del seguro de vida IUL: cap, floor, participación, cargos, préstamos e impuestos. Haz el diagnóstico de 2 minutos con un asesor licenciado en español."
- H1 único; H2 por sección; `lang="es-US"`
- Schema: `FAQPage`, `InsuranceAgency` (nombre, dirección, teléfono), `Person` (asesor) con `knowsAbout`
- Open Graph con imagen de 1200×630 (asesor + titular)
- `noindex` en las variantes A/B y en las páginas de resultado/gracias; `canonical` a `/iul`
- Enlace interno a la Academia (artículos de IUL) y a `/banca-mia`

---

## 6. Página de gracias (`/iul/gracias`) — después de agendar

- H1: "¡Listo, {nombre}! Tu consulta está agendada para el {fecha} a las {hora} ({zona})."
- Video del asesor de 45 s: "Qué va a pasar en nuestra reunión y cómo prepararte"
- Checklist para preparar: 1) coberturas actuales (póliza del trabajo, term), 2) idea de tu presupuesto mensual, 3) metas a 10–20 años, 4) invitar a tu pareja
- Botones: "Agregar a Google Calendar / Outlook / iCal" · "Guardar nuestro WhatsApp"
- Descarga de la guía "IUL de la A a la Z"
- Evento `Schedule` (si no llegó ya por webhook)

---

## 7. Plan de pruebas A/B (en orden)

| # | Hipótesis | Variable | Métrica | Duración mínima |
|---|---|---|---|---|
| 1 | Un titular de "sin mitos" genera más confianza que uno de beneficio | H1 A vs C | Visita → lead calificado | 300 leads o 3 semanas |
| 2 | Un video del asesor en el hero sube la conversión frente a una foto | Hero video vs foto | Visita → lead | 2 semanas |
| 3 | 5 preguntas convierten más que 7 sin bajar la calidad | Quiz corto vs largo | Lead calificado → cita asistida | 3 semanas |
| 4 | Mostrar el calendario directamente frente a una llamada de un setter | Calendario vs "te llamamos" | Cita asistida / lead | 3 semanas |
| 5 | La sección "NO es para ti" arriba del quiz sube la calidad | Posición de la sección | Show rate + cierre | 4 semanas |

Herramienta: split por URL con asignación en el edge (Cloudflare Worker) o flag de Angular + `landingVariant` en el lead.

---

## 8. Checklist de publicación

**Contenido y compliance**

- [ ] Nombre del agente, NPN y números de licencia por estado reales
- [ ] Lista de estados del select = estados con licencia vigente
- [ ] Copy revisado y aprobado por compliance (IMO/aseguradora); guardar la versión aprobada y la fecha
- [ ] Ninguna cifra de rendimiento esperado; ejemplos marcados como "ilustrativos"
- [ ] Palabras "inversión / ahorro / retiro" siempre junto a "seguro de vida"
- [ ] Testimonios con autorización (u ocultar la sección)
- [ ] Política de privacidad, términos y aviso TCPA publicados y enlazados

**Técnico**

- [ ] Píxel + CAPI con deduplicación (`event_id`) verificada en Events Manager (Test Events)
- [ ] Dominio verificado en Meta Business
- [ ] Webhook de agenda → CRM → CAPI `Schedule` probado
- [ ] WhatsApp de bienvenida con plantilla aprobada, llega en menos de 60 s
- [ ] Log de consentimiento guardado e inmutable
- [ ] Lighthouse móvil ≥ 90; formulario probado en iOS Safari y Android Chrome
- [ ] UTMs capturados y persistidos (cookie de 30 días) hasta el envío
- [ ] Turnstile + honeypot + rate limit activos
- [ ] Páginas 404 y de error amigables; redirecciones de variantes

---

## 9. Prompt sugerido para construirla con Claude Code

> Construye en Angular 18 (standalone components, SSR con prerender) la landing `/iul` según el archivo `02_Landing_IUL.md`. Requisitos: secciones en el orden indicado; quiz de varios pasos (una pregunta por pantalla, barra de progreso, validación, lógica de calificación replicada en el backend); simulador de cap/floor/participación con signals; CTA sticky en móvil; tokens CSS de la paleta; tipografías Playfair Display + Inter; accesibilidad AA. Backend NestJS: `POST /api/leads/iul` con DTOs y class-validator, Turnstile, guardado en MongoDB (`leads`, `consentLog`), webhook al CRM y Meta Conversions API con `event_id` deduplicado. Incluye tests unitarios de la función `qualify()` y un Dockerfile para Coolify.
