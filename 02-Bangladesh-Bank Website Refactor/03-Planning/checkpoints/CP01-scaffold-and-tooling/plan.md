# CP01 — Scaffold and tooling baseline: Plan

All paths are relative to `Bangladesh Bank New Website/` unless they start with `../`.

## Files to create or change
| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Change | Add `devDependencies` (vetted list below) and scripts `"lint": "eslint ."`, `"typecheck": "nuxi typecheck"`, `"test": "vitest run"`. Keep `generate`, `dev`, `build`, `preview`, `postinstall`. |
| `package-lock.json` | Change (by npm) | Lock the exact approved versions. |
| `nuxt.config.ts` | Change | Add `modules: ['@nuxt/eslint', '@nuxt/test-utils/module']` and `typescript: { strict: true }`. Keep `ssr: true`, `nitro: { preset: 'static' }`, `css`, `app.head` as they are. |
| `eslint.config.mjs` | Create | Flat config from the Nuxt ESLint module. |
| `vitest.config.ts` | Create | Vitest with the Nuxt test environment. |
| `.nvmrc` | Create | Pin Node `22`. |
| `tests/unit/smoke.spec.ts` | Create | Static-only and port-check guard (see `test-criteria.md`). |
| `CLAUDE.md` | Change | Replace `../01-Bangldesh-Bank-Refactor-Design/` with `../02-Design/` (3 lines). |
| `.claude/agents/section-porter.md` | Change | Same path fix (line 14). |
| `.claude/agents/design-fidelity-reviewer.md` | Change | Same path fix (line 9). |
| `.claude/skills/port-section/SKILL.md` | Change | Same path fix (line 9). |

Dev dependencies to vet (licence + security) before install:

| Package | Purpose |
|---------|---------|
| `vitest` | Unit test runner |
| `@vue/test-utils` | Mount Vue components in tests |
| `@nuxt/test-utils` | `environment: 'nuxt'`, `mountSuspended` |
| `happy-dom` | DOM for the Nuxt test environment |
| `@nuxt/eslint` | Nuxt flat ESLint config module |
| `eslint` | Linter |
| `vue-tsc` | Type checker used by `nuxi typecheck` |
| `typescript` | Compiler for `vue-tsc` |
| `serve` | Static file server for Visual QA (`npx serve .output/public`) |

## Steps
1. Run `node -v` and confirm Node ≥ 20.19 (Nuxt 4 minimum). Create `.nvmrc` with the single line `22`.
2. Load the `vet-before-install` skill for the 9 packages above. Show the licence and security report. Stop and wait for the user's approval.
3. After approval, run `npm install -D vitest @vue/test-utils @nuxt/test-utils happy-dom @nuxt/eslint eslint vue-tsc typescript` with the approved versions.
4. Edit `nuxt.config.ts`: add the `modules` and `typescript` keys shown in "Decisions". Do not change any other key.
5. Run `npx nuxi prepare` so that `.nuxt/eslint.config.mjs` is generated.
6. Create `eslint.config.mjs`:
   ```js
   import withNuxt from './.nuxt/eslint.config.mjs'
   export default withNuxt()
   ```
7. Create `vitest.config.ts`:
   ```ts
   import { defineVitestConfig } from '@nuxt/test-utils/config'
   export default defineVitestConfig({ test: { environment: 'nuxt', include: ['tests/unit/**/*.spec.ts'] } })
   ```
8. Add the 3 scripts to `package.json`: `lint`, `typecheck`, `test`.
9. Create `tests/unit/smoke.spec.ts` with the 4 tests listed in `test-criteria.md` → "Unit tests". No comments in the file (user rule).
10. Replace `../01-Bangldesh-Bank-Refactor-Design/` with `../02-Design/` in `CLAUDE.md`, `.claude/agents/section-porter.md`, `.claude/agents/design-fidelity-reviewer.md` and `.claude/skills/port-section/SKILL.md`. Confirm with `grep -rn "01-Bangldesh-Bank-Refactor-Design" .` → 0 lines.
11. Run `npm run lint -- --fix`, then `npm run lint`. Fix any remaining errors by hand in the file that reports them.
12. Run `npm run typecheck`. Fix every error.
13. Run `npm run test`. All tests green.
14. Run `npm run generate`. Confirm `.output/public/index.html` exists and `.output/server/` does not.
15. Run `npx serve .output/public`, open `http://localhost:3000/` in a new Chrome DevTools MCP tab, and run the Visual QA list.
16. Ask the user for approval, then commit (`chore(cp01): scaffold and tooling baseline`).

## Design source
`02-Design/Bangladesh Bank.html` lines 4–5 (charset and viewport meta) and lines 11–15 (Inter from `https://rsms.me/inter/inter.css`, JetBrains Mono 400/500/700 from Google Fonts). `nuxt.config.ts` → `app.head` already mirrors these lines; CP01 only verifies them. No markup is ported in CP01.

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Lint setup | `@nuxt/eslint` module + `withNuxt()` flat config | Official Nuxt 4 path; knows about auto-imports, so no false "undefined" errors for `useState`, `computed`, components. |
| Test environment | `@nuxt/test-utils` with `environment: 'nuxt'` and `happy-dom` | Composables such as `useState` (CP04) need the Nuxt runtime in tests. |
| Type check | `nuxi typecheck` (uses `vue-tsc`) | Checks `.vue` and `.ts` together with the generated Nuxt types. |
| Strict TS | `typescript: { strict: true }` written explicitly | Nuxt 4 default is strict, but writing it down makes the rule visible and stops a silent change. |
| Node version | `.nvmrc` = `22` | Current LTS line; above the Nuxt 4 minimum. |
| Test folder | `tests/unit/` at project root, outside `app/` | Keeps test files out of the auto-import scan and out of the static output. |
| Existing draft in `app/` | Keep it. CP01 only requires it to pass lint, type check and build. | No destructive deletes. Each later CP verifies or rewrites its own files against its own test criteria. |
| Static server for QA | `npx serve .output/public` (as in master plan Section 7) | Serves the real generated files, not the dev server. |

## Risks
| Risk | Mitigation |
|------|------------|
| The draft files in `app/` fail lint or type check | Run `npm run lint -- --fix` first. Fix the rest in place, one file at a time. Do not disable rules globally. |
| A package fails the licence or security vet | Stop. Report the finding to the user and propose an alternative (for example `jsdom` instead of `happy-dom`). |
| `@nuxt/test-utils` version does not match Nuxt `^4.4.8` | Pick the version whose peer range includes Nuxt 4 during the vet step. Re-run `npm run test`. |
| Someone ports `support.js` / `image-slot.js` code or design-tool syntax (R3) | `tests/unit/smoke.spec.ts` fails if `app/**` contains `sc-for`, `sc-if`, `style-hover`, `hint-placeholder-` or `onClick="{{`. The `check-port.mjs` hook also flags it on every edit. |
| A server route is added by mistake (breaks SSG-only rule) | Smoke test fails if `server/` or `app/server/` exists. |

## Estimated effort
3 hours (1 h of it is the vet-and-approve step).
