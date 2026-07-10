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

## Post 8 — The World-Model Moment (PERSONAL profile — FINAL TRIMMED, gate SHIP)

AI just learned to imagine.

Last week the Beijing Academy of Artificial Intelligence released Orca: a world model that watched 125,000 hours of footage and learned to try actions in imagination before taking them in reality.

The physical world came first because it had footage.

The next worlds AI will learn are institutions.

A lending operation is a world: states, actions, consequences. But it keeps no footage. It logs every transaction and forgets every reason, every alternative, every road not taken.

So we're writing the footage. KrimOS runs lending on one ledger: every action validated before it executes, remembered with its reasoning.

And on that record we're building Kovida — the world lending model. A bank that can rehearse.

Whoever writes the memory builds the mind.

https://www.krim.ai/insights/the-world-model-moment

## Post 9 — The World-Model Moment (KRIM COMPANY page — FINAL, gate-cleared)

World models learn from millions of hours of footage. Lending has only ever logged the choice it made. No frame of the alternatives it weighed, the reasoning, or what the borrower did next.

Orca, released last week by the Beijing Academy of Artificial Intelligence, watched 125,000 hours of video and learned how a world changes state — so actions can be tested in imagination before they happen in reality.

A lending operation keeps no such record. Its systems log the transaction and discard the reasoning and the alternatives: the exact material a world model would learn from.

Creating that record takes a runtime that runs the whole lending lifecycle — that runtime is KrimOS. Earning the right to run it takes validation before every action. The safety architecture is what makes the intelligence possible.

Kovida — the world lending model, being built on the record KrimOS writes as it works. The research: https://www.krim.ai/insights/the-world-model-moment

---

## Post 10 — Your Compliance Team Is Right to Say No (PERSONAL — gate SHIP)
Image: Gemini_Generated_Image_z8vu4wz8vu4wz8vu.png (the held action)

Every AI pilot that dies in a bank dies in the same meeting.

The demo is genuinely good. The model drafts the hardship letter better than the team does. Then someone from the second line, who has been quiet, asks a question that sounds almost rude in its simplicity: before this letter goes out, how do we know it was allowed to?

The room offers three answers. None of them are answers.

The model is 99% accurate. But accuracy is not permission. A model can be right about the borrower's situation and still send a communication it had no consent to send.

We'll add a dashboard. But a dashboard reports what already left the building. A collections call cannot be recalled.

We'll add a human reviewer. That's a plan for the first hundred actions. It's a confession that you cannot do the hundred-thousandth.

Gartner expects more than 40% of agentic AI projects to be cancelled by the end of 2027, citing costs, unclear value and inadequate risk controls. Ask a banking technologist why their pilot died and you'll hear that last one, wearing different clothes.

We keep telling this story with compliance as the villain. It is exactly backwards. She is the only person in the room asking the question the future has to answer: evidence, produced before the action, that the action was permitted.

The people who kept saying no were never the problem. They were the specification.

https://www.krim.ai/insights/your-compliance-team-is-right

## Post 11 — Your Compliance Team Is Right to Say No (KRIM COMPANY — gate SHIP)

Most AI pilots in banking don't fail on capability. They fail in a meeting.

The demo works. Then someone from the second line asks how anyone will know the action was permitted, before it goes out. Accuracy doesn't answer that. A dashboard reports what already left the building. A human reviewer is a plan for the first hundred actions.

Gartner expects more than 40% of agentic AI projects to be cancelled by the end of 2027, citing costs, unclear value and inadequate risk controls.

The question compliance keeps asking is the correct one: evidence, produced before the action, that the action was permitted. Nothing in a conventional AI stack produces it.

KrimOS does. Every action checked against law, policy, consent and context before it fires, with the reasoning on the record.

https://www.krim.ai/insights/your-compliance-team-is-right

## X single (gate SHIP)

Every AI pilot that dies in a bank dies in the same meeting.

The demo works. Then compliance asks: before this goes out, how do we know it was allowed to?

Accuracy is not permission.

They were never the problem. They were the specification.

https://www.krim.ai/insights/your-compliance-team-is-right
