---
name: port-section
description: Port one section of the Bangladesh Bank HTML design into a Nuxt 4 component, then verify it pixel-matches the original. Use when converting a section (header, market cards, news panel, governor, footer, inner page, etc.) from the source HTML to Vue.
---

# Port a design section to Nuxt

A repeatable, design-faithful workflow for converting one section of
`../01-Bangldesh-Bank-Refactor-Design/Bangladesh Bank.html` into a Vue component.

## Steps

1. **Read the source.** Open the section's markup in the source HTML and find its
   data in the `T` dictionary (both `en` and `bn`). Note every inline style value.

2. **Plan the component tree.** Decide the parent section component and whether
   repeating items need their own child component (cards/rows usually do). Place
   files under the right domain folder: `app/components/{base,layout,home,inner}/`.

3. **Build it** following `.claude/rules/design-fidelity.md`, `nuxt-conventions.md`,
   and `styling.md`:
   - Content from `useLocale()` — `const { L } = useLocale()`. Never hardcode copy.
   - Scoped `<style>`; repeated palette/fonts/width via `var(--bb-*)` tokens.
   - Convert design-tool syntax:
     | Source (DC runtime) | Vue |
     |---|---|
     | `style-hover="..."` | scoped `:hover` rule |
     | `<sc-for list as item>` | `v-for` |
     | `<sc-if value>` | `v-if` |
     | `onClick="{{ fn }}"` | `@click="fn"` |
     | inline `<svg>` | `<BaseIcon name size />` |
     | `<image-slot>` | `<ImageSlot>` |

4. **Verify.** Run the dev server and compare against the original in the browser —
   both languages, hover states, exact spacing. Optionally dispatch the
   `design-fidelity-reviewer` agent for a line-by-line audit.

5. **Self-check** for leftover design-tool syntax (the port-check PostToolUse hook
   enforces this automatically on save).

## Done when
- The section renders pixel-identical in `en` and `bn`.
- No design-tool syntax remains.
- File(s) are small and single-responsibility.
