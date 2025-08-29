import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { assessmentData, results, email } = await request.json()

    // Check if DatoCMS token is configured
    const apiToken = process.env.DATOCMS_API_TOKEN
    if (!apiToken) {
      console.error("❌ DATOCMS_API_TOKEN environment variable is not set")
      return NextResponse.json({
        success: true,
        warning: "DatoCMS not configured - please set DATOCMS_API_TOKEN environment variable",
        message: "Assessment data processed (no storage)",
      })
    }

    // Get metadata from headers
    const headersList = headers()
    const referer = headersList.get("referer") || ""
    const userAgent = headersList.get("user-agent") || ""

    // Use the model ID you provided
    const personalAssessmentModelId = "HCV0XY59S7WEKSFsLtx_hw"

    // Transform the assessment data for DatoCMS
    const recordData = {
      data: {
        type: "item",
        attributes: {
          // Basic Information (optional email)
          email: email || null,
          submission_date: new Date().toISOString(),
          referrer: referer,

          // Section 1: Business Buying Readiness
          motivation: assessmentData.motivation,
          time_commitment: assessmentData.timeCommitment,
          risk_tolerance: assessmentData.riskTolerance,

          // Section 2: Professional Skills
          professional_background: assessmentData.professionalBackground,
          transferable_skills: JSON.stringify(assessmentData.transferableSkills || []),
          business_application: assessmentData.businessApplication || null,
          business_experience: assessmentData.businessExperience,

          // Section 3: Deal Box Parameters
          target_income: assessmentData.targetIncome,
          capital_available: assessmentData.capitalAvailable,
          industry_preference: assessmentData.industryPreference,
          geography: assessmentData.geography,
          business_model: assessmentData.businessModel,
          credit_score: assessmentData.creditScore,

          // Calculated Results
          readiness_score: results.readinessScore.score,
          readiness_level: results.readinessScore.level,
          readiness_description: results.readinessScore.description,
          skill_multiplier: results.skillAdvantage.multiplier,
          skill_advantage: results.skillAdvantage.advantage,

          // Deal Box Results
          target_industry: results.dealBox.targetBusinessProfile.industry,
          target_geography: results.dealBox.targetBusinessProfile.geography,
          target_business_model: results.dealBox.targetBusinessProfile.businessModel,
          revenue_range: results.dealBox.sizeOfDeal.revenueRange,
          required_sde: results.dealBox.sizeOfDeal.requiredSDE,
          deal_size: results.dealBox.sizeOfDeal.dealSize,
          down_payment: results.dealBox.financingFramework.downPayment,
          financing_structure: results.dealBox.financingFramework.structure,
          personal_edge_background: results.dealBox.personalEdge.background,
          personal_edge_advantage: results.dealBox.personalEdge.advantage,
          lifestyle_goals: results.dealBox.lifestyleOutcome.goals,
          elevator_pitch: results.dealBox.elevatorPitch,

          // Recommendations
          recommendations: JSON.stringify(results.recommendations || []),
          completion_status: email ? "complete_with_email" : "complete_no_email",
        },
        relationships: {
          item_type: {
            data: {
              type: "item_type",
              id: personalAssessmentModelId,
            },
          },
        },
      },
    }

    // Save to DatoCMS
    const response = await fetch("https://site-api.datocms.com/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
        Accept: "application/json",
        "X-Api-Version": "3",
      },
      body: JSON.stringify(recordData),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("❌ DatoCMS API Error:", result)
      return NextResponse.json(
        {
          error: "Failed to save to DatoCMS",
          success: false,
        },
        { status: 500 },
      )
    }

    console.log("✅ Successfully saved assessment to DatoCMS:", result.data?.id)

    return NextResponse.json({
      success: true,
      datocms_id: result.data?.id,
      message: "Assessment successfully captured and stored",
    })
  } catch (error) {
    console.error("❌ Error in /api/assessment:", error)
    return NextResponse.json(
      {
        error: "Failed to save assessment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
