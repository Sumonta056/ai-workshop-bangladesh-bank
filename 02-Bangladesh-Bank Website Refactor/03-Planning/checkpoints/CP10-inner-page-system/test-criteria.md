# CP10 — Shared inner-page system: Test Criteria

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors (`npx nuxi typecheck` and `npx eslint .` print 0 errors)
- [ ] These 4 files exist: `.output/public/monetary-policy/index.html`, `.output/public/financial-system/index.html`, `.output/public/publications/index.html`, `.output/public/services/index.html`
- [ ] Each of the 4 page files in `app/pages/` contains exactly one element: `<InnerPage view="…" />`
- [ ] `grep -rnE 'sc-for|sc-if|style-hover|<image-slot|onClick="\{\{' app/` prints nothing
- [ ] `npx vitest run` is green, including all earlier tests

## Unit tests (Vitest)
| Test | Input | Expected result |
|------|-------|-----------------|
| InnerPage `mp` structure | `view = 'mp'`, `lang = 'en'` | `<h1>` "Monetary Policy"; 1 highlight card; 2 link groups; 2 data tables; sidebar with 4 related links |
| InnerPage `fin` structure | `view = 'fin'`, `lang = 'en'` | `<h1>` "Financial System & Stability"; 1 highlight; 3 groups; 1 table ("Reserve ratios") |
| InnerPage `pub` structure | `view = 'pub'`, `lang = 'en'` | `<h1>` "Reports & Publications"; 1 highlight (tag "Flagship"); 3 groups; 0 tables |
| InnerPage `svc` structure | `view = 'svc'`, `lang = 'en'` | `<h1>` "Services & Protection"; highlight tag "Hotline 16236"; 3 groups; 0 tables |
| InnerPage Bangla | `view = 'mp'`, `lang = 'bn'` | `<h1>` "মুদ্রানীতি"; breadcrumb home text "মূলপাতা" |
| InnerPage reactivity | mount `view = 'mp'` in `en`, then `setLang('bn')` | `<h1>` text changes from "Monetary Policy" to "মুদ্রানীতি" without remount |
| InnerHeader breadcrumb | `page = en.pages.fin` | `<nav>` with `aria-label`; first item is `<a href="/">` "Home"; last item has `aria-current="page"` and text "Financial System & Stability" |
| HighlightCard content | `en.pages.mp.highlight` | Tag "Latest"; title "Monetary Policy Statement (January–June 2026)"; 2 buttons "Read statement", "Download PDF", both `type="button"` |
| LinkGroup rows | `en.pages.mp.groups[0]` | `<h2>` "MPC resolutions"; 3 rows; first row "MPC resolution — 24th meeting (Feb 2026)" |
| DataTable roles | `en.pages.mp.tables[1]` | `role="table"`; 2 `role="columnheader"` value headers "SLR", "CRR"; 4 `role="row"` data rows; last row values `2.5%`, `—` |
| DataTable single column | `en.pages.mp.tables[0]` | 4 rows; values `10.00%`, `11.50%`, `7.50%`, `4.00%`; note "Last updated 15 Feb 2026" |
| Sidebar key-rate order | `lang = 'en'` | Labels in order "Policy Rate (Repo)", "Call Money (Weighted)", "USD / BDT Reference", "Bank Rate"; values `10.00%`, `9.84%`, `123.10`, `4.00%` |
| Sidebar related | `page = en.pages.pub` | 4 links: "Research Department", "Statistics Department", "Library & archives", "Open data portal" |
| Route files | each of the 4 page components | Renders `InnerPage` with `view` `mp`, `fin`, `pub`, `svc` respectively |

## Visual QA (Chrome DevTools MCP vs prototype)
Viewport 1280×900. Prototype tab: `02-Design/Bangladesh Bank.html` (switch views by clicking the nav; for `svc` click a citizen-service card). Site tab: `http://localhost:3000/<route>`. Read values with `evaluate_script` + `getComputedStyle`.
- [ ] Inner header background `rgb(228, 241, 236)` (#E4F1EC), border-bottom `1px solid rgb(197, 224, 214)` (#C5E0D6), padding `24px 40px 40px`
- [ ] Breadcrumb "Home" color `rgb(0, 106, 78)` (#006A4E); chevron color `rgb(107, 168, 146)` (#6BA892); breadcrumb font-size 12.5px
- [ ] `<h1>` font-size 26px, weight 700, line-height 29.9px (1.15), letter-spacing −0.39px, color #006A4E
- [ ] Lead paragraph 15px / line-height 24px / color #4A4A4A / max-width 80ch
- [ ] Body grid columns are `796px 320px` with gap 44px inside the 1160 px content band; padding `40px 40px 64px`
- [ ] Highlight card background `rgb(247, 250, 248)` (#F7FAF8), radius 14px, padding 24px; tag background `rgb(244, 42, 65)` (#F42A41), radius 999px, font-size 10px
- [ ] Primary button background #006A4E, hover #00543E; secondary button border `1.5px solid #006A4E`, hover background #E4F1EC
- [ ] Section headings (group, table) are 16px / 600 / #006A4E with margin-bottom 14px — identical to prototype `<h3>` despite the `<h2>` tag
- [ ] Link-group rows padding `14px 18px`, divider #EDF0F3, hover background #F7FAF8
- [ ] Table head row background `rgb(244, 246, 248)` (#F4F6F8); value cells 88px wide, JetBrains Mono 13.5px, #006A4E, right-aligned
- [ ] Sidebar rates box background #006A4E, radius 14px, padding 22px; title color `rgb(95, 190, 158)` (#5FBE9E); row divider `rgba(255, 255, 255, 0.13)`
- [ ] Sidebar `position: sticky`, `top: 80px`; while scrolling `/financial-system` the aside stays visible below the sticky nav
- [ ] Related links color #006A4E, hover #F42A41
- [ ] On `/services` no nav item has the active underline (prototype line 858); on the other 3 routes the matching item is active
- [ ] Browser tab title on `/monetary-policy` is "Monetary Policy · Bangladesh Bank" (en) and "মুদ্রানীতি · বাংলাদেশ ব্যাংক" (bn)
- [ ] 4 routes × 2 languages = 8 side-by-side screenshots show 0 visible deltas
- [ ] Console has 0 errors and 0 warnings on all 4 routes

## Accessibility
- [ ] WCAG 1.3.1 Info and Relationships: one `<h1>` per inner route; section headings are `<h2>`; data tables expose `table`, `row`, `columnheader`, `rowheader`, `cell` roles in the accessibility tree (`take_snapshot`)
- [ ] WCAG 2.4.8 Location / 1.3.1: breadcrumb is a `navigation` landmark with a name, current page has `aria-current="page"`
- [ ] WCAG 2.1.1 Keyboard: Tab reaches the breadcrumb "Home" link, both highlight buttons; Enter on "Home" goes to `/`
- [ ] WCAG 2.4.7 Focus Visible: breadcrumb link and both buttons show a visible focus outline
- [ ] WCAG 2.4.2 Page Titled: each of the 4 routes has a unique `<title>` naming the page
- [ ] WCAG 1.4.3 Contrast (Minimum): body text #4A4A4A on #E4F1EC = 7.64:1 and #1a1a1a on #fff = 17.4:1 pass; `#5FBE9E` on #006A4E (2.95:1) and `#9aa39e` on #fff (2.59:1) are recorded in `../05-Qa/contrast-register.md` for CP11
- [ ] Every `BaseIcon` (file, arrow, chev) on inner routes has `aria-hidden="true"`
- [ ] `<main id="main">` exists once per route and the CP07 skip link moves focus to it

## Responsive
- [ ] 1280 px — all 4 routes match the prototype pixel-for-pixel; grid `1fr 320px`, sidebar sticky
- [ ] 768 px — routes render with no console errors; horizontal overflow of the 320 px sidebar grid is recorded in `../05-Qa/responsive-findings.md` for CP11 (no breakpoints in CP10, decision D2)
- [ ] 375 px — same as 768 px: routes render, overflow recorded for CP11

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
