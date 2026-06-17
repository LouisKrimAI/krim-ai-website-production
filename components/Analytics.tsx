'use client'

/**
 * Analytics — vendor-neutral and env-driven. Renders nothing unless a key is set,
 * so dev/preview stay clean and no tracking ID is ever hard-coded. Configure ONE:
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN  (privacy-friendly, cookieless)  e.g. krim.ai
 *   NEXT_PUBLIC_GA_ID             (Google Analytics 4)            e.g. G-XXXXXXX
 * Both are inlined at build time. See .env.example.
 */

import Script from 'next/script'

export default function Analytics() {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const ga = process.env.NEXT_PUBLIC_GA_ID

  return (
    <>
      {plausible ? (
        <Script
          defer
          data-domain={plausible}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}

      {ga ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      ) : null}
    </>
  )
}
