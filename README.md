# Krypton AI - SaaS Platform

This is a monorepo for the Krypton AI SaaS platform, built with Next.js 14 (App Router) and Firebase.

## Architecture

- `apps/landing`: The public landing page with pricing and checkout integration.
- `apps/client`: The client dashboard for managing AI agents and subscriptions.
- `apps/admin`: The admin dashboard for viewing revenue and client statistics.
- `packages/ui`: Shared UI components.
- `packages/firebase`: Shared Firebase configuration and auth helpers.
- `packages/fiko`: Shared Fiko Pay API helpers.
- `functions`: Firebase Cloud Functions for webhooks and cron jobs.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` in each app and fill in your Firebase credentials.

3. Run the development servers:

   ```bash
   # Run landing page (port 3000)
   npm run dev --workspace=apps/landing

   # Run client dashboard (port 3001)
   npm run dev --workspace=apps/client

   # Run admin dashboard (port 3002)
   npm run dev --workspace=apps/admin
   ```

## Deployment

This monorepo is ready to be deployed on Vercel. You can deploy each app separately by specifying the root directory in the Vercel project settings.
