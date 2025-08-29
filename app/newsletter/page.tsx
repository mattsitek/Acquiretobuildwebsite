"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"

export default function NewsletterPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Add custom styles to make the iframe seamless
    const iframe = iframeRef.current
    if (iframe) {
      iframe.onload = () => {
        try {
          // This will only work if the iframe content allows it
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
          if (iframeDoc) {
            // Add custom CSS to match your site's styling
            const style = iframeDoc.createElement("style")
            style.textContent = `
              body { 
                font-family: Inter, system-ui, sans-serif !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              /* Add more custom styles as needed */
            `
            iframeDoc.head.appendChild(style)
          }
        } catch (e) {
          // Cross-origin restrictions prevent styling
          console.log("Cannot style iframe due to cross-origin restrictions")
        }
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Structured Data for Newsletter */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://acquireandbuild.com/newsletter#webpage",
            name: "Newsletter - Acquire & Build",
            description:
              "Subscribe to the Acquire & Build newsletter for weekly insights on business acquisition, financing strategies, and deal breakdowns.",
            isPartOf: {
              "@id": "https://acquireandbuild.com/#website",
            },
            mainEntity: {
              "@type": "Newsletter",
              "@id": "https://acquireandbuild.com/newsletter#newsletter",
              name: "Acquire & Build Newsletter",
              description:
                "Weekly newsletter covering business acquisition strategies, deal breakdowns, and financing tactics",
              publisher: {
                "@id": "https://acquireandbuild.com/#organization",
              },
              audience: {
                "@type": "Audience",
                audienceType: "Business Professionals, Entrepreneurs, Aspiring Business Owners",
              },
            },
            potentialAction: {
              "@type": "SubscribeAction",
              target: "https://acquireandbuild.beehiiv.com/",
              object: {
                "@type": "Newsletter",
                name: "Acquire & Build Newsletter",
              },
            },
          }),
        }}
      />

      {/* Navigation - NEW: Replace the old inline nav */}
      <Navigation />
      
      {/* Newsletter Embed */}
      <div className="w-full" style={{ height: "calc(100vh - 64px)" }}>
        <iframe
          ref={iframeRef}
          src="https://acquireandbuild.beehiiv.com/"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Acquire & Build Newsletter Subscription"
          className="w-full h-full"
          loading="lazy"
          aria-label="Newsletter subscription form"
        />
      </div>
    </div>
  )
}
