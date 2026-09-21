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
   samples 1080×1080 (every work card is square; other shapes are centre-cropped).

   **Redact patient names and identifiable details before uploading analytics
   exports**, and keep written consent on file for anything featuring a patient.

### The audit form

The form in the CTA section composes a pre-filled `mailto:` to `site.email`, so
it works the moment you deploy — no backend, and no silently dropped enquiries.
To collect submissions server-side instead, swap `handleSubmit` in
[`src/components/sections/audit.tsx`](src/components/sections/audit.tsx) for a
POST to Formspree / Resend / your CRM. The one-line change is documented in a
comment at the top of that file.

## Instagram live feed

The section under Work Samples pulls recent posts straight from Instagram. It
is **optional** — with no token configured the section simply does not render,
and nothing else on the page is affected.

### Requirements

- An Instagram **Business** or **Creator** account (a Personal account will not
  work — switch it in the Instagram app under Settings → Account type).
- A Meta app. A linked Facebook Page is *not* required with this flow.

> The old Instagram Basic Display API was shut down in December 2024. This uses
> the current *Instagram API with Instagram Login* (`graph.instagram.com`, v25.0,
> scope `instagram_business_basic`).

### Setup

1. Go to [developers.facebook.com/apps](https://developers.facebook.com/apps) →
   **Create app** → use case **Other** → type **Business**.
2. Add the **Instagram** product, then open **API setup with Instagram login**.
3. **Generate access token**, authorise your account, and copy the token. Tokens
   generated here are already long-lived (60 days).
4. Put it in `.env.local` (copy `.env.example` to start):

   ```bash
   INSTAGRAM_ACCESS_TOKEN=IGAA...
   CRON_SECRET=$(openssl rand -hex 32)
   ```

5. Restart the dev server. On Vercel, add both as Environment Variables and
   redeploy.

### Where the token lives

Two options; the environment variable wins if both are set.

| | `data/instagram-token.json` | `INSTAGRAM_ACCESS_TOKEN` env var |
|---|---|---|
| Committed to the repo | Yes | No |
| Auto-renewal | GitHub Action, fully hands-off | Vercel cron + Vercel API |
| Requires | **A private repository** | `VERCEL_API_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_DEPLOY_HOOK_URL` |

The repo-file route is the simpler of the two and is what this project is set
up for. **It depends on this repository staying private.** Put the token in
`data/instagram-token.json` and leave `expiresAt` / `refreshedAt` as `null` —
the first run fills them in.

> Make the repository private **before** committing a token. A token pushed to
> a public repo should be considered burned even if it was only exposed for a
> few minutes: credential scanners are fast, and git history keeps it. Generate
> a fresh one in that case.

### Automatic renewal

`.github/workflows/refresh-instagram-token.yml` runs on the **1st and 15th** of
each month (twice, so one failed run cannot let the token lapse). It:

1. Renews the token if fewer than 25 days remain — tokens last 60
2. Writes it to `data/instagram-token.json`
3. Commits and pushes, which triggers a Vercel deployment

Nothing to do by hand. The Action needs only `contents: write` and the built-in
`GITHUB_TOKEN`; no extra secrets.

Run it manually from the Actions tab (**Run workflow**, optionally ticking
*force*), or locally:

```bash
node scripts/refresh-instagram-token.mjs --dry-run   # call the API, change nothing
node scripts/refresh-instagram-token.mjs             # renew and write
```

The script never prints the token — logs show `IGAA_R…z789 (183 chars)`. It
skips when the token was refreshed under 24h ago (Meta rejects those) and
leaves the file untouched if Meta returns an error.

**If renewal fails repeatedly**, the Action fails loudly in the Actions tab.
Left unfixed past the 60-day mark the feed goes blank — the section hides
itself, so the rest of the page is unaffected. Recovery is to generate a fresh
token in the Meta App Dashboard and paste it into `data/instagram-token.json`.

### How it works

| Concern | Handling |
|---|---|
| Token safety | `src/lib/instagram.ts` imports `server-only`, so the build **fails** if it is ever reached from client code. The token never enters a browser bundle. |
| Rate limits | Posts are fetched with `revalidate: 3600`, so once an hour per deployment, well inside Meta's 200 calls/hour. |
| Expiring image URLs | Instagram CDN links are signed and expire; the hourly revalidate keeps them fresh. `next.config.ts` allows `**.cdninstagram.com` and `**.fbcdn.net`. |
| Failure | `getInstagramPosts` returns `null` on any error and never throws. The section renders nothing. |
| Videos / carousels | Videos use `thumbnail_url`; both are badged in the corner. Every tile links to the real post. |

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
