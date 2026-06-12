import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Insights | Krim',
  description: 'Essays and notes from the Krim team, aggregated from our publications.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='Writing' title='Insights' line='Essays and notes from the Krim team, aggregated from our publications.' cta='demo' />
}
