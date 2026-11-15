# Doctor-Patient Management System — Plan

## Context
Build a modern doctor-patient management system as a Next.js app with SQLite, Ant Design + Tailwind, 6 screens, collapsible sidebar, dark/light mode, and seed data. Default credentials for easy access.

## Tech Stack
- **Next.js 16.x** (App Router, TypeScript, Turbopack)
- **Ant Design 6.x** + **Tailwind CSS 4.x** (UI)
- **Prisma 7.x + SQLite** (database) — via `@prisma/adapter-libsql`
- **recharts 3.x** (dashboard charts)
- **Cookie-based auth** (simple, no JWT)

## Critical: Prisma 7 + SQLite Setup (Resolved via Context7)

Prisma 7 introduced **breaking changes** from Prisma 5/6. Do NOT follow older tutorials.

### Key differences from Prisma 5/6:
1. **Driver adapters are mandatory.** `PrismaClient()` with no args will fail. SQLite requires `@prisma/adapter-libsql` + `@libsql/client`.
2. **Config lives in `prisma.config.ts`**, not `package.json`. The seed command, datasource URL, and migration path are all configured there.
3. **Schema has no `url` in datasource block.** The URL comes from `prisma.config.ts` → `datasource.url` (reads from `process.env.DATABASE_URL`).
4. **Generated client output** defaults to `src/generated/prisma/` and uses ESM. Import from `@/generated/prisma/client` (in app code) or `../src/generated/prisma/client.js` (in seed script).
5. **`@prisma/adapter-sqlite`** is referenced in Prisma docs but **not yet published on npm**. Use `@prisma/adapter-libsql` with `PrismaLibSql` instead (note: capital L, lowercase sql).
6. **`@prisma/adapter-better-sqlite3`** exists but requires native compilation (`better-sqlite3` binary). This can fail in some environments. `@prisma/adapter-libsql` is pure JS and more reliable.
7. **`dev.db` is created in the project root**, not inside `prisma/`. The `.env` value `file:./dev.db` is relative to project root.

### Correct dependency installation:
```bash
pnpm add prisma@latest @prisma/client@latest @prisma/adapter-libsql @libsql/client dotenv
pnpm add -D tsx
pnpm add @ant-design/icons   # NOT bundled with antd 6.x — must install separately
pnpm approve-builds prisma @prisma/engines   # Required for pnpm — native engines need build permission
```

### Correct `prisma.config.ts`:
```ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",   // seed command goes HERE, not package.json
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

### Correct PrismaClient instantiation (lib/prisma.ts):
```ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! });
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
```

### Correct seed file pattern (prisma/seed.ts):
```ts
import "dotenv/config";   // MUST import — Prisma 7 does NOT auto-load .env in seed scripts
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
```

### Common pitfalls that will waste time:
- `PrismaLibSQL` (all caps SQL) → wrong. The export is `PrismaLibSql`.
- `new PrismaLibSql(libsqlClient)` passing a libsql client instance → wrong for Prisma 7. Pass `{ url: "..." }` object directly.
- `new PrismaClient({ datasourceUrl: "..." })` → removed in Prisma 7. Use adapter pattern.
- Forgetting `pnpm approve-builds` → Prisma engines won't install, client generation fails silently.
- Forgetting `import "dotenv/config"` in seed.ts → `DATABASE_URL` is undefined at runtime.

## Database Schema (Prisma + SQLite)
- **User**: id, email, password (plain text), name, role
- **Doctor**: id, name, email, specialization, phone, status, avatar
- **Patient**: id, name, email, phone, dateOfBirth, gender, address, bloodGroup
- **Appointment**: id, doctorId, patientId, date, status, notes

## Folder Structure
```
src/
├── app/
│   ├── layout.tsx                    # AntdRegistry + ThemeProvider
│   ├── page.tsx                      # Redirect to /login or /dashboard
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── (authenticated)/
│   │   ├── layout.tsx                # Collapsible sidebar + header
│   │   ├── dashboard/page.tsx        # Stats cards + charts + recent table
│   │   ├── doctors/page.tsx          # Table + search + add/edit modal
│   │   ├── patients/page.tsx         # Table + search + add/edit modal
│   │   └── settings/page.tsx         # Theme toggle + profile + system info
│   └── api/
│       ├── auth/{login,signup,logout}/route.ts
│       ├── doctors/route.ts
│       ├── patients/route.ts
│       └── stats/route.ts
├── components/
│   ├── Sidebar.tsx
│   ├── AppHeader.tsx
│   ├── StatsCard.tsx
│   └── charts/ (AppointmentsChart, PatientGrowthChart)
├── lib/
│   ├── prisma.ts                     # Singleton client
│   ├── auth.ts                       # Cookie session helpers
│   └── theme.tsx                     # ThemeContext (Ant dark algorithm + Tailwind dark class + localStorage)
├── middleware.ts                      # Auth redirect guard
prisma/
├── schema.prisma
├── seed.ts                            # 1 user, 8 doctors, 20 patients, 30 appointments
dev.db                                   # SQLite database file — lives in PROJECT ROOT, not prisma/
```

## Screens

### 1. Login
- Centered card, email + password, "Remember me"
- Default: `admin@clinic.com` / `password123`
- Link to signup

### 2. Signup
- Centered card, name + email + password + confirm
- Creates User, redirects to login

### 3. Dashboard
- 4 stat cards: Total Patients, Total Doctors, Today's Appointments, Revenue (mock)
- Line chart: appointments over last 7 days
- Bar chart: patients by department
- Recent appointments table (last 5)

### 4. Doctors List
- Ant Design Table with search filter
- Columns: Name, Specialization, Phone, Status (colored Tag), Actions
- Add/Edit via Modal, Delete with confirmation

### 5. Patients List
- Same pattern as doctors
- Columns: Name, Email, Phone, Gender, Blood Group, Actions

### 6. Settings
- **Appearance**: Dark/Light mode switch
- **Profile**: Display + edit current user name
- **System**: App version, DB info (read-only)

## Auth
- Cookie named `session` with JSON user payload, httpOnly, 7-day expiry
- `middleware.ts` redirects unauthenticated to `/login`, authenticated away from auth pages

## Theme/Dark Mode
- React context wrapping Ant Design `ConfigProvider` with `darkAlgorithm`/`defaultAlgorithm`
- Tailwind `darkMode: "class"` synced via `.dark` on `<html>`
- Persisted in `localStorage`

## Seed Data
- 1 admin user (hardcoded credentials)
- 8 doctors across specializations
- 20 patients with varied demographics
- 30 appointments across past 14 days + next 7 days
- Idempotent via `upsert`

## Implementation Order
1. `pnpm create next-app@latest` + install deps + configure Tailwind
2. Prisma schema + migrate + seed
3. `lib/prisma.ts`, `lib/auth.ts`, `lib/theme.tsx`
4. `middleware.ts`
5. Root layout (AntdRegistry + ThemeProvider)
6. Login + Signup pages + API routes
7. Authenticated layout (collapsible sidebar + header)
8. Dashboard + stats API + charts
9. Doctors page + API
10. Patients page + API
11. Settings page

## Verification
1. `pnpm approve-builds prisma @prisma/engines` — approve native engine builds (pnpm only)
2. `pnpm install` — ensure engines are compiled
3. `npx prisma migrate dev --name init` — DB created at `./dev.db` (project root)
4. `npx prisma generate` — generates client to `src/generated/prisma/`
5. `npx prisma db seed` — seed data populated (1 user, 8 doctors, 20 patients, 30 appointments)
6. `pnpm dev` — app starts on localhost:3000
7. Login with `admin@clinic.com` / `password123`
8. Verify all 6 screens render with data
9. Toggle dark mode in settings, confirm persistence
10. Collapse/expand sidebar
