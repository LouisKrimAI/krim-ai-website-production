/**
 * SiteHeader — global chrome on the one canvas (v3). Glass sticky bar.
 * Nav: Platform · Lending · Government · Epistemic AI · Trust · Company
 * + "Book a demo". Unshipped routes fall to the on-brand 404 until their phase.
 */

import Link from 'next/link'
import { KrimMark } from './HeroArrival'

const NAV = [
  ['Platform', '/platform'],
  ['Lending', '/lending'],
  ['Government', '/government'],
  ['Epistemic AI', '/epistemic-ai'],
  ['Trust', '/trust'],
  ['Company', '/company'],
] as const

export default function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-rline-soft"
      style={{ background: 'rgba(7,8,15,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <div className="mx-auto max-w-site px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="text-mint text-[14px] hover:opacity-85 transition-opacity" aria-label="Krim home">
          <KrimMark />
        </Link>
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {NAV.map(([label, href]) => (
            <Link key={href} href={href} className="font-mono text-[11px] tracking-[0.16em] uppercase text-rtext-2 hover:text-rtext transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        {/* TODO(step 3): → /contact when the conversion page ships */}
        <a
          href="mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS"
          className="font-sans text-[13px] font-medium px-4 py-2 rounded-[8px] bg-mint text-mint-on hover:-translate-y-px transition-transform"
        >
          Book a demo
        </a>
      </div>
    </header>
  )
}
