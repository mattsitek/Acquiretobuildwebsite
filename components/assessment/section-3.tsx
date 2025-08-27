"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DollarSign, MapPin, Building, TrendingUp, Users, Star } from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"

interface Section3Props {
  data: AssessmentData
  onUpdate: (updates: Partial<AssessmentData>) => void
}

export function AssessmentSection3({ data, onUpdate }: Section3Props) {
  return (
    <div className="space-y-8">
      {/* Question 1: Target Income */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What's your target annual income from the business?</h3>
        <RadioGroup
          value={data.targetIncome}
          onValueChange={(value) => onUpdate({ targetIncome: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="75k-150k" id="75k-150k" />
                <DollarSign className="w-5 h-5 text-green-600" />
                <Label htmlFor="75k-150k" className="cursor-pointer flex-1">
                  <div className="font-medium">$75,000 - $150,000</div>
                  <div className="text-sm text-gray-600">Comfortable lifestyle income</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="150k-250k" id="150k-250k" />
                <DollarSign className="w-5 h-5 text-blue-600" />
                <Label htmlFor="150k-250k" className="cursor-pointer flex-1">
                  <div className="font-medium">$150,000 - $250,000</div>
                  <div className="text-sm text-gray-600">Upper middle class income</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="250k-400k" id="250k-400k" />
                <DollarSign className="w-5 h-5 text-purple-600" />
                <Label htmlFor="250k-400k" className="cursor-pointer flex-1">
                  <div className="font-medium">$250,000 - $400,000</div>
                  <div className="text-sm text-gray-600">High income lifestyle</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="400k-500k" id="400k-500k" />
                <DollarSign className="w-5 h-5 text-orange-600" />
                <Label htmlFor="400k-500k" className="cursor-pointer flex-1">
                  <div className="font-medium">$400,000 - $500,000</div>
                  <div className="text-sm text-gray-600">Affluent income level</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="500k+" id="500k+" />
                <DollarSign className="w-5 h-5 text-red-600" />
                <Label htmlFor="500k+" className="cursor-pointer flex-1">
                  <div className="font-medium">$500,000+</div>
                  <div className="text-sm text-gray-600">High net worth income</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 2: Available Capital */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">How much capital do you have available for a down payment?</h3>
        <RadioGroup
          value={data.capitalAvailable}
          onValueChange={(value) => onUpdate({ capitalAvailable: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="50k-100k" id="50k-100k" />
                <DollarSign className="w-5 h-5 text-yellow-600" />
                <Label htmlFor="50k-100k" className="cursor-pointer flex-1">
                  <div className="font-medium">$50,000 - $100,000</div>
                  <div className="text-sm text-gray-600">Entry level investment</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="100k-250k" id="100k-250k" />
                <DollarSign className="w-5 h-5 text-green-600" />
                <Label htmlFor="100k-250k" className="cursor-pointer flex-1">
                  <div className="font-medium">$100,000 - $250,000</div>
                  <div className="text-sm text-gray-600">Solid down payment range</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="250k-500k" id="250k-500k" />
                <DollarSign className="w-5 h-5 text-blue-600" />
                <Label htmlFor="250k-500k" className="cursor-pointer flex-1">
                  <div className="font-medium">$250,000 - $500,000</div>
                  <div className="text-sm text-gray-600">Strong financial position</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="500k-1m" id="500k-1m" />
                <DollarSign className="w-5 h-5 text-purple-600" />
                <Label htmlFor="500k-1m" className="cursor-pointer flex-1">
                  <div className="font-medium">$500,000 - $1,000,000</div>
                  <div className="text-sm text-gray-600">High net worth investor</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="1m+" id="1m+" />
                <DollarSign className="w-5 h-5 text-red-600" />
                <Label htmlFor="1m+" className="cursor-pointer flex-1">
                  <div className="font-medium">$1,000,000+</div>
                  <div className="text-sm text-gray-600">Significant capital available</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 3: Industry Preference */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What industry interests you most?</h3>
        <RadioGroup
          value={data.industryPreference}
          onValueChange={(value) => onUpdate({ industryPreference: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="healthcare" id="healthcare" />
                <Building className="w-5 h-5 text-red-600" />
                <Label htmlFor="healthcare" className="cursor-pointer flex-1">
                  <div className="font-medium">Healthcare Services</div>
                  <div className="text-sm text-gray-600">Medical practices, dental, veterinary</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="professional-services" id="professional-services" />
                <Users className="w-5 h-5 text-blue-600" />
                <Label htmlFor="professional-services" className="cursor-pointer flex-1">
                  <div className="font-medium">Professional Services</div>
                  <div className="text-sm text-gray-600">Consulting, accounting, legal services</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="business-services" id="business-services" />
                <TrendingUp className="w-5 h-5 text-green-600" />
                <Label htmlFor="business-services" className="cursor-pointer flex-1">
                  <div className="font-medium">Business Services</div>
                  <div className="text-sm text-gray-600">Marketing, HR, facilities management</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="tech-enabled" id="tech-enabled" />
                <Star className="w-5 h-5 text-purple-600" />
                <Label htmlFor="tech-enabled" className="cursor-pointer flex-1">
                  <div className="font-medium">Tech-Enabled Services</div>
                  <div className="text-sm text-gray-600">SaaS, digital agencies, e-commerce</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="other" id="other-industry" />
                <Building className="w-5 h-5 text-orange-600" />
                <Label htmlFor="other-industry" className="cursor-pointer flex-1">
                  <div className="font-medium">Other/Industry Agnostic</div>
                  <div className="text-sm text-gray-600">Open to various industries</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 4: Geography */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What's your preferred geographic scope?</h3>
        <RadioGroup
          value={data.geography}
          onValueChange={(value) => onUpdate({ geography: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="25-miles" id="25-miles" />
                <MapPin className="w-5 h-5 text-green-600" />
                <Label htmlFor="25-miles" className="cursor-pointer flex-1">
                  <div className="font-medium">Within 25 miles</div>
                  <div className="text-sm text-gray-600">Local area only</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="50-miles" id="50-miles" />
                <MapPin className="w-5 h-5 text-blue-600" />
                <Label htmlFor="50-miles" className="cursor-pointer flex-1">
                  <div className="font-medium">Within 50 miles</div>
                  <div className="text-sm text-gray-600">Regional area</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="100-miles" id="100-miles" />
                <MapPin className="w-5 h-5 text-purple-600" />
                <Label htmlFor="100-miles" className="cursor-pointer flex-1">
                  <div className="font-medium">Within 100 miles</div>
                  <div className="text-sm text-gray-600">Extended regional area</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="statewide" id="statewide" />
                <MapPin className="w-5 h-5 text-orange-600" />
                <Label htmlFor="statewide" className="cursor-pointer flex-1">
                  <div className="font-medium">Statewide</div>
                  <div className="text-sm text-gray-600">Anywhere in my state</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="regional" id="regional" />
                <MapPin className="w-5 h-5 text-red-600" />
                <Label htmlFor="regional" className="cursor-pointer flex-1">
                  <div className="font-medium">Regional (Multi-state)</div>
                  <div className="text-sm text-gray-600">Multiple states in my region</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="relocate" id="relocate" />
                <MapPin className="w-5 h-5 text-gray-600" />
                <Label htmlFor="relocate" className="cursor-pointer flex-1">
                  <div className="font-medium">Open to Relocation</div>
                  <div className="text-sm text-gray-600">Willing to move for the right opportunity</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 5: Business Model */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What business model appeals to you most?</h3>
        <RadioGroup
          value={data.businessModel}
          onValueChange={(value) => onUpdate({ businessModel: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="recurring" id="recurring" />
                <TrendingUp className="w-5 h-5 text-green-600" />
                <Label htmlFor="recurring" className="cursor-pointer flex-1">
                  <div className="font-medium">Recurring Revenue</div>
                  <div className="text-sm text-gray-600">Subscriptions, contracts, repeat customers</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="project" id="project" />
                <Building className="w-5 h-5 text-blue-600" />
                <Label htmlFor="project" className="cursor-pointer flex-1">
                  <div className="font-medium">Project-Based</div>
                  <div className="text-sm text-gray-600">Custom projects with repeat clients</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="mixed" id="mixed" />
                <Star className="w-5 h-5 text-purple-600" />
                <Label htmlFor="mixed" className="cursor-pointer flex-1">
                  <div className="font-medium">Mixed Revenue Model</div>
                  <div className="text-sm text-gray-600">Combination of recurring and project revenue</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="product" id="product" />
                <DollarSign className="w-5 h-5 text-orange-600" />
                <Label htmlFor="product" className="cursor-pointer flex-1">
                  <div className="font-medium">Product Sales</div>
                  <div className="text-sm text-gray-600">Physical or digital products with services</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="no-preference" id="no-preference" />
                <Users className="w-5 h-5 text-gray-600" />
                <Label htmlFor="no-preference" className="cursor-pointer flex-1">
                  <div className="font-medium">No Preference</div>
                  <div className="text-sm text-gray-600">Open to any proven business model</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 6: Credit Score */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What's your credit score range?</h3>
        <RadioGroup
          value={data.creditScore}
          onValueChange={(value) => onUpdate({ creditScore: value })}
          className="space-y-3"
        >
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="excellent" id="excellent" />
                <Star className="w-5 h-5 text-green-600" />
                <Label htmlFor="excellent" className="cursor-pointer flex-1">
                  <div className="font-medium">Excellent (750+)</div>
                  <div className="text-sm text-gray-600">Best financing terms available</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="good" id="good" />
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <Label htmlFor="good" className="cursor-pointer flex-1">
                  <div className="font-medium">Good (680-749)</div>
                  <div className="text-sm text-gray-600">Favorable financing options</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="fair" id="fair" />
                <DollarSign className="w-5 h-5 text-yellow-600" />
                <Label htmlFor="fair" className="cursor-pointer flex-1">
                  <div className="font-medium">Fair (620-679)</div>
                  <div className="text-sm text-gray-600">Standard financing available</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="poor" id="poor" />
                <Building className="w-5 h-5 text-red-600" />
                <Label htmlFor="poor" className="cursor-pointer flex-1">
                  <div className="font-medium">Needs Improvement (Below 620)</div>
                  <div className="text-sm text-gray-600">May need alternative financing</div>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
    </div>
  )
}
