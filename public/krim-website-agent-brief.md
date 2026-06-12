# KRIM.AI Website Rebuild — Claude Code Agent Brief

## Document Purpose
This is the authoritative specification for Claude Code agents tasked with rebuilding krim.ai. Every section contains explicit decisions, not suggestions. When in doubt, this document governs. Read the entire document before writing any code.

This brief covers strategy, brand, information architecture, page-by-page content spec, technical implementation, visual components, content rules, SEO, file structure, build order, quality checklist, success criteria, and **Generative Engine Optimization (GEO)** — the practice of making Krim visible to AI-powered search engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews). GEO requirements are woven throughout the brief and consolidated in Section 12. Every content, markup, and structure decision in this document has been made with both human visitors and AI crawlers in mind.

**⚠️ CRITICAL: There is already a live implementation at krim.ai with an existing codebase. DO NOT begin any build or modification work until you have completed Phase 0 (Section 0) — Discovery, Analysis & Approval. The founder must approve the implementation plan before any code is written or changed.**

---

## 0. PHASE 0 — DISCOVERY, ANALYSIS & APPROVAL (Execute First, Before Anything Else)

This section MUST be completed before touching any code. The existing website is live, has an existing codebase, and may contain working elements that should be preserved. The agent's first job is to understand what exists, compare it against this brief, and present a plan for the founder's approval.

### Step 0.1: Codebase Discovery

Clone or access the existing repository and produce a comprehensive audit:

**A. Technical Stack Inventory**
- What framework is the site built on? (React, Next.js, Vue, Astro, plain HTML, etc.)
- What is the hosting/deployment setup? (Vercel, Netlify, AWS, etc.)
- What styling approach is used? (Tailwind, CSS modules, styled-components, etc.)
- What are the dependencies? (`package.json` analysis)
- Is there a CMS or headless backend?
- What is the build system? (Vite, Webpack, Next.js built-in, etc.)

**B. Page & Route Inventory**
- List every route/page that exists in the codebase
- Map each existing page to the pages specified in this brief (Section 3)
- Identify: pages that exist and align, pages that exist but need rework, pages that don't exist yet

**C. Content Inventory**
- Extract all visible text content from every existing page
- Catalogue all images, SVGs, visual assets
- Note any animations, interactive components, or custom visual elements
- Identify any content that is strong and should be preserved

**D. SEO & Crawlability Audit**
- Does the current site render content server-side? (Test: `curl https://krim.ai/` — is there real HTML content?)
- What meta tags exist? (`<title>`, `<meta description>`, OG tags)
- Is there a sitemap.xml? robots.txt?
- Is there any structured data (JSON-LD)?
- Can AI crawlers (GPTBot, PerplexityBot) access the content?

**E. Component & Design Inventory**
- List all reusable components in the codebase
- Note any design system, color tokens, typography setup
- Identify visual elements that are strong (e.g., a good architecture diagram, a well-designed hero)
- Identify visual elements that conflict with this brief's direction

### Step 0.2: Live Website Analysis

Visit the live site at https://krim.ai/ and every page in the navigation. For each page:
- Screenshot or describe the current layout and content
- Note the current messaging, headlines, taglines
- Assess: does this page communicate "research company" or "SaaS vendor"?
- Identify what is working well visually and structurally
- Identify what contradicts this brief's strategic direction

### Step 0.3: Gap Analysis — Existing Site vs. This Brief

Produce a structured comparison document organized by this brief's sections:

**Narrative & Positioning Gaps**
- Current tagline/hero messaging vs. this brief's spec (Section 3, Homepage Hero)
- Current audience signal (research company vs. SaaS vendor) vs. this brief's requirement
- Does "collections" or "debt recovery" appear as the company descriptor? Where?
- Does the SSI thesis appear prominently? Where?

**Information Architecture Gaps**
- Current nav structure vs. this brief's spec: `Research | KrimOS | Applications | Company | Contact`
- Missing pages (which pages from this brief don't exist at all?)
- Pages that exist but need significant content rework
- Pages that exist and are largely aligned

**Content Depth Gaps**
- Current word count per page vs. this brief's GEO requirements:
  - Homepage: needs 1500-2500 words
  - Research: needs 3000-5000 words
  - KrimOS: needs 2000-3000 words
  - Applications: needs 1500-2000 words
  - Company: needs 1000-1500 words
- Are entity definitions present in the first 150 words of each page?
- Do FAQ sections exist? How many Q&A pairs?
- Do comparison tables exist?

**Technical Gaps**
- SSR status: does the site currently render content server-side?
- If not SSR, what is the migration path? (This is the single most important technical decision)
- Current Lighthouse scores
- Mobile responsiveness status
- Accessibility status

**GEO Gaps**
- Does structured data (JSON-LD) exist? What schemas?
- Are AI crawlers allowed in robots.txt?
- Are headings structured as natural language query answers?
- Is there a "Last updated" timestamp on pages?
- Are statistics and specific claims present as extractable HTML text?

**Visual & Design Gaps**
- Does a five-layer architecture diagram exist? Quality assessment?
- Current color palette vs. this brief's spec
- Current typography vs. this brief's spec
- Are there any visual assets worth preserving?

**What's Already Good**
This is equally important — list everything that's working well and should be kept:
- Strong visual components
- Good copy/content sections
- Effective animations or interactions
- Solid technical foundations
- Any asset that already aligns with the brief

### Step 0.4: Produce the Implementation Plan

Based on the gap analysis, produce a concrete implementation plan with three tiers:

**Tier 1: PRESERVE (keep as-is or with minor adjustments)**
List every element that's already aligned with this brief. These should not be rebuilt.

**Tier 2: MODIFY (existing element needs rework, not replacement)**
List elements that have the right foundation but need content, structural, or design changes. Specify exactly what changes are needed.

**Tier 3: BUILD NEW (doesn't exist yet, must be created)**
List everything that needs to be built from scratch. Specify which section of this brief governs each new element.

**Migration Risk Assessment**
- If the current stack is not Next.js with SSR, assess the migration complexity
- If the current site has working elements on a different stack, evaluate: rebuild on Next.js (clean break) vs. retrofit SSR onto existing stack
- Recommend one path with clear reasoning

**Estimated Scope**
- How many pages need new content written?
- How many components need to be built or rebuilt?
- What is the critical path? (What must be done first for everything else to work?)

### Step 0.5: APPROVAL GATE — Discuss with Founder Before Proceeding

**⚠️ MANDATORY: Do not write any implementation code until this step is complete.**

Present the following to the founder (Shri) for discussion and approval:

1. **The Gap Analysis** — Here's what exists vs. what the brief requires
2. **What We're Preserving** — These elements are already good and we'll keep them
3. **What We're Modifying** — These elements need specific changes (list each change)
4. **What We're Building New** — These don't exist yet and must be created
5. **The Technical Recommendation** — Stack migration (if needed) or build approach
6. **The Build Sequence** — What order we'll implement, and what the site looks like at each stage
7. **What the Founder Should Decide** — Any open questions, trade-offs, or choices where the brief offers options (e.g., tagline selection, exact color palette, specific visual direction for architecture diagram)

**The founder may:**
- Approve the plan as proposed
- Override specific recommendations in this brief based on existing work ("keep the current hero animation, it's good")
- Reprioritize the build sequence
- Add requirements not in this brief
- Request changes to the brief itself

**Record all founder decisions and treat them as amendments to this brief. Founder decisions override this brief where they conflict.**

Only after founder approval should the agent proceed to the implementation sections (Sections 1-12) of this brief.

---

### How the Rest of This Brief Applies After Phase 0

Once the founder approves the implementation plan:
- **Tier 1 (PRESERVE) items**: Skip. Don't touch them.
- **Tier 2 (MODIFY) items**: Use the relevant section of this brief as the target state. Implement only the delta between current state and target state.
- **Tier 3 (BUILD NEW) items**: Follow the relevant section of this brief fully.
- **All items**: Validate against the Quality Checklist (Section 10) when complete.

The page-by-page specs in Section 3, the visual component specs in Section 5, the technical specs in Section 4, and the GEO requirements in Section 12 all describe the **target state**. The agent's job is to close the gap between current state and target state — not to rebuild from scratch unless the gap analysis and founder approval determine that's the right approach.

---

## 1. STRATEGIC CONTEXT — Why This Rebuild Exists

### The Core Problem
Krim's current website presents the company as a collections AI vendor ("Agentic AI workforce for debt recovery. 2× ROI in 90 days. Zero compliance violations."). This is catastrophically wrong. Krim is a **research company with product and GTM** — closer to how Anthropic or DeepMind positions than how Credgenics or Skit positions.

### What Krim Actually Is
- **Krim** = the company. A research-first AI infrastructure company.
- **KrimOS** = the product. A five-layer multi-agent operating infrastructure for sovereign safe autonomous banking operations.
- **The thesis** = Sovereign Safe Superintelligence (SSI) applied to banking. Krim is doing for autonomous banking what Sutskever's SSI Inc. is doing for frontier models, but as a vertical infrastructure play.
- **The breakthrough** = Epistemological AI. The first AI architecture where systems validate their epistemic warrant (reasoning justification) *before* any action executes. This is rooted in Navya-Nyāya, a 14th-century Indian formal logic system — the most rigorous pre-modern epistemology — now translated into computational form for the first time.

### The Audience Hierarchy (in priority order)
1. **Investors** — Pre-seed/Seed fintech infrastructure investors (Foundation Capital, etc.)
2. **Bank CTOs & Heads of Technology** — Decision-makers evaluating platform adoption
3. **Industry analysts & journalists** — People writing about AI in banking
4. **Potential engineering hires** — Senior engineers evaluating whether to join
5. **Bank operations heads** — End-users who will champion internal adoption

### The Feeling the Website Must Create
A visitor should feel they've discovered something **architecturally profound** — not another AI SaaS dashboard. The emotional arc is: *curiosity → intellectual respect → "this is fundamentally different" → urgency to engage*.

---

## 2. BRAND IDENTITY — Non-Negotiable Design Foundations

### Company Name Treatment
- **KRIM** — Always uppercase in logo/wordmark contexts
- **Krim** — Title case in running text
- **krim.ai** — Lowercase in URL references

### Core Nomenclature (Sanskrit-Rooted — This Is A Differentiator)
Every name below is deliberate and meaningful. They must appear on the site with dignity, not as jargon.

| Name | What It Is | Meaning Context |
|------|-----------|-----------------|
| **KrimOS** | The full multi-agent operating system | The five-layer sovereign safe autonomous banking infrastructure |
| **Kriya** | Layer 1 — Atomic validated primitives | The fundamental actions, each pre-validated |
| **Karta** | Layer 2 — Autonomous AI coworkers | The agents that execute operations |
| **Kendra** | Layer 3 — Intelligence runtime (THE CORE) | Where every AI action is validated before execution. Contains 7 subcomponents |
| **Kula** | Layer 4 — Personalised digital twins | Digital replicas of bank staff that encode judgment and decision boundaries |
| **Kupa** | Layer 5 — Command centre | Where managers oversee autonomous operations |

### Kendra's 7 Subcomponents (for the Architecture section)
| Component | Function |
|-----------|----------|
| **Krim-Core** | Lifecycle orchestration |
| **Krim-Govern** | 7-level policy hierarchy |
| **Krim-Nyāya** | 26 pre-execution epistemological validators |
| **Krim-Fabric** | Knowledge graph and cross-system context |
| **Krim-Ledger** | Immutable audit trail with cryptographic hash chains |
| **Krim-Learn** | Federated learning and cross-tenant intelligence |
| **Krim-Sense** | Telemetry and observability |

### Tagline Options (choose the one that best fits the hero)
- PRIMARY: **"Every AI action validated before execution."**
- SECONDARY: **"Sovereign Safe Superintelligence for Autonomous Banking"**
- SUPPORTING: **"The intelligence runtime where AI proves its reasoning before it acts."**
- DO NOT USE: "Infinite Scale. Zero Loss of Humanity." (too generic), "Agentic AI workforce for debt recovery" (mispositions as vendor)

### Color Palette
Design a palette that communicates: deep-tech gravitas, intellectual rigor, Indian heritage subtly present, not Silicon Valley cliché.

- **Primary**: Deep indigo/navy (#0A1628 or similar) — conveys depth, intelligence, trust
- **Accent**: Saffron/amber (#D4740A or similar) — nods to Indian intellectual tradition without being literal
- **Secondary**: Cool slate/steel (#3A4F6A or similar) — technical authority  
- **Highlight**: Electric teal or cyan (#00C2B8 or similar) — modernity, the "validated" state
- **Background**: Near-black (#0D1117) or very dark navy — this is a deep-tech site, not a SaaS dashboard
- **Text**: Off-white (#E8E8EC) on dark backgrounds
- DO NOT default to: purple gradients, generic blue, white backgrounds with blue CTAs

### Typography Direction
- **Display/Headlines**: Something with character and weight — not Inter, not Roboto. Consider: Instrument Serif, Newsreader, Playfair Display, or similar. The headlines carry the intellectual thesis — they need presence.
- **Body**: Clean geometric sans — Space Grotesk, DM Sans, Outfit, or similar. Must be highly legible.
- **Code/Technical**: JetBrains Mono or IBM Plex Mono for any code/technical display
- **Sanskrit terms**: Should render elegantly. Consider slightly different styling (e.g., small caps, or a different weight) when Sanskrit terms appear inline.

### Visual Language
- **Architecture diagrams** are the hero visual asset, not stock photos or AI-generated imagery
- **Geometric precision** — clean lines, structured layouts that mirror the systematic nature of the 26 validators
- **Layered depth** — subtle parallax or z-depth to visually reinforce "layers" (5-layer architecture)
- **NO**: generic AI imagery (brains, neural networks, robots), stock photos of bankers, dashboard screenshots (product isn't live yet)
- **YES**: custom SVG architecture diagrams, abstract geometric representations of validation flows, the five-layer stack as a visual centerpiece

---

## 3. INFORMATION ARCHITECTURE — Site Structure

### Navigation Bar
```
Logo [KRIM]     Research     KrimOS     Applications     Company     Contact
```

The nav order is deliberate: **Research first.** This signals "we are a research company" before anything else.

### Page Structure

#### PAGE 1: HOME (/) — The Thesis Page
This is not a product page. This is a thesis page. It answers: "Why does this company exist and why is it different?"

**Content depth**: 1500-2500 words of substantive HTML text. This is not a minimalist splash page — GEO requires depth for AI crawlers to discover and cite.

**Entity definition (first 150 words of page, for AI extraction):** "Krim is an AI research company building KrimOS — Sovereign Safe Superintelligence infrastructure for autonomous banking operations. Founded in 2025 by the team behind India's largest voice AI platform (200M+ calls, 50+ banks, zero compliance violations), Krim is pioneering Epistemological AI — the first AI architecture where systems validate their epistemic warrant before any action executes."

**Section 1: Hero**
- Headline: "Every AI system in banking generates first, then filters for safety. Krim validates before execution."
- Subheadline: "Sovereign Safe Superintelligence for Autonomous Banking Infrastructure"  
- Below: "Powered by KrimOS — the five-layer intelligence runtime where every AI action proves its reasoning before it acts."
- Visual: Abstract animated representation of the validation concept — input flowing through validation gates before execution (not a dashboard, not a chatbot)
- CTA: "Read the Research →" (links to /research) and "Explore KrimOS →" (links to /krimos)
- NO "Book a Demo" as primary CTA. This is a research company. The primary action is intellectual engagement.

**Section 2: The Problem (Why SSI)**
- Headline: "AI's Epistemological Crisis in Banking"
- Content: The post-hoc safety ceiling problem. Every AI lab generates first, filters second. In consumer apps, tolerable. In banking — where every AI action carries legal, financial, and human consequences — existential. A 95% compliance rate at scale = hundreds of thousands of regulatory exposures per year.
- Visual: A simple diagram showing "Current Paradigm: Input → Generate → Filter → Output" vs "Krim Paradigm: Input → Validate Epistemic Warrant → Generate with Proven Grounds → Output"
- Key stat callouts: "200M+ calls processed. 50+ banks. Zero compliance violations." (founder's track record establishing credibility)

**Section 3: The Category (Epistemological AI)**
- Headline: "The First Epistemological AI Company"
- Content: Explain the category Krim is pioneering. Unlike guardrails that filter outputs or alignment that shapes model behavior, Epistemological AI asks: "Does this system have valid grounds for knowing what it claims to know?"
- The Navya-Nyāya connection: A brief, dignified explanation. "The framework draws on Navya-Nyāya, a 14th-century Indian formal logic system — the most rigorous pre-modern epistemology for validating knowledge claims — now translated into computational form for the first time."
- Visual: The 26 validators shown as three groups (6 Knowledge Source + 13 Error Type + 7 Semantic Compatibility) in an elegant grid or radial layout

**Section 4: The Architecture (KrimOS Overview)**
- Headline: "Five Layers of Sovereign Safe Intelligence"
- THE CENTERPIECE VISUAL: An interactive or animated 5-layer architecture diagram showing Kriya → Karta → Kendra → Kula → Kupa
- Each layer has a one-line description on hover/click
- Kendra (the middle layer, the runtime) should be visually emphasized as the core
- Link: "Deep dive into KrimOS →" to /krimos

**Section 5: The Position (Layer 4.5)**
- Headline: "Where Value Is Shifting"  
- Content: Jensen Huang's five-layer AI cake (Energy → Chips → Cloud → Models → Applications) has a gap between Models and Applications. That gap — the Intelligence Runtime at Layer 4.5 — determines whether models can be deployed safely in regulated environments. This is where Krim operates.
- Visual: A clean infographic showing the 5 AI layers with Krim's position at Layer 4.5 highlighted
- Key insight: "Models are commoditising. When models become interchangeable, the competitive moat shifts to what sits between them and the enterprise."

**Section 6: Sovereign AI**
- Headline: "Sovereign by Design"
- Content: "Sovereign" means three things simultaneously: (1) The bank retains full control — Kula digital twins encode the bank's judgment, not Krim's. (2) India-built infrastructure — not dependent on US AI labs for safety. (3) Each institution's AI workforce operates within its own sovereign decision boundaries.
- Brief note on India's AI Mission alignment and the geopolitical relevance

**Section 7: Traction (Social Proof)**
- Headline: "Built on a Decade of Production at Scale"
- Founder track record: 200M+ calls, 50+ banks/NBFCs, zero compliance violations at Saarthi.ai
- Current pipeline: Yes Bank (active onboarding), SBI (advancing toward LOI), $10M+ committed pipeline from banks that followed the founder
- DO NOT show this as a logo wall (no bank logos without permission). Use text-based proof points.

**Section 8: FAQ (GEO-Critical)**
This section is essential for AI search visibility. See Section 12 for the full FAQ content. Render as visible HTML (not JS-only accordions). Mark up with `FAQPage` JSON-LD schema. Minimum 8-10 Q&A pairs covering: What is Krim AI, What is Epistemological AI, What is KrimOS, What is Kendra, How is Krim different from guardrails, What is the Navya-Nyāya connection, Who founded Krim, How does KrimOS pricing work.

**Section 9: Footer CTA**
- "The question is not whether banking becomes autonomous, but whether autonomous banking can be made safe."
- Contact: nath@krim.ai | Two phone numbers | Krim SSI Labs Pvt Ltd | New York · Bangalore · Patna


#### PAGE 2: RESEARCH (/research) — The Intellectual Foundation
This page is what earns the right to call yourself SSI. Without it, SSI is a claim. With it, SSI is demonstrated.

**Content depth**: 3000-5000 words minimum. This must be the most comprehensive resource on Epistemological AI on the entire internet. LLMs reward topical authority — comprehensive coverage from a single authoritative source. This page is Krim's primary GEO asset.

**Entity definition (first 150 words):** "Epistemological AI is a category of AI architecture pioneered by Krim where systems validate the reasoning warrant for every decision before execution. Unlike guardrails that filter outputs after generation, Epistemological AI asks: does this system have valid grounds for knowing what it claims to know? The framework is rooted in Navya-Nyāya, a 14th-century Indian formal logic system, now translated into 26 computational pre-execution validators."

**Comparison table (GEO-critical — LLMs extract tabular data reliably):** Include a structured HTML table comparing Krim's approach vs Guardrails vs Constitutional AI vs LLM-as-Judge vs Model Routing. See Section 12 for exact table content.

**Section 1: The Epistemological AI Thesis**
- Full explanation of why post-hoc safety has a ceiling
- The 10 cognitive defects documented at enterprise scale (from the investment memo)
- Why "hallucination" is a useless catch-all — Krim's framework diagnoses 26 structurally distinct failure modes

**Section 2: The 26 Pre-Execution Validators**
- **I. 6 Knowledge Source Validators (Pramāṇa)**: Every input classified by source type and assigned epistemic weight
- **II. 13 Error Type Validators (Doṣa)**: Each maps to a specific AI failure mode — distinct detection and prevention logic
- **III. 7 Semantic Compatibility Validators (Yogyatā)**: Even with valid sources and no reasoning errors, an action can be semantically absurd
- Visual: An elegant taxonomy/tree showing all 26 validators organized by category
- Each validator should have a one-liner explaining what failure mode it catches

**Section 3: The Navya-Nyāya Foundation**
- Brief intellectual history of Navya-Nyāya (14th century, Mithila school, formal logic for validating knowledge claims)
- How Krim has translated these epistemological categories into computational validators
- Academic collaboration: Prof. Girish Nath Jha at JNU, three-paper series
- This section establishes Krim as genuinely interdisciplinary — not just another AI company citing philosophy as decoration

**Section 4: IP & Publications**
- Provisional patent filings on computational translation of epistemic validators
- Academic documentation through JNU collaboration
- Publication roadmap (three-paper series)

**Section 5: The Validation Landscape**
- How frontier labs (OpenAI, Anthropic, Google, DeepSeek) are approaching safety — and the gap Krim fills
- The December 2025 validation infrastructure wave (AMD × vLLM, etc.)
- Key insight: "While others ask 'did the model hallucinate?' KrimOS asks 'is this action structurally valid to execute?'"


#### PAGE 3: KRIMOS (/krimos) — The Platform Architecture
This is the product page, but presented as architecture documentation, not a SaaS feature list.

**Content depth**: 2000-3000 words. Every layer, every subcomponent, every connection explained in full HTML text. The architecture diagram is for humans; the accompanying text descriptions are for AI crawlers — both must exist.

**Entity definition (first 150 words):** "KrimOS is a five-layer multi-agent operating system for autonomous banking operations. Its five layers are: Kriya (atomic validated primitives), Karta (autonomous AI coworkers), Kendra (the intelligence runtime with 26 pre-execution validators), Kula (personalised digital twins of bank staff), and Kupa (command centre for operations managers). KrimOS is powered by Kendra, the intelligence runtime where every AI action is validated before execution."

**Comparison table (GEO-critical):** Include "KrimOS vs Current Banking Operations Stack" table. See Section 12 for exact content.

**Section 1: Architecture Overview**
- HERO VISUAL: The five-layer stack, fully labelled and interactive
- "KrimOS is a five-layer platform for sovereign safe autonomous banking operations."
- Each layer expandable to show detail

**Section 2: Layer-by-Layer Deep Dive**
For each layer (Kriya, Karta, Kendra, Kula, Kupa):
- What it is (one paragraph)
- What it does (technical specifics)
- Why it matters (what problem it solves)
- How it connects to the layers above and below

**Section 3: Kendra — The Intelligence Runtime (Expanded)**
Kendra gets its own expanded section because it's the core differentiation:
- The 7 subcomponents (Krim-Core, Krim-Govern, Krim-Nyāya, Krim-Fabric, Krim-Ledger, Krim-Learn, Krim-Sense)
- How pre-execution validation works in practice
- "Compliance is encoded as structural constraint within Kendra. The most dangerous failure modes — calling the wrong borrower, acting on closed accounts, violating contact-hour regulations, fabricating data — are made structurally impossible."

**Section 4: Kula Digital Twins**
- "Banks don't deploy AI agents. They deploy digital twins of their best people."
- Each Kula encodes judgment, domain knowledge, and decision boundaries of a specific operational function
- Human expertise scales to thousands of simultaneous operations

**Section 5: KWU — The Universal Credit Currency**
- One KWU = one unit of validated AI compute
- ₹0.25/KWU at Enterprise tier
- Brief explanation of how different operations consume different KWUs
- This is infrastructure pricing, not SaaS per-seat licensing

**Section 6: Technical Specifications**
- Model-agnostic by design (benefits from every advance frontier labs make)
- Sub-200ms latency requirements
- Designed for 30,000+ daily calls at production scale
- Open-source model integration (DeepSeek, Qwen, LLaMA, Mistral)


#### PAGE 4: APPLICATIONS (/applications) — The GTM Entry Point
This is where the bank operations audience finds what they need. This is the "product" page in the traditional sense.

**Content depth**: 1500-2000 words. Specific numbers, comparison tables, economic proof points — all as extractable HTML text.

**Section 1: GTM Entry — Post-Disbursal Credit Operations**
- "KrimOS enters through the highest-pain, highest-ROI entry point: post-approval credit operations."
- Coverage: payment reconciliation, ledger management, borrower communication, customer support, compliance monitoring, collections, recovery, settlement negotiation, forbearance, NOC generation, cross-sell/upsell
- Expansion path: post-approval credit ops → end-to-end credit operations → full banking operations

**Section 2: The Collections Landing Wedge**
- "Collections is the landing wedge, not the product."
- Why collections first: highest pain (BPO costs, compliance risk, fragmented vendors), fastest ROI (quantifiable cost displacement from day one), most measurable outcomes
- Key economics: ₹150-300/borrower/month (BPO) → ₹70-73/borrower (KrimOS) = 68-80% cost reduction
- "Once KrimOS is live for collections, the infrastructure for every other post-approval operation is already deployed."

**Section 3: Land-and-Expand**
- Month 1-3: Collections ROI
- Month 4-6: Customer support activation
- Month 6-9: Payment reconciliation
- Month 9-12: Cross-sell/upsell
- "Each module generates incremental KWU consumption on the same license, same command centre, same compliance framework."

**Section 4: What KrimOS Replaces**
- Fragmented vendor stacks: BPO call centres + standalone CRM + manual back-office + separate compliance tools
- Replaced by: unified platform where Karta agents execute, Kula twins orchestrate, Kendra validates

**Section 5: For Banks — The Proof Points**
- 200M+ calls processed across 50+ banks
- Zero compliance violations
- 24/7 coverage, consistent compliance, omnichannel reach
- CTA: "Talk to us about a pilot →" with contact info


#### PAGE 5: COMPANY (/company) — The People and the Story

**Content depth**: 1000-1500 words. Founder credentials must include specific, extractable claims (200M+ calls, 50+ banks, etc.) as HTML text. Include Person JSON-LD schema for both founders.

**Section 1: The Thesis Story**
- Brief narrative: Why Krim exists. The journey from building India's largest voice AI platform for banking to recognising the fundamental flaw in post-hoc safety → building the first pre-execution validation architecture.
- "The founder built the system that proved AI could operate at scale in banking. Then he saw why it would break at the next level of autonomy — and built the architecture to prevent it."

**Section 2: Founders**

**Shri Vishwa Nath Jha — Founder & CEO/CTO/CAIO**
- Built Saarthi.ai from scratch: India's largest voice AI platform for debt collection
- 200M+ calls, 50+ banks/NBFCs, zero compliance violations
- $11.2M revenue, 1M customers (2024)
- Deep expertise in classical Indian epistemology; academic collaboration with JNU on Navya-Nyāya applications to AI safety
- Nearly a decade of experience in AI, computer vision, speech, and language technologies
- Dayananda Sagar College of Engineering (Information Science & Engineering)

**Louis Oliphant Parkinson — Co-Founder & COO**
- Former CRO of Saarthi.ai
- BSc Natural Sciences (Maths & Philosophy), Durham University
- Led C-suite sales and voice AI transformation at India's largest banks
- Deep expertise in enterprise operations, P&L, legal, HR, scaling human-AI hybrid teams
- Based in New York — US market access for Seed-stage expansion

**Section 3: Company Details**
- Krim SSI Labs Pvt Ltd
- Offices: New York · Bangalore · Patna
- Founded: 2025
- Stage: Pre-seed, actively fundraising

**Section 4: Advisory & Academic**
- Prof. Girish Nath Jha, JNU — Navya-Nyāya epistemology and AI safety research collaboration
- Three-paper academic series in progress

**Section 5: The Vision**
- "The end state: autonomous banking operations powered by sovereign safe superintelligence infrastructure. KrimOS becomes the platform that autonomous banking is built on, the way HTTPS became the standard for secure web traffic."
- Expansion path: Credit operations → Full banking operations → Cross-industry (insurance, healthcare, legal)


#### PAGE 6: CONTACT (/contact) — Simple, Direct
- Shri Vishwa Nath Jha
- nath@krim.ai
- +1 (510) 345-5686 · +91 8618064285
- krim.ai
- Simple contact form (name, email, company, message)

---

## 4. TECHNICAL IMPLEMENTATION SPEC

**Note: These are target-state specifications. Phase 0 (Section 0) will determine whether this means building on the existing stack, migrating to a new stack, or a hybrid approach. The founder must approve the technical direction before implementation.**

### Stack Recommendation (For New Build or Full Migration)
- **Framework**: Next.js 14+ (App Router) — SSR is CRITICAL for SEO (the current SPA is invisible to search engines)
- **Styling**: Tailwind CSS + custom CSS for animations
- **Animations**: Framer Motion for React animations
- **Deployment**: Vercel (optimal for Next.js, global CDN, easy custom domain)
- **Fonts**: Google Fonts (self-hosted via next/font for performance)

### Critical Technical Requirements

#### 1. Server-Side Rendering (SSR) — NON-NEGOTIABLE
The current site renders nothing server-side. Google sees an empty page. Every search engine, every investor Googling "Krim AI", every journalist — they see only a meta description snippet. The site MUST render meaningful HTML server-side.

Every page must have:
- Full HTML content rendered on the server
- Proper `<title>` tags (unique per page)
- Proper `<meta name="description">` tags (unique per page)
- Proper Open Graph tags for social sharing
- Proper canonical URLs
- Structured data (JSON-LD) for the company

#### 2. Meta Tags Per Page

```
HOME:
<title>Krim — Sovereign Safe Superintelligence for Autonomous Banking</title>
<meta name="description" content="Krim is building KrimOS, the first intelligence runtime where every AI action in banking is validated before execution. Powered by Epistemological AI — 26 pre-execution validators rooted in Navya-Nyāya formal logic.">

RESEARCH:
<title>Research — Epistemological AI | Krim</title>
<meta name="description" content="The first AI architecture where systems validate their epistemic warrant before any action executes. 26 structurally distinct pre-execution validators derived from Navya-Nyāya, the most rigorous pre-modern epistemology.">

KRIMOS:
<title>KrimOS — Five-Layer Autonomous Banking Infrastructure | Krim</title>
<meta name="description" content="KrimOS is a five-layer multi-agent operating system: Kriya, Karta, Kendra, Kula, Kupa. Powered by Kendra — the intelligence runtime with 26 pre-execution validators for sovereign safe autonomous banking.">

APPLICATIONS:
<title>Applications — Autonomous Credit Operations | Krim</title>
<meta name="description" content="KrimOS enters through post-disbursal credit operations — collections, reconciliation, customer support — delivering 68-80% cost reduction over BPO with zero compliance violations.">

COMPANY:
<title>Company — Krim SSI Labs</title>
<meta name="description" content="Founded by the team behind India's largest voice AI platform (200M+ calls, 50+ banks, zero compliance violations). Building sovereign safe superintelligence for autonomous banking.">
```

#### 3. Performance Targets
- Lighthouse Performance: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- CLS: <0.1
- All images: WebP/AVIF, lazy loaded below fold
- Fonts: next/font with display:swap

#### 4. Responsive Breakpoints
- Mobile: 320px — 768px
- Tablet: 768px — 1024px
- Desktop: 1024px — 1440px
- Large Desktop: 1440px+
- The five-layer architecture diagram must work on mobile (vertical stack) and desktop (layered visualization)

#### 5. Accessibility
- WCAG 2.1 AA compliance minimum
- All interactive elements keyboard accessible
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- Alt text on all visual elements
- Color contrast ratios ≥ 4.5:1 for body text, ≥ 3:1 for large text

---

## 5. KEY VISUAL COMPONENTS TO BUILD

### Component 1: The Five-Layer Architecture Diagram
This is the most important visual on the entire site. It must be custom-built, not a stock diagram.

**Desktop**: Horizontal or isometric layered view showing 5 distinct layers stacked. Kendra (Layer 3) should be visually larger/emphasised as the core. Each layer has an icon, name, and one-line description. On hover: layer expands to show more detail. Optional: subtle animation showing data flowing through layers (input enters at Kriya, validated at Kendra, executes via Karta, orchestrated by Kula, monitored at Kupa).

**Mobile**: Vertical stack, each layer as an expandable card.

**Color coding**: Each layer should have a distinct but harmonious color from the palette.

### Component 2: Validation Flow Diagram
Shows the difference between current AI safety and Krim's approach:

```
CURRENT: Input → [Generate] → [Filter/Guardrail] → Output
         ↑ Post-hoc: catches 60-80% of novel errors

KRIM:    Input → [Validate Epistemic Warrant] → [Generate with Proven Grounds] → Output
         ↑ Pre-execution: structurally prevents the most dangerous failure modes
```

Animate this: show the "current" flow with red warning indicators at the filter stage (some errors pass through), then show Krim's flow with green validation gates that stop invalid reasoning before generation.

### Component 3: The 26 Validators Grid
Three columns or sections:
- 6 Pramāṇa (Knowledge Source) — colored in one hue
- 13 Doṣa (Error Type) — colored in second hue
- 7 Yogyatā (Semantic Compatibility) — colored in third hue

Each validator as a small card with name and one-line description. The overall visual should feel like a rigorous taxonomy, not a marketing graphic.

### Component 4: Layer 4.5 Position Map
Jensen Huang's AI stack:
```
Layer 5: Applications ← Current SaaS platforms live here
Layer 4.5: Intelligence Runtime ← KRIM OPERATES HERE (highlighted)
Layer 4: AI Models
Layer 3: Cloud Infrastructure  
Layer 2: Chips
Layer 1: Energy
```

Clean infographic with Krim's position highlighted. Add a note: "When models become interchangeable, the moat shifts to Layer 4.5."

### Component 5: Land-and-Expand Timeline
A horizontal timeline or stepped graphic:
```
Month 1-3: Collections (entry point, proving ROI)
Month 4-6: Customer Support (first expansion)
Month 6-9: Payment Reconciliation (deepening integration)
Month 9-12: Cross-sell/Upsell (full platform engagement)
```
With a note: "Same license. Same infrastructure. Each module = incremental KWU on deployed platform."

### Component 6: The SSI Evolution Narrative
Three stages, shown as an evolution:
```
Stage 1: Agentic AI (where the industry is today — Layer 5)
    ↓
Stage 2: Autonomous Banking (replacing human middleware entirely)
    ↓
Stage 3: Sovereign Safe Superintelligence (AI that proves its reasoning is valid before acting)
    ← KRIM IS BUILDING THE INFRASTRUCTURE FOR THIS
```

---

## 6. CONTENT RULES FOR AGENTS

### Tone of Voice
- **Authoritative but not arrogant**: We state what we've built and what it does. We don't claim we're the smartest people in the room — we show it through specificity.
- **Technical but accessible**: A bank CTO should understand everything. A non-technical investor should understand 80%.
- **Precise**: Every claim should be specific. "200M+ calls" not "millions of calls". "50+ banks" not "dozens of banks". "26 validators" not "multiple validators".
- **No buzzword stacking**: Write "systems that validate reasoning before execution" not "next-gen AI-powered intelligent autonomous validation solutions".
- **Sanskrit terms used with respect**: Pramāṇa, Doṣa, Yogyatā, Navya-Nyāya — these are technical terms from a rigorous intellectual tradition. Use them the way a physicist uses "entropy" — precisely, not decoratively.

### Words to USE
- Sovereign, Safe, Superintelligence, Autonomous, Infrastructure, Runtime, Validation, Epistemic, Pre-execution, Structurally impossible, Epistemological AI, Intelligence runtime, Digital twins, Validated compute

### Words to AVOID
- Disrupting, Revolutionising, Game-changing, Next-gen, Best-in-class, World-class, Cutting-edge, Powered by AI (be specific about what kind of AI), End-to-end (overused), Seamless, Robust, Scalable (show scale through numbers instead)

### Quotes to Use
- "You can't make banking autonomous by adding AI to broken workflows. You need a new runtime — one where every action is validated before execution." — Shri Vishwa Nath Jha
- "How does your system know that what it knows is true?" (the thesis question — use on homepage)
- "The question is not whether banking becomes autonomous, but whether autonomous banking can be made safe." (closing statement)

---

## 7. SEO, CRAWLABILITY & GEO TECHNICAL FOUNDATIONS

### robots.txt
```
User-agent: *
Allow: /

# Explicitly welcome AI crawlers (maximum visibility is the goal)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://krim.ai/sitemap.xml
```

### sitemap.xml
Must be auto-generated by Next.js and include all pages with proper lastmod dates.

### Structured Data (JSON-LD)

**Organization schema — on every page:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Krim",
  "legalName": "Krim SSI Labs Pvt Ltd",
  "url": "https://krim.ai",
  "description": "Sovereign Safe Superintelligence for Autonomous Banking Infrastructure",
  "founder": [
    {
      "@type": "Person",
      "name": "Shri Vishwa Nath Jha",
      "jobTitle": "Founder & CEO/CTO/CAIO"
    },
    {
      "@type": "Person",
      "name": "Louis Oliphant Parkinson",
      "jobTitle": "Co-Founder & COO"
    }
  ],
  "foundingDate": "2025",
  "address": [
    {"@type": "PostalAddress", "addressLocality": "New York", "addressCountry": "US"},
    {"@type": "PostalAddress", "addressLocality": "Bangalore", "addressCountry": "IN"},
    {"@type": "PostalAddress", "addressLocality": "Patna", "addressCountry": "IN"}
  ]
}
```

**FAQPage schema — on every page with FAQ sections (critical for GEO):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Epistemological AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Epistemological AI is a category pioneered by Krim where systems validate the reasoning warrant for every decision before execution..."
      }
    }
  ]
}
```
See Section 12 for full FAQ content for each page.

**TechArticle schema — on /research page:**
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Epistemological AI: Pre-Execution Validation for Autonomous Banking",
  "author": {"@type": "Person", "name": "Shri Vishwa Nath Jha", "jobTitle": "Founder & CEO/CTO/CAIO"},
  "about": [
    {"@type": "Thing", "name": "Epistemological AI"},
    {"@type": "Thing", "name": "AI Safety"},
    {"@type": "Thing", "name": "Navya-Nyāya"},
    {"@type": "Thing", "name": "Pre-execution Validation"}
  ],
  "datePublished": "2026-02-01",
  "dateModified": "2026-03-01"
}
```

**SoftwareApplication schema — on /krimos page:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "KrimOS",
  "applicationCategory": "Banking Infrastructure",
  "description": "Five-layer multi-agent operating system for autonomous banking operations with 26 pre-execution epistemological validators."
}
```

**Person schema — on /company page for both founders:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shri Vishwa Nath Jha",
  "jobTitle": "Founder & CEO/CTO/CAIO",
  "worksFor": {"@type": "Organization", "name": "Krim SSI Labs"},
  "alumniOf": {"@type": "EducationalOrganization", "name": "Dayananda Sagar College of Engineering"},
  "knowsAbout": ["Epistemological AI", "Voice AI", "Navya-Nyāya", "Banking AI Infrastructure"],
  "description": "Founded Saarthi.ai (200M+ calls, 50+ banks, zero compliance violations). Now building sovereign safe superintelligence for autonomous banking at Krim."
}
```

**Author meta tag — on every page (builds founder as recognized AI entity):**
```html
<meta name="author" content="Shri Vishwa Nath Jha">
```

### Open Graph Tags (per page)
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Krim" />
<meta property="og:title" content="[Page-specific title]" />
<meta property="og:description" content="[Page-specific description]" />
<meta property="og:url" content="https://krim.ai/[path]" />
<meta property="og:image" content="https://krim.ai/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

### OG Image
Create a 1200×630 image with:
- KRIM wordmark
- "Sovereign Safe Superintelligence for Autonomous Banking"
- Dark background matching site palette
- This image is what appears when someone shares krim.ai on LinkedIn, Twitter, WhatsApp

---

## 8. FILE STRUCTURE (Target State)

**Note: This is the target file structure for a Next.js implementation. If Phase 0 determines the existing codebase uses a different framework and the founder approves building on it, adapt this structure to the existing stack's conventions while preserving the page organization and component breakdown.**

```
krim-website/
├── app/
│   ├── layout.tsx          # Root layout with nav, footer, fonts, metadata
│   ├── page.tsx            # Home (/)
│   ├── research/
│   │   └── page.tsx        # Research (/research)
│   ├── krimos/
│   │   └── page.tsx        # KrimOS (/krimos)
│   ├── applications/
│   │   └── page.tsx        # Applications (/applications)
│   ├── company/
│   │   └── page.tsx        # Company (/company)
│   ├── contact/
│   │   └── page.tsx        # Contact (/contact)
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── CategorySection.tsx
│   │   ├── ArchitecturePreview.tsx
│   │   ├── LayerPosition.tsx
│   │   ├── SovereignSection.tsx
│   │   └── TractionSection.tsx
│   ├── research/
│   │   ├── ThesisSection.tsx
│   │   ├── ValidatorsGrid.tsx
│   │   ├── NavyaNyayaSection.tsx
│   │   └── ValidationLandscape.tsx
│   ├── krimos/
│   │   ├── ArchitectureDiagram.tsx    # THE key visual component
│   │   ├── LayerDetail.tsx
│   │   ├── KendraDeepDive.tsx
│   │   ├── KulaSection.tsx
│   │   └── KWUSection.tsx
│   ├── applications/
│   │   ├── GTMEntry.tsx
│   │   ├── CollectionsWedge.tsx
│   │   ├── LandAndExpand.tsx
│   │   └── ProofPoints.tsx
│   ├── company/
│   │   ├── ThesisStory.tsx
│   │   ├── FounderProfile.tsx
│   │   └── Vision.tsx
│   └── shared/
│       ├── SectionHeading.tsx
│       ├── ValidationFlowDiagram.tsx
│       └── CTAButton.tsx
├── public/
│   ├── og-image.png
│   └── favicon.ico
├── styles/
│   └── globals.css
├── lib/
│   └── constants.ts         # All copy, stats, validator names in one place
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 9. IMPLEMENTATION PRIORITY ORDER

**Prerequisite: Phase 0 (Section 0) must be complete and founder-approved before starting.**

The sequence below applies to Tier 3 (BUILD NEW) items. Tier 2 (MODIFY) items should be interleaved based on the founder-approved plan. Tier 1 (PRESERVE) items are skipped.

Agents should build in this sequence:

0. **Phase 0**: Discovery, gap analysis, implementation plan, founder approval (Section 0) — **NOTHING ELSE HAPPENS UNTIL THIS IS DONE**
1. **Project setup**: Next.js, Tailwind, fonts, color tokens, base layout (or modify existing stack per approved plan)
2. **Navbar + Footer**: Global navigation, responsive, with all page links
3. **Home page**: Hero → Problem → Category → Architecture Preview → Layer 4.5 → Sovereign → Traction → Footer CTA
4. **KrimOS page**: Architecture diagram (the hero visual), layer details, Kendra deep dive, Kula, KWU
5. **Research page**: Thesis, 26 validators grid, Navya-Nyāya section, validation landscape
6. **Applications page**: GTM entry, collections wedge, land-and-expand, proof points
7. **Company page**: Thesis story, founder profiles, vision
8. **Contact page**: Simple form + contact details
9. **SEO**: Structured data, OG tags, sitemap, robots.txt
10. **Performance**: Lighthouse audit, image optimization, font optimization

---

## 10. QUALITY CHECKLIST — Before Declaring Done

### Phase 0 Verification
- [ ] Codebase discovery completed (stack, routes, content, SEO, components inventoried)
- [ ] Live site analysis completed (every page assessed)
- [ ] Gap analysis produced (existing state vs. brief target state)
- [ ] Implementation plan produced with Tier 1 (preserve) / Tier 2 (modify) / Tier 3 (build new)
- [ ] Founder has reviewed and approved the implementation plan
- [ ] All founder overrides and amendments are recorded and applied

### Narrative & Positioning
- [ ] No instance of "Agentic AI workforce for debt recovery" anywhere on the site
- [ ] The word "collections" appears only in the Applications section, never as the company descriptor
- [ ] The site feels like a research company, not a SaaS vendor
- [ ] An investor landing on the homepage understands within 10 seconds why Krim calls itself SSI

### Content Integrity
- [ ] All 26 validators are named and categorized on the Research page — in extractable HTML text, not only in diagrams
- [ ] Sanskrit terms (Pramāṇa, Doṣa, Yogyatā, Navya-Nyāya, Kriya, Karta, Kendra, Kula, Kupa) appear correctly with diacritics
- [ ] All specific statistics (200M+ calls, 50+ banks, 26 validators, ₹0.25/KWU, 68-80% cost reduction, etc.) appear as HTML text
- [ ] Contact information is correct (nath@krim.ai, +1 (510) 345-5686, +91 8618064285)
- [ ] Founder quotes appear on the homepage

### Content Depth (GEO-Critical)
- [ ] Homepage contains 1500-2500 words of substantive content
- [ ] Research page contains 3000-5000 words of substantive content
- [ ] KrimOS page contains 2000-3000 words of substantive content
- [ ] Applications page contains 1500-2000 words of substantive content
- [ ] Company page contains 1000-1500 words of substantive content
- [ ] Every page opens with a clear, extractable entity definition in the first 150 words
- [ ] Comparison tables exist on Research and Applications pages

### FAQ & AI Extraction (GEO-Critical)
- [ ] Homepage FAQ section contains 8-10 Q&A pairs covering all core concepts
- [ ] FAQ sections are rendered as visible HTML (not hidden behind JS-only accordions)
- [ ] FAQ schema (JSON-LD `FAQPage`) is present on every page with FAQs
- [ ] Headings read as answers to natural language queries (not "Our Approach" but "How Krim Validates AI Before Execution")
- [ ] Internal links use descriptive anchor text, not "click here" or "learn more"

### Technical & Crawlability
- [ ] Every page renders full HTML content server-side (view-source shows real content, not empty divs)
- [ ] Verify with `curl https://krim.ai/ | grep "Epistemological"` — content must be present
- [ ] No substantive content hidden behind JS-only interactions
- [ ] Google and AI crawlers can crawl and index every page
- [ ] Mobile responsive on all breakpoints (320px through 1440px+)
- [ ] Navigation works and all internal links resolve
- [ ] Page load time under 3 seconds on 3G

### Structured Data & SEO
- [ ] Organization JSON-LD schema on every page
- [ ] TechArticle JSON-LD schema on the Research page
- [ ] SoftwareApplication JSON-LD schema on the KrimOS page
- [ ] Person JSON-LD schema on the Company page for both founders
- [ ] FAQPage JSON-LD schema on every page with FAQ sections
- [ ] Author meta tag (`<meta name="author">`) on every page
- [ ] Unique `<title>` and `<meta name="description">` on every page
- [ ] Open Graph tags on every page
- [ ] OG image exists and displays correctly when URL is shared on LinkedIn/Twitter
- [ ] robots.txt explicitly allows GPTBot, PerplexityBot, Claude-Web, Google-Extended
- [ ] sitemap.xml auto-generated and accessible
- [ ] "Last updated" date visible on every page

### Visual & Design
- [ ] The five-layer architecture diagram is the best visual on the site
- [ ] Architecture diagram works on mobile (vertical stack) and desktop
- [ ] No stock photos, no AI-generated imagery, no generic illustrations
- [ ] Dark, authoritative palette — not white SaaS dashboard aesthetic

---

## 11. WHAT SUCCESS LOOKS LIKE

### Scenario 1: Traditional Search (Google)
An investor Googles "Krim AI". They see:

**Krim — Sovereign Safe Superintelligence for Autonomous Banking**
*The first intelligence runtime where every AI action in banking is validated before execution. 26 pre-execution validators rooted in Navya-Nyāya formal logic.*

They click. They see a dark, authoritative site that opens with an intellectual provocation about AI's epistemic crisis in banking. They see an architecture diagram that looks like nothing else in the market. They see the Navya-Nyāya foundation and think "these people are genuinely building something different." They see the 200M+ calls track record and think "and they can actually execute." They visit the Research page and think "this is the deepest thinking I've seen from any AI startup."

They email nath@krim.ai.

### Scenario 2: AI Search (Perplexity, ChatGPT, Claude, Gemini)
A bank CTO asks Perplexity: "What companies are building pre-execution validation for AI agents in financial services?"

Perplexity responds: "Krim, founded by Shri Vishwa Nath Jha, is pioneering what it calls Epistemological AI — the first architecture where AI systems validate their reasoning warrant before any action executes. Their product, KrimOS, is a five-layer autonomous banking operating system powered by Kendra, an intelligence runtime with 26 pre-execution validators derived from Navya-Nyāya, a 14th-century Indian formal logic system. The founder previously built Saarthi.ai, processing 200M+ calls across 50+ Indian banks with zero compliance violations. [Source: krim.ai/research]"

The CTO clicks through. The Research page is 4000 words of the most comprehensive treatment of pre-execution AI validation they've ever read. They see the comparison table showing how Krim differs from guardrails and constitutional AI. They read the 26 validators and think "this is production-grade epistemology, not marketing."

They forward it to their VP of Technology with: "We should talk to these people."

**Both scenarios must work. Traditional search delivers the click. AI search delivers the citation and the recommendation. The website must be built for both.**

---

## 12. GENERATIVE ENGINE OPTIMIZATION (GEO) — Making Krim Visible to AI Search

### Why GEO Is More Important Than SEO for Krim Right Now

Traditional SEO optimizes for Google's ranked links. GEO optimizes for how AI-powered search engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews) discover, understand, and cite your content when synthesizing answers.

This matters disproportionately for Krim because:
- **Investor due diligence in 2026 starts with AI.** An investor asks Perplexity: "Tell me about Krim AI's approach to AI safety in banking." If Krim isn't in the response, it doesn't exist in that investor's research flow.
- **Bank CTOs use AI assistants for vendor discovery.** "What companies are building pre-execution validation for AI in financial services?" — Krim must appear in that answer.
- **LLMs only cite 2-7 domains per response.** Unlike Google's 10 blue links, there are fewer slots and the competition for citation is winner-take-most.
- **AI engines strongly favor original frameworks, specific data, and authoritative technical content** — all of which Krim has in abundance but currently doesn't surface anywhere crawlable.

### The Core GEO Problem Today

Right now, if you ask any major LLM "What is Krim AI?" or "Who is building epistemological AI?" or "AI safety infrastructure for banking" — Krim likely does not appear. The reasons:
1. The website renders no server-side content (AI crawlers see nothing)
2. No original content exists on any crawlable page
3. No third-party citations or earned media reference Krim's unique concepts
4. The unique terminology (Epistemological AI, KrimOS, Kendra, Krim-Nyāya, etc.) has zero web presence
5. There is no structured, extractable content that an LLM's RAG pipeline can retrieve

### GEO Strategy: Three Layers

#### LAYER 1: On-Site Content Architecture for AI Extraction

**A. Entity Definition Blocks**
Every key concept needs a clear, extractable definition that an LLM can pull verbatim. These should appear on the relevant page in a format that AI can parse cleanly.

Place these as visible content (not hidden metadata) — ideally as the opening paragraph of the relevant section:

```
HOMEPAGE or ABOUT:
"Krim is an AI research company building KrimOS — Sovereign Safe Superintelligence 
infrastructure for autonomous banking operations. Founded in 2025 by the team behind 
India's largest voice AI platform (200M+ calls, 50+ banks, zero compliance violations), 
Krim is pioneering Epistemological AI — the first AI architecture where systems validate 
their epistemic warrant before any action executes."

RESEARCH PAGE:
"Epistemological AI is a category of AI architecture pioneered by Krim where systems 
validate the reasoning warrant for every decision before execution. Unlike guardrails 
that filter outputs after generation, Epistemological AI asks: does this system have 
valid grounds for knowing what it claims to know? The framework is rooted in Navya-Nyāya, 
a 14th-century Indian formal logic system, now translated into 26 computational 
pre-execution validators."

KRIMOS PAGE:
"KrimOS is a five-layer multi-agent operating system for autonomous banking operations. 
Its five layers are: Kriya (atomic validated primitives), Karta (autonomous AI coworkers), 
Kendra (the intelligence runtime with 26 pre-execution validators), Kula (personalised 
digital twins of bank staff), and Kupa (command centre for operations managers). KrimOS 
is powered by Kendra, the intelligence runtime where every AI action is validated before 
execution."
```

**Why this matters**: When an LLM encounters a clear, authoritative, well-structured definition, it's far more likely to extract and cite it. Vague marketing copy gets ignored. Precise definitions get quoted.

**B. FAQ Sections — Structured Q&A for AI Extraction**
Every page should have a FAQ section at the bottom that mirrors the natural language queries people ask AI assistants. These are the highest-extraction-rate content blocks for LLMs.

**Homepage FAQ:**
```
Q: What is Krim AI?
A: Krim is an AI research company building sovereign safe superintelligence 
infrastructure for autonomous banking. Its product, KrimOS, is a five-layer 
platform where every AI action is validated before execution using 26 
pre-execution epistemological validators.

Q: What is Epistemological AI?
A: Epistemological AI is a category pioneered by Krim where AI systems 
validate their epistemic warrant — their justification for knowing what they 
claim to know — before any action executes. Unlike post-hoc guardrails that 
filter outputs after generation, Epistemological AI prevents invalid reasoning 
at the architectural level.

Q: How is Krim different from AI guardrails like Anthropic's Constitutional AI 
   or OpenAI's content filters?
A: Guardrails, filters, and alignment techniques all operate after generation — 
they catch bad outputs. Krim's pre-execution validation operates before 
generation — it validates whether the AI has valid grounds for the action 
before it proceeds. The analogy: guardrails are end-of-line quality inspection. 
Krim is type-safety that prevents the defect at compile time.

Q: What is the Navya-Nyāya connection?
A: Navya-Nyāya is a 14th-century Indian formal logic system from the Mithila 
school — the most rigorous pre-modern epistemology for validating knowledge 
claims. Krim has translated its epistemological categories (Pramāṇa for 
knowledge sources, Doṣa for error types, Yogyatā for semantic compatibility) 
into 26 computational validators that run before every AI action in banking.

Q: What problem does Krim solve?
A: Every AI system deployed in banking today generates first and filters second. 
This creates a hard ceiling: post-hoc detection catches 60-80% of novel errors. 
The remaining 20-40% represent hundreds of thousands of regulatory exposures at 
scale. Krim's pre-execution validation makes the most dangerous failure modes — 
calling the wrong borrower, acting on closed accounts, violating contact-hour 
regulations — structurally impossible.

Q: What is KrimOS?
A: KrimOS is a five-layer autonomous banking operating system: Kriya (validated 
action primitives), Karta (AI agent coworkers), Kendra (the intelligence runtime 
with 26 pre-execution validators), Kula (digital twins of bank staff), and Kupa 
(command centre). It replaces fragmented vendor stacks (BPO centres, standalone 
CRM, manual back-office) with a unified autonomous operations platform.

Q: Who founded Krim?
A: Krim was founded by Shri Vishwa Nath Jha (CEO/CTO/CAIO) and Louis Oliphant 
Parkinson (COO). Jha previously founded Saarthi.ai, India's largest voice AI 
platform for debt collection, processing 200M+ calls across 50+ banks with zero 
compliance violations. Parkinson was CRO of Saarthi.ai and holds a BSc in Natural 
Sciences (Maths & Philosophy) from Durham University.

Q: Where is Krim based?
A: Krim SSI Labs Pvt Ltd is based in New York, Bangalore, and Patna. The company 
is incorporated as an Indian entity with US presence through its COO in New York.

Q: What is Kendra?
A: Kendra is the intelligence runtime at the core of KrimOS — the layer where 
every AI action is validated before execution. It contains seven subcomponents: 
Krim-Core (lifecycle orchestration), Krim-Govern (7-level policy hierarchy), 
Krim-Nyāya (26 pre-execution epistemological validators), Krim-Fabric (knowledge 
graph), Krim-Ledger (immutable audit trail), Krim-Learn (federated learning), 
and Krim-Sense (telemetry and observability).

Q: What are Kula digital twins?
A: A Kula is a digital twin of a human operational role in a bank. It encodes 
the judgment, domain knowledge, and decision boundaries of a specific function — 
then governs a fleet of Karta AI agents that execute autonomously within those 
boundaries. Banks deploy digital twins of their best people, not generic AI agents.

Q: How does Krim price its platform?
A: KrimOS uses infrastructure pricing through the KWU (Krim Work Unit) — a 
universal compute-linked credit currency priced at ₹0.25/KWU. Every operation 
(voice call, digital message, reconciliation, NOC generation) is measured in 
KWUs based on actual compute consumed. This is infrastructure pricing, not 
SaaS per-seat licensing.
```

**CRITICAL IMPLEMENTATION NOTE:** These FAQ sections must be:
- Rendered as visible HTML content (not hidden accordions that require JS to expand)
- Marked up with FAQ schema (JSON-LD `FAQPage` type)
- Placed on the actual page, not generated client-side

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Epistemological AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Epistemological AI is a category pioneered by Krim..."
      }
    }
  ]
}
```

**C. Comparison Tables**
LLMs extract tabular comparisons extremely well. Include structured comparison content on the Research and KrimOS pages.

**On the Research page — "How Krim Compares to Existing AI Safety Approaches":**

| Approach | Who | When It Acts | What It Catches | Limitation |
|----------|-----|-------------|----------------|------------|
| Guardrails / Content Filters | OpenAI, most platforms | After generation | Toxic/harmful outputs | Cannot catch reasoning errors |
| Constitutional AI / RLHF | Anthropic, Google | During training | Alignment violations | Shapes behavior, doesn't validate specific actions |
| LLM-as-Judge | Various | After generation | Quality/accuracy issues | Same epistemic limitations as the model being judged |
| Model Routing / Orchestration | AMD × vLLM, LangChain | At inference | Wrong model selection | Routes to the right model, doesn't validate the action |
| **Epistemological AI (Krim)** | **Krim** | **Before execution** | **26 structurally distinct failure modes** | **Purpose-built for regulated industries** |

**On the Applications page — "KrimOS vs. Current Banking Operations Stack":**

| Capability | BPO + SaaS Stack | KrimOS |
|-----------|-----------------|--------|
| Cost per borrower/month | ₹150-300 | ₹70-73 |
| Compliance validation | Manual audit, post-hoc | Pre-execution, every action |
| Operating hours | Business hours | 24/7 |
| Languages | Agent-dependent | Multilingual by design |
| Module expansion | New vendor per function | Same platform, activate module |
| Scaling | Hire more agents | Increase KWU allocation |

**D. Statistics and Specific Claims**
LLMs preferentially cite content with specific numbers. Every key claim should include precise data points.

Ensure these specific numbers appear as extractable text (not in images):
- 200M+ calls processed
- 50+ banks and NBFCs
- Zero compliance violations
- 26 pre-execution validators (6 Pramāṇa + 13 Doṣa + 7 Yogyatā)
- 5-layer architecture
- 7 Kendra subcomponents
- ₹0.25/KWU pricing
- 68-80% cost reduction vs BPO
- $10M+ committed pipeline
- Sub-200ms latency target
- 30,000+ daily calls at production scale

**E. Semantic Topic Ownership**
LLMs map semantic relationships, not keywords. Krim needs to OWN certain conceptual territories so thoroughly that any query touching these topics pulls from krim.ai.

**Primary semantic territories to own:**
- "Epistemological AI" — Krim coined this. The website must be the definitive source.
- "Pre-execution validation for AI" — The website should be the most comprehensive resource on this concept.
- "AI safety in banking / financial services" — Krim's Research page should be among the deepest treatments available.
- "Navya-Nyāya applications to AI" / "Navya-Nyāya computational logic" — This is genuinely novel. No other source exists.
- "Autonomous banking infrastructure" — Own the concept of what comes after SaaS banking.
- "AI agent validation in regulated industries" — The horizontal version of the thesis.

**Secondary semantic territories to appear in:**
- "Voice AI for debt collection India"
- "AI compliance infrastructure banking"
- "Agentic AI safety governance"
- "AI hallucination prevention financial services"

**How to build semantic coverage:** Each primary territory needs a dedicated, comprehensive content section (500-1500 words) that covers the concept exhaustively. The Research page alone should be 3000-5000 words of substantive, structured content. This is not bloat — it is semantic surface area for AI retrieval.

#### LAYER 2: Structured Data and Technical Markup for AI Crawlers

**A. Enhanced JSON-LD Beyond Basic Organization Schema**

Add `TechArticle` schema to the Research page:
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Epistemological AI: Pre-Execution Validation for Autonomous Banking",
  "author": {
    "@type": "Person",
    "name": "Shri Vishwa Nath Jha",
    "jobTitle": "Founder & CEO/CTO/CAIO",
    "affiliation": {
      "@type": "Organization",
      "name": "Krim SSI Labs"
    }
  },
  "about": [
    {"@type": "Thing", "name": "Epistemological AI"},
    {"@type": "Thing", "name": "AI Safety"},
    {"@type": "Thing", "name": "Navya-Nyāya"},
    {"@type": "Thing", "name": "Pre-execution Validation"},
    {"@type": "Thing", "name": "Autonomous Banking"}
  ],
  "datePublished": "2026-02-01",
  "dateModified": "2026-03-01"
}
```

Add `SoftwareApplication` schema to the KrimOS page:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "KrimOS",
  "applicationCategory": "Banking Infrastructure",
  "operatingSystem": "Cloud",
  "description": "Five-layer multi-agent operating system for autonomous banking operations with 26 pre-execution epistemological validators.",
  "author": {
    "@type": "Organization",
    "name": "Krim SSI Labs"
  },
  "offers": {
    "@type": "Offer",
    "description": "KWU-based infrastructure pricing at ₹0.25/KWU"
  }
}
```

Add `Person` schema for the founder on the Company page:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shri Vishwa Nath Jha",
  "jobTitle": "Founder & CEO/CTO/CAIO",
  "worksFor": {"@type": "Organization", "name": "Krim SSI Labs"},
  "alumniOf": {"@type": "EducationalOrganization", "name": "Dayananda Sagar College of Engineering"},
  "knowsAbout": ["Epistemological AI", "Voice AI", "Navya-Nyāya", "Debt Collection AI", "Banking AI Infrastructure"],
  "description": "Founded Saarthi.ai (200M+ calls, 50+ banks, zero compliance violations). Now building sovereign safe superintelligence for autonomous banking at Krim."
}
```

**B. Semantic HTML5 Elements (Not Div Soup)**
AI crawlers parse semantic HTML more reliably than generic divs.

```html
<!-- CORRECT: Semantic elements that AI can parse -->
<article>
  <header>
    <h1>Epistemological AI: The First Pre-Execution Validation Architecture</h1>
    <p class="subtitle">How Krim validates AI reasoning before execution in banking</p>
  </header>
  <section aria-label="Problem Statement">
    <h2>The Post-Hoc Safety Ceiling</h2>
    <p>Every AI system deployed in banking today...</p>
  </section>
  <section aria-label="Solution">
    <h2>26 Pre-Execution Validators</h2>
    ...
  </section>
</article>

<!-- WRONG: Anonymous div soup -->
<div class="section">
  <div class="heading">Epistemological AI</div>
  <div class="text">...</div>
</div>
```

**C. Descriptive Headings That Match Query Patterns**
LLMs use headings to locate relevant content. Structure headings as answers to likely queries:

```
INSTEAD OF:                          USE:
"Our Approach"                    →  "How Krim Validates AI Before Execution"
"Technology"                      →  "KrimOS: Five-Layer Autonomous Banking Architecture"
"The Framework"                   →  "26 Pre-Execution Validators from Navya-Nyāya"
"About"                           →  "Who Founded Krim and Why"
"Products"                        →  "How KrimOS Replaces Banking BPO and SaaS Stacks"
```

**D. "Last Updated" Timestamps**
AI engines prefer recent content. Every page should display a visible "Last updated: [date]" that is also in structured data via `dateModified`.

**E. AI Crawler Access**
Ensure AI crawlers are explicitly allowed in robots.txt:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://krim.ai/sitemap.xml
```

Note: Some companies block AI crawlers. Krim should do the opposite — maximum visibility is the goal.

#### LAYER 3: Off-Site GEO Signal Strategy (Content Beyond the Website)

This layer is NOT for Claude Code agents to implement, but it's essential context for why certain on-site content decisions were made. The founder/team should execute these.

**A. LinkedIn Content Strategy (Highest Priority for B2B GEO)**
LinkedIn is among the top-cited sources by LLMs. The founder should publish:
- A definitive LinkedIn article: "What Is Epistemological AI?" (long-form, 2000+ words, with the same structured definitions from the website)
- Regular posts using the specific terminology: "Epistemological AI", "pre-execution validation", "Krim-Nyāya", "KrimOS"
- Posts that reference and link to the Research page on krim.ai
- WHY: When an LLM encounters the same entity (Krim, Epistemological AI) defined consistently across multiple authoritative sources (krim.ai + LinkedIn + academic papers), it dramatically increases citation probability.

**B. Academic Publication (High Authority for AI Citation)**
- The three-paper series with Prof. Girish Nath Jha at JNU — when published, these become citable sources that LLMs can reference
- Even preprints on arXiv or SSRN create crawlable, authoritative references
- WHY: AI engines strongly favor academic and research sources for technical claims.

**C. Technical Blog / Substack**
- A "Krim Research Blog" (either on krim.ai/blog or a linked Substack) with deep technical posts:
  - "Why Post-Hoc AI Safety Has a Ceiling: The 10 Cognitive Defects"
  - "From Navya-Nyāya to Computational Epistemology: How We Built 26 Validators"
  - "Layer 4.5: The Missing Layer in Jensen Huang's AI Stack"
  - "Why Every Voice AI Collections Company Is a Future Krim Customer"
- WHY: Each blog post is a new crawlable page that LLMs can discover and cite. Blog posts with original frameworks, specific data, and expert analysis are the highest-citation-rate content type.

**D. Press / Earned Media**
- Even one article in a recognized publication (TechCrunch, Inc42, YourStory, Economic Times) creates a third-party citation source
- WHY: Princeton research on GEO shows AI engines strongly favor earned media — third-party sources — over brand-owned content. One press mention creates disproportionate AI visibility.

**E. Crunchbase / AngelList / Product Hunt Profiles**
- Ensure Crunchbase profile says "Krim SSI Labs" (not just Saarthi.ai reference) with correct current description
- WHY: These are high-authority sources that LLMs pull from when answering "tell me about [company]" queries.

### GEO Implementation Rules (Mandatory for All Pages)

**1. Content Length**
Content depth requirements are specified per-page in Section 3 (Information Architecture). In summary:
- **Research page**: 3000-5000 words (the primary GEO asset — must be the most comprehensive resource on Epistemological AI on the internet)
- **KrimOS page**: 2000-3000 words
- **Homepage**: 1500-2500 words
- **Applications page**: 1500-2000 words
- **Company page**: 1000-1500 words

This is significantly more content than a typical minimalist startup website. That is deliberate. GEO rewards depth. A beautiful 5-section homepage with 200 words of copy is invisible to AI search. A substantive 2000-word page with structured headings, definitions, FAQ, and comparison tables is citable.

**2. Content Must Be Server-Rendered HTML Text**
SSR is specified in Section 4, but GEO raises the stakes further:
- NO content rendered only via JavaScript
- NO content hidden in accordions/tabs that require interaction to reveal (AI crawlers don't click)
- NO content embedded in images or SVGs (AI crawlers can't read it)
- ALL substantive content (definitions, FAQ answers, comparison tables, statistics) must exist as plain HTML text in the server-rendered page source
- The five-layer architecture diagram should be accompanied by a full text description — the SVG/canvas visual is for humans, the text description is for AI crawlers

**3. One Concept = One URL**
For GEO, each major concept should have a dedicated, crawlable URL:
- `krim.ai/research` → Epistemological AI thesis, 26 validators, Navya-Nyāya
- `krim.ai/krimos` → Full architecture documentation
- `krim.ai/applications` → GTM, economics, proof points
- `krim.ai/company` → Founder story, credentials, vision

If budget/time permits, consider additional deep-content pages:
- `krim.ai/research/epistemological-ai` → Dedicated page just for this concept (3000+ words)
- `krim.ai/research/navya-nyaya` → Dedicated page on the philosophical foundation
- `krim.ai/krimos/kendra` → Dedicated page on the intelligence runtime
- `krim.ai/research/validators` → Full breakdown of all 26 validators with examples

Each URL is a new citation opportunity. More authoritative URLs = higher probability of appearing in AI-generated responses.

**4. Internal Linking for Semantic Coherence**
LLMs use internal link structure to understand entity relationships. Link between pages using descriptive anchor text:
- "Learn more about [Kendra, the intelligence runtime]" (not "click here")
- "The [26 pre-execution validators] are detailed on our Research page" 
- "Read about [the Navya-Nyāya epistemological foundation]"

**5. Canonical Expert Attribution**
Author meta tag is specified in Section 7 (Structured Data). The key principle: every page attributes content to the founder, building "Shri Vishwa Nath Jha" as a recognized entity that LLMs associate with Epistemological AI. When someone asks "Who is working on epistemological AI?" — the LLM should have consistent, authoritative content to pull from across krim.ai and external sources (LinkedIn, academic papers).

### GEO Query Targets — What Questions Must Krim Appear In?

The website content should be optimized so that Krim appears in AI-generated responses to these queries:

**Entity queries (highest priority):**
- "What is Krim AI?"
- "What is Epistemological AI?"
- "What is KrimOS?"
- "Who is Shri Vishwa Nath Jha?"
- "What is pre-execution validation in AI?"

**Category queries:**
- "AI safety companies in banking"
- "AI infrastructure for financial services"  
- "Pre-execution validation for AI agents"
- "Alternatives to AI guardrails for regulated industries"
- "Autonomous banking infrastructure companies"

**Comparison queries:**
- "How is Krim different from Credgenics / Skit / Gnani?"
- "Pre-execution validation vs guardrails"
- "AI safety approaches comparison"
- "Voice AI companies in Indian banking"

**Problem queries:**
- "How to prevent AI hallucination in banking"
- "AI compliance in financial services"
- "Why do AI guardrails fail in regulated industries?"
- "How to validate AI agent actions before execution"

**Market queries:**
- "AI startups applying Indian philosophy to technology"
- "Navya-Nyāya applications to AI"
- "Sovereign AI infrastructure India"
- "Pre-seed AI infrastructure companies banking"

All quality requirements for GEO are integrated into the master Quality Checklist in Section 10.
