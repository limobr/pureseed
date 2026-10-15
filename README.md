# PureSeed web (Next.js 15, App Router)

Rebuild of the former agrixco.com site (WordPress/Elementor) for speed and SEO. Fully static pages, no CSS framework, `next/image` (AVIF/WebP), `next/font`. Client JS is limited to the contact form, print button, mobile menu, and two tiny effect components (`Media`, `Reveal`).

## Run
```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Design system
All tokens live at the top of `app/globals.css` (colours, radii, shadow, section rhythm). Fonts: Fredoka (headings) and Inter (body) via `next/font`.
- Amber `#C58A17` is for buttons, bars and icons only, never small text (about 3:1 on white). Text on amber uses `--on-amber`.
- `components/Media.tsx`: every photo goes through it. Fixed `aspect-ratio` (no layout shift), `next/image` lazy loading, `priority` for the hero, fade-in, opt-in `zoom` (1.03x).
- `components/Reveal.tsx`: scroll fade-and-rise using IntersectionObserver. Content is visible without JS and under reduced motion.

## Structure
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
