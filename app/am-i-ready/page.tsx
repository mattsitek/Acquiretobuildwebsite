"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"
import Navigation from "@/components/navigation"
import Section1 from "@/components/assessment/section-1"
import Section2 from "@/components/assessment/section-2"
import Section3 from "@/components/assessment/section-3"
import AssessmentResults from "@/components/assessment/results"
import { calculateReadinessScore, calculateDealBox } from "@/lib/assessment-logic"

export interface AssessmentData {
  // Section 1: Readiness Assessment
  motivation?: string
  timeCommitment?: string
  riskTolerance?: string

  // Section 2: Professional Background
  professionalBackground?: string
  transferableSkills?: string[]
  businessApplication?: string
  businessExperience?: string

  // Section 3: Deal Parameters
  targetIncome?: string
  capitalAvailable?: string
  industryPreference?: string
  geography?: string
  businessModel?: string
  creditScore?: string
}

export default function AmIReadyPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [results, setResults] = useState<any>(null)

  // Auto-scroll to top when section changes
  useEffect(() => {
    if (currentSection >= 0) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentSection])

  // Auto-scroll to top when results page loads
  useEffect(() => {
    if (isCompleted && results) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [isCompleted])

  const updateAssessmentData = (updates: Partial<AssessmentData>) => {
    setAssessmentData((prev) => ({ ...prev, ...updates }))
  }

  const calculateProgress = () => {
    const totalQuestions = 12 // 3 + 4 + 6 - 1 (business application is optional)
    let answered = 0

    // Section 1 (3 required)
    if (assessmentData.motivation) answered++
    if (assessmentData.timeCommitment) answered++
    if (assessmentData.riskTolerance) answered++

    // Section 2 (3 required, 1 optional)
    if (assessmentData.professionalBackground) answered++
    if (assessmentData.transferableSkills && assessmentData.transferableSkills.length > 0) answered++
    if (assessmentData.businessExperience) answered++

    // Section 3 (6 required)
    if (assessmentData.targetIncome) answered++
    if (assessmentData.capitalAvailable) answered++
    if (assessmentData.industryPreference) answered++
    if (assessmentData.geography) answered++
    if (assessmentData.businessModel) answered++
    if (assessmentData.creditScore) answered++

    return Math.round((answered / totalQuestions) * 100)
  }

  const isValidSection = (section: number): boolean => {
    switch (section) {
      case 0: // Section 1
        return !!(assessmentData.motivation && assessmentData.timeCommitment && assessmentData.riskTolerance)
      case 1: // Section 2
        return !!(
          assessmentData.professionalBackground &&
          assessmentData.transferableSkills &&
          assessmentData.transferableSkills.length > 0 &&
          assessmentData.businessExperience
        )
      case 2: // Section 3
        return !!(
          assessmentData.targetIncome &&
          assessmentData.capitalAvailable &&
          assessmentData.industryPreference &&
          assessmentData.geography &&
          assessmentData.businessModel &&
          assessmentData.creditScore
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentSection < 2) {
      setCurrentSection(currentSection + 1)
    } else {
      // Calculate results
      const readinessResults = calculateReadinessScore(assessmentData)
      const dealBoxResults = calculateDealBox(assessmentData)

      setResults({
        readiness: readinessResults,
        dealBox: dealBoxResults,
      })
      setIsCompleted(true)
    }
  }

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleRestart = () => {
    setCurrentSection(0)
    setAssessmentData({})
    setIsCompleted(false)
    setResults(null)
  }

  const progress = calculateProgress()

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <AssessmentResults results={results} onRestart={handleRestart} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KnowledgeBuyer Assessment</h1>
          <p className="text-gray-600">
            Discover your readiness to acquire a business and get your personalized deal profile
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Section {currentSection + 1} of 3:{" "}
              {currentSection === 0
                ? "Readiness Assessment"
                : currentSection === 1
                  ? "Professional Background"
                  : "Deal Parameters"}
            </span>
            <span className="text-sm text-gray-500">{progress}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Assessment Sections */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {currentSection === 0 && <Section1 data={assessmentData} onUpdate={updateAssessmentData} />}
            {currentSection === 1 && <Section2 data={assessmentData} onUpdate={updateAssessmentData} />}
            {currentSection === 2 && <Section3 data={assessmentData} onUpdate={updateAssessmentData} />}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentSection === 0}>
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isValidSection(currentSection)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentSection === 2 ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Get My Results
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
