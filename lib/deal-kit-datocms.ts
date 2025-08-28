// Deal Kit DatoCMS functions using the same working pattern as newsletter

async function detectDealKitSubscriberModel() {
  try {
    console.log("Detecting Deal Kit subscriber model...")

    const response = await fetch("https://site-api.datocms.com/item-types", {
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Version": "3",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`)
    }

    const data = await response.json()
    console.log("Available item types:", data.data?.length || 0)

    // Look for deal_kit_subscriber model by ID
    const dealKitModel = data.data?.find((model: any) => model.id === "dsAqhKvDSveXmibTwKXhvw")

    if (dealKitModel) {
      console.log("Using Deal Kit subscriber model:", dealKitModel.id, dealKitModel.attributes?.name)
      return dealKitModel.id
    }

    // Fallback: look by name patterns
    const fallbackModel = data.data?.find(
      (model: any) =>
        model.attributes?.name?.toLowerCase().includes("deal") ||
        model.attributes?.name?.toLowerCase().includes("kit") ||
        model.attributes?.api_key?.toLowerCase().includes("deal"),
    )

    if (fallbackModel) {
      console.log("Using fallback Deal Kit model:", fallbackModel.id, fallbackModel.attributes?.name)
      return fallbackModel.id
    }

    throw new Error("Deal Kit subscriber model not found")
  } catch (error) {
    console.error("Error detecting Deal Kit model:", error)
    return "dsAqhKvDSveXmibTwKXhvw" // Use provided ID as fallback
  }
}

export async function storeDealKitSubscriber(data: {
  email: string
  buyerType?: string
}) {
  try {
    console.log("Deal Kit subscriber data received:", { email: data.email, buyerType: data.buyerType })

    const modelId = await detectDealKitSubscriberModel()
    console.log("Using Deal Kit model ID:", modelId)

    // Use the same simple payload structure as newsletter
    const payload = {
      data: {
        type: "item",
        attributes: {
          email: data.email,
          KfmtZVQBRHKwXlhxu7lgrw: data.buyerType || "not_specified",
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

    console.log("Sending Deal Kit payload to DatoCMS:", JSON.stringify(payload, null, 2))

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

    console.log("DatoCMS Deal Kit Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("DatoCMS Deal Kit API Error:", response.status, errorText)

      // Try with minimal payload (email only) like newsletter fallback
      if (response.status === 422) {
        console.log("Trying minimal Deal Kit payload (email only)...")

        const minimalPayload = {
          data: {
            type: "item",
            attributes: {
              email: data.email,
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

        const retryResponse = await fetch("https://site-api.datocms.com/items", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Api-Version": "3",
          },
          body: JSON.stringify(minimalPayload),
        })

        if (retryResponse.ok) {
          const result = await retryResponse.json()
          console.log("Deal Kit subscriber stored with minimal payload:", result.data?.id)
          return { success: true, id: result.data?.id }
        }
      }

      return { success: false, error: `DatoCMS API error: ${response.status}` }
    }

    const result = await response.json()
    console.log("Deal Kit subscriber stored successfully:", result.data?.id)

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error("Failed to store Deal Kit subscriber:", error)
    return { success: false, error: error.message }
  }
}
