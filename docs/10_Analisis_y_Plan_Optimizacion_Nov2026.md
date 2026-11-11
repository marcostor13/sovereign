# Análisis completo y plan de optimización — 11-11-2026

Cubre: campaña de Meta Ads, web (SEO, GEO e indexado), cuentas de Meta,
Instagram y LinkedIn, y campañas orgánicas. Datos revisados por API el 11 nov.

---

## 0. Resumen

| Área | Estado | Lo más urgente |
|---|---|---|
| Campaña Meta | Costo por resultado **bueno**, pero gastó **US$20 de ~US$78** previstos | Arreglar el cobro: la cuenta se pausó por falta de pago |
| Web — indexado | **Grave:** canónicas, sitemap y Open Graph apuntaban a `sovereign.marcostorresalarcon.com` | **Corregido en código.** Falta desplegar y limpiar Coolify/Cloudflare |
| Web — GEO (IA) | Cloudflare bloquea GPTBot, ClaudeBot, Google-Extended y Meta AI | Desbloquear en Cloudflare. `llms.txt` ya creado |
| Instagram | 25 posts, ~2 likes por post, sin publicar desde el 29 oct | Retomar con los 6 videos de la campaña + calendario |
| LinkedIn | Sin enlace en la web; no hay acceso por API | Optimizar perfil de Oswald + página de empresa |
| Cumplimiento | NPN y licencia FL vacíos en la web mientras hay anuncios activos | Cargar `agent.npn` y `licenses.FL.number` |

---

## 1. Campaña Meta Ads (Cuenta Sovereign `1881455182841285`)

### 1.1 Resultados del 8 al 11 nov

| Campaña | Presupuesto | Gastado | Resultado | Costo por resultado |
|---|---|---|---|---|
| A · Directo WhatsApp | US$17/día | US$12.49 | 3 conversaciones de WhatsApp | **US$4.16** (plan: US$10–25) |
| B · Landing IUL | US$9/día | US$7.84 | 41 visitas a `/iul`, CTR 6.3% | US$0.19 por visita (plan: US$1–2) |

Por anuncio (campaña A): N3 *Mejor tenerlo* 2 conversaciones a US$1.42; N5 *Revisamos
tu póliza* 1 a US$2.75; N2 *IUL es estafa* tiene el mejor CTR (4.1%) y la mejor
retención de video, pero aún 0 chats. A1 y N4 casi no recibieron entrega.
Campaña B: casi todo el gasto se fue a *Asesor* (US$7.07, CTR 6.4%).

**Veredicto:** los costos van mejor que el plan, pero con US$20 gastados no hay
datos suficientes para decidir nada. El problema real es de entrega.

### 1.2 Por qué gastó tan poco (causa encontrada)

Historial de la cuenta:

- La cuenta tiene un **umbral de cobro de US$2**: Meta intentó cobrar 7 veces el 8 nov.
- **8 nov 9:50 p. m.:** la cuenta pasó a *"En periodo de gracia"* (falló un cobro).
- **9 nov:** **US$0 de gasto** en las dos campañas (pausa por pago).
- **10 nov 11:57 a. m.:** se pagó y la cuenta volvió a *Activa*.
- 10 y 11 nov: entrega baja porque Meta reinicia el aprendizaje tras la pausa.

No hay errores de entrega en anuncios ni conjuntos (revisado por API).

### 1.3 Medición

- Píxel `30204422045824846`: solo llegan `PageView` y `ViewContent`. En 7 días no hubo
  ningún `Contact` (clic a WhatsApp desde la landing) ni `Lead`. Con 41 visitas se
  esperaban 1–3; todavía no es una alarma, pero hay que vigilarlo el 16 nov.
- No hay benchmark de la industria disponible para estos conjuntos (cohorte vacía).
- Opportunity Score de la cuenta: 99/100.

### 1.4 Acciones

| # | Acción | Quién | Cuándo |
|---|---|---|---|
| 1 | **Agregar fondos prepagados o una segunda tarjeta** en Facturación de la Cuenta Sovereign. Revisar por qué falló la tarjeta (banco bloqueando cobros pequeños repetidos es lo típico) | Cliente | Hoy |
| 2 | No tocar anuncios ni presupuestos hasta el **22 nov** (regla de 14 días; se cuenta desde el 10 nov, cuando volvió la entrega) | Todos | — |
| 3 | Probar desde un celular de EE.UU.: abrir `/iul` desde un anuncio y tocar WhatsApp; confirmar que aparece `Contact` en el Administrador de eventos | Marcos | 12 nov |
| 4 | Responder WhatsApp en < 5 min y etiquetar cada chat con la palabra clave (`IUL`, `VIDA`, `INFO`, `REVISIÓN`…) | Cliente | Diario |
| 5 | Reporte del **16 nov**: si B lleva ≥ 150 visitas y 0 clics a WhatsApp, pasar US$5/día de B a A | Yo | 16 nov |
| 6 | Pausar las 3 campañas plantilla de la cuenta vieja `2266868607438478` (gastan US$0, pero ensucian) | Cliente o yo con aprobación | Esta semana |
| 7 | Cargar NPN y número de licencia FL en `src/data/compliance.ts` | Cliente → Marcos | Esta semana |
| 8 | Crear público personalizado: personas que vieron el 50% de los videos y visitantes de `/iul` (para remarketing del 7 dic) | Yo | 20 nov |

---

## 2. Web: SEO, GEO e indexado

### 2.1 Problemas encontrados

| Problema | Impacto | Estado |
|---|---|---|
| Canónicas, `og:url`, `og:image`, sitemap, robots y JSON-LD con `sovereign.marcostorresalarcon.com` | Google indexaba el dominio de pruebas y no el oficial | **Corregido** (dominio fijo en `astro.config.mjs`) |
| `sovereign.marcostorresalarcon.com` sigue sirviendo la web completa | Contenido duplicado | Pendiente: Coolify/Cloudflare (2.3) |
| `www.sovereigncapitalsolutions.com` no resuelve | Quien escribe "www" no entra | Pendiente: DNS (2.3) |
| `http://` responde 200 sin redirigir a `https://` | Duplicado + señal débil | Pendiente: Cloudflare (2.3) |
| Cloudflare reemplaza el robots.txt y bloquea GPTBot, ClaudeBot, Google-Extended, meta-externalagent, Applebot-Extended | La marca no entra en las respuestas de ChatGPT, Gemini, Meta AI | Pendiente: Cloudflare (2.3) |
| Sin `llms.txt` | Menos contexto para motores de IA | **Corregido** (`/llms.txt`, se genera solo) |
| Títulos genéricos ("Estrategias · Sovereign", "Contacto · Sovereign") y título de inicio en inglés | Pocas búsquedas coinciden | **Corregido** |
| JSON-LD sin logo, sin `sameAs`, sin entidad WebSite; artículos sin logo del editor ni URL del autor | Menos resultados enriquecidos y menos confianza para la IA | **Corregido** |
| Sin verificación en Google Search Console ni Bing | No se sabe qué está indexado | Pendiente (2.3) |
| Sin enlaces a redes en la web | Entidad de marca débil | **Corregido** para Instagram y Facebook; LinkedIn y YouTube cuando existan |
| Sin Google Business Profile visible | Se pierde "seguro de vida en español cerca de mí" | Pendiente (2.4) |

### 2.2 Cambios aplicados en el código (sin desplegar aún)

- `astro.config.mjs`: dominio oficial fijo `https://sovereigncapitalsolutions.com`.
- `src/pages/llms.txt.ts`: nuevo `/llms.txt` con guías, estrategias y artículos.
- `src/layouts/Base.astro`: organización con `@id`, logo, imagen, idiomas y `sameAs`;
  entidad `WebSite` en el inicio; URL del fundador.
- `src/pages/academia/[slug].astro`: artículo con `mainEntityOfPage`, imagen, autor
  con URL y editor con logo.
- Títulos nuevos: inicio, estrategias (índice y fichas), academia, nosotros,
  contacto y recursos.
- `src/data/site.ts`: Instagram y Facebook enlazados.

Build OK y 19/19 pruebas pasan.

### 2.3 Pasos fuera del código (en orden)

1. **Coolify:** cambiar el build arg `PUBLIC_SITE_URL` a `https://sovereigncapitalsolutions.com`
   (el código ya lo ignora, pero que quede limpio) y **quitar `sovereign.marcostorresalarcon.com`**
   de los dominios del recurso. Redesplegar.
2. **Cloudflare (zona sovereigncapitalsolutions.com):**
   - SSL/TLS → *Always Use HTTPS*: activado.
   - DNS: crear `www` (CNAME a la raíz, con proxy) + regla de redirección 301 `www → raíz`.
   - Security → Bots → *Manage AI crawlers / robots.txt administrado*: desactivar el
     bloqueo, o al menos permitir GPTBot, Google-Extended, ClaudeBot y meta-externalagent.
     Para un negocio que quiere aparecer en ChatGPT y Gemini, bloquearlos va en contra.
3. **Cloudflare (zona marcostorresalarcon.com):** si el subdominio debe seguir existiendo,
   regla 301 `sovereign.marcostorresalarcon.com/* → https://sovereigncapitalsolutions.com/$1`.
4. **Google Search Console:** verificar el dominio por DNS, enviar `sitemap-index.xml`,
   pedir indexación de `/`, `/iul`, `/banca-mia` y los 8 artículos. Si el dominio de
   pruebas está verificado, usar *Cambio de dirección*.
5. **Bing Webmaster Tools:** importar desde Search Console (Bing alimenta a ChatGPT Search).
6. Revisar en 7–14 días: Search Console → Páginas → que la canónica elegida por Google
   sea `sovereigncapitalsolutions.com`.

### 2.4 Cómo posicionar (orgánico en Google y en IA)

**Google Business Profile** (lo de mayor retorno para un agente local):
categoría *Agencia de seguros de vida*, dirección de Virginia Gardens, horario,
servicios (IUL, Whole Life, revisión de pólizas), idioma español, fotos de Oswald y la
oficina, y pedir reseñas a cada cliente que firma. Publicar 1 vez por semana.

**Palabras clave objetivo** (español, EE.UU.):

| Grupo | Ejemplos | Página |
|---|---|---|
| IUL | iul en español, qué es un iul, iul es una estafa, iul ventajas y desventajas | `/iul`, `/academia/iul-sin-mitos` |
| Comparativas | iul o whole life, whole life vs term, seguro de vida a término o permanente | **artículo nuevo** |
| Banca infinita | banca infinita en español, banca infinita funciona, préstamo sobre póliza | `/banca-mia`, `/academia/banca-infinita-sin-mitos` |
| Local | seguro de vida en español Miami, agente de seguros de vida hispano Florida | inicio, contacto, Google Business |
| Situaciones | seguro de vida para dueños de negocio, revisar mi póliza de vida, seguro de vida para padres jóvenes | **artículos nuevos** |

**Calendario de contenido web** (2 artículos al mes; cada uno revisado por compliance):

| Mes | Artículos |
|---|---|
| Nov | ¿IUL o Whole Life? Diferencias con ejemplos · Cómo revisar tu póliza de vida (paso a paso) |
| Dic | Seguro de vida a término vs permanente · Cuánto seguro de vida necesitas (calculadora) |
| Ene | Seguro de vida para dueños de negocio (key person, buy-sell) · Préstamos sobre la póliza: costos reales |
| Feb | Preguntas a hacer antes de firmar un IUL · Beneficios en vida (riders) explicados |

**Reglas para que la IA los cite (GEO):**
- Abrir cada artículo con una respuesta directa de 2–3 líneas a la pregunta del título.
- Tablas comparativas, cifras con fuente y fecha, y una sección FAQ con schema.
- Nombre y credenciales del autor visibles (por eso urge el NPN).
- Repetir la misma descripción de la marca en web, Google Business, Instagram,
  Facebook, LinkedIn y YouTube (mismo nombre, dirección y teléfono).
- Subir cada video a YouTube con título de búsqueda y enlazarlo desde el artículo.

---

## 3. Cuentas: Meta, Instagram y LinkedIn

### 3.1 Meta Business

- Facturación (ver 1.4 #1). Activar la verificación del negocio si no está.
- Página de Facebook (ID `1308865965637093`): usuario corto (`/sovereigncapitalsolutions`),
  categoría *Agencia de seguros*, dirección, horario, WhatsApp como botón principal,
  sitio web con el dominio oficial. Luego actualizar el enlace en `src/data/site.ts`.
- WhatsApp Business: mensaje de bienvenida, respuestas rápidas por palabra clave,
  catálogo con "Consulta gratis IUL" y "Revisión de póliza", etiquetas por anuncio.
- Hay cuentas publicitarias de otros negocios en el mismo Business Manager personal:
  la Cuenta Sovereign ya está en su propio Business (`Sovereign Capital Solutions`); mantenerlo así.

### 3.2 Instagram @sovereigncapitalsolutions

Diagnóstico de los últimos 25 posts (11–29 oct):
- **Promedio ~2 likes y 0–2 comentarios.** Sin publicaciones desde el 29 oct, justo
  cuando arrancaron los anuncios (la gente que ve el anuncio visita el perfil y lo ve parado).
- 18 de 25 son imágenes estáticas; solo 3 Reels.
- **Mezcla dos públicos:** reclutamiento de agentes ("¿cómo obtengo mi licencia?",
  "tu próxima etapa profesional") y clientes de seguros. Confunde al algoritmo y al visitante.

Acciones:
1. **Bio:** "Seguros de vida en español · IUL y Whole Life · Miami y todo EE.UU. ·
   Consulta gratis por WhatsApp 👇" + enlace a `sovereigncapitalsolutions.com/iul`
   (o a WhatsApp). Nombre de perfil con palabra clave: "Sovereign | Seguros de vida en español".
2. **Destacadas:** IUL · Whole Life · Mitos · Quién soy · Testimonios · Cómo trabajamos.
3. **Separar reclutamiento** en otra cuenta (o en LinkedIn). Este perfil, solo clientes.
4. **Publicar ya los 6 videos de la campaña** como Reels orgánicos (uno cada 2 días) y
   fijar los 3 mejores. Los que funcionen en orgánico se convierten en anuncios.
5. Ritmo: 4 Reels + 2 carruseles + historias diarias por semana (ver §4).

### 3.3 LinkedIn

No hay acceso por API ni enlace en la web. Pasos:
1. **Perfil de Oswald:** titular "Agente de seguros de vida licenciado · IUL y Whole Life
   en español · Fundador de Sovereign Capital Solutions"; foto profesional; banner con
   la web; *Acerca de* con la historia de ingeniero/bienes raíces → asesor; Destacados
   con `/iul`, `/banca-mia` y un video; idioma español e inglés; botón de sitio web.
2. **Página de empresa** Sovereign Capital Solutions: logo, sector *Seguros*, dirección,
   enlace al dominio oficial. Pasarme la URL para agregarla a la web (`sameAs`).
3. **Uso:** LinkedIn es el canal para dueños de negocio (Banca Mía) y para reclutar agentes.
   2–3 publicaciones por semana desde el perfil personal (rinde más que la página):
   casos de negocio, errores comunes, carruseles PDF de los artículos.

---

## 4. Campañas orgánicas

### 4.1 Pilares (mismo mensaje en todos los canales)

| Pilar | % | Ejemplos |
|---|---|---|
| Mitos y verdades | 30% | "¿El IUL es una estafa?", "Lo que no te dicen de la banca infinita" |
| Educación simple | 30% | Cap y floor en 30 s, IUL vs Whole Life, cuánto seguro necesitas |
| Confianza / quién es Oswald | 20% | Historia, oficina, proceso, "si no es para ti, te lo digo" |
| Casos y testimonios | 20% | Casos anonimizados, preguntas reales de WhatsApp |

### 4.2 Calendario semanal

| Día | Instagram / Facebook | LinkedIn | Otros |
|---|---|---|---|
| Lun | Reel (mito) | Post personal | — |
| Mar | Carrusel (educación) | — | Google Business: post |
| Mié | Reel (educación) | Carrusel PDF | — |
| Jue | Reel (confianza) | — | YouTube: video largo (cada 2 semanas) |
| Vie | Carrusel (caso) | Post de negocio | — |
| Sáb | Reel (pregunta de WhatsApp) | — | — |
| Diario | 3–5 historias (encuestas, preguntas, detrás de escena) | — | — |

### 4.3 Reciclaje (un tema → 6 piezas)

Artículo web → Reel de 30 s → carrusel → post de LinkedIn → video de YouTube de 6–8 min
→ respuesta frecuente para WhatsApp. Cada pieza enlaza a la página del tema.

### 4.4 Interacción

- CTA en todo: "Escríbenos **IUL** por WhatsApp" (misma lógica de palabras clave que los anuncios).
- Responder comentarios en < 1 h el primer día de cada Reel.
- Colaboraciones (*Collab*) con creadores hispanos de finanzas o con otros profesionales
  (contadores, realtors) — Meta indica ~19% menos costo por resultado con anuncios de colaboración.
- Cada comentario o DM con pregunta se convierte en un Reel de respuesta.

### 4.5 Métricas (revisión semanal)

| Métrica | Hoy | Meta a 90 días |
|---|---|---|
| Likes promedio por post IG | ~2 | 25+ |
| Publicaciones por semana | 0 (desde 29 oct) | 6 + historias diarias |
| Páginas indexadas en Google (dominio oficial) | ? (dominio equivocado) | 22+ |
| Clics orgánicos de Google al mes | ? | 300+ |
| Reseñas en Google Business | 0 | 15+ |
| Chats de WhatsApp desde orgánico | ? | 10+/mes (etiqueta "orgánico") |

---

## 5. Calendario de implementación

| Fecha | Tarea | Quién |
|---|---|---|
| **11–12 nov** | Fondos/tarjeta en Meta · desplegar cambios de la web · Coolify y Cloudflare (§2.3) | Cliente + Marcos |
| 12 nov | Search Console + Bing · prueba de WhatsApp desde la landing | Marcos |
| 12–14 nov | Bio, destacadas y nombre de Instagram · empezar a publicar los 6 videos | Cliente |
| 13–15 nov | Google Business Profile · perfil y página de LinkedIn | Cliente |
| 16 nov | Primer reporte de campaña (§1.4 #5) | Yo |
| 18–30 nov | 2 artículos nuevos (IUL vs Whole Life, revisar tu póliza) + Reels derivados | Marcos + yo |
| 22 nov | Fin de los 14 días: primeras decisiones por anuncio | Yo |
| 23–29 nov | Thanksgiving: bajar a US$15/día | Yo |
| 7 dic | Remarketing con públicos de video y visitantes | Yo |
| 4 ene | Decisión: escalar, repartir 70/30 o parar | Cliente + yo |
