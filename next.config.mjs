/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve modern formats from the image optimizer (smaller payloads → better LCP).
  // Requires a runtime that runs the Next image optimizer in production (e.g. Vercel/Node).
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
