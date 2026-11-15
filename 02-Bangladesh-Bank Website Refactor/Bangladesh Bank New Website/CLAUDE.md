# Bangladesh Bank — Nuxt 4 Static Refactor

This project is a **faithful port** of an existing single-file HTML design into a
modular Nuxt 4 static site. There is **no backend** — output is a static site
(`npm run generate` → `.output/public/`).

## Source of truth (the design — never edit these)
- `../01-Bangldesh-Bank-Refactor-Design/Bangladesh Bank.html` — the rendered design + all content/data (`T` dict, view logic).
- `../01-Bangldesh-Bank-Refactor-Design/support.js` — the design tool's React runtime. **Not site code.** Do not port it.
- `../01-Bangldesh-Bank-Refactor-Design/image-slot.js` — drag-drop placeholder web component. Reproduced statically as `ImageSlot.vue`.

## The one rule that overrides everything
**Pixel-identical to the design. Do not change, "improve", or modernize any
visual.** Same colors, spacing, fonts, radii, shadows, copy (English + Bangla).
If a Nuxt best practice would alter a pixel, the design wins.

## Architecture (decided, do not relitigate)
- **Nuxt 4** (`app/` srcDir), SSG via `nitro: { preset: 'static' }`.
- **Real routes per view** — `/`, `/monetary-policy`, `/financial-system`, `/publications`, `/services`. Inner views share one data-driven `InnerPage.vue`.
- **Scoped CSS + design tokens** (`assets/css/tokens.css`). No inline style soup; `style-hover` from the original becomes real scoped `:hover`.
- **i18n** via a lightweight `useLocale()` composable over `useState` (no URL change). Content lives in `app/i18n/en.ts` + `bn.ts`.

## Conventions
@.claude/rules/design-fidelity.md
@.claude/rules/nuxt-conventions.md
@.claude/rules/styling.md

## Workflow
- Build one section/component at a time; verify against the original before moving on.
- Small focused files. No component should carry another component's concern.
- After editing `.vue` files, the port-check hook flags leftover design-tool syntax (`style-hover`, `<sc-for>`, `<sc-if>`, `onClick="{{`). Fix any it reports.
- Never commit without explicit instruction.
