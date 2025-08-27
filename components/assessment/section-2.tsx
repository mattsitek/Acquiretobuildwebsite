"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Cog, Code, Scale, Heart } from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"

interface Section2Props {
  data: AssessmentData
  onUpdate: (updates: Partial<AssessmentData>) => void
}

export function AssessmentSection2({ data, onUpdate }: Section2Props) {
  const handleSkillsChange = (skill: string, checked: boolean) => {
    const currentSkills = data.transferableSkills || []
    if (checked) {
      onUpdate({ transferableSkills: [...currentSkills, skill] })
    } else {
      onUpdate({ transferableSkills: currentSkills.filter((s) => s !== skill) })
    }
  }

  return (
    <div className="space-y-8">
      {/* Question 1: Professional Background */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your primary professional background?</h3>
        <RadioGroup
          value={data.professionalBackground}
          onValueChange={(value) => onUpdate({ professionalBackground: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="finance" id="finance" />
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <Label htmlFor="finance" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Finance & Accounting</div>
                      <div className="text-sm text-gray-600">CFO, Controller, Analyst, Banking</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                2.0x Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="sales" id="sales" />
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <Label htmlFor="sales" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Sales & Business Development</div>
                      <div className="text-sm text-gray-600">Sales Manager, BD, Account Management</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                1.9x Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="operations" id="operations" />
                <div className="flex items-center space-x-2">
                  <Cog className="w-5 h-5 text-purple-600" />
                  <Label htmlFor="operations" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Operations & Project Management</div>
                      <div className="text-sm text-gray-600">COO, Operations Manager, Project Manager</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                1.8x Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="technology" id="technology" />
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-indigo-600" />
                  <Label htmlFor="technology" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Technology & Engineering</div>
                      <div className="text-sm text-gray-600">CTO, Software Engineer, IT Manager</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                1.7x Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="legal" id="legal" />
                <div className="flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-gray-600" />
                  <Label htmlFor="legal" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Legal & Compliance</div>
                      <div className="text-sm text-gray-600">Attorney, Compliance Officer, Risk Manager</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                1.6x Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="healthcare" id="healthcare" />
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <Label htmlFor="healthcare" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Healthcare</div>
                      <div className="text-sm text-gray-600">Doctor, Nurse, Healthcare Administrator</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                1.6x Advantage
              </Badge>
            </div>
          </Card>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="cursor-pointer">
              Other professional background
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 2: Transferable Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Which transferable skills do you have? (Select all that apply)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Sales & Marketing",
            "Financial Analysis",
            "Operations Management",
            "Team Leadership",
            "Strategic Planning",
            "Customer Service",
            "Technology Implementation",
            "Process Improvement",
            "Negotiation",
            "Project Management",
            "Data Analysis",
            "Regulatory Compliance",
          ].map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={skill}
                checked={data.transferableSkills?.includes(skill) || false}
                onCheckedChange={(checked) => handleSkillsChange(skill, checked as boolean)}
              />
              <Label htmlFor={skill} className="text-sm cursor-pointer">
                {skill}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Question 3: Business Application */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          How would you apply your professional skills to improve a business? (Optional)
        </h3>
        <Textarea
          placeholder="Example: I would use my finance background to optimize cash flow, implement better financial controls, and identify cost-saving opportunities..."
          value={data.businessApplication}
          onChange={(e) => onUpdate({ businessApplication: e.target.value })}
          className="min-h-[100px]"
        />
      </div>

      {/* Question 4: Business Experience */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your business ownership experience?</h3>
        <RadioGroup
          value={data.businessExperience}
          onValueChange={(value) => onUpdate({ businessExperience: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="owner" id="owner" />
              <Label htmlFor="owner" className="cursor-pointer flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Current/Former Business Owner</div>
                    <div className="text-sm text-gray-600">I've owned and operated a business</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    High Experience
                  </Badge>
                </div>
              </Label>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="acquisition" id="acquisition" />
              <Label htmlFor="acquisition" className="cursor-pointer flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Prior Acquisition Experience</div>
                    <div className="text-sm text-gray-600">I've been involved in buying/selling businesses</div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    High Experience
                  </Badge>
                </div>
              </Label>
            </div>
          </Card>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="startup" id="startup" />
            <Label htmlFor="startup" className="cursor-pointer">
              Startup experience (founded or early employee)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="side-business" id="side-business" />
            <Label htmlFor="side-business" className="cursor-pointer">
              Side business or consulting experience
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none" className="cursor-pointer">
              No direct business ownership experience
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
