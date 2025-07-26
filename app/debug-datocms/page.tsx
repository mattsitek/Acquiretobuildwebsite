import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react"

// Test basic DatoCMS connection
async function testDatoCMSConnection() {
  try {
    const { GraphQLClient } = await import("graphql-request")
    const client = new GraphQLClient("https://graphql.datocms.com/", {
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      },
    })

    const query = `
      query {
        _site {
          name
        }
      }
    `

    const data = await client.request(query)
    return {
      success: true,
      siteName: data._site?.name || "Unknown",
      error: null,
    }
  } catch (error: any) {
    return {
      success: false,
      siteName: null,
      error: error.message || "Unknown error",
    }
  }
}

// Test article model
async function testArticleModel() {
  try {
    const { GraphQLClient } = await import("graphql-request")
    const client = new GraphQLClient("https://graphql.datocms.com/", {
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      },
    })

    const query = `
      query {
        allArticles(first: 1) {
          id
          title
          slug
        }
      }
    `

    const data = await client.request(query)
    return {
      success: true,
      count: data.allArticles?.length || 0,
      articles: data.allArticles || [],
      error: null,
    }
  } catch (error: any) {
    return {
      success: false,
      count: 0,
      articles: [],
      error: error.message || "Unknown error",
    }
  }
}

// Test homepage model
async function testHomepageModel() {
  try {
    const { GraphQLClient } = await import("graphql-request")
    const client = new GraphQLClient("https://graphql.datocms.com/", {
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      },
    })

    const query = `
      query {
        homepage {
          id
          heroTitle
          heroSubtitle
        }
      }
    `

    const data = await client.request(query)
    return {
      success: true,
      homepage: data.homepage,
      error: null,
    }
  } catch (error: any) {
    return {
      success: false,
      homepage: null,
      error: error.message || "Unknown error",
    }
  }
}

// Test subscriber model
async function testSubscriberModel() {
  try {
    const { GraphQLClient } = await import("graphql-request")
    const client = new GraphQLClient("https://graphql.datocms.com/", {
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      },
    })

    const query = `
      query {
        allSubscribers(first: 1) {
          id
          email
        }
      }
    `

    const data = await client.request(query)
    return {
      success: true,
      count: data.allSubscribers?.length || 0,
      error: null,
    }
  } catch (error: any) {
    return {
      success: false,
      count: 0,
      error: error.message || "Unknown error",
    }
  }
}

export default async function DebugDatoCMSPage() {
  const connectionTest = await testDatoCMSConnection()
  const articleTest = await testArticleModel()
  const homepageTest = await testHomepageModel()
  const subscriberTest = await testSubscriberModel()

  const hasApiToken = !!process.env.DATOCMS_API_TOKEN

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-black text-black">
              Acquire & Build
            </Link>
            <div className="flex space-x-8">
              <Link href="/blog" className="text-gray-700 hover:text-[#1A73E8] font-medium transition-colors">
                Blog
              </Link>
              <Link href="/deal-kit" className="text-gray-700 hover:text-[#1A73E8] font-medium transition-colors">
                Deal Kit
              </Link>
              <Link href="/newsletter" className="text-gray-700 hover:text-[#1A73E8] font-medium transition-colors">
                Newsletter
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#1A73E8] font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Debug Dashboard */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-black mb-2">DatoCMS Debug Dashboard</h1>
            <p className="text-gray-600">Test your DatoCMS connection and model configurations</p>
          </div>

          {/* Environment Check */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {hasApiToken ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                Environment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>DATOCMS_API_TOKEN</span>
                  <span className={hasApiToken ? "text-green-600" : "text-red-600"}>
                    {hasApiToken ? "✓ Set" : "✗ Missing"}
                  </span>
                </div>
                {!hasApiToken && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <p className="text-red-800 text-sm">
                      Your DatoCMS API token is missing. Add it to your environment variables to enable DatoCMS
                      functionality.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Connection Tests */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Connection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {connectionTest.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  DatoCMS Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                {connectionTest.success ? (
                  <div className="space-y-2">
                    <p className="text-green-600">✓ Connection successful</p>
                    <p className="text-sm text-gray-600">Site: {connectionTest.siteName}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-red-600">✗ Connection failed</p>
                    <p className="text-sm text-red-600">{connectionTest.error}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Article Model */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {articleTest.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  Article Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                {articleTest.success ? (
                  <div className="space-y-2">
                    <p className="text-green-600">✓ Model accessible</p>
                    <p className="text-sm text-gray-600">Articles found: {articleTest.count}</p>
                    {articleTest.articles.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Latest article:</p>
                        <p className="text-sm font-medium">{articleTest.articles[0].title}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-red-600">✗ Model not accessible</p>
                    <p className="text-sm text-red-600">{articleTest.error}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Homepage Model */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {homepageTest.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  Homepage Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                {homepageTest.success ? (
                  <div className="space-y-2">
                    <p className="text-green-600">✓ Model accessible</p>
                    {homepageTest.homepage && <p className="text-sm text-gray-600">Hero title configured</p>}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-red-600">✗ Model not accessible</p>
                    <p className="text-sm text-red-600">{homepageTest.error}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subscriber Model */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {subscriberTest.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  Subscriber Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                {subscriberTest.success ? (
                  <div className="space-y-2">
                    <p className="text-green-600">✓ Model accessible</p>
                    <p className="text-sm text-gray-600">Subscribers: {subscriberTest.count}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-red-600">✗ Model not accessible</p>
                    <p className="text-sm text-red-600">{subscriberTest.error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild>
              <a href="https://acquireandbuild.datocms.com" target="_blank" rel="noopener noreferrer">
                Open DatoCMS Dashboard
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/datocms-setup">Setup Guide</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin">Back to Admin</Link>
            </Button>
          </div>

          {/* Troubleshooting */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Troubleshooting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Common Issues:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Missing DATOCMS_API_TOKEN environment variable</li>
                    <li>• Incorrect API token permissions</li>
                    <li>• Model not created in DatoCMS dashboard</li>
                    <li>• Field names don't match schema</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Next Steps:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>1. Verify your API token in DatoCMS settings</li>
                    <li>2. Check model configurations match the schema files</li>
                    <li>3. Create sample content to test queries</li>
                    <li>4. Review the setup guide for detailed instructions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
