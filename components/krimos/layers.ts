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
  { slug: 'kendra', name: 'Kendra', eyebrow: 'The runtime. It validates every action before it runs, and learns from every outcome.', oneLiner: 'The brain: validates every action, learns from every outcome.', tag: 'RUNTIME' },
  { slug: 'kriya', name: 'Kriya', eyebrow: 'The vocabulary of lending: 500+ credit-native actions, each with its checks built in.', oneLiner: 'The validated, credit-native actions co-workers are built from.', tag: 'PRIMITIVES' },
  { slug: 'karta', name: 'Karta', eyebrow: 'The AI co-workers that run the lending lifecycle, held to measured outcomes.', oneLiner: 'The AI co-workers, composed from validated primitives.', tag: 'CO-WORKERS' },
  { slug: 'kupa', name: 'Kupa', eyebrow: 'The command center where your teams supervise, configure and audit every action.', oneLiner: 'Supervise, configure and audit every action from one place.', tag: 'COMMAND CENTER' },
  { slug: 'kula', name: 'Kula', eyebrow: 'Your teams ask in plain language, and sign off before anything runs.', oneLiner: 'Ask in plain language; the runtime proposes, you sign off before anything runs.', tag: 'ENTERPRISE INTERFACE' },
  { slug: 'kira', name: 'Kira & Krimkar', eyebrow: 'The advisor your customers meet: one relationship across every channel.', oneLiner: 'One relationship across every channel, in the Krimkar app.', tag: 'CUSTOMER ADVISOR' },
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
