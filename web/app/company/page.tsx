import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Krim | Krim',
  description: 'A technology research, product and services company across the US, UK and India — and the thinking behind the name.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='The company' title='Krim' line='A technology research, product and services company across the US, UK and India — and the thinking behind the name.' cta='demo' />
}
