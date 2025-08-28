"use server"

type NewsletterFormData = {
  email: string
}

// Helper function to fetch all available models
async function getAvailableModels() {
  try {
    const response = await fetch("https://site-api.datocms.com/item-types", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Version": "3",
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch available models:", response.status, response.statusText)
      return null
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching available models:", error)
    return null
  }
}

// Detect the correct model ID for newsletter subscribers
async function detectSubscriberModel() {
  // Use the provided subscriber model ID first
  const knownModelId = "Iq9B05INQeqz_5q9iznpug"

  try {
    // Verify the known model exists
    const verifyResponse = await fetch(`https://site-api.datocms.com/item-types/${knownModelId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Version": "3",
      },
    })

    if (verifyResponse.ok) {
      const modelData = await verifyResponse.json()
      console.log("✅ Verified subscriber model:", knownModelId, modelData.data?.attributes?.name)
      return knownModelId
    }
  } catch (error) {
    console.error("Error verifying known model:", error)
  }

  // Fallback: Get all models and find subscriber model
  const models = await getAvailableModels()

  if (!models) {
    console.error("Could not fetch available models")
    return null
  }

  // Look for exact match first
  let subscriberModel = models.find((item: any) => item.id === knownModelId)

  // If not found, look for models containing subscriber, email, or newsletter keywords
  if (!subscriberModel) {
    subscriberModel = models.find(
      (item: any) =>
        item.attributes?.api_key?.includes("subscriber") ||
        item.attributes?.name?.toLowerCase().includes("subscriber") ||
        item.attributes?.name?.toLowerCase().includes("email") ||
        item.attributes?.name?.toLowerCase().includes("newsletter"),
    )
  }

  if (subscriberModel) {
    console.log("Using fallback subscriber model:", subscriberModel.id, subscriberModel.attributes?.name)
    return subscriberModel.id
  }

  console.error("No suitable subscriber model found")
  return null
}

// Store newsletter signup in DatoCMS
async function storeNewsletterSignup(data: NewsletterFormData) {
  const modelId = await detectSubscriberModel()

  if (!modelId) {
    console.error("Could not detect subscriber model")
    return { success: false, error: "Model not found" }
  }

  console.log("Using model ID for newsletter:", modelId)

  // Validate model exists before creating record
  try {
    const validateResponse = await fetch(`https://site-api.datocms.com/item-types/${modelId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Version": "3",
      },
    })

    if (!validateResponse.ok) {
      console.error("Model validation failed:", validateResponse.status, validateResponse.statusText)
      return { success: false, error: `Model '${modelId}' validation failed` }
    }

    console.log("✅ Model validation successful")
  } catch (error) {
    console.error("Model validation error:", error)
    return { success: false, error: "Model validation failed" }
  }

  const payload = {
    data: {
      type: "item",
      attributes: {
        email: data.email,
        subscribed_at: new Date().toISOString(),
      },
      relationships: {
        item_type: {
          data: {
            type: "item_type",
            id: modelId,
          },
        },
      },
    },
  }

  console.log("Sending newsletter payload to DatoCMS:", JSON.stringify(payload, null, 2))

  try {
    const response = await fetch("https://site-api.datocms.com/items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Version": "3",
      },
      body: JSON.stringify(payload),
    })

    console.log("DatoCMS Newsletter Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("DatoCMS Newsletter API Error:", response.status, response.statusText, errorText)

      if (response.status === 404) {
        return { success: false, error: `Model '${modelId}' not found. Please check your DatoCMS configuration.` }
      } else if (response.status === 422) {
        return { success: false, error: `Validation error. Please check the field names in your DatoCMS model.` }
      } else {
        return { success: false, error: `API Error: ${response.status} - ${errorText}` }
      }
    }

    const result = await response.json()
    console.log("✅ Newsletter signup stored in DatoCMS:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("Failed to store newsletter signup in DatoCMS:", error)
    return { success: false, error: error.message }
  }
}

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return {
      success: false,
      message: "Email is required",
    }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  try {
    const result = await storeNewsletterSignup({ email })

    if (!result.success) {
      console.error("Newsletter signup failed:", result.error)

      // Log the signup for manual follow-up when DatoCMS fails
      console.log("📧 NEWSLETTER SIGNUP (Manual Follow-up Required):", {
        email,
        timestamp: new Date().toISOString(),
        source: "newsletter_form",
        datocms_error: result.error,
      })

      return {
        success: true,
        message: "Thanks for subscribing! You'll receive our next newsletter on Friday.",
      }
    }

    console.log("✅ Newsletter subscription successful:", { email, id: result.data?.data?.id })

    return {
      success: true,
      message: "Thanks for subscribing! You'll receive our next newsletter on Friday.",
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)

    // Log the signup for manual follow-up when there's an error
    console.log("📧 NEWSLETTER SIGNUP (Manual Follow-up Required):", {
      email,
      timestamp: new Date().toISOString(),
      source: "newsletter_form",
      error: error instanceof Error ? error.message : "Unknown error",
    })

    return {
      success: true,
      message: "Thanks for subscribing! You'll receive our next newsletter on Friday.",
    }
  }
}
