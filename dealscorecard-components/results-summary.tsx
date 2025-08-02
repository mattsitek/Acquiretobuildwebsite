"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Lock } from "lucide-react"
import type { ScoreResults, FormData } from "../lib/calculations"

interface ResultsSummaryProps {
  scores: ScoreResults
  formData: FormData
  showCashFlow: boolean
}

export function ResultsSummary({ scores, formData, showCashFlow }: ResultsSummaryProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-700 bg-green-50 border-green-200"
    if (score >= 60) return "text-yellow-700 bg-yellow-50 border-yellow-200"
    return "text-red-700 bg-red-50 border-red-200"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5" />
    if (score >= 60) return <AlertTriangle className="w-5 h-5" />
    return <TrendingDown className="w-5 h-5" />
  }

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
      {/* Valuation Summary */}
      <Card className="shadow-sm border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Business Valuation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-black mb-1">
              {formatCurrency(scores.valuationLow)} - {formatCurrency(scores.valuationHigh)}
            </p>
            <p className="text-sm font-medium text-muted-foreground">Estimated Value Range</p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Adjusted EBITDA:</span>
              <span className="font-semibold text-black">{formatCurrency(scores.adjustedEbitda)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Industry Multiple:</span>
              <span className="font-semibold text-black">
                {scores.adjustedLowMultiple.toFixed(1)}x - {scores.adjustedHighMultiple.toFixed(1)}x
              </span>
            </div>
            {formData.assetValue > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-700">Asset Value:</span>
                <span className="font-semibold text-black">{formatCurrency(formData.assetValue)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Score Cards */}
      <div className="space-y-4">
        {/* Price to Value Score */}
        <Card className={`border-2 shadow-sm ${getScoreColor(scores.priceToValueScore)}`}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getScoreIcon(scores.priceToValueScore)}
                <span className="font-semibold text-base">Price to Value</span>
              </div>
              <Badge variant="secondary" className="text-xl font-bold px-3 py-1">
                {scores.priceToValueScore}
              </Badge>
            </div>
            <p className="text-sm mt-2 font-medium">
              {scores.priceToValueScore >= 80
                ? "Great deal!"
                : scores.priceToValueScore >= 60
                  ? "Fair pricing"
                  : "Overpriced"}
            </p>
          </CardContent>
        </Card>

        {/* Owner Dependence Score */}
        <Card className={`border-2 shadow-sm ${getScoreColor(scores.ownerDependenceScore)}`}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getScoreIcon(scores.ownerDependenceScore)}
                <span className="font-semibold text-base">Owner Dependency</span>
              </div>
              <Badge variant="secondary" className="text-xl font-bold px-3 py-1">
                {scores.ownerDependenceScore}
              </Badge>
            </div>
            <p className="text-sm mt-2 font-medium">
              {scores.ownerDependenceScore >= 80
                ? "Low risk"
                : scores.ownerDependenceScore >= 60
                  ? "Moderate risk"
                  : "High risk"}
            </p>
          </CardContent>
        </Card>

        {/* Cash Flow Score - Always show but lock if email not captured */}
        <Card
          className={`border-2 shadow-sm ${showCashFlow && scores.cashFlowScore !== undefined ? getScoreColor(scores.cashFlowScore) : "border-muted bg-muted/30"}`}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {showCashFlow && scores.cashFlowScore !== undefined ? (
                  getScoreIcon(scores.cashFlowScore)
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
                <span className="font-semibold text-base">Cash Flow</span>
              </div>
              <Badge variant="secondary" className="text-xl font-bold px-3 py-1">
                {showCashFlow && scores.cashFlowScore !== undefined ? scores.cashFlowScore : "?"}
              </Badge>
            </div>
            {showCashFlow && scores.cashFlowScore !== undefined ? (
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-700">DSCR: {scores.dscr?.toFixed(2) || "N/A"}</p>
                {scores.monthlyDebtPayment && (
                  <p className="text-gray-700">Monthly debt: {formatCurrency(scores.monthlyDebtPayment)}</p>
                )}
                {scores.monthlyIncomeAfterDebt !== undefined && (
                  <>
                    <p className="text-gray-700">
                      Monthly income after debt: {formatCurrency(scores.monthlyIncomeAfterDebt)}
                    </p>
                    <p className="text-gray-700">
                      Annual estimated income: {formatCurrency(scores.annualIncomeAfterDebt || 0)}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground font-medium">Enter email to unlock cash flow analysis</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Overall Score */}
      <Card className="shadow-sm border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-6 text-center">
          <h3 className="font-bold text-black mb-3 text-lg">Overall Deal Score</h3>
          <div className="text-4xl font-black text-primary mb-3">{scores.overallScore}</div>
          <p className="text-sm font-medium text-gray-700">
            {scores.overallScore >= 80
              ? "Excellent opportunity"
              : scores.overallScore >= 70
                ? "Good deal with potential"
                : scores.overallScore >= 60
                  ? "Proceed with caution"
                  : "High risk - consider alternatives"}
          </p>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="shadow-sm border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-black">Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scores.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
              <p className="text-sm text-gray-700 leading-relaxed">{rec}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
