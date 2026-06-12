import type { Metadata } from 'next'
import { Newsreader, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

/**
 * Type system (locked, Phase 2): Newsreader display · Inter body · IBM Plex
 * Mono for everything the machine says. Self-hosted via next/font — no FOUC,
 * no layout shift, no third-party request.
 */
const display = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: 'variable',
  variable: '--font-display',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-body',
  display: 'swap',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://krim.ai'),
  title: 'Krim — The AI your regulator can read',
  description:
    'KrimOS is the agent-native operating system for end-to-end lending operations. Every action validated before it executes — 33 validators, one immutable record. US · UK · India.',
  openGraph: {
    title: 'Krim — The AI your regulator can read',
    description:
      'The agent-native operating system for end-to-end lending operations. Every action validated before it executes.',
    url: 'https://krim.ai',
    siteName: 'Krim',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krim — The AI your regulator can read',
    description:
      'The agent-native operating system for end-to-end lending operations. Every action validated before it executes.',
  },
  robots: { index: true, follow: true },
}

// Organization JSON-LD (geo-kit.md) — sameAs placeholders are swapped when
// the social URLs arrive. [PROVIDE]
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Krim',
  url: 'https://krim.ai',
  description:
    'Krim is a technology research, product and services company operating across the US, UK and India. Its product, KrimOS, is the agent-native operating system for end-to-end lending operations, where every action is validated before it executes.',
  areaServed: ['US', 'GB', 'IN'],
  email: 'sales@krim.ai',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-510-345-5686',
    email: 'sales@krim.ai',
    contactType: 'sales',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        {children}
      </body>
    </html>
  )
}
