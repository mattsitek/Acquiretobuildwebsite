"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import { SmartJourneyNavigator, type JourneyStep } from "@/components/smart-journey-navigator"
import {
  Target,
  Search,
  CheckCircle,
  Handshake,
  FilePenLine,
  ClipboardList,
  FileText,
  AlarmCheckIcon as FlagCheckered,
  Rocket,
} from "lucide-react"

export type RoadmapLink = {
  href: string
  label?: string
}

export type RoadmapStop = {
  id: string
  step: string
  title: string
  blurb: string
  icon: React.ReactNode
  link?: RoadmapLink
}

const stops: RoadmapStop[] = [
  {
    id: "s0",
    step: "Step 0",
    title: "Find Your Fit",
    blurb: "Is business ownership right for you? Define your superpowers and deal box.",
    icon: <Target className="h-6 w-6" />,
    link: { href: "/am-i-ready", label: "Take the assessment" },
  },
  {
    id: "s1",
    step: "Step 1",
    title: "Spot the Deals",
    blurb: "Go beyond marketplaces. Build proprietary deal flow through outreach and local networks.",
    icon: <Search className="h-6 w-6" />,
    link: { href: "/roadmap/tools", label: "Use the scripts" },
  },
  {
    id: "s2",
    step: "Step 2",
    title: "Quick Gut Check",
    blurb: "Screen fast. Spot red flags. Flag the winners with a simple scorecard.",
    icon: <CheckCircle className="h-6 w-6" />,
    link: { href: "/deal-scorecard", label: "Open scorecard" },
  },
  {
    id: "s3",
    step: "Step 3",
    title: "Build Trust with the Owner",
    blurb: "Owners sell to people they trust. Lead with respect for their legacy.",
    icon: <Handshake className="h-6 w-6" />,
    link: { href: "/roadmap/tools", label: "Read the playbook" },
  },
  {
    id: "s4",
    step: "Step 4",
    title: "Make the Offer (LOI)",
    blurb: "Creatively structure an LOI that works for you and feels fair to the seller.",
    icon: <FilePenLine className="h-6 w-6" />,
    link: { href: "/roadmap/tools", label: "LOI template" },
  },
  {
    id: "s5",
    step: "Step 5",
    title: "Do the Homework (Diligence)",
    blurb: "Verify the numbers, customers, ops, and legal so there are no surprises.",
    icon: <ClipboardList className="h-6 w-6" />,
    link: { href: "/roadmap/tools", label: "Diligence checklist" },
  },
  {
    id: "s6",
    step: "Step 6",
    title: "Paper the Deal (Purchase Agreement)",
    blurb: "Turn the handshake into a definitive Asset Purchase Agreement that protects you.",
    icon: <FileText className="h-6 w-6" />,
    link: { href: "/roadmap/tools", label: "APA overview" },
  },
  {
    id: "s7",
    step: "Step 7",
    title: "Financing & Closing",
    blurb: "Secure the capital stack, sign, and wire. You're officially a business owner.",
    icon: <FlagCheckered className="h-6 w-6" />,
    link: { href: "/roadmap/tools", label: "Financing guide" },
  },
  {
    id: "s8",
    step: "Step 8",
    title: "First 90 Days",
    blurb: "Stabilize, learn, earn trust. Don't break the money machine you just bought.",
    icon: <Rocket className="h-6 w-6" />,
    link: { href: "/roadmap/tools", label: "90-day plan" },
  },
]

const convertToJourneySteps = (stops: RoadmapStop[]): JourneyStep[] => {
  return stops.map((stop, index) => ({
    id: stop.id,
    step: stop.step,
    title: stop.title,
    description: stop.blurb,
    icon: stop.icon,
    href: stop.link?.href,
    estimatedTime: index === 0 ? "10 min" : index < 3 ? "2-3 hours" : "1-2 weeks",
    // Smart status logic - first step is current, rest are locked initially
    status: index === 0 ? "current" : ("locked" as const),
  }))
}

export default function RoadmapPage() {
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>(convertToJourneySteps(stops))
  const [currentStepId, setCurrentStepId] = useState("s0")
  const [viewMode, setViewMode] = useState<"navigator" | "traditional">("navigator")

  const handleStepChange = (stepId: string) => {
    setCurrentStepId(stepId)
    // Update step statuses based on user interaction
    setJourneySteps((prev) =>
      prev.map((step) => {
        const stepIndex = prev.findIndex((s) => s.id === stepId)
        const currentIndex = prev.findIndex((s) => s.id === step.id)

        if (currentIndex < stepIndex) {
          return { ...step, status: "complete" as const }
        } else if (currentIndex === stepIndex) {
          return { ...step, status: "current" as const }
        } else {
          return { ...step, status: "locked" as const }
        }
      }),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Your Roadmap to Buying a Business</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Simple steps. Real tools. The path to freedom.
          </p>

          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant={viewMode === "navigator" ? "default" : "outline"}
              onClick={() => setViewMode("navigator")}
              size="sm"
            >
              Interactive Navigator
            </Button>
            <Button
              variant={viewMode === "traditional" ? "default" : "outline"}
              onClick={() => setViewMode("traditional")}
              size="sm"
            >
              Traditional View
            </Button>
          </div>
        </div>

        {viewMode === "navigator" && (
          <div className="mb-16">
            <SmartJourneyNavigator
              steps={journeySteps}
              currentStepId={currentStepId}
              onStepChange={handleStepChange}
              className="max-w-4xl mx-auto"
            />
          </div>
        )}

        {/* Traditional View */}
        {viewMode === "traditional" && (
          <>
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="mx-auto h-full w-2 bg-gradient-to-b from-primary/20 via-primary/10 to-primary/5 rounded-full" />
            </div>

            <ol className="mt-12 space-y-8 relative">
              {stops.map((s, i) => (
                <li key={s.id} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="max-w-4xl mx-auto"
                  >
                    <div className="relative flex items-start gap-6 rounded-2xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300">
                      {/* Step number indicator */}
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                          {i}
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                            {s.icon}
                          </div>
                          <span className="text-sm font-semibold text-primary">{s.step}</span>
                        </div>

                        <h3 className="text-xl font-bold leading-tight text-foreground mb-2">{s.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{s.blurb}</p>
                      </div>

                      {/* Action button */}
                      <div className="flex-shrink-0">
                        {s.link && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                          >
                            <a href={s.link.href}>{s.link.label || "Learn more"}</a>
                          </Button>
                        )}
                      </div>

                      {i < stops.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                      )}
                    </div>
                  </motion.div>
                </li>
              ))}
            </ol>
          </>
        )}

        {/* Footer CTA */}
        <div className="mt-14 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="/roadmap/tools">Explore the Roadmap Tools</a>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Every step links to a tool, template, or story—no fluff, just what you need.
          </p>
        </div>
      </section>
    </div>
  )
}
