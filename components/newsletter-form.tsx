"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from "@/app/actions/newsletter"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface NewsletterFormProps {
  variant?: "hero" | "footer"
  buttonText?: string
  placeholder?: string
}

export function NewsletterForm({
  variant = "hero",
  buttonText = "Subscribe",
  placeholder = "Enter your email",
}: NewsletterFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)

    try {
      // Use the same subscribeToNewsletter action for both hero and footer
      const result = await subscribeToNewsletter(formData)

      if (result.success) {
        setMessage({ type: "success", text: result.message })
        // Reset form safely
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      console.error("Newsletter form submission error:", error)
      setMessage({
        type: "error",
        text: "There was an error processing your request. Please try again.",
      })
    }

    setIsLoading(false)
  }

  // Styling based on variant - matches original designs
  const isFooter = variant === "footer"
  const inputClasses = isFooter
    ? "flex-1 h-12 text-base bg-white text-black border-2 border-gray-200 focus:border-[#1A73E8] rounded-lg"
    : "flex-1 h-12 text-base border-2 border-gray-200 focus:border-[#1A73E8] rounded-lg"

  const buttonClasses = isFooter
    ? "h-12 px-6 bg-[#1A73E8] hover:bg-[#0F56C3] text-white font-semibold rounded-lg whitespace-nowrap"
    : "h-12 px-6 bg-[#1A73E8] hover:bg-[#0F56C3] text-white font-semibold rounded-lg whitespace-nowrap"

  const messageClasses = isFooter
    ? message?.type === "success"
      ? "bg-green-50 text-green-800 border border-green-200"
      : "bg-red-50 text-red-800 border border-red-200"
    : message?.type === "success"
      ? "bg-green-50 text-green-800 border border-green-200"
      : "bg-red-50 text-red-800 border border-red-200"

  const disclaimerClasses = isFooter
    ? "text-xs text-gray-400 mt-3 text-center"
    : "text-xs text-gray-500 mt-3 text-center"

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Newsletter Subscription Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsletterService",
            name: "Acquire & Build Newsletter",
            description: "Weekly insights on business acquisition, financing strategies, and deal breakdowns",
            provider: {
              "@id": "https://acquireandbuild.com/#organization",
            },
            potentialAction: {
              "@type": "SubscribeAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://acquireandbuild.com/newsletter",
                actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
              },
              object: {
                "@type": "Newsletter",
                name: "Acquire & Build Newsletter",
              },
            },
          }),
        }}
      />

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4"
        role="form"
        aria-label="Newsletter subscription"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            name="email"
            placeholder={placeholder}
            required
            disabled={isLoading}
            className={inputClasses}
            aria-label="Email address"
            aria-describedby="email-description"
          />
          <Button type="submit" disabled={isLoading} className={buttonClasses} aria-describedby="submit-description">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Subscribing...
              </>
            ) : (
              buttonText
            )}
          </Button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`p-3 rounded-lg flex items-start space-x-2 text-sm ${messageClasses}`}
            role="alert"
            aria-live="polite"
          >
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div>{message.text}</div>
          </div>
        )}
    </div>
  )
}
