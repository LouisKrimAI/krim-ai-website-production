# KRIM AI — FOUNDATION DOCUMENT

*The canonical reference. The story, the vision, the architecture, the voice. Every page, deck, and decision is measured against this document. When this needs to change, the change is deliberate and the document is updated explicitly — not drifted into.*

**Status:** v1.2 · scope correction by user instruction (end-to-end lending operations — see lock #12) + role-enablement map added · on top of v1.1's four-specialist pressure-test and the v1.0 multi-disciplinary synthesis
**Date:** June 2026
**Path:** `docs/FOUNDATION.md`

> **READING NOTES for v1.1.**
> §1 (the civilisational frame) is preserved for internal / recruiting / about-page use and is **never to appear in buyer-facing or supervisor-facing materials.** Three specialists independently flagged it as procurement-toxic. The thesis itself in §2 carries the buyer-facing argument; §1 is the conviction underneath it that founders, hires, and journalists read.

---

## §1 — THE CIVILISATIONAL FRAME *(internal use only — never on the buyer-facing page)*

> **Audience.** Founders, hires, advisors, journalists, partners who want to know what we believe. **Not procurement.** Not the supervisor's desk. Not the homepage hero. Three specialists independently identified this section as procurement-toxic. It earns its keep elsewhere.

For four hundred years the modern institution — the bank, the insurer, the welfare state — has been the technology by which societies render billions of small judgements consistently. A loan officer in Pune and one in Lucknow are supposed to reach the same decision on the same file. They never quite do. The institution is the scaffolding that *tries* to make human judgement uniform, auditable, reversible, and bound by rules. It is breaking under load.

Krim's frame, in one sentence:

> **Krim is building the layer on which institutions delegate judgement to machines and keep accountability for it.**

This is not lending automation. It is the deliberate construction of the substrate on which an institution's judgement — its underwriting logic, its collections discretion, its dispute reasoning — can be rendered consistently at population scale, under its own governance, and remain answerable to its own accountability framework.

### The Krim doctrine

> **Judgement at population scale belongs to machines. Accountability for judgement belongs to institutions. What sits between them is not a product. It is a piece of public infrastructure, and it has not yet been built.**

Krim exists because the layer that mediates between machine cognition and institutional accountability is not a wrapper, not a guardrail, not a compliance module. It is the actual artefact, and we are the company building it.

### The discipline against hubris

Krim must remain, doctrinally and architecturally, the infrastructure that makes institutional judgement legible and scalable — never the infrastructure that replaces institutional judgement. The CRO at HDFC is not Krim's user in the sense that a developer is Stripe's user. **The CRO is Krim's *principal*** — the party on whose behalf the system acts and to whom the system answers.

The moment Krim's language slips from *"we render your institution's judgement at scale"* to *"we render judgement,"* the regulator disengages, the customer disengages, and the vision collapses into the long sad history of AI companies that confused capability with authority. The legitimacy of decisions belongs to the institution, the regulator, and the legal order behind them. Krim is the architecture that makes that legitimacy operable at machine scale. Nothing more, and nothing less.

### The sci-fi anchor (for the engineers we're recruiting)

Closest fictional analogue: **Iain M. Banks's Culture Minds — specifically the General Contact Units** that operate at the seam between a powerful civilisation and societies with their own sovereignty, their own legitimate refusals. A Culture Mind does not impose. It models the other civilisation deeply enough to act within its grammar, and it is bound by Contact's protocols about what it may and may not do.

That is Krim. A world model deep enough to act inside a regulated domain's native grammar, bound by a separate reasoner that knows what the domain forbids.

---

## §2 — THE THESIS

**One sentence.**
Krim is building KrimOS — a runtime for regulated work, founded on a learned model of how lending actually behaves and a separate safety layer that adjudicates every action before it executes.

**One paragraph.**
Regulated operations have resisted automation for the same reason they have resisted simplification: the work is non-stationary, the rules are conditional, and the cost of a single wrong action is catastrophic. KrimOS replaces the layer underneath — scripts, workflow tools, contact-centre labour, exception desks — with a system that understands the domain it acts in and is validated against your policy before every action. **A Lending World Model** learns how borrowers, products, channels, regulations and outcomes move through time. **A separate adjudicator** evaluates the predicted downstream effect of every proposed action — under the world model — before it reaches a system of record. Cognition that understands. Safety that consents. Both inside one product.

**One page.**
The lending industry runs on a layer of human middleware nobody respects and no one has been able to remove. Collections floors, servicing queues, hardship desks, reconciliation teams, exception-handling specialists — tens of thousands of people compensating for the fact that loan-management systems describe state but cannot reason about it. Every prior attempt to automate that layer has run into the same wall. Rule engines do not generalise. RAG-on-policy chatbots cannot plan. Workflow tools cannot handle the long tail. Fine-tuned LLMs hallucinate inside regulated decisions, and no risk officer in a serious institution will sign off on an agent that occasionally invents a settlement offer or misreads a borrower's hardship status.

KrimOS is built to clear that wall in two moves.

**The first move is cognition.** Inside KrimOS sits a Lending World Model: a learned representation of borrowers, accounts, products, channels, and the consequences of action. It maintains internal state. It conditions on that state. It plans, and it evaluates counterfactual rollouts before it commits. This is what lets an agent reason about a delinquent borrower the way an experienced collections manager does.

**The second move is safety.** Every action an agent proposes — every call, message, payment plan, hardship classification, dispute response — passes through a separate reasoning model whose only job is adjudication. It does not adjudicate the surface form of the action. **It adjudicates the predicted downstream effect under the world model.** A plan whose individual steps are each policy-compliant, but whose composed effect violates policy, is caught here. This is the load-bearing architectural commitment, and the closest research line to it is the pre-execution verification work (VeriGuard / AgentSpec / Pre-Execution Bench). The composition with a domain world model — adjudication over *predicted state under hypothetical action*, not over output tokens — is what the safety layer is for.

Cognition that understands. Safety that consents. Composed inside **a seven-phase loop** — Perceive, Review, Plan, Validate, Action, Observation, Reflection — that is observable end to end and improves itself by reflecting on real outcomes, with frozen foundation weights and governed memory updates so improvement is auditable rather than drift.

That is KrimOS. Lending first, because lending is the hardest regulated operations market in the world and the largest. Then everything shaped like it.

---

## §3 — WHAT KRIMOS IS

### The product, defined.

KrimOS is **a runtime for regulated operations**. It hosts cognitive agents that perceive an environment, reason about it, plan an action, have that plan adjudicated, execute, observe what happened, and learn. It is not a chatbot, not an RPA layer, not a co-pilot bolted onto a loan-management system. It is the layer that the loan-management system, the dialer, the dispute platform, and the payment rails report into — and that the institution's operators supervise.

**Krim is the company. KrimOS is the single product.** One product, one name. Never refer to "Krim's products" in the plural.

It runs as a single product with **five named modules** and **two foundational innovations**.

### The two innovations — equal weight, load-bearing

These are not adjacent features. They are the load-bearing structure of KrimOS. One reasons. The other consents.

#### Innovation 1 — The Lending World Model

| Register | The claim |
|---|---|
| **For the CRO** | A quantitative representation of borrower behaviour, channel response, product mechanics, regulatory boundaries and outcome distributions, learned from production data and refined continuously. It is what allows an agent to decide between three contact strategies on a 47-day-delinquent prime auto loan the way your best collector would — by reasoning about what the borrower is likely to do next, not by following a static decision tree. |
| **For the CDO** | Maintains internal state over borrower lifecycle, conditions action on that state, supports counterfactual queries with coherent answers. Foundation lineage includes JEPA-style predictive representations and the broader world-model literature. Foundation weights are **frozen in production**. Continual improvement happens through **governed memory updates and reflection traces**, not through unconstrained online learning. |
| **For the engineer** | An encoder producing a structured latent over the relevant operational entities (borrower, account, product, channel, regulatory regime, recent action history), an action-conditioned dynamics module that predicts next state given a proposed action, and a planning interface that the agents query during the Plan phase. Trained on production data, refined by reflection. |

**The credibility line for the world model (load-bearing):**

> *"A world model architecture, instantiated on your portfolio, governed by your model risk framework."*

Not "we have cognition." Architecture + instantiation + governance. That phrasing survives a 25-year SAS-modeller CRO's reading. The version that doesn't survive: any sentence implying one global Krim model already knows the buyer's portfolio.

#### Innovation 2 — The Safety Layer (internally: Kriya · the Adjudicator)

| Register | The claim |
|---|---|
| **For the CRO** | Every action an agent proposes is reviewed, before it executes, by a separate model whose job is to judge whether the action is consistent with policy, regulation, fairness constraints and the institution's own playbooks. It does not run after the fact. It runs before. Nothing reaches a system of record without it. |
| **For the CCO / compliance** | This is what makes autonomous action defensible. The adjudicator inspects the *intent* behind the plan, not just the words. A model trained to find the gap between what an agent says it is doing and what it is actually about to do. Every adjudication is logged, reasoned, and reviewable. **SR 11-7 was written for a world where this layer did not exist.** SR 26-2, its April 2026 replacement, explicitly excludes generative and agentic AI from scope — telling banks to build this layer themselves. Krim is it. |
| **For the engineer** | A separate model — distinct weights, distinct training objective — taking the agent's full plan (state, intent, proposed action, expected effect) as input and producing an adjudication. Lineage: Constitutional Classifiers (Anthropic), Deliberative Alignment (OpenAI), VeriGuard / AgentSpec / Pre-Execution Bench (2025 pre-execution validation literature). Differentiated by being trained on the specific structure of regulated-operations decisions, and by being composed with a world model rather than a base LLM. |

**Position in the bank's framework:** the adjudicator is *both* a model (must be inventoried, validated, monitored per MRM) *and* a control (gates production actions). Krim ships an MRM-ready model card by default. The bank decides where to seat it.

### The seven-phase cognitive loop

Every unit of work in KrimOS moves through seven phases. The loop is the API surface between the two innovations and the agents that use them.

| # | Phase | What happens |
|---|---|---|
| 1 | **Perceive** | Ingest the relevant slice of the environment — borrower, account, channel state, recent history, open policies. |
| 2 | **Review** | Internal grounding pass. The agent forms a structured understanding of the situation, queries the world model for relevant state and dynamics. |
| 3 | **Plan** | Agent proposes a sequence of actions, conditioned on world-model rollouts. Counterfactuals evaluated here, not after. |
| 4 | **Validate** | **The adjudicator inspects the plan.** This is the load-bearing safety step. A plan that fails validation is returned with reasoning; the agent revises or escalates. *The Plan/Validate boundary is the load-bearing architectural moment.* |
| 5 | **Action** | The validated action executes against the relevant system of record — dialer, payment platform, dispute portal, LMS. |
| 6 | **Observation** | Capture what happened. Outcome, side effects, downstream signals. |
| 7 | **Reflection** | A bounded learning step. System updates governed memory, surfaces lessons, feeds outcome data into the world model's continual-learning pipeline. **Foundation weights stay frozen; memory and adapters carry the learning.** |

**CRO-prose for the loop** (use when the audience is operational, not technical):

> Sense the work. Read the rules. Decide the action. Get it cleared. Do it. Watch what happens. Learn from it.

**Lineage to name when credibility is needed:** PPAS for the broader Perceive-Plan-Act sequence; Reflexion and Voyager for the Reflection phase with governed memory updates and frozen base weights; the dual-verification line of work for the separation between Plan and Validate.

The loop is **observable end to end**. Every phase emits structured artefacts. An auditor can reconstruct the reasoning behind any action taken in production, in full, after the fact.

### The five modules

| Module | Role | What it is |
|---|---|---|
| **Kendra** | The Core Runtime | The substrate the loop runs on. Where the world model lives, where the adjudicator runs, where the loop is orchestrated, where the observability layer surfaces what every agent is doing and why. When we say "KrimOS," what we mean operationally is Kendra plus everything it hosts. |
| **Karta** | The AI Co-Workers | The agents themselves. Specialised for the work across the entire lifecycle — origination (onboarding, verification, application processing), servicing, collections, hardship, disputes, reconciliation, customer support. They are the actors inside the loop. |
| **Kriya** | The Adjudicator | The safety layer, named. The pre-execution validation system. Every Karta action passes through Kriya before it leaves the runtime. |
| **Kupa** | The Command Centres | The operator surface. Where a head of collections sees what every agent is doing across every portfolio, where policy is set, where exceptions surface. |
| **Kula** | The Operator Copilot | The staff-facing assistant. Where a human operator queries the runtime, asks why a decision was made, requests overrides. |

Sanskrit names are load-bearing — they trace a 2,000-year vocabulary that thought seriously about the relationship between *karma* (action), *karta* (the actor), and *dharma* (the rules of action). They are not aesthetic.

**On translation:** on first mention in any external document, render as *Kendra · the Core Runtime*, *Karta · the AI Co-Workers*, etc. Do not strip the Sanskrit; do not strip the English. Both, together, every first mention.

### Two innovations. One loop. Five modules. One product.

### What the layers enable, per role *(added v1.2 — the enablement map)*

The scope is end to end; the enablement is role-specific. This table is the canonical answer to "what does KrimOS let each person do that they could not do before."

| Role | Layer(s) they live in | What KrimOS enables them to do |
|---|---|---|
| **COO / Heads of Origination, Servicing, Collections** | Kupa (Command Centres) | Run end-to-end operations as supervised autonomous work. Govern by policy and exception rather than headcount and queue management. Capacity stops being the binding constraint. |
| **CRO / Chief Credit Officer** | Kriya (the Adjudicator) + the receipts | Policy executed faithfully on every account at every lifecycle stage — enforced *before* actions fire, not sampled after. Risk appetite becomes something the runtime holds, not something training decks approximate. |
| **Compliance / MRM / Internal Audit** | The loop's artefacts + dual model cards | Replay any decision end to end. Conduct rules enforced pre-execution. Reviews stop being archaeology; the evidence ships with the action. |
| **Frontline + back-office staff** | Kula (Operator Copilot) | Concentrated on the judgment work — the escalations, the overrides, the edge cases. They query the runtime in plain language and it explains itself. They are promoted, not displaced. |
| **CTO / CDO** | Kendra (Core Runtime) | One runtime above the systems of record — origination platform, LMS, dialer, payment rails report into it. Full observability. No rip-and-replace. |
| **The borrower** | Karta's customer-facing operations | Decisions in seconds at any stage — application, hardship request, dispute — with explanations that are faithful traces of the reasoning, in their language, at any hour. |

---

---

## §4 — WHY IT MATTERS

### What is broken

Lending operations run on human middleware across the entire lifecycle — application processing and verification at origination; accounts, payments and queries in servicing; collections, hardship, and disputes after; compliance and reporting throughout. A US auto lender at scale runs this work at a unit cost that has barely moved in fifteen years. Roll rates respond to staffing, not intelligence. Cost-to-collect rises with portfolio stress, exactly when margins thin. Compliance incidents accumulate in the long tail — the cases the script did not anticipate. The pain is most *acute* post-disbursal (the largest unautomated cost centre in financial services), but the broken layer spans application to closure — and so does KrimOS.

The reason this layer has not been automated is not that the industry lacks ambition. It is that **every available tool has been the wrong shape for the work**:

- Rule engines do not generalise across the long tail.
- Workflow platforms encode the easy paths and outsource the hard ones to humans.
- RPA replicates clicks without understanding intent.
- Off-the-shelf LLMs reason fluently but cannot be trusted to act inside a regulated decision — they hallucinate, they drift, they leave no defensible audit trail.

### The genuine operational pain Krim addresses (lending advisor's grounded list)

Specifically — and these are the lines that earn a meeting with a real Head of Collections:

- **The 31–60 DPD self-cure leakage.** Cure rates in this bucket compressed badly since 2023. US auto 90+ DPD climbed from ~3.8% (Q1 2023) to ~5.17% (Q4 2025) — a real cohort migration problem that starts in 31–60 where treatment intensity, channel choice, and message sequencing decide whether the loan rolls or self-cures. 30–50% leakage between "should have self-cured" and "actually self-cured" is on the table.
- **Hardship-call routing under FCA Consumer Duty.** The March 2025 FCA vulnerable-customer review criticised firms for under-detection. A lender facing a £5m–£20m s.166 skilled-person review on collections conduct is a *buying trigger*.
- **The chargeoff-to-recovery handoff.** 8–15% of recoverable balance leaks at the seam between in-house ops, agency placement, and legal/repo.
- **Dispute backlogs against Reg X NOE 30-day clocks.** Servicers regularly blow these because the case isn't routed to the right SME and the clock isn't surfaced until red.
- **NPA classification under RBI IRACP Directions 2025.** SMA-1/SMA-2 day-counting + borrower-wise NPA tagging caught NBFCs off-side in 2023–25.

### What Krim is NOT (and must never claim)

| Don't claim | Why |
|---|---|
| Demands replacement of incumbent decisioning engines | KrimOS runs origination *operations* end to end. Where an institution has an incumbent decisioning core (Provenir / PowerCurve / FICO), KrimOS integrates with it rather than demanding rip-and-replace. Deployment posture, **not** a scope limit. |
| "Hallucination-free" / "zero hallucination" | A risk officer reads this and stops. We claim **adjudication**, not absence. |
| "Replaces collections / servicing" | Triggers FTE-displacement issues + MRM scope creep. We augment, orchestrate, concentrate human work on what still requires a person. |
| "Continuously improving" without qualification | Dangerous under SR 26-2 and RBI MRM. Self-modifying weights is exactly what the regulator is now demanding visibility into. Reframe as **"frozen base weights; governed, attributable, reversible memory updates under your change-control."** |
| Validates the bank's *models* | We validate agent *plans and actions*. Conflating this with model validation puts Krim on a collision course with MRM and ModelOp/Monitaur/Fiddler. |
| "Sovereign AI champion" as identity | Capability, not identity. Make it deployability (in-country, IFS Cloud, data residency) — not nationalist marketing. |

### Why prior AI attempts have failed

Three failure modes, repeated across the industry:

1. **Cognition without safety.** Capable model deployed against regulated work without a separate adjudication layer. Works in pilots, fails in production the first time it invents a settlement offer. Killed in MRM review.
2. **Safety without cognition.** Rule engines and policy-bound chatbots that cannot reason about the long tail. Auditable but useless on anything outside the original specification. Graduates humans from typing to clicking.
3. **Neither, but with confidence.** The bulk of "agentic AI" marketing in 2025. LLM wrappers around workflow tools sold as autonomy. No world model. No adjudicator. No defensible position when something goes wrong.

KrimOS is the first system in the regulated-operations market designed with both layers as primitives.

---

## §5 — WHO IT'S FOR (INTERNAL ONLY — NEVER ON THE PAGE)

> The buyer is named *internally* and never on the page. The CRO will recognise themselves in the architecture without being addressed by title.

### The buyer hierarchy *(corrected from v1.0)*

| Order | Role | What they care about | What unlocks them |
|---|---|---|---|
| **1 — First conversation** | **Head of MRM / CDO** | Whether Krim is buildable into the bank's model risk framework. Inventory placement, validation regime, drift monitoring, change-control. | MRM-ready dual model card (World Model + Adjudicator) + SR 26-2 mapping. **MRM is your *co-buyer*, not your gate.** |
| **2 — Operational champion** | **Head of Collections / Servicing** | RPC, cure rates, roll rates, conduct flags, agent productivity. | Named pilot + specific metric uplift (e.g., 31–60 DPD cure +200–400 bps documented). |
| **3 — Pilot budget** | **COO + CRO** | COO owns op-P&L; CRO owns risk appetite. They co-buy the pilot. | Implementation lift + incumbent-displacement story (FIS / Fiserv / Genesys / NICE). |
| **4 — Audit + security clearance** | **Head of Internal Audit (distinct from CISO)** + CISO | Audit replays the seven-phase loop. CISO clears the data flow. | The replay-ability of the loop is built *for Internal Audit*. Address them by name. ISO 42001 + SOC 2 Type II + DPDP assessment. |
| **5 — Conduct + fair-lending** | **CCO / Conduct Risk** | Consumer Duty, UDAAP, fair lending, vulnerable customer. | Demonstration that the adjudicator catches *prohibited* actions, not just wrong ones. Fair-lending evidence pack. |
| **6 — Co-blocker (do not underweight)** | **Chief Credit Officer** | Existing credit policy + LGD model | Krim *executes* policy more faithfully; surfaces violations; does not touch the LGD or origination decisioning. |
| **7 — Implementation plumber** | **CTO / CDO** | Integration burden, observability, exit plan | Adapter strategy for top-5 LOS in each market; reference architecture diagram with VPC boundaries. |

### The cast in three sentences

**MRM is the first conversation**, not the gate. Win them and they become your co-champion; the entire foundation of frozen weights + governed memory + dual model cards is built for them. Heads of Collections / Servicing are the *operational* champion who proves the metric. Internal Audit and Conduct each get their own meeting — do not combine.

### The end users

- **The operator** (collections agent, servicing rep, back-office analyst): Their relationship to KrimOS is mediated by **Kula**. They are not displaced; they are concentrated on the work that still requires a person. This matters for change management — and it matters morally.
- **The borrower**: The end-end user, sometimes directly through customer-facing operations, sometimes indirectly. Their experience improves when the institution stops sending them through scripts they did not consent to.

### The five sentences a real practitioner says to a peer over coffee

The homepage's job is to make these honestly sayable:

1. *"They sit between our LOS and the dialer. The bit I actually like is that they won't send anything until a second model has signed off. It's caught a few howlers."*
2. *"It's not another LLM wrapper — they've got something they call a world model, and they plan against it. Took a while to convince the risk team, but they came with a proper SR 26-2 model card."*
3. *"We ran them in shadow mode for ninety days. Cure on 31-60 was up about three hundred bps and the conduct team had fewer flags, not more."*
4. *"Every decision is replayable end to end. Internal audit stopped objecting."*
5. *"They're Indian, they know the regulators, and they host locally. Procurement was happy."*

### The three sentences the pitch lives or dies on *(refined v1.1)*

**Sequence in the room: 1 → 3 → 2** (de-risk first, prove not-a-research-project second, land the architectural punchline third).

1. *"KrimOS is the cognition and control layer on top of your existing lending stack — running operations end to end, application to closure. Not a rip-and-replace of your core."*
2. *"Every action our agent proposes is **validated** by a separately-trained model before it touches your system of record. Every decision is replayable. Every memory update is under your change-control."*
3. *"We were built around your jurisdiction's framework from day one. Here is our SR 26-2 mapping. Here is the dual model card for the World Model and the Adjudicator. Parallel mappings exist for Consumer Duty and RBI Digital Lending Directions 2025."*

Everything on the page serves those three sentences. Anything that doesn't is decoration.

**Verbal discipline:** *validated* not *refused*; *end-to-end lending operations* — the full lifecycle is the product claim (user-locked; see lock #12); *separately-trained model* not *second model* (precision); one regulation by jurisdiction, not three in one breath.

---

## §6 — THE VISION

### Ten years out (2036)

A senior credit officer at HDFC arrives at 9:14 a.m. Her morning view is not a queue of 4,000 files. It is a population-level briefing rendered by Kendra: 31 million live accounts, 14,000 actions taken by KrimOS overnight, 312 actions held by Karta for human review, three regulatory drift signals flagged against an RBI circular issued the previous week. She does not approve loans. She **governs the model that approves loans**. Her day is spent on the 312 escalations, the drift signals, and a quarterly conversation with the RBI's supervisory team.

The borrower experience has compressed. A Tier-3 MSME owner in Madurai applies for working capital at 11 p.m. and receives a decision in nine seconds, with a plain-language explanation generated not as post-hoc rationalisation but as a faithful trace of the actual reasoning. If she disputes it, the dispute is adjudicated by a separate reasoner that has never seen the original decision. She wins or loses on the merits.

The supervisor's work has changed in kind. Rather than sampling files six months after the fact, the auditor reviews the loop directly — its plans, its adjudications, its overrides — through artefacts the institution makes available. For the first time, the supervisory question moves from *"what files did you sample?"* to *"where in your decision function did this case sit?"*

Headcount has redistributed, not collapsed. The 40,000-person operations floor is now 4,000 people — but they are the highest-leverage 4,000 the bank has ever employed. Model governors. Constitutional drafters. Edge-case adjudicators. The people who decide what the machine should refuse to do.

### The horizon beyond lending

Lending is the proving ground because it is the hardest regulated operations market — large, adversarial, long-tailed, heavily examined, and structurally resistant to automation. A system that holds up in US auto-finance collections holds up almost anywhere.

The same architecture — world model plus adjudicator, composed in an observable loop — generalises to insurance claims, healthcare prior authorisation and revenue cycle, utilities, telecom dunning, government benefits administration, tax. The world model changes; the safety layer changes; the loop does not.

**Generalisation is the vision, not the pitch.** The homepage talks about regulated operations broadly because that is the category. The specifics — auto-finance, US, the named institutions — are the proof. The horizon beyond lending is reserved for the vision page and the investor narrative.

### The Indian dimension — substance, not branding

India in 2026 is the only large economy that has simultaneously:
- Built sovereign digital public infrastructure at population scale (Aadhaar, UPI, ONDC, Account Aggregator)
- Maintained a regulator with the seriousness to discipline global banks (RBI)
- Launched a serious data protection regime (DPDP Act 2023)
- Run a credit market with both the most sophisticated digital lending stack and the largest informal credit gap on earth

No other country has this combination. The US has scale without sovereignty over its stack. China has sovereignty without exportable legitimacy. Europe has regulation without builders. India has all three, uneasily.

Krim's Indian roots are a **vision asset** because India is the only jurisdiction where a regulated-AI infrastructure company can be born *natively bilingual* in regulator-speak and builder-speak — then exported to every emerging market that trusts an Indian regulatory lineage more than an American one (Indonesia, Vietnam, Nigeria, Kenya, Brazil, the Gulf).

**The framing line:** *"Built in India for global lending."* Lead with capability, never identity. The sovereignty story is sub-page material for buyers who want it — never the front-page narrative.

### The 50-year horizon

In 2076, if everything goes right, Krim is not a company in the sense we currently use the word. It is a **standards-bearing substrate** — the way TCP/IP is a substrate, the way SWIFT is a substrate, the way ISO 9001 is a substrate. Specifically: Krim has become *the reference architecture for how regulated machine cognition is composed, validated, and supervised* — implemented by Krim's own stack in the institutions that matter most, and by certified-compatible implementations elsewhere.

> **Krim becomes to the cognition layer of regulated work what settlement rails became to retail commerce. Not the merchant. Not the bank. The rails. The standard.**

That is the largest defensible claim.

---

## §7 — THE BRAND VOICE

Five qualities. They compose; they are not a menu.

| Quality | What it means |
|---|---|
| **Delicate** | We say less than we know. We do not overclaim. We let the reader notice what we are saying. A reader who feels they have arrived at the conclusion themselves will trust it more than a reader who was told. |
| **Clever** | We earn our sentences. If a sentence could appear on any AI startup's homepage, we delete it and try again. |
| **Institutional** | We sound like we belong in the room with CROs and central bankers. We do not sound like we are explaining ourselves to a TechCrunch reporter. |
| **Technically credible** | When we make a technical claim, we make it precisely and we can defend it. We invoke lineage (JEPA, Reflexion, Constitutional Classifiers, Deliberative Alignment, VeriGuard) when an engineer is in the room. We do not invoke lineage as decoration when one is not. |
| **Ambitious without bullshit** | We are building something that does not exist. We say so. We do not say so with exclamation marks. |

### What we sound like, and what we don't *(refined v1.1)*

**We sound like:** an Anthropic systems card with a memo's cadence — declarative, lineage-aware, technically careful, not performing. The closest non-AI analogue is a careful fund letter (Oaktree memos in tone; not Renaissance, which is laconic and mathematical — wrong shape for this material).

**We do not sound like:** a SaaS landing page. A keynote at a fintech conference. A VC tweet thread. A press release. A founder blog reaching for "civilisational" language. A consultancy memo using "load-bearing" and "vision asset" as decoration.

### Verb list *(refined v1.1)*

**Verbs that earn their place** (each names something the system does that competitors don't): **adjudicates, refuses, consents, reflects, perceives, declines, records, escalates.**

**Verbs we use but do not lean on** (default-category verbs — necessary but not load-bearing; never use as a hero verb): reasons, plans.

**Verbs banned:** empower, enable, transform, supercharge, unlock, revolutionize, deliver, manage, handle, leverage, optimise, streamline.

**Nouns banned (as hero words):** seamless, end-to-end, AI-powered, next-generation, intelligent automation, magical, simple (as a value claim).

**Phrases retired:** "Superintelligent." "AI your regulator can read." "Sovereign" (as identity claim — use only as capability claim). "Agentic AI" (used by everyone with nothing to say — we name what our agents *do*). "Hallucination-free." "Autopilot." "Human-in-the-loop" (correct but worn out as a hero phrase).

**Rules of style:** We do not exclaim. We do not hedge. We do not pad. We do not list adjectives. When in doubt, we cut.

---

## §8 — TERMINOLOGY

### Two-tier framing

Buyer-facing language is the language a CRO would use in a board meeting. Technical-credibility language is the language a research engineer would use in a paper. Both must be available; they must never be used in the wrong room.

| Concept | Buyer-facing (CRO/COO) | Technical-credibility (CDO/CTO/researcher) |
|---|---|---|
| The model | *"A learned model of how lending actually behaves"* | Lending World Model (JEPA-lineage, action-conditioned dynamics, counterfactual rollouts) |
| The safety layer | The Adjudicator. *"A separate model that decides whether to let an action fire"* | Pre-execution validation; intent adjudication (Constitutional Classifiers + Deliberative Alignment + VeriGuard lineage) |
| The loop | *"Sense the work. Read the rules. Decide. Get it cleared. Do it. Watch. Learn."* | Seven-phase cognitive loop (Perceive / Review / Plan / Validate / Action / Observation / Reflection) |
| Improvement | *"The system gets sharper the longer it runs — the foundation model never has to be retrained"* | Continual learning with frozen base weights and governed memory updates (Reflexion / Voyager lineage) |
| Krim's runtime | *"An operating system for regulated work"* | Agent harness; intelligence runtime |

### The lineage to invoke when credibility is required

| Concept | Lineage to cite |
|---|---|
| World model | JEPA / V-JEPA 2 / LeJEPA (LeCun, 2022–2025); World Labs (Fei-Fei Li); broader world-model survey literature |
| Pre-execution validation | Constitutional Classifiers (Anthropic, Feb 2025); Deliberative Alignment (OpenAI, 2024); VeriGuard (arXiv 2510.05156); AgentSpec (ICSE 2026); Pre-Execution Bench |
| Reflection / continual learning | Reflexion (Shinn et al., 2023); Voyager (Wang et al., 2023); MemRL; audited skill-graph self-improvement |
| Agent harness | Anthropic Harness Engineering (2025–26); Claude Agent SDK |
| Regulatory | SR 11-7 → SR 26-2 (April 2026 replacement, principles-based, agentic AI excluded from scope); RBI Digital Lending Directions 2025; RBI IRACP Directions 2025; FCA Consumer Duty + March 2025 vulnerable-customer review; ISO 42001; EU AI Act Annex III; CFPB Reg X NOE/RFI |

We cite these when an engineer or regulator is in the room. We do not stack them on the homepage.

---

## §9 — CATEGORY POSITIONING

### The category Krim is defining

Existing categories are wrong-shape:
- **"Agent platform"** (LangChain, AutoGen) — too generic; doesn't capture the world model
- **"Vertical AI"** (Sierra, Harvey, Hippocratic) — too narrow; doesn't capture the safety reasoning architecture
- **"AI infrastructure"** (Modal, Anyscale) — wrong layer
- **"Foundation model company"** (Anthropic, OpenAI) — wrong abstraction
- **"AI safety company"** (Conjecture) — incomplete; ours is operationalised

The category name we claim:

> **The operating system for regulated work.**

We own this phrase on the homepage. It is what the visitor takes away in the seven seconds before they decide whether to scroll.

### Closest comparables — what to learn from, what to distinguish

| Company | What they do | What Krim shares | How we differ |
|---|---|---|---|
| **Sierra** (Bret Taylor / Clay Bavor) | AI agent platform for customer service | Vertical agent platform pattern; "AI agent platform" framing | They serve a single function (CX) across verticals. We serve a single vertical (regulated finance) across the full operations lifecycle. They lack the world-model + adjudicator architectural commitment. |
| **Harvey** | AI for elite law firms | Regulated-work vertical; partnership with the industry | Their architecture is application-layer over OpenAI/Anthropic. Ours is a runtime with two proprietary substrates. |
| **Hippocratic AI** | Safety-focused LLM for healthcare | Safety-first positioning; *"safety-focused LLM for healthcare"* is structurally analogous to *"safety-focused runtime for regulated finance"* | Their safety is a single trained LLM. Ours is a separate adjudicator architecturally distinct from the cognition. |
| **World Labs** (Fei-Fei Li) | Spatial / large world models | Direct world-model lineage; the academic credibility we cite | They build spatial WM for embodied AI; we build domain WM for regulated operations. Different verticals; shared architectural family. |
| **Anthropic** (safety research) | Constitutional Classifiers; Deliberative Alignment | Direct lineage for the adjudicator | Anthropic builds the safety-as-research mode; we build safety-as-product specifically composed with a domain world model. |
| **Sakana AI** (Tokyo) | Evolutionary / nature-inspired foundation research | Sovereign-AI champion of a non-US jurisdiction — Krim is the Indian analogue | Different layer of the stack; different domain. |
| **Imbue** | "General-purpose intelligence with reasoning systems" | Reasoning-system focus; closed-loop ambition | Closer to research lab than product company. We ship a runtime for a regulated category. |

### The "X for Y" formulation

Tested candidates and the recommendation:

| Candidate | Verdict |
|---|---|
| *"Anthropic for regulated operations"* | Borrows credibility but invites overlap-with-Anthropic conversation that distracts. ❌ |
| *"Stripe for regulated AI"* | Wrong abstraction; Stripe is APIs, we are an OS. ❌ |
| *"Sierra for regulated finance"* | Too narrow for the world-model claim. ❌ |
| *"Krim is the operating system for regulated work"* | Owns category. Matches product. Self-describing. ✓ **Recommended.** |
| *"Krim is what happens when world models meet pre-execution validation"* | Accurate; too long for hero; reserve for the long-form positioning paragraph. ✓ for the 200-word paragraph. |

### Three-level positioning hierarchy

| Layer | Text |
|---|---|
| **7-word brand** | *"The operating system for regulated work."* |
| **30-word product** | *"KrimOS pairs a learned model of lending with a separate adjudicator that approves every action before it executes — composed in a loop that improves with use."* |
| **200-word paragraph** | *(The "One paragraph" thesis in §2.)* |

### Why "OS" stays as the product metaphor

Despite earlier consideration of "cognition layer" / "intelligence runtime" — **KrimOS keeps the OS.** Reasons:

- Single product, not a platform of tools
- Layer underneath the apps, not adjacent to them
- Multiple load-bearing components composed together
- Operating layer between hardware (foundation models) and applications (workflows)
- Memorable, owns category, matches the named product

The brand-level framing is also OS: *"the operating system for regulated work."*

### The competitive-defusing line *(new v1.1)*

Every CRO will be told by their CIO: *"FIS / Fiserv / Salesforce / Accenture is releasing agentic AI next year — why don't we wait?"* The single sentence that defuses the wait-and-see deferral:

> **"KrimOS sits on top of FIS, Fiserv, Jack Henry, nCino, Finastra, TCS BaNCS — not in place of them. We are the cognition above the system of record, not a replacement for it."**

Put this on the homepage. It saves thirty procurement objections.

### Specific competitive framings

| Displaced against | The line |
|---|---|
| Incumbent stack (FIS / Fiserv / nCino / Pennant) | *"Not your record-of-truth. The decision layer above it."* |
| Legacy collections (Genesys / NICE / FICO Debt Manager) | *"Genesys runs the dialer. KrimOS decides what it dials, when, with what message — and validates every action before it fires. Genesys stays. Your agency-placement budget falls 15–30% in 18 months."* |
| Horizontal agent platforms (Sierra / Decagon / Cresta) | *"They run the conversation. We adjudicate the decision behind it. We pre-validate every action they're about to take."* |
| Build-on-Anthropic / OpenAI internally | *"You can. 18–24 months and a model-validated launch. We ship with the dual model card, the regulatory mapping, and the adjudicator trained on regulated-operations data."* |
| Big SI agentic offering (Accenture / Deloitte / TCS BFSI) | *"SIs implement Krim. They are partners, not competitors. Sign one of the three before they decide which they are."* |

### The credibility risk and the mitigation

The risk in claiming world model + pre-execution validation + closed cognitive loop simultaneously is the **SSI cosplay trap**: presenting standard 2025 research vocabulary as proprietary while not engaging with the specific evaluations and governance artefacts a sophisticated buyer expects.

The mitigation is **published proof**, in this order of urgency:
1. SR 26-2 mapping document, downloadable (gated)
2. MRM-ready model card for the Adjudicator
3. Architecture brief — one-page diagram with component names, hosting options, data flow
4. One named pilot with credible metric uplift on 31–60 DPD cure
5. ISO 42001 + SOC 2 Type II
6. Named advisors / board: retired Head of Collections, former MRM head, former PRA/FCA/RBI examiner

Until those exist, the homepage's job is to *signal* their readiness, not *claim* their completion.

### Right level of technical detail by section

| Page section | Audience | Technical depth |
|---|---|---|
| Hero | CRO / COO | Brand statement. Names the two innovations without explaining them. |
| Section 2 — Two Innovations | CDO | Product-level technical. Mentions JEPA / Constitutional Classifiers lineage in passing for the reader who notices. |
| Section 3 — The Loop | Engineering buyer | Architectural-level. Names the seven phases. Plan/Validate boundary called out. |
| Section 4 — KrimOS Modules | CTO / operator | Module-level operational. Each named with role. |
| Footer / Architecture brief | Research engineer / regulator | Full technical detail. Lineage cited explicitly. |

---

## §10 — THE HERO

### Twelve candidates

| # | Headline | Tagline | Argument |
|---|---|---|---|
| 1 | An operating system for regulated work. | Cognition that understands the work. Adjudication that consents to every action. | Lead with category claim. Both innovations in tagline. Delicate, institutional. |
| 2 | Cognition that understands lending. Safety that consents to every action. | KrimOS — the runtime for regulated operations. | Two innovations are the hero. KrimOS underneath. |
| 3 | We built a model of how lending actually behaves. And a second model that decides whether to let it act. | KrimOS — the operating system for regulated work. | Two-sentence reveal. Earns attention by being specific. |
| 4 | Autonomy with consent. | KrimOS is an operating system for regulated work — built on a model of the domain and an adjudicator that approves every action before it fires. | A phrase that is short, new, and exactly true. |
| 5 | Regulated work, reasoned. | A world model for lending. An adjudicator for every action. KrimOS — the runtime underneath. | Clever and compressed. Maybe too compressed. |
| 6 | The cognition was the easy part. | KrimOS pairs a learned model of lending with a separate adjudicator that reviews every action before it executes. | A frame the buyer has not heard. Repositions safety as the harder problem. |
| 7 | A runtime for work that cannot afford to be wrong. | KrimOS reasons about lending the way an experienced operator does, and refuses to act outside the bounds it has been given. | Leads with the stake, then names the mechanism. |
| 8 | Two innovations, one runtime. | A world model of lending. An adjudicator for every action. KrimOS. | Maximum architectural clarity. Slightly product-deck in tone. |
| 9 | We taught a system to understand lending. Then we taught a second one to decide what it's allowed to do. | KrimOS — the operating system for regulated work. | Long-form hero. Reads like the opening of a fund letter. |
| 10 | Cognition. Consent. Continuity. | KrimOS is the runtime for regulated operations: a learned model of the domain, an adjudicator for every action, a loop that improves with use. | Triadic. Names all three load-bearing properties. |
| 11 | An intelligence that understands the work. A second intelligence that decides whether to let it act. | KrimOS — the runtime underneath regulated operations. | Rephrases #3 with "intelligence" replacing "model." Slightly warmer. |
| 12 | Built to act inside the rules. | KrimOS is an operating system for regulated work, founded on a model of the domain and an adjudicator that reviews every action before it executes. | Most regulator-legible. May be too quiet. |

### Ranking

The hero needs to do three things in roughly seven seconds: **name the category, name what is new, earn the next scroll.** Both innovations must be present in equal weight without overloading the headline.

**Recommended hero (v1.1, refined per literary line-edit): #2.**

> **Cognition that understands the work. Safety that consents to every action.**
> *KrimOS is the runtime underneath.*

Refinements from v1.0: *the work* replaces *lending* (the page below earns the specificity; brand level stays general). Second line is now a real five-word declarative sentence, not a tagline pretending — the em-dash *"— the runtime for regulated operations"* read as marketing, not writing.

**Strong alternates:**
- **#4 — *"Autonomy with consent."*** Three words. Contains a real claim. *"Consent"* is the verb. Possibly even sharper as ***"Autonomy by consent"*** (more architectural).
- **#6 — *"The cognition was the easy part."*** Argues. The only hero candidate that does. *(Flag: a supervisor specifically warned "risk officers do not like this sentence." See open call H in §13.)*

**Strict deprecations after v1.1 review:** #1 ("operating system for regulated work") — accurate but inert label, not a sentence. #5 — comma carrying more work than words. #8 — pure product-deck. #10 ("Cognition. Consent. Continuity.") — three-word alliteration is the universal tell of a writer running out of ideas.

---

## §11 — THE HOMEPAGE STORY ARC

The homepage is the journey from "another AI vendor" to "this is structurally different" in under ninety seconds of scrolling.

### The journey of belief

| Scroll % | What the reader believes | What the page is doing |
|---|---|---|
| **0%** | Krim is probably another agentic AI company | Hero. Introduces the two-part claim. Cognition that understands. Safety that consents. Reader does not yet know what those phrases mean — they know they have not heard them before. |
| **30%** | There are two distinct innovations here, described with specificity I have not seen elsewhere | Section 2: Lending World Model + Adjudicator in equal weight. Enough technical surface to signal credibility (JEPA / Constitutional Classifiers lineage appears lightly) but not so much the CRO loses the thread. **The thesis must land by 30%. Everything after is evidence.** |
| **60%** | These two innovations compose into something operational. *This is the "aha".* | Section 3: the seven-phase loop. Not a process diagram with arrows — a sequence that the reader can follow, with the **Plan / Validate boundary as the load-bearing moment**. The reader sees, concretely, where cognition ends and consent begins. |
| **90%** | This is a system, not a feature | Section 4: the five modules. Kendra, Karta, Kriya, Kupa, Kula. Named, defined, each tied back to the loop. The reader understands they are looking at an operating system. |
| **End** | Wants the conversation | The ask is restrained — *"talk to the team," "read the architecture brief"* — never *"get started," "book a demo."* |

The journey of belief: **skeptical → interested → engaged with the specific architecture → recognising the category claim → wanting the conversation.**

---

## §12 — WHAT THIS DOCUMENT LOCKS *(updated v1.1)*

Things that cannot change without revisiting this document explicitly.

1. **KRIM is the company. KRIMOS is the product.** One product, one name. Never "Krim's products" in the plural.
2. **The two innovations are equal weight.** Lending World Model and Safety Layer (Kriya, the Adjudicator). Neither is a feature of the other. Both inside KrimOS.
3. **The seven-phase loop is the architecture.** Perceive · Review · Plan · Validate · Action · Observation · Reflection. **The Plan / Validate boundary is the load-bearing safety claim. Review is grounding/retrieval and is not architecturally peer to Validate — do not present it as such.**
4. **The novel architectural claim of the Adjudicator** is **adjudication over predicted downstream state under the world model** — not "intent over output." The structured-plan-as-input + world-model-rollout-as-context composition is the moat. The closest single research line is VeriGuard / AgentSpec / Pre-Execution Bench. *(Updated v1.1 per safety researcher pressure-test.)*
5. **The memory write gate is an explicit subordinate gate inside Reflection** — not an unowned process. Who/what adjudicates that a lesson learned is correct before it persists into memory is a named control. *(Added v1.1.)*
6. **The five modules are named and fixed.** Kendra · Karta · Kriya · Kupa · Kula. On first external mention always paired with English role (*Kendra · the Core Runtime*). **In supervisor-facing artefacts (model cards, audit packs, validation reports) the English term leads and the Sanskrit follows in parens or is dropped.** *(Strengthened v1.1.)*
7. **The principal, not the user.** The CRO at HDFC is Krim's *principal*. Krim renders the institution's judgement; it never replaces it.
8. **The civilisational frame (§1) is internal/recruiting only.** It never appears in buyer-facing or supervisor-facing material. *(Locked v1.1 — three independent specialists flagged the prior framing as procurement-toxic.)*
9. **Retired phrases.** "Superintelligent." "AI your regulator can read." "Sovereign" as identity claim. "Hallucination-free." "Autopilot." **Also retired per v1.1:** "First generation of machine-native institutional cognition." "Civilisational responsibility, not a product feature." "Brittle middle layer." "Vision asset." "Natively bilingual." "Cognition. Consent. Continuity." (three-word alliterations).
10. **Lineage citation discipline.** One primary citation per architectural commitment, in technical contexts only: **JEPA for the World Model encoder, VeriGuard for the Adjudicator (not Constitutional Classifiers), Reflexion for memory-and-skill governance.** Other citations go in footnotes. *(Tightened v1.1 — citation density was a credibility risk in v1.0.)*
11. **MRM is the first conversation, not a gate.** Whole buyer hierarchy reorders around this. The dual model card (World Model + Adjudicator) is the artefact that makes the first conversation a co-buy, not a clearance.
12. **END-TO-END lending operations is the product claim. USER-LOCKED — do not narrow again.** KrimOS automates the full lifecycle, application to closure: origination (onboarding, verification, application processing, decisioning workflows), servicing, collections, hardship, disputes, reconciliation, compliance and reporting — enterprise-facing AND customer-facing. *(v1.1's "post-disbursal" narrowing was an advisor's sales-proof tactic wrongly promoted to product definition; reversed by user instruction in v1.2.)* Where proof is strongest (early-stage collections, hardship, disputes) is **sales sequencing**, never a scope claim on any page. |
13. **The verb is *validate*, not *refuse*.** *Refuse* is what the regulator's report says about a model that didn't. We say *validate before*, *adjudicate before*, *clear before*. *(Locked v1.1 per GTM operator's correction.)*
14. **Continual learning is described as governed.** Frozen base weights. Memory updates under governance. Reflection traces that are auditable. **Never "self-learning" without the qualifier.**
15. **The voice is the Anthropic systems card with a memo's cadence.** Not Renaissance (laconic/mathematical — wrong shape). Not regulator's speech (linear — wrong shape). Anthropic-systems-card with Oaktree-memo cadence.
16. **Three sentences own the pitch** (see §5, refined v1.1). Sequence: 1 → 3 → 2.
17. **The hero (current locked recommendation): #2 in v1.1 form** — *"Cognition that understands the work. Safety that consents to every action. / KrimOS is the runtime underneath."* Subject to user sign-off on open call A.

---

## §13 — OPEN CALLS *(updated v1.1)*

### Resolved (closed by the v1.1 four-expert pressure-test)

| # | Open call | Resolution |
|---|---|---|
| **B** | "Sovereign" — retire or preserve as capability? | **Retired** as identity claim. Preserved only as deployability/data-residency capability in technical contexts. |
| **C** | Sanskrit module names | **Paired with English on first external mention** *(Kendra · the Core Runtime)*. In supervisor-facing artefacts the English term leads; Sanskrit in parens or dropped. *Karma / karta / dharma* etymology stays in §3 / brand book; never in the MRM packet. |
| **D** | "Full lending lifecycle" — narrow? | **REVERSED in v1.2 by user instruction.** KrimOS automates **end-to-end lending operations** — application to closure, enterprise and customer-facing. The v1.1 narrowing to "post-disbursal" was a sales-proof tactic wrongly promoted to product definition. Proof-strongest stages guide *pilot sequencing only* (see §17), never the product claim. |
| **E** | Loop as page-spine or one section | **Resolved earlier round: one section.** |
| **F** | Action Receipt placement | **Inline evidence at the Plan/Validate boundary inside the Loop section.** Not hero. |
| **G** | Three vs one marquee | **Three categorised marquees** (your direct call). |

### Still open (awaiting user decision)

| # | Open call | Recommendation |
|---|---|---|
| **A** | **Final hero.** Refined v1.1 candidate is #2 in its new form: *"Cognition that understands the work. Safety that consents to every action. / KrimOS is the runtime underneath."* | Confirm #2-as-refined, or push to **#4 *"Autonomy by consent"*** (three words, sharper), or **#6 *"The cognition was the easy part"*** (the only candidate that *argues* — see H). |
| **H** | **Hero #6 — "The cognition was the easy part."** Literary editor calls it the only candidate that argues. Supervisor specifically warns *"risk officers do not like this sentence."* | **Recommend: not the hero, but earn its place as the §2 opening sentence — where the page has already declared category, and the buyer is ready to read an argument.** Hero stays #2-refined. |
| **I** | **§1 civilisational frame.** Three specialists converge on cutting from buyer-facing. Doc currently keeps it as internal/recruiting-only with explicit caveat. | **Resolved by lock #8 — kept in foundation, never on the page.** Confirm. |
| **J** | **Hero second-line — em-dash tagline or real declarative sentence?** Literary editor: the em-dash construction reads as marketing. *"KrimOS is the runtime underneath"* (declarative) lands harder than *"KrimOS — the runtime for regulated operations."* | **Adopted in #2-refined above.** Confirm. |
| **K** | **"Built in India" — homepage placement.** Regulator and GTM operator agree on capability-not-identity. But the GTM operator names US-incorporation + US-based head of CS as the necessary procurement mitigation. | **Recommend: a one-line "Built in India for global lending" deep in the page (vision section). Real mitigation work — Krim US Inc., US-based CS leadership, AWS US-East data-residency option — moves to the operational roadmap (see §17).** |

---

## §14 — WHAT COMES NEXT

This foundation document is **v1.0**. It will evolve.

Likely additions in v1.1:
- Named pilot metrics once a customer agrees to be cited
- The architecture brief (a separate document, linked from this one)
- Specific module pages — one for each of Kendra / Karta / Kriya / Kupa / Kula — built from §3
- The vision page (drawn from §6's 10-year and 50-year horizons)
- The "Built in India" capability page (drawn from §6's Indian dimension)

Always do this with this document open. Always cite the section that justifies the move. If the move can't be justified from this document, the document needs to be updated first.

---

---

## §15 — THE LOAD-BEARING ASSUMPTION *(new v1.1)*

A frontier-safety researcher, reading v1.0, isolated the single assumption underlying the entire thesis. We name it here, because owning it is more credible than hiding it.

> **The entire architecture rests on whether the Lending World Model can, in production, produce *coherent counterfactual predictions* — predicted next-state distributions under hypothetical actions — that are accurate enough for the Adjudicator to consume them and refuse actions on the basis of *predicted downstream effects*.**

If the assumption holds, the whole architecture works. Cognition reasons against the model; the Adjudicator gates on predicted effects; the loop is genuinely safer than output-classifier guardrails; the moat is the model.

If the assumption fails — if the World Model's counterfactual predictions are no better calibrated than a strong baseline, or if they degrade catastrophically under regime shift — then the Adjudicator's adjudication of *predicted downstream state* collapses back to plan-token-string adjudication, which is Constitutional Classifiers with extra steps, and the JEPA citation becomes decorative.

**Every other claim in this document is downstream of whether this one holds.**

This is therefore:
- The question on which the company is technically bet.
- The first question to expect from any frontier-safety researcher in a recruiting conversation.
- The first question to expect from a sophisticated CDO buyer (Bajaj Finance / Capital One / NatWest scale) on second meeting.
- The first eval to publish in the architecture brief.
- The metric every internal milestone is measured against.

The honest discipline this section is meant to enforce: **never let the marketing prose outrun the calibration of the counterfactual predictions.** When the counterfactuals are good, write what we've built. When they are not yet good, write what we are building.

---

## §16 — WHAT IS NOT YET BUILT *(new v1.1)*

A document of this register has to be honest about its frontier. The four-expert review identified gaps in three layers — safety/architecture, regulatory, commercial. They are listed below not as marketing concerns but as work-with-owners-and-dates. *None of these gaps should be papered over in v1.2 of this document; they should be closed, and the document should be updated when they are.*

### Safety / architecture artefacts not yet documented

1. **Threat model document.** Adversary capabilities. Attack surfaces (borrower-side prompt injection through borrower messages; tool-output injection through downstream systems; memory poisoning via reflection traces; Adjudicator probing via observed refusals; distributional drift under macro/regime shift). What the architecture does about each.
2. **Eval suite.** Named benchmarks for jailbreak resistance, adversarial plan generation (AgentSpec-style), indirect prompt injection through tools, policy-violation attempt rates, false-refusal rates on legitimate edge-case plans.
3. **Red-team results.** Independent third-party red-team of the Adjudicator against a pre-execution adversarial-plan corpus. Methodology published, not just headline result.
4. **Memory write gate.** Explicit named control: who or what adjudicates that a lesson-learned is a *correct* lesson before it persists into governed memory. The Validate phase adjudicates actions; nothing in the current loop adjudicates *reflections*. This is the single largest safety hole in v1.0 and is now lock #5.
5. **Adjudicator attack surface.** If the agent learns the Adjudicator's decision boundary via observed refusals, it can plan around it. The classifier-as-target problem from the adversarial-ML literature. We need to publish the mitigation.
6. **Distributional-shift monitoring on the World Model.** What detects a regime change (rate cycle, recession, policy shock) and what happens when it does. Calibration decay thresholds. Halt-and-escalate protocol.
7. **Constitutional spec format.** The Adjudicator consults *something*. The format, ownership, versioning, and testing of that spec is the actual artefact. Currently underspecified.
8. **Encoder design defence.** Why a JEPA-style joint-embedding architecture over the lower-dimensional, semi-structured borrower/account/channel state, rather than a structured state-space model or a learned tabular dynamics model. Inductive-bias choice must be defensible to a JEPA peer.
9. **Counterfactual evaluation suite for the World Model.** Held-out portfolio, calibration curves on outcome distributions, distributional-shift behaviour. See §15 — this is the load-bearing eval.

### Regulatory artefacts not yet published

10. **Dual MRM-ready model card** — one for the World Model (currently silent — itself a flag), one for the Adjudicator.
11. **Regulatory mapping appendix** — single document cross-walking each of: SR 26-2, PRA SS1/23, SS2/21, FCA Consumer Duty + March 2025 vulnerable-customer review, FCA SYSC 8, RBI Digital Lending Directions 2025, RBI IRACP Directions 2025 Annexure on model governance, EU AI Act Annex III high-risk, ISO 42001, DPDP Act 2023 — to specific KrimOS artefacts/controls.
12. **Stressed-exit plan.** PRA SS2/21, FCA SYSC 8, EBA outsourcing. 90-day data extraction, model-artefact escrow, run-off mode, regulator-notifiable trigger events.
13. **Concentration-risk statement.**
14. **Incident-response runbook with regulator-notification SLAs.**
15. **Adversarial-robustness statement** for the Adjudicator.
16. **Bias / fair-lending evidence pack.** ECOA, Reg B, FCA Consumer Duty vulnerable-customer expectations, RBI Fair Practices Code.
17. **Contractual Accountability Preservation Schedule.** Exhibit committing Krim to (a) no autonomous policy revision, (b) cooperation with s.166 enquiries, (c) regulator-direct read access on demand, (d) escrow of model artefacts.
18. **ISO 42001 certification** in progress with named target date; **SOC 2 Type II** report; **DPDP Act 2023** assessment.
19. **Named advisors.** Specifically a former RBI DoS examiner *and* a former PRA model-risk supervisor. (Without these the cross-jurisdictional credibility claim is incomplete.)

---

## §17 — COMMERCIAL READINESS *(new v1.1)*

The GTM operator's verdict: *"The thinking in this foundation is the strongest single piece of category positioning I've read this year. The GTM apparatus around it is six months behind the thinking. Close that gap first; the deal mechanics follow."*

The apparatus that has to exist before $4–8M ACV is closable at a US/UK Tier-2 inside 18 months:

### The shape of the first three customers

| Position | Profile | Why this one |
|---|---|---|
| **1st** | **US specialty auto lender or US regional bank's indirect auto book**, $5–15bn AUM, prime/near-prime mix, post-2023 cure-rate pressure, recently-appointed Head of Collections. *(Westlake / Exeter / Santander Consumer USA / Synovus / Truist regional auto book class.)* | Pain is acute and measurable (31–60 DPD leakage). Procurement cycle faster than a money-centre bank. Architecture risk tolerance higher. Metric uplift provable in 90 days. |
| **2nd** | **Indian NBFC under RBI Digital Lending Directions pressure.** *(Bajaj Finance / Poonawalla / L&T Finance class.)* | Regulator's posture creates the buying trigger. Sovereignty story lands without needing to lead with it. Largest retail-credit data volume on earth — World Model credibility. |
| **3rd** | **UK Tier-2 under FCA Consumer Duty s.166 risk.** *(Aldermore / Shawbrook / OneSavings class.)* | s.166 review is a board-level conversation. Vulnerability-detection failure mode is the named buying trigger. Unlocks European TAM. |

**Do not land a US money-centre first.** Procurement cycle alone is 18 months. The US specialty auto logo unlocks the UK procurement; the Indian logo unlocks the World Model credibility; the UK logo unlocks European TAM.

### Commercial artefacts not yet published

1. **Commercial Model page.** Not prices — *structure.* Hybrid: minimum platform fee (annual subscription scaling with portfolio AUM) + adjudicated-action consumption fee (per validated action) + outcome share capped (bps of cure-rate uplift above an agreed baseline, on a control segment, capped at % of platform fee). "Multi-year, capped, with a fixed-fee transition floor."
2. **Reference architecture diagram.** One page. VPC boundaries, data flow, hosting matrix (US-East / UK-South / Mumbai / IFS-Cloud-when-live), what runs in-tenant vs in-Krim-cloud, where the Adjudicator sits, where the audit log lands.
3. **Integration adapter map.** Top-5 LOS by region (US: Fiserv DNA/Premier, FIS Optis/IBS, Jack Henry SilverLake, nCino, Black Knight MSP. UK: Finastra Mortgagebot/Phoebus/Pennant/Temenos. India: TCS BaNCS, Infosys Finacle, Oracle FLEXCUBE). Top-3 dialers (Genesys Cloud, NICE CXone, Five9). Top-3 ticketing (ServiceNow, Salesforce Service Cloud, Pega). Top-3 dispute/collections (FICO Debt Manager, CGI-CACS, Latitude by Genesys, TransUnion CMS).
4. **Three-gate pilot motion.** Shadow → Co-pilot → Bounded autonomy. 60–90 days each. Specific success criteria per gate.
5. **Buy-vs-build TCO page.** Defuses the "we'll build internally on Anthropic/OpenAI" conversation. 18–24 month internal timeline vs Krim's shipped artefacts.
6. **SI partnership.** One of {Deloitte Banking Risk, EY Lending Transformation, Accenture, TCS BFSI, Infosys Finacle Services}. *Without an SI you do not close $4–8M ACV in 18 months at a US Tier-2.* Single largest GTM hole.
7. **Design partner motion with named economics.** Free pilot? Cost-plus? Equity warrant? Co-development? Term sheet shape. Path from design partner to revenue customer.
8. **US commercial entity.** Krim US Inc., Delaware. US-based head of customer success. AWS US-East / GovCloud data-residency contract option. At least one US-cleared customer-facing executive.
9. **MQL artefacts.** Gated downloads — *(a)* SR 26-2 mapping, *(b)* MRM-ready dual model card, *(c)* reference architecture, *(d)* buy-vs-build TCO. Third CTA on the homepage *("Request the SR 26-2 mapping")* is the highest-leverage MQL conversion.
10. **Three named advisors.** Ex-Head of Collections at a US auto lender. Ex-MRM head at a US regional bank. Ex-FCA / PRA / RBI examiner.

### The 18-month backwards-mapped plan

| Month | Milestone |
|---|---|
| M0–3 | First design partner signed. SI partner signed. US incorporation. MRM-ready model card v1. SR 26-2 mapping v1. Integration adapters for 2 of FIS/Fiserv/Jack Henry. US head of CS hired. |
| M3–6 | Design partner in shadow mode against a control segment. |
| M6–9 | Paid pilot ($500k–$1.5M). Shadow → co-pilot. |
| M9–12 | Production bounded autonomy on a defined segment (e.g., 31–60 DPD prime auto, balances <$25k). 200–400 bps cure uplift. Zero conduct flags. |
| M12–14 | Six-month production deployment evidence. Positive MRM review. |
| M18 | First enterprise-wide deal closes. $4–8M Year-1 ACV at a US/UK Tier-2. |

---

*End of foundation document v1.1. Refined after a four-specialist pressure-test (supervisor / frontier-safety researcher / enterprise GTM operator / senior literary editor). The canonical reference. Committed to* `docs/FOUNDATION.md`.

**v1.1 changelog vs v1.0:**
- §1 reframed as internal-only with explicit caveat.
- §1 doctrine third clause replaced (literary editor).
- §1 "first generation of machine-native institutional cognition" line removed (regulator + literary editor).
- §2 thesis sentence edited (substrate → layer; without surrendering → and keep).
- §3 Adjudicator novel claim reframed as *adjudication over predicted downstream state under the world model* (safety researcher).
- §5 buyer hierarchy reordered: MRM first conversation, not blocker (GTM operator).
- §5 three pitch sentences refined: *validate* not *refuse*; post-disbursal not lifecycle; one regulation per jurisdiction.
- §5 five practitioner sentences line-edited (literary editor).
- §6 2036 picture trimmed (one number cut; *compressed* not *inverted*; central-banking flourish removed).
- §6 Visa analogy replaced with settlement-rails.
- §7 voice ladder narrowed to Anthropic systems card + Oaktree memo (RenTech and regulator-speech dropped as wrong-shape).
- §7 verb list tightened.
- §9 competitive-defusing line added (GTM operator's incumbent-naming move).
- §10 hero #2 refined (drop *lending*; replace em-dash tagline with declarative second line).
- §12 locks expanded from 13 to 17.
- §13 open calls resolved B, C, D, E, F, G; new open calls H, I, J, K added.
- **§15 new** — the load-bearing assumption named.
- **§16 new** — what is not yet built (safety + regulatory artefacts).
- **§17 new** — commercial readiness (GTM operator's shipping plan).

**v1.2 changelog vs v1.1 (scope correction — user instruction):**
- **Lock #12 REVERSED.** v1.1 narrowed the product claim to "post-disbursal operations" on the lending advisor's sales-proof argument. That was a GTM tactic wrongly promoted to product definition. The product claim is **end-to-end lending operations** — application to closure, origination through compliance, enterprise-facing and customer-facing. User-locked; do not narrow again. Proof-strongest stages (early-stage collections, hardship, disputes) survive only as *pilot sequencing* in §17.
- §4 "What is broken" reframed lifecycle-wide (post-disbursal acuity kept as a market fact, not a scope).
- §4 "Don't claim" table: full-lifecycle row deleted; decisioning-engine row reframed as deployment posture (integrate with incumbents), not scope limit.
- §5 pitch sentence #1 rewritten end-to-end.
- §3 Karta row extended to origination; **role-enablement map added to §3** (the canonical "what each role can now do" table).
- §13 resolved call D reversed.
- Homepage copy corrected in the same pass (close, Karta module, modules intro, hero grounding line).
