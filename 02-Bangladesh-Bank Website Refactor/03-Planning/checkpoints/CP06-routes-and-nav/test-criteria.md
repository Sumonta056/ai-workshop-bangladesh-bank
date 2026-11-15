# CP06 — Routes and `useNav`: Test Criteria

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors (`npx nuxi typecheck` and `npx eslint .` both exit 0)
- [ ] `.output/public/` contains exactly these 5 route files: `index.html`, `monetary-policy/index.html`, `financial-system/index.html`, `publications/index.html`, `services/index.html`
- [ ] `grep -c "<h1" .output/public/services/index.html` returns `1` (the route was pre-rendered, not left as an empty SPA shell)
- [ ] `ls app/server server 2>/dev/null` returns nothing (no server routes)

## Unit tests (Vitest)
| Test | Input | Expected result |
|------|-------|-----------------|
| `routes.spec` map | `VIEW_ROUTES` | `{ home: '/', mp: '/monetary-policy', fin: '/financial-system', pub: '/publications', svc: '/services' }` |
| `routes.spec` inverse | `ROUTE_VIEWS['/financial-system']` | `'fin'`; for each of the 5 entries, `ROUTE_VIEWS[VIEW_ROUTES[k]] === k` |
| `routes.spec` prerender | `PRERENDER_ROUTES` | Length 5, same set as `Object.values(VIEW_ROUTES)` |
| `routes.spec` nav targets | Every `NAV_DEF[i].to` that is not `null` | Is one of `Object.values(VIEW_ROUTES)` |
| `useNav.spec` order | `items.value.map(i => i.key)` | `['home','about','mp','fin','fx','gsec','pay','pub']` |
| `useNav.spec` targets | `items.value.map(i => i.to)` | `['/', null, '/monetary-policy', '/financial-system', null, null, null, '/publications']` |
| `useNav.spec` en labels | lang `en` | `['Home','About Us','Monetary Policy','Financial System','FX Market','G-Sec Market','Payments','Publications']` |
| `useNav.spec` bn labels | `setLang('bn')` | `['মূলপাতা','পরিচিতি','মুদ্রানীতি','আর্থিক ব্যবস্থা','বৈদেশিক মুদ্রা','সরকারি সিকিউরিটিজ','পেমেন্ট','প্রকাশনা']` |
| `useNav.spec` active home | route path `/` | Only `home` has `active: true` (1 of 8) |
| `useNav.spec` active mp | route path `/monetary-policy` | Only `mp` is active |
| `useNav.spec` active fin | route path `/financial-system` | Only `fin` is active |
| `useNav.spec` active pub | route path `/publications` | Only `pub` is active |
| `useNav.spec` svc | route path `/services` | 0 items active (matches `activeKey = null`, line 858) |
| `useNav.spec` trailing slash | route path `/monetary-policy/` | Only `mp` is active |
| `useNav.spec` no-op never active | Every route path above | `about`, `fx`, `gsec` and `pay` are always `active: false` |
| `useNav.spec` reactive language | Read `items`, then call `setLang('bn')` | The same `items` ref now returns `label === 'মুদ্রানীতি'` for `mp` without calling `useNav()` again |

## Visual QA (Chrome DevTools MCP vs prototype)
CP06 adds no styled UI. Visual QA checks routing behavior in the generated site (`npx serve .output/public` on `http://localhost:3000`).
- [ ] `navigate_page` to `http://localhost:3000/monetary-policy`: the page shows `<h1>` text "Monetary Policy"; the HTTP status in `list_network_requests` is 200
- [ ] The same check for `/financial-system` ("Financial System & Stability"), `/publications` ("Reports & Publications") and `/services` ("Services & Protection")
- [ ] View page source (`get_network_request` on the document) for `/publications`: the HTML response already contains "Reports & Publications" (HTML-escaped as `Reports &amp; Publications`) inside `<h1>` before JavaScript runs (static generation works)
- [ ] Scroll `/` to `window.scrollY = 600`, then run `navigateTo('/publications')` in `evaluate_script`: `window.scrollY` is `0` after navigation (parity with line 505)
- [ ] Browser Back from `/publications` returns to `/` and shows "Bangladesh Bank"
- [ ] Console has 0 errors and 0 warnings on all 5 routes (no hydration mismatch, no `[Vue Router warn]`)

## Accessibility
- [ ] WCAG 2.4.2 Page Titled (prepared): each route has exactly one `<h1>` (`document.querySelectorAll('h1').length === 1`). Full `<title>` tags come in CP12
- [ ] WCAG 2.4.5 Multiple Ways (prepared): each of the 5 views has its own URL, so it can be bookmarked and linked from search results
- [ ] WCAG 3.2.3 Consistent Navigation (prepared): `useNav().items` returns the same 8 keys in the same order on all 5 routes (unit tests above)
- [ ] WCAG 3.1.1 Language of Page: `<html lang>` is `en` by default on every generated route (`grep -l '<html[^>]*lang="en"' .output/public/index.html .output/public/*/index.html | wc -l` prints `5`)

## Responsive
- [ ] 375 px, 768 px, 1280 px: each of the 5 routes loads with HTTP 200, shows its `<h1>` and has no console error. Routing does not depend on viewport width
- [ ] 375 px: `document.documentElement.scrollWidth === 375` on all 5 routes (the temporary bodies cause no horizontal scroll)

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
