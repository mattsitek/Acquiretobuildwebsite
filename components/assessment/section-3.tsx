"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Shield, Zap, MapPin, RefreshCw } from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"

interface Section3Props {
  data: AssessmentData
  onUpdate: (updates: Partial<AssessmentData>) => void
}

export function AssessmentSection3({ data, onUpdate }: Section3Props) {
  return (
    <div className="space-y-8">
      {/* Question 1: Target Income */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your target annual income from the business?</h3>
        <RadioGroup
          value={data.targetIncome}
          onValueChange={(value) => onUpdate({ targetIncome: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="75k-150k" id="75k-150k" />
            <Label htmlFor="75k-150k" className="cursor-pointer">
              $75K - $150K (Lifestyle business)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="150k-250k" id="150k-250k" />
            <Label htmlFor="150k-250k" className="cursor-pointer">
              $150K - $250K (Solid middle-class income)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="250k-400k" id="250k-400k" />
            <Label htmlFor="250k-400k" className="cursor-pointer">
              $250K - $400K (Upper middle-class)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="400k-500k" id="400k-500k" />
            <Label htmlFor="400k-500k" className="cursor-pointer">
              $400K - $500K (High income)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="500k+" id="500k+" />
            <Label htmlFor="500k+" className="cursor-pointer">
              $500K+ (Wealth building focus)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 2: Capital Available */}
      <div>
        <h3 className="text-lg font-semibold mb-4">How much capital do you have available for a down payment?</h3>
        <RadioGroup
          value={data.capitalAvailable}
          onValueChange={(value) => onUpdate({ capitalAvailable: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50k-100k" id="50k-100k" />
            <Label htmlFor="50k-100k" className="cursor-pointer">
              $50K - $100K
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100k-250k" id="100k-250k" />
            <Label htmlFor="100k-250k" className="cursor-pointer">
              $100K - $250K
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="250k-500k" id="250k-500k" />
            <Label htmlFor="250k-500k" className="cursor-pointer">
              $250K - $500K
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="500k-1m" id="500k-1m" />
            <Label htmlFor="500k-1m" className="cursor-pointer">
              $500K - $1M
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1m+" id="1m+" />
            <Label htmlFor="1m+" className="cursor-pointer">
              $1M+
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 3: Industry Preference */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Which industry interests you most?</h3>
        <RadioGroup
          value={data.industryPreference}
          onValueChange={(value) => onUpdate({ industryPreference: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="healthcare" id="healthcare-industry" />
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <Label htmlFor="healthcare-industry" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Healthcare Services</div>
                      <div className="text-sm text-gray-600">Medical practices, dental, veterinary</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                High Value
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="professional-services" id="professional-services" />
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <Label htmlFor="professional-services" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Professional Services</div>
                      <div className="text-sm text-gray-600">Accounting, legal, consulting, advisory</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Stable
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="business-services" id="business-services" />
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <Label htmlFor="business-services" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Business Services</div>
                      <div className="text-sm text-gray-600">Marketing, HR, facilities, logistics</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Growing
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="tech-enabled" id="tech-enabled" />
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <Label htmlFor="tech-enabled" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Tech-Enabled Services</div>
                      <div className="text-sm text-gray-600">SaaS, digital agencies, e-commerce</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                High Growth
              </Badge>
            </div>
          </Card>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other-industry" />
            <Label htmlFor="other-industry" className="cursor-pointer">
              Other industry (manufacturing, retail, etc.)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 4: Geography */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your preferred location for business acquisition?</h3>
        <RadioGroup
          value={data.geography}
          onValueChange={(value) => onUpdate({ geography: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="25-miles" id="25-miles" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <Label htmlFor="25-miles" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Within 25 miles</div>
                    <div className="text-sm text-gray-600">Easy daily management and oversight</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="50-miles" id="50-miles" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <Label htmlFor="50-miles" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Within 50 miles</div>
                    <div className="text-sm text-gray-600">Manageable with occasional visits</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="100-miles" id="100-miles" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-yellow-600" />
                <Label htmlFor="100-miles" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Within 100 miles</div>
                    <div className="text-sm text-gray-600">Regional focus with strong management team</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="statewide" id="statewide" />
            <Label htmlFor="statewide" className="cursor-pointer">
              Statewide (anywhere in my state)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="regional" id="regional" />
            <Label htmlFor="regional" className="cursor-pointer">
              Regional (multi-state area)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="relocate" id="relocate" />
            <Label htmlFor="relocate" className="cursor-pointer">
              Open to relocation for the right opportunity
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 5: Business Model */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What type of business model appeals to you most?</h3>
        <RadioGroup
          value={data.businessModel}
          onValueChange={(value) => onUpdate({ businessModel: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="recurring" id="recurring" />
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-green-600" />
                <Label htmlFor="recurring" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Recurring Revenue</div>
                    <div className="text-sm text-gray-600">Subscriptions, contracts, predictable income</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="project" id="project" />
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <Label htmlFor="project" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Project-Based Services</div>
                    <div className="text-sm text-gray-600">Repeat clients, relationship-driven</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="mixed" id="mixed" />
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <Label htmlFor="mixed" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Mixed Revenue Model</div>
                    <div className="text-sm text-gray-600">Combination of recurring and project revenue</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="product" id="product" />
            <Label htmlFor="product" className="cursor-pointer">
              Product sales with service components
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no-preference" id="no-preference" />
            <Label htmlFor="no-preference" className="cursor-pointer">
              No preference - show me proven business models
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 6: Credit Score */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          What's your approximate credit score? (Important for SBA loan eligibility)
        </h3>
        <RadioGroup
          value={data.creditScore}
          onValueChange={(value) => onUpdate({ creditScore: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="excellent" id="excellent" />
              <Label htmlFor="excellent" className="cursor-pointer flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Excellent (750+)</div>
                    <div className="text-sm text-gray-600">Best SBA loan terms available</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Optimal
                  </Badge>
                </div>
              </Label>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="good" id="good" />
              <Label htmlFor="good" className="cursor-pointer flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Good (700-749)</div>
                    <div className="text-sm text-gray-600">Strong SBA loan qualification</div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Strong
                  </Badge>
                </div>
              </Label>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fair" id="fair" />
              <Label htmlFor="fair" className="cursor-pointer flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Fair (650-699)</div>
                    <div className="text-sm text-gray-600">SBA loans possible with higher rates</div>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Moderate
                  </Badge>
                </div>
              </Label>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="poor" id="poor" />
              <Label htmlFor="poor" className="cursor-pointer flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Below 650</div>
                    <div className="text-sm text-gray-600">May need alternative financing</div>
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Limited
                  </Badge>
                </div>
              </Label>
            </div>
          </Card>
        </RadioGroup>
      </div>
    </div>
  )
}
