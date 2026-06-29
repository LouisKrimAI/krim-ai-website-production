/**
 * /krimos — the hub / map. Rebuilt to docs/HOUSE-STYLE.md as the reference
 * exemplar. Its own structure (claim → the doorways in → why it holds → the
 * studios → impacts → close), the homepage's design DNA, marketing-grade copy.
 * The Layershq render
 * (public/images/krimos/layers.png) is the hero visual; hand-built SVG "devices"
 * are gone — real image or clean glass+type only (HOUSE-STYLE §7).
 * Facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PlatformBackdrop from '@/components/PlatformBackdrop'
import Reveal from '@/components/Reveal'
import PlatformLayers from '@/components/home/PlatformLayers'
import { LAYERS } from '@/components/krimos/layers'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'KrimOS',
  description:
    'KrimOS is one operating system for banking & financial services: the runtime that validates and learns (Kendra), a vocabulary of validated actions (Kriya), the co-workers built from it (Karta), the command center your teams run them from (Kupa), and two ways in, Kula for your teams and Kira for your customers.',
  alternates: { canonical: 'https://krim.ai/krimos' },
  openGraph: {
    title: 'KrimOS — the operating system for banking and lending',
    description:
      'KrimOS is one operating system for banking & financial services: the runtime that validates and learns (Kendra), a vocabulary of validated actions (Kriya), the co-workers built from it (Karta), the command center your teams run them from (Kupa), and two ways in, Kula for your teams and Kira for your customers.',
    url: 'https://krim.ai/krimos',
  },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/krimos' },
  ],
}

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KrimOS',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Operating system for banking & financial services',
  operatingSystem: 'Sovereign on-prem, Hybrid, Managed SaaS',
  publisher: { '@type': 'Organization', name: 'Krim', url: 'https://krim.ai' },
  description:
    'KrimOS is the operating system for banking & financial services: AI co-workers whose every action is validated before it executes, and that learn from everything they do, inside the institution’s own perimeter.',
  featureList: [
    'Pre-execution validation: Krim-Nyāya, 33 validators',
    '500+ validated, credit-native action primitives (Kriya, 20+ domains)',
    'AI co-workers (Karta) that run the lending operation across the contact centre and back office, composed from validated primitives',
    'One runtime that validates every action and learns from every outcome (Kendra)',
    'Natural-language interface for teams (Kula) and a customer advisor (Kira)',
    'Immutable, metered audit trail (Krim-Ledger, Krim Work Units)',
    'Sovereign deployment: on-prem, hybrid or managed',
    '40+ connectors; nothing to tear out, nothing to migrate',
    'No-code studios: Agent Studio, Strategy Studio, Kriya Studio, Campaign Builder, Social Studio',
  ],
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: 'https://krim.ai/krimos' },
}

// The no-code studios your team builds and runs KrimOS from. Grounded in the
// capability map (Agent / Strategy / Kriya studios, Campaign Builder, the
// Social content studio). Generalised for a global audience — no vendor names.
type Studio = { name: string; tag: string; body: string; href?: string; link?: string }
const STUDIOS: Studio[] = [
  { name: 'Agent Studio', tag: 'Co-workers', body: 'Compose a co-worker and tune it: its persona, its voice, even a video avatar, its workflow, its skills, and how far it can act on its own.', href: '/krimos/karta', link: 'See the co-workers' },
  { name: 'Strategy Studio', tag: 'Decision logic', body: 'Write the rules for origination, collections and segments on a visual canvas, and A/B test them in controlled cohorts before they go live.' },
  { name: 'Kriya Studio', tag: 'Action library', body: 'Browse the 500+ validated, credit-native actions your co-workers are built from, organised by domain.', href: '/krimos/kriya', link: 'See the vocabulary' },
  { name: 'Campaign Builder', tag: 'Campaigns', body: 'Design multi-channel campaigns across voice, chat and messaging, every contact kept inside consent and contact-window rules.' },
  { name: 'Social Studio', tag: 'Marketing content', body: 'Generate compliant marketing content — text, image and video — from your own data and brand, ready to review and publish.' },
]

export default function PlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      <SiteHeader />
      <PlatformBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero: the claim + the architecture, seen whole ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[1000px] text-center">
            <Reveal>
              <p className="font-mono text-[clamp(15px,1.7vw,18px)] uppercase tracking-[0.34em] text-mint">
                KrimOS
              </p>
              <h1 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4.1rem)] leading-[1.05] tracking-[-0.018em] text-ink">
                Run banking and lending end to end,{' '}
                <span className="text-mint">proven at every step</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
                AI co-workers do the work; every action is validated before it executes, and the
                system gets sharper from every outcome it records, all inside your own perimeter.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos/kendra" variant="secondary">
                  See how it validates
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Inside KrimOS — the stack, all layers shown, then the doorways ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Inside KrimOS</Eyebrow>
            <h2 className="mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
              One system for your whole operation.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Most AI is a model with a thin interface bolted on. KrimOS runs deeper: a runtime under
              every action a co-worker takes, up to the advisor your customers meet. That depth is
              what lets it <span className="text-mint">run regulated work</span>, where a wrong move
              is a compliance event.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 flex justify-center">
              <PlatformLayers />
            </div>
          </Reveal>

          {/* The six doorways — refined glass cells, one per layer */}
          <Reveal>
            <div className="mt-16 border-t border-soft pt-12">
              <Eyebrow tone="mint">Go deeper, layer by layer</Eyebrow>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {LAYERS.map((l) => {
                  const label = l.name
                  return (
                    <Link
                      key={l.slug}
                      href={`/krimos/${l.slug}`}
                      aria-label={`${label} — ${l.tag}`}
                      className="group lume relative flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-white/10 bg-[rgba(10,12,18,0.72)] p-5 outline-none backdrop-blur-xl transition-colors focus-visible:border-mint focus-visible:shadow-[0_0_0_2px_rgba(0,255,178,0.55),0_14px_64px_-14px_rgba(0,255,178,0.32)] md:px-6"
                    >
                      {/* signature: a mint rail that grows from the left edge on hover/focus */}
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-mint transition-transform duration-[var(--dur)] ease-[cubic-bezier(0.16,1,0.30,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">{l.tag}</span>
                      <h3 className="mt-1.5 font-serif text-[1.5rem] leading-tight tracking-[-0.01em] text-ink transition-colors duration-fast group-hover:text-mint-bright">
                        {label}
                      </h3>
                    </Link>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---- 3 · Why it holds together (the two powers) ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Why it holds together</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Validated before it acts. Sharper after.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Nothing runs until it has cleared the gate. Everything that runs makes the next
                  decision sharper. Safety and intelligence aren&rsquo;t traded off here. Each is
                  what makes the other possible.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.85rem)] leading-snug text-ink">
                  That is why one operating system beats a stack of disconnected tools, and why it
                  gets better the longer it runs.
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Krim-Nyāya validates · Krim-Learn compounds
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 4 · Studios — the no-code surfaces your team builds and runs on ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="mint">Studios</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Build, tune and run it. <span className="text-mint">No code.</span>
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Your team composes co-workers, writes the rules and ships content from a set of no-code
              studios, each one wired into the same validated runtime, so everything they build is
              accountable from its first action.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {STUDIOS.map((s, i) => {
              const inner = (
                <>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className={`font-serif text-[1.4rem] leading-tight text-ink${s.href ? ' transition-colors group-hover:text-mint' : ''}`}>
                      {s.name}
                    </h3>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-mint/85">
                      {s.tag}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{s.body}</p>
                  {s.href && (
                    <span className="mt-5 inline-flex items-baseline gap-2 font-sans text-[14.5px] text-mint">
                      <span className="underline-offset-4 group-hover:underline">{s.link}</span>
                      <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
                    </span>
                  )}
                </>
              )
              return (
                <Reveal key={s.name} delay={(i % 2) * 0.08}>
                  {s.href ? (
                    <Link
                      href={s.href}
                      className="glass lume group flex h-full flex-col p-7 outline-none focus-visible:border-mint md:p-8"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="glass lume flex h-full flex-col p-7 md:p-8">{inner}</div>
                  )}
                </Reveal>
              )
            })}
          </div>

        </Section>

        {/* ---- 5 · Impacts to your business — lending-focused; government is the one extension ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Impacts to your business</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              What changes when machines can finally act.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              The work you kept manual out of caution starts running, costs fall as the system
              learns, and good service reaches more people.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              [
                'Automate the work you couldn’t risk before',
                'The highest-consequence operations, kept manual because one mistake is a compliance event, can finally run on AI, because every action is proven before it fires.',
              ],
              [
                'Compliance is built into how the work runs',
                'Validation moves in front of the action and the evidence is complete by construction, so audits and inspections are answered from a record that is already there.',
              ],
              [
                'Cost-to-serve falls as the system learns',
                'Every validated outcome makes the next one sharper. The same team handles more, and the operation gets more efficient the longer it runs.',
              ],
              [
                'Serve more people, to the same standard',
                'Lower the cost and risk of running operations at scale and good service reaches further: more customers, more cases, the same accountable bar.',
              ],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 0.08}>
                <div className="glass lume flex h-full flex-col p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{title}</h3>
                  <p className="mt-3 flex-1 font-sans text-body text-ink-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-[680px]">
              <div className="glass lume p-7 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">Beyond lending</p>
                <p className="mt-3 font-sans text-body text-ink-2">
                  The same engine runs public-sector work too: citizen services that clear faster, and
                  stay fully accountable.
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---- 6 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                Lending,{' '}
                <span className="bg-gradient-to-r from-mint to-cyan bg-clip-text text-transparent">
                  transformed
                </span>
                .
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] font-sans text-body-lg text-ink-2">
                Cheaper to run, faster to serve, and a record a regulator can read on demand.
              </p>
              <div className="mt-9 flex justify-center">
                <CTA href="/lending" variant="secondary">
                  See it in lending
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
