/**
 * /services — engagement: pilot to go-live. STANDALONE page (not LayerShell),
 * built on the homepage/krimos design DNA: SiteHeader + Reveal,
 * calm glass + type, no devices, no hero image.
 * Shape: hero (pilot → go-live in a quarter) → the path (three stages as glass
 * cards, each with what happens + a clear exit) → what Krim brings → expansion
 * (the system compounding) → CTA.
 * Facts: docs/krim-content.md (Engagement — pilot to scale, lines 298–303;
 * the learning curve, 206/271). Invents nothing beyond the docs.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'From technical deep-dive to production go-live in a quarter: a scoped pilot, proof of value on ring-fenced data measured against your own baseline, then a contracted go-live, one stage at a time.',
  alternates: { canonical: 'https://www.krim.ai/services' },
  openGraph: {
    title: 'Services — pilot to go-live',
    description:
      'From technical deep-dive to production go-live in a quarter: a scoped pilot, proof of value on ring-fenced data measured against your own baseline, then a contracted go-live, one stage at a time.',
    url: 'https://www.krim.ai/services',
  },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.krim.ai/services' },
  ],
}

// The three stages — verbatim facts from docs/krim-content.md (Engagement).
const STAGES = [
  {
    no: '01',
    span: '2 weeks',
    title: 'Technical deep-dive',
    body: 'Our engineers sit with yours for an architecture, security and integration review: how KrimOS reads from and writes to the systems you already run, inside your perimeter.',
    exit: 'A scoped pilot and a signed data-handling envelope.',
  },
  {
    no: '02',
    span: '30 days',
    title: 'Proof of value',
    body: 'One workflow, usually collections or servicing, runs on synthetic or ring-fenced data. Real co-workers, real validation, no exposure to live records until you are ready.',
    exit: 'Measured outcomes against your own baseline.',
  },
  {
    no: '03',
    span: '60–90 days',
    title: 'Pilot to go-live',
    body: 'The proven workflow moves into production with full audit and governance live: every action validated before it executes, every outcome recorded in the ledger.',
    exit: 'A contracted go-live and an expansion roadmap.',
  },
] as const

// What Krim brings — the approach that makes a quarter realistic. Kept to what we
// can stand behind: no hard exit guarantees, no absolutes on integration.
const BRINGS = [
  {
    title: 'Built to fit your stack',
    body: 'KrimOS reads from the systems you already run and writes back on validated channels. Its 40+ connectors mean the deep-dive scopes how it fits onto your stack.',
  },
  {
    title: 'Proof on your own data',
    body: 'The proof of value runs on ring-fenced data and is measured against your own baseline, in your numbers rather than a generic case study.',
  },
  {
    title: 'A clear deliverable at each stage',
    body: 'Each stage ends in something concrete you sign off before the next begins, so you decide what comes next.',
  },
  {
    title: 'Audit and governance from day one',
    body: 'The validation gate and the immutable ledger are live from the pilot, not added at go-live.',
  },
] as const

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main className="relative z-10">
        {/* ---- 1 · Hero — the promise: proof on your own data, in a quarter ---- */}
        <Section className="!pt-24 !pb-24 min-h-[85vh] flex items-center [&>div]:w-full">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>From pilot to scale</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                <span className="text-grad-carved">Prove it</span> on your own data first.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                See it work on <span className="text-ink">your own data</span>, measured against your
                own baseline, and go live only once the proof is in.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos" variant="secondary">
                  See KrimOS
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The path — three stages as glass cards, each with an exit ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The path</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Three stages, each one earned before the next.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              No big-bang rollout, no leap of faith. Prove the architecture, then the value, then run
              it in production, one stage at a time.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STAGES.map((s, i) => (
              <Reveal key={s.no} delay={i * 0.1}>
                <div className="glass lume flex h-full flex-col p-7 md:p-8">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[13px] tracking-[0.16em] text-mint">{s.no}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                      {s.span}
                    </span>
                  </div>
                  <span aria-hidden className="mt-5 block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{s.body}</p>
                  <div className="mt-7 border-t border-soft pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Exit</p>
                    <p className="mt-2 font-sans text-[14px] leading-relaxed text-ink">{s.exit}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 3 · What Krim brings — the approach that makes a quarter real ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>What Krim brings</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Why a quarter is enough, and a leap of faith is not.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              A quarter is realistic because the hard parts (fitting your stack, governing every
              action, proving the numbers) are how we work from the first week, not promises kept
              for later.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {BRINGS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.1}>
                <div className="glass lume h-full p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{b.title}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · Expansion — after go-live, the system compounds ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>After go-live</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Go-live is the first workflow, not the last.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Expansion goes domain by domain, workflow by workflow, the{' '}
                  <span className="text-ink">same runtime, the same audit trail, the same governance</span>{' '}
                  carrying across. Every new co-worker inherits what the last one proved, and the
                  ledger that records them keeps making the next decision sharper.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.85rem)] leading-snug text-ink">
                  More co-workers, more of the lifecycle, and a system that is materially better than
                  go-live by year two.
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  The longer it runs, the better it gets
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · Close / CTA ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                Start with the proof.
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-sans text-body text-ink-2">
                See KrimOS run on your own data, and a clear path from pilot to go-live.
              </p>
              <div className="mt-9 flex justify-center">
                <CTA href="/trust" variant="secondary">
                  How it deploys
                </CTA>
              </div>
            </GlassCard>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
