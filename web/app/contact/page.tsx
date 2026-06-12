import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Talk to Krim | Krim',
  description: 'sales@krim.ai · +1 510 345 5686 · US · UK · India. The full demo-booking flow ships with this page.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='Contact' title='Talk to Krim' line='sales@krim.ai · +1 510 345 5686 · US · UK · India. The full demo-booking flow ships with this page.' cta='demo' />
}
