import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { StructuredText } from "react-datocms"

// Simplified function to get a blog post with feature image and content
async function getSimpleBlogPost(slug: string) {
  const { GraphQLClient } = await import("graphql-request")

  const client = new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  })

  const query = `
    query GetPost($slug: String!) {
      article(filter: { slug: { eq: $slug } }) {
        id
        title
        slug
        content {
          value
        }
        publishedAt
        featureImage {
          url
          alt
        }
        excerpt
      }
    }
  `

  try {
    const data = await client.request(query, { slug })
    return data.article
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

// Test if the article exists with even simpler query
async function testArticleExists(slug: string) {
  const { GraphQLClient } = await import("graphql-request")

  const client = new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  })

  const query = `
    query TestPost($slug: String!) {
      article(filter: { slug: { eq: $slug } }) {
        id
        title
        slug
      }
    }
  `

  try {
    const data = await client.request(query, { slug })
    return {
      exists: !!data.article,
      article: data.article,
    }
  } catch (error) {
    console.error("Error testing article existence:", error)
    return {
      exists: false,
      error: error.message,
    }
  }
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getSimpleBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Acquire & Build",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString()

  return {
    title: `${post.title} | Acquire & Build`,
    description:
      post.excerpt ||
      `Read "${post.title}" on Acquire & Build - insights for business acquisition and entrepreneurship.`,
    keywords: [
      "business acquisition",
      "buy a business",
      post.title.toLowerCase(),
      "entrepreneurship",
      "business ownership",
      "SBA loans",
      "business financing",
    ],
    authors: [{ name: "Acquire & Build" }],
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read "${post.title}" on Acquire & Build`,
      type: "article",
      publishedTime: publishedDate,
      url: `https://acquireandbuild.com/blog/${post.slug}`,
      images: post.featureImage?.url
        ? [
            {
              url: post.featureImage.url,
              width: 1200,
              height: 630,
              alt: post.featureImage.alt || post.title,
            },
          ]
        : [
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
      title: post.title,
      description: post.excerpt || `Read "${post.title}" on Acquire & Build`,
      images: post.featureImage?.url ? [post.featureImage.url] : ["/og-image.png"],
    },
    alternates: {
      canonical: `https://acquireandbuild.com/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // First test if article exists
  const existenceTest = await testArticleExists(params.slug)
  console.log("Article existence test:", existenceTest)

  if (!existenceTest.exists) {
    console.log("Article not found or error:", existenceTest.error)
    notFound()
  }

  // Try to get the full post
  const post = await getSimpleBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date()
  const readingTime = Math.ceil((post.content?.value ? JSON.stringify(post.content.value).length : 1000) / 1000)

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Structured Data for Blog Post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `https://acquireandbuild.com/blog/${post.slug}#blogpost`,
            headline: post.title,
            description: post.excerpt || `Insights on business acquisition: ${post.title}`,
            image: {
              "@type": "ImageObject",
              url: post.featureImage?.url || "https://acquireandbuild.com/og-image.png",
              width: 1200,
              height: 630,
              caption: post.featureImage?.alt || post.title,
            },
            datePublished: post.publishedAt || new Date().toISOString(),
            dateModified: post.publishedAt || new Date().toISOString(),
            author: {
              "@type": "Organization",
              "@id": "https://acquireandbuild.com/#organization",
              name: "Acquire & Build",
            },
            publisher: {
              "@type": "Organization",
              "@id": "https://acquireandbuild.com/#organization",
              name: "Acquire & Build",
              logo: {
                "@type": "ImageObject",
                url: "https://acquireandbuild.com/logo.png",
                width: 400,
                height: 400,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://acquireandbuild.com/blog/${post.slug}`,
            },
            keywords: [
              "business acquisition",
              "buy a business",
              "entrepreneurship",
              "business ownership",
              "SBA loans",
              "business financing",
            ],
            wordCount: post.content?.value ? JSON.stringify(post.content.value).length : 1000,
            timeRequired: `PT${readingTime}M`,
            articleSection: "Business Acquisition",
            inLanguage: "en-US",
            isPartOf: {
              "@type": "Blog",
              "@id": "https://acquireandbuild.com/blog#blog",
              name: "Acquire & Build Blog",
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
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: "https://acquireandbuild.com/blog",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: `https://acquireandbuild.com/blog/${post.slug}`,
                },
              ],
            },
          }),
        }}
      />

      {/* Navigation */}
      <nav
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-black text-black" aria-label="Acquire & Build Home">
              Acquire & Build
            </Link>
            <div className="flex space-x-8">
              <Link href="/blog" className="text-[#1A73E8] font-medium" aria-current="page">
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

      {/* Article */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-[#1A73E8] transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog" className="hover:text-[#1A73E8] transition-colors">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-gray-900 font-medium">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Back to Blog */}
            <Link
              href="/blog"
              className="inline-flex items-center text-[#1A73E8] hover:text-[#0F56C3] font-medium mb-8 transition-colors"
              aria-label="Back to blog"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>

            {/* Debug Info in Development */}
            {process.env.NODE_ENV === "development" && (
              <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Debug Info:</h3>
                <p className="text-sm text-yellow-700">Slug: {params.slug}</p>
                <p className="text-sm text-yellow-700">Article Found: {existenceTest.exists ? "Yes" : "No"}</p>
                {existenceTest.error && <p className="text-sm text-red-700">Error: {existenceTest.error}</p>}
                <p className="text-sm text-yellow-700">
                  Feature Image: {post.featureImage?.url ? "Available" : "Missing"}
                </p>
              </div>
            )}

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={publishedDate.toISOString()}>
                    {publishedDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-black leading-tight mb-8">{post.title}</h1>

              {/* Hero Feature Image */}
              {post.featureImage?.url && (
                <div className="relative aspect-video mb-8">
                  <Image
                    src={post.featureImage.url || "/placeholder.svg"}
                    alt={post.featureImage.alt || `Featured image for ${post.title}`}
                    fill
                    className="object-cover rounded-lg"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {post.content ? (
                <StructuredText data={post.content} />
              ) : (
                <div>
                  <p>This article content will be loaded from your DatoCMS content field.</p>
                  <p>
                    Make sure to add rich content to the "content" field in your DatoCMS Article to see it displayed
                    here.
                  </p>
                  <h2>Key Takeaways</h2>
                  <ul>
                    <li>Prepare thoroughly before meeting sellers</li>
                    <li>Build trust through transparency</li>
                    <li>Focus on win-win outcomes</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                <p>
                  Published:{" "}
                  <time dateTime={publishedDate.toISOString()}>
                    {publishedDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </p>
              </div>
            </footer>
          </div>
        </div>
      </article>

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
