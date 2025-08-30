import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://pablopazos.dev',
  vite: {
    // @ts-ignore
    plugins: [...tailwindcss()]
  },
  integrations: [react()],
  build: {
    inlineStylesheets: 'auto',
  }
});