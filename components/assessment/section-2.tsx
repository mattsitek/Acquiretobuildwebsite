"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, TrendingUp, Settings, Monitor, Scale, Heart, Users, Building, Briefcase, Star } from "lucide-react"
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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What's your professional background?</h3>
        <RadioGroup
          value={data.professionalBackground}
          onValueChange={(value) => onUpdate({ professionalBackground: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="finance" id="finance" />
                <DollarSign className="w-5 h-5 text-green-600" />
                <Label htmlFor="finance" className="cursor-pointer flex-1">
                  <div className="font-medium">Finance & Accounting</div>
                  <div className="text-sm text-gray-600">Financial analysis, accounting, investment banking</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="sales" id="sales" />
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <Label htmlFor="sales" className="cursor-pointer flex-1">
                  <div className="font-medium">Sales & Business Development</div>
                  <div className="text-sm text-gray-600">Sales, marketing, customer relationships</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="operations" id="operations" />
                <Settings className="w-5 h-5 text-purple-600" />
                <Label htmlFor="operations" className="cursor-pointer flex-1">
                  <div className="font-medium">Operations & Management</div>
                  <div className="text-sm text-gray-600">Operations, project management, process improvement</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="technology" id="technology" />
                <Monitor className="w-5 h-5 text-indigo-600" />
                <Label htmlFor="technology" className="cursor-pointer flex-1">
                  <div className="font-medium">Technology & Engineering</div>
                  <div className="text-sm text-gray-600">Software, IT, engineering, technical roles</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="legal" id="legal" />
                <Scale className="w-5 h-5 text-red-600" />
                <Label htmlFor="legal" className="cursor-pointer flex-1">
                  <div className="font-medium">Legal & Compliance</div>
                  <div className="text-sm text-gray-600">Law, compliance, risk management</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="healthcare" id="healthcare" />
                <Heart className="w-5 h-5 text-pink-600" />
                <Label htmlFor="healthcare" className="cursor-pointer flex-1">
                  <div className="font-medium">Healthcare</div>
                  <div className="text-sm text-gray-600">Medical, dental, veterinary, healthcare administration</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="other" id="other" />
                <Users className="w-5 h-5 text-gray-600" />
                <Label htmlFor="other" className="cursor-pointer flex-1">
                  <div className="font-medium">Other Professional Background</div>
                  <div className="text-sm text-gray-600">Education, consulting, government, non-profit</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 2: Transferable Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Which skills do you have that would transfer to business ownership?</h3>
        <p className="text-sm text-gray-600">Select all that apply</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Financial analysis",
            "Team leadership",
            "Customer service",
            "Marketing",
            "Strategic planning",
            "Process improvement",
            "Negotiation",
            "Project management",
            "Sales",
            "Technology systems",
            "Regulatory compliance",
            "Training & development",
          ].map((skill) => (
            <Card key={skill} className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={data.transferableSkills?.includes(skill) || false}
                    onCheckedChange={(checked) => handleSkillsChange(skill, checked as boolean)}
                  />
                  <Label htmlFor={skill} className="cursor-pointer text-sm">
                    {skill}
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Question 3: Business Application */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          How would you apply your professional skills to improve a business you acquire?
        </h3>
        <Textarea
          placeholder="Describe how your background would help you add value to a business..."
          value={data.businessApplication}
          onChange={(e) => onUpdate({ businessApplication: e.target.value })}
          className="min-h-[100px]"
        />
      </div>

      {/* Question 4: Business Experience */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What's your experience with business ownership or entrepreneurship?</h3>
        <RadioGroup
          value={data.businessExperience}
          onValueChange={(value) => onUpdate({ businessExperience: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="owner" id="owner" />
                <Building className="w-5 h-5 text-green-600" />
                <Label htmlFor="owner" className="cursor-pointer flex-1">
                  <div className="font-medium">Current/Former Business Owner</div>
                  <div className="text-sm text-gray-600">I've owned and operated a business before</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="acquisition" id="acquisition" />
                <Briefcase className="w-5 h-5 text-blue-600" />
                <Label htmlFor="acquisition" className="cursor-pointer flex-1">
                  <div className="font-medium">M&A Experience</div>
                  <div className="text-sm text-gray-600">
                    I've been involved in business acquisitions professionally
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="startup" id="startup" />
                <Star className="w-5 h-5 text-purple-600" />
                <Label htmlFor="startup" className="cursor-pointer flex-1">
                  <div className="font-medium">Startup Experience</div>
                  <div className="text-sm text-gray-600">I've worked at or founded startups</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="side-business" id="side-business" />
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <Label htmlFor="side-business" className="cursor-pointer flex-1">
                  <div className="font-medium">Side Business</div>
                  <div className="text-sm text-gray-600">I've run side businesses or freelanced</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="none" id="none" />
                <Users className="w-5 h-5 text-gray-600" />
                <Label htmlFor="none" className="cursor-pointer flex-1">
                  <div className="font-medium">No Direct Experience</div>
                  <div className="text-sm text-gray-600">This would be my first business ownership experience</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
    </div>
  )
}
