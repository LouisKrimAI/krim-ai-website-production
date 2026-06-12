import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Epistemic AI | Krim',
  description: 'The definition Krim works from: AI whose every action is validated before it fires — and whose reasoning an auditor can read end to end.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='The category' title='Epistemic AI' line='The definition Krim works from: AI whose every action is validated before it fires — and whose reasoning an auditor can read end to end.' cta='demo' />
}
