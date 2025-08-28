"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import Section1 from "@/components/assessment/section-1"
import Section2 from "@/components/assessment/section-2"
import Section3 from "@/components/assessment/section-3"
import Results from "@/components/assessment/results"

export default function AssessmentClientPage() {
  const [currentSection, setCurrentSection] = useState(1)
  const [responses, setResponses] = useState({})
  const [showResults, setShowResults] = useState(false)

  const totalSections = 3
  const progress = (currentSection / totalSections) * 100

  const handleSectionComplete = (sectionData: any) => {
    setResponses((prev) => ({ ...prev, ...sectionData }))

    if (currentSection < totalSections) {
      setCurrentSection((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection((prev) => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentSection(1)
    setResponses({})
    setShowResults(false)
  }

  if (showResults) {
    return <Results responses={responses} onRestart={handleRestart} />
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Section {currentSection} of {totalSections}
            </span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Navigation */}
      {currentSection > 1 && (
        <div className="flex justify-start">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Previous Section
          </Button>
        </div>
      )}

      {/* Current Section */}
      {currentSection === 1 && <Section1 onComplete={handleSectionComplete} />}
      {currentSection === 2 && <Section2 onComplete={handleSectionComplete} />}
      {currentSection === 3 && <Section3 onComplete={handleSectionComplete} />}
    </div>
  )
}
