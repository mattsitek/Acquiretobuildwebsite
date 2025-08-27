export interface FormData {
  // Business Snapshot
  industry: string
  yearsInBusiness: number
  annualRevenue: number
  ebitda: number
  ownerSalary: number
  hasRealEstate: boolean
  hasEquipment: boolean
  assetValue: number
  purchasePrice: number

  // Owner Involvement
  ownerInvolvement: number
  runsWithoutOwner: string
  hasSecondInCommand: string
  financialRecords: string
  sops: string

  // Deal Terms
  email: string
  downPayment: number
  conventionalLoan: number
  sba7a: number
  sba504: number
  sellerNote: number
}

export interface ScoreResults {
  adjustedEbitda: number
  adjustedLowMultiple: number
  adjustedHighMultiple: number
  valuationLow: number
  valuationHigh: number
  priceToValueScore: number
  ownerDependenceScore: number
  cashFlowScore?: number
  overallScore: number
  dscr?: number
  monthlyDebtPayment?: number
  monthlyIncomeAfterDebt?: number
  annualIncomeAfterDebt?: number
  recommendations: string[]
}

const industryMultiples: Record<string, [number, number]> = {
  "Home Services": [2.5, 3.5],
  Manufacturing: [3.0, 5.0],
  Healthcare: [3.5, 5.5],
  Construction: [2.5, 4.0],
  Retail: [1.5, 2.5],
  "Professional Services": [2.0, 4.0],
  "Transportation/Logistics": [2.5, 4.5],
  Technology: [3.0, 6.0],
  "Food Service": [1.5, 2.5],
  Other: [2.0, 3.5],
}

export function calculateScores(formData: FormData): ScoreResults {
  // Calculate Adjusted EBITDA
  const adjustedEbitda = formData.ebitda + formData.ownerSalary

  // Get base industry multiples
  const [baseLowMultiple, baseHighMultiple] = industryMultiples[formData.industry] || [2.0, 3.5]

  // Apply adjustments
  let adjustedLowMultiple = baseLowMultiple
  let adjustedHighMultiple = baseHighMultiple

  // Positive Adjustments (+0.5x)
  // Daily involvement < 3 AND business runs without owner
  if (formData.ownerInvolvement < 3 && formData.runsWithoutOwner === "yes") {
    adjustedLowMultiple += 0.5
    adjustedHighMultiple += 0.5
  }

  // Standard Operating Procedures (SOPs) are documented
  if (formData.sops === "well-documented") {
    adjustedLowMultiple += 0.5
    adjustedHighMultiple += 0.5
  }

  // Negative Adjustments (-0.5x)
  // Bookkeeping is rated as "Somewhat" or daily involvement >= 3
  if (formData.financialRecords === "somewhat" || formData.ownerInvolvement >= 3) {
    adjustedLowMultiple -= 0.5
    adjustedHighMultiple -= 0.5
  }

  // SOPs not documented
  if (formData.sops === "not-documented") {
    adjustedLowMultiple -= 0.5
    adjustedHighMultiple -= 0.5
  }

  // Ensure multiples don't go below reasonable minimums
  adjustedLowMultiple = Math.max(adjustedLowMultiple, 1.0)
  adjustedHighMultiple = Math.max(adjustedHighMultiple, 1.5)

  // Calculate valuation range
  const valuationLow = adjustedEbitda * adjustedLowMultiple + formData.assetValue
  const valuationHigh = adjustedEbitda * adjustedHighMultiple + formData.assetValue

  // Calculate Price to Value Score
  let priceToValueScore = 0
  if (formData.purchasePrice <= valuationLow) {
    priceToValueScore = 100
  } else if (formData.purchasePrice <= valuationHigh) {
    priceToValueScore = 80
  } else {
    const overvaluation = (formData.purchasePrice - valuationHigh) / valuationHigh
    priceToValueScore = Math.max(0, 75 - Math.floor(overvaluation * 10) * 10)
  }

  // Calculate Owner Dependence Score
  let ownerDependenceScore = 0 // Base score changed from 60 to 0

  // Owner involvement scoring: Level 1 = 40, Level 2 = 30, Level 3 = 20, Level 4 = 10, Level 5 = 0
  const involvementScores = [40, 30, 20, 10, 0] // Index 0 = Level 1, Index 1 = Level 2, etc.
  ownerDependenceScore += involvementScores[formData.ownerInvolvement - 1] || 0

  // Can business run without owner: Yes = 15, Somewhat = 10, No = 0
  if (formData.runsWithoutOwner === "yes") ownerDependenceScore += 15
  else if (formData.runsWithoutOwner === "somewhat") ownerDependenceScore += 10

  // Second-in-command: Yes = 15, No = 0
  if (formData.hasSecondInCommand === "yes") ownerDependenceScore += 15

  // Financial records: Yes = 15, Somewhat = 5, No = 0
  if (formData.financialRecords === "yes") ownerDependenceScore += 15
  else if (formData.financialRecords === "somewhat") ownerDependenceScore += 5

  // SOPs: Well Documented = 15, Not Documented = 0, Not Sure Yet = 0
  if (formData.sops === "well-documented") ownerDependenceScore += 15

  ownerDependenceScore = Math.max(0, Math.min(100, ownerDependenceScore))

  // Calculate Cash Flow Score (if financing data available)
  let cashFlowScore: number | undefined
  let dscr: number | undefined
  let monthlyDebtPayment: number | undefined
  let monthlyIncomeAfterDebt: number | undefined
  let annualIncomeAfterDebt: number | undefined

  const totalFinancing =
    formData.downPayment + formData.conventionalLoan + formData.sba7a + formData.sba504 + formData.sellerNote

  if (totalFinancing > 0 && formData.email) {
    // Calculate monthly debt payments using default rates
    let monthlyPayment = 0

    // Conventional loan: 10% / 10 years
    if (formData.conventionalLoan > 0) {
      const rate = 0.1 / 12
      const periods = 10 * 12
      monthlyPayment +=
        (formData.conventionalLoan * rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1)
    }

    // SBA 7(a): 10% / 10 years
    if (formData.sba7a > 0) {
      const rate = 0.1 / 12
      const periods = 10 * 12
      monthlyPayment += (formData.sba7a * rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1)
    }

    // SBA 504: 6% / 20 years
    if (formData.sba504 > 0) {
      const rate = 0.06 / 12
      const periods = 20 * 12
      monthlyPayment += (formData.sba504 * rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1)
    }

    // Seller note (assume 6% / 7 years)
    if (formData.sellerNote > 0) {
      const rate = 0.06 / 12
      const periods = 7 * 12
      monthlyPayment += (formData.sellerNote * rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1)
    }

    monthlyDebtPayment = monthlyPayment
    const monthlyIncome = adjustedEbitda / 12
    monthlyIncomeAfterDebt = monthlyIncome - monthlyDebtPayment
    annualIncomeAfterDebt = monthlyIncomeAfterDebt * 12
    dscr = monthlyIncome / monthlyPayment

    // Calculate cash flow score based on DSCR
    if (dscr < 1.0) cashFlowScore = 0
    else if (dscr < 1.25) cashFlowScore = 50
    else if (dscr < 1.5) cashFlowScore = 80
    else cashFlowScore = 100
  }

  // Calculate overall score
  const scores = [priceToValueScore, ownerDependenceScore]
  if (cashFlowScore !== undefined) scores.push(cashFlowScore)
  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

  // Generate recommendations
  const recommendations: string[] = []

  if (priceToValueScore < 70) {
    recommendations.push("Consider negotiating a lower purchase price based on market valuation")
  }

  if (ownerDependenceScore < 70) {
    recommendations.push("Focus on building management systems and reducing owner dependency")
  }

  if (cashFlowScore !== undefined && cashFlowScore < 70) {
    recommendations.push("Explore alternative financing structures to improve cash flow")
  }

  if (formData.financialRecords !== "yes") {
    recommendations.push("Ensure financial records are professionally maintained and up-to-date")
  }

  if (formData.sops !== "well-documented") {
    recommendations.push("Develop comprehensive standard operating procedures to reduce business risk")
  }

  if (recommendations.length === 0) {
    recommendations.push("This appears to be a solid acquisition opportunity")
  }

  return {
    adjustedEbitda,
    adjustedLowMultiple,
    adjustedHighMultiple,
    valuationLow,
    valuationHigh,
    priceToValueScore,
    ownerDependenceScore,
    cashFlowScore,
    overallScore,
    dscr,
    monthlyDebtPayment,
    monthlyIncomeAfterDebt,
    annualIncomeAfterDebt,
    recommendations: recommendations.slice(0, 3), // Max 3 recommendations
  }
}
