import type { Metadata } from 'next'
import { Newsreader, Inter, IBM_Plex_Mono, Montserrat } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'

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
    default: 'Krim - Safe Superintelligence',
    template: '%s — Krim',
  },
  description:
    'KrimOS is the operating system for regulated operations: AI co-workers whose every action is validated before it executes — and that learn from everything they do, inside your own walls.',
  icons: {
    icon: [
      { url: '/brand/krim-mark.svg', type: 'image/svg+xml' },
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
