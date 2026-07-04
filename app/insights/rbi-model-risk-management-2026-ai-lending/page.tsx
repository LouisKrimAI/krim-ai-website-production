/**
 * /insights/rbi-model-risk-management-2026-ai-lending — article body + bespoke
 * inline visuals; the scaffold (hero, JSON-LD, panel, keep-reading, sources,
 * CTA) is ArticleShell, driven by app/insights/_posts.ts.
 * Category: Risk. Published during the RBI MRMF consultation window (closes 24 July 2026).
 * All facts trace to the RBI Press Release 2026-2027/528 and RBI FREE-AI report.
 */

import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { GlassCard } from '@/components/ui'
import Image from 'next/image'
import ArticleShell, { articleMetadata, postBySlug } from '@/components/ArticleShell'
import { IMAGE_MANIFEST } from '@/lib/image-manifest'

const GATE = IMAGE_MANIFEST['/images/harness/harness-gate.webp']

const POST = postBySlug('rbi-model-risk-management-2026-ai-lending')

const RBI_URL =
  'https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=63006'

// Head title is the SEO-tuned short form; og:title stays the real headline.
export const metadata = articleMetadata(POST, {
  title: 'RBI Model Risk Draft 2026: The Bar for AI Lending',
})

const LD_EXTRAS = {
  about: {
    '@type': 'Thing',
    name: 'RBI Guidance on Regulatory Principles for Model Risk Management 2026',
    url: RBI_URL,
  },
  keywords:
    'RBI model risk management 2026, MRMF, AI lending regulation India, model risk management framework, RBI AI guidelines banks NBFC, third-party model validation',
}

// ── Inline components ───────────────────────────────────────────────────────

function ReadinessGap() {
  const stats = [
    { label: 'Interpretability tools in use', pct: 15 },
    { label: 'Audit logs maintained', pct: 18 },
    { label: 'Model-drift monitoring active', pct: 21 },
    { label: 'Board-level AI oversight in place', pct: 33 },
  ]

  return (
    <div className="my-10 rounded-[4px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 md:p-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
        RBI readiness gap
      </p>
      <h3 className="mt-3 font-serif text-[1.25rem] leading-tight text-ink">
        What RBI now requires vs. what the sector has
      </h3>
      <div className="mt-8 space-y-6">
        {stats.map(({ label, pct }) => (
          <div key={label}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-sans text-[13px] text-ink-2">{label}</span>
              <span className="ml-4 shrink-0 font-mono text-[13px] text-mint">~{pct}%</span>
            </div>
            <div className="h-[3px] w-full rounded-full bg-[rgba(255,255,255,0.06)]">
              <div
                className="h-full rounded-full bg-mint"
                style={{ width: `${pct}%`, opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[11px] text-ink-3">
        Source: RBI FREE-AI Committee survey of regulated entities, 2025. Figures are approximate.
      </p>
    </div>
  )
}

function RBICrosswalk() {
  const items = [
    {
      num: '01',
      rbi: 'You own the outcomes of every model you run, including the ones you bought.',
      answer: 'One gate. Every action. Regardless of source.',
    },
    {
      num: '02',
      rbi: "A vendor's certification doesn't discharge your duty. You validate it yourself.",
      answer: 'Validation logic you own, running inside your perimeter.',
    },
    {
      num: '03',
      rbi: 'Material decisions must be explainable, even when the model is not.',
      answer: 'Krim-Nyāya renders formal reasons, not probability scores. Every decision, decomposed.',
    },
    {
      num: '04',
      rbi: 'System-level controls must constrain what a model can do.',
      answer: 'Actions blocked before they execute. Not logged after.',
    },
    {
      num: '05',
      rbi: 'More model autonomy means a higher risk tier and stricter scrutiny.',
      answer: 'Per-agent limits at the action layer. Higher autonomy triggers stricter checks.',
    },
    {
      num: '06',
      rbi: 'A human must be able to inspect, override, or stop the system at any point.',
      answer: 'The gate is always human-accessible: inspect, override, freeze.',
    },
    {
      num: '07',
      rbi: 'Every AI decision must be traceable, reproducible, and auditable.',
      answer: 'Deterministic, reproducible logs as a by-product of every action. Automatically retained.',
    },
  ]

  return (
    <div className="my-12">
      <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
        The RBI draft as a specification — and how KrimOS answers it
      </p>
      <div className="overflow-hidden rounded-[6px] border border-[rgba(255,255,255,0.08)]">
        {/* Column headers — desktop only */}
        <div className="hidden md:grid md:grid-cols-2 border-b border-[rgba(255,255,255,0.08)]">
          <div className="bg-[rgba(255,255,255,0.02)] px-6 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
              RBI requires
            </span>
          </div>
          <div className="border-l border-[rgba(255,255,255,0.08)] bg-[rgba(0,255,178,0.03)] px-6 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mint opacity-60">
              KrimOS delivers
            </span>
          </div>
        </div>
        {/* Rows */}
        {items.map((item, i) => (
          <div
            key={item.num}
            className={`grid grid-cols-1 md:grid-cols-2${i > 0 ? ' border-t border-[rgba(255,255,255,0.06)]' : ''}`}
          >
            <div className="flex gap-4 bg-[rgba(255,255,255,0.01)] px-6 py-5">
              <span className="mt-0.5 shrink-0 font-mono text-[11px] text-ink-3">{item.num}</span>
              <p className="font-sans text-[13.5px] leading-relaxed text-ink-2">{item.rbi}</p>
            </div>
            <div className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(0,255,178,0.03)] px-6 py-5 md:border-t-0 md:border-l md:border-l-[rgba(255,255,255,0.08)]">
              <p className="font-sans text-[13.5px] font-medium leading-relaxed text-mint">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimelineNode({ highlight }: { highlight?: boolean }) {
  if (highlight) {
    return (
      <span className="relative block h-[15px] w-[15px] shrink-0">
        <span aria-hidden className="absolute -inset-[7px] rounded-full bg-mint/20 blur-[6px]" />
        <span className="relative block h-[15px] w-[15px] rounded-full bg-mint shadow-[0_0_0_4px_rgba(0,255,178,0.14),0_0_16px_rgba(0,255,178,0.55)]" />
      </span>
    )
  }
  return (
    <span className="block h-[13px] w-[13px] shrink-0 rounded-full border border-white/25 bg-[#0c0e13] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.04)]" />
  )
}

function Timeline() {
  const events = [
    { date: 'Aug 2024', label: 'First credit-model draft' },
    { date: 'Aug 2025', label: 'FREE-AI report published' },
    { date: 'Jun 2026', label: 'This draft released' },
    { date: '24 Jul 2026', label: 'Comments close', highlight: true },
  ]

  return (
    <figure className="my-12">
      <figcaption className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
        The road to 24 July
      </figcaption>

      {/* Horizontal rail — sm and up */}
      <div className="relative hidden sm:block">
        <span
          aria-hidden
          className="pointer-events-none absolute top-[7px] h-px"
          style={{
            left: '12.5%',
            right: '12.5%',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.14) 55%, rgba(0,255,178,0.55) 100%)',
          }}
        />
        <ol className="relative z-10 grid grid-cols-4">
          {events.map((e, i) => (
            <li key={i} className="flex flex-col items-center px-3 text-center">
              <TimelineNode highlight={e.highlight} />
              <p className={`mt-5 font-mono text-[10px] uppercase tracking-[0.16em] ${e.highlight ? 'text-mint' : 'text-ink-3'}`}>
                {e.date}
              </p>
              <p className={`mt-2 font-sans text-[12.5px] leading-snug ${e.highlight ? 'text-ink' : 'text-ink-2'}`}>
                {e.label}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Vertical rail — mobile */}
      <ol className="relative sm:hidden">
        {events.map((e, i) => (
          <li key={i} className="relative flex items-start gap-4 pb-7 last:pb-0">
            {i < events.length - 1 && (
              <span
                aria-hidden
                className="pointer-events-none absolute left-[6px] top-[7px] w-px"
                style={{
                  bottom: '-1px',
                  background:
                    i === events.length - 2
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(0,255,178,0.55) 100%)'
                      : 'rgba(255,255,255,0.14)',
                }}
              />
            )}
            <span className="relative z-10 mt-0.5">
              <TimelineNode highlight={e.highlight} />
            </span>
            <div className="-mt-0.5">
              <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${e.highlight ? 'text-mint' : 'text-ink-3'}`}>
                {e.date}
              </p>
              <p className={`mt-1 font-sans text-[13px] leading-snug ${e.highlight ? 'text-ink' : 'text-ink-2'}`}>
                {e.label}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}

// ────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <ArticleShell
      post={POST}
      headline={
        <>
          RBI has set the bar for AI lending.
          <br />
          Almost no one can clear it.
        </>
      }
      ldExtras={LD_EXTRAS}
      image={
        /* bespoke header — same clean masked render as the harness page (no card, no baked background/sparkle) */
        <div className="mx-auto my-2 w-full max-w-[440px] px-6">
          <div className="relative mx-auto w-full max-w-[400px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,255,178,0.10) 0%, rgba(57,214,255,0.04) 42%, transparent 72%)' }}
            />
            <Image
              src="/images/harness/harness-gate.webp"
              alt="A luminous gate every AI decision must pass through before it acts."
              width={GATE.w}
              height={GATE.h}
              placeholder="blur"
              blurDataURL={GATE.blur}
              priority
              sizes="(max-width: 480px) 88vw, 400px"
              className="relative w-full"
              style={{
                filter: 'drop-shadow(0 0 26px rgba(0,255,178,0.22))',
                maskImage: 'radial-gradient(ellipse 82% 80% at 48% 50%, black 46%, transparent 84%)',
                WebkitMaskImage: 'radial-gradient(ellipse 82% 80% at 48% 50%, black 46%, transparent 84%)',
              }}
            />
          </div>
        </div>
      }
      related={['audit-after-the-fact-is-a-confession', 'the-cost-of-being-wrong']}
      sources={[
        { label: 'RBI Press Release 2026-2027/528 — Draft Guidance on Regulatory Principles for Model Risk Management (24 June 2026)', href: RBI_URL },
        { label: 'RBI FREE-AI Committee Report (August 2025)', href: 'https://www.rbi.org.in/scripts/PublicationReportDetails.aspx?UrlPage=&ID=1380' },
        { label: 'Federal Reserve: SR 11-7 (model risk management, 2011)', href: 'https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.htm' },
        { label: 'EU AI Act: Annex III (high-risk AI: creditworthiness)', href: 'https://artificialintelligenceact.eu/annex/3/' },
      ]}
      cta={{
        heading: 'Krim is building the control layer this draft describes.',
        body: 'Validated before it acts. Explainable by construction. On the record before the regulator asks.',
        href: '/krimos',
        label: 'See how KrimOS works',
      }}
    >
      <Reveal>
              <p className="font-sans text-body-lg text-ink-2">
                India's banking and credit sector has been putting AI to work inside lending
                operations for the better part of five years. Scoring models, document-processing
                pipelines, outbound call automation, real-time fraud checks: banks, NBFCs,
                co-operatives and credit information companies are all running some version of it.
                The adoption is real, and in the world's fastest-growing large economy it is
                accelerating. The Reserve Bank of India, which licences and supervises all of them,
                has been watching. And building its response.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                On 24 June, the RBI acted. It published{' '}
                <a
                  href={RBI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-soft underline-offset-4 transition-colors hover:text-mint"
                >
                  a draft guidance
                </a>{' '}
                that, once final, will be the comprehensive model risk framework every regulated
                lender in the country must operate inside. Guidance of this kind is not advisory
                in practice: it shapes what examiners look for, what enforcement actions reference,
                and at the limit, what licences are renewed.
              </p>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                The first wave of coverage landed on two words: <em>kill switch</em>. Easy to
                picture, easy to write about, and the easiest thing in the whole document to build.
                It is also beside the point.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                Read the draft as an operator and a harder picture comes into focus. It asks you to
                own the risk of every model you run, including the ones you bought from a vendor and
                never looked inside. It asks you to explain individual lending decisions to the
                people they land on: a customer, an examiner, a board. And it asks you to keep a
                human in genuine control while an agent is working, close enough to step in before an
                action goes out. Those three demands reach into how lending actually runs at most
                banks and NBFCs today, and they are expensive to meet.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                The draft Guidance on Regulatory Principles for Model Risk Management, 2026 is open
                for public comment until 24 July. Strip away the headline and what it really does is
                remove three assumptions the entire Indian AI-lending stack has been resting on. By
                its own regulator's measurement, the sector is nowhere near ready to stand without
                them.
              </p>

              <Timeline />

              <h2 className="mt-10 font-serif text-[1.5rem] leading-tight text-ink">
                It applies to almost everything
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                Start with scope, because it is wider than people expect. The Guidance reaches eleven
                categories of regulated entity: every bank, every NBFC down to the smallest,
                co-operatives, the large financial institutions, even credit information companies. If
                you lend, you are in.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                And "model" is defined to swallow your whole stack. Anything that takes inputs,
                applies logic, and produces an output that materially shapes a decision counts,
                whether or not you call it a model. RBI's own example is a spreadsheet: a
                loan-pricing calculator in Excel is just arithmetic, until it sets your rates, at
                which point it is a regulated model. The subtext is blunt. You have models you have
                never inventoried, and the regulator knows it.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                Three demands in the body actually bite.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                One: you can't outsource the risk
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                The spine of the document is a single sentence. A regulated entity is accountable for
                the outcomes of all its models (built in-house, bought from a vendor, or some mix).
                There is no clause that lets you point at a supplier.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                That matters, because the default way to adopt AI in lending has been to buy the risk
                away: sign with a credible vendor, accept their certifications, treat the model as
                their problem. The draft shuts that door. You must independently validate a
                third-party model regardless of any assurance the provider gives you. And if a vendor
                won't disclose enough for you to validate it, the prescribed remedy is to limit how
                much you use it. For anyone selling AI into regulated lenders,{' '}
                <span className="text-ink">"validatable"</span> just became a gate, not a
                nice-to-have.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                Two: the black box has to explain itself
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                The densest passage in the draft asks for explainability thresholds on every AI
                model, with the bar rising wherever the model drives material decisions or affects
                customers.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                The technical difficulty is real. The frontier models now seeping into credit are, by
                design, not fully explainable; their behaviour comes from billions of parameters no
                human reads. RBI knows this, and concedes that where full explainability isn't
                achievable you must wrap the model in compensating controls. But the bar doesn't
                move. The regulator isn't asking you to explain the model. It's asking you to explain,
                and stand behind, the decision.
              </p>

              <GlassCard accent className="my-10 p-8 md:p-10">
                <p className="font-serif text-[1.5rem] leading-snug text-ink">
                  RBI isn't asking you to explain the model. It's asking you to explain the decision.
                </p>
              </GlassCard>

              <p className="font-sans text-body text-ink-2">
                This isn't an Indian quirk. It's the same fault line in the EU AI Act's treatment of
                credit scoring and in the US Federal Reserve's SR 11-7, the text that has governed
                model risk in American banking since 2011. What's striking is that RBI has written
                its version not for the age of credit scorecards but for the age of agents, naming
                frontier models explicitly, and adding that the more autonomy a model has, the higher
                its risk tier. That's a regulator pricing autonomy as risk, in writing.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                Three: control before the fact, oversight forever after
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                The last demand is operational and relentless. Every model inventoried, or it can't
                be used. Decommissioned models kept for ten years. Independent validation before and
                after deployment. Red-teaming for anything customer-facing. Drift monitoring on an
                ongoing basis. Human-in-command, override, and yes, the kill switch. And telling
                customers when they're talking to an AI.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                The real work happens before the model acts: bounding it, validating it, keeping
                a human able to stop it. By the time you are reviewing what it already did, the
                action has happened. The draft is reaching for a control point that ordinary MLOps
                doesn't provide: a layer between an agent's intent and the irreversible action.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                The gap RBI already measured
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                Here's what should make every board uncomfortable. We know how ready the sector is,
                because RBI measured it. The survey behind its FREE-AI report (the parent of this
                draft) found that among lenders already using AI, only around{' '}
                <span className="text-ink">15%</span> used interpretability tools, roughly{' '}
                <span className="text-ink">18%</span> kept audit logs, about{' '}
                <span className="text-ink">21%</span> watched for model drift, and only a third had
                any board-level AI oversight at all.
              </p>
            </Reveal>

            <Reveal>
              <ReadinessGap />
            </Reveal>

            <Reveal>
              <GlassCard accent className="my-10 p-8 md:p-10">
                <p className="font-serif text-[1.5rem] leading-snug text-ink">
                  Among lenders already running AI, ~15% used interpretability tools and ~18% kept
                  audit logs. RBI has now made all of it mandatory.
                </p>
              </GlassCard>

              <p className="font-sans text-body text-ink-2">
                RBI has taken what a sophisticated minority did voluntarily and made it the floor for
                everyone, down to the small NBFC running a credit model it bought from a fintech it
                has never audited. That isn't a gap. It's a chasm. And it won't be closed with a
                policy PDF. An entity can write a framework in a quarter; it cannot, in a quarter,
                conjure the thing the framework assumes: a real control layer that validates AI
                decisions before they execute, explains them after, keeps an auditable record of every
                action, and lets a human override them in real time. That has to be built or bought.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                Before the window closes
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                Three moves, in order of urgency. First: inventory honestly, including the
                spreadsheets and rule engines you don't think of as models. The document's definition
                of "model" is broad enough to catch all of them. Second: revisit your AI vendor
                agreements for documentation rights, audit access, and exit terms. If you cannot
                validate it, the draft says to limit it. Third: decide where your control layer sits.
                Firms treat this as a compliance box to tick, but it is really a question of how
                the system is built, and the draft leaves one workable answer: run the checks
                before an action executes, while there is still something to stop.
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                What Krim built for this
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                We should be transparent: this is the layer we build. But the more important point
                is when, and why. Krim is a safe superintelligence research company. The founding
                thesis was that AI operating in regulated institutions needs a fundamentally different
                architecture: not better models, but a different operating system, one where the
                intelligence and the rules governing it are built as a single system, not connected
                afterwards.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                <span className="text-ink">KrimOS</span> is that operating system.{' '}
                <span className="text-ink">Kendra</span> is the runtime inside it, eight modules
                that run everything a KrimOS agent does. At Kendra's core is{' '}
                <span className="text-ink">Krim-Nyāya</span>: a pre-execution validation pipeline
                that runs every action an agent proposes through 33 validators before it fires.
                Those validators are derived from Navya-Nyāya, the formal-logic tradition of
                Mithila, two thousand years of precise reasoning about what follows from what,
                applied as a machine-executable grammar for what an agent is and isn't permitted to
                do. Each validator returns pass, amber, or fail. Nothing executes on an amber or
                a fail. The record is deterministic: the same inputs produce the same output,
                every time.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                That is the explainability answer this draft is reaching for. Not a post-hoc summary
                of what a model probably weighted. A formal record of exactly which rules an action
                was checked against, and what each returned. An auditor can read it. A board risk
                committee can read it. An RBI examiner can read it.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                Own the risk. Explain the decision. Control before the act. These three demands
                describe the architecture we built before this draft existed, because we believed
                they would eventually be required. The RBI draft is a regulator arriving at the
                same conclusion.
              </p>
            </Reveal>

            <Reveal>
              <GlassCard accent className="my-10 p-8 md:p-10">
                <p className="font-serif text-[1.5rem] leading-snug text-ink">
                  The model stays a black box. The decision doesn't.
                </p>
              </GlassCard>
            </Reveal>

            <Reveal>
              <p className="font-sans text-body text-ink-2">
                These demands cannot be met by paperwork. They need a control layer most lenders
                don't have, and the draft was not written with any vendor in mind. Whoever builds
                it,{' '}
                <span className="text-ink">
                  "validatable, explainable, overridable, on the record"
                </span>{' '}
                is the specification. KrimOS was built to it.
              </p>

              <RBICrosswalk />

              <p className="mt-8 font-sans text-body text-ink-2">
                See exactly how KrimOS addresses each row in that table:{' '}
                <Link href="/krimos" className="text-mint underline-offset-4 transition-colors hover:underline">
                  Explore KrimOS →
                </Link>
              </p>

              <h2 className="mt-12 font-serif text-[1.5rem] leading-tight text-ink">
                The window is open — briefly
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
                There's a fashionable view that draft guidance can be ignored until it's final. It
                can't. Once issued, this Guidance supersedes the rule that has governed credit-model
                risk since 2002, and it binds every regulated lender. The draft is simply the
                near-final shape of a rule that is coming. The comment window closes 24 July, the
                last chance to shape how it lands before it does.
              </p>
              <p className="mt-5 font-sans text-body text-ink-2">
                The lenders who treat the next few weeks as a consultation will spend the next two
                years catching up. The ones who read the draft as the specification it already is
                will spend that time building.
              </p>

              <p className="mt-8 font-sans text-body-lg text-ink-2 italic">
                Krim builds KrimOS, an agent-native operating system with a pre-execution validation
                layer for regulated lending. The draft is open for public comment until 24 July. If
                you use AI in lending, it is worth reading in full and responding to.{' '}
                <a
                  href={RBI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-soft underline-offset-4 transition-colors hover:text-mint"
                >
                  You can read RBI's original draft and press release here.
                </a>
              </p>
            </Reveal>

    </ArticleShell>
  )
}
