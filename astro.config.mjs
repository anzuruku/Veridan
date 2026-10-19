import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site.ts';

// The domain lives in one place: src/data/site.ts (`url`).
// Change it there when you buy a domain, and everything else follows.
export default defineConfig({
  site: site.url,
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thanks') && !page.includes('/404'),
    }),
  ],
});
