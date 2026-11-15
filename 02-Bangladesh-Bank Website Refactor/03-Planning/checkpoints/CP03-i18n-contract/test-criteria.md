# CP03 — i18n contract (`types.ts`, `en.ts`, `bn.ts`): Test Criteria

Run every command inside `Bangladesh Bank New Website/`.

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors
- [ ] `app/i18n/types.ts`, `en.ts`, `bn.ts` contain 0 comments (`grep -c "//\|/\*"` → 0 in each)
- [ ] Drift drill: removing `newsTitle` from `bn.ts` makes `npm run typecheck` fail; restoring it makes it pass

## Unit tests (Vitest)
Files: `tests/unit/i18n/fidelity.spec.ts`, `tests/unit/i18n/parity.spec.ts`

| Test | Input | Expected result |
|------|-------|-----------------|
| `en` equals prototype | `en` vs `T.en` extracted from `../02-Design/Bangladesh Bank.html` | `toStrictEqual` passes |
| `bn` equals prototype | `bn` vs `T.bn` | `toStrictEqual` passes |
| Top-level key count | `Object.keys(en)`, `Object.keys(bn)` | Both length `65` |
| Leaf count | Recursive count of non-object values | `en` = `359`, `bn` = `359` |
| Key-path parity | All dotted key paths of `en` vs `bn` | Identical sets |
| Array length parity | `news`, `marketCards`, `policyRates`, `reserves`, `auctions`, `moreLinks`, `modules`, `services`, `hotlines`, `usefulLinks`, `aboutLinks`, `indLabels` | `10, 3, 4, 4, 2, 8, 8, 5, 5, 6, 6, 4` in both locales |
| Inner pages present | `Object.keys(en.pages)` | `['mp', 'fin', 'pub', 'svc']` |
| Inner page sizes | `groups.length` / `tables.length` per page | mp `2/2`, fin `3/1`, pub `3/0`, svc `3/0` |
| Spot check — English | `en.bankName`, `en.nav.mp`, `en.pages.svc.highlight.tag` | `'Bangladesh Bank'`, `'Monetary Policy'`, `'Hotline 16236'` |
| Spot check — Bangla | `bn.bankName`, `bn.nav.home`, `bn.pages.svc.highlight.tag` | `'বাংলাদেশ ব্যাংক'`, `'মূলপাতা'`, `'হটলাইন ১৬২৩৬'` |
| Bangla digits kept | `bn.marketCards[0].date` | `'২৩ জুন ২০২৬ · বিকাল ০৫:০০ পর্যন্ত'` |
| Latin digits kept | `bn.policyRates.map(r => r.val)` | `['10.00%', '11.50%', '7.50%', '4.00%']` |
| Typographic apostrophe | `en.notice` | Contains `’` (`stakeholders’`) and no ASCII `'` |
| Market card union | `en.marketCards.map(c => 'single' in c ? 's' : 'd')` | `['s', 's', 'd']` |
| Type contract | `expectTypeOf(en).toEqualTypeOf<LocaleContent>()` and same for `bn` | Passes |

`npm run test` reports all CP01–CP03 tests passed, 0 failed.

## Visual QA (Chrome DevTools MCP vs prototype)
No new UI in CP03. Run one smoke check on the built site:
- [ ] Serve with `npx serve .output/public`, open `http://localhost:3000/` in a new tab (`new_page`): the page renders with no error overlay
- [ ] Console has 0 errors and 0 warnings
- [ ] Close the tab with `close_page`

## Accessibility
- [ ] WCAG 3.1.2 Language of Parts (preparation): `LangCode` values are exactly `'en'` and `'bn'`, valid BCP 47 tags that CP04 writes to `<html lang>`
- [ ] WCAG 1.1.1 / 2.4.4 (preparation): every string that CP07 and CP09 will use as an accessible name exists in both locales — `searchPh`, `hotlineEyebrow`, `nav.*`, `govBtn` are non-empty in `en` and `bn`

## Responsive
- [ ] 375 px, 768 px, 1280 px — N/A — no UI yet

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
