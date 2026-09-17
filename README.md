# Reach Media

Marketing site for **Reach Media** — healthcare social media management for IVF,
eye, dental and multi-speciality hospitals. An initiative by Reinvent Digital.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, RSC) |
| Language | TypeScript 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Animation | Motion 13 (`motion/react`) |
| Carousel | Embla + Autoplay |
| Icons | lucide-react (platform glyphs hand-rolled — see below) |
| Font | Plus Jakarta Sans via `next/font` (self-hosted, zero layout shift) |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Editing the site

**All copy and every number lives in one file: [`src/lib/content.ts`](src/lib/content.ts).**
Change it there — the components read from it. Nothing else needs touching for a
copy, stat, service, FAQ or testimonial update.

### Before you go live — three things

1. **Real contact details.** `site.email`, `site.phone`, `site.url` and
   `site.socials` in `content.ts` are placeholders.

2. **Real numbers.** Every metric tagged `placeholder: true` is *illustrative,
   not a verified client result*. Those render with a visible `Sample` badge (and
   the results section carries a disclaimer) so nothing unverified ships by
   accident. Replace the value, set `placeholder: false`, and the badge
   disappears.

3. **Real screenshots.** Drop image files into:

   | Folder | Used by | Referenced as |
   |---|---|---|
   | `public/proof/` | KPI / results section | `kpiCases[].image` |
   | `public/samples/` | Work samples grid | `workSamples[].image` |

   Any missing file falls back to a styled placeholder automatically, so the site
   never breaks on a missing asset. Suggested sizes: proof ≈ 1600×1000 (16:10),
   samples 1080×1080 (square), 1080×1680 (portrait) or 1600×1100 (landscape).

   **Redact patient names and identifiable details before uploading analytics
   exports**, and keep written consent on file for anything featuring a patient.

### The audit form

The form in the CTA section composes a pre-filled `mailto:` to `site.email`, so
it works the moment you deploy — no backend, and no silently dropped enquiries.
To collect submissions server-side instead, swap `handleSubmit` in
[`src/components/sections/audit.tsx`](src/components/sections/audit.tsx) for a
POST to Formspree / Resend / your CRM. The one-line change is documented in a
comment at the top of that file.

## Brand assets

`logo.jpg` is the source lockup. These were derived from it and are what the site
actually loads:

- `public/logo-full-alpha.png` — trimmed lockup, transparent background (header)
- `public/logo-mark-alpha.png` — the R mark alone (footer, dark surfaces)
- `public/icon.png` / `public/apple-icon.png` — favicons
- `public/og-image.png` — link-preview card

Brand colours are defined once as Tailwind tokens in
[`src/app/globals.css`](src/app/globals.css) (`--color-brand-*`, `--color-ink-*`),
sampled from the logo gradient.

> lucide-react v1 dropped brand icons, so Instagram / Facebook / YouTube /
> LinkedIn glyphs are hand-written SVGs in
> [`src/components/ui/platform-icons.tsx`](src/components/ui/platform-icons.tsx).

## Structure

```
src/
  app/          layout (metadata, JSON-LD, fonts), page, globals.css, robots, sitemap
  lib/
    content.ts  ← all copy and data
    utils.ts    cn() helper
  components/
    sections/   one file per page section, in page order
    ui/         primitives: Button, Card, Container, Reveal, Counter, Logo,
                SmartImage (screenshot fallback), analytics mock chart
```

## Notes

- **Responsive** from 360px up; verified at 390 / 768 / 1280 / 1600 with no
  horizontal overflow at any width.
- **Accessibility**: semantic landmarks, labelled tabs and accordions, visible
  focus rings, and every animation respects `prefers-reduced-motion`.
- **SEO**: Open Graph + Twitter cards, `ProfessionalService` JSON-LD, sitemap and
  robots generated from `site.url`.

## Deploy

Vercel picks this up with no configuration — import the repo and deploy. Set
`site.url` in `content.ts` to the production domain first so canonical URLs, the
sitemap and OG images resolve correctly.
