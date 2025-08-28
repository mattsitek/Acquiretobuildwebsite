import { Suspense } from "react"
import Navigation from "@/components/navigation"
import DealKitPageClient from "./DealKitPageClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deal Kit - Business Acquisition Templates & Tools | Acquire & Build",
  description:
    "Get professional templates, scripts, and tools to find, evaluate, and close your first business acquisition. Everything you need to buy a business successfully.",
  keywords: [
    "business acquisition templates",
    "deal kit",
    "business acquisition tools",
    "LOI template",
    "due diligence checklist",
    "business valuation template",
    "acquisition scripts",
    "business buyer toolkit",
  ],
  openGraph: {
    title: "Deal Kit - Business Acquisition Templates & Tools",
    description:
      "Professional templates, scripts, and tools to find, evaluate, and close your first business acquisition.",
    type: "website",
    url: "https://acquireandbuild.com/deal-kit",
  },
  alternates: {
    canonical: "https://acquireandbuild.com/deal-kit",
  },
}

export default function DealKitPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Deal Kit</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional templates, scripts, and tools to find, evaluate, and close your first acquisition. Everything
            you need to buy a business successfully.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <DealKitPageClient />
        </Suspense>
      </div>
    </div>
  )
}
