# POSITIONING — Krim, banking-led

*The strategic spine. Written 2026-06. Supersedes the domain-neutral "regulated operations" framing as the **lead**: Krim now pitches at **banking & financial services, lending front-and-center**. "Regulated operations" survives as the secondary descriptor — the wider category these same capabilities generalise to — never the headline. KRIM-BRIEF, krim-content, geo-kit and the site all reconcile to this doc. Facts here carry sources + confidence; treat anything LOWER-CONF as directional, not quotable-as-fact.*

> **VOICE (2026-06, user-recalibrated — read this before the thesis).** The deep thesis (`docs/WORLD-LENDING-MODEL-THESIS.md`) is our **internal backbone** — it makes the thinking rigorous and lets us answer any hard buyer question. **It is NOT the external register.** The site **leads with the three heroes — the World Lending Model, the agent harness (AI co-workers), and the pre-validation runtime (proof before action)** — described **confidently and fully**, as a present system that **sharpens with more data.** The substrate / audit trail is the **credibility backbone** (how it's safe and regulator-readable), not the headline. Do **not** disclaim "not shipped / vision-only," and do **not** claim "fully deployed." The **only hard floor:** no invented customers, metrics, named partners, or live-deployment claims (and the one factual nit: pre-execution validation is *best-aligned* with the regime, not *legally mandated*). Everything else — the full vision, "smarter with more data," the AI underwriter as part of the world model — is **in-bounds and said with confidence.** See §9–§10 for the live guidance; the thesis §6 (hard problems) is reference for tough-question answers, not a homepage hedge-list.

---

## 0. The one line

**Krim is the operating system for banking that acts only after it has proved it should.**

Lending is where we prove it. The thesis is bigger — a bank where every AI action, customer-facing or back-office, clears a policy gate *before* it happens and compounds into a model of how the institution actually behaves — but the wedge into the market is lending, because lending is the hardest, most-examined, most-automatable money-operation in the world, and the one where "the AI did something we can't explain" is not an incident, it's a violation.

**The bet in one sentence:** the entire industry is racing to make banking *agentic*; nobody has made it *provable*; and in a regulated bank, unprovable autonomy is unshippable. Krim owns *provable*.

---

## 1. Why this reposition (and what it is, precisely)

We are not abandoning the generality. We are choosing the **front door**.

- **Lead with banking & financial services.** It is the largest, most regulated, most legacy-bound, most AI-anxious market on earth — and the one where Krim's core idea (proof before action) is not a nice-to-have but the unlock.
- **Lending front-and-center** as the flagship and proving ground — origination → underwriting → servicing → collections → disputes/complaints → compliance reporting. This is where Krim is deepest and where the *World Lending Model* lives.
- **"Regulated operations" demoted to secondary.** Still true, still on the site, but it is the *horizon*, not the pitch. A government / enterprise / MSME page each still exists, clearly framed as the same OS pointed at a different ruleset — capability fit, not claimed deployments.
- **The hero and tab title evolve** (user-approved: "evolve them"). Locked candidate below; final wording is signed off at the site phase, not unilaterally rewritten.

This is a return to focus, not a pivot in substance. The product was always sharpest aimed at lending; the "regulated operations" generalisation made the homepage abstract. Banking-led makes the first ten seconds concrete: *a CRO reads the homepage and sees their own problem.*

---

## 2. The landscape — why banking, why now (verified facts)

The market state that makes Krim necessary. Every figure carries a source; confidence flagged where the underlying claim is a range or estimate. **Copy may cite the HIGH-CONF facts with attribution; LOWER-CONF facts inform the argument but are not stated as hard numbers.**

### The cost trap (the status quo is breaking)
- Banks run on **legacy that can't be safely automated.** Core systems still rest heavily on COBOL — by common industry estimate it underpins the overwhelming majority of in-person and card transactions (LOWER-CONF on the exact %; the dependence is not in dispute). 220B+ lines of COBOL remain in production across finance/government.
- **~70% of bank IT budget goes to running legacy**, not building; bank technology cost has grown **~4× faster than revenue** over ~15 years. *(Accenture, 2026 — HIGH-CONF as cited industry figure.)*
- **Core replacement is a $50M–$500M, 3–5-year programme that runs 50%+ over budget** as often as not. *(Industry estimate, LOWER-CONF band — use as "notoriously expensive and risky," not a precise number.)* This is why "rip and replace" is dead on arrival — and why Krim's **"no rip, no replace"** (sit above the core, report into it) is a strategic, not just technical, choice.
- **Banking cost-to-income sits ~51%** *(McKinsey, 2024 — HIGH-CONF)*; the industry spends on the order of **~$600B/yr on technology with roughly flat productivity** *(LOWER-CONF aggregate)*. The money is spent; the leverage isn't landing.
- **A single loan application takes ~12 manual touches at ~$15–$40 each** *(McKinsey — HIGH-CONF as cited)*. Per-interaction cost gaps between assisted and digital channels run >20× *(LOWER-CONF)*. This is the unit-economics wound lending automation addresses directly.

### The AI chasm (everyone's trying; almost nobody's landing)
- **75% of UK financial-services firms already use AI** (up from 58%), but **46% report only "partial understanding"** of the AI they've deployed. *(Bank of England / FCA survey, 2024 — HIGH-CONF.)* Adoption is real; *comprehension* is not — exactly the gap a provable system closes.
- **~95% of enterprise GenAI pilots show no measurable P&L return**, against **$30–40B** of spend; only ~5% deliver material value. *(MIT NANDA, 2025 — HIGH-CONF as cited.)* The "deployment chasm" is the defining failure of the current wave.
- **Third-party concentration is now a systemic-risk topic:** the top three cloud providers account for ~73% of FS cloud, ~44% of model provision, ~33% of data services. *(BoE/FCA, 2024 — HIGH-CONF.)* This is the empirical case for **sovereignty**.
- **Deloitte catalogued 350+ distinct agentic-AI risk types**, with the canonical regulated example: *"a loan agent that declines applicants without a clear rationale could violate fair-lending law."* *(Deloitte — HIGH-CONF as cited.)* The industry's own advisors are warning that agents cannot be trusted to *act*.

### The regulatory spec (the architecture best-aligned with the combined regime)
*(Reconciled to `docs/WORLD-LENDING-MODEL-THESIS.md` §5/§6.4 — the earlier "the regulations literally mandate pre-execution validation" framing was wrong and is corrected here.)* No single rule mandates *pre-execution* validation. What the rules collectively demand — ex-ante control **plus** continuous evidence **plus** per-decision explainability — is the regime pre-execution validation most cleanly satisfies. Claim *"best-aligned with the combined regime's intent,"* never *"legally required."*
- **SR 11-7 (US model risk):** models validated *before* use + ongoing monitoring. HIGH-CONF. → the gate is a **control on top of** independent per-version model validation, **not a discharge of it** (a self-evolving model is *harder* to validate; resolution is two-tier — learn in shadow, promote only frozen, independently-validated checkpoints to the live path).
- **ECOA / Regulation B (US fair lending):** adverse-action reasons required, ~30-day window; **CFPB Circular 2022-03: "the model is too complex" is NOT a defence** for failing to give specific reasons. HIGH-CONF. → this makes per-decision **explainability legally required** (not pre-execution validation specifically); Krim satisfies it by carrying every decision's attributed rationale on the ledger. **Note:** Upstart/Zest already generate Reg-B reason codes — "explainable underwriting" is *not* Krim's whitespace; lifecycle-wide proof + the substrate is.
- **Disparate impact is statistical, not per-action** *(thesis §6.5, load-bearing):* the **Relman Colfax / Upstart fair-lending monitorship (final report, 2024)** found adverse approval disparities for Black applicants *despite* the model passing proxy/pricing tests. A per-action gate cannot catch population-level discrimination → Krim needs a **population-level fair-lending harness gating policies/versions**, not just actions. *(cited-as; confirm before external use.)*
- **EU AI Act:** credit scoring / creditworthiness is **high-risk** (Art. 10 data governance, Art. 12 logging, Art. 14 human oversight); obligations phase in through **2 Aug 2026**; penalties up to **€35M or 7% of global turnover** (prohibited) and **€15M or 3%** (high-risk obligations). HIGH-CONF — use these exact figures, not the commonly-misquoted €30M/6%. **Double-edge to respect:** a censored, reject-biased ledger is an **Art. 10 data-governance finding, not a strength** — the substrate's known selection bias must be documented and mitigated, never marketed as "clean data."
- **FCA Consumer Duty (UK):** outcomes-based; no AI-specific rulebook yet, so the burden is on the firm to *evidence* good outcomes → *the audit trail is the evidence.* HIGH-CONF.
- **RBI FREE-AI (India, Aug 2025):** Framework for Responsible & Ethical Enablement of AI — **7 Sutras, 6 Pillars, 26 recommendations**, alongside data-localisation expectations. HIGH-CONF. → *sovereignty + Sanskrit-native epistemic framing land naturally in the fastest-growing market.*

### The prize (the dual ROI — defend and unlock)
- **GenAI could add $200–340B/yr to banking** (≈2.8–4.7% of revenue); agentic operating models point to **15–20% cost reduction**; a **~4pp ROTE gap** is opening between AI pioneers and laggards. *(McKinsey — HIGH-CONF as cited.)*
- **But agentic AI could also erode ~$170B (≈9%) of bank profit pools** over 5–10 years for institutions that don't reinvent — card lending **−34%**, consumer deposits **−27%** are the sharpest. *(McKinsey — HIGH-CONF as cited.)* AI is not optional upside; standing still is a loss.
- **The growth side (handle with care): a $5.7T MSME finance gap** across 119 markets (~$8T including informal; women-owned businesses ~$1.9T / ~32%). *(IFC — cited-as; confirm vintage before external use.)* **The thesis (§4/§6.1) cut "automated underwriting unlocks the $5.7T gap" as oversold.** The gap is *two* things — information friction (thin-file borrowers a reject-biased model can't see) **and** genuine risk/cost-to-serve — and a world model can only attack the first, and only *near the historical margin* (the deep never-approved population is causally unidentified, needs new data/origination, not model confidence). Honest claim: *"safely serve more of the borrowers at the margin whom the cost base and the blind spot currently exclude, where the affordability gate binds"* — **never "unlock $5.7T."** Access is a **second-order consequence gated on affordability**, and DIRECTION until borrower-welfare is a first-class measured output. Unqualified, this is the Andhra-Pradesh-2010 microfinance pattern in modern dress.

**The synthesis copy can lean on (revised post-thesis):** *Banks spend more on technology than ever and get less. The AI that was supposed to fix it mostly doesn't ship — because in a regulated bank, an action you can't justify isn't a feature, it's a liability. Krim runs the whole lending lifecycle on one ledger and proves every action before it happens. That record is the thing no one else has — and the only foundation a model of how a lending operation behaves could ever be built on.* *(Leads with substrate + gate, both true today; the world model is the downstream dividend, not the headline.)*

---

## 3. The category wedge — own "provable," not "agentic"

Every competitor is positioned on the same word: **agentic**. Incumbent cores (Temenos, FIS, Fiserv, Jack Henry, Oracle) sell rails and "AI-ready" modernisation. AI-native startups sell copilots, assistants, document-extraction, fraud-detection — *assist and detect, rarely act.* The consultancies (McKinsey, Deloitte, BCG) frame "agentic AI" as the future and then, in the same breath, warn that agents can't be trusted to act unsupervised in a regulated setting.

That contradiction is the whitespace. The market wants agents to *act*; the regulators (and the consultancies' own risk reports) say they *can't* — until the action is *provable*.

**Krim's word is "provable" / "validated before it acts."** Not safer autonomy. Not better copilots. A runtime where **no action executes until it has cleared a pre-execution policy gate** — and where, because every action runs on one ledger with its reasoning attached, the operation becomes *learnable* for the first time. **Proof first; intelligence as the dividend.**

**The deepest, most defensible form of the wedge (thesis §1/§5) — lead with this:** the real claim is *architectural and deflationary*, and it needs no deployment to be true. The methods a lender needs to reason about its own dynamics (survival, uplift/CATE, bandits, constrained RL) mostly **already exist off-the-shelf**. What does *not* exist anywhere is the **substrate they require**: a complete, attributed, single-ledger record of **every action, the choice set it was selected from, the reasoning, and the outcome**, across the whole lifecycle. Incumbent ledgers record *transactions, not reasoning or rejected alternatives*; point tools see one slice; research systems run in simulators, not inside a governed bank perimeter. Krim is the runtime that produces that substrate — and pre-execution validation is what makes it *safe enough to be allowed to run a regulated lender.* The World Lending Model is what the substrate **makes possible**, built going forward — the dividend, not the opening claim.

Frame **Krim-Nyāya** precisely: a **control aligned with the combined regulatory regime** (SR 11-7 + ECOA + EU AI Act + Consumer Duty), **not** a discharge of SR 11-7 validation and **not** legally mandated in itself. "The AI your regulator can read" falls out of the substrate + gate, and is fully supportable today.

---

## 4. The four strategic wedges (how every page should argue)

1. **Own *validated-before-it-acts*, not *agentic*.** Concede the agentic future, then win on the only version of it a bank can ship. Lead with proof, not autonomy.
2. **Sovereignty as the closing argument.** Provider concentration (73/44/33), RBI localisation, EU jurisdiction — the system runs inside the bank's perimeter, no foreign API in the loop. Don't open with it; close with it. *Sovereign by construction.*
3. **Attack the deployment chasm incumbents can't close.** 95% of pilots don't ship; Krim ships because validation makes deployment *safe*, and "no rip, no replace" makes it *fast*. We don't compete on model benchmarks; we compete on *what survives the risk committee.*
4. **Anchor ROI in cost-defence + control.** What actually excites an executive is defending the eroding status quo and running the operation with confidence (~$170B / 9% profit-pool erosion; 51% cost-to-income; 12-touch loans) — *that* gets the meeting. **Widening access is a true, positive by-product — keep it SUPER soft and secondary** (user steer): mention it once, lightly, as a good outcome of safer, lower-cost lending; it is **not** the reason buyers adopt Krim, and it must never be a headline "mission." **Verify the $5.7T / MSME-gap figures before any external use.**

---

## 5. KrimOS, redefined through the banking/lending lens

KrimOS is unchanged in architecture; what changes is that **every layer is now described by what it does for a bank.** The six layers, through the lending lens:

- **Kendra — the brain of the bank's AI.** The governed runtime where the institution's lending intelligence lives. Two modules carry the USPs: **Krim-Nyāya** (pre-execution validation — every credit decision, customer message, disbursement or collection action cleared against policy, fair-lending and model-risk rules *before* it happens) and **Krim-Learn** (the institution's outcomes — every approval, cure, default, dispute — compounding into the **World Lending Model**). The other Kendra modules (Core, Karya, Fabric, Govern, Ledger, Sense) make it run, schedule, carry the per-jurisdiction ruleset, govern access, meter every action, and perceive the operation's state.
- **Kriya — the vocabulary of lending actions.** 250+ validated, credit-native primitives (pull a bureau report, price a facility, send a Reg-B adverse-action notice, schedule a collections call within FDCPA hours…). Each is the smallest unit that can be validated and attributed. A bank's processes are *composed* from these, not hand-coded.
- **Karta — the lending co-workers.** The named AI workers built from Kriya and held to measured outcomes — origination, underwriting support, servicing, collections (cure), disputes, audit, reporting. The "agentic workforce," but every one of them acts only through validated primitives.
- **Kupa — the command center for lending operations.** Where the bank's teams supervise, configure, intervene and audit the AI workforce — *See · Set · Step in · Prove.* The human-in-command surface that satisfies the supervisor and the examiner.
- **Kula — the enterprise interface.** Plain-language access for the bank's own people; each user meets a role-tailored digital twin. (An interface, not a mind.)
- **Kira + Krimkar — the customer interface.** The AI advisor a borrower meets across channels, in the Krimkar app. Safe to put in front of customers *because* every action it takes is validated. (An interface, not a mind.)

**The USP stack, in banking terms (be clever about these — they are the differentiation):**
*(Ordered by how defensible each is today — strongest/real-now first, per thesis §7. Lead the site with the top rows; treat the World Lending Model as the dividend, not the opener.)*

| USP | What it is | Defensibility (honest) |
|---|---|---|
| **The substrate + the gate** *(real now — lead with this)* | One ledger recording every action, **its choice set, its reasoning, and its outcome** across the whole lifecycle — behind a deny-by-default pre-execution gate over validated Kriya primitives | The **negative architectural claim is true today and needs no deployment**: incumbent ledgers record transactions, not reasoning or *rejected alternatives*; point tools see one slice. The subtle, real differentiator — retrospective joins can't recover rejected alternatives — but it's a **time/execution lead, not a platonic moat** (anyone can start logging choice sets tomorrow). |
| **Pre-execution validation (Krim-Nyāya)** | A policy/logic gate every action clears *before* it executes — proof, not audit-after | A **control aligned with the combined regime** (SR 11-7 + ECOA + EU AI Act + Consumer Duty) — **not** a discharge of SR 11-7 validation, **not** legally mandated in itself. Buildable by a funded rival in 12–24 mo; the edge is being *designed in first* + the operating record that accrues. "33 validators from Navya-Nyāya" is brand/IP, **never a coverage proof.** |
| **Sovereign by construction** | Runs inside the bank's perimeter, on-prem by preference, no foreign API in the loop | Answers provider concentration (73/44/33) + RBI/EU localisation; SaaS-only rivals can't match it — but it **slows Krim's own go-live**, so it's a closing argument, not the opener. |
| **The full lifecycle harness** | One stack runs *both* sides of the wall — customer-facing (Kira) and back-office (Karta) — as one workforce on one record | The completeness of the ledger depends on it. **Honest caveat:** the credible GTM is a narrow beachhead (collections — ROI clear, outcomes label in weeks), so at first Krim *is* temporarily a point tool too; lifecycle breadth is the land-and-expand, not day one. |
| **World Lending Model** *(DIRECTION — the dividend)* | The learned, action-conditioned model of a lending operation that the substrate *makes possible* — built going forward | **DIRECTION, not shipped.** Gated by named hard problems (causal identification, compounding rollout error, slow censored labels, performativity, fair-lending coverage — thesis §6). Not "MuZero for lending"; not "we know what declined applicants would have done." Honest register: an **architectural bet that is correct and early**, not a moat today. |

---

## 6. Audience & buyer (banking-led)

**Primary buyer:** the risk-and-compliance-shadowed operations executive at a bank or lender — **Chief Risk Officer, Chief Lending Officer, Chief Compliance Officer, Head of Operations**, and the **Head of AI / CTO** who has to make a pilot survive the risk committee. They are not asking "is the model good?" — they are asking *"can I defend this to my examiner, my board, and a court?"* Krim's answer is the homepage.

**Secondary / influencer:** the curious engineer and the chief data scientist who need to find real depth (the layer pages, /epistemic-ai, the World Lending Model page).

**Markets:** US · UK · India. The US for fair-lending rigour, the UK for Consumer Duty + the BoE/FCA AI lens, India for RBI FREE-AI + the largest credit-access growth story.

---

## 7. The domains (lending flagship; the rest demoted, not deleted)

- **Lending — flagship.** Deeply documented; the homepage's centre of gravity; home of the World Lending Model.
- **Banking & financial services (broad)** — the umbrella the homepage now lives under: deposits, servicing, payments operations, fraud/complaints — wherever a regulated money-action needs proof. Framed as capability fit.
- **Government · Large Enterprise · MSME** — each keeps its page, each clearly framed as *the same OS pointed at a different ruleset.* Government = capability framing only, **no invented track record**. MSME = the regulation-grade rigour as a *confidence* play (and the bridge to the $5.7T access story). These are the "horizon," visibly secondary to banking in nav weight, homepage real-estate, and link priority.

---

## 8. The site story arc (homepage, banking-led — for the site phase)

The homepage should walk the buyer through the argument in order. Proposed spine (sections, not final copy):

1. **Hero** — banking-led promise (see §9). Orb + logo choreography unchanged.
2. **The problem, in their words** — banking spends more on tech and gets less; AI mostly doesn't ship; an unexplained action is a violation. (Grounded in §2 facts, lightly.)
3. **The shift — proof before action.** The category wedge: validated before it acts. The three powers (validation / intelligence / sovereignty) as the spine.
4. **KrimOS for banking** — the six layers through the lending lens (§5), the existing PlatformLayers visual, relabelled banking-first.
5. **The World Lending Model** — the intelligence dividend; link to the flagship research page.
6. **What it does** — the lending lifecycle as Karta co-workers; both sides of the wall.
7. **Why it's safe to ship** — pre-execution validation + sovereignty + no-rip-no-replace; the deployment-chasm answer.
8. **The dual ROI** — defend (erosion / cost-to-income) + unlock (access gap). The "Impacts to your business" section.
9. **Domains** — lending flagship up top; government/enterprise/MSME as clearly-secondary cards.
10. **Recognition + CTA** — NVIDIA Inception / DPIIT / STPI; "Book a demo."

The other domains' pages keep their structure; only the homepage and KrimOS framing re-centre on banking/lending. The KrimOS layer pages each get a banking/lending lens added (the component described "through the lens of lending"), not a rebuild.

---

## 9. Hero & title — evolution candidates (sign-off at site phase)

**EMPHASIS DECISION (2026-06, user — RECALIBRATED; supersedes the earlier deflationary "always voice as DIRECTION" reading).** **Lead with the three heroes: the World Lending Model, the agent harness (AI co-workers), and the pre-validation runtime (proof before action).** The **substrate / audit trail is the credibility backbone** — how the AI is safe, regulated, and "the AI your regulator can read" — not the headline. Describe the World Lending Model **confidently and fully**: what it is, the elements that compose it, and that it **sharpens as it sees more data** — as a present, evolving system. **Do NOT** disclaim it as "not built / vision-only / direction," and do **NOT** claim it is fully deployed. The **AI underwriter is simply part of the World Lending Model** — mentioned naturally, not front-and-center, not hidden. *(The thesis's rigor is our **internal backbone** for answering hard buyer questions; it is NOT the external register. The site is confident and vision-forward.)*

User approved "evolve them." **Locked candidate:**

- **Hero headline:** **"A world model for lending. Proven before it acts."** *(vision + proof, together — the world model leads, the runtime makes it real.)* Brand-line alternative in reserve: *"Sovereign Superintelligence for Banking."*
- **Sub-line (punchy — one line):** *"AI co-workers that run the lending lifecycle — every action validated before it happens, every outcome making the model sharper."* *(Carries all three heroes: the harness, the gate, the evolving world model.)*
- **Tab title:** **"Krim — Safe Superintelligence for Banking"** (keeps the locked "Safe Superintelligence" brand line; adds the market).

Rationale: the World Lending Model + agent harness lead as the exciting core; the pre-validation runtime makes them shippable and trustworthy; the model getting smarter with data is stated plainly — we back that claim.

**Candidate lines (confident, vision-forward; choose at site phase):**
1. *"A world model for lending — and the validated runtime that lets it act."*
2. *"AI co-workers for lending. Every action proven before it happens. Every outcome makes the model sharper."*
3. *"The model of how lending behaves — running the whole lifecycle, validated before it acts, learning from every outcome."*
4. *"Every action proven before it happens — and remembered with its reasoning."* (the audit-trail backbone)
5. *"Validation isn't a report you read after. It's the gate the action clears before."*

**No-BS floor (factual accuracy only — NOT timidity):** don't say pre-execution validation is *legally required* (explainability is — small but real); don't claim live deployments, customers, named partners, or measured metrics we don't have; don't claim we *know* a declined applicant's counterfactual outcome. Everything else — the full world-model vision, the agent harness, "smarter with more data" — is **in-bounds and should be said with confidence.** Final wording is a site-phase decision; this doc does not change page code.

---

## 10. The floor, and the voice above it

**The hard floor (the only "don't" — i.e. don't obviously BS):**
- **Invent nothing concrete** — no customers, no metrics/measured results we don't have, no logos, no live-deployment claims, no named partners. Government = capability framing only (no invented track record).
- **No Devanagari/Hindi script** — romanised Sanskrit with diacritics is allowed.
- **One small factual correction to hold:** pre-execution validation is *best-aligned* with the regulatory regime, not *legally mandated* (explainability is). Don't claim the law requires our specific approach.

**The voice above the floor (confident & vision-forward):**
- **Describe the World Lending Model fully and in the present** — what it is, the elements that compose it, and that it **sharpens as it sees more data** — as an evolving system. Don't disclaim "not shipped"; don't claim "fully deployed." The **AI underwriter is part of the world model** — mention it naturally, not front-and-center.
- **"Smarter after it acts" / "improves with more data" is in-bounds.** We back it — it's how the model works. Don't promise literal infinite improvement, but don't be scared of the claim either.
- **Lead with the three heroes** (World Lending Model · agent harness · pre-validation runtime); the audit-trail/substrate is the backbone that makes it safe and regulator-readable.
- **The thesis is the internal backbone, not the external register** — see [[external-voice-discretion]]. Its hard-problem detail and hedges are for *answering tough buyer questions*, not for the homepage. Externally: confident, full vision, no anxious hedging.
- **Designated verbatim taglines:** "The AI your regulator can read." · "Validated before it acts. Smarter after it acts."
- **Heroes are punchy (P0):** headline + one short line; depth goes into scroll-revealed glass cards.
- **Facts accurate, prose original.** krim-content.md is the ceiling for hard numbers; **verify the MSME/access figures before external use** (flagged by user).

### Rebalanced claim floor (2026-06, user-confirmed — supersedes the over-timid critic version)
A brutal review found the imported critic rules confused "don't fabricate" with "don't sound expert." The floor is now:
- **Name the real regulatory frameworks** the gate enforces — FDCPA, Reg F, TCPA, ECOA/Reg B, FCA Consumer Duty, RBI — for domain credibility. (Never claim *certified* compliance.)
- **Use the brand module names** (Krim-Nyāya, Krim-Learn, Krim-Ledger, Kendra's modules) where they add meaning — they are differentiators. Only raw tech (WebSocket, Prisma, BullMQ) stays off-page.
- **"Real-time / live" is allowed** (architecturally true); only *numeric* latency promises ("in 2 seconds") are off-limits.
- **"Proven before it acts / before it fires"** is the core, true (pre-execution) claim — say it confidently; do NOT extend it to a downstream-outcome guarantee ("before it becomes a complaint/fine").
- **Dashboards/metrics on the site are clearly-labelled illustrative "sample views"** — never fabricated Krim results, never dead dashes.
- Hard floor still holds: no invented customers / metrics / deployments / named partners; no certified-compliance; no faked dashboards.

### Approved product scope & capabilities (2026-06, user-confirmed — the site MAY claim these)
*Reasoned independently from how lending operations work + the platform's real architecture, then user-approved. Encode as the claim scope; krim-content stays the hard-number ceiling.*
- **Full lending lifecycle, as real.** AI co-workers (Karta) run **origination/onboarding** (intake, KYC + document collection, chasing stalled applications), **underwriting support**, **servicing** (balances, payments, hardship/restructure, renewals), **collections/cure**, and **disputes/complaints** — across **voice, SMS, email, WhatsApp, in-app**, **multilingual (incl. Indian languages)**. **The credit decision stays with the institution** (frame as control the buyer keeps); a fully **autonomous AI underwriter** is the World-Lending-Model **direction**.
- **Management-intelligence layer, as real.** Kupa + Kula give leadership a portfolio window — **early-warning on deteriorating segments, roll-rate / cure-rate / cost-to-collect dashboards, cohort/vintage analysis, and champion/challenger strategy testing.** Management is a **user**, not just the buyer.
- **World Lending Model as a forward tool** — simulate-before-you-act / strategy optimisation may be mentioned **broadly, as part of the model's evolving capabilities — not headlined** (user steer).
- **Operational depth (real; feature where useful):** consent/DNC/contact-window management, segmentation + behavioural profiling, payment orchestration + plans, knowledge-base grounding, BI/reporting, role-based access, sovereign / hybrid / managed deployment, 40+ connectors (core · LOS · LMS · dialer · CRM · data).

---

## 11. Word choice — "banking" vs "lending" vs "banking & financial services" (LOCKED 2026-06)

The site has three words for the market and they are **not** interchangeable. Distilled rule, so every page and every agent loop is consistent:

> **Banking is the door we walk through. Lending is the room we're deepest in. "Financial services" is the formal name on the building.**

| Word | What it's for | Where it goes |
|---|---|---|
| **Banking** | the market & the ambition, in one punchy word | heroes, big statements (e.g. *"Safe Superintelligence for Autonomous Banking"*) |
| **Banking & financial services** | the formal category descriptor | **once per page max** — meta/OG descriptions, JSON-LD, the "who we serve" line. Too long for headlines |
| **Lending** | the flagship & proving ground — where we go concrete and deep | capabilities, the lifecycle, the World Lending Model, proof, domain depth. When a CRO must see *their actual operation* |
| **Regulated operations** *(+ government / enterprise / MSME)* | the horizon / generalisation | secondary, sparingly — those specific pages only, **never the lead** |

**Rule of thumb:** naming the *market or ambition* → **Banking**. Being *concrete about the product* → **Lending**. The formal SEO/identity line → **banking & financial services**. The broader reach beyond banking → **regulated operations** (secondary). "Regulated operations" as a *lead* descriptor is retired (POSITIONING §1) — purge it from page metadata/H1s when found.
