# PRODUCT-TRUTH.md

KrimOS is Krim's single product: an operating system for banking and financial services that runs the whole lending lifecycle — origination to collections — by composing AI co-workers from validated action primitives inside a governed runtime that proves each action before it fires and learns from every recorded outcome. The site presents six named layers that stack from vocabulary (Kriya) through co-workers (Karta) through a runtime (Kendra) through a command center (Kupa) through two interfaces (Kula for teams, Kira/Krimkar for customers). Every layer is described in concrete operational terms, and the site is explicit that while operational decisioning is live today, the AI underwriter and full autonomous credit decision are the build direction via the World Lending Model.

---

## KrimOS at the top level

The platform page names it: "One operating system for regulated operations — AI co-workers do the work; every action is validated before it executes, and the system gets sharper from every outcome it records — all inside your own perimeter." The homepage OG metadata adds the banking framing: "KrimOS is the operating system for banking and financial services — a world model for lending with AI co-workers that run the whole lifecycle, every action validated before it acts, inside your own walls." The platform JSON-LD calls it "Operating system for regulated operations: Sovereign on-prem, Hybrid, Managed SaaS."

The site's composition logic, stated once in krim-content.md: "Kriya primitives compose into Karta co-workers; Karta execute through the Kendra runtime; every action passes Krim-Nyāya before it fires; outcomes are metered and recorded in Krim-Ledger and feed Krim-Learn — all surfaced through Kira in Krimkar and Kula in Kupa."

---

## Layer-by-layer map

### Kendra — the runtime

**What it is:** "The brain the co-workers think in. Kendra is the runtime of KrimOS — where every co-worker reasons, and where the rules of what they may do actually live. It validates each action before it acts, and gets sharper from each outcome it records." (/platform/kendra)

**Two primary powers:**
- Krim-Nyāya: pre-execution validation — 33 validators that gate every action before it fires
- Krim-Learn: ten learning loops that read every recorded outcome and compound intelligence

**Workflows served:**
- Underwriting: credit-analysis support and policy checks run inside the runtime
- Collections and servicing: every Karta action (outbound contact, cure journey, document generation) clears the gate
- Compliance and reporting: Krim-Ledger produces the audit trail; Krim-Sense feeds dashboards in Kupa
- Real-time data: Krim-Fabric holds per-jurisdiction rule sets and the regulatory calendar
- Scheduling: Krim-Karya owns when work runs — contact hours, FDCPA windows, retry timing

**Concrete operational impact for a lending team:** "Because the evidence is complete by construction, an inspection response that took a compliance team three days is generated in minutes." Compliance moves in front of the action rather than behind it.

#### The eight runtime modules inside Kendra

| Module | Role | What it does |
|---|---|---|
| **Krim-Core** | Orchestration | Routes each task to the right co-worker; runs sequential, parallel and hand-off workflows with retries and graceful fallbacks |
| **Krim-Karya** | Scheduling | Owns when work runs — timed and recurring tasks, deferred actions, retry and back-off timing, and time-window rules like contact hours and regulatory deadlines |
| **Krim-Fabric** | Knowledge | The regulatory rule set for each jurisdiction, each institution's own policies, and the shared anonymised pattern library |
| **Krim-Govern** | Policy | A seven-level hierarchy of law, regulator guidance and house rules, enforced per tenant and updated as the rules change |
| **Krim-Nyāya** | Validation | The pre-execution gate — 33 validators that decide whether a proposed action is allowed to happen at all |
| **Krim-Learn** | Learning | Ten learning loops that read every recorded outcome and feed back what actually worked across the workforce |
| **Krim-Ledger** | Record | Every action logged immutably and metered in Krim Work Units (KWUs) in the same pass — one trail for audit and billing |
| **Krim-Sense** | Telemetry | Metrics, logs, alerts and dashboards that show what is happening across the whole stack |

The site names only seven on the /platform/kendra page but the eighth — Krim-Core — appears in the MODULES array at line 40. [ASSUMPTION: Krim-Core is the eighth module; the page copy says "eight modules" but renders eight cards matching the list above, with Krim-Core as the first.]

---

### Kriya — the vocabulary

**What it is:** "Every action a co-worker can take is one of 250+ validated, credit-native primitives — the atomic operations of regulated lending. The list is finite; what you build from it isn't." (/platform/kriya)

**Workflows served:** all ten categories span the full lending operation:
- Voice and telephony (~45 primitives): origination calls, collections, servicing, retention
- Document operations (~30): generating notices, parsing PDFs, e-signing, sending regulatory letters
- Compliance checks (~50): the rule-tests every action must pass
- Data operations (~35): fetching accounts, bureau lookups, enrichment
- Payment processing (~25): calculating settlements, scheduling autopay
- Decision logic (~20): evaluating policy, routing escalations
- Analytics and reporting (~15): rolling up metrics, audit reports
- Integration (~30): syncing to LOS, CRM, webhooks
- Testing and QA (~10): exercising co-workers safely before production
- Custom (—): tenant-specific primitives, built to the same construction

**Concrete operational impact:** "A primitive does one thing — make a call, generate a notice, move a payment — and carries its own safety inside it, not bolted on afterward. Because the building blocks are validated, everything built from them inherits that safety." Safety is written once, inherited everywhere. The worked example from krim-content.md: MAKE_CALL takes account_id, phone_number, caller_id, max_duration and optional script/context; before it dials, it automatically clears TCPA consent, calling-hours, Reg F contact limits and DNC-registry checks. ~10 KWU/minute; a typical eight-minute outbound call costs ~120–150 KWU including validation.

**The hard boundary the site states explicitly:** "In the library, APPROVE means approval of a step in a workflow — not, in itself, a credit decision. Primitives segment, route and execute under the institution's own rules. The credit decision is a higher-order act — and the safe AI underwriter that will make it is the direction we are building, on this same validated foundation."

---

### Karta — the co-workers

**What they are:** "Karta are the AI co-workers that run your operation — composed from validated primitives, configured to your institution, and held to every rule before they act." Eight named co-workers cover the end-to-end operation. (/platform/karta)

**The eight co-workers:**

| Co-worker | Workflows served |
|---|---|
| **Karta-Vox-Out** | Origination calls, onboarding, servicing, collections, hardship, retention, cross-sell — outbound voice across the lifecycle |
| **Karta-Vox-In** | Inbound servicing and payment queries, disputes, hardship signposting, warm transfer |
| **Karta-Doc** | Documents and notices: arrears notices, restructuring offers, regulatory letters, payment confirmations |
| **Karta-Risk** | Operational risk segmentation and gating by the institution's own external risk flags |
| **Karta-Decide** | Next-best-action and conflict resolution across competing strategies |
| **Karta-Cure** | Delinquency cure — multi-step journeys that bring borrowers back to good standing |
| **Karta-Audit** | Interaction review, pattern detection and anomaly surfacing for compliance and audit teams |
| **Karta-Report** | Operational reporting aggregated for ops, risk, compliance and executive stakeholders |

**What they don't do today** (stated explicitly on the page): Approve or deny loans; price credit; override the institution's credit or risk engines; make the credit decision.

**Concrete operational impact:** A digital workforce that handles origination, underwriting support, servicing and collections end to end. Autonomy is a setting — four operating modes (autonomous, oversight, copilot, human-in-the-loop) set per workflow, per segment, per risk band.

---

### Kupa — the command center

**What it is:** "Kupa is the command center of KrimOS — one pane of glass to see every action, set the rules, step in when it matters, and prove what happened. The co-workers act; you hold the controls." (/platform/kupa)

**Four control verbs that define the page:**
- **See:** Dashboards and queues across every stage and segment — what is moving, what is stuck, every SLA
- **Set:** Which co-workers run for which segments — contact windows, frequency caps, channels per jurisdiction, offers and tests
- **Step in:** Sign-off on low-confidence or high-risk decisions; one-click pause or rollback of any co-worker, campaign or segment
- **Prove:** Every interaction linked to the policy that applied, the validation result and the decision — what ran, why, and under which rule

**Workflows served:** sales, servicing, collections, retention — full lifecycle visibility from one surface.

**Concrete operational impact:** "Every action supervised, reversible and audit-ready — so the people who answer for the operation can always see what ran, why, and under which rule." Nothing happens out of view.

---

### Kula — the enterprise interface

**What it is:** "Kula is how your people reach KrimOS — in plain language. It is the way in; the thinking happens in Kendra, the runtime behind it." (/platform/kula)

**How it works — four steps:**
1. Ask: plain-language request ("bring down missed payments in the first month next quarter")
2. Suggest: Kula proposes segments, flows, co-worker combinations and policy constraints — drafted from Kriya primitives, nothing has run yet
3. Act: the plan is routed through validation and surfaced in Kupa for review; on approval it executes
4. Learn: every outcome sharpens the next plan

**Roles it serves:** Chief Lending Officer, Chief Risk Officer, Head of Collections, Head of Servicing, Head of Compliance, Head of Credit Ops, Head of Analytics, Contact Centre Lead — one digital twin per role, one source of truth across the institution.

**Concrete operational impact:** "Your teams ask in their own words and stay in control of every call — the runtime does the thinking, and nothing runs until a person says so." The key qualifier the site states: "It never acts on its own. Act stays locked until a person approves."

---

### Kira and Krimkar — the customer interface

**What they are:** "Kira is the AI customer advisor your customers actually meet — in the Krimkar app, on your public site, and across every channel they already use. One conversation that remembers, in their own language, always within the rules." (/platform/kira)

**Channels:** WhatsApp, voice, IVR, web chat, SMS, email. Krimkar is the consumer app and public site.

**Language capability:** "Kira speaks the customer's language, including 50+ Indian languages."

**Workflows served:**
- Origination and onboarding: engages, qualifies and guides the application
- Servicing: payments, queries, statements — one advisor, always on
- Collections and hardship: reminders and plans, hardship handled with care
- Closure and re-engagement: payoff, the NOC, the next product conversation

**The dignified hand-off:** for disputes, hardship or sensitive segments, Kira hands off to a human with the full conversation attached. "The hand-off is a feature, not a failure."

**Concrete operational impact:** "One relationship, the whole way through — from the first application to the final payment." The site's qualifier: "warm enough to feel like a person, bounded enough to be safe."

---

## Geography and markets served

Confirmed from the site (homepage JSON-LD, company page, trust page, lending page): **United States, United Kingdom, India**. Three regulatory worlds with one runtime; only Krim-Fabric's rule set changes per jurisdiction.

US frameworks encoded: FDCPA, TCPA, Reg F, FCRA, SCRA, GLBA, ECOA, CFPB, ACA
UK frameworks encoded: FCA Consumer Duty, CONC sourcebook, Consumer Credit Act, UK GDPR
India frameworks encoded: RBI circulars, Fair Practices Code, DPDP

---

## The three technical pillars

### (a) The agent harness

The site describes eight named Karta co-workers that do the operational work of lending — voice, documents, risk, decisions, cure, audit, reporting. They are composed from Kriya primitives, not coded from scratch. Each is defined by eleven attributes (purpose, capabilities, primitives, inputs, outputs, metrics, KWU cost, governance, learning loops, human-in-the-loop triggers, availability). The World Lending Model page describes agents working "the stack — origination, a validated AI underwriter, servicing, collections." The site frames Kupa as "the command center where the bank's teams supervise, configure, intervene and audit the AI workforce."

### (b) Pre-execution validation runtime

Krim-Nyāya is the site's most thoroughly described technical component. The homepage section "Intelligence by policy" states: "Before a co-worker acts, Kendra runs it through Krim-Nyāya — a gate of 33 validators in three families: grounding, soundness, permission." The platform page states: "Nothing runs until it has cleared the gate." The three validator families (from krim-content.md): Pramāṇa (sources of knowledge), Doṣa (classes of error), Yogyatā (fitness for action). Actions either clear, come back amber, or fail — failed actions are "flagged and handed to a person, with the rule that stopped them in plain words."

### (c) World Lending Model

The research page describes it as "a complete, safe world model of lending — borrowers, products, markets, rules and the whole lifecycle — that AI agents reason and plan against." Five component models: the borrower model, products and cashflows, market and macro, policy and rules, lifecycle dynamics. Plus the agent harness that acts on all five. The site voices it as Krim's research direction and an evolving system that "sharpens as it sees more data" — not as a shipped product with live deployments, but described with full confidence. The close: "The World Lending Model is the frontier of our research, and it compounds with every validated outcome it records."
