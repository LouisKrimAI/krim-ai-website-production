---
description: Full pre-ship audit across every route at every breakpoint. Returns a go/no-go report. Usage: /audit [route-glob]
---

Scope: **$ARGUMENTS** (default: every route in the app).

This is the gate before shipping. Work to `CLAUDE.md`. Be ruthless; a soft audit is
worthless.

1. **Enumerate routes.** List every page in the App Router (and key dynamic routes).
   Confirm the dev server is running.

2. **Per route**, via the Claude Preview MCP (preview_resize → preview_screenshot / preview_inspect / preview_snapshot / preview_console_logs) at 375 / 768 / 1440:
   - Screenshot and visually inspect each breakpoint.
   - Run `design-critic` and `content-critic`.
   - Record console errors/warnings.
   - Check internal links resolve and primary CTAs work (click them).
   - Spot-check accessibility: heading order, focus-visible on interactive elements,
     image alt text, AA contrast on text.

3. **Cross-page consistency.** Verify shared components (nav, footer, buttons, cards)
   are visually and behaviourally identical across routes, and that the verticals
   (Platform and the Domains) share one coherent system rather than drifting apart.

4. **Report** as a single table: route × breakpoint × P0/P1 counts × verdict, plus a
   consolidated list of every P0 and P1 with its fix.

5. **Go / No-go.** **No-go** if any route has an open P0 or P1. Name exactly what
   must be fixed to reach Go. Do not soften this.

Do not fix issues during the audit — report them, then a follow-up `/review <route>`
per failing route resolves them.
