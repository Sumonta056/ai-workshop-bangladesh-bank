# CP02 — Design tokens and global base CSS: Test Criteria

Run every command inside `Bangladesh Bank New Website/`.

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors
- [ ] `app/assets/css/tokens.css` and `app/assets/css/base.css` contain 0 comments (`grep -c "/\*"` → 0)
- [ ] `nuxt.config.ts` → `css` is exactly `['~/assets/css/tokens.css', '~/assets/css/base.css']`

## Unit tests (Vitest)
File: `tests/unit/tokens.spec.ts`

| Test | Input | Expected result |
|------|-------|-----------------|
| Exact token set | `tokens.css` parsed into `{ name: value }` | Exactly 26 entries, equal (case-insensitive) to the token table in `plan.md`, e.g. `--bb-green` = `#006A4E`, `--bb-red` = `#F42A41`, `--bb-green-dark` = `#0A3D2C`, `--bb-max` = `1240px`, `--bb-gutter` = `40px` |
| Every prototype color has a token | All hex matches in `../02-Design/Bangladesh Bank.html` (22 distinct, upper-cased) | Each one equals the value of exactly one color token |
| No invented color | The 22 color token values | Each value appears at least once in the prototype file |
| `base.css` uses tokens only | `base.css` text | 0 matches for `/#[0-9a-fA-F]{3,6}\b/`; contains `var(--bb-max)`, `var(--bb-gutter)`, `var(--bb-font)`, `var(--bb-green-pale)` |
| Load order | `nuxt.config.ts` text | Index of `tokens.css` < index of `base.css` |

`npm run test` reports all CP01 and CP02 tests passed, 0 failed.

## Visual QA (Chrome DevTools MCP vs prototype)
Serve with `npx serve .output/public`, open `http://localhost:3000/` in a new tab (`new_page`), and run `evaluate_script`:
- [ ] `getComputedStyle(document.documentElement).getPropertyValue('--bb-green').trim()` is `#006A4E`
- [ ] `--bb-red` is `#F42A41`, `--bb-green-dark` is `#0A3D2C`, `--bb-ink-2` is `#4A4A4A`, `--bb-border` is `#E0E4E8`, `--bb-page` is `#F4F6F8`
- [ ] `--bb-max` is `1240px`, `--bb-gutter` is `40px`
- [ ] `getComputedStyle(document.body).backgroundColor` is `rgb(255, 255, 255)`
- [ ] `getComputedStyle(document.body).margin` is `0px`
- [ ] `.bb-app` computed `font-family` starts with `Inter`, `color` is `rgb(10, 10, 10)`, `min-height` equals the viewport height
- [ ] The `::selection` rule in the CSSOM has `background: var(--bb-green-pale)` (resolves to `#DCEFE6`) and `color: var(--bb-green)` (`#006A4E`) — compare to prototype line 22 by selecting text in both tabs
- [ ] `document.fonts.check("16px Inter")` and `document.fonts.check("16px 'JetBrains Mono'")` are `true` after `document.fonts.ready`
- [ ] Console has 0 errors and 0 warnings
- [ ] Close the tab with `close_page`

## Accessibility
Contrast ratios of token pairs (WCAG 1.4.3, normal text needs ≥ 4.5:1). Verify with the DevTools contrast picker or a contrast script:
- [ ] `--bb-green` `#006A4E` on `#fff` = 6.62:1 (pass)
- [ ] `#fff` on `--bb-green` `#006A4E` = 6.62:1 (pass — masthead text)
- [ ] `#fff` on `--bb-green-dark` `#0A3D2C` = 12.23:1 (pass — utility bar, footer)
- [ ] `--bb-ink-2` `#4A4A4A` on `#fff` = 8.86:1 (pass)
- [ ] `--bb-ink-nav` `#3a4a5e` on `#fff` = 9.05:1 (pass)
- [ ] `--bb-notice-ink` `#7A5A00` on `--bb-notice-bg` `#FFF8E1` = 6.01:1 (pass)
- [ ] `--bb-green` on `--bb-green-soft` `#E4F1EC` = 5.70:1 (pass — inner header)
- [ ] Known failures are logged in `plan.md` → Risks and handed to CP11: `--bb-ink-muted` `#9aa39e` on `#fff` = 2.59:1; `#fff` on `--bb-red` `#F42A41` = 4.00:1
- [ ] WCAG 1.4.1 rule recorded: `--bb-red` is never used as a card border color (checked per component in CP09)

## Responsive
No breakpoints exist yet (prototype has 0 `@media` rules; D2 defers them to CP11). Check only the container band, with `resize_page`:
- [ ] 1280 px — first `.bb-container`: `offsetWidth` = 1240, computed `padding-left` and `padding-right` = `40px`, left edge at x = 20
- [ ] 768 px — first `.bb-container`: `offsetWidth` = 768, padding `40px` each side
- [ ] 375 px — first `.bb-container`: `offsetWidth` = 375, padding `40px` each side

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
