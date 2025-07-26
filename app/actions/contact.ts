"use server"

interface ContactFormData {
  name: string
  email: string
  message: string
  partnering: boolean
  buyingBusiness: boolean
  other: boolean
}

// Store contact form submission in DatoCMS using REST API
async function storeContactInDatoCMS(data: ContactFormData) {
  try {
    const response = await fetch("https://site-api.datocms.com/items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/json",
        "X-Api-Version": "3",
      },
      body: JSON.stringify({
        data: {
          type: "item",
          attributes: {
            name: data.name,
            email: data.email,
            message: data.message,
            interested_in_partnering: data.partnering,
            has_business_question: data.buyingBusiness,
            other_just_saying_hi: data.other,
            submitted_at: new Date().toISOString(),
            contact_status: "new",
          },
          relationships: {
            item_type: {
              data: {
                type: "item_type",
                id: "GwHlJj0cT3Sq8U-9PzEcGw",
              },
            },
          },
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ DatoCMS Contact API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        headers: {
          Authorization: "Bearer [REDACTED]",
          "Content-Type": "application/vnd.api+json",
          Accept: "application/json",
          "X-Api-Version": "3",
        },
        formData: data,
      })
      return { success: false, error: `API Error: ${response.status}` }
    }

    const result = await response.json()
    console.log("✅ Contact stored in DatoCMS successfully:", {
      id: result.data?.id,
      name: data.name,
      email: data.email,
      timestamp: new Date().toISOString(),
    })

    return { success: true, data: result.data }
  } catch (error) {
    console.error("❌ Failed to store contact in DatoCMS:", error)
    return { success: false, error: error.message }
  }
}

export async function submitContactForm(formData: FormData) {
  // Extract form data
  const contactData: ContactFormData = {
    name: (formData.get("name") as string) || "",
    email: (formData.get("email") as string) || "",
    message: (formData.get("message") as string) || "",
    partnering: formData.get("partnering") === "on",
    buyingBusiness: formData.get("buying-business") === "on",
    other: formData.get("other") === "on",
  }

  // Validation
  if (!contactData.name.trim()) {
    return {
      success: false,
      message: "Please enter your name",
    }
  }

  if (!contactData.email.trim()) {
    return {
      success: false,
      message: "Please enter your email address",
    }
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(contactData.email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  if (!contactData.message.trim()) {
    return {
      success: false,
      message: "Please enter your message",
    }
  }

  try {
    console.log("📧 Processing contact form submission:", {
      name: contactData.name,
      email: contactData.email,
      partnering: contactData.partnering,
      buyingBusiness: contactData.buyingBusiness,
      other: contactData.other,
    })

    // Try to store in DatoCMS
    const storageResult = await storeContactInDatoCMS(contactData)

    if (storageResult.success) {
      return {
        success: true,
        message: `Thanks ${contactData.name}! I'll get back to you personally within 24 hours.`,
      }
    } else {
      // DatoCMS storage failed - log for manual follow-up
      console.log("🚨 MANUAL FOLLOW-UP NEEDED - Contact Form:", {
        name: contactData.name,
        email: contactData.email,
        message: contactData.message,
        interested_in_partnering: contactData.partnering,
        has_business_question: contactData.buyingBusiness,
        other_just_saying_hi: contactData.other,
        submitted_at: new Date().toISOString(),
        storage_error: storageResult.error,
        note: "DatoCMS storage failed - requires manual follow-up",
      })

      // Still return success to user
      return {
        success: true,
        message: `Thanks ${contactData.name}! I'll get back to you personally within 24 hours.`,
      }
    }
  } catch (error) {
    console.error("❌ Contact form submission error:", error)

    // Log for manual follow-up
    console.log("🚨 URGENT MANUAL FOLLOW-UP NEEDED - Contact Form:", {
      name: contactData.name,
      email: contactData.email,
      message: contactData.message,
      interested_in_partnering: contactData.partnering,
      has_business_question: contactData.buyingBusiness,
      other_just_saying_hi: contactData.other,
      submitted_at: new Date().toISOString(),
      system_error: error.message,
      note: "System error occurred - urgent manual follow-up required",
    })

    // Still return success to user
    return {
      success: true,
      message: `Thanks ${contactData.name}! I'll get back to you personally within 24 hours.`,
    }
  }
}

// Helper function to get contact submissions (for admin use)
export async function getContactSubmissions() {
  try {
    const response = await fetch(
      `https://site-api.datocms.com/items?filter[type]=${encodeURIComponent("GwHlJj0cT3Sq8U-9PzEcGw")}&page[limit]=100&page[offset]=0`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
          Accept: "application/json",
          "X-Api-Version": "3",
        },
      },
    )

    if (!response.ok) {
      console.error("Failed to fetch contact submissions:", response.status, response.statusText)
      return { success: false, submissions: [] }
    }

    const result = await response.json()
    return {
      success: true,
      submissions: result.data || [],
    }
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return { success: false, submissions: [] }
  }
}
