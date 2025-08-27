import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json()

    // Check if DatoCMS token is configured
    const apiToken = process.env.DATOCMS_API_TOKEN
    if (!apiToken) {
      console.error("❌ DATOCMS_API_TOKEN environment variable is not set")

      // Still send to Zapier if configured, but log the DatoCMS issue
      if (process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL) {
        try {
          await fetch(process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...leadData,
              timestamp: new Date().toISOString(),
              note: "DatoCMS token not configured - data sent to Zapier only",
            }),
          })
          console.log("✅ Sent to Zapier (DatoCMS unavailable)")
        } catch (zapierError) {
          console.error("⚠️ Both DatoCMS and Zapier failed:", zapierError)
        }
      }

      return NextResponse.json({
        success: true,
        warning: "DatoCMS not configured - please set DATOCMS_API_TOKEN environment variable",
        message: "Lead data processed (partial storage)",
      })
    }

    // Get metadata from headers
    const headersList = headers()
    const referer = headersList.get("referer") || ""

    // Use the hardcoded model ID you provided to avoid the model fetching issue
    const dealScorecardModelId = "aG3UlwwQTQu4gd-cBJox_A"

    // Transform the lead data for DatoCMS
    const recordData = {
      data: {
        type: "item",
        attributes: {
          // Basic Information
          email: leadData.email,
          submission_date: new Date().toISOString(),
          utm_source: leadData.utmParams?.utm_source || null,
          utm_medium: leadData.utmParams?.utm_medium || null,
          utm_campaign: leadData.utmParams?.utm_campaign || null,
          utm_term: leadData.utmParams?.utm_term || null,
          utm_content: leadData.utmParams?.utm_content || null,
          referrer: referer,

          // Business Snapshot
          industry: leadData.industry,
          years_in_business: leadData.yearsInBusiness,
          annual_revenue: leadData.annualRevenue,
          ebitda: leadData.ebitda,
          owner_salary: leadData.ownerSalary || 0,
          has_real_estate: leadData.hasRealEstate || false,
          has_equipment: leadData.hasEquipment || false,
          asset_value: leadData.assetValue || 0,
          purchase_price: leadData.purchasePrice,

          // Owner Involvement
          owner_involvement: leadData.ownerInvolvement,
          runs_without_owner: leadData.runsWithoutOwner,
          has_second_in_command: leadData.hasSecondInCommand,
          financial_records: leadData.financialRecords,
          sops: leadData.sops,

          // Deal Terms - Fixed field names
          down_payment: leadData.downPayment || 0,
          conventional_loan: leadData.conventionalLoan || 0,
          sba7a: leadData.sba7a || 0,
          sba504: leadData.sba504 || 0,
          seller_note: leadData.sellerNote || 0,

          // Calculated Results
          adjusted_ebitda: Math.round(leadData.scores?.adjustedEbitda || 0),
          valuation_low: Math.round(leadData.scores?.valuationLow || 0),
          valuation_high: Math.round(leadData.scores?.valuationHigh || 0),
          price_to_value_score: leadData.scores?.priceToValueScore || 0,
          owner_dependence_score: leadData.scores?.ownerDependenceScore || 0,
          cash_flow_score: leadData.scores?.cashFlowScore || null,
          overall_deal_score: leadData.scores?.overallScore || 0,
          dscr: leadData.scores?.dscr || null,
          monthly_debt_payment: leadData.scores?.monthlyDebtPayment
            ? Math.round(leadData.scores.monthlyDebtPayment)
            : null,
          monthly_income_after_debt: leadData.scores?.monthlyIncomeAfterDebt
            ? Math.round(leadData.scores.monthlyIncomeAfterDebt)
            : null,
          annual_income_after_debt: leadData.scores?.annualIncomeAfterDebt
            ? Math.round(leadData.scores.annualIncomeAfterDebt)
            : null,

          // Metadata
          industry_multiple_low: leadData.scores?.adjustedLowMultiple || null,
          industry_multiple_high: leadData.scores?.adjustedHighMultiple || null,
          recommendations: JSON.stringify(leadData.scores?.recommendations || []),
          completion_status: leadData.email ? "complete" : "partial",

          // Removed user_agent and session_id as they don't exist in the model
        },
        relationships: {
          item_type: {
            data: {
              type: "item_type",
              id: dealScorecardModelId,
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
      console.error("❌ DatoCMS API error:", {
        status: response.status,
        statusText: response.statusText,
        error: result,
      })

      // Still try Zapier as fallback
      if (process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL) {
        try {
          await fetch(process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...leadData,
              timestamp: new Date().toISOString(),
              note: "DatoCMS failed - sent to Zapier as backup",
            }),
          })
          console.log("✅ Sent to Zapier as fallback")
        } catch (zapierError) {
          console.error("⚠️ Both DatoCMS and Zapier failed:", zapierError)
        }
      }

      return NextResponse.json(
        {
          error: "Failed to save to DatoCMS",
          details: result,
          success: false,
        },
        { status: 500 },
      )
    }

    console.log("✅ Successfully saved to DatoCMS:", result.data?.id)

    // Send to Zapier webhook if configured
    if (process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...leadData,
            datocms_id: result.data?.id,
            timestamp: new Date().toISOString(),
          }),
        })
        console.log("✅ Successfully sent to Zapier")
      } catch (zapierError) {
        console.error("⚠️ Zapier webhook failed:", zapierError)
        // Don't fail the entire request if Zapier fails
      }
    }

    return NextResponse.json({
      success: true,
      datocms_id: result.data?.id,
      message: "Lead successfully captured and stored",
    })
  } catch (error) {
    console.error("❌ Error saving lead:", error)
    return NextResponse.json(
      {
        error: "Failed to save lead",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
