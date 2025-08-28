"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageCircle, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { submitContactForm } from "@/app/actions/contact"

export default function ContactPageClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setMessage({ type: "success", text: result.message })
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      })
    }

    setIsLoading(false)
  }

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

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-5xl font-black text-black leading-tight">Let's Connect</h1>

                  <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                    <p>Got a question, partnership idea, or just want to say hey?</p>

                    <p>
                      Whether you're searching for your first business, already in due diligence, or building post-close
                      — I'd love to hear from you.
                    </p>

                    <p>I read every message and respond personally (no VA, no fluff).</p>

                    <p className="text-xl font-semibold text-black">Let's build something real.</p>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="h-5 w-5 text-[#1A73E8]" />
                    <span>Personal response within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MessageCircle className="h-5 w-5 text-[#1A73E8]" />
                    <span>Real conversations, no automated replies</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="border-2 border-gray-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-black">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form id="contact-form" action={handleSubmit} className="space-y-6">
                    {/* Required Fields */}
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          disabled={isLoading}
                          className="h-12 border-2 border-gray-200 focus:border-[#1A73E8]"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          disabled={isLoading}
                          className="h-12 border-2 border-gray-200 focus:border-[#1A73E8]"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          What's on your mind? *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          disabled={isLoading}
                          rows={5}
                          className="border-2 border-gray-200 focus:border-[#1A73E8] resize-none"
                          placeholder="Tell me what you're thinking about, working on, or curious about..."
                        />
                      </div>
                    </div>

                    {/* Optional Checkboxes */}
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-gray-700">Optional but helpful:</p>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="partnering"
                            name="partnering"
                            disabled={isLoading}
                            className="border-2 border-gray-300"
                          />
                          <label htmlFor="partnering" className="text-sm text-gray-700 cursor-pointer">
                            I'm interested in partnering or collaborating
                          </label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="buying-business"
                            name="buying-business"
                            disabled={isLoading}
                            className="border-2 border-gray-300"
                          />
                          <label htmlFor="buying-business" className="text-sm text-gray-700 cursor-pointer">
                            I have a question about buying a business
                          </label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Checkbox id="other" name="other" disabled={isLoading} className="border-2 border-gray-300" />
                          <label htmlFor="other" className="text-sm text-gray-700 cursor-pointer">
                            Other / Just saying hi
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-[#1A73E8] hover:bg-[#0F56C3] text-white font-bold text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Mail className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Success/Error Message */}
                  {message && (
                    <div
                      className={`mt-6 p-4 rounded-md flex items-start space-x-3 ${
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
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
