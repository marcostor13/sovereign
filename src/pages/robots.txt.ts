import type { APIRoute } from 'astro';

/**
 * robots.txt generado con el dominio real (`PUBLIC_SITE_URL`), para que el
 * sitemap nunca apunte a un dominio de desarrollo.
 */
export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /legal/',
      'Disallow: /api/',
      'Disallow: /iul/gracias',
      'Disallow: /banca-mia/gracias',
      'Disallow: /banca-mia/masterclass',
      '',
      `Sitemap: ${new URL('/sitemap-index.xml', site).href}`,
      '',
    ].join('\n'),
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
