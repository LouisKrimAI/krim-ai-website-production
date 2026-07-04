/**
 * Minimal in-memory rate limiter (fixed window per key).
 *
 * Serverless-honest: each warm instance keeps its own counters, so this is
 * burst protection rather than a precise global quota — which is exactly the
 * right posture for a public marketing-site form: it stops a script hammering
 * one instance without adding an external store to the stack.
 */

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

/** Returns true if the request is allowed, false if the key is over its limit. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  // opportunistic prune so the map can't grow unbounded on a long-lived instance
  if (buckets.size > 5000) {
    buckets.forEach((b, k) => {
      if (b.resetAt <= now) buckets.delete(k)
    })
  }
  const b = buckets.get(key)
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  b.count += 1
  return b.count <= limit
}

/** Client IP for rate-limit keying — first hop of x-forwarded-for (set by Vercel). */
export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for') || ''
  return xff.split(',')[0].trim() || 'unknown'
}
