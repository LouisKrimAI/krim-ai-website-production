# BUILD-PLAN — turning the specs into the site
*The bridge from docs → a built, beautiful site. Read with KRIM-BRIEF.md (spec + working protocol). For Claude Code (Fable 5).*

## Inputs (all in docs/)
- Spec: KRIM-BRIEF.md · SITEMAP-IA.md · krim-content.md · geo-kit.md · design-tokens.md · krim-wave-orb.html
- Copy + design decks: docs/copy/*.md — one per page, each section carrying COPY + a PRESENTATION (design intent) note.

## The principle (why foundation-first)
Awesome design is not generated from a spec in one shot. It comes from, in order: (1) a design system locked first, (2) signature components built with craft, (3) iteration in the browser. Build FOUNDATION-FIRST, never page-first. The last attempt failed because it scaled before the look was locked and lost the structure. This plan prevents that.

## Phase A — Foundation  (MAKE OR BREAK — do not rush)
Lock the look in code before anything scales.
- Migrate to Next.js (App Router, SSG/ISR) per the approved plan; port Tailwind + Framer.
- Implement design-tokens.md as real tokens (CSS vars + Tailwind theme): the dark canvas, cyan→mint grammar, type (Newsreader / Inter / IBM Plex Mono), spacing, radii, motion easings.
- Build the core component library used everywhere: Section, Eyebrow, GlassCard (glassmorphism done right — backdrop-blur, ~1px hairline light border, faint inner top highlight, soft lift), Stat, CTA, the recurring architecture glyph, scroll-reveal + hover primitives, and the persistent faint orb backdrop.
- Build ONE reference page end to end — the homepage — to prove the entire aesthetic and motion language (hero excepted; a simple fade placeholder for now).
- GATE: deploy a Vercel preview. Review on desktop AND mobile; sign off on the LOOK before anything else is built. Expect 2–3 refine cycles here — that is normal and the most valuable iteration in the whole project.

## Phase B — Signature components  (one at a time, each reviewed)
The bespoke interactive/animated pieces that make the site feel alive. Build as reusable components:
- the orb hero (the spectacular first-load) — its own dedicated work order
- the validation gate (watch it refuse, amber → exception)
- the lifecycle "two threads, one journey"
- the three integration wheels (orbital rings)
- the ledger replay (scrub a timeline, reconstruct an action)
- the autonomy dial · the world-model field · the flywheel ring · the definition entry · the market selector · the Action Receipt artifact
Self-screenshot (1440 + 390) + panel review per component. Many pages simply assemble these + copy.

## Phase C — Page assembly  (fast, once A+B exist)
Assemble each page from its deck + the components. Order: platform cluster → domains → intellect/trust → company & conversion. Pause after the first 3 pages for review, then continue. Pull copy from docs/copy/*; pull facts/SEO from krim-content + geo-kit.

## Phase D — Polish & QA
- micro-animations pass (subtle, GPU-only, reduced-motion-safe)
- responsive/mobile designed deliberately (never a shrunk desktop)
- performance: lazy-load below fold, 60fps, no CLS, fast LCP; motion budget enforced
- SEO/GEO wiring: per-page meta + OG, JSON-LD (geo-kit), sitemap, robots (AI crawlers allowed), llms.txt
- the hero's final spectacular polish (its dedicated review)
- Lighthouse + the acceptance checklist in KRIM-BRIEF

## The loop that makes it good (every gate)
build → deploy preview → you look (desktop + mobile) → screenshot feedback → refine. Stay in the loop visually. Run the review panel before each gate. Commit per unit; keep PROGRESS.md current.

## Optional — raise the ceiling with Claude Design
For the few moments that make or break "awesome" — the hero and 2–3 signature components — explore the LOOK in Claude Design first, pick a direction, then hand it to Code to build for real. Optional; it de-risks the aesthetic before build effort goes in.

## Phase A kickoff prompt (paste into Claude Code / Fable 5)

ROLE: You are an elite product designer and front-end engineer building the marketing site for Krim (krim.ai), held to a studio standard — precision, craft, restraint. No lazy defaults, no generic components, no filler. Every detail intentional.

READ IN FULL BEFORE CODING: docs/KRIM-BRIEF.md, docs/SITEMAP-IA.md, docs/design-tokens.md, docs/krim-content.md, docs/BUILD-PLAN.md, docs/copy/homepage.md; open docs/krim-wave-orb.html to understand the orb.

MISSION — PHASE A ONLY: establish the design system and build the HOMEPAGE as the single reference page that proves the whole site's look, feel and motion. Build nothing else. Create no other pages.

HARD RULES (non-negotiable):
- Multi-page Next.js (App Router, SSG), real routes — never one long scrolling page.
- Copy comes from docs/copy/homepage.md; facts from docs/krim-content.md. Never invent customers, logos, metrics or testimonials.
- Use the REAL Krim logo already committed in the repo: the HERO uses the special ANIMATED logo (moving elements); the nav/favicon use the static mark. Locate and use the real files; if you truly can't find them, leave a labelled placeholder and ask — NEVER draw a substitute logo.
- Generated images come later (Gemini). Where the design needs one, leave a labelled placeholder slot at the right public/images/... path and dimensions — never fake imagery.

DESIGN BAR:
- Precision instrument, not sci-fi. Premium, confident, calm — Linear/Vercel/Stripe-grade craft with its own character.
- One dark canvas (#04060C–#09090C). cyan = thinking · mint = validated · gold = exception. Near-monochrome otherwise.
- Glassmorphism is a VISIBLE hero element — generous blur, luminous hairline borders, inner highlights, layered translucency, tints catching the orb's light. Key info sits in glass cards that clearly stand out as crafted objects.
- Type large and confident, still professional — big display headlines, comfortably large body. Scale UP from conservative token defaults. Sections are designed moments with strong presence and clear separation.

THE HERO (build it for real now — the centrepiece). First-load, flawless, 60fps, slow confident eases, no bounce/spin/cliché:
1) black canvas, orb alone centred at full brightness, gently alive; 2) orb shrinks inward and dims; 3) the large Krim logo fades up in its place; 4) the trim hero words fade up beneath (H1 + one short line); 5) the orb expands to a large soft faded backdrop and stays there. Reduced-motion: jump to the resolved state. Use docs/krim-wave-orb.html for the orb.

MOTION everywhere: crafted, purposeful only. ALLOWED: hero choreography, cyan→mint validation pulse, slow lightly-staggered scroll reveals, luminous hovers, living orb backdrop, gentle drift. BANNED: fade-in-up on everything, springy overshoot, spinning loaders, decorative parallax, typewriter text, gratuitous count-ups, auto-carousels, gradient-shifting buttons, motion without reason. Always GPU-only, reduced-motion-safe, zero layout shift; mobile motion designed for mobile.

BUILD THIS PHASE:
1) Next.js App Router migration; Tailwind + Framer Motion; fonts wired. 2) design-tokens.md as real tokens (CSS vars + Tailwind theme), type scaled up. 3) Core components: Section, Eyebrow, GlassCard (the showcase glass), Stat, Button/CTA, top nav/banner with the logo, footer, the recurring architecture glyph, scroll-reveal + hover primitives, the orb backdrop, and the full hero with its choreography. 4) The homepage (/) from docs/copy/homepage.md, honouring each PRESENTATION note (problem→powers cyan→mint resolution; flywheel ring; architecture glyph; four domain doors; Action Receipt + integration wheels — tasteful first-pass, refined later). 5) Tab title exactly "Krim - Safe Superintelligence"; favicon from the mark; per-page title template "{Page} — Krim" ready. Nav group of domains is labelled "Domains".

PROCESS (exactly):
1) First, restate this work order back in ≤6 lines (scope + hero sequence + rules) so I can confirm. 2) Build with craft; one reusable component system; clean diffs. 3) Self-QA: screenshot the homepage at 1440px and 390px, view them, fix anything not beautiful, misaligned or low-contrast. 4) Review in these voices (one line each) and fix what they flag — Art Director (glass/type/hero genuinely premium?), Motion Designer (any banned/cliché motion? 60fps?), CMO (copy trim, on-brand, logo prominent?), Bank Buyer (credible not flashy?), Accessibility (contrast, reduced-motion, no CLS?). 5) Deploy a Vercel preview. 6) Reply with the preview URL, both screenshots, your restate, and the reviewer notes. Then STOP and wait. Build no other page.

QUALITY BAR: if a section looks like a default template, it's wrong. I want craft, precision and beauty — take creative license to make it genuinely cool, within the rules above.
