# CP11 — Full QA pass: Goal

## Goal
All 5 routes × 2 languages × 3 widths (375, 768, 1280 px) = 30 views are checked against the prototype with 0 visual deltas at 1280 px, the responsive breakpoints from decision D2 are in place, all 9 audit issues are re-verified as fixed, and every route passes WCAG 2.1 AA checks with Lighthouse Accessibility ≥ 95.

## Why this checkpoint exists
CP07–CP10 each verified their own slice. Nobody has yet looked at the whole site as one product: cross-route behavior (language persists across navigation, active nav state), keyboard flow from skip link to footer, and the mobile layout that the prototype never defined (0 `@media` rules). Without CP11 we would release with untested phone layouts, unresolved contrast failures inherited from the design, and no evidence that the 9 audit issues are actually fixed.

## In scope
- Responsive layer (D2): `--bb-gutter` overrides in `tokens.css` and scoped `@media` rules in each grid component; 1280 px stays pixel-exact.
- 30-view screenshot matrix vs the prototype, stored in `../05-Qa/screenshots/`.
- Re-verification of audit issues 1–9 with recorded evidence.
- WCAG 2.1 AA checks on 5 routes in both languages: keyboard, focus, landmarks, headings, names, contrast, reflow, text spacing, language of page.
- Contrast register decision: the design colors below 4.5:1 found in CP07–CP10 (proposed exception D4, needs owner approval).
- `<html lang>` follows the active language (`en` / `bn`).
- Visually hidden `<h1>` on the home route.
- Native-speaker review of Bangla copy (R1).
- Lighthouse runs on 5 routes (Accessibility, Performance, SEO, Best Practices).
- QA report `../05-Qa/CP11-qa-report.md`.

## Out of scope
- New features, new content, new routes.
- Real targets for placeholder links (`about`, `fx`, `gsec`, `pay`, "View all", related links) — later phase (R2).
- CI pipeline, security headers, sitemap and release (CP12).
- A hamburger menu: the nav becomes a horizontally scrollable strip below 1025 px instead (see `plan.md` Decisions).

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| 1 — No persistent navigation bar | High | Fixes the mobile half: at 768 px and 375 px the sticky nav stays visible as a horizontally scrollable strip (all 8 items reachable, no page scroll). Re-verifies the CP07 fix: nav `position: sticky; top: 0` at all 3 widths, skip link is the first Tab stop, `<nav aria-label>` present. |
| 2 — Fixed narrow page width (~843 px) | High | Fixes the responsive half: grids collapse at ≤1024 px and ≤600 px; `--bb-gutter` becomes 24 px / 16 px; no horizontal page scroll at 375 px. Re-verifies 1240 px max band at 1280 px. |
| 3 — Auto-rotating banner, no pause | High | Re-verify (fixed in CP07): ticker pause/play button exists, has a name, pauses on hover and focus, and does not move with `prefers-reduced-motion: reduce` (WCAG 2.2.2). |
| 4 — Red/green card borders without meaning | High | Re-verify (CP02, CP09): no card border uses #F42A41 on any route; red only on alert/emergency elements with text (WCAG 1.4.1). |
| 5 — Governor section wasted space | Medium | Re-verify (CP09): compact 160 px / 1fr card with message and "Read full message"; at 375 px it stacks to one column with no blank area. |
| 6 — Card icon/border misalignment | Medium | Re-verify (CP09): all 8 module cards and 5 service cards come from one component each; icons centered in the header row at all 3 widths. |
| 7 — Social icons without labels | Medium | Re-verify (CP07): every icon-only link in utility bar and footer has an `aria-label`; every `BaseIcon` is `aria-hidden`. |
| 8 — Hotlines as bitmap images | High | Re-verify (CP09): 5 `tel:` links + `tel:16236`, labelled region, bilingual; tap targets ≥ 24×24 px at 375 px (WCAG 2.5.8). |
| 9 — Decorative header, low-contrast search | Low | Re-verify (CP07): masthead 92 px high with a real search input; placeholder contrast ≥ 4.5:1 on #006A4E (WCAG 1.4.3). |

## Depends on
CP09, CP10

## Demo at the end
Open `../05-Qa/CP11-qa-report.md`: a 30-row screenshot matrix with links to images, a 9-row audit table with "Verified" and evidence for each issue, and the 5 Lighthouse scores per route. Then live: open `http://localhost:3000/` in Chrome device mode at 375 px, scroll the whole home page with no horizontal scroll, swipe the nav strip, tap "999", switch to বাংলা and see `<html lang="bn">` in the Elements panel.
