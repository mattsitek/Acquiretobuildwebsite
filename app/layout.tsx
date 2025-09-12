import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.acquiretobuild.com"),
  title: {
    default: "Acquire & Build - Buy a Business, Build Your Freedom",
    template: "%s | Acquire & Build",
  },
  description:
    "Join Acquire and Build — the free newsletter + community for people ready to stop climbing the ladder and start owning the whole damn thing. Learn how to buy a business, get financing, and build your freedom.",
  keywords: [
    "buy a business",
    "business acquisition",
    "small business acquisition",
    "SBA loans",
    "business financing",
    "entrepreneurship",
    "business ownership",
    "acquire and build",
    "business buyer",
    "search fund",
    "business broker",
    "due diligence",
    "business valuation",
    "seller financing",
    "business newsletter",
  ],
  authors: [{ name: "Acquire & Build" }],
  creator: "Acquire & Build",
  publisher: "Acquire & Build",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.acquiretobuild.com",
    siteName: "Acquire & Build",
    title: "Acquire & Build - Buy a Business, Build Your Freedom",
    description:
      "Join Acquire and Build — the free newsletter + community for people ready to stop climbing the ladder and start owning the whole damn thing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Acquire & Build - Business Acquisition Newsletter",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@acquiretobuild",
    creator: "@acquiretobuild",
    title: "Acquire & Build - Buy a Business, Build Your Freedom",
    description:
      "Join the free newsletter + community for business acquisition. Learn how to buy a business and build your freedom.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://www.acquiretobuild.com",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://graphql.datocms.com" />
        <link rel="dns-prefetch" href="https://www.datocms-assets.com" />

        {/* Enhanced Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.acquiretobuild.com/#organization",
              name: "Acquire & Build",
              alternateName: "Acquire and Build",
              description: "Newsletter and community for business acquisition education and resources",
              url: "https://www.acquiretobuild.com",
              logo: {
                "@type": "ImageObject",
                "@id": "https://www.acquiretobuild.com/#logo",
                url: "https://www.acquiretobuild.com/logo.png",
                width: 400,
                height: 400,
                caption: "Acquire & Build Logo",
              },
              image: {
                "@type": "ImageObject",
                url: "https://www.acquiretobuild.com/og-image.png",
                width: 1200,
                height: 630,
              },
              sameAs: ["https://twitter.com/acquireandbuild", "https://linkedin.com/company/acquireandbuild"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://www.acquiretobuild.com/contact",
                availableLanguage: "English",
              },
              foundingDate: "2024",
              knowsAbout: [
                "Business Acquisition",
                "Small Business Ownership",
                "SBA Loans",
                "Business Financing",
                "Due Diligence",
                "Business Valuation",
                "Seller Financing",
                "Entrepreneurship",
                "Business Brokerage",
                "Search Funds",
              ],
              areaServed: {
                "@type": "Country",
                name: "United States",
              },
              audience: {
                "@type": "Audience",
                audienceType: "Business Professionals, Entrepreneurs, Aspiring Business Owners",
              },
            }),
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.acquiretobuild.com/#website",
              url: "https://www.acquiretobuild.com",
              name: "Acquire & Build",
              description:
                "Learn how to buy a business and build your freedom. Newsletter and community for business acquisition.",
              publisher: {
                "@id": "https://www.acquiretobuild.com/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.acquiretobuild.com/blog?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              inLanguage: "en-US",
            }),
          }}
        />

        {/* Additional meta tags for enhanced SEO */}
        <meta name="subject" content="Business Acquisition and Entrepreneurship" />
        <meta
          name="topic"
          content="How to buy a business, business financing, SBA loans, business acquisition strategies"
        />
        <meta
          name="summary"
          content="Acquire & Build teaches people how to buy existing businesses instead of starting from scratch. We provide tactical insights, deal breakdowns, financing strategies, and a supportive community for aspiring business owners."
        />
        <meta name="classification" content="Business Education, Entrepreneurship, Business Acquisition" />
        <meta name="owner" content="Acquire & Build" />
        <meta name="url" content="https://www.acquiretobuild.com" />
        <meta name="identifier-URL" content="https://www.acquiretobuild.com" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />

        {/* Enhanced mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Theme colors */}
        <meta name="theme-color" content="#1A73E8" />
        <meta name="msapplication-TileColor" content="#1A73E8" />

        {/* Canonical URL - will be overridden by page-specific canonical */}
        <link rel="canonical" href="https://www.acquiretobuild.com" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
