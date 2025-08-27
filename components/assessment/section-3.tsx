"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, CreditCard, Target, Handshake } from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"

interface Section3Props {
  data: AssessmentData
  onUpdate: (updates: Partial<AssessmentData>) => void
}

export function AssessmentSection3({ data, onUpdate }: Section3Props) {
  return (
    <div className="space-y-8">
      {/* Question 1: Geography */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          What's your preferred geographic range for business opportunities?
        </h3>
        <RadioGroup
          value={data.geography}
          onValueChange={(value) => onUpdate({ geography: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="local-25" id="local-25" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <Label htmlFor="local-25" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Local (Within 25 miles)</div>
                    <div className="text-sm text-gray-600">Stay close to home, easy daily management</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="regional-50" id="regional-50" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <Label htmlFor="regional-50" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Regional (Within 50 miles)</div>
                    <div className="text-sm text-gray-600">Reasonable commute for regular visits</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="extended-100" id="extended-100" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <Label htmlFor="extended-100" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Extended (Within 100 miles)</div>
                    <div className="text-sm text-gray-600">Willing to travel for the right opportunity</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="statewide" id="statewide" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <Label htmlFor="statewide" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Statewide</div>
                    <div className="text-sm text-gray-600">Anywhere within my state</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="national" id="national" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <Label htmlFor="national" className="cursor-pointer">
                  <div>
                    <div className="font-medium">National</div>
                    <div className="text-sm text-gray-600">Open to opportunities anywhere in the country</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="relocate" id="relocate" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <Label htmlFor="relocate" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Willing to Relocate</div>
                    <div className="text-sm text-gray-600">Ready to move for the perfect business</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 2: Business Model Preference */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What type of business model appeals to you most?</h3>
        <RadioGroup
          value={data.businessModel}
          onValueChange={(value) => onUpdate({ businessModel: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="recurring-revenue" id="recurring-revenue" />
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-green-600" />
                  <Label htmlFor="recurring-revenue" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Recurring Revenue</div>
                      <div className="text-sm text-gray-600">Subscriptions, contracts, predictable income</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Most Stable
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="service-based" id="service-based" />
                <div className="flex items-center space-x-2">
                  <Handshake className="w-5 h-5 text-blue-600" />
                  <Label htmlFor="service-based" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Service-Based</div>
                      <div className="text-sm text-gray-600">Professional services, consulting, expertise-driven</div>
                    </div>
                  </Label>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                High Margins
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="product-based" id="product-based" />
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-purple-600" />
                <Label htmlFor="product-based" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Product-Based</div>
                    <div className="text-sm text-gray-600">Manufacturing, retail, physical goods</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="franchise" id="franchise" />
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-600" />
                <Label htmlFor="franchise" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Franchise</div>
                    <div className="text-sm text-gray-600">Proven system, brand recognition, support</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="mixed-model" id="mixed-model" />
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-gray-600" />
                <Label htmlFor="mixed-model" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Mixed Model</div>
                    <div className="text-sm text-gray-600">Combination of products and services</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>
        </RadioGroup>
      </div>

      {/* Question 3: Desired Annual Income */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What's your target annual income from the business?</h3>
        <Select value={data.desiredIncome} onValueChange={(value) => onUpdate({ desiredIncome: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your target income range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="75-100k">$75,000 - $100,000</SelectItem>
            <SelectItem value="100-150k">$100,000 - $150,000</SelectItem>
            <SelectItem value="150-250k">$150,000 - $250,000</SelectItem>
            <SelectItem value="250-400k">$250,000 - $400,000</SelectItem>
            <SelectItem value="400k+">$400,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Question 4: Available Capital */}
      <div>
        <h3 className="text-lg font-semibold mb-4">How much capital do you have available for a down payment?</h3>
        <Select value={data.availableCapital} onValueChange={(value) => onUpdate({ availableCapital: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your available capital" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50-100k">$50,000 - $100,000</SelectItem>
            <SelectItem value="100-250k">$100,000 - $250,000</SelectItem>
            <SelectItem value="250-500k">$250,000 - $500,000</SelectItem>
            <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
            <SelectItem value="1m+">$1,000,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Question 5: Industry Preference */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Do you have a preferred industry or are you industry-agnostic?</h3>
        <Select value={data.industryPreference} onValueChange={(value) => onUpdate({ industryPreference: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select industry preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="healthcare">Healthcare Services</SelectItem>
            <SelectItem value="professional-services">Professional Services</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="food-beverage">Food & Beverage</SelectItem>
            <SelectItem value="home-services">Home Services</SelectItem>
            <SelectItem value="education">Education & Training</SelectItem>
            <SelectItem value="agnostic">Industry Agnostic (Best Deal Wins)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Question 6: Seller Transition */}
      <div>
        <h3 className="text-lg font-semibold mb-4">How important is seller transition support?</h3>
        <RadioGroup
          value={data.sellerTransition}
          onValueChange={(value) => onUpdate({ sellerTransition: value })}
          className="space-y-3"
        >
          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="essential" id="essential" />
              <div className="flex items-center space-x-2">
                <Handshake className="w-5 h-5 text-green-600" />
                <Label htmlFor="essential" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Essential</div>
                    <div className="text-sm text-gray-600">Need 6+ months of hands-on training</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="preferred" id="preferred" />
              <div className="flex items-center space-x-2">
                <Handshake className="w-5 h-5 text-blue-600" />
                <Label htmlFor="preferred" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Preferred</div>
                    <div className="text-sm text-gray-600">Want 3-6 months of support</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="minimal" id="minimal" />
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <Label htmlFor="minimal" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Minimal</div>
                    <div className="text-sm text-gray-600">Just need basic handover</div>
                  </div>
                </Label>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="none" id="none" />
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-red-600" />
                <Label htmlFor="none" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Not Needed</div>
                    <div className="text-sm text-gray-600">Ready to take over immediately</div>
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
