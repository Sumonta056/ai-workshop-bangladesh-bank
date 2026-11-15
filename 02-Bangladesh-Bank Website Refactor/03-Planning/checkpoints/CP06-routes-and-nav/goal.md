# CP06 — Routes and `useNav`: Goal

## Goal
Each prototype view (`home`, `mp`, `fin`, `pub`, `svc`) is a real, statically generated route (`/`, `/monetary-policy`, `/financial-system`, `/publications`, `/services`). `useNav()` returns the 8 primary-nav items in prototype order, with locale labels, a target route (or `null` for the 4 no-op items) and an `active` flag taken from the current URL.

## Why this checkpoint exists
The prototype keeps the view in memory (`state.view`, line 503) and switches it with `go(v)` (line 505). It has no URLs, so a page cannot be bookmarked, shared, indexed or opened in a new tab. CP07 needs the nav item list and the active state before it can draw the nav underline, and CP10 needs the route-to-view mapping before `InnerPage` can choose `L.pages[view]`. If routes are skipped now, those checkpoints would hard-code paths in templates, and `/services` would not be generated (the nav has no link to it, so the generator's link crawler never finds it).

## In scope
- `app/data/routes.ts`: `VIEW_ROUTES` (view key → path), `ROUTE_VIEWS` (path → view key) and `PRERENDER_ROUTES` (the 5 paths).
- `app/composables/useNav.ts`: `NAV_DEF` in prototype order (line 857) and the `useNav()` composable that returns `items: ComputedRef<NavItem[]>`.
- 5 page files under `app/pages/` with a temporary body (an `<h1>` with the page title from the locale). CP08–CP10 replace these bodies.
- `nuxt.config.ts`: `nitro.prerender.routes = PRERENDER_ROUTES` so that all 5 routes are written to `.output/public/`.
- Scroll to top on route change, which matches `window.scrollTo(0, 0)` in `go(v)` (line 505).
- Unit tests for the route map and `useNav`.

## Out of scope
- Drawing the nav bar, its colors and the underline (CP07, `layout/PrimaryNav.vue`). CP06 only provides the data (`active`, `to`).
- Section content of the home and inner pages (CP08, CP09, CP10).
- Routes for the 4 no-op nav items (`about`, `fx`, `gsec`, `pay`). They stay non-navigating (Risk R2).
- A custom 404 page and per-route `<title>` / meta tags (CP12).
- Language in the URL. The language switch never changes the URL (CP04, architecture rule).

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| None | — | CP06 prepares issue 1 (fixed in CP07). It provides real, linkable URLs and the `active` flag that CP07 turns into `aria-current="page"` and the green underline. |

## Depends on
CP04

## Demo at the end
- Terminal: `npm run generate`, then `ls .output/public/index.html .output/public/monetary-policy/index.html .output/public/financial-system/index.html .output/public/publications/index.html .output/public/services/index.html` lists 5 files.
- Browser: `npx serve .output/public`. Open each of the 5 URLs directly in a new tab. Each shows its temporary `<h1>` ("Monetary Policy", "Financial System & Stability", "Reports & Publications", "Services & Protection"; the home page shows "Bangladesh Bank"). Press browser Back and Forward between them. The `<h1>` follows the URL.
- Terminal: `npx vitest run tests/unit/routes.spec.ts tests/unit/useNav.spec.ts` is green. The test table shows that `/monetary-policy` marks only `mp` active and `/services` marks no item active.
