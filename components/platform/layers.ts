/**
 * The KrimOS platform layers — the registry that drives the cluster's
 * breadcrumb, the recurring architecture glyph, and prev/next navigation.
 * Order is the reading order: the brain, the vocabulary, the co-workers,
 * then the two human-facing interfaces. (Kupa and Krimkar are the surfaces
 * the interfaces live in — named on the pages, not separate routes.)
 * Facts: docs/krim-content.md · docs/copy/platform*.md.
 */

export type LayerSlug = 'kendra' | 'kriya' | 'karta' | 'kula' | 'kira'

export type Layer = {
  slug: LayerSlug
  name: string
  eyebrow: string
  /** one-line role, for the glyph caption + prev/next cards */
  oneLiner: string
  tag: string
}

export const LAYERS: Layer[] = [
  { slug: 'kendra', name: 'Kendra', eyebrow: 'The runtime', oneLiner: 'The brain — validates every action, learns from every outcome.', tag: 'RUNTIME' },
  { slug: 'kriya', name: 'Kriya', eyebrow: 'The vocabulary', oneLiner: '250+ validated, credit-native action primitives.', tag: 'PRIMITIVES' },
  { slug: 'karta', name: 'Karta', eyebrow: 'The co-workers', oneLiner: 'Intelligent co-workers, composed from primitives.', tag: 'CO-WORKERS' },
  { slug: 'kula', name: 'Kula', eyebrow: 'For your teams', oneLiner: 'Talk to your operation, in plain language — in Kupa.', tag: 'ENTERPRISE INTERFACE' },
  { slug: 'kira', name: 'Kira', eyebrow: 'For your customers', oneLiner: 'One relationship across every channel — in the Krimkar app.', tag: 'CUSTOMER ADVISOR' },
]

export function layerBySlug(slug: LayerSlug): Layer {
  return LAYERS.find((l) => l.slug === slug)!
}

export function layerIndex(slug: LayerSlug): number {
  return LAYERS.findIndex((l) => l.slug === slug)
}

export function prevNext(slug: LayerSlug): { prev: Layer | null; next: Layer | null } {
  const i = layerIndex(slug)
  return { prev: i > 0 ? LAYERS[i - 1] : null, next: i < LAYERS.length - 1 ? LAYERS[i + 1] : null }
}
