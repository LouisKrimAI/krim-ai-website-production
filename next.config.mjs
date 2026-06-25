/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve modern formats from the image optimizer (smaller payloads → better LCP).
  // Requires a runtime that runs the Next image optimizer in production (e.g. Vercel/Node).
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // KrimOS moved from /platform → /krimos (it is "KrimOS", never "the platform").
  // Permanently redirect the old paths so existing links never 404.
  async redirects() {
    return [
      { source: '/platform', destination: '/krimos', permanent: true },
      { source: '/platform/:slug', destination: '/krimos/:slug', permanent: true },
    ]
  },
}

export default nextConfig
