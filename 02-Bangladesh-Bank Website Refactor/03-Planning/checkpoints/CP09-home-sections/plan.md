# CP09 — Home — remaining sections: Plan

All paths are relative to `Bangladesh Bank New Website/`. Some of these files already exist from an earlier draft port. For each existing file: diff it against the prototype lines listed in "Design source", change only what differs, and do not rewrite working code.

## Files to create or change
| File | Action | Responsibility |
|------|--------|----------------|
| `app/pages/index.vue` | Change | Compose sections in prototype order: `HomeMarketRow`, `HomeNewsRates` (inside the 20 px top band), then `HomeExploreDirectory`, `HomeCipcBanner`, `HomeCitizenServices`, `HomeGovernorSection`, `HomeHotlineStrip`. `<main id="main">` (skip-link target from CP07). |
| `app/components/home/NewsRates.vue` | Create / align | 2-column grid `minmax(0,2fr) minmax(0,1fr)`, gap 16 px, margin-bottom 16 px, `align-items: start`. Holds `HomeNewsPanel` and a column (`flex`, gap 20 px) of `HomePolicyRates` + `HomeReserveRatios`. |
| `app/components/home/NewsPanel.vue` | Create / align | Green header bar (`#006A4E`, padding 13 px 20 px), title + "View all" link, 10 news rows with 5 px dot and optional "New" badge. |
| `app/components/home/PolicyRates.vue` | Create / align | Dark header (`#0A3D2C`) with `trend` icon 15 px, 4 label/value rows, "Last updated: 15 Feb 2026". |
| `app/components/home/ReserveRatios.vue` | Create / align | Dark header with `bank` icon 15 px, 3-column grid `1fr 52px 52px`, header row Category/SLR/CRR, 4 rows, "Last updated: 09 May 2024". Rows get `role="table"` / `role="row"` / `role="columnheader"` / `role="cell"`. |
| `app/components/home/ExploreDirectory.vue` | Create / align | Eyebrow + `<h2>`, grid `repeat(4, minmax(0,1fr))` gap 18 px of 8 `HomeModuleCard`, "More:" label + 8 chips. Holds the positional module meta (icon + route) from prototype lines 873–875. |
| `app/components/home/ModuleCard.vue` | Create / align | The single module card used by all 8 modules (audit 6). Props: `title`, `links`, `icon`, `to` (`string \| null`). Renders `NuxtLink` when `to` is set, `<div>` when `null`. |
| `app/components/home/CipcBanner.vue` | Create / align | Green banner, red phone disc, title/sub, "Call" + `<a href="tel:16236">16236</a>`, white "Submit complaint" button. |
| `app/components/home/CitizenServices.vue` | Create / align | Eyebrow + `<h2>`, grid `repeat(5, minmax(0,1fr))` gap 16 px of 5 `HomeServiceCard`; icon list `['globe','file','note','shield','book']` (prototype line 878). |
| `app/components/home/ServiceCard.vue` | Create / align | The single service card (audit 4, 6). Props: `title`, `desc`, `icon`. Renders `NuxtLink to="/services"` (prototype: every service calls `setSvc`). |
| `app/components/home/GovernorSection.vue` | Create / align | Compact governor card (audit 5): `BaseImageSlot` 4/5 radius 14, eyebrow, message, name, role, outline button with `arrow` icon. |
| `app/components/home/HotlineStrip.vue` | Create / align | Hotline region (audit 8): red 22×3 px bar + eyebrow with `id="hotlines-title"`, flex-wrap strip of 5 `tel:` links. |
| `tests/unit/home/NewsPanel.spec.ts` | Create | Unit tests (test root and mount helper from CP01). |
| `tests/unit/home/ModuleCard.spec.ts` | Create | Unit tests. |
| `tests/unit/home/ExploreDirectory.spec.ts` | Create | Unit tests. |
| `tests/unit/home/ServiceCard.spec.ts` | Create | Unit tests. |
| `tests/unit/home/GovernorSection.spec.ts` | Create | Unit tests. |
| `tests/unit/home/HotlineStrip.spec.ts` | Create | Unit tests. |
| `tests/unit/home/CipcBanner.spec.ts` | Create | Unit tests. |

No change to `app/i18n/*.ts` is expected: every key used here (`newsTitle`, `viewAll`, `newBadge`, `news`, `policyRatesTitle`, `policyRates`, `lastUpd`, `reserveTitle`, `category`, `reserves`, `exploreEyebrow`, `exploreTitle`, `moreLabel`, `moreLinks`, `modules`, `cipc*`, `svcEyebrow`, `svcTitle`, `services`, `gov*`, `hotlineEyebrow`, `hotlines`) was typed in CP03. If a key is missing, add it to `types.ts`, `en.ts` and `bn.ts` together, copied from prototype lines 542–696 (en) and 697–851 (bn).

## Steps
1. Create branch `cp09-home-sections` from the CP08 green commit.
2. Run `npx nuxi typecheck` and `npx vitest run` to confirm the CP08 baseline is green before touching anything.
3. Port `NewsPanel.vue` from lines 136–149: card `#fff`, border `1px solid #E0E4E8`, radius 12 px, `overflow: hidden`; header `#006A4E`, title `600 13px/1 Inter`, letter-spacing .06em, uppercase; "View all" `500 12px/1 Inter`, `rgba(255,255,255,.85)`, `:hover { color: #fff }`; rows padding 12 px 20 px, border-bottom `1px solid #EDF0F3`, `transition: background .12s`, `:hover { background: #F7FAF8 }`; text `400 13.5px/1.45 Inter` `#1a1a1a`; badge `#F42A41` bg, `#fff`, `700 9px/1 Inter`, letter-spacing .04em, padding 2 px 5 px, radius 3 px, margin-left 7 px.
4. Port `PolicyRates.vue` from lines 155–168 and `ReserveRatios.vue` from lines 171–190 with the exact values in those lines (header `#0A3D2C`, `600 12px/1 Inter`, letter-spacing .05em, padding 11 px 16 px; values `JetBrains Mono` `#006A4E` `tabular-nums`; footnote `400 10.5px/1 JetBrains Mono` `#9aa39e`). Keep the dates `15 Feb 2026` and `09 May 2024` as literal strings exactly as the prototype does.
5. Compose `NewsRates.vue` from lines 133–194 and confirm the row with CP08 inside `index.vue` (`.top-inner` padding `20px var(--bb-gutter) 0`).
6. Port `ModuleCard.vue` from lines 206–219: border `1px solid #E0E4E8`, radius 14 px, padding 20 px, `flex-direction: column`, gap 13 px, `transition: box-shadow .18s ease, border-color .18s ease`; `:hover { border-color: #006A4E; box-shadow: 0 6px 18px rgba(0,106,78,.08) }`; icon tile 40×40, radius 11 px, `#E4F1EC`, icon 20 px; arrow 16 px opacity .8; `<h3>` `600 15px/1.25 Inter` `#006A4E`; list gap 7 px, items `400 12.5px/1.4 Inter` `#4A4A4A`, 3 px dot `#006A4E` margin-top 7 px. Add `:focus-visible { outline: 2px solid #006A4E; outline-offset: 2px }` for the link variant (focus state only, D1).
7. Port `ExploreDirectory.vue` from lines 197–231: padding `24px 40px 16px`; eyebrow bar 22×3 px `#006A4E` radius 2 px; eyebrow `600 11px/1.2 Inter`, letter-spacing .1em, uppercase, `#4A4A4A`; `<h2>` `700 18px/1.2 Inter`, letter-spacing −0.01em, `#006A4E`, margin `0 0 16px`. Module meta in order: `landmark→/monetary-policy`, `shield→/financial-system`, `globe→null`, `coins→null`, `card→null`, `trend→null`, `book→/publications`, `note→null` (lines 873–875, routes from `VIEW_ROUTES`). Chips: `500 12.5px/1 Inter`, `#006A4E`, border `1px solid #C5E0D6`, bg `#F7FAF8`, radius 999 px, padding 7 px 14 px, `:hover { background: #E4F1EC; border-color: #006A4E }`, `transition: background .15s, border-color .15s`.
8. Port `CipcBanner.vue` from lines 234–253: padding `16px 40px`; banner `#006A4E`, radius 14 px, padding 22 px 28 px, `flex-wrap: wrap`, gap 24 px; disc 48×48 `#F42A41` with `phone` icon 22 px; title `600 16px/1.25 Inter`; sub `400 12.5px/1.4 Inter` `rgba(255,255,255,.75)`; "Call" `400 12px/1 Inter` `rgba(255,255,255,.7)`; number `700 30px/1 JetBrains Mono` `#fff` wrapped in `<a href="tel:16236">` with `color: inherit; text-decoration: none`; button `#fff` / `#006A4E`, radius 8 px, padding 10 px 18 px, `600 13px Inter`, `:hover { background: #DCEFE6 }`, `transition: background .15s`, `type="button"`.
9. Port `ServiceCard.vue` from lines 265–269 and `CitizenServices.vue` from lines 256–273: card radius 12 px, padding 18 px, gap 11 px, `transition: border-color .18s, box-shadow .18s`, `:hover { border-color: #006A4E; box-shadow: 0 6px 16px rgba(0,106,78,.08) }`; tile 38×38, radius 10 px, `#DCEFE6`; title `600 14px/1.3 Inter` `#006A4E`; desc `400 12px/1.5 Inter` `#4A4A4A`; `<h2>` margin `0 0 14px`. Root element `NuxtLink to="/services"` with `display: flex` so the box is identical to the prototype `<div>`.
10. Port `GovernorSection.vue` from lines 276–296: padding `16px 40px 0`; card radius 14 px, padding 28 px, grid `160px 1fr`, gap 32 px, `align-items: center`; `BaseImageSlot` `aspect-ratio: 4/5`, radius 14, placeholder `L.govPhoto`; eyebrow bar 26×3 px, margin-bottom 12 px; message `<p>` `400 17px/1.55 Inter`, letter-spacing −0.005em, `#1a1a1a`, `max-width: 72ch`, margin `0 0 18px`; name `600 15px/1.3 Inter` `#006A4E`; role `400 13px/1.4 Inter` `#4A4A4A`; button transparent, border `1.5px solid #006A4E`, radius 8 px, padding 9 px 16 px, `600 13px Inter`, `:hover { background: #006A4E; color: #fff }`, `transition: background .16s, color .16s`, `type="button"`, arrow icon `aria-hidden`.
11. Port `HotlineStrip.vue` from lines 299–314: padding `16px 40px 28px`; bar 22×3 px `#F42A41`; eyebrow `<span id="hotlines-title">`; root `<section role="region" aria-labelledby="hotlines-title">`; strip `display:flex; gap:14px; flex-wrap:wrap`; each item is `<a :href="'tel:' + h.num">` with the card box: `#fff`, border `1px solid #E0E4E8`, radius 10 px, padding 13 px 18 px, gap 13 px, `flex: 1`, `min-width: 170px`, `text-decoration: none`; number `700 22px/1 JetBrains Mono` `#F42A41`; label `500 12.5px/1.3 Inter` `#4A4A4A`; `:focus-visible { outline: 2px solid #006A4E; outline-offset: 2px }`. No `aria-label` on the link: the visible text already forms the name (WCAG 2.5.3).
12. Make every decorative icon in these components render through `BaseIcon` (which is `aria-hidden="true"` since CP05).
13. Write the 7 spec files listed above (cases in `test-criteria.md`).
14. Run the validation loop: `npm run generate`, `npx nuxi typecheck`, `npx eslint .`, `npx vitest run`.
15. Run the port check: `grep -rnE 'sc-for|sc-if|style-hover|<image-slot|onClick="\{\{' app/` must print nothing.
16. Visual QA with Chrome DevTools MCP: open the prototype file and `http://localhost:3000/` in two tabs at 1280×900, screenshot each section in `en` and `bn`, check every box in `test-criteria.md`.
17. Ask for approval, then commit: `git commit -m "feat(home): CP09 remaining home sections with audit fixes 4, 5, 6, 8"`.

## Design source
`02-Design/Bangladesh Bank.html`:
- Lines 132–194 — news and rate panels (news 136–149, policy rates 155–168, reserve ratios 171–190).
- Lines 196–231 — explore directory (module card 206–219, chips 224–229).
- Lines 233–253 — CIPC banner.
- Lines 255–273 — citizen services (service card 265–269).
- Lines 275–296 — governor card.
- Lines 298–314 — hotlines.
- Lines 586–626 (en) and 741–781 (bn) — `auctions` … `hotlines` content keys.
- Lines 873–879 — `modIcons`, `modClicks`, `svcIcons`, `services` mapping.

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Module cards with `noop` click (FX, G-Sec, Payment Systems, Economic Data, Investment Facility) | Render as `<div>` with the same styles, `cursor: pointer` kept | Fidelity (R2 pattern). A `<div>` without a handler is not announced as a link, so no false affordance for screen readers. |
| Module and service cards with a route | `NuxtLink` as the card root | Keyboard and screen-reader access (WCAG 2.1.1) with an unchanged box; replaces the prototype `onClick` on a `<div>`. |
| Hotline region name | `aria-labelledby` the visible eyebrow, not a hard-coded `aria-label="Emergency hotlines"` | The master plan asks for a labelled region; using the eyebrow keeps the name bilingual and in sync with visible text. |
| Hotline link name | No `aria-label`; visible "999 National emergency service" is the name | WCAG 2.5.3 Label in Name; avoids duplicate English names in Bangla mode. |
| CIPC `16236` | Wrap in `tel:` link | Same failure class as audit 8; invisible change (D1). |
| Reserve ratios grid | ARIA table roles on the existing `div` grid, not a `<table>` | Gives WCAG 1.3.1 semantics without re-styling a native table (D1). |
| "View all", chips, "Submit complaint", "Read full message" | `<a>` without `href` / `<button type="button">` with no action | The prototype defines no target. Listed in the dead-link register for a later phase (R2). |

## Risks
| Risk | Mitigation |
|------|------------|
| `NuxtLink` adds `color`/`text-decoration` defaults that shift pixels | Global reset `a { text-decoration: none; color: inherit }` from prototype line 20 is in `base.css` (CP02); verify computed color of every card title equals `rgb(0, 106, 78)`. |
| Bangla module or news text wraps differently and breaks card heights | Grid rows use default `align-items: stretch`; compare `bn` screenshots at 1280 px against the prototype in `bn`. |
| Design colors below 4.5:1: `#9aa39e` on `#fff` = 2.59:1 (footnotes, "More:"), white on `#F42A41` = 4.0:1 ("New" badge 9 px), `rgba(255,255,255,.7)` on `#006A4E` = 4.09:1 ("Call") | Do not change in CP09 (fidelity rule). Record each in `../05-Qa/contrast-register.md` for the CP11 decision. |
| Hotline `tel:` links inherit link color | Set `color` explicitly on `.num` (`#F42A41`) and `.label` (`#4A4A4A`). |
| Copy drift between `en.ts`/`bn.ts` and the prototype | Key-parity test from CP03 must stay green; spot-check 3 strings per section with `grep` against lines 542–851. |

## Estimated effort
10 hours (6 h porting 13 components, 2 h unit tests, 2 h visual QA in two languages).
