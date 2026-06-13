/**
 * SiteFooter — triangle mark · "Intelligence by policy." · full nav
 * (incl. Architecture / Research / Services / Blog) · socials · newsletter
 * placeholder, per SITEMAP-IA. Quiet; the page's last register.
 */

import Link from 'next/link'

const COLS: Array<[string, Array<[string, string]>]> = [
  [
    'Platform',
    [
      ['KrimOS', '/platform'],
      ['Kendra — the brain', '/platform/kendra'],
      ['Kriya — the vocabulary', '/platform/kriya'],
      ['Karta — the co-workers', '/platform/karta'],
      ['Kula — enterprise interface', '/platform/kula'],
      ['Kira — customer advisor', '/platform/kira'],
    ],
  ],
  [
    'Domains',
    [
      ['Lending', '/lending'],
      ['Government', '/government'],
      ['Epistemic AI', '/epistemic-ai'],
      ['Architecture', '/architecture'],
      ['Research', '/research'],
    ],
  ],
  [
    'Company',
    [
      ['About', '/company'],
      ['Trust & deployment', '/trust'],
      ['Services', '/services'],
      ['Blog', '/blog'],
      ['Contact', '/contact'],
    ],
  ],
]

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-soft">
      <div className="mx-auto max-w-site px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/brand/krim-mark.svg" alt="" width={20} height={20} className="h-5 w-5" />
              <span className="font-mono text-[14px] font-medium tracking-[0.22em] text-ink">KRIM</span>
            </div>
            <p className="mt-4 font-serif text-[1.05rem] italic text-ink-2">Intelligence by policy.</p>
            <div className="mt-6 flex gap-5">
              <a
                href="https://www.linkedin.com/company/krim/"
                className="font-mono text-caption text-ink-3 transition-colors hover:text-ink"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/TheKrimAI"
                className="font-mono text-caption text-ink-3 transition-colors hover:text-ink"
              >
                X
              </a>
            </div>
            <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-ink-3">
              NEWSLETTER — ARRIVING WITH THE BLOG
            </p>
          </div>

          {COLS.map(([title, links]) => (
            <div key={title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">{title}</p>
              <ul className="mt-4 space-y-2.5">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="font-sans text-[13.5px] text-ink-2 transition-colors hover:text-ink">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-soft pt-7">
          <p className="font-mono text-[11px] tracking-[0.06em] text-ink-3">
            © {new Date().getFullYear()} Krim AI · US · UK · India
          </p>
          <p className="font-mono text-[11px] tracking-[0.06em] text-ink-3">The AI your regulator can read.</p>
        </div>
      </div>
    </footer>
  )
}
