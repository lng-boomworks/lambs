import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Minimal placeholder collection - not used by routes, kept only so legacy
// markdown files in src/content/pages validate during build.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { pages };
