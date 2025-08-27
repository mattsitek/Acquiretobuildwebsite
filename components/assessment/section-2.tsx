"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { AssessmentData } from "@/lib/assessment-logic"

interface Section2Props {
  data: AssessmentData
  onUpdate: (updates: Partial<AssessmentData>) => void
}

export function AssessmentSection2({ data, onUpdate }: Section2Props) {
  const handleSkillToggle = (skill: string, checked: boolean) => {
    const currentSkills = data.transferableSkills || []
    if (checked) {
      onUpdate({ transferableSkills: [...currentSkills, skill] })
    } else {
      onUpdate({ transferableSkills: currentSkills.filter((s) => s !== skill) })
    }
  }

  const skillMultipliers = {
    finance: "2.0x",
    sales: "1.9x",
    operations: "1.8x",
    technology: "1.7x",
    legal: "1.6x",
    healthcare: "1.6x",
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
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="finance" id="finance" />
                <Label htmlFor="finance" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Finance & Accounting</div>
                    <div className="text-sm text-gray-600">CFO, Controller, Investment Banking, etc.</div>
                  </div>
                </Label>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {skillMultipliers.finance} Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sales" id="sales" />
                <Label htmlFor="sales" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Sales & Marketing</div>
                    <div className="text-sm text-gray-600">VP Sales, Marketing Director, Business Development</div>
                  </div>
                </Label>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {skillMultipliers.sales} Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="operations" id="operations" />
                <Label htmlFor="operations" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Operations & Management</div>
                    <div className="text-sm text-gray-600">COO, General Manager, Operations Director</div>
                  </div>
                </Label>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {skillMultipliers.operations} Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="technology" id="technology" />
                <Label htmlFor="technology" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Technology & Engineering</div>
                    <div className="text-sm text-gray-600">CTO, Software Engineer, IT Director</div>
                  </div>
                </Label>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {skillMultipliers.technology} Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="legal" id="legal" />
                <Label htmlFor="legal" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Legal & Compliance</div>
                    <div className="text-sm text-gray-600">Attorney, Compliance Officer, Risk Manager</div>
                  </div>
                </Label>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {skillMultipliers.legal} Advantage
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="healthcare" id="healthcare" />
                <Label htmlFor="healthcare" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Healthcare & Life Sciences</div>
                    <div className="text-sm text-gray-600">Doctor, Nurse, Healthcare Administrator</div>
                  </div>
                </Label>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {skillMultipliers.healthcare} Advantage
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
        <h3 className="text-lg font-semibold mb-4">
          Which transferable skills do you bring to business ownership? (Select all that apply)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Sales & Customer Relations",
            "Operations Management",
            "Financial Analysis",
            "Team Leadership",
            "Strategic Planning",
            "Technology Integration",
            "Marketing & Branding",
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
                onCheckedChange={(checked) => handleSkillToggle(skill, checked as boolean)}
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
          How would you apply your skills to improve a business? (Optional)
        </h3>
        <Textarea
          placeholder="Example: I'd use my finance background to optimize cash flow and identify cost-saving opportunities..."
          value={data.businessApplication}
          onChange={(e) => onUpdate({ businessApplication: e.target.value })}
          className="min-h-[100px]"
        />
      </div>

      {/* Question 4: Business Experience */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your experience with business ownership or investing?</h3>
        <RadioGroup
          value={data.businessExperience}
          onValueChange={(value) => onUpdate({ businessExperience: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none" className="cursor-pointer">
              No prior business ownership experience
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="side-business" id="side-business" />
            <Label htmlFor="side-business" className="cursor-pointer">
              I've run a side business or freelance operation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="startup" id="startup" />
            <Label htmlFor="startup" className="cursor-pointer">
              I've been involved in a startup
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="acquisition" id="acquisition" />
            <Label htmlFor="acquisition" className="cursor-pointer">
              I've been involved in business acquisitions before
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="owner" id="owner" />
            <Label htmlFor="owner" className="cursor-pointer">
              I currently own or have owned a business
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
