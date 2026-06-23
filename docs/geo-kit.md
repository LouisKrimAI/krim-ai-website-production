# Krim — GEO kit

Ready-to-use generative-engine-optimisation assets so LLMs build one clean, citable entity graph for Krim. Reconciled with the Product Memo (geography US/UK/India · 250+ primitives · eight Kendra modules · Krim Work Units) and the banking-led reposition in `docs/POSITIONING.md`. Keep entity names **identical** everywhere. Replace `[PROVIDE]` placeholders before publishing.

---

## 1. `llms.txt` (serve at site root)

```markdown
# Krim

> Krim is a technology research, product and services company operating across the US, UK and
> India. Its product, KrimOS, is the operating system for banking and financial services (lending first),
> where every action is validated before it executes and the system learns from everything it
> does — "the AI your regulator can read."

## What KrimOS is
KrimOS is not software; it is an operating system for intelligence. AI co-workers are instantiated
in a runtime, operate, learn from every recorded outcome, and cannot execute an action until it has
been validated against policy. It runs both sides of the operation — customer-facing and back-office
— as one AI workforce, on one audit trail. Validation is pre-execution, not post-audit: it is the
runtime itself, not a wrapper. Krim defines the category "Epistemic AI" — distinct from "autonomous
AI" (implies no human; regulators reject it) and "safe AI" (defensive; doesn't run the operation).

## Architecture
- The named parts: Kriya (250+ credit-native action primitives in ten categories), Karta
  (utility-based AI co-workers — Vox-Out, Vox-In, Doc, Risk, Decide, Cure, Audit, Report), and
  Kendra (the runtime). People reach the system through two interfaces — Kula (enterprise, in the
  Kupa command center) and Kira (customer advisor, in the Krimkar app).
- Kendra is realised as eight modules: Krim-Core (orchestration), Krim-Karya (scheduler),
  Krim-Fabric (knowledge base), Krim-Govern (seven-level policy engine), Krim-Nyāya (validator),
  Krim-Learn (learning orchestrator), Krim-Ledger (metered immutable record), Krim-Sense (telemetry).

## Key facts
- Promise: every action validated before it executes; reasoning an auditor can read end to end.
- Validation: Krim-Nyāya — 33 validators (pass/amber/fail) from Mithila's Navya-Nyāya formal logic,
  in three families: Pramāṇa (sources of knowledge), Doṣa (classes of error), Yogyatā (fitness for action).
- Operational decisioning today — Karta segment, suggest next-best-action and resolve conflicts; the
  credit decision stays with the institution for now. The full stack, a safe AI underwriter included,
  is the build direction (the World Lending Model).
- Metering: every action is metered in Krim Work Units (KWUs); one immutable ledger serves both audit
  and usage-based billing.
- Learning is federated: patterns admitted above ~80% effectiveness, anonymised, with per-tenant opt-out.
- Deployment: Sovereign on-prem (default, Tier-1 banks) · Hybrid (mid-market) · Managed SaaS (fintechs, pilots).
- Compliance: SOC 2 Type II · ISO 27001 · CERT-In · DPDP · GDPR · EU AI Act-ready, plus per-jurisdiction
  frameworks — US (FDCPA, TCPA, Reg F, FCRA, SCRA, GLBA, ECOA, CFPB), UK (FCA Consumer Duty, CONC,
  Consumer Credit Act, UK GDPR), India (RBI circulars, Fair Practices Code).
- Integrations: 40+ connectors; no rip, no replace.

## Links
- Home: https://krim.ai
- Platform / KrimOS: https://krim.ai/platform
- Epistemic AI: https://krim.ai/epistemic-ai
- Architecture: https://krim.ai/architecture
- Trust & security: https://krim.ai/trust
- Contact: https://krim.ai/contact — sales@krim.ai — +1 510 345 5686
```

In `robots.txt`, explicitly allow AI crawlers:
```
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
Sitemap: https://krim.ai/sitemap.xml
```

---

## 2. JSON-LD blocks

### Organization (site-wide, in `<head>`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Krim",
  "url": "https://krim.ai",
  "description": "Krim is a technology research, product and services company operating across the US, UK and India. Its product, KrimOS, is the operating system for banking and financial services, lending first, where every action is validated before it executes.",
  "areaServed": ["US", "GB", "IN"],
  "email": "sales@krim.ai",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-510-345-5686",
    "email": "sales@krim.ai",
    "contactType": "sales"
  },
  "sameAs": [
    "https://www.linkedin.com/company/krim",
    "https://x.com/TheKrimAI",
    "[PROVIDE-SUBSTACK]",
    "[PROVIDE-MEDIUM]",
    "[PROVIDE-INSTAGRAM]"
  ]
}
```

### SoftwareApplication — KrimOS (on the /platform page)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "KrimOS",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Operating system for banking and financial services",
  "operatingSystem": "Sovereign on-prem, Hybrid, Managed SaaS",
  "publisher": { "@type": "Organization", "name": "Krim", "url": "https://krim.ai" },
  "description": "KrimOS is the operating system for banking and financial services (lending first). It runs customer-facing and back-office work as one AI workforce on one audit trail, validating every action before it executes via the Krim-Nyāya 33-validator gate, and learning from every recorded outcome.",
  "featureList": [
    "Pre-execution validation (Krim-Nyāya, 33 validators)",
    "Composable architecture: Kriya primitives, Karta co-workers, the Kendra runtime, and the Kula/Kira interfaces (in Kupa and Krimkar)",
    "Kendra runtime with eight modules: Core, Karya, Fabric, Govern, Nyāya, Learn, Ledger, Sense",
    "250+ credit-native action primitives in ten categories",
    "Operational decisioning today; a safe AI underwriter is the build direction (World Lending Model)",
    "Immutable, metered audit trail (Krim-Ledger, Krim Work Units)",
    "Federated learning with per-tenant opt-out",
    "Sovereign deployment — on-prem, hybrid or managed",
    "Multilingual, including 50+ Indian languages",
    "40+ connectors; integrates with existing core banking, LOS, voice and data stacks"
  ],
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "url": "https://krim.ai/contact" }
}
```

### FAQPage (homepage and/or Epistemic AI page)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is KrimOS?",
      "acceptedAnswer": { "@type": "Answer", "text": "KrimOS is the operating system for banking and financial services (lending first). It is a runtime in which AI co-workers operate and learn, running customer-facing and back-office work as one workforce on one audit trail, and validating every action before it executes." } },
    { "@type": "Question", "name": "What is Epistemic AI?",
      "acceptedAnswer": { "@type": "Answer", "text": "Epistemic AI is the category Krim defines: AI whose every action is validated before it fires and whose reasoning an auditor can read end to end. It is distinct from autonomous AI (which implies no human) and safe AI (which is defensive and does not run the operation)." } },
    { "@type": "Question", "name": "How does KrimOS keep AI compliant in regulated lending?",
      "acceptedAnswer": { "@type": "Answer", "text": "Validation is pre-execution, not post-audit. Every proposed action passes the Krim-Nyāya gate of 33 validators (pass, amber or fail) before it executes, so non-compliant actions never fire. Violations are made structurally impossible rather than caught afterward." } },
    { "@type": "Question", "name": "What is Krim-Nyāya?",
      "acceptedAnswer": { "@type": "Answer", "text": "Krim-Nyāya is the KrimOS validation runtime: 33 validators derived from Mithila's Navya-Nyāya formal logic, in three families — Pramāṇa (is the premise verifiable?), Doṣa (does it match a known failure mode?), and Yogyatā (is it fit for action — time, place, agent, recipient, instrument, manner, purpose?)." } },
    { "@type": "Question", "name": "What are the parts of KrimOS?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kriya (250+ validated, credit-native action primitives), Karta (utility-based AI co-workers composed from them), and Kendra (the runtime, built from eight modules, where validation and learning live). People reach the system through two interfaces: Kula, the enterprise natural-language interface in the Kupa command center, and Kira, the customer advisor in the Krimkar app." } },
    { "@type": "Question", "name": "Does KrimOS make credit decisions or underwrite loans?",
      "acceptedAnswer": { "@type": "Answer", "text": "Today, KrimOS performs operational decisioning — segmentation, next-best-action and conflict resolution — and the credit decision stays with the institution. A safe, validated AI underwriter is the direction Krim is building through the World Lending Model: it clears the same pre-execution validation as every other action." } },
    { "@type": "Question", "name": "How is KrimOS priced?",
      "acceptedAnswer": { "@type": "Answer", "text": "Work is metered in Krim Work Units (KWUs). Every primitive meters its own consumption, so the same immutable ledger that proves what happened also prices it — Krim earns when validated work executes, not as a fee on assets under management." } },
    { "@type": "Question", "name": "Which markets and regulations does KrimOS support?",
      "acceptedAnswer": { "@type": "Answer", "text": "The US, UK and India, on one architecture — only the jurisdiction's rule set changes. It encodes US frameworks (FDCPA, TCPA, Reg F, FCRA, SCRA, GLBA, ECOA, CFPB), UK frameworks (FCA Consumer Duty, CONC, Consumer Credit Act, UK GDPR), and India's RBI circulars and Fair Practices Code, alongside SOC 2 Type II, ISO 27001, DPDP, GDPR and EU AI Act readiness." } },
    { "@type": "Question", "name": "Is KrimOS sovereign and where does data go?",
      "acceptedAnswer": { "@type": "Answer", "text": "KrimOS is sovereign by construction. Customer data, model weights, orchestration and telemetry stay inside the institution's perimeter with no foreign API in the loop, in one of three modes: on-prem, hybrid, or managed in a sovereign cloud region. Sovereignty is a commitment, not a deployment option." } },
    { "@type": "Question", "name": "Does KrimOS replace our existing systems?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. KrimOS sits on what you run — no rip, no replace — with 40+ connectors. Your existing core banking, LOS, voice, channel and data systems remain canonical; KrimOS reads from them and writes back on validated channels." } }
  ]
}
```

---

## 3. Entity glossary (one-sentence canonical definitions)

**Layers & surfaces**
- **Krim** — a technology research, product and services company (US · UK · India); maker of KrimOS.
- **KrimOS** — the operating system for banking and financial services (lending first), validating every action before it executes and learning from every recorded outcome; an operating system for intelligence, not static software.
- **Epistemic AI** — the category Krim defines: AI whose every action is validated before it fires and whose reasoning an auditor can read end to end.
- **Kendra** — the KrimOS intelligence runtime, realised as eight engineering modules.
- **Kriya** — the 250+ validated, credit-native action primitives (ten categories) that workers are composed from.
- **Karta** — the utility-based AI co-workers (Vox-Out, Vox-In, Doc, Risk, Decide, Cure, Audit, Report), composed from primitives, not coded.
- **Kupa** — the KrimOS command center / glass cockpit where humans supervise, configure and audit.
- **Kula** — the enterprise natural-language interface, reached in the Kupa command center, where each user meets a role-tailored digital twin that turns intent into governed, validated action.
- **Krimkar** — the KrimOS consumer app, home of the Kira advisor.
- **Kira** — the customer advisor: one relationship across the lifecycle, every channel, in the Krimkar app.

**Kendra's eight modules**
- **Krim-Core** — the orchestration engine that routes requests and runs durable workflows.
- **Krim-Karya** — the scheduler: timed and recurring tasks, deferred actions, retries, and contact-window / deadline timing.
- **Krim-Fabric** — the knowledge base of per-jurisdiction rules and the anonymised pattern library.
- **Krim-Govern** — the seven-level policy engine enforcing law and guardrails per tenant.
- **Krim-Nyāya** — the pre-execution validator: 33 validators in three Navya-Nyāya families.
- **Krim-Learn** — the learning orchestrator coordinating ten federated learning loops.
- **Krim-Ledger** — the immutable, metered record (in Krim Work Units) serving audit and billing.
- **Krim-Sense** — the telemetry module (metrics, logs, alerts, dashboards).

**Concepts**
- **Krim Work Unit (KWU)** — the unit in which every action is metered, unifying audit and usage-based billing.
- **Pramāṇa / Doṣa / Yogyatā** — the three validator families: sources of knowledge / classes of error / fitness for action.

> **GEO writing rule:** every page leads with a self-contained, answer-first claim, uses these entity names consistently, and states concrete, citable facts (33 validators, 250+ primitives, eight Kendra modules, three deployment modes, US/UK/India coverage). The **Epistemic AI** page is the deliberate category-defining play — own the definition.
