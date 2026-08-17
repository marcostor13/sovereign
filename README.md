# Sovereign Capital Solutions

Sitio web de **Sovereign Capital Solutions** — *Private Wealth Strategies*.

Construido con [Astro 5](https://astro.build) en modo estático con adaptador de
Node: todas las páginas de marketing se generan en el build (rápidas, cacheables,
indexables) y sólo el endpoint del formulario se ejecuta en el servidor.

---

## Puesta en marcha

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:4321`.

> La primera carga en desarrollo tarda: Astro convierte las fotografías a AVIF
> sobre la marcha. En el build de producción se pregeneran una sola vez.

### Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Build de producción en `dist/` (incluye optimización de imágenes) |
| `npm run serve` | Sirve el build de producción |
| `npm run check` | Comprobación funcional de las piezas interactivas |
| `npm run shots` | Capturas de revisión visual en `/tmp/shots` |

---

## Cómo editar el contenido

El objetivo del diseño de este repositorio es que **nunca haga falta tocar el
markup para cambiar lo que dice el sitio**.

### 1. Copy institucional → `src/data/site.ts`

Un único archivo tipado con la marca, el teléfono, la dirección, el menú, el
hero, el Método Sovereign™, los valores, la comparativa, la ficha del fundador
(`founder`), las preguntas frecuentes, el pie de página y los textos legales. Cambiar el teléfono es editar
una línea; aparecerá en la cabecera, el pie, la página de contacto y los datos
estructurados a la vez.

### 2. Estrategias → `src/content/strategies/*.md`

Un archivo Markdown por estrategia. Crear el archivo genera automáticamente su
página, su tarjeta en la portada, su entrada en el menú desplegable, su opción en
el formulario de contacto y sus enlaces cruzados.

```markdown
---
title: Nombre de la estrategia
short: Una frase para la tarjeta.
icon: shield          # shield | drop | coins | bank | legacy | lock
order: 7              # posición en las listas
featured: false       # true la destaca en oscuro sobre las demás
lead: Frase de apertura de la página.
bullets:
  - Qué incluye, punto por punto.
outcome: La frase de resultado que cierra la página.
forWhom: [Empresarios, Familias]
---

El cuerpo del artículo, en Markdown normal.
```

> Ojo con YAML: si un valor contiene dos puntos (`:`), enciérralo entre comillas
> simples.

### 3. Artículos de la Academia → `src/content/posts/*.md`

```markdown
---
title: Título del artículo
excerpt: Resumen de una o dos líneas.
category: Protección   # crea el filtro automáticamente
date: 2026-05-12
read: 7                # minutos de lectura
featured: true         # aparece en la portada
---
```

El índice, el buscador, los filtros por categoría, los artículos relacionados y
el índice lateral del artículo se generan solos a partir de estos archivos.

### 4. Fotografía → `src/assets/img/`

Las imágenes se importan desde los componentes y Astro genera automáticamente
AVIF en varios anchos. Sustituir un archivo manteniendo el nombre es suficiente.

| Archivo | Dónde se usa |
| --- | --- |
| `hero.jpg` | Portada, a sangre completa |
| `inversionistas.jpg` | Fondo de la banda de cifras |
| `familias.jpg` | Fondo de la llamada a la acción final |
| `founder.jpg` | Retrato institucional del fundador (*Sobre Nosotros*) |

**Retrato del fundador.** La página *Sobre Nosotros* lleva una sola fotografía
—la del fundador— por decisión de marca. El archivo es opcional: mientras no
exista `src/assets/img/founder.jpg` (también valen `.jpeg`, `.png` o `.webp`) la
sección muestra una lámina de marca con el monograma. Basta con dejar la
fotografía en esa carpeta con ese nombre para que aparezca el retrato, sin tocar
el código.

Las tarjetas de la Academia **no usan fotografía**: cada artículo recibe una
lámina generada a partir del emblema de la marca (`PostPlate.astro`), estable por
slug. Es una decisión de diseño —evita el stock genérico—, pero si en el futuro
hay fotografía real basta con sustituir ese componente en `PostCard.astro`.

---

## Formulario de contacto

`POST /api/contact` es la única ruta que se ejecuta en el servidor.

Valida en el back-end (no sólo en el navegador), descarta bots con un campo
trampa y limita a 5 envíos por IP y minuto. Después:

1. Si existe `CONTACT_WEBHOOK_URL`, reenvía la solicitud como JSON a esa URL
   (Zapier, Make, n8n, un CRM o un webhook de Slack).
2. En todos los casos, añade una línea a `CONTACT_LOG_PATH`.

Sin webhook configurado el formulario **sigue funcionando**: las solicitudes
quedan en el archivo de registro. Para no perderlas en producción, monta un
volumen en ese directorio (ver `Dockerfile`) o define el webhook.

---

## Variables de entorno

Copia `.env.example` a `.env` y ajusta:

| Variable | Obligatoria | Para qué |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Sí en producción | URLs canónicas, Open Graph y sitemap |
| `HOST` / `PORT` | No | Interfaz y puerto del servidor Node |
| `CONTACT_WEBHOOK_URL` | No | Reenvío de las solicitudes de contacto |
| `CONTACT_LOG_PATH` | No | Archivo donde se registran las solicitudes |

> `.env.deploy` contiene credenciales de **despliegue** (GitHub, Coolify,
> Cloudflare) y no lo lee la aplicación. Está en `.gitignore` y debe seguir así.

---

## Despliegue

La imagen de Docker construye y sirve el sitio completo:

```bash
docker build -t sovereign --build-arg PUBLIC_SITE_URL=https://tu-dominio.com .
docker run -p 4321:4321 -v sovereign-data:/app/data sovereign
```

En **Coolify**: crear un recurso de tipo *Dockerfile* apuntando al repositorio,
definir las variables de entorno de la tabla anterior y montar un volumen
persistente en `/app/data` si no se usa webhook. El contenedor expone el puerto
`4321` e incluye un `HEALTHCHECK`.

---

## Estructura

```
src/
  assets/img/        Fotografía original (Astro genera los derivados)
  components/        Piezas de interfaz, cada una con su CSS y su JS
  content/           Estrategias y artículos en Markdown
  data/site.ts       Toda la copy institucional
  layouts/Base.astro Cabecera <head>, SEO, datos estructurados, scroll y revelado
  pages/             Rutas del sitio + /api/contact
  styles/            tokens.css (paleta y escala) + global.css
scripts/             Utilidades de revisión (capturas, comprobaciones)
```

### Sistema de diseño

`src/styles/tokens.css` concentra las decisiones visuales: la paleta azul marino
y oro de la marca desarrollada en escalas completas, una escala tipográfica
fluida y las constantes de movimiento. **Los colores de marca no se modifican**;
lo que se amplía es el número de pasos disponibles para construir profundidad y
jerarquía.

Tipografías: *Cinzel* (marca), *Cormorant Garamond* (titulares) e *Inter*
(interfaz y texto corrido).

Todo el movimiento respeta `prefers-reduced-motion`.

---

## Accesibilidad y rendimiento

- Contraste, foco visible, `aria-*` y navegación completa por teclado, incluida
  una trampa de foco en el menú móvil.
- Imágenes en AVIF con `srcset` responsive (el hero pasa de 8,3 MB a ~415 KB).
- CSS crítico en línea, JavaScript mínimo y sin frameworks de cliente.
- `sitemap-index.xml`, `robots.txt` y datos estructurados de organización,
  artículo y preguntas frecuentes.
