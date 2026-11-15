# CP02 — Design tokens and global base CSS: Plan

All paths are relative to `Bangladesh Bank New Website/` unless they start with `../`. A draft `tokens.css` and `base.css` already exist (commit `456fe5e`); this checkpoint verifies them value by value against the table below and rewrites what differs.

## Files to create or change
| File | Action | Responsibility |
|------|--------|----------------|
| `app/assets/css/tokens.css` | Verify / rewrite | One `:root` block with the 26 tokens below. Nothing else. No comments (user rule). |
| `app/assets/css/base.css` | Verify / rewrite | Global reset, `::selection`, `.bb-app`, `.bb-container`. Uses `var(--bb-*)` only, no hex literals. No comments. |
| `nuxt.config.ts` | Verify | `css: ['~/assets/css/tokens.css', '~/assets/css/base.css']` — tokens load first. |
| `tests/unit/tokens.spec.ts` | Create | 5 tests listed in `test-criteria.md`. |

### Token table (exact values, source lines in `02-Design/Bangladesh Bank.html`)

| Token | Value | Uses | Example source lines |
|-------|-------|------|----------------------|
| `--bb-green` | `#006A4E` | 59 | 22, 49, 53 |
| `--bb-green-dark` | `#0A3D2C` | 6 | 29, 123, 156, 172, 434, 865 |
| `--bb-green-darker` | `#00543E` | 1 | 356 (primary button hover) |
| `--bb-red` | `#F42A41` | 13 | 32, 49, 79 |
| `--bb-green-soft` | `#E4F1EC` | 6 | 121, 324 |
| `--bb-green-border` | `#C5E0D6` | 3 | 121, 227, 324 |
| `--bb-green-pale` | `#DCEFE6` | 3 | 22, 249, 266 |
| `--bb-green-300` | `#5FBE9E` | 5 | 409, 447, 458, 466, 474 |
| `--bb-green-200` | `#6BA892` | 1 | 328 (breadcrumb chevron) |
| `--bb-green-hover` | `#F7FAF8` | 4 | 143, 227, 349, 369 |
| `--bb-page` | `#F4F6F8` | 2 | 87, 386 |
| `--bb-white` | `#fff` | 50 | 20, 26, 29 |
| `--bb-border` | `#E0E4E8` | 16 | 68, 386 |
| `--bb-border-soft` | `#EDF0F3` | 7 | 100, 143, 161, 182, 369, 393, 421 |
| `--bb-ink` | `#0A0A0A` | 1 | 26 (root text color) |
| `--bb-ink-1` | `#1a1a1a` | 5 | 145, 183, 285, 370, 394 |
| `--bb-ink-2` | `#4A4A4A` | 22 | 326, 333, 335 |
| `--bb-ink-muted` | `#9aa39e` | 8 | 95, 102, 106, 118, 166, 188, 225, 383 |
| `--bb-ink-nav` | `#3a4a5e` | 1 in source, 7 at runtime | 861 (inactive nav item color) |
| `--bb-notice-bg` | `#FFF8E1` | 1 | 77 |
| `--bb-notice-border` | `#F2E2A8` | 1 | 77 |
| `--bb-notice-ink` | `#7A5A00` | 1 | 80 |
| `--bb-font` | `'Inter', system-ui, sans-serif` | — | 26 |
| `--bb-mono` | `'JetBrains Mono', monospace` | — | 95, 118, 166 |
| `--bb-max` | `1240px` | 13 | 30, 50, 69, 78, 88, 198, 235, 257, 277, 300, 325, 342, 435 |
| `--bb-gutter` | `40px` | 13 | same lines as `--bb-max` |

### `base.css` content (exact rules)

| Selector | Declarations | Source line |
|----------|--------------|-------------|
| `*` | `box-sizing: border-box` | 18 |
| `html, body` | `margin: 0; padding: 0` | 19 |
| `body` | `background: var(--bb-white)` | 20 |
| `a` | `text-decoration: none; color: inherit` | 21 |
| `::selection` | `background: var(--bb-green-pale); color: var(--bb-green)` | 22 |
| `.bb-app` | `font-family: var(--bb-font); color: var(--bb-ink); background: var(--bb-white); min-height: 100vh; -webkit-font-smoothing: antialiased` | 26 |
| `.bb-container` | `max-width: var(--bb-max); margin: 0 auto; padding: 0 var(--bb-gutter)` | 30 (and the 12 other lines above) |

## Steps
1. List every distinct hex color in the prototype: `grep -o -i -E "#[0-9a-f]{6}\b|#[0-9a-f]{3}\b" "../02-Design/Bangladesh Bank.html" | tr a-f A-F | sort | uniq -c | sort -rn`. Confirm 22 distinct values and the counts in the token table.
2. Open `app/assets/css/tokens.css`. Compare each line to the token table. Fix any value or name that differs. Remove all comments.
3. Confirm the file has exactly 26 custom properties and nothing outside `:root`.
4. Open `app/assets/css/base.css`. Replace the 3 hex literals (`#fff` on `body`, `#DCEFE6` and `#006A4E` on `::selection`) with `var(--bb-white)`, `var(--bb-green-pale)`, `var(--bb-green)`. Remove all comments.
5. Confirm `nuxt.config.ts` → `css` lists `tokens.css` before `base.css`.
6. Write `tests/unit/tokens.spec.ts` (5 tests from `test-criteria.md`). It reads `tokens.css`, `base.css`, `nuxt.config.ts` and `../02-Design/Bangladesh Bank.html` as text with `node:fs` and a path built from `process.cwd()`.
7. Run `npm run test` → green.
8. Run `npm run lint`, `npm run typecheck`, `npm run generate` → all exit 0.
9. Run `npx serve .output/public`, open a new Chrome DevTools MCP tab and run the Visual QA list at 1280, 768 and 375 px.
10. Ask the user for approval, then commit (`feat(cp02): design tokens and base css`).

## Design source
`02-Design/Bangladesh Bank.html`:
- Lines 17–23: the global `<style>` block (reset and `::selection`).
- Line 26: the root wrapper `div` (font, color, background, min-height, font smoothing) → `.bb-app`.
- Line 30 (and 50, 69, 78, 88, 198, 235, 257, 277, 300, 325, 342, 435): `max-width:1240px;margin:0 auto;padding:0 40px` → `.bb-container`.
- Lines 11–15: font sources for `--bb-font` and `--bb-mono`.
- Lines 26–498 (all inline styles) and lines 861, 865–866 (colors set in the script) for the 22 hex values.

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Which colors become tokens | All 22 distinct hex colors, one token each | One simple, testable rule: "every hex in the prototype has a token". Single-use colors still get a token so no component carries a raw hex. |
| Token value case | Same case as the prototype (`#006A4E`, `#fff`, `#9aa39e`) | Fidelity rule: transcribe exactly. Tests compare case-insensitively. |
| Translucent whites (`rgba(255,255,255,.6)` … `.85`, 10 values) | Inline in scoped CSS | Each is an overlay tuned to one background; a token adds a name with no reuse. |
| Shadows and radii | Inline exact values | `architecture.md` scopes tokens to palette, fonts and layout width. 4 shadows are each used once. |
| Red vs green meaning (audit #4) | `--bb-red` only for alerts/accents (status dot line 32, masthead rule line 49, notice tag line 79, "New" badge, hover accent); never a card border | WCAG 1.4.1: color alone must not carry meaning; a red border on a normal card implies an error. |
| Mono fallback | `'JetBrains Mono', monospace` | Prototype names only `'JetBrains Mono'`; adding `monospace` changes no pixel when the web font loads, and keeps numbers aligned if it fails. |
| Contrast failures in the prototype | Keep the exact values in CP02 | Fidelity rule. They are logged as a risk and decided in CP11 with the user. |

## Risks
| Risk | Mitigation |
|------|------------|
| `#9aa39e` (`--bb-ink-muted`) on `#fff` is 2.59:1 and on `#F4F6F8` is 2.39:1 — fails WCAG 1.4.3 (needs 4.5:1) for the 10–12 px date and label text | Logged now. CP11 proposes a darker muted value to the user as an approved exception (same pattern as D3). Not changed in CP02. |
| White text on `#F42A41` (notice tag, 10 px, line 79) is 4.00:1 — fails WCAG 1.4.3 | Same as above: CP07 or CP11 proposes a fix for approval. |
| Draft components use hex literals instead of tokens | Each component checkpoint (CP05–CP10) adds a check that its files contain no hex literal that has a token. |
| A token is renamed later and components silently lose a value (CSS falls back to `initial`) | CP11 runs a grep: every `var(--bb-…)` used in `app/` must exist in `tokens.css`. |
| The prototype path `../02-Design/` moves | The tokens test fails loudly with "file not found"; update the one path constant in the test. |

## Estimated effort
2 hours.
