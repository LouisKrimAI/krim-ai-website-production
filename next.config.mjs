/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve modern formats from the image optimizer (smaller payloads → better LCP).
  // Requires a runtime that runs the Next image optimizer in production (e.g. Vercel/Node).
  images: {
    // Dev only: skip the on-demand optimizer (sharp re-encodes every image per
    // request — the main cause of slow image loads on localhost). Every site
    // image is already a pre-shrunk webp via scripts/optimize_images.py, so
    // serving the raw file in dev is instant. Production is unaffected.
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/avif', 'image/webp'],
    // Optimised article art is immutable (addressed by path) — cache the generated
    // variants for a year instead of the default 60s so prod first-hit cost is paid once.
    minimumCacheTTL: 31536000,
    // Cap the candidate ladder so a DPR-3 phone lands on a ~2x variant, not a 4K
    // monster, while wide desktops still get a crisp full-bleed band.
    deviceSizes: [400, 640, 828, 1080, 1200, 1600, 1920, 2560],
    imageSizes: [200, 400, 640],
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
