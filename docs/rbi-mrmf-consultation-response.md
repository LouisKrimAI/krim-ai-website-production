# Krim — Response to RBI's Draft Guidance on Regulatory Principles for Model Risk Management, 2026

**Submitted in response to:** Press Release 2026-2027/528 — Draft Guidance on Regulatory Principles for Model Risk Management (24 June 2026)
**Submission deadline:** 24 July 2026
**Submitted by:** Krim ([Name], [Title]) · www.krim.ai · [signatory email]
**Entity:** [legal entity name, registration no., registered address]
**Date:** [submission date]

---

## About the respondent

Krim is an AI research and product company focused on safe autonomous systems for regulated financial work. We build KrimOS, an operating system for banking and financial services, lending first, in which every action an AI system proposes is validated against law, policy, consent and context before it executes. Our research focus — pre-execution validation, decision-level explainability, and auditable machine reasoning — sits directly on the ground this draft Guidance covers. We respond as a builder of the control-layer architecture the Guidance describes, and we declare that interest openly.

## Overall position

We support the draft Guidance and urge that its central architecture survive consultation intact.

Three of its provisions are, in our assessment, exactly right, and worth defending against dilution:

1. **Accountability that cannot be outsourced (paragraphs 8 and 45).** Holding a regulated entity accountable for the outcomes of all models it uses — irrespective of whether they are developed internally, sourced from third parties, or a combination — closes the door on risk-washing through procurement. Paragraph 8 is the single most consequential sentence in the draft.
2. **Explainability applied where it matters, with honesty about its limits (paragraph 54(1)).** The draft requires explainability thresholds for all AI models, rising where models drive material decisions or affect customers — and where full explainability is not achievable, it prescribes enhanced controls rather than prohibition (paragraph 54(1)(ii)). This is the only framing that survives contact with modern AI systems, and it aligns India with the direction of SR 11-7 and the EU AI Act. One drafting note: the definition of explainability in paragraph 7(2) is a property of the model, while paragraph 54(1) applies the standard to outputs and their use in the business process; aligning the two would remove any ambiguity about where the threshold applies.
3. **Autonomy priced as risk (paragraph 52).** Requiring the risk tier of an AI model to reflect the extent of reliance and the level of autonomy placed on its outputs puts in writing what supervisory frameworks elsewhere have so far left implicit. It anticipates the agentic systems now entering lending operations rather than regulating the scorecard era retrospectively.

Our specific comments below are offered to sharpen enforceability, not to soften obligations.

## Specific comments and recommendations

### 1. Standardise the vendor disclosure the draft already requires

Paragraphs 45–48 and 51 already construct the right regime: the RE is accountable for third-party model outcomes (45); independent validation applies notwithstanding any vendor certification or assurance (46); due diligence precedes acquisition (47); contracts must secure technical documentation "sufficient to validate the model," audit rights for the RE and its supervisory authority, and continuity and exit arrangements (48); and where an AI/ML provider does not disclose adequate information, the RE must identify the resulting risks and apply the necessary mitigants, such as limiting usage (51). We support all of it.

Our recommendation is narrow: paragraph 48 leaves "minimum technical documentation" to bilateral negotiation. In practice, the largest banks will extract meaningful artefacts and smaller REs will receive boilerplate. We recommend RBI specify — or direct an industry body to specify — a **standardised minimum disclosure schema** for third-party models: model purpose and boundaries, input/output specification, testing evidence, change history, and the artefacts required for independent challenge. A common schema makes the independent validation required by paragraph 46 practicable for every RE, not only those with negotiating leverage. As a vendor, Krim would itself be subject to this disclosure requirement. We support it.

### 2. Elevate "prior to use" verification into the defining control for high-autonomy AI

The draft already contains the seed of the strongest control it describes. Paragraph 54(1)(ii) lists "mechanisms to verify and corroborate model outputs prior to their use" among the compensating controls where full explainability is not achievable; paragraph 54(2) requires appropriate control boundaries "through system-level controls or model design features" where outputs directly or indirectly drive customer interaction or decision-making; and paragraph 52 ties an AI model's risk tier to the autonomy placed on its outputs.

Read together, these paragraphs reach for a control point that conventional MLOps tooling does not provide: the moment **between a model's proposed output and its use**. We recommend the final Guidance make explicit what these provisions imply — that for models in the higher autonomy tiers, controls must be **prevention-capable**: able to check a proposed action against the entity's obligations and stop it before it executes, rather than flag it afterwards. Periodic human review of model-driven decisions (paragraph 60(iii)) is necessary, but it examines actions that have already happened; in lending, a non-compliant communication or decision cannot be unmade.

We are recommending a property, not a product: whether built in-house or procured, the test is that the control can stop a non-compliant action before it executes. Without this clarification, the letter of paragraph 54 can be satisfied by monitoring dashboards that observe harm rather than prevent it.

### 3. Specify decision-grade records, produced by construction

The draft's inventory and documentation obligations (paragraphs 21–24), its requirement that approval rationale be documented (paragraph 35), and its requirement that oversight decisions, interventions, overrides, incidents and near misses be reviewed (paragraph 63) will only serve examiners if the underlying records are usable. We recommend specifying that for models in the higher autonomy tiers, decision records be **produced by construction rather than reconstructed afterwards**, and captured at the level of the individual action: the inputs considered, the checks the action was subjected to, the outcome of each check, and the identity of any human override. Records assembled after the fact from application logs are reconstructions, and they degrade exactly when they are needed most — under dispute.

### 4. Distinguish action-level intervention from the kill switch

Paragraph 60(ii) requires "override, suspension, or deactivation mechanisms, including kill-switch arrangements." These are necessary but coarse. A kill switch that halts a whole model is an emergency brake; supervision of autonomous systems in live lending operations also requires the ability to hold, modify or reject **individual proposed actions** while the system continues operating. We recommend the final text distinguish these two levels — system-level shutdown and action-level intervention — and require both for models in the higher autonomy tiers. Without action-level control, the practical choices facing an operator are "let it run" or "shut everything down," and experience across industries suggests that in that situation, nobody pulls the switch until after the harm.

### 5. Publish an implementation sequence with a firm end date

Paragraph 3 rightly makes the Guidance commensurate with the nature, scale and complexity of each RE. The draft does not, however, specify an implementation timeline. The survey underlying the Reserve Bank's FREE-AI Committee report (August 2025) found that among lenders already using AI, roughly 15% used interpretability tooling, 18% maintained audit logs, 21% monitored for drift, and about a third had board-level AI oversight. The obligations in this draft are therefore not an increment for most of the sector; they are a rebuild.

We do not recommend weakening the obligations. We recommend **sequencing** them: model inventory (paragraph 21) and governance (paragraphs 9–13) first; validation and explainability thresholds next; the full control-layer obligations (prevention-capable checks, action-level override, decision-grade records) on a stated timetable that is proportionate to entity size but with a firm end date. A published sequence converts an intimidating chasm into an executable programme, and it protects smaller REs from a compliance cliff without letting anyone treat the Guidance as optional.

### 6. Keep the broad definition of "model"

We anticipate pressure in this consultation to narrow the definition in paragraph 7(3). We urge RBI to resist it. The definition — a system that takes inputs, applies processing logic, and produces outputs that materially affect decision-making, "irrespective of whether such tools are recognised as models by the RE," with the spreadsheet-based loan pricing calculator as its illustration — is the only definition that survives the current pace of change, in which yesterday's spreadsheet becomes tomorrow's agent tool. Narrower definitions would be obsolete before the final Guidance takes effect.

## Closing

The draft asks regulated entities to own the risk of every model (paragraph 8), explain the outputs that drive material decisions (paragraph 54), and keep a human in genuine command of systems that act (paragraph 60). These are architectural requirements, and we believe the institutions that treat them as a specification to build against — rather than a compliance document to file — will be the ones that automate lending safely at scale.

We would welcome the opportunity to discuss any of the above with the Reserve Bank, including the technical detail of prevention-capable control layers and decision-grade record formats.

**Krim** · www.krim.ai · [signatory email]

---

*Internal notes (do not submit): submission channel per the press release (email/portal as specified by RBI). Fill [Name]/[Title]/entity/date. Verified against the primary text ("RBI draft guide.pdf", 16 pp, paras 1–64) on 6 July 2026. After submission, publish this response as a page under /research or /insights and announce on LinkedIn during the consultation window.*
