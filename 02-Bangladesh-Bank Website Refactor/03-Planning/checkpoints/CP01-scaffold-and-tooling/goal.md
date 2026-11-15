# CP01 — Scaffold and tooling baseline: Goal

## Goal
The Nuxt 4 project in `Bangladesh Bank New Website/` builds to static HTML with `npm run generate`, and `npm run lint`, `npm run typecheck` and `npm run test` all exit 0.

## Why this checkpoint exists
Every later checkpoint ends on the same loop: Build → Validate → Unit test → Visual QA → Commit. Today `package.json` has only `nuxt`, `vue` and `vue-router`. It has no ESLint, no type-check script and no Vitest, so steps 2 and 3 of the loop cannot run. If we skip this checkpoint, the first real component (CP02 onward) is written with no safety net. Also, the project's `.claude/` files point at a design folder that does not exist (`../01-Bangldesh-Bank-Refactor-Design/`), so every porting agent would read a missing file.

## In scope
- Confirm the SSG settings in `nuxt.config.ts`: `ssr: true`, `nitro: { preset: 'static' }`, `srcDir` default `app/` (Nuxt 4).
- Turn on TypeScript strict mode explicitly: `typescript: { strict: true }`.
- Add dev dependencies for lint, type check and unit tests (each one vetted first with the `vet-before-install` skill, then approved by the user).
- Add `eslint.config.mjs`, `vitest.config.ts`, `.nvmrc` and the npm scripts `lint`, `typecheck`, `test`.
- Add one smoke unit test that guards the static-only rule and the "no design-tool syntax" rule (R3).
- Fix the stale design path in `CLAUDE.md`, `.claude/agents/*.md` and `.claude/skills/port-section/SKILL.md` to `../02-Design/`.

## Out of scope
- Design tokens and base CSS (CP02).
- Locale types and dictionaries (CP03).
- Any visible UI work, components or pages (CP05 onward).
- CI pipeline (CP12).
- Rewriting the draft code that already exists in `app/` (from commit `456fe5e`). CP01 only requires that it passes lint, type check and build. Each later checkpoint verifies or rewrites its own files.

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| None | — | CP01 is tooling only. It fixes no audit issue directly; it makes the gates that prove every later fix. |

## Depends on
none

## Demo at the end
In a terminal inside `Bangladesh Bank New Website/`:
1. `npm run generate` prints a success line and `.output/public/index.html` exists.
2. `npm run lint`, `npm run typecheck` and `npm run test` each exit 0 (Vitest shows `tests/unit/smoke.spec.ts` green).
3. `npx serve .output/public` serves `http://localhost:3000/`, and the Chrome DevTools console shows 0 errors.
