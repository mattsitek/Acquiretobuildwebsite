import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, TrendingUp, BookOpen } from "lucide-react"
import Navigation from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  The Newsletter for <span className="text-blue-600">Business Acquisition</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Real stories, tactical insights, and actionable advice for buying and building businesses. Join
                  thousands of entrepreneurs on their acquisition journey.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-3">
                  <Link href="/newsletter">
                    Subscribe Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  <Link href="/am-i-ready">Take Assessment</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>5,000+ subscribers</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Weekly insights</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Free resources</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.jpg"
                alt="Business acquisition success story"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need to Acquire & Build</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From readiness assessment to deal analysis, we provide the tools and insights you need for successful
              business acquisition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Readiness Assessment</h3>
                <p className="text-gray-600">
                  Evaluate your readiness for business acquisition with our comprehensive assessment tool.
                </p>
                <Button asChild variant="outline" className="mt-4 bg-transparent">
                  <Link href="/am-i-ready">Take Assessment</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Deal Analysis Kit</h3>
                <p className="text-gray-600">
                  Get access to our comprehensive deal analysis tools and templates for evaluating opportunities.
                </p>
                <Button asChild variant="outline" className="mt-4 bg-transparent">
                  <Link href="/deal-kit">Get Deal Kit</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Weekly Newsletter</h3>
                <p className="text-gray-600">
                  Stay updated with the latest insights, case studies, and opportunities in business acquisition.
                </p>
                <Button asChild variant="outline" className="mt-4 bg-transparent">
                  <Link href="/newsletter">Subscribe</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Start Your Acquisition Journey?</h2>
          <p className="text-xl text-blue-100">
            Join thousands of entrepreneurs who are building wealth through business acquisition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Link href="/newsletter">
                Subscribe to Newsletter <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/am-i-ready">Take Readiness Test</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/apple-touch-icon.png"
                  alt="Acquire & Build"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <span className="font-bold text-xl">Acquire & Build</span>
              </div>
              <p className="text-gray-400">The newsletter and community for business acquisition.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/am-i-ready" className="hover:text-white">
                    Am I Ready?
                  </Link>
                </li>
                <li>
                  <Link href="/deal-kit" className="hover:text-white">
                    Deal Kit
                  </Link>
                </li>
                <li>
                  <Link href="/newsletter" className="hover:text-white">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <p className="text-gray-400">
                Join our community of entrepreneurs building wealth through business acquisition.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Acquire & Build. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
