import type { Metadata } from 'next'
import { Newsreader, Inter, IBM_Plex_Mono, Montserrat } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'
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
    default: 'Krim — Safe Superintelligence for Banking',
    template: '%s — Krim',
  },
  description:
    'KrimOS is the operating system for banking and financial services — a world model for lending with AI co-workers that run the whole lifecycle, every action validated before it acts, inside your own walls.',
  icons: {
    icon: [
      { url: '/brand/logo/KRIM-icon-mint.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
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
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${logo.variable}`}>
      <body>
        {/* shared, persistent backdrops, each gated by route (see components):
            the research cluster keeps the lab render; everything except /platform*
            and the research routes gets the woven ring */}
        <ResearchBackdrop />
        <WovenRingBackdrop />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
