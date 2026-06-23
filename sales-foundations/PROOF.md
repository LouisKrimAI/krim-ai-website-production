# PROOF.md

The site's credibility signals are deliberately modest and precisely bounded. Krim names three institutional recognitions, lists specific regulatory frameworks encoded into the runtime, provides calibrated impact ranges framed as ranges not commitments, and is transparent about certifications that are in progress rather than held. There are no named customers, no case studies, no deployment statistics, and no metrics attributed to a specific institution. The site's credibility strategy is grounded in specificity (named validators, named frameworks, named modules) rather than in social proof from customer logos.

---

## Numbers

### Validator count
**33 validators** — named on the homepage, the kendra page, the trust page, and krim-content.md. On the homepage: "Kendra runs it through Krim-Nyāya — a gate of 33 validators in three families: grounding, soundness, permission." krim-content.md notes: "Validator count = 33 — CONFIRMED (deck + memo agree)." (/homepage section 6, /platform/kendra, krim-content.md)

### Primitive count
**250+ validated, credit-native primitives** in ten categories. Named on /platform/kriya: "Every action a co-worker can take is one of 250+ validated, credit-native primitives." The kriya page notes: "Counts are approximate; the library passed 250+ primitives and keeps growing." krim-content.md flags: "[DECISION] Kriya primitives: 250+ (ten categories) — the deck said '20+.' Set to 250+ here as the more current/authoritative figure." (/platform/kriya, krim-content.md)

### Connector count
**40+ connectors.** Homepage: "Sits on top of your core, LOS and LMS. No rip, no replace. 40+ connectors." Also stated in platform JSON-LD featureList: "40+ connectors; nothing to tear out, nothing to migrate." (/homepage section 8, /platform JSON-LD, krim-content.md)

### Language count (Kira)
**50+ Indian languages.** Kira page: "Kira speaks the customer's language, including 50+ Indian languages." (/platform/kira)

### Learning threshold
**~80% effectiveness threshold.** Kendra page: "A pattern only joins the shared library once it clears an effectiveness threshold of around 80%, and what is shared is anonymised, aggregated and opt-out." (/platform/kendra, krim-content.md)

### Seven-level policy hierarchy
**Seven levels** — named in krim-content.md and the Kendra modules table: "Krim-Govern: A seven-level hierarchy of law, regulator guidance and house rules, enforced per tenant." (/platform/kendra module card, krim-content.md)

### Impact ranges (framed as calibrated ranges, not commitments)
The lending page presents four areas with ranges explicitly described as "calibrated to your deployment and proven on your data in a 30-day pilot before anything goes live":
- **Origination:** 5–10× document throughput per analyst; days to hours on onboarding
- **Servicing:** 40–70% self-serve resolution; 30–50% lower assisted handling time
- **Collections:** 1–3 pp lower DPD 1–30 roll-rate; 25–40% more right-party contact
- **Compliance:** Minutes for audit-ready reporting; 100% of regulated actions pre-validated

(/lending section 5 — the site explicitly says "Ranges, not commitments — calibrated to your deployment and proven on your data in a 30-day pilot")

### Market context numbers (from krim-content.md / POSITIONING.md, cited with sources)
These appear in the internal docs as cited market facts; the site does not currently display them as pull-quotes but they inform the problem framing:
- Banking cost-to-income ≈ 51% (McKinsey, 2024 — HIGH-CONF)
- ~12 manual touches per loan application at ~$15–$40 each (McKinsey — HIGH-CONF)
- ~95% of enterprise GenAI pilots show no P&L return against $30–40B spent (MIT NANDA, 2025 — HIGH-CONF)
- $5.7T MSME finance gap (IFC — flagged [CONFIRM vintage before external use])
- The lending page uses "40–60% of what every loan costs" for operations cost, framing the problem (/lending section 2)

---

## Design partner and pilot language

The site does not use "design partner" language or pilot customer names. The engagement model is described in krim-content.md:
- 2 weeks: Technical deep-dive; exit: scoped pilot + signed data-handling envelope
- 30 days: Proof of value on synthetic or ring-fenced data; exit: measured outcomes against your baseline
- 60–90 days: Pilot to go-live; exit: contracted go-live + expansion roadmap

The lending page references the 30-day pilot framing: "Ranges, not commitments — calibrated to your deployment and proven on your data in a 30-day pilot before anything goes live." (/lending section 5)

No named design partners, pilot institutions, or customer references appear anywhere on the site.

---

## Regulatory and compliance framing

The site names specific regulatory frameworks across multiple pages, establishing domain credibility without claiming certified compliance:

### Named frameworks — United States
FDCPA, TCPA, Reg F, FCRA, SCRA, GLBA, ECOA, CFPB, ACA — all named on /trust (JURISDICTIONS constant), /lending (JURISDICTIONS constant), and krim-content.md. The kriya page cites representative compliance-check primitives: CHECK_TCPA, CHECK_BANKRUPTCY, VERIFY_SCRA, REG_F_LIMIT.

### Named frameworks — United Kingdom
FCA Consumer Duty, CONC sourcebook, Consumer Credit Act, UK GDPR — named on /trust, /lending, and krim-content.md.

### Named frameworks — India
RBI circulars, Fair Practices Code, DPDP — named on /trust, /lending, and krim-content.md.

The trust page states: "Each jurisdiction's sectoral law is encoded in Krim-Fabric and enforced by Krim-Nyāya before an action can fire. A lender in any market inherits the same runtime and audit trail, with the jurisdiction's rules already in place. As rules change, they update without restarting the runtime." (/trust section 4)

### Specific regulatory frameworks referenced in internal docs but not foregrounded on the site
SR 11-7 (US model risk), ECOA/Reg B, EU AI Act (credit scoring is high-risk; penalties up to €35M/7% for prohibited and €15M/3% for high-risk obligations phasing in through 2 Aug 2026), RBI FREE-AI (India, Aug 2025: 7 Sutras, 6 Pillars, 26 recommendations). These appear in POSITIONING.md §2 as market context; they inform the architecture framing but are not named on public pages. [ASSUMPTION: these are not currently on the public site; they are in the docs as internal market intelligence]

---

## Recognition and awards

Three recognitions are named on the company page and listed in the RECOGNITION constant:
- **NVIDIA Inception** — named on /company and in krim-content.md: "NVIDIA Inception · DPIIT (Startup India) · STPI-incubated"
- **DPIIT (Startup India)** — named on /company
- **STPI-incubated** — named on /company

Company page: "Recognised by NVIDIA Inception, DPIIT (Startup India) and STPI." The site notes: "official badge images to be supplied" — the recognitions are currently rendered as text, not with badge imagery. krim-content.md confirms: "Recognition (confirmed; official badge images to be supplied)." (/company section 4)

---

## Heritage and lineage claims

The company page contains the only heritage claim: the naming of Krim-Nyāya after the Navya-Nyāya formal logic tradition.

"Our validator is Krim-Nyāya. It draws on Navya-Nyāya — the formal-logic tradition of Mithila, two thousand years of rigorous reasoning about what follows from what." The site adds: "Substance, not mysticism. It gives us a precise grammar for turning a regulation into a check a machine can run, and a decision into something an auditor can read." (/company section 3 "The name")

krim-content.md: "33 validators derived from Mithila's Navya-Nyāya formal logic — a two-thousand-year tradition of predicate reasoning — in three families (Pramāṇa, Doṣa, Yogyatā)."

**Team heritage (background context for sales conversations — not on the public site):** The Krim founding team previously built and operated a lending AI product focused on collections automation across India's NBFC and banking market — demonstrating operational-scale deployment in a regulated lending environment, multilingual borrower communication, and compliance-first AI design. That prior experience directly informs Krim's architecture and product instincts.

This prior work does not appear on the Krim site — Krim is a distinct company, product and brand, and outreach should lead with what Krim is, not what came before. But when a prospect asks what the team has built before, the founding team's prior lending AI deployment is available as credibility context. Keep the reference brief and factual: *prior lending AI deployment at scale in a regulated market.* Do not lead with it, quantify it, or name the prior product in written collateral without specific approval.

---

## Named integrations and technology partners

The site names representative systems in krim-content.md as "works with, not endorsements":
- Core banking/LMS: Finacle, Flexcube, BaNCS, in-house
- LOS: Lentra, Tavant, Newgen, Nucleus
- Voice: Genesys, NICE CXone, Avaya, Cisco, Exotel
- Channels: WhatsApp Business, mobile, web, IVR, SMS
- Data: Snowflake, BigQuery, on-prem DWH, Hadoop
- Security: OAuth 2.0, SAML, RBAC, customer-held keys

These are not displayed as logos or named as partners on the public site. The homepage's integrations section uses an IntegrationsMarquee component but the specific names shown are in a separate component file not read for this analysis. [ASSUMPTION: the marquee shows some subset of the above systems]

---

## "Proven" and "validated" language as social proof

The site uses these terms in their technical sense (about the architecture), not as social proof. Examples:

- "Proven on your data in a 30-day pilot" (/lending section 5) — refers to the Krim pilot process
- "250+ validated, credit-native primitives" (/platform/kriya) — validated means architecturally pre-checked
- "Validated before it acts" (site-wide) — the architecture's property

The site does not use "proven" in the sense of "proven with named customers." There is no case study or testimonial language anywhere on the site.

---

## Trust and audit trail claims

The trust page makes several specific audit trail claims:

- "Every action, decision and validation streams to one immutable trail. An auditor can replay any decision deterministically — what happened, the policy that applied, and the validation result behind it." (/trust section 5)
- "An inspection that once meant days of reconstruction is answered the same afternoon." (/trust section 5; also /platform/kendra: "an inspection response that took a compliance team three days is generated in minutes")
- "The chain of custody is court-admissible; retention is automatic." (krim-content.md, Krim-Ledger section)
- "Every action, decision, prompt, output and validation streams to an immutable, cryptographically sealed trail." (/trust section 5)
- "A court-admissible chain of custody." (krim-content.md)

Specific security properties named on /trust: end-to-end encryption (rest and transit), granular RBAC, customer-held keys, PII isolation by tenancy, sealed immutable trail ("cryptographically sealed, append-only record").

---

## Security and compliance standards

The trust page presents six frameworks under "Built to the standards enterprise demands" — split into two labelled groups with no status indicator attached:

**Information security:** SOC 2 Type II · ISO 27001 · CERT-In
**Regulatory alignment:** GDPR · DPDP · EU AI Act

The framing is: *"Our security architecture is designed around the controls and frameworks your security and compliance teams will recognise — across information security, data protection and AI governance."* The trust page explicitly supports architecture review, penetration testing access and full documentation on request. (/trust section 6)

**For sales conversations:** these are the frameworks the architecture is designed around. Questions about certification timelines or audit reports should be handled in the security review process, not on the public site.
