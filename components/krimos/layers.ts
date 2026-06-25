/**
 * The KrimOS platform layers — the registry that drives the cluster's
 * breadcrumb, the recurring architecture glyph, and prev/next navigation.
 * Order is the reading order, bottom-up: the runtime, the vocabulary, the
 * co-workers, the command center, then the two human-facing interfaces.
 * (Krimkar is the consumer app Kira lives in — covered on Kira's page.)
 * Facts: docs/krim-content.md · docs/copy/krimos*.md.
 */

export type LayerSlug = 'kendra' | 'kriya' | 'karta' | 'kupa' | 'kula' | 'kira'

export type Layer = {
  slug: LayerSlug
  name: string
  eyebrow: string
  /** one-line role, for the glyph caption + prev/next cards */
  oneLiner: string
  tag: string
}

export const LAYERS: Layer[] = [
  { slug: 'kendra', name: 'Kendra', eyebrow: 'When it has to be right', oneLiner: 'The brain — validates every action, learns from every outcome.', tag: 'RUNTIME' },
  { slug: 'kriya', name: 'Kriya', eyebrow: 'What it can do', oneLiner: '500+ validated, credit-native action primitives.', tag: 'PRIMITIVES' },
  { slug: 'karta', name: 'Karta', eyebrow: 'Who does the work', oneLiner: 'Intelligent co-workers, composed from primitives.', tag: 'CO-WORKERS' },
  { slug: 'kupa', name: 'Kupa', eyebrow: 'Where you stay in control', oneLiner: 'The glass cockpit — supervise, configure, monitor and audit every action.', tag: 'COMMAND CENTER' },
  { slug: 'kula', name: 'Kula', eyebrow: 'For your teams', oneLiner: 'Ask in plain language; the runtime proposes the work and waits for your sign-off.', tag: 'ENTERPRISE INTERFACE' },
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
