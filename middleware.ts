/**
 * Protects /admin and the admin API with HTTP Basic auth (ADMIN_USER /
 * ADMIN_PASSWORD). Basic-over-HTTPS is enough for a single-operator internal
 * dashboard. If creds aren't configured, the area is locked (503) rather than
 * left open. Runs on the edge — uses Web APIs only (no node:crypto).
 */

import { NextResponse, type NextRequest } from 'next/server'

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }

// constant-time-ish string compare (avoids early-exit timing leaks)
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export function middleware(req: NextRequest) {
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
