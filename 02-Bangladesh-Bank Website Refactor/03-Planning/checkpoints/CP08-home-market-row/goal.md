# CP08 — Home — market data row: Goal

## Goal
At 1280 px, the home route `/` shows the market data row from `Bangladesh Bank.html` lines 90–130 pixel for pixel in `en` and `bn`: 3 market cards (FX spot rate, call money rate, MMRR with two values) and the upcoming-auctions card, in a 4-column grid on the `#F4F6F8` home background.

## Why this checkpoint exists
The market row is the first content under the chrome, and it sets the home page frame: the `#F4F6F8` background, the `padding:20px 40px 0` top band (lines 87–88) and the card style (`border-top:3px solid #006A4E`, radius `12px`) that CP09 reuses. It is also the first place where the data-driven pattern runs end to end (locale array → typed prop → item component). If that pattern has a flaw (a type gap for the `single`/`dual` card shapes, or a Bangla number or font issue), we want to find it on 4 cards before CP09 copies it into 10 sections.

## In scope
- `app/components/home/MarketRow.vue` (`<HomeMarketRow>`): the 4-column grid. It reads `useLocale()` and passes typed slices to its children.
- `app/components/home/MarketCard.vue` (`<HomeMarketCard>`): one card, with a single value (`card.single`) or two values (`card.dual`).
- `app/components/home/AuctionCard.vue` (`<HomeAuctionCard>`): title, note, 2 auction date tiles, calendar link.
- `app/pages/index.vue`: replace the CP06 temporary `<h1>` with the home frame (`#F4F6F8` root, top band) and `<HomeMarketRow />`, plus a visually hidden `<h1>` for the page.
- Unit tests for the 3 components.

## Out of scope
- The news panel, policy rates and reserve ratios. They sit in the same top band (lines 132–193) but belong to CP09.
- Every other home section (explore directory, CIPC, services, governor, hotlines: CP09).
- Live market data or any runtime fetch. Values are static strings from the dictionary (SSG only).
- Real targets for the 4 card links ("View all rates", "View details", "View all", "Full auction calendar"). They are no-ops in the design (Risk R2 pattern).
- Breakpoints for 768 px and 375 px (Decision D2, CP11).
- Changing the low-contrast date color `#9aa39e` (a design value; recorded for CP11).

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| None | — | No audit issue maps to CP08 in the master plan (Section 5). CP08 keeps the green-only accent of the design: every card has `border-top:3px solid #006A4E`, and red is not used. It does not reintroduce the red/green mix that audit issue 4 (fixed in CP02 and CP09) describes. |

## Depends on
CP07

## Demo at the end
- Browser at 1280 px: open `/` next to the prototype. Under the ticker are 4 white cards of equal height (278 px wide each), each with a green 3 px top border: "FX SPOT RATE (USD/BDT)" `123.1005`, "CALL MONEY RATE" `9.84%`, "MONEY MARKET REFERENCE RATE (MMRR)" with `9.85%` and `9.84%`, and "UPCOMING AUCTIONS" with the Bond 23 and Bill 28 tiles.
- Click "বাংলা": labels, dates and auction tiles switch to Bangla ("এফএক্স স্পট রেট (USD/BDT)", "২৩ জুন ২০২৬ · বিকাল ০৫:০০ পর্যন্ত", "বন্ড ২৩ জুন ২০২৬"). The numeric values stay `123.1005`, `9.84%`, `9.85%`, exactly as in the design.
- Hover "View all rates": the link turns `#F42A41`.
- Terminal: `npx vitest run tests/unit/home` is green.
