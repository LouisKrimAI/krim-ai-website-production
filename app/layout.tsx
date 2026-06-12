import type { Metadata } from 'next'
import { Newsreader, Inter, IBM_Plex_Mono } from 'next/font/google'
import OrbBackdrop from '@/components/OrbBackdrop'
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://krim.ai'),
  title: {
    default: 'Krim — The AI your regulator can read',
    template: '%s | Krim',
  },
  description:
    'KrimOS is the operating system for regulated operations: AI co-workers whose every action is validated before it executes — and that learn from everything they do, inside your own walls.',
  openGraph: {
    siteName: 'Krim',
    type: 'website',
    url: 'https://krim.ai',
  },
  twitter: { card: 'summary_large_image', site: '@TheKrimAI' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <OrbBackdrop />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
