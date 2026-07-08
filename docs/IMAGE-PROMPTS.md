# Image prompts

Generated hero/section images live under `public/images/...`. Each entry below is
the prompt used (or to use) plus the destination path. House aesthetic: deep
near-black canvas, **glassmorphism**, a luminous mint→cyan accent system (mint
`#00FFB2`, cyan `#39D6FF`, gold `#C8A14A`), premium 3D render, **backgroundless
cutout** so it floats in the page canvas. Match the existing flywheel.

---

## Safe Agent Harness — `public/images/krimos/harness-clear.png`

Used as the **left-side floating visual** in the homepage Agent Harness section
(`components/home/AgentHarness.tsx`) and available for the
`/research/safe-agent-harness` hero. Sibling to `flywheel-clear.png`. Until a
raster is dropped here, the section renders the on-brand SVG
`components/home/HarnessGraphic.tsx`; to switch, see the note in `AgentHarness.tsx`.

**Gemini / image-model prompt:**

> A premium 3D product render of an abstract "safety gate" mechanism, floating on
> a pure transparent (or deep near-black) background, no scene, no floor — a clean
> backgroundless cutout. On the left, a softly glowing cyan orb of light bound
> inside a delicate translucent glass frame (an AI agent held within its allowed
> boundary). From the orb, several thin beams of light travel rightward toward a
> tall, vertical pane of frosted glass standing like a gate, edge-lit with a
> luminous mint-green seam and faint horizontal validation lines etched across it.
> Most beams pass cleanly through the gate and emerge on the right as bright
> mint-green beams ending in glowing nodes; one beam is stopped at the gate,
> marked by a small red halt point. A single small cyan node hovers above the gate,
> connected by a fine dotted line — a human in command. Glassmorphism, volumetric
> light, soft bloom, subtle depth of field. Colour palette strictly: mint green
> `#00FFB2`, cyan `#39D6FF`, with one small red `#E5484D` accent on the blocked
> beam, against darkness. Elegant, restrained, high-end, cinematic. Square 1:1,
> centred, generous negative space. No text, no labels, no logos, no UI.

**Export:** square PNG with transparency (or on pure `#05070A`), ~1196×1196 to
match `flywheel-clear.png`. Save as `harness-clear.png` in `public/images/krimos/`.

---

## Reference — existing renders already in the repo

- `public/images/krimos/flywheel-clear.png` — the World-Model flywheel: a glass
  ring of light turning through validate → act → record → learn, cyan warming to
  mint as the cycle compounds. The aesthetic anchor; match it.
- `public/images/krimos/layers-clear.png` — the stacked KrimOS layers cutout.
- `public/images/krimos/control-room.png` — the Kupa command surface.

---

# Article hero images — Gemini prompt kit (2026-07)

Every /insights hero shares one visual language (set by the world-model sphere,
`public/images/cinematic/world-model.webp`). Paste the **STYLE BLOCK** first, then one
**SCENE**. Generate 2–3 variants, pick the calmest. Output **portrait, 2:3**, PNG, highest
quality. After: drop the PNG in the repo, tell Claude the filename + article, and it gets
optimised → webp + LQIP blur + wired into `lib/image-manifest.ts` and `_posts.ts`.

## STYLE BLOCK (paste before every scene)

> Cinematic, contemplative dark render on a near-black background (#09090C) with subtle film grain.
> Quiet-luxury, observatory-at-night mood — precise, still, never busy. Palette strictly: mint green
> (#00FFB2) for anything proven / validated / resolved, cyan (#39D6FF) for anything thinking /
> proposed / in motion, and a rare touch of soft gold (#C8A14A) only for a single point of tension.
> Materials: dark glass, fine woven light-lattices, thin luminous filaments, soft volumetric glow,
> shallow depth of field. Photoreal lighting, high detail. NO text, NO logos, NO glowing brains, NO
> robots or humanoid figures, NO human faces, NO stock photography, NO circuit-board clichés, NO
> flags, NO literal dashboards. Abstract and architectural, not illustrative. Portrait, 2:3.

## SCENE 1 — What Epistemic AI Means (flagship)
> A single luminous action, rendered as a bright cyan filament of light, travels toward a translucent
> vertical gate of dark glass etched with a fine geometric lattice. As the filament passes through it
> is tested and resolves into calm mint-green light on the far side; a few filaments are quietly held
> back at the threshold, dimming. Three faint concentric ring-structures frame the gate, suggesting
> three stages of scrutiny. The scene reads as a threshold of reasoning: the moment a thought is
> checked before it is allowed to become an act.

## SCENE 2 — Explain the Decision, Not the Model (Tue)
> On the left, an opaque sphere of pure black glass, deliberately unreadable, faint cyan light swirling
> unseen inside. From it, one clear beam emerges and lands on a thin, brightly legible mint-green
> ledger-line etched in the air on the right — a single decision made readable. The contrast is the
> subject: the source stays dark and sealed, the outcome is clean, lit and inspectable.

## SCENE 3 — Collections Is a Sequence Problem (Wed)
> A network of faint branching paths made of thin light-filaments, curving through dark space like a
> decision tree seen from the side. Most branches are dim cyan; one continuous path is lit bright mint
> green, threading through several soft glowing nodes in sequence toward a single warm resolved point
> of light at the end. Many possible routes, one that reaches the good outcome. Quiet, elegant.

## SCENE 4 — Your Compliance Team Is Right to Say No (Thu)
> A single bright action, a cyan sphere of light, held suspended just before a narrow luminous
> threshold, caught in the instant of decision. A soft gold rim-light marks the point of tension.
> Behind it, faint mint-green lattice lines suggest the rules it is being weighed against. A held
> breath: stillness, restraint, the deliberate pause before something is allowed to proceed.

## SCENE 5 — The EU AI Act's High-Risk Clock (Fri)
> A wide, slow arc of faint luminous markers curving across dark space like the face of an abstract
> clock or a horizon of graduated light; most markers dim cyan, the leading ones brightening toward a
> single approaching mint-green line — a threshold being reached. An approaching moment, measured and
> inevitable, without any literal clock, calendar or flag. Cool, architectural, calm.

## Fallback
Any file in `public/images/cinematic/` is a safe placeholder; the article ships either way and the
hero swaps in later with zero code churn.
