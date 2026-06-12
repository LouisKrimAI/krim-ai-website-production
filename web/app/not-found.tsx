import Link from 'next/link'
import { KrimMark } from '@/components/HeroArrival'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="max-w-[520px] text-center">
        <div className="text-ink text-[14px] inline-block mb-10"><KrimMark /></div>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber mb-5">Verdict · not on the record</p>
        <h1 className="font-serif font-light text-ink text-[clamp(2rem,5vw,3rem)] leading-tight mb-5">
          This page hasn&rsquo;t cleared validation.
        </h1>
        <p className="font-sans text-[15px] leading-[1.7] text-ink-2 mb-9">
          Either it doesn&rsquo;t exist, or it arrives in a later phase of the build.
          Every page that does exist is on the record.
        </p>
        <Link href="/" className="font-sans inline-block text-[14px] font-medium px-6 py-3 bg-ink text-paper hover:-translate-y-0.5 transition-transform">
          Back to the start
        </Link>
      </div>
    </main>
  )
}
