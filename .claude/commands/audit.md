---
description: Full pre-ship audit across every route at every breakpoint. Returns a go/no-go report. Usage: /audit [route-glob]
---

Scope: **$ARGUMENTS** (default: every route in the app).

The gate before shipping. Work to `CLAUDE.md` + `docs/HOUSE-STYLE.md`. Be ruthless; a soft audit is worthless.

1. **Enumerate routes.** List every page in the App Router (+ key dynamic routes). Ensure the dev server is running.
2. **Capture (the lead does this).** For each route, capture screenshots at **375 / 768 / 1440** (headless Playwright via Bash, or the Claude Preview MCP), the served HTML, and console output.
3. **Per route, grade:**
   - Run `design-critic` and `content-critic` on the captured renders (pass the paths + a one-line page brief). They grade against `HOUSE-STYLE.md` + the homepage anchor + `krim-content.md`.
   - Record console errors/warnings.
   - Confirm internal links resolve and primary CTAs are correct.
   - Accessibility spot-check: heading order (one h1), focus-visible, alt text, AA contrast, no CLS.
   - GEO spot-check: answer-first opening; substantive copy present in the served HTML (not interaction-only); title/meta/canonical/JSON-LD present.
4. **Cross-page consistency (the anchor test).** Do all routes look like one team built them — same canvas/orb/glass/type/grammar/restraint as the homepage? Shared nav/footer/buttons/cards identical? Flag any drift.
5. **Report** one table: route × breakpoint × P0/P1 × verdict, plus the consolidated P0/P1 list with each fix.
6. **Go / No-go.** No-go if any route has an open P0 or P1. Name exactly what must change to reach Go. Don't soften it.

Don't fix during the audit — report, then `/review <route>` resolves each failing page.
