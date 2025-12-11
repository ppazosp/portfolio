// Get Localized Collection
// Helper function to filter content collections by locale

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

/**
 * Get all posts for a specific locale
 */
export async function getLocalizedCollection(
  collection: 'posts',
  locale: Locale
): Promise<CollectionEntry<'posts'>[]>;

/**
 * Get all projects for a specific locale
 */
export async function getLocalizedCollection(
  collection: 'projects',
  locale: Locale
): Promise<CollectionEntry<'projects'>[]>;

/**
 * Get all posts or projects for a specific locale
 */
export async function getLocalizedCollection(
  collection: 'posts' | 'projects',
  locale: Locale
): Promise<any> {
  const allEntries = await getCollection(collection);
  return allEntries
    .filter(entry => entry.data.locale === locale)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}
