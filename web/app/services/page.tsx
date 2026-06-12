import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Services | Krim',
  description: 'From a two-week technical deep-dive to a 30-day proof of value to a 60-to-90-day pilot-to-go-live — each step with its own exit criteria.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='Engagement' title='Services' line='From a two-week technical deep-dive to a 30-day proof of value to a 60-to-90-day pilot-to-go-live — each step with its own exit criteria.' cta='demo' />
}
