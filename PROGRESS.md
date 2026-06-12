# krim.ai — build progress

> **RECONCILED TO BUILD-BRIEF v3 (2026-06-12). Supersedes v2.**
> - **STORY: TWO POWERS, ONE LOOP.** Judgment (pre-execution validation) + Intelligence (the world model — Krim-Learn compounding the complete ledger). Both in every key page's spine. Duality line: *"Validated before it acts. Smarter after it acts."* ✅ Step 0 done: canonical World model block appended to krim-content.md; geo-kit llms.txt block + SoftwareApplication featureList updated; served web/public/llms.txt updated (+ platform URLs).
> - **DESIGN: ONE CANVAS.** Two-Worlds (light/dark) RETIRED. Deep Krim ground (#04060C–#09090C) everywhere; glassmorphism panels; cyan = proposed/thinking → mint = validated/learned; gold = exceptions only. The orb IS the world model.
> - **PANEL: six critics** — Chief Scientist added (learning-story honesty: federated, thresholded, attributed — no magic).
> - **v2 panel findings carried into the v3 restyle** (fact-level survivors): cockpit "Illustrative · simulated data" stamp + no pulse; 33 cells undivided (drop invented 11/11/11); KWU arithmetic row (81 call + 61 validation ≈ 142, "typically 120–150"); APPROVE gloss; Karta dial double-control; rope idiom out; hub 30-second lede; LayerShell CTA rewording; sovereignty line on Kendra; "rule sets are data" clause; turn-specific Kira stamps; entity-name drift fixes; counting-cadence breaks. Light/dark-specific findings (amber-eyebrow-on-paper etc.) mooted by the one canvas.
> - **Current status: v3 step ① COMPLETE — PAUSED for user review (2026-06-12).** Platform cluster (hub + five layers) on the one canvas, two-powers spine throughout; six-critic panel run; all panel fixes applied + verified in served HTML; production build clean (20 static routes, :3100). Next on approval: step ② homepage 8 movements (THE LOOP centrepiece) + hero solo review.

> *(v2 reconciliation note, retained for history below — its design concept is retired.)* The v2 brief supersedes everything above/below where they conflict. Key deltas absorbed:
> - **Sitemap:** /product is replaced by **/platform hub + five layer pages** (kendra · kriya · karta · kupa · krimkar); /solutions is replaced by **/lending + /government** domain pages with their own registers.
> - **CTA system:** primary **"Book a demo"** · secondary "See how it works" · /government "Start a conversation". Pilot language only inside /services + /contact. *(Phase 2 homepage still says "Request a pilot" — fixed in the v2 step-2 homepage rework.)*
> - **Two-Worlds rationing:** max ONE dark interlude per page (homepage alone: two). *(Phase 2 homepage currently has three dark sections — Kupa moves/lightens in the step-2 rework.)*
> - **Wheels:** the three categorised integration wheels return on the homepage (step 2).
> - **Hero:** to be elevated to "genuinely spectacular" and presented on its own (step 2).
> - **Already built and carried forward:** Phase 1 explorations (/explore on the legacy Vite app), Phase 2 web/ Next app — tokens, WaveOrb extraction, arrival choreography, exhibits (Receipt/Ledger/Stamp), RuntimeWorks, KupaCockpit, SSG verified.
> - **v2 build order:** ① /platform + five layer pages + panel review ② homepage rework + hero solo review ③ /lending → /epistemic-ai → /contact ④ remaining pages ⑤ QA.
> **Current status: v2 step ① in progress.**

Master spec: `docs/BUILD-BRIEF.md` · Facts: `docs/krim-content.md` · SEO/GEO: `docs/geo-kit.md` · Palette springboard: `docs/design-tokens.md` · Hero asset: `docs/Krim Wave Orb (standalone).html` · Brand essence ref: `Krim_Sales_Deck.pdf`

> `docs/FOUNDATION.md` is the **previous** site's positioning doc. Where it conflicts with `krim-content.md` (validator count, layer definitions, Krimkar/Kira, category name "Epistemic AI"), **krim-content.md wins.** FOUNDATION.md remains useful for voice patterns and harvested ideas only.

| Phase | Scope | Status |
|---|---|---|
| **0 — Audit & plan** | Repo + existing-site audit · SSR/prerender recommendation · proposed IA + harvest list · decisions needed · this file | ✅ Done — approved 2026-06-11 |
| **1 — Design exploration** | 3 genuinely distinct homepage directions at `/explore` (gate · ledger · field), real interactive code, self-critiqued | ✅ Built — awaiting direction pick |
| **2 — Systematise & hero** | Next.js migration · TWO WORLDS token/component system · faithful orb arrival · finished homepage | ✅ Built — awaiting review |
| **3 — Build out** | Page-by-page from `krim-content.md` + `geo-kit.md` · pause after first 3 pages | ⬜ Not started |
| **4 — QA** | Acceptance checklist pass/fail with evidence · Lighthouse scores | ⬜ Not started |

## v3 step ① outputs (2026-06-12)
- **Shared system on the one canvas:** `globals.css` (deep ground + `.glass/.glass-quiet/.glass-mint/.hairline`), `tailwind.config.ts` (rtext/rline/runtime/mint/cyan; `rtext-3` AA-floored at `#7A8089`; paper/ink retained ONLY until the step-② homepage rework), `ui.tsx` v3 primitives, `LayerShell` (breadcrumb · stack rail · prev/next · CTA band), SiteHeader/SiteFooter (real LinkedIn `/company/krim/` + X `@TheKrimAI`; Substack/Medium still `[PROVIDE]`).
- **Six pages built:** `/platform` hub ("One runtime. Two powers." movement) · `/platform/kendra` (33-cell gate membrane · world-model movement with `#world-model` anchor: Ledger→Learn→Fabric · seven modules · expected curve) · `/platform/kriya` (ten-categories index, SSR-rendered even when collapsed · MAKE_CALL receipt with KWU line-item math · "Every execution is also a lesson") · `/platform/karta` (eight-roster register · gold hard-boundary panel "Operational decisioning. Never underwriting." · modes dial) · `/platform/kupa` (cockpit stamped "Illustrative · simulated data") · `/platform/krimkar` (Kira thread, documented-only clearance stamps).
- **Ten honest holding stubs** (noindex) so no nav click dead-ends: lending · government (CTA "Start a conversation") · epistemic-ai · trust · company · architecture · services · insights · contact · legal.
- **Six-critic panel run; ~30 de-duplicated fixes applied.** Highlights: invented cockpit telemetry → simulated stamp + plausible 412,806; 33 undivided (no 11/11/11); KWU range + arithmetic; APPROVE glossed "workflow-step approval — never credit"; krimkar stamps reduced to documented checks; karta transfer claim re-licensed to "adjacent workflows — within governance constraints"; learning-governance sentence ("same doors as everything else") on kendra + karta; expected-curve de-guaranteed; cyan→mint corrected on all learned content; entity names normalised (33-validator gate · ten categories · twelve attributes "including").
- **Verified:** `next build` clean — 20/20 static; all 17 routes 200 on :3100; 19/19 copy checks in raw served HTML; zero retired paper/ink classes on platform pages; duality line appears once per page (footer) with kendra owning the in-page verbatims.

## Phase 1 outputs (2026-06-11)
- `/explore` — index comparing the three directions.
- `/explore/gate` — **A · The Gate.** Validation as the structural conceit; live proposed→cleared artifact; Newsreader/IBM Plex Mono; tokens palette executed faithfully.
- `/explore/ledger` — **B · The Ledger.** The site as evidentiary record; PAPER-LIGHT departure (rationale: the legibility promise, category contrast); Spectral/Archivo; stamp + committing rows.
- `/explore/field` — **C · The Field.** Generative canvas runtime; cyan→mint as site-wide semantic (proposed→validated); Space Grotesk; membrane + live counter + validator grid.
- FOUNDATION.md archived to `docs/archive/` (krim-content.md is sole factual source).
- Exploration fonts added to `index.html` (consolidate in Phase 2).

## Phase 0 outputs (2026-06-11)
- **SSR recommendation:** migrate shell to **Next.js (App Router, SSG + ISR)** — see plan message. Alternative kept on table: `vite-react-ssg` if repo must stay Vite.
- **IA:** 11 routes; homepage compressed from 10 movements to 8. See plan message.
- **Existing-site harvest list:** identified (Action Receipt artifact, gate-as-typography, arrival choreography, jurisdiction tabs, logo marquees, honest-certs pattern, reduced-motion/print discipline).
- **Open decisions:** form backend · 5 social URLs · Substack + Medium feed URLs · analytics · scheduling — plus 3 `[CONFIRM]`s from krim-content.md (cert held-vs-in-progress split · primary descriptor wording · public primitive count).

## Phase 2 outputs (2026-06-11)
- **`web/` — the Next.js 14 App Router app** (own package.json; legacy Vite site untouched at root). `npm --prefix web run dev` → :3000, or preview config `krim-next`.
- **Decision: TWO WORLDS.** B (Ledger) spine + A's gate-loop/typography + C's real orb & cyan→mint grammar. Cyan = proposed (dark runtime) → mint = validated (the 33-gate) → ink on paper = cleared (light record). Light is home; dark punctuates (hero · runtime · cockpit).
- Tokens: `web/tailwind.config.ts` + `app/globals.css` (paper/ink/seal/amber · runtime/cyan/mint · world-seam). Type locked: Newsreader · Inter · IBM Plex Mono via next/font (self-hosted, zero FOUC).
- **WaveOrb faithfully extracted** from the bundler payload → `web/components/WaveOrb.tsx` (typed, first-frame-synchronous, reduced-motion static).
- **Hero arrival** per design-tokens timeline: orb (0–1.2s) → pinhead (1.2–2.0s) → mark emerges cyan→mint (2.0–3.8s) → settles into header slot (3.8–4.4s) → page lives (4.4–5.0s). Once/session; reduced-motion/repeat → final state; zero CLS (header slot laid out from first paint, opacity swap only).
- Homepage: hero+gate-crossing → record-foot handoff → shift → problem/ceiling → Epistemic AI definition → 3 pillars → dark runtime (33-validator membrane + family selector) → record exhibits (Receipt · LiveLedger w/ AMBER → exception queue · lifecycle table · impact ranges) → Kupa cockpit (dark software surface; the held amber action reappears in its exception queue) → trust (certs honestly "in progress") → close + footer.
- **SSG verified:** `/` prerendered static; 15/15 copy checks pass in raw served HTML; First Load JS 139 kB. `llms.txt` + `robots.txt` (AI crawlers allowed) + Organization JSON-LD shipped.
- Known notes: Next 14 lacks size-adjust metrics for Newsreader (cosmetic build warning); social `sameAs` pending `[PROVIDE]`; form backend + /insights stubs are Phase 3.

## Decisions log (2026-06-11)
- Framework: **Next.js App Router (SSG + ISR)** in `web/`.
- Direction: **B spine + A/C fusion → TWO WORLDS** (user decision).
- Form backend: Next API route + **Resend** → sales@krim.ai, honeypot + Turnstile (Phase 3).
- Socials + feed URLs: placeholders, user to provide. Analytics: **Plausible**. Scheduling: **Cal.com**.
- Certs: all marked **in progress**. Descriptor: **"agent-native operating system."** Primitives: **250+**.
