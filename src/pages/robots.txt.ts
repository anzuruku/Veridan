import type { APIRoute } from 'astro';
import { site } from '../data/site';

// Generated from site.url, so it follows the domain automatically.
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
