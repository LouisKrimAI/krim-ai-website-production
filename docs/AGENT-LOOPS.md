# AGENT-LOOPS — how Krim's site gets built to a spectacular bar

This is the **operating manual for the agents** that build and maintain krim.ai. Its job: make the loops *purr* — every change ends up consistent, optimised, meticulous, and on-brand, **without the reviewer having to point out basic misses.** If a defect reaches the user that a check here would have caught, the loop failed — fix the loop, not just the defect.

> **Meta-rule (read first): judgment over rote.** These rules and the rubric in `HOUSE-STYLE.md` are guardrails, not a straitjacket. Apply expert design judgment and best practice first. If a rule applied literally makes the page *worse*, the rule is being misapplied — step back and design. (HOUSE-STYLE §12.)

---

## 1 · Single sources of truth (never contradict these; never duplicate them)
| Topic | Source | One-liner |
|---|---|---|
| Positioning, word choice | `docs/POSITIONING.md` (§11) | **Banking** = market/ambition (heroes). **Banking & financial services** = formal descriptor (meta/identity). **Lending** = the flagship/concrete. **"Regulated operations"** = secondary horizon only — never the lead. |
| Design & voice rubric | `docs/HOUSE-STYLE.md` | How a page looks, reads, moves. §11 = quality bar + self-QA. §12 = judgment + images-behind-text. |
| Facts / claims | `docs/krim-content.md` | Every number/claim. Don't invent customers, metrics, deployments. |
| Brand name | always **Krim**, never "Krim AI" | anywhere on the site. |
| Layer registry | `components/platform/layers.ts` | Kendra · Kriya · Karta · Kupa · Kula · Kira (Krimkar lives inside Kira's page). |

## 2 · The experts (the MoE) — who to pull in, and for what
Invoke the specialist agent that owns the dimension; don't eyeball what an expert can measure.
- **krim-copy-strategist** — wording, headlines, sublines, de-densing.
- **krim-visual-designer / web-layout-architect / motion-studio-director** — layout, hierarchy, signature visuals, motion.
- **content-critic** — copy vs voice + facts + scannability (grades, returns fixes).
- **design-critic** — holistic visual craft vs HOUSE-STYLE + homepage anchor.
- **design-detailer-critic** — *forensic*, measured: off-scale type, 1–2px misalignment, broken rhythm, responsive breakage. **This is the one that catches alignment misses — use it on every card grid.**
- **frontend-render-critic** — correctness, hydration, image/font, measured CWV.
- **seo-geo-critic** — metadata, JSON-LD, canonicals, discoverability.
- **claim-floor-voice-critic** — over/under-claim vs POSITIONING.

## 3 · The pipeline — the definition of done (every change runs this)
1. **Orient** — read the relevant SoT (§1). For copy, POSITIONING + krim-content; for layout, HOUSE-STYLE.
2. **Build** to the bar (HOUSE-STYLE), applying judgment.
3. **Self-QA, measured** (§4) — at desktop **and** mobile width. Fix everything found.
4. **Critic gate** — route to the owning expert(s) in §2 for any non-trivial change; apply their fixes; re-run until SHIP.
5. **Compile gate** — `npx tsc --noEmit` (safe) during work; **`npm run build` only with the dev server stopped** (building against a live dev server corrupts `.next` and white-screens the site — a real incident; restart dev after).
6. **Done** = self-QA clean + critics SHIP + build green + change matches the SoT. Not before.

## 4 · Measured checks (don't eyeball what you can measure)
Run these against the running app (preview_eval / preview_inspect) — they are the checks that would have caught past misses:
- **Card-set alignment:** for any repeated card/grid, measure the baseline of the repeated element (button/divider/title) across items — assert equal **±1px**. (Caught the Kendra/Kula misalignment only after measuring; do it by default.)
- **Word logic:** `grep -rn "regulated operations"` in visible copy → must not be a *lead* descriptor; banking-led per POSITIONING §11.
- **Highlight presence:** every content section should light its load-bearing words (mint/cyan/ink). A section with zero highlights is usually under-styled.
- **Image-behind-text legibility:** if text sits over an image, confirm contrast — the image must have negative space, be faded enough, or carry a scrim *behind the words* (centre, not edges). A bright full-bleed strip under centred text is a defect.
- **Names:** consistent across breadcrumb/title/nav/hero/body. "Krim" never "Krim AI".
- **Build/types:** tsc clean; build green; zero console errors; zero CLS.

## 5 · Resolved tensions (so the rubric isn't read as contradictory)
- **Highlights:** prefer one mint-accent card per view, **but repeat the highlight when it earns engagement** (HOUSE-STYLE §4/§10/§11). The test is "is each use load-bearing?", not a count.
- **Graphics:** signature graphics (orb, stacked-layers, flywheel, cinematic bands) are **wanted** — the anti-slop ban (§7) targets fake dashboards/gauges/contraptions, *not* deliberate brand visuals. Don't strip them.
- **Motion / typewriter:** the homepage hero's arrival type-in is the **one sanctioned** typewriter beat; never on ordinary copy (§6).
- **Logo:** header + footer use the **dynamic animated mark** (moving dots), not a static lockup.
- **2-column vs centred sections:** both are fine; just don't leave a headline looking "randomly shoved left" beside other full-width sections (§12).

## 6 · Anti-patterns we have actually shipped (catch these yourself)
Misaligned card sets · "regulated operations" as a lead · dark/busy image under centred text · bland equal-weight walls of text · dense spec-sheet enumeration ("X does A, Y does B…") · number-led headings ("Eight modules…") · naming drift (Writing vs Insights, Kira vs Kira & Krimkar) · "Krim AI" · forgetting highlights · building with the dev server running · **AI-prose tells: em-dash overuse (the same "— x —" construction in every card blurb) and the "X, not Y" antithesis cliché ("software co-workers, not chatbots").**

> **Copy must read human, not AI-generated (HOUSE-STYLE §10/§11, P0).** Two tells the `content-critic` now grades for and the build loop must catch before shipping: (1) **em-dash overuse** — at most one per paragraph, never repeated across a card set; prefer the full stop, colon, comma, or a reworked clause; (2) **the "X, not Y" antithesis** — state it positively and concretely instead. Don't over-correct into quirky tics to "look human"; just write plainly and well with varied, natural punctuation.

## 7 · Open items the loop is tracking
- **Demo-booking rebuild** — `/contact` runs an unsanctioned Cal.com embed; rebuild to Calendly + Supabase lead capture + follow-up email sequence (see memory `demo-booking-rebuild`). Confirm stack before building.
