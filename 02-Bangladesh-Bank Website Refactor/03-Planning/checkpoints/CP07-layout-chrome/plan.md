# CP07 — Layout chrome: Plan

## Files to create or change
All paths are relative to `Bangladesh Bank New Website/`.

| File | Action | Responsibility |
|------|--------|----------------|
| `app/layouts/default.vue` | Change | `.bb-app` root (line 26), skip link, `<header>` (utility bar + masthead), `<LayoutPrimaryNav>`, `<LayoutTicker>`, `<main id="main" tabindex="-1"><slot /></main>`, `<LayoutFooter>`. Sets `<html lang>` with `useHead` |
| `app/components/layout/UtilityBar.vue` | Create | Lines 29–46: government line, RTI/Sitemap/Feedback, divider, English/বাংলা toggle (`setLang`) |
| `app/components/layout/Masthead.vue` | Create | Lines 49–65: crest + bank name as a home link, search form |
| `app/components/layout/PrimaryNav.vue` | Create | Lines 68–74: renders `useNav().items`; `NuxtLink` for routes, `<button aria-disabled="true">` for no-ops |
| `app/components/layout/Ticker.vue` | Create | Lines 77–83: notice tag, notice text, overflow-only scroll, pause/play control, "View all" |
| `app/components/layout/Footer.vue` | Create | Lines 434–497: brand, contact (`tel:`, `mailto:`), social links, useful links, about links, hotlines (`tel:`), bottom row, disclaimer |
| `app/data/social.ts` | Create | `SOCIAL_LINKS: { icon: 'fb' \| 'x' \| 'yt'; label: string; href: string }[]` |
| `app/data/icons.ts` | Change | Add `pause` and `play` keys (Lucide-style path strings, ISC licence) |
| `app/i18n/types.ts` | Change | Add `a11y: { skipToContent; primaryNav; language; pauseNotices; playNotices }` to `LocaleContent` |
| `app/i18n/en.ts`, `app/i18n/bn.ts` | Change | Values for `a11y` (see step 2) |
| `app/assets/css/base.css` | Change | `.bb-visually-hidden` and `.bb-skip-link` (hidden until `:focus`) |
| `app/pages/*.vue` (5 files) | Change | Remove any page-level `<main>`; the layout owns the landmark |
| `tests/unit/layout/UtilityBar.spec.ts`, `Masthead.spec.ts`, `PrimaryNav.spec.ts`, `Ticker.spec.ts`, `Footer.spec.ts`, `tests/unit/layout/default.spec.ts` | Create | Unit tests in `test-criteria.md` |

## Steps
1. Read lines 26–83 and 434–497 of `02-Design/Bangladesh Bank.html`, plus line 864–866 (language toggle styles) and 857–863 (nav colors). Write the exact values next to each step below as you port them. Use `var(--bb-*)` tokens from CP02 for repeated values and `.bb-container` for `max-width:1240px; margin:0 auto; padding:0 40px`.
2. Add the `a11y` block to `LocaleContent` in `app/i18n/types.ts`, then fill it in both dictionaries:
   - en: `skipToContent: 'Skip to main content'`, `primaryNav: 'Primary'`, `language: 'Language'`, `pauseNotices: 'Pause notices'`, `playNotices: 'Play notices'`
   - bn: `skipToContent: 'মূল বিষয়বস্তুতে যান'`, `primaryNav: 'প্রধান মেনু'`, `language: 'ভাষা'`, `pauseNotices: 'নোটিশ থামান'`, `playNotices: 'নোটিশ চালু করুন'`
   These are new strings (not in the `T` dict). Mark them for the native-speaker review in CP11 (Risk R1). Run the CP03 key-parity test; it must stay green.
3. Add `pause` (`<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>`) and `play` (`<polygon points="6 3 20 12 6 21 6 3"/>`) to `app/data/icons.ts`. Update the CP05 key-set test from 18 to 20 keys, with the 18 prototype keys still first and verbatim.
4. Create `app/data/social.ts` with 3 entries in prototype order: `fb` "Facebook", `x` "X (Twitter)", `yt` "YouTube". The design has no URLs. Get the official Bangladesh Bank profile URLs from the product owner before this step. Each `href` must start with `https://`. Brand names are not translated, so they live in `data/`, not `i18n/`.
5. Add to `app/assets/css/base.css`:
   - `.bb-visually-hidden`: the standard clip pattern (`position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap`).
   - `.bb-skip-link`: visually hidden by default. On `:focus` it shows at `position:fixed; top:8px; left:8px; z-index:100; background:#fff; color:#006A4E; padding:8px 14px; border-radius:8px; font:600 13px var(--bb-font); outline:2px solid #006A4E`.
   Global CSS is needed because the skip link sits in the layout before any scoped component.
6. **`UtilityBar.vue`** (lines 29–46): background `#0A3D2C` (`--bb-green-dark`), inner `.bb-container` with `height:36px; display:flex; align-items:center; justify-content:space-between`.
   - Left: a 6 × 6 px circle `#F42A41` and `L.utilGov` in `font:500 11.5px/1 var(--bb-font); color:rgba(255,255,255,.6); letter-spacing:.03em; gap:8px`.
   - Right (`gap:20px`): 3 `<a>` without `href` (no-op, Risk R2) for `utilRti`, `utilSitemap` and `utilFeedback`, in `font:500 12px/1; color:rgba(255,255,255,.78)`, and `:hover { color:#fff }`. Then a 1 × 16 px divider `rgba(255,255,255,.18)`.
   - Language pill: `<div role="group" :aria-label="L.a11y.language">` with `border:1px solid rgba(255,255,255,.28); border-radius:999px; overflow:hidden`. Inside are 2 `<button type="button">`: "English" (`lang="en"`) and "বাংলা" (`lang="bn"`), each with `:aria-pressed`. Use one scoped class plus an `is-on` modifier instead of the prototype's inline style strings: base `font:600 11.5px var(--bb-font); padding:6px 13px; border:none; cursor:pointer`; on = `background:#fff; color:#0A3D2C`; off = `background:transparent; color:rgba(255,255,255,.8)` (lines 865–866). Click calls `setLang('en' | 'bn')` from `useLocale()`.
7. **`Masthead.vue`** (lines 49–65): background `#006A4E`, `border-bottom:3px solid #F42A41`, inner height `92px`, `gap:32px`.
   - Brand: `<NuxtLink to="/">` (replaces `onClick setHome`) with `display:flex; align-items:center; gap:16px`. The crest is a 54 × 54 px white circle with `border:2px solid rgba(255,255,255,.55)`, `box-shadow:0 2px 8px rgba(0,0,0,.12)`, and `<BaseIcon name="landmark" :size="28" />` in `#006A4E`. Then `L.bankName` (`700 22px/1.05`, `letter-spacing:-0.01em`, `#fff`) and `L.centralBank` (`500 11px/1.2`, `letter-spacing:.12em`, uppercase, `rgba(255,255,255,.82)`, `margin-top:4px`).
   - Search: `<form role="search" @submit.prevent>` styled as the pill: `background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.4); border-radius:999px; padding:9px 18px; width:300px; max-width:34vw; gap:12px`. Inside are a span with `<BaseIcon name="search" :size="17" />` in `rgba(255,255,255,.85)` and `<input :placeholder="L.searchPh" :aria-label="L.searchPh">` with `background:transparent; border:none; outline:none; color:#fff; font:400 14px var(--bb-font); width:100%`.
   - Audit 9 additions: `input::placeholder { color:#FFFFFF; opacity:1 }` and `form:focus-within { outline:2px solid #FFFFFF; outline-offset:2px }`.
8. **`PrimaryNav.vue`** (lines 68–74): root `<nav :aria-label="L.a11y.primaryNav">` with `background:#fff; border-bottom:1px solid #E0E4E8; position:sticky; top:0; z-index:50; box-shadow:0 1px 2px rgba(10,10,10,.03)`. Inner `.bb-container` with `display:flex; align-items:stretch; gap:2px`.
   - For each `item` of `useNav().items`: if `item.to`, render `<NuxtLink :to="item.to" :aria-current="item.active ? 'page' : undefined">`; otherwise render `<button type="button" aria-disabled="true">`. Both get one scoped class: `background:none; border:none; cursor:pointer; font:600 14px var(--bb-font); padding:15px 14px; color:#3a4a5e; border-bottom:3px solid transparent; margin-bottom:-1px; transition:color .15s ease`; `:hover { color:#006A4E }`; `.is-active { color:#006A4E; border-bottom-color:#006A4E }`.
   - Add `:focus-visible { outline:2px solid #006A4E; outline-offset:-2px }`.
9. **`Ticker.vue`** (lines 77–83): root `<section :aria-labelledby="tagId">` with `background:#FFF8E1; border-bottom:1px solid #F2E2A8`. Inner `.bb-container` with `padding:9px 40px; display:flex; align-items:center; gap:16px`.
   - Tag: `<span :id="tagId">` `L.noticeTag` with `background:#F42A41; color:#fff; font:600 10px/1; letter-spacing:.07em; uppercase; padding:5px 10px; border-radius:999px; flex:none`.
   - Text viewport: `<div class="ticker__viewport">` (`flex:1; overflow:hidden`) holding `<span class="ticker__text">` `L.notice` with `font:500 13px/1.4; color:#7A5A00; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block`. This is the server-rendered (static) state and equals the design.
   - Motion (client only, `onMounted`): if `matchMedia('(prefers-reduced-motion: reduce)').matches` is false and `text.scrollWidth > viewport.clientWidth`, set `isScrolling = true`. That adds class `is-scrolling`: `text-overflow:clip; display:inline-block; padding-left:100%; animation:bb-ticker 30s linear infinite`, with `@keyframes bb-ticker { from { transform:translateX(0) } to { transform:translateX(-100%) } }`. Re-check on `resize` (debounced 150 ms) and when `L.notice` changes (language switch).
   - Pause: `.ticker__viewport:hover .is-scrolling, .ticker:focus-within .is-scrolling { animation-play-state:paused }`. Clicking the button toggles `isPaused`, and `.is-paused` sets `animation-play-state:paused` permanently.
   - Control (rendered only `v-if="isScrolling"`, so it never appears in the static and reduced-motion states): `<button type="button" :aria-pressed="isPaused" :aria-label="isPaused ? L.a11y.playNotices : L.a11y.pauseNotices">` 20 × 20 px, `border:1px solid #F2E2A8; border-radius:999px; background:transparent; color:#7A5A00; flex:none`, with `<BaseIcon :name="isPaused ? 'play' : 'pause'" :size="12" />`. It is 20 px high, the same as the notice tag, so the row height does not change.
   - "View all": `<a>` without `href` (no-op) `L.viewAll` with `font:600 12.5px/1; color:#006A4E; gap:5px; white-space:nowrap; flex:none`, `:hover { color:#F42A41 }`, and `<BaseIcon name="chev" :size="15" />`.
   - `@media (prefers-reduced-motion: reduce) { .is-scrolling { animation:none } }` as a CSS safety net.
10. **`Footer.vue`** (lines 434–497): `<footer>` with `background:#0A3D2C; border-top:3px solid #F42A41`. Inner `.bb-container` with `padding-top:48px`. Grid `1.6fr 1fr 1fr 1fr`, `gap:40px`, `padding-bottom:40px`, `border-bottom:1px solid rgba(255,255,255,.12)`.
    - Brand column: 42 × 42 px `#006A4E` circle with `<BaseIcon name="landmark" :size="28" />` in a `transform:scale(.7)` span; `L.bankName` `700 16px/1.1`; `L.centralBank` `500 10px/1.2`, `letter-spacing:.1em`, `rgba(255,255,255,.55)`, `margin-top:3px`.
    - Column headings (`footerContact`, `footerLinks`, `footerAbout`, `footerHotline`): `600 11px/1`, `letter-spacing:.08em`, uppercase, `#5FBE9E`. `margin-bottom` is `11px` for contact and `14px` for the others.
    - Contact lines `400 13px/1.7 rgba(255,255,255,.7)`: `L.address` as text; `L.phone` inside `<a href="tel:+880255665001">` (the first number of the range "55665001-6"; the visible text stays as written, including Bangla digits); `L.email` inside `<a href="mailto:webmaster@bb.org.bd">`.
    - Social (`gap:9px; margin-top:16px`): for each `SOCIAL_LINKS` entry, `<a :href :aria-label="label">` 32 × 32 px circle, `border:1px solid rgba(255,255,255,.2)`, `color:rgba(255,255,255,.7)`, `transition:border-color .16s,color .16s`; `:hover { border-color:#006A4E; color:#fff }`; `:focus-visible { outline:2px solid #fff; outline-offset:2px }`; `<BaseIcon :name="icon" :size="16" />`.
    - Useful and about columns: `L.usefulLinks` and `L.aboutLinks` (6 each) as `<a>` without `href` (no-op), `400 13px/1.4 rgba(255,255,255,.7)`, `gap:10px`, `:hover { color:#fff }`.
    - Hotline column (`gap:11px`): for each `L.hotlines`, `<a :href="'tel:' + h.num">` with the number (`700 15px/1 var(--bb-mono)`, `#fff`, `min-width:40px`) and the label (`400 12px/1.3`, `rgba(255,255,255,.6)`, `gap:10px`).
    - Bottom row (`padding:20px 0; justify-content:space-between; gap:24px; flex-wrap:wrap`): `L.copy` (`400 12px/1.4 rgba(255,255,255,.5)`); links (`gap:22px`, `500 12px/1 rgba(255,255,255,.7)`, `:hover #fff`): `fHome` as `<NuxtLink to="/">`, `fSitemap` and `fFeedback` as no-op `<a>`.
    - Disclaimer (`padding:0 0 28px`): `<p>` `400 11.5px/1.6 rgba(255,255,255,.38)`, `max-width:120ch`, with `<span>` `L.disclaimerLabel` in `rgba(255,255,255,.6)` weight 600, followed by `L.disclaimer`.
11. **`default.vue`**: root `<div class="bb-app">`, children in this order: `<a class="bb-skip-link" href="#main">{{ L.a11y.skipToContent }}</a>`, `<header><LayoutUtilityBar /><LayoutMasthead /></header>`, `<LayoutPrimaryNav />`, `<LayoutTicker />`, `<main id="main" tabindex="-1"><slot /></main>`, `<LayoutFooter />`. Add `useHead({ htmlAttrs: { lang } })` with `lang` from `useLocale()`. The nav must not be inside `<header>`: `position: sticky` only sticks inside its parent box, and the header ends after the masthead.
12. Remove any `<main>` from the 5 page files from CP06, so there is exactly one `<main>` per page.
13. Write the 6 test files (`test-criteria.md`). Use `mountSuspended` from `@nuxt/test-utils/runtime` for components that use `NuxtLink` or auto-imported composables.
14. Run `npm run generate`, `npx nuxi typecheck`, `npx eslint .` and `npx vitest run`. The `check-port.mjs` hook must report no `style-hover`, `sc-for`, `sc-if` or `onClick="{{`.
15. Visual QA in Chrome DevTools MCP at 1280 px, 768 px and 375 px against the prototype, in `en` and `bn` (`test-criteria.md`).
16. Commit after explicit approval: `git commit -m "feat(cp07): layout chrome with audit fixes 1, 3, 7, 9"`.

## Design source
- `02-Design/Bangladesh Bank.html` line **26**: root wrapper (`font-family:'Inter'`, `color:#0A0A0A`, `background:#fff`, `min-height:100vh`, `-webkit-font-smoothing:antialiased`). This becomes `.bb-app` from CP02.
- Lines **28–46**: utility bar. Lines **511–512** and **864–866**: `setEn`/`setBn` and the on/off button styles.
- Lines **48–65**: masthead (crest, names, search pill).
- Lines **67–74**: primary nav. Lines **857–863**: item order and active colors (`#006A4E` / `#3a4a5e`, underline `#006A4E` / `transparent`).
- Lines **76–83**: notice ticker.
- Lines **433–497**: footer.
- Content keys, en lines **543–551** and **627–636**, bn lines **698–706** and **782–790**: `utilGov`, `utilRti`, `utilSitemap`, `utilFeedback`, `bankName`, `centralBank`, `searchPh`, `nav`, `noticeTag`, `notice`, `viewAll`, `footerContact`, `footerLinks`, `footerAbout`, `footerHotline`, `address`, `phone`, `email`, `usefulLinks`, `aboutLinks`, `copy`, `fHome`, `fSitemap`, `fFeedback`, `disclaimerLabel`, `disclaimer`, `hotlines` (en **620–626**, bn **775–781**).
- Line **903–906**: icon sizes (`crestIcon` 28, `searchIcon` 17, `chevIcon` 15, `fbIcon`/`xIcon`/`ytIcon` 16).

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Landmark structure | `<header>` = utility bar + masthead; `<nav>` is a sibling after `<header>`; `<main id="main">` lives in the layout; `<footer>` | Sticky only works if the nav's parent is `.bb-app` (the whole page). One `<main>` in the layout guarantees the skip-link target exists on every route |
| Ticker motion | Static in the HTML; scrolls after mount only when the text overflows and reduced motion is off; pauses on hover, focus or the button | Master-plan fix for issue 3 and Decision D3. The design itself shows a static, ellipsis-cut line (line 80), so the static state stays the default and the first paint matches the design. Motion lets users read the full notice, and the button satisfies WCAG 2.2.2 |
| Ticker control size and visibility | 20 × 20 px, rendered only while scrolling | D3 allows one new visible element. 20 px equals the notice tag height, so the row height and everything below do not move |
| No-op nav items | `<button type="button" aria-disabled="true">` | Risk R2. Keeps the design's `<button>` element (line 71), stays focusable and is announced as unavailable. The route items are real `<a href>` via `NuxtLink`, so they work with middle-click and open in a new tab |
| Other no-op links (utility, footer, "View all") | `<a>` without `href` | Faithful to the design: they do nothing. Without `href` they are not in the tab order and are not announced as broken links. Real targets come in a later phase |
| Search behavior | `<form role="search" @submit.prevent>`; does nothing on submit | Static site, no backend, no runtime fetch. The design field also does nothing. A search service is a later-phase decision |
| Placeholder color | `#FFFFFF`, `opacity:1` | Measured 4.67:1 on `#29826A` (16 % white over `#006A4E`). `rgba(255,255,255,.85)` gives 3.85:1 and fails. Firefox applies `opacity:.54` to placeholders by default, so `opacity:1` is required |
| Text that is not in the design | New `L.a11y` block in both dictionaries | The labels must switch language with the page (WCAG 3.1.2). Keeping them in `LocaleContent` makes the parity test cover them |
| Social URLs and labels | `app/data/social.ts`; same tab, no `target="_blank"` | Brand names do not need translation. The same tab avoids an unannounced new window |
| Footer phone link | `tel:+880255665001` | The design shows a range (`5001-6`). A `tel:` link can dial only one number, so we use the first number of the range |
| Low-contrast colors that the design specifies | Not changed in CP07; measured and handed to CP11 | Principle 1 (fidelity) and D1. The audit lists only the search placeholder (issue 9). The others need an owner decision, not a silent change |

## Risks
| Risk | Mitigation |
|------|------------|
| Sticky nav stops working because a wrapper with `overflow:hidden` is added later | `default.spec.ts` asserts that `nav` is a direct child of `.bb-app`. Visual QA scrolls 1000 px and checks `nav.getBoundingClientRect().top === 0` |
| The ticker measurement runs during SSR and causes a hydration mismatch | The measurement runs only in `onMounted`; `isScrolling` starts `false` on server and client. The console must show 0 hydration warnings |
| The ticker's `padding-left:100%` changes the static pixels | The padding is applied only with `.is-scrolling`. Reduced-motion and SSR screenshots must equal the prototype |
| Bangla `a11y` strings are not reviewed | Listed for the CP11 native-speaker review (Risk R1) |
| Official social URLs are not available | Step 4 is blocked until the product owner provides them. Do not ship `#` links; `Footer.spec.ts` rejects `href="#"` |
| A new `a11y` key breaks the CP03 parity test | Add the key to `types.ts`, `en.ts` and `bn.ts` in the same step, then run `npx vitest run` |
| Design contrast failures (notice tag 4.00:1, footer copyright 4.26:1, disclaimer 3.11:1) are taken for regressions | They are recorded in `test-criteria.md` with their measured values as known design issues for CP11 |

## Estimated effort
10 hours (1 h i18n, data and CSS helpers, 1.5 h utility bar + masthead, 1 h nav, 2 h ticker, 2 h footer, 1.5 h tests, 1 h visual QA)
