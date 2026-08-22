/**
 * The KrimOS stack — the registry that drives the hub doorways, the recurring
 * architecture glyph, and prev/next navigation. Order is the DECK order
 * (KrimOS Introduction, "What's inside KrimOS"), read top-down from the apps
 * people use to the model everything rests on: the enterprise seat (Kupa &
 * Kula, one merged page at /krimos/kupa), the customer seat (Krimkar & Kira),
 * the co-workers (Karta), the engine and its gate (Kendra & Krim-Nyāya), the
 * action library (Kriya), and the foundation — Kovida, the world lending
 * model (its page lives under /research). Never describe the stack by count;
 * name the parts. Facts: docs/krim-content.md · the KrimOS Introduction deck.
 */

export type LayerSlug = 'kupa' | 'kira' | 'karta' | 'kendra' | 'kriya' | 'kovida'

export type Layer = {
  slug: LayerSlug
  /** route override — layers living outside /krimos/<slug> */
  href?: string
  name: string
  eyebrow: string
  /** one-line role, for the glyph caption + prev/next cards */
  oneLiner: string
  tag: string
}

export const LAYERS: Layer[] = [
  { slug: 'kupa', name: 'Kupa & Kula', eyebrow: 'Your teams direct the work in plain language, and hold every control.', oneLiner: 'The command center: direct the work in plain language; see, steer and prove it.', tag: 'FOR YOUR TEAMS' },
  { slug: 'kira', name: 'Krimkar & Kira', href: '/krimkar', eyebrow: 'The app your customers hold, and the advisor inside it: one relationship across every channel.', oneLiner: 'The app and advisor for your customers: one relationship across every channel.', tag: 'FOR YOUR CUSTOMERS' },
  { slug: 'karta', name: 'Karta', eyebrow: 'The AI co-workers that run the lending lifecycle, held to measured outcomes.', oneLiner: 'The AI co-workers, composed from validated primitives.', tag: 'CO-WORKERS' },
  { slug: 'kendra', name: 'Kendra', eyebrow: 'The engine, and the validation gate: Krim-Nyāya clears every action before it runs.', oneLiner: 'The engine and the gate: validates every action, learns from every outcome.', tag: 'THE ENGINE & THE GATE' },
  { slug: 'kriya', name: 'Kriya', eyebrow: 'The library of compliance-encoded actions: 500+ credit-native, checks built in.', oneLiner: 'The library of compliance-encoded actions every co-worker is built from.', tag: 'ACTION LIBRARY' },
  { slug: 'kovida', name: 'Kovida', href: '/research/world-lending-model', eyebrow: 'The world lending model at the foundation, tuned on your institution’s own outcomes.', oneLiner: 'The lending model that learns your book, at the foundation of the stack.', tag: 'WORLD LENDING MODEL' },
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
