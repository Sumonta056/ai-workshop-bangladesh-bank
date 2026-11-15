# CP10 — Shared inner-page system: Goal

## Goal
The 4 inner routes `/monetary-policy`, `/financial-system`, `/publications` and `/services` render from one data-driven `InnerPage.vue` that reads `L.pages[view]`, each route file is a one-line `<InnerPage view="…" />`, and every route matches prototype lines 319–431 in English and Bangla.

## Why this checkpoint exists
The prototype draws 4 different pages from one template plus a `pages` map (`mp`, `fin`, `pub`, `svc`). If we built 4 separate page components, every style fix would need 4 edits and the pages would drift apart. One template keeps the 4 pages consistent and means a fifth inner page later needs only content and a one-line route file. Without CP10, 4 of the 5 Definition-of-done routes do not exist.

## In scope
- `InnerPage.vue` driven by `view: InnerPageKey` (`'mp' | 'fin' | 'pub' | 'svc'`).
- Sub-components: `InnerHeader` (breadcrumb, eyebrow, `<h1>`, lead), `InnerHighlightCard`, `InnerLinkGroup`, `InnerDataTable`, `InnerSidebar` (key rates + related links).
- 4 thin route files in `app/pages/`.
- Per-route document title `"<page.title> · <L.bankName>"`.
- Breadcrumb "Home" link to `/` (prototype `setHome`).
- Semantic additions that do not change a default-state pixel (D1): `<nav aria-label>` breadcrumb, `aria-current="page"`, ARIA table roles, heading levels `<h1>` → `<h2>`.
- Vitest unit tests for the 6 inner components and the 4 route files.

## Out of scope
- Layout chrome and the nav active state (CP06, CP07). CP10 only confirms that no nav item is active on `/services` (prototype line 858: `svc → null`).
- Responsive behavior of the 1fr / 320 px grid at 768 px and 375 px (CP11, D2).
- Real destinations for link-group items, related links and highlight buttons (none in the prototype; R2, later phase).
- Contrast changes to `#5FBE9E` on `#006A4E` (2.95:1) and `#9aa39e` on `#fff` (2.59:1) — logged for CP11.

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| None | — | The master plan maps no audit issue to CP10. Inner routes inherit fixes 1, 3, 7 and 9 from the CP07 layout; CP11 re-verifies them on these 4 routes. |

## Depends on
CP07

## Demo at the end
Run `npm run generate && npx serve .output/public -l 3000`. Open `http://localhost:3000/monetary-policy`: green header with breadcrumb "Home › Monetary Policy", red "Latest" tag on the highlight card, 2 link groups, 2 rate tables and the green "Key rates today" sidebar. Click "Financial System" in the nav: the same template now shows 3 groups and 1 table. Switch to বাংলা: all 4 inner pages show Bangla text with no URL change. `ls .output/public/*/index.html` lists the 4 inner routes.
