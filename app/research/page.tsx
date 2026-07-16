/**
 * /research — the research hub.
 * Structure: hero → validation science thesis → animated spine cards → close.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import ResearchSpine from '@/components/research/ResearchSpine'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research at Krim is the work under the product: making human judgment machine-checkable, learning a model of how a whole lending operation behaves, and treating pre-execution validation as a discipline — proving an action before it acts rather than auditing it after.',
  alternates: { canonical: 'https://www.krim.ai/research' },
  openGraph: {
    title: 'Research — the work under the product',
    description:
      'Making human judgment machine-checkable, learning a model of how lending behaves, treating pre-execution validation as its own discipline. Research at Krim is the work under the product.',
    url: 'https://www.krim.ai/research',
  },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://www.krim.ai/research' },
  ],
}

export default function ResearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main className="relative z-10">

        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Research at Krim</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                The <span className="text-grad-carved">work</span> under the product.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[50ch] font-sans text-body-lg text-ink-2">
                Krim is a Safe Superintelligence research company. Everything we
                ship is that research,{' '}
                <span className="text-mint">in production</span>.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos/kendra" variant="secondary">See it in the runtime</CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Validation science — the thesis ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Validation science</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Proving before acting is the harder path. We chose it.
                </h2>
                <p className="mt-7 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Most AI safety is read after the fact — a log to inspect once something
                  has happened. In regulated work, that is too late: a wrongful disclosure
                  cannot be unmade, a misquoted figure cannot be unspoken.
                </p>
                <p className="mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                  So we treat{' '}
                  <span className="text-mint">pre-execution validation</span> as its
                  own discipline — checking a proposed action against law, policy,
                  consent and context{' '}
                  <span className="text-ink">before</span> it can fire. The aim is not
                  fewer violations. It is to make the worst ones{' '}
                  <span className="text-mint">structurally impossible</span>.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.25rem,2.2vw,1.65rem)] leading-snug text-ink">
                  "Validated before it acts" is an architectural claim, not a model
                  claim. It does not depend on the AI making the right choice.
                  It enforces that the{' '}
                  <span className="text-mint">wrong choice cannot execute</span>.
                </p>
                <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Pre-execution, not post-audit
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · The four strands — spine scroll UX ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The strands</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Hard questions, one body of work.
            </h2>
            <p className="mt-6 max-w-[54ch] font-sans text-body-lg text-ink-2">
              Each strand is a research problem in its own right.
              Start anywhere — each opens onto where it goes deeper.
            </p>
          </Reveal>

          <div className="mt-20">
            <ResearchSpine />
          </div>
        </Section>

        {/* ---- 4 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[720px] p-10 text-center md:p-14">
              <span aria-hidden className="mx-auto block h-[2px] w-12 rounded-full bg-gradient-to-r from-mint to-cyan" />
              <h2 className="mt-8 font-serif text-display-3 leading-tight text-ink">
                See the research run, end to end.
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] font-sans text-body text-ink-2">
                The foundations are not a roadmap slide. They are a working runtime
                your teams can watch validate every action, live.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos" variant="secondary">Explore KrimOS</CTA>
              </div>
            </div>
          </Reveal>
        </Section>

      </main>
      <SiteFooter />
    </>
  )
}
