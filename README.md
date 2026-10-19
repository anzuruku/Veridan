# Veridan Digital website

Astro static site, built for Cloudflare Pages.

## Run it
```
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
```

## Deploy on Cloudflare Pages
Build command: `npm run build`  ·  Output directory: `dist`

## Where things live
- `src/data/site.ts`          name, headline, email, WhatsApp, booking link
- `src/data/services.ts`      add or edit a service (one entry each)
- `src/data/projects.ts`      portfolio projects
- `src/data/team.ts`          team members
- `src/data/testimonials.ts`  client quotes (section stays hidden while empty)
- `src/styles/global.css`     colors and fonts at the top of the file

## To rename the agency
Change `name` and `shortName` in `src/data/site.ts`, update the domain in `astro.config.mjs`, and replace `public/favicon.svg` if the logo changes.

## Version 0.1.0
- Palette: navy, blue, orange accent, dark orange for small text, cyan highlight (see `:root` in `src/styles/global.css`).
- Logo: the approved mark is in `src/components/Logo.astro` and `public/favicon.svg`.
- Footer reads live services and live products only.
- Privacy and Terms pages are drafts, marked for lawyer review.

## How to add a product
1. Add an entry to `src/data/products.ts` with `status: 'live'` once it is running.
2. Create a page at `src/pages/products/[slug].astro` (one template serves every product).
3. The footer lists it automatically. Products with any other status stay hidden.
