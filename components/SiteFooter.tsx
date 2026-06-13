/**
 * SiteFooter — the page's emotional close.
 * Hero tagline + demo CTA, a compact inline nav, brand signature, legal strip.
 * One restrained visual device: a luminous mint top hairline + a large faded
 * triangle mark bleeding off the right edge. Server component (no hooks).
 */

import Link from 'next/link'
import KrimLogoAnimated from './KrimLogoAnimated'

const DEMO_HREF = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

const NAV: Array<[string, Array<[string, string]>]> = [
  [
    'Platform',
    [
      ['KrimOS', '/platform'],
      ['Kendra', '/platform/kendra'],
      ['Kriya', '/platform/kriya'],
      ['Karta', '/platform/karta'],
      ['Kula', '/platform/kula'],
      ['Kira', '/platform/kira'],
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
      ['Trust', '/trust'],
      ['Services', '/services'],
      ['Blog', '/blog'],
      ['Contact', '/contact'],
    ],
  ],
]

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-soft">
      {/* visual device — luminous mint top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_8%,rgba(0,255,178,0.55)_50%,transparent_92%)]"
      />
      {/* visual device — large faded triangle mark bleeding off the right edge */}
      <img
        aria-hidden
        src="/brand/krim-mark.svg"
        alt=""
        width={520}
        height={520}
        className="pointer-events-none absolute -right-24 -top-16 hidden w-[34rem] select-none opacity-[0.05] md:block"
      />

      <div className="relative mx-auto max-w-site px-6 py-16 md:px-10 md:py-20">
        {/* hero close — tagline + primary CTA */}
        <div className="flex flex-col gap-8 border-b border-soft pb-12 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 className="max-w-[18ch] font-serif text-display-2 leading-tight text-ink md:text-[clamp(2rem,3.6vw,3rem)]">
            The AI your regulator can read.
          </h2>
          <Link
            href={DEMO_HREF}
            className="inline-block shrink-0 self-start rounded bg-mint px-7 py-3.5 font-sans text-[15px] font-medium text-on-mint transition-all duration-DEFAULT ease-standard hover:-translate-y-0.5 hover:bg-mint-bright motion-reduce:hover:translate-y-0 md:self-end"
          >
            Book a demo
          </Link>
        </div>

        {/* compact inline nav */}
        <nav className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-3" aria-label="Footer">
          {NAV.map(([title, links]) => (
            <div key={title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">{title}</p>
              <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2.5 sm:flex-col sm:gap-y-2.5">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-sans text-[13.5px] text-ink-2 transition-colors hover:text-ink"
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
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-soft pt-8">
          <div className="flex items-center gap-3.5">
            <KrimLogoAnimated className="h-7 w-auto" />
            <span aria-hidden className="hidden h-4 w-px bg-strong sm:block" />
            <span className="hidden font-serif text-[0.95rem] italic text-ink-2 sm:inline">
              Intelligence by policy.
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/company/krim/"
              className="font-mono text-caption text-ink-2 transition-colors hover:text-mint"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/TheKrimAI"
              className="font-mono text-caption text-ink-2 transition-colors hover:text-mint"
            >
              X
            </a>
          </div>
        </div>

        {/* legal strip */}
        <p className="mt-6 font-mono text-[11px] tracking-[0.06em] text-ink-3">
          © {new Date().getFullYear()} Krim AI · US · UK · India
        </p>
      </div>
    </footer>
  )
}
