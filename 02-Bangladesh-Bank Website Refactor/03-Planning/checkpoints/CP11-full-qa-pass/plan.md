# CP11 — Full QA pass: Plan

Paths are relative to `Bangladesh Bank New Website/`. QA artifacts go to `../05-Qa/` (the `05-Qa` folder of the refactor workspace).

## Files to create or change
| File | Action | Responsibility |
|------|--------|----------------|
| `app/assets/css/tokens.css` | Change | Add 2 media blocks that only redefine `--bb-gutter`: `24px` at `(max-width: 1024px)`, `16px` at `(max-width: 600px)`. |
| `app/assets/css/base.css` | Change (if missing) | `.bb-sr-only` utility (visually hidden, still announced) used by the home `<h1>`; `@media (prefers-reduced-motion: reduce)` sets `transition-duration: 0.01ms` and `animation-duration: 0.01ms` on `*`. |
| `app/layouts/default.vue` | Change (if missing) | `useHead({ htmlAttrs: { lang } })` bound to `useLocale().lang`, so `<html lang>` is `en` or `bn`. |
| `app/pages/index.vue` | Change | Add `<h1 class="bb-sr-only">{{ L.bankName }}</h1>` as the first child of `<main>`. |
| `app/components/layout/UtilityBar.vue` | Change | `@media (max-width: 600px)`: `flex-wrap: wrap`, row gap 8 px. |
| `app/components/layout/Masthead.vue` | Change | `@media (max-width: 600px)`: height `auto`, padding 16 px gutter, `flex-wrap: wrap`; search box `width: 100%; max-width: none`. |
| `app/components/layout/PrimaryNav.vue` | Change | `@media (max-width: 1024px)`: inner row `overflow-x: auto; scrollbar-width: none`; items `flex: none; white-space: nowrap`. Nav stays `position: sticky; top: 0`. |
| `app/components/layout/Ticker.vue` | Change | `@media (max-width: 600px)`: hide nothing; allow the "View all" link to wrap below the text. |
| `app/components/layout/Footer.vue` | Change | Grid `1.6fr 1fr 1fr 1fr` → `repeat(2, minmax(0,1fr))` at ≤1024 px, `1fr` at ≤600 px; gap 40 px → 32 px / 24 px. |
| `app/components/home/MarketRow.vue` | Change | Grid `repeat(4, 1fr)` → `repeat(2, minmax(0,1fr))` at ≤1024 px, `1fr` at ≤600 px. |
| `app/components/home/NewsRates.vue` | Change | Grid `minmax(0,2fr) minmax(0,1fr)` → `1fr` at ≤1024 px. |
| `app/components/home/ExploreDirectory.vue` | Change | Module grid 4 → 2 columns at ≤1024 px, 1 column at ≤600 px. |
| `app/components/home/CitizenServices.vue` | Change | Service grid 5 → 3 columns at ≤1024 px, 1 column at ≤600 px. |
| `app/components/home/GovernorSection.vue` | Change | Grid `160px 1fr` → `1fr` at ≤600 px; portrait `max-width: 160px`; padding 28 px → 20 px. |
| `app/components/home/CipcBanner.vue` | Change | `@media (max-width: 600px)`: padding 22 px 28 px → 18 px 20 px (already `flex-wrap: wrap`). |
| `app/components/inner/InnerPage.vue` | Change | Body grid `minmax(0,1fr) 320px` → `1fr` at ≤1024 px; padding `40px gutter 64px` → `32px gutter 48px`. |
| `app/components/inner/Sidebar.vue` | Change | `position: static` at ≤1024 px. |
| `app/components/inner/DataTable.vue` | Change | Value cells width 88 px → 64 px at ≤600 px. |
| Color fixes per approved D4 (see Decisions) | Change (only after approval) | `NewsPanel.vue`, `PolicyRates.vue`, `ReserveRatios.vue`, `ExploreDirectory.vue`, `CipcBanner.vue`, `DataTable.vue`, `Sidebar.vue` — and add tokens `--bb-ink-muted-aa`, `--bb-red-aa`, `--bb-green-300-aa` to `tokens.css`. |
| `tests/unit/layout/htmlLang.spec.ts` | Create | `<html lang>` follows `setLang`. |
| `tests/unit/pages/index-heading.spec.ts` | Create | Home has exactly one `<h1>`. |
| `../05-Qa/CP11-qa-report.md` | Create | Screenshot matrix, audit re-verification table, Lighthouse scores, open findings. |
| `../05-Qa/screenshots/<route>-<lang>-<width>.png` | Create | 30 site screenshots + 10 prototype screenshots at 1280 px. |
| `../05-Qa/contrast-register.md` | Change | Final status of each contrast finding after the D4 decision. |
| `../05-Qa/responsive-findings.md` | Change | Close every overflow recorded in CP09 and CP10. |

## Steps
1. Create branch `cp11-full-qa-pass` from the commit that contains both CP09 and CP10.
2. Run the full loop once to get a green baseline: `npm run generate && npx nuxi typecheck && npx eslint . && npx vitest run`.
3. Start the site: `npx serve .output/public -l 3000`. Open the prototype `02-Design/Bangladesh Bank.html` in a second Chrome DevTools MCP tab (`new_page`, then `select_page` before each action).
4. Desktop baseline: at 1280×900 take 10 site screenshots (5 routes × `en`/`bn`) and 10 prototype screenshots (switch views by clicking nav / service card, switch language with the utility-bar toggle). Name them `<route>-<lang>-1280.png` and `proto-<view>-<lang>-1280.png`. Record any delta in the report; fix it in the owning component before going on.
5. Add the gutter overrides to `tokens.css` (snippet in Decisions) and confirm with `getComputedStyle(document.documentElement).getPropertyValue('--bb-gutter')` = `24px` at 768 px and `16px` at 375 px.
6. Add the scoped `@media` rules listed in "Files to create or change", one component at a time; after each, `resize_page` to 768×1024 and 375×812 and check `document.documentElement.scrollWidth <= window.innerWidth`.
7. Re-check 1280 px after every component change: the desktop screenshot must not change (breakpoints use `max-width` only, so ≥1025 px is untouched).
8. Take the 20 remaining screenshots (5 routes × 2 languages × 768 and 375 px).
9. Add `htmlAttrs.lang` to `layouts/default.vue` if CP04/CP07 did not, and the home `<h1 class="bb-sr-only">`.
10. Keyboard walkthrough on `/` and `/monetary-policy` in both languages: Tab from the address bar through skip link → utility bar → masthead search → nav → ticker pause → content → footer. Record the order in the report; every stop must show a focus outline.
11. Screen-reader structure check with `take_snapshot` on each route: landmarks (`banner`, `navigation` ×2 on inner routes, `main`, `contentinfo`), one `<h1>`, heading order without skips, region "National emergency hotlines".
12. Contrast pass: re-measure every pair in `../05-Qa/contrast-register.md` and the pairs added by CP07. Present the register to the owner with the D4 proposal and wait for a decision. Apply the approved colors only.
13. Reduced motion: `emulate` with `prefers-reduced-motion: reduce`; the ticker must not move and hover transitions must be instant.
14. Text spacing (WCAG 1.4.12): inject `* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important } p { margin-bottom: 2em !important }` with `evaluate_script` on `/` and `/financial-system` at 1280 px; no text is clipped or overlapped.
15. Zoom and reflow (WCAG 1.4.4 / 1.4.10): `resize_page` to 640×900 (same CSS width as 200 % zoom at 1280 px) and to 320×800; on all 5 routes `document.documentElement.scrollWidth <= window.innerWidth` and no text is cut off.
16. Run Lighthouse with `lighthouse_audit` (mode navigation, device desktop and mobile) on all 5 routes; record the 4 category scores.
17. Re-verify audit issues 1–9 one by one using the checks in `test-criteria.md`; write "Verified" + evidence (screenshot name or snapshot excerpt) per issue in the report.
18. Send the Bangla screenshots (10 views) and the `bn.ts` file to the native-speaker reviewer (R1); log every correction as a diff against prototype lines 697–851 — the prototype wins unless the owner approves a change.
19. Write `../05-Qa/CP11-qa-report.md` and update `contrast-register.md` and `responsive-findings.md`.
20. Run the full loop again: `npm run generate && npx nuxi typecheck && npx eslint . && npx vitest run`.
21. Ask for approval, then commit: `git commit -m "feat(qa): CP11 responsive layer, a11y fixes and full QA report"`.

## Design source
`02-Design/Bangladesh Bank.html`, the whole page, for the 1280 px comparison:
- Lines 17–23 — global reset, `::selection` (#DCEFE6 / #006A4E).
- Lines 28–83 — utility bar, masthead (height 92 px, search width 300 px / max 34vw), sticky nav, notice ticker.
- Lines 85–317 — home view (market row grid line 91, news grid line 133, module grid line 204, service grid line 263, governor grid line 278, hotlines line 305).
- Lines 319–431 — inner view (body grid line 342, sticky sidebar line 407).
- Lines 433–497 — footer (background #0A3D2C, top border 3px #F42A41, grid `1.6fr 1fr 1fr 1fr` line 436).
- Lines 697–851 — Bangla dictionary for the native-speaker review.
The prototype has 0 `@media` rules, so 768 px and 375 px layouts are defined by this plan (D2), not by the design.

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Breakpoints (refines D2) | Tablet rules at `@media (max-width: 1024px)`, verified at 768 px; mobile rules at `@media (max-width: 600px)`, verified at 375 px. Desktop ≥ 1025 px has no new rules. | Keeps 1280 px pixel-exact; covers the 768 px tablet and 360–414 px phones with two queries. |
| Gutter on small screens | `tokens.css`: `@media (max-width: 1024px) { :root { --bb-gutter: 24px } }` and `@media (max-width: 600px) { :root { --bb-gutter: 16px } }` | One token change re-flows every `.bb-container` and every section that already uses `var(--bb-gutter)`. |
| Mobile navigation | Horizontally scrollable sticky nav strip, no hamburger | All 8 sections stay visible and one swipe away (audit 1 asks for persistent nav); no new JS component and no hidden menu. |
| Home `<h1>` | Visually hidden `<h1>` with `L.bankName` | WCAG 1.3.1 / 2.4.6 outline; the prototype has no `<h1>` on home and a visible one would change pixels (D1). |
| D4 (proposed, needs owner approval) — design colors below 4.5:1 | Text-only replacements: `#9aa39e` → `#646D68` (5.34:1 on #fff, 4.93:1 on #F4F6F8); "New" badge `#F42A41` → `#D6203A` (white text 5.09:1); `rgba(255,255,255,.7)` and `.75` on #006A4E → `rgba(255,255,255,.85)` (5.27:1); sidebar title `#5FBE9E` on #006A4E → `#B5E6D3` (4.8:1). Borders, icons, hotline numbers (22 px bold, 4.0:1 passes 3:1 large text) unchanged. | WCAG 1.4.3 AA and the Lighthouse Accessibility ≥ 95 target in the Definition of done. Same pattern as D3: a small, documented visual exception for an accessibility criterion. If the owner rejects it, the findings stay in the register as accepted risk and the Lighthouse target is re-negotiated. |
| Sidebar on tablet | `position: static`, moves below the main column | A sticky 320 px column cannot sit beside content narrower than 700 px. |

## Risks
| Risk | Mitigation |
|------|------------|
| A `@media` rule leaks into 1280 px and shifts a pixel | Only `max-width` queries; re-take the 10 desktop screenshots after step 7 and compare with step 4. |
| Owner rejects D4 | Keep design colors, mark the 5 pairs "accepted risk" in `contrast-register.md`, record the actual Lighthouse score; do not block the rest of CP11. |
| Long Bangla nav labels ("সরকারি সিকিউরিটিজ") overflow the masthead or nav at 375 px | Nav strip scrolls horizontally by design; check `scrollWidth` of `<body>` not of the nav. |
| Native-speaker review is slow | Start step 18 on day 1 of CP11 with the CP09/CP10 screenshots; it runs in parallel with the responsive work. |
| Lighthouse Performance < 90 because of external fonts (rsms.me, Google Fonts) | Record score; the font strategy is a CP12 hardening item. |
| Screenshot comparison is subjective (R4) | Use the fixed widths and the per-element computed-style checks in each checkpoint's `test-criteria.md`, not only eyeballing. |

## Estimated effort
14 hours (5 h responsive layer across 16 components, 4 h screenshot matrix and comparison, 3 h accessibility and Lighthouse passes, 2 h report and contrast decision).
