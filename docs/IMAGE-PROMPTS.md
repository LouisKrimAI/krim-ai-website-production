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
