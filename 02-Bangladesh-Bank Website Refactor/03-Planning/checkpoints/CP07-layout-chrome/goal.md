# CP07 — Layout chrome: Goal

## Goal
All 5 routes render, through `app/layouts/default.vue`, the utility bar, masthead, sticky primary nav, notice ticker and footer. At 1280 px they match `Bangladesh Bank.html` lines 26–83 and 434–497 pixel for pixel in both languages, and they ship the fixes for audit issues 1, 3, 7 and 9.

## Why this checkpoint exists
The chrome is on every page, so every later visual QA (CP08–CP11) compares screenshots that include it. If the chrome is wrong, every later diff is noisy. It is also where 4 of the 9 audit issues live: navigation, the moving notice, unlabeled social icons and the search contrast. If we skip it, CP08–CP10 have no `<main>` landmark to render into and no skip-link target, and the language switch (CP04) has no visible control.

## In scope
- 5 components in `app/components/layout/`: `UtilityBar.vue` (`<LayoutUtilityBar>`), `Masthead.vue` (`<LayoutMasthead>`), `PrimaryNav.vue` (`<LayoutPrimaryNav>`), `Ticker.vue` (`<LayoutTicker>`) and `Footer.vue` (`<LayoutFooter>`).
- `app/layouts/default.vue`: the `.bb-app` root, skip link, `<header>`, `<nav>`, ticker, `<main id="main">` with `<slot />`, `<footer>`, and `<html lang>` that follows the active language.
- A new `a11y` block in `LocaleContent` (`app/i18n/types.ts`, `en.ts`, `bn.ts`) for text that the design does not have: skip link, nav label, language-group label, ticker pause and play labels.
- `app/data/social.ts`: the 3 social links (`fb`, `x`, `yt`) with `href` and `label`.
- 2 extra icons in `app/data/icons.ts`: `pause` and `play`, for the ticker control (Decision D3).
- 2 global helper classes in `app/assets/css/base.css`: `.bb-visually-hidden` and `.bb-skip-link`.
- `tel:` and `mailto:` links in the footer contact block and the footer hotline column.
- Unit tests for the 5 components and the layout order.

## Out of scope
- Home and inner page content (CP08, CP09, CP10). The pages keep their CP06 temporary `<h1>` but lose their own `<main>` wrapper.
- Breakpoints, the mobile hamburger menu and the 768 px / 375 px layouts (Decision D2, CP11).
- Real destinations for no-op links: utility RTI/Sitemap/Feedback, ticker "View all", footer useful and about links, footer Sitemap/Feedback, and the 4 no-op nav items (Risk R2).
- A working site search. There is no backend; the field is accessible but does not submit.
- A LinkedIn icon. The audit suggests one, but the design has only Facebook, X and YouTube; it is logged as a follow-up.
- Fixing low-contrast colors that the design itself specifies (notice tag, footer copyright, footer disclaimer). They are measured here and handed to CP11 as a decision (see `test-criteria.md`).

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| 1 — No persistent navigation bar | High | `LayoutPrimaryNav` shows all 8 sections as a horizontal bar with `position: sticky; top: 0; z-index: 50` (line 68). It is a direct child of `.bb-app`, so it stays on screen while scrolling. It is a `<nav aria-label="Primary">` landmark ("প্রধান মেনু" in bn). The active route gets `aria-current="page"` and the `#006A4E` 3 px underline. A skip link ("Skip to main content") is the first focusable element and jumps to `<main id="main" tabindex="-1">`. |
| 3 — Auto-rotating banner, no pause (WCAG 2.2.2) | High | The notice text scrolls only when it is wider than its box. A 20 × 20 px pause/play button (`aria-pressed`, `aria-label` "Pause notices" / "Play notices") stops it. The scroll also pauses on `:hover` and `:focus-within`. With `prefers-reduced-motion: reduce` it never moves and shows the design's static, ellipsis-cut line. The server-rendered HTML is static, so the first paint equals the design. |
| 7 — Social icons without labels | Medium | The 3 footer social icons (lines 452–454) change from `<span>` to `<a href>` with `aria-label` "Facebook", "X (Twitter)" and "YouTube". The `<BaseIcon>` inside has `aria-hidden="true"` (CP05). They become keyboard-focusable and get a visible focus ring. |
| 9 — Decorative header, low-contrast search | Low | The masthead is 92 px high (line 50) and has a real search field: `<form role="search">` and `<input aria-label="Search the site">`. The placeholder color is set to `#FFFFFF` with `opacity: 1`, which gives 4.67:1 on the composited pill background `#29826A`. The browser default (`darkgray`, 1.99:1) fails. The pill shows a 2 px white focus ring through `:focus-within`, because the design's `outline: none` on the input would otherwise hide focus. |

## Depends on
CP02, CP05, CP06

## Demo at the end
- Browser at 1280 px: `npx serve .output/public`, open `/`. The chrome looks the same as the prototype next to it. Scroll down 1000 px and the white nav bar stays at the top. Click "Monetary Policy": the URL changes, the green underline moves and the page does not reload.
- Click "বাংলা" in the utility bar. Every chrome label switches to Bangla, the URL stays the same, and `<html lang="bn">` is set. Navigate to `/publications`: the text is still Bangla.
- Press `Tab` once on a fresh load: "Skip to main content" appears top-left. Press `Enter`: focus moves to `<main>`.
- Hover the notice line: it stops moving. Click the pause button: it stays stopped and the button label reads "Play notices".
- Turn on "Emulate CSS prefers-reduced-motion: reduce" in DevTools and reload. The notice is static with an ellipsis, exactly like the prototype, and no pause button is shown.
- `Tab` into the footer: focus reaches "Facebook", "X (Twitter)" and "YouTube" in turn, and a screen-reader snapshot announces each name.
