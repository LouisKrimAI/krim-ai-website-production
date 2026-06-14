# Krim — House Style (the design anchor)

**The homepage is the design & thematic anchor for the whole site.** This document captures its DESIGN DNA — the visual language, components, motion, graphics and copy bar — so every page looks and feels like one professional team built it.

> **It governs HOW a page looks and feels — NOT what sections it has or their order.** Each page is free to choose the structure, sections and signature idea that best do *that page's* job. This is the *style* it does that job in. Do not clone the homepage's section sequence onto other pages; do clone its craft, restraint and feel.

---

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
- **Headlines sell or evoke — they never describe the section.** "Named for what each one does." is the banned archetype: a meta-label posing as a headline. A headline earns attention and carries one idea.

## 4 · Glass (the signature surface)
- `.glass` — the showcase surface for cards that carry key information: real backdrop-blur, a hairline light border, a faint top-edge highlight, a soft lift. `.glass-quiet` for secondary; `.glass-cyan` / `.glass-mint` for the **one** accent per view; `.lume` for interactive hover lift.
- Glass is for content floating above the system — never wallpaper. **One mint-accent card per view, max.**

## 5 · Layout & rhythm
- Container `max-w-site` (1200px); vertical rhythm via `Section` (`var(--section-y)`); hairline dividers between sections.
- Generous whitespace; **one idea per screen**; intentional asymmetry where it helps.
- Reuse the shared primitives — `Section · Eyebrow · GlassCard · Stat · CTA · Reveal` — don't reinvent them per page. New shared components are fine when genuinely reusable; one-off page chrome is not.

## 6 · Motion budget (read this twice)
- Motion is purposeful or it is absent. **Per page: at most one or two earned "signature" moments**, and only where motion explains something words/static can't. Everything else is subtle scroll reveals (fade + small rise, once) and luminous hovers.
- The hero's orb choreography is the site's one big motion. Interior pages inherit the calm resting orb — they do **not** each invent a new spectacle.
- Always GPU-only (opacity/transform/colour); reduced-motion settles to the meaningful end state instantly; 60fps; zero CLS.
- **Banned:** a signature device in every section, spinning loaders, springy overshoot, gratuitous count-ups, auto-carousels, typewriters, gradient-shifting buttons, motion for motion's sake.

## 7 · Graphics policy (world-class or nothing)
- The aesthetic is carried by **orb + glass + type + colour grammar** — not by decorative illustration.
- **Imagery is real, high-quality assets only** (generated in Gemini), dropped into labelled slots under `public/images/<category>/`. If a great asset doesn't exist yet, leave a labelled placeholder at the right path/dimensions — **never ship a mediocre hand-built SVG "device" as a stand-in.**
- Custom SVG/diagrams are allowed **only** when genuinely excellent, purposeful, and they earn their place (and pass the design-critic). Default to restraint: a quiet glass panel beats a busy diagram.

## 8 · Accessibility floor (non-negotiable)
AA contrast on all text · visible `:focus-visible` · logical heading order (one `<h1>` per page) · descriptive `alt` (or `alt=""` for decorative) · no layout shift · keyboard-operable interactives · `prefers-reduced-motion` honoured.

## 9 · Discovery floor (GEO/SEO)
- **Answer-first:** each page opens with a self-contained, quotable claim.
- **All substantive copy in the server-rendered HTML** — never hide facts behind interaction-only rendering.
- Per page: unique `<title>` + meta description, canonical, BreadcrumbList JSON-LD, an OG/share-image slot. Entity names exactly per `geo-kit.md`.

## 10 · Voice & copy
- Confident, precise, quietly literary — sells the outcome and stays credible to a regulator. **Full creative licence within the facts** (`krim-content.md`). No filler, no hype-clichés ("revolutionary", "unlock", "leverage", "seamless"), no meta-label headlines. Read every line aloud; if it doesn't earn its place, cut it.

---

## How this is used
- It is the **rubric the `design-critic` grades against**, alongside the live homepage as the reference standard. `content-critic` grades copy against this voice + `krim-content.md` + the page's brief.
- **Style is governed here; structure is decided per page.** A page brief names that page's job, audience, the facts it must carry, and its one signature idea — then it's built in this style, through the critic gate, until it ships.
