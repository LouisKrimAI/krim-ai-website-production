/**
 * LegalDoc — shared renderer for the /privacy and /terms pages.
 *
 * Plain, readable prose on the dark canvas. Section bodies are plain text:
 * blank-line-separated paragraphs, and lines starting with "- " render as a
 * bullet list. [PLACEHOLDER: …] tokens are highlighted so the items still to be
 * completed before publication are obvious. The draft-review notice and the
 * highlighting come out once counsel has finalised the copy and the placeholders
 * are filled.
 */

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow } from '@/components/ui'

type LegalSection = { heading: string; body: string }

export type LegalDocProps = {
  title: string
  effectiveNote: string
  intro: string
  sections: LegalSection[]
}

function withPlaceholders(text: string, keyBase: string) {
  return text.split(/(\[PLACEHOLDER:[^\]]*\])/g).map((part, i) =>
    part.startsWith('[PLACEHOLDER:') ? (
      <span key={`${keyBase}-${i}`} className="rounded bg-gold/15 px-1 text-gold">
        {part}
      </span>
    ) : (
      <span key={`${keyBase}-${i}`}>{part}</span>
    ),
  )
}

function Body({ text }: { text: string }) {
  const blocks = text.split('\n\n')
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split('\n')
        const isList = lines.length > 0 && lines.every((l) => l.trim().startsWith('- '))
        if (isList) {
          return (
            <ul key={bi} className="mt-3 space-y-1.5">
              {lines.map((l, li) => (
                <li key={li} className="flex gap-2.5 font-sans text-body leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-mint/70" />
                  <span>{withPlaceholders(l.replace(/^\s*-\s/, ''), `${bi}-${li}`)}</span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={bi} className="mt-4 font-sans text-body leading-relaxed text-ink-2">
            {withPlaceholders(block.replace(/\n/g, ' '), `${bi}`)}
          </p>
        )
      })}
    </>
  )
}

export default function LegalDoc({ title, effectiveNote, intro, sections }: LegalDocProps) {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10">
        <Section className="!pt-24">
          <div className="mx-auto max-w-[760px]">
            <Reveal>
              <Eyebrow>Legal</Eyebrow>
              <h1 className="mt-4 font-serif text-[clamp(2.1rem,4vw,2.9rem)] leading-tight text-ink">
                {title}
              </h1>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                {effectiveNote}
              </p>
              {/* Draft notice — remove once counsel has finalised the copy and the placeholders are filled. */}
              <div className="mt-6 rounded-lg border border-gold/30 bg-gold/[0.06] p-4">
                <p className="font-sans text-caption leading-relaxed text-ink-2">
                  Working draft, pending legal review. The highlighted{' '}
                  <span className="text-gold">[PLACEHOLDER]</span> items must be completed before this
                  page is published.
                </p>
              </div>
              <div className="mt-8 border-t border-soft pt-8">
                <Body text={intro} />
              </div>
            </Reveal>
            <div className="mt-12 space-y-12">
              {sections.map((s) => (
                <Reveal key={s.heading}>
                  <section>
                    <h2 className="font-serif text-[1.45rem] leading-tight text-ink">{s.heading}</h2>
                    <Body text={s.body} />
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
