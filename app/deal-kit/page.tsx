import type { Metadata } from "next"
import { Suspense } from "react"
import Navigation from "@/components/navigation"
import DealKitPageClient from "./DealKitPageClient"

export const metadata: Metadata = {
  title: "The Deal Kit - Free Business Acquisition Tools | Acquire & Build",
  description:
    "Get free professional business acquisition tools including LOI templates, NDAs, cold outreach scripts, and due diligence checklists. Used by 2,500+ business buyers.",
  keywords: [
    "business acquisition",
    "LOI template",
    "MNDA",
    "due diligence",
    "business buying tools",
    "acquisition templates",
    "business acquisition checklist",
    "seller financing",
    "SBA loans",
    "business valuation",
  ],
  openGraph: {
    title: "The Deal Kit - Free Business Acquisition Tools",
    description: "Professional templates, scripts, and tools to find, evaluate, and close your first acquisition",
    type: "website",
    url: "https://acquireandbuild.com/deal-kit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Deal Kit - Free Business Acquisition Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Deal Kit - Free Business Acquisition Tools",
    description: "Professional templates, scripts, and tools to find, evaluate, and close your first acquisition",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://acquireandbuild.com/deal-kit",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DealKitPage() {
  const pageContent = {
    heroBadgeText: "FREE BUSINESS ACQUISITION TOOLKIT",
    heroTitleLine1: "The Deal Kit",
    heroTitleLine2: "Everything You Need to Buy Your First Business",
    heroSubtitle:
      "Professional templates, scripts, and tools to find, evaluate, and close your first acquisition. Used by 2,500+ business buyers.",
    emailPlaceholder: "Enter your email address",
    ctaButtonText: "Send Me the Deal Kit",
    formDisclaimer: "Join 1,000+ professionals getting weekly insights. No spam, unsubscribe anytime.",
    whatsInsideTitle: "What's Inside The Deal Kit",
    whatsInsideSubtitle: "Everything you need to start acquiring businesses today",
    socialProofTitle: "Trusted by 2,500+ Business Buyers",
    comingSoonTitle: "More Tools Coming Soon",
    comingSoonSubtitle: "We're constantly adding new resources to help you succeed",
    successMessage: "🎉 Success! Check your email for The Deal Kit. It should arrive within 2 minutes.",
  }

  const tools = [
    {
      id: "1",
      toolName: "Letter of Intent (LOI) Template",
      toolDescription: "Professional LOI template used by successful acquirers",
      toolIcon: "📄",
      displayOrder: 1,
      isFeatured: true,
    },
    {
      id: "2",
      toolName: "Mutual NDA Template",
      toolDescription: "Protect confidential information during negotiations",
      toolIcon: "🔒",
      displayOrder: 2,
      isFeatured: true,
    },
    {
      id: "3",
      toolName: "Cold Outreach Scripts",
      toolDescription: "10 proven scripts to contact business owners",
      toolIcon: "📧",
      displayOrder: 3,
      isFeatured: true,
    },
    {
      id: "4",
      toolName: "Due Diligence Checklist",
      toolDescription: "Comprehensive checklist for evaluating businesses",
      toolIcon: "✅",
      displayOrder: 4,
      isFeatured: true,
    },
    {
      id: "5",
      toolName: "Financial Analysis Template",
      toolDescription: "Excel template for analyzing business financials",
      toolIcon: "📊",
      displayOrder: 5,
      isFeatured: true,
    },
    {
      id: "6",
      toolName: "Negotiation Framework",
      toolDescription: "Step-by-step guide to successful negotiations",
      toolIcon: "🤝",
      displayOrder: 6,
      isFeatured: true,
    },
  ]

  const testimonials = [
    {
      id: "1",
      testimonialText: "The Deal Kit saved me months of research. Everything I needed in one place.",
      authorName: "Sarah J.",
      authorTitle: "Business Buyer",
      starRating: 5,
      displayOrder: 1,
    },
    {
      id: "2",
      testimonialText: "Professional templates that actually work. Closed my first deal using these tools.",
      authorName: "Mike C.",
      authorTitle: "ETA MBA",
      starRating: 5,
      displayOrder: 2,
    },
    {
      id: "3",
      testimonialText: "Incredible value. These templates would cost thousands from a lawyer.",
      authorName: "Jessica R.",
      authorTitle: "Solo Searcher",
      starRating: 5,
      displayOrder: 3,
    },
  ]

  const comingSoonTools = [
    {
      id: "1",
      toolName: "SBA Loan Application Guide",
      displayOrder: 1,
      expectedRelease: "Q2 2025",
    },
    {
      id: "2",
      toolName: "Seller Financing Templates",
      displayOrder: 2,
      expectedRelease: "Q2 2025",
    },
    {
      id: "3",
      toolName: "Post-Acquisition Integration Plan",
      displayOrder: 3,
      expectedRelease: "Q3 2025",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <DealKitPageClient
          pageContent={pageContent}
          tools={tools}
          testimonials={testimonials}
          comingSoonTools={comingSoonTools}
        />
      </Suspense>
    </div>
  )
}
