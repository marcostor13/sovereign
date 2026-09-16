# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Sovereign Capital Solutions — imagen de producción
#
# Build en dos etapas: la primera compila el sitio (y optimiza las imágenes,
# que es la parte cara); la segunda sólo lleva el runtime y `dist/`.
# ---------------------------------------------------------------------------

FROM node:22-alpine AS build
WORKDIR /app

# Capa de dependencias separada: se reaprovecha mientras no cambie el lockfile.
# Sólo dependencias de producción: astro y sus adaptadores bastan para
# construir. Las devDependencies son utilidades de revisión local (Playwright,
# astro check) que aquí sobran y además no instalan en Alpine.
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY . .

# Variables PUBLIC_* que se hornean en el HTML durante el build: la URL
# pública (sitemap, canónicas) y los IDs de medición y video de los embudos.
ARG PUBLIC_SITE_URL=https://sovereigncapitalsolutions.com
ARG PUBLIC_META_PIXEL_ID=
ARG PUBLIC_GA4_ID=
ARG PUBLIC_TURNSTILE_SITE_KEY=
ARG PUBLIC_ADVISOR_VIDEO_IUL=
ARG PUBLIC_ADVISOR_VIDEO_WL=
ARG PUBLIC_THANKS_VIDEO_IUL=
ARG PUBLIC_THANKS_VIDEO_WL=
ARG PUBLIC_WHATSAPP_NUMBER=
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    PUBLIC_META_PIXEL_ID=$PUBLIC_META_PIXEL_ID \
    PUBLIC_GA4_ID=$PUBLIC_GA4_ID \
    PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY \
    PUBLIC_ADVISOR_VIDEO_IUL=$PUBLIC_ADVISOR_VIDEO_IUL \
    PUBLIC_ADVISOR_VIDEO_WL=$PUBLIC_ADVISOR_VIDEO_WL \
    PUBLIC_THANKS_VIDEO_IUL=$PUBLIC_THANKS_VIDEO_IUL \
    PUBLIC_THANKS_VIDEO_WL=$PUBLIC_THANKS_VIDEO_WL \
    PUBLIC_WHATSAPP_NUMBER=$PUBLIC_WHATSAPP_NUMBER

RUN npm run build


FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321 \
    CONTACT_LOG_PATH=/app/data/leads.jsonl \
    LEADS_LOG_PATH=/app/data/funnels.jsonl

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

# Las solicitudes de contacto se escriben aquí. Monta un volumen en este
# directorio si no configuras CONTACT_WEBHOOK_URL.
RUN mkdir -p /app/data && chown -R node:node /app/data

USER node
EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=4s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4321)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "./dist/server/entry.mjs"]
