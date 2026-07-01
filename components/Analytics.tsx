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
        <>
          {/* Extended Plausible script — includes outbound-links, file-downloads,
              form-submissions. Custom URL is tied to the Krim Plausible site;
              rotate here if the site is re-registered. */}
          <Script
            async
            data-domain={plausible}
            src="https://plausible.io/js/pa-PSXmeR1239Y3AAsgVTBZy.js"
            strategy="afterInteractive"
          />
          {/* Init snippet — copied verbatim from the Plausible dashboard for the
              Krim site. Enables the plausible() function for custom events and
              is what Plausible's "Verify Script installation" check matches on. */}
          <Script id="plausible-init" strategy="afterInteractive">
            {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
          </Script>
        </>
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
