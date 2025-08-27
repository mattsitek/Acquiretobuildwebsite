"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { TrendingUp, Shield, Clock, DollarSign, Users } from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"

interface Section1Props {
  data: AssessmentData
  onUpdate: (updates: Partial<AssessmentData>) => void
}

export function AssessmentSection1({ data, onUpdate }: Section1Props) {
  return (
    <div className="space-y-8">
      {/* Question 1: Motivation */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your primary motivation for buying a business?</h3>
        <RadioGroup
          value={data.motivation}
          onValueChange={(value) => onUpdate({ motivation: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="wealth-building" id="wealth-building" />
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <Label htmlFor="wealth-building" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Wealth Building</div>
                    <div className="text-sm text-gray-600">Build long-term wealth and financial freedom</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="control" id="control" />
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <Label htmlFor="control" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Control & Independence</div>
                    <div className="text-sm text-gray-600">Be my own boss and control my destiny</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="skills" id="skills" />
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <Label htmlFor="skills" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Apply My Skills</div>
                    <div className="text-sm text-gray-600">Use my professional expertise in a business context</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lifestyle" id="lifestyle" />
            <Label htmlFor="lifestyle" className="cursor-pointer">
              Lifestyle change (work-life balance, location independence)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="legacy" id="legacy" />
            <Label htmlFor="legacy" className="cursor-pointer">
              Build a legacy for my family
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 2: Time Commitment */}
      <div>
        <h3 className="text-lg font-semibold mb-4">How much time do you want to dedicate to running the business?</h3>
        <RadioGroup
          value={data.timeCommitment}
          onValueChange={(value) => onUpdate({ timeCommitment: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="full-time" id="full-time" />
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-red-600" />
                <Label htmlFor="full-time" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Full-time (40+ hours/week)</div>
                    <div className="text-sm text-gray-600">Hands-on daily management and operations</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="part-time" id="part-time" />
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <Label htmlFor="part-time" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Part-time (20-40 hours/week)</div>
                    <div className="text-sm text-gray-600">Active involvement with some delegation</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="oversight" id="oversight" />
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-600" />
                <Label htmlFor="oversight" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Oversight (10-20 hours/week)</div>
                    <div className="text-sm text-gray-600">Strategic guidance with strong management team</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="passive" id="passive" />
            <Label htmlFor="passive" className="cursor-pointer">
              Passive investment (minimal time commitment)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 3: Risk Tolerance */}
      <div>
        <h3 className="text-lg font-semibold mb-4">How would you describe your risk tolerance?</h3>
        <RadioGroup
          value={data.riskTolerance}
          onValueChange={(value) => onUpdate({ riskTolerance: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="high" id="high-risk" />
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-red-600" />
                <Label htmlFor="high-risk" className="cursor-pointer">
                  <div>
                    <div className="font-medium">High Risk Tolerance</div>
                    <div className="text-sm text-gray-600">Comfortable with uncertainty and potential volatility</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="medium" id="medium-risk" />
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <Label htmlFor="medium-risk" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Medium Risk Tolerance</div>
                    <div className="text-sm text-gray-600">Balanced approach with calculated risks</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="low" id="low-risk" />
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <Label htmlFor="low-risk" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Low Risk Tolerance</div>
                    <div className="text-sm text-gray-600">Prefer stable, predictable investments</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>
        </RadioGroup>
      </div>
    </div>
  )
}
