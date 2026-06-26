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
  - **Parts-bin inventory / number-led** — reduces one system to a counted catalogue: *"Five parts"*, *"Eight modules make the guarantees hold"*, *"Three things that change everything."* **Leading a heading with a count is banned even when the count is accurate** — the number is almost never the interesting thing; if it were removed, the line should still carry the idea. Sell the whole; never make the buyer feel they're reading a parts list. (The validator count "33 validators" as a *factual* phrase inside body copy is fine — that's proof, not a headline hook.)
  The test: read it aloud. If it could sit on a filing-cabinet drawer or in a tooltip, rewrite it.

## 4 · Glass (the signature surface)
- `.glass` — the showcase surface for cards that carry key information: real backdrop-blur, a hairline light border, a faint top-edge highlight, a soft lift. `.glass-quiet` for secondary; `.glass-cyan` / `.glass-mint` for accent; `.lume` for interactive hover lift.
- Glass is for content floating above the system — never wallpaper. Prefer **one mint-accent card per view** — but a section may carry the highlight **more than once when it genuinely earns engagement** (a livelier section, a deliberate rhythm of cues). The test is "is each use load-bearing?", not a hard count. Never rainbow; never decorative.
- **Cards are crafted objects, not boxes.** A small, clear hierarchy (mono eyebrow/label → serif title → calm body), the 3px accent bar, generous padding, a luminous `.lume` hover. Beautiful and stylish — never bland, never busy, never ugly. If a card looks like a plain bordered rectangle, it isn't finished.

## 5 · Layout & rhythm
- Container `max-w-site` (1200px); vertical rhythm via `Section` (`var(--section-y)`); hairline dividers between sections.
- Generous whitespace; **one idea per screen**; intentional asymmetry where it helps.
- Reuse the shared primitives — `Section · Eyebrow · GlassCard · Stat · CTA · Reveal` — don't reinvent them per page. New shared components are fine when genuinely reusable; one-off page chrome is not.

## 6 · Motion budget (read this twice)
- Motion is purposeful or it is absent. **Per page: at most one or two earned "signature" moments**, and only where motion explains something words/static can't. Everything else is subtle scroll reveals (fade + small rise, once) and luminous hovers.
- The homepage hero's arrival choreography — the orb resolving, the animated mark, and the one **deliberate line-by-line type-in of the hero copy** — is the site's signature motion and is sanctioned. (The "no typewriters" ban below means: don't sprinkle typewriter effects on body copy elsewhere — it does not forbid the hero's one arrival beat.) Interior pages inherit the calm resting orb; they don't each invent a new spectacle.
- Always GPU-only (opacity/transform/colour); reduced-motion settles to the meaningful end state instantly; 60fps; zero CLS.
- **Banned:** a signature device in every section, spinning loaders, springy overshoot, gratuitous count-ups, auto-carousels, **typewriter effects on ordinary body/section copy** (the hero arrival is the one sanctioned exception), gradient-shifting buttons, motion for motion's sake.

## 7 · Graphics policy (real images, or one earned signature — never slop, never a gadget per section)
- The aesthetic is carried by **orb + glass + type + colour grammar**. Most content graphics should be **real, high-quality images** (dropped into `public/images/<category>/`, used via `next/image` in glass-framed slots like the homepage's) — or a clean glass + type section.
- **A bespoke inline SVG / canvas visual IS allowed — as a rare, earned *signature* — when it clears every bar:** (1) genuinely beautiful and unmistakably on-brand (orb / glass / colour-grammar family); (2) **performant** — transform/opacity only, GPU, reduced-motion-safe, no CLS, lightweight; (3) it **earns its place** — it makes one important idea land better than type alone (e.g. the validation gate, the world-model flywheel, the KrimOS layers); (4) **at most one, occasionally two, signature visuals per page — never one per section.** The homepage flywheel and platform-layers visuals are the reference for "earned."
- **Still banned: AI-slop and over-engineering.** A contraption in every section, fake dashboards / dials / gauges / scatter-fields as decoration, or any homemade graphic that's *worse* than clean glass + type — **P0.** The test moved from "is there any custom SVG?" to **"is this a beautiful, purposeful, performant signature — or clutter?"** When in doubt, a clean glass + type section beats a mediocre device.
- The barely-there **decorative motif** (~0.09 opacity, texture-not-information — like the 56px door motifs) is always fine and does not count against the signature budget.
- If a great image doesn't exist for a slot yet, ship the **clean glass + type** version — never a placeholder device. (A single labelled empty image slot, like the homepage flywheel, is acceptable while a real asset is being made.)

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
- **Sound like a person wrote it, not a model.** The tone is right; this is only about avoiding the obvious AI tells. Mainly two: the **em-dash used as a default connector** (a good writer uses one occasionally; the tell is leaning on it constantly, or the same `— x —` move down a card set) and the **"X, not Y" cliché** ("co-workers, not chatbots"). Keep them rare and write plainly. Don't overcorrect into quirky tics to *look* human.
- **Heroes are punchy (P0 if violated).** A hero is a headline plus **one short line** (≤2 lines, ~one sentence) — never a paragraph. The explanation belongs in the sections below, as glass cards that **reveal on scroll, one idea per card**. If the hero needs a second sentence to make sense, the page's *structure* is wrong, not its hero. Push depth down; keep the first screen a clean, confident claim with room to breathe.

---

## How this is used
- It is the **rubric the `design-critic` grades against**, alongside the live homepage as the reference standard. `content-critic` grades copy against this voice + `krim-content.md` + the page's brief.
- **Style is governed here; structure is decided per page.** A page brief names that page's job, audience, the facts it must carry, and its one signature idea — then it's built in this style, through the critic gate, until it ships.

---

## 11 · The quality bar, language & self-QA (P0 — read before shipping any page)

These are hard rules added after repeated, avoidable misses. The agent is expected to **find and fix these without being told.**

### Design must be engaging — bland is a defect
- **A wall of equal-weight text is not finished.** Every content section must be *browsable in seconds*: the eye should catch the key points first. Achieve this with type scale, the colour grammar, deliberate layout, and whitespace — not density.
- **Always choose the strongest layout option**, not the first that works. A flat 3×N grid of look-alike cards is usually the lazy choice — vary emphasis, size a hero element, lead with one strong idea. If a section is "dull / bland / dense," it has failed the bar.
- **Card sets MUST align perfectly.** Identical heights, identical divider and button positions, identical internal rhythm across every card in a group — at every breakpoint. Misaligned cards are a P0 defect; verify by eye (and by measuring) before shipping.

### Language — normal, concise, exciting
- **Speak like a smart human, fast.** Make the reader understand what a thing is and *why it's exciting* in one or two plain sentences. Then stop.
- **Do NOT mechanically spell out "what each part does" in dense, parallel list-prose.** That reads like a spec sheet. Lead with the point; cut the scaffolding. Never overly complex, dense, or repetitive.
- **Read like a person wrote it, not a model.** The tone is already right; this is only about removing the obvious AI tells. Mainly two: the **em-dash used as a default connector** (fine occasionally; the tell is using it constantly, or the same `— x —` move in every card) and the **"X, not Y" cliché** ("software co-workers, not chatbots"). Keep both rare, vary your sentence rhythm, read it aloud. Don't overcorrect into tics or em-dash-avoidance contortions to *look* human; that reads as machine-made too. **Concrete bar (this kept getting missed):** across one page's rendered copy, the em-dash is the exception, not the rhythm — aim for at most one or two on the whole page, and only where it is genuinely the strongest punctuation. Everywhere else use a comma, a colon, a full stop, or a light rewrite. A paragraph or card set where `—` is the recurring connector has failed. (Title-bar separators in `<title>`/metadata and code comments don't count.)
- **Highlight the load-bearing words in every section** with the colour grammar (mint = validated/proof/brand · cyan = thinking/proposed · bright `ink` = emphasis). A content section with *zero* inline highlights is almost always under-styled. Aim for a few tasteful, deliberate highlights per section — enough that the key points land at a glance. Never rainbow, never every other word.

### Naming — be straightforward
- Pick one clear name for a thing and use it consistently across breadcrumb, page title, nav, hero and body (e.g. decide "Kira" vs "Kira & Krimkar" once). No drift, no ambiguity.

### Mandatory self-QA before declaring anything done
Render every changed view at desktop width (and check mobile) and confirm, fixing anything that fails **without waiting to be told**:
1. **Alignment** — every card set aligns; nothing clipped; dividers/buttons share a baseline.
2. **Engagement** — no bland/dense section; key points highlighted; layout earns attention.
3. **Language** — concise, plain, exciting; no spec-sheet enumeration; reads like a person wrote it (obvious AI tells like em-dash overuse and the "X, not Y" cliché kept rare).
4. **Highlights** — colour used on the right words, tasteful, present.
5. **Naming + facts** — consistent names; claims true to `krim-content.md`.
6. **Brand** — "Krim" never "Krim AI"; logos/assets correct.
The reviewer's time is expensive — never ship work that an obvious self-review would have caught.

---

## 12 · Judgment over rote — and how images sit with text (added after over-rigid passes)

**These rules are guardrails, not a straitjacket.** Apply expert judgment and best design practice first; the rules exist to keep quality high, not to be followed blindly into a worse result. If a rule, applied literally, makes a page *worse* (blander, more generic, less clear), the rule is being misapplied — step back and design. Examples of past over-rigidity to avoid:
- Stripping deliberate signature graphics (orb, stacked-layers) under "anti-slop" — wrong; those are brand.
- Making the header/footer logo static "for calm" — the brand wants the **dynamic animated mark with the moving dots** in header and footer.
- Refusing images behind text on principle — see below.

**Images behind text — the expert rule.** A photographic/cinematic image *can* sit behind text, and it often looks premium — **but only when legibility is guaranteed**, never by default. Get it right one of these ways:
1. **Negative space:** place the text over a genuinely empty/quiet region of the image (sky, shadow, blur), not over busy detail.
2. **Faded enough:** drop the image back with a strong scrim (≈0.45–0.65 darken) so it reads as *texture*, and the type sits clearly on top.
3. **A real scrim behind the words:** a focused dark gradient *behind the text itself* (centre, not edges — a centre caption needs the centre darkened). An edge-only vignette does NOT help centred text.
A full-bleed image strip with bright detail directly under centred text is a defect — you must catch it yourself. `CinematicBand` now bakes in the fade + centre scrim; if a band still fights its caption, fade harder, move the text to negative space, or drop the caption and let the image be pure atmosphere.

**Consistency of alignment.** Section headlines should follow one deliberate pattern per page — don't mix centred and cramped-left headlines arbitrarily. A 2-column text+card section is fine, but its headline shouldn't read as "randomly shoved left" next to other full-width sections; if it does, centre it or make it full-width.

---

## 13 · Copy craft — name the true thing, then check it (from the copy-craft study)

Added after copy shipped that the user rightly called "dumb / weird / try-hard": cryptic card labels ("When it has to be right"), contorted headlines ("safe to run, and sharper for having run"; "the rules already inside them"), a strained metaphor ("a drawer of point tools"). This section is how we don't do that again.

**Voice.** Krim writes like a serious operator explaining a serious system: confident, concrete, plainspoken, quietly literary. Every line names a real thing Krim owns (runtime, gate, primitive, co-worker, outcome, channel, sign-off, ledger) and could be repeated to a CRO across a table without wincing. Craft is felt in rhythm and restraint, never performed — the proof is in the precision, not the flourish. Study how these brands do it: **Stripe** (name the category in plain nouns, then one clean clause), **Linear** (calm, compressed declaratives), **Vercel** (simple parallel cadence), **Palantir** (gravity through restraint), **Anthropic** (two true claims joined plainly).

**Do:**
- **Name the thing in the first few words.** A label or card descriptor is a *definition, not a riddle*: lead with what it IS, then one true clause of what it does.
- **Anchor to a concrete Krim noun.** Abstraction ("holds together", "point tools", "synergy") is where copy goes soft.
- **Lead with the idea; let numbers corroborate inside a sentence** — never open a headline or label with a count.
- **State the two real powers plainly** (validated before it runs; sharper from every outcome) — two facts joined by "and", not dressed in grammar games.
- **Use parallelism only when both halves stay simple and true** ("Validated before it acts. Sharper after."). Never bend grammar to chase a cadence.

**Banned failure modes (we shipped every one of these):**
- **Cryptic fill-in-the-blank labels** — the When/What/Who/Where (or For-X/For-Y) word game. A nav card must tell you where the link goes; a mood-line there is malpractice.
- **Grammar-contortion-for-cadence** — twisting syntax for rhythm ("sharper for having run", "rules already inside them"). The reader feels the strain before the meaning.
- **Forced antithesis / chiasmus** and the "X, not Y" cliché — symmetry that prizes the pose over clarity.
- **Strained metaphor** — an image the audience doesn't live in ("a drawer of point tools").
- **Meta-label headline** — describing the section instead of saying something ("Why it holds together", "The named pieces"). That's a drawer label, not a headline.
- **Number-led hook**, and **pattern-lock** (forcing every card into one rigid template — vary the rhythm; let each item's real character set its sentence).

**The language-and-sense check — run on every line AFTER drafting; this is the gate `content-critic` enforces:**
1. **Read it aloud.** If you pause, invert, or re-read to parse it, rewrite to the plain version.
2. **Deletion test.** Cut the line — does the reader lose a *fact*, or just a flourish? If only a flourish, it was decoration.
3. **First three words** name what the thing IS (not a mood, not a riddle).
4. **Filing-cabinet test.** Could it sit on a drawer label or tooltip ("What it can do")? Then it's a meta-label — say something instead.
5. **True + concrete.** It states a real Krim fact with a concrete noun; no invented capability, no abstraction filler.
6. **Strip the colour** highlight mentally — the sentence still reads clean and complete.
7. **Boardroom test.** Would a CRO repeat this line to their board without wincing? If it sounds like a word game, rewrite it as a fact.
