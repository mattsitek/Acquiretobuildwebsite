import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, FileText, Database, Users, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Deal Kit Setup Guide - DatoCMS Configuration",
  description: "Step-by-step guide to set up your Deal Kit page in DatoCMS",
}

export default function DealKitSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-[#1A73E8] text-white mb-4">SETUP GUIDE</Badge>
            <h1 className="text-4xl font-black text-black mb-4">Deal Kit DatoCMS Setup</h1>
            <p className="text-xl text-gray-600">
              Complete guide to configure your Deal Kit page with DatoCMS content management
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {/* Step 1: Import Schema */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#1A73E8] text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <span>Import the DatoCMS Schema</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Import the complete schema to create all necessary models for your Deal Kit page.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Database className="h-4 w-4 mr-2" />
                    Models Created:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>
                      • <strong>Deal Kit Page</strong> - Main page content and copy
                    </li>
                    <li>
                      • <strong>Deal Kit Tool</strong> - Individual tools with file uploads
                    </li>
                    <li>
                      • <strong>Deal Kit Testimonial</strong> - Customer testimonials
                    </li>
                    <li>
                      • <strong>Coming Soon Tool</strong> - Future tools list
                    </li>
                    <li>
                      • <strong>Deal Kit Subscriber</strong> - Lead capture and analytics
                    </li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <Button asChild>
                    <Link href="/deal-kit-page-schema.json" target="_blank">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Schema JSON
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href="https://www.datocms.com/docs/content-management-api/resources/item-type/create"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      DatoCMS Import Guide
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Add Sample Data */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#1A73E8] text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <span>Add Sample Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Populate your models with the default content to match the current page design.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-2 text-blue-800">Content Includes:</h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Hero section copy and CTAs</li>
                    <li>• 5 main Deal Kit tools</li>
                    <li>• 2 customer testimonials</li>
                    <li>• 6 coming soon tools</li>
                    <li>• All section titles and descriptions</li>
                  </ul>
                </div>

                <Button asChild>
                  <Link href="/deal-kit-sample-data.json" target="_blank">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Sample Data
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Step 3: Upload Files */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#1A73E8] text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <span>Upload Deal Kit Files</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Upload your actual Deal Kit files (PDFs, templates, etc.) to each tool record.
                </p>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold mb-2 text-yellow-800">Recommended Files:</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>
                      • <strong>LOI Template:</strong> PDF or DOCX format
                    </li>
                    <li>
                      • <strong>MNDA Template:</strong> PDF or DOCX format
                    </li>
                    <li>
                      • <strong>Cold Call Scripts:</strong> PDF with scripts
                    </li>
                    <li>
                      • <strong>Email Templates:</strong> PDF or DOCX with templates
                    </li>
                    <li>
                      • <strong>Due Diligence Checklist:</strong> PDF or Excel format
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Pro Tip:</strong> Files uploaded to DatoCMS will be automatically served via CDN and can be
                    downloaded directly by users.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Configure API */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#1A73E8] text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <span>Enable Mutations & API Access</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">Enable mutations in DatoCMS to allow form submissions and lead capture.</p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Enable Content Management API</p>
                      <p className="text-sm text-gray-600">Go to Settings → API tokens → Enable mutations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Set Environment Variable</p>
                      <p className="text-sm text-gray-600">Add DATOCMS_API_TOKEN to your environment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Test Connection</p>
                      <p className="text-sm text-gray-600">Visit the debug page to verify setup</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button asChild>
                    <Link href="/debug-datocms">
                      <Settings className="h-4 w-4 mr-2" />
                      Test DatoCMS Connection
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://www.datocms.com/docs/content-management-api" target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      API Documentation
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 5: Analytics */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#1A73E8] text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <span>Monitor Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Track your Deal Kit performance with built-in analytics and lead management.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Lead Analytics</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Total signups</li>
                      <li>• Buyer type breakdown</li>
                      <li>• Source tracking</li>
                      <li>• Monthly trends</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Content Management</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Update copy instantly</li>
                      <li>• Add new tools</li>
                      <li>• Manage testimonials</li>
                      <li>• Track downloads</li>
                    </ul>
                  </div>
                </div>

                <Button asChild>
                  <Link href="/deal-kit-analytics">
                    <Users className="h-4 w-4 mr-2" />
                    View Analytics Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 p-8 bg-white rounded-lg border-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Ready to Launch?</h3>
            <p className="text-gray-600 mb-6">
              Once you've completed these steps, your Deal Kit page will be fully powered by DatoCMS with dynamic
              content management and lead capture.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link href="/deal-kit">View Deal Kit Page</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/deal-kit-analytics">Check Analytics</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
