"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, TrendingUp } from "lucide-react"

interface EmailGateProps {
  onEmailCapture: (email: string) => void
  onClose: () => void
}

export function EmailGate({ onEmailCapture, onClose }: EmailGateProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      await onEmailCapture(email)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="relative pb-4">
          <Button variant="ghost" size="icon" className="absolute right-0 top-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-black">Unlock Your Deal Cashflow Scorecard Report</CardTitle>
            <p className="text-gray-700 mt-3 leading-relaxed">See if this deal will actually make you money</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-black">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 ${error ? "border-destructive" : ""}`}
                required
              />
              {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 font-semibold text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Unlocking..." : "Unlock Cash Flow Analysis"}
            </Button>

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              We'll send you a detailed report and keep you updated on acquisition opportunities.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
