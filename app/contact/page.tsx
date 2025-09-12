import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact - Let's Connect | Acquire & Build",
  description:
    "Got a question, partnership idea, or just want to say hey? Whether you're searching for your first business or building post-close — I'd love to hear from you.",
  keywords: [
    "contact acquire and build",
    "business acquisition questions",
    "partnership opportunities",
    "business acquisition consulting",
    "get in touch",
  ],
  openGraph: {
    title: "Contact Acquire & Build",
    description: "Get in touch about business acquisition, partnerships, or questions about buying a business.",
    type: "website",
    url: "https://www.acquiretobuild.com/contact",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Acquire & Build",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Acquire & Build",
    description: "Get in touch about business acquisition, partnerships, or questions about buying a business.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.acquiretobuild.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Contact Page Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://www.acquiretobuild.com/contact#contactpage",
            name: "Contact Acquire & Build",
            description: "Get in touch about business acquisition, partnerships, or questions about buying a business.",
            url: "https://www.acquiretobuild.com/contact",
            isPartOf: {
              "@id": "https://www.acquiretobuild.com/#website",
            },
            mainEntity: {
              "@type": "Organization",
              "@id": "https://www.acquiretobuild.com/#organization",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.acquiretobuild.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Contact",
                  item: "https://www.acquiretobuild.com/contact",
                },
              ],
            },
          }),
        }}
      />
      <ContactPageClient />
    </>
  )
}
