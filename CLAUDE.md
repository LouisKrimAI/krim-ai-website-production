# Build constitution

This file is read at the start of every session. It governs all UI, copy, and
structure work in this repo. Follow it before improvising.

> Reuse note: this constitution and the two critics in `.claude/agents/` are the
> house quality bar. Only the `docs/` specs differ per brand. Don't edit the rules
> per-project; edit the specs.

---

## 1. Read first, every time

Before writing or changing anything user-facing, read and treat as canonical:

- `docs/KRIM-BRIEF.md` — master spec: the story, the three powers, design language,
  the hero choreography, copy discipline, the working protocol, and locked decisions.
- `docs/SITEMAP-IA.md` — the route map, every page's sections, and the nav.
- `docs/BUILD-PLAN.md` — the phased build approach (foundation → signature components →
  page assembly → polish) and the Phase-A kickoff.
- `docs/design-tokens.md` — the ONLY source of colour, type, spacing, radius, motion.
- `docs/krim-content.md` — the canonical source of FACTS: claims, statistics, product
  names, numbers, and brand voice. (Facts only — not the prose to render.)
- `docs/copy/<route>.md` — **the source of the rendered COPY and per-section design
  intent for each route.** Each section is COPY + a PRESENTATION note. Build the page
  from its deck.
- `docs/geo-kit.md` — discovery / Generative-Engine-Optimization / structured-data
  requirements (llms.txt, JSON-LD/schema, FAQ, entity glossary). NOT geographic SEO.

Assets: `docs/krim-wave-orb.html` is the orb used in the hero. The **real Krim logo is
committed in the repo** — the hero uses the **animated** version, the nav/favicon use
the static mark; **never draw a substitute logo**. `docs/IMAGE-PROMPTS.md` lists
generated images that live under `public/images/...`; where one isn't present yet,
leave a clearly-labelled placeholder slot at the right path — never fake imagery.

**The copy model (important):** page copy comes from `docs/copy/<route>.md` and is
original, crafted prose. `krim-content.md` governs the **facts** behind it — every
factual claim, number, name and the voice must trace to it — but do NOT rewrite the
deck's prose to match `krim-content.md` verbatim. The principle is **facts-accurate,
prose-original**. Never invent a claim, statistic, name, colour, or spacing. If
something you need isn't in the specs, stop and ask — this is a regulated
lending/government context; an invented claim is a liability, not a placeholder.

---

## 2. Design process — two passes, always

Do not jump straight to code. AI-generated UI gets its templated feel from skipping
the plan.

**Pass 1 — Plan (do this in thinking, show only the result).** From the brief and the
route's deck, state a compact direction: palette (4–6 named hex from tokens), type
roles (a characterful display face used with restraint + a body face + a utility face
for data/captions), a one-sentence layout concept, and the single **signature element**
this page will be remembered by (the deck names one per page — honour it). The hero is
a thesis: open with the most characteristic thing in the subject's world.

**Pass 2 — Self-critique against defaults.** Before building, check the plan for slop.
AI design clusters around three looks; treat all three as defaults to avoid **unless
`design-tokens.md` explicitly calls for one**:

1. warm cream background + high-contrast serif display + terracotta accent
2. near-black background + a single acid-green or vermilion accent
3. broadsheet layout: hairline rules, zero radius, dense newspaper columns

NOTE: `design-tokens.md` deliberately specifies a deep near-black canvas with a
mint/cyan/gold accent **system** (not a single acid accent). That is a sanctioned
choice — build it confidently; it is not default #2. If any *other* part of the plan
reads generic, revise it and say what you changed. Only then write code.

---

## 3. Hard design rules (non-negotiable)

- **Tokens only.** No arbitrary hex, px, rem, or one-off values. If a token is missing,
  propose adding it to `design-tokens.md` — never hardcode.
- **8px spacing grid.** Deliberate vertical rhythm.
- **Type scale discipline.** Sizes/weights/line-heights from the scale in tokens. Type
  carries the personality. Per the brief, type runs **large and confident** — scale up
  from conservative defaults — while staying professional.
- **Glassmorphism is a visible hero element** (per the brief): generous blur, luminous
  hairline borders, inner highlights, layered translucency. Key info sits in glass
  cards that clearly stand out. Restraint lives in palette and motion, not the glass.
- **Spend boldness in one place.** One signature element per page (the deck names it);
  everything else quiet. Remove one thing before you ship.
- **Structure encodes meaning.** Numbered markers, eyebrows, dividers only where the
  content genuinely is a sequence — not decoration.
- **Motion is deliberate and minimal.** The homepage hero choreography (orb at full
  brightness → shrinks & dims → the animated Krim logo fades in large → trim words fade
  in → orb expands to a faded backdrop) is the one big moment; build it per the brief.
  Elsewhere: only the allowed micro-motions in KRIM-BRIEF (cyan→mint validation pulse,
  slow staggered reveals, luminous hovers, gentle drift). The banned list in the brief
  is non-negotiable. Respect `prefers-reduced-motion`.
- **Every interactive element has all states:** default, hover, focus-visible, active,
  disabled. Focus must be visibly keyboard-navigable.

---

## 4. Copy rules

Copy is design material, not decoration. Render the route's copy from its deck
(`docs/copy/<route>.md`); keep facts/names/numbers true to `krim-content.md`.

- **Active voice, sentence case.** Plain verbs. No filler, no hype-by-default.
- **Name things by what people control,** not by how the system is built.
- **Specific beats clever.** Factual claims trace to `krim-content.md` only.
- **Consistent vocabulary through a flow.** A label labels; an example demonstrates.
- **Errors don't apologise and are never vague.** Empty states invite action.
- The brand line is "Safe Superintelligence"; homepage tab title is exactly
  `Krim - Safe Superintelligence`; other pages use `{Page} — Krim`. Keep
  "superintelligence" to the brand line — body copy for regulated buyers stays
  concrete and credible.

---

## 5. Quality floor (build to this without announcing it)

- Responsive and correct down to mobile (375px) — no overflow, no broken reflow.
- Tap targets ≥ 44px. WCAG AA contrast (watch mint/gold text on dark — use for accents,
  not body). Semantic HTML and logical heading order.
- Visible keyboard focus. `prefers-reduced-motion` respected.
- Zero console errors or warnings on any route.

---

## 6. Verification mandate — you are blind until you render

Use the Claude Preview MCP (`preview_*`) tools to render and inspect the live page
(preview_start, preview_resize, preview_screenshot, preview_snapshot, preview_inspect,
preview_console_logs). A headless Playwright script via Bash is an acceptable fallback
for multi-width captures.

**Definition of done.** A page/component is NOT done until you have:
1. Run the dev server.
2. Screenshotted the route at **375 / 768 / 1440** via the Claude Preview MCP and looked at each.
3. Run the `design-critic` subagent and resolved every P0 and P1.
4. Run the `content-critic` subagent and resolved every P0 and P1.
5. Confirmed zero console errors.

Never report "done" from code alone.

---

## 7. The loop

- `/review <route>` — build/refine one page, then render → critique → fix until both
  critics return SHIP.
- `/audit` — full pre-ship pass across all routes at all breakpoints.
- `design-critic`, `content-critic` — invoked by the commands, or directly. They
  critique; they do not write code.
