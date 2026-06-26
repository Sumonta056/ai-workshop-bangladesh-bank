# QA Report — Bangladesh Bank Website (Live)

| | |
|---|---|
| **Target** | https://www.bb.org.bd/en/index.php |
| **Date** | 2026-06-26 |
| **Mode** | Report-only (external production site — no source modifications) |
| **Tier** | Standard |
| **Tester** | Automated QA (gstack browse, headless Chromium) |
| **Framework** | PHP / CodeIgniter-style (`index.php/<controller>/<action>` routing) + F5/TSPD bot defense |
| **Pages exercised** | 18+ (home, About, Monetary, Financial, FX, EconData, Search, 404) |
| **Health Score** | **84 / 100** |

> **Scope note:** This is a third-party government production website. Testing was non-destructive (no load testing, no auth attacks, no fuzzing). Findings are based on real user-facing behavior, response headers, and DOM/accessibility inspection.

---

## Verdict

**QA Result: PASS WITH CONCERNS.** The site is functional, fast, responsive, and bilingual. Core flows (navigation, search, language switch, data pages) all work. The concerns are concentrated in **accessibility**, **security headers**, and **SEO/metadata** — not in broken functionality. No critical functional defects were found.

---

## Health Score Breakdown

| Category | Score | Weight | Notes |
|---|---|---|---|
| Console | 100 | 15% | No site-origin JS errors (console noise was test-profile browser extensions) |
| Links | 70 | 10% | 2 broken external links (Play Store app, Twitter) |
| Visual | 100 | 10% | Clean, consistent layout; no visual defects |
| Functional | 84 | 20% | Bare 404 page, broken external app link |
| UX | 84 | 15% | Generic titles, stranded 404 page |
| Performance | 100 | 10% | Load ~1.4s, TTFB 119ms |
| Content | 76 | 5% | Broken external links, no meta description |
| Accessibility | 62 | 15% | No `lang`, empty links, broken heading structure |
| **Weighted total** | **84** | | |

---

## Severity Summary

| Severity | Count |
|---|---|
| 🔴 Critical | 0 |
| 🟠 High | 3 |
| 🟡 Medium | 8 |
| 🔵 Low | 4 |
| **Total** | **15** |

---

## Top 3 Things to Fix

1. **F-05 — `<html>` has no `lang` attribute (sitewide).** Breaks screen readers on a bilingual EN/BN government site. One-line fix, high impact.
2. **F-01 — No HTTP→HTTPS redirect; port 80 hangs.** Users typing `http://` get a connection timeout instead of a redirect. Hurts reachability and security posture.
3. **F-06 — 34 empty/duplicate anchor links on the homepage.** Keyboard-focusable dead stops; screen readers announce bare "link". Major accessibility noise.

---

## Detailed Findings

### 🟠 HIGH

**F-01 — No HTTP→HTTPS redirect (port 80 times out)**
*Category: Security / Availability · Priority: High*
`http://www.bb.org.bd/` and `http://www.bb.org.bd/en/index.php` do not respond — the connection hangs and times out (curl: `Connection timed out after 20s`, `http_code=000`). There is no 301/302 upgrade to HTTPS. Users or links using `http://` get a dead page instead of being redirected.
*Recommendation:* Add a permanent 301 redirect from port 80 to HTTPS, and add HSTS (see F-02).

**F-05 — `<html lang>` missing on every page**
*Category: Accessibility (WCAG 2.1 — 3.1.1 Language of Page) · Priority: High*
`document.documentElement.lang` is `null`/empty on the homepage and all interior pages. Screen readers cannot determine the page language — especially important here because the site serves both English and Bangla.
*Recommendation:* Set `<html lang="en">` (and `lang="bn"` on the Bangla site).

**F-06 — 34 empty / duplicate anchor links on homepage**
*Category: Accessibility · Priority: High*
34 `<a>` elements contain only whitespace (no text, no image, no `aria-label`). Many duplicate the destination of the adjacent real link (e.g., two anchors both pointing to `/econdata/exchangerate`, one empty). These are keyboard-focusable dead stops and screen readers announce them as a bare "link" with the raw URL.
*Recommendation:* Remove empty anchors or give them accessible text; de-duplicate the wrapping/inner link pattern.

---

### 🟡 MEDIUM

**F-02 — Missing HSTS (Strict-Transport-Security) header**
*Category: Security · Priority: Medium*
No `Strict-Transport-Security` header is returned. Combined with F-01, the site offers no protection against SSL-strip / downgrade attacks for a financial institution.
*Recommendation:* `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.

**F-03 — Missing Content-Security-Policy**
*Category: Security · Priority: Medium*
No CSP header. For a central bank, CSP is an important defense-in-depth layer against XSS and content injection.
*Recommendation:* Add a CSP (start in `Content-Security-Policy-Report-Only` mode).

**F-07 — Broken heading structure**
*Category: Accessibility / SEO · Priority: Medium*
Homepage has **four `<h1>`** elements, all containing numeric dashboard values (`123.1112`, `9.74`, `9.83`, `9.87`). Interior pages (e.g., Exchange Rate) have **zero `<h1>`**. No page has a single meaningful top-level heading.
*Recommendation:* One descriptive `<h1>` per page; demote metric numbers to `<span>`/`<p>`.

**F-08 — Identical generic `<title>` on every page**
*Category: SEO / UX · Priority: Medium*
Every page returns `<title>Bangladesh Bank</title>` — homepage, Exchange Rate, Board of Directors, etc. Tabs, bookmarks, and search results are indistinguishable.
*Recommendation:* Page-specific titles, e.g. `Exchange Rate of Taka | Bangladesh Bank`.

**F-09 — No meta description / Open Graph tags**
*Category: SEO · Priority: Medium*
No `<meta name="description">`, no `og:*` tags. Search snippets are auto-generated and social shares have no preview card.
*Recommendation:* Add meta description + Open Graph tags per page template.

**F-10 — `target="_blank"` links without `rel="noopener"`**
*Category: Security · Priority: Medium*
10 links open in a new tab without `rel="noopener noreferrer"` (including Facebook, Twitter, YouTube). Reverse-tabnabbing best-practice violation.
*Recommendation:* Add `rel="noopener noreferrer"` to all `target="_blank"` links.

**F-11 — Broken external link: Google Play app**
*Category: Content / Functional · Priority: Medium*
The "app" link `https://play.google.com/store/apps/details?id=bd.org.bb.cms` returns **404** — the listing no longer exists.
*Recommendation:* Update or remove the link.

**F-13 — 404 page has no header, navigation, footer, or "home" link**
*Category: UX · Priority: Medium*
The site does return a proper **404 status** with a friendly "Oops!" message (good), but the page is a bare card on a blank white background. No site chrome, no branding, no way to navigate back — the user is stranded.
*Recommendation:* Render the 404 inside the standard layout with a "Back to Home" link and search box.

---

### 🔵 LOW

**F-04 — Missing Referrer-Policy & Permissions-Policy headers**
*Category: Security · Priority: Low* — Add `Referrer-Policy: strict-origin-when-cross-origin` and a restrictive `Permissions-Policy`.

**F-12 — Twitter link returns 404 (verify manually)**
*Category: Content · Priority: Low* — `https://twitter.com/BBGovernor` returned 404 and Facebook returned 400 to the crawler. These may be anti-bot false positives; **verify in a real browser.** If genuinely dead, update.

**F-14 — Contact emails/phones exposed in plain text**
*Category: Privacy / Spam · Priority: Low* — Director/officer emails and phone numbers are in plain HTML (harvestable by spam bots). Normal for a gov directory; consider obfuscation or a contact form.

**F-15 — Bot-defense layer returns 200 to non-browser clients for invalid URLs**
*Category: Observability · Priority: Low (Info)* — The F5/TSPD layer serves a 200 challenge page to `curl` for a non-existent URL, while real browsers correctly receive a 404. This can confuse uptime monitors and crawlers.

---

## What Passed ✅

- All 18+ tested pages return **HTTP 200**.
- **Search** works and returns relevant, categorized results (tested `remittance`).
- **Language toggle** EN ↔ BN works (`/home/switch_lang` → 200; Bangla site 200).
- **Responsive:** no horizontal overflow at 375px; dedicated mobile sidenav toggle present.
- **Performance:** load ~1.4s, TTFB 119ms, DOM ready 1.2s.
- **No site-origin console errors.**
- Security headers present: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block`.
- Session cookies are `HttpOnly` + `Secure`.
- All `<img>` have `alt` attributes (0 missing); form inputs have accessible names; viewport meta present; favicon present.
- A real, friendly **404 page** exists (content-wise — see F-13 for the layout gap).

---

## Evidence (Screenshots)

| File | Shows |
|---|---|
| `screenshots/01-home-full.png` | Homepage (desktop) |
| `screenshots/02-search-results.png` | Search results for "remittance" (PASS) |
| `screenshots/03-home-mobile.png` | Mobile layout @375px (PASS) |
| `screenshots/04-exchangerate.png` | Exchange Rate data page (PASS; generic title) |
| `screenshots/05-board.png` | Board of Directors (PASS; emails exposed — F-14) |
| `screenshots/06-soft404.png` | Bare 404 page (F-13) |

**Interactive report:** `qa-report-bb-org-bd-2026-06-26.html`
