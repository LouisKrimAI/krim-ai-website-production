/**
 * The five-layer registry — single source for the hub, the stack rail,
 * and prev/next navigation. Order is the stack order, bottom-up
 * (krim-content.md: capability composes from the bottom up).
 */

export type Layer = {
  slug: string
  sanskrit: string
  english: string
  one: string // one confident line (hub + rail tooltips)
}

export const LAYERS: Layer[] = [
  {
    slug: 'kendra',
    sanskrit: 'Kendra',
    english: 'The runtime',
    one: 'The intelligence substrate — seven modules that make the guarantees hold.',
  },
  {
    slug: 'kriya',
    sanskrit: 'Kriya',
    english: 'Action primitives',
    one: '250+ validated, credit-native primitives — the metered vocabulary every co-worker is built from.',
  },
  {
    slug: 'karta',
    sanskrit: 'Karta',
    english: 'AI co-workers',
    one: 'Eight utility co-workers, composed from primitives — operational decisioning, never underwriting.',
  },
  {
    slug: 'kupa',
    sanskrit: 'Kupa',
    english: 'Command center',
    one: 'The glass cockpit — Kula turns intent into governed strategy; humans supervise, configure, audit.',
  },
  {
    slug: 'krimkar',
    sanskrit: 'Krimkar',
    english: 'Consumer surface',
    one: 'Kira — one relationship across the whole lifecycle, on every channel, in 50+ Indian languages.',
  },
]

export const layerIndex = (slug: string) => LAYERS.findIndex((l) => l.slug === slug)
