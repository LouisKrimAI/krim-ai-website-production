'use client'

/**
 * AgentMarketplace — the Karta hiring floor.
 *
 * A filterable marketplace of specialist co-workers: circular persona
 * avatars (from the owner-supplied headshot sheets, sliced by
 * scripts/make_agent_avatars.py) on compact glass profile cards, filtered by
 * lifecycle segment. Surface is colour-coded per the page's grammar:
 * cyan = customer-facing contact centre, mint = operational back office.
 * The grid ends on a "Compose your own" card that hands off to Agent Studio.
 *
 * Claim discipline: no agent count is ever stated in copy (count canon);
 * blurbs are capability-framed; scoring/underwriting cards keep the credit
 * decision with the institution (krim-content.md — "not underwriting").
 */

import { useState } from 'react'

type Segment = 'orig' | 'uw' | 'serv' | 'coll' | 'hard' | 'over'
type Surface = 'cc' | 'bo'

const SEGMENTS: Array<{ key: Segment; chip: string; label: string }> = [
  { key: 'orig', chip: 'Origination', label: 'Origination' },
  { key: 'uw', chip: 'Underwriting', label: 'Underwriting' },
  { key: 'serv', chip: 'Servicing', label: 'Servicing' },
  { key: 'coll', chip: 'Collections', label: 'Collections' },
  { key: 'hard', chip: 'Hardship & disputes', label: 'Hardship & disputes' },
  { key: 'over', chip: 'Oversight', label: 'Oversight' },
]

type Agent = { name: string; seg: Segment; surface: Surface; blurb: string; avatar: string }

const AGENTS: Agent[] = [
  // ---- Origination ----
  { name: 'Application concierge', seg: 'orig', surface: 'cc', avatar: 'a12', blurb: 'Walks applicants through applying, by voice or chat, in their language.' },
  { name: 'Lead follow-up', seg: 'orig', surface: 'cc', avatar: 'a13', blurb: 'Re-engages started-but-unfinished applications across every channel.' },
  { name: 'Decision updates', seg: 'orig', surface: 'cc', avatar: 'b16', blurb: 'Keeps the applicant informed through each step, in plain language.' },
  { name: 'Broker & partner desk', seg: 'orig', surface: 'cc', avatar: 'a45', blurb: 'Keeps broker-sourced files moving, and every partner inside your rules.' },
  { name: 'Application processing', seg: 'orig', surface: 'bo', avatar: 'b21', blurb: 'Intakes the application, captures the documents, assembles the file.' },
  { name: 'Identity & onboarding', seg: 'orig', surface: 'bo', avatar: 'a31', blurb: 'Verifies identity and clears screening before anything proceeds.' },
  { name: 'Agreements & disbursement', seg: 'orig', surface: 'bo', avatar: 'a36', blurb: 'Generates the agreement, captures e-signature, releases the funds.' },
  // ---- Underwriting ----
  { name: 'Information requests', seg: 'uw', surface: 'cc', avatar: 'b22', blurb: 'Asks for the documents or details the decision still needs.' },
  { name: 'Offer & terms', seg: 'uw', surface: 'cc', avatar: 'a11', blurb: 'Presents the offer and explains the terms, by voice or chat.' },
  { name: 'Decline support', seg: 'uw', surface: 'cc', avatar: 'a54', blurb: 'Delivers the outcome with reasons, and the route to reconsider.' },
  { name: 'Borrower profiling', seg: 'uw', surface: 'bo', avatar: 'b34', blurb: 'Builds the single borrower picture the decision rests on.' },
  { name: 'Score & signals', seg: 'uw', surface: 'bo', avatar: 'a33', blurb: 'Assembles income, bureau and behaviour signals to inform your underwriting call.' },
  { name: 'Underwriting assembly', seg: 'uw', surface: 'bo', avatar: 'a42', blurb: 'Packages the file, checks and exceptions your underwriter signs off.' },
  // ---- Servicing ----
  { name: 'Servicing support', seg: 'serv', surface: 'cc', avatar: 'b12', blurb: 'Answers balances, payments and account changes, or hands to a person.' },
  { name: 'Proactive reminders', seg: 'serv', surface: 'cc', avatar: 'b23', blurb: 'Pre-due nudges on the channel and timing each borrower responds to.' },
  { name: 'Self-service guidance', seg: 'serv', surface: 'cc', avatar: 'a16', blurb: 'Walks borrowers through statements, payoffs and account changes.' },
  { name: 'Account maintenance', seg: 'serv', surface: 'bo', avatar: 'a21', blurb: 'Processes changes, plans and account updates, end to end.' },
  { name: 'Payments & mandates', seg: 'serv', surface: 'bo', avatar: 'b44', blurb: 'Runs billing, recurring debits and refunds across every rail.' },
  { name: 'Reconciliation', seg: 'serv', surface: 'bo', avatar: 'b36', blurb: 'Matches payments to accounts and clears the breaks.' },
  // ---- Collections ----
  { name: 'Early-stage collections', seg: 'coll', surface: 'cc', avatar: 'b31', blurb: 'Reaches borrowers as they slip and follows each promise to payment.' },
  { name: 'Late-stage collections', seg: 'coll', surface: 'cc', avatar: 'a25', blurb: 'Works deeper arrears with negotiated plans, within authority.' },
  { name: 'Payment arrangements', seg: 'coll', surface: 'cc', avatar: 'a55', blurb: 'Sets up and tracks plans the borrower can actually keep.' },
  { name: 'Recovery & settlement', seg: 'coll', surface: 'bo', avatar: 'a64', blurb: 'Negotiates settlements and works payoff and recovery, end to end.' },
  { name: 'Legal coordination', seg: 'coll', surface: 'bo', avatar: 'b53', blurb: 'Coordinates legal and field recovery, every step inside the rules.' },
  { name: 'Closure & write-off', seg: 'coll', surface: 'bo', avatar: 'b45', blurb: 'Closes the account: final payoff, security release and write-off.' },
  // ---- Hardship & disputes ----
  { name: 'Grievances & disputes', seg: 'hard', surface: 'cc', avatar: 'b42', blurb: 'Takes in complaints and disputes and keeps the customer informed.' },
  { name: 'Hardship support', seg: 'hard', surface: 'cc', avatar: 'a23', blurb: 'Handles hardship conversations with care, by voice or chat.' },
  { name: 'Retention & win-back', seg: 'hard', surface: 'cc', avatar: 'a62', blurb: 'Renewals and win-back, where a customer is worth keeping.' },
  { name: 'Dispute resolution', seg: 'hard', surface: 'bo', avatar: 'b63', blurb: 'Investigates the case, applies policy, resolves it on the record.' },
  { name: 'Hardship & restructuring', seg: 'hard', surface: 'bo', avatar: 'b55', blurb: 'Models restructures and concessions that genuinely fit.' },
  { name: 'Escalation handling', seg: 'hard', surface: 'bo', avatar: 'a56', blurb: 'Routes complex and high-value cases to the right reviewer.' },
  // ---- Oversight ----
  { name: 'Quality & QA', seg: 'over', surface: 'cc', avatar: 'a52', blurb: 'Reviews conversations for tone, compliance and outcome, and coaches.' },
  { name: 'Consent & preferences', seg: 'over', surface: 'cc', avatar: 'b52', blurb: 'Captures and honours contact consent on every channel.' },
  { name: 'Outcome follow-through', seg: 'over', surface: 'cc', avatar: 'b64', blurb: 'Confirms commitments landed and closes the loop with the customer.' },
  { name: 'Portfolio monitoring', seg: 'over', surface: 'bo', avatar: 'a35', blurb: 'Watches delinquency, roll-rate drift, anomalies and fraud, flags early.' },
  { name: 'Compliance & audit', seg: 'over', surface: 'bo', avatar: 'a43', blurb: 'Keeps every action traceable and the operation ready for examination.' },
  { name: 'Reporting', seg: 'over', surface: 'bo', avatar: 'b25', blurb: 'Turns the record into reporting for ops, risk, compliance and the board.' },
  { name: 'Policy watcher', seg: 'over', surface: 'bo', avatar: 'b46', blurb: 'Watches regulator updates and drafts the rule change for your approval.' },
  { name: 'KYC refresh', seg: 'over', surface: 'bo', avatar: 'a41', blurb: 'Re-verifies identity and documents on schedule, so no file goes stale.' },
]

const SEG_LABEL: Record<Segment, string> = Object.fromEntries(
  SEGMENTS.map((s) => [s.key, s.label])
) as Record<Segment, string>

function AgentCard({ agent }: { agent: Agent }) {
  const cc = agent.surface === 'cc'
  return (
    <div className="glass lume flex h-full flex-col items-center p-5 pt-6 text-center">
      <span className="relative inline-block">
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
      <h3 className="mt-3.5 font-serif text-[1.1rem] leading-snug text-ink">{agent.name}</h3>
      <p className={`mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] ${cc ? 'text-cyan/85' : 'text-mint/85'}`}>
        {SEG_LABEL[agent.seg]} · {cc ? 'Contact centre' : 'Back office'}
      </p>
      <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-ink-2">{agent.blurb}</p>
    </div>
  )
}

export default function AgentMarketplace() {
  const [seg, setSeg] = useState<Segment | 'all'>('all')
  const shown = seg === 'all' ? AGENTS : AGENTS.filter((a) => a.seg === seg)

  return (
    <div>
      {/* filter chips — one dimension: the lifecycle segment */}
      <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter agents by lifecycle segment">
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

      {/* the floor — surface carried by the avatar ring + label colour */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((a) => (
          <AgentCard key={a.name} agent={a} />
        ))}

        {/* compose your own — the marketplace is open-ended by design */}
        <a
          href="#agent-studio"
          className="glass lume group flex h-full flex-col items-center justify-start p-5 pt-6 text-center outline-none focus-visible:border-mint"
          style={{ borderColor: 'rgba(0,255,178,0.35)' }}
        >
          <span
            aria-hidden
            className="grid h-[72px] w-[72px] place-items-center rounded-full border-2 border-dashed border-mint/50 text-[1.6rem] leading-none text-mint transition-transform duration-fast group-hover:scale-105"
          >
            +
          </span>
          <h3 className="mt-3.5 font-serif text-[1.1rem] leading-snug text-ink">Compose your own</h3>
          <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-mint/85">
            Agent Studio · No code
          </p>
          <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-ink-2">
            Persona, voice, workflow, limits: the specialist you need, built by your team.
          </p>
        </a>
      </div>

      <p className="mt-7 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2">
        <span className="text-cyan">Cyan</span> faces your customers · <span className="text-mint">mint</span> runs the back office
      </p>
    </div>
  )
}
