/**
 * ArticleImage — an in-article image shown normally (the whole picture), instead
 * of the cropped CinematicBand strip. The insight art is portrait, so it sits
 * contained and centred at a calm width, rounded, with a light brand wash. Accepts
 * CinematicBand's prop shape so it's a drop-in swap; the band-only props
 * (heightClass, objectPosition, eyebrow, caption) are accepted and ignored.
 *
 * Dimensions + an inline blur placeholder come from the shared, generated
 * lib/cinematic-images metadata, so the box never shifts and the image feels
 * instant: the blur paints immediately while the full webp streams in.
 *
 * Server component — no client JS.
 */

import Image from 'next/image'
import { CINEMATIC } from '@/lib/cinematic-images'

type Props = {
  src: string
  alt: string
  tint?: 'cyan' | 'mint'
  /** set for the article header image — it's the LCP element, so it must not lazy-load */
  priority?: boolean
  // accepted for drop-in compatibility with CinematicBand; not used here
  heightClass?: string
  objectPosition?: string
  eyebrow?: string
  caption?: string
}

export default function ArticleImage({ src, alt, tint = 'cyan', priority = false }: Props) {
  const meta = CINEMATIC[src]
  const w = meta?.w ?? 1137
  const h = meta?.h ?? 1600
  const wash = tint === 'mint' ? 'rgba(0,255,178,0.07)' : 'rgba(57,214,255,0.07)'
  return (
    <figure className="mx-auto my-4 w-full max-w-[440px] px-6">
      <div className="relative overflow-hidden rounded-2xl border border-soft">
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          sizes="(max-width: 480px) 100vw, 440px"
          quality={72}
          priority={priority}
          placeholder={meta?.blur ? 'blur' : 'empty'}
          blurDataURL={meta?.blur}
          className="h-auto w-full"
        />
        <div aria-hidden className="absolute inset-0" style={{ background: wash }} />
      </div>
    </figure>
  )
}
