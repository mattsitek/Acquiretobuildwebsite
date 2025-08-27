"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Copy, Mail, Building, DollarSign, CreditCard, User, Target } from "lucide-react"
import { useState } from "react"
import type { AssessmentData, DealBox } from "@/lib/assessment-logic"

interface ResultsProps {
  data: AssessmentData
  dealBox: DealBox
  readinessScore: number
}

export function AssessmentResults({ data, dealBox, readinessScore }: ResultsProps) {
  const [copied, setCopied] = useState(false)

  const copyElevatorPitch = async () => {
    await navigator.clipboard.writeText(dealBox.elevatorPitch)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Highly Ready"
    if (score >= 60) return "Moderately Ready"
    return "Needs Development"
  }

  return (
    <div className="space-y-8">
      {/* Readiness Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Business Buying Readiness Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{readinessScore}/100</span>
              <Badge variant="secondary" className={getScoreColor(readinessScore)}>
                {getScoreLabel(readinessScore)}
              </Badge>
            </div>
            <Progress value={readinessScore} className="w-full" />
            <p className="text-sm text-gray-600">
              {readinessScore >= 80 && "You're well-prepared to start your business acquisition journey!"}
              {readinessScore >= 60 &&
                readinessScore < 80 &&
                "You have a solid foundation but could benefit from additional preparation."}
              {readinessScore < 60 && "Consider developing your skills and experience before pursuing an acquisition."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Deal Box */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Personalized Deal Box</h2>

        {/* Target Business Profile */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Building className="w-5 h-5" />
              Target Business Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Industry:</span>
              <span className="font-medium">{dealBox.targetBusinessProfile.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Geography:</span>
              <span className="font-medium">{dealBox.targetBusinessProfile.geography}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Business Model:</span>
              <span className="font-medium">{dealBox.targetBusinessProfile.businessModel}</span>
            </div>
          </CardContent>
        </Card>

        {/* Size of the Deal */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <DollarSign className="w-5 h-5" />
              Size of the Deal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue Range:</span>
              <span className="font-medium">{dealBox.sizeOfDeal.revenueRange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Required SDE:</span>
              <span className="font-medium">{dealBox.sizeOfDeal.requiredSDE}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deal Size:</span>
              <span className="font-medium">{dealBox.sizeOfDeal.dealSize}</span>
            </div>
          </CardContent>
        </Card>

        {/* Financing Framework */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <CreditCard className="w-5 h-5" />
              Financing Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Down Payment:</span>
              <span className="font-medium">
                {dealBox.financingFramework.downPayment} ({dealBox.financingFramework.downPaymentPercentage})
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-2">{dealBox.financingFramework.structure}</div>
          </CardContent>
        </Card>

        {/* Personal Edge */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <User className="w-5 h-5" />
              Personal Edge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Background:</span>
              <span className="font-medium">{dealBox.personalEdge.background}</span>
            </div>
            <div className="text-sm text-gray-600 mt-2">{dealBox.personalEdge.advantage}</div>
          </CardContent>
        </Card>

        {/* Lifestyle & Outcome */}
        <Card className="border-indigo-200 bg-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-800">
              <Target className="w-5 h-5" />
              Lifestyle & Outcome
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-gray-600">
              <strong>Goals:</strong> {dealBox.lifestyleOutcome.goals}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Motivation:</strong> {dealBox.lifestyleOutcome.motivation}
            </div>
          </CardContent>
        </Card>

        {/* Elevator Pitch */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Your Elevator Pitch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm leading-relaxed">{dealBox.elevatorPitch}</p>
            </div>
            <Button onClick={copyElevatorPitch} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy Pitch"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {readinessScore >= 80 && (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Start Your Search</p>
                    <p className="text-sm text-gray-600">
                      Begin reaching out to business brokers with your elevator pitch
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Secure Financing Pre-approval</p>
                    <p className="text-sm text-gray-600">Get pre-qualified for SBA loans to strengthen your offers</p>
                  </div>
                </div>
              </>
            )}
            {readinessScore >= 60 && readinessScore < 80 && (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Build Your Network</p>
                    <p className="text-sm text-gray-600">Connect with business brokers and other buyers in your area</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Enhance Your Skills</p>
                    <p className="text-sm text-gray-600">
                      Consider additional training in areas like financial analysis or operations
                    </p>
                  </div>
                </div>
              </>
            )}
            {readinessScore < 60 && (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Gain More Experience</p>
                    <p className="text-sm text-gray-600">
                      Consider starting with a smaller side business or consulting work
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Build Your Capital</p>
                    <p className="text-sm text-gray-600">Focus on saving more for a larger down payment</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
