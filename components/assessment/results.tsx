"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Download,
  Mail,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Zap,
} from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"

interface ResultsProps {
  results: any
  assessmentData: AssessmentData
  onRestart: () => void
}

export function AssessmentResults({ results, assessmentData, onRestart }: ResultsProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 22) return "text-green-600"
    if (score >= 17) return "text-blue-600"
    if (score >= 12) return "text-yellow-600"
    if (score >= 7) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreBadgeColor = (level: string) => {
    switch (level) {
      case "Ready to Buy":
        return "bg-green-100 text-green-800"
      case "Nearly Ready":
        return "bg-blue-100 text-blue-800"
      case "Developing Interest":
        return "bg-yellow-100 text-yellow-800"
      case "Early Exploration":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your KnowledgeBuyer Assessment Results</h1>
          <p className="text-xl text-gray-600 mb-6">
            Based on your responses, here's your personalized business acquisition roadmap
          </p>
        </div>

        {/* Readiness Score */}
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <Target className="w-8 h-8 text-blue-600" />
              Your Readiness Score
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(results.readinessScore.score)}`}>
              {results.readinessScore.score}/26
            </div>
            <Badge className={`text-lg px-4 py-2 mb-4 ${getScoreBadgeColor(results.readinessScore.level)}`}>
              {results.readinessScore.level}
            </Badge>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{results.readinessScore.description}</p>
            <div className="mt-6">
              <Progress value={(results.readinessScore.score / 26) * 100} className="h-3 max-w-md mx-auto" />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Skill Advantage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Your Skill Advantage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {results.skillAdvantage.multiplier} Multiplier
                </Badge>
                <span className="font-medium capitalize">{assessmentData.professionalBackground} Background</span>
              </div>
              <p className="text-gray-600 mb-4">{results.skillAdvantage.advantage}</p>
              <div className="text-sm text-gray-500">
                <strong>Selected Skills:</strong> {assessmentData.transferableSkills?.join(", ") || "None selected"}
              </div>
            </CardContent>
          </Card>

          {/* Deal Box */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Your Deal Box
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Business Size:</span>
                  <span className="font-medium">{results.dealBox.businessSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Cash Flow:</span>
                  <span className="font-medium">{results.dealBox.targetCashFlow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment:</span>
                  <span className="font-medium">{results.dealBox.downPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SBA Loan:</span>
                  <span className="font-medium">{results.dealBox.sbaLoan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment:</span>
                  <span className="font-medium">{results.dealBox.monthlyPayment}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Target Industries */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Recommended Industries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {results.dealBox.targetIndustries.map((industry: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{industry}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Based on your {assessmentData.professionalBackground} background and {assessmentData.industryPreference}{" "}
              preference
            </p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Your Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Capture */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get Your Detailed Business Buyer Roadmap</CardTitle>
            <p className="text-gray-600">
              Download a personalized PDF report with detailed analysis, deal examples, and action steps
            </p>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="email" className="sr-only">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="h-12 px-6 bg-blue-600 hover:bg-blue-700">
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Get Report
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  We'll also send you weekly tips on business acquisition
                </p>
              </form>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Report Sent!</h3>
                <p className="text-gray-600 mb-4">Check your email for your personalized Business Buyer Roadmap</p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Join Our Newsletter
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRestart} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="w-4 h-4" />
            Retake Assessment
          </Button>

          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Explore Deal Opportunities
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Ready to take the next step? Join thousands of professionals who've successfully transitioned to business
            ownership.
          </p>
        </div>
      </div>
    </div>
  )
}
