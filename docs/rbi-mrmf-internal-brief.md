# INTERNAL — Why our RBI response says what it says

**Not for submission or external sharing.** Companion to docs/rbi-mrmf-consultation-response.md.
Purpose: for each recommendation, exactly how it helps Krim, exactly who it is good for in the industry, and whether it survives the disinterested-expert test — plus the downsides and failure modes.

---

## The posture, in one paragraph

We respond as a **supporter urging the regulator to hold the line**, not as a vendor asking for favours. We never ask RBI to require our product; we ask RBI to require the *properties* our product was built to have, and we volunteer to be bound by the same obligations we propose for others. A submission asking for less regulation would be ignored; one transparently selling KrimOS would be discarded. One that strengthens the regulator's own draft, paragraph by paragraph, gets read.

**The honest core of it:** our commercial interest lives less in the *content* of these recommendations than in their *selection and emphasis*. Most of what we say, a disinterested expert would also say. What a disinterested expert would not do is put pre-execution control at the centre of the letter. We do, because it is our thesis. That is what "declared interest" means, and we declare it.

## The test we applied to every recommendation

*Would a person with no product and no stake — an academic, a supervisor, a bank CRO — independently recommend this?* Where the answer is "yes," the recommendation is industry-first and Krim benefits as a side effect. Where the answer is "yes, but with less emphasis" or "only partly," the vendor fingerprint is real, and this document says so.

## The classification, at a glance

| # | Recommendation | Helps Krim? | Good for the industry? | Disinterested-expert test |
|---|---|---|---|---|
| 1 | Standardised vendor disclosure | Indirectly, strongly — disadvantages opaque vendors; we comply by design | Yes — fixes an information asymmetry that crushes small REs | **Passes.** Classic market-failure remedy |
| 2 | Prevention-capable controls | Directly, maximally — our thesis written into regulation | Yes — irreversible actions need gates, not dashboards | **Passes on content; the emphasis is ours** |
| 3 | Decision-grade records | Directly, strongly — native to our architecture, costly to retrofit | Yes — disputes, examiners, and consumer grievance all need them | **Passes with an accent** — a neutral expert would phrase it as an outcome; "by construction" is our phrasing, chosen deliberately |
| 4 | Action-level override | Modestly — Kupa is this | Yes — removes the operator's all-or-nothing dilemma | **Passes cleanly** |
| 5 | Sequenced implementation | Only indirectly — and it costs us near-term | Yes — RBI's own survey shows the cliff | **Passes** — industry bodies would ask for it themselves (minus our firm end date) |
| 6 | Broad model definition | Directly — a larger governed surface is a larger market | **Split** — good for the system and consumers; burdensome for small REs | **Contested** — systemic-risk experts say yes; SME-lender advocates would push back |

---

## Recommendation by recommendation

### 1 · Standardise the vendor disclosure the draft already requires

**How it helps Krim.** Closed foundation-model vendors and API resellers structurally cannot meet deep disclosure; KrimOS is validatable by design. A common schema converts our architecture from a differentiator we must argue for into a procurement requirement buyers must ask about. Volunteering to be bound costs us nothing and buys the whole letter credibility.

**Why it is genuinely good for the industry.** Paragraph 48 makes documentation a matter of bilateral negotiation. SBI can extract real artefacts from any vendor; a base-layer NBFC cannot. That is a textbook information asymmetry, and standardisation is the textbook remedy (the same logic as SOC 2 or the EBA's outsourcing registers). The direct beneficiaries are the *smallest* regulated entities — the ones with obligations under para 46 and no leverage to discharge them.

**Disinterested-expert test: passes.** An academic in financial regulation would recommend this with no prompting.

**Downsides / failure modes.** A weak schema becomes checkbox compliance and could even *help* opaque vendors ("we filled in the template"). RBI may see schema-writing as beneath principles-level guidance and route it to an SRO, where it dies in committee. And a standard weaker than our own disclosure practice levels the field against us. Net: asymmetric in our favour; worst case is being ignored.

### 2 · Prevention-capable controls for high-autonomy AI

**How it helps Krim.** Maximally and directly: this is the founding thesis as regulatory language. If the final Guidance says controls for high-autonomy models must be able to stop a non-compliant action before execution, the market's compliance question changes from "do you have monitoring?" to "can you gate the action?" — the question KrimOS exists to answer. This is the single highest-value sentence we could get into the final text, and internally we should be honest that we would pay to have it adopted.

**Why it is genuinely good for the industry.** A lending action cannot be unmade; monitoring observes harm, only a gate prevents it. This is mainstream AI-safety architecture — action-gating before consequential effects is in every serious framework (EU AI Act Article 14's oversight-in-time, NIST AI RMF's govern-before-deploy posture). And the draft itself already lists "verify and corroborate model outputs prior to their use" (para 54(1)(ii)); we are asking RBI to promote its own clause. One subtlety that keeps the ask honest: a manual maker-checker queue *is* prevention-capable. Banks already satisfy this at low volume; the requirement only forces automated gating at automation volume. Nobody is forced to buy anything — they are forced to *choose* between human-speed operations and a real gate.

**Disinterested-expert test: passes on content, not on emphasis.** A neutral expert would make this point once, in the middle of a list. We built the letter's centrepiece out of it. That emphasis is the vendor fingerprint, mitigated by the "property, not a product" line — not eliminated.

**Downsides / failure modes.** (a) **The backfire scenario, and it is real:** if prevention-capability makes high-autonomy AI look expensive, the rational bank response is to avoid high-autonomy deployments entirely — keeping humans in the loop and shrinking the near-term market for autonomous systems, including ours. We accept this risk because autonomy's economics are coming regardless; the question is whether it arrives regulated-and-permitted or informally tolerated until the first scandal. Krim wins in the first world and so does the industry. (b) Scope misreading: the draft governs *models*; our lens is *actions*. We scoped to "higher autonomy tiers" so it cannot be read as demanding pre-execution gates on credit scorecards — but this remains the recommendation most likely to be misread. (c) Vague adoption ("entities should consider preventive controls") lets incumbent four-eyes processes claim compliance and changes nothing.

### 3 · Decision-grade records, produced by construction

**How it helps Krim.** Deterministic per-action records are what Krim-Nyāya produces natively; retrofitting them onto a conventional stack is expensive. The property is the product, same as recommendation 2.

**Why it is genuinely good for the industry.** Three constituencies need these records and currently don't get them: examiners (para 63 asks for review of interventions, overrides, incidents, near misses — impossible from reconstructed logs), REs themselves in disputes (reconstructed logs degrade exactly when litigation starts), and — the strongest link — **consumers**: para 25 requires grievance redressal for consumer-facing models, and a consumer cannot meaningfully challenge an AI-influenced decision unless a record exists of what the decision was checked against. Decision-grade records are the difference between grievance redressal as a right and as a gesture.

**Disinterested-expert test: passes with an accent.** A neutral records expert would specify the *outcome* — contemporaneous, complete, tamper-evident, at action level. Our phrase "produced by construction" points at an *architecture* — ours. We chose the stronger phrasing deliberately; the neutral alternative existed and this document records that we didn't use it.

**Downsides / failure modes.** Genuinely burdensome for legacy incumbents; expect lobbying to soften it to "adequate records" (which changes nothing). "By construction" may read as architecture-prescription, which regulators resist. Storage and privacy interactions (per-action records × ten years × millions of actions) are real; if probed, the honest answer is that storage is cheap relative to disputes — have it ready.

### 4 · Action-level override, distinct from the kill switch

**How it helps Krim.** Modestly. Kupa, the command centre, is action-level supervision — but this is the least commercially loaded ask in the letter.

**Why it is genuinely good for the industry.** Without action-level intervention, an operator facing a misbehaving system has two buttons: "let it run" and "shut down everything." History across industries says nobody presses the second button until after the harm — the cost of a full stop is too visible, the cost of continuing too diffuse. Action-granularity gives supervisors a scalpel, which protects the bank's operators as much as its customers. It also makes para 60's human-in-command real rather than ceremonial.

**Disinterested-expert test: passes cleanly.** This is control-engineering orthodoxy applied to AI operations.

**Downsides / failure modes.** Risk of being misread as requiring human review of *every* action — which would kill automation economics for everyone, us included. The text asks for the *capability* to intervene, not mandatory per-action review; summaries may blur that. Mild tooling-cost pushback expected.

### 5 · Sequenced implementation with a firm end date

**How it helps Krim.** Indirectly at best — and in the near term it *costs* us: a slower forcing function means slower regulation-driven demand. The gains are credibility (the one recommendation that visibly runs against our interest) and a live market: our future customers survive the transition instead of freezing AI adoption or drowning in paper compliance. We deliberately spend advantage here to make recommendations 1–4 credible.

**Why it is genuinely good for the industry.** RBI's own survey evidence (≈15% interpretability tooling, ≈18% audit logs, ≈21% drift monitoring, ≈⅓ board oversight among AI-using lenders) says the sector cannot comply on day one. An impossible cliff produces fake compliance and blanket forbearance — worse for everyone than a sequenced ramp. The industry's own associations will ask for phasing; the part they won't ask for is our firm end date, which is what keeps the phasing from becoming indefinite delay.

**Disinterested-expert test: passes.** Any implementation economist would say the same.

**Downsides / failure modes.** "Proportionate to entity size" is exactly the clause lobbies stretch forever. Our hedge is the firm end date; **if RBI adopts the phasing without the end date, we will have argued for the indefinite postponement of our own market** — the single biggest strategic risk in the letter. And the cynical reading (vendor recommends a timeline matching its own go-to-market) is true and unanswerable; the recommendation stands on RBI's own survey data anyway.

### 6 · Keep the broad definition of "model"

**How it helps Krim.** Directly: the broad definition (para 7(3) — anything that takes inputs, applies logic, and materially shapes decisions, down to the pricing spreadsheet) means more of the lending stack needs governance, which means a larger addressable problem for a governance-layer company. Of the six, this is the recommendation where our interest and the burden on parts of the industry pull hardest in opposite directions, so it deserves the most internal honesty.

**Why it is genuinely good — and for whom.** For the *system* and for *consumers*, unambiguously: perimeter-follows-function is the only anti-arbitrage definition, and a narrow one would be obsolete before publication (yesterday's spreadsheet is tomorrow's agent tool). For the *industry*, it is genuinely mixed: large banks can absorb the inventory burden; a base-layer NBFC discovering that a thousand spreadsheets are now regulated models cannot. A disinterested SME-lending advocate would oppose us here, and would not be crazy.

**Disinterested-expert test: contested — the only one of the six.** Systemic-risk experts side with us; small-lender advocates don't. Our answer to the tension is the *pairing*: recommendation 6 keeps the bar high, recommendation 5 spreads the runway. The two must survive together — the broad definition without sequencing is genuinely harsh, and we should not pretend otherwise internally.

**Downsides / failure modes.** Inventory-burden blowback lands on the constituency least able to complain effectively. "We anticipate pressure… urge RBI to resist" presumes other respondents' positions — mildly combative, accepted deliberately.

---

## What we consciously did NOT say

- **Nothing on data risk, privacy, or model-input governance** — real topics, not our lane; opining would dilute authority.
- **No comment on red-teaming standards (para 55) or customer AI-disclosure (para 59)** — supportable, but padding; six sharp recommendations beat nine soft ones.
- **No claims of deployments, customers, or India operations** — none exist to claim; the claim floor holds here especially.
- **No request for vendor recognition or certification** — commercially tempting, and the classic regulatory-capture ask; it would poison the well.
- **"Safe superintelligence" does not appear** — brand language that reads as science fiction to a model-risk supervisor. The letter says "safe autonomous systems for regulated financial work." Same substance, supervisory register.
- **We kept "produced by construction" over the neutral "contemporaneous and complete"** — a deliberate choice, recorded above.

## Primary-source verification — completed 6 July 2026

The letter was checked line-by-line against the actual draft ("RBI draft guide.pdf", 16 pages, paragraphs 1–64), then independently gate-checked. Results: every characterisation and verbatim quote confirmed; recommendation 1 was narrowed (paras 47–48 already contained half the original ask); recommendation 2 was re-anchored on para 54(1)(ii)'s own "prior to their use" clause; four citation-precision fixes applied (para 51 lists limiting usage as an example mitigant, not a mandate; para 54(2) permits "system-level controls **or model design features**"; the FREE-AI report is not this Guidance's formal parent — the draft anchors to Utkarsh 2029; paras 9–13 cover governance broadly, not the Board alone).

## Pre-submission checklist

1. ☑ Primary-source check — done 6 July 2026; recommendations 1 and 2 revised as a result.
2. ☐ Confirm the FREE-AI survey figures (15/18/21/~⅓) against the FREE-AI Committee report itself.
3. ☐ Confirm press-release number and dates against the published release (the draft PDF header uses placeholders).
4. ☐ Fill: signatory name, title, email (personal or hello@, not sales@); legal entity line; date.
5. ☐ Confirm the submission channel and format; send; retain the acknowledgement.
6. ☐ Then: publish the response on the site, and LinkedIn post 1 goes live ("Ours goes in this week" must already be true).
