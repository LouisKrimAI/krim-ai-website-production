/**
 * KrimLogoAnimated — the official animated Krim mark (horizontal lockup).
 *
 * Source of truth: the KRIM Logo Pack (docs/brand/KRIM-Logo-Pack), exported to
 * public/brand/logo/. The animated SVG is self-contained and CSS-driven — a
 * coloured dot emerges from each of the three gaps in the broken triangle,
 * glides to the validating core and back, staggered and looping ("claims
 * flowing into the validating core"). It resolves to the clean static mark
 * under prefers-reduced-motion, on its own.
 *
 * Embedded as <img> so each instance is an isolated document (no duplicate-ID
 * or keyframe collisions across header/hero/footer). "-dark" = mint outline,
 * for the dark canvas.
 */

export default function KrimLogoAnimated({
  className = '',
  title = 'Krim',
}: {
  className?: string
  title?: string
}) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    // width/height match the SVG viewBox aspect (~4.18:1) so the box is reserved before paint (no CLS)
    <img src="/brand/logo/KRIM-horizontal-animated-dark.svg" alt={title} width={5919} height={1415} className={className} />
  )
}
