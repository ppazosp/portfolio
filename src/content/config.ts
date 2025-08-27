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
    links: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      })
    ).optional().default([]),
    featured: z.boolean().optional().default(false),
    publishedAt: z.date(),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.string()).optional().default([]),
    url: z.string().url().optional(),
    stars: z.number().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = {
  projects,
  posts,
};