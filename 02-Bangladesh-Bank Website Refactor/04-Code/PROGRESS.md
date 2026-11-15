# PROGRESS — Bangladesh Bank Migration

> Owned by the orchestrator agent (see `PROMPT.md` Section 6). Updated after every step transition.
> HTML view: `reports/progress-report.html`

## Summary

| Done | In progress | Blocked | Open gates | Current wave | Last update |
|------|-------------|---------|------------|--------------|-------------|
| 0 / 12 | 0 | 0 | 0 | 1 | — |

## Checkpoints

| CP | Name | Wave | Lane | Depends on | Status | Step | Subagent | Worktree | Branch | Tests | Fix round | Updated |
|----|------|------|------|------------|--------|------|----------|----------|--------|-------|-----------|---------|
| 01 | Scaffold and tooling | 1 | — | — | 🟦 ready | — | — | — | — | — | 0 | — |
| 02 | Design tokens | 2 | A | 01 | ⬜ todo | — | — | — | — | — | 0 | — |
| 03 | i18n contract | 2 | B | 01 | ⬜ todo | — | — | — | — | — | 0 | — |
| 04 | `useLocale` | 3 | B | 03 | ⬜ todo | — | — | — | — | — | 0 | — |
| 05 | Icon system | 2 | C | 01 | ⬜ todo | — | — | — | — | — | 0 | — |
| 06 | Routes and `useNav` | 4 | B | 04 | ⬜ todo | — | — | — | — | — | 0 | — |
| 07 | Layout chrome | 5 | — | 02, 05, 06 | ⬜ todo | — | — | — | — | — | 0 | — |
| 08 | Home — market row | 6 | A | 07 | ⬜ todo | — | — | — | — | — | 0 | — |
| 09 | Home — sections | 6 | A | 08 | ⬜ todo | — | — | — | — | — | 0 | — |
| 10 | Inner-page system | 6 | B | 07 | ⬜ todo | — | — | — | — | — | 0 | — |
| 11 | Full QA pass | 7 | — | 09, 10 | ⬜ todo | — | — | — | — | — | 0 | — |
| 12 | Hardening and release | 8 | — | 11 | ⬜ todo | — | — | — | — | — | 0 | — |

## Exit criteria

Each checkpoint is done only when every box in its `test-criteria.md` is checked, the review verdict is PASS, and the human approved the merge.

| CP | Exit criteria (short) | Full criteria |
|----|-----------------------|---------------|
| 01 | Empty app builds static; lint, typecheck, Vitest green | [test-criteria](../03-Planning/checkpoints/CP01-scaffold-and-tooling/test-criteria.md) |
| 02 | Every recurring value is a `--bb-*` token | [test-criteria](../03-Planning/checkpoints/CP02-design-tokens/test-criteria.md) |
| 03 | `en.ts` / `bn.ts` match prototype `T` value by value; parity test green | [test-criteria](../03-Planning/checkpoints/CP03-i18n-contract/test-criteria.md) |
| 04 | `setLang('bn')` switches content, URL unchanged | [test-criteria](../03-Planning/checkpoints/CP04-use-locale/test-criteria.md) |
| 05 | Every icon renders via `<BaseIcon>` at prototype size | [test-criteria](../03-Planning/checkpoints/CP05-icon-system/test-criteria.md) |
| 06 | 5 routes generate; active nav state correct | [test-criteria](../03-Planning/checkpoints/CP06-routes-and-nav/test-criteria.md) |
| 07 | Chrome pixel-matches; audit fixes 1, 3, 7, 9 verified | [test-criteria](../03-Planning/checkpoints/CP07-layout-chrome/test-criteria.md) |
| 08 | Market cards + auctions match in en and bn | [test-criteria](../03-Planning/checkpoints/CP08-home-market-row/test-criteria.md) |
| 09 | Full home matches; audit fixes 4, 5, 6, 8 verified | [test-criteria](../03-Planning/checkpoints/CP09-home-sections/test-criteria.md) |
| 10 | 4 inner routes render from one `InnerPage.vue` | [test-criteria](../03-Planning/checkpoints/CP10-inner-page-system/test-criteria.md) |
| 11 | 5 routes × 2 languages × 3 widths: 0 deltas, WCAG 2.1 AA | [test-criteria](../03-Planning/checkpoints/CP11-full-qa-pass/test-criteria.md) |
| 12 | `.output/public/` deployable; CI enforces every gate | [test-criteria](../03-Planning/checkpoints/CP12-hardening-and-release/test-criteria.md) |

## Audit issues

| # | Issue | Fixed in | Status |
|---|-------|----------|--------|
| 1 | No persistent navigation bar | CP07 | ⬜ open |
| 2 | Fixed narrow page width | CP02 | ⬜ open |
| 3 | Auto-rotating banner, no pause (WCAG 2.2.2) | CP07 | ⬜ open |
| 4 | Red/green borders without meaning (WCAG 1.4.1) | CP02 | ⬜ open |
| 5 | Governor section wasted space | CP09 | ⬜ open |
| 6 | Card icon/border misalignment | CP09 | ⬜ open |
| 7 | Social icons without labels | CP07 | ⬜ open |
| 8 | Hotlines as bitmap images | CP09 | ⬜ open |
| 9 | Low-contrast header search (WCAG 1.4.3) | CP07 | ⬜ open |

## Open human gates

| Gate | Checkpoint | Waiting for | Since |
|------|------------|-------------|-------|
| — | — | — | — |

## Activity log

Newest first. Format: `YYYY-MM-DD HH:MM · CPxx · event · detail`

- — · — · created · tracker initialized, CP01 ready
