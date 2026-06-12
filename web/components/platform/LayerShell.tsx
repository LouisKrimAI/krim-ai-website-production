/**
 * LayerShell — the shared frame for the five /platform layer pages,
 * on the one canvas (v3). Breadcrumb · stack rail · content · prev/next ·
 * CTA band. Server component.
 */

import Link from 'next/link'
import { LAYERS, layerIndex } from './layers'
import { CTAGroup, MonoNote } from '@/components/ui'

export function StackRail({ current }: { current: string }) {
  return (
    <nav aria-label="KrimOS layers" className="flex flex-wrap items-center gap-x-1 gap-y-2">
      {[...LAYERS].reverse().map((l, i) => {
        const on = l.slug === current
        return (
          <span key={l.slug} className="flex items-center">
            {i > 0 && <span className="mx-2 h-px w-4 bg-rline-soft hidden sm:block" aria-hidden />}
            <Link
              href={`/platform/${l.slug}`}
              aria-current={on ? 'page' : undefined}
              title={l.one}
              className={`font-mono text-[10.5px] tracking-[0.14em] uppercase px-2.5 py-1.5 rounded-md border transition-colors ${
                on
                  ? 'border-mint/50 text-mint bg-mint/5'
                  : 'border-transparent text-rtext-3 hover:text-rtext hover:border-rline-soft'
              }`}
            >
              {l.sanskrit}
            </Link>
          </span>
        )
      })}
    </nav>
  )
}

export default function LayerShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const i = layerIndex(slug)
  const layer = LAYERS[i]
  const prev = LAYERS[i - 1]
  const next = LAYERS[i + 1]

  return (
    <>
      {/* breadcrumb + stack rail */}
      <div className="border-b border-rline-soft">
        <div className="mx-auto max-w-site px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-rtext-3">
            <Link href="/platform" className="hover:text-rtext transition-colors">Platform</Link>
            <span className="mx-2 text-rtext-3/50" aria-hidden>/</span>
            <span className="text-rtext">{layer.sanskrit}</span>
            <span className="mx-2 text-rtext-3/50" aria-hidden>·</span>
            {layer.english}
          </p>
          <StackRail current={slug} />
        </div>
      </div>

      {children}

      {/* prev / next layer */}
      <div className="hairline" aria-hidden />
      <div className="mx-auto max-w-site px-6 md:px-10 py-10 grid sm:grid-cols-2 gap-6">
        {prev ? (
          <Link href={`/platform/${prev.slug}`} className="group glass-quiet p-6 transition-colors hover:border-mint/30">
            <MonoNote className="mb-2">← Beneath this layer</MonoNote>
            <p className="font-serif text-[1.3rem] text-rtext group-hover:text-mint transition-colors">
              {prev.sanskrit} <span className="text-rtext-3 text-[1rem]">· {prev.english}</span>
            </p>
          </Link>
        ) : (
          <Link href="/platform" className="group glass-quiet p-6 transition-colors hover:border-mint/30">
            <MonoNote className="mb-2">← The whole stack</MonoNote>
            <p className="font-serif text-[1.3rem] text-rtext group-hover:text-mint transition-colors">Platform overview</p>
          </Link>
        )}
        {next ? (
          <Link href={`/platform/${next.slug}`} className="group glass-quiet p-6 transition-colors hover:border-mint/30 sm:text-right">
            <MonoNote className="mb-2">Above this layer →</MonoNote>
            <p className="font-serif text-[1.3rem] text-rtext group-hover:text-mint transition-colors">
              {next.sanskrit} <span className="text-rtext-3 text-[1rem]">· {next.english}</span>
            </p>
          </Link>
        ) : (
          <Link href="/platform" className="group glass-quiet p-6 transition-colors hover:border-mint/30 sm:text-right">
            <MonoNote className="mb-2">The whole stack →</MonoNote>
            <p className="font-serif text-[1.3rem] text-rtext group-hover:text-mint transition-colors">Platform overview</p>
          </Link>
        )}
      </div>

      {/* CTA band */}
      <div className="hairline" aria-hidden />
      <div className="mx-auto max-w-site px-6 md:px-10 py-12 flex flex-wrap items-center justify-between gap-6">
        <p className="font-serif text-[1.35rem] text-rtext max-w-[28ch]">
          See {layer.sanskrit} running on the stack you already have.
        </p>
        <CTAGroup secondaryHref="/platform" secondaryLabel="Back to the stack" />
      </div>
    </>
  )
}
