import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, Database, Settings, FileText } from "lucide-react"

export default function DatoCMSSetupPage() {
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

      {/* Setup Guide */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-black mb-2">DatoCMS Setup Guide</h1>
            <p className="text-gray-600">Complete setup instructions for your Acquire & Build website</p>
          </div>

          {/* Step 1: Account Setup */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Step 1: DatoCMS Account Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">1.1 Create DatoCMS Account</h4>
                <p className="text-sm text-gray-600">Sign up for a free DatoCMS account if you haven't already.</p>
                <Button asChild>
                  <a href="https://www.datocms.com/" target="_blank" rel="noopener noreferrer">
                    Sign Up for DatoCMS
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">1.2 Get API Token</h4>
                <p className="text-sm text-gray-600">
                  Go to Settings → API tokens and create a new token with read/write permissions.
                </p>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2">Add this to your environment variables:</p>
                  <code className="text-sm">DATOCMS_API_TOKEN=your_token_here</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Model Creation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Step 2: Create Content Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">2.1 Article Model</h4>
                <p className="text-sm text-gray-600 mb-2">Create a new model called "Article" with these fields:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>title (Single-line string, required)</li>
                  <li>slug (Slug, required, source: title)</li>
                  <li>content (Structured text)</li>
                  <li>excerpt (Multi-line string)</li>
                  <li>feature_image (Asset, images only)</li>
                  <li>published_at (Date and time)</li>
                  <li>category (Single link to Category)</li>
                  <li>author (Single link to Author)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.2 Category Model</h4>
                <p className="text-sm text-gray-600 mb-2">Create a "Category" model with:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>name (Single-line string, required)</li>
                  <li>slug (Slug, source: name)</li>
                  <li>description (Multi-line string)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.3 Author Model</h4>
                <p className="text-sm text-gray-600 mb-2">Create an "Author" model with:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>name (Single-line string, required)</li>
                  <li>bio (Multi-line string)</li>
                  <li>avatar (Asset, images only)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.4 Homepage Model (Singleton)</h4>
                <p className="text-sm text-gray-600 mb-2">Create a singleton "Homepage" model with:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>hero_title (Single-line string)</li>
                  <li>hero_subtitle (Multi-line string)</li>
                  <li>hero_image (Asset, images only)</li>
                  <li>value_propositions (JSON)</li>
                  <li>features (JSON)</li>
                  <li>testimonials (JSON)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2.5 Subscriber Model</h4>
                <p className="text-sm text-gray-600 mb-2">Create a "Subscriber" model with:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>email (Single-line string, required, unique)</li>
                  <li>name (Single-line string)</li>
                  <li>subscribed_at (Date and time, required)</li>
                  <li>status (Single-line string, enum: active, unsubscribed, bounced)</li>
                  <li>source (Single-line string, enum: homepage, blog, deal_kit, contact)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Content Creation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Step 3: Create Sample Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">3.1 Create Categories</h4>
                <p className="text-sm text-gray-600">Create a few categories like:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Business Acquisition</li>
                  <li>SBA Loans</li>
                  <li>Due Diligence</li>
                  <li>Case Studies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3.2 Create Author Profile</h4>
                <p className="text-sm text-gray-600">Create at least one author profile for your blog posts.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3.3 Configure Homepage</h4>
                <p className="text-sm text-gray-600">
                  Fill in the homepage singleton with your hero content and value propositions.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3.4 Create Sample Articles</h4>
                <p className="text-sm text-gray-600">Create a few sample blog posts to test the integration.</p>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Testing */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Step 4: Test Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild>
                  <Link href="/debug-datocms">Test DatoCMS Connection</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/debug-homepage">Test Homepage Data</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/blog">View Blog Page</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/subscribers">Test Subscriber Form</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button asChild>
                  <a href="https://acquireandbuild.datocms.com" target="_blank" rel="noopener noreferrer">
                    DatoCMS Dashboard
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.datocms.com/docs" target="_blank" rel="noopener noreferrer">
                    DatoCMS Documentation
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
