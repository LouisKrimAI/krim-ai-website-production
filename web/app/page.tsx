/**
 * krim.ai — homepage (Phase 2, TWO WORLDS).
 *
 * Rhythm:  DARK hero (runtime, arrival) → seam → light record (shift ·
 * problem · Epistemic AI · solution) → DARK runtime (how it works) → seam →
 * light record (receipt · lifecycle · proof exhibit) → DARK cockpit (Kupa)
 * → seam → light close (trust · pilot).
 *
 * Facts: docs/krim-content.md. Server component shell; client islands only
 * where motion/state demands them — all copy is in the served HTML.
 */

import HeroArrival, { KrimMark } from '@/components/HeroArrival'
import RuntimeWorks from '@/components/RuntimeWorks'
import KupaCockpit from '@/components/KupaCockpit'
import { LiveLedger, ReceiptDoc, Stamp } from '@/components/exhibits'
import Reveal from '@/components/Reveal'

// ---------------------------------------------------------------------------
// Light-world section primitives (server-rendered)
// ---------------------------------------------------------------------------
function Eyebrow({ children, tone = 'seal' }: { children: React.ReactNode; tone?: 'seal' | 'amber' }) {
  return <p className={`font-mono text-[10px] tracking-[0.22em] uppercase mb-5 ${tone === 'seal' ? 'text-seal' : 'text-amber'}`}>{children}</p>
}
function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif font-light text-ink text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.05] tracking-[-0.012em] ${className}`}>
      {children}
    </h2>
  )
}

const LIFECYCLE = [
  ['Sourcing & onboarding', 'Engages, qualifies and guides the application', 'Lead scoring · KYC · document processing'],
  ['Underwriting & decision', 'Collects information, sets expectations', 'Credit analysis support · policy checks · sanction prep'],
  ['Disbursal', 'Walks the borrower through agreement & confirmation', 'Agreement generation · compliance · disbursal ops'],
  ['Servicing', 'Payments, queries, statements — one advisor, always on', 'Account maintenance · reconciliation · monitoring'],
  ['Collections & hardship', 'Reminders, plans, hardship handled with care', 'Risk segmentation · early warning · escalation'],
  ['Closure & re-engagement', 'Payoff, NOC, the next product conversation', 'Settlement · reporting · portfolio learning'],
] as const

const IMPACT = [
  ['Origination', '5–10× document throughput per analyst', 'Days → hours onboarding turnaround'],
  ['Servicing', '40–70% self-serve resolution', '30–50% lower assisted handling time'],
  ['Collections', '1–3 pp DPD 1–30 roll-rate reduction', '25–40% right-party-contact uplift'],
  ['Compliance', 'Days → minutes audit-ready reporting', '100% of regulated actions pre-validated'],
  ['Operating model', 'Weeks → hours journey build time', 'Quarterly → weekly strategy iteration'],
] as const

export default function Home() {
  return (
    <main>
      {/* ================= 1 · HERO — dark runtime, the arrival ================= */}
      <HeroArrival />

      {/* ================= 2 · THE SHIFT — the record =========================== */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-20">
          <Reveal>
            <Eyebrow>The shift</Eyebrow>
            <H2 className="max-w-[22ch]">Lending is being rebuilt on agent infrastructure.</H2>
            <p className="font-sans text-[1.05rem] leading-[1.7] text-ink-2 max-w-measure mt-6">
              The operating model is moving off tickets, spreadsheets and call scripts onto
              AI co-workers that act. Only one architecture survives regulated procurement —
              one built from layer zero for governance, sovereignty and the whole lifecycle.
            </p>
          </Reveal>
          <Reveal className="grid md:grid-cols-2 mt-14 border-y border-rule-strong divide-y md:divide-y-0 md:divide-x divide-rule">
            <div className="py-8 md:pr-10">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber mb-5">Today — workflow, not autonomy</p>
              <ul className="space-y-3.5 font-sans text-[15px] leading-relaxed text-ink-2">
                <li>BPOs add headcount, not intelligence.</li>
                <li>Lending SaaS moves tickets through a workflow — humans still decide and act.</li>
                <li>Chatbots talk, but cannot execute a regulated action.</li>
              </ul>
            </div>
            <div className="py-8 md:pl-10">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-seal mb-5">KrimOS — agent-native operations</p>
              <ul className="space-y-3.5 font-sans text-[15px] leading-relaxed text-ink">
                <li>Co-workers that act across customer and back-office channels.</li>
                <li>Validated before execution — every action gated, not audited after the fact.</li>
                <li>Sovereign by construction — self-hosted, in-jurisdiction, no foreign API in the loop.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 3 · THE PROBLEM + THE CEILING ======================== */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-site px-6 md:px-10 py-16 md:py-24 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow tone="amber">The problem</Eyebrow>
            <H2 className="max-w-[18ch]">Two workforces AI has not replaced.</H2>
            <p className="font-sans text-[1.05rem] leading-[1.7] text-ink-2 max-w-[58ch] mt-6">
              Lending runs on two teams divided by a wall — customer-facing and back-office —
              each on its own systems, KPIs and tooling. Tickets, spreadsheets and humans are
              the integration layer between them.
            </p>
            <p className="font-mono text-[12px] tracking-[0.04em] text-ink-3 mt-8">
              <span className="text-ink font-medium text-[1.6rem] font-serif">40–60%</span>
              &nbsp;&nbsp;of cost-per-loan is operations
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:pt-16">
            <div className="border-l-2 border-amber pl-7">
              <p className="font-serif text-ink text-[clamp(1.3rem,2.2vw,1.7rem)] leading-[1.4]">
                Banks cannot deploy AI they cannot explain to the regulator.
              </p>
              <p className="font-sans text-[14.5px] leading-[1.7] text-ink-2 mt-4">
                One unexplained action is a compliance event. A non-compliant call cannot be
                unmade; a misquoted EMI cannot be unspoken; a wrongful disclosure cannot be
                undone. Every banking AI pilot to date has hit this ceiling — and stopped.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 4 · EPISTEMIC AI — the definition ==================== */}
      <section id="epistemic" className="bg-paper">
        <div className="mx-auto max-w-site px-6 md:px-10 py-20 md:py-28 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Definition · the category</Eyebrow>
            <h2 className="font-serif font-light text-ink text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] tracking-[-0.01em]">
              Epistemic AI <span className="font-mono text-[1rem] tracking-normal align-middle text-ink-3">/ n. /</span>
            </h2>
            <p className="font-serif text-[1.35rem] leading-[1.55] mt-7 max-w-[44ch] text-ink">
              AI whose every action is validated before it fires, and whose reasoning an
              auditor can read end to end.
            </p>
            <p className="font-sans text-[15.5px] leading-[1.7] mt-7 max-w-[58ch] text-ink-2">
              Pre-execution, not post-audit. Validation is the runtime, not a wrapper bolted
              on. The category that wins regulated lending is the one that never lets a
              non-compliant action happen.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:pt-20" delay={0.15}>
            {([
              ['cf. autonomous AI', 'Implies no human. Regulators reject it.', false],
              ['cf. safe AI', "Defensive. It doesn't run the operation.", false],
              ['epistemic ai', 'Validates every action before it fires. Runs the operation — readably.', true],
            ] as const).map(([term, note, hero], i) => (
              <div key={term} className={`py-5 ${i === 0 ? 'border-t border-rule-strong' : 'border-t border-rule'}`}>
                <p className={`font-mono text-[11px] tracking-[0.14em] mb-1.5 ${hero ? 'text-seal' : 'text-ink-3'}`}>
                  {String(i + 1).padStart(2, '0')} · {term.toUpperCase()}
                </p>
                <p className={`font-serif text-[1.05rem] leading-[1.5] ${hero ? 'text-ink' : 'text-ink-2'}`}>{note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= 5 · THE SOLUTION — three pillars ===================== */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 md:px-10 pb-20 md:pb-28">
          <Reveal>
            <Eyebrow>The solution</Eyebrow>
            <H2 className="max-w-[18ch]">One stack. Both sides of the wall.</H2>
            <p className="font-sans text-[1.05rem] leading-[1.7] text-ink-2 max-w-measure mt-6">
              KrimOS runs customer-facing and back-office work as one AI workforce, on one
              audit trail, one source of truth.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-rule mt-12 border border-rule">
            {([
              ['01 · One workforce', 'The same runtime operates across both sides; every action lands on one audit trail.'],
              ['02 · Compliance as physics', 'Every action is validated against law, policy, consent and context before it executes. Compliance becomes a property of the runtime, not a department’s vigilance.'],
              ['03 · Sovereign by architecture', 'Customer data, model weights, orchestration and telemetry stay inside the institution’s perimeter. No mode requires data to leave.'],
            ] as const).map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.08} className="bg-paper p-7 md:p-8">
                <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-seal mb-3">{k}</p>
                <p className="font-sans text-[14.5px] leading-[1.7] text-ink-2">{v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6 · HOW IT WORKS — dark runtime ====================== */}
      <RuntimeWorks />

      {/* ================= 7 · THE RECORD — receipt + lifecycle + proof ========= */}
      <section id="record" className="bg-paper">
        <div className="mx-auto max-w-site px-6 md:px-10 py-20 md:py-28">
          {/* Exhibit A — the receipt the runtime just produced */}
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-24 md:mb-32">
            <Reveal>
              <Eyebrow>Exhibit A · what comes out of the gate</Eyebrow>
              <H2 className="max-w-[18ch]">Safety is the architecture, not an add-on.</H2>
              <p className="font-sans text-[15.5px] leading-[1.7] text-ink-2 max-w-[54ch] mt-6">
                The runtime cannot escape its own validation. Operators see validated actions
                execute and rejected actions land in an exception queue with the blocking rule
                and its reasoning. Auditors see every validation decision — including passes —
                sealed in Krim-Ledger and metered in the same pass, in Krim Work Units.
              </p>
              <p className="font-serif italic text-[1.1rem] text-ink mt-6">
                Compliance violations are not reduced; they are made structurally impossible.
              </p>
            </Reveal>
            <div className="justify-self-center lg:justify-self-end">
              <ReceiptDoc />
            </div>
          </div>

          {/* Exhibit B — the live ledger (with the honest amber row) */}
          <div className="mb-24 md:mb-32">
            <Reveal className="grid lg:grid-cols-12 gap-10 mb-10">
              <div className="lg:col-span-4">
                <Eyebrow>Exhibit B · the record</Eyebrow>
                <H2 className="text-[clamp(1.7rem,3vw,2.4rem)]">One record. Two uses — governance and billing.</H2>
              </div>
              <p className="lg:col-span-8 font-sans text-[15px] leading-[1.7] text-ink-2 max-w-[62ch] lg:pt-9">
                Every action, decision, prompt, output and validation is streamed to an
                immutable, cryptographically sealed trail and metered in the same pass.
                The chain of custody is court-admissible. What took a compliance team three
                days takes minutes — and the same ledger prices the work, so Krim earns when
                validated work executes, not as a tax on assets under management.
              </p>
            </Reveal>
            <LiveLedger />
          </div>

          {/* Exhibit C — end-to-end scope + proof ranges */}
          <Reveal className="mb-10">
            <Eyebrow>Exhibit C · end-to-end scope</Eyebrow>
            <H2 className="max-w-[22ch]">One stack covers the whole loan lifecycle.</H2>
          </Reveal>
          <div className="border-t border-rule-strong mb-20">
            <div className="hidden md:grid grid-cols-[220px_1fr_1fr] gap-x-8 py-2.5 border-b border-rule">
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-ink-3">STAGE</p>
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-ink-3">CUSTOMER · KIRA</p>
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-ink-3">ENTERPRISE · KARTA</p>
            </div>
            {LIFECYCLE.map(([stage, kira, karta], i) => (
              <Reveal key={stage} delay={i * 0.04} className="grid md:grid-cols-[220px_1fr_1fr] gap-x-8 gap-y-1 py-4 border-b border-rule">
                <p className="font-serif text-[1.02rem] text-ink">{stage}</p>
                <p className="font-sans text-[13.5px] leading-relaxed text-ink-2"><span className="md:hidden font-mono text-[9px] tracking-wider text-ink-3 uppercase">Kira · </span>{kira}</p>
                <p className="font-sans text-[13.5px] leading-relaxed text-ink-2"><span className="md:hidden font-mono text-[9px] tracking-wider text-ink-3 uppercase">Karta · </span>{karta}</p>
              </Reveal>
            ))}
            <p className="font-mono text-[10.5px] tracking-[0.08em] text-ink-3 pt-3">
              EVERY ROW, BOTH SIDES — EACH ACTION PASSES THE 33-VALIDATOR GATE BEFORE IT EXECUTES, AND LANDS IN KRIM-LEDGER AFTER
            </p>
          </div>

          <Reveal className="mb-8">
            <Eyebrow>Proven impact · calibrated ranges, not commitments</Eyebrow>
            <H2 className="text-[clamp(1.7rem,3vw,2.4rem)] max-w-[24ch]">Outcomes across the lending lifecycle.</H2>
            <p className="font-sans text-[14px] leading-[1.7] text-ink-2 max-w-[60ch] mt-4">
              Calibrated to typical retail-lending deployments and benchmarked against your own
              baseline during the 30-day proof of value.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {IMPACT.map(([area, m1, m2], i) => (
              <Reveal key={area} delay={i * 0.05} className="bg-paper p-6">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-3 mb-3">{area}</p>
                <p className="font-serif text-[1.12rem] leading-snug text-ink mb-1.5">{m1}</p>
                <p className="font-sans text-[13.5px] leading-relaxed text-ink-2">{m2}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="bg-paper-2 p-6 flex flex-col justify-center">
              <p className="font-serif italic text-[1.05rem] leading-relaxed text-ink-2">
                First-quarter baseline → measurable gains by Q2 → materially better than
                go-live by year two. Improvement from the runtime, not additional engineering.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 8 · KUPA — the cockpit (dark software) =============== */}
      <section className="bg-runtime-deep relative">
        <div className="world-seam" aria-hidden />
        <div className="mx-auto max-w-site px-6 md:px-10 py-20 md:py-28">
          <Reveal dark>
            <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-cyan mb-6">The operating surfaces · Kupa</p>
            <h2 className="font-serif font-normal text-rtext text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] tracking-[-0.01em] mb-6 max-w-[22ch]">
              The glass cockpit for Krim-powered operations.
            </h2>
            <p className="font-sans text-[1.05rem] leading-[1.65] text-rtext-2 max-w-[62ch] mb-12">
              Full lifecycle visibility, human-in-the-loop review queues, strategy and
              configuration, real-time monitoring with one-click kill switches — and an audit
              workspace where every interaction links to the policies that applied. The amber
              action the ledger held above is waiting here, with its blocking rule attached.
            </p>
          </Reveal>
          <KupaCockpit />
          <Reveal dark className="mt-10">
            <p className="font-sans text-[14.5px] leading-[1.7] text-rtext-2 max-w-[58ch]">
              Beside it sits <span className="text-rtext font-medium">Kula</span>, the strategy copilot:
              an operator writes <em className="font-serif">&ldquo;Increase on-time payments in 1–30 DPD by 5% next
              quarter&rdquo;</em> — Kula proposes segments, flows and policy constraints, routes every
              proposal through Krim-Govern and Krim-Nyāya, and surfaces it for human sign-off.
              It never bypasses either.
            </p>
          </Reveal>
        </div>
        <div className="world-seam" aria-hidden />
      </section>

      {/* ================= 9 · TRUST + CLOSE — the record ======================= */}
      <section id="pilot" className="bg-paper">
        <div className="mx-auto max-w-site px-6 md:px-10 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Sovereign · compliant · auditable</Eyebrow>
              <H2 className="text-[clamp(1.7rem,3vw,2.4rem)]">Sovereign by construction. Auditable by default.</H2>
              <p className="font-sans text-[14.5px] leading-[1.7] text-ink-2 mt-5 max-w-[50ch]">
                Customer data, model weights, orchestration and telemetry stay inside the
                institution&rsquo;s perimeter — no foreign API in the loop. Three modes, one
                architecture: sovereign on-prem, hybrid, or managed in your sovereign cloud
                region.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="border-t border-rule-strong">
                {([
                  ['Posture', 'End-to-end encryption · granular RBAC with full audit trail · PII isolation by tenancy · customer-held keys · immutable, cryptographically sealed trail'],
                  ['Frameworks · in progress', 'SOC 2 Type II · ISO 27001 · CERT-In · DPDP · GDPR · EU AI Act readiness'],
                  ['Encoded in Krim-Fabric', 'US: FDCPA, TCPA, Reg F, FCRA, SCRA, GLBA, ECOA, CFPB · UK: FCA Consumer Duty, CONC, Consumer Credit Act · India: RBI circulars, Fair Practices Code'],
                ] as const).map(([k, v]) => (
                  <div key={k} className="py-4 border-b border-rule grid md:grid-cols-[190px_1fr] gap-2">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-3 pt-0.5">{k}</p>
                    <p className="font-sans text-[13.5px] leading-[1.7] text-ink-2">{v}</p>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[10px] tracking-[0.06em] text-ink-3 mt-3">
                CERTIFICATIONS LISTED AS IN PROGRESS UNTIL HELD — STATED HONESTLY, THE WAY THE LEDGER WOULD.
              </p>
            </Reveal>
          </div>

          {/* the close */}
          <Reveal className="border-t-2 border-ink pt-14">
            <div className="grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <h2 className="font-serif font-light text-ink text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.07] tracking-[-0.012em] max-w-[20ch]">
                  The operating system for the operations that cannot afford to be wrong.
                </h2>
                <p className="font-sans text-[15.5px] leading-[1.7] text-ink-2 mt-6 max-w-[56ch]">
                  The runtime is the product. Validation is the architecture, not an add-on.
                  Sovereignty is a commitment, not a deployment option.
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <Stamp delay={0.2} className="mb-6 hidden lg:block" />
                <a href="mailto:sales@krim.ai" className="font-sans inline-block text-[15px] font-medium px-8 py-4 bg-ink text-paper hover:-translate-y-0.5 transition-transform">
                  Let&rsquo;s run a pilot
                </a>
                <p className="font-mono text-[10.5px] tracking-[0.06em] text-ink-3 mt-4 max-w-[30ch]">
                  FREE 30-MINUTE CONSULT — AUTOMATION POTENTIAL + A 90-DAY PLAN
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* footer */}
        <footer className="border-t border-rule">
          <div className="mx-auto max-w-site px-6 md:px-10 py-10 flex flex-wrap items-center justify-between gap-6">
            <div className="text-ink text-[13px]"><KrimMark /></div>
            <p className="font-serif italic text-[14px] text-ink-2">Intelligence by policy. The AI your regulator can read.</p>
            <p className="font-mono text-[10px] tracking-[0.12em] text-ink-3">© KRIM · US · UK · INDIA · SALES@KRIM.AI · +1 510 345 5686</p>
          </div>
        </footer>
      </section>
    </main>
  )
}
