# Plan de implementación — Embudos IUL y Banca Mía™ (septiembre 2026)

Traducción de `01_Analisis_y_Plan_Embudos_Sovereign.md`, `02_Landing_IUL.md` y
`03_Landing_Whole_Life_Banca_Mia.md` al sitio Astro existente.

## Decisiones

- **Sin masterclass (decisión del cliente, 16-09-2026).** Los docs 01 §7.1 y 03
  ponían una masterclass evergreen de 38 minutos como oferta de entrada del
  embudo Whole Life. Se descartó por no grabarla: `/banca-mia` es ahora una
  landing de aplicación directa (la alternativa que el propio doc 03 plantea en
  su test A/B nº 2), con el video corto del asesor en el hero, el checklist de
  las 8 pruebas y la calculadora como material educativo. Si algún día se graba,
  la pieza se reinserta entre la landing y el diagnóstico.
- **Astro, no Angular/NestJS.** El sitio ya es Astro con adaptador de Node; los
  endpoints de leads viven en `src/pages/api/` sin dependencias nuevas.
  Almacenamiento: JSONL append-only (prueba de consentimiento) + webhook al CRM.
  MongoDB queda para cuando exista el backend central.
- **Marca actual, no la paleta del doc.** Se mantiene azul marino + oro con
  bloques claros para lectura; el verde se reserva al ciclo del capital.
- **Sin marcadores públicos.** NPN, números de licencia, videos y testimonios se
  muestran sólo cuando existen; mientras tanto el build lo advierte.

## Fase 1 · Arreglos de la web (doc 01, §2)

| # | Problema | Implementado |
|---|---|---|
| 1 | Licencias | `src/data/compliance.ts`; bloque regulatorio en el pie, Nosotros, landings y artículos; enlace de verificación FL DFS |
| 2 | Equipo invisible | Componente `Advisor` (foto, licencia, bio, cita) en portada y landings |
| 3 | Métricas "+0" | Cifras finales en el HTML; se reemplazaron cifras no verificables (familias, US$75M, 15 años) por datos ciertos |
| 4 | Testimonios | `testimonials` en `src/data/funnels.ts`; sección oculta mientras esté vacía |
| 5 | Formulario | Diagnósticos con agenda embebida; consentimiento TCPA en contacto |
| 6 | Redes sin perfil | Íconos ocultos hasta cargar URLs reales |
| 7 | Una sola página | Landings dedicadas `/iul` y `/banca-mia` + sección "Dos herramientas" en portada |
| 8 | Artículos sin autor | Autor licenciado, fecha de revisión, schema `Person` |
| 9 | Rastros técnicos | Dominio de desarrollo eliminado de config, Docker y robots (ahora generado) |

Compliance de copy: la estrategia y el artículo de Banca Mía™ se reescribieron
(Whole Life + "no es un banco", sin "te pagas intereses a ti mismo"); nuevas
páginas legales de Términos y Consentimiento de comunicaciones; privacidad con
píxel/CAPI y política de no compartir datos de SMS.

## Fase 2 · Backend de embudos

`/api/leads/iul`, `/api/leads/banca-mia/{registro,diagnostico}`,
`/api/leads/guia`, `/api/webhooks/booking`: validación, honeypot, límite por IP,
Turnstile opcional, calificación en servidor, `consentLog`, CRM, Meta CAPI con
`event_id` deduplicado y token HMAC de 30 días que une los dos pasos del embudo
Whole Life.

## Fase 3 · Landings

- `/iul` (+ `/iul-a|b|c`, `/iul/gracias`): las 15 secciones del doc 02, simulador
  cap/floor, quiz de 8 pasos con resultados A/B/C, guía en modal, CTA sticky.
- `/banca-mia` (+ `/banca-mia-a|b`, `/diagnostico`, `/gracias`): secciones del
  doc 03, regla de oro visible, ciclo del capital SVG, video del asesor, qué se
  revisa en la consulta, las 8 pruebas antes de comprar, calculadora de costo de
  oportunidad y diagnóstico de 10 preguntas con resultados A/B/C/D. El hero
  captura el lead con 3 preguntas antes del cuestionario largo.
- Medición: Pixel + GA4 diferidos, UTMs/fbclid en cookie de 30 días, eventos del
  doc (`QuizStart`, `LeadCalificado`, `VioMasterclass50`…).

## Fase 4 · Verificación

`npm test` (19 tests de calificación), `npm run check` (35 comprobaciones de
navegador, incluidos los flujos completos), `astro check` sin errores, build OK.

## Pendiente del negocio (no es código)

1. NPN, números de licencia y estados reales en `src/data/compliance.ts`.
2. Aprobación del copy por compliance (IMO/aseguradora) y registro de la fecha.
3. Cuenta de Cal.com/Calendly, CRM + WhatsApp API y sus variables de entorno.
4. Pixel, token CAPI, dominio verificado en Business Manager.
5. Grabar los videos cortos del asesor (hero de cada landing y páginas de
   gracias) y subirlos a Vimeo.
6. Publicar los PDF "de la A a la Z" (`GUIDE_URL_*`).
7. Perfiles de redes reales en `contact.socials`.
8. Confirmar la marca "Banca Mía™" antes de pautar a escala.
