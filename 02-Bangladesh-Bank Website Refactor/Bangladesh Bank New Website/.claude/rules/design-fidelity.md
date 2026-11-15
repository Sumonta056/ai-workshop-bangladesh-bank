# Rule: Design fidelity

The original HTML is the **specification**, not a suggestion.

1. **Copy exact values.** Colors (`#006A4E`, `#F42A41`, `#0A3D2C`, …), font sizes,
   line-heights, letter-spacing, padding, border-radius, gaps, shadows — transcribe
   them exactly. When a value repeats, use the matching token from `tokens.css`;
   the token values are the originals, so this stays pixel-identical.
2. **Copy exact copy.** All text comes from the `T` dictionary in the source HTML,
   both `en` and `bn`. Never paraphrase, translate, or "fix" wording. Bangla
   numerals (২৩ জুন) stay as written.
3. **Preserve structure & order.** Same sections, same order, same DOM nesting that
   produces the layout (grids, flex). Breakpoints/responsive behavior match.
4. **Behavior parity.** Hover states, the language toggle, nav active-highlighting,
   and "do nothing" links (`about`, `fx`, `gsec`, `pay` were `noop`) all match.
5. **When unsure, open the source** and read the exact element. Do not invent.

If a value in the design looks "wrong," it is still the spec. Reproduce it.
