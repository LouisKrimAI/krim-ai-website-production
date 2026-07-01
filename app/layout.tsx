import type { Metadata } from 'next'
import { Newsreader, Inter, IBM_Plex_Mono, Montserrat } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'
import UpdateBanner from '@/components/UpdateBanner'
import ArrivalBoot from '@/components/ArrivalBoot'
import BackdropGate from '@/components/BackdropGate'
import BackgroundPrefetch from '@/components/BackgroundPrefetch'
import ResearchBackdrop from '@/components/ResearchBackdrop'
import WovenRingBackdrop from '@/components/WovenRingBackdrop'

const display = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
})
const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})
// the Krim wordmark's original typeface — used only inside the logo
const logo = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-logo',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://krim.ai'),
  title: {
    // Every tab carries the same brand line. Home reads "Krim — Safe
    // Superintelligence"; every other page reads "{Page} — Krim · Safe
    // Superintelligence". The keyword-rich banking positioning lives in the
    // description / OG titles, where it does the SEO work.
    default: 'Krim — Safe Superintelligence',
    template: '%s — Krim · Safe Superintelligence',
  },
  description:
    'KrimOS is the operating system for banking and lending: a world model with AI co-workers that run the whole lifecycle, every action validated before it acts, inside your own walls.',
  icons: {
    // dark-tiled mark so it stays visible on a white browser tab (the bare mint
    // mark washed out); SVG for crisp tabs, .ico as the universal fallback.
    icon: [
      { url: '/brand/logo/KRIM-favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/brand/logo/KRIM-favicon-512.png',
  },
  openGraph: {
    siteName: 'Krim',
    type: 'website',
    url: 'https://krim.ai',
  },
  twitter: { card: 'summary_large_image', site: '@TheKrimAI' },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable} ${logo.variable}`}>
      <body>
        {/* Pre-paint: tag the cluster so its page <main> starts hidden (globals.css)
            until the backdrop has rendered — no flash. Hard fallback reveals the
            text even if the gate script never runs. JS-off skips this entirely, so
            content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var p=location.pathname,e=document.documentElement,c=p.indexOf('/krimos')===0?'platform':(p==='/research'||p.indexOf('/research/')===0||p==='/epistemic-ai')?'research':'';if(c){e.setAttribute('data-cluster',c);setTimeout(function(){e.setAttribute('data-bg-ready','')},4500);}}catch(_){}})()",
          }}
        />

        {/* shared, persistent backdrops, each gated by route (see components):
            the research cluster keeps the lab render; everything except /krimos*
            and the research routes gets the woven ring */}
        <ResearchBackdrop />
        <WovenRingBackdrop />
        {children}
        <Analytics />
        <UpdateBanner />
        <ArrivalBoot />
        <BackdropGate />
        <BackgroundPrefetch />
      </body>
    </html>
  )
}
