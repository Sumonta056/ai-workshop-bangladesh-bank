# CP10 — Shared inner-page system: Plan

All paths are relative to `Bangladesh Bank New Website/`. Some files already exist from an earlier draft port. For each existing file: diff it against the prototype lines in "Design source", change only what differs.

## Files to create or change
| File | Action | Responsibility |
|------|--------|----------------|
| `app/components/inner/InnerPage.vue` | Create / align | Props `{ view: InnerPageKey }`. `page = computed(() => L.value.pages[props.view])`. `<main id="main">` (skip-link target from CP07), background `#fff`. Renders `InnerHeader`, then the body grid with the main column (highlight → groups → tables) and `InnerSidebar`. Sets `useHead({ title })`. |
| `app/components/inner/InnerHeader.vue` | Create / align | Breadcrumb (`<nav aria-label>`, `NuxtLink to="/"`, chevron, current title with `aria-current="page"`), eyebrow with 26×3 px bar, `<h1>`, lead `<p>`. |
| `app/components/inner/HighlightCard.vue` | Create / align | Props `{ highlight: Highlight }`. File-icon tile, red tag pill, title, description, primary and secondary buttons. |
| `app/components/inner/LinkGroup.vue` | Create / align | Props `{ group: LinkGroup }`. Group title and bordered list of item rows with chevron. |
| `app/components/inner/DataTable.vue` | Create / align | Props `{ table: DataTable }`. Title + mono note, header row, data rows; ARIA table roles. |
| `app/components/inner/Sidebar.vue` | Create / align | Props `{ page: InnerPageContent }`. Green key-rates box (4 rows, label order `indLabels[0], [2], [1], [3]`, values `10.00%`, `9.84%`, `123.10`, `4.00%`) and the related-links box. `position: sticky; top: 80px`. |
| `app/pages/monetary-policy.vue` | Create / align | Only `<InnerPage view="mp" />`. |
| `app/pages/financial-system.vue` | Create / align | Only `<InnerPage view="fin" />`. |
| `app/pages/publications.vue` | Create / align | Only `<InnerPage view="pub" />`. |
| `app/pages/services.vue` | Create / align | Only `<InnerPage view="svc" />`. |
| `app/i18n/types.ts`, `en.ts`, `bn.ts` | Change (only if missing) | Add `crumbAria: string` — en `'Breadcrumb'`, bn `'পথনির্দেশিকা'` (flag for native-speaker review, R1). All other keys (`crumbHome`, `sideRatesTitle`, `relatedTitle`, `indLabels`, `pages`) exist since CP03. |
| `tests/unit/inner/InnerPage.spec.ts` | Create | Unit tests per view. |
| `tests/unit/inner/InnerHeader.spec.ts` | Create | Unit tests. |
| `tests/unit/inner/HighlightCard.spec.ts` | Create | Unit tests. |
| `tests/unit/inner/LinkGroup.spec.ts` | Create | Unit tests. |
| `tests/unit/inner/DataTable.spec.ts` | Create | Unit tests. |
| `tests/unit/inner/Sidebar.spec.ts` | Create | Unit tests. |
| `tests/unit/pages/inner-routes.spec.ts` | Create | Each of the 4 page files passes the right `view`. |

## Steps
1. Create branch `cp10-inner-page-system` from the CP07 green commit (CP10 can run in parallel with CP08–CP09).
2. Run `npx nuxi typecheck` and `npx vitest run` to confirm the baseline is green.
3. Port `InnerHeader.vue` from lines 323–338: section background `#E4F1EC`, border-bottom `1px solid #C5E0D6`; inner padding `24px 40px 40px`; breadcrumb `500 12.5px/1 Inter` `#4A4A4A`, gap 8 px, margin-bottom 22 px; "Home" link color `#006A4E`; chevron 15 px color `#6BA892`; eyebrow bar 26×3 px `#006A4E` radius 2 px, row margin-bottom 12 px; eyebrow `600 11px/1.2 Inter`, letter-spacing .1em, uppercase, `#4A4A4A`; `<h1>` `700 26px/1.15 Inter`, letter-spacing −0.015em, `#006A4E`, margin `0 0 14px`; lead `400 15px/1.6 Inter` `#4A4A4A`, `max-width: 80ch`, margin 0.
4. Wrap the breadcrumb in `<nav :aria-label="L.crumbAria">`; the "Home" item is `NuxtLink to="/"`; the current item `<span aria-current="page">`. Add `crumbAria` to the 3 i18n files if CP07 did not add an equivalent key.
5. Port `HighlightCard.vue` from lines 348–361: border `1px solid #E0E4E8`, radius 14 px, padding 24 px, gap 20 px, background `#F7FAF8`; tile 48×48, radius 12 px, `#E4F1EC`, `file` icon 24 px; tag `600 10px/1 Inter`, letter-spacing .06em, uppercase, `#fff` on `#F42A41`, padding 4 px 9 px, radius 999 px, margin-bottom 11 px; title `600 18px/1.3 Inter` `#006A4E`, margin `0 0 8px`; description `400 14px/1.6 Inter` `#4A4A4A`, `max-width: 60ch`, margin `0 0 18px`; primary button `#006A4E`/`#fff`, radius 8 px, padding 10 px 18 px, `600 13px Inter`, `:hover { background: #00543E }`, `transition: background .16s`, `arrow` icon 16 px; secondary button transparent, border `1.5px solid #006A4E`, `:hover { background: #E4F1EC }`, `transition: background .16s, color .16s`. Both `type="button"`.
6. Port `LinkGroup.vue` from lines 364–376: title `600 16px/1.3 Inter` `#006A4E`, margin `0 0 14px`; list border `1px solid #E0E4E8`, radius 12 px, `overflow: hidden`; each row `<a>` padding 14 px 18 px, border-bottom `1px solid #EDF0F3`, `transition: background .14s`, `:hover { background: #F7FAF8 }`; text `500 14px/1.4 Inter` `#1a1a1a`; chevron 15 px `#006A4E` opacity .75.
7. Port `DataTable.vue` from lines 379–402: heading row `align-items: baseline`, gap 14 px, margin-bottom 14 px, `flex-wrap: wrap`; title `600 16px/1.3 Inter`; note `400 12px/1 JetBrains Mono` `#9aa39e`; head row padding 11 px 18 px, background `#F4F6F8`, border-bottom `1px solid #E0E4E8`; head cells `600 11px/1 Inter`, letter-spacing .05em, uppercase, `#4A4A4A`, value cells `width: 88px; text-align: right`; data rows padding 12 px 18 px, border-bottom `1px solid #EDF0F3`; segment `400 13.5px/1.3 Inter` `#1a1a1a`; values `600 13.5px/1 JetBrains Mono` `#006A4E`, `tabular-nums`, width 88 px, right-aligned. Add `role="table"` + `aria-labelledby` (title id), `role="row"`, `role="columnheader"`, `role="rowheader"` (segment) and `role="cell"`.
8. Port `Sidebar.vue` from lines 407–425: `<aside>` `flex-direction: column`, gap 18 px, `position: sticky; top: 80px`; rates box `#006A4E`, radius 14 px, padding 22 px; title `600 11px/1 Inter`, letter-spacing .08em, uppercase, `#5FBE9E`, margin-bottom 14 px; rows padding 10 px 0, border-bottom `1px solid rgba(255,255,255,.13)`; label `400 13px/1.3 Inter` `rgba(255,255,255,.78)`; value `700 14px/1 JetBrains Mono` `#fff`, `tabular-nums`. Related box border `1px solid #E0E4E8`, radius 14 px, padding 22 px; title color `#4A4A4A`, margin-bottom 12 px; links padding 11 px 0, border-bottom `1px solid #EDF0F3`, `500 13.5px/1.4 Inter` `#006A4E`, `:hover { color: #F42A41 }`; chevron opacity .7.
9. Port `InnerPage.vue` from lines 320–431: `<main>` background `#fff`; body padding `40px 40px 64px`; grid `minmax(0,1fr) 320px`, gap 44 px, `align-items: start`; main column `flex-direction: column`, gap 36 px. Order: `InnerHighlightCard v-if="page.hasHighlight"`, `InnerLinkGroup v-for`, `InnerDataTable v-for`. Use `var(--bb-max)` and `var(--bb-gutter)` for the container.
10. Change the 3 `<h3>` in highlight, link group and data table to `<h2>` with the same scoped `font` and `margin` rules, so the outline is h1 → h2 (D1: no pixel change because `font` and `margin` are set explicitly).
11. Set `useHead({ title: () => \`${page.value.title} · ${L.value.bankName}\` })` in `InnerPage.vue`.
12. Write the 4 one-line route files and confirm `data/routes.ts` maps `mp → /monetary-policy`, `fin → /financial-system`, `pub → /publications`, `svc → /services`.
13. Write the 7 spec files (cases in `test-criteria.md`).
14. Run the loop: `npm run generate`, `npx nuxi typecheck`, `npx eslint .`, `npx vitest run`, then `ls .output/public/monetary-policy/index.html .output/public/financial-system/index.html .output/public/publications/index.html .output/public/services/index.html`.
15. Run the port check: `grep -rnE 'sc-for|sc-if|style-hover|<image-slot|onClick="\{\{' app/` must print nothing.
16. Visual QA with Chrome DevTools MCP at 1280×900: in the prototype click each nav item (Monetary Policy, Financial System, Publications) and a service card (for `svc`); compare with the matching route in both languages.
17. Ask for approval, then commit: `git commit -m "feat(inner): CP10 shared InnerPage system and 4 inner routes"`.

## Design source
`02-Design/Bangladesh Bank.html`:
- Lines 319–431 — inner view (header 323–338, body grid 341–342, highlight 347–361, groups 363–376, tables 378–402, sidebar 406–425).
- Lines 635–637 (en) and 790–792 (bn) — `crumbHome`, `sideRatesTitle`, `relatedTitle`, `indLabels`.
- Lines 638–695 (en) and 793–850 (bn) — the `pages` map (`mp`, `fin`, `pub`, `svc`).
- Lines 880–891 — `innerViews`, `page = L.pages[view]`, `sideRates` order and values.
- Line 858 — nav `activeKey`: `svc` has no active nav item.

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| One template vs 4 pages | One `InnerPage.vue` + 4 one-line route files | Architecture rule ("shared inner-page system"); keeps the prototype's data-driven pattern. |
| `view` prop type | `InnerPageKey` (`'mp' \| 'fin' \| 'pub' \| 'svc'`) | A typo in a route file fails `nuxi typecheck`, not at runtime. |
| Section heading levels | `<h2>` instead of prototype `<h3>`, same CSS | WCAG 1.3.1 outline h1 → h2; Lighthouse `heading-order` audit; no pixel change (D1). |
| Table semantics | ARIA table roles on the flex `div` rows | Native `<table>` would need re-styling of `display` and widths and risks pixel drift (D1). |
| Breadcrumb | `<nav aria-label>` + `NuxtLink` + `aria-current="page"` | Prototype uses a clickable `<span>` (not keyboard-reachable); `NuxtLink` fixes WCAG 2.1.1 with the same look. |
| Link-group items and related links | `<a>` without `href` (placeholder) | Prototype gives no target; R2 pattern. Listed in the dead-link register for a later phase. |
| Side-rate values | Literal values in `Sidebar.vue`, labels from `L.indLabels` | Matches prototype lines 886–891, where the values are not in the `T` dict. |

## Risks
| Risk | Mitigation |
|------|------------|
| Sticky sidebar overlaps the sticky nav (`top: 0`) | Keep `top: 80px` from the source; verify at 1280×900 that the aside stays below the nav while scrolling `/financial-system`. |
| `pub` and `svc` have `tables: []`; an empty `v-for` leaves stray gap | `v-for` renders nothing; the 36 px column gap only applies between rendered children. Compare `/publications` height with the prototype. |
| `NuxtLink` breadcrumb adds underline or different color | Global `a { text-decoration: none; color: inherit }` from `base.css`; set `color: #006A4E` on the link explicitly. |
| Bangla `lead` is longer and wraps to more lines | It is the spec; compare against the prototype in `bn` at 1280 px. |
| `#5FBE9E` sidebar title (2.95:1) and `#9aa39e` table note (2.59:1) fail WCAG 1.4.3 | Do not change in CP10; add both to `../05-Qa/contrast-register.md` for CP11. |

## Estimated effort
7 hours (3.5 h porting 6 components and 4 routes, 1.5 h unit tests, 2 h visual QA across 4 routes × 2 languages).
