# KrimOS for Lending — The Architecture Narrative

> **Status.** This is the authoritative spine for the KrimOS layer pages and the
> "KrimOS for banking" homepage section. It holds two pillars in **equal billing
> (50/50)**: *proof / substrate* (true today, as architecture) and *the World
> Lending Model* (always voiced as **direction** — what the architecture makes
> possible, never shipped).
>
> **Authoritative sources:** `docs/WORLD-LENDING-MODEL-THESIS.md` and
> `docs/POSITIONING.md`.
>
> **EXTERNAL-VOICE CALIBRATION (2026-06, user).** This doc — and its §6
> claim-boundary checklist — is the **internal backbone** (rigor for answering
> hard questions + the no-fabrication floor). It is **not** the external register.
> Externally the site **leads with the World Lending Model, the agent harness, and
> the pre-validation runtime, described confidently and fully** as a present,
> evolving system that **sharpens with more data**; the audit-trail/substrate is
> the safety backbone, not the headline. Do **not** disclaim "not shipped"; the AI
> underwriter is mentioned naturally as part of the world model. The checklist's
> hard floor still holds (no invented customers/metrics/partners/deployments; not
> "the law mandates pre-execution validation"); its more cautious "always voice as
> direction / never imply learning" items are **internal rigor, relaxed for
> confident external copy** per `POSITIONING.md` §9–§10. Subtle: not over-honest,
> not BS.
>
> **Markets:** US, UK, India. **No** live deployments, customers, named partners
> or metrics are claimed anywhere in this document or anything derived from it.
>
> **What changed in this version.** This narrative has been hardened against four
> adversarial reviews (model-risk examiner/CRO, staff systems architect,
> pragmatic bank CTO, claim-discipline auditor). The governance and integration
> concessions those reviews forced are now **promoted into the claims**, not
> demoted to footnotes — because in this domain the concession *is* the headline
> truth. See §5 (Governance & integration honesty) and §6 (Claim-boundary
> checklist).

---

## 1. The architecture story (one paragraph)

KrimOS is a single governed runtime for the lending lifecycle, built so two
things are true at once: a lender's AI is **provable before it acts**, and the
runtime lays down the **substrate a model of the lending operation could one day
be built on**. Six layers compose it. **Kriya** is the finite vocabulary — a
library of validated, credit-native primitives, each the smallest unit that can
be *both* checked before it fires and attributed after. **Karta** is the workforce
of named AI co-workers that does the operational work, able to *actuate* only
through those primitives — though the co-worker's *selection* of which primitive
to fire is itself a model that needs its own validation (the gate governs the
action, not the choice). **Kendra** is the runtime: at its core is one
policy-decision-point (**Krim-Nyaya**) that denies by default before any action
fires; **Krim-Ledger** is an append-only decision log that records each action,
the *admissible choice set it was selected from*, the structured decision
features, the gate result and — later, separately — the realised outcome; and
**Krim-Learn** studies that log *in shadow, off the live path*. **Kupa** is the
command center where the bank's people, and an independent second line *the bank
must wire and Krim cannot confer*, see, configure, halt, and prove. **Kula**
(staff) and **Kira** (customers) are the natural-language interfaces; they
propose and converse, but they decide nothing — the thinking and the validation
live in Kendra. The **proof pillar** is true today as architecture: one validated
runtime over one append-only log can capture attributed, cross-lifecycle,
action-conditioned records *with their rejected alternatives*, which fragmented
LOS/LMS stacks and single-slice point tools structurally cannot — a negative
architectural claim that needs no deployment. The **world-model pillar** — the
World Lending Model — is the *dividend that substrate makes possible*: voiced
strictly as direction, gated by counterfactual identification, censored
long-horizon labels, performativity, and population-level fairness, never as a
shipped capability. The two pillars carry equal billing; the second is always
spoken as what-the-architecture-makes-possible.

---

## 2. The six layers

> **Engineering-vs-marketing note (read once, applies throughout).** The
> six-layer / eight-module decomposition below is a **product and capability
> taxonomy** — the right altitude for a layer page. It is **not** the runtime's
> physical decomposition. The honest runtime story is three components, stated up
> front so the taxonomy never gets mistaken for the engineering:
>
> 1. **One policy-decision-point (PDP) = Krim-Nyaya.** The single runtime
>    enforcement point. Krim-Govern (policy hierarchy), Krim-Fabric
>    (per-jurisdiction rules + calendar) and Krim-Karya (timing/eligibility) are
>    **policy *authoring and compilation* surfaces** that compile *into* the
>    gate's rule bundle — they are not separate runtime enforcers. Compliance is
>    enforced **once**, at the gate, against one compiled, version-pinned policy
>    bundle (one source of truth, even where a rule is also pre-checked upstream
>    for throughput).
> 2. **One append-only store = Krim-Ledger.** Write-once, tamper-evident
>    (hash-linked checkpoints — *not* a per-event blockchain), one logical log
>    **per tenant, inside that tenant's perimeter**.
> 3. **One offline reader = Krim-Learn.** Reads the ledger off the live path, in
>    shadow. Krim-Sense (telemetry) and Krim-Core (orchestration) are the
>    supporting machinery.
>
> Everything else in this section is how a buyer should *think about* the system,
> not how the bytes flow.

---

### Kendra — the governed runtime / brain

**Role.** The governed runtime where a lender's AI reasons and decides. It holds
the proof pillar end to end (Krim-Ledger as substrate, Krim-Nyaya as the gate)
and seeds the world-model pillar (Krim-Learn's shadow loop). It is a runtime and
a **control** — *not* a discharge of SR 11-7 validation and *not* a shipped world
model.

**What it does in lending.**

- Runs the lifecycle on **one decision path**: every Karta co-worker, on every
  task it is deployed for (origination support, underwriting support, servicing,
  collections, disputes, reporting), runs the same Perceive → Reason → Plan →
  Validate → Act sequence — so decisions, messages, disbursements and contacts
  are produced and gated by the same runtime rather than stitched across silos.
- **Krim-Ledger** writes the substrate. It is an **append-only event log**, not a
  single immutable tuple table. Each decision emits a `DecisionEvent`:
  `{ state_ref + state_hash, admissible_action_set (canonical — enumerated by the
  gate from allow-listed Kriya primitives, NOT planner-dependent),
  selected_action + params, selection_probability/assignment, structured_decision_features,
  policy_bundle_version, model_version, gate_result, kwu_ref }`. **Outcomes
  arrive late and separately** (labels mature in weeks to many months) as
  `OutcomeEvent`s keyed back by `decision_id` with explicit label-maturity
  timestamps. "Immutable" means append-only + tamper-evident, scoped to actions
  KrimOS mediates (see §5).
- **Krim-Nyaya** is the deny-by-default pre-execution gate. It governs **actuation
  legality**, not selection quality. Architecturally it splits into a **fast path**
  (local, deterministic, bounded-time checks evaluable from an in-memory compiled
  policy bundle + locally-synced state — calling hours, frequency counters,
  consent flags, policy logic) that sits synchronously in the action path, and a
  **slow path** (live external signals — DNC scrub, fresh bureau) that is
  pre-fetched and freshness-bounded *before* an action is enqueued, not fetched
  synchronously at fire time. Deny-by-default applies to *policy uncertainty*; the
  defined degraded mode is **queue-and-defer-to-human via Kupa**, never silent
  drop. A blocked action is handed to a person via Kupa with the rule and reason
  in plain words. It **bounds the consequences of model error at the action
  level** — a control, not validation.
- **Krim-Learn** is the world-model loop *(direction)*. It learns **in shadow**
  from the attributed log and is the only mechanism by which off-the-shelf
  dynamics methods (survival/hazard, uplift/CATE, contextual bandits, constrained
  RL) could ever be applied end-to-end — because they are bottlenecked by exactly
  the joint, attributed, action-conditioned, **propensity-logged** data Kendra
  produces. (Propensity/assignment logging is a **day-one** ledger obligation, not
  a later Krim-Learn feature — without it, the conservative off-policy evaluation
  the thesis requires is uncomputable, and it cannot be retrofitted onto
  historical data.)
- **Policy authoring surfaces.** **Krim-Govern** holds the per-tenant policy
  hierarchy; **Krim-Fabric** carries per-jurisdiction rules + the regulatory
  calendar (US/UK/India); **Krim-Karya** computes *when* an action becomes
  eligible (FDCPA hours, Consumer-Duty timing, deadlines, back-off/retry) and
  emits candidates — it **sequences, it does not enforce compliance**; final
  enforcement is the gate's. **Krim-Sense** feeds Kupa's supervision and
  drift/calibration detection.
- Provides, **as a property of the substrate once a book is running**, real-time
  on-policy calibration and drift detection (better than an annual backtest) and
  the substrate to run gated, small-budget randomized interventions at the
  approval/price/limit/cadence margin that validate counterfactuals *locally*.

**Real today vs DIRECTION.**

- *Today (as architecture + the negative claim, which needs no deployment):* one
  append-only attributed decision log with canonical, gate-derived choice sets and
  day-one propensity logging; the negative architectural claim; Krim-Nyaya
  deny-by-default over allow-listed primitives with a fast/slow-path and a
  degraded mode; per-tenant supervised decisioning support and in-distribution
  forward scenario exploration *with uncertainty*; whole-lifecycle scope **as
  design**; an architecture that **lets** an independent second line own the gate.
- *DIRECTION:* the high-fidelity simulating World Lending Model and
  long-horizon/tail simulation beyond uncertainty-bounded scenarios; on-policy
  calibration/drift detection *running on a live book* (no deployments exist, so
  nothing is being calibrated now); the compounding federated flywheel
  (contingent on fairness-aware admission + anti-herding controls **and** a
  described privacy boundary — see Krim-Fabric); counterfactual reject-inference
  (only ever cautious, experiment-anchored, margin-local, abstaining outside
  support, **never** for the deep never-approved population); the shadow-learn →
  gated-promotion-of-frozen-independently-validated-checkpoints lifecycle as a
  *running* mechanism; borrower-welfare/disparate-impact metrics as first-class
  audited rollout outputs; a population-level fair-lending harness gating policies
  and versions.

**Pillars carried.** Both. Kendra is the proof pillar's home (ledger + gate +
second-line-*ownable* Govern → "the AI your regulator can read," supportable now
as architecture) and the world-model pillar's *only* credible home (Krim-Learn +
Krim-Fabric) — a structured-prior-plus-learned-residual program, voiced strictly
as direction, never "MuZero for lending."

**Layer-page claim / proof / do-not-say.**

- *Claim:* Kendra is the governed runtime where a lender's AI reasons and decides
  — the one place that **proves every action it originates before it happens** and
  records it, with the alternatives it was selected from and the features that
  drove the choice, on a single append-only log. That record is the substrate no
  one else's architecture produces, and the only foundation a model of how a
  lending operation behaves could be built on.
- *Proof:* The architecture writes one tamper-evident, attributed record across
  origination → underwriting → servicing → collections → disputes → reporting;
  Krim-Nyaya gates every Krim-originated action deny-by-default over allow-listed
  Kriya primitives, fast-path-synchronous with a defined degraded mode, blocks
  handed to a person via Kupa; Krim-Govern lets the bank's independent second line
  own the gate **if the bank wires one**. The negative architectural claim — that
  fragmented stacks structurally cannot produce this record — is true now and
  needs no deployment. The world model (Krim-Learn) is the dividend, learned in
  shadow, built going forward.
- *Do not say:* the World Lending Model exists/ships/learns on the live path; that
  on-policy calibration is *running today* (it is a property realised once a book
  is live; there are no deployments); that the cross-lifecycle ledger is a
  *populated, existing record* (say "the architecture produces" it); that
  Krim-Nyaya discharges/embodies SR 11-7 or that pre-execution validation is
  legally mandated (explainability is); that "33 validators" is a coverage/safety
  proof; that the gate catches bias or makes lending "safe/fair" (say
  "demonstrably better-governed and continuously monitored"; a population-level
  harness is required — direction); any monotonic/autonomous compounding ("the
  longer it runs the more it knows"); that ledger replay evaluates counterfactuals;
  that the censored log is "clean data"; any deployments, customers, partners or
  metrics.

---

### Kriya — the validated, credit-native action primitives

**Role.** The finite library of credit-native primitives — each the smallest unit
that can be validated before it fires and attributed after. Because the
**admissible choice set** is enumerated *by the gate at the primitive boundary*
(independently of whatever planner selected within it), Kriya is the layer that
makes the gate enforceable and the substrate's choice-set field **canonical and
stable**.

**What it does in lending.**

- Defines the atomic, credit-native operations a co-worker can perform — e.g.
  `BUREAU_LOOKUP` / `FETCH_ACCOUNT`, `CALCULATE_SETTLEMENT`, `GENERATE_NOTICE`
  (Reg-B adverse-action), `MAKE_CALL` (FDCPA-windowed contact), `PROCESS_PAYMENT`
  / `SCHEDULE_AUTOPAY`, `EVALUATE_POLICY` / `ESCALATE`.
- Is organised into **ten categories** as a *designed/target taxonomy* (Voice &
  telephony, Document, Compliance checks, Data, Payments, Decision logic,
  Analytics & reporting, Integration, Testing & QA, plus tenant Custom). The
  **credit-approval / pricing / full-origination categories are direction**, so
  the taxonomy is *not* a claim that a full 250+ set is deployed at any one site —
  at a beachhead the fielded set is correspondingly narrow.
- Carries built-in validation hooks at the boundary: `MAKE_CALL` clears TCPA
  consent, calling-hours, Reg F contact limits and DNC before it dials. **The
  validators are themselves controls under SR 11-7** — versioned, independently
  testable, with documented test coverage against the regulation each encodes,
  change-controllable by the second line, and continuously red-teamed. They are
  not treated as ground truth (a validator with an off-by-one in a Reg F rolling
  window is a breach machine that passes every action).
- Is the unit of **attribution and metering**: typed I/O, versioned, metered in
  Krim Work Units (KWUs — the per-action unit of account; **rates illustrative,
  not a published figure**), logged to Krim-Ledger. Metering is referenced from
  the audit record by `decision_id` but **lives in its own reconcilable accounting
  stream** — the evidentiary log stays append-only and is not co-resident with
  mutable billing state.
- Is the **logging point for the canonical choice set**: the gate enumerates the
  admissible primitives for the state; the co-worker selects within that set; the
  *gate-derived* admissible set (not the planner's enumeration) plus the selected
  action and the structured decision features are recorded — the exact
  `(state, choice-set, action, features, outcome)` record incumbent transaction
  ledgers do not capture.

**Real today vs DIRECTION.**

- *Today:* the finite credit-native vocabulary; the primitive boundary as the
  smallest unit that can *both* be validated pre-execution and attributed
  post-execution (no deployment needed to be true); the gate-derived canonical
  choice set; designed coverage around servicing, collections, disputes,
  documents/notices, payments, compliance checks and operational decision logic —
  credit approval and pricing remain the institution's.
- *DIRECTION:* the *value* of choice-set + feature capture as a learnable
  substrate (accrues only going forward, from deployments that don't exist yet);
  extending the library to full origination and a safe validated AI underwriter
  (active research, not live); the all-categories 250+ count as fielded inventory.

**Pillars carried.** Both — but as *precondition*, not model. Proof: it is the
gate's enforcement surface (no unprimitive'd path *within the Krim action
surface*) and what makes the log a substrate rather than a transaction record.
World-model: without a finite, validated, attributable vocabulary there is no
clean record and the substrate the WLM needs never forms — direction.

**Layer-page claim / proof / do-not-say.**

- *Claim:* A finite vocabulary, endless combinations — every action a lending
  co-worker can take is one of a library of validated, credit-native primitives,
  the smallest unit that can be proven before it fires and attributed after it
  runs.
- *Proof:* Each primitive carries its checks at its own boundary (`MAKE_CALL`
  clears TCPA consent, calling-hours, Reg-F limits and DNC before it dials), is
  metered in KWUs, versioned, logged — and because the **gate** enumerates the
  admissible set the co-worker selects from, the boundary is where a stable choice
  set and the decision features get recorded. That makes the gate enforceable and
  the log complete over Krim-mediated actions, which incumbent ledgers and
  single-slice tools structurally do not capture.
- *Do not say:* sell the number (lead with validate-and-attribute-at-the-boundary,
  not "250+"); state per-category counts as fielded inventory; state a KWU rate as
  a published figure; present the per-primitive validators (or "33 Navya-Nyaya
  validators") as a coverage proof or as catching disparate impact; treat the
  validators as ground truth (they are themselves validated artifacts); imply
  credit-approval/pricing primitives ship today (direction); claim the choice-set
  capture already constitutes a world model or a validated counterfactual record;
  call gate-via-primitives a discharge of SR 11-7 or legally mandated.

---

### Karta — the AI co-workers

**Role.** The named workforce composed from validated Kriya primitives, held to
measured outcomes, able to **actuate** only through actions that clear the gate.
Today it is designed to run the **operational** work of lending; the credit
decision stays with the institution. **Critical boundary: the gate governs
actuation, not selection.** The co-worker's choice of *which* admissible action to
fire (next-best-action, contact strategy) is itself a model under SR 11-7 that
requires independent validation and is **not** discharged by the gate — a
return-optimising contact selector is precisely a redlining-by-proxy surface.

**What it does in lending.**

- **Vox-Out / Vox-In** — outbound and inbound borrower voice across the lifecycle;
  every dial gated on TCPA consent, hours, Reg F limits, DNC.
- **Doc** — generates paperwork (arrears notices, restructuring offers,
  Reg-B adverse-action notices, payment confirmations) from validated
  document/compliance primitives, not free-text.
- **Risk** — *operational* risk work: segments portfolios and gates actions on the
  *institution's own* external risk/fraud flags. Does **not** score
  creditworthiness, approve, deny or price.
- **Decide** — next-best-action and conflict resolution (which contact, channel,
  when, whether to offer a restructure) — *operational* decisioning, explicitly
  not credit approval/pricing, and itself a separately-validated selection policy.
- **Cure** — orchestrates multi-step, multi-channel delinquency-cure journeys
  (1-30 / 31+ DPD) — where a sequence of governed actions is *designed to* produce
  a measurable outcome (roll-rate, right-party-contact, cure rate). No such
  outcomes are disclosed.
- **Audit / Report** — surfaces anomalies and aggregates operational reporting;
  because every Krim-originated action and its features are already on the log, the
  report is *read off the record* rather than reconstructed.
- Supports underwriting/origination **today without making the decision**
  (document throughput, KYC, bureau pulls, policy/affordability checks) — the
  analyst owns the judgment. A safe, validated AI underwriter is the direction.
- Operates under four institution-set modes per workflow/segment/risk band —
  autonomous, oversight, copilot, human-in-the-loop — so "how agentic" is a
  runtime parameter the bank dials.

**Real today vs DIRECTION.**

- *Today:* the eight co-workers as a utility catalog composed from primitives,
  configured by attributes; operational decisioning with credit approval/pricing
  staying with the institution; every actuation passing the gate;
  humans-in-the-loop where the bank sets the line; underwriting/origination
  *support*; collections as the credible **beachhead** (labels in weeks, legible
  ROI against the ~12-touch / ~$15–$40-per-touch collections cost base —
  *McKinsey, cited-as*; the segment incumbents like TrueAccord / Prodigal already
  occupy).
- *DIRECTION:* a safe, validated AI **underwriter** clearing the same gate (the
  headline direction); co-workers composing into the full WLM harness; "smarter
  after it acts" (forward, never monotonic/autonomous); lifecycle breadth as one
  workforce across both sides of the wall (**honest caveat:** at a single-stage
  collections beachhead Krim is temporarily a point tool too, and the substrate is
  a *slice*, not the complete cross-lifecycle ledger).

**Pillars carried.** Both. Proof: "validated before it acts" made concrete — an
agent that proposes, none of whose *actions* fire until the gate clears, each
composed from an attributable primitive landing on the log with its choice set and
features. World model: the agent harness — the source of the action-conditioned
trajectories the model learns from, and the vehicle through which a future learned
policy (incl. a safe underwriter) would act, always gated.

**Layer-page claim / proof / do-not-say.**

- *Claim:* Karta is the agentic workforce a regulated lender **can** ship — named
  AI co-workers **designed to** run the operational work of the lifecycle, where
  every action is composed from a validated primitive and clears the
  pre-execution gate before it fires. Agentic, but provable at the action level;
  and you set how far each one goes.
- *Proof:* Real product design (eight utility-based Karta composed from Kriya,
  configured by attributes, run in four institution-set autonomy modes); the
  load-bearing fact is true today and needs no deployment — a co-worker can
  **actuate** nothing that has not passed Krim-Nyaya, and the action plus its
  choice set and features is recorded. Collections is the credible proving ground.
- *Do not say:* that co-workers make/approve/deny/price credit today (the decision
  stays with the institution; a safe underwriter is direction); that "run the
  operational work of the lifecycle" is *fielded* breadth (it is design;
  collections-first, land-and-expand); that "agentic workforce" is the
  differentiator (it's the gate + lifecycle scope + on-record reasoning); that the
  gate governs the *selection* (it governs actuation; the selector is a separately
  validated model); claim measured cure-rate/roll-rate outcomes (none disclosed;
  figures illustrative); frame TrueAccord/Prodigal as a *benchmarked* comparison
  (GTM/incumbency reference only); let "learns from every interaction" imply
  monotonic/autonomous improvement; imply the per-action gate makes the workforce
  fair/safe (say better-governed and continuously monitored; emergent-strategy
  harm needs sequence/campaign-level + population-level controls — direction);
  name partners/customers/live deployments.

---

### Kupa — the command center

**Role.** The glass cockpit where the bank's people **See, Set, Step in, Prove** —
and the surface **through which** an independent second line *can* own the gate
and monitors, halt or override, and assemble the evidence of effective challenge.
**Kupa enables independence; it cannot confer it.** Genuine three-lines
independence is the bank's operating-model decision (separate reporting line to
the board/CRO, separate budget and headcount, authority to block promotion against
business pressure, documented challenge that changed outcomes) — and a vendor
cannot ship any of those.

**What it does in lending.**

- **See** — unified operational view across the lifecycle (live queues, volumes,
  bucket/SLA performance, outcome and complaint rates, anomaly alerts) fed by
  Krim-Sense.
- **Set** — strategy/configuration console: which Karta are active for which
  segments, contact windows and frequency caps per jurisdiction, offer libraries,
  exposure ramps, A/B tests, the policy parameters Krim-Govern enforces —
  change-controlled, who-changed-what recorded.
- **Step in** — human-in-command controls: review queues routing **set-membership
  novelty** (action not in the allow-listed set, or parameters outside declared
  bounds — a hard, reliable check) and **low-confidence/OOD** actions
  (best-effort, *not guaranteed* — see do-not-say) to a person; supervisor sign-off
  on script/strategy changes; real-time **kill switches** that pause or roll back
  a single Karta, a campaign, a segment, or an entire jurisdiction (fail-closed
  with a queue-and-defer degraded mode, not silent stop).
- **Prove** — audit/investigation workspace: every Krim-mediated interaction
  linked to the policies that applied, the Krim-Nyaya result, the choice set, the
  decision features and the outcome — **reconstructable and tamper-evident within
  Krim's mediation boundary** (see §5; it is not, on its own, the examiner's
  complete proof of the operation).
- **Second-line surface** — where an independent risk/compliance function (not the
  model owners) *can* own and change-control the gate and monitors, hold
  halt/override authority, and review model-version promotions and fairness-harness
  output. To be *real* (not decorative) this requires a **vendor-independent
  control-authorship path**: the second line must be able to author/modify/veto
  gate rules and monitor thresholds independently of Krim, run its own validation
  suite *alongside* (not instead of) Krim-Nyaya, and pin/roll-back gate+monitor
  versions independently of the Karta action path. See §5.
- **Oversight evidence** — produces oversight evidence (ongoing-monitoring,
  override and effective-challenge trails) that **supports — not discharges** —
  SR 11-7 validation, and aligns with EU AI Act Art. 14 (meaningful human
  oversight, ability to intervene and stop) and FCA Consumer Duty (evidence of
  action on poor outcomes).

**Real today vs DIRECTION.**

- *Today:* the four functions and the concrete capabilities as a buildable,
  coherent surface; kill switches, review queues, human sign-off as conventional
  controls; role-based access and who-changed-what change-control; set-membership
  novelty routing (reliable); the architectural separation that *lets* an
  independent second line own the gate and monitors.
- *DIRECTION:* that the second line *actually* owns the gate and exercises
  independent effective challenge (an operating-model/deployment claim, true only
  once an institution wires it and an examiner accepts it — **no examiner has**);
  reliable distributional/confidence-based OOD defer-to-human (depends on
  calibrated OOD uncertainty — unsolved frontier; engineered-against, evidenced via
  backtested miss-rate, never guaranteed); the fairness harness gating
  policies/versions whose output the second line reviews; model-version promotion
  review as a running end-to-end workflow.

**Pillars carried.** Both. World model: the human-in-command brake and steering on
the learning loop — novel actions deferred here, shadow-learned model-version
promotions surfaced for independent second-line approval before they touch the
live path, fairness-harness output reviewed here. Proof: where the substrate
becomes usable proof — the log's records made inspectable in Prove, and the
override/effective-challenge trail itself recorded.

**Layer-page claim / proof / do-not-say.**

- *Claim:* Kupa is the command center where the bank stays in command — See, Set,
  Step in, Prove — and the surface **through which your independent second line
  can** own the gate, halt anything in one click, and assemble the oversight
  evidence your examiner expects.
- *Proof:* Capabilities on one surface — a unified lifecycle view; a
  change-controlled strategy/policy console; human-in-the-loop review,
  defer-to-human routing and real-time kill switches; an audit workspace linking
  every Krim-mediated interaction to the policy, validation result, choice set,
  features and outcome. The architecture **lets** the second line — not the model
  owners — own and change-control the gate and hold override authority, aligned
  with EU AI Act Art. 14, SR 11-7 ongoing monitoring and effective challenge, and
  FCA Consumer Duty evidence-of-action.
- *Do not say:* that the gate/monitors are *already independently owned* in
  production or that any examiner has accepted the trail; that a UI *makes* the
  second line independent (Kupa enables, it does not confer); that the second line
  can challenge independently *without* a vendor-independent control-authorship
  path (administering a vendor-authored gate is "marking the vendor's homework one
  level up"); "produces the proof your examiner asks for" (say "assembles the
  evidence" — implies neither sufficiency nor acceptance); present per-action
  review/override as catching disparate impact (needs the direction fairness
  harness); say defer-to-human reliably catches every OOD action (calibrated
  detection is unsolved; only set-membership novelty is reliable); call the kill
  switch a discharge of SR 11-7; imply the promotion-review workflow runs today.

---

### Kula — the enterprise natural-language interface

**Role.** The plain-language way a bank's own staff reach KrimOS — each user meets
a role-tailored digital twin that turns a stated outcome into a governed,
validated *plan* and routes it for human sign-off. An **interface** to the
runtime, **not a mind** that decides.

**What it does in lending.**

- Lets an operator state an outcome in natural language instead of SQL/a rule/a
  ticket — e.g. a Head of Collections types "increase on-time payments in 1-30 DPD
  by 5% next quarter."
- Translates intent into a **draft plan**: candidate segments, the step sequence,
  which Karta and which Kriya primitives would run, and the policy constraints that
  bind them. Nothing has executed — it is a proposal on screen.
- Presents one source of truth through a role-tailored twin (CRO, Head of
  Collections, Head of Servicing, Compliance lead) — same numbers and log,
  different lens per seat.
- Routes every plan through Krim-Govern and the Krim-Nyaya gate and surfaces it in
  Kupa for review; **Act stays locked** until an authorised person approves — Kula
  cannot push an action onto the live path on its own.
- Carries explanation back: when a proposed action would be blocked, Kula says
  which rule applied and why — making deny-by-default legible to a non-technical
  operator.
- Serves the second/independent line as a query/configuration surface inside Kupa
  without itself being the controller.

**Real today vs DIRECTION.**

- *Today:* NL-to-structured-intent + planning over Kriya/Karta with policy
  constraints attached (interface/UX engineering, not a novel science claim);
  role-tailored views over one source of truth; the "human is never skipped" beat
  — Act locked behind explicit Kupa sign-off; making a blocked action explainable.
- *DIRECTION:* the "Learn — every outcome sharpens the next plan" beat (depends on
  Krim-Learn's shadow-learn + gated promotion — voice **once, lightly**, never a
  capability living in the interface); any reading of the twin as *reasoning* (the
  intelligence is Kendra's; the twin is a façade/router); plans leaning on
  counterfactual/world-model outputs (only as real as Kendra's near-term,
  uncertainty-bounded simulation — inherit that honesty).

**Pillars carried.** Both, as an aperture. World model: how an operator poses an
operation-level question, and the *human-decision strand* of the substrate (every
intent and approval becomes a recorded, attributed event). Proof: where "validated
before it acts" becomes something a person experiences — the operator sees the
plan, the constraints, the blocked actions and the rule that blocked them, and
cannot bypass the gate.

**Layer-page claim / proof / do-not-say.**

- *Claim:* Talk to your operation. Kula is how your teams reach KrimOS in plain
  language — each user meets a digital twin tuned to their role that turns a stated
  outcome into a governed, validated plan and waits for your sign-off before
  anything runs.
- *Proof:* Kula drafts every plan only from allow-listed Kriya primitives and
  Karta co-workers, attaches the policy constraints that bind them, and routes the
  proposal through Krim-Govern and the Krim-Nyaya gate, surfacing it in Kupa for
  approval — Act is locked until a person signs off, and the interface can show
  which rule blocked any action. The thinking, validation and learning all live in
  Kendra; Kula is the legible way in and the place a human's intent and approval
  get recorded onto the one log.
- *Do not say:* call the twin a mind/an agent that decides/that "thinks, learns,
  knows"; imply Kula can act autonomously or that intent flows straight to
  execution; present "Learn — sharpens the next plan" as proven/monotonic/autonomous
  (voice once, lightly, as direction); present a personalised twin as a moat or
  "AI" (the NL front end is commoditisable — the defensible part is the gate and
  substrate behind it); reference live deployments/named users/logos/metrics; let a
  confident UI imply certainty for any scenario query (inherit Kendra's uncertainty
  discipline — no point trajectories, abstain off-support).

---

### Kira + Krimkar — the customer interface

**Role.** The single, channel-spanning conversational surface a borrower meets
across the loan lifecycle, in the Krimkar consumer app and public site. An
**interface** to Kendra's intelligence, **not a mind** — and putting it in front of
customers is **better-governed** precisely because every action it can take is a
validated Kriya primitive that cleared the gate.

**What it does in lending.**

- Presents one continuous relationship across WhatsApp, voice/IVR, chat, email,
  SMS plus the site and app — one thread with context preserved channel-to-channel,
  from application to payoff (*product/architecture intent*).
- Speaks the customer's language (Indian-language coverage is a **product goal,
  not a benchmarked capability**) and auto-clarifies ambiguous/incomplete
  application fields mid-conversation — the kind of manual touch that drives the
  ~12-touch / $15–$40-per-touch collections cost base.
- Takes consequential servicing/collections actions — accept a payment, send a
  statement/balance, set up or modify a repayment/hardship plan, signpost options —
  but **only** by invoking validated Kriya primitives, each cleared by Krim-Nyaya
  before it fires (consent, contact-window/hours, Reg F/TCPA/FDCPA-style limits,
  affordability).
- Hands off to a human with full conversation and reasoning attached — **by
  design, not as a fallback** — for disputes, hardship, complaints, vulnerability
  signals and sensitive segments.
- Writes every customer-facing action, its choice set, its features and its
  outcome to Krim-Ledger — so the customer side of the wall is on the same
  attributed record as the back-office (Karta) side (the completeness condition for
  the substrate, *over Krim-mediated actions*).
- Inherits constraint changes immediately: when Krim-Govern updates a
  per-jurisdiction rule, Kira's available actions are re-scoped without a
  re-deploy — the gate, not the interface, owns what is permitted. (Correctness is
  relative to the freshness of feeds from the bank's systems of record — see §5.)

**Real today vs DIRECTION.**

- *Today:* Kira as an interface whose entire action surface is allow-listed
  validated primitives behind the deny-by-default gate (the shippable property: it
  can only *do* what is pre-cleared); one-thread cross-channel continuity and
  multilingual conversation as architecture/product intent; designed human hand-off
  with full context; every customer-facing action and its features on one log;
  real-time supervision and kill-switch via Kupa.
- *DIRECTION:* any measured good-outcome / complaint-reduction / deflection /
  cure-uplift metric (requires deployments — not assertable); Kira's
  contact-sequence/channel/timing being optimised by a *learned* model of borrower
  response; "smarter after it acts"; borrower-welfare/good-outcome as a first-class
  *measured* objective inside Kira's decisioning (required before any "better for
  customers" framing is honest).

**Pillars carried.** Both. World model: the customer-facing **data-acquisition
surface** — every interaction written as attributed records; short-horizon
servicing/collections outcomes (labelling in weeks) are where the model could be
trusted soonest — strictly direction as a learned capability. Proof: the strongest
consumer-facing embodiment of "the AI your regulator can read."

**Layer-page claim / proof / do-not-say.**

- *Claim:* Kira is the AI advisor your customers meet across every channel —
  **better-governed** because it can take no action that has not been validated
  before it happens, and every word and action is on one record you can read.
- *Proof:* Kira is an interface to Kendra, not an autonomous agent. Its entire
  action surface is the set of validated, credit-native Kriya primitives, and each
  clears Krim-Nyaya's deny-by-default gate against consent, contact-window, conduct
  and affordability rules before it executes — with the action, its choice set and
  its features on Krim-Ledger. This makes **one specific failure** — an action
  toward a consumer with no validated, logged rationale — structurally impossible
  at the interface. It does **not**, on its own, guarantee fair outcomes or
  non-deceptive conversation; those are population- and substance-level (UDAAP /
  Consumer Duty) and are monitored separately. When a moment needs a person — a
  dispute, hardship, a vulnerability signal — Kira hands off with full context.
  Humans supervise, pause and roll back any of it through Kupa.
- *Do not say:* call Kira a mind/brain/an agent that decides/an autonomous advisor;
  say it is "safe" / "compliant" / "cannot break the rules" full stop (say
  better-governed, validated-before-it-acts, continuously monitored — a per-action
  gate cannot guarantee fair *outcomes* or non-deceptive conversation); let
  "structural impossibility" stretch beyond the one narrow property (no
  un-validated action fires); attach a *causal effect* (e.g. "reduces touch
  count") to Kira as a present behaviour (no deployments — state the design intent
  only); claim deflection/complaint/containment/cure/CSAT metrics; state "50+
  languages"/cross-channel continuity as a proven performance fact beyond
  product/architecture intent; present a standalone "smarter after it acts" or
  imply autonomous learning; imply Kira makes credit decisions or gives regulated
  advice (it executes validated actions and signposts); invent
  channels/partners/integrations.

---

## 3. The "KrimOS for banking" homepage-section spine (one scroll, 50/50)

A single vertical scroll holding both pillars in equal billing. Each section names
a layer and tags every forward statement as direction.

1. **Hero — the dual promise (50/50).** "The AI your regulator can read — and the
   foundation a model of your lending operation can be built on." Left rail:
   *Validated before it acts* (proof — true today, as architecture). Right rail:
   *The dividend that record makes possible* (world model — direction). Equal
   visual weight; the right rail always reads as what-the-architecture-makes-possible.
2. **The problem.** Lending AI fails the bank's first question: *can you prove what
   it did, why, and what it considered instead?* Fragmented LOS/LMS stacks and
   point tools record the transaction, not the reasoning or the rejected
   alternatives. State the negative architectural claim plainly.
3. **Kendra — the runtime.** One decision path, one gate, one append-only log.
   Introduce the gate (Krim-Nyaya) and the substrate (Krim-Ledger) side by side;
   introduce Krim-Learn as the shadow loop — *direction*. This is the 50/50 anchor.
4. **Kriya — the vocabulary.** The smallest unit that can be validated *and*
   attributed. Lead with the boundary and the gate-derived canonical choice set,
   not the count.
5. **Karta — the workforce.** Agentic, but provable at the action level; you set
   how far each one goes. The gate governs actuation, not selection. Collections is
   the credible proving ground. The credit decision stays with the institution; a
   safe AI underwriter is direction.
6. **Kupa — command.** See / Set / Step in / Prove, and the surface *through which*
   an independent second line *can* own the gate — *if the bank wires one*. The
   honest "marking your own homework" answer (and its limit).
7. **Kula & Kira — the two faces.** Staff in (Kula), customers out (Kira); both
   interfaces, never minds; both feed the one log. Kira is *better-governed*, not
   "safe".
8. **The two pillars, named.** *Proof / substrate* (true today, as architecture)
   and *the World Lending Model* (direction) as co-equal closing panels — with the
   honest gates on the world model visible: counterfactual identification, censored
   12–60-month labels, performativity, population-level fairness.
9. **Claim-discipline footer.** Markets: US, UK, India. No live deployments,
   customers, named partners or metrics claimed. "Validated before it acts"
   supported today as architecture; "smarter after it acts" voiced once, lightly,
   as forward direction.

---

## 4. Flow walk — one action down through the layers

**Scenario: a collections contact to a borrower 17 days past due (1-30 DPD).**
Traces the gate, the log and the shadow learning in motion.

1. **Intent (Kula, staff side).** A Head of Collections has set a standing
   objective in plain language: "reduce 1-30 DPD roll-to-31+ this quarter." Kula
   turned that into a governed *plan* — segments, cadence, which Karta, which
   primitives, the constraints that bind them — and a human approved it in Kupa.
   Nothing executed on its own; Act was locked until sign-off, and the approval
   itself was recorded as a human-decision event.

2. **Selection (Karta — Cure + Decide).** For this borrower, Cure is mid-journey.
   Decide chooses the next-best-action from the **gate-enumerated admissible set**:
   call now, send SMS, wait, or offer a short hardship plan. It selects `MAKE_CALL`
   with parameters — and the **admissible set it chose from** (canonical, derived
   by the gate, not by the planner), the **selection probability**, and the
   structured decision features are carried forward. Note what Decide does *not*
   do: it does not re-underwrite, re-price, or decide creditworthiness — it acts on
   the institution's own risk/status flags. **Decide is itself a model under
   SR 11-7; the gate does not validate that calling was the *right or fair* choice
   — only that the action is legal.**

3. **Vocabulary (Kriya).** `MAKE_CALL` is a single validated, credit-native
   primitive with typed I/O, a version, and KWU metering (referenced from the
   record, accounted separately). It is the smallest unit that can be both checked
   before firing and attributed after. Its validation hooks live at its boundary —
   within the Krim action surface there is no path to dial that isn't this
   primitive — and those hooks are themselves versioned, tested controls.

4. **Eligibility (Kendra — Krim-Karya).** Karya computes *when* the action becomes
   eligible (back-off, retry, deadline, do-not-fire-before) and emits a candidate.
   It **sequences; it does not enforce compliance** — final calling-hours and
   frequency-cap enforcement happen once, at the gate, against the single compiled
   policy bundle.

5. **The gate (Kendra — Krim-Nyaya, deny-by-default).** The primitive is checked
   against the compiled policy / conduct / fair-lending bundle: TCPA consent on
   this number (fast-path, locally-synced), DNC-registry status (slow-path,
   pre-fetched and freshness-bounded *before* enqueue), Reg F 7-in-7 frequency
   given prior touches, calling hours, vulnerability flags that force a hand-off.
   *Two branches:*
   - **Blocked** (no valid consent, or a Reg F breach): the action does not vanish.
     It is flagged and handed to a person via Kupa with the *rule that stopped it
     and the reason in plain words*. The block is recorded.
   - **Cleared:** the call may proceed. Crucially, clearing the gate is a *control
     bounding the consequences of error at the action level* — it is **not** model
     validation and **not** a guarantee the overall contact strategy is fair. A
     sequence of individually-cleared calls can still compose into a harassing
     (Consumer Duty) or systematically under-contacting (disparate-impact) strategy
     the per-action gate structurally cannot see — *emergent-strategy harm*, which a
     more capable optimiser makes worse, not better. That is what the direction
     population-level fairness harness and sequence/campaign-level review exist for.
   - *Availability note:* if a non-critical signal is stale or a dependency is down,
     the action is **queued-and-deferred to a human via Kupa** (fail-closed,
     degraded mode), never silently dropped or silently fired.

6. **Act (Kira, customer side).** The cleared call is placed through Kira — in the
   borrower's language, with cross-channel context. Kira can accept a payment, set
   up a hardship plan, or signpost — each its own validated primitive. If a hardship
   or vulnerability signal surfaces mid-call, Kira hands off to a human by design,
   with the full transcript and reasoning attached.

7. **Record (Kendra — Krim-Ledger, the substrate).** The event lands on the
   append-only log: the **action** (`MAKE_CALL`, params), the **canonical choice
   set** (the SMS / wait / restructure options the gate enumerated), the
   **selection probability**, the **decision features**, the **validation result**,
   the **metered KWU reference**, and — *later and separately, keyed by
   `decision_id`* — the **outcome** (right-party-contact? promise-to-pay? cured?
   complaint?). This is the record incumbent transaction ledgers do not capture,
   and the **architecture produces it on both sides of the wall** (Karta + Kira) —
   the completeness condition a populated substrate would require. The log is
   complete and tamper-evident *over actions KrimOS mediates*, not over every action
   in the operation (break-glass, direct-core writes and off-system human decisions
   are outside it and must be reconciled — see §5).

8. **Supervise and prove (Kupa).** A supervisor sees this in the live queue (See);
   could have paused this campaign, segment, or the whole jurisdiction in one click
   (Step in); and the bank's independent second line can later reconstruct exactly
   what happened, why, under which rules, from the log (Prove) — within Krim's
   mediation boundary, corroborable against the bank's own out-of-band records. The
   override/effective-challenge trail is itself written back.

9. **Learn — in shadow (Kendra — Krim-Learn) [DIRECTION].** Because this record is
   attributed, **propensity-logged**, and the outcome labels mature in *weeks* (not
   the 12–60-month default horizon), it is the kind of short-horizon, off-policy-
   evaluable data Krim-Learn *could* study to ask: *did calling at this hour, in
   this cadence, on this segment, actually reduce roll-to-31+ versus the
   alternatives we rejected?* This learning happens **off the live path, in
   shadow**. It does **not** change Decide's behaviour autonomously. Any improvement
   reaches the live path only as a **frozen checkpoint, independently validated by a
   party with no stake in it shipping (the bank's second line or an external
   validator, on a benchmark they control — not Krim's), promoted under second-line
   approval in Kupa**, and only after a **population-level, LDA-search-inclusive
   fairness harness** clears it — because "admit patterns above an effectiveness
   threshold" is bias-preserving if it is not fairness-aware. **A checkpoint that
   improves aggregate cure-rate while worsening a protected-group disparity must be
   blocked, and the architecture must make that disparity visible at promotion
   time.** Every promotion triggers an EU AI Act "substantial modification"
   assessment and an SR 11-7 re-validation. The honest framing is *what the
   architecture makes possible going forward* — never "the longer it runs the more
   it knows."

**What this walk demonstrates, and where it will be attacked.** The proof pillar is
visible and true today as architecture at steps 3–8: a real action, validated
before it fired, recorded with its rejected alternatives and features,
supervisable and reconstructable within Krim's mediation boundary. The world-model
pillar appears only at step 9, strictly as direction. The three predictable
attacks: (a) *"the gate makes it fair/safe"* — no; step 5 is a per-action control
that structurally cannot catch population-level disparate impact or emergent
strategy harm a return-optimising next-best-action engine assembles from
individually-valid calls (cf. Relman Colfax / Upstart 2024), which is why the
population-level harness and sequence-level review are named as required
complements; (b) *"the ledger replay proves the counterfactual"* — no; on-ledger
replay reconstructs the *decision* under pinned versions, and validates only
on-policy, in-distribution *outcomes*, so the only honest counterfactual evidence
comes from the logged-propensity slices and the gated, small-budget randomized
interventions at the cadence margin, abstaining outside support and never extending
to the never-approved population; (c) *"every action is validated"* — only every
*Krim-mediated* action; the boundary of Krim mediation is itself a first-class
audit object (§5).

---

## 5. Governance & integration honesty (where the architecture is strong, where the caveats are)

This section consolidates what the four adversarial reviews forced. It is part of
the spine, not an appendix: in this domain the concession *is* the load-bearing
truth a risk committee will hold us to.

### 5.1 What survives intact (the defensible core)

- **The negative architectural claim.** Fragmented LOS/LMS stacks and single-slice
  point tools *structurally* cannot capture an attributed, cross-lifecycle,
  action-conditioned record *with its rejected alternatives and decision features*;
  one validated runtime over one append-only log can. This is true **today, as
  architecture**, and needs **no deployment**. It is a time/execution lead, not a
  platonic moat (anyone can start logging choice sets tomorrow) — say so.
- **The gate as a consequence-bounding control.** Deny-by-default over allow-listed
  primitives genuinely bounds the consequences of model error *at the action
  level*. This is a real, shippable property — correctly framed as a control, never
  as a discharge of SR 11-7 validation.
- **Two-tier learning governance, on paper.** Shadow-learn; promote only frozen,
  independently-validated checkpoints to the live path; population-level fairness
  gate at promotion. The *design* is the correct answer; the *running mechanism* is
  direction.

### 5.2 The vendor concentration-of-function problem (CRO — highest-severity governance)

The runtime answers "concentration of function *inside* the system" by pointing to
Kupa and the second line — but in doing so it concentrates function *in the
vendor*: Krim authors the action layer (Karta), the gate (Nyaya), the rule
libraries (Govern/Fabric), the monitors (Sense) *and* the learning loop (Learn). A
second line that merely administers a vendor-authored gate is "marking the vendor's
homework one level up." **Honest position:**

- Kupa **cannot confer independence**. It makes the *artifacts* of independent
  challenge capturable and attributable **if** the bank wires a genuinely
  independent second line.
- Independence becomes *structurally available* only with a **vendor-independent
  control-authorship path**: the second line must be able to author/modify/**veto**
  gate rules and monitor thresholds independently of Krim, run **its own validation
  suite alongside** Krim-Nyaya (not instead of it), and Krim must contractually
  support a "second-line override of vendor-shipped rules" path. Without that, the
  independence is *structurally unavailable*, not merely un-wired.

### 5.3 "One path" is a defence-in-depth trade, not a free virtue (CRO + architect)

"One runtime, one path, one log" is excellent for substrate completeness and a
deliberate **trade against defence-in-depth**: the actor (Karta), the checker
(Nyaya) and the monitor (Sense) share a code path, data model, release cycle and
vendor, so a single defective release can blind the monitor to the exact failure it
introduces into the actor. **Honest mitigation (must be on the architecture page):**

- The validation gate and the monitors are a **separately versioned, separately
  change-controlled, independently testable** artifact from the action-generation
  path; the second line can **pin/roll-back gate+monitor versions independently of
  Karta releases**.
- The bank should run **at least one out-of-band monitor** (its own, off the Krim
  log) so a Krim-Sense/Nyaya defect is detectable by something that does not share
  Krim's code path.

### 5.4 The gate governs actuation, not selection; emergent-strategy harm escapes between valid actions (CRO + architect)

The per-action gate is a **floor on action legality, not a ceiling on
emergent-strategy harm**. The selection policy (Karta Decide / next-best-action) is
**itself a model under SR 11-7** requiring independent validation, and a
return-optimiser applies adversarial pressure to whatever the policy library
*forgot* (specification gaming). Honest claim: "validated before it acts" bounds
*per-action* legality; emergent-strategy safety (harassment, segment under-contact,
UDAAP-adjacent deception) requires **separate population- and sequence/campaign-
level controls plus continuous red-teaming of the validator set** — all
**direction**.

### 5.5 The promotion event is where governance is weakest, and where the fairness harness must be real (CRO + ethicist)

The two-tier lifecycle is strongest in steady state and weakest at the
**promotion event** — the one moment that changes the live decision boundary, and
where business pressure (a checkpoint that lifts cure-rate is revenue) is highest.
Honest hardening:

- The fairness harness must be a **population-level, LDA-search-inclusive,
  version-gating** control whose output and decision criteria are owned by the
  bank's second line and auditable by an external monitor — **not a vendor
  pass/fail**.
- "Independently validated" must mean validated by a party with **no stake in the
  checkpoint shipping**, on a benchmark **they** control.
- A checkpoint that improves aggregate cure-rate while worsening a protected-group
  disparity **must be blocked**, with the disparity **visible at promotion time**.
  Until disparity-at-promotion is demonstrably visible and blocking, the fairness
  governance is decorative. (Cf. the Relman Colfax / Upstart monitorship, 2024: a
  passed disparate-impact + LDA screen is *not* "is non-discriminatory.")

### 5.6 OOD overconfidence is an *oversight* failure, not just a modelling one (CRO + architect)

Meaningful human oversight (EU AI Act Art. 14) is only as good as the
defer-to-human trigger, and that trigger inherits the **unsolved** OOD-calibration
problem — the genuinely novel, regime-break actions are exactly the ones the system
is most overconfident about and *least* likely to route to a human. Honest split:

- **Set-membership novelty** (action not in the allow-listed set, parameters
  outside declared bounds) is a hard, reliable check — keep it, claim it.
- **Distributional/confidence-based OOD routing** is *not* reliable today. Present
  it as conservative-by-construction: route on broad, cheaply-specified novelty
  signals (new segment, new parameter region, thin policy coverage); default to
  abstain/defer when coverage is thin; **evidence the miss-rate via backtesting on
  the bank's own historical regime breaks**. Until that miss-rate is measured on a
  real book, "human-in-command" is design intent, not a demonstrated control.

### 5.7 The ledger is complete and trustworthy only within Krim's mediation boundary (CRO + architect + CTO)

- **Completeness is conditional.** The log is complete over actions KrimOS
  mediates — *not* over the lending operation. Break-glass, direct-core writes and
  off-system human decisions exist in real banks and are invisible in the log by
  definition. The **boundary of Krim-mediation is a first-class audit object**:
  what fraction of consequential actions did *not* pass through the gate.
- **Immutability needs an external anchor.** The log is a Krim artifact; the party
  being held to account controls its own system of record. The second line or an
  external auditor must be able to **corroborate the log against an independent
  record** (core system, comms logs). Reframe Prove as **"reconstructable and
  tamper-evident within Krim's mediation boundary,"** not "the examiner's complete
  proof."

### 5.8 "The substrate" is a data model, not a slogan (architect)

The substrate is an **append-only event log**, specified, not an "immutable
tuple": `DecisionEvent { state_ref + state_hash, admissible_action_set
(gate-derived, canonical, version-pinned), selected_action + params,
selection_probability/assignment, structured_decision_features, policy_bundle_version,
model_version, gate_result, kwu_ref }`, with **late-arriving** `OutcomeEvent`s keyed
by `decision_id` and label-maturity timestamps. Consequences:

- The **choice set is gate-derived** (stable across planner versions), not
  planner-enumerated (which would be unstable and under-reportable by the selecting
  agent).
- **"Reasoning" is structured decision features + policy citations.** Any natural-
  language rationale is a clearly-labelled, **non-authoritative annotation** — never
  recorded as "the reasoning" on a legal record (it can be confabulated and is
  discoverable).
- **Replay reconstructs the *decision*** given pinned `state_hash` +
  `policy_bundle_version` + `model_version`; it does **not** reconstruct the world
  or a counterfactual.
- **Propensity logging is day-one**, or off-policy evaluation is uncomputable
  later — it cannot be retrofitted.
- The **evidentiary audit stream is separate from the mutable KWU metering stream**
  (metering references `decision_id`).

### 5.9 The synchronous gate is a latency/availability design, not just a safety stance (architect + CTO)

A deny-by-default gate on the action path is a hard dependency that must be costed:

- **Fast path** (local, deterministic, bounded-time, compiled policy + locally-
  synced state) sits synchronously in the action path at low latency. **Slow
  external signals** (DNC scrub, fresh bureau) are **pre-fetched and
  freshness-bounded before enqueue**, not fetched synchronously at fire time.
- **Fail-closed with a defined degraded mode** (queue-and-defer-to-human via Kupa),
  never fail-open (which would destroy the proof guarantee during an incident) and
  never silent hard-stop (which would halt operations). The gate and rule store are
  **replicated/HA**; the PDP runs in-process or as a sidecar with a compiled local
  policy bundle so it has no hard runtime dependency on the authoring services.
- Owes a buyer a **stated p99 latency budget** on the hot path.
- **Deny-by-default is only as strong as feed freshness.** Validations that need
  real-time state (TCPA consent revocation, DNC, Reg F 7-in-7, vulnerability flags)
  depend on real-time feeds from systems that often only sync in batch — naming
  this is more credible than hiding it.

### 5.10 "No rip, no replace" vs an inline gate — the integration honesty (CTO)

These are in tension and must be reconciled explicitly:

- **Honest scope statement:** *no core replacement; Krim interposes on the action
  path only for actions Karta co-workers originate, via adapters to the bank's
  LOS/LMS/dialer/payment rails.* The "every action validated" and "complete ledger"
  claims are therefore scoped to **the Krim-originated action surface** — actions
  the bank's legacy systems take directly are ungated and unrecorded by Krim.
- **Integration is the dominant cost/risk, and is a build.** There are **no
  certified adapters today** (no deployments), so every connection to a specific
  core (FIS/Fiserv/Temenos), LOS/LMS (nCino/Blend/Encompass), dialer, payment rail
  or bureau is a build — a multi-quarter program, not a drop-in.
- **Idempotency / compensating-transaction semantics** must be designed for
  state-mutating primitives (`PROCESS_PAYMENT`, `SCHEDULE_AUTOPAY`, `GENERATE_NOTICE`)
  across the Krim/legacy seam — a gate-cleared action that fires, times out and
  retries is a double-debit waiting to happen, gate or no gate.

### 5.11 Sovereignty transfers operational burden, and is in genuine tension with federation (CTO + architect)

- **On-prem shifts the burden onto the bank:** it now runs a stateful, low-latency,
  HA inline gate, a shadow-learning subsystem, and an append-only store inside its
  perimeter, against a vendor with **no hardened reference deployment** — early
  customers co-build the runbook. Offer a **tiered deployment model**
  (managed-in-your-VPC / on-prem / air-gapped) with honest who-operates-what and
  cost deltas.
- **Rule updates need a channel.** Krim-Fabric's per-jurisdiction rules + regulatory
  calendar must stay current; a **signed, auditable update pipe** is compatible with
  sovereignty — pretend-air-gap is not.
- **"One ledger" is N per-tenant logs**, each inside its tenant's perimeter. The
  cross-tenant pattern library and any federation are a **separate, explicit
  boundary** with its own privacy mechanism (federated learning / secure
  aggregation / DP), gated by data-governance review, **acknowledged as direction in
  genuine tension with sovereignty** — not folded into "one ledger."
- **Affirmative data-governance posture for Krim-Fabric:** credit-decision
  parameters **never cross the tenant boundary**; any cross-tenant artifact touching
  a live path is **non-decisional and per-tenant re-validated**; each tenant can
  reproduce its model's behaviour from data and rules **it can inspect** (SR 11-7
  reproducibility; EU AI Act Art. 10 provenance).

### 5.12 The honest 12-month story is a scoped beachhead (CTO)

Apply the real-today-vs-DIRECTION discipline to **integration and deployment
maturity**, not only to the world-model science. The realistic near-term outcome is
a **scoped collections (or single-stage) pilot**: a small number of integrations, a
perimeter VPC, the gate on the **Krim-originated action surface only**, and a
**slice-complete** log. Sell *that*. Lifecycle-wide / substrate-complete /
second-line-owned-and-examiner-accepted is the **multi-year expansion**, action-path
by action-path. The homepage spine must not imply the complete cross-lifecycle
ledger exists in any deployment.

### 5.13 The validators are themselves controls under SR 11-7 (CRO)

"Each primitive carries its checks at its boundary" is the right design. The
sentence that makes a CRO believe it: *and those checks are themselves versioned,
independently testable, change-controlled-by-the-second-line, continuously
red-teamed artifacts with documented test coverage and measured false-negative
rates against the regulation each encodes.* A validator is not ground truth.

---

## 6. Claim-boundary checklist for the layer pages

Use this as the gate on any copy derived from this spine. Each line is a pass/fail.

**Pillars & register**
- [ ] Proof/substrate and the World Lending Model carry **equal (50/50)** billing.
- [ ] The world model is **always** voiced as **direction** / what-the-architecture-makes-possible — never shipped, never monotonic, never autonomous.
- [ ] "Validated before it acts" = supported today (as architecture). "Smarter after it acts" = voiced **once, lightly**, as forward direction.
- [ ] Cross-lifecycle scope is asserted as **architecture + the negative claim** (true today, no deployment), never as a **populated, existing** record. Say "the architecture produces," not "the ledger exists."

**The gate (Krim-Nyaya)**
- [ ] Called a **control that bounds consequences at the action level** — never a discharge/embodiment of SR 11-7, never "legally mandated" (explainability is).
- [ ] Stated to govern **actuation, not selection**; the selection policy (Karta Decide) is a **separately validated model under SR 11-7**.
- [ ] Never framed as making lending/customers "**safe**" or "**fair**." Use **"better-governed and continuously monitored."**
- [ ] Per-action gate explicitly **cannot** catch disparate impact or emergent-strategy harm; population-level harness + sequence/campaign-level review named as **direction** complements.
- [ ] Latency/availability acknowledged where relevant: fast/slow path, **fail-closed with queue-and-defer degraded mode**.

**The substrate (Krim-Ledger)**
- [ ] Described as an **append-only, tamper-evident event log** (not a per-event blockchain, not a single "immutable tuple").
- [ ] **Choice set is gate-derived / canonical**; "reasoning" = structured features + policy citations (any NL rationale is a non-authoritative annotation).
- [ ] Completeness scoped to **Krim-mediated actions**; Krim-mediation boundary is a named audit object; immutability needs an **external anchor**.
- [ ] Outcomes are **late-arriving and censored** (weeks to 12–60 months) — never imply "clean data"; replay reconstructs the **decision**, not the world/counterfactual.

**Validators / "33"**
- [ ] "33 Navya-Nyaya validators" = brand/IP + internal consistency, **never** a coverage or safety proof, in any claim sentence.
- [ ] Validators stated to be **themselves controls** (versioned, tested, second-line change-controlled, red-teamed) — not ground truth.

**Karta / interfaces**
- [ ] Karta verb = "**can** ship" / "**designed to** run the lifecycle" — not fielded lifecycle breadth; collections-first, land-and-expand; beachhead = slice, not complete substrate.
- [ ] Kula and Kira are **interfaces, never minds** — never "thinks/learns/knows/decides." The intelligence and validation live in Kendra.
- [ ] Kira headline = "**better-governed**", never "safe/compliant/cannot break the rules" full stop. "Structural impossibility" applies **only** to the one narrow property (no un-validated action fires).
- [ ] No **causal effect** attributed to an interface as a present behaviour (e.g. "reduces touch count") — design intent only.

**Governance (Kupa / second line)**
- [ ] Second line "**can** own" the gate — Kupa **enables, does not confer** independence; vendor-independent control-authorship path named as the precondition.
- [ ] "**Assembles** oversight evidence your examiner **expects**" — never "produces the proof" / never implies any examiner has accepted the trail.
- [ ] Concentration-of-function-in-the-vendor and the **one-path / defence-in-depth trade** acknowledged where the governance story is made.

**Numbers, partners, deployments**
- [ ] **No** live deployments, customers, named partners, or measured metrics — anywhere.
- [ ] **No invented metrics:** no KWU rate as a published figure (illustrative only); no per-category Kriya counts as **fielded inventory** (target taxonomy only).
- [ ] Sourced figures (e.g. McKinsey 12-touch / $15–$40 collections cost base) marked **cited-as**; TrueAccord/Prodigal = **GTM/incumbency reference**, never a benchmarked comparison.

**Markets & language**
- [ ] Markets named only as **US, UK, India**.
- [ ] Layer/module names are **romanised Sanskrit only** (no Devanagari), identical to spec: Kendra, Kriya, Karta, Kupa, Kula, Kira, Krimkar; Krim-Core/Karya/Fabric/Govern/Nyaya/Learn/Ledger/Sense.

**Integration & deployment honesty (apply the same DIRECTION discipline as the science)**
- [ ] "No rip, no replace" reconciled with the inline gate: **core not replaced; Krim interposes only on Krim-originated actions** via adapters.
- [ ] Integration named as a **build** (no certified adapters today); deny-by-default strength **bounded by feed freshness**.
- [ ] Sovereignty/on-prem **operational burden** and the **federation-vs-sovereignty tension** acknowledged; cross-tenant artifacts **non-decisional, per-tenant validated; credit-decision parameters never cross the tenant boundary**.
- [ ] The honest near-term = **scoped beachhead pilot**, not the lifecycle-wide runtime.

---

*Authoritative sources for everything above:
`/Users/louis/Documents/krim-website-clean/docs/WORLD-LENDING-MODEL-THESIS.md` and
`/Users/louis/Documents/krim-website-clean/docs/POSITIONING.md`.*
