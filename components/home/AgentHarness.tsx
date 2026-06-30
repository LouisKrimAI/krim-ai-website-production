'use client'

import Reveal from '@/components/Reveal'
import HarnessVideo from '@/components/HarnessVideo'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export default function AgentHarness() {
  return (
    <Section hairline id="harness">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1.15fr]">

        <Reveal delay={0.15}>
          <HarnessVideo maxWidth="520px" />
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Safe agent harness</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Agents that act. A harness that decides if they should.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
              A bare AI agent operates without boundaries: any tool, any sequence, any
              parameters. In a regulated bank, that is not a capability. It is liability.
              On KrimOS, every action a Karta co-worker proposes clears three controls
              before it fires: a constrained action vocabulary, a 33-validator gate checked
              against your policy, fair-lending rules and consent records, and{' '}
              <span className="text-mint">a human command surface</span> your risk and
              compliance teams own.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <GlassCard className="mt-9 inline-block px-8 py-6">
              <p className="font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] text-ink">
                <span className="block">Validated before it acts.</span>
                <span className="block">Provable on demand.</span>
              </p>
            </GlassCard>
            <div className="mt-8">
              <CTA href="/research/safe-agent-harness" variant="secondary">
                Learn more about the Agent Harness
              </CTA>
            </div>
          </Reveal>
        </div>

      </div>
    </Section>
  )
}
