/**
 * HoldingPage — an honest one-screen stand-in for routes whose phase hasn't
 * shipped (panel finding: a buyer's first click must never dead-end on a 404).
 * One factual line from the v3 sitemap; no invented content; the right CTA
 * register per page (/government: "Start a conversation").
 */

import Link from 'next/link'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { Eyebrow, PageH1, Lede, MonoNote } from './ui'

export default function HoldingPage({
  eyebrow,
  title,
  line,
  cta = 'demo',
}: {
  eyebrow: string
  title: string
  line: string
  cta?: 'demo' | 'conversation'
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[62vh] flex items-center">
        <div className="mx-auto max-w-site px-6 md:px-10 py-24 w-full">
          <div className="glass-quiet max-w-[720px] p-8 md:p-12">
            <Eyebrow>{eyebrow}</Eyebrow>
            <PageH1 className="text-[clamp(2rem,4.5vw,3.2rem)]">{title}</PageH1>
            <Lede className="mt-6">{line}</Lede>
            <MonoNote className="mt-8">THIS PAGE IS BEING BUILT — IT ARRIVES IN A LATER PHASE OF THE SITE.</MonoNote>
            <div className="flex flex-wrap items-center gap-5 mt-8">
              {cta === 'conversation' ? (
                <a
                  href="mailto:sales@krim.ai?subject=Starting%20a%20conversation%20%E2%80%94%20Krim%20for%20government"
                  className="font-sans text-[15px] font-medium px-7 py-3.5 rounded-[10px] bg-mint text-mint-on hover:-translate-y-0.5 transition-all"
                >
                  Start a conversation
                </a>
              ) : (
                <a
                  href="mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS"
                  className="font-sans text-[15px] font-medium px-7 py-3.5 rounded-[10px] bg-mint text-mint-on hover:-translate-y-0.5 transition-all"
                >
                  Book a demo
                </a>
              )}
              <Link href="/platform" className="font-mono text-[12px] tracking-[0.16em] uppercase text-rtext-2 hover:text-rtext underline-offset-4 hover:underline">
                Explore the platform
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
