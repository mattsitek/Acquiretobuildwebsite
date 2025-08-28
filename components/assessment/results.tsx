"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

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
  Building,
  CreditCard,
  MessageSquare,
  Heart,
} from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"

interface ResultsProps {
  results: {
    readinessScore: {
      score: number
      level: string
      description: string
    }
    dealBox: {
      targetBusinessProfile: {
        industry: string
        geography: string
        businessModel: string
      }
      sizeOfDeal: {
        revenueRange: string
        requiredSDE: string
        dealSize: string
      }
      financingFramework: {
        downPayment: string
        structure: string
      }
      personalEdge: {
        background: string
        advantage: string
      }
      lifestyleOutcome: {
        goals: string
      }
      elevatorPitch: string
    }
    skillAdvantage: {
      multiplier: string
      advantage: string
    }
    recommendations: string[]
  }
  assessmentData: AssessmentData
  onRestart: () => void
}

export default function AssessmentResults({ results, assessmentData, onRestart }: ResultsProps) {
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Personal Buyer Assessment Results</h1>
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

        {/* Skill Advantage */}
        <Card className="mb-8">
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

        {/* Deal Box - New Structure */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <Building className="w-8 h-8 text-green-600" />
              Your Deal Box
            </CardTitle>
            <p className="text-gray-600">Your personalized business acquisition profile</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Target Business Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                    Target Business Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry:</span>
                    <span className="font-medium capitalize">{results.dealBox.targetBusinessProfile.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Geography:</span>
                    <span className="font-medium capitalize">{results.dealBox.targetBusinessProfile.geography}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 flex-shrink-0">Model:</span>
                    <span className="font-medium capitalize text-right ml-2">
                      {results.dealBox.targetBusinessProfile.businessModel}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Size of Deal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Size of the Deal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue Range:</span>
                    <span className="font-medium">{results.dealBox.sizeOfDeal.revenueRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Required SDE:</span>
                    <span className="font-medium">{results.dealBox.sizeOfDeal.requiredSDE}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deal Size:</span>
                    <span className="font-medium">{results.dealBox.sizeOfDeal.dealSize}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Financing Framework */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    Financing Framework
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Down Payment:</span>
                    <span className="font-medium">{results.dealBox.financingFramework.downPayment}</span>
                  </div>
                  <div className="text-sm text-gray-600">{results.dealBox.financingFramework.structure}</div>
                </CardContent>
              </Card>

              {/* Personal Edge */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                    Personal Edge
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Background:</span>
                    <span className="font-medium capitalize">{results.dealBox.personalEdge.background}</span>
                  </div>
                  <div className="text-sm text-gray-600">{results.dealBox.personalEdge.advantage}</div>
                </CardContent>
              </Card>
            </div>

            {/* Lifestyle & Outcome */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-red-600" />
                  Lifestyle & Outcome
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{results.dealBox.lifestyleOutcome.goals}</p>
              </CardContent>
            </Card>

            {/* Elevator Pitch */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Your Elevator Pitch
                </CardTitle>
                <p className="text-sm text-gray-600">Use this script when talking to brokers, sellers, or lenders</p>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-800 italic leading-relaxed">"{results.dealBox.elevatorPitch}"</p>
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(results.dealBox.elevatorPitch)}
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              </CardContent>
            </Card>
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
              Get a personalized report with detailed analysis, deal examples, and action steps
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

          <Link href="/deal-kit">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Get The Deal Kit
            </Button>
          </Link>
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
