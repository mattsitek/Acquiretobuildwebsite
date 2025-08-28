"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Mail, Loader2, CheckCircle, AlertCircle, FileText, ExternalLink } from "lucide-react"
import Image from "next/image"
import { subscribeToLeadMagnet } from "@/app/actions/lead-magnet"

interface LeadMagnetSectionProps {
  leadMagnet?: {
    id: string
    title: string
    description: string
    pdfFile?: {
      url: string
      filename: string
    }
    pdfDescription?: string
    keywords?: string
    previewImage?: {
      url: string
      alt?: string
    }
    previewImageAltText?: string
    fileSize?: string
    pageCount?: number
    downloadCount?: number
  } | null
}

export default function LeadMagnetSection({ leadMagnet }: LeadMagnetSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Fallback data if no lead magnet from CMS
  const fallbackData = {
    title: "10 Proven Scripts to Contact Small Business Owners",
    description:
      "Unlock off-market acquisition opportunities with these 10 proven email, call, and in-person scripts designed for solo searchers and first-time business buyers. Start real conversations with business owners and build trust—no pitch, no pressure.",
    pdfDescription: "Proven outreach scripts to help you successfully connect with owners and land a deal.",
    fileSize: "2.1 MB",
    pageCount: 15,
  }

  const data = leadMagnet || fallbackData

  // Function to handle PDF download without CSP issues
  const handlePdfDownload = (url: string, filename: string) => {
    console.log("Triggering PDF download:", url, filename)

    try {
      // Method 1: Create download link (avoids framing)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      link.target = "_blank"
      link.rel = "noopener noreferrer"

      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      console.log("PDF download triggered successfully")
    } catch (error) {
      console.error("Download method failed, trying fallback:", error)

      // Fallback: Open in new tab (no framing)
      try {
        window.open(url, "_blank", "noopener,noreferrer")
        console.log("PDF opened in new tab successfully")
      } catch (fallbackError) {
        console.error("All download methods failed:", fallbackError)
        // Last resort: direct navigation
        window.location.href = url
      }
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    try {
      const result = await subscribeToLeadMagnet(formData)

      if (result.success) {
        setMessage({ type: "success", text: result.message })

        // Handle PDF download using CSP-safe method
        if (result.downloadUrl) {
          console.log("PDF download requested:", result.downloadUrl)

          // Small delay to ensure success message is shown first
          setTimeout(() => {
            handlePdfDownload(result.downloadUrl, result.filename || "business-scripts.pdf")
          }, 500)
        } else {
          // Fallback: Show manual download message
          setMessage({
            type: "success",
            text: result.message + " (PDF will be sent via email due to technical restrictions)",
          })
        }

        // Reset form safely
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      console.error("Lead magnet form submission error:", error)
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      })
    }

    setIsLoading(false)
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Left Side - Content & Form (First on mobile) */}
            <div className="order-1 lg:order-1 p-6 sm:p-8 lg:p-12 space-y-6 lg:space-y-8 bg-white flex-1">
              {/* Headline */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black leading-tight">{data.title}</h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">{data.description}</p>
              </div>

              {/* Development Notice */}
              {process.env.NODE_ENV === "development" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-yellow-600">⚠️</div>
                    <div className="text-yellow-800 text-sm">
                      <p className="font-semibold">Development Mode</p>
                      <p>PDF downloads may be blocked by browser security. In production, downloads work normally.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form ref={formRef} id="lead-magnet-form" action={handleSubmit} className="space-y-4 lg:space-y-6">
                <div className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={isLoading}
                      className="h-12 text-base lg:text-lg border-2 border-gray-200 focus:border-[#1A73E8] rounded-lg"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* First Name Field */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-gray-500">(optional)</span>
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      disabled={isLoading}
                      className="h-12 text-base lg:text-lg border-2 border-gray-200 focus:border-[#1A73E8] rounded-lg"
                      placeholder="Your first name"
                    />
                  </div>

                  {/* Optional Segmentation Checkbox */}
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="activelySearching"
                      name="activelySearching"
                      disabled={isLoading}
                      className="border-2 border-gray-300 mt-1"
                    />
                    <label htmlFor="activelySearching" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                      ✅ I'm actively searching for a business to acquire
                      <span className="block text-xs text-gray-500 mt-1">(Help us send you more relevant content)</span>
                    </label>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 sm:h-14 bg-[#1A73E8] hover:bg-[#0F56C3] text-white font-bold text-base lg:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Getting Your Scripts...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Get the Scripts + Weekly Insights →
                    </>
                  )}
                </Button>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-center sm:space-x-6 text-xs sm:text-sm text-gray-600 pt-2">
                  <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-center sm:text-left">Instant delivery</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-center sm:text-left">No spam, ever</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1">
                    <FileText className="h-4 w-4" />
                    <span className="text-center sm:text-left">Free forever</span>
                  </div>
                </div>
              </form>

              {/* Success/Error Message */}
              {message && (
                <div
                  className={`p-4 rounded-lg flex items-start space-x-3 ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="text-sm font-medium">{message.text}</div>
                </div>
              )}

              {/* Manual Download Link (Development Fallback) */}
              {process.env.NODE_ENV === "development" && data.pdfFile?.url && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-blue-800">
                      <p className="font-semibold text-sm">Development: Manual Download</p>
                      <a
                        href={data.pdfFile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center mt-1"
                      >
                        Click here to download PDF manually
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - PDF Visual with Blue Background (Second on mobile) */}
            <div className="order-2 lg:order-2 bg-[#1A73E8] p-6 sm:p-8 lg:p-12 flex items-center justify-center relative overflow-hidden flex-1 min-h-[400px] lg:min-h-[600px]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-24 h-24 sm:w-32 sm:h-32 border border-white rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-16 h-16 sm:w-24 sm:h-24 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 border border-white rounded-full"></div>
              </div>

              <div className="relative z-10 text-center space-y-4 lg:space-y-6">
                {/* PDF Preview Image or Fallback */}
                <div className="relative">
                  {data.previewImage?.url ? (
                    <Image
                      src={data.previewImage.url || "/placeholder.svg"}
                      alt={data.previewImageAltText || data.previewImage.alt || "PDF Preview"}
                      width={250}
                      height={320}
                      className="rounded-lg shadow-2xl mx-auto lg:w-[300px] lg:h-[400px]"
                    />
                  ) : (
                    <div className="w-48 h-64 sm:w-56 sm:h-72 lg:w-64 lg:h-80 bg-white rounded-lg shadow-2xl mx-auto flex items-center justify-center">
                      <div className="text-center space-y-3 lg:space-y-4 p-4">
                        <FileText className="h-12 w-12 lg:h-16 lg:w-16 text-[#1A73E8] mx-auto" />
                        <div className="space-y-2">
                          <p className="font-bold text-gray-900 text-sm lg:text-base leading-tight">
                            10 Scripts to Start the Conversation with a Business Owner
                          </p>
                          <p className="text-xs lg:text-sm text-gray-600">PDF Guide</p>
                          {data.pageCount && <p className="text-xs text-gray-500">{data.pageCount} pages</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FREE Badge */}
                  <div className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 bg-green-500 text-white px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold shadow-lg">
                    FREE
                  </div>
                </div>

                {/* PDF Details */}
                <div className="text-white space-y-3 lg:space-y-4">
                  {data.pdfDescription && (
                    <p className="text-base lg:text-lg font-semibold leading-tight">{data.pdfDescription}</p>
                  )}
                  <div className="flex items-center justify-center space-x-3 lg:space-x-4 text-xs lg:text-sm opacity-90">
                    {data.fileSize && (
                      <span className="flex items-center space-x-1">
                        <Download className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>{data.fileSize}</span>
                      </span>
                    )}
                    {data.pageCount && (
                      <span className="flex items-center space-x-1">
                        <FileText className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>{data.pageCount} pages</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Description Text */}
                  <div className="text-white text-center">
                    <p className="text-sm lg:text-lg font-medium leading-relaxed">
                      Unlock off-market acquisition opportunities with these 10 proven email, call, and in-person
                      scripts designed for solo searchers and first-time business buyers. Start real conversations with
                      business owners and build trust—no pitch, no pressure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
