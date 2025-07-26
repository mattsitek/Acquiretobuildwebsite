import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient("https://graphql.datocms.com/", {
  headers: {
    Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  },
})

// Updated queries to include feature_image field
export async function getBlogPosts() {
  const query = `
    query {
      allArticles(orderBy: publishedAt_DESC) {
        id
        title
        slug
        excerpt
        publishedAt
        featureImage {
          url
          alt
        }
      }
    }
  `

  try {
    const data = await client.request(query)
    return data.allArticles || []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  const query = `
    query GetPost($slug: String!) {
      article(filter: { slug: { eq: $slug } }) {
        id
        title
        slug
        content
        publishedAt
        featureImage {
          url
          alt
        }
      }
    }
  `

  try {
    const data = await client.request(query, { slug })
    return data.article
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

// NEW: Get active lead magnets
export async function getLeadMagnets() {
  const query = `
    query {
      allLeadMagnets(filter: { isActive: { eq: true } }) {
        id
        title
        description
        pdfFile {
          url
          filename
        }
        pdfDescription
        keywords
        previewImage {
          url
          alt
        }
        previewImageAltText
        fileSize
        pageCount
        downloadCount
      }
    }
  `

  try {
    const data = await client.request(query)
    return data.allLeadMagnets || []
  } catch (error) {
    console.error("Error fetching lead magnets:", error)
    return []
  }
}

// NEW: Get primary lead magnet (first active one)
export async function getPrimaryLeadMagnet() {
  const query = `
    query {
      allLeadMagnets(filter: { isActive: { eq: true } }, first: 1) {
        id
        title
        description
        pdfFile {
          url
          filename
        }
        pdfDescription
        keywords
        previewImage {
          url
          alt
        }
        previewImageAltText
        fileSize
        pageCount
        downloadCount
      }
    }
  `

  try {
    const data = await client.request(query)
    return data.allLeadMagnets?.[0] || null
  } catch (error) {
    console.error("Error fetching primary lead magnet:", error)
    return null
  }
}

// Debug function to see what fields are available on Homepage
export async function getHomepageFields() {
  const query = `
    query {
      __type(name: "HomepageRecord") {
        name
        fields {
          name
          type {
            name
            ofType {
              name
            }
          }
        }
      }
    }
  `

  try {
    const data = await client.request(query)
    return data.__type?.fields || []
  } catch (error) {
    console.error("Error fetching homepage fields:", error)
    return []
  }
}

// UPDATED: Get homepage content with better error handling and debugging
export async function getHomepageContent() {
  // Check if we have a valid API token
  if (!process.env.DATOCMS_API_TOKEN) {
    console.warn("⚠️ DATOCMS_API_TOKEN not found - using fallback content")
    return null
  }

  // Try the full query with all fields
  const fullQuery = `
    query {
      homepage {
        heroTitle
        heroSubtitle
        heroImage {
          url
          alt
        }
        heroImageAltText
        heroButtonText
        rightPlaceTitle
        rightPlaceBulletOne
        rightPlaceBulletTwo
        rightPlaceBulletThree
        rightPlaceImage {
          url
          alt
        }
        rightPlaceImageAlt
      }
    }
  `

  try {
    console.log("🔍 Attempting full homepage query...")
    const data = await client.request(fullQuery)
    console.log("✅ Full homepage query successful:", data.homepage)
    return data.homepage
  } catch (fullError) {
    console.error("❌ Full homepage query failed:", fullError.message)

    // Check if it's an authorization error
    if (fullError.message?.includes("401") || fullError.message?.includes("INVALID_AUTHORIZATION_HEADER")) {
      console.warn("🔑 DatoCMS authorization failed - check your API token")
      return null
    }

    // Try basic query as fallback
    const basicQuery = `
      query {
        homepage {
          heroTitle
          heroSubtitle
          heroImage {
            url
            alt
          }
          heroImageAltText
          heroButtonText
        }
      }
    `

    try {
      console.log("🔍 Attempting basic homepage query...")
      const basicData = await client.request(basicQuery)
      console.log("✅ Basic homepage query successful, but Right Place fields missing")
      return basicData.homepage
    } catch (basicError) {
      console.error("❌ Even basic homepage query failed:", basicError.message)
      return null
    }
  }
}

// NEW: Test specifically the Right Place fields
export async function testRightPlaceFields() {
  if (!process.env.DATOCMS_API_TOKEN) {
    return {
      success: false,
      error: "No API token configured",
    }
  }

  const query = `
    query {
      homepage {
        rightPlaceTitle
        rightPlaceBulletOne
        rightPlaceBulletTwo
        rightPlaceBulletThree
        rightPlaceImage {
          url
          alt
        }
        rightPlaceImageAlt
      }
    }
  `

  try {
    const data = await client.request(query)
    return {
      success: true,
      data: data.homepage,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

// Test if we can query articles specifically with minimal fields
export async function testArticleQuery() {
  if (!process.env.DATOCMS_API_TOKEN) {
    return {
      success: false,
      error: "No API token configured",
    }
  }

  const query = `
    query {
      allArticles {
        id
        title
        slug
      }
    }
  `

  try {
    const data = await client.request(query)
    return {
      success: true,
      count: data.allArticles?.length || 0,
      articles: data.allArticles || [],
    }
  } catch (error) {
    console.error("Error testing article query:", error)
    return {
      success: false,
      error: error.message || "Article query failed",
    }
  }
}

// Test what fields are actually available on Article
export async function getArticleFields() {
  if (!process.env.DATOCMS_API_TOKEN) {
    return []
  }

  const query = `
    query {
      __type(name: "ArticleRecord") {
        name
        fields {
          name
          type {
            name
            ofType {
              name
            }
          }
        }
      }
    }
  `

  try {
    const data = await client.request(query)
    return data.__type?.fields || []
  } catch (error) {
    console.error("Error fetching article fields:", error)
    return []
  }
}

// List all articles with their slugs for debugging
export async function getAllArticleSlugs() {
  if (!process.env.DATOCMS_API_TOKEN) {
    return []
  }

  const query = `
    query {
      allArticles {
        id
        title
        slug
      }
    }
  `

  try {
    const data = await client.request(query)
    return data.allArticles || []
  } catch (error) {
    console.error("Error fetching article slugs:", error)
    return []
  }
}

// Basic connection tests
export async function testBasicConnection() {
  if (!process.env.DATOCMS_API_TOKEN) {
    return {
      success: false,
      error: "No API token configured",
    }
  }

  const query = `
    query {
      __typename
    }
  `

  try {
    const data = await client.request(query)
    return {
      success: true,
      typename: data.__typename,
    }
  } catch (error) {
    console.error("DatoCMS basic connection error:", error)
    return {
      success: false,
      error: error.message || "Connection failed",
    }
  }
}

export async function getAvailableModels() {
  if (!process.env.DATOCMS_API_TOKEN) {
    return []
  }

  const query = `
    query {
      __schema {
        queryType {
          fields {
            name
            type {
              name
            }
          }
        }
      }
    }
  `

  try {
    const data = await client.request(query)
    const queryFields = data.__schema.queryType.fields
    const modelFields = queryFields.filter(
      (field: any) => field.name.startsWith("all") || field.name.endsWith("Record"),
    )
    return modelFields
  } catch (error) {
    console.error("Error fetching available models:", error)
    return []
  }
}
