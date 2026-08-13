// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://sovereign.marcostorresalarcon.com';

// Static-first: every marketing page is prerendered at build time.
// The Node adapter exists so `src/pages/api/*` can run on the server
// (see `export const prerender = false` in those files).
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  // Las páginas legales llevan noindex; no tiene sentido anunciarlas.
  integrations: [sitemap({ filter: (page) => !page.includes('/legal/') })],
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
  vite: {
    build: { cssCodeSplit: false },
  },
});
