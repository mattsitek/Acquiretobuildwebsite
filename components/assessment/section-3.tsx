"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DollarSign, MapPin, Building, TrendingUp, Users, Star } from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <Label htmlFor="industry-select" className="text-sm font-medium">
                Select your preferred industry
              </Label>
              <Select
                value={data.industryPreference}
                onValueChange={(value) => onUpdate({ industryPreference: value })}
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Choose an industry..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home-services">
                    Home Services (plumbing, HVAC, electrical, roofing, landscaping)
                  </SelectItem>
                  <SelectItem value="commercial-services">
                    Commercial Services (janitorial, facilities maintenance, fire protection)
                  </SelectItem>
                  <SelectItem value="healthcare-services">
                    Healthcare Services (non-clinical PT clinics, dental, home health, med spa)
                  </SelectItem>
                  <SelectItem value="professional-business">
                    Professional & Business Services (accounting firms, staffing, training providers)
                  </SelectItem>
                  <SelectItem value="specialty-manufacturing">
                    Specialty Manufacturing & Distribution (niche machining, industrial supply)
                  </SelectItem>
                  <SelectItem value="logistics-field">
                    Logistics & Field Services (last-mile delivery, fleet maintenance)
                  </SelectItem>
                  <SelectItem value="tech-enabled">
                    Technology-Enabled Services (MSPs, IT services, digital agencies w/ retainers)
                  </SelectItem>
                  <SelectItem value="not-sure">I'm Not Sure Yet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
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
