import type { MetadataRoute } from 'next'
import { POSTS } from './insights/_posts'

/**
 * Sitemap — every indexable route, generated at build. Referenced by the
 * `Sitemap:` line in public/robots.txt. Blog posts are appended from the
 * single source of truth (app/insights/_posts.ts) so new writing is never orphaned.
 */

const BASE = 'https://krim.ai'

type Change = MetadataRoute.Sitemap[number]['changeFrequency']

const ROUTES: { path: string; priority: number; changeFrequency: Change }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/krimos', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/krimos/kendra', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/krimos/kriya', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/krimos/karta', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/krimos/kupa', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/krimos/kula', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/krimos/kira', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/lending', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/government', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/enterprise', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/msme', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/epistemic-ai', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/research', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/research/world-lending-model', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/architecture', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/trust', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/company', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticEntries = ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
  const postEntries = POSTS.map((p) => ({
    url: `${BASE}/insights/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as Change,
    priority: 0.6,
  }))
  return [...staticEntries, ...postEntries]
}
