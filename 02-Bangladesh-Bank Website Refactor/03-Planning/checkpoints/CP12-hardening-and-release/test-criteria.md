# CP12 — Production hardening and release: Test Criteria

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors (`npm run typecheck`, `npm run lint` print 0 errors)
- [ ] `npm run ci` exits 0 locally
- [ ] `npm run check:routes` exits 0: `index.html`, 4 inner `index.html` files and `404.html` exist in `.output/public/`
- [ ] `find .output/public -name "*.map"` prints nothing
- [ ] `grep -rn "console\." app/` prints nothing
- [ ] `npm audit --omit=dev --audit-level=high` exits 0
- [ ] JS bundle: `find .output/public/_nuxt -name "*.js" -exec cat {} + | gzip -c | wc -c` ≤ 153600 bytes
- [ ] `wc -c .output/public/index.html` ≤ 102400 bytes
- [ ] `git diff main -- package.json` shows only `scripts` changes (no new dependency)
- [ ] GitHub Actions "CI" run on the release branch is green, with steps install, lint, typecheck, test, port check, generate, route check, audit, upload artifact
- [ ] A deliberate test commit that adds `style-hover` to a `.vue` file makes the CI run fail at the port-check step (then revert)

## Unit tests (Vitest)
| Test | Input | Expected result |
|------|-------|-----------------|
| Home SEO meta | mount `pages/index.vue`, `lang = 'en'` | head title "Bangladesh Bank"; meta description equals `en.metaDescription` |
| Inner SEO meta | mount `InnerPage` `view = 'fin'`, `lang = 'en'` | title "Financial System & Stability · Bangladesh Bank"; description equals `en.pages.fin.lead` |
| Inner SEO meta Bangla | `view = 'mp'`, `lang = 'bn'` | title "মুদ্রানীতি · বাংলাদেশ ব্যাংক"; description equals `bn.pages.mp.lead` |
| Canonical link | layout on route `/publications`, `siteUrl = 'https://example.test'` | `<link rel="canonical" href="https://example.test/publications">` |
| `og:locale` | `lang = 'bn'` | `og:locale` is `bn_BD`; with `lang = 'en'` it is `en_US` |
| Error page | mount `app/error.vue` with `{ statusCode: 404 }`, `lang = 'en'` | `<h1>` equals `en.notFoundTitle`; one `<a href="/">` with text `en.notFoundBack` |
| Error page Bangla | same, `lang = 'bn'` | texts equal `bn.notFoundTitle`, `bn.notFoundBack` |
| Locale key parity | `en`, `bn` | still identical key sets after adding `metaDescription`, `notFoundTitle`, `notFoundBack` |

## Visual QA (Chrome DevTools MCP vs prototype)
- [ ] 1280 px screenshots of all 5 routes in both languages are identical to the CP11 desktop baseline in `../05-Qa/screenshots/` (CP12 changes no pixel)
- [ ] `/nope` shows the 404 page inside the layout: band background #E4F1EC, `<h1>` 26px / 700 / #006A4E, link back to `/`
- [ ] `<meta name="theme-color">` content is `#006A4E` in `.output/public/index.html`
- [ ] Inter and JetBrains Mono load on every route under the CSP (Network panel shows 200 for `rsms.me/inter/inter.css` and `fonts.googleapis.com/css2?family=JetBrains+Mono…`)
- [ ] Console has 0 errors and 0 warnings on all 5 routes and `/nope`, including 0 "Refused to load" CSP messages
- [ ] Response headers on staging (or `curl -I` against the host) include `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Strict-Transport-Security`
- [ ] `/_nuxt/*.js` responses carry `Cache-Control: public, max-age=31536000, immutable`; HTML responses carry `Cache-Control: no-cache`

## Accessibility
- [ ] Lighthouse Accessibility ≥ 95 on `/`, `/monetary-policy`, `/financial-system`, `/publications`, `/services` (desktop and mobile), recorded in `../05-Qa/CP12-release-report.md`
- [ ] Lighthouse Performance ≥ 90, SEO ≥ 95, Best Practices ≥ 95 on the same 5 routes (desktop and mobile)
- [ ] WCAG 2.4.2 Page Titled: each of the 5 routes and `/nope` has a unique, descriptive `<title>` in both languages
- [ ] WCAG 3.1.1 Language of Page: `404.html` and all 5 route files are generated with `<html lang="en">`; switching language sets `lang="bn"`
- [ ] WCAG 1.3.1 Info and Relationships: `/nope` has one `<h1>` and the `main` landmark
- [ ] WCAG 2.4.1 Bypass Blocks: skip link still works on all 5 routes and `/nope` in the production build
- [ ] All CP11 accessibility boxes still pass on the production build (spot-check issues 3, 7 and 8 on `/`)

## Responsive
- [ ] 375 px, 768 px, 1280 px — all 5 routes and `/nope` in the production build (`npx serve .output/public -l 3000`) have no horizontal page scroll and match the CP11 screenshots for the same width and language
- [ ] 375 px — Lighthouse mobile run reports no "Tap targets are not sized appropriately" and no "Content is not sized correctly for the viewport"

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
