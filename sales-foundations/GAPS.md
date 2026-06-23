# GAPS.md

The site is in a deliberate pre-customer, pre-revenue state. Most gaps are intentional: the site explicitly avoids naming customers, claiming metrics without qualification, or asserting certifications not yet held. Some gaps are likely omissions that would be normal for a funded startup website. A sales team working from this site has strong architectural and regulatory depth to draw on but will face procurement questions the site cannot answer directly.

---

## Named customers or case studies

**Gap: total silence.**

No named customers, no case studies, no institution names, no country-of-deployment, no "used by X banks" language appear anywhere on the site. The government page is explicitly flagged in its source code comment: "HONESTY GUARD: capability framing ONLY. 'Krim fits because…' / 'built for / designed for' — never claimed deployments, customers, agencies, figures or track record."

The enterprise page source comment: "Sectors are a LOGICAL fit, never claimed customers." The platform JSON-LD offers attribute: "InStock" — meaning available, not deployed.

**Assessment: deliberate silence.** The site is pre-customer or pre-referenceable-customer. POSITIONING.md and krim-content.md both explicitly prohibit inventing or implying deployments: "no invented customers, metrics, named partners, or live-deployment claims." This is not an omission — it is a policy. The hard floor across all docs: "no invented customers/metrics/deployments/named partners."

**What sales will need:** even one named reference, design partner, or pilot institution would be significant. Until then, the 30-day proof-of-value process (described in krim-content.md) is the substitute — the site offers to generate outcomes "calibrated to your deployment and proven on your data" rather than citing others.

---

## Specific ROI and outcome metrics

**Gap: ranges without attribution to a deployment.**

The lending page presents four impact ranges (origination: 5–10×; servicing: 40–70%; collections: 1–3 pp; compliance: minutes). These are explicitly framed as "Ranges, not commitments — calibrated to your deployment and proven on your data in a 30-day pilot before anything goes live." They are not attributed to any real deployment.

krim-content.md calls these "calibrated to typical retail-lending deployments and benchmarked against the institution's own baseline during the 30-day proof of value." The framing manages expectations honestly but gives a prospect no third-party evidence that these ranges have been achieved.

**Assessment: partially deliberate, partially a gap.** The ranges exist to be useful; they are honest about their nature. But a procurement team will ask "where has this been proven?" and the site has no answer. Once a pilot produces results, even anonymised ("a Tier-2 UK lender saw X in 30 days") would substantially strengthen credibility.

---

## Pricing and packaging

**Gap: complete silence, by policy.**

No pricing, no tier structure, no per-seat pricing, no KWU pricing, no indication of deployment cost. krim-content.md explicitly states: "Do not put pricing or KWU mechanics on the public site beyond a single tasteful mention of the Ledger-as-meter on /platform/kendra. Pricing is a sales conversation."

**Assessment: deliberate silence.** This is standard for enterprise software at this stage. The commercial model (KWUs for SaaS/hybrid; licensing/subscription for on-prem) is described in internal docs but not surfaced on the site. Sales will need to have a pricing conversation early in the process.

---

## Implementation timeline and onboarding story

**Gap: partially present in internal docs, absent from the site.**

krim-content.md describes the engagement model in three phases:
- 2 weeks: Technical deep-dive (architecture, security, integration review). Exit: scoped pilot + signed data-handling envelope
- 30 days: Proof of value (one workflow on synthetic or ring-fenced data). Exit: measured outcomes against baseline
- 60–90 days: Pilot to go-live (production deployment, full audit and governance live). Exit: contracted go-live + expansion roadmap

This detail is in krim-content.md but does not appear as a page section on the public site. The contact page and CTAs are the only onboarding content visible. The /trust page closes with "Book a demo" and "Start with an architecture, security and integration review" — the closest public hint at the process.

**Assessment: likely omission.** A dedicated "How we work" or "From pilot to scale" section or page would help a procurement team understand what committing to a trial means. This is present in the internal docs but not surfaced publicly.

---

## Competitive comparisons

**Gap: total silence.**

No competitors are named anywhere on the site. The site positions against a gap in the market (unshippable AI, post-audit compliance) rather than against named vendors. POSITIONING.md names the competitive landscape internally: "Incumbent cores (Temenos, FIS, Fiserv, Jack Henry, Oracle) sell rails and 'AI-ready' modernisation. AI-native startups sell copilots, assistants, document-extraction, fraud-detection — assist and detect, rarely act." But none of this is surfaced publicly.

**Assessment: deliberate silence, with a structural reason.** The site's differentiation argument is that the category is wrong, not that specific competitors are weaker. This is a defensible strategic choice — comparing to named competitors invites a features battle and confirms the buyer is in a known category. But sales will encounter buyers who want to know how Krim compares to specific vendors they are already evaluating (FIS/Fiserv AI offerings, Kasisto, Pega, Blue Prism, etc.).

---

## Technical integration specifications

**Gap: named systems, no technical detail.**

krim-content.md lists representative systems ("works with, not endorsements") and notes event-driven architecture (webhooks + streaming) with batch/polling fallback for legacy. The integration section on the homepage is a marquee component — logos or names with no technical depth. The /trust page mentions OAuth 2.0, SAML, RBAC, customer-held keys as security primitives.

No public documentation covers: API specifications, data schemas, authentication flows, latency/throughput specs, or technical integration guides.

**Assessment: likely omission at this stage.** Pre-GA, full technical documentation is not usually public. But an enterprise evaluator will expect a technical datasheet or integration guide before a security review. This is a significant gap for the technical buyer pathway.

---

## Regulatory approval and certification status

**Gap: architecture-aligned standards, no certification dates.**

The trust page presents SOC 2 Type II, ISO 27001, CERT-In, GDPR, DPDP and EU AI Act under "Built to the standards enterprise demands" — framed as the frameworks the security architecture is designed around, without explicit status language. The trust page supports architecture review, pen testing access and documentation on request.

The sectoral frameworks (FDCPA, Reg F, FCA Consumer Duty, RBI circulars) are described as "encoded in the runtime" — meaning the rules are in the system's logic, not that Krim holds a regulatory certification or approval. The site does not claim regulatory approval for any framework.

**Assessment: a significant gap for Tier-1 regulated buyers.** Enterprise procurement at a large bank will typically require SOC 2 Type II before a security review proceeds. The public site cannot answer "do you hold SOC 2?" — that question must be handled in the sales/security review conversation. Until at least one certification is held, the sales team needs a prepared response that directs prospects to the architecture review process rather than a certification document.

---

## Geographic market entry sequence

**Gap: all three markets described in parallel, no prioritisation.**

The site presents the US, UK, and India simultaneously without indicating which market is first, which is the primary target for initial pilots, or where the team is currently most active. The company page states "built and run across the US, UK and India" and the contact information includes a US phone number (+1 510 345 5686) with "US · UK · India" listed.

POSITIONING.md internally states: "Markets: US · UK · India. The US for fair-lending rigour, the UK for Consumer Duty + the BoE/FCA AI lens, India for RBI FREE-AI + the largest credit-access growth story." But this prioritisation is not surfaced publicly.

**Assessment: likely omission.** A prospect in any one market would benefit from knowing where Krim's deepest regulatory and operational knowledge currently sits. The STPI-incubated recognition suggests India is where the company started; the US phone number and US framework depth suggests significant US focus. Without this, the three-market framing reads as ambition rather than current capability.

---

## Team and leadership bios

**Gap: founder named, team listed without roles.**

The company page names the CEO and founder (Vishwa Nath Jha) and lists six founding team members (Om Mishra, Nachiketa Jha, Nakshatra Kanchan, Mohit Singh, Devansh Jindal, Divyansh Gupta) — but none of the founding team members has a role, title, or background listed. The source code notes these are "monogram placeholders until headshots land."

No other bios appear anywhere on the site. No advisor board, no investor names, no domain experts named.

**Assessment: partly deliberate (no headshots yet), partly an omission (no roles even in text).** A procurement team evaluating a regulated AI system will want to understand the regulatory, risk, and compliance expertise on the team. The absence of roles for the founding team is a real gap. "A research-and-engineering team" is the only characterisation of the broader team's background.

---

## Vendor questionnaire items the site does not address

A standard enterprise security / vendor due diligence questionnaire would ask for items the site is silent on:

| Item | Site coverage | Assessment |
|---|---|---|
| Data processing agreement template | Not mentioned | Likely a sales-stage document; krim-content.md mentions "signed data-handling envelope" as a pilot exit criteria |
| Business continuity / disaster recovery | Not mentioned | Gap |
| Penetration testing results | Not mentioned | Gap — would be needed before SOC 2 audit |
| Sub-processor list | Not mentioned | Gap — relevant for sovereign/on-prem claims |
| SLA / uptime guarantees | Not mentioned | Gap |
| Support model (hours, channels, escalation) | Not mentioned | Gap |
| Data deletion and retention policies | Partially: "customer-held keys" and "PII isolated by tenancy" but no retention policy detail | Partial |
| Model card / model documentation | Not mentioned | Gap — relevant for SR 11-7 framing |
| Export controls / geopolitical restrictions | Not mentioned | Gap for cross-border deployments |
| Insurance / errors and omissions coverage | Not mentioned | Gap |
| Reference customers for security review | Not mentioned (no customers named) | Gap |

**Assessment:** Most of these are deliberate silences appropriate for a pre-GA product. A sales team will need a standard vendor security questionnaire pack and a data processing agreement template to address procurement requirements at Tier-1 institutions.
