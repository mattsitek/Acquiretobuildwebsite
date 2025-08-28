"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BusinessSnapshot } from "@/components/business-snapshot"
import { OwnerInvolvement } from "@/components/owner-involvement"
import { DealTerms } from "@/components/deal-terms"
import { ResultsSummary } from "@/components/results-summary"
import { EmailGate } from "@/components/email-gate"
import { calculateScores, type FormData, type ScoreResults } from "@/app/lib/calculations"
import { trackUTMParams } from "@/app/lib/analytics"
import Navigation from "@/components/navigation"

interface DealScorecardProps {
  showNavigation?: boolean
}

export default function DealScorecard({ showNavigation = true }: DealScorecardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [emailCaptured, setEmailCaptured] = useState(false)
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})
  const [datocmsId, setDatocmsId] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    // Business Snapshot
    industry: "",
    yearsInBusiness: 10,
    annualRevenue: 0,
    ebitda: 0,
    ownerSalary: 0,
    hasRealEstate: false,
    hasEquipment: false,
    assetValue: 0,
    purchasePrice: 0,

    // Owner Involvement
    ownerInvolvement: 3,
    runsWithoutOwner: "",
    hasSecondInCommand: "",
    financialRecords: "",
    sops: "",

    // Deal Terms (gated)
    email: "",
    downPayment: 0,
    conventionalLoan: 0,
    sba7a: 0,
    sba504: 0,
    sellerNote: 0,
  })

  const [scores, setScores] = useState<ScoreResults | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Track UTM parameters on mount
  useEffect(() => {
    const params = trackUTMParams()
    setUtmParams(params)
  }, [])

  // Calculate scores whenever form data changes
  useEffect(() => {
    if (formData.industry && formData.annualRevenue > 0 && formData.ebitda >= 0 && formData.purchasePrice > 0) {
      const calculatedScores = calculateScores(formData)
      setScores(calculatedScores)
    } else if (
      formData.ownerInvolvement ||
      formData.runsWithoutOwner ||
      formData.hasSecondInCommand ||
      formData.financialRecords ||
      formData.sops
    ) {
      // Calculate partial scores for Owner Dependency even if business snapshot isn't complete
      const calculatedScores = calculateScores(formData)
      setScores(calculatedScores)
    }
  }, [formData])

  // Second API call when financing data changes
  useEffect(() => {
    const hasFinancingData =
      formData.downPayment > 0 ||
      formData.conventionalLoan > 0 ||
      formData.sba7a > 0 ||
      formData.sba504 > 0 ||
      formData.sellerNote > 0

    // Only make update call if we have DatoCMS ID, email captured, and financing data
    if (datocmsId && emailCaptured && hasFinancingData && scores) {
      const updateFinancingData = async () => {
        try {
          await fetch("/api/leads/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              datocmsId,
              leadData: {
                ...formData,
                scores,
              },
            }),
          })
          console.log("✅ Financing data updated in DatoCMS")
        } catch (error) {
          console.error("❌ Error updating financing data:", error)
        }
      }

      // Debounce the update call to avoid too many requests
      const timeoutId = setTimeout(updateFinancingData, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [formData])

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.industry) newErrors.industry = "Industry is required"
      if (formData.annualRevenue <= 0) newErrors.annualRevenue = "Revenue must be greater than 0"
      if (formData.ebitda < 0) newErrors.ebitda = "EBITDA cannot be negative"
      if (formData.purchasePrice <= 0) newErrors.purchasePrice = "Purchase price must be greater than 0"

      // Warning for EBITDA + salary exceeding revenue
      if (formData.ebitda + formData.ownerSalary > formData.annualRevenue) {
        newErrors.ebitdaWarning = "EBITDA + Owner Salary exceeds revenue"
      }
    }

    if (step === 2) {
      if (!formData.runsWithoutOwner) newErrors.runsWithoutOwner = "This field is required"
      if (!formData.hasSecondInCommand) newErrors.hasSecondInCommand = "This field is required"
      if (!formData.financialRecords) newErrors.financialRecords = "This field is required"
      if (!formData.sops) newErrors.sops = "This field is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).filter((key) => key !== "ebitdaWarning").length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        setShowEmailGate(true)
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, 3))
      }
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleEmailCapture = async (email: string) => {
    try {
      // Update form data with email
      updateFormData({ email })

      // Send to DatoCMS and Zapier webhook
      const leadData = {
        ...formData,
        email,
        scores,
        utmParams,
        timestamp: new Date().toISOString(),
      }

      // DatoCMS integration
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      })

      const result = await response.json()

      // Store the DatoCMS record ID for future updates
      if (result.success && result.datocms_id) {
        setDatocmsId(result.datocms_id)
      }

      // Zapier webhook
      await fetch(process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      })

      setEmailCaptured(true)
      setShowEmailGate(false)
      setCurrentStep(3)
    } catch (error) {
      console.error("Error capturing email:", error)
    }
  }

  const progressPercentage = ((currentStep - 1) / 2) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Conditionally show navigation */}
      {showNavigation && <Navigation />}

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-black mb-4">Deal Scorecard</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Get an instant business valuation and risk assessment to make smarter acquisition decisions
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between text-sm font-medium text-muted-foreground mb-3">
              <span className={currentStep >= 1 ? "text-primary font-semibold" : ""}>Business Snapshot</span>
              <span className={currentStep >= 2 ? "text-primary font-semibold" : ""}>Owner Involvement</span>
              <span className={currentStep >= 3 ? "text-primary font-semibold" : ""}>Deal Terms</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm border-border">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-black">Step {currentStep} of 3</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {currentStep === 1 && (
                    <BusinessSnapshot formData={formData} updateFormData={updateFormData} errors={errors} />
                  )}

                  {currentStep === 2 && (
                    <OwnerInvolvement formData={formData} updateFormData={updateFormData} errors={errors} />
                  )}

                  {currentStep === 3 && (
                    <DealTerms
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={errors}
                      emailCaptured={emailCaptured}
                    />
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="px-8 py-3 font-semibold bg-transparent"
                    >
                      Previous
                    </Button>

                    {currentStep < 3 ? (
                      <Button onClick={nextStep} className="px-8 py-3 font-semibold bg-primary hover:bg-primary/90">
                        {currentStep === 2 ? "Unlock Cash Flow Analysis" : "Next"}
                      </Button>
                    ) : (
                      <Button onClick={() => setCurrentStep(1)} variant="outline" className="px-8 py-3 font-semibold">
                        Start Over
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-1">
              {scores && <ResultsSummary scores={scores} formData={formData} showCashFlow={emailCaptured} />}
            </div>
          </div>

          {/* Email Gate Modal */}
          {showEmailGate && <EmailGate onEmailCapture={handleEmailCapture} onClose={() => setShowEmailGate(false)} />}
        </div>
      </div>
    </div>
  )
}
