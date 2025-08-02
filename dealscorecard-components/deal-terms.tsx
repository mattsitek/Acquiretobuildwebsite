"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import type { FormData } from "../lib/calculations"

interface DealTermsProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  errors: Record<string, string>
  emailCaptured: boolean
}

export function DealTerms({ formData, updateFormData, errors, emailCaptured }: DealTermsProps) {
  const totalFinancing =
    formData.downPayment + formData.conventionalLoan + formData.sba7a + formData.sba504 + formData.sellerNote
  const remaining = Math.max(0, formData.purchasePrice - totalFinancing)

  if (!emailCaptured) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Want to know if this deal will actually cashflow?</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          You've got the price. You've seen the risk. Now see if the deal will actually pay you. Unlock your Cash Flow
          Scorecard by telling us how you plan to finance it.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Financing Structure</h3>
        <p className="text-gray-600 mb-6">
          Break down how you plan to finance this ${formData.purchasePrice.toLocaleString()} acquisition.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Down Payment */}
        <div className="space-y-2">
          <Label htmlFor="downPayment">Down Payment</Label>
          <Input
            id="downPayment"
            type="number"
            placeholder="0"
            value={formData.downPayment || ""}
            onChange={(e) => updateFormData({ downPayment: Number(e.target.value) })}
          />
        </div>

        {/* Conventional Loan */}
        <div className="space-y-2">
          <Label htmlFor="conventionalLoan">Conventional Loan</Label>
          <Input
            id="conventionalLoan"
            type="number"
            placeholder="0"
            value={formData.conventionalLoan || ""}
            onChange={(e) => updateFormData({ conventionalLoan: Number(e.target.value) })}
          />
          <p className="text-xs text-gray-500">Typically 10% rate, 10 year term</p>
        </div>

        {/* SBA 7(a) */}
        <div className="space-y-2">
          <Label htmlFor="sba7a">SBA 7(a) Loan</Label>
          <Input
            id="sba7a"
            type="number"
            placeholder="0"
            value={formData.sba7a || ""}
            onChange={(e) => updateFormData({ sba7a: Number(e.target.value) })}
          />
          <p className="text-xs text-gray-500">Typically 10% rate, 10 year term</p>
        </div>

        {/* SBA 504 */}
        <div className="space-y-2">
          <Label htmlFor="sba504">SBA 504 Loan</Label>
          <Input
            id="sba504"
            type="number"
            placeholder="0"
            value={formData.sba504 || ""}
            onChange={(e) => updateFormData({ sba504: Number(e.target.value) })}
          />
          <p className="text-xs text-gray-500">Typically 6% rate, 20 year term</p>
        </div>

        {/* Seller Note */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="sellerNote">Seller Note</Label>
          <Input
            id="sellerNote"
            type="number"
            placeholder="0"
            value={formData.sellerNote || ""}
            onChange={(e) => updateFormData({ sellerNote: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Financing Summary */}
      <Card className="bg-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Financing Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Total Financing:</span>
            <span className="font-medium">${totalFinancing.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Purchase Price:</span>
            <span className="font-medium">${formData.purchasePrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className={remaining > 0 ? "text-red-600" : "text-green-600"}>
              {remaining > 0 ? "Remaining:" : "Fully Financed"}
            </span>
            <span className={`font-medium ${remaining > 0 ? "text-red-600" : "text-green-600"}`}>
              ${remaining.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
