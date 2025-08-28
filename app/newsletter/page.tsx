"use client"

import { Suspense, useEffect, useRef } from "react"
import Navigation from "@/components/navigation"
import NewsletterForm from "@/components/newsletter-form"

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
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Join the Newsletter</h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Get weekly insights on business acquisition, deal breakdowns, and tactical advice straight to your inbox.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <Suspense fallback={<div>Loading...</div>}>
              <NewsletterForm />
            </Suspense>
          </div>

          <p className="text-sm text-gray-500">Join 1,000+ professionals. No spam, unsubscribe anytime.</p>
        </div>
      </div>

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
    </div>
  )
}
