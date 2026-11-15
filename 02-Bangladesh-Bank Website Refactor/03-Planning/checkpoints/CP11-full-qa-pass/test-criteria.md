# CP11 — Full QA pass: Test Criteria

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors (`npx nuxi typecheck` and `npx eslint .` print 0 errors)
- [ ] `npx vitest run` is green (all CP01–CP11 tests)
- [ ] `grep -rnE 'sc-for|sc-if|style-hover|<image-slot|onClick="\{\{' app/` prints nothing
- [ ] `grep -rn "@media" app/ | grep -v "max-width: 1024px\|max-width: 600px\|prefers-reduced-motion"` prints nothing (only the 2 agreed breakpoints and reduced motion exist)
- [ ] `../05-Qa/screenshots/` contains 30 site screenshots named `<route>-<lang>-<width>.png` and 10 prototype screenshots

## Unit tests (Vitest)
| Test | Input | Expected result |
|------|-------|-----------------|
| `<html lang>` default | mount default layout, no `setLang` call | head `htmlAttrs.lang` is `en` |
| `<html lang>` switch | `setLang('bn')` | head `htmlAttrs.lang` is `bn`; `setLang('en')` sets it back to `en` |
| Home heading | mount `pages/index.vue`, `lang = 'en'` | exactly one `<h1>`, text "Bangladesh Bank", class `bb-sr-only` |
| Home heading Bangla | `lang = 'bn'` | `<h1>` text "বাংলাদেশ ব্যাংক" |
| Locale key parity (from CP03, must still pass) | `en`, `bn` dictionaries | identical key sets at every depth, including `pages.mp/fin/pub/svc` |
| Language persists across routes | `setLang('bn')`, navigate `/` → `/publications` | `useLocale().lang.value` is still `bn` |

## Visual QA (Chrome DevTools MCP vs prototype)
- [ ] 1280 px: all 10 views (5 routes × en/bn) show 0 visible deltas against the 10 prototype screenshots
- [ ] 1280 px: content band max-width is 1240 px, `--bb-gutter` computes to `40px`
- [ ] 768 px: `--bb-gutter` computes to `24px`; 375 px: `16px`
- [ ] Masthead background #006A4E with bottom border `3px solid #F42A41` and height 92 px at 1280 px; utility bar and footer background #0A3D2C
- [ ] Sticky nav: after scrolling 1500 px on `/`, the nav `getBoundingClientRect().top` is `0` at 1280, 768 and 375 px
- [ ] Active nav underline is `3px solid #006A4E` on `/`, `/monetary-policy`, `/financial-system`, `/publications`; no active item on `/services`
- [ ] Language toggle: active button background #fff with text #0A3D2C; switching language keeps the URL unchanged on all 5 routes
- [ ] Language persists after clicking a nav link (choose বাংলা on `/`, click মুদ্রানীতি, page is still Bangla)
- [ ] Hover checks on `/`: module card border → #006A4E, news row → #F7FAF8, chip → #E4F1EC, governor button → #006A4E background with #fff text
- [ ] If D4 is approved: "Last updated" footnote color is `rgb(100, 109, 104)` (#646D68), "New" badge background `rgb(214, 32, 58)` (#D6203A), sidebar title `rgb(181, 230, 211)` (#B5E6D3); if rejected, each pair is marked "accepted risk" in `../05-Qa/contrast-register.md`
- [ ] Console has 0 errors and 0 warnings on all 5 routes in both languages

## Accessibility
Audit re-verification (each row needs "Verified" + evidence in `../05-Qa/CP11-qa-report.md`):
- [ ] Issue 1: skip link is the first Tab stop on every route and moves focus to `<main id="main">` (WCAG 2.4.1); `<nav>` has an accessible name; all 8 nav items reachable at 375 px
- [ ] Issue 2: no horizontal page scroll at 375 px on all 5 routes (`document.documentElement.scrollWidth <= 375`) (WCAG 1.4.10)
- [ ] Issue 3: ticker has a pause/play button with an accessible name; ticker stops on hover, on focus, and with `prefers-reduced-motion: reduce` (WCAG 2.2.2)
- [ ] Issue 4: `evaluate_script` over all elements on 5 routes finds 0 card borders with color `rgb(244, 42, 65)`; every red element carries text (WCAG 1.4.1)
- [ ] Issue 5: governor card shows message, name, role and "Read full message" at 1280 px and stacks to one column at 375 px
- [ ] Issue 6: 8 module cards and 5 service cards each come from one component (`HomeModuleCard`, `HomeServiceCard`); icon center Y equals arrow center Y (±1 px) in every module card
- [ ] Issue 7: every icon-only link (utility bar, footer social) has an `aria-label`; `document.querySelectorAll('svg:not([aria-hidden="true"])').length === 0` (WCAG 1.1.1, 4.1.2)
- [ ] Issue 8: 5 hotline `tel:` links + `tel:16236`, region named "National emergency hotlines" / "জাতীয় জরুরি হটলাইন", each link ≥ 24×24 px at 375 px (WCAG 2.5.8)
- [ ] Issue 9: masthead search input has an accessible name; placeholder color on the search field background has contrast ≥ 4.5:1 (WCAG 1.4.3)

General WCAG 2.1 AA:
- [ ] WCAG 3.1.1 Language of Page: `<html lang="en">` in English, `<html lang="bn">` after switching to Bangla
- [ ] WCAG 1.3.1 Info and Relationships: one `<h1>` per route, no skipped heading levels, landmarks `banner`, `navigation`, `main`, `contentinfo` present on all 5 routes
- [ ] WCAG 2.1.1 Keyboard and 2.1.2 No Keyboard Trap: Tab and Shift+Tab traverse every interactive element on `/` and `/monetary-policy` without a trap
- [ ] WCAG 2.4.3 Focus Order: Tab order follows visual order (utility bar → masthead → nav → ticker → content → footer)
- [ ] WCAG 2.4.7 Focus Visible: every Tab stop shows an outline of at least 2 px
- [ ] WCAG 1.4.3 Contrast (Minimum): every pair in `../05-Qa/contrast-register.md` is ≥ 4.5:1 (normal text) or ≥ 3:1 (≥ 18.66 px bold / 24 px), or marked "accepted risk" by the owner under D4
- [ ] WCAG 1.4.4 Resize Text: at 640 px CSS width (200 % of 1280) no text is clipped on all 5 routes
- [ ] WCAG 1.4.12 Text Spacing: with the injected spacing override no text overlaps or is cut off on `/` and `/financial-system`
- [ ] WCAG 2.3.3 / 2.2.2: with `prefers-reduced-motion: reduce` no element animates
- [ ] Lighthouse Accessibility ≥ 95 on all 5 routes (desktop and mobile); scores recorded in the report
- [ ] Lighthouse Performance, SEO and Best Practices recorded for all 5 routes (targets enforced in CP12)
- [ ] Bangla native-speaker review is signed off in the report, with every correction listed

## Responsive
- [ ] 375 px — all 5 routes in both languages: 1-column module, service, market and footer grids; governor stacked; inner sidebar below main column; nav strip scrolls horizontally; no horizontal page scroll; hotline cards wrap to full width
- [ ] 768 px — all 5 routes in both languages: 2-column module, market and footer grids; 3-column service grid; news panel above rate panels; inner sidebar static below main column; no horizontal page scroll
- [ ] 1280 px — all 5 routes in both languages identical to the step-4 desktop baseline (no breakpoint leaks)

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
