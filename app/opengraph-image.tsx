import { ImageResponse } from 'next/og'

/**
 * Default Open Graph + Twitter card for the whole site (Next file convention:
 * app/opengraph-image.tsx applies to every route unless a route overrides it).
 * Rendered at build via next/og — brand canvas, wordmark, tagline. 1200×630.
 */

export const alt = 'Krim — The AI your regulator can read.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#09090C',
          backgroundImage:
            'radial-gradient(58% 58% at 50% 36%, rgba(0,255,178,0.16), rgba(9,9,12,0) 70%)',
          padding: '76px 84px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: '0.32em',
            color: '#828791',
          }}
        >
          KRIM.AI
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 128,
              fontWeight: 800,
              color: '#00FFB2',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            KRIM
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 30,
              fontSize: 54,
              color: '#F6F6F4',
              lineHeight: 1.12,
              maxWidth: 920,
            }}
          >
            The AI your regulator can read.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: '#A9ADB6' }}>
          The operating system for regulated operations.
        </div>
      </div>
    ),
    { ...size },
  )
}
