# Agents.md

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Build & Development Commands

- `pnpm dev` — start Next.js dev server
- `pnpm build` — production build
- `pnpm lint` — run ESLint
- `pnpm exec prisma generate` — regenerate Prisma client (after schema changes)
- `pnpm exec prisma migrate dev` — run database migrations
- `pnpm exec prisma db seed` — seed database with sample data

No test framework is configured.

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Prisma 7** ORM with SQLite via libSQL adapter
- **Ant Design 6** component library
- **Tailwind CSS 4** for styling
- **Recharts 3** for data visualization
- **pnpm** package manager

## Architecture

This is a clinic management system (doctors, patients, appointments).

**Routing**: Next.js App Router with folder-based routing in `src/app/`. Protected pages live under `src/app/(authenticated)/` route group. Public pages: `/login`, `/signup`.

**API routes**: RESTful JSON endpoints in `src/app/api/` — `auth/login`, `auth/signup`, `auth/logout`, `doctors`, `patients`, `stats`. Each handles GET/POST/PUT/DELETE in a single `route.ts`.

**Auth**: Cookie-based sessions. Middleware (`src/middleware.ts`) checks for a `session` cookie and redirects unauthenticated users to `/login`. Session helpers in `src/lib/auth.ts`. Passwords are stored in plaintext (workshop demo, not production).

**Database**: SQLite file at `prisma/dev.db`. Schema in `prisma/schema.prisma` with four models: User, Doctor, Patient, Appointment. Prisma client is generated to `src/generated/prisma/` and accessed via singleton in `src/lib/prisma.ts`.

**Data fetching**: Client-side `fetch()` in `useEffect` hooks — no server components for data loading.

**Theming**: Custom `ThemeProvider` context (`src/lib/theme.tsx`) toggles Ant Design light/dark algorithms and persists to localStorage.

## Path Alias

`@/*` maps to `src/*` (configured in tsconfig.json).

## Environment

Only variable: `DATABASE_URL="file:./dev.db"` in `.env`.

## Seed Credentials

Login: `admin@clinic.com` / `password123`
