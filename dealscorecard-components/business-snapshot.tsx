"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import type { FormData } from "../lib/calculations"

interface BusinessSnapshotProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  errors: Record<string, string>
}

const industries = [
  "Home Services",
  "Manufacturing",
  "Healthcare",
  "Construction",
  "Retail",
  "Professional Services",
  "Transportation/Logistics",
  "Technology",
  "Food Service",
  "Other",
]

export function BusinessSnapshot({ formData, updateFormData, errors }: BusinessSnapshotProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Business Overview</h3>

        {/* Industry */}
        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Select value={formData.industry} onValueChange={(value) => updateFormData({ industry: value })}>
            <SelectTrigger className={errors.industry ? "border-red-500" : ""}>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && <p className="text-sm text-red-600">{errors.industry}</p>}
        </div>

        {/* Years in Business */}
        <div className="space-y-2">
          <Label>Years in Business: {formData.yearsInBusiness} years</Label>
          <Slider
            value={[formData.yearsInBusiness]}
            onValueChange={([value]) => updateFormData({ yearsInBusiness: value })}
            min={5}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>5 years</span>
            <span>50+ years</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Annual Revenue */}
        <div className="space-y-2">
          <Label htmlFor="revenue">Annual Revenue *</Label>
          <Input
            id="revenue"
            type="number"
            placeholder="0"
            value={formData.annualRevenue || ""}
            onChange={(e) => updateFormData({ annualRevenue: Number(e.target.value) })}
            className={errors.annualRevenue ? "border-red-500" : ""}
          />
          {errors.annualRevenue && <p className="text-sm text-red-600">{errors.annualRevenue}</p>}
        </div>

        {/* EBITDA */}
        <div className="space-y-2">
          <Label htmlFor="ebitda">Annual EBITDA/Profit *</Label>
          <Input
            id="ebitda"
            type="number"
            placeholder="0"
            value={formData.ebitda || ""}
            onChange={(e) => updateFormData({ ebitda: Number(e.target.value) })}
            className={errors.ebitda ? "border-red-500" : ""}
          />
          {errors.ebitda && <p className="text-sm text-red-600">{errors.ebitda}</p>}
        </div>

        {/* Owner Salary */}
        <div className="space-y-2">
          <Label htmlFor="ownerSalary">Owner Salary (optional)</Label>
          <Input
            id="ownerSalary"
            type="number"
            placeholder="0"
            value={formData.ownerSalary || ""}
            onChange={(e) => updateFormData({ ownerSalary: Number(e.target.value) })}
          />
        </div>

        {/* Purchase Price */}
        <div className="space-y-2">
          <Label htmlFor="purchasePrice">Purchase Price *</Label>
          <Input
            id="purchasePrice"
            type="number"
            placeholder="0"
            value={formData.purchasePrice || ""}
            onChange={(e) => updateFormData({ purchasePrice: Number(e.target.value) })}
            className={errors.purchasePrice ? "border-red-500" : ""}
          />
          <p className="text-xs text-gray-500">The total amount the business is being offered or listed for</p>
          {errors.purchasePrice && <p className="text-sm text-red-600">{errors.purchasePrice}</p>}
        </div>
      </div>

      {/* Assets */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Assets Included</Label>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="realEstate"
              checked={formData.hasRealEstate}
              onCheckedChange={(checked) => updateFormData({ hasRealEstate: !!checked })}
            />
            <Label htmlFor="realEstate">Real Estate</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="equipment"
              checked={formData.hasEquipment}
              onCheckedChange={(checked) => updateFormData({ hasEquipment: !!checked })}
            />
            <Label htmlFor="equipment">Equipment</Label>
          </div>
        </div>

        {(formData.hasRealEstate || formData.hasEquipment) && (
          <div className="space-y-2">
            <Label htmlFor="assetValue">Total Asset Value</Label>
            <Input
              id="assetValue"
              type="number"
              placeholder="0"
              value={formData.assetValue || ""}
              onChange={(e) => updateFormData({ assetValue: Number(e.target.value) })}
            />
          </div>
        )}
      </div>

      {/* Warning for EBITDA + Salary > Revenue */}
      {errors.ebitdaWarning && (
        <Alert className="border-yellow-500 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">{errors.ebitdaWarning}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
