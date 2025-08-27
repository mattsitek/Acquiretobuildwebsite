"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
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
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wealth-building" id="wealth-building" />
            <Label htmlFor="wealth-building" className="cursor-pointer">
              Build long-term wealth and financial freedom
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="control" id="control" />
            <Label htmlFor="control" className="cursor-pointer">
              Take control of my career and destiny
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="skills" id="skills" />
            <Label htmlFor="skills" className="cursor-pointer">
              Apply my professional skills to grow a business
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lifestyle" id="lifestyle" />
            <Label htmlFor="lifestyle" className="cursor-pointer">
              Create a better work-life balance
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="legacy" id="legacy" />
            <Label htmlFor="legacy" className="cursor-pointer">
              Build something meaningful to pass on
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 2: Time Commitment */}
      <div>
        <h3 className="text-lg font-semibold mb-4">How much time can you dedicate to running a business?</h3>
        <RadioGroup
          value={data.timeCommitment}
          onValueChange={(value) => onUpdate({ timeCommitment: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full-time" id="full-time" />
            <Label htmlFor="full-time" className="cursor-pointer">
              Full-time (40+ hours/week) - I'm ready to dive in completely
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="part-time" id="part-time" />
            <Label htmlFor="part-time" className="cursor-pointer">
              Part-time (20-40 hours/week) - I want to transition gradually
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oversight" id="oversight" />
            <Label htmlFor="oversight" className="cursor-pointer">
              Oversight role (10-20 hours/week) - I prefer strategic involvement
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="passive" id="passive" />
            <Label htmlFor="passive" className="cursor-pointer">
              Passive investment (&lt; 10 hours/week) - I want others to run it
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 3: Risk Tolerance */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your comfort level with business risk?</h3>
        <RadioGroup
          value={data.riskTolerance}
          onValueChange={(value) => onUpdate({ riskTolerance: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low-risk" />
              <Label htmlFor="low-risk" className="cursor-pointer flex-1">
                <div>
                  <div className="font-medium">Conservative (Low Risk)</div>
                  <div className="text-sm text-gray-600">
                    Established businesses with predictable cash flow, minimal growth risk
                  </div>
                </div>
              </Label>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium-risk" />
              <Label htmlFor="medium-risk" className="cursor-pointer flex-1">
                <div>
                  <div className="font-medium">Moderate (Medium Risk)</div>
                  <div className="text-sm text-gray-600">
                    Stable businesses with growth potential, some market uncertainty
                  </div>
                </div>
              </Label>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high-risk" />
              <Label htmlFor="high-risk" className="cursor-pointer flex-1">
                <div>
                  <div className="font-medium">Aggressive (High Risk)</div>
                  <div className="text-sm text-gray-600">
                    Turnaround opportunities, high growth potential, significant upside
                  </div>
                </div>
              </Label>
            </div>
          </Card>
        </RadioGroup>
      </div>
    </div>
  )
}
