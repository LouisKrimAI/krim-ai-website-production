---
description: Build or refine one route to the house standard, then render → critique → fix until both critics SHIP. Usage: /review <route> [intent]
---

Target route: **$ARGUMENTS**

Work to `CLAUDE.md` and `docs/HOUSE-STYLE.md`. Do not report done from code alone.
The homepage is the **style** anchor — match its craft, not its section order. This
page gets the structure that best does *its* job.

1. **Architect (thinking).** Confirm the page's single job and audience from
   `docs/SITEMAP-IA.md` + `docs/KRIM-BRIEF.md`. Decide the page's OWN structure
   (sections + order — best practice for this page type, not a clone of the homepage)
   and its ONE signature idea. List the must-include facts from `docs/krim-content.md`.
   Write this as a 3–5 line page brief.
2. **Copy (full creative licence).** Write marketing-grade copy for that structure in
   the house voice (`HOUSE-STYLE.md` §10) — evocative, benefit-led. Facts trace to
   `krim-content.md`; the decks in `docs/copy/` are raw material, not final wording.
   Then **self-edit before you build** — don't hand slop to the critic to catch. Read
   every headline AND eyebrow aloud and kill the three banned archetypes (§3): label
   ("The parts"), instruction ("Open the part you came for"), inventory ("Five
   parts/modules"). The test for each line: *would a CMO ship this, or does it read like
   a filing-cabinet drawer, a UI tooltip, or a parts list?* Arrive at the build step
   with copy that already clears the bar.
3. **Build / refine — simple and content-first (HOUSE-STYLE §0).** Implement to
   `HOUSE-STYLE.md`: tokens only; the calm orb backdrop; **emulate the homepage's glass
   exactly** (`glass lume` cards + accent bar, `GlassCard` callouts, real images framed
   in glass). Content graphics are real dropped-in images or a clean glass+type section —
   **never a hand-built SVG/JSX "device"** (diagrams, dashboards, dials, fake UIs, gates).
   Motion budget ≤1 earned moment, everything else subtle. Don't over-engineer: if a
   section needs a gadget to be interesting, fix the writing instead.
4. **Render (the lead captures — critics don't).** Ensure the dev server is running.
   Capture full-page + key-section screenshots at **375 / 768 / 1440** (headless
   Playwright via Bash, or the Claude Preview MCP) and the served HTML. Fix any console
   error before going further.
5. **Critique.** Invoke `design-critic` and `content-critic`, passing the screenshot
   paths + served HTML + the page brief. They grade against `HOUSE-STYLE.md` + the
   homepage anchor + `krim-content.md`.
6. **Fix.** Resolve every **P0** and **P1** at the token/copy level they specify; re-render; re-run both critics.
7. **Loop** 5–6 until **both** return `SHIP` (two clean verdicts, not the first "looks fine").
8. **Report** a short changelog: the page brief, what changed, fixes applied, any P2s deferred.
