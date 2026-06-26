/**
 * Writing — the post index. Single source of truth for the /insights grid and the
 * "Keep reading" rows on each article. Display order = newest first.
 *
 * Each post has its own page at app/insights/<slug>/page.tsx. Categories are short
 * labels (Problem / Risk / Markets / Method / Architecture). Dates are ISO,
 * spread across Jan–Jun 2026 (today is 2026-06-16), newest first.
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
    slug: 'sovereignty-is-not-optional',
    title: 'Sovereignty is not optional',
    dek: 'Regulated AI has to run inside the institution’s own perimeter. Shipping customer data to a third-party model is a non-starter on the rules and on the risk — and it is the same reason the system can ever learn the whole operation.',
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
    dek: 'Billions stay underserved not only because risk is hard to price, but because the cost and risk of operating lending at scale — compliant communications, servicing, collections — is prohibitive. Make safe operations cheap and the reachable market grows.',
    category: 'Markets',
    date: '2026-04-21',
    readingMinutes: 7,
    image: '/images/cinematic/credit-gap.webp',
  },
  {
    slug: 'the-cost-of-being-wrong',
    title: 'The cost of being wrong',
    dek: 'One non-compliant action can’t be unmade — and per-violation statutory exposure scales without limit across millions of automated touches. Post-hoc audit explains the harm after it is done. Pre-execution validation prevents it.',
    category: 'Risk',
    date: '2026-03-03',
    readingMinutes: 7,
    image: '/images/cinematic/insight-wave.jpg',
  },
  {
    slug: 'the-automation-gap',
    title: 'The automation gap',
    dek: 'AI is everywhere except where an action carries legal or financial consequence. Pilots stall at the compliance ceiling — you can’t ship what you can’t prove. The way through is to validate before acting.',
    category: 'Problem',
    date: '2026-01-28',
    readingMinutes: 6,
    image: '/images/cinematic/automation-gap.webp',
  },
]
