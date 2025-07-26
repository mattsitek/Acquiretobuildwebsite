import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react"

// Test homepage data fetch
async function testHomepageData() {
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
          heroImage {
            url
            alt
          }
          valuePropositions
          features
          testimonials
          ctaTitle
          ctaSubtitle
        }
      }
    `

    const data = await client.request(query)
    return {
      success: true,
      data: data.homepage,
      error: null,
    }
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error: error.message || "Unknown error",
    }
  }
}

export default async function DebugHomepagePage() {
  const homepageTest = await testHomepageData()
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
            <h1 className="text-3xl font-black text-black mb-2">Homepage Debug Dashboard</h1>
            <p className="text-gray-600">Test your homepage DatoCMS integration</p>
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
              </div>
            </CardContent>
          </Card>

          {/* Homepage Data Test */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {homepageTest.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                Homepage Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              {homepageTest.success ? (
                <div className="space-y-4">
                  <p className="text-green-600">✓ Homepage data loaded successfully</p>
                  {homepageTest.data && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Current Homepage Data:</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Hero Title:</strong> {homepageTest.data.heroTitle || "Not set"}
                        </div>
                        <div>
                          <strong>Hero Subtitle:</strong> {homepageTest.data.heroSubtitle || "Not set"}
                        </div>
                        <div>
                          <strong>Hero Image:</strong> {homepageTest.data.heroImage?.url ? "✓ Set" : "Not set"}
                        </div>
                        <div>
                          <strong>Value Propositions:</strong>{" "}
                          {homepageTest.data.valuePropositions ? "✓ Configured" : "Not set"}
                        </div>
                        <div>
                          <strong>Features:</strong> {homepageTest.data.features ? "✓ Configured" : "Not set"}
                        </div>
                        <div>
                          <strong>Testimonials:</strong> {homepageTest.data.testimonials ? "✓ Configured" : "Not set"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-red-600">✗ Failed to load homepage data</p>
                  <p className="text-sm text-red-600">{homepageTest.error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Raw Data Display */}
          {homepageTest.success && homepageTest.data && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Raw Data (JSON)</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto">
                  {JSON.stringify(homepageTest.data, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="https://acquireandbuild.datocms.com" target="_blank" rel="noopener noreferrer">
                Open DatoCMS Dashboard
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">View Homepage</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/debug-datocms">Full Debug Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin">Back to Admin</Link>
            </Button>
          </div>

          {/* Setup Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                Setup Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">To configure your homepage:</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Go to your DatoCMS dashboard</li>
                    <li>Navigate to the Homepage model</li>
                    <li>Fill in the hero title, subtitle, and upload a hero image</li>
                    <li>Configure value propositions, features, and testimonials as JSON</li>
                    <li>Save and publish your changes</li>
                    <li>Refresh this page to see the updated data</li>
                  </ol>
                </div>
                {!homepageTest.success && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      If you're seeing errors, make sure you have created the Homepage model in DatoCMS with the correct
                      field names as specified in the schema files.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
