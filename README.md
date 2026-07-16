# Chinook Overlander

A world-class creator website documenting the rebuild of a rare **1978 Toyota Chinook** camper on a modern **80 Series LandCruiser** chassis with a **6.0-litre V8** — engineered for remote Australian travel.

Vintage on the outside, modern engineering underneath — and a website built to match.

## Stack

- **Next.js 16** (App Router, TypeScript, strict)
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **GSAP + ScrollTrigger + Lenis** for motion & smooth scroll
- **Sanity** (embedded Studio at `/studio`) with a typed GROQ content layer
- **YouTube Data API v3** (cached) for the video hub
- Provider-agnostic **newsletter** + **partnership enquiry** API routes

## Running locally

```bash
npm install
cp .env.example .env.local   # optional — the site runs without any env vars
npm run dev                  # http://localhost:3000
```

With **no environment variables**, the site runs fully on typed seed content
(`lib/content/*`) and curated feeds, so you can develop and preview everything
immediately. As you connect services, real data takes over automatically.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |

## Content

The content layer lives in `lib/content/`. Every getter is async and reads from
**Sanity when configured**, otherwise from **seed content**. This makes the CMS
a drop-in upgrade with zero page rewrites.

- **Seed content:** `lib/content/*.ts` (build systems, journal, partners, gear, videos, milestones, shop)
- **Sanity schemas:** `sanity/schemas/*` (full model, mirrors `lib/types.ts`)
- **GROQ queries:** `sanity/lib/queries.ts`
- **Studio:** `/studio` (activates once `NEXT_PUBLIC_SANITY_PROJECT_ID` is set)

### Connecting Sanity

1. Create a project at [sanity.io](https://sanity.io) and note the project ID.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (and `NEXT_PUBLIC_SANITY_DATASET`) in `.env.local`.
3. Visit `/studio` to manage content. Add your project ID to the Studio's CORS origins.

### Connecting YouTube

Set `YOUTUBE_API_KEY` and `YOUTUBE_CHANNEL_ID`. The latest uploads are fetched
server-side and cached for one hour. Seed videos in `lib/content/videos.ts` act
as fallback and as override (featured / hidden / episode number).

### Newsletter

`lib/email.ts` is a provider adapter. Set `EMAIL_PROVIDER=convertkit` (plus the
ConvertKit keys) or add another provider case. Default `dev` logs subscribers.

## Project structure

```
app/
  (site)/        # public pages (share Nav/Footer/motion chrome)
  studio/        # embedded Sanity Studio (full-screen, no chrome)
  api/           # subscribe + enquiry routes
  sitemap.ts, robots.ts, layout.tsx, globals.css
components/      # anim, cards, home, layout, forms, ui, vehicle, social, seo
lib/             # content layer, types, youtube, email, affiliate, site config
sanity/          # schemas, client, queries, image, env
public/vehicle/  # illustrated Chinook render + placeholder
```

## Design system

Tokens are defined once in `app/globals.css` (`@theme`): a charcoal / sand /
rust palette with a workshop-orange accent, and three type roles — display
(Oswald), editorial (Newsreader) and mono (JetBrains Mono). All motion respects
`prefers-reduced-motion`.

## Deployment

Optimised for **Vercel**. Push the repo, import it, and set any environment
variables from `.env.example`. The build is fully static/ISR where possible.

## Notes & disclaimers

Technical content documents one specific project and is not engineering advice.
Vehicle modifications and 240V work must comply with local laws and be signed
off by qualified professionals. See `/terms` and `/affiliate-disclosure`.
