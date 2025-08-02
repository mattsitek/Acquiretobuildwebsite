"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import type { FormData } from "../lib/calculations"

interface OwnerInvolvementProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  errors: Record<string, string>
}

const involvementLabels = [
  "Minimal - Strategic oversight only",
  "Low - Weekly check-ins",
  "Moderate - Part-time involvement",
  "High - Daily involvement",
  "Critical - Business depends on owner",
]

export function OwnerInvolvement({ formData, updateFormData, errors }: OwnerInvolvementProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Owner Dependency Assessment</h3>

        {/* Owner Involvement Level */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Owner Involvement Level: {formData.ownerInvolvement}</Label>
          <Slider
            value={[formData.ownerInvolvement]}
            onValueChange={([value]) => updateFormData({ ownerInvolvement: value })}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
          <p className="text-sm text-gray-600">{involvementLabels[formData.ownerInvolvement - 1]}</p>
        </div>
      </div>

      {/* Can business run without owner */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Can the business run without the owner for 30 days? *</Label>
        <RadioGroup
          value={formData.runsWithoutOwner}
          onValueChange={(value) => updateFormData({ runsWithoutOwner: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="runs-yes" />
            <Label htmlFor="runs-yes">Yes - Business operates independently</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="somewhat" id="runs-somewhat" />
            <Label htmlFor="runs-somewhat">Somewhat - With some remote oversight</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="runs-no" />
            <Label htmlFor="runs-no">No - Owner presence is critical</Label>
          </div>
        </RadioGroup>
        {errors.runsWithoutOwner && <p className="text-sm text-red-600">{errors.runsWithoutOwner}</p>}
      </div>

      {/* Second in command */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Is there a capable second-in-command? *</Label>
        <RadioGroup
          value={formData.hasSecondInCommand}
          onValueChange={(value) => updateFormData({ hasSecondInCommand: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="second-yes" />
            <Label htmlFor="second-yes">Yes - Strong management team</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="second-no" />
            <Label htmlFor="second-no">No - Owner handles everything</Label>
          </div>
        </RadioGroup>
        {errors.hasSecondInCommand && <p className="text-sm text-red-600">{errors.hasSecondInCommand}</p>}
      </div>

      {/* Financial records */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Are financial records up to date and accurate? *</Label>
        <RadioGroup
          value={formData.financialRecords}
          onValueChange={(value) => updateFormData({ financialRecords: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="records-yes" />
            <Label htmlFor="records-yes">Yes - Professional bookkeeping</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="somewhat" id="records-somewhat" />
            <Label htmlFor="records-somewhat">Somewhat - Basic records kept</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="records-no" />
            <Label htmlFor="records-no">No - Poor or missing records</Label>
          </div>
        </RadioGroup>
        {errors.financialRecords && <p className="text-sm text-red-600">{errors.financialRecords}</p>}
      </div>

      {/* Standard Operating Procedures */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Are standard operating procedures (SOPs) documented? *</Label>
        <RadioGroup
          value={formData.sops}
          onValueChange={(value) => updateFormData({ sops: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="well-documented" id="sops-documented" />
            <Label htmlFor="sops-documented">Well Documented - Comprehensive procedures in place</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-documented" id="sops-not-documented" />
            <Label htmlFor="sops-not-documented">Not Documented - Processes exist but not written down</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-sure" id="sops-not-sure" />
            <Label htmlFor="sops-not-sure">Not Sure Yet - Need to investigate further</Label>
          </div>
        </RadioGroup>
        {errors.sops && <p className="text-sm text-red-600">{errors.sops}</p>}
      </div>
    </div>
  )
}
