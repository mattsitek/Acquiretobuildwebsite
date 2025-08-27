export interface AssessmentData {
  // Section 1: Business Buying Readiness
  motivation: string
  timeCommitment: string
  riskTolerance: string

  // Section 2: Professional Skills Assessment
  professionalBackground: string
  transferableSkills: string[]
  businessApplication: string
  businessExperience: string

  // Section 3: Deal Parameters
  geography: string
  businessModel: string
  desiredIncome: string
  availableCapital: string
  industryPreference: string
  sellerTransition: string
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
    downPaymentPercentage: string
    structure: string
  }
  personalEdge: {
    background: string
    advantage: string
  }
  lifestyleOutcome: {
    goals: string
    motivation: string
  }
  elevatorPitch: string
}

export function calculateReadinessScore(data: AssessmentData): ReadinessScore {
  let score = 0

  // Section 1: Business Buying Readiness (max 15 points)
  // Motivation scoring
  const motivationScores = { "wealth-building": 10, control: 9, skills: 8, lifestyle: 7, legacy: 8 }
  score += motivationScores[data.motivation as keyof typeof motivationScores] || 5

  // Time commitment scoring
  const timeScores = { "full-time": 10, "part-time": 8, oversight: 6, passive: 4 }
  score += timeScores[data.timeCommitment as keyof typeof timeScores] || 5

  // Risk tolerance scoring
  const riskScores = { high: 8, medium: 10, low: 6 }
  score += riskScores[data.riskTolerance as keyof typeof riskScores] || 5

  // Section 2: Professional Skills (max 7 points)
  // Professional background scoring
  const backgroundScores = { finance: 10, sales: 9, operations: 9, technology: 8, legal: 7, healthcare: 7, other: 5 }
  score += backgroundScores[data.professionalBackground as keyof typeof backgroundScores] || 5

  // Transferable skills bonus (2 points per skill, max 10 points)
  score += Math.min(10, (data.transferableSkills?.length || 0) * 2)

  // Business experience scoring
  const experienceScores = { owner: 10, acquisition: 9, startup: 7, "side-business": 6, none: 3 }
  score += experienceScores[data.businessExperience as keyof typeof experienceScores] || 3

  // Section 3: Deal Parameters (max 4 points)
  // Capital availability scoring
  const capitalScores = { "50-100k": 5, "100-250k": 7, "250-500k": 9, "500k-1m": 10, "1m+": 10 }
  score += capitalScores[data.availableCapital as keyof typeof capitalScores] || 5

  // Determine level and description
  let level: string
  let description: string

  if (score >= 85) {
    level = "Ready to Buy"
    description =
      "You have the motivation, skills, and resources to successfully acquire a business. Start building your acquisition pipeline and connecting with deal sources."
  } else if (score >= 70) {
    level = "Nearly Ready"
    description =
      "You're close to being ready for business acquisition. Focus on strengthening a few key areas and you'll be ready to make your move."
  } else if (score >= 55) {
    level = "Developing Interest"
    description =
      "You have solid potential for business ownership. Invest time in education, networking, and building your financial foundation."
  } else if (score >= 40) {
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
  // Calculate SDE requirements based on desired income
  const { sdeMin, sdeMax } = calculateSDERequirements(data.desiredIncome)

  // Calculate revenue range (assuming 25% SDE margin)
  const revenueMin = Math.round(sdeMin / 0.25 / 1000) * 1000
  const revenueMax = Math.round(sdeMax / 0.25 / 1000) * 1000

  // Get industry multiplier
  const multiplier = getIndustryMultiplier(data.industryPreference)

  // Calculate deal size (business valuation)
  const dealSizeMin = Math.round((sdeMin * multiplier.min) / 1000) * 1000
  const dealSizeMax = Math.round((sdeMax * multiplier.max) / 1000) * 1000

  // Calculate down payment percentage
  const { capitalMin, capitalMax } = parseCapitalRange(data.availableCapital)
  const downPaymentPercentageMin = Math.round((capitalMin / dealSizeMax) * 100)
  const downPaymentPercentageMax = Math.min(20, Math.round((capitalMax / dealSizeMin) * 100))

  // Format values
  const revenueRange = `$${formatNumber(revenueMin)}-$${formatNumber(revenueMax)}`
  const requiredSDE = `$${formatNumber(sdeMin)}-$${formatNumber(sdeMax)}`
  const dealSize = `$${formatNumber(dealSizeMin)}-$${formatNumber(dealSizeMax)}`
  const downPayment = `$${formatNumber(capitalMin)}-$${formatNumber(capitalMax)}`
  const downPaymentPercentage = `${downPaymentPercentageMin}-${downPaymentPercentageMax}% down`

  return {
    targetBusinessProfile: {
      industry: getIndustryLabel(data.industryPreference),
      geography: getGeographyLabel(data.geography),
      businessModel: getBusinessModelLabel(data.businessModel),
    },
    sizeOfDeal: {
      revenueRange,
      requiredSDE,
      dealSize,
    },
    financingFramework: {
      downPayment,
      downPaymentPercentage,
      structure: getFinancingStructure(data.sellerTransition),
    },
    personalEdge: {
      background: getBackgroundLabel(data.professionalBackground),
      advantage: getAdvantageDescription(data.professionalBackground, data.transferableSkills),
    },
    lifestyleOutcome: {
      goals: getGoalsDescription(data.timeCommitment, data.desiredIncome),
      motivation: getMotivationLabel(data.motivation),
    },
    elevatorPitch: generateElevatorPitch(data, {
      revenueRange,
      requiredSDE,
      dealSize,
      downPayment,
      downPaymentPercentage,
    }),
  }
}

function calculateSDERequirements(desiredIncome: string): { sdeMin: number; sdeMax: number } {
  const incomeRanges = {
    "75-100k": { min: 75000, max: 100000 },
    "100-150k": { min: 100000, max: 150000 },
    "150-250k": { min: 150000, max: 250000 },
    "250-400k": { min: 250000, max: 400000 },
    "400k+": { min: 400000, max: 600000 },
  }

  const income = incomeRanges[desiredIncome as keyof typeof incomeRanges] || incomeRanges["150-250k"]

  // Add estimated debt service (15-25% of SDE for SBA loans)
  const debtServiceMultiplier = 0.2 // 20% average
  const sdeMin = Math.round(income.min / (1 - debtServiceMultiplier))
  const sdeMax = Math.round(income.max / (1 - debtServiceMultiplier))

  return { sdeMin, sdeMax }
}

function getIndustryMultiplier(industry: string): { min: number; max: number } {
  const multipliers = {
    healthcare: { min: 3.5, max: 5.0 },
    "professional-services": { min: 2.5, max: 4.0 },
    technology: { min: 3.0, max: 6.0 },
    manufacturing: { min: 3.0, max: 4.5 },
    retail: { min: 2.0, max: 3.5 },
    "food-beverage": { min: 2.5, max: 4.0 },
    "home-services": { min: 3.0, max: 4.5 },
    education: { min: 2.5, max: 4.0 },
    agnostic: { min: 2.5, max: 4.5 },
  }

  return multipliers[industry as keyof typeof multipliers] || multipliers.agnostic
}

function parseCapitalRange(capital: string): { capitalMin: number; capitalMax: number } {
  const ranges = {
    "50-100k": { min: 50000, max: 100000 },
    "100-250k": { min: 100000, max: 250000 },
    "250-500k": { min: 250000, max: 500000 },
    "500k-1m": { min: 500000, max: 1000000 },
    "1m+": { min: 1000000, max: 1500000 },
  }

  return ranges[capital as keyof typeof ranges] || ranges["250-500k"]
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${Math.round(num / 1000)}K`
  }
  return num.toString()
}

function getIndustryLabel(industry: string): string {
  const labels = {
    healthcare: "Healthcare Services",
    "professional-services": "Professional Services",
    technology: "Technology",
    manufacturing: "Manufacturing",
    retail: "Retail",
    "food-beverage": "Food & Beverage",
    "home-services": "Home Services",
    education: "Education & Training",
    agnostic: "Industry Agnostic",
  }

  return labels[industry as keyof typeof labels] || "Industry Agnostic"
}

function getGeographyLabel(geography: string): string {
  const labels = {
    "local-25": "Within 25 miles",
    "regional-50": "Within 50 miles",
    "extended-100": "Within 100 miles",
    statewide: "Statewide",
    national: "National",
    relocate: "Willing to relocate",
  }

  return labels[geography as keyof typeof labels] || "Regional"
}

function getBusinessModelLabel(model: string): string {
  const labels = {
    "recurring-revenue": "Recurring Revenue Model",
    "service-based": "Service-Based Business",
    "product-based": "Product-Based Business",
    franchise: "Franchise Opportunity",
    "mixed-model": "Mixed Revenue Model",
  }

  return labels[model as keyof typeof labels] || "Mixed Revenue Model"
}

function getFinancingStructure(transition: string): string {
  const structures = {
    essential: "SBA 7(a) financing with extended seller transition support",
    preferred: "SBA 7(a) financing with seller transition support preferred",
    minimal: "SBA 7(a) financing with basic seller handover",
    none: "SBA 7(a) financing, ready for immediate takeover",
  }

  return (
    structures[transition as keyof typeof structures] || "SBA 7(a) financing with seller transition support preferred"
  )
}

function getBackgroundLabel(background: string): string {
  const labels = {
    finance: "Finance & Accounting",
    sales: "Sales & Business Development",
    operations: "Operations & Management",
    technology: "Technology & Engineering",
    legal: "Legal & Compliance",
    healthcare: "Healthcare",
    other: "Professional Background",
  }

  return labels[background as keyof typeof labels] || "Professional Background"
}

function getAdvantageDescription(background: string, skills: string[]): string {
  const advantages = {
    finance: "Strong financial analysis, cash flow optimization, and due diligence capabilities",
    sales: "Proven ability to drive revenue growth and build customer relationships",
    operations: "Expertise in process improvement, team management, and operational efficiency",
    technology: "Technical skills for digital transformation and system optimization",
    legal: "Risk management, compliance, and contract negotiation expertise",
    healthcare: "Industry knowledge and regulatory compliance experience",
    other: "Diverse professional experience and transferable skills",
  }

  let advantage = advantages[background as keyof typeof advantages] || advantages.other

  if (skills.length > 0) {
    advantage += `. Additional strengths in ${skills.slice(0, 3).join(", ")}`
  }

  return advantage
}

function getGoalsDescription(timeCommitment: string, income: string): string {
  const commitmentLabels = {
    "full-time": "hands-on daily management",
    "part-time": "active involvement with delegation",
    oversight: "strategic oversight role",
    passive: "passive investment approach",
  }

  const commitment = commitmentLabels[timeCommitment as keyof typeof commitmentLabels] || "active involvement"

  return `Seeking ${commitment} to generate ${income.replace("k", ",000")} annually`
}

function getMotivationLabel(motivation: string): string {
  const labels = {
    "wealth-building": "Build long-term wealth and financial freedom",
    control: "Gain control and independence",
    skills: "Apply professional expertise in business context",
    lifestyle: "Achieve better work-life balance",
    legacy: "Create a lasting legacy",
  }

  return labels[motivation as keyof typeof labels] || "Build long-term wealth"
}

function generateElevatorPitch(data: AssessmentData, dealMetrics: any): string {
  const industry = getIndustryLabel(data.industryPreference)
  const geography = getGeographyLabel(data.geography)
  const businessModel = getBusinessModelLabel(data.businessModel)
  const background = getBackgroundLabel(data.professionalBackground)
  const transition =
    data.sellerTransition === "essential"
      ? "with strong seller transition support"
      : data.sellerTransition === "preferred"
        ? "ideally with seller transition support"
        : data.sellerTransition === "minimal"
          ? "with basic seller handover"
          : "ready for immediate takeover"

  return `I'm looking for a ${industry.toLowerCase()} business ${geography.toLowerCase()}—something with ${businessModel.toLowerCase()} and stable operations. Ideally it's doing ${dealMetrics.revenueRange} in revenue and ${dealMetrics.requiredSDE} in SDE. I plan to use SBA financing with ${dealMetrics.downPaymentPercentage}, and I like deals ${transition}. My background is in ${background.toLowerCase()}, so I bring strong operational and financial management skills. The goal for me is to build a stable, cash-flowing business that supports my family and creates long-term wealth.`
}
