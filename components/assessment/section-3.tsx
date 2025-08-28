"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { DollarSign, MapPin, Building, CreditCard, Repeat, TrendingUp, Users, Target, Globe } from "lucide-react"
import type { AssessmentData } from "@/lib/assessment-logic"

interface Section3Props {
  data: AssessmentData
  onUpdate: (field: keyof AssessmentData, value: string) => void
}

export function AssessmentSection3({ data, onUpdate }: Section3Props) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Deal Box Parameters</h2>
        <p className="text-lg text-gray-600">Help us understand your ideal business acquisition profile</p>
      </div>

      {/* Question 1: Target Income */}
      <Card className="border-2 hover:border-blue-200 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-green-600" />
            What's your target annual income from the business?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.targetIncome}
            onValueChange={(value) => onUpdate("targetIncome", value)}
            className="space-y-3"
          >
            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.targetIncome === "75k-150k" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="75k-150k" id="income-75k" />
                <Label htmlFor="income-75k" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  $75K - $150K annually
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.targetIncome === "150k-250k" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="150k-250k" id="income-150k" />
                <Label htmlFor="income-150k" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  $150K - $250K annually
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.targetIncome === "250k-400k" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="250k-400k" id="income-250k" />
                <Label htmlFor="income-250k" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  $250K - $400K annually
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.targetIncome === "400k-500k" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="400k-500k" id="income-400k" />
                <Label htmlFor="income-400k" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  $400K - $500K annually
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.targetIncome === "500k+" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="500k+" id="income-500k" />
                <Label htmlFor="income-500k" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  $500K+ annually
                </Label>
              </div>
            </Card>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Question 2: Capital Available */}
      <Card className="border-2 hover:border-blue-200 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-blue-600" />
            How much capital do you have available for a down payment?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.capitalAvailable}
            onValueChange={(value) => onUpdate("capitalAvailable", value)}
            className="space-y-3"
          >
            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.capitalAvailable === "50k-100k" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="50k-100k" id="capital-50k" />
                <Label htmlFor="capital-50k" className="flex items-center gap-2 cursor-pointer flex-1">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  $50K - $100K
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.capitalAvailable === "100k-250k" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="100k-250k" id="capital-100k" />
                <Label htmlFor="capital-100k" className="flex items-center gap-2 cursor-pointer flex-1">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  $100K - $250K
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.capitalAvailable === "250k-500k" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="250k-500k" id="capital-250k" />
                <Label htmlFor="capital-250k" className="flex items-center gap-2 cursor-pointer flex-1">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  $250K - $500K
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.capitalAvailable === "500k-1m" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="500k-1m" id="capital-500k" />
                <Label htmlFor="capital-500k" className="flex items-center gap-2 cursor-pointer flex-1">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  $500K - $1M
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.capitalAvailable === "1m+" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="1m+" id="capital-1m" />
                <Label htmlFor="capital-1m" className="flex items-center gap-2 cursor-pointer flex-1">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  $1M+
                </Label>
              </div>
            </Card>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Question 3: Industry Preference - NOW DROPDOWN */}
      <Card className="border-2 hover:border-blue-200 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Building className="w-6 h-6 text-purple-600" />
            What industry interests you most?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={data.industryPreference} onValueChange={(value) => onUpdate("industryPreference", value)}>
            <SelectTrigger className="w-full h-12 text-left">
              <SelectValue placeholder="Select an industry..." />
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
        </CardContent>
      </Card>

      {/* Question 4: Geography */}
      <Card className="border-2 hover:border-blue-200 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-red-600" />
            What's your preferred geographic scope?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.geography}
            onValueChange={(value) => onUpdate("geography", value)}
            className="space-y-3"
          >
            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.geography === "25-miles" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="25-miles" id="geo-25" />
                <Label htmlFor="geo-25" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Target className="w-4 h-4 text-red-500" />
                  Within 25 miles of my location
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.geography === "50-miles" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="50-miles" id="geo-50" />
                <Label htmlFor="geo-50" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Target className="w-4 h-4 text-red-500" />
                  Within 50 miles of my location
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.geography === "100-miles" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="100-miles" id="geo-100" />
                <Label htmlFor="geo-100" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Target className="w-4 h-4 text-red-500" />
                  Within 100 miles of my location
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.geography === "statewide" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="statewide" id="geo-state" />
                <Label htmlFor="geo-state" className="flex items-center gap-2 cursor-pointer flex-1">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Statewide
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.geography === "regional" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="regional" id="geo-regional" />
                <Label htmlFor="geo-regional" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Globe className="w-4 h-4 text-red-500" />
                  Regional (multi-state)
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.geography === "relocate" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="relocate" id="geo-relocate" />
                <Label htmlFor="geo-relocate" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Globe className="w-4 h-4 text-red-500" />
                  Open to relocation
                </Label>
              </div>
            </Card>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Question 5: Business Model */}
      <Card className="border-2 hover:border-blue-200 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Repeat className="w-6 h-6 text-green-600" />
            What business model appeals to you most?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.businessModel}
            onValueChange={(value) => onUpdate("businessModel", value)}
            className="space-y-3"
          >
            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.businessModel === "recurring" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="recurring" id="model-recurring" />
                <Label htmlFor="model-recurring" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Repeat className="w-4 h-4 text-green-500" />
                  Recurring revenue (subscriptions, contracts)
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.businessModel === "project" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="project" id="model-project" />
                <Label htmlFor="model-project" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Building className="w-4 h-4 text-green-500" />
                  Project-based work
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.businessModel === "mixed" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="mixed" id="model-mixed" />
                <Label htmlFor="model-mixed" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Mixed revenue model
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.businessModel === "product" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="product" id="model-product" />
                <Label htmlFor="model-product" className="flex items-center gap-2 cursor-pointer flex-1">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  Product sales with services
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.businessModel === "no-preference" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="no-preference" id="model-none" />
                <Label htmlFor="model-none" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Users className="w-4 h-4 text-green-500" />
                  No strong preference
                </Label>
              </div>
            </Card>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Question 6: Credit Score */}
      <Card className="border-2 hover:border-blue-200 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            What's your approximate credit score?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.creditScore}
            onValueChange={(value) => onUpdate("creditScore", value)}
            className="space-y-3"
          >
            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.creditScore === "excellent" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="excellent" id="credit-excellent" />
                <Label htmlFor="credit-excellent" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Excellent (750+)
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.creditScore === "good" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="good" id="credit-good" />
                <Label htmlFor="credit-good" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  Good (700-749)
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.creditScore === "fair" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="fair" id="credit-fair" />
                <Label htmlFor="credit-fair" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-yellow-500" />
                  Fair (650-699)
                </Label>
              </div>
            </Card>

            <Card
              className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 ${
                data.creditScore === "poor" ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="poor" id="credit-poor" />
                <Label htmlFor="credit-poor" className="flex items-center gap-2 cursor-pointer flex-1">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  Needs Improvement (below 650)
                </Label>
              </div>
            </Card>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
