"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "@/app/lib/calculations"

interface OwnerInvolvementProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  errors: Record<string, string>
}

export function OwnerInvolvement({ formData, updateFormData, errors }: OwnerInvolvementProps) {
  const getInvolvementLabel = (level: number) => {
    const labels = {
      1: "Minimal - Strategic oversight only",
      2: "Low - Weekly check-ins",
      3: "Moderate - Several hours daily",
      4: "High - Full-time involvement",
      5: "Critical - Business depends entirely on owner",
    }
    return labels[level as keyof typeof labels] || ""
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Owner Dependency Assessment</h3>
        <p className="text-gray-600 mb-6">
          Understanding how dependent the business is on the current owner helps assess operational risk.
        </p>
      </div>

      {/* Owner Involvement Level */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-black">
          Owner's Daily Involvement Level: {formData.ownerInvolvement}
        </Label>
        <div className="px-3">
          <Slider
            value={[formData.ownerInvolvement]}
            onValueChange={(value) => updateFormData({ ownerInvolvement: value[0] })}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 px-3">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <strong>Level {formData.ownerInvolvement}:</strong> {getInvolvementLabel(formData.ownerInvolvement)}
        </p>
      </div>

      {/* Can business run without owner */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-black">
          Can the business run without the owner for 30 days? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.runsWithoutOwner}
          onValueChange={(value) => updateFormData({ runsWithoutOwner: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="runs-yes" />
            <Label htmlFor="runs-yes" className="text-sm">
              Yes - Business operates independently
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="somewhat" id="runs-somewhat" />
            <Label htmlFor="runs-somewhat" className="text-sm">
              Somewhat - Minor issues but manageable
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="runs-no" />
            <Label htmlFor="runs-no" className="text-sm">
              No - Would face significant problems
            </Label>
          </div>
        </RadioGroup>
        {errors.runsWithoutOwner && <p className="text-sm text-red-500">{errors.runsWithoutOwner}</p>}
      </div>

      {/* Second in command */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-black">
          Is there a capable second-in-command? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.hasSecondInCommand}
          onValueChange={(value) => updateFormData({ hasSecondInCommand: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="second-yes" />
            <Label htmlFor="second-yes" className="text-sm">
              Yes - Experienced manager ready to step up
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="second-no" />
            <Label htmlFor="second-no" className="text-sm">
              No - No clear successor identified
            </Label>
          </div>
        </RadioGroup>
        {errors.hasSecondInCommand && <p className="text-sm text-red-500">{errors.hasSecondInCommand}</p>}
      </div>

      {/* Financial records */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-black">
          Are financial records up to date and accurate? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.financialRecords}
          onValueChange={(value) => updateFormData({ financialRecords: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="records-yes" />
            <Label htmlFor="records-yes" className="text-sm">
              Yes - Professional bookkeeping, current financials
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="somewhat" id="records-somewhat" />
            <Label htmlFor="records-somewhat" className="text-sm">
              Somewhat - Basic records, some gaps
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="records-no" />
            <Label htmlFor="records-no" className="text-sm">
              No - Poor record keeping, outdated information
            </Label>
          </div>
        </RadioGroup>
        {errors.financialRecords && <p className="text-sm text-red-500">{errors.financialRecords}</p>}
      </div>

      {/* Standard Operating Procedures */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-black">
          Are Standard Operating Procedures (SOPs) documented? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.sops}
          onValueChange={(value) => updateFormData({ sops: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="well-documented" id="sops-well" />
            <Label htmlFor="sops-well" className="text-sm">
              Well Documented - Comprehensive procedures in place
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-documented" id="sops-not" />
            <Label htmlFor="sops-not" className="text-sm">
              Not Documented - Processes exist but not written down
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-sure" id="sops-unsure" />
            <Label htmlFor="sops-unsure" className="text-sm">
              Not Sure Yet - Need to investigate further
            </Label>
          </div>
        </RadioGroup>
        {errors.sops && <p className="text-sm text-red-500">{errors.sops}</p>}
      </div>
    </div>
  )
}
