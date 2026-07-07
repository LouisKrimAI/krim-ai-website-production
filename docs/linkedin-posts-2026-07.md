# LinkedIn posts — founder voice, July 2026 batch

Cadence: post 1 now (consultation window urgency), post 2 three days later, then two per week.
Each post is self-contained; paste as-is, link goes in the post body.
Voice rules honoured: no em-dash chains, no "X, not Y" posturing, no invented metrics —
every number below is already published and sourced on the site.

---

## Post 1 — RBI: the window closes 24 July (post immediately)

India's central bank just quietly rewrote the rules for AI in lending, and almost nobody is talking about the hard part.

Everyone noticed the kill switch. The harder demands are in the body of the draft:

You own the risk of every model you run. Including the vendor model you never looked inside. If you can't validate it, RBI's remedy is simple: limit how much you use it.

Every material decision must be explainable. Note the word. Not the model. The decision. RBI accepts full explainability may not be achievable, and holds the bar anyway.

And the more autonomy a model has, the higher its risk tier. A major regulator has priced autonomy as risk, in writing.

RBI's own survey shows how ready the sector is: among lenders already using AI, roughly 18% kept audit logs. That's now the floor, for every bank and NBFC in India.

The consultation closes 24 July. If you lend in India, read the draft and respond to it. Ours goes in this week.

Full analysis: https://www.krim.ai/insights/rbi-model-risk-management-2026-ai-lending

## Post 2 — RBI: explain the decision (3 days later)

The most important sentence in RBI's new model risk draft is one most people read past.

The draft asks for explainability thresholds on every AI model. Then it concedes something regulators rarely concede: full explainability may not be achievable at the frontier. Billions of parameters, no human reads them.

So the bar moves somewhere more interesting. You don't have to explain the model. You have to explain the decision. Which customer, which rule, which basis, who was in control.

The model stays a black box. The decision doesn't.

That distinction is the whole game for AI in regulated lending. Interpretability research tries to open the box. Decision-level control wraps the box in checks that run before anything executes, and produces a record an examiner can actually read.

One approach is a research problem. The other is a system you can build today. It's the one we build.

https://www.krim.ai/insights/rbi-model-risk-management-2026-ai-lending

## Post 3 — The automation gap

McKinsey found 65% of organisations regularly using generative AI. Only about 5% attribute more than a tenth of their EBIT to it.

MIT's NANDA initiative put it more brutally in 2025: around 95% of enterprise gen-AI pilots delivered no measurable return.

Here's the pattern I keep seeing in lending. The pilot works. The demo is perfect. The model drafts a flawless hardship letter. And then compliance asks one question the slide deck never mentions:

Can you prove the letter was permitted to be sent? To this borrower, on this account, under today's rule, with consent on file?

Silence. Project shelved. Another line in Gartner's forecast that more than 40% of agentic AI projects will be cancelled by end of 2027.

The blocker isn't capability. It's consequence. You cannot ship an action you can only explain after it has fired.

Why the most consequential work still runs by hand: https://www.krim.ai/insights/the-automation-gap

## Post 4 — The cost of being wrong

The scariest number in US lending compliance is $500.

That's the statutory damage for one illegal call or text under the TCPA. Per touch. It rises to $1,500 where the conduct is willful. The FDCPA adds up to $1,000 per action.

Small numbers. Until you remember what automation is for.

Capital One's autodialer reached 21 million phone numbers doing exactly what it was configured to do. The TCPA settlement was $75.5 million, a record at the time. Wells Fargo's operations failures across 16 million accounts cost $3.7 billion.

Automate a defensible process and you scale safety. Automate a flawed one and you scale the violation, at $500 a touch, across millions of touches.

Every one of those dollars was assessed after the harm. The only control that changes the arithmetic is the one that sits in front of the action.

https://www.krim.ai/insights/the-cost-of-being-wrong

## Post 5 — Audit after the fact is a confession

An audit log is a record of things that already happened.

In most software that's exactly what you want. In regulated lending it quietly concedes the point: by the time the log exists, so does the action. If the action wasn't permitted, the trail doesn't protect you. It documents you.

The rulebooks keep saying this, in their own dialects. SR 11-7 expects models validated before you rely on them. The EU AI Act classifies credit scoring as high-risk and demands meaningful human oversight while there's still a decision to govern. RBI's FREE-AI report rejected black-box decisioning outright.

None of them are satisfied by a model that can be interrogated later. The requirement isn't "be explainable." It's "be governable in time."

The most honest name for an after-the-fact explanation of a non-compliant action is a confession.

https://www.krim.ai/insights/audit-after-the-fact-is-a-confession

## Post 6 — Sovereignty

There's a default architecture for enterprise AI: send the data to the model. Call the API, stream the customer record out, get an answer back.

For a regulated lender, that architecture fails the review before it starts. India requires payment data stored in India. GDPR Article 44 restricts what crosses the EU boundary. And IBM's 2025 breach report prices the downside: $4.44M average globally, $10.22M in the US, with "shadow AI" adding roughly $670K per breach.

So bring the model to the data instead, and something unexpected happens. The constraint becomes the capability. A system that lives inside the institution's walls sees the whole operation: communications, servicing, hardship, outcomes, one ledger, over time. It can learn the business as a connected whole.

Sovereignty isn't the price of the intelligence. It's the ground the intelligence grows from.

https://www.krim.ai/insights/sovereignty-is-not-optional

## Post 7 — The credit gap

The MSME finance gap in emerging markets is $5.7 trillion. 1.4 billion adults are unbanked. Even in the US, 26 million adults are credit-invisible.

The reflex is to call this a pricing problem: if we could just score thin-file borrowers, the gap would close.

But that doesn't explain why demand goes unserved even where the risk is knowable.

A loan is not a moment of approval. It's a relationship that has to be operated: onboarding, disclosures, reminders, hardship handling, collections, complaints. Every step bound by rules. For small-ticket lending, that operational load barely shrinks while revenue per account collapses.

A borrower can be creditworthy and still go unserved, because the cost of running the loan compliantly is larger than the loan.

Make safe operations cheap, and the frontier of who gets served moves.

https://www.krim.ai/insights/the-credit-gap-is-an-operations-problem

---

## Post 8 — The World-Model Moment (PERSONAL profile, gate-cleared final)

Every lending decision ever made was an experiment on a real person.

A bank approves you, prices you, restructures you, calls you — and then finds out what happens. There has never been a rehearsal.

Last week, the Beijing Academy of Artificial Intelligence released Orca, a "world foundation model." The idea: learn how a world changes state, so a system can try an action in imagination before taking it in reality.

Read that sentence again from inside a bank.

The most expensive question in lending is one no lender can answer: what would the applicant we declined have done? Every credit model on earth carries the same blind spot: it learned from the people who were approved. The declined take the answer with them.

So why doesn't a world model of lending exist? Because world models learn from footage. Orca watched 125,000 hours of it. A lending operation has none: its systems record the transaction and throw away the reasoning, the alternatives, the why.

Here is the part I find genuinely beautiful. The only way to create that footage is to run the operation itself. And the only way a regulated lender will ever let an AI system run its operation is if every action is validated before it executes.

The safety gate isn't the tax on the intelligence. It's the admission ticket.

That is Kovida — the world lending model: the rehearsal space lending has never had, being built on the one record that makes it learnable.

We don't claim to know what the applicant you declined would have done. We claim the only architecture that could ever responsibly find out.

https://www.krim.ai/insights/the-world-model-moment

## Post 9 — The World-Model Moment (KRIM COMPANY page, gate-cleared final)

There has never been a rehearsal space for lending. Every approval, every price, every collections call is tried for the first time on a real customer.

AI research is now converging on world models — systems that learn how a world changes state, so actions can be tested in imagination before they happen in reality. Orca, released last week by the Beijing Academy of Artificial Intelligence, learned its world from 125,000 hours of footage.

A lending operation has no footage. Its systems record transactions and discard the reasoning and the alternatives: the exact material a world model would learn from.

Creating that record takes a runtime that runs the whole lending lifecycle — that runtime is KrimOS. And earning the right to run it takes validation before every action. The safety architecture is what makes the intelligence possible.

Kovida — the world lending model, built on the record KrimOS writes as it works. The research: https://www.krim.ai/insights/the-world-model-moment
