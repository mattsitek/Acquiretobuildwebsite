"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Key, Settings, Info } from "lucide-react"

export default function DebugNewsletterPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function testDatoCMSConnection() {
    setIsLoading(true)
    setTestResults(null)

    console.log("🧪 Testing DatoCMS Connection...")

    try {
      // Test 1: Check if we can access the API at all
      console.log("📍 Step 1: Testing API accessibility...")

      const response = await fetch("https://site-api.datocms.com/item-types", {
        method: "GET",
        headers: {
          Authorization: "Bearer f60216ad5735b9768c09195f14074f",
          Accept: "application/json",
          "X-Api-Version": "3",
        },
      })

      const responseText = await response.text()
      console.log("📊 Item Types Response:", response.status, responseText)

      let itemTypes = []
      let subscriberModel = null
      let recommendedModel = null

      if (response.ok) {
        try {
          const data = JSON.parse(responseText)
          itemTypes = data.data || []

          // Look for subscriber model
          subscriberModel = itemTypes.find(
            (type: any) =>
              type.id === "subscriber" ||
              type.attributes?.name?.toLowerCase().includes("subscriber") ||
              type.attributes?.api_key === "subscriber",
          )

          // Look for any email-related model
          if (!subscriberModel) {
            recommendedModel = itemTypes.find(
              (type: any) =>
                type.attributes?.name?.toLowerCase().includes("email") ||
                type.attributes?.name?.toLowerCase().includes("newsletter") ||
                type.id.includes("email") ||
                type.id.includes("newsletter"),
            )
          }
        } catch (e) {
          console.error("Could not parse item types response")
        }
      }

      // Test 2: Try to create a subscriber record with the found model
      let createResponse = null
      let createResponseText = ""
      const modelIdToUse = subscriberModel?.id || recommendedModel?.id || "subscriber"

      if (itemTypes.length > 0) {
        console.log("📍 Step 2: Testing subscriber creation with model:", modelIdToUse)

        createResponse = await fetch("https://site-api.datocms.com/items", {
          method: "POST",
          headers: {
            Authorization: "Bearer f60216ad5735b9768c09195f14074f",
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Api-Version": "3",
          },
          body: JSON.stringify({
            data: {
              type: "item",
              attributes: {
                email: "test@example.com",
              },
              relationships: {
                item_type: {
                  data: {
                    type: "item_type",
                    id: modelIdToUse,
                  },
                },
              },
            },
          }),
        })

        createResponseText = await createResponse.text()
        console.log("📊 Create Response:", createResponse.status, createResponseText)
      }

      setTestResults({
        apiAccessible: response.ok,
        apiStatus: response.status,
        itemTypes: itemTypes,
        subscriberModel: subscriberModel,
        recommendedModel: recommendedModel,
        createStatus: createResponse?.status,
        createResponse: createResponseText,
        modelIdUsed: modelIdToUse,
        subscriberModelExists: !!subscriberModel,
        hasEmailModel: !!recommendedModel,
      })
    } catch (error) {
      console.error("❌ Test failed:", error)
      setTestResults({
        error: error.message,
        apiAccessible: false,
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Newsletter Debug Dashboard</h1>
          <p className="text-gray-600 mb-6">Diagnose DatoCMS API issues and find the correct model configuration</p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Current Issue:</strong> Getting 404 NOT_FOUND error when trying to create subscriber records. This
            usually means the "subscriber" model doesn't exist or has a different ID.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              API Connection & Model Detection Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testDatoCMSConnection} disabled={isLoading} className="w-full">
              {isLoading ? "Testing..." : "Run Diagnostic Test"}
            </Button>

            {testResults && (
              <div className="space-y-6">
                {/* API Access Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Badge variant={testResults.apiAccessible ? "default" : "destructive"}>
                      API Access: {testResults.apiAccessible ? "✅ Success" : "❌ Failed"}
                    </Badge>
                  </div>
                  <div>
                    <Badge variant="outline">Status: {testResults.apiStatus || "N/A"}</Badge>
                  </div>
                </div>

                {/* Available Models */}
                {testResults.itemTypes && testResults.itemTypes.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Available Models in Your DatoCMS Project:
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                      <div className="space-y-2">
                        {testResults.itemTypes.map((type: any) => (
                          <div key={type.id} className="flex items-center justify-between p-2 bg-white rounded border">
                            <div>
                              <span className="font-medium">{type.attributes?.name || "Unnamed Model"}</span>
                              <div className="text-xs text-gray-500">
                                ID: {type.id} | API Key: {type.attributes?.api_key || "N/A"}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {type.id === "subscriber" && <Badge variant="default">Exact Match</Badge>}
                              {(type.attributes?.name?.toLowerCase().includes("subscriber") ||
                                type.attributes?.name?.toLowerCase().includes("email") ||
                                type.attributes?.name?.toLowerCase().includes("newsletter")) && (
                                <Badge variant="secondary">Potential Match</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Model Detection Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Subscriber Model Check:</h4>
                    <Badge variant={testResults.subscriberModelExists ? "default" : "destructive"}>
                      {testResults.subscriberModelExists ? "✅ Found" : "❌ Not Found"}
                    </Badge>
                    {testResults.subscriberModel && (
                      <div className="text-sm text-gray-600 mt-1">
                        Found: {testResults.subscriberModel.attributes?.name} (ID: {testResults.subscriberModel.id})
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Alternative Email Model:</h4>
                    <Badge variant={testResults.hasEmailModel ? "default" : "secondary"}>
                      {testResults.hasEmailModel ? "✅ Found Alternative" : "❌ None Found"}
                    </Badge>
                    {testResults.recommendedModel && (
                      <div className="text-sm text-gray-600 mt-1">
                        Found: {testResults.recommendedModel.attributes?.name} (ID: {testResults.recommendedModel.id})
                      </div>
                    )}
                  </div>
                </div>

                {/* Create Test Result */}
                <div>
                  <h3 className="font-semibold mb-2">Create Record Test:</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Status: {testResults.createStatus || "Not Tested"}</Badge>
                    <Badge variant="outline">Model Used: {testResults.modelIdUsed}</Badge>
                  </div>
                  {testResults.createResponse && (
                    <div className="bg-gray-50 p-4 rounded text-sm">
                      <pre className="whitespace-pre-wrap">{testResults.createResponse}</pre>
                    </div>
                  )}
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">📋 Recommendations:</h3>
                  <div className="text-sm text-blue-700 space-y-2">
                    {!testResults.subscriberModelExists && !testResults.hasEmailModel && (
                      <div className="p-3 bg-yellow-100 rounded border-l-4 border-yellow-500">
                        <p className="font-medium text-yellow-800">⚠️ No suitable model found!</p>
                        <p className="text-yellow-700">
                          You need to create a model in DatoCMS for collecting email addresses. Go to your DatoCMS
                          project and create a new model called "Subscriber" with an "email" field.
                        </p>
                      </div>
                    )}

                    {testResults.subscriberModelExists && (
                      <div className="p-3 bg-green-100 rounded border-l-4 border-green-500">
                        <p className="font-medium text-green-800">✅ Perfect! Subscriber model found.</p>
                        <p className="text-green-700">
                          The newsletter form should work with model ID: <code>{testResults.subscriberModel.id}</code>
                        </p>
                      </div>
                    )}

                    {!testResults.subscriberModelExists && testResults.hasEmailModel && (
                      <div className="p-3 bg-blue-100 rounded border-l-4 border-blue-500">
                        <p className="font-medium text-blue-800">💡 Alternative model found.</p>
                        <p className="text-blue-700">
                          The form will try to use: <code>{testResults.recommendedModel.id}</code>(
                          {testResults.recommendedModel.attributes?.name})
                        </p>
                      </div>
                    )}

                    <div className="mt-4">
                      <p className="font-medium">Next Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 mt-2">
                        <li>If no suitable model exists, create one in DatoCMS</li>
                        <li>Make sure the model has an "email" field (type: Single-line string)</li>
                        <li>Ensure your API token has "Create" permissions for the model</li>
                        <li>Test the newsletter form again</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {testResults.error && (
                  <div className="bg-red-50 p-4 rounded">
                    <h3 className="font-semibold text-red-800 mb-2">Error:</h3>
                    <p className="text-red-700">{testResults.error}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Quick Setup Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">If you need to create a Subscriber model:</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Go to your DatoCMS project dashboard</li>
                  <li>Click "Settings" → "Models"</li>
                  <li>Click "Add new model"</li>
                  <li>Set Model name: "Subscriber" and Model ID: "subscriber"</li>
                  <li>Add a field: Name: "Email", Field ID: "email", Type: "Single-line string"</li>
                  <li>Make the email field required</li>
                  <li>Save the model</li>
                  <li>Test the newsletter form again</li>
                </ol>
              </div>

              <div className="p-3 bg-gray-100 rounded">
                <p className="text-sm">
                  <strong>API Token:</strong> f60216ad5735b9768c09195f14074f
                  <br />
                  <strong>Expected Model ID:</strong> subscriber
                  <br />
                  <strong>Required Field:</strong> email (Single-line string)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
