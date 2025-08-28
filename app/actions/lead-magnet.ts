"use server"

interface LeadMagnetFormData {
  email: string
  firstName?: string
  activelySearching?: boolean
  leadMagnetId?: string
}

// Get available models from DatoCMS
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
      console.error("Failed to fetch item types:", response.status, response.statusText)
      return null
    }

    const data = await response.json()
    console.log(
      "Available item types:",
      data.data?.map((item: any) => ({ id: item.id, name: item.attributes?.name, api_key: item.attributes?.api_key })),
    )
    return data.data
  } catch (error) {
    console.error("Error fetching available models:", error)
    return null
  }
}

// Get model fields to understand the correct field names
async function getModelFields(modelId: string) {
  try {
    const response = await fetch(`https://site-api.datocms.com/item-types/${modelId}/fields`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Version": "3",
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch model fields:", response.status, response.statusText)
      return null
    }

    const data = await response.json()
    const fields = data.data?.map((field: any) => ({
      id: field.id,
      api_key: field.attributes?.api_key,
      field_type: field.attributes?.field_type,
      label: field.attributes?.label,
    }))

    console.log(`Fields for model ${modelId}:`, fields)
    return fields
  } catch (error) {
    console.error("Error fetching model fields:", error)
    return null
  }
}

// Use the specific model ID provided by the user
async function detectLeadMagnetModel() {
  const specificModelId = "ZU4GgazNT4-F4mwU7eqF_w" // The exact model ID you provided

  console.log("Using specific lead magnet model ID:", specificModelId)

  // Get the actual field names for this model
  const fields = await getModelFields(specificModelId)
  if (fields) {
    console.log("Available fields for lead magnet model:", fields)
  }

  return specificModelId
}

// Get lead magnet details for download using GraphQL (Version 69 approach)
async function getLeadMagnetDetails(leadMagnetId?: string) {
  const query = leadMagnetId
    ? `
      query GetLeadMagnet($id: ItemId!) {
        leadMagnet(filter: { id: { eq: $id } }) {
          id
          title
          pdfFile {
            url
            filename
          }
          downloadCount
        }
      }
    `
    : `
      query GetPrimaryLeadMagnet {
        allLeadMagnets(filter: { isActive: { eq: true } }, first: 1) {
          id
          title
          pdfFile {
            url
            filename
          }
          downloadCount
        }
      }
    `

  const variables = leadMagnetId ? { id: leadMagnetId } : {}

  console.log("GraphQL Query:", query)
  console.log("GraphQL Variables:", variables)

  try {
    const response = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    console.log("GraphQL Response status:", response.status)

    if (!response.ok) {
      console.error("Failed to fetch lead magnet via GraphQL:", response.status, response.statusText)
      const errorText = await response.text()
      console.error("GraphQL error details:", errorText)
      return null
    }

    const data = await response.json()
    console.log("GraphQL Response:", JSON.stringify(data, null, 2))

    if (data.errors) {
      console.error("GraphQL errors:", data.errors)
      return null
    }

    const leadMagnet = leadMagnetId ? data.data?.leadMagnet : data.data?.allLeadMagnets?.[0]

    if (!leadMagnet) {
      console.log("No lead magnet found")
      return null
    }

    console.log("Found lead magnet:", leadMagnet)

    if (leadMagnet.pdfFile?.url) {
      console.log("Found lead magnet PDF:", leadMagnet.pdfFile.url)
      return {
        pdfFile: {
          url: leadMagnet.pdfFile.url,
          filename: leadMagnet.pdfFile.filename || "business-scripts.pdf",
        },
      }
    }

    console.log("No PDF file found in lead magnet")
    return null
  } catch (error) {
    console.error("Error fetching lead magnet details via GraphQL:", error)
    return null
  }
}

// Store lead magnet signup in DatoCMS with all three fields
export async function storeLeadMagnetSignup(data: LeadMagnetFormData) {
  const modelId = await detectLeadMagnetModel()

  if (!modelId) {
    console.error("Could not get lead magnet subscriber model")
    return { success: false, error: "Model not found" }
  }

  console.log("Using specific model ID for lead magnet:", modelId)

  // Include all three fields: email, name, and activelySearching boolean
  const payload = {
    data: {
      type: "item",
      attributes: {
        email: data.email,
        name: data.firstName || null, // Add name field
        im_actively_searching: data.activelySearching || false, // Add boolean field
      },
      relationships: {
        item_type: {
          data: {
            type: "item_type",
            id: modelId, // Using the specific model ID: ZU4GgazNT4-F4mwU7eqF_w
          },
        },
      },
    },
  }

  console.log("Sending lead magnet payload with all fields to DatoCMS:", JSON.stringify(payload, null, 2))

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

    console.log("DatoCMS Lead Magnet Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("DatoCMS Lead Magnet API Error:", response.status, response.statusText, errorText)

      if (response.status === 404) {
        return { success: false, error: `Model '${modelId}' not found. Please check your DatoCMS configuration.` }
      } else if (response.status === 422) {
        return { success: false, error: `Validation error. Please check the field names in your DatoCMS model.` }
      } else {
        return { success: false, error: `API Error: ${response.status} - ${errorText}` }
      }
    }

    const result = await response.json()
    console.log("Lead magnet signup stored in DatoCMS:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("Failed to store lead magnet signup in DatoCMS:", error)
    return { success: false, error: error.message }
  }
}

export async function subscribeToLeadMagnet(formData: FormData) {
  const data: LeadMagnetFormData = {
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    activelySearching: formData.get("activelySearching") === "on",
    leadMagnetId: formData.get("leadMagnetId") as string,
  }

  console.log("Lead magnet form data received:", data)

  if (!data.email) {
    return { success: false, message: "Email is required" }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { success: false, message: "Please enter a valid email address" }
  }

  try {
    console.log("Processing lead magnet signup for:", data.email)

    // Store in DatoCMS first
    const storageResult = await storeLeadMagnetSignup(data)

    if (!storageResult.success) {
      console.error("Failed to store in DatoCMS:", storageResult.error)

      // Log for manual follow-up
      console.log("🚨 MANUAL FOLLOW-UP NEEDED - Lead Magnet Signup:", {
        email: data.email,
        firstName: data.firstName,
        activelySearching: data.activelySearching,
        timestamp: new Date().toISOString(),
        error: storageResult.error,
        priority: data.activelySearching ? "HIGH" : "NORMAL",
      })

      // Still return success to user but log the issue
      const leadMagnet = await getLeadMagnetDetails(data.leadMagnetId)
      const welcomeName = data.firstName ? ` ${data.firstName}` : ""

      return {
        success: true,
        message: `Thanks${welcomeName}! Check your email for the scripts + you'll get weekly insights every Friday.`,
        downloadUrl: leadMagnet?.pdfFile?.url || null,
        filename: leadMagnet?.pdfFile?.filename || "business-scripts.pdf",
      }
    }

    // Get lead magnet details for download
    const leadMagnet = await getLeadMagnetDetails(data.leadMagnetId)

    // Log successful signup
    console.log("🎯 LEAD MAGNET SIGNUP SUCCESS:", {
      email: data.email,
      firstName: data.firstName,
      activelySearching: data.activelySearching,
      timestamp: new Date().toISOString(),
      datocmsId: storageResult.data?.data?.id,
      priority: data.activelySearching ? "HIGH" : "NORMAL",
      downloadUrl: leadMagnet?.pdfFile?.url || "No PDF available",
    })

    const welcomeName = data.firstName ? ` ${data.firstName}` : ""

    return {
      success: true,
      message: `Thanks${welcomeName}! Check your email for the scripts + you'll get weekly insights every Friday.`,
      downloadUrl: leadMagnet?.pdfFile?.url || null,
      filename: leadMagnet?.pdfFile?.filename || "business-scripts.pdf",
    }
  } catch (error) {
    console.error("Lead magnet signup error:", error)

    // Log for manual follow-up
    console.log("🚨 URGENT MANUAL FOLLOW-UP NEEDED:", {
      email: data.email,
      firstName: data.firstName,
      activelySearching: data.activelySearching,
      error: error.message,
      timestamp: new Date().toISOString(),
      priority: "URGENT",
    })

    // Still provide a good user experience
    const leadMagnet = await getLeadMagnetDetails(data.leadMagnetId)
    const welcomeName = data.firstName ? ` ${data.firstName}` : ""

    return {
      success: true,
      message: `Thanks${welcomeName}! Check your email for the scripts + you'll get weekly insights every Friday.`,
      downloadUrl: leadMagnet?.pdfFile?.url || null,
      filename: leadMagnet?.pdfFile?.filename || "business-scripts.pdf",
    }
  }
}

// Get lead magnet analytics using REST API with specific model ID
export async function getLeadMagnetAnalytics() {
  try {
    const modelId = "ZU4GgazNT4-F4mwU7eqF_w" // Using the specific model ID

    const response = await fetch(`https://site-api.datocms.com/items?filter[type]=${modelId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Version": "3",
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch lead magnet analytics:", response.status, response.statusText)
      return {
        totalSignups: 0,
        activelySearching: 0,
        recentSignups: [],
        allSubscribers: [],
        error: "Unable to fetch analytics - check DatoCMS configuration",
      }
    }

    const data = await response.json()
    const subscribers = data.data || []

    return {
      totalSignups: subscribers.length,
      activelySearching: subscribers.filter((s: any) => s.attributes?.im_actively_searching).length,
      recentSignups: subscribers.slice(0, 10),
      allSubscribers: subscribers,
    }
  } catch (error) {
    console.error("Error fetching lead magnet analytics:", error)
    return {
      totalSignups: 0,
      activelySearching: 0,
      recentSignups: [],
      allSubscribers: [],
      error: "Unable to fetch analytics - check DatoCMS configuration",
    }
  }
}
