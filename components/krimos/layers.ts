/**
 * The KrimOS platform layers — the registry that drives the cluster's
 * breadcrumb, the recurring architecture glyph, and prev/next navigation.
 * Order is the reading order, bottom-up: the runtime, the vocabulary, the
 * co-workers, then the two human-facing surfaces — the enterprise seat
 * (Kupa & Kula, one merged page at /krimos/kupa) and the customer seat
 * (Krimkar & Kira). Krimkar is the consumer app Kira lives in.
 * Facts: docs/krim-content.md · docs/copy/krimos*.md.
 */

export type LayerSlug = 'kendra' | 'kriya' | 'karta' | 'kupa' | 'kira'

export type Layer = {
  slug: LayerSlug
  /** route override — layers living outside /krimos/<slug> (Krimkar & Kira) */
  href?: string
  name: string
  eyebrow: string
  /** one-line role, for the glyph caption + prev/next cards */
  oneLiner: string
  tag: string
}

export const LAYERS: Layer[] = [
  { slug: 'kendra', name: 'Kendra', eyebrow: 'The runtime. It validates every action before it runs, and learns from every outcome.', oneLiner: 'The brain: validates every action, learns from every outcome.', tag: 'RUNTIME' },
  { slug: 'kriya', name: 'Kriya', eyebrow: 'The vocabulary of lending: 500+ credit-native actions, each with its checks built in.', oneLiner: 'The validated, credit-native actions co-workers are built from.', tag: 'PRIMITIVES' },
  { slug: 'karta', name: 'Karta', eyebrow: 'The AI co-workers that run the lending lifecycle, held to measured outcomes.', oneLiner: 'The AI co-workers, composed from validated primitives.', tag: 'CO-WORKERS' },
  { slug: 'kupa', name: 'Kupa & Kula', eyebrow: 'Your teams direct the work in plain language, and hold every control.', oneLiner: 'Direct the work in plain language; see, steer and prove it from one command center.', tag: 'FOR YOUR TEAMS' },
  { slug: 'kira', name: 'Krimkar & Kira', href: '/krimkar', eyebrow: 'The app your customers hold, and the advisor inside it: one relationship across every channel.', oneLiner: 'One relationship across every channel, in the Krimkar app.', tag: 'FOR YOUR CUSTOMERS' },
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
