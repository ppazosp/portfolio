// i18n Utility Functions
// Helper functions for managing internationalization

import { portfolioConfig as enConfig } from '../config/portfolio.config.en';
import { portfolioConfig as esConfig } from '../config/portfolio.config.es';

export type Locale = 'en' | 'es';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'es'];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español'
};

/**
 * Get the portfolio configuration for a specific locale
 */
export function getPortfolioConfig(locale: Locale) {
  return locale === 'es' ? esConfig : enConfig;
}

/**
 * Extract locale from URL pathname
 * @param url - The URL object to extract locale from
 * @returns The locale ('en' or 'es')
 */
export function getLocaleFromUrl(url: URL): Locale {
  const pathname = url.pathname;
  if (pathname.startsWith('/es')) return 'es';
  return 'en';
}

/**
 * Get the alternate locale (toggle between en and es)
 */
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'es' : 'en';
}

/**
 * Convert a path from one locale to another
 * @param path - Current path
 * @param targetLocale - Target locale
 * @returns Path for the target locale
 */
export function getLocalizedPath(path: string, targetLocale: Locale): string {
  // Remove any existing locale prefix
  const pathWithoutLocale = path.replace(/^\/(en|es)/, '') || '/';

  // Add target locale prefix if not English (default)
  if (targetLocale === 'es') {
    return `/es${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  }

  return pathWithoutLocale;
}
