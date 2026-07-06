# INTERNAL — Why our RBI response says what it says

**Not for submission or external sharing.** Companion to docs/rbi-mrmf-consultation-response.md.
Purpose: give the team the candid rationale behind each recommendation, what Krim gains, and what could go wrong.

---

## The posture, in one paragraph

We respond as a **supporter urging the regulator to hold the line**, not as a vendor asking for favours. Every recommendation *raises* the bar rather than lowering it — and each raised bar happens to sit exactly where Krim's architecture already stands. That is the strategy: we never ask RBI to require our product; we ask RBI to require the *properties* our product was built to have, and we volunteer to be bound by the same obligations we propose for others. A submission that asked for less regulation would be ignored; one that transparently sold KrimOS would be discarded. One that strengthens the regulator's own draft gets read.

The honest risk of the whole exercise: a sophisticated RBI reader will still see the vendor shape underneath. We mitigate this three ways — the declared interest up front, the "property, not a product" line in recommendation 2, and volunteering to be bound in recommendation 1. We do not eliminate it. That is fine. Regulators expect vendors to respond to consultations; what earns respect is candour plus substance.

## Primary-source verification — COMPLETED 6 July 2026

The response has now been checked line-by-line against the actual draft ("RBI draft guide.pdf", 16 pages, paragraphs 1–64). Every factual characterisation held up (scope, model definition and its spreadsheet illustration, vendor-validation duties, explainability thresholds and compensating controls, autonomy tiering in para 52, ten-year inventory retention in para 23, kill switch in para 60(ii), red-teaming in para 55, supersession of the 2002 Guidance Note's Chapter 3 in para 64). **Two recommendations changed because of the read:**

- **Recommendation 1 was half-redundant as originally drafted.** Paragraphs 47–48 already require pre-acquisition due diligence and contractual access to documentation "sufficient to validate the model," plus audit rights and exit arrangements. Telling RBI to add what they had already written would have signalled we read the press release, not the document. The revised ask targets the genuine gap: para 48 leaves "minimum technical documentation" to bilateral negotiation, so we ask for a standardised disclosure schema.
- **Recommendation 2 got stronger.** Para 54(1)(ii) already lists "mechanisms to verify and corroborate model outputs prior to their use" as a compensating control. Our "prevention-capable" ask is now framed as elevating RBI's own clause from one item in a list to the defining requirement for high-autonomy tiers — a close reading of their text rather than an imported concept.
- The whole response now cites paragraph numbers throughout (8, 45–48, 51, 52, 54, 60, 63, 7(3), 21–24, 35, 3, 9–13, 64), plus one constructive drafting note: the explainability definition in para 7(2) is model-level while para 54(1) applies it to outputs — we suggest aligning them.

---

## Recommendation-by-recommendation: what, why, what we gain, what it costs

### 1. Standardise the vendor disclosure the draft already requires (revised after primary read)

**What we ask.** A standardised minimum disclosure schema for third-party models. Originally we also asked for validatability as a procurement precondition — the primary read showed paras 47–48 already require pre-acquisition due diligence and contractual documentation "sufficient to validate the model," so the ask was narrowed to the genuine gap: para 48 leaves the documentation set to bilateral negotiation.

**Why it's right for the system.** Without a common schema, the largest banks extract real artefacts and smaller REs receive boilerplate. A standard set makes para 46's independent validation practicable for every RE — a small NBFC can demand the same artefacts as SBI without a negotiating department.

**What Krim gains — candidly.** This is quietly the most competitive recommendation in the document. Closed foundation-model vendors and API resellers structurally cannot meet deep disclosure; KrimOS is validatable by design. A disclosure schema converts our architecture from a differentiator into a procurement requirement. Volunteering to be bound by it costs us nothing (we can comply) and buys the whole submission credibility.

**Downsides / risks.** (a) A schema can ossify into checkbox compliance — vendors "disclosing" boilerplate. (b) RBI may consider procurement prescriptions beyond the remit of principles-level guidance and ignore it. (c) If the schema lands weaker than our own disclosure standard, it levels the field *against* us. Net judgment: asymmetric in our favour; worst case is it's ignored.

### 2. "Prevention-capable" controls — the pre-execution control point

**What we ask.** For higher autonomy tiers, controls must be able to *stop* a non-compliant action before it executes, not flag it afterwards.

**Why it's right for the system.** A lending action — a communication, a decision notice, a collection attempt — cannot be unmade. Monitoring dashboards observe harm; only a gate in front of execution prevents it. The draft's own instruments (human-in-command, override, kill switch) already gesture at this; we ask for the principle to be named.

**What Krim gains — candidly.** This is our thesis written into regulation. If the final guidance says "prevention-capable," the market's compliance question changes from "do you have monitoring?" to "can you stop an action pre-execution?" — which is the question KrimOS exists to answer. This is the single highest-value sentence we could get into the final text.

**Downsides / risks.** (a) It is the most transparently product-shaped ask; that's why the "property, not a product" disclaimer sits in this section, and note the honest subtlety: a manual maker-checker queue *is* prevention-capable — banks already satisfy this at low volume. The requirement only forces automated gating at automation volume, which is precisely the honest version of the point. (b) Scope risk: the draft is a *model* risk framework; our lens is *actions*. We scoped the ask to "higher autonomy tiers" so it lands on agentic systems, not on credit scorecards where "pre-execution" is a category error. If a reader misses that scoping, the rec reads as confused — the drafting guards against it, but it's the recommendation most likely to be misread. (c) If adopted vaguely ("entities should consider preventive controls"), incumbents will claim their four-eyes process qualifies and nothing changes.

### 3. Decision-grade records, produced by construction

**What we ask.** Records captured per action — inputs, rules checked, outcomes, human overrides — generated as a by-product of the control running, not reconstructed later from application logs.

**Why it's right for the system.** Reconstructed logs degrade exactly when they matter: under dispute. RBI's ten-year retention only serves an examiner if what's retained is decision-grade. This is also where the draft's explainability demand becomes practically satisfiable for opaque models: you may not be able to open the model, but you can produce a complete record of what the decision was checked against.

**What Krim gains — candidly.** Deterministic, by-construction records are what Krim-Nyāya produces natively. Retrofitting this onto a conventional stack is expensive; having it by architecture is our moat. Same pattern as rec 2: the property is the product.

**Downsides / risks.** (a) Genuinely burdensome for incumbents with legacy systems — expect bank lobbies to push back, and RBI may soften it to "adequate records," which changes nothing. (b) "By construction" could be read as prescribing architecture, which regulators resist; we framed it as a property of the records, not the system, but the line is thin. (c) Storage/privacy interactions (per-action records × ten years × millions of actions) are a real cost we don't address — if RBI probes, the honest answer is that storage is cheap relative to disputes, but we should have that answer ready.

### 4. Action-level override, distinct from the kill switch

**What we ask.** Distinguish system-level shutdown (the kill switch) from action-level intervention (hold, modify, reject a single proposed action, in real time), and require both at higher autonomy tiers.

**Why it's right for the system.** A kill switch is an emergency brake; day-to-day supervision needs a scalpel. Without action-level control, the only responses to a misbehaving agent are "let it run" or "shut it all down" — which in practice means nobody pulls the switch.

**What Krim gains — candidly.** Kupa (the command centre) is action-level supervision. Modest advantage relative to recs 1–3; this one is closest to pure good-citizenship and strengthens the document's balance.

**Downsides / risks.** (a) Could be misread as requiring human review of *every* action, which would kill the economics of automation for everyone including us — the text asks for the *ability* to intervene, not mandatory per-action review, but summaries of the guidance might blur that. (b) Adds operational tooling costs for REs; mild dilution pressure expected.

### 5. Sequenced implementation with a firm end date

**What we ask.** Phase the obligations — inventory and board accountability first, validation and explainability next, full control-layer obligations on a stated timetable — proportionate to entity size but with a hard deadline.

**Why it's right for the system.** RBI's own survey (≈15% interpretability tooling, ≈18% audit logs, ≈21% drift monitoring, ≈⅓ board oversight) says the sector cannot comply on day one. An impossible compliance cliff produces paper compliance and blanket forbearance, which is worse than a sequenced ramp.

**What Krim gains — candidly.** Two things: credibility (the one recommendation that visibly costs us — slower forcing function means slower regulation-driven demand), and a live market (our future customers survive the transition instead of freezing all AI adoption in panic). We are deliberately spending advantage here to make recs 1–4 credible.

**Downsides / risks.** (a) "Proportionate to entity size" is exactly the clause bank lobbies will stretch into indefinite delay — our hedge is the "firm end date," and if RBI adopts the phasing without the end date, we've argued for our own market's postponement. That is the biggest single risk in the document. (b) A cynical reading: vendor recommends timeline that matches its own go-to-market maturity. True, and unanswerable; the recommendation still stands on RBI's own survey data.

### 6. Defend the broad definition of "model"

**What we ask.** Keep the input→logic→material-decision definition; resist the narrowing lobby.

**Why it's right for the system.** Any narrower definition is obsolete before publication — yesterday's spreadsheet becomes tomorrow's agent tool. Perimeter should follow function, not labels.

**What Krim gains — candidly.** Broad definition = broad obligation surface = more of the lending stack needing governance = larger addressable problem for us. Paired deliberately with rec 5: hold the bar high, spread the runway. High bar differentiates capable vendors; humane timetable keeps buyers alive.

**Downsides / risks.** (a) Inventory burden explodes for small NBFCs (thousands of spreadsheets are now "models") — rec 5 is the mitigation, and the pairing must survive together; the broad definition *without* sequencing is genuinely harsh. (b) "We anticipate pressure… urge RBI to resist" presumes other respondents' positions — mildly combative, accepted deliberately.

---

## What we consciously did NOT say

- **Nothing on data risk, privacy, or model-input governance** — real topics, not our lane; opining would dilute authority.
- **No comment on red-teaming standards or customer AI-disclosure** — both supportable, both padding; six sharp recommendations beat nine soft ones.
- **No claims of deployments, customers, or India operations** — we have none to claim; the claim floor holds even here, especially here.
- **No request for recognition/certification of vendors** — tempting (a "qualified control layer" certification would be commercially valuable) but it's the classic regulatory-capture ask and would poison the well.
- **"Safe superintelligence" does not appear** — it's our brand language, and it would read as science fiction to a model-risk supervisor. The response says "safe autonomous systems for regulated financial work." Same substance, supervisory register.

## Pre-submission checklist

1. ☑ Primary-source check — DONE 6 July 2026; two recommendations revised as a result (see above).
2. ☐ Fill: signatory name/title/email (personal or hello@, not sales@), legal entity line, date.
3. ☐ Confirm the submission channel and format from Press Release 2026-2027/528.
4. ☐ Send; keep the acknowledgement.
5. ☐ Then: publish the response on the site, and LinkedIn post 1 goes live ("Ours goes in this week" must already be true).
