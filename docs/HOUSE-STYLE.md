# Krim — House Style (the design anchor)

**The homepage is the design & thematic anchor for the whole site.** This document captures its DESIGN DNA — the visual language, components, motion, graphics and copy bar — so every page looks and feels like one professional team built it.

> **It governs HOW a page looks and feels — NOT what sections it has or their order.** Each page is free to choose the structure, sections and signature idea that best do *that page's* job. This is the *style* it does that job in. Do not clone the homepage's section sequence onto other pages; do clone its craft, restraint and feel.

---

## 0 · The bar — simple, content-first, like the homepage
- **Simplicity wins. Do not over-engineer.** A page earns its keep with clear thinking and strong writing, not contraptions. The reference for "how much is enough" is the homepage: calm glass cards carrying confident type, a real image or two, generous space. If a section needs a gadget to be interesting, the writing isn't doing its job — fix the writing.
- **Design each page with judgment — there is no fixed section formula.** Think about what *this* page needs to land, then structure it well. A clear, standard rhythm usually serves: set up the problem, show what KrimOS does and where it fits, make the impact land, invite the next step — but adapt the order, depth and emphasis to the page. The goal is a thoughtfully-laid-out, well-written page, not a skeleton filled in. Borrow the homepage's calm and clarity; don't clone any running order.
- **Match the homepage's craft exactly** — its glass (`glass lume` cards with the small accent bar; `GlassCard` callouts; real images framed in glass), its type scale, its restraint. `app/page.tsx` is the literal pattern to emulate, not just admire.

## 1 · Canvas & atmosphere
- One deep dark ground, always: `#09090C` page / `#04060C` deepest. No light mode, no theme switch.
- **The orb is the brand's living ground.** A faint, centred, slowly-drifting WaveOrb sits behind every page (`OrbBackdrop`, ~0.18–0.34 opacity). It is the *only* ambient graphic and must never compete with content. A radial well + soft vignette keep text legible over it.

## 2 · Colour grammar (load-bearing, never decorative)
- **cyan `#39D6FF`** = thinking / proposed / in-progress
- **mint `#00FFB2`** = validated / cleared / the brand / primary CTAs
- **gold `#C8A14A`** = amber / exception / boundary — used sparingly
- Otherwise near-monochrome: `ink #F6F6F4` / `ink-2 #A9ADB6` / `ink-3 #828791` on the dark ground. A colour means something every time it appears.

## 3 · Type
- **Display — Newsreader (serif):** large, confident, tracking ~`-0.02em`. The voice of the page.
- **Body — Inter:** generous, calm, `ink-2`.
- **Labels / eyebrows / data — IBM Plex Mono:** uppercase, wide-tracked, `ink-3`, small.
- Scale lives in the Tailwind tokens (`text-display-hero/display-1/display-2/body-lg/body/eyebrow/caption`). Lead each section with one confident serif line.
- **Headlines AND eyebrows sell or evoke — they never label, instruct, or inventory.** A headline earns attention and carries one idea; an eyebrow orients with character, never reduces. Three banned archetypes, all real failures we have shipped and had to rip out:
  - **Meta-label** — describes the section instead of saying something: *"Named for what each one does."*, *"The parts"*, *"The named pieces."*
  - **UI instruction** — an imperative that belongs on a button, not a headline: *"Open the part you came for."*, *"Choose your path."*, *"Click to explore."*
  - **Parts-bin inventory** — reduces one system to a counted catalogue of components: *"Five parts"*, *"The modules"*, *"Our components."* Sell the whole; never make the buyer feel they're reading a parts list. (A hub that links to sub-pages routes by *what the buyer needs*, not by enumerating pieces.)
  The test: read it aloud. If it could sit on a filing-cabinet drawer or in a tooltip, rewrite it.

## 4 · Glass (the signature surface)
- `.glass` — the showcase surface for cards that carry key information: real backdrop-blur, a hairline light border, a faint top-edge highlight, a soft lift. `.glass-quiet` for secondary; `.glass-cyan` / `.glass-mint` for the **one** accent per view; `.lume` for interactive hover lift.
- Glass is for content floating above the system — never wallpaper. **One mint-accent card per view, max.**
- **Cards are crafted objects, not boxes.** A small, clear hierarchy (mono eyebrow/label → serif title → calm body), the 3px accent bar, generous padding, a luminous `.lume` hover. Beautiful and stylish — never bland, never busy, never ugly. If a card looks like a plain bordered rectangle, it isn't finished.

## 5 · Layout & rhythm
- Container `max-w-site` (1200px); vertical rhythm via `Section` (`var(--section-y)`); hairline dividers between sections.
- Generous whitespace; **one idea per screen**; intentional asymmetry where it helps.
- Reuse the shared primitives — `Section · Eyebrow · GlassCard · Stat · CTA · Reveal` — don't reinvent them per page. New shared components are fine when genuinely reusable; one-off page chrome is not.

## 6 · Motion budget (read this twice)
- Motion is purposeful or it is absent. **Per page: at most one or two earned "signature" moments**, and only where motion explains something words/static can't. Everything else is subtle scroll reveals (fade + small rise, once) and luminous hovers.
- The hero's orb choreography is the site's one big motion. Interior pages inherit the calm resting orb — they do **not** each invent a new spectacle.
- Always GPU-only (opacity/transform/colour); reduced-motion settles to the meaningful end state instantly; 60fps; zero CLS.
- **Banned:** a signature device in every section, spinning loaders, springy overshoot, gratuitous count-ups, auto-carousels, typewriters, gradient-shifting buttons, motion for motion's sake.

## 7 · Graphics policy (real images or nothing — no hand-built "devices")
- The aesthetic is carried by **orb + glass + type + colour grammar**. Content graphics are **real, high-quality images** (made in Gemini, dropped into `public/images/<category>/`, used via `next/image` in glass-framed slots like the homepage's) — **or nothing.**
- **Do not build inline SVG/JSX "devices" as content.** No diagrams, dashboards, dials, gauges, charts, ledgers, fake product UIs, validation-gate animations, scatter-fields, or "explainer" contraptions. They read as cheap and they are banned — we would rather have none than a mediocre one. **A clean glass + type section is ALWAYS preferred to a homemade graphic.** *(The design-critic flags any informational/illustrative inline SVG as P0.)*
- If a great image doesn't exist for a slot yet, ship the **clean glass + type** version of that section — never a placeholder device or a homemade stand-in. (A single labelled empty image slot, like the homepage flywheel, is acceptable while a real asset is being made.)
- The **only** allowed inline SVG is barely-there **decorative motif** — like the homepage's 56px door motifs at ~0.09 opacity. Texture, never information.

## 8 · Accessibility floor (non-negotiable)
AA contrast on all text · visible `:focus-visible` · logical heading order (one `<h1>` per page) · descriptive `alt` (or `alt=""` for decorative) · no layout shift · keyboard-operable interactives · `prefers-reduced-motion` honoured.

## 9 · Discovery floor (GEO/SEO)
- **Answer-first:** each page opens with a self-contained, quotable claim.
- **All substantive copy in the server-rendered HTML** — never hide facts behind interaction-only rendering.
- Per page: unique `<title>` + meta description, canonical, BreadcrumbList JSON-LD, an OG/share-image slot. Entity names exactly per `geo-kit.md`.

## 10 · Voice & copy
- Confident, precise, quietly literary — sells the outcome and stays credible to a regulator. **Full creative licence within the facts** (`krim-content.md`). No filler, no hype-clichés ("revolutionary", "unlock", "leverage", "seamless"), and none of the three banned headline/eyebrow archetypes in §3 (label, instruction, inventory). Read every line aloud; the test for any headline or eyebrow is "would a CMO ship this?" — if it doesn't earn its place, rewrite or cut it.
- **Concise above all — then highlight what matters.** Say it in the fewest words that still build trust: share enough detail to be credible and clear, never exhaustive — cut every word that doesn't earn its place. Then use the colour grammar to **highlight the load-bearing words inline** (mint = validated / proof / the brand · cyan = thinking / proposed · bright `ink` = emphasis) — a few tasteful touches per section so the key points land at a glance. Never rainbow. The aim: clear, concise, beautiful, with the right words lit.
- **Don't over-disclaim.** Internal caveats — what's shipped vs. in research, what we can or can't claim — shape *what* we write; they are not *voiced* as anxious hedges. State the thing with confidence; where something is still being built, a single light "an active area of research" touch is enough. Never stack disclaimers ("this is not a claim / not finished / not proven"), and never explain to the reader why you're being careful. What the user shares internally ≠ how we speak externally — convey the information, discreetly.
- **Heroes are punchy (P0 if violated).** A hero is a headline plus **one short line** (≤2 lines, ~one sentence) — never a paragraph. The explanation belongs in the sections below, as glass cards that **reveal on scroll, one idea per card**. If the hero needs a second sentence to make sense, the page's *structure* is wrong, not its hero. Push depth down; keep the first screen a clean, confident claim with room to breathe.

---

## How this is used
- It is the **rubric the `design-critic` grades against**, alongside the live homepage as the reference standard. `content-critic` grades copy against this voice + `krim-content.md` + the page's brief.
- **Style is governed here; structure is decided per page.** A page brief names that page's job, audience, the facts it must carry, and its one signature idea — then it's built in this style, through the critic gate, until it ships.
