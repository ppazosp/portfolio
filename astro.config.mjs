import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://pablopazos.dev',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,  // '/' for English, '/es/' for Spanish
      redirectToDefaultLocale: false
    }
  },
  vite: {
    // @ts-ignore
    plugins: [...tailwindcss()]
  },
  integrations: [react()],
  build: {
    inlineStylesheets: 'auto',
  }
});