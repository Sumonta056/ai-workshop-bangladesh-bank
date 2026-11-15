# CP03 — i18n contract (`types.ts`, `en.ts`, `bn.ts`): Plan

All paths are relative to `Bangladesh Bank New Website/` unless they start with `../`. Draft versions of the 3 i18n files exist (commit `456fe5e`). This checkpoint makes the fidelity test the judge: whatever the draft contains, it must deep-equal the prototype.

## Files to create or change
| File | Action | Responsibility |
|------|--------|----------------|
| `app/i18n/types.ts` | Verify / rewrite | `LangCode`, `InnerPageKey`, `LocaleContent` and item interfaces. Types only, no values. No comments (user rule). |
| `app/i18n/en.ts` | Verify / rewrite | `export const en: LocaleContent = { … }` — exact copy of `T.en`. No comments. |
| `app/i18n/bn.ts` | Verify / rewrite | `export const bn: LocaleContent = { … }` — exact copy of `T.bn`. No comments. |
| `tests/unit/i18n/extract-prototype.ts` | Create | Test helper: reads `../02-Design/Bangladesh Bank.html`, slices the text from the line containing `const T = {` up to the line containing `const L = T[lang];`, evaluates it with `node:vm` `runInNewContext` in an empty context, returns `T`. |
| `tests/unit/i18n/fidelity.spec.ts` | Create | Deep-equal `en`/`bn` against the extracted `T`. |
| `tests/unit/i18n/parity.spec.ts` | Create | Key paths and array lengths of `en` equal those of `bn`. |

### Type map (one interface per repeated item)

| Interface | Fields | Used by key(s) | Count per locale |
|-----------|--------|----------------|------------------|
| `NavLabels` | `home, about, mp, fin, fx, gsec, pay, pub`: `string` | `nav` | 8 labels |
| `NewsItem` | `text: string`, `isNew: boolean` | `news` | 10 |
| `MarketCard` | union: `{ label, date, link, single: true, value }` \| `{ label, date, link, dual: true, aLabel, aVal, bLabel, bVal }` | `marketCards` | 3 (2 single, 1 dual) |
| `PolicyRate` | `label, val` | `policyRates` | 4 |
| `Reserve` | `seg, slr, crr` | `reserves` | 4 |
| `Auction` | `type, day, month` | `auctions` | 2 |
| `ModuleCard` | `title: string`, `links: string[]` | `modules` | 8 (4 links each) |
| `ServiceCard` | `title, desc` | `services` | 5 |
| `Hotline` | `num, label` | `hotlines` | 5 |
| `Highlight` | `tag, title, desc, primary, secondary` | `pages[k].highlight` | 1 per page |
| `LinkGroup` | `title: string`, `items: string[]` | `pages[k].groups` | mp 2, fin 3, pub 3, svc 3 |
| `DataTable` | `title, note`, `head: { seg: string; vals: string[] }`, `rows: { seg: string; vals: string[] }[]` | `pages[k].tables` | mp 2, fin 1, pub 0, svc 0 |
| `InnerPageContent` | `eyebrow, title, lead`, `hasHighlight: boolean`, `highlight: Highlight`, `groups: LinkGroup[]`, `tables: DataTable[]`, `related: string[]` | `pages` | 4 pages |
| `LocaleContent` | the 65 top-level keys of `T.en` (51 strings + `nav` + 12 arrays + `pages: Record<InnerPageKey, InnerPageContent>`) | — | 1 |

## Steps
1. Extract the reference data once to see it: write a throw-away script in the scratchpad (not in the repo) that runs the same `vm` slice as the helper and prints `Object.keys(T.en).length` → `65`, and the leaf count per locale → `359` (342 strings + 17 booleans).
2. Write `tests/unit/i18n/extract-prototype.ts`. Find the slice by the two marker strings, not by line numbers, so an edit above line 541 in the prototype does not break it.
3. Write `tests/unit/i18n/fidelity.spec.ts` and `tests/unit/i18n/parity.spec.ts` (tests listed in `test-criteria.md`). Run `npm run test` and watch them fail or pass against the draft — this is the red/green baseline.
4. Open `app/i18n/types.ts`. Make it match the type map above. Change `MarketCard` to the discriminated union (see Decisions). Export `LangCode` and `InnerPageKey`.
5. Fix `app/i18n/en.ts` until `fidelity.spec.ts → en` is green. Copy strings by copy-paste from the prototype or from the script output, never by retyping. Keep `’` (U+2019), `–` (U+2013), `—` (U+2014) and `·` (U+00B7) exactly.
6. Fix `app/i18n/bn.ts` until `fidelity.spec.ts → bn` is green. Keep Bangla digits where the prototype has them (`২৩ জুন ২০২৬`) and Latin digits where it has them (`10.00%` in `policyRates`).
7. Remove all comments from the 3 i18n files.
8. Run `npm run typecheck`. Fix any component in `app/components/**` that breaks because of the `MarketCard` union by narrowing on `card.single` / `card.dual` (one-line `v-if` change in `HomeMarketCard`).
9. Run the drift drill from `goal.md` → "Demo" (delete a key, see the type error, restore).
10. Run `npm run lint`, `npm run test`, `npm run generate` → all exit 0.
11. Ask the user for approval, then commit (`feat(cp03): typed i18n contract`).

## Design source
`02-Design/Bangladesh Bank.html`:
- Line 541: `const T = {` (start).
- Lines 542–696: `T.en`; inner pages map at 638–695 (`mp` 639, `fin` 654, `pub` 669, `svc` 682).
- Lines 697–851: `T.bn`; inner pages map at 793–850 (`mp` 794, `fin` 809, `pub` 824, `svc` 837).
- Line 852: `};` (end). Line 854: `const L = T[lang];` (end marker for the extractor).
- Line 883: `const page = isInner ? L.pages[view] : L.pages.mp;` — confirms `pages` is keyed by `mp | fin | pub | svc`.

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Source of truth for copy | The prototype file itself, read by the test at run time | Removes human retyping from the proof (R1). Any copy change in the design shows up as a red test. |
| Extraction method | `node:vm` `runInNewContext` on the `T` literal only, in an empty context | The `T` block is a plain object literal with no references to other variables (checked: it evaluates alone). An empty context gives no access to `require`, `process` or the file system. |
| Annotation style | `export const en: LocaleContent = {…}` | A missing or extra key fails `nuxi typecheck`; the shape cannot drift between `en` and `bn`. |
| `MarketCard` shape | Discriminated union on `single: true` / `dual: true` | A card cannot be both or neither; a single card cannot lack `value`. Still deep-equals `T` because the prototype never writes `single: false`. |
| `pages` type | `Record<InnerPageKey, InnerPageContent>` | `L.pages[view]` in CP10 is always defined for the 4 keys; no optional chaining needed. |
| Digit style in Bangla | Exactly as the prototype: Bangla digits in dates and labels, Latin digits in rate values | `design-fidelity.md` rule 2: never "fix" the copy. |
| Comments | None in `types.ts`, `en.ts`, `bn.ts` | User rule: no comments in code. |

## Risks
| Risk | Mitigation |
|------|------------|
| R1 — Bangla transcription error | `fidelity.spec.ts` deep-equals against the prototype; any one-character change fails. Native-speaker review stays in CP11. |
| Invisible Unicode differences (`’` vs `'`, `–` vs `-`, NBSP vs space) | Deep-equal compares code points, so it catches them. Add one explicit test for U+2019 in `en.notice`. |
| The prototype changes after CP03 | The test fails on the next run; update `en.ts`/`bn.ts` from the new prototype and re-run. |
| `MarketCard` union breaks draft components | Step 8 fixes the one consumer; `npm run typecheck` is the gate. |
| Test helper evaluates code from a file | The file is the project's own design spec in the repo; the slice contains only the `T` literal; `vm` context is empty. |

## Estimated effort
4 hours.
