/**
 * /research — the work under the product, told simply: a hub that maps the
 * three strands of Krim's research and sends the reader to the depth they want.
 * The Navya-Nyāya lineage lives on /epistemic-ai; the world model has its own
 * page (/research/world-lending-model); validation science is told in full here.
 *
 * STANDALONE shell (SiteHeader + main z-10 + SiteFooter); the shared research
 * backdrop (the KrimOS lab) is root-mounted via ResearchBackdrop, like
 * app/page.tsx and app/krimos/page.tsx.
 *
 * HONESTY: a positioning statement of foundations and directions — it invents no
 * publications, papers, citations, named researchers, partnerships or results.
 * Every claim traces to docs/krim-content.md / docs/KRIM-BRIEF.md.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research at Krim is the work under the product: making human judgment machine-checkable (the formal logic behind the 33 validators), learning a model of how a whole lending operation behaves, and treating pre-execution validation as a discipline, proving an action before it acts rather than auditing it after.',
  alternates: { canonical: 'https://krim.ai/research' },
  openGraph: {
    title: 'Research — the work under the product',
    description:
      'Research at Krim is the work under the product: making human judgment machine-checkable (the formal logic behind the 33 validators), learning a model of how a whole lending operation behaves, and treating pre-execution validation as a discipline, proving an action before it acts rather than auditing it after.',
    url: 'https://krim.ai/research',
  },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://krim.ai/research' },
  ],
}

// The three strands of the work — each card sends the reader to the depth they want.
const STRANDS = [
  {
    n: '01',
    title: 'Judgment, made checkable',
    body: 'Turning a regulation into a check a machine can run: the formal-logic foundation behind the 33 validators that clear every action.',
    link: ['The lineage → Epistemic AI', '/epistemic-ai'] as const,
    tint: 'mint' as const,
  },
  {
    n: '02',
    title: 'A model of the operation',
    body: 'Learning how a whole lending operation behaves, from the validated outcomes the system records: a world model it can reason and plan against.',
    link: ['The direction → World Lending Model', '/research/world-lending-model'] as const,
    tint: 'cyan' as const,
  },
  {
    n: '03',
    title: 'Proof before action',
    body: 'Treating pre-execution validation as its own discipline: proving an action against law, policy, consent and context before it can fire, not explaining it after.',
    link: ['In the runtime → Kendra', '/krimos/kendra'] as const,
    tint: 'mint' as const,
  },
]

export default function ResearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main className="relative z-10">
        {/* ---- 1 · Hero — answer-first ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>Research at Krim</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                The work under the product.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                Krim is a research company first. Everything we ship is that research,{' '}
                <span className="text-mint">in production</span>.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos/kendra" variant="secondary">
                  See it in the runtime
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The three strands — a map, with doors to the depth ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The strands</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Hard questions, one body of work.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              Each strand is a research problem in its own right. Start anywhere. Each opens onto
              where it goes deeper.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STRANDS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <Link href={s.link[1]} className="group block h-full">
                  <div className="glass lume flex h-full flex-col p-7 md:p-8">
                    <span aria-hidden className={`block h-[3px] w-12 rounded-full ${s.tint === 'mint' ? 'bg-mint/70' : 'bg-cyan/70'}`} />
                    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">{s.n}</p>
                    <h3 className="mt-2 font-serif text-[1.4rem] leading-tight text-ink">{s.title}</h3>
                    <p className="mt-3 flex-1 font-sans text-body text-ink-2">{s.body}</p>
                    <p className={`mt-6 font-sans text-[14.5px] ${s.tint === 'mint' ? 'text-mint' : 'text-cyan'}`}>
                      <span className="underline-offset-4 group-hover:underline">{s.link[0]}</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 3 · Validation science — the discipline, told in full ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Validation science</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Proving before acting is the harder path. We chose it.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Most AI safety is read after the fact, a log to inspect once something has
                  happened. In regulated work that is too late: a wrongful disclosure cannot be
                  unmade, a misquoted figure cannot be unspoken. So we treat{' '}
                  <span className="text-mint">pre-execution validation</span> as its own discipline,
                  checking a proposed action against law, policy, consent and context{' '}
                  <span className="text-ink">before</span> it can fire.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.3rem,2.3vw,1.75rem)] leading-snug text-ink">
                  The aim isn’t fewer violations. It is to make the worst ones structurally
                  impossible, a research problem before it is a product one.
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Pre-execution, not post-audit
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 4 · The frontier — where the work goes next ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow tone="dim">The frontier</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  The open questions are the interesting ones.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-sans text-body-lg text-ink-2">
                  How a learned model of an operation and a formal validator compose; how a system
                  improves from its own outcomes without drifting from the rules; how proof stays fast
                  enough to sit in front of every action. This is the frontier we are building on,{' '}
                  <span className="text-ink">and the foundations under it are real today.</span>
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See the research run, end to end.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                The foundations aren’t a roadmap slide. They are a working runtime your teams can
                watch validate every action, live.
              </p>
              <div className="mt-9 flex justify-center">
                <CTA href="/krimos" variant="secondary">
                  Explore KrimOS
                </CTA>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
