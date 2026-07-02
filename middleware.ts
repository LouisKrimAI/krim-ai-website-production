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
 */

import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/((?!_next/static|_next/image|favicon\\.ico|api/).*)',
  ],
}

// constant-time-ish string compare (avoids early-exit timing leaks)
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

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
