"use client"

import { useState } from "react"
import { BusinessSnapshot } from "./business-snapshot"
import { OwnerInvolvement } from "./owner-involvement"
import { DealTerms } from "./deal-terms"
import { ResultsSummary } from "./results-summary"
import { EmailGate } from "./email-gate"
import { calculateScores, type FormData, type ScoreResults } from "./calculations"
import { Button } from "@/components/ui/button"
import { subscribeToScorecard } from "@/app/actions/scorecard"

const initialData: FormData = {
  industry: "",
  yearsInBusiness: 5,
  annualRevenue: 0,
  ebitda: 0,
  ownerSalary: 0,
  purchasePrice: 0,
  hasRealEstate: false,
  hasEquipment: false,
  assetValue: 0,
  ownerInvolvement: 3,
  runsWithoutOwner: "",
  hasSecondInCommand: "",
  financialRecords: "",
  sops: "",
  downPayment: 0,
  conventionalLoan: 0,
  sba7a: 0,
  sba504: 0,
  sellerNote: 0,
}

export function DealScorecardSection() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [emailGateOpen, setEmailGateOpen] = useState(false)
  const [emailCaptured, setEmailCaptured] = useState(false)
  const [scores, setScores] = useState<ScoreResults | null>(null)

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (step === 0) {
      if (!formData.industry) newErrors.industry = "Industry is required"
      if (!formData.annualRevenue) newErrors.annualRevenue = "Annual revenue is required"
      if (!formData.ebitda) newErrors.ebitda = "EBITDA is required"
      if (!formData.purchasePrice) newErrors.purchasePrice = "Purchase price is required"
      if (formData.ebitda + (formData.ownerSalary || 0) > formData.annualRevenue) {
        newErrors.ebitdaWarning = "EBITDA plus salary exceeds revenue"
      }
    } else if (step === 1) {
      if (!formData.runsWithoutOwner) newErrors.runsWithoutOwner = "Required"
      if (!formData.hasSecondInCommand) newErrors.hasSecondInCommand = "Required"
      if (!formData.financialRecords) newErrors.financialRecords = "Required"
      if (!formData.sops) newErrors.sops = "Required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validate()) return
    if (step === 1 && !emailCaptured) {
      setEmailGateOpen(true)
      return
    }
    if (step === 2) {
      setScores(calculateScores(formData))
    }
    setStep((s) => s + 1)
  }

  const handlePrev = () => {
    setStep((s) => Math.max(0, s - 1))
  }

  const handleEmailCapture = async (email: string) => {
    const fd = new FormData()
    fd.append("email", email)
    await subscribeToScorecard(fd)
    setEmailCaptured(true)
    setEmailGateOpen(false)
    setStep(2)
  }

  return (
    <section className="py-16" id="deal-scorecard">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">Deal Scorecard</h2>
        {step === 0 && (
          <BusinessSnapshot formData={formData} updateFormData={updateFormData} errors={errors} />
        )}
        {step === 1 && (
          <OwnerInvolvement formData={formData} updateFormData={updateFormData} errors={errors} />
        )}
        {step === 2 && (
          <DealTerms
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            emailCaptured={emailCaptured}
          />
        )}
        {step === 3 && scores && (
          <ResultsSummary scores={scores} formData={formData} showCashFlow={emailCaptured} />
        )}

        {step < 3 && (
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <Button variant="outline" onClick={handlePrev}>
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button onClick={handleNext}>{step === 2 ? "Calculate" : "Next"}</Button>
          </div>
        )}

        {emailGateOpen && (
          <EmailGate
            onEmailCapture={handleEmailCapture}
            onClose={() => setEmailGateOpen(false)}
          />
        )}
      </div>
    </section>
  )
}
