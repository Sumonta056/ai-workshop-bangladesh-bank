# CP09 — Home — remaining sections: Goal

## Goal
The home route `/` renders every section below the market data row (news and rate panels, explore directory, CIPC banner, citizen services, governor card, hotlines) pixel-matched to `02-Design/Bangladesh Bank.html` lines 132–314 in English and Bangla, with audit fixes 4, 5, 6 and 8 in place.

## Why this checkpoint exists
CP08 only delivers the top market row, so the home page is still 80 % empty. Four of the nine audit issues (4, 5, 6, 8) live in these sections, and two of them are High severity. If we skip this checkpoint, CP11 has no complete home page to QA and the emergency hotlines stay non-tappable, which is the audit's most serious public-service failure.

## In scope
- News and rate panels row (2fr / 1fr grid): `HomeNewsRates` → `HomeNewsPanel`, `HomePolicyRates`, `HomeReserveRatios`.
- Explore directory: eyebrow, `<h2>`, 8 module cards through one `HomeModuleCard`, "More:" chip row (8 chips).
- CIPC banner: phone icon, title, sub-line, `16236` as a `tel:` link, "Submit complaint" button.
- Citizen services: eyebrow, `<h2>`, 5 cards through one `HomeServiceCard`, each linking to `/services`.
- Governor card: 160 px portrait slot, eyebrow, message, name, role, "Read full message" button.
- Hotlines strip: 5 hotlines as `<a href="tel:…">` inside a labelled region.
- Composition of all sections in `app/pages/index.vue` in prototype order.
- Vitest unit tests for each section component.

## Out of scope
- Market data row and auctions card (CP08).
- Layout chrome, ticker, footer hotlines column (CP07).
- Responsive breakpoints at 768 px and 375 px (CP11, decision D2). CP09 builds every grid with `minmax(0, 1fr)` columns so CP11 only adds `@media` rules.
- Real destinations for "View all", "More" chips, module links, "Submit complaint" and "Read full message" — the prototype has none (R2, later phase).
- Contrast changes to design colors (logged for CP11, see `plan.md` Risks).

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| 2 — Fixed narrow page width (~843 px) | High | Every section uses the `--bb-max: 1240px` container with `--bb-gutter: 40px`; the 4-column module grid, 5-column service grid and 2fr/1fr news grid fill the width at 1280 px. Columns use `minmax(0, 1fr)` so CP11 can collapse them. |
| 4 — Red/green card borders without meaning | High | All 13 home cards (8 modules + 5 services) share one border: `1px solid #E0E4E8` (`--bb-border`), hover `#006A4E` (`--bb-green`). `#F42A41` (`--bb-red`) appears only on alert/emergency meaning: the "New" badge, the CIPC phone disc, the hotline eyebrow bar and the hotline numbers. No card border uses red. The "New" badge carries the text "New"/"নতুন", so meaning is not conveyed by color alone (WCAG 1.4.1). |
| 5 — Governor section wasted space | Medium | Compact card: `grid-template-columns: 160px 1fr`, `gap: 32px`, `padding: 28px`. The right column holds the full institutional message (`govMsg`, 17 px, max 72ch), name, role and a descriptive "Read full message" / "সম্পূর্ণ বাণী পড়ুন" button with arrow icon, replacing the old "more....". |
| 6 — Card icon/border misalignment | Medium | One `HomeModuleCard.vue` renders all 8 module cards: icon tile 40×40 px, radius 11 px, `#E4F1EC` background, header row `align-items: center; justify-content: space-between`; one arrow icon (16 px) for every card; identical border, radius 14 px, padding 20 px, gap 13 px. One `HomeServiceCard.vue` does the same for the 5 service cards (38×38 tile, radius 10 px, `#DCEFE6`). |
| 8 — Hotlines as bitmap images | High | Each of the 5 hotlines (333, 999, 109, 106, 1090) is real HTML text inside `<a href="tel:999">` etc. The strip is `<section role="region" aria-labelledby="hotlines-title">`, labelled by the visible eyebrow, so the region name is bilingual ("National emergency hotlines" / "জাতীয় জরুরি হটলাইন"). Labels come from `L.hotlines[].label` in both languages. CIPC `16236` also becomes `<a href="tel:16236">`. |

## Depends on
CP08

## Demo at the end
Run `npm run generate && npx serve .output/public -l 3000`, open `http://localhost:3000/` next to the prototype at 1280 px: the whole home page matches section by section. Click "বাংলা" in the utility bar: every section switches to Bangla with no URL change. Tab to the hotlines: each number gets a focus ring and its accessible name reads "999 National emergency service". On a phone or in Chrome device mode, tapping "999" opens the dialer.
