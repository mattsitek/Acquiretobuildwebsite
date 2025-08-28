import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Clock, ExternalLink } from "lucide-react"

export default function ContactsPage() {
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
              <Link href="/contact" className="text-[#1A73E8] font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-black mb-2">Contact Information</h1>
            <p className="text-gray-600">Get in touch with the Acquire & Build team</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">For general inquiries and support</p>
                  <a href="mailto:hello@acquireandbuild.com" className="text-[#1A73E8] hover:underline font-medium">
                    hello@acquireandbuild.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">We typically respond within 24-48 hours during business days.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Remote team serving entrepreneurs worldwide</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/contact">Send Message</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/newsletter">Subscribe to Newsletter</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/deal-kit">Download Deal Kit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/blog" className="block text-[#1A73E8] hover:underline">
                    Business Acquisition Blog
                  </Link>
                  <Link href="/deal-kit" className="block text-[#1A73E8] hover:underline">
                    Free Deal Kit Download
                  </Link>
                  <Link href="/newsletter" className="block text-[#1A73E8] hover:underline">
                    Weekly Newsletter
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Admin Links */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Admin & Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" asChild>
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/subscribers">View Subscribers</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://acquireandbuild.datocms.com" target="_blank" rel="noopener noreferrer">
                    DatoCMS Dashboard
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
