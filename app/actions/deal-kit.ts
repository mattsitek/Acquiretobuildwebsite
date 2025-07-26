"use server"

import { storeDealKitSubscriber } from "@/lib/deal-kit-datocms"

export async function submitDealKitForm(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const buyerType = formData.get("buyerType") as string

    if (!email) {
      return {
        success: false,
        message: "Email is required",
      }
    }

    // Basic email validation (same as newsletter)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    console.log("Processing Deal Kit signup for:", email)

    // Store in DatoCMS using the same pattern as newsletter
    const result = await storeDealKitSubscriber({
      email,
      buyerType,
    })

    if (!result.success) {
      console.log("Failed to store in DatoCMS:", result.error)
    }

    // ALWAYS log for manual follow-up (same as newsletter pattern)
    console.log("🎯 DEAL KIT SIGNUP - MANUAL FOLLOW-UP:", {
      email: email,
      buyerType: buyerType,
      timestamp: new Date().toISOString(),
      datocmsSuccess: result.success,
      priority: "HIGH",
      source: "deal_kit_landing_page",
      action_required: "SEND_DEAL_KIT_FILES_MANUALLY",
    })

    // Always return success to user (same as newsletter)
    return {
      success: true,
      message:
        "🎉 Success! Check your email for The Deal Kit. It should arrive within 2 minutes. (Don't forget to check your spam folder!)",
    }
  } catch (error) {
    console.error("Deal Kit signup error:", error)

    // CRITICAL: Always log for manual follow-up (same as newsletter pattern)
    console.log("🚨 URGENT DEAL KIT FOLLOW-UP NEEDED:", {
      email: formData.get("email"),
      buyerType: formData.get("buyerType"),
      error: error.message,
      timestamp: new Date().toISOString(),
      priority: "URGENT",
      source: "deal_kit_landing_page",
      action_required: "SEND_DEAL_KIT_FILES_MANUALLY_ASAP",
    })

    return {
      success: true, // Still show success to user
      message:
        "🎉 Success! Check your email for The Deal Kit. It should arrive within 2 minutes. (Don't forget to check your spam folder!)",
    }
  }
}
