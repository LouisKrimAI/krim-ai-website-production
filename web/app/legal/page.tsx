import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Legal | Krim',
  description: 'Privacy, terms and cookie policies for krim.ai.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='Legal' title='Legal' line='Privacy, terms and cookie policies for krim.ai.' cta='demo' />
}
