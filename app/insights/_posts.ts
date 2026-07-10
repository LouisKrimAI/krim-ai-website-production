/**
 * Writing — the post index. Single source of truth for the /insights grid and the
 * "Keep reading" rows on each article. Display order = newest first.
 *
 * Each post has its own page at app/insights/<slug>/page.tsx. Categories are short
 * labels (Problem / Risk / Markets / Method / Architecture). Dates are ISO, newest first.
 */

export type Post = {
  slug: string
  title: string
  dek: string
  category: 'Problem' | 'Risk' | 'Markets' | 'Method' | 'Architecture'
  date: string
  readingMinutes: number
  image: string
}

export const POSTS: Post[] = [
  {
    slug: 'the-eu-ai-act-high-risk-clock',
    title: "The EU AI Act's High-Risk Clock",
    dek: 'Credit scoring sits in the EU AI Act\u2019s high-risk tier. The obligations \u2014 data governance, logging, human oversight \u2014 are set to apply from 2 August 2026, though a pending proposal could defer that. Either way, what they ask for takes longer to build than to legislate.',
    category: 'Risk',
    date: '2026-07-11',
    readingMinutes: 6,
    image: '/images/cinematic/regulatory-clock.webp',
  },
  {
    slug: 'your-compliance-team-is-right',
    title: 'Your Compliance Team Is Right to Say No',
    dek: 'Every stalled AI pilot has the same last meeting. The engineers demo something remarkable, and compliance asks one question nobody can answer. They are not the obstacle. They are the only people asking the right question.',
    category: 'Problem',
    date: '2026-07-10',
    readingMinutes: 4,
    image: '/images/cinematic/held-action.webp',
  },
  {
    slug: 'collections-is-a-sequence-problem',
    title: 'Collections Is a Sequence Problem',
    dek: 'Nobody cures a delinquent account with a single perfect message. Cure comes from a sequence \u2014 which contact, when, on which channel, or whether to restructure \u2014 and every step is bounded by law. This is where safe automation pays first.',
    category: 'Method',
    date: '2026-07-09',
    readingMinutes: 6,
    image: '/images/cinematic/collections-sequence.webp',
  },
  {
    slug: 'explain-the-decision-not-the-model',
    title: 'Explain the Decision, Not the Model',
    dek: 'Interpretability research tries to open the black box. Regulators never asked you to. They asked you to explain the decision \u2014 which customer, which rule, which basis \u2014 and that is a problem you can actually solve.',
    category: 'Method',
    date: '2026-07-08',
    readingMinutes: 6,
    image: '/images/cinematic/explain-the-decision.webp',
  },
  {
    slug: 'what-epistemic-ai-means',
    title: 'What Epistemic AI Means',
    dek: 'Generative AI is trained to be plausible. Agentic AI is trained to act. Neither is trained to know whether an action is allowed. Epistemic AI is the missing third — and it is what regulated work has been asking for all along.',
    category: 'Architecture',
    date: '2026-07-07',
    readingMinutes: 7,
    image: '/images/cinematic/epistemic-ai.webp',
  },
  {
    slug: 'the-world-model-moment',
    title: 'The World-Model Moment',
    dek: "AI's frontier is moving from predicting the next word to predicting the next state of a world. Orca, from Beijing, is the newest arrival. It sharpens the question Krim was built around: a lending operation is a world too. Where is its record?",
    category: 'Architecture',
    date: '2026-07-06',
    readingMinutes: 7,
    image: '/images/cinematic/world-model.webp',
  },
  {
    slug: 'rbi-model-risk-management-2026-ai-lending',
    title: 'RBI Has Set the Bar for AI Lending. Almost No One Can Clear It.',
    dek: "RBI's 2026 Model Risk Management draft quietly rewrites the rules for AI in lending. Behind the headline-grabbing kill switch, it asks for something much harder: validate every model, explain every decision, and keep a human in control.",
    category: 'Risk',
    date: '2026-06-30',
    readingMinutes: 6,
    image: '/images/harness/harness-gate.webp',
  },
  {
    slug: 'sovereignty-is-not-optional',
    title: 'Sovereignty is not optional',
    dek: 'Regulated AI has to run inside the institution’s own perimeter. Shipping customer data to a third-party model is a non-starter on the rules and on the risk, and it is the same reason the system can ever learn the whole operation.',
    category: 'Architecture',
    date: '2026-06-09',
    readingMinutes: 6,
    image: '/images/cinematic/sovereignty.webp',
  },
  {
    slug: 'audit-after-the-fact-is-a-confession',
    title: 'Audit after the fact is a confession',
    dek: 'Regulators increasingly want AI decisions governed, explainable and overseen before they run. In regulated work, “explain it later” is structurally too late. The discipline that answers it is pre-execution validation.',
    category: 'Method',
    date: '2026-05-12',
    readingMinutes: 7,
    image: '/images/cinematic/audit.webp',
  },
  {
    slug: 'the-credit-gap-is-an-operations-problem',
    title: 'The credit gap is an operations problem',
    dek: 'Billions stay underserved not only because risk is hard to price, but because the cost and risk of operating lending at scale (compliant communications, servicing, collections) is prohibitive. Make safe operations cheap and the reachable market grows.',
    category: 'Markets',
    date: '2026-04-21',
    readingMinutes: 7,
    image: '/images/cinematic/credit-gap.webp',
  },
  {
    slug: 'the-cost-of-being-wrong',
    title: 'The cost of being wrong',
    dek: 'One non-compliant action can’t be unmade, and per-violation statutory exposure scales without limit across millions of automated touches. Post-hoc audit explains the harm after it is done. Pre-execution validation prevents it.',
    category: 'Risk',
    date: '2026-03-03',
    readingMinutes: 7,
    image: '/images/cinematic/insight-wave.jpg',
  },
  {
    slug: 'the-automation-gap',
    title: 'The automation gap',
    dek: 'AI is everywhere except where an action carries legal or financial consequence. Pilots stall at the compliance ceiling. You can’t ship what you can’t prove. The way through is to validate before acting.',
    category: 'Problem',
    date: '2026-01-28',
    readingMinutes: 6,
    image: '/images/cinematic/automation-gap.webp',
  },
]
