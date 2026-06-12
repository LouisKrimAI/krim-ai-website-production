import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Lending | Krim',
  description: 'The world model of lending operations made concrete: the lifecycle on one runtime, eight operating roles, impact as calibrated ranges — and the learning curve that compounds from go-live.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='The flagship domain' title='Lending' line='The world model of lending operations made concrete: the lifecycle on one runtime, eight operating roles, impact as calibrated ranges — and the learning curve that compounds from go-live.' cta='demo' />
}
