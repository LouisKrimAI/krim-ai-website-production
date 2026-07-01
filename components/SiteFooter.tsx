/**
 * SiteFooter — the page's emotional close.
 * Hero tagline + demo CTA, a compact inline nav, brand signature, legal strip.
 * One restrained visual device: a luminous mint top hairline + a large faded
 * triangle mark bleeding off the right edge. Server component (no hooks).
 */

import Link from 'next/link'
import KrimLogoAnimated from './KrimLogoAnimated'

const DEMO_HREF = '/contact'

const NAV: Array<[string, Array<[string, string]>]> = [
  [
    'KrimOS',
    [
      ['Overview', '/krimos'],
      ['Kendra', '/krimos/kendra'],
      ['Kriya', '/krimos/kriya'],
      ['Karta', '/krimos/karta'],
      ['Kupa', '/krimos/kupa'],
      ['Kula', '/krimos/kula'],
      ['Kira', '/krimos/kira'],
    ],
  ],
  [
    'Domains',
    [
      ['Lending', '/lending'],
      ['Government', '/government'],
      ['Large Enterprise', '/enterprise'],
      ['MSME', '/msme'],
    ],
  ],
  [
    'Resources',
    [
      ['Epistemic AI', '/epistemic-ai'],
      ['World Lending Model', '/research/world-lending-model'],
      ['Safe Agent Harness', '/research/safe-agent-harness'],
      ['Research', '/research'],
      ['Architecture', '/architecture'],
      ['Trust', '/trust'],
    ],
  ],
  [
    'Company',
    [
      ['About', '/company'],
      ['Services', '/services'],
      ['Insights', '/insights'],
      ['Contact', '/contact'],
    ],
  ],
]

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* the one allowed divider — a luminous mint hairline marking the footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_8%,rgba(0,255,178,0.55)_50%,transparent_92%)]"
      />

      <div className="relative mx-auto max-w-site px-6 py-16 md:px-10 md:py-20">
        {/* hero close — tagline + primary CTA */}
        <div className="flex flex-col gap-8 pb-12 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 className="max-w-[18ch] font-serif text-display-2 leading-tight text-ink md:text-[clamp(2rem,3.6vw,3rem)]">
            The AI your regulator can read.
          </h2>
          <Link
            href={DEMO_HREF}
            className="inline-block shrink-0 self-start rounded bg-mint px-7 py-3.5 font-sans text-[15px] font-medium text-on-mint transition-all duration-fast ease-standard hover:-translate-y-0.5 hover:bg-mint-bright motion-reduce:hover:translate-y-0 md:self-end"
          >
            Book a demo
          </Link>
        </div>

        {/* compact inline nav */}
        <nav className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4" aria-label="Footer">
          {NAV.map(([title, links]) => (
            <div key={title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">{title}</p>
              <ul className="mt-3.5 flex flex-col gap-y-2.5">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-sans text-[14.5px] text-ink-2 transition-colors hover:text-ink"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* brand row */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 pt-8">
          <div className="flex items-center gap-3.5">
            <KrimLogoAnimated className="h-[26px] w-auto" />
            <span aria-hidden className="hidden h-4 w-px bg-strong sm:block" />
            <span className="hidden font-serif text-[0.95rem] italic text-ink-2 sm:inline">
              Intelligence by policy.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/krim"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Krim on LinkedIn"
              className="text-ink-2 transition-colors hover:text-mint"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="https://x.com/TheKrimAI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Krim on X"
              className="text-ink-2 transition-colors hover:text-mint"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* legal strip */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] tracking-[0.06em] text-ink-3">
          <span>© {new Date().getFullYear()} Krim</span>
          <a href="/privacy" className="transition-colors hover:text-ink-2">
            Privacy
          </a>
          <a href="/terms" className="transition-colors hover:text-ink-2">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
