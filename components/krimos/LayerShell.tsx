/**
 * LayerShell — shared chrome for every /krimos sub-page: header, the
 * persistent orb backdrop, a breadcrumb, the page content, a prev/next pair
 * across the layers, and a closing CTA band. Keeps the cluster coherent so
 * each page only has to bring its own substance.
 */

import Link from 'next/link'
import SiteHeader from '../SiteHeader'
import SiteFooter from '../SiteFooter'
import PlatformBackdrop from '../PlatformBackdrop'
import { Section, CTA } from '../ui'
import { layerBySlug, prevNext, type Layer, type LayerSlug } from './layers'


function NavCard({ layer, dir }: { layer: Layer; dir: 'prev' | 'next' }) {
  return (
    <Link href={`/krimos/${layer.slug}`} className="group block h-full">
      <div className={`glass lume h-full p-6 md:p-7 ${dir === 'next' ? 'text-right' : ''}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          {dir === 'prev' ? '← Previous' : 'Next →'}
        </p>
        <p className="mt-3 font-serif text-[1.4rem] text-ink transition-colors group-hover:text-mint">{layer.name}</p>
        <p className={`mt-1.5 font-sans text-[14.5px] leading-relaxed text-ink-2 ${dir === 'next' ? 'ml-auto' : ''} max-w-[34ch]`}>
          {layer.oneLiner}
        </p>
      </div>
    </Link>
  )
}

export default function LayerShell({ slug, children }: { slug: LayerSlug; children: React.ReactNode }) {
  const layer = layerBySlug(slug)
  const { prev, next } = prevNext(slug)

  return (
    <>
      <SiteHeader />
      <PlatformBackdrop />
      <main className="relative z-10">
        <div className="mx-auto max-w-site px-6 pt-10 md:px-10">
          <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            <Link href="/krimos" className="transition-colors hover:text-ink-2">
              KrimOS
            </Link>
            <span className="mx-2.5" aria-hidden>
              /
            </span>
            <span className="text-mint">{layer.name}</span>
          </nav>
        </div>

        {children}

        {/* prev / next across the layers */}
        <Section hairline>
          <div className="grid gap-4 sm:grid-cols-2">
            {prev ? <NavCard layer={prev} dir="prev" /> : <span className="hidden sm:block" />}
            {next ? (
              <NavCard layer={next} dir="next" />
            ) : (
              <Link href="/krimos" className="group block h-full">
                <div className="glass lume h-full p-6 text-right md:p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">Back to →</p>
                  <p className="mt-3 font-serif text-[1.4rem] text-ink transition-colors group-hover:text-mint">The platform</p>
                  <p className="ml-auto mt-1.5 max-w-[34ch] font-sans text-[14.5px] leading-relaxed text-ink-2">
                    The whole map: every part, one operating system.
                  </p>
                </div>
              </Link>
            )}
          </div>
        </Section>

        {/* closing CTA band */}
        <Section hairline>
          <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
            <h2 className="font-serif text-display-3 leading-tight text-ink">
              See {layer.name} at work.
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] font-sans text-body text-ink-2">
              Run the whole operation on KrimOS, or layer it onto the systems you have.
            </p>
            <div className="mt-8 flex justify-center">
              <CTA href="/krimos" variant="secondary">
                Explore KrimOS
              </CTA>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
