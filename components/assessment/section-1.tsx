"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { TrendingUp, Shield, Users, Heart, Clock, DollarSign } from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"

interface Section1Props {
  data: AssessmentData
  onUpdate: (updates: Partial<AssessmentData>) => void
}

export function AssessmentSection1({ data, onUpdate }: Section1Props) {
  return (
    <div className="space-y-8">
      {/* Question 1: Motivation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What's your primary motivation for buying a business?</h3>
        <RadioGroup
          value={data.motivation}
          onValueChange={(value) => onUpdate({ motivation: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="wealth-building" id="wealth-building" />
                <TrendingUp className="w-5 h-5 text-green-600" />
                <Label htmlFor="wealth-building" className="cursor-pointer flex-1">
                  <div className="font-medium">Wealth Building</div>
                  <div className="text-sm text-gray-600">Build long-term wealth and financial freedom</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="control" id="control" />
                <Shield className="w-5 h-5 text-blue-600" />
                <Label htmlFor="control" className="cursor-pointer flex-1">
                  <div className="font-medium">Control & Independence</div>
                  <div className="text-sm text-gray-600">Be my own boss and control my destiny</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="skills" id="skills" />
                <Users className="w-5 h-5 text-purple-600" />
                <Label htmlFor="skills" className="cursor-pointer flex-1">
                  <div className="font-medium">Apply My Skills</div>
                  <div className="text-sm text-gray-600">Use my professional expertise in a business context</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="lifestyle" id="lifestyle" />
                <Clock className="w-5 h-5 text-orange-600" />
                <Label htmlFor="lifestyle" className="cursor-pointer flex-1">
                  <div className="font-medium">Lifestyle Change</div>
                  <div className="text-sm text-gray-600">Work-life balance, location independence</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="legacy" id="legacy" />
                <Heart className="w-5 h-5 text-red-600" />
                <Label htmlFor="legacy" className="cursor-pointer flex-1">
                  <div className="font-medium">Build a Legacy</div>
                  <div className="text-sm text-gray-600">Build a legacy for my family</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 2: Time Commitment */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">How much time do you want to dedicate to running the business?</h3>
        <RadioGroup
          value={data.timeCommitment}
          onValueChange={(value) => onUpdate({ timeCommitment: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="full-time" id="full-time" />
                <Clock className="w-5 h-5 text-red-600" />
                <Label htmlFor="full-time" className="cursor-pointer flex-1">
                  <div className="font-medium">Full-time (40+ hours/week)</div>
                  <div className="text-sm text-gray-600">Hands-on daily management and operations</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="part-time" id="part-time" />
                <Clock className="w-5 h-5 text-blue-600" />
                <Label htmlFor="part-time" className="cursor-pointer flex-1">
                  <div className="font-medium">Part-time (20-40 hours/week)</div>
                  <div className="text-sm text-gray-600">Active involvement with some delegation</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="oversight" id="oversight" />
                <Shield className="w-5 h-5 text-green-600" />
                <Label htmlFor="oversight" className="cursor-pointer flex-1">
                  <div className="font-medium">Oversight (10-20 hours/week)</div>
                  <div className="text-sm text-gray-600">Strategic guidance with strong management team</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="passive" id="passive" />
                <DollarSign className="w-5 h-5 text-purple-600" />
                <Label htmlFor="passive" className="cursor-pointer flex-1">
                  <div className="font-medium">Passive Investment</div>
                  <div className="text-sm text-gray-600">Minimal time commitment</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 3: Risk Tolerance */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What's your risk tolerance for business ownership?</h3>
        <RadioGroup
          value={data.riskTolerance}
          onValueChange={(value) => onUpdate({ riskTolerance: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="high" id="high" />
                <TrendingUp className="w-5 h-5 text-red-600" />
                <Label htmlFor="high" className="cursor-pointer flex-1">
                  <div className="font-medium">High Risk, High Reward</div>
                  <div className="text-sm text-gray-600">
                    Willing to take significant risks for potential high returns
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="medium" id="medium" />
                <Shield className="w-5 h-5 text-blue-600" />
                <Label htmlFor="medium" className="cursor-pointer flex-1">
                  <div className="font-medium">Moderate Risk</div>
                  <div className="text-sm text-gray-600">Balanced approach with calculated risks</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="low" id="low" />
                <Heart className="w-5 h-5 text-green-600" />
                <Label htmlFor="low" className="cursor-pointer flex-1">
                  <div className="font-medium">Conservative</div>
                  <div className="text-sm text-gray-600">Prefer stable, predictable businesses with lower risk</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
    </div>
  )
}
