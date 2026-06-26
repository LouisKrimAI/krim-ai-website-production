/**
 * /company — who Krim is: the thesis, the name, the markets.
 * STANDALONE pattern (like app/page.tsx + app/krimos/page.tsx):
 * SiteHeader + OrbBackdrop + <main className="relative z-10"> + SiteFooter,
 * metadata + BreadcrumbList JSON-LD. NOT LayerShell.
 * Content-first, calm, premium. Includes a team section (founder + founding team;
 * advisors to follow) — real, named people; keep provenance accurate.
 * No hero image, no devices. Facts: docs/krim-content.md (Global · Contact).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'
import Recognition from '@/components/home/Recognition'

export const metadata: Metadata = {
  title: 'Company',
  description:
    'Krim is a technology research, product and services company. We made proof the runtime and keep the system inside your perimeter, so machines can finally act in regulated work, and the system compounds.',
  alternates: { canonical: 'https://krim.ai/company' },
  openGraph: {
    title: 'Company — Krim',
    description:
      'Krim is a technology research, product and services company. We made proof the runtime and keep the system inside your perimeter, so machines can finally act in regulated work, and the system compounds.',
    url: 'https://krim.ai/company',
  },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Company', item: 'https://krim.ai/company' },
  ],
}

const FOUNDER = {
  name: 'Vishwa Nath Jha',
  role: 'Founder & CEO',
  bio: '16 years as an AI researcher, educator and entrepreneur. Previously founder of Saarthi.ai (2017–2025), India’s largest voice AI platform for banks and financial institutions.',
  linkedin: 'https://www.linkedin.com/in/vishwanathjha1/',
}

// Founding engineering team — name · prior / where they trained.
const TEAM = [
  { name: 'Om Mishra', note: 'Sr. FDE · GNIT', linkedin: 'https://www.linkedin.com/in/om-mishra-063101270/' },
  { name: 'Nachiketa Jha', note: 'Sr. FDE · Heidelberg', linkedin: 'https://www.linkedin.com/in/nachiketa-jha-416701220/' },
  { name: 'Nakshatra Kanchan', note: 'FDE · IIT Patna', linkedin: 'https://www.linkedin.com/in/nakshatra-kanchan/' },
  { name: 'Mohit Singh', note: 'FDE · IIT Patna', linkedin: 'https://www.linkedin.com/in/mohit-singh-bb5430253/' },
  { name: 'Devansh Jindal', note: 'FDE · IIT Patna', linkedin: 'https://www.linkedin.com/in/devansh-jindal-409a75300/' },
  { name: 'Divyansh Gupta', note: 'FDE · IIT Patna', linkedin: 'https://www.linkedin.com/in/divyanshg0319/' },
]

// Advisory board — senior banking & tech leaders (name · reference).
const ADVISORS = [
  { name: 'Deepak Maheshwari', note: 'fmr CFO, SBI Cards', linkedin: 'https://www.linkedin.com/in/deepak-maheshwari-0605b86/' },
  { name: 'R. Shyam Shyamsunder', note: 'fmr MD Investments, Temasek', linkedin: 'https://www.linkedin.com/in/shyam-shyamsunder/' },
  { name: 'Sanjay Thakur', note: 'EVP, Kotak Mahindra Bank', linkedin: 'https://www.linkedin.com/in/sanjay-thakur-a83ab111/' },
  { name: 'Rudra Mishra', note: 'fmr DGM, ICICI Bank', linkedin: 'https://www.linkedin.com/in/rudramishra/' },
  { name: 'Srinivas Gopal', note: 'fmr Spotify advisor', linkedin: 'https://www.linkedin.com/in/srinivas-gopal-710a242/' },
]

// Minimalist LinkedIn link — a small circular icon button (no headshots, no initials).
function LinkedInLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-soft text-ink-3 transition-colors hover:border-mint/40 hover:bg-mint/[0.04] hover:text-mint"
    >
      <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8h4.5v15H.25V8zM8.5 8h4.31v2.05h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.49c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V23H8.5V8z" />
      </svg>
    </a>
  )
}

export default function CompanyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>Company</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                We make AI provable enough to run a bank.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[56ch] font-sans text-body-lg text-ink-2">
                Krim is a technology research, product and services company. We make one thing:{' '}
                <span className="text-ink">KrimOS</span>, the operating system for banking and
                lending.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The thesis — the spine, one literary passage ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[820px]">
            <Reveal>
              <Eyebrow>The thesis</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <GlassCard accent className="mt-6 p-9 md:p-14">
                <p className="font-serif text-[clamp(1.5rem,3vw,2.15rem)] leading-[1.32] text-ink">
                  The institutions that move the world&rsquo;s money and serve its citizens could
                  never run on AI they couldn&rsquo;t prove, or risk what left their walls. So the
                  most consequential work stayed manual: too important to automate, too costly to
                  leave alone.
                </p>
                <p className="mt-7 font-serif text-[clamp(1.5rem,3vw,2.15rem)] leading-[1.32] text-ink-2">
                  Krim made <span className="text-mint">proof the runtime</span>, every action
                  validated before it can execute, and kept the whole system{' '}
                  <span className="text-ink">inside the perimeter</span>, where the data already
                  lives. With those two settled, the machines can finally act. And because they act
                  on a single record, the system learns the operation and{' '}
                  <span className="text-mint">compounds</span> with every action it takes.
                </p>
                <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Validated before it acts · Smarter after it acts · Never leaves your walls
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · The name ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The name</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Judgment, made checkable.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Our validator is <span className="text-ink">Krim-Nyāya</span>. It draws on{' '}
                  <span className="text-ink">Navya-Nyāya</span>, the formal-logic tradition of
                  Mithila, two thousand years of rigorous reasoning about what follows from what.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Substance, not mysticism. It gives us a precise grammar for turning a regulation
                  into a check a machine can run, and a decision into something an auditor can read.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-9 md:p-11">
                <p className="font-serif text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug text-ink">
                  A two-thousand-year discipline of formal logic, put to work as the runtime that
                  decides whether an action is allowed to happen at all.
                </p>
                <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  Navya-Nyāya · Mithila → Krim-Nyāya
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3.5 · Team — founder (bio) + Saarthi track record + founding engineering team
               + advisory board. Real, named people; affiliations as provided. ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[940px]">
            <Reveal>
              <div className="text-center">
                <Eyebrow>Team</Eyebrow>
                <h2 className="mt-4 font-serif text-display-1 text-ink">The people behind the proof.</h2>
                <p className="mx-auto mt-6 max-w-[54ch] font-sans text-body-lg text-ink-2">
                  Deep experience deploying AI in India&rsquo;s largest BFIs.
                </p>
              </div>
            </Reveal>

            {/* Founder */}
            <Reveal delay={0.08}>
              <div className="glass lume mx-auto mt-12 max-w-[660px] p-8 text-center md:p-9">
                <h3 className="font-serif text-[1.6rem] leading-none text-ink">{FOUNDER.name}</h3>
                <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  {FOUNDER.role}
                </p>
                <p className="mx-auto mt-4 max-w-[52ch] font-sans text-body text-ink-2">{FOUNDER.bio}</p>
                <div className="mt-5 flex justify-center">
                  <LinkedInLink href={FOUNDER.linkedin} name={FOUNDER.name} />
                </div>
              </div>
            </Reveal>

            {/* Founding engineering team */}
            <Reveal delay={0.16}>
              <p className="mt-14 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                Founding engineering team
              </p>
            </Reveal>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              {TEAM.map((m, i) => (
                <Reveal key={m.name} delay={0.03 * i} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]">
                  <div className="glass flex h-full flex-col items-center gap-2.5 p-5 text-center">
                    <p className="font-serif text-[1.15rem] leading-tight text-ink">{m.name}</p>
                    <p className="font-sans text-[14px] text-ink-3">{m.note}</p>
                    <LinkedInLink href={m.linkedin} name={m.name} />
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Advisory board */}
            <Reveal delay={0.2}>
              <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                Advisory board
              </p>
            </Reveal>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              {ADVISORS.map((a, i) => (
                <Reveal key={a.name} delay={0.03 * i} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]">
                  <div className="glass flex h-full flex-col items-center p-5 text-center">
                    <p className="font-serif text-[1.15rem] leading-tight text-ink">{a.name}</p>
                    <p className="mt-1 font-sans text-[14px] text-ink-3">{a.note}</p>
                    <div className="mt-3.5">
                      <LinkedInLink href={a.linkedin} name={a.name} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ---- 4 · Recognition — official marks, true-colour, precise language ---- */}
        <Section>
          <Reveal>
            <Recognition />
          </Reveal>
        </Section>

        {/* ---- 5 · Markets & contact — kept high-level; the per-jurisdiction
               detail lives on /trust, so this stays general and doesn't over-commit ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow>Markets</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Different jurisdictions, one runtime.
              </h2>
              <p className="mx-auto mt-6 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Each market&rsquo;s rules are encoded in the runtime, so the{' '}
                <span className="text-ink">same system runs in every jurisdiction</span> we serve, and
                only what it enforces changes.
              </p>
              <Reveal delay={0.1}>
                <p className="mt-6 font-sans text-body text-ink-2">
                  <Link
                    href="/trust"
                    className="text-mint underline-offset-4 transition-colors hover:underline"
                  >
                    See how the rules are encoded &rarr;
                  </Link>
                </p>
              </Reveal>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="mx-auto mt-14 max-w-[720px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See the proof for yourself.
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-sans text-body text-ink-2">
                Talk to us about a pilot, or write to{' '}
                <a
                  href="mailto:sales@krim.ai"
                  className="text-mint underline-offset-4 transition-colors hover:underline"
                >
                  sales@krim.ai
                </a>
                .
              </p>
              <div className="mt-9 flex justify-center">
                <CTA href="/krimos" variant="secondary">
                  Explore KrimOS
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
