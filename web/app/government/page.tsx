import type { Metadata } from 'next'
import HoldingPage from '@/components/HoldingPage'

export const metadata: Metadata = {
  title: 'Government | Krim',
  description: 'Sovereign by construction: in-perimeter deployment with no foreign API in the loop, validation as administrative-law accountability, and an immutable trail built for public scrutiny.',
  robots: { index: false }, // holding page — index when the real page ships
}

export default function Page() {
  return <HoldingPage eyebrow='The second domain' title='Government' line='Sovereign by construction: in-perimeter deployment with no foreign API in the loop, validation as administrative-law accountability, and an immutable trail built for public scrutiny.' cta='conversation' />
}
