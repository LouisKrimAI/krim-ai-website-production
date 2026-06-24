/**
 * CinematicBand — a full-width, edge-feathered cinematic image band.
 *
 * The house way to drop an emotive, high-quality image into a page without it
 * reading as a pasted rectangle: object-cover at a controlled height, a slow
 * GPU push-in (krim-band-img, reduced-motion-safe), a palette wash to unify the
 * shot with the mint/cyan grammar, top/bottom/side feathers that melt it into
 * the #09090C canvas, and an optional centred caption over a legibility scrim.
 *
 * Server component — the motion is pure CSS. Place it directly between Sections
 * (not inside one) so it runs full-bleed.
 */

import Image from 'next/image'

type Props = {
  src: string
  alt: string
  /** height utility — defaults to a calm cinematic band */
  heightClass?: string
  /** focal point for the crop, e.g. '50% 35%' */
  objectPosition?: string
  /** palette wash to unify the image with the brand */
  tint?: 'cyan' | 'mint'
  eyebrow?: string
  caption?: string
}

export default function CinematicBand({
  src,
  alt,
  heightClass = 'h-[clamp(300px,42vw,540px)]',
  objectPosition = '50% 50%',
  tint = 'cyan',
  eyebrow,
  caption,
}: Props) {
  const wash =
    tint === 'mint' ? 'rgba(0,255,178,0.12)' : 'rgba(57,214,255,0.12)'
  return (
    <div className="relative w-full overflow-hidden" role="img" aria-label={alt}>
      <div className={`relative ${heightClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={80}
          sizes="100vw"
          className="krim-band-img object-cover"
          style={{ objectPosition }}
        />
        {/* palette wash — unify the shot with the brand grammar */}
        <div aria-hidden className="absolute inset-0" style={{ background: wash }} />
        {/* base fade — heavier when text sits on top, lighter when the band is
            pure atmosphere (so a captionless image stays visible) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `rgba(9,9,12,${eyebrow || caption ? 0.48 : 0.3})` }}
        />
        {/* text scrim — only when there is a caption: darken the centre behind the
            words so the type always reads (the earlier vignette darkened the edges,
            not the centre, which is exactly where the caption sits) */}
        {(eyebrow || caption) && (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'radial-gradient(60% 66% at 50% 50%, rgba(9,9,12,0.68) 0%, rgba(9,9,12,0.22) 52%, rgba(9,9,12,0) 80%)' }}
          />
        )}
        {/* feather top + bottom into the canvas */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #09090C 0%, rgba(9,9,12,0) 24%, rgba(9,9,12,0) 68%, #09090C 100%)' }}
        />
        {/* feather the sides */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, #09090C 0%, rgba(9,9,12,0) 18%, rgba(9,9,12,0) 82%, #09090C 100%)' }}
        />
        {(eyebrow || caption) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto max-w-site px-6 text-center">
              {eyebrow && (
                <p className="font-mono text-eyebrow uppercase text-mint">{eyebrow}</p>
              )}
              {caption && (
                <p className="mx-auto mt-3 max-w-[26ch] font-serif text-display-3 leading-tight text-ink">
                  {caption}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
