import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  outDir: './dist',
  integrations: [tailwind(), react()],
  vite: {
    define: {
      'import.meta.env.PUBLIC_BASE_API_URL': JSON.stringify(process.env.PUBLIC_BASE_API_URL || 'https://3in1-worker.ailabs-hq.workers.dev'),
      'import.meta.env.PUBLIC_BASE_APP_URL': JSON.stringify(process.env.PUBLIC_BASE_APP_URL || 'https://3in1.ai-labs.pro'),
      'import.meta.env.PUBLIC_WORKER_API_URL': JSON.stringify(process.env.PUBLIC_WORKER_API_URL || 'https://3in1-worker.ailabs-hq.workers.dev'),
    },
  },
});