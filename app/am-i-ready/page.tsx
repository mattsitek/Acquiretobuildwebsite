import { Suspense } from "react"
import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import AssessmentClientPage from "./AssessmentClientPage"

export const metadata: Metadata = {
  title: "Am I Ready? - Business Acquisition Readiness Assessment | Acquire & Build",
  description:
    "Take our comprehensive assessment to determine if you're ready to buy a business. Get personalized insights on your financial readiness, experience, and deal preferences.",
  keywords: [
    "business acquisition readiness",
    "buy a business assessment",
    "business buyer readiness test",
    "acquisition financing calculator",
    "business acquisition quiz",
    "SBA loan readiness",
    "business buyer evaluation",
  ],
  openGraph: {
    title: "Am I Ready? - Business Acquisition Readiness Assessment",
    description:
      "Take our comprehensive assessment to determine if you're ready to buy a business. Get personalized insights and recommendations.",
    type: "website",
    url: "https://acquireandbuild.com/am-i-ready",
  },
  alternates: {
    canonical: "https://acquireandbuild.com/am-i-ready",
  },
}

export default function AmIReadyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Am I Ready to Buy a Business?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive assessment to evaluate your readiness for business acquisition. Get personalized
            insights on financing, deal structure, and next steps.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <AssessmentClientPage />
        </Suspense>
      </div>
    </div>
  )
}
