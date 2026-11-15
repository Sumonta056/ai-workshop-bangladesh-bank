# CP08 — Home — market data row: Plan

## Files to create or change
All paths are relative to `Bangladesh Bank New Website/`.

| File | Action | Responsibility |
|------|--------|----------------|
| `app/pages/index.vue` | Change | Home frame: root `<div class="home">` (`background:#F4F6F8`), visually hidden `<h1>{{ L.bankName }}</h1>`, top band `<div class="bb-container home__top">` (`padding-top:20px`) containing `<HomeMarketRow />`. No other markup |
| `app/components/home/MarketRow.vue` | Create | Grid `repeat(4,1fr)`, `gap:16px`, `margin-bottom:24px`, `align-items:stretch`. Reads `L` from `useLocale()`; renders 3 × `<HomeMarketCard :card>` + 1 × `<HomeAuctionCard>` |
| `app/components/home/MarketCard.vue` | Create | One market card. Prop `card: MarketCard` (type from `~/i18n/types`, CP03). Single-value or dual-value body, then the arrow link |
| `app/components/home/AuctionCard.vue` | Create | Props `title: string`, `note: string`, `auctions: Auction[]`, `linkLabel: string`. Title, note, date tiles, arrow link |
| `tests/unit/home/MarketCard.spec.ts` | Create | Single and dual variants, link, semantics |
| `tests/unit/home/AuctionCard.spec.ts` | Create | Tiles, text, semantics |
| `tests/unit/home/MarketRow.spec.ts` | Create | Count, order, language switch |

## Steps
1. Read `02-Design/Bangladesh Bank.html` lines 85–130 (frame and market row) and the data on lines 566–570 (en `marketCards`), 585–586 (en auctions), 721–725 (bn `marketCards`) and 740–741 (bn auctions). Check that CP03's `MarketCard` and `Auction` types cover every field used: `label`, `date`, `single`, `value`, `dual`, `aLabel`, `aVal`, `bLabel`, `bVal`, `link`, `type`, `day`, `month`.
2. Edit `app/pages/index.vue`. Replace the CP06 temporary body with:
   - root `<div class="home">` with scoped `background:#F4F6F8` (token from CP02). Line 87 puts this on `<main>`, but the layout owns `<main>` since CP07, so the page root carries the color.
   - `<h1 class="bb-visually-hidden">{{ L.bankName }}</h1>`. The design has no visible `<h1>` on home; this one is invisible (D1).
   - `<div class="bb-container home__top">` with scoped `padding-top:20px` (line 88: `padding:20px 40px 0`; `.bb-container` already gives `0 40px`). CP09 adds the news and rates grid inside this same band.
   - `<HomeMarketRow />` inside the band.
3. Create `MarketRow.vue`. Root `<div class="market-row">` with `display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px; align-items:stretch` (line 91). Render `<HomeMarketCard v-for="(card, i) in L.marketCards" :key="i" :card="card" />`, then `<HomeAuctionCard :title="L.auctionTitle" :note="L.auctionNote" :auctions="L.auctions" :link-label="L.auctionCal" />`. This section component is the only one that calls `useLocale()`; the two item components are pure (props in, markup out).
4. Create `MarketCard.vue` (lines 93–112). Import the type as `import type { MarketCard as MarketCardData } from '~/i18n/types'` so it does not clash with the component name.
   - Root `<article class="card">`: `background:#fff; border:1px solid #E0E4E8; border-top:3px solid #006A4E; border-radius:12px; padding:18px 20px; display:flex; flex-direction:column`.
   - Label `<h2 class="card__label">`: `margin:0; font:600 11px/1.3 var(--bb-font); letter-spacing:.05em; text-transform:uppercase; color:#4A4A4A`.
   - Date `<p class="card__date">`: `font:400 11.5px/1.3 var(--bb-mono); color:#9aa39e; margin:5px 0 12px`.
   - Single (`v-if="card.single"`, line 97): `<p class="card__value">` with `margin:0; font:700 28px/1 var(--bb-mono); color:#006A4E; font-variant-numeric:tabular-nums slashed-zero`.
   - Dual (`v-else-if="card.dual"`, lines 100–109): `<dl class="card__pair">` with `margin:0; display:flex; gap:20px; border-top:1px solid #EDF0F3; padding-top:12px`. Two `<div>` children, each with `<dt>` (`font:500 10px/1 var(--bb-font); text-transform:uppercase; letter-spacing:.04em; color:#9aa39e; margin-bottom:5px`) and `<dd>` (`margin:0; font:700 20px/1 var(--bb-mono); color:#006A4E; font-variant-numeric:tabular-nums`). The text is `aLabel`/`aVal` and `bLabel`/`bVal`.
   - Link (line 111): `<a class="card__link">` without `href` (no-op in the design): `font:600 12.5px/1 var(--bb-font); color:#006A4E; display:inline-flex; align-items:center; gap:5px; margin-top:auto; padding-top:14px; cursor:pointer`, `:hover { color:#F42A41 }`. Text `card.link`, then `<span class="card__icon"><BaseIcon name="arrow" :size="16" /></span>` (`display:inline-flex`).
5. Create `AuctionCard.vue` (lines 116–129). Use the same root, label, date and link styles as `MarketCard` (copy the 4 scoped rules; they are the same values, and sharing them would need a global class that the styling rule forbids). Label text `title`, date text `note`, link text `linkLabel`.
   - Tiles: `<ul class="auctions">` with `list-style:none; margin:0; padding:0; display:flex; gap:8px`. For each auction, `<li class="auction">`: `flex:1; background:#E4F1EC; border:1px solid #C5E0D6; border-radius:8px; padding:9px 6px; text-align:center`. Inside, 3 spans with `display:block`:
     - type: `font:700 9px/1 var(--bb-font); letter-spacing:.06em; text-transform:uppercase; color:#006A4E`
     - day: `font:800 22px/1.1 var(--bb-mono); color:#0A3D2C; margin:4px 0 1px`
     - month: `font:400 10px/1 var(--bb-mono); color:#4A4A4A`
6. Write the 3 test files (`test-criteria.md`). Mount the pure components with `mount` from `@vue/test-utils` and fixture props copied from the en and bn dictionaries. Mount `MarketRow` with `mountSuspended` so that `useLocale()` works.
7. Run `npm run generate`, `npx nuxi typecheck`, `npx eslint .` and `npx vitest run`.
8. Visual QA in Chrome DevTools MCP: prototype vs `npx serve .output/public` at 1280 px, in `en` and `bn` (`test-criteria.md`). Then the 768 px and 375 px baseline.
9. Commit after explicit approval: `git commit -m "feat(cp08): home market data row"`.

## Design source
- `02-Design/Bangladesh Bank.html` line **87**: home `<main style="background:#F4F6F8">`.
- Line **88**: top band `max-width:1240px; margin:0 auto; padding:20px 40px 0` (closes on line 194; CP09 fills the rest).
- Lines **90–113**: market-data grid and the `sc-for` market card (single and dual variants).
- Lines **115–129**: upcoming-auctions card.
- Data: en lines **566–570** (`marketCards`) and **585–586** (`auctionTitle`, `auctionCal`, `auctionNote`, `auctions`); bn lines **721–725** and **740–741**.
- Line **869**: `const marketCards = L.marketCards` (no transformation; props map 1:1).
- Line **903**: `arrowIcon: svg(ICONS.arrow, 16)`.

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Component split | `MarketRow` (section) → `MarketCard` × 3 + `AuctionCard` × 1 | One responsibility per file. The auction card has a different body (tiles), so it is its own component, not a third variant of `MarketCard` |
| Who reads the locale | Only `MarketRow` (and `index.vue` for the `<h1>`); card components take props | Architecture rule "components stay dumb". The cards can be tested with plain props and reused on other pages |
| Card label element | `<h2>` with `margin:0` and the exact font | Gives screen-reader users a heading per card (WCAG 1.3.1 / 2.4.6) without changing a pixel. The page has a hidden `<h1>`, so the heading order is h1 → h2 |
| Dual values markup | `<dl>` / `<dt>` / `<dd>` | Label-value pairs are a description list. `margin:0` on `dl` and `dd` removes the browser defaults, so the pixels stay the same |
| Auction tiles markup | `<ul>` / `<li>` with list styles reset | Screen readers announce "list, 2 items" |
| Card links | `<a>` without `href` | The design links do nothing; same no-op pattern as CP07. Real targets later |
| Shared card CSS | Duplicated scoped rules in `MarketCard.vue` and `AuctionCard.vue` | The styling rule forbids global class leakage. The values come from tokens, so a palette change still has one source |
| Home background owner | `index.vue` root `div` | The layout owns `<main>` (CP07); inner pages use `#fff`, so the color is per page |
| Bangla digits in values | Render exactly as in the dictionary (`123.1005` stays ASCII; dates use Bangla digits) | Design-fidelity rule 2: never "fix" or convert numbers |

## Risks
| Risk | Mitigation |
|------|------------|
| CP03 typed `single`/`dual` as optional booleans, so a card with neither renders an empty body | Unit test with a card that has neither flag; it must render label, date and link with no value block. Better: ask CP03 to type it as a union (`{ single: true; value } \| { dual: true; aLabel; … }`) |
| Day tiles use weight `800`, but only JetBrains Mono `400;500;700` is loaded (line 15), so the browser shows 700 | Same in the prototype, so this is parity. Do not add weight 800 (it would change the pixels) |
| Bangla text in JetBrains Mono (dates, auction month) uses a fallback font | Same fallback in the prototype. Compare `bn` screenshots side by side |
| The 4 cards have different heights | `align-items:stretch` on the grid plus `margin-top:auto` on the link. The test checks that all 4 `offsetHeight` values are equal |
| `#9aa39e` date and labels fail contrast (2.59:1) | A design value: record it in `test-criteria.md` for the CP11 decision, do not change it here |
| `index.vue` grows markup that belongs in a component | It may hold only the root div, hidden `<h1>`, top band div and section components. CP09 adds `<HomeNewsRates />` to the same band |

## Estimated effort
4 hours (0.5 h page frame, 1.5 h three components, 1 h tests, 1 h visual QA in two languages)
