# nishit-shivdasani.github.io

Source for my portfolio, live at **https://nishit-shivdasani.github.io**.

Next.js 16 (App Router) + TypeScript, compiled to a static export and
published to GitHub Pages by GitHub Actions.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16, App Router, `output: "export"` |
| Language | TypeScript (strict) |
| Styling | Plain CSS — inline styles per element, `app/globals.css` for keyframes and hover states |
| Fonts | Space Grotesk + JetBrains Mono via `next/font/google` (self-hosted at build) |
| Hosting | GitHub Pages, deployed from `.github/workflows/deploy.yml` |

No server runtime. The build emits plain HTML/CSS/JS into `out/`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

Build and preview exactly what ships:

```bash
npm run build    # writes ./out
npm run serve    # serves ./out
```

## Layout

| Path | Purpose |
| --- | --- |
| `app/layout.tsx` | Metadata, fonts, schema.org Person JSON-LD |
| `app/page.tsx` | Section composition |
| `app/globals.css` | Base document styles, keyframes, `.hv-*` hover classes |
| `lib/resume.ts` | Identity facts for document metadata + JSON-LD |
| `lib/site.ts` | Outbound URLs and nav items |
| `components/site/` | One component per section; each owns its own copy |
| `components/site/tokens.ts` | Palette and shared style objects |
| `components/site/Effects.tsx` | Scroll progress, active nav, timeline draw, card tilt |
| `public/assets/` | Company and university logos |
| `public/` | Résumé PDF, `.nojekyll` |

The design is inline-style driven, so each section's copy and styling live in
its own component. Links live in `lib/site.ts`; colours in
`components/site/tokens.ts`.

## Deployment

Push to `main` → Actions builds and publishes. One-time repo setup:

**Settings → Pages → Build and deployment → Source: `GitHub Actions`**

Without that, Pages keeps serving the old branch-based site and the workflow's
deploy step fails.

## Custom domain

Not configured yet. When the domain is registered:

1. Create `public/CNAME` containing only the apex domain, e.g.:

   ```
   nishitshivdasani.com
   ```

   It must live in `public/` so the export copies it to `out/CNAME`.

2. At the DNS registrar, for the apex (`@`) record add four `A` records:

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   (and the matching `AAAA` records if IPv6 is wanted:
   `2606:50c0:8000::153`, `8001::153`, `8002::153`, `8003::153`)

3. For `www`, add a `CNAME` record pointing to `nishit-shivdasani.github.io`.

4. **Settings → Pages → Custom domain** — enter the domain, wait for the DNS
   check to pass, then tick **Enforce HTTPS**.

5. Update the hardcoded `siteUrl` in `app/layout.tsx`, `app/sitemap.ts`, and
   `app/robots.ts` to the new domain.

## Static export constraints

Deliberate trade-offs of `output: "export"`:

- No Server Actions, Route Handlers, middleware, or ISR.
- `next/image` runs with `unoptimized: true`; the page uses plain `<img>`.
- Metadata routes (`sitemap.ts`, `robots.ts`) must set
  `export const dynamic = "force-static"`.
