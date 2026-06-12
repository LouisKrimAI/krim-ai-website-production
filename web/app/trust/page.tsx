import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Sovereign. Compliant. Auditable. | Krim',
  description: 'Three deployment modes, the security posture, frameworks stated honestly, and the audit experience — ledger replay, inspection responses in minutes.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='Trust & security' title='Sovereign. Compliant. Auditable.' line='Three deployment modes, the security posture, frameworks stated honestly, and the audit experience — ledger replay, inspection responses in minutes.' cta='demo' />
}
