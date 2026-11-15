# CP09 — Home — remaining sections: Test Criteria

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors (`npx nuxi typecheck` and `npx eslint .` print 0 errors)
- [ ] `.output/public/index.html` contains the strings `tel:999`, `tel:1090` and `tel:16236`
- [ ] `grep -rnE 'sc-for|sc-if|style-hover|<image-slot|onClick="\{\{' app/` prints nothing
- [ ] `npx vitest run` is green, including all CP01–CP08 tests

## Unit tests (Vitest)
| Test | Input | Expected result |
|------|-------|-----------------|
| NewsPanel renders all items | `lang = 'en'` | 10 rows; first row text "Circular for Director (Contractual) of Security Management Department (SMD)" |
| NewsPanel "New" badges | `lang = 'en'` | Exactly 3 badges with text "New" (items 2, 3, 8) |
| NewsPanel Bangla badge | `lang = 'bn'` | Badges read "নতুন"; header reads "সাম্প্রতিক সংবাদ ও সার্কুলার" |
| PolicyRates values | `lang = 'en'` | 4 rows; values `10.00%`, `11.50%`, `7.50%`, `4.00%`; footnote "Last updated: 15 Feb 2026" |
| ReserveRatios values | `lang = 'en'` | 4 rows; last row SLR `2.5%`, CRR `—`; root has `role="table"`; 3 `role="columnheader"` cells (Category, SLR, CRR) |
| ModuleCard with route | `{ title: 'Monetary Policy', links: [4 items], icon: 'landmark', to: '/monetary-policy' }` | Root is an `<a>` with `href="/monetary-policy"`; 4 `<li>`; one `<h3>` "Monetary Policy" |
| ModuleCard without route | same, `to: null` | Root is a `<div>`; no `<a>` in the card |
| ExploreDirectory count and routes | `lang = 'en'` | 8 `ModuleCard`; exactly 3 links with `href` `/monetary-policy`, `/financial-system`, `/publications`; 8 chips; `<h2>` "Explore Bangladesh Bank" |
| ServiceCard link | `{ title: 'E-Services', desc: '…', icon: 'globe' }` | Root `<a href="/services">` containing the title and desc |
| CitizenServices count | `lang = 'bn'` | 5 cards; `<h2>` "সেবা ও সুরক্ষা" |
| CipcBanner phone link | `lang = 'en'` | One `<a href="tel:16236">` with text `16236`; button text "Submit complaint" with `type="button"` |
| GovernorSection content | `lang = 'en'` | `<p>` text starts with "Bangladesh Bank works to maintain price stability"; name "Md Mostaqur Rahman, FCMA"; button "Read full message" with `type="button"` |
| GovernorSection Bangla | `lang = 'bn'` | Button "সম্পূর্ণ বাণী পড়ুন"; name "মো. মোস্তাকুর রহমান, এফসিএমএ" |
| HotlineStrip tel links | `lang = 'en'` | 5 `<a>` with `href` `tel:333`, `tel:999`, `tel:109`, `tel:106`, `tel:1090` in that order; no `<img>` in the component |
| HotlineStrip region | `lang = 'en'` | Root has `role="region"` and `aria-labelledby="hotlines-title"`; element `#hotlines-title` text "National emergency hotlines" |
| HotlineStrip Bangla | `lang = 'bn'` | `#hotlines-title` text "জাতীয় জরুরি হটলাইন"; 999 label "জাতীয় জরুরি সেবা"; numbers unchanged |

## Visual QA (Chrome DevTools MCP vs prototype)
Viewport 1280×900. Prototype tab: `02-Design/Bangladesh Bank.html`. Site tab: `http://localhost:3000/`. Read values with `evaluate_script` + `getComputedStyle`.
- [ ] News header background is `rgb(0, 106, 78)` (#006A4E), padding `13px 20px`, title font-size 13px, uppercase
- [ ] News row hover background is `rgb(247, 250, 248)` (#F7FAF8); "New" badge background `rgb(244, 42, 65)` (#F42A41), font-size 9px
- [ ] News/rates grid computed `grid-template-columns` gives the news column 2× the rate column (≈ 762.7 px / 381.3 px inside the 1160 px content band), gap 16px
- [ ] Policy rates and reserve ratios headers are `rgb(10, 61, 44)` (#0A3D2C); values use JetBrains Mono, 14px (policy) and 12.5px (reserves), color #006A4E
- [ ] Explore `<h2>` is 18px / 700 / `rgb(0, 106, 78)`; module grid has 4 equal columns with gap 18px
- [ ] All 8 module cards: border `1px solid rgb(224, 228, 232)` (#E0E4E8), radius 14px, padding 20px; no card border is #F42A41
- [ ] Module icon tile is 40×40 px, radius 11px, background `rgb(228, 241, 236)` (#E4F1EC); icon and arrow are vertically centered in the header row in all 8 cards
- [ ] Module card hover: border `rgb(0, 106, 78)`, box-shadow `rgba(0, 106, 78, 0.08) 0px 6px 18px 0px`
- [ ] "More:" chips: 8 chips, radius 999px, border #C5E0D6, background #F7FAF8; hover background #E4F1EC
- [ ] CIPC banner background #006A4E, radius 14px; phone disc 48×48 background #F42A41; `16236` is 30px JetBrains Mono #fff; button hover background #DCEFE6
- [ ] Service grid has 5 equal columns, gap 16px; service icon tile 38×38, background #DCEFE6, radius 10px
- [ ] Governor card: first column 160px, gap 32px, padding 28px; portrait aspect ratio 4:5; message 17px / line-height 1.55 / #1a1a1a
- [ ] Governor button: border `1.5px solid #006A4E`, hover background #006A4E with text #fff
- [ ] Hotline eyebrow bar is 22×3 px #F42A41; hotline numbers 22px JetBrains Mono #F42A41; cards min-width 170px, padding 13px 18px, radius 10px
- [ ] Section order top to bottom: market row, news+rates, explore, CIPC, services, governor, hotlines — identical to prototype
- [ ] Side-by-side screenshots of each section in `en` and in `bn` show 0 visible deltas
- [ ] Console has 0 errors and 0 warnings (including 0 hydration mismatch warnings)

## Accessibility
- [ ] WCAG 1.4.1 Use of Color: red (#F42A41) appears only on the "New" badge, CIPC phone disc, hotline bar and hotline numbers; every one of these also has text that carries the meaning
- [ ] WCAG 1.3.1 Info and Relationships: section headings are `<h2>` (explore, services) and `<h3>` (module titles); reserve ratios expose `role="table"` with 3 column headers in the accessibility tree (`take_snapshot`)
- [ ] WCAG 2.1.1 Keyboard: Tab reaches the 3 routed module cards, 5 service cards, `16236`, both buttons and the 5 hotline links; Enter on "Monetary Policy" card navigates to `/monetary-policy`
- [ ] WCAG 2.4.7 Focus Visible: every focusable element above shows a visible outline (2px solid #006A4E) on keyboard focus
- [ ] WCAG 2.4.4 Link Purpose (In Context): each hotline link name reads number + service ("999 National emergency service"); governor control reads "Read full message", not "more...."
- [ ] WCAG 2.5.3 Label in Name: hotline and card accessible names contain their visible text
- [ ] WCAG 2.5.8 Target Size (Minimum): each hotline link is at least 24×24 px (expected ≥ 170×48 px)
- [ ] WCAG 4.1.2 Name, Role, Value: hotline container is a region named "National emergency hotlines" (en) / "জাতীয় জরুরি হটলাইন" (bn) in the accessibility tree
- [ ] Every `BaseIcon` inside these sections has `aria-hidden="true"`
- [ ] Contrast values below 4.5:1 (`#9aa39e` on #fff 2.59:1, white on #F42A41 4.0:1, `rgba(255,255,255,.7)` on #006A4E 4.09:1, `rgba(255,255,255,.75)` on #006A4E 4.47:1) are recorded in `../05-Qa/contrast-register.md` for the CP11 decision (WCAG 1.4.3)

## Responsive
- [ ] 1280 px — every section matches the prototype pixel-for-pixel; content band is 1240 px max with 40 px gutters
- [ ] 768 px — page renders with no console errors; any horizontal overflow per section is written to `../05-Qa/responsive-findings.md` for CP11 (no breakpoints are added in CP09, decision D2)
- [ ] 375 px — same as 768 px: page renders, overflow per section recorded; hotline cards wrap because of `flex-wrap: wrap`

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
