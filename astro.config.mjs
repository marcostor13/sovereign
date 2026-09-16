// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://sovereigncapitalsolutions.com';

// Páginas que no deben anunciarse: legales, variantes A/B y pasos internos de
// los embudos (todas llevan noindex).
const NOT_IN_SITEMAP = [/\/legal\//, /\/iul-[a-z]\/?$/, /\/banca-mia-[a-z]\/?$/, /\/gracias\/?$/, /\/diagnostico\/?$/];

// Static-first: every marketing page is prerendered at build time.
// The Node adapter exists so `src/pages/api/*` can run on the server
// (see `export const prerender = false` in those files).
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap({ filter: (page) => !NOT_IN_SITEMAP.some((re) => re.test(page)) })],
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
  vite: {
    build: { cssCodeSplit: false },
  },
});
