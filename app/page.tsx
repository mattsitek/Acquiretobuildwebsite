import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterForm } from "@/components/newsletter-form"
import { Search, AlertTriangle, Users, Clock, Brain, MessageCircle, CheckCircle, Briefcase, Star, Map, UsersRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getHomepageContent } from "@/lib/datocms"
import type { Metadata } from "next"

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

  // Testimonials data for social proof section
  const testimonials = [
    {
      id: "1",
      testimonialText: "The Deal Kit saved me months of research. Everything I needed in one place.",
      authorName: "Sarah J.",
      authorTitle: "Business Buyer",
      starRating: 5,
    },
    {
      id: "2",
      testimonialText: "Professional templates that actually work. Closed my first deal using these tools.",
      authorName: "Mike C.",
      authorTitle: "ETA MBA",
      starRating: 5,
    },
    {
      id: "3",
      testimonialText: "Incredible value. These templates would cost thousands from a lawyer.",
      authorName: "Jessica R.",
      authorTitle: "Solo Searcher",
      starRating: 5,
    },
  ]

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
                Join 1,000+ professionals getting weekly scripts, tools, lessons & real-world tactics — straight to your
                inbox.
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
            
            <Link href="/newsletter" className="group" aria-label="A Proven Roadmap">
              <Card className="border-2 border-gray-100 hover:border-[#1A73E8] transition-colors duration-200 h-full cursor-pointer">
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <Map className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">A Proven Roadmap</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The 8-step roadmap that guides you from W2 worker to business owner — no MBA or private equity needed
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Deal Kit - Links to Deal Kit page */}
            <Link href="/deal-kit" className="group" aria-label="Tools to Evaluate Deals with Confidence">
              <Card className="border-2 border-gray-100 hover:border-[#1A73E8] transition-colors duration-200 h-full cursor-pointer">
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">Tools to Evaluate Deals with Confidence</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Valuation calculators, due diligence checklists, and deal breakdowns to help you avoid overpaying
                  </p>
                </CardContent>
              </Card>
            </Link>
            
           {/* Community of Support - Links to Newsletter */}
            <Link href="/newsletter" className="group" aria-label="A Tribe of Values-Driven Buyers">
              <Card className="border-2 border-gray-100 hover:border-[#1A73E8] transition-colors duration-200 h-full cursor-pointer">
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <UsersRound className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">A Tribe of Values-Driven Buyers</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Join 1,000+ mid-career professionals buying boring, profitable businesses — and building freedom on their terms.
                  </p>
                </CardContent>
              </Card>
            </Link>

          <div className="text-center">
            <Badge variant="secondary" className="bg-[#1A73E8] text-white text-lg px-6 py-2 rounded-full">
              🔥 COMING SOON: Off-Market Deal Flow
            </Badge>
            <p className="text-gray-700 mt-4">Leads and seller intros shared by vetted members</p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 lg:py-24 bg-[#F9F9F9]" aria-labelledby="social-proof-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="social-proof-heading" className="text-3xl lg:text-4xl font-black text-black mb-6">
              Trusted by 2,500+ Business Buyers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border-2 border-gray-100 hover:border-[#1A73E8] transition-colors duration-200"
              >
                <CardContent className="p-6 space-y-4">
                  {/* Star Rating */}
                  <div className="flex justify-center space-x-1" aria-label={`${testimonial.starRating} star rating`}>
                    {[...Array(testimonial.starRating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 text-center italic leading-relaxed">
                    "{testimonial.testimonialText}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="text-center">
                    <cite className="text-black font-semibold not-italic">{testimonial.authorName}</cite>
                    <p className="text-gray-600 text-sm">{testimonial.authorTitle}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            </div>

            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto"
                aria-hidden="true"
              >
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">Avoid Rookie Mistakes</h3>
            </div>

            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto"
                aria-hidden="true"
              >
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">Learn from Experts</h3>
            </div>

            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mx-auto"
                aria-hidden="true"
              >
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">Buy Back Your Time</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section - Updated to use DatoCMS */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="right-place-heading">
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
              Stop Climbing Start Owning Today
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
    </main>
  )
}
