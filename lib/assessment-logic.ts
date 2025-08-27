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
  creditScore: string
}

export interface ReadinessScore {
  score: number
  level: string
  description: string
}

export interface DealBox {
  businessSize: string
  targetCashFlow: string
  downPayment: string
  sbaLoan: string
  monthlyPayment: string
  targetIndustries: string[]
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
  score += Math.min(Math.floor(data.transferableSkills.length / 3), 2)

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

  // Calculate business size (Target Income × 2-4 = SDE target)
  const minBusinessSize = incomeRange.min * 2
  const maxBusinessSize = incomeRange.max * 4

  // Get industry multiplier
  const industryMultipliers = {
    healthcare: 5.0,
    "professional-services": 4.5,
    "business-services": 3.5,
    "tech-enabled": 6.0,
    other: 3.0,
  }

  const multiplier = industryMultipliers[data.industryPreference as keyof typeof industryMultipliers] || 3.0

  // Apply industry multiplier to get business valuation
  const minValuation = minBusinessSize * multiplier
  const maxValuation = maxBusinessSize * multiplier

  // Calculate down payment (10% of business size)
  const minDownPayment = minValuation * 0.1
  const maxDownPayment = maxValuation * 0.1

  // Calculate SBA loan (75% of business size)
  const minSBALoan = minValuation * 0.75
  const maxSBALoan = maxValuation * 0.75

  // Calculate monthly debt service (10.5% SBA rate, 10 years)
  const monthlyRate = 0.105 / 12
  const numPayments = 10 * 12
  const minMonthlyPayment =
    (minSBALoan * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  const maxMonthlyPayment =
    (maxSBALoan * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)

  // Get target industries based on preference and background
  const industryRecommendations = {
    healthcare: ["Medical Practices", "Dental Clinics", "Veterinary Services"],
    "professional-services": ["CPA Firms", "Consulting Practices", "Advisory Services"],
    "business-services": ["Marketing Agencies", "HR Services", "Facilities Management"],
    "tech-enabled": ["SaaS Companies", "Digital Agencies", "E-commerce Businesses"],
    other: ["Service Businesses", "Local Franchises", "Distribution Companies"],
  }

  const targetIndustries =
    industryRecommendations[data.industryPreference as keyof typeof industryRecommendations] ||
    industryRecommendations.other

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    } else {
      return `$${amount.toFixed(0)}`
    }
  }

  return {
    businessSize: `${formatCurrency(minValuation)} - ${formatCurrency(maxValuation)}`,
    targetCashFlow: `${formatCurrency(incomeRange.min)} - ${formatCurrency(incomeRange.max)}`,
    downPayment: `${formatCurrency(minDownPayment)} - ${formatCurrency(maxDownPayment)}`,
    sbaLoan: `${formatCurrency(minSBALoan)} - ${formatCurrency(maxSBALoan)}`,
    monthlyPayment: `${formatCurrency(minMonthlyPayment)} - ${formatCurrency(maxMonthlyPayment)}`,
    targetIndustries,
  }
}
