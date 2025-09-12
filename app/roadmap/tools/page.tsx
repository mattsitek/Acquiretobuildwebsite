import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import { Download, ExternalLink } from "lucide-react"
import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.acquiretobuild.com/roadmap/tools",
  },
}
type Tool = {
  id: string
  step: string
  title: string
  kind: "Tool" | "Template" | "Checklist" | "Guide" | "Story"
  blurb: string
  href: string
  actionLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

const tools: Tool[] = [
  {
    id: "t0a",
    step: "Step 0",
    title: "Am I Ready? Assessment",
    kind: "Tool",
    blurb: "Figure out if business ownership fits your skills, risk tolerance, and lifestyle goals.",
    href: "/am-i-ready",
    actionLabel: "Start assessment",
  },
  {
    id: "t0b",
    step: "Step 0",
    title: "Deal Box Builder",
    kind: "Tool",
    blurb: "Define your target industry, size, geography, and cash-flow needs—the filter for every future deal.",
    href: "/deal-scorecard",
    actionLabel: "Build your deal box",
  },
  {
    id: "t1a",
    step: "Step 1",
    title: "Owner Outreach Scripts (10-pack)",
    kind: "Template",
    blurb: "Proven emails, DMs, cold call, voicemail, and walk-in intros that open real conversations.",
    href: "/newsletter",
    actionLabel: "Get the scripts",
  },
  {
    id: "t1b",
    step: "Step 1",
    title: "Sourcing Playbook",
    kind: "Guide",
    blurb: "Go beyond marketplaces. Build proprietary deal flow through local networks and direct outreach.",
    href: "/newsletter",
    actionLabel: "Open playbook",
  },
  {
    id: "t2a",
    step: "Step 2",
    title: "Deal Scorecard",
    kind: "Tool",
    blurb: "Screen fast for cash flow, owner dependency, concentration, recurring revenue, and red flags.",
    href: "/deal-scorecard",
    actionLabel: "Open scorecard",
  },
  {
    id: "t3a",
    step: "Step 3",
    title: "Seller Psychology & Legacy Pitch",
    kind: "Guide",
    blurb: "Win trust with story-first conversations and a respectful continuity message.",
    href: "/newsletter",
    actionLabel: "Read guide",
  },
  {
    id: "t4a",
    step: "Step 4",
    title: "LOI (Letter of Intent) Template",
    kind: "Template",
    blurb: "Get under contract with flexible terms: price, structure, diligence, exclusivity, and more.",
    href: "/newsletter",
    actionLabel: "Download LOI",
  },
  {
    id: "t4b",
    step: "Step 4",
    title: "Creative Deal Structures",
    kind: "Guide",
    blurb: "Seller notes, earnouts, rollovers, and travel-fund concepts to bridge valuation gaps.",
    href: "/newsletter",
    actionLabel: "View examples",
  },
  {
    id: "t5a",
    step: "Step 5",
    title: "Mutual NDA Template",
    kind: "Template",
    blurb: "Share data safely with lenders and advisors during diligence.",
    href: "/newsletter",
    actionLabel: "Download NDA",
  },
  {
    id: "t5b",
    step: "Step 5",
    title: "Due Diligence Checklist (No‑B.S.)",
    kind: "Checklist",
    blurb: "Financials, customers, ops, legal/compliance, and transition readiness—no fluff.",
    href: "/newsletter",
    actionLabel: "Open checklist",
  },
  {
    id: "t6a",
    step: "Step 6",
    title: "Purchase Agreement (APA) Overview",
    kind: "Guide",
    blurb: "LOI → definitive: assets vs. stock, reps & warranties, schedules, and closing conditions.",
    href: "/newsletter",
    actionLabel: "Read overview",
  },
  {
    id: "t7a",
    step: "Step 7",
    title: "Financing Guide & Capital Stack",
    kind: "Guide",
    blurb: "SBA, seller financing, conventional, and how to layer them to keep cash flow strong.",
    href: "/newsletter",
    actionLabel: "Open guide",
    secondaryHref: "/newsletter",
    secondaryLabel: "See a real stack",
  },
  {
    id: "t7b",
    step: "Step 7",
    title: "Closing Checklist",
    kind: "Checklist",
    blurb: "Documents, deadlines, and communication cadence so nothing slips before wire day.",
    href: "/newsletter",
    actionLabel: "Open checklist",
  },
  {
    id: "t8a",
    step: "Step 8",
    title: "First 90 Days Plan",
    kind: "Guide",
    blurb: "Stabilize, listen, and earn trust. Weekly scorecards and town hall scripts included.",
    href: "/newsletter",
    actionLabel: "Start plan",
  },
]

export default function RoadmapToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">Roadmap Tools & Templates</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Every step on the Roadmap links to a real tool, template, or story—no fluff.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Card key={t.id} className="flex flex-col">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{t.step}</Badge>
                  <Badge className="bg-[#1A73E8] text-white">{t.kind}</Badge>
                </div>
                <CardTitle className="text-xl leading-tight text-black">{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-gray-700">{t.blurb}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Button asChild className="bg-[#1A73E8] hover:bg-[#1557B0] text-white">
                    <a href={t.href}>
                      {t.actionLabel || "Open"}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  {t.secondaryHref && (
                    <Button variant="outline" asChild>
                      <a href={t.secondaryHref}>
                        {t.secondaryLabel || "Learn more"}
                        <Download className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
