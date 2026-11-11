import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { contact } from '../data/site';
import { agency, agent } from '../data/compliance';

/**
 * llms.txt: resumen del sitio para motores de respuesta (ChatGPT, Perplexity,
 * Gemini, Claude). Se genera desde las colecciones, así que cada artículo o
 * estrategia nueva aparece aquí sin tocar este archivo.
 */
export const GET: APIRoute = async ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const posts = (await getCollection('posts')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const strategies = (await getCollection('strategies')).sort((a, b) => a.data.order - b.data.order);

  const lines = [
    '# Sovereign Capital Solutions',
    '',
    `> Agencia de seguros de vida en español con oficina en ${agency.city}, ${agency.region} (área de Miami). ` +
      'Explica y diseña seguros de vida IUL (Indexed Universal Life) y Whole Life para familias, profesionales ' +
      'y dueños de negocio latinos en Estados Unidos. Asesoría en español e inglés, consulta inicial sin costo.',
    '',
    `- Asesor: ${agent.name}, ${agent.title.toLowerCase()} (${agent.role}).`,
    `- Dirección: ${agency.street}, ${agency.suite}, ${agency.city}, ${agency.region} ${agency.postalCode}.`,
    `- Teléfono y WhatsApp: ${contact.phone}.`,
    '- Los seguros de vida no son inversiones ni cuentas bancarias. Préstamos y retiros de la póliza generan intereses y reducen el beneficio por fallecimiento.',
    '',
    '## Guías principales',
    '',
    `- [IUL en español: qué es, cómo funciona y si es para ti](${url('/iul')}): cap, floor, participación, cargos, préstamos e impuestos.`,
    `- [Banca Infinita con Whole Life (Banca Mía™)](${url('/banca-mia')}): cómo funciona la liquidez con una póliza Whole Life participante, costos y quién no debería usarla.`,
    '',
    '## Estrategias',
    '',
    ...strategies.map((s) => `- [${s.data.title}](${url(`/estrategias/${s.id}`)}): ${s.data.short}`),
    '',
    '## Academia (artículos)',
    '',
    ...posts.map((p) => `- [${p.data.title}](${url(`/academia/${p.id}`)}): ${p.data.excerpt}`),
    '',
    '## Empresa',
    '',
    `- [Sobre nosotros](${url('/nosotros')})`,
    `- [Contacto](${url('/contacto')})`,
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
