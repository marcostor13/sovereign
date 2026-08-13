import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Las estrategias y los artículos crecen con el negocio, así que viven como
 * Markdown en `src/content/`. Añadir una estrategia o un artículo es crear un
 * archivo: las rutas, los índices, el buscador y los enlaces relacionados se
 * generan solos.
 */

const strategies = defineCollection({
  loader: glob({ base: './src/content/strategies', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    short: z.string(),
    icon: z.enum(['shield', 'drop', 'coins', 'bank', 'legacy', 'lock']),
    order: z.number(),
    featured: z.boolean().default(false),
    lead: z.string(),
    bullets: z.array(z.string()),
    outcome: z.string(),
    forWhom: z.array(z.string()).default([]),
  }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    read: z.number(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { strategies, posts };
