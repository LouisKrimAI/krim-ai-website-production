/**
 * /platform/krimkar — Kira, the consumer surface. The warmest of the five
 * layer pages, but on the one canvas (v3): deep ground, glass panels, no
 * light-world interlude. Warmth comes from copy and spacing, not a pale
 * background. The signature is a KIRA CONVERSATION THREAD rendered as a
 * glass-mint accent artifact — chat turns as quiet glass cards, kept as
 * evidence, not chat-app cosplay: a channel switch, an auto-clarified
 * field, a turn in another language, a human handoff, each Kira reply
 * cleared by its own turn-specific gate. Server component; motion via
 * <Reveal>. Colour grammar: mint = validated/learned; gold = exceptions.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import LayerShell from '@/components/platform/LayerShell'
import { Eyebrow, PageH1, H2, Lede, Body, Section, MonoNote } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Krimkar — Kira, one relationship across the lifecycle | Krim',
  description:
    'Kira is the AI loan advisor: one thread across WhatsApp, voice, IVR, chat, email and SMS — context preserved from application to payoff, in 50+ Indian languages.',
  alternates: { canonical: 'https://krim.ai/platform/krimkar' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Platform', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Krimkar', item: 'https://krim.ai/platform/krimkar' },
  ],
}

/* ── the conversation thread, rendered as evidence ─────────────────────────
   Each turn is a fact from krim-content.md, never invented. Channel labels
   sit in mono above the borrower's words; Kira answers on a mint-edged glass
   card (validated/learned). Each outbound turn carries its own turn-specific
   clearance stamp — derived only from documented checks (consent, contact
   windows, language of disclosure, human handoff for hardship). */

type Turn = {
  who: 'kira' | 'borrower'
  channel: string // mono label — the medium this turn arrived on
  body: React.ReactNode
  gloss?: string // English gloss under a non-English line
  note?: React.ReactNode // small annotation to the side (clarify / handoff)
  cleared?: string // turn-specific validation stamp under a Kira outbound turn
  routed?: string // a handoff is routed, not cleared — gold register
}

const THREAD: Turn[] = [
  {
    who: 'borrower',
    channel: 'WhatsApp',
    body: 'Hi — I started a loan application last week but didn’t finish. Can I pick it up?',
  },
  {
    who: 'kira',
    channel: 'WhatsApp · Kira',
    body: 'Of course. I have your draft from Tuesday — we were on income. Shall we carry on from there?',
    cleared: 'consent · contact window',
  },
  {
    who: 'borrower',
    channel: 'WhatsApp',
    body: 'My income is around 60.',
    note: 'Ambiguous field — Kira clarifies in place, mid-conversation.',
  },
  {
    who: 'kira',
    channel: 'WhatsApp · Kira',
    body: '“60” — is that ₹60,000 a month, or ₹6,00,000 a year? Either is fine; I just want the field exact.',
    cleared: 'consent verified · purpose logged',
  },
  {
    who: 'borrower',
    channel: 'Voice note',
    body: '₹60,000 a month. Sorry, easier to talk than type.',
    note: 'Channel switch — voice note. The same thread; nothing repeated.',
  },
  {
    who: 'kira',
    channel: 'Voice · Kira',
    body: 'No need to apologise — ₹60,000 monthly, noted. I’ve carried everything across; you don’t start over.',
    cleared: 'consent · contact window',
  },
  {
    who: 'borrower',
    channel: 'WhatsApp',
    body: 'मुझे हिंदी में समझाइए — ब्याज कितना लगेगा?',
    gloss: 'Explain it to me in Hindi — how much interest will there be?',
    note: 'The customer’s own language — one of 50+ Indian languages Kira speaks.',
  },
  {
    who: 'kira',
    channel: 'WhatsApp · Kira',
    body: 'ज़रूर। आपकी दर और मासिक किश्त नीचे दी गई है — कोई भी हिस्सा दोबारा समझा सकती हूँ।',
    gloss: 'Certainly. Your rate and monthly instalment are below — I can re-explain any part.',
    note: 'One advisor, 50+ Indian languages — the customer’s own, mid-thread.',
    cleared: 'consent · contact window',
  },
  {
    who: 'borrower',
    channel: 'WhatsApp',
    body: 'Honestly things are tight this month. I’m worried about the first payment.',
    note: 'Hardship signal — a sensitive segment. Kira hands to a human, with context.',
  },
  {
    who: 'kira',
    channel: 'WhatsApp · Kira',
    body: 'Thank you for telling me — that matters. I’m bringing in a colleague who can look at options with you; they’ll have the whole thread, so nothing is lost.',
    routed: 'hardship → human · context attached',
  },
]

/* ── the six customer-side lifecycle moments (Kira column, verbatim sense) ── */
const LIFECYCLE: Array<{ stage: string; line: string }> = [
  { stage: 'Sourcing & onboarding', line: 'Engages, qualifies and guides the application.' },
  { stage: 'Underwriting & decision', line: 'Collects information, sets expectations.' },
  { stage: 'Disbursal', line: 'Walks the borrower through agreement & confirmation.' },
  { stage: 'Servicing', line: 'Payments, queries, statements — one advisor, always on.' },
  { stage: 'Collections & hardship', line: 'Reminders, plans, hardship handled with care.' },
  { stage: 'Closure & re-engagement', line: 'Payoff, NOC, the next product conversation.' },
]

const CHANNELS = ['WhatsApp', 'Voice', 'IVR', 'Chat', 'Email', 'SMS'] as const

/* A single turn in the thread artifact. The accent lives once on the outer
   thread container; turns are FLAT translucent fills nested inside it — no
   backdrop-filter, no shadow. Kira's fill carries a 2px mint left rule
   (validated); the borrower's words sit on a quieter white fill. */
function ThreadTurn({ turn }: { turn: Turn }) {
  const isKira = turn.who === 'kira'
  return (
    <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
      <div className={isKira ? 'md:pr-12' : 'md:pl-12'}>
        <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-rtext-3 mb-2">
          {turn.channel}
        </p>
        <div
          className={`relative px-5 py-4 max-w-[46ch] rounded-[10px] ${
            isKira ? 'bg-mint/[0.05] border-l-2 border-mint/60' : 'bg-white/[0.03]'
          }`}
        >
          <p className={`font-serif text-[1.02rem] leading-[1.55] ${isKira ? 'text-rtext' : 'text-rtext-2'}`}>
            {turn.body}
          </p>
          {turn.gloss && (
            <p className="font-sans text-[12.5px] italic leading-snug text-rtext-3 mt-2">{turn.gloss}</p>
          )}
        </div>
        {turn.cleared && (
          <p className="font-mono text-[9px] tracking-[0.1em] text-mint/80 mt-2">
            cleared: {turn.cleared}
          </p>
        )}
        {turn.routed && (
          <p className="font-mono text-[9px] tracking-[0.1em] text-amber-dark/90 mt-2">
            routed: {turn.routed}
          </p>
        )}
      </div>
      {turn.note && (
        <p className="font-sans text-[12.5px] leading-relaxed text-rtext-3 max-w-[20ch] mt-2 md:mt-7 md:row-start-1 md:col-start-2">
          {turn.note}
        </p>
      )}
    </div>
  )
}

export default function KrimkarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main>
        <LayerShell slug="krimkar">
          {/* ── 1 · the hero — the warmest opening of the five ── */}
          <Section className="md:py-28">
            <Reveal>
              <Eyebrow>The consumer surface · Kira</Eyebrow>
              <PageH1 className="max-w-[18ch]">Kira — one relationship, the whole lifecycle.</PageH1>
              <Lede className="mt-7">
                A single AI loan advisor meets the borrower wherever they already are — WhatsApp,
                voice, IVR, chat, email, SMS — and keeps one thread, context preserved from
                application to payoff. She speaks the customer’s language, clarifies what’s
                ambiguous, and knows when to bring in a human.
              </Lede>
            </Reveal>
          </Section>

          {/* ── 2 · the signature — a Kira conversation, rendered as evidence ── */}
          <Section hairline className="md:py-24">
            <Reveal>
              <Eyebrow tone="mint">One thread, read top to bottom</Eyebrow>
              <Body className="mt-4 mb-2">
                One borrower. One conversation. A channel changes, a field is made exact, a language
                shifts, a human steps in — and not a sentence is repeated. Every outbound line clears
                its own gate before it reaches the customer.
              </Body>
            </Reveal>

            {/* the artifact — the page's one mint-edged glass accent */}
            <Reveal delay={0.08}>
              <div className="mt-10 glass glass-mint overflow-hidden">
                <div className="border-b border-rline-soft px-6 md:px-9 py-4 flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-rtext-2">
                    Thread · application → payoff
                  </p>
                  <MonoNote>Context preserved across channels</MonoNote>
                </div>
                <div className="px-6 md:px-9 py-9 md:py-12 space-y-8 md:space-y-9">
                  {THREAD.map((turn, i) => (
                    <ThreadTurn key={i} turn={turn} />
                  ))}
                </div>
                <div className="border-t border-rline-soft px-6 md:px-9 py-4">
                  <MonoNote>
                    Every Kira action passes the same 33-validator gate — consent, contact windows,
                    language of disclosure — before it reaches the customer.
                  </MonoNote>
                </div>
              </div>
            </Reveal>

            {/* ── the two-powers beat: judgment + intelligence, one quiet line ── */}
            <Reveal delay={0.12}>
              <p className="mt-9 font-serif text-[1.2rem] leading-[1.55] text-rtext-2 max-w-[52ch]">
                Every Kira conversation is{' '}
                <span className="text-mint">validated before it reaches the borrower</span> —
                and remembered with its outcome, so the relationship compounds: context
                preserved, outcomes attributed, each thread smarter than the last.
              </p>
            </Reveal>
          </Section>

          {/* ── 3 · the channel strip — typographic, not logo salad ── */}
          <Section>
            <Reveal>
              <Eyebrow>Wherever the customer already is</Eyebrow>
              <H2 className="max-w-[20ch]">The medium is the customer’s choice — never the constraint.</H2>
              <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-4">
                {CHANNELS.map((c, i) => (
                  <span key={c} className="flex items-center">
                    {i > 0 && <span className="mr-3 text-rline font-serif text-[1.4rem]" aria-hidden>·</span>}
                    <span className="font-serif text-[clamp(1.3rem,2.6vw,2rem)] leading-none text-rtext">
                      {c}
                    </span>
                  </span>
                ))}
              </div>
              <Body className="mt-8">
                Kira moves between them inside a single thread — a voice note answers a WhatsApp
                message; an SMS reminder continues a chat from a month before. The relationship is
                continuous; the channel is just where it surfaces.
              </Body>
            </Reveal>
          </Section>

          {/* ── 4 · the lifecycle, customer-side — a vertical rail off a hairline spine ── */}
          <Section hairline className="md:py-24">
            <Reveal>
              <Eyebrow tone="mint">From the borrower’s side</Eyebrow>
              <H2 className="max-w-[22ch]">The same advisor, every moment of the loan.</H2>
            </Reveal>

            {/* a true timeline: one hairline spine, moments hung off it */}
            <div className="mt-12 relative">
              {/* the spine */}
              <span
                className="absolute left-[7px] top-2 bottom-2 w-px bg-rline-soft md:left-[calc(11rem+7px)]"
                aria-hidden
              />
              <ol className="space-y-9 md:space-y-11">
                {LIFECYCLE.map((m, i) => (
                  <Reveal key={m.stage} delay={i * 0.05}>
                    <li className="relative pl-9 md:pl-0 md:grid md:grid-cols-[11rem_1fr] md:gap-x-9">
                      {/* stage label sits left of the spine on wide screens */}
                      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-mint/90 mb-2 md:mb-0 md:text-right md:pr-9 md:pt-[3px]">
                        {m.stage}
                      </p>
                      {/* the node on the spine */}
                      <span
                        className="absolute left-0 top-[5px] h-[15px] w-[15px] rounded-full border border-mint/50 bg-runtime md:left-[11rem]"
                        aria-hidden
                      >
                        <span className="absolute inset-[4px] rounded-full bg-mint/70" />
                      </span>
                      <p className="font-serif text-[1.15rem] leading-[1.5] text-rtext max-w-[46ch] md:pl-9">
                        {m.line}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            <Reveal delay={0.1}>
              <p className="font-serif italic text-[1.2rem] text-rtext-2 mt-12 max-w-[40ch] md:pl-[calc(11rem+2.25rem)]">
                One advisor, always on — and, when it should be a person, a human with the whole
                thread already in hand.
              </p>
            </Reveal>
          </Section>
        </LayerShell>
      </main>
      <SiteFooter />
    </>
  )
}
