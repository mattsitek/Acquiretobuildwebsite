import { type NextRequest, NextResponse } from "next/server"
import { subscribeToNewsletter } from "@/app/actions/newsletter"

export async function POST(request: NextRequest) {
  try {
    console.log("🧪 Test newsletter API route called")

    const formData = await request.formData()
    const email = formData.get("email") as string

    console.log("📧 Test email from API route:", email)
    console.log("🔧 Using DatoCMS REST API with X-Api-Version: 3")

    if (!email) {
      console.log("❌ No email provided to test API")
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    // Call the same function used by the form
    const result = await subscribeToNewsletter(formData)

    console.log("📊 Test API result:", result)

    if (result.success) {
      console.log("✅ Test newsletter subscription successful")
      return NextResponse.json({
        success: true,
        message: result.message,
        email: email,
        timestamp: new Date().toISOString(),
        method: "REST API v3",
      })
    } else {
      console.log("⚠️ Test newsletter subscription failed:", result.message)
      return NextResponse.json({
        success: false,
        error: result.message,
        email: email,
        timestamp: new Date().toISOString(),
        method: "REST API v3",
      })
    }
  } catch (error) {
    console.error("❌ Test newsletter API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        method: "REST API v3",
      },
      { status: 500 },
    )
  }
}
