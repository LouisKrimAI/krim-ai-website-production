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
  /** Share-card override for og:image/twitter:image. Only needed when `image`
   *  is a transparent asset (designed to float on the dark canvas) — a
   *  transparent PNG/WebP renders on WHITE in WhatsApp/iMessage/Slack link
   *  previews, since they flatten alpha themselves. In that case, point this
   *  at a flattened copy with the site's --bg (#09090C) baked in, generated
   *  alongside the original (see e.g. harness-gate-share.webp). Leave unset
   *  when `image` is already fully opaque. */
  ogImage?: string
}

export const POSTS: Post[] = [
  {
    slug: 'lending-ai-compounds',
    title: 'Lending AI Compounds. So Does Waiting.',
    dek: 'The case for moving on lending automation is not that the technology is ready. It is that the advantage it creates is cumulative \u2014 a model tuning on your own outcomes, workflows earning autonomy, a record that is audit-ready by construction \u2014 and none of it starts accruing until you start.',
    category: 'Markets',
    date: '2026-09-18',
    readingMinutes: 6,
    image: '/images/cinematic/insight-wave.webp',
  },
  {
    slug: 'meaningful-human-oversight',
    title: 'Meaningful Human Oversight, Meant Literally',
    dek: 'Every serious AI regime in lending requires meaningful human oversight. Most deployments satisfy it with a person at the end of a conveyor belt, approving what the machine already decided. The regulators wrote a stronger word than that, and building for the stronger reading is cheaper than being caught on the weaker one.',
    category: 'Problem',
    date: '2026-09-15',
    readingMinutes: 5,
    image: '/images/harness/harness-control-room.webp',
  },
  {
    slug: 'the-autonomy-dial',
    title: 'The Autonomy Dial',
    dek: 'The question is never whether you trust AI with your loan book. It is how much, for which workflow, on what evidence. Autonomy that arrives as an on/off decision will always be answered off \u2014 which is why it has to be a setting a workflow earns, one measured outcome at a time.',
    category: 'Method',
    date: '2026-09-13',
    readingMinutes: 6,
    image: '/images/cinematic/held-action.webp',
  },
  {
    slug: 'the-credit-gap-is-an-operations-problem',
    title: 'The credit gap is an operations problem',
    dek: 'Billions stay underserved not only because risk is hard to price, but because the cost and risk of operating lending at scale (compliant communications, servicing, collections) is prohibitive. Make safe operations cheap and the reachable market grows.',
    category: 'Markets',
    date: '2026-09-10',
    readingMinutes: 7,
    image: '/images/cinematic/credit-gap.webp',
  },
  {
    slug: 'five-questions-for-your-automation-vendor',
    title: 'Five Questions for Your Automation Vendor',
    dek: 'Demos are designed to be impressive. Diligence is designed to be boring. Five questions separate a system a regulated lender can adopt from one that will stall in the risk committee \u2014 and the weak answers are more revealing than the strong ones.',
    category: 'Risk',
    date: '2026-09-05',
    readingMinutes: 5,
    image: '/images/harness/harness-command.webp',
  },
  {
    slug: 'anatomy-of-a-validated-action',
    title: 'Anatomy of a Validated Action',
    dek: 'Pre-execution validation is easy to say and hard to picture. So here is one ordinary action \u2014 an outbound call to a borrower in arrears \u2014 walked from intent to dial tone, through every check that stands between the two, and the record that exists on the other side.',
    category: 'Method',
    date: '2026-09-04',
    readingMinutes: 6,
    image: '/images/harness/harness-gate.webp',
    ogImage: '/images/harness/harness-gate-share.webp',
  },
  {
    slug: 'the-cost-of-being-wrong',
    title: 'The cost of being wrong',
    dek: 'One non-compliant action can’t be unmade, and per-violation statutory exposure scales without limit across millions of automated touches. Post-hoc audit explains the harm after it is done. Pre-execution validation prevents it.',
    category: 'Risk',
    date: '2026-09-02',
    readingMinutes: 7,
    image: '/images/cinematic/insight-wave.webp',
  },
  {
    slug: 'the-automation-gap',
    title: 'The automation gap',
    dek: 'AI is everywhere except where an action carries legal or financial consequence. Pilots stall at the compliance ceiling. You can’t ship what you can’t prove. The way through is to validate before acting.',
    category: 'Problem',
    date: '2026-08-28',
    readingMinutes: 6,
    image: '/images/cinematic/automation-gap.webp',
  },
  {
    slug: 'the-model-nobody-can-validate',
    title: 'The Model Nobody Can Validate',
    dek: 'RBI\u2019s draft model-risk Guidance requires independent validation of every model a lender relies on, whatever the vendor says. The model Indian lending relies on most, the credit bureau score, cannot be validated by anyone who uses it. That is not a drafting slip. It is a structural gap, and RBI is uniquely placed to close it.',
    category: 'Risk',
    date: '2026-08-25',
    readingMinutes: 6,
    image: '/images/harness/harness-core.webp',
    ogImage: '/images/harness/harness-core-share.webp',
  },
  {
    slug: 'the-agent-isnt-the-hard-part',
    title: "The Agent Isn't the Hard Part",
    dek: 'Every AI agent demo wows the room, then dies in the risk committee. The reason is never the model. It is that no one can prove what the agent will do before it acts. The harness is the control layer that changes that answer, and it is what makes an agent hireable.',
    category: 'Method',
    date: '2026-08-19',
    readingMinutes: 5,
    image: '/images/harness/harness-agent.webp',
  },
  {
    slug: 'the-model-that-learns-the-whole-operation',
    title: 'The Model That Learns the Whole Operation',
    dek: 'Your lending stack is a pile of models that each see one slice. Origination forgets the loan the moment it funds; collections starts cold. Locally smart, globally blind — so the intelligence your operation should build never forms. A world model is the architecture where it does.',
    category: 'Architecture',
    date: '2026-08-12',
    readingMinutes: 6,
    image: '/images/cinematic/architecture-lattice.webp',
  },
  {
    slug: 'audit-after-the-fact-is-a-confession',
    title: 'Audit after the fact is a confession',
    dek: 'Regulators increasingly want AI decisions governed, explainable and overseen before they run. In regulated work, “explain it later” is structurally too late. The discipline that answers it is pre-execution validation.',
    category: 'Method',
    date: '2026-08-05',
    readingMinutes: 7,
    image: '/images/cinematic/audit.webp',
  },
  {
    slug: 'collections-is-a-sequence-problem',
    title: 'Collections Is a Sequence Problem',
    dek: 'Nobody cures a delinquent account with a single perfect message. Cure comes from a sequence \u2014 which contact, when, on which channel, or whether to restructure \u2014 and every step is bounded by law. This is where safe automation pays first.',
    category: 'Method',
    date: '2026-07-29',
    readingMinutes: 6,
    image: '/images/cinematic/collections-sequence.webp',
  },
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
    ogImage: '/images/harness/harness-gate-share.webp',
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
]
