# LinkFlow

LinkFlow is a modern productivity tracking app for remote workers who review tickets, links, and tasks during focused work sessions.

## Stack

- Next.js 16 App Router with TypeScript
- TailwindCSS 4 with shadcn-style UI primitives
- Clerk authentication with Google sign-in
- Supabase PostgreSQL
- Recharts analytics
- Framer Motion animations
- next-themes dark mode
- Vercel-ready deployment

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create `.env.local` from `.env.example` and fill in Clerk and Supabase values.

3. In Clerk, enable Google as a social connection. Set the fallback redirect URLs to `/dashboard`.

4. In Supabase, run the SQL in `supabase/schema.sql`.

5. Start development:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Environment Variables

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Supabase

The schema creates:

- `users`
- `work_sessions`
- `hourly_stats`
- `achievements`

Server actions use the Supabase service role key, so keep it server-only and never expose it with `NEXT_PUBLIC_`.

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the same environment variables from `.env.example`.
4. Deploy.

Next.js 16 uses Turbopack by default for `next dev` and `next build`; no extra flags are required.
