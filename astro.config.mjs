// @ts-check
import { defineConfig } from 'astro/config';
// @ts-ignore
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
