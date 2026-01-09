import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// Production URLs for 3in1 - hardcoded for Cloudflare Pages deployment
const PUBLIC_BASE_API_URL = 'https://3in1-worker.ailabs-hq.workers.dev';
const PUBLIC_BASE_APP_URL = 'https://3in1.ai-labs.pro';
const PUBLIC_WORKER_API_URL = 'https://3in1-worker.ailabs-hq.workers.dev';

// https://astro.build/config
export default defineConfig({
  outDir: './dist',
  integrations: [tailwind(), react()],
  vite: {
    define: {
      'import.meta.env.PUBLIC_BASE_API_URL': JSON.stringify(PUBLIC_BASE_API_URL),
      'import.meta.env.PUBLIC_BASE_APP_URL': JSON.stringify(PUBLIC_BASE_APP_URL),
      'import.meta.env.PUBLIC_WORKER_API_URL': JSON.stringify(PUBLIC_WORKER_API_URL),
    },
  },
});