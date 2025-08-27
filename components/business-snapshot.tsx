"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormData } from "../lib/calculations"

interface BusinessSnapshotProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  errors: Record<string, string>
}

export function BusinessSnapshot({ formData, updateFormData, errors }: BusinessSnapshotProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleAssetChange = (type: "realEstate" | "equipment", checked: boolean) => {
    if (type === "realEstate") {
      updateFormData({
        hasRealEstate: checked,
        assetValue: checked ? formData.assetValue : formData.hasEquipment ? formData.assetValue : 0,
      })
    } else {
      updateFormData({
        hasEquipment: checked,
        assetValue: checked ? formData.assetValue : formData.hasRealEstate ? formData.assetValue : 0,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Business Overview</h3>
        <p className="text-gray-600 mb-6">
          Tell us about the business you're evaluating to get an accurate valuation and risk assessment.
        </p>
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm font-medium text-black">
          Industry <span className="text-red-500">*</span>
        </Label>
        <Select value={formData.industry} onValueChange={(value) => updateFormData({ industry: value })}>
          <SelectTrigger className={`w-full ${errors.industry ? "border-red-500" : ""}`}>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Home Services">Home Services</SelectItem>
            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Construction">Construction</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
            <SelectItem value="Professional Services">Professional Services</SelectItem>
            <SelectItem value="Transportation/Logistics">Transportation/Logistics</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Food Service">Food Service</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
      </div>

      {/* Years in Business */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-black">
          Years in Business: {formData.yearsInBusiness}
          {formData.yearsInBusiness >= 50 ? "+" : ""}
        </Label>
        <Slider
          value={[formData.yearsInBusiness]}
          onValueChange={(value) => updateFormData({ yearsInBusiness: value[0] })}
          max={50}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1 year</span>
          <span>50+ years</span>
        </div>
      </div>

      {/* Financial Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="revenue" className="text-sm font-medium text-black">
            Annual Revenue <span className="text-red-500">*</span>
          </Label>
          <Input
            id="revenue"
            type="number"
            placeholder="1000000"
            value={formData.annualRevenue || ""}
            onChange={(e) => updateFormData({ annualRevenue: Number.parseInt(e.target.value) || 0 })}
            className={errors.annualRevenue ? "border-red-500" : ""}
          />
          {formData.annualRevenue > 0 && (
            <p className="text-xs text-gray-500">{formatCurrency(formData.annualRevenue)}</p>
          )}
          {errors.annualRevenue && <p className="text-sm text-red-500">{errors.annualRevenue}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ebitda" className="text-sm font-medium text-black">
            Annual EBITDA/Profit <span className="text-red-500">*</span>
          </Label>
          <Input
            id="ebitda"
            type="number"
            placeholder="200000"
            value={formData.ebitda || ""}
            onChange={(e) => updateFormData({ ebitda: Number.parseInt(e.target.value) || 0 })}
            className={errors.ebitda ? "border-red-500" : ""}
          />
          {formData.ebitda > 0 && <p className="text-xs text-gray-500">{formatCurrency(formData.ebitda)}</p>}
          {errors.ebitda && <p className="text-sm text-red-500">{errors.ebitda}</p>}
        </div>
      </div>

      {/* Owner Salary */}
      <div className="space-y-2">
        <Label htmlFor="ownerSalary" className="text-sm font-medium text-black">
          Owner Salary (Optional)
        </Label>
        <Input
          id="ownerSalary"
          type="number"
          placeholder="80000"
          value={formData.ownerSalary || ""}
          onChange={(e) => updateFormData({ ownerSalary: Number.parseInt(e.target.value) || 0 })}
        />
        {formData.ownerSalary > 0 && <p className="text-xs text-gray-500">{formatCurrency(formData.ownerSalary)}</p>}
        <p className="text-xs text-gray-500">Include if the owner takes a salary that could be added back to EBITDA</p>
      </div>

      {/* EBITDA Warning */}
      {errors.ebitdaWarning && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">⚠️ {errors.ebitdaWarning}</p>
        </div>
      )}

      {/* Assets */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-black">Assets Included in Sale</Label>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="realEstate"
              checked={formData.hasRealEstate}
              onCheckedChange={(checked) => handleAssetChange("realEstate", checked as boolean)}
            />
            <Label htmlFor="realEstate" className="text-sm">
              Real Estate
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="equipment"
              checked={formData.hasEquipment}
              onCheckedChange={(checked) => handleAssetChange("equipment", checked as boolean)}
            />
            <Label htmlFor="equipment" className="text-sm">
              Equipment/Machinery
            </Label>
          </div>
        </div>

        {(formData.hasRealEstate || formData.hasEquipment) && (
          <div className="space-y-2">
            <Label htmlFor="assetValue" className="text-sm font-medium text-black">
              Total Asset Value
            </Label>
            <Input
              id="assetValue"
              type="number"
              placeholder="500000"
              value={formData.assetValue || ""}
              onChange={(e) => updateFormData({ assetValue: Number.parseInt(e.target.value) || 0 })}
            />
            {formData.assetValue > 0 && <p className="text-xs text-gray-500">{formatCurrency(formData.assetValue)}</p>}
          </div>
        )}
      </div>

      {/* Purchase Price */}
      <div className="space-y-2">
        <Label htmlFor="purchasePrice" className="text-sm font-medium text-black">
          Purchase Price <span className="text-red-500">*</span>
        </Label>
        <Input
          id="purchasePrice"
          type="number"
          placeholder="1500000"
          value={formData.purchasePrice || ""}
          onChange={(e) => updateFormData({ purchasePrice: Number.parseInt(e.target.value) || 0 })}
          className={errors.purchasePrice ? "border-red-500" : ""}
        />
        {formData.purchasePrice > 0 && (
          <p className="text-xs text-gray-500">{formatCurrency(formData.purchasePrice)}</p>
        )}
        <p className="text-xs text-gray-500">The total amount the business is being offered or listed for</p>
        {errors.purchasePrice && <p className="text-sm text-red-500">{errors.purchasePrice}</p>}
      </div>
    </div>
  )
}
