# BUILD-BRIEF v3 — Krim website (krim.ai)
*The complete, current master spec. Supersedes ALL earlier versions (incl. v2's "Two Worlds" light/dark concept, now retired) and anything conflicting in PROGRESS.md history. For Claude Code running Fable 5.*

---

## 0 · Sources of truth & the one hard rule
Companion files in `docs/`:
- **`krim-content.md`** — every fact and claim. **The one hard rule: facts are accurate.** Regulated finance; never invent capabilities, numbers, clients, deployments or certifications. 33 validators · 250+ primitives · US/UK/India. **No Saarthi.ai references.** *(First task in §15: append the canonical "World model" section below to this file.)*
- **`geo-kit.md`** — llms.txt, JSON-LD, FAQ schema, entity glossary. Use as the base.
- **`design-tokens.md`** — a starting palette/type system; springboard, not cage.
- **`krim-wave-orb.html`** — the hero asset (extract the real component).
- `Krim_Sales_Deck.pdf` (root) — brand-essence only; stale facts lose to krim-content.md.
- The existing site — harvest the best: the **Action Receipt**, orb→logo arrival prototype, the gate typography, the **three categorised integration wheels**, logo sets, the honest "Aligned, not Certified" pattern.

## 1 · Role & standard
Lead design engineer, building to the bar of the world's best B2B sites (Linear, Stripe, Vercel, Anthropic — without imitating). Self-critique with vision before presenting. Be meticulous; rise above generic-AI habits: no template repetition, no decorative filler, no overclaiming, no slop.

## 2 · The story — TWO POWERS, ONE LOOP
A first-time visitor must grasp Krim in 30 seconds:
**"AI co-workers run regulated lending operations end to end. Every action is validated before it executes — and the system learns from every action it takes. Validated before it acts; smarter after it acts."**

The two co-equal powers (neither subordinate to the other):
1. **Judgment — pre-execution validation.** Krim-Nyāya's 33-validator gate; no action fires unvalidated; the reasoning a regulator can read; compliance as physics.
2. **Intelligence — the world model.** Because one runtime observes the entire lifecycle (both sides of the wall) and records every action with its full reasoning chain in Krim-Ledger, Krim-Learn's ten learning loops compound it into a connected model of how lending operations actually behave — **a world model of lending operations**. Patterns admitted above the effectiveness threshold (~80%), federated and anonymised, shared across the workforce through four memory tiers; outcomes attributed to decisions; Q1 baseline → Q2 measurable gains → year two materially beyond go-live, from the runtime, not from more engineering.

**The dependency is the insight:** validation without learning is a compliance tool; learning without validation is a liability no bank can deploy. The gate makes it safe to act; the world model makes each action smarter than the last. **Sovereignty** underwrites both (in-perimeter, no foreign API in the loop).

Krim: technology research, product and services company (US · UK · India). KrimOS: the agent-native operating system for regulated operations. Category: **Epistemic AI**. Flagship domain: lending. Second: government.

### Canonical "World model" copy block (append to krim-content.md)
> **The world model — intelligence that compounds.**
> One runtime runs the whole lending lifecycle, so it sees the operation whole — every call, document, decision and outcome, on one ledger with its complete reasoning chain. Krim-Learn turns that record into a connected model of how the operation actually behaves: which sequence cures a delinquency, which channel reaches which segment, where borrowers stall and why. Ten learning loops attribute outcomes to decisions; patterns above the effectiveness threshold enter Krim-Fabric, anonymised and federated, with per-tenant opt-out; four memory tiers share what one co-worker learns with all of them. The result: Q1 baseline, measurable gains by Q2, materially better than go-live by year two — improvement from the runtime, not additional engineering. Validated before it acts. Smarter after it acts.

## 3 · Design concept — ONE CANVAS
The light/dark "Two Worlds" split is retired. **One background colour throughout**: the deep Krim ground (the `#04060C`–`#09090C` family from design-tokens) — slick, stylish, futuristic, calm.
- **Glassmorphism as the panel language**: translucent glass cards (subtle blur, hairline light borders, faint inner luminance) for exhibits, receipts, ledger rows, layer cards, the cockpit. Restrained — glass where content floats above the system, never as wallpaper.
- **The colour grammar survives and now carries both powers**: **cyan = proposed/thinking** (the runtime, the orb, the world model at work) → **mint = validated/learned** (cleared actions, admitted patterns, the brand). Gold sparingly for amber/exception states.
- **The orb is recast**: not decoration — it *is* the world model, visualised. The system thinking.
- Artifacts that survive from the exploration, restyled as glass on the one canvas: the **Action Receipt**, the **live ledger with the AMBER row routed to the exception queue** (honest refusal = credibility), **"Epistemic AI" as a dictionary definition**, one real **Kupa cockpit** surface.
- Micro-animations everywhere, subtle and engineered: soft reveals, luminous hover states, values that tick, patterns that propagate. HQ aesthetic; nothing gimmicky; generous space; one idea per screen.

## 4 · Sitemap (unchanged structure)
```
/                      The argument
/platform              KrimOS hub — five layers, one confident screen each
  /platform/kendra       Runtime — seven modules + validation pipeline + the learning loops (Learn/Ledger get full weight)
  /platform/kriya        250+ primitives — ten categories (progressive disclosure), MAKE_CALL receipt, KWU metering
  /platform/karta        Eight co-workers + hard boundary (operational decisioning, NOT underwriting) + four operating modes
  /platform/kupa         Command center — Kula (Ask→Suggest→Act→Learn), the glass cockpit, human-in-the-loop
  /platform/krimkar      Consumer surface — Kira: one relationship, whole lifecycle, 50+ Indian languages
/lending               Flagship domain — LEADS with the world model of lending operations (the connected intelligence story made concrete), then lifecycle table, eight roles, impact ranges (ranges, not commitments), the learning curve, engagement teaser
/government            Capability framing, NO invented track record. Sovereignty first; validation as administrative-law accountability (legal basis — the Yogyatā framing); the trail as public accountability; candidate use cases (citizen communication, receivables, casework, benefits servicing). [CONFIRM] anything beyond platform fact. CTA: "Start a conversation."
/epistemic-ai          The category/GEO play — dictionary entry answer-first; the neighbours' failures; the ceiling; the three tests; Krim-Nyāya + the Mithila/Navya-Nyāya lineage; post-hoc vs pre-execution table; FAQ + FAQPage JSON-LD. Fold the learning half in: an epistemic system both justifies AND revises its beliefs — validation + learning are one epistemology.
/architecture          Engineers/GEO: runtime loop; agent lifecycle; four memory tiers; Temporal-class durable orchestration; 15-entity domain model; integration fabric (40+ connectors); three geographies, one architecture
/trust                 Deployment modes; posture; frameworks honestly ALL "in progress" until told otherwise; encoded jurisdictions; the audit experience
/services              01 two-week deep-dive → 02 30-day proof of value → 03 60–90-day pilot-to-go-live + exits; domain-by-domain expansion
/company               The thesis (the quietly literary manifesto); the name (Mithila, Navya-Nyāya — substance, not decoration); markets + contact
/insights              Substack + Medium server-side aggregation (stubbed + TODO until feeds provided); separate newsletter
/contact               Form (institution · role · work email · message) → Next API + Resend → sales@krim.ai; honeypot + Turnstile; real states; Cal.com; +1 510 345 5686
/legal + on-brand 404
```
**Nav:** Platform · Lending · Government · Epistemic AI · Trust · Company + "Book a demo". Architecture/Services/Insights in footer + contextual links.

## 5 · Homepage — 8 movements (the loop at the centre)
1. **Hero** — the spectacular arrival (§6). "The AI your regulator can read." with its plain meaning present.
2. **The shift + the ceiling** — operations rebuilt on agent infrastructure, pivoting on "institutions cannot deploy AI they cannot explain to the regulator."
3. **Epistemic AI** — the dictionary-definition entry.
4. **THE LOOP — the centrepiece, two beats in one movement:**
   a. **Judgment** — the validation membrane: a proposed action (cyan) crosses the 33-validator gate and ignites mint; the AMBER deflection to the exception queue.
   b. **Intelligence** — the same validated action lands on the ledger and *propagates*: its pattern flows back into the field, the world-model visual visibly enriches, a counter of learned patterns ticks, the learning curve draws. The visitor literally watches the system get smarter from the action they just watched it validate.
5. **The platform** — the five-layer stack → /platform.
6. **Two domains** — doors: Lending (world-model-led) and Government (sovereignty-led).
7. **The evidence + integrations** — ONE condensed glass exhibit (Receipt + committing ledger rows incl. AMBER) and the **three categorised wheels** (§7).
8. **Trust strip + close** — frameworks (honest), "Book a demo" + quiet secondary.

## 6 · The hero — sensational, meticulous
The signature moment; budget open; a dedicated hero sub-agent if useful. The visitor should feel **awe — a system coming alive**. Recast with the world model at its heart: the orb is the intelligence itself (consider WebGL/shader depth, light behaviour, particle articulation of thinking — proposals flickering cyan within it) → the collapse to a pinhead → **the ignition** (cyan resolving to mint — validation as light) → the Krim mark emerging from that point → the settle into the header → the claim arriving. Sound-level easing care; every phase inevitable.
Engineering that enables: 60fps GPU-only; headline in served HTML (LCP) and may participate in the choreography; scroll/click resolves gracefully *forward* (accelerando, never a cut); once per session; reduced-motion renders the composed final state beautifully; preload; no FOUC; no CLS. **Present the hero on its own for dedicated review before it ships.**

## 7 · The three integration wheels
Harvest and elevate the existing wheel system; glass treatment; labelled, calm, "works with" (never endorsement):
**Core systems** (Finacle, Flexcube, BaNCS, Lentra, Tavant, Newgen, in-house…) · **Channels & voice** (Genesys, NICE CXone, Avaya, Cisco, Exotel, WhatsApp Business, IVR/SMS…) · **Data & security** (Snowflake, BigQuery, on-prem DWH, Hadoop, OAuth 2.0, SAML…). Real designed mobile form.

## 8 · Copy — a real copywriter's bar
A stranger must always find the plain meaning — achieved with craft, not templates. Vary rhythm page to page; read each page aloud; if two consecutive sections share a skeleton, rewrite one. Short, declarative, specific, quietly literary. **Both powers present in the spine of every key page** — never validation alone. Use krim-content.md as raw material, then write better. No AI-slop, no urgency theatrics, no hedging. The duality line is available where it earns its place: *"Validated before it acts. Smarter after it acts."*

## 9 · CTAs
Primary: **"Book a demo."** Secondary: **"See how it works"** (→ platform/architecture). Pilot language inside /services and /contact. /government: "Start a conversation." Classy throughout.

## 10 · Motion
Beyond the hero: subtle, engineered micro-animations — reveals, luminous hovers, ticking values, propagating patterns; the cyan→mint grammar in small details. **Budget:** canvases pause offscreen; below-fold lazy-loads; 60fps mid-range; designed mobile variants (orb, membrane, loop, wheels); reduced-motion-safe; zero CLS.

## 11 · Stack & foundations
**Next.js (App Router, SSG + ISR)** per approved migration. All content in served HTML. Responsive (mobile designed deliberately). Accessible (semantic HTML, keyboard, contrast, reduced-motion). Fast (lazy below fold, optimised assets, fast LCP, no CLS). Plausible + CTA events + consent. Favicon/OG from the triangle mark. On-brand 404. Componentise; short diffs; don't regenerate unchanged files.

## 12 · SEO & GEO
Per-page title/meta/OG (per-page share image); clean headings; sitemap, robots (allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended), canonicals, internal links, alt text. JSON-LD from geo-kit (Organization, SoftwareApplication, Article, BreadcrumbList, FAQPage). `llms.txt` at root. Answer-first claims; consistent entities. Layer pages are entity pages; /epistemic-ai is the GEO play. Add the world-model framing to llms.txt and the SoftwareApplication featureList when appending the canonical block.

## 13 · Working method — the expert team
1. **Builders:** parallel sub-agents per page under one shared component system.
2. **Review panel — six critics; run before presenting any page; act on notes; summarise findings in one line each:**
   - **Design Critic** (Linear/Stripe bar): craft, hierarchy, glass restraint — beautiful?
   - **CMO**: copy craft, variation, the 30-second rule — and are BOTH powers present?
   - **Chief Scientist** (AI/ML): is the learning/world-model story technically honest — federated, thresholded, attributed — never overclaimed into magic?
   - **Bank Buyer** (Head of Ops/Compliance): credible? anything overclaimed?
   - **Government Buyer**: sovereignty, accountability, legal basis — no invented track record?
   - **Curious Engineer**: depth findable fast? technical story real?
3. Maintain PROGRESS.md; commit per phase; stops per §15.

## 14 · Decisions made (do not re-ask)
Form: Next API + Resend → sales@krim.ai (honeypot + Turnstile). Analytics: Plausible. Scheduling: Cal.com. Certs: all "in progress". Hero descriptor: "agent-native operating system". Primitives: 250+. Socials + feeds: pending — placeholders / stubbed /insights. FOUNDATION.md archived. **Background: one canvas, dark.** Primary CTA: "Book a demo."

## 15 · Build order & checkpoints
0. **First task:** append the canonical "World model" block (§2) to krim-content.md; update geo-kit (llms.txt + featureList) to carry it.
1. **/platform + five layer pages** (airy; Kendra gives Learn/Ledger full weight) → **PAUSE: review + panel notes.**
2. Homepage to the 8 movements — movement 4 (THE LOOP) is the centrepiece build — + **the hero presented on its own.**
3. **/lending** (world-model-led) → /epistemic-ai → /contact → **pause.**
4. /government → /trust → /architecture → /services → /company → /insights → /legal → 404.
5. **QA — report pass/fail with evidence:**
- [ ] 30-second rule holds; both powers land within the first two screens of /; pages airy
- [ ] THE LOOP movement makes a visitor *watch* the system validate and then learn — not two disconnected widgets
- [ ] Hero produces awe; graceful resolve; once/session; reduced-motion beautiful; LCP fast
- [ ] One canvas; glass restrained; cyan→mint grammar consistent; gold only for exceptions
- [ ] Facts per krim-content.md; world-model claims match the canonical block (no magic); /government zero invented claims; certs honest
- [ ] Copy: varied rhythm, both powers in every key page's spine, no slop
- [ ] Three wheels present, categorised, glass, real mobile form
- [ ] CTAs per §9 · bespoke system graphics + one real Kupa surface
- [ ] SEO/GEO complete & valid incl. world model in llms.txt/featureList
- [ ] Forms end-to-end; /insights aggregates or stubs gracefully
- [ ] Motion budget enforced; designed mobile variants; accessible; no CLS
- [ ] Lighthouse: performance, accessibility, SEO strong — report scores
