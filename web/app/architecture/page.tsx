import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Architecture | Krim',
  description: 'The runtime loop in technical depth: agent lifecycle, four memory tiers, durable orchestration, the 15-entity domain model, and the 40+ connector integration fabric.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='For engineers' title='Architecture' line='The runtime loop in technical depth: agent lifecycle, four memory tiers, durable orchestration, the 15-entity domain model, and the 40+ connector integration fabric.' cta='demo' />
}
