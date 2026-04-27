# Bethel Casa de Dios — Church Website

A bilingual (English / Spanish) landing site for Bethel Casa de Dios, built with
Next.js 16 (App Router), React 19, Tailwind CSS 4, and `next-intl`.

Pages: home, about, ministries, events, visit, give, prayer, contact.

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Available scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Environment variables

Copy `.env.example` to `.env.local` and fill in your values. `.env.local` is
git-ignored and must never be committed.

```bash
cp .env.example .env.local
```

| Variable      | Used by                                                      |
| ------------- | ------------------------------------------------------------ |
| `GCP_API_KEY` | Google Cloud API key for the Stitch MCP server (`.mcp.json`) |

## Project layout

- `app/` — App Router pages, components, and server actions
- `i18n/` — `next-intl` request configuration
- `messages/` — `en.json`, `es.json` translation catalogs
- `docs/design-system/` — UI design system reference
- `public/` — static assets
