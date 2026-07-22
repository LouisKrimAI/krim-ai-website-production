'use client'

import Reveal from '@/components/Reveal'
import HarnessVideo from '@/components/HarnessVideo'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export default function AgentHarness() {
  return (
    <Section hairline id="harness">
      {/* centered header — the homepage convention */}
      <Reveal>
        <div className="mx-auto max-w-[760px] text-center">
          <Eyebrow>Safe agent harness</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
            Agents that act. A harness that decides if they should.
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 grid items-center gap-12 md:grid-cols-[1fr_1.15fr]">

        <Reveal delay={0.15}>
          <HarnessVideo maxWidth="520px" />
        </Reveal>

        <div>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
              A bare AI agent will use any tool, in any order, with any parameters — in a
              regulated bank, that is a liability. On KrimOS, every action a Karta
              co-worker proposes clears three controls first: a constrained
              action vocabulary; a 33-validator gate that checks your policy, fair-lending
              rules and consent records; and{' '}
              <span className="text-mint">a human command surface</span> your risk and
              compliance teams own.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <GlassCard className="mt-9 inline-block px-8 py-6">
              <p className="font-serif text-display-2 text-ink">
                <span className="block">Validated before it acts.</span>
                <span className="block">Provable on demand.</span>
              </p>
            </GlassCard>
            <div className="mt-8">
              <CTA href="/research/safe-agent-harness" variant="secondary">
                Explore the agent harness
              </CTA>
            </div>
          </Reveal>
        </div>

      </div>
    </Section>
  )
}
