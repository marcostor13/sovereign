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

# La URL pública se hornea en el sitemap y en las etiquetas canónicas.
ARG PUBLIC_SITE_URL=https://sovereign.marcostorresalarcon.com
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL

RUN npm run build


FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321 \
    CONTACT_LOG_PATH=/app/data/leads.jsonl

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
