/**
 * PolicyChecks — homepage §7 "Intelligence by policy". A brief on what
 * Kendra's gate (Krim-Nyāya) actually checks before any action executes,
 * told through the three real Navya-Nyāya families (krim-content.md) with
 * plain-English glosses so a non-specialist grasps it in seconds:
 *   Pramāṇa  → grounding   (stops hallucination / ungrounded claims)
 *   Doṣa     → soundness   (catches formal failure modes / contradictions)
 *   Yogyatā  → permission  (law, policy, consent — stops policy violations)
 * Prose original; facts from krim-content. Honest by construction.
 */

import Reveal from '../Reveal'

const CHECKS = [
  {
    name: 'Pramāṇa',
    gloss: 'grounding',
    body: 'Is every claim backed by real evidence in the record? Ungrounded answers and hallucinations are stopped before they ever reach a customer.',
  },
  {
    name: 'Doṣa',
    gloss: 'soundness',
    body: 'Is the reasoning free of known failure modes? Contradictions and faulty inferences are caught against a formal catalogue of error.',
  },
  {
    name: 'Yogyatā',
    gloss: 'permission',
    body: 'Is this action allowed — here, now, for this person? Law, policy, consent and contact rules are settled before anything fires.',
  },
]

export default function PolicyChecks() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        {CHECKS.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.1}>
            <div className="glass lume h-full p-7 md:p-8">
              <div className="flex items-baseline gap-3">
                <h3 className="font-serif text-[1.5rem] leading-none text-ink">{c.name}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mint">{c.gloss}</span>
              </div>
              <p className="mt-5 font-sans text-body text-ink-2">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <p className="mt-8 max-w-[70ch] font-sans text-caption text-ink-3">
          Thirty-three validators in all — each returns pass, amber or fail, before execution, not
          after. Every decision is written to the ledger, including the ones that clear.
        </p>
      </Reveal>
    </div>
  )
}
