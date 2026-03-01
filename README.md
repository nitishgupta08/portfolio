# Portfolio

Personal portfolio application built with Next.js App Router, TypeScript, Firebase Firestore, and TanStack React Query. The app includes a content-driven home page, projects archive, blog system

## Features

- Homepage with hero, about, experience, projects, and contact sections.
- Dedicated `/listening` page with live Last.fm listening stats and charts.
- Blog listing page and individual blog post pages.
- Dedicated projects page with featured and archived project data.
- Firestore-backed content with local fallback mode via environment flag.

## Tech Stack

- Next.js 16.1.6 (App Router)
- React 19.2.4 + TypeScript
- Tailwind CSS v4 + shadcn/ui + Radix UI
- Firebase (Firestore, Storage, Firebase Admin SDK dependency present)
- TanStack React Query

## Prerequisites

- Node.js 20+
- npm
- Firebase project configured for Firestore (and Storage if media is used)

## Environment Variables

Create a local env file:

```bash
cp .env.example .env.local
```

Required variables for the Last.fm listening section:

- `LASTFM_API_KEY`: Last.fm API key from your Last.fm API account.
- `LASTFM_USERNAME`: Last.fm username to read recent tracks and top artists.

These keys are server-side only and should not be prefixed with `NEXT_PUBLIC_`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` starts the Next.js dev server with Turbopack.
- `npm run build` creates a production build.
- `npm run start` runs the production server.
- `npm run lint` runs ESLint against `src`.

## Deployment Notes

- This is a standard Next.js application and can be deployed on Netlify.
- Ensure all required environment variables in deployment match the local `.env.local` values.
- Keep `NEXT_PUBLIC_USE_FALLBACK_DATA` disabled in production unless you intentionally want static fallback content.

## License

No license specified.
