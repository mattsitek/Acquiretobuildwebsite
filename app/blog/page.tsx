import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import type { Metadata } from "next"
import Navigation from "@/components/navigation"

// Function to get blog posts with images
async function getBlogPostsWithImages() {
  const { GraphQLClient } = await import("graphql-request")

  const client = new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  })

  const query = `
    query GetBlogPosts {
      allArticles(orderBy: publishedAt_DESC) {
        id
        title
        slug
        excerpt
        publishedAt
        featureImage {
          url
          alt
        }
      }
    }
  `

  try {
    const data = await client.request(query)
    console.log("Blog posts with images:", data.allArticles)
    return data.allArticles
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export const metadata: Metadata = {
  title: "Blog | Acquire & Build",
  description:
    "Read the latest insights on business acquisition, SBA loans, due diligence, and entrepreneurship from Acquire & Build.",
  keywords: [
    "business acquisition blog",
    "buy a business",
    "SBA loans",
    "business financing",
    "entrepreneurship",
    "business ownership",
    "due diligence",
    "business valuation",
    "seller financing",
    "search fund",
  ],
  openGraph: {
    title: "Blog | Acquire & Build",
    description: "Latest insights on business acquisition and entrepreneurship",
    type: "website",
    url: "https://www.acquiretobuild.com/blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Acquire & Build Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Acquire & Build",
    description: "Latest insights on business acquisition and entrepreneurship",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.acquireatobuild.com/blog",
  },
}

export default async function BlogPage() {
  const posts = await getBlogPostsWithImages()

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": "https://acquireandbuild.com/blog#blog",
            name: "Acquire & Build Blog",
            description: "Insights and strategies for business acquisition and entrepreneurship",
            url: "https://www.acquiretobuild.com/blog",
            publisher: {
              "@id": "https://www.acquiretobuild.com/#organization",
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: posts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "BlogPosting",
                  "@id": `https://www.acquiretobuild.com/blog/${post.slug}#blogpost`,
                  headline: post.title,
                  description: post.excerpt || `Read "${post.title}" on business acquisition`,
                  url: `https://www.acquiretobuild.com/blog/${post.slug}`,
                  datePublished: post.publishedAt,
                  author: {
                    "@id": "https://www.acquiretobuild.com/#organization",
                  },
                  publisher: {
                    "@id": "https://www.acquiretobuild.com/#organization",
                  },
                  image: post.featureImage?.url || "https://www.acquiretobuild.com/og-image.png",
                },
              })),
            },
            inLanguage: "en-US",
          }),
        }}
      />

      {/* Navigation - NEW: Replace the old inline nav */}
      <Navigation />

      {/* Blog Header */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-black text-black mb-6">Business Acquisition Insights</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Tactical advice, deal breakdowns, and real-world strategies for buying profitable businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date()
                  const readingTime = Math.ceil((post.excerpt?.length || 500) / 200)

                  return (
                    <article
                      key={post.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Feature Image */}
                      {post.featureImage?.url && (
                        <div className="relative aspect-video">
                          <Image
                            src={post.featureImage.url || "/placeholder.svg"}
                            alt={post.featureImage.alt || `Featured image for ${post.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" aria-hidden="true" />
                            <time dateTime={publishedDate.toISOString()}>
                              {publishedDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </time>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" aria-hidden="true" />
                            <span>{readingTime} min read</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-black mb-3 leading-tight">
                          <Link href={`/blog/${post.slug}`} className="hover:text-[#1A73E8] transition-colors">
                            {post.title}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                        )}

                        {/* Read More */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-[#1A73E8] hover:text-[#0F56C3] font-medium transition-colors"
                        >
                          Read Article
                          <svg
                            className="ml-1 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No blog posts found</h2>
                <p className="text-gray-600">Check back soon for new content!</p>
              </div>
            )}
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
    </div>
  )
}
