# PureSeed web (Next.js 15, App Router)

Rebuild of the former agrixco.com site (WordPress/Elementor) for speed and SEO. Fully static pages, Tailwind CSS 3 (same stack and design system as the Atmaara Smart Locks site), `next/image` (AVIF/WebP with blur previews), self-hosted Schibsted Grotesk via `next/font/local`, light/dark theme, typo-tolerant site search.

## Run
```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Design system
Colour tokens are CSS variables at the top of `app/globals.css` (light and dark), mapped to Tailwind names in `tailwind.config.ts`. The palette is PureSeed forest green; change the RGB values there to re-colour the whole site. Shared patterns: `.btn-*` buttons, `swipeList` rows on phones that become grids from `md`, dark hero, `bg-mist` tinted bands, `ChipScroller` filters.

## Structure
- `components/`: Header, ShopMenu, HeaderSearch/HeroSearch (search over products, services and pages), Catalog (search, category chips, sort), ProductCard, Gallery, NeedTiles/NeedRow (home hero), WhatsAppFab (mobile Call/WhatsApp bar).
- `lib/data.ts`: ALL site copy, products, services, contact details. Edit content here.
- `app/`: routes. URLs match the old site (`/shop`, `/product/[slug]`, `/our-services`, `/service/[slug]`, `/about-us`, `/contact-us`) so existing Google rankings carry over. New: `/portfolio`.
- `app/sitemap.ts`, `app/robots.ts`, JSON-LD (Organization, Product), per-page metadata and canonicals.
- `app/api/contact/route.ts`: contact form via Resend (set `RESEND_API_KEY`).

## Before go-live
1. **Images**: replace the placeholders in `public/images/` (see `IMAGES.md`).
1b. **Domain**: `site.url` and `CONTACT_FROM` still use agrixco.com. Email is sales@pureseed.com. Set `NEXT_PUBLIC_SITE_URL` and a Resend-verified sender (`CONTACT_FROM`) on the pureseed.com domain when it is ready.
2. **Deploy** on Vercel; set `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
3. Keep the same domain and URLs; submit `/sitemap.xml` in Search Console.
4. Add real content flagged in the handoff notes (certifications, specs, testimonials, social links).

## Images
Logos, favicon and share image are real PureSeed brand assets (rebuilt with `python3 scripts/process-logos.py <full> <mark> <tagline>`).
The 25 photos are labelled placeholders. Replace them by hand (see `IMAGES.md`) or run `npm run fetch-images` to download open-licence photos at the right sizes (no key needed; see `IMAGES.md`).
