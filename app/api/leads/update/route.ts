import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { datocmsId, leadData } = await request.json()

    if (!datocmsId) {
      return NextResponse.json({ error: "DatoCMS ID required for update" }, { status: 400 })
    }

    const apiToken = process.env.DATOCMS_API_TOKEN
    if (!apiToken) {
      console.error("❌ DATOCMS_API_TOKEN environment variable is not set")
      return NextResponse.json({
        success: false,
        warning: "DatoCMS not configured",
      })
    }

    // Update only the financing and cash flow fields
    const updateData = {
      data: {
        type: "item",
        id: datocmsId,
        attributes: {
          // Deal Terms - Fixed field names
          down_payment: leadData.downPayment || 0,
          conventional_loan: leadData.conventionalLoan || 0,
          sba7a: leadData.sba7a || 0,
          sba504: leadData.sba504 || 0,
          seller_note: leadData.sellerNote || 0,

          // Updated Cash Flow Calculations
          cash_flow_score: leadData.scores?.cashFlowScore || null,
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

          // Update overall score with cash flow included
          overall_deal_score: leadData.scores?.overallScore || 0,

          // Update completion status
          completion_status: "complete",
        },
      },
    }

    // Update the record in DatoCMS
    const response = await fetch(`https://site-api.datocms.com/items/${datocmsId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
        Accept: "application/json",
        "X-Api-Version": "3",
      },
      body: JSON.stringify(updateData),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("❌ DatoCMS update error:", {
        status: response.status,
        statusText: response.statusText,
        error: result,
      })

      return NextResponse.json(
        {
          error: "Failed to update DatoCMS record",
          details: result,
          success: false,
        },
        { status: 500 },
      )
    }

    console.log("✅ Successfully updated DatoCMS record:", datocmsId)

    return NextResponse.json({
      success: true,
      datocms_id: datocmsId,
      message: "Record successfully updated with financing data",
    })
  } catch (error) {
    console.error("❌ Error updating lead:", error)
    return NextResponse.json(
      {
        error: "Failed to update lead",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
