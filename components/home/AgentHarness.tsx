'use client'

/**
 * AgentHarness — homepage §4: the safe agent harness.
 * Graphic left (floating via mix-blend-mode: screen), tight copy right.
 */

import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, CTA } from '@/components/ui'

const LAYERS = [
  { n: '01', name: 'Constrained action space', tint: 'mint' as const },
  { n: '02', name: 'Pre-execution gate', tint: 'mint' as const },
  { n: '03', name: 'Human always in command', tint: 'cyan' as const },
]

export default function AgentHarness() {
  return (
    <Section hairline id="harness">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">

        {/* left — floating graphic */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-[480px]">
            <Image
              src="/images/harness/harness-layers.png"
              alt="Three concentric glass shells — the Safe Agent Harness layers."
              width={800}
              height={534}
              sizes="(max-width: 768px) 88vw, 480px"
              className="w-full"
              style={{
                mixBlendMode: 'screen',
                filter: 'brightness(1.4) contrast(1.15)',
                maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 100%)',
              }}
              priority={false}
            />
          </div>
        </Reveal>

        {/* right — tight copy */}
        <Reveal delay={0.12}>
          <div>
            <Eyebrow>Safe agent harness</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
              Agents that act. A harness that decides if they should.
            </h2>
            <p className="mt-5 max-w-[42ch] font-sans text-body-lg text-ink-2">
              Every action a co-worker proposes must{' '}
              <span className="text-mint">clear the gate first.</span>{' '}
              If it fails, it doesn&rsquo;t happen.
            </p>

            {/* three layers — compact list */}
            <ul className="mt-7 space-y-3">
              {LAYERS.map((l) => (
                <li key={l.n} className="flex items-center gap-3">
                  <span className={`font-mono text-[10px] tracking-[0.15em] ${l.tint === 'mint' ? 'text-mint' : 'text-cyan'}`}>
                    {l.n}
                  </span>
                  <span className="font-sans text-[15px] text-ink-2">{l.name}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <CTA href="/research/safe-agent-harness" variant="secondary">
                The research behind it
              </CTA>
            </div>
          </div>
        </Reveal>

      </div>
    </Section>
  )
}
