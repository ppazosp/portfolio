import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string(),
    problem: z.string(),
    approach: z.string(),
    outcome: z.string(),
    stack: z.array(z.string()),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    publishedAt: z.date(),
    locale: z.enum(['en', 'es']),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.string()).optional().default([]),
    image: z.string().optional(),
    locale: z.enum(['en', 'es']),
  }),
});

export const collections = {
  projects,
  posts,
};