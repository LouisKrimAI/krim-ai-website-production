---
description: Build or refine one route, then render → critique → fix until both critics return SHIP. Usage: /review <route> [intent]
---

Target route: **$ARGUMENTS**

Work to the rules in `CLAUDE.md`. Do not report done from code alone.

1. **Plan (thinking).** Confirm the route's single job from `docs/SITEMAP-IA.md`
   (and `docs/KRIM-BRIEF.md`). Run the two-pass design process from `CLAUDE.md` §2:
   state palette, type roles, layout concept, and the signature element (the route's
   deck names one — honour it); then self-critique against the AI-default looks and
   revise. Pull **copy** from `docs/copy/<route>.md`, **facts/names** from
   `docs/krim-content.md`, and **visual values** from `docs/design-tokens.md`. Honour
   each section's PRESENTATION (design-intent) note in the deck.

2. **Build / refine** the route accordingly. Tokens only; no hardcoded values. Reuse
   the shared component system and signature components — don't rebuild per route.

3. **Render.** Ensure the dev server is running. Open the route via the Claude Preview
   MCP (preview_start, then preview_resize + preview_screenshot) at 375 / 768 / 1440.
   Fix any console error before going further.

4. **Critique.** Invoke the `design-critic` and the `content-critic` subagents
   against the live route.

5. **Fix.** Resolve every **P0** and **P1** from both critics, at the token/copy level
   they specify. Then re-render and re-run both critics.

6. **Loop** steps 4–5 until **both** critics return `SHIP`. Stop on two SHIP verdicts,
   not the first "looks fine."

7. **Report** a short changelog: what changed, which fixes were applied, and any P2s
   intentionally deferred.
