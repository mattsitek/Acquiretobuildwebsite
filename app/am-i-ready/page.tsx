"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CheckCircle, TrendingUp, DollarSign, Target } from "lucide-react"
import { AssessmentSection1 } from "@/components/assessment/section-1"
import { AssessmentSection2 } from "@/components/assessment/section-2"
import { AssessmentSection3 } from "@/components/assessment/section-3"
import { AssessmentResults } from "@/components/assessment/results"
import { calculateReadinessScore, calculateDealBox, type AssessmentData } from "@/lib/assessment-logic"

export default function AmIReadyPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    // Section 1: Business Buying Readiness
    motivation: "",
    timeCommitment: "",
    riskTolerance: "",

    // Section 2: Professional Skills
    professionalBackground: "",
    transferableSkills: [],
    businessApplication: "",
    businessExperience: "",

    // Section 3: Deal Box Parameters
    targetIncome: "",
    capitalAvailable: "",
    industryPreference: "",
    geography: "",
    businessModel: "",
    creditScore: "",
  })
  const [results, setResults] = useState<any>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const sections = [
    { title: "Business Buying Readiness", questions: 3 },
    { title: "Professional Skills Assessment", questions: 4 },
    { title: "Deal Parameters", questions: 6 },
  ]

  // Auto-scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentSection])

  // Auto-scroll to top when results page loads
  useEffect(() => {
    if (isCompleted && results) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [isCompleted])

  const totalQuestions = sections.reduce((sum, section) => sum + section.questions, 0)
  const answeredQuestions = Object.values(assessmentData).filter((value) =>
    Array.isArray(value) ? value.length > 0 : value !== "",
  ).length

  const progress = (answeredQuestions / totalQuestions) * 100

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      // Calculate results
      const readinessScore = calculateReadinessScore(assessmentData)
      const dealBox = calculateDealBox(assessmentData)

      setResults({
        readinessScore,
        dealBox,
        skillAdvantage: getSkillAdvantage(assessmentData.professionalBackground),
        recommendations: getRecommendations(readinessScore.level),
      })
      setIsCompleted(true)
    }
  }

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const updateAssessmentData = (updates: Partial<AssessmentData>) => {
    setAssessmentData((prev) => ({ ...prev, ...updates }))
  }

  const isValidSection = (sectionIndex: number): boolean => {
    switch (sectionIndex) {
      case 0: // Section 1 - All 3 required
        return !!(assessmentData.motivation && assessmentData.timeCommitment && assessmentData.riskTolerance)

      case 1: // Section 2 - 3 required (businessApplication is optional)
        return !!(
          assessmentData.professionalBackground &&
          assessmentData.transferableSkills.length > 0 &&
          assessmentData.businessExperience
        )

      case 2: // Section 3 - All 6 required
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

  const getSkillAdvantage = (background: string) => {
    const advantages = {
      finance: { multiplier: "2.0x", advantage: "Due diligence, cash flow management, and financial analysis" },
      sales: { multiplier: "1.9x", advantage: "Customer acquisition, relationship building, and revenue growth" },
      operations: { multiplier: "1.8x", advantage: "Process optimization, efficiency improvements, and scaling" },
      technology: { multiplier: "1.7x", advantage: "Digital transformation, automation, and tech integration" },
      legal: { multiplier: "1.6x", advantage: "Contract negotiation, compliance, and risk management" },
      healthcare: { multiplier: "1.6x", advantage: "Regulatory knowledge, patient care, and healthcare operations" },
    }
    return (
      advantages[background as keyof typeof advantages] || {
        multiplier: "1.5x",
        advantage: "General business management and leadership",
      }
    )
  }

  const getRecommendations = (level: string) => {
    const recommendations = {
      "Ready to Buy": [
        "Start building your acquisition pipeline",
        "Connect with business brokers in your target markets",
        "Secure pre-approval for SBA financing",
        "Join Our Acquire & Build Community for tools & tactics",
      ],
      "Nearly Ready": [
        "Strengthen your financial foundation",
        "Gain more industry-specific knowledge",
        "Build relationships with lenders and advisors",
        "Consider partnering with an experienced buyer",
      ],
      "Developing Interest": [
        "Take a business acquisition course",
        "Start networking in your target industry",
        "Build up your capital reserves",
        "Read case studies of successful acquisitions",
      ],
      "Early Exploration": [
        "Learn the fundamentals of business acquisition",
        "Assess your risk tolerance and financial capacity",
        "Explore different business models and industries",
        "Consider starting with smaller investments",
      ],
      "Not Ready Yet": [
        "Focus on building your professional skills",
        "Increase your savings and capital",
        "Gain more business experience",
        "Start with business education and networking",
      ],
    }
    return recommendations[level] || recommendations["Early Exploration"]
  }

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <AssessmentResults
          results={results}
          assessmentData={assessmentData}
          onRestart={() => {
            setCurrentSection(0)
            setAssessmentData({
              motivation: "",
              timeCommitment: "",
              riskTolerance: "",
              professionalBackground: "",
              transferableSkills: [],
              businessApplication: "",
              businessExperience: "",
              targetIncome: "",
              capitalAvailable: "",
              industryPreference: "",
              geography: "",
              businessModel: "",
              creditScore: "",
            })
            setResults(null)
            setIsCompleted(false)
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Are You Ready to Buy a Business?</h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Take our 3-minute Personal Assessment to discover your readiness level, skill advantages, and personalized
              deal parameters.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>3 minutes</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Personalized results</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free report</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Section {currentSection + 1} of {sections.length}: {sections[currentSection].title}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Assessment Sections */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentSection === 0 && <Target className="w-5 h-5 text-blue-600" />}
                {currentSection === 1 && <TrendingUp className="w-5 h-5 text-blue-600" />}
                {currentSection === 2 && <DollarSign className="w-5 h-5 text-blue-600" />}
                {sections[currentSection].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentSection === 0 && <AssessmentSection1 data={assessmentData} onUpdate={updateAssessmentData} />}
              {currentSection === 1 && <AssessmentSection2 data={assessmentData} onUpdate={updateAssessmentData} />}
              {currentSection === 2 && <AssessmentSection3 data={assessmentData} onUpdate={updateAssessmentData} />}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleBack} disabled={currentSection === 0}>
              Back
            </Button>

            <div className="flex gap-2">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSection ? "bg-blue-600" : index < currentSection ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!isValidSection(currentSection)}
            >
              {currentSection === sections.length - 1 ? "Get My Results" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Motivational Copy */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 italic">
              {currentSection === 0 && "You're closer than you think to owning your own business"}
              {currentSection === 1 && "Your professional skills are your secret weapon"}
              {currentSection === 2 && "Let's build your perfect deal box"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
