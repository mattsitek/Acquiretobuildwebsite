import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterForm } from "@/components/newsletter-form"
import { Search, AlertTriangle, Users, Clock, Brain, MessageCircle, CheckCircle, Briefcase } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getHomepageContent } from "@/lib/datocms"
import type { Metadata } from "next"
import DealScorecard from "./deal-scorecard/page"
import Navigation from "@/components/navigation"

export const metadata: Metadata = {
  title: "Acquire & Build - Buy a Business, Build Your Freedom",
  description:
    "Join Acquire and Build — the free newsletter + community for people ready to stop climbing the ladder and start owning the whole damn thing. Learn how to buy a business, get financing, and build your freedom.",
  keywords: [
    "buy a business",
    "business acquisition",
    "small business acquisition",
    "SBA loans",
    "business financing",
    "entrepreneurship",
    "business ownership",
    "business buyer newsletter",
    "acquisition community",
  ],
  openGraph: {
    title: "Acquire & Build - Buy a Business, Build Your Freedom",
    description:
      "Join the free newsletter + community for business acquisition. Learn how to buy a business and build your freedom.",
    type: "website",
    url: "https://acquireandbuild.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Acquire & Build - Business Acquisition Newsletter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acquire & Build - Buy a Business, Build Your Freedom",
    description:
      "Join the free newsletter + community for business acquisition. Learn how to buy a business and build your freedom.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://acquireandbuild.com",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function HomePage() {
  // Get homepage content from DatoCMS with error handling
  let homepageData = null

  try {
    homepageData = await getHomepageContent()
  } catch (error) {
    console.error("Error loading DatoCMS data:", error)
    // Continue with fallback content
  }

  // Debug log in development
  if (process.env.NODE_ENV === "development") {
    console.log("Homepage data from DatoCMS:", homepageData)
  }

  return (
    <main role="main">
      {/* Enhanced Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://acquireandbuild.com/#webpage",
            url: "https://acquireandbuild.com",
            name: "Acquire & Build - Buy a Business, Build Your Freedom",
            description:
              "Learn how to buy a business and build your freedom. Newsletter and community for business acquisition.",
            isPartOf: {
              "@id": "https://acquireandbuild.com/#website",
            },
            about: {
              "@id": "https://acquireandbuild.com/#organization",
            },
            mainEntity: {
              "@type": "Service",
              "@id": "https://acquireandbuild.com/#service",
              name: "Business Acquisition Education",
              description: "Newsletter and community teaching people how to buy existing businesses",
              provider: {
                "@id": "https://acquireandbuild.com/#organization",
              },
              areaServed: {
                "@type": "Country",
                name: "United States",
              },
              audience: {
                "@type": "Audience",
                audienceType: "Business Professionals, Entrepreneurs, Aspiring Business Owners",
              },
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://acquireandbuild.com",
                },
              ],
            },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "h2", ".hero-subtitle"],
            },
          }),
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I buy a business with little money down?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can buy a business with as little as 10% down using SBA loans, seller financing, and creative capital structures. Our newsletter teaches proven strategies for acquiring businesses without massive upfront capital.",
                },
              },
              {
                "@type": "Question",
                name: "What is business acquisition financing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Business acquisition financing includes SBA loans, seller notes, bank financing, and creative capital structures that allow you to purchase existing businesses. We cover all these strategies in our free newsletter.",
                },
              },
              {
                "@type": "Question",
                name: "How do I value a business before buying?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Business valuation involves analyzing financial statements, cash flow, market comparables, and growth potential. Our Deal Kit includes templates and checklists for proper due diligence and valuation.",
                },
              },
            ],
          }),
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Debug Info in Development */}
      {process.env.NODE_ENV === "development" && (
        <div className="bg-blue-50 p-4">
          <div className="container mx-auto px-4">
            <div className="text-sm text-blue-800">
              <p>DatoCMS Homepage Status: {homepageData ? "✅ Connected" : "❌ Using Fallback Content"}</p>
              <p>API Token Status: {process.env.DATOCMS_API_TOKEN ? "✅ Configured" : "❌ Missing"}</p>
              {homepageData && <p>Hero Image: {homepageData.heroImage?.url ? "✅ Available" : "❌ Missing"}</p>}
              {homepageData && (
                <p>Right Place Fields: {homepageData.rightPlaceTitle ? "✅ Available" : "❌ Not Added Yet"}</p>
              )}
              <Link href="/debug-homepage" className="underline text-blue-600">
                → View Homepage Debug Page
              </Link>
              <Link href="/datocms-setup" className="underline text-blue-600 ml-4">
                → DatoCMS Setup Guide
              </Link>
              <Link href="/debug-newsletter" className="underline text-blue-600 ml-4">
                → Newsletter Debug Page
              </Link>
              {!process.env.DATOCMS_API_TOKEN && (
                <div className="mt-2 p-2 bg-red-100 rounded text-red-800">
                  <p className="font-semibold">⚠️ DatoCMS API Token Missing</p>
                  <p className="text-xs">Add DATOCMS_API_TOKEN to your environment variables</p>
                </div>
              )}
              {!homepageData?.rightPlaceTitle && process.env.DATOCMS_API_TOKEN && (
                <div className="mt-2 p-2 bg-yellow-100 rounded text-yellow-800">
                  <p className="font-semibold">Next Step: Add Right Place fields to DatoCMS</p>
                  <p className="text-xs">The section will use fallback content until you add the fields</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Matches Original Design */}
      <section className="relative overflow-hidden bg-white" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 id="hero-heading" className="text-4xl lg:text-6xl font-black text-black leading-tight">
                  {homepageData?.heroTitle ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: homepageData.heroTitle.replace(
                          "BUILD YOUR FREEDOM.",
                          '<span class="text-[#1A73E8]">BUILD YOUR FREEDOM.</span>',
                        ),
                      }}
                    />
                  ) : (
                    <>
                      BUY A BUSINESS.
                      <br />
                      <span className="text-[#1A73E8]">BUILD YOUR FREEDOM.</span>
                    </>
                  )}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed hero-subtitle">
                  {homepageData?.heroSubtitle ||
                    "Join Acquire and Build — the free newsletter + community for people ready to stop climbing the ladder and start owning the whole damn thing."}
                </p>
              </div>

              <NewsletterForm variant="hero" buttonText={homepageData?.heroButtonText || "GET FREE WEEKLY INSIGHTS"} />

              <p className="text-sm text-gray-600">
                Scripts, deals, lessons & real-world tactics — straight to your inbox.
              </p>
            </div>

            <div className="relative">
              <Image
                src={homepageData?.heroImage?.url || "/placeholder.svg?height=600&width=500"}
                alt={
                  homepageData?.heroImageAltText ||
                  homepageData?.heroImage?.alt ||
                  "Confident small business owner in industrial setting representing business acquisition success"
                }
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DEAL SCORECARD SECTION - Hide navigation when embedded */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="scorecard-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <DealScorecard showNavigation={false} />
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 lg:py-24 bg-[#F9F9F9]" aria-labelledby="value-prop-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="value-prop-heading" className="text-3xl lg:text-5xl font-black text-black mb-6">
              BECAUSE BUILDING FROM SCRATCH IS OVERRATED.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto"
                aria-hidden="true"
              >
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">Find Real Businesses</h3>
              <p className="text-gray-700">Find real small businesses to buy (even off-market)</p>
            </div>

            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto"
                aria-hidden="true"
              >
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">Avoid Rookie Mistakes</h3>
              <p className="text-gray-700">Avoid rookie mistakes that cost time and money</p>
            </div>

            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto"
                aria-hidden="true"
              >
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">Learn from Experts</h3>
              <p className="text-gray-700">Learn from dealmakers, operators & solo searchers doing the work</p>
            </div>

            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto"
                aria-hidden="true"
              >
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">Buy Back Your Time</h3>
              <p className="text-gray-700">Build a business that buys back your time — not one that owns you</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="what-youll-get-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="what-youll-get-heading" className="text-3xl lg:text-5xl font-black text-black mb-6">
              WHAT YOU'LL GET
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Tactical Insights - Links to Newsletter */}
            <Link href="/newsletter" className="group" aria-label="Learn about tactical insights">
              <Card className="border-2 border-gray-100 hover:border-[#1A73E8] transition-colors duration-200 h-full cursor-pointer">
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">Tactical Insights</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Deal breakdowns, financing hacks, and playbooks from real acquisitions
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Deal Kit - Links to Deal Kit page */}
            <Link href="/deal-kit" className="group" aria-label="Access the Deal Kit">
              <Card className="border-2 border-gray-100 hover:border-[#1A73E8] transition-colors duration-200 h-full cursor-pointer">
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">Deal Kit</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Professional templates, scripts, and tools to find, evaluate, and close your first acquisition
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Community Support */}
            <Card className="border-2 border-gray-100 hover:border-[#1A73E8] transition-colors duration-200">
              <CardContent className="p-8 text-center space-y-4">
                <div
                  className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto"
                  aria-hidden="true"
                >
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">Community Support</h3>
                <p className="text-gray-700 leading-relaxed">
                  Feedback, live Q&As, and behind-the-scenes stories from other buyers
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="bg-[#1A73E8] text-white text-lg px-6 py-2 rounded-full">
              🔥 COMING SOON: Off-Market Deal Flow
            </Badge>
            <p className="text-gray-700 mt-4">Leads and seller intros shared by vetted members</p>
          </div>
        </div>
      </section>

      {/* Who It's For Section - Updated to use DatoCMS */}
      <section className="py-16 lg:py-24 bg-[#F9F9F9]" aria-labelledby="right-place-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="right-place-heading" className="text-3xl lg:text-5xl font-black text-black text-center mb-16">
              {homepageData?.rightPlaceTitle || "YOU'RE IN THE RIGHT PLACE IF..."}
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-8 w-8 text-[#1A73E8] flex-shrink-0 mt-1" aria-hidden="true" />
                  <p className="text-xl text-gray-800">
                    {homepageData?.rightPlaceBulletOne || "You're tired of building someone else's dream"}
                  </p>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-8 w-8 text-[#1A73E8] flex-shrink-0 mt-1" aria-hidden="true" />
                  <p className="text-xl text-gray-800">
                    {homepageData?.rightPlaceBulletTwo || "You want a cash-flowing business, not a high-growth fantasy"}
                  </p>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-8 w-8 text-[#1A73E8] flex-shrink-0 mt-1" aria-hidden="true" />
                  <p className="text-xl text-gray-800">
                    {homepageData?.rightPlaceBulletThree || "You value time, family, freedom — and doing the work"}
                  </p>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={homepageData?.rightPlaceImage?.url || "/placeholder.svg?height=400&width=400"}
                  alt={
                    homepageData?.rightPlaceImageAlt ||
                    homepageData?.rightPlaceImage?.alt ||
                    "Professional working on business acquisition planning and strategy"
                  }
                  width={400}
                  height={400}
                  className="rounded-lg shadow-xl"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main CTA Section - Matches Original Black Background Design */}
      <section className="py-16 lg:py-24 bg-black" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 id="cta-heading" className="text-3xl lg:text-5xl font-black text-white">
              READY TO BUY YOUR FREEDOM?
            </h2>

            <p className="text-xl lg:text-2xl text-gray-300">
              Join 1,000+ acquisition-minded operators taking action every week.
            </p>

            <div className="space-y-6">
              <NewsletterForm
                variant="footer"
                buttonText="SUBSCRIBE NOW – IT'S FREE"
                placeholder="Enter your email address"
              />

              <p className="text-gray-400">New issues drop every Friday. No fluff. Just the good stuff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-16 bg-white border-t border-gray-200" aria-labelledby="learn-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 id="learn-heading" className="text-2xl font-bold text-black mb-8 text-center">
              Learn how to buy a business without breaking the bank
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article>
                <h3 className="text-lg font-semibold text-black mb-3">
                  Business acquisition financing: SBA, seller notes, creative capital
                </h3>
                <p className="text-gray-600 text-sm">
                  Discover funding strategies that don't require massive upfront capital.
                </p>
              </article>

              <article>
                <h3 className="text-lg font-semibold text-black mb-3">How to value a business the smart way</h3>
                <p className="text-gray-600 text-sm">Learn valuation methods that protect you from overpaying.</p>
              </article>

              <article>
                <h3 className="text-lg font-semibold text-black mb-3">
                  Due diligence checklists for first-time buyers
                </h3>
                <p className="text-gray-600 text-sm">Essential steps to verify what you're really buying.</p>
              </article>

              <article>
                <h3 className="text-lg font-semibold text-black mb-3">
                  Real case studies from HVAC, services, and manufacturing
                </h3>
                <p className="text-gray-600 text-sm">See how others successfully acquired and grew their businesses.</p>
              </article>

              <article>
                <h3 className="text-lg font-semibold text-black mb-3">
                  Buy a business with as little as 10% down — here's how
                </h3>
                <p className="text-gray-600 text-sm">
                  Creative financing structures that minimize your cash investment.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Acquire & Build</h3>
            <p className="text-gray-400">The newsletter and community for business acquisition.</p>
            <nav className="flex justify-center space-x-6 text-sm" aria-label="Footer navigation">
              <Link href="/privacy" className="hover:text-[#1A73E8] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#1A73E8] transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-[#1A73E8] transition-colors">
                Contact
              </Link>
            </nav>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Acquire & Build. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
