# CP07 — Layout chrome: Test Criteria

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors (`npx nuxi typecheck` and `npx eslint .` both exit 0)
- [ ] `grep -rnE "style-hover|<sc-for|<sc-if|onClick=\"\{\{" app/` returns nothing (the `check-port.mjs` hook is silent)
- [ ] `grep -c "<main" .output/public/index.html .output/public/*/index.html` prints `1` for each of the 5 files
- [ ] `grep -c 'class="bb-skip-link"' .output/public/index.html` prints `1`, and the generated HTML contains no `ticker__control` (the pause button is client-only)

## Unit tests (Vitest)
| Test | Input | Expected result |
|------|-------|-----------------|
| `UtilityBar.spec` text | `lang = 'en'` | Text contains "An autonomous institution of the Government of Bangladesh", "RTI", "Sitemap", "Feedback" |
| `UtilityBar.spec` toggle | Click the button with text "বাংলা" | `useLocale().lang.value === 'bn'`; that button has `aria-pressed="true"` and the "English" button has `aria-pressed="false"` |
| `UtilityBar.spec` lang attrs | Render | "English" button has `lang="en"`, "বাংলা" button has `lang="bn"`; the parent has `role="group"` and `aria-label="Language"` |
| `Masthead.spec` home link | Render | The first `a` has `href="/"` and contains "Bangladesh Bank" and "Central Bank of Bangladesh" |
| `Masthead.spec` search | Render | `form[role="search"]` exists; its `input` has `placeholder` and `aria-label` both "Search the site" |
| `Masthead.spec` search bn | `setLang('bn')` | `input` placeholder and `aria-label` are "সাইটে অনুসন্ধান করুন" |
| `Masthead.spec` submit | Trigger `submit` on the form | Default prevented; the route does not change |
| `PrimaryNav.spec` count | Route `/` | 8 items: 4 `a[href]` with hrefs `/`, `/monetary-policy`, `/financial-system`, `/publications`, and 4 `button[aria-disabled="true"]` with text "About Us", "FX Market", "G-Sec Market", "Payments" |
| `PrimaryNav.spec` active | Route `/financial-system` | Exactly 1 element has `aria-current="page"` and class `is-active`, with text "Financial System" |
| `PrimaryNav.spec` svc | Route `/services` | 0 elements have `aria-current` |
| `PrimaryNav.spec` landmark | Render | Root is `nav` with `aria-label="Primary"`; with `bn` it is "প্রধান মেনু" |
| `Ticker.spec` static | `matchMedia` mocked to `reduce`; text wider than viewport | No `is-scrolling` class; no `button` rendered; text is the full `L.notice` |
| `Ticker.spec` motion | `matchMedia` mocked to `no-preference`; `scrollWidth` 1200 > `clientWidth` 800 | `.is-scrolling` present; 1 `button` with `aria-pressed="false"` and `aria-label="Pause notices"` |
| `Ticker.spec` pause | Click the control button | `aria-pressed="true"`, `aria-label="Play notices"`, class `is-paused` present, `<svg>` inside renders the `play` icon |
| `Ticker.spec` no overflow | `scrollWidth` 600 ≤ `clientWidth` 800 | No `is-scrolling`, no button |
| `Ticker.spec` region | Render | Root `section` has `aria-labelledby` equal to the `id` of the tag span with text "Notice" |
| `Footer.spec` social | Render | 3 `a` elements with `aria-label` "Facebook", "X (Twitter)", "YouTube" in that order; each `href` starts with `https://`; none is `#`; each contains an `svg[aria-hidden="true"]` |
| `Footer.spec` hotlines | Render | 5 links with hrefs `tel:333`, `tel:999`, `tel:109`, `tel:106`, `tel:1090` |
| `Footer.spec` contact | Render | `a[href="tel:+880255665001"]` with text "+880-2-55665001-6"; `a[href="mailto:webmaster@bb.org.bd"]` |
| `Footer.spec` contact bn | `setLang('bn')` | Phone link text is "+৮৮০-২-৫৫৬৬৫০০১-৬" and `href` is still `tel:+880255665001` |
| `Footer.spec` columns | Render | 6 useful links, 6 about links; bottom "Home" link has `href="/"` |
| `default.spec` order | Mount the layout with slot text "X" | `.bb-app` children in order: `a.bb-skip-link`, `header`, `nav`, `section` (ticker), `main#main[tabindex="-1"]` containing "X", `footer`; `header` contains no `nav` |
| `default.spec` html lang | `setLang('bn')` | `useHead` input has `htmlAttrs.lang === 'bn'` |
| `icons.spec` (updated) | `Object.keys(ICONS)` | 20 keys; the first 18 are unchanged and verbatim; `pause` and `play` are the last 2 |
| i18n parity (CP03) | `en.a11y`, `bn.a11y` | Same 5 keys, all non-empty strings |

## Visual QA (Chrome DevTools MCP vs prototype)
Setup: tab A = `file://…/02-Design/Bangladesh Bank.html`; tab B = `http://localhost:3000/` from `npx serve .output/public`. Viewport 1280 × 900. Read values with `evaluate_script` and `getComputedStyle`. Check each item in `en`, then click "বাংলা" in both tabs and check the text items again.
- [ ] Utility bar background is `#0A3D2C` (`rgb(10, 61, 44)`) and height is `36px`
- [ ] Red dot is 6 × 6 px, `#F42A41` (`rgb(244, 42, 65)`); government text is `11.5px`, weight `500`, color `rgba(255, 255, 255, 0.6)`
- [ ] RTI/Sitemap/Feedback are `12px`, color `rgba(255, 255, 255, 0.78)`; on `hover` the color is `rgb(255, 255, 255)`
- [ ] Active language button: background `#FFFFFF`, color `#0A3D2C`; inactive: transparent, `rgba(255, 255, 255, 0.8)`; both have padding `6px 13px` and font size `11.5px`
- [ ] Masthead background is `#006A4E` (`rgb(0, 106, 78)`), inner height `92px`, `border-bottom` `3px solid rgb(244, 42, 65)`
- [ ] Crest circle is 54 × 54 px with a white background; the landmark icon is 28 × 28 px in `#006A4E`
- [ ] Bank name is `22px`, weight `700`, `#FFFFFF`; "CENTRAL BANK OF BANGLADESH" is `11px`, uppercase, `letter-spacing` `1.32px`
- [ ] Search pill is `300px` wide, `border-radius` `999px`, background `rgba(255, 255, 255, 0.16)`; placeholder computed color (via `::placeholder`) is `rgb(255, 255, 255)` with opacity `1` (intended change, audit 9)
- [ ] Nav background is `#FFFFFF`, `border-bottom` `1px solid rgb(224, 228, 232)` (`#E0E4E8`), `position: sticky`, `top: 0px`, `z-index: 50`
- [ ] Nav items are `14px`, weight `600`, padding `15px 14px`; inactive color `#3a4a5e` (`rgb(58, 74, 94)`); active "Home" has color `#006A4E` and `border-bottom` `3px solid rgb(0, 106, 78)`
- [ ] After `window.scrollTo(0, 1000)`, `document.querySelector('nav').getBoundingClientRect().top === 0` (audit 1)
- [ ] Ticker background is `#FFF8E1`, `border-bottom` `1px solid #F2E2A8`; tag background is `#F42A41`, font `10px`, padding `5px 10px`; notice text is `13px`, `#7A5A00` (`rgb(122, 90, 0)`)
- [ ] With "Emulate CSS prefers-reduced-motion: reduce", the ticker row in tab B matches tab A pixel for pixel (static, ellipsis, no button)
- [ ] Without reduced motion, if the notice overflows: the text moves; `getAnimations()` on the text returns 1 running animation; hovering sets `animationPlayState` to `paused`; the ticker row height equals tab A's row height
- [ ] "View all" is `12.5px`, weight `600`, `#006A4E`; on hover `#F42A41`
- [ ] Footer background is `#0A3D2C`, `border-top` `3px solid rgb(244, 42, 65)`; grid columns use the ratio `1.6fr 1fr 1fr 1fr` with `40px` gap
- [ ] Footer headings are `11px`, `#5FBE9E` (`rgb(95, 190, 158)`); contact lines `13px`, line height `22.1px`, `rgba(255, 255, 255, 0.7)`
- [ ] Social circles are 32 × 32 px, `border` `1px solid rgba(255, 255, 255, 0.2)`; on hover `border-color` is `rgb(0, 106, 78)` and the icon is `#FFFFFF`
- [ ] Hotline numbers are JetBrains Mono `15px`, weight `700`, `#FFFFFF`; labels `12px`, `rgba(255, 255, 255, 0.6)`
- [ ] Disclaimer is `11.5px`, `rgba(255, 255, 255, 0.38)`; the label "Disclaimer." is weight `600`, `rgba(255, 255, 255, 0.6)`
- [ ] Full-page screenshots of tab A and tab B, cropped to the chrome (utility bar to ticker, and footer), show 0 visible differences in `en` and in `bn` (the only allowed difference: placeholder color)
- [ ] Console has 0 errors and 0 warnings on all 5 routes, in both languages

## Accessibility
- [ ] WCAG 2.4.1 Bypass Blocks: the first `Tab` on a fresh load focuses `a.bb-skip-link` ("Skip to main content"), and it becomes visible at top-left; `Enter` moves `document.activeElement` to `main#main`
- [ ] WCAG 1.3.1 Info and Relationships: the `take_snapshot` accessibility tree shows the landmarks `banner` (header), `navigation "Primary"`, `region "Notice"`, `main` and `contentinfo` (footer), each exactly once
- [ ] WCAG 2.4.8 Location / 4.1.2 Name, Role, Value: the active nav link has `aria-current="page"` on `/`, `/monetary-policy`, `/financial-system` and `/publications`, and none on `/services`
- [ ] WCAG 4.1.2: the 4 no-op nav items are announced as `button` with `disabled`/`aria-disabled="true"`; the language buttons announce `pressed` state
- [ ] WCAG 2.2.2 Pause, Stop, Hide (audit 3): when the ticker moves, the pause button is reachable by `Tab`, toggles with `Enter` and `Space`, and stops the motion within 1 frame (`animationPlayState === 'paused'`)
- [ ] WCAG 2.2.2 and 2.3.3 Animation from Interactions (AAA, applied as a user preference): with `prefers-reduced-motion: reduce`, `getAnimations().length === 0` on the ticker text
- [ ] WCAG 1.1.1 Non-text Content and 2.4.4 Link Purpose (audit 7): the 3 social links have the accessible names "Facebook", "X (Twitter)" and "YouTube"; no link in the footer has an empty accessible name
- [ ] WCAG 1.4.3 Contrast Minimum (audit 9): search placeholder `#FFFFFF` on the composited pill `#29826A` is ≥ 4.5:1 (measured 4.67:1)
- [ ] WCAG 1.4.3, design colors that pass (do not regress): utility text 5.42:1, utility links 8.05:1, nav inactive `#3a4a5e` on `#FFFFFF` 9.05:1, nav active 6.62:1, notice text `#7A5A00` on `#FFF8E1` 6.01:1, footer links 6.84:1, footer headings `#5FBE9E` 5.44:1
- [ ] WCAG 1.4.3, design colors that fail, recorded for the CP11 decision and not changed here: notice tag `#FFFFFF` on `#F42A41` 4.00:1 (10px bold), footer copyright `rgba(255,255,255,.5)` on `#0A3D2C` 4.26:1, disclaimer `rgba(255,255,255,.38)` on `#0A3D2C` 3.11:1
- [ ] WCAG 2.4.7 Focus Visible: every focusable chrome element (skip link, language buttons, home link, search field, 8 nav items, ticker button, social links, `tel:`/`mailto:` links, footer Home) shows a visible outline when focused with the keyboard
- [ ] WCAG 3.1.1 Language of Page: `document.documentElement.lang` is `en`, and becomes `bn` after clicking "বাংলা"
- [ ] WCAG 3.1.2 Language of Parts: the "বাংলা" button has `lang="bn"` while the page is `en`, and the "English" button has `lang="en"` while the page is `bn`
- [ ] WCAG 2.5.8 Target Size (Minimum): the social links are 32 × 32 px (≥ 24 × 24 px, pass). The ticker button is 20 × 20 px; it passes through the spacing exception only if no other target lies within 24 px of its center. Measure the distance to "View all" with `getBoundingClientRect()` and record it for the CP11 review

## Responsive
Breakpoints are added in CP11 (Decision D2). At CP07 the layout is desktop-first; these checks set the baseline that CP11 must improve.
- [ ] 1280 px: pixel match with the prototype as above; `document.documentElement.scrollWidth === 1280` (no horizontal scroll)
- [ ] 768 px: chrome renders with no overlapping text; the search pill width equals `34vw` = `261.12px`; the sticky nav still has `top === 0` after scrolling; record `document.documentElement.scrollWidth` in the CP07 QA notes as the CP11 starting value
- [ ] 375 px: the skip link, the language toggle and the sticky nav still work (keyboard and click); the search pill is `127.5px` wide (`34vw`); record `scrollWidth` (the 8 nav items are expected to overflow here; CP11 adds the mobile menu that audit issue 1 asks for)
- [ ] 375 px, 768 px, 1280 px: the ticker never makes the row taller than tab A's row at the same width

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
