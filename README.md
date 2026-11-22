# Veridan Consulting website

Astro static site, built for Cloudflare Pages.

## Run it
```
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
```

## Deploy on Cloudflare Pages
Build command: `npm run build`  ·  Output directory: `dist`

## Contact forms
Both forms post to `functions/api/` and share `functions/_lib/form.ts`. Set these in Cloudflare Pages, under Settings, Variables and Secrets:
- `RESEND_API_KEY` (required)
- `TURNSTILE_SECRET` (recommended) plus the public key in `turnstileSiteKey` in `src/data/site.ts`
- `CONTACT_TO` (optional)

The code checks the honeypot, the request origin and the body size. It does not rate limit: add a Cloudflare rate limiting rule for `/api/*` in the dashboard.

## Where things live
- `src/data/site.ts`          name, headline, email, WhatsApp, booking link
- `src/data/services.ts`      add or edit a service (one entry each)
- `src/data/projects.ts`      portfolio projects
- `src/data/team.ts`          team members
- `src/data/testimonials.ts`  client quotes (section stays hidden while empty)
- `src/styles/global.css`     colors and fonts at the top of the file

## To rename the agency
Change `brand` and `shortName` at the top of `src/data/site.ts`; the descriptions, logo text, page titles and email sender follow it. Also update `url` in the same file when the domain changes, and re-render the three images with the name on them: `public/social/veridan-og.png`, `veridan-banner-wide.png` and `veridan-banner-linkedin.png`. The X mark, favicon and icons carry no name and stay as they are.

## Version 0.1.0
- Palette: navy, blue, orange accent, dark orange for small text, cyan highlight (see `:root` in `src/styles/global.css`).
- Logo: the approved mark is in `src/components/Logo.astro` and `public/favicon.svg`.
- Footer reads live services and live products only.
- Privacy and Terms pages are drafts, marked for lawyer review.

## How to add a product
1. Add an entry to `src/data/products.ts` with `status: 'live'` once it is running.
2. Create the product page first: `src/pages/products/[slug].astro` does not exist yet, and one template should serve every product.
3. The footer lists live products automatically and links to `/products/<slug>/`. Products with any other status stay hidden.
