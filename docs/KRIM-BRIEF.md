# KRIM-BRIEF — the master spec for krim.ai
*Lean and stable. This is the spine; it changes rarely. The map lives in `SITEMAP-IA.md`; facts in `krim-content.md`; assets/JSON-LD in `geo-kit.md`; the starting palette in `design-tokens.md`. Page copy is written per work order, never before. Supersedes all earlier briefs.*

---

## How these docs work — read first
- **The one hard rule: facts are accurate, prose is original.** `krim-content.md` is a FACT SHEET — numbers, names, claims must match it exactly. But its sentences are raw material, not copy to transplant. If a sentence on the site matches a source sentence, that is a defect. The only verbatim lines allowed are designated taglines (below).
- **Build multi-page, never single-page.** Real routes per `SITEMAP-IA.md`. Anchor-scrolling one long page is rejected.
- **One work order at a time.** Build one page (or one section) per instruction; restate the work order in ≤5 lines before building so drift is caught early; self-check; gate; then the next.
- **Common sense over false precision.** Source docs are inputs, not scripture. Never force real content into a tidy number or template — if "five layers" would drop or bury something real (it once buried Kula, one of the two minds of KrimOS), don't. Represent the product honestly, surface conflicts between sources instead of silently resolving them, and flag for confirmation rather than guessing. Truth and clarity beat neat counts.

## The story — three powers, one flywheel
**Krim automates regulated operations.** KrimOS is the core operating system for them — and its whole argument is three powers, locked together, not a feature list:

1. **Validation (judgment).** No action executes until it has passed Krim-Nyāya's pre-execution gate. Proof isn't demonstrated to the regulator after the fact; it is the precondition of action. *Validated before it acts.*
2. **Intelligence (the world model).** Because one runtime runs the whole lifecycle and records every action with its reasoning on one ledger, the system builds a connected, compounding model of how the operation actually behaves — the first system positioned to see a lending operation whole. *Smarter after it acts.*
3. **Sovereignty (a close third).** The system runs inside the institution's perimeter — on-prem by preference, no foreign API in the loop. *Never leaves your walls.*

**Where the powers live (get this right).** The two technical powers are two modules of the **Kendra** runtime: **Krim-Nyāya is validation; Krim-Learn is the intelligence — the real "mind"** (with the rest of Kendra around it). Everything else serves them: **Kriya** is the vocabulary of validated actions; **Karta** are the co-workers composed from it. **Kula** and **Kira** are not minds — they are the two *interfaces* to the mind: **Kula** is the enterprise natural-language interface, where each user meets a digital twin tailored to their role; **Kira** is the customer advisor, on the Krimkar app and the public consumer site. People talk to Kula and Kira; the thinking happens in Kendra. Never call an interface a mind.

**The flywheel that makes it unique:** validation makes deployment possible → autonomy generates complete, attributed data → data compounds into the world model → the world model proposes better actions → better actions clear validation more often → more autonomy. In this architecture, safety and intelligence manufacture each other instead of trading off. Sovereignty is load-bearing for the intelligence: only a system a bank trusts inside its walls gets to observe the whole operation.

**Spine, one breath:** *Regulated operations couldn't run on AI you can't prove, or risk what leaves your walls. Krim made proof the runtime and keeps the system inside your perimeter. So the machines can finally act — and because they act on one record, the system learns the operation and compounds.*

**One OS, every regulated domain.** KrimOS is the core — the same brain (Kendra), vocabulary (Kriya), co-workers (Karta) and interfaces (Kula, Kira) everywhere. Only the rules and use cases change per industry (carried in Krim-Fabric). Krim serves four domains, each with its own page: **Lending** (flagship — deeply documented), **Government**, **Large Enterprise**, **MSME** (medium-sized enterprises, any industry — here the regulation-grade rigor is a *confidence* play, not a compliance one). Top-level language is always "regulated operations," never "lending." New-domain content is framed as logical capability fit, not claimed deployments — invent nothing.

**Designated taglines (verbatim allowed):** "The AI your regulator can read." · "Validated before it acts. Smarter after it acts."

## Deployment & commercials (frame, don't over-state)
- **Three deployment models, on-prem primary.** On-prem/sovereign is the default for regulated lenders, government, and other regulated industries — the full stack inside the perimeter, nothing leaves. Hybrid and managed SaaS are also available for institutions that want them. Present on-prem as the hero of the three; the others as "also available."
- **KWUs:** the Krim Work Unit is a unit of *account* — it meters every validated action for the institution's own audit, attribution and capacity planning, in any deployment. As a *billing* unit it suits SaaS/hybrid (pay per validated action); on-prem is licensed/subscription, with KWUs used internally only. **Do not put pricing or KWU mechanics on the public site** beyond a single tasteful mention of the Ledger-as-meter on `/platform/kendra`. Pricing is a sales conversation.

## Design language
> **The anchor is `docs/HOUSE-STYLE.md`** — the homepage's design DNA, codified. It governs how every page LOOKS and FEELS (canvas, orb, glass, colour grammar, type, motion budget, graphics policy), **not** its sections or order. Each page earns its own structure; the house style is how it's built. Copy is written fresh with **full creative licence** in the house voice — the decks in `docs/copy/` are raw material, not final wording; headlines sell or evoke, never describe ("Named for what each one does" is the banned archetype).

**Aesthetic target: precision instrumentation, not sci-fi.** The feeling is *control rendered beautifully* — a cockpit, a Swiss movement, a seismograph. A CRO should think "this system is exact," never "this looks flashy." Minimal, profoundly considered, high-value.

- **One canvas.** A single deep ground (the `#04060C`–`#09090C` family). Calm, dark, consistent. No light/dark theme-switching.
- **Glassmorphism is a hero element here — make it visibly beautiful, not a whisper.** Real depth: generous backdrop-blur, luminous hairline borders, faint inner top-edge highlights, layered translucency, subtle tints that catch the orb's light. Key information lives in glass cards that genuinely *stand out* from the canvas and read as crafted objects. Premium and cool, never gaudy — the restraint lives in the palette and the motion, not in the glass.
- **Colour grammar:** cyan = proposed / thinking (the runtime, the orb); mint = validated / learned (the brand, cleared actions); gold sparingly for amber / exception states. Otherwise restrained near-monochrome.
- **Type: large and confident, and still professional.** Big display headlines that carry a section on their own; comfortably large, readable body — never cramped, never timid. Use weight and scale to make sections feel like designed moments with strong presence and clear separation. (Newsreader / Inter / IBM Plex Mono is the starting set in `design-tokens.md`; **scale the type up** from any conservative defaults.)
- **The logo (real asset, already in the repo — never a mimic).** Use the actual Krim logo committed to the repo. The **hero uses the special animated logo** (the version with moving elements); the **top nav/banner and favicon use the static mark**. Locate the real files in the repo and use them; if you genuinely can't find them, leave a clearly-labelled placeholder slot and ask — do **not** draw a substitute. Browser tab: homepage title is exactly `Krim - Safe Superintelligence`; other pages use the template `{Page} — Krim`. "Safe Superintelligence" is the brand line (safety from validation, intelligence from learning) — use it in titles/meta/footer, but keep on-page body copy credible and concrete for regulated buyers.
- **Hero first-load choreography (the site's one signature animation — make it flawless, 60fps, slow confident eases, no bounce/spin/cliché):**
  1. Black canvas. The orb alone, centred, at **full brightness**, gently alive. Nothing else.
  2. The orb **shrinks inward and dims**, drawing the eye to centre.
  3. As it recedes, the **Krim logo (large, real asset) fades up** in its place.
  4. Shortly after, the **hero words fade up** just beneath — kept trim (headline + one short line).
  5. The orb then **expands outward to a large, soft, faded presence behind everything**, where it stays as the page's living backdrop.
  Reduced-motion: skip to the resolved state (logo + words + faded orb backdrop) instantly. Timings tuned for elegance, not speed.
- **Motion — crafted only. No "AI slop" motion.**
  *Allowed (purposeful, beautiful):* the hero choreography; the cyan→mint validation pulse; slow, lightly-staggered scroll reveals; luminous hover states; the living orb backdrop; the signature interactive components animating *on interaction*; gentle ambient drift.
  *Banned:* fade-in-up on every element; bouncy/springy overshoot; spinning loaders or icons; decorative parallax; typewriter text; gratuitous count-ups; auto-playing carousels; gradient-shifting buttons; anything that moves without a reason.
  *Always:* 60fps, GPU-only (transform/opacity), reduced-motion honoured, zero layout shift; mobile motion designed for mobile, not a shrunk desktop.

## Copy discipline
Concise, punchy, original, quietly literary. Make the key point land in a few words; let glass cards carry it in large type. Most sections are short; reach for a longer passage only where it genuinely earns it (the `/company` thesis, parts of `/epistemic-ai`). Read every section aloud; if two adjacent sections share a skeleton, rewrite one. No AI-slop ("revolutionary," "unlock," "leverage," "empower," "cutting-edge"), no urgency theatrics, no hedging. A stranger from any domain must grasp Krim in ~30 seconds.

## SEO & GEO (built in, not bolted on)
The site must be readable by search engines *and* by AI answer-engines (which mostly don't run JS) — so all copy renders server-side in the HTML. Per page: a unique title and meta description, OG/X cards with a per-page share image off the triangle mark, one clean heading order, descriptive alt text. Site-wide: `sitemap.xml`; `robots.txt` explicitly allowing GPTBot, ClaudeBot, PerplexityBot and Google-Extended; canonical tags; clean URLs; and `llms.txt` at root. Structured data (JSON-LD) from `geo-kit.md`: Organization, SoftwareApplication, FAQPage, BreadcrumbList, Article. For GEO specifically: lead each page with a self-contained, answer-first claim; keep entity naming identical site-wide (the glossary in `geo-kit.md`); state concrete, citable facts. The five layer pages and `/epistemic-ai` are the deliberate entity anchors — `/epistemic-ai` owns the category definition.

## Credibility — honest by necessity
There are no public customers yet, and we invent none — no logos, no client names, no fabricated metrics or deployments. Credibility comes instead from things that are true: rigor *shown, not told* (the honest amber refusal, the ledger replay / audit experience), the formal-logic foundations and research depth, the named integration compatibility, and the precision of the craft itself. A site this exact, this honest about what the system *won't* do, is more convincing to a compliance buyer than any logo wall.

## Working protocol — the expert team, properly run
- **Builders:** one page per work order. Restate the order in ≤5 lines before coding. Reuse one shared component system; short diffs; don't regenerate unchanged files. Sub-agents may build independent pages in parallel only after the component system exists.
- **Gate before presenting anything:** self-screenshot at 1440px and 390px, inspect with vision, fix what's wrong, and present *with* those screenshots. State "self-checked at both widths."
- **Review panel (run before each gate; report one line each):** Design Critic (craft, hierarchy, glass restraint — beautiful?) · CMO (copy original, concise, all three powers present where relevant?) · Chief Scientist (is the learning story honest — federated, thresholded, attributed, never magic?) · Bank Buyer (credible? overclaimed?) · Government Buyer (sovereignty/accountability, no invented track record?) · Curious Engineer (depth findable, technical story real?).
- **Cadence:** commit per page; keep `PROGRESS.md` current; deploy a Vercel preview so review is effortless. Hard stop after each work order for approval.

## Decisions locked
Stack: Next.js (App Router, SSG/ISR). Background: one dark canvas. Primary CTA: **"Book a demo"** (secondary "See how it works"; `/government` uses "Start a conversation"). Form → Next API + Resend → sales@krim.ai (honeypot + Turnstile). Analytics: Plausible. Scheduling: Cal.com. Certs: all "in progress" until told otherwise. Primitives: 250+. Validators: 33. Markets: US · UK · India. No Saarthi.ai. Socials/feeds: pending — placeholders / stubbed `/insights`.
