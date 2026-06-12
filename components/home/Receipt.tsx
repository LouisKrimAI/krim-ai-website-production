/**
 * Receipt — homepage §7: the Action Receipt as a tangible glass artifact.
 * One validated action with its pre-flight checks, reasoning and seal —
 * set beside the honest amber refusal routed to a person. Checks match
 * krim-content.md's MAKE_CALL worked example; record is a labelled
 * specimen, not production data.
 */

const CHECKS = [
  'TCPA consent',
  'Calling hours',
  'Reg F contact limits',
  'DNC registry',
]

export default function Receipt() {
  return (
    <div className="glass overflow-hidden" style={{ borderColor: 'rgba(0,255,178,0.35)' }}>
      {/* header */}
      <div className="flex items-center justify-between border-b border-soft px-6 py-3.5 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-ink-3">ACTION RECEIPT</p>
        <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3">SPECIMEN · SIMULATED DATA</p>
      </div>

      <div className="grid md:grid-cols-[1.4fr_1fr]">
        {/* the cleared action */}
        <div className="px-6 py-7 md:px-8 md:py-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-[15px] text-ink">MAKE_CALL</p>
            <p className="font-mono text-[11px] text-ink-3">outbound · servicing</p>
          </div>

          <ul className="mt-6 space-y-2.5">
            {CHECKS.map((c) => (
              <li key={c} className="flex items-center justify-between gap-4">
                <span className="font-mono text-[12.5px] text-ink-2">{c}</span>
                <span className="flex items-center gap-2">
                  <span className="h-px w-8 bg-white/10" aria-hidden />
                  <span className="font-mono text-[11px] tracking-[0.12em] text-mint">PASS</span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-soft pt-5 font-serif text-[15px] italic leading-relaxed text-ink-2">
            Consent on file. Inside permitted hours, under the contact cap — cleared to dial.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-sm border border-mint/60 px-3 py-1.5 font-mono text-[11px] tracking-[0.2em] text-mint">
              VALIDATED
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink-3">
              KRIM-NYĀYA · 33 VALIDATORS
            </span>
          </div>
        </div>

        {/* the honest refusal */}
        <div className="border-t border-soft bg-white/[0.015] px-6 py-7 md:border-l md:border-t-0 md:px-7 md:py-8">
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink-3">AND THE ONE THAT ISN&rsquo;T</p>
          <div className="mt-5 rounded border border-gold/45 bg-gold/[0.05] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[13px] text-ink">SEND_EMAIL</p>
              <span className="font-mono text-[10px] tracking-[0.16em] text-gold">AMBER</span>
            </div>
            <p className="mt-3 font-sans text-[13px] leading-relaxed text-ink-2">
              Settlement terms outside the approved range. Held, with its reasoning — routed to a person.
            </p>
          </div>
          <p className="mt-5 font-sans text-[12.5px] leading-relaxed text-ink-3">
            The refusal is the proof: what can&rsquo;t clear the gate doesn&rsquo;t run.
          </p>
        </div>
      </div>
    </div>
  )
}
