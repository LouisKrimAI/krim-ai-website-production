'use client'

/**
 * AgentMarketplace — the Karta hiring floor.
 *
 * A marketplace of specialist co-workers, organised the way the operation is:
 * grouped by lifecycle stage, and inside each stage split into the two
 * surfaces — Customer-facing (cyan) and Back office (mint).
 *
 * THE TEST for which surface an agent belongs to is the BORROWER, not merely
 * "does it talk to someone outside": customer-facing means the borrower meets
 * this agent and its output is a conversation with them; back office means the
 * borrower never meets it, whoever it deals with. So agents that deal with
 * external NON-customers — brokers, partners, lawyers, field recovery — are
 * back office (Broker & partner desk sits beside Legal coordination), and
 * agents that watch the operation rather than serve a borrower (Quality & QA)
 * are back office too. The group labels
 * are the legend: they carry the same colour as the avatar rings beneath
 * them, so no card needs its own category caption. Filter chips narrow the
 * floor to one stage; the structure never changes shape. The floor closes on
 * a full-width "Compose your own" bar that hands off to Agent Studio.
 *
 * Uniform card geometry (owner rule: identical sizes, aligned rows): every
 * card reserves a two-line name box (names top-anchored inside it) and an
 * equal-height blurb slot, and every grid runs auto-rows-fr — so avatar,
 * name and blurb rows sit at the same y across the entire floor.
 *
 * Claim discipline: no agent count is ever stated in copy (count canon);
 * blurbs are capability-framed; scoring/underwriting cards keep the credit
 * decision with the institution (krim-content.md — "not underwriting").
 * Avatars: owner-supplied sheets, sliced by scripts/make_agent_avatars.py.
 */

import { useState } from 'react'

type Segment = 'orig' | 'uw' | 'serv' | 'coll' | 'hard' | 'over'
type Surface = 'cc' | 'bo'

const SEGMENTS: Array<{ key: Segment; chip: string; label: string; desc: string }> = [
  { key: 'orig', chip: 'Origination', label: 'Origination', desc: 'From first enquiry to funds released.' },
  { key: 'uw', chip: 'Underwriting', label: 'Underwriting & risk', desc: 'The credit call, and the picture behind it.' },
  { key: 'serv', chip: 'Servicing', label: 'Servicing', desc: 'Keeping every account current.' },
  { key: 'coll', chip: 'Collections', label: 'Collections & recovery', desc: 'From the first missed payment to resolution.' },
  { key: 'hard', chip: 'Hardship', label: 'Hardship & disputes', desc: 'The sensitive cases, and the ones worth keeping.' },
  { key: 'over', chip: 'Oversight', label: 'Risk & oversight', desc: 'Watching the whole book, and proving it.' },
]

type Agent = { name: string; seg: Segment; surface: Surface; blurb: string; avatar: string }

const AGENTS: Agent[] = [
  // ---- Origination ----
  { name: 'Eligibility & pre-qualification', seg: 'orig', surface: 'cc', avatar: 'a14', blurb: 'Answers “what could I borrow?” with an offer checked before it is sent.' },
  { name: 'Application concierge', seg: 'orig', surface: 'cc', avatar: 'a12', blurb: 'Walks applicants through applying, by voice or chat, in their language.' },
  { name: 'Lead follow-up', seg: 'orig', surface: 'cc', avatar: 'a13', blurb: 'Re-engages started-but-unfinished applications across every channel.' },
  { name: 'Decision updates', seg: 'orig', surface: 'cc', avatar: 'b16', blurb: 'Keeps the applicant informed through each step, in plain language.' },
  { name: 'Application processing', seg: 'orig', surface: 'bo', avatar: 'b21', blurb: 'Intakes the application, captures the documents, assembles the file.' },
  { name: 'Broker & partner desk', seg: 'orig', surface: 'bo', avatar: 'a45', blurb: 'Handles broker and partner queries and keeps their files moving.' },
  { name: 'Identity & onboarding', seg: 'orig', surface: 'bo', avatar: 'a31', blurb: 'Verifies identity and clears screening before anything proceeds.' },
  { name: 'Agreements & disbursement', seg: 'orig', surface: 'bo', avatar: 'a36', blurb: 'Generates the agreement, captures e-signature, releases the funds.' },
  // ---- Underwriting & risk ----
  { name: 'Information requests', seg: 'uw', surface: 'cc', avatar: 'b22', blurb: 'Asks for the documents or details the decision still needs.' },
  { name: 'Offer & terms', seg: 'uw', surface: 'cc', avatar: 'a11', blurb: 'Presents the offer and explains the terms, by voice or chat.' },
  { name: 'Decline support', seg: 'uw', surface: 'cc', avatar: 'a54', blurb: 'Delivers the outcome with reasons, and the route to reconsider.' },
  { name: 'Borrower profiling', seg: 'uw', surface: 'bo', avatar: 'b34', blurb: 'Builds the single borrower picture the decision rests on.' },
  { name: 'Score & signals', seg: 'uw', surface: 'bo', avatar: 'a33', blurb: 'Assembles income, bureau and behaviour signals to inform your underwriting call.' },
  { name: 'Collateral & valuation', seg: 'uw', surface: 'bo', avatar: 'a15', blurb: 'Orders and checks the valuation, and confirms security before funds move.' },
  { name: 'Underwriting assembly', seg: 'uw', surface: 'bo', avatar: 'a42', blurb: 'Packages the file, checks and exceptions your underwriter signs off.' },
  { name: 'Fraud review', seg: 'uw', surface: 'bo', avatar: 'a22', blurb: 'Flags forged documents and synthetic identities before a decision is made.' },
  // ---- Servicing ----
  { name: 'Servicing support', seg: 'serv', surface: 'cc', avatar: 'b12', blurb: 'Answers balances, payments and account changes, or hands to a person.' },
  { name: 'Proactive reminders', seg: 'serv', surface: 'cc', avatar: 'b23', blurb: 'Pre-due nudges on the channel and timing each borrower responds to.' },
  { name: 'Self-service guidance', seg: 'serv', surface: 'cc', avatar: 'a16', blurb: 'Walks borrowers through statements, payoffs and account changes.' },
  { name: 'Account maintenance', seg: 'serv', surface: 'bo', avatar: 'a21', blurb: 'Processes changes, plans and account updates, end to end.' },
  { name: 'Payments & mandates', seg: 'serv', surface: 'bo', avatar: 'b44', blurb: 'Runs billing, recurring debits and refunds across every rail.' },
  { name: 'Reconciliation', seg: 'serv', surface: 'bo', avatar: 'b36', blurb: 'Matches payments to accounts and clears the breaks.' },
  // ---- Collections & recovery ----
  { name: 'Early-stage collections', seg: 'coll', surface: 'cc', avatar: 'b31', blurb: 'Reaches borrowers as they slip and follows each promise to payment.' },
  { name: 'Late-stage collections', seg: 'coll', surface: 'cc', avatar: 'a25', blurb: 'Works deeper arrears with negotiated plans, within authority.' },
  { name: 'Payment arrangements', seg: 'coll', surface: 'cc', avatar: 'a55', blurb: 'Sets up and tracks plans the borrower can actually keep.' },
  { name: 'Recovery & settlement', seg: 'coll', surface: 'bo', avatar: 'a64', blurb: 'Models settlement options and works payoff and recovery through to closure.' },
  { name: 'Trace & locate', seg: 'coll', surface: 'bo', avatar: 'a24', blurb: 'Finds current contact details for borrowers who have gone quiet.' },
  { name: 'Legal coordination', seg: 'coll', surface: 'bo', avatar: 'b53', blurb: 'Coordinates legal and field recovery, every step inside the rules.' },
  { name: 'Closure & write-off', seg: 'coll', surface: 'bo', avatar: 'b45', blurb: 'Closes the account: final payoff, security release and write-off.' },
  // ---- Hardship & disputes ----
  { name: 'Grievances & disputes', seg: 'hard', surface: 'cc', avatar: 'b42', blurb: 'Takes in complaints and disputes and keeps the customer informed.' },
  { name: 'Hardship support', seg: 'hard', surface: 'cc', avatar: 'a23', blurb: 'Handles hardship conversations with care, by voice or chat.' },
  { name: 'Retention & win-back', seg: 'hard', surface: 'cc', avatar: 'a62', blurb: 'Renewals and win-back, where a customer is worth keeping.' },
  { name: 'Dispute resolution', seg: 'hard', surface: 'bo', avatar: 'b63', blurb: 'Investigates the case, applies policy, resolves it on the record.' },
  { name: 'Hardship & restructuring', seg: 'hard', surface: 'bo', avatar: 'b55', blurb: 'Models restructures and concessions that genuinely fit.' },
  { name: 'Escalation handling', seg: 'hard', surface: 'bo', avatar: 'a56', blurb: 'Routes complex and high-value cases to the right reviewer.' },
  // ---- Risk & oversight ----
  { name: 'Quality & QA', seg: 'over', surface: 'bo', avatar: 'a52', blurb: 'Reviews recorded conversations for tone and outcome, and coaches.' },
  { name: 'Consent & preferences', seg: 'over', surface: 'cc', avatar: 'b52', blurb: 'Asks how and when each customer wants contact, and honours it.' },
  { name: 'Outcome follow-through', seg: 'over', surface: 'cc', avatar: 'b64', blurb: 'Confirms commitments landed and closes the loop with the customer.' },
  { name: 'Portfolio monitoring', seg: 'over', surface: 'bo', avatar: 'a35', blurb: 'Watches delinquency, roll-rate drift, anomalies and fraud, flags early.' },
  { name: 'Compliance & audit', seg: 'over', surface: 'bo', avatar: 'a43', blurb: 'Keeps every action traceable and the operation ready for examination.' },
  { name: 'Reporting', seg: 'over', surface: 'bo', avatar: 'b25', blurb: 'Turns the record into reporting for ops, risk, compliance and the board.' },
  { name: 'Bureau & regulatory reporting', seg: 'over', surface: 'bo', avatar: 'a26', blurb: 'Files borrower data and statutory returns to bureaus and regulators.' },
  { name: 'Policy watcher', seg: 'over', surface: 'bo', avatar: 'b46', blurb: 'Watches regulator updates and drafts the rule change for your approval.' },
  { name: 'KYC refresh', seg: 'over', surface: 'bo', avatar: 'a41', blurb: 'Re-verifies identity and documents on schedule, so no file goes stale.' },
]

/* one uniform profile card — identical geometry everywhere:
   avatar (fixed) → two-line name box (names top-anchored) → blurb slot */
function AgentCard({ agent }: { agent: Agent }) {
  const cc = agent.surface === 'cc'
  return (
    <div className="glass lume flex h-full flex-col items-center px-5 pb-5 pt-6 text-center">
      <span className="relative inline-block shrink-0">
        <img
          src={`/images/agents/${agent.avatar}.webp`}
          alt=""
          width={72}
          height={72}
          loading="lazy"
          decoding="async"
          className={`h-[72px] w-[72px] rounded-full border-2 object-cover ${
            cc ? 'border-cyan/40' : 'border-mint/40'
          }`}
        />
        {/* ready dot — seated on the avatar's rim */}
        <span
          aria-hidden
          className="absolute bottom-[2px] right-[2px] h-3 w-3 rounded-full border-2 border-[rgba(9,11,16,0.95)] bg-mint shadow-[0_0_8px_rgba(0,255,178,0.7)]"
        />
      </span>
      <div className="mt-3.5 flex min-h-[2.75rem] w-full items-start justify-center">
        <h4 className="font-serif text-[1.1rem] leading-snug text-ink">{agent.name}</h4>
      </div>
      <p className="mt-1 min-h-[2.5em] font-sans text-[13px] leading-relaxed text-ink-2">
        {agent.blurb}
      </p>
    </div>
  )
}

/* one surface cluster: the coloured label IS the legend for the rings below */
function SurfaceGroup({ surface, agents }: { surface: Surface; agents: Agent[] }) {
  const cc = surface === 'cc'
  return (
    <div>
      <p
        className={`flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] ${
          cc ? 'text-cyan' : 'text-mint'
        }`}
      >
        <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${cc ? 'bg-cyan' : 'bg-mint'}`} />
        {cc ? 'Customer-facing' : 'Back office'}
      </p>
      <div className="mt-4 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <AgentCard key={a.name} agent={a} />
        ))}
      </div>
    </div>
  )
}

export default function AgentMarketplace() {
  const [seg, setSeg] = useState<Segment | 'all'>('all')
  const stages = seg === 'all' ? SEGMENTS : SEGMENTS.filter((s) => s.key === seg)

  return (
    <div>
      {/* filter chips — one dimension: the lifecycle stage */}
      <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter agents by lifecycle stage">
        {[{ key: 'all' as const, chip: 'All' }, ...SEGMENTS].map((s) => {
          const active = seg === s.key
          return (
            <button
              key={s.key}
              role="tab"
              aria-selected={active}
              onClick={() => setSeg(s.key)}
              className={`min-h-[44px] rounded-full border px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] outline-none transition-all duration-fast focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-mint/70 ${
                active
                  ? 'border-mint/60 bg-mint/[0.10] text-mint shadow-[0_0_20px_-6px_rgba(0,255,178,0.5)]'
                  : 'border-white/12 bg-white/[0.02] text-ink-2 hover:border-mint/35 hover:text-ink'
              }`}
            >
              {s.chip}
            </button>
          )
        })}
      </div>

      {/* the floor — stage by stage, each split into its two surfaces */}
      <div className="mt-12 space-y-16">
        {stages.map((stage) => {
          const cc = AGENTS.filter((a) => a.seg === stage.key && a.surface === 'cc')
          const bo = AGENTS.filter((a) => a.seg === stage.key && a.surface === 'bo')
          return (
            <section key={stage.key} aria-label={stage.label}>
              {/* stage header — a directory band: hairline, name left, its one-liner right */}
              <div className="border-t border-white/10 pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-serif text-[1.5rem] leading-tight text-ink">{stage.label}</h3>
                  <p className="font-sans text-[14px] text-ink-2">{stage.desc}</p>
                </div>
              </div>
              <div className="mt-6 space-y-8">
                <SurfaceGroup surface="cc" agents={cc} />
                <SurfaceGroup surface="bo" agents={bo} />
              </div>
            </section>
          )
        })}
      </div>

      {/* compose your own — the floor is open-ended by design */}
      <a
        href="#agent-studio"
        className="glass lume group mt-16 flex flex-col items-center gap-5 p-7 outline-none focus-visible:border-mint sm:flex-row sm:gap-7 md:px-9"
        style={{ borderColor: 'rgba(0,255,178,0.35)' }}
      >
        <span
          aria-hidden
          className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full border-2 border-dashed border-mint/50 text-[1.6rem] leading-none text-mint transition-transform duration-fast group-hover:scale-105"
        >
          +
        </span>
        <span className="text-center sm:text-left">
          <span className="block font-serif text-[1.35rem] leading-tight text-ink">
            The specialist you need isn&rsquo;t here? <span className="text-mint">Compose it.</span>
          </span>
          <span className="mt-1.5 block font-sans text-body text-ink-2">
            Persona, voice, workflow, limits — built by your team in Agent Studio, no code.
          </span>
        </span>
        <span
          aria-hidden
          className="ml-auto hidden font-serif text-[1.4rem] text-mint transition-transform duration-fast group-hover:translate-x-1 sm:block"
        >
          →
        </span>
      </a>
    </div>
  )
}
