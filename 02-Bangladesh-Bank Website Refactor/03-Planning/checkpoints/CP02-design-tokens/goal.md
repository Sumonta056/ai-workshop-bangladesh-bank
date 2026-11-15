# CP02 — Design tokens and global base CSS: Goal

## Goal
Every one of the 22 distinct hex colors in the prototype, the 2 font stacks and the 2 layout widths exist as exactly one `--bb-*` custom property in `app/assets/css/tokens.css`, and `app/assets/css/base.css` holds the prototype's global reset, root wrapper and `.bb-container` using only those tokens.

## Why this checkpoint exists
The prototype writes every value inline: `#006A4E` appears 59 times and `max-width:1240px;margin:0 auto;padding:0 40px` appears 13 times. If each component copies these by hand, one typo (for example `#006A4F`) breaks fidelity in a place nobody looks. Tokens give one source for each value, and a unit test can prove each token equals the prototype. Layout chrome (CP07) and every home and inner section (CP08–CP10) read these tokens, so they must be correct first.

## In scope
- `app/assets/css/tokens.css`: 22 color tokens, `--bb-font`, `--bb-mono`, `--bb-max`, `--bb-gutter`.
- `app/assets/css/base.css`: the reset from prototype lines 18–22, the root wrapper `.bb-app` from line 26, the shared `.bb-container` band (repeated at lines 30, 50, 69, 78, 88, 198, 235, 257, 277, 300, 325, 342, 435).
- Load order in `nuxt.config.ts`: `css: ['~/assets/css/tokens.css', '~/assets/css/base.css']`.
- Semantic usage rule for audit issue 4: `--bb-green` = brand and structure; `--bb-red` = accent and alert only (never a decorative card border).
- Unit tests that compare tokens to the prototype file.

## Out of scope
- `rgba(255,255,255,.xx)` overlay values and the 4 one-off `box-shadow` values: they stay inline in the component that uses them.
- Border-radius values (`12px`, `14px`, `8px`, `999px`): they stay as exact inline values in scoped CSS (architecture.md limits tokens to palette, fonts and layout width).
- Responsive breakpoints: deferred to CP11 (decision D2).
- Replacing hex literals inside existing draft components in `app/components/**`: each component's own checkpoint does that.
- Fixing the 2 prototype contrast failures (see Risks in `plan.md`): CP11.

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| #2 Fixed narrow page width (~843 px) | High | `--bb-max: 1240px` and `--bb-gutter: 40px` drive one `.bb-container` used by every band. CP09 and CP11 finish the fix with grids and breakpoints. |
| #4 Red/green card borders without meaning (WCAG 1.4.1) | High | Separate tokens `--bb-green` (`#006A4E`, brand) and `--bb-red` (`#F42A41`, accent/alert only). The rule is written in this checkpoint; CP09 applies it to the card grids. |

## Depends on
CP01

## Demo at the end
1. `npm run test` shows `tests/unit/tokens.spec.ts` green (5 tests).
2. In Chrome DevTools on `http://localhost:3000/`, run `getComputedStyle(document.documentElement).getPropertyValue('--bb-green')` → ` #006A4E`, and the same for `--bb-max` → ` 1240px`.
3. Select any `.bb-container` at 1280 px width: the box model shows width 1240 px with 40 px left and right padding.
