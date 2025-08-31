"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import {
  Download,
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  Shield,
  Phone,
  ClipboardList,
  Star,
  X,
  ArrowRight,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { submitDealKitForm } from "@/app/actions/deal-kit"

// Icon mapping for dynamic icons
const iconMap: { [key: string]: any } = {
  FileText,
  Shield,
  Phone,
  Mail,
  ClipboardList,
  Download,
  CheckCircle,
  Briefcase,
}

interface DealKitPageClientProps {
  pageContent: any
  tools: any[]
  testimonials: any[]
  comingSoonTools: any[]
}

export default function DealKitPageClient({
  pageContent,
  tools,
  testimonials,
  comingSoonTools,
}: DealKitPageClientProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Fallback content if DatoCMS is not available
  const fallbackContent = {
    heroBadgeText: "Tools Built for Business Buyers",
    heroTitleLine1: "Skip the guesswork.",
    heroTitleLine2: "Grab the Deal Kit.",
    heroSubtitle:
      "Get the same LOI, MNDA, and cold outreach scripts top acquirers use to find, analyze, and buy businesses — all for free.",
    emailPlaceholder: "Enter your email address",
    ctaButtonText: "Send Me the Deal Kit",
    formDisclaimer: "100% free. No spam. Instant delivery to your inbox.",
    whatsInsideTitle: "WHAT'S INSIDE THE DEAL KIT",
    whatsInsideSubtitle:
      "These aren't templates. They're traction. Tools built by real buyers who've closed real deals.",
    socialProofTitle: "WHAT BUYERS ARE SAYING",
    comingSoonTitle: "COMING SOON TO THE DEAL KIT",
    comingSoonSubtitle:
      "We're constantly adding new tools. Get the Deal Kit now and receive all future updates automatically.",
    successMessage:
      "🎉 Success! Check your email for The Deal Kit. It should arrive within 2 minutes. (Don't forget to check your spam folder!)",
  }

  const content = pageContent || fallbackContent

  // Fallback tools if DatoCMS is not available
  const fallbackTools = [
    {
      toolName: "LOI Template",
      toolDescription: "Professional Letter of Intent template used in $1M+ deals",
      toolIcon: "FileText",
    },
    {
      toolName: "MNDA Template",
      toolDescription: "Mutual Non-Disclosure Agreement that protects both parties",
      toolIcon: "Shield",
    },
    {
      toolName: "Cold Call Scripts",
      toolDescription: "Proven phone scripts that get business owners talking",
      toolIcon: "Phone",
    },
    {
      toolName: "Email Outreach Templates",
      toolDescription: "High-response email templates for seller outreach",
      toolIcon: "Mail",
    },
    {
      toolName: "Due Diligence Starter Checklist",
      toolDescription: "Essential items to verify before you buy",
      toolIcon: "ClipboardList",
    },
  ]

  const displayTools = tools.length > 0 ? tools : fallbackTools

  // Fallback testimonials
  const fallbackTestimonials = [
    {
      testimonialText:
        "The LOI template alone saved me $5K in legal fees. These are the exact documents I used to close my first acquisition.",
      authorName: "Sarah M.",
      authorTitle: "Manufacturing Business Owner",
      starRating: 5,
    },
    {
      testimonialText:
        "The cold call scripts actually work. I got 3 seller meetings in my first week using these exact words.",
      authorName: "Mike R.",
      authorTitle: "Search Fund Entrepreneur",
      starRating: 5,
    },
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials

  // Fallback coming soon tools
  const fallbackComingSoon = [
    { toolName: "Valuation Starter Calculator" },
    { toolName: "Earnout Model Templates" },
    { toolName: "Seller Psychology Guide" },
    { toolName: "Broker Email Templates" },
    { toolName: "SBA Loan Application Checklist" },
    { toolName: "Asset Purchase Agreement Template" },
  ]

  const displayComingSoon = comingSoonTools.length > 0 ? comingSoonTools : fallbackComingSoon

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  // Exit intent detection
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasSubmitted && !showExitPopup) {
        timeoutId = setTimeout(() => {
          setShowExitPopup(true)
        }, 100)
      }
    }

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [hasSubmitted, showExitPopup])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    try {
      const result = await submitDealKitForm(formData)

      if (result.success) {
        setMessage({ type: "success", text: result.message })
        setHasSubmitted(true)

        // Reset form
        const form = document.getElementById("deal-kit-form") as HTMLFormElement
        form?.reset()

        // Scroll to success message
        setTimeout(() => {
          document.getElementById("success-message")?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      console.error("Deal Kit form submission error:", error)
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      })
    }

    setIsLoading(false)
  }

  async function handleExitPopupSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await submitDealKitForm(formData)

      if (result.success) {
        setShowExitPopup(false)
        setHasSubmitted(true)
        setMessage({ type: "success", text: result.message })

        // Scroll to success message
        setTimeout(() => {
          document.getElementById("success-message")?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      console.error("Exit popup form submission error:", error)
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "The Deal Kit - Business Acquisition Tools",
            description: "Free professional business acquisition tools including LOI templates, NDAs, and scripts",
            url: "https://acquireandbuild.com/deal-kit",
            mainEntity: {
              "@type": "Product",
              name: "The Deal Kit",
              description: "Professional business acquisition tools and templates",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
          }),
        }}
      />

     {/* Navigation - NEW: Replace the old inline nav */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <Badge className="bg-[#1A73E8] text-white px-4 py-2 text-sm font-semibold">
              <Briefcase className="h-4 w-4 mr-2" />
              {content.heroBadgeText}
            </Badge>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-black text-black leading-tight">
                {content.heroTitleLine1}
                <br />
                <span className="text-[#1A73E8]">{content.heroTitleLine2}</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                {content.heroSubtitle}
              </p>
            </div>

            {/* CTA Form */}
            <div className="max-w-md mx-auto">
              <form id="deal-kit-form" action={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <Input
                    type="email"
                    name="email"
                    placeholder={content.emailPlaceholder}
                    required
                    disabled={isLoading}
                    className="h-14 text-lg border-2 border-gray-200 focus:border-[#1A73E8] rounded-lg"
                  />

                  <select
                    name="buyerType"
                    className="w-full h-14 text-lg border-2 border-gray-200 focus:border-[#1A73E8] rounded-lg bg-white px-4"
                  >
                    <option value="">What type of business are you targeting? (optional)</option>
                    <option value="services">Service-based businesses</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="retail">Retail/E-commerce</option>
                    <option value="saas">SaaS/Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="construction">Construction/Trades</option>
                    <option value="food">Food & Beverage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-[#1A73E8] hover:bg-[#0F56C3] text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Your Deal Kit...
                    </>
                  ) : (
                    <>
                      {content.ctaButtonText}
                      <Download className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-sm text-gray-600 mt-4">{content.formDisclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success/Error Message */}
      {message && (
        <section id="success-message" className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div
                className={`p-6 rounded-lg flex items-start space-x-3 ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                )}
                <div className="font-medium">{message.text}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What's Inside Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-black text-black mb-6">{content.whatsInsideTitle}</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">{content.whatsInsideSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayTools.map((tool: any, index: number) => {
                const IconComponent = iconMap[tool.toolIcon] || FileText
                return (
                  <Card
                    key={index}
                    className="border-2 border-gray-100 hover:border-[#1A73E8] transition-all duration-200 hover:shadow-lg"
                  >
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-black">{tool.toolName}</h3>
                      <p className="text-gray-700 leading-relaxed">{tool.toolDescription}</p>
                      <Badge variant="outline" className="border-green-500 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Included
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 lg:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-black text-black mb-6">{content.socialProofTitle}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {displayTestimonials.map((testimonial: any, index: number) => (
                <Card key={index} className="border-2 border-gray-100 bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.starRating || 5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.testimonialText}"</p>
                    <div className="font-semibold text-black">
                      — {testimonial.authorName}
                      {testimonial.authorTitle && `, ${testimonial.authorTitle}`}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Score Your Deal Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                
                {/* Headline */}
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
                  SCORE YOUR DEAL
                </h2>
                
                {/* Value Proposition */}
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Get a comprehensive deal score in under 5 minutes. Our proven framework analyzes 12 key factors to tell you if your deal will make money or lose money.
                </p>
                
                {/* Benefits List */}
                <div className="grid md:grid-cols-3 gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">5-Minute Assessment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Instant Deal Score</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Actionable Insights</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="pt-6">
                  <Link 
                    href="/deal-scorecard" 
                    className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <TrendingUp className="h-6 w-6" />
                    SCORE MY DEAL NOW
                  </Link>
                </div>
                
                {/* Social Proof */}
                <p className="text-gray-600 text-sm pt-2">
                  Join 1,000+ investors who've used our scorecard to avoid bad deals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Coming Soon Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-black text-black mb-6">{content.comingSoonTitle}</h2>
              <p className="text-xl text-gray-700">{content.comingSoonSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayComingSoon.map((tool: any, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-[#1A73E8] rounded-full"></div>
                  <span className="text-gray-700 font-medium">{tool.toolName}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">🚀 New tools added monthly</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-black text-white">READY TO GET YOUR DEAL KIT?</h2>

            <p className="text-xl lg:text-2xl text-gray-300">
              Join 2,500+ business buyers who've downloaded the Deal Kit.
            </p>

            <div className="space-y-6">
              <Button
                onClick={() => document.getElementById("deal-kit-form")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#1A73E8] hover:bg-[#0F56C3] text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get the Deal Kit Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-gray-400">100% free. Instant download. No credit card required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Button (Mobile) */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <Button
          onClick={() => document.getElementById("deal-kit-form")?.scrollIntoView({ behavior: "smooth" })}
          className="w-full bg-[#1A73E8] hover:bg-[#0F56C3] text-white font-bold text-lg py-4 rounded-lg shadow-lg"
        >
          Get the Deal Kit
          <Download className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-white">
            <CardContent className="p-8 text-center space-y-6">
              <div className="flex justify-between items-start">
                <div className="text-4xl">👋</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExitPopup(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black">Leaving without your Deal Kit?</h3>
                <p className="text-gray-700">It's 100% free and can save you $10K+ on your next acquisition.</p>
              </div>

              <form action={handleExitPopupSubmit} className="space-y-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-[#1A73E8]"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1A73E8] hover:bg-[#0F56C3] text-white font-bold py-3"
                >
                  {isLoading ? "Sending..." : "Send It to My Inbox"}
                </Button>
              </form>

              <p className="text-xs text-gray-500">No spam. Just the tools you need to buy your first business.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Acquire & Build</h3>
            <p className="text-gray-400">The newsletter and community for business acquisition.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/privacy" className="hover:text-[#1A73E8] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#1A73E8] transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-[#1A73E8] transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Acquire & Build. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
