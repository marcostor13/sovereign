# Landing Page — Banca Mía™ con Whole Life (Sovereign Capital Solutions)

Especificación completa para diseñar, redactar, construir y medir la landing del embudo Whole Life participante + IBC.

---

## 1. Ficha de la landing

| Campo | Valor |
|---|---|
| URL | `https://sovereigncapitalsolutions.com/banca-mia` · Masterclass: `/banca-mia/masterclass` · Aplicación: `/banca-mia/diagnostico` · Gracias: `/banca-mia/gracias` |
| Objetivo principal | Registro a la **masterclass gratuita** *"Liquidez para empresarios: cómo funciona realmente la Banca Infinita (y cuándo NO usarla)"* |
| Objetivo secundario | Aplicar directamente al **Diagnóstico de Capital Banca Mía™** (45–60 min, sin costo) |
| Tráfico | Meta Ads (IG Reels, FB Feed), retargeting de video, WhatsApp, Academia, orgánico |
| Idioma | Español neutro; términos técnicos en inglés entre paréntesis (PUA, cash value, MEC) |
| Avatar | Empresario latino de 35–60 años (construcción, transporte, restaurantes, servicios, real estate), con excedente estable; también mujer empresaria y familias de alto ingreso |
| Promesa central | Entender con claridad y sin mitos cómo un seguro de vida Whole Life puede funcionar como una reserva de capital contractual, y saber si encaja con tu negocio |
| Tono | Mentor financiero serio; lenguaje de negocio (flujo de caja, capital, costo de oportunidad). Anti-hype explícito |
| Metas | ≥20% visita → registro (frío) · ≥35% de registrados ven 50% o más · ≥15% de quienes ven → aplican |

> **Regla de oro de esta landing:** cada vez que aparezca "Banca Mía™" o "Banca Infinita" debe acompañarse, en el mismo bloque visual, de *"estrategia con seguro de vida Whole Life"*, y la página debe decir claramente que **no es un banco ni una cuenta bancaria**.

---

## 2. Arquitectura del embudo en páginas

```
/banca-mia  (landing de registro)
   │  formulario corto: nombre, email, WhatsApp, ¿tienes negocio?, estado, interés + consentimiento
   ▼
/banca-mia/masterclass  (acceso inmediato, video evergreen 35–40 min)
   │  CTA "Aplicar al Diagnóstico" aparece en el minuto 20 (sticky)
   ▼
/banca-mia/diagnostico  (aplicación de 10 preguntas + calendario si califica)
   ▼
/banca-mia/gracias  (confirmación + preparación + invitar a cónyuge/contador)
```

Atajo: en `/banca-mia` hay un CTA secundario **"Ya conozco el concepto → Aplicar al diagnóstico"** que lleva directo a `/banca-mia/diagnostico` (para tráfico caliente y retargeting).

---

## 3. LANDING `/banca-mia` — secciones y copy

### Orden de secciones

```
0. Barra superior mínima (logo + teléfono)
1. HERO + formulario de registro (above the fold en desktop; en móvil, CTA → formulario)
2. Barra de confianza
3. El problema del empresario
4. Qué es (y qué NO es) la Banca Mía™ — definición en 20 segundos
5. Cómo se construye la póliza (4 bloques)
6. El ciclo del capital (diagrama)
7. Mitos vs realidad
8. Qué aprenderás en la masterclass
9. ¿Es para ti? / NO es para ti
10. Quién te enseña
11. Testimonios (si existen)
12. Registro (repetición del formulario)
13. Preguntas frecuentes
14. Footer legal
```

### 0. Barra superior

Logo + `(305) 587-4200` + botón "Ver masterclass". Sin menú.

### 1. HERO

**Etiqueta:** `MASTERCLASS GRATUITA PARA EMPRESARIOS · EN ESPAÑOL`

**Titular (H1), variantes para test:**

- A: **"Banca Mía™: cómo algunos empresarios crean su propia reserva de capital con un seguro de vida Whole Life."**
- B: **"La Banca Infinita no es un banco, no es dinero infinito y no es gratis. Entonces, ¿por qué la usan tantos empresarios?"**
- C: **"Deja de ver tu capital atado. Entiende cómo funciona una reserva de liquidez contractual para tu negocio."**

**Subtítulo:**
"En 38 minutos te explicamos, sin mitos, cómo funciona una póliza Whole Life participante diseñada para acumular valor en efectivo, cómo se usan los préstamos sobre la póliza, qué cuesta y en qué casos NO conviene."

**Bullets:**

- Base, adiciones pagadas (PUA), dividendos y préstamos, explicados con diagramas
- Los 5 errores que hacen fracasar una estrategia de Banca Infinita
- La tabla honesta de quién sí y quién no debería usarla

**Formulario de registro (tarjeta a la derecha en desktop, debajo del hero en móvil):**

| Campo | Tipo | Requerido |
|---|---|---|
| Nombre | Texto | Sí |
| Email | Email | Sí |
| WhatsApp | Teléfono con país (+1 por defecto) | Sí |
| ¿Tienes negocio propio o eres independiente? | Botones: Sí, tengo negocio · Soy independiente/1099 · No, soy empleado | Sí |
| Estado de residencia | Select con búsqueda (estados con licencia + "Otro") | Sí |
| ¿Qué te interesa más? | Botones: Liquidez para mi negocio · Legado familiar · Alternativa conservadora · Solo aprender | Sí |
| Consentimiento TCPA | Casilla NO premarcada (texto en la sección 7) | Sí |

**Botón:** `Ver la masterclass ahora →`
**Microtexto:** "Acceso inmediato · Gratis · Sin tarjeta · Tus datos son confidenciales"

**Visual (lado izquierdo o fondo):** foto real del asesor en la oficina de Brickell frente a una pizarra con el diagrama "prima → valor en efectivo → préstamo → repago". Sello: "Material educativo revisado el [fecha]".

### 2. Barra de confianza

Agente licenciado · Lic. #[XXXX] · Brickell, Miami · 100% en español · Educación antes que venta

### 3. El problema del empresario

**H2:** "Tu negocio genera dinero. Pero, ¿quién controla tu capital?"

Tarjetas (4):

1. **Cada compra grande pasa por el banco.** Camiones, equipo, inventario: aplicaciones, tasas y condiciones que no controlas.
2. **Flujo de caja irregular.** Meses buenos y meses difíciles, sin una reserva estructurada.
3. **El dinero "parado" pierde valor.** La cuenta de ahorro rinde poco y la bolsa te quita el sueño.
4. **¿Y si te pasa algo?** Tu familia y tu negocio dependen de ti.

Cierre: "Existe una estrategia que muchos empresarios usan para planear su liquidez. Tiene ventajas reales y también costos y riesgos reales. Te explicamos ambos."

### 4. Qué es y qué NO es

**H2:** "Banca Mía™ en 20 segundos"

"**Banca Mía™** es nuestra metodología de administración de capital basada en la **Banca Infinita (Infinite Banking Concept, IBC)**. Usa un **seguro de vida permanente Whole Life participante**: tiene prima contractual, beneficio por fallecimiento y valor en efectivo garantizados si se cumplen las condiciones de la póliza. Puede recibir dividendos, pero **no están garantizados**."

Caja destacada (borde dorado):
> **Lo que NO es:** no es un banco, no es una cuenta bancaria, no es una inversión en el mercado y no es un producto que legalmente se llame "Banca Infinita". Es una forma de administrar un seguro de vida.

### 5. Cómo se construye la póliza (4 bloques con ícono)

**H2:** "Las 4 piezas de una póliza diseñada para liquidez"

| Prima base | PUA y dividendos | Valor de rescate | Préstamo |
|---|---|---|---|
| Sostiene las garantías y la cobertura; incluye costos y compensación. | Las adiciones pagadas (PUA) compran seguro adicional y aumentan los valores. Los dividendos pueden comprar más PUA, pero no están garantizados. | El efectivo disponible si cancelas, neto de deuda. **Puede ser bajo en los primeros años.** | La aseguradora te presta usando la póliza como garantía. **Cobra interés.** |

Nota: "No existe una proporción universal base/PUA. Depende de tu edad, salud, aseguradora, necesidad de cobertura y flujo sostenible, y siempre debe quedar por debajo del límite MEC."

### 6. El ciclo del capital (diagrama SVG circular)

**H2:** "Cómo se usa en la práctica"

Pasos del ciclo:

1. **Capitalizas:** pagas prima base + PUA de forma disciplinada
2. **Acumulas:** crece el valor en efectivo garantizado (y los dividendos, si se pagan)
3. **Accedes:** pides un préstamo a la aseguradora con la póliza como garantía para una compra planificada
4. **Repagas:** con un plan explícito de pago de capital e intereses a la aseguradora
5. **Revisas:** ilustración in-force anual, límite MEC, beneficiarios

Leyenda bajo el diagrama: "Mientras existe un préstamo, la póliza sigue funcionando según sus reglas. El interés no pagado se capitaliza. La deuda reduce el beneficio por fallecimiento y, si consume el valor disponible, puede provocar la caducidad de la póliza y consecuencias fiscales."

### 7. Mitos vs realidad

**H2:** "Lo que te han contado vs lo que dice el contrato"

| Mito | Realidad |
|---|---|
| "Te conviertes en tu propio banco." | Pides prestado a la aseguradora con tu póliza como garantía. No es un banco. |
| "Te pagas intereses a ti mismo." | El interés se paga a la aseguradora. Los aportes adicionales pueden aumentar los valores, pero no son el pago del interés. |
| "Es dinero infinito." | El acceso está limitado por el valor en efectivo disponible y la deuda existente. |
| "La tasa de dividendos es tu rendimiento." | La tasa anunciada no es tu rendimiento neto. Compara la TIR (IRR) del valor de rescate en los años 1, 5, 10 y 20. |
| "Desde el año 1 tienes todo tu dinero disponible." | El valor de rescate puede ser bajo al inicio. Cancelar temprano puede ser costoso. |
| "Es libre de impuestos siempre." | En una póliza no-MEC bien administrada, ciertos préstamos pueden evitar impuesto corriente. Si se convierte en MEC o caduca con deuda, puede haber impuestos y penalidades. |

### 8. Qué aprenderás en la masterclass

**H2:** "En la masterclass verás"

1. **Minuto 3:** por qué el capital atado es el gran problema del empresario
2. **Minuto 8:** la anatomía de una póliza Whole Life diseñada para liquidez
3. **Minuto 18:** los 4 mitos que más dinero le cuestan a la gente
4. **Minuto 23:** la tabla honesta de quién sí y quién no
5. **Minuto 28:** un caso ilustrativo de un empresario en Florida, año por año
6. **Minuto 33:** las 8 pruebas que debes exigir antes de comprar

**CTA:** `Quiero ver la masterclass →` (scroll al formulario)

### 9. ¿Es para ti?

**H2:** "Esta estrategia no es para todos. Y está bien."

**Puede ser una buena herramienta si:**

- Tienes una necesidad real de seguro permanente
- Tienes ingreso y excedente estables, fondo de emergencia y deuda cara bajo control
- Tu horizonte es de 10–15 años o más
- Prefieres garantías, disciplina y menor volatilidad
- Eres empresario o tienes una familia que planea compras, reservas o legado
- Estás dispuesto a revisar y ajustar el plan cada año

**No suele ser adecuada si:**

- Solo necesitas cobertura temporal al menor costo
- Necesitas liquidez total o ganancias rápidas en los primeros años
- Tu ingreso es inestable o no puedes sostener la prima base
- Buscas el mayor rendimiento de mercado
- Tu salud o edad hacen que el diseño sea poco eficiente
- Esperas préstamos gratis, "dinero infinito" o una ventaja fiscal automática

Microcopy: "¿Te interesa más el potencial de crecimiento que las garantías? Mira nuestra explicación del [IUL →](/iul)."

### 10. Quién te enseña

- Foto + nombre + "Agente de seguros de vida licenciado en FL, TX, …" + NPN
- Bio orientada al empresario: experiencia con dueños de negocio, enfoque en flujo de caja
- Cita: *"La estrategia se administra: no funciona en piloto automático."*
- Enlace para verificar la licencia

### 11. Testimonios

Solo si existen: empresarios hablando de claridad, disciplina y acompañamiento. **Sin cifras de dividendos, rendimientos ni montos de préstamos.** Con autorización escrita.

### 12. Registro (repetición)

**H2:** "Mira la masterclass gratis, hoy"
Mismo formulario de la sección 1 (componente reutilizado) + "Acceso inmediato".

### 13. Preguntas frecuentes (schema FAQPage)

1. **¿La Banca Mía™ es un banco o una cuenta?** No. Es una metodología de administración de capital que usa un seguro de vida Whole Life participante.
2. **¿Qué es garantizado y qué no?** El valor en efectivo garantizado sigue el calendario contractual si se pagan las primas. Los dividendos no están garantizados y pueden subir, bajar o ser cero.
3. **¿Cuánto tarda en ser eficiente?** No hay un año universal. Depende del diseño, la edad y el carrier. Por eso revisamos la TIR del valor de rescate año por año.
4. **¿Cómo funcionan los préstamos?** La aseguradora presta usando la póliza como garantía y cobra interés (fijo o variable según el contrato). El interés no pagado se capitaliza y la deuda reduce el beneficio por fallecimiento.
5. **¿Qué es una MEC y por qué importa?** Si la póliza supera el 7-pay test, se convierte en MEC: las distribuciones tributan primero como ganancia y puede aplicar una penalidad del 10% antes de los 59½ años. Diseñamos con margen bajo ese límite.
6. **¿Las primas son deducibles para mi negocio?** Las primas personales normalmente no son deducibles. Consulta tu caso con tu contador; lo invitamos a la reunión si quieres.
7. **¿Qué pasa si un año no puedo pagar las PUA?** Parte de la prima es obligatoria (base) y parte flexible (PUA). Lo diseñamos para que la base sea sostenible.
8. **¿Whole Life o IUL?** Whole Life: prima fija y más garantías. IUL: más flexibilidad y potencial ligado a un índice, con cargos variables. [Ver IUL →](/iul)
9. **¿Quién califica?** La aseguradora evalúa la edad, la salud, la nicotina, el historial médico, la ocupación, las finanzas, la residencia y el monto. Puede aprobar, recargar, posponer o declinar.
10. **¿La consulta tiene costo?** No. El Diagnóstico de Capital es sin costo ni compromiso.

### 14. Footer legal

> **Sovereign Capital Solutions** · Brickell, Miami, FL · (305) 587-4200 · [email]
> [Nombre del agente], agente de seguros de vida licenciado. NPN [XXXX]. Licencias: FL #[XXXX]…
> Banca Mía™ es una metodología educativa y de planificación de Sovereign Capital Solutions basada en seguros de vida Whole Life participantes. No es un banco, una cuenta bancaria ni un producto de inversión. Los productos son emitidos por aseguradoras autorizadas y están sujetos a suscripción (underwriting), disponibilidad por estado y términos del contrato. Los dividendos no están garantizados. Los préstamos sobre la póliza generan interés, reducen el valor en efectivo y el beneficio por fallecimiento, y pueden provocar la caducidad de la póliza y consecuencias fiscales. Cancelar en los primeros años puede generar pérdidas. Las primas personales normalmente no son deducibles. Contenido educativo; no sustituye la póliza, una ilustración oficial ni asesoría legal, fiscal o financiera. Consulte a un profesional fiscal.
> [Política de Privacidad] · [Términos] · [Aviso de consentimiento de comunicaciones] · © 2026

---

## 4. PÁGINA `/banca-mia/masterclass`

| Bloque | Especificación |
|---|---|
| Encabezado | "Bienvenido, {nombre}. Tu masterclass está lista." + duración (38 min) |
| Video | Player de Vimeo/Wistia de 16:9, controles, subtítulos en español, capítulos marcados (minutos de la sección 8); guardar el progreso (retomar donde lo dejó) |
| Capítulos clicables | Lista lateral (desktop) o debajo (móvil) |
| CTA diferido | A partir del **minuto 20**, aparece una barra sticky: "¿Crees que esto puede encajar con tu negocio? **Aplicar al Diagnóstico de Capital →**" |
| Descargas | Guía PDF "Whole Life para Banca Infinita de la A a la Z" + "Checklist: 8 pruebas antes de comprar" |
| Calculadora | Embebido o enlace a la **Calculadora de costo de oportunidad** existente |
| Preguntas en vivo | "Sesión de preguntas en vivo: último jueves de cada mes · Reservar lugar" |
| Legal | Texto legal debajo del video + disclaimer en pantalla al inicio y al final del video |
| Eventos | `VideoPlay`, `Video25`, `Video50`, `Video75`, `Video95` (vía API del player) → píxel + CAPI (50 y 95) + etiqueta en el CRM |

**Automatización por progreso del video:**

- Vio 50% o más y no aplicó en 2 h → WhatsApp: "Vi que llegaste a la parte de los mitos. ¿Qué te pareció? Si quieres, revisamos tu caso."
- Vio menos del 25% → WhatsApp a las 24 h: "¿Pudiste verla? Te dejo el minuto 18, que es el más importante: {link#t=1080}"
- Vio 95% → tarea en el CRM para que el setter llame en menos de 1 h (horario laboral)

---

## 5. PÁGINA `/banca-mia/diagnostico` (aplicación)

**H1:** "Diagnóstico de Capital Banca Mía™"
**Subtítulo:** "Responde 10 preguntas (3 minutos). Si vemos que la estrategia puede encajar, eliges el horario de tu consulta privada de 45–60 minutos. Si no, te lo diremos y te recomendaremos una alternativa."

**UX:** varios pasos, una o dos preguntas por pantalla, barra de progreso, datos precargados si ya se registró (por token en la URL o cookie).

| # | Pregunta | Opciones |
|---|---|---|
| 1 | ¿A qué se dedica tu negocio y cuántos años lleva operando? | Texto corto + botones: menos de 2 · 2–5 · más de 5 años |
| 2 | Ingresos anuales aproximados (negocio u hogar) | Menos de US$100k · 100–250k · 250k–1M · Más de 1M |
| 3 | Excedente mensual que podrías destinar de forma sostenible | Menos de US$500 · 500–1,500 · 1,500–5,000 · Más de 5,000 |
| 4 | ¿Tienes fondo de emergencia y la deuda de alto interés bajo control? | Sí · Parcialmente · No |
| 5 | ¿Para qué usarías la liquidez? (varias opciones) | Inventario o equipo · Vehículos · Bienes raíces · Educación de hijos · Reserva de emergencia del negocio · Legado |
| 6 | Horizonte de la estrategia | Menos de 10 años · 10–15 años · Más de 15 años |
| 7 | ¿Qué valoras más? | Garantías y estabilidad · Máximo potencial de crecimiento · Un balance |
| 8 | Rango de edad | 18–30 · 31–45 · 46–55 · 56–65 · 66+ |
| 9 | ¿Trabajas con un contador? | Sí · No |
| 10 | Confirmar nombre, email, WhatsApp y estado + consentimiento (si no se registró antes) | — |

**Lógica:**

```
califica = excedente >= "500–1,500"
        && horizonte != "<10"
        && fondo_emergencia ∈ ["Sí", "Parcialmente"]
        && estado ∈ ESTADOS_LICENCIA
        && edad <= 65          // ajustar según el carrier

score = {excedente: <500:0, 500–1.5k:1, 1.5k–5k:3, >5k:4}
      + (horizonte == ">15" ? 2 : 1)
      + (ingresos >= "250k–1M" ? 2 : 0)
      + (anios_negocio == ">5" ? 1 : 0)
      + (valora == "Garantías" ? 1 : 0)

if valora == "Máximo potencial" && califica:
    → Resultado D: "Por tu perfil, conviene comparar IUL y Whole Life" + calendario (etiqueta producto:IUL+WL)
elif califica:
    → Resultado A: calendario + evento LeadCalificado (value = score)
      si score >= 7 → asignar al asesor senior + prioridad "alta"
elif estado ∉ ESTADOS_LICENCIA:
    → Resultado C: lista de espera
else:
    → Resultado B: "Primero la base" + recursos + opción de hablar igual
```

**Resultado A:**

- H3: "{nombre}, tu perfil tiene los elementos que buscamos para diseñar una estrategia Banca Mía™."
- "Elige el horario de tu Diagnóstico de Capital. Te recomendamos invitar a tu pareja o a tu contador."
- Calendario embebido con preguntas extra: "¿Quién más asistirá?" (Solo yo · Mi pareja · Mi contador · Mi socio)

**Resultado B:**

- H3: "Gracias por tu honestidad, {nombre}."
- "Hoy esta estrategia probablemente no sea tu mejor paso. Una póliza Whole Life necesita un excedente sostenible y un horizonte largo. Te recomendamos primero fortalecer tu fondo de emergencia y reducir la deuda cara. Te enviamos la guía y te invitamos a nuestras sesiones gratuitas de preguntas."
- Botones: `Descargar guía` · `Quiero hablar con un asesor igualmente`

---

## 6. PÁGINA `/banca-mia/gracias`

- H1: "Tu Diagnóstico de Capital está confirmado: {fecha}, {hora} ({zona})"
- Video del asesor (60 s): qué pasará en la reunión
- **Cómo prepararte (checklist):**
  1. Estimado de ingresos y gastos mensuales del negocio (no hace falta enviar documentos)
  2. Lista de compras grandes previstas a 5 años y cómo las financias hoy (tasa y plazo)
  3. Seguros de vida actuales (personales y del negocio)
  4. Preguntas para tu contador
  5. Invita a tu pareja, socio o contador (botón "Reenviar invitación")
- Botones: Añadir al calendario · Guardar WhatsApp · Descargar "8 pruebas antes de comprar"
- Evento `Schedule` (CAPI por webhook)

---

## 7. Texto de consentimiento (usar en todos los formularios)

> ☐ Acepto que Sovereign Capital Solutions me contacte por llamada, SMS, WhatsApp y email, incluso mediante sistemas automatizados, al número y correo proporcionados, para enviarme la masterclass, información sobre estrategias con seguros de vida y la coordinación de mi consulta. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. Puedo cancelar en cualquier momento respondiendo STOP. He leído la [Política de Privacidad] y los [Términos].

---

## 8. Guía de diseño (UI)

| Elemento | Especificación |
|---|---|
| Concepto visual | "Oficina privada de un family office latino": maderas, papel, pizarra, gráficos limpios. Diferente del IUL: tonos más cálidos y un lenguaje de negocio |
| Paleta (alinear con la marca) | Verde bosque profundo `#10302A` (primario) · Dorado `#B8955A` (CTA y acentos) · Marfil `#F7F4EE` (fondo) · Carbón `#23262B` (texto) · Arena `#E8DFD0` (tarjetas) · Ámbar `#B7791F` (advertencias). Si la marca exige azul marino, usar `#0B1F3A` como primario y reservar el verde para el ciclo del capital |
| Tipografía | Titulares: *Cormorant Garamond* 600 / *Playfair Display*; cuerpo: *Inter* 17–18 px |
| Diagramas | SVG inline: 4 bloques de la póliza, ciclo del capital circular (5 nodos) con flechas animadas al hacer scroll, tabla de mitos con íconos ✕/✓ en SVG |
| Fotos | Asesor real; empresarios latinos en contextos de trabajo (taller, obra, restaurante, oficina); sin dinero en efectivo ni lujo |
| Formulario | Tarjeta blanca con sombra suave, botones de opción grandes, validación inline, botón dorado de ancho completo |
| Móvil | Hero compacto (titular + 3 bullets + botón "Ver masterclass" → formulario); CTA sticky; video de la masterclass a ancho completo |
| Accesibilidad | WCAG 2.1 AA, subtítulos, `prefers-reduced-motion` para las animaciones del ciclo |

---

## 9. Especificación técnica

### 9.1 Build y hosting

- Angular 18+ SSR/prerender o Astro; componentes compartidos con `/iul` (formulario de varios pasos, consentimiento, footer legal, tracking).
- Coolify + Cloudflare; imágenes AVIF/WebP; facade para el video del hero.
- Player de la masterclass: Vimeo Player SDK o Wistia `_wq` para eventos de progreso.

### 9.2 Endpoints NestJS

```
POST /api/leads/banca-mia/registro
  → guarda el lead (stage: "registrado"), consentLog, CAPI Lead, CRM tag producto:WL, WhatsApp con enlace a la masterclass
  → devuelve un token firmado (JWT de 30 días) para precargar datos y dar acceso a /masterclass

POST /api/leads/banca-mia/video-progress   { token, percent }
  → actualiza progress en MongoDB; al 50% y 95% → CAPI custom + tarea/etiqueta en el CRM (idempotente)

POST /api/leads/banca-mia/diagnostico
  → valida, calcula califica/score en el servidor, actualiza el lead, CAPI LeadCalificado, CRM stage "aplicó"
  → devuelve { result: "A"|"B"|"C"|"D", bookingUrl }

POST /api/webhooks/booking   (Cal.com/CRM)
  → stage "cita_agendada", CAPI Schedule, recordatorios
```

**Modelo MongoDB (`leads`):** `_id, producto: "WL", nombre, email, telefono, estado, negocio, interes, answers{}, califica, score, videoProgress, stage, utm{}, fbp, fbc, landingVariant, consentLog[{text, version, ip, ua, ts}], createdAt, updatedAt`. Índices: `email`, `telefono`, `stage + createdAt`.

### 9.3 Eventos de medición

| Evento | Disparo | Píxel | CAPI | GA4 |
|---|---|---|---|---|
| `PageView` | Todas las páginas | ✓ | ✓ | `page_view` |
| `Lead` | Registro a la masterclass | ✓ | ✓ | `generate_lead` |
| `VioMasterclass50` (custom) | 50% del video | ✓ | ✓ | `video_50` |
| `VioMasterclass95` (custom) | 95% del video | ✓ | ✓ | `video_complete` |
| `InicioDiagnostico` (custom) | Paso 1 de la aplicación | ✓ | — | `application_start` |
| `LeadCalificado` (custom) | Resultado A o D | ✓ | ✓ | `qualified_lead` |
| `Schedule` | Webhook de agenda | — | ✓ | `book_appointment` |
| `UsoCalculadora` (custom) | Interacción con la calculadora | ✓ | — | `calculator_use` |
| `CitaAsistida`, `PolizaEmitida` | CRM (offline) | — | ✓ | — |

**Optimización en Meta:** empezar optimizando por `Lead` (volumen para salir del aprendizaje), pasar a `VioMasterclass50` cuando supere ~50 por semana y a `LeadCalificado` cuando supere ~50 por semana.

### 9.4 SEO / AEO

- `<title>`: "Banca Infinita en español: cómo funciona realmente con Whole Life | Banca Mía™ · Sovereign Capital Solutions"
- `description`: "Masterclass gratuita para empresarios: cómo funciona una póliza Whole Life para liquidez, PUA, dividendos, préstamos, MEC, costos y quién NO debería usarla. Explicado sin mitos."
- Schema: `FAQPage`, `Course` o `VideoObject` (masterclass), `InsuranceAgency`, `Person`
- `/banca-mia` indexable; `/masterclass`, `/diagnostico` y `/gracias` en `noindex`
- Artículo pilar indexable en la Academia: "¿Qué es la Banca Infinita? Guía sin mitos", enlazado a esta landing (captura búsquedas orgánicas y de IA)

---

## 10. Plan de pruebas A/B

| # | Hipótesis | Variable | Métrica |
|---|---|---|---|
| 1 | El titular "anti-mito" (B) atrae empresarios más calificados | H1 A vs B | Registro → aplicación calificada |
| 2 | Masterclass frente a aplicación directa para tráfico frío | `/banca-mia` vs `/banca-mia/diagnostico` como destino del anuncio | Costo por cita asistida |
| 3 | CTA en el minuto 20 frente al final | Momento del CTA sticky | Tasa de aplicación |
| 4 | Pedir el excedente mensual en el registro sube la calidad | 3 vs 4 campos de calificación | Registro % y score promedio |
| 5 | Versión corta de la masterclass (18 min) | 38 vs 18 min | % que ve 50% o más + aplicación |

---

## 11. Checklist de publicación

**Compliance**

- [ ] "Banca Mía™ / Banca Infinita" siempre junto a "seguro de vida Whole Life" + "no es un banco"
- [ ] "Dividendos no garantizados" visible en el hero, en las piezas de la póliza, en las FAQ, en el video y en el footer
- [ ] Préstamos siempre con "generan interés" y "reducen el beneficio por fallecimiento"
- [ ] Sin tasas de dividendos, rendimientos ni ilustraciones reales de un carrier sin aprobación
- [ ] Caso ilustrativo marcado como "hipotético / ilustrativo"
- [ ] Licencias, NPN y estados reales; el select de estados coincide
- [ ] Masterclass y landing aprobadas por compliance (IMO/carrier) con la fecha guardada
- [ ] Marca "Banca Mía™": confirmar la búsqueda o registro de marca antes de pautar a gran escala

**Técnico**

- [ ] Token de acceso a la masterclass funciona en varios dispositivos
- [ ] Eventos de progreso del video llegan a CAPI con deduplicación
- [ ] Automatizaciones de WhatsApp por progreso probadas (50%, <25%, 95%)
- [ ] Webhook de la agenda → CRM → CAPI `Schedule`
- [ ] Consentimiento guardado e inmutable; STOP procesado en SMS/WA
- [ ] Lighthouse móvil ≥ 90 en `/banca-mia`; el video no bloquea el LCP
- [ ] Turnstile, honeypot y rate limit

---

## 12. Prompt sugerido para construirla con Claude Code

> Construye en Angular 18 (standalone, SSR/prerender) el embudo `/banca-mia` descrito en `03_Landing_Whole_Life_Banca_Mia.md`: landing de registro, página de masterclass con Vimeo Player SDK (progreso 25/50/75/95, capítulos, CTA sticky desde el minuto 20), aplicación de diagnóstico de varios pasos con la lógica de calificación replicada en el backend, y página de gracias. Reutiliza los componentes de `/iul` (formulario de varios pasos, consentimiento TCPA, footer legal, servicio de tracking con Pixel + CAPI y `event_id`). Backend NestJS con los endpoints de la sección 9.2, MongoDB con el modelo `leads` indicado, JWT para el acceso a la masterclass, webhooks al CRM y a Cal.com, e idempotencia en los eventos de video. Diagramas en SVG inline (4 bloques de la póliza y el ciclo del capital) con animación que respete `prefers-reduced-motion`. Incluye tests de `qualifyWholeLife()` y un Dockerfile para Coolify.
