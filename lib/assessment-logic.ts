export interface AssessmentData {
  // Section 1: Business Buying Readiness
  motivation: string
  timeCommitment: string
  riskTolerance: string

  // Section 2: Professional Skills
  professionalBackground: string
  transferableSkills: string[]
  businessApplication: string
  businessExperience: string

  // Section 3: Deal Box Parameters
  targetIncome: string
  capitalAvailable: string
  industryPreference: string
  geography: string
  businessModel: string
  creditScore: string
}

export interface ReadinessScore {
  score: number
  level: string
  description: string
}

export interface DealBox {
  targetBusinessProfile: {
    industry: string
    geography: string
    businessModel: string
  }
  sizeOfDeal: {
    revenueRange: string
    requiredSDE: string
    dealSize: string
  }
  financingFramework: {
    downPayment: string
    structure: string
  }
  personalEdge: {
    background: string
    advantage: string
  }
  lifestyleOutcome: {
    goals: string
  }
  elevatorPitch: string
}

export function calculateReadinessScore(data: AssessmentData): ReadinessScore {
  let score = 0

  // Section 1: Business Buying Readiness (max 15 points)
  // Motivation scoring
  const motivationScores = {
    "wealth-building": 5,
    control: 4,
    skills: 4,
    lifestyle: 3,
    legacy: 3,
  }
  score += motivationScores[data.motivation as keyof typeof motivationScores] || 0

  // Time commitment scoring
  const timeScores = {
    "full-time": 5,
    "part-time": 4,
    oversight: 3,
    passive: 2,
  }
  score += timeScores[data.timeCommitment as keyof typeof timeScores] || 0

  // Risk tolerance scoring
  const riskScores = {
    high: 5,
    medium: 4,
    low: 3,
  }
  score += riskScores[data.riskTolerance as keyof typeof riskScores] || 0

  // Section 2: Professional Skills (max 7 points)
  // Professional background scoring
  const backgroundScores = {
    finance: 3,
    sales: 3,
    operations: 2,
    technology: 2,
    legal: 2,
    healthcare: 2,
    other: 1,
  }
  score += backgroundScores[data.professionalBackground as keyof typeof backgroundScores] || 0

  // Transferable skills bonus (1 point per 3 skills, max 2 points)
  score += Math.min(Math.floor((data.transferableSkills?.length || 0) / 3), 2)

  // Business experience scoring
  const experienceScores = {
    owner: 2,
    acquisition: 2,
    startup: 1,
    "side-business": 1,
    none: 0,
  }
  score += experienceScores[data.businessExperience as keyof typeof experienceScores] || 0

  // Section 3: Deal Parameters (max 4 points)
  // Capital availability scoring
  const capitalScores = {
    "1m+": 2,
    "500k-1m": 2,
    "250k-500k": 1,
    "100k-250k": 1,
    "50k-100k": 0,
  }
  score += capitalScores[data.capitalAvailable as keyof typeof capitalScores] || 0

  // Credit score scoring
  const creditScores = {
    excellent: 2,
    good: 1,
    fair: 1,
    poor: 0,
  }
  score += creditScores[data.creditScore as keyof typeof creditScores] || 0

  // Determine level and description
  let level: string
  let description: string

  if (score >= 22) {
    level = "Ready to Buy"
    description =
      "You have the motivation, skills, and resources to successfully acquire a business. Start building your acquisition pipeline and connecting with deal sources."
  } else if (score >= 17) {
    level = "Nearly Ready"
    description =
      "You're close to being ready for business acquisition. Focus on strengthening a few key areas and you'll be ready to make your move."
  } else if (score >= 12) {
    level = "Developing Interest"
    description =
      "You have solid potential for business ownership. Invest time in education, networking, and building your financial foundation."
  } else if (score >= 7) {
    level = "Early Exploration"
    description =
      "Business acquisition could be in your future. Start with education and assess whether this path aligns with your goals and capabilities."
  } else {
    level = "Not Ready Yet"
    description =
      "Focus on building your professional skills, financial resources, and business knowledge before pursuing acquisition opportunities."
  }

  return { score, level, description }
}

export function calculateDealBox(data: AssessmentData): DealBox {
  // Get target income range
  const incomeRanges = {
    "75k-150k": { min: 75000, max: 150000 },
    "150k-250k": { min: 150000, max: 250000 },
    "250k-400k": { min: 250000, max: 400000 },
    "400k-500k": { min: 400000, max: 500000 },
    "500k+": { min: 500000, max: 750000 },
  }

  const incomeRange = incomeRanges[data.targetIncome as keyof typeof incomeRanges] || { min: 150000, max: 250000 }

  // Calculate required SDE (target income + estimated debt service)
  // Estimate debt service based on typical SBA loan structure
  const estimatedDebtServiceLow = incomeRange.min * 0.3 // Conservative estimate
  const estimatedDebtServiceHigh = incomeRange.max * 0.6 // Higher leverage scenario

  const requiredSDELow = incomeRange.min + estimatedDebtServiceLow
  const requiredSDEHigh = incomeRange.max + estimatedDebtServiceHigh

  // Calculate revenue range (SDE typically 15-25% of revenue for service businesses)
  const revenueMultiplier = 4 // Conservative 25% SDE margin
  const revenueRangeLow = requiredSDELow * revenueMultiplier
  const revenueRangeHigh = requiredSDEHigh * revenueMultiplier

  // Get capital available for down payment
  const capitalRanges = {
    "50k-100k": { min: 50000, max: 100000 },
    "100k-250k": { min: 100000, max: 250000 },
    "250k-500k": { min: 250000, max: 500000 },
    "500k-1m": { min: 500000, max: 1000000 },
    "1m+": { min: 1000000, max: 2000000 },
  }

  const capitalRange = capitalRanges[data.capitalAvailable as keyof typeof capitalRanges] || {
    min: 100000,
    max: 250000,
  }

  // Industry mapping
  const industryMap = {
    "home-services": "home services",
    "commercial-services": "commercial services",
    "healthcare-services": "healthcare services",
    "professional-business": "professional & business services",
    "specialty-manufacturing": "specialty manufacturing & distribution",
    "logistics-field": "logistics & field services",
    "tech-enabled": "tech-enabled services",
    "not-sure": "service businesses",
  }

  // Geography mapping
  const geographyMap = {
    "25-miles": "within 25 miles of your location",
    "50-miles": "within 50 miles of your location",
    "100-miles": "within 100 miles of your location",
    statewide: "statewide",
    regional: "regional (multi-state)",
    relocate: "open to relocation",
  }

  // Business model mapping
  const businessModelMap = {
    recurring: "recurring revenue and stable operations",
    project: "project-based with repeat clients",
    mixed: "mixed revenue model with growth potential",
    product: "product sales with service components",
    "no-preference": "proven business model",
  }

  // Personal edge based on background
  const personalEdgeMap = {
    finance: {
      background: "finance",
      advantage: "I know how to optimize cash flow, conduct thorough due diligence, and manage financial operations",
    },
    sales: {
      background: "sales and business development",
      advantage: "I know how to grow revenue, build customer relationships, and scale sales operations",
    },
    operations: {
      background: "operations and process management",
      advantage: "I know how to systematize operations, improve efficiency, and scale teams",
    },
    technology: {
      background: "technology and digital transformation",
      advantage: "I know how to leverage technology, automate processes, and modernize operations",
    },
    legal: {
      background: "legal and compliance",
      advantage: "I know how to navigate regulations, manage risk, and structure deals effectively",
    },
    healthcare: {
      background: "healthcare operations",
      advantage: "I understand healthcare regulations, patient care standards, and operational requirements",
    },
    other: {
      background: "business management",
      advantage: "I know how to lead teams, optimize operations, and drive business growth",
    },
  }

  const personalEdge =
    personalEdgeMap[data.professionalBackground as keyof typeof personalEdgeMap] || personalEdgeMap.other

  // Format currency - Fixed function to handle undefined values
  const formatCurrency = (amount: number | undefined) => {
    if (!amount || isNaN(amount)) return "$0"

    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${Math.round(amount / 1000)}K`
    } else {
      return `$${Math.round(amount)}`
    }
  }

  // Get industry multiplier for deal valuation
  const industryMultipliers = {
    "home-services": 3.0,
    "commercial-services": 3.5,
    "healthcare-services": 4.5,
    "professional-business": 4.0,
    "specialty-manufacturing": 4.5,
    "logistics-field": 4.0,
    "tech-enabled": 5.25,
    "not-sure": 3.5,
  }

  const multiplier = industryMultipliers[data.industryPreference as keyof typeof industryMultipliers] || 3.5

  // Calculate deal size (business valuation = SDE × industry multiplier)
  const minDealSize = requiredSDELow * multiplier
  const maxDealSize = requiredSDEHigh * multiplier

  // Calculate down payment percentages based on available capital vs deal size
  const minDownPaymentPercent = Math.max(5, Math.min(20, Math.round((capitalRange.min / maxDealSize) * 100)))
  const maxDownPaymentPercent = Math.min(20, Math.round((capitalRange.max / minDealSize) * 100))

  // Ensure logical ordering (lower percentage first)
  const lowerPercent = Math.min(minDownPaymentPercent, maxDownPaymentPercent)
  const higherPercent = Math.max(minDownPaymentPercent, maxDownPaymentPercent)

  // Create elevator pitch
  const industry = industryMap[data.industryPreference as keyof typeof industryMap] || "service businesses"
  const geography = geographyMap[data.geography as keyof typeof geographyMap] || "locally"
  const businessModel = businessModelMap[data.businessModel as keyof typeof businessModelMap] || "proven business model"

  const elevatorPitch = `I'm looking for a ${industry} business ${geography}—something with ${businessModel}. Ideally it's doing ${formatCurrency(revenueRangeLow)}–${formatCurrency(revenueRangeHigh)} in revenue and ${formatCurrency(requiredSDELow)}–${formatCurrency(requiredSDEHigh)} in SDE. I plan to use SBA financing with ${lowerPercent}–${higherPercent}% down, and I like deals where the seller provides transition support. My background is in ${personalEdge.background}, so ${personalEdge.advantage}. The goal for me is to build a stable, cash-flowing business that supports my family and creates long-term wealth.`

  return {
    targetBusinessProfile: {
      industry: industry,
      geography: geography,
      businessModel: businessModel,
    },
    sizeOfDeal: {
      revenueRange: `${formatCurrency(revenueRangeLow)}–${formatCurrency(revenueRangeHigh)}`,
      requiredSDE: `${formatCurrency(requiredSDELow)}–${formatCurrency(requiredSDEHigh)}`,
      dealSize: `${formatCurrency(minDealSize)}–${formatCurrency(maxDealSize)}`,
    },
    financingFramework: {
      downPayment: `${formatCurrency(capitalRange.min)}–${formatCurrency(capitalRange.max)} (${lowerPercent}–${higherPercent}% down)`,
      structure: "SBA 7(a) financing with seller transition support preferred",
    },
    personalEdge: {
      background: personalEdge.background,
      advantage: personalEdge.advantage,
    },
    lifestyleOutcome: {
      goals: "Build a stable, cash-flowing business that supports my family and creates long-term wealth",
    },
    elevatorPitch,
  }
}
