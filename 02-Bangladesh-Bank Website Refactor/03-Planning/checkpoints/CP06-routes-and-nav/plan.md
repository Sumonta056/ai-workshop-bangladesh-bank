# CP06 — Routes and `useNav`: Plan

## Files to create or change
All paths are relative to `Bangladesh Bank New Website/`.

| File | Action | Responsibility |
|------|--------|----------------|
| `app/data/routes.ts` | Create | `ViewKey = 'home' \| InnerPageKey`, `VIEW_ROUTES`, `ROUTE_VIEWS`, `PRERENDER_ROUTES` |
| `app/composables/useNav.ts` | Create | `NAV_DEF` (8 entries, prototype order), `NavItem` type, `useNav()` |
| `app/pages/index.vue` | Create | Home route. Temporary body: `<h1>{{ L.bankName }}</h1>` |
| `app/pages/monetary-policy.vue` | Create | `mp` route. Temporary body: `<h1>{{ L.pages.mp.title }}</h1>` |
| `app/pages/financial-system.vue` | Create | `fin` route. Temporary body: `<h1>{{ L.pages.fin.title }}</h1>` |
| `app/pages/publications.vue` | Create | `pub` route. Temporary body: `<h1>{{ L.pages.pub.title }}</h1>` |
| `app/pages/services.vue` | Create | `svc` route. Temporary body: `<h1>{{ L.pages.svc.title }}</h1>` |
| `app/app.vue` | Change (if CP01 left a placeholder) | Exactly `<NuxtLayout><NuxtPage /></NuxtLayout>` |
| `app/layouts/default.vue` | Create (if CP01 did not) | Temporary `<slot />` only. CP07 fills the chrome |
| `nuxt.config.ts` | Change | `nitro.prerender.routes` from `PRERENDER_ROUTES` |
| `tests/unit/routes.spec.ts` | Create | Map completeness and inverse-map tests |
| `tests/unit/useNav.spec.ts` | Create | Order, labels, `to`, `active` for each route and both languages |

## Steps
1. Create `app/data/routes.ts`. Export `type ViewKey = 'home' | InnerPageKey` (with `InnerPageKey` from `~/i18n/types`, CP03) and:
   ```ts
   export const VIEW_ROUTES: Record<ViewKey, string> = {
     home: '/', mp: '/monetary-policy', fin: '/financial-system', pub: '/publications', svc: '/services',
   }
   ```
   Derive `ROUTE_VIEWS` (path → key) with `Object.fromEntries` and `PRERENDER_ROUTES = Object.values(VIEW_ROUTES)`. The path names are fixed in the master plan and `CLAUDE.md` ("Real routes per view").
2. Create `app/composables/useNav.ts`. Define and export `NAV_DEF` (the test imports it) as an array of 8 `{ key, to }` entries in the order of line 857: `home → '/'`, `about → null`, `mp → '/monetary-policy'`, `fin → '/financial-system'`, `fx → null`, `gsec → null`, `pay → null`, `pub → '/publications'`. Every non-null `to` comes from `VIEW_ROUTES`, not from a string literal. `svc` is not in the nav, which matches the prototype.
3. In the same file, export `interface NavItem { key: keyof NavLabels; label: string; to: string | null; active: boolean }` and `useNav()`. It reads `L` from `useLocale()` (CP04) and `useRoute()`, and returns `{ items }`, where `items` is a `computed` that maps `NAV_DEF` to `NavItem`:
   - `label = L.value.nav[key]` (line 861: `L.nav[k]`)
   - `active = to !== null && withoutTrailingSlash(route.path) === to`, or `route.path === '/'` for `home`. `withoutTrailingSlash` comes from `ufo`, which is already a Nuxt dependency, so nothing new is installed.
   This reproduces `activeKey` (line 858): `home`, `mp`, `fin` and `pub` can be active; `svc` maps to `null`, so no item is active on `/services`.
4. Create the 5 page files. Each page is one `<template>` with one temporary `<h1>` (table above) and a `<script setup lang="ts">` that reads `L` from `useLocale()`. Add no styles. These bodies are placeholders that CP08 (home) and CP10 (`<InnerPage view="…" />`) replace.
5. Make sure `app/app.vue` is exactly `<template><NuxtLayout><NuxtPage /></NuxtLayout></template>` and that `app/layouts/default.vue` exists with only `<slot />`.
6. Edit `nuxt.config.ts`. Import `PRERENDER_ROUTES` with a relative path and add it to the Nitro config:
   ```ts
   import { PRERENDER_ROUTES } from './app/data/routes'
   nitro: { preset: 'static', prerender: { routes: PRERENDER_ROUTES, crawlLinks: true } },
   ```
   `routes.ts` uses only `import type` from `~/i18n/types`. That import is erased at build time, so the `~` alias is not needed when `nuxt.config.ts` loads.
7. Keep Nuxt's default router scroll behavior. It scrolls to the top on a path change, which matches `window.scrollTo(0, 0)` in `go(v)` (line 505). Do not add `app/router.options.ts`.
8. Write `tests/unit/routes.spec.ts` and `tests/unit/useNav.spec.ts` (cases in `test-criteria.md`). In `useNav.spec.ts`, mock `useRoute` with `mockNuxtImport('useRoute', …)` from `@nuxt/test-utils/runtime` (Vitest `environment: 'nuxt'` from CP01). For the language cases, call `useLocale().setLang('bn')`.
9. Run `npm run generate`. Check that the 5 `index.html` files exist (demo in `goal.md`).
10. Run `npx nuxi typecheck`, `npx eslint .` and `npx vitest run`. Then do the browser check in `test-criteria.md`.
11. Commit after explicit approval: `git commit -m "feat(cp06): static routes and useNav"`.

## Design source
- `02-Design/Bangladesh Bank.html` line **503**: `state = { view: 'home', lang: 'en' }`, the view state that routes replace.
- Lines **505–510**: `go(v)` with `window.scrollTo(0, 0)`, and `setHome`/`setMP`/`setFin`/`setPub`/`setSvc` (5 views → 5 routes).
- Line **513**: `noop`, the 4 no-op nav targets.
- Lines **548** (en) and **703** (bn): `nav` labels for the 8 keys.
- Lines **857–863**: `navDef` order, `activeKey` rule (`svc → null`) and the active and inactive values that CP07 renders (`#006A4E` / `#3a4a5e`, underline `#006A4E` / `transparent`).
- Lines **68–74**: the nav markup that consumes this data (rendered in CP07).

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Route paths | `/`, `/monetary-policy`, `/financial-system`, `/publications`, `/services` | Fixed in the master plan and `CLAUDE.md`. Readable English slugs; the language stays out of the URL |
| No-op nav items | `to: null`, rendered non-navigating with `aria-disabled="true"` in CP07 | Risk R2: faithful to `this.noop`, no invented pages |
| Active detection | Compare the normalized `route.path` with `to` | One source of truth (the URL). Survives reload, deep link and Back/Forward, which a separate `view` state would not |
| Trailing slash | Strip with `withoutTrailingSlash` (from `ufo`) before comparing | Static hosts can serve `/monetary-policy/`. Without normalization the underline would disappear on such hosts |
| Prerender list | Explicit `nitro.prerender.routes` from `PRERENDER_ROUTES`, plus `crawlLinks: true` | `/services` has no nav link (it is reached only from service cards in CP09), so the crawler alone would skip it. Deriving the list from `VIEW_ROUTES` keeps one source |
| Where the route map lives | `app/data/routes.ts` (imported explicitly) | Architecture rule: static config in `data/`, imported by hand. `useNav` and CP10's `InnerPage` both read it |
| Scroll on navigation | Nuxt default `scrollBehavior` | Same result as line 505. No custom code to maintain |

## Risks
| Risk | Mitigation |
|------|------------|
| `nuxt.config.ts` cannot resolve `~/i18n/types` when it imports `routes.ts` | `routes.ts` uses `import type` only, so the import is erased. If `nuxi generate` still fails, move `ViewKey` into `routes.ts` and keep the relative import |
| `useRoute` is not available in unit tests | Use `mockNuxtImport` from `@nuxt/test-utils` (CP01 test setup). If CP01 set up plain Vitest without it, stop and raise it before you continue. Do not install it inside CP06 without the licence and security check |
| The language resets on navigation | `useLocale` keeps `lang` in `useState('bb-lang')` (CP04). The browser check in `test-criteria.md` switches to `bn` and then changes route |
| The temporary `<h1>` bodies are forgotten | CP08 and CP10 test criteria check that the page renders their components. `grep -n "<h1>{{ L.pages" app/pages` returns nothing after CP10 |
| Someone adds a sixth view later and the nav or prerender list drifts | `routes.spec.ts` asserts that `PRERENDER_ROUTES` has the same length as `VIEW_ROUTES` and that every non-null `NAV_DEF.to` is a value of `VIEW_ROUTES` |

## Estimated effort
3 hours (1 h routes and pages, 1 h `useNav`, 1 h tests and generate check)
