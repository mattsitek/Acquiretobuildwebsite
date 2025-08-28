import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterForm } from "@/components/newsletter-form"
import { Mail, Users, TrendingUp, Clock, CheckCircle, Star } from "lucide-react"
import Navigation from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Newsletter - Weekly Business Acquisition Insights | Acquire & Build",
  description:
    "Join 1,000+ professionals getting weekly insights on business acquisition, financing, and deal-making. Scripts, deals, lessons & real-world tactics.",
  keywords: [
    "business acquisition newsletter",
    "business buyer newsletter",
    "acquisition insights",
    "business acquisition community",
    "SBA loan newsletter",
    "business financing newsletter",
    "deal flow newsletter",
    "business acquisition tips",
  ],
  openGraph: {
    title: "Newsletter - Weekly Business Acquisition Insights",
    description:
      "Join 1,000+ professionals getting weekly insights on business acquisition, financing, and deal-making.",
    type: "website",
    url: "https://acquireandbuild.com/newsletter",
  },
  alternates: {
    canonical: "https://acquireandbuild.com/newsletter",
  },
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
              📧 FREE WEEKLY NEWSLETTER
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Weekly Insights for <span className="text-blue-600">Business Buyers</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Scripts, deals, lessons & real-world tactics — straight to your inbox every Friday.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mb-12">
            <NewsletterForm />
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>1,000+ subscribers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Weekly delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>No spam</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You'll Get Every Week</h2>
            <p className="text-lg text-gray-600">Real insights from real deals, not theoretical fluff</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Deal Breakdowns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Real acquisition case studies with numbers, financing structures, and lessons learned.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Scripts & Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Proven email templates, LOI scripts, and negotiation frameworks that actually work.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Expert Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lessons from successful acquirers, brokers, and operators who've done the work.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Financing Hacks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Creative financing strategies, SBA loan tips, and seller financing structures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Market Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  What's happening in the small business acquisition market and how it affects you.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Quick Wins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Actionable tactics you can implement immediately to move your search forward.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Newsletter Topics</h2>
            <p className="text-lg text-gray-600">Here's what subscribers have been reading lately</p>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-blue-600">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  "How I Bought a $2M HVAC Business with 15% Down"
                </h3>
                <p className="text-gray-600 mb-3">
                  Complete breakdown of financing structure, seller negotiation, and first 90 days of ownership.
                </p>
                <Badge variant="secondary" className="text-xs">
                  DEAL BREAKDOWN
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  "The 5-Email Sequence That Gets Sellers to Respond"
                </h3>
                <p className="text-gray-600 mb-3">
                  Exact templates and timing for cold outreach that actually works in today's market.
                </p>
                <Badge variant="secondary" className="text-xs">
                  SCRIPTS & TEMPLATES
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  "SBA Loan Changes: What Buyers Need to Know"
                </h3>
                <p className="text-gray-600 mb-3">
                  Recent policy updates and how they affect your financing options and timeline.
                </p>
                <Badge variant="secondary" className="text-xs">
                  MARKET UPDATE
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join 1,000+ Business Buyers?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get weekly insights delivered every Friday. No spam, unsubscribe anytime.
          </p>

          <div className="max-w-md mx-auto">
            <NewsletterForm
              variant="footer"
              buttonText="SUBSCRIBE NOW – IT'S FREE"
              placeholder="Enter your email address"
            />
          </div>

          <p className="text-gray-400 mt-6 text-sm">New issues drop every Friday. No fluff. Just the good stuff.</p>
        </div>
      </section>
    </div>
  )
}
