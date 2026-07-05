# Krim — Response to RBI's Draft Guidance on Regulatory Principles for Model Risk Management, 2026

**Submitted in response to:** Press Release 2026-2027/528 — Draft Guidance on Regulatory Principles for Model Risk Management (24 June 2026)
**Submission deadline:** 24 July 2026
**Submitted by:** Krim ([Name], [Title]) · www.krim.ai · [signatory email]
**Date:** [submission date]

---

## About the respondent

Krim is a safe superintelligence research company. We build KrimOS, an operating system for banking and financial services, lending first, in which every action an AI system proposes is validated against law, policy, consent and context before it executes. Our research focus — pre-execution validation, decision-level explainability, and auditable machine reasoning — sits directly on the ground this draft Guidance covers. We respond as a builder of the control-layer architecture the Guidance describes, and we declare that interest openly.

## Overall position

We support the draft Guidance and urge that its central architecture survive consultation intact.

Three of its demands are, in our assessment, exactly right, and worth defending against dilution:

1. **Accountability that cannot be outsourced.** Holding a regulated entity responsible for the outcomes of every model it runs — including third-party models it cannot fully inspect — closes the door on risk-washing through procurement. This is the single most consequential sentence in the draft.
2. **Explainability pinned to the decision, not the model.** The draft correctly declines to demand full interpretability of frontier models, and instead demands that the *decision* be explained and stood behind, with compensating controls where model internals are opaque. This is the only framing that survives contact with modern AI systems, and it aligns India with the direction of SR 11-7 and the EU AI Act while going further in naming autonomy explicitly.
3. **Autonomy priced as risk.** Tiering risk by the degree of a model's autonomy puts in writing what supervisory frameworks elsewhere have so far left implicit. It anticipates the agentic systems now entering lending operations rather than regulating the scorecard era retrospectively.

Our specific comments below are offered to sharpen enforceability, not to soften obligations.

## Specific comments and recommendations

### 1. Make "validatability" an explicit procurement gate

The draft requires independent validation of third-party models regardless of vendor assurances, and prescribes limiting use where a vendor will not disclose enough to validate. We support this fully. We recommend the final Guidance go one step further: name **validatability as a precondition of procurement**, and specify a minimum disclosure set a vendor must provide (model purpose and boundaries, input/output specification, testing evidence, change history, and the artefacts needed for independent challenge). A standardised disclosure schema would let smaller regulated entities demand the same artefacts as the largest banks, at far lower negotiating cost. As a vendor, Krim would itself be subject to this disclosure requirement. We support it.

### 2. Define the control point: before execution

The draft's operational demands — human-in-command, override, kill switch, ongoing monitoring — reach for a control point that conventional MLOps tooling does not provide: the moment **between an AI system's proposed action and its execution**. Post-hoc review, however rigorous, examines actions that have already happened; in lending, a non-compliant communication or decision cannot be unmade.

We recommend the final Guidance state explicitly that for higher autonomy tiers, controls must be **prevention-capable**: able to check a proposed action against the entity's obligations and stop it before it executes, rather than flag it afterwards. We are recommending a property, not a product: whether built in-house or procured, the test is that the control can stop a non-compliant action before it executes. Without this clarification, entities may satisfy the letter of the Guidance with monitoring dashboards that observe harm rather than prevent it.

### 3. Specify decision-grade, machine-readable records

The draft's record-keeping obligations (model inventory, ten-year retention for decommissioned models) will only serve examiners if the records are usable. We recommend specifying that decision records be **produced by construction rather than reconstructed afterwards**, and captured at the level of the individual action: the inputs considered, the rules the action was checked against, the outcome of each check, and the identity of any human override. Records assembled after the fact from application logs are reconstructions, and they degrade exactly when they are needed most — under dispute.

### 4. Clarify that override must operate at action granularity, in real time

"Human-in-command" and the kill switch are necessary but coarse. A kill switch that halts a whole model is an emergency brake; supervision of autonomous systems in live lending operations also requires the ability to hold, modify or reject **individual proposed actions** while the system continues operating. We recommend the final text distinguish these two levels — system-level shutdown and action-level intervention — and require both for models in the higher autonomy tiers.

### 5. Phase implementation honestly — the measured gap is real

The survey underlying the FREE-AI Committee report found that, among lenders already using AI, roughly 15% used interpretability tooling, 18% maintained audit logs, 21% monitored for drift, and about a third had board-level AI oversight. The obligations in this draft are therefore not an increment for most of the sector; they are a rebuild.

We do not recommend weakening the obligations. We recommend **sequencing** them: inventory and board accountability first; validation and explainability thresholds next; the full control-layer obligations (pre-execution checks, action-level override, decision-grade records) on a stated timetable that is proportionate to entity size but with a firm end date. A published sequence converts an intimidating chasm into an executable programme, and it protects smaller NBFCs from a compliance cliff without letting anyone treat the Guidance as optional.

### 6. Keep the broad definition of "model"

We anticipate pressure in this consultation to narrow the definition of a model. We urge RBI to resist it. The draft's definition — anything that takes inputs, applies logic, and materially shapes a decision — is the only definition that survives the current pace of change, in which yesterday's spreadsheet becomes tomorrow's agent tool. Narrower definitions would be obsolete before the Guidance takes effect.

## Closing

The draft asks regulated entities to own the risk of every model, explain every material decision, and keep a human in genuine control of systems that act. These are architectural requirements, and we believe the institutions that treat them as a specification to build against — rather than a compliance document to file — will be the ones that automate lending safely at scale.

We would welcome the opportunity to discuss any of the above with the Reserve Bank, including the technical detail of prevention-capable control layers and decision-grade record formats.

**Krim** · www.krim.ai · [signatory email]

---

*Internal notes (do not submit): submission channel per the press release (email/portal as specified by RBI). Fill [Name]/[Title]. After submission, publish this response as a page under /research or /insights and announce on LinkedIn during the consultation window.*
