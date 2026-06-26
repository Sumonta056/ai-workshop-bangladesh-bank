# Rule: Styling

- **Scoped `<style>` per component.** No global class leakage; no inline `style`
  soup copied verbatim. Inline `style` is allowed only for a genuinely one-off,
  dynamic value.
- **Tokens for repeated values.** Use `var(--bb-*)` from `assets/css/tokens.css`
  for the palette, fonts, and layout width. Token values equal the originals.
- **`style-hover` → `:hover`.** The design tool's `style-hover="..."` attribute
  does not exist in real HTML. Convert each to a scoped `:hover` rule with the
  exact hover values from the source.
- **Transitions match the source** (e.g. `transition: color .15s ease`,
  `box-shadow .18s ease`). Copy duration + easing exactly.
- **Fonts:** `var(--bb-font)` (Inter) for UI text, `var(--bb-mono)` (JetBrains
  Mono) for numbers/rates. `font-variant-numeric: tabular-nums` where the source
  uses it.
- **Containers:** reuse `.bb-container` (max-width 1240px, 0 40px gutter) for the
  centered content band instead of repeating the values.
