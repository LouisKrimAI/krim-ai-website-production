/**
 * SiteFooter — global chrome on the one canvas (v3).
 * Architecture/Services/Insights live here. Socials pending [PROVIDE].
 */

import Link from 'next/link'
import { KrimMark } from './HeroArrival'

const COLS: Array<[string, Array<[string, string]>]> = [
  ['Platform', [['Overview', '/platform'], ['Kendra · runtime', '/platform/kendra'], ['Kriya · primitives', '/platform/kriya'], ['Karta · co-workers', '/platform/karta'], ['Kupa · command center', '/platform/kupa'], ['Krimkar · consumer', '/platform/krimkar']]],
  ['Domains', [['Lending', '/lending'], ['Government', '/government']]],
  ['Depth', [['Epistemic AI', '/epistemic-ai'], ['Architecture', '/architecture'], ['Trust & security', '/trust'], ['Services', '/services']]],
  ['Company', [['About', '/company'], ['Insights', '/insights'], ['Contact', '/contact'], ['Legal', '/legal']]],
]

// LinkedIn + X confirmed from the existing site; Substack/Medium [PROVIDE].
const SOCIALS: Array<[string, string]> = [
  ['LinkedIn', 'https://www.linkedin.com/company/krim/'],
  ['X', 'https://x.com/TheKrimAI'],
  ['Substack', '#provide-substack'],
  ['Medium', '#provide-medium'],
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-rline-soft">
      <div className="mx-auto max-w-site px-6 md:px-10 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <div className="text-mint text-[13px] mb-4"><KrimMark /></div>
            <p className="font-serif italic text-[14.5px] text-rtext-2 max-w-[26ch]">
              Validated before it acts. Smarter after it acts.
            </p>
            <p className="font-mono text-[10px] tracking-[0.1em] text-rtext-3 mt-3">
              The AI your regulator can read.
            </p>
          </div>
          {COLS.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-rtext-3 mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="font-sans text-[13.5px] text-rtext-2 hover:text-rtext transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="border-t border-rline-soft pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.12em] text-rtext-3">© KRIM · US · UK · INDIA · SALES@KRIM.AI · +1 510 345 5686</p>
          <div className="flex items-center gap-5">
            {SOCIALS.map(([label, href]) => (
              <a key={label} href={href} className="font-mono text-[10px] tracking-[0.14em] uppercase text-rtext-3 hover:text-rtext transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
