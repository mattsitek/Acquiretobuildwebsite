import Link from "next/link"
import { ArrowLeft, FileX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-black text-black">
              Acquire & Build
            </Link>
            <div className="flex space-x-8">
              <Link href="/blog" className="text-[#1A73E8] font-medium">
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

      {/* Not Found Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <FileX className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h1 className="text-4xl font-black text-black mb-4">Blog Post Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or may have been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/blog"
              className="inline-flex items-center bg-[#1A73E8] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0F56C3] transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            <div className="text-sm text-gray-500">
              <p>
                Or return to the{" "}
                <Link href="/" className="text-[#1A73E8] hover:underline">
                  homepage
                </Link>
              </p>
            </div>
          </div>

          {/* Debug Info in Development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg text-left">
              <h3 className="font-semibold text-yellow-800 mb-2">Debug Info:</h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>This could be because:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>The blog post doesn't exist in DatoCMS</li>
                  <li>The slug doesn't match exactly</li>
                  <li>There are GraphQL field errors</li>
                  <li>The Article model isn't set up correctly</li>
                </ul>
                <p className="mt-2">
                  Check the{" "}
                  <Link href="/debug-datocms" className="underline">
                    debug page
                  </Link>{" "}
                  for more details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
