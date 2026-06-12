# Krim — design tokens

A **starting palette and system** for **krim.ai** — a springboard, not a cage. The colours and fonts below were sampled from the Krim deck and the orb asset to give the build a coherent, on-brand point of departure. **The deck does not constrain the site.** The designer is expected to extend this system, re-tune it, introduce new colours/treatments/imagery, and depart from it with rationale wherever a stronger idea earns it. The only hard rule is brand coherence (it must still read as Krim) and accessibility. Ambition is the default; "looks like the deck" is a failure, not a goal.

> Brand essence to honour while you explore: sovereign, epistemic, precise, engineered, quietly literary — an *operating system* for regulated intelligence, not a typical SaaS marketing site.

---

## 1. Colour

All values pixel-sampled from the deck PDF.

| Token | Hex | Source / use |
|---|---|---|
| Canvas (page base) | `#09090C` | Deck slide background — the near-black field everything sits on |
| Canvas (hero / deepest) | `#04060C` | The orb asset's stage background; use for the hero section |
| Mint — primary accent | `#00FFB2` | The KRIM wordmark + every primary accent in the deck |
| Gold — secondary accent | `#C8A14A` | Eyebrow labels + tick-underlines (used sparingly) |
| Warm white — headlines | `#F6F6F4` | Serif display headlines |
| Muted — body | `#A9ADB6` | Body copy, supporting text |
| Panel tone | `#2A2C33` | Approx. border/edge tone of the deck's bordered panels |

### Orb hero colours (from the asset)
The orb renders at `hue=210` — a **blue-cyan** glow, not mint:

| Token | Hex |
|---|---|
| Orb stroke (bright) | `#39D6FF` |
| Orb highlight (pale) | `#BFEFFF` |
| Orb canvas | `#04060C` |

**Strong default — cyan.** Keep the orb at `hue=210` (cyan), resolving into the mint logo at the pinhead handoff — the cyan→mint shift is a deliberate "ignition" beat. This is a good default because the asset already exists; the designer is free to propose a better hero idea entirely in the exploration phase.

### Built scale (CSS custom properties)

```css
:root {
  /* Base / surfaces */
  --bg:            #09090C;   /* page */
  --bg-deep:       #04060C;   /* hero stage, deepest wells */
  --surface:       #101116;   /* panel base */
  --surface-raised:#15171D;   /* hover / elevated panel */

  /* Borders (alpha over --bg) */
  --border:        rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.14);
  --border-mint:   #00FFB2;   /* the one accent card per view */

  /* Text */
  --text:          #F6F6F4;   /* headlines */
  --text-2:        #A9ADB6;   /* body */
  --text-3:        #6B6F78;   /* captions, footer, eyebrow-dim */

  /* Mint (primary) */
  --mint:          #00FFB2;
  --mint-bright:   #5CFFCB;   /* hover / glow */
  --mint-dim:      #00C98C;   /* pressed */
  --mint-deep:     #0A6B4E;   /* fills behind dark text */
  --on-mint:       #04130D;   /* text on a mint fill */

  /* Gold (secondary — use sparingly) */
  --gold:          #C8A14A;
  --gold-dim:      #A8843A;

  /* Orb */
  --orb-canvas:    #04060C;
  --orb-stroke:    #39D6FF;
  --orb-highlight: #BFEFFF;

  /* Validator states (for the Kendra runtime diagram) */
  --pass:  #00FFB2;
  --amber: #C8A14A;
  --fail:  #E5484D;   /* [CONFIRM] — not in deck; chosen to sit beside mint/gold */
}
```

### Tailwind theme extension

```js
// tailwind.config — theme.extend
colors: {
  bg:        { DEFAULT: '#09090C', deep: '#04060C' },
  surface:   { DEFAULT: '#101116', raised: '#15171D' },
  mint:      { DEFAULT: '#00FFB2', bright: '#5CFFCB', dim: '#00C98C', deep: '#0A6B4E' },
  gold:      { DEFAULT: '#C8A14A', dim: '#A8843A' },
  ink:       { DEFAULT: '#F6F6F4', 2: '#A9ADB6', 3: '#6B6F78' },
  orb:       { stroke: '#39D6FF', glow: '#BFEFFF' },
},
borderColor: { soft: 'rgba(255,255,255,0.08)', strong: 'rgba(255,255,255,0.14)' },
```

---

## 2. Typography

**Deck reality (embedded fonts):** the deck was built in office defaults — **Georgia** (serif display), **Consolas** (mono eyebrows), **Calibri** (body). These read fine in a deck but are not a top-tier *website* type system. Recommended web-quality equivalents that preserve the exact character:

| Role | Deck font | `[DECISION]` Recommended web face | Fallback |
|---|---|---|---|
| Display serif (headlines) | Georgia | **Newsreader** — strong default | Georgia |
| Eyebrow mono (uppercase labels) | Consolas | **IBM Plex Mono** | ui-monospace, Consolas |
| Body sans | Calibri | **Inter** | system-ui |

**Strong default — Newsreader.** A good editorial, high-contrast serif with real character — already a step up from the deck. Body **Inter**, eyebrows **IBM Plex Mono**. Treat this as the starting pairing; the exploration phase may propose a more distinctive typeface system (a different display serif, a contrasting grotesk, a characterful mono) if it raises the bar. Type is a primary design lever here — use it boldly.

```css
:root {
  --font-display: 'Newsreader', Georgia, 'Times New Roman', serif;
  --font-mono:    'IBM Plex Mono', ui-monospace, Consolas, monospace;
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;
}
```

### Scale & treatment
Modular scale ~1.25 (major third). Display is fluid via `clamp()`.

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `display-hero` | `clamp(2.75rem, 6vw, 5rem)` | 400 | `-0.015em` | Hero headline |
| `display-1` | `clamp(2rem, 4vw, 3.25rem)` | 400 | `-0.01em` | Section headlines (serif, white) |
| `display-2` | `1.5rem` | 500 | `-0.005em` | Card / sub-section titles (serif) |
| `eyebrow` | `0.75rem` | 500 | `+0.18em` UPPERCASE | Mono section labels (mint or gold) |
| `body-lg` | `1.125rem` | 400 | `0` | Lead paragraphs |
| `body` | `1rem` | 400 | `0` | Body copy (`--text-2`) |
| `caption` | `0.8125rem` | 400 | `0` | Footnotes, metadata (`--text-3`) |
| `mono-data` | `0.875rem` | 500 | `+0.02em` | Stat labels, integration tags |

Rules: headlines white serif; eyebrows wide-tracked uppercase mono in mint (or gold for "warning"-flavoured sections like the problem/why-AI-fails); body in `--text-2`; line-height 1.6 body / 1.1 display. Lead each section with one self-contained, quotable serif claim.

---

## 3. Spacing, radii, borders

```css
:root {
  /* 4px base scale */
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-6:24px; --space-8:32px; --space-12:48px; --space-16:64px;
  --space-24:96px; --space-32:128px;

  --r-sm:6px; --r:10px; --r-lg:14px; --r-xl:20px;

  --section-y: clamp(64px, 10vw, 128px);   /* vertical rhythm between sections */
  --measure: 68ch;                          /* max text line length */
}
```

**Panel treatment (the deck's signature card):**
```css
.panel {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--space-8);
}
.panel--accent { border-color: var(--border-mint); }  /* ONE per view max (e.g. Kendra) */
```

Layout: a real 12-column grid, generous whitespace, intentional asymmetry. Running header (KRIM top-left, section label top-right) and footer ("The AI your regulator can read." + triangle mark). No three-icon filler rows; no decorative gradients.

---

## 4. Motion

Easings — refined, no bounce:

```css
:root {
  --ease-out-soft: cubic-bezier(0.16, 1, 0.30, 1);   /* entrance settle (default) */
  --ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);   /* moves between states */
  --ease-standard: cubic-bezier(0.40, 0, 0.20, 1);   /* hovers, small UI */

  --dur-fast: 150ms; --dur: 240ms; --dur-slow: 420ms;
}
```

Site-wide: scroll-reveals (fade + 12–16px rise on `--ease-out-soft`), engineered hover states (border/again brightening, subtle translate), GPU-only transforms (opacity/translate/scale). Everything wrapped in `prefers-reduced-motion: reduce` → render final state instantly.

**Hero timeline (≈5s, once per session)** — single GSAP/Framer-Motion timeline, GPU-only, zero CLS, 60fps:

| Phase | Time | Motion |
|---|---|---|
| 1 | 0.0–1.2s | Orb appears full-screen centred on `--bg-deep`, animates |
| 2 | 1.2–2.0s | Orb eases down, scales toward a single point — to a pinhead |
| 3 | 2.0–2.2s | Seamless handoff at that point: Krim logo emerges from the pinhead (no cut/flash) |
| 4 | 2.2–3.8s | Logo scales up from pinhead to full size, centred |
| 5 | 3.8–4.4s | Logo translates + settles into the header position/size |
| 6 | 4.4–5.0s | Tagline "The AI your regulator can read." + primary CTA fade-and-rise; hero settles |

Reduced-motion fallback: render phase 6 (final state) immediately, no animation. Preload assets; no FOUC.

---

## 5. Quick reference

- Canvas `#09090C` · Mint `#00FFB2` · Gold `#C8A14A` · White `#F6F6F4` · Body `#A9ADB6`
- Serif headlines (white) · mono eyebrows (mint/gold, uppercase, wide-tracked) · sans body
- One mint-bordered accent card per view · faint-fill panels · real grid · big whitespace
- Motion subtle, GPU-only, reduced-motion-safe · hero plays once/session
