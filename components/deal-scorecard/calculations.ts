export interface FormData {
  industry: string;
  yearsInBusiness: number;
  annualRevenue: number;
  ebitda: number;
  ownerSalary?: number;
  purchasePrice: number;
  hasRealEstate: boolean;
  hasEquipment: boolean;
  assetValue?: number;
  ownerInvolvement: number;
  runsWithoutOwner: string;
  hasSecondInCommand: string;
  financialRecords: string;
  sops: string;
  downPayment: number;
  conventionalLoan: number;
  sba7a: number;
  sba504: number;
  sellerNote: number;
}

export interface ScoreResults {
  valuationLow: number;
  valuationHigh: number;
  adjustedEbitda: number;
  adjustedLowMultiple: number;
  adjustedHighMultiple: number;
  priceToValueScore: number;
  ownerDependenceScore: number;
  cashFlowScore?: number;
  dscr?: number;
  monthlyDebtPayment?: number;
  monthlyIncomeAfterDebt?: number;
  annualIncomeAfterDebt?: number;
}

const industryMultiples: Record<string, { low: number; high: number }> = {
  "Home Services": { low: 2.5, high: 3.5 },
  Manufacturing: { low: 3, high: 5 },
  Healthcare: { low: 3, high: 5 },
  Construction: { low: 3, high: 5 },
  Retail: { low: 2, high: 3 },
  "Professional Services": { low: 3, high: 5 },
  "Transportation/Logistics": { low: 2.5, high: 4 },
  Technology: { low: 4, high: 6 },
  "Food Service": { low: 2, high: 3 },
  Other: { low: 2, high: 4 },
};

function calculateOwnerDependence(data: FormData): number {
  let score = 100;
  score -= (data.ownerInvolvement - 1) * 10;
  if (data.runsWithoutOwner === "somewhat") score -= 15;
  if (data.runsWithoutOwner === "no") score -= 30;
  if (data.hasSecondInCommand === "no") score -= 20;
  if (data.financialRecords === "somewhat") score -= 10;
  if (data.financialRecords === "no") score -= 20;
  if (data.sops === "not-documented") score -= 20;
  if (data.sops === "not-sure") score -= 10;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function payment(principal: number, rate: number, years: number): number {
  if (principal <= 0) return 0;
  const monthlyRate = rate / 12;
  const n = years * 12;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
}

function calculateCashFlow(data: FormData, adjustedEbitda: number) {
  const monthlyPayments =
    payment(data.conventionalLoan, 0.1, 10) +
    payment(data.sba7a, 0.1, 10) +
    payment(data.sba504, 0.06, 20) +
    payment(data.sellerNote, 0.08, 5);
  const annualDebt = monthlyPayments * 12;
  const dscr = annualDebt > 0 ? adjustedEbitda / annualDebt : undefined;
  const monthlyIncomeAfterDebt = adjustedEbitda / 12 - monthlyPayments;
  const annualIncomeAfterDebt = monthlyIncomeAfterDebt * 12;
  let cashFlowScore: number | undefined;
  if (dscr !== undefined) {
    if (dscr >= 1.5) cashFlowScore = 90;
    else if (dscr >= 1.25) cashFlowScore = 80;
    else if (dscr >= 1.1) cashFlowScore = 70;
    else if (dscr >= 1) cashFlowScore = 60;
    else cashFlowScore = 40;
  }
  return { monthlyPayments, dscr, monthlyIncomeAfterDebt, annualIncomeAfterDebt, cashFlowScore };
}

export function calculateScores(data: FormData): ScoreResults {
  const multiples = industryMultiples[data.industry] || industryMultiples.Other;
  const adjustedEbitda = data.ebitda + (data.ownerSalary || 0);
  const valuationLow = adjustedEbitda * multiples.low + (data.assetValue || 0);
  const valuationHigh = adjustedEbitda * multiples.high + (data.assetValue || 0);
  const priceToValueRatio = valuationHigh > 0 ? data.purchasePrice / ((valuationLow + valuationHigh) / 2) : 0;
  let priceToValueScore = 80;
  if (priceToValueRatio <= 0.8) priceToValueScore = 95;
  else if (priceToValueRatio <= 1) priceToValueScore = 85;
  else if (priceToValueRatio <= 1.2) priceToValueScore = 70;
  else if (priceToValueRatio <= 1.5) priceToValueScore = 50;
  else priceToValueScore = 30;

  const ownerDependenceScore = calculateOwnerDependence(data);

  const cash = calculateCashFlow(data, adjustedEbitda);

  return {
    valuationLow,
    valuationHigh,
    adjustedEbitda,
    adjustedLowMultiple: multiples.low,
    adjustedHighMultiple: multiples.high,
    priceToValueScore,
    ownerDependenceScore,
    cashFlowScore: cash.cashFlowScore,
    dscr: cash.dscr,
    monthlyDebtPayment: cash.monthlyPayments,
    monthlyIncomeAfterDebt: cash.monthlyIncomeAfterDebt,
    annualIncomeAfterDebt: cash.annualIncomeAfterDebt,
  };
}
