/**
 * Edge middleware — two responsibilities:
 *
 * 1. HTTP Basic auth on /admin and /api/admin (single-operator dashboard).
 *    If creds aren't configured the area returns 503 rather than open access.
 *
 * 2. Cache-Control: no-store on all HTML page routes.
 *    Vercel's Next.js framework layer sets `public, max-age=0, must-revalidate`
 *    by default, which Chrome stores in its memory cache and serves stale within
 *    a session even when ignoring must-revalidate. Middleware runs at the edge
 *    before framework headers and takes precedence. Static assets (_next/static)
 *    keep their own immutable headers — excluded from the matcher below.
 *
 * 3. Apex → www redirect, with a carve-out for the service-worker kill switch.
 *    A pre-Next deployment of krim.ai registered a service worker in visitors'
 *    browsers that still serves the old site from Cache Storage on the apex
 *    origin. The worker is only evicted when its update check fetches a
 *    replacement script from the SAME path on the SAME origin — a redirect
 *    there counts as a failed check and keeps the zombie alive indefinitely.
 *    So /service-worker.js and /sw.js must return 200 on the apex (the
 *    self-destroying workers in public/), while every other apex request
 *    redirects to www. Requires the Vercel dashboard redirect for krim.ai to
 *    be DISABLED so these requests reach the app at all.
 */

import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    // Excludes static assets (their Cache-Control comes from vercel.json) so
    // every image/logo request doesn't invoke the edge function. The SW
    // kill-switch files at the root (/service-worker.js, /sw.js) still match.
    '/((?!_next/static|_next/image|favicon\\.ico|api/|images/|brand/|videos/|decks/|resources/).*)',
  ],
}

// constant-time-ish string compare (avoids early-exit timing leaks)
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

const KILL_SWITCH_PATHS = ['/service-worker.js', '/sw.js']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const host = req.headers.get('host') ?? ''

  // ── Apex domain: serve the SW kill switch, redirect everything else ────────
  if (host === 'krim.ai') {
    if (KILL_SWITCH_PATHS.includes(pathname)) {
      const res = NextResponse.next()
      // update checks must always see the current script, never a cached one
      res.headers.set('Cache-Control', 'no-store')
      return res
    }
    const url = req.nextUrl.clone()
    url.protocol = 'https'
    url.host = 'www.krim.ai'
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  // ── Admin auth ──────────────────────────────────────────────────────────────
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const user = process.env.ADMIN_USER
    const pass = process.env.ADMIN_PASSWORD
    if (!user || !pass) {
      return new NextResponse('Admin dashboard is not configured.', { status: 503 })
    }
    const header = req.headers.get('authorization') || ''
    const expected = `Basic ${btoa(`${user}:${pass}`)}`
    if (!header.startsWith('Basic ') || !safeEqual(header, expected)) {
      return new NextResponse('Authentication required.', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Krim Admin", charset="UTF-8"' },
      })
    }
    return NextResponse.next()
  }

  // ── No-store for all HTML page routes ───────────────────────────────────────
  const res = NextResponse.next()
  res.headers.set('Cache-Control', 'no-store')
  return res
}
