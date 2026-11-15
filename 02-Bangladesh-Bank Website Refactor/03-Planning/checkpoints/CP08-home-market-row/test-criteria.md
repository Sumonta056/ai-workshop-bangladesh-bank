# CP08 — Home — market data row: Test Criteria

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors (`npx nuxi typecheck` and `npx eslint .` both exit 0)
- [ ] `grep -c "123.1005" .output/public/index.html` is ≥ 1 (the market row is pre-rendered into static HTML)
- [ ] `grep -rnE "style-hover|<sc-for|<sc-if" app/components/home app/pages/index.vue` returns nothing
- [ ] `app/pages/index.vue` contains no `<main>`, no `style=` and no element other than the root div, the hidden `<h1>`, the top band div and `<HomeMarketRow />`

## Unit tests (Vitest)
| Test | Input | Expected result |
|------|-------|-----------------|
| `MarketCard.spec` single | `card = en.marketCards[0]` | `h2` text "FX Spot Rate (USD/BDT)"; date "23 June 2026 · Till 05:00 PM"; value text `123.1005`; no `dl`; link text "View all rates" with 1 `svg` (width 16) |
| `MarketCard.spec` single 2 | `card = en.marketCards[1]` | `h2` "Call Money Rate"; date "23 June 2026 · Weighted Average"; value `9.84%`; link "View details" |
| `MarketCard.spec` dual | `card = en.marketCards[2]` | `h2` "Money Market Reference Rate (MMRR)"; no single value element; `dl` with 2 `dt` ("DOMMR (O/N)", "BOFR (O/N)") and 2 `dd` (`9.85%`, `9.84%`); link "View all" |
| `MarketCard.spec` bn | `card = bn.marketCards[0]` | `h2` "এফএক্স স্পট রেট (USD/BDT)"; date "২৩ জুন ২০২৬ · বিকাল ০৫:০০ পর্যন্ত"; value still `123.1005`; link "সকল হার দেখুন" |
| `MarketCard.spec` no flag | `{ label: 'A', date: 'B', link: 'C' }` | Renders `h2` "A", date "B", link "C"; no value element and no `dl`; no error thrown |
| `MarketCard.spec` no-op link | Any card | The link `a` has no `href` attribute |
| `AuctionCard.spec` en | `title='Upcoming auctions'`, `note='Next settlement · June 2026'`, `auctions=en.auctions`, `linkLabel='Full auction calendar'` | `h2` "Upcoming auctions"; `ul` with 2 `li`; tile 1 texts "Bond", "23", "June 2026"; tile 2 "Bill", "28", "June 2026"; link "Full auction calendar" |
| `AuctionCard.spec` bn | bn values | Tiles "বন্ড" / "২৩" / "জুন ২০২৬" and "বিল" / "২৮" / "জুন ২০২৬"; `h2` "আসন্ন নিলাম"; link "সম্পূর্ণ নিলাম ক্যালেন্ডার" |
| `MarketRow.spec` order | `lang = 'en'` | 4 `article` children in order: FX Spot Rate, Call Money Rate, MMRR, Upcoming auctions |
| `MarketRow.spec` language | `setLang('bn')` after mount | First `h2` text becomes "এফএক্স স্পট রেট (USD/BDT)" without remounting |

## Visual QA (Chrome DevTools MCP vs prototype)
Setup: tab A = `file://…/02-Design/Bangladesh Bank.html`; tab B = `http://localhost:3000/` from `npx serve .output/public`. Viewport 1280 × 900. Read values with `evaluate_script` and `getComputedStyle`. Repeat the text checks after clicking "বাংলা" in both tabs.
- [ ] Home root background is `#F4F6F8` (`rgb(244, 246, 248)`); the first card's top edge is `20px` below the ticker's bottom border, the same as tab A
- [ ] Grid: 4 columns, `column-gap` `16px`, `margin-bottom` `24px`; each card is `278px` wide (`(1160 − 3 × 16) / 4`)
- [ ] All 4 cards have the same `offsetHeight`, equal to tab A's card height
- [ ] Card: background `#FFFFFF`; `border` `1px solid rgb(224, 228, 232)` (`#E0E4E8`); `border-top` `3px solid rgb(0, 106, 78)` (`#006A4E`); `border-radius` `12px`; padding `18px 20px`
- [ ] Label: Inter `11px`, weight `600`, line height `14.3px`, `letter-spacing` `0.55px`, uppercase, color `#4A4A4A` (`rgb(74, 74, 74)`)
- [ ] Date: JetBrains Mono `11.5px`, weight `400`, color `#9aa39e` (`rgb(154, 163, 158)`), margin `5px 0 12px`
- [ ] Single value `123.1005`: JetBrains Mono `28px`, weight `700`, color `#006A4E`, `font-variant-numeric` `tabular-nums slashed-zero`
- [ ] Dual block: `border-top` `1px solid rgb(237, 240, 243)` (`#EDF0F3`), `padding-top` `12px`, `gap` `20px`; labels `10px` weight `500` `#9aa39e`; values JetBrains Mono `20px` weight `700` `#006A4E`
- [ ] Card link: Inter `12.5px` weight `600` `#006A4E`, `gap` `5px`, `padding-top` `14px`, sits at the bottom of the card; on hover the color is `#F42A41` (`rgb(244, 42, 65)`); arrow icon is 16 × 16 px
- [ ] Auction tiles: background `#E4F1EC`, `border` `1px solid rgb(197, 224, 214)` (`#C5E0D6`), `border-radius` `8px`, padding `9px 6px`, gap `8px`, equal widths
- [ ] Tile type `9px` weight `700` `#006A4E` uppercase; day JetBrains Mono `22px` `#0A3D2C` (`rgb(10, 61, 44)`), margin `4px 0 1px`; month JetBrains Mono `10px` `#4A4A4A`
- [ ] A screenshot of the market row in tab B matches tab A pixel for pixel in `en` and in `bn`
- [ ] Console has 0 errors and 0 warnings in both languages

## Accessibility
- [ ] WCAG 1.3.1 Info and Relationships: the `take_snapshot` accessibility tree shows 4 headings at level 2 inside the market row ("FX Spot Rate (USD/BDT)", "Call Money Rate", "Money Market Reference Rate (MMRR)", "Upcoming auctions"), a description list with 2 terms in the MMRR card and a list with 2 items in the auctions card
- [ ] WCAG 2.4.6 Headings and Labels and 1.3.1: the page has exactly 1 `h1` (hidden text "Bangladesh Bank" / "বাংলাদেশ ব্যাংক") before the first `h2`; no heading level is skipped
- [ ] WCAG 1.4.3 Contrast Minimum, design colors that pass (do not regress): label `#4A4A4A` on `#FFFFFF` 8.86:1; values `#006A4E` on `#FFFFFF` 6.62:1; tile type `#006A4E` on `#E4F1EC` 5.70:1; tile day `#0A3D2C` on `#E4F1EC` 10.54:1; tile month `#4A4A4A` on `#E4F1EC` 7.64:1
- [ ] WCAG 1.4.3, design colors that fail, recorded for the CP11 decision and not changed here: date and dual labels `#9aa39e` on `#FFFFFF` 2.59:1; link hover `#F42A41` on `#FFFFFF` 4.00:1
- [ ] WCAG 1.4.1 Use of Color: no information in the row is given by color alone; all 4 top borders are the same `#006A4E` (no red/green mix, see audit issue 4)
- [ ] WCAG 1.4.4 Resize Text: at browser zoom 200 % (1280 px window), no card text is cut off or overlaps another card; record any overflow for CP11
- [ ] WCAG 3.1.2 Language of Parts: after switching to `bn`, `document.documentElement.lang === 'bn'` and the ASCII values (`123.1005`, `DOMMR (O/N)`) need no extra `lang` attribute (they are numbers and codes)

## Responsive
Breakpoints are added in CP11 (Decision D2). At CP08 the row keeps the design's 4 columns at every width.
- [ ] 1280 px: pixel match with tab A as above; `document.documentElement.scrollWidth === 1280`
- [ ] 768 px: 4 columns of `(688 − 48) / 4 = 160px`; record which values overflow their card (`el.scrollWidth > el.clientWidth`) in the CP08 QA notes as CP11 input (CP11 target: 2 columns)
- [ ] 375 px: 4 columns; record overflowing elements and `document.documentElement.scrollWidth` (CP11 target: 1 column, no horizontal scroll)
- [ ] 375 px, 768 px, 1280 px: no console errors, and the language switch still updates all 4 cards

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
