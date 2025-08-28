export function trackUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {}

  const urlParams = new URLSearchParams(window.location.search)
  const utmParams: Record<string, string> = {}

  // Track standard UTM parameters
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]

  utmKeys.forEach((key) => {
    const value = urlParams.get(key)
    if (value) {
      utmParams[key] = value
    }
  })

  // Also capture referrer
  if (document.referrer) {
    utmParams.referrer = document.referrer
  }

  // Store in sessionStorage for persistence across page loads
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem("deal_scorecard_utm", JSON.stringify(utmParams))
  } else {
    // Try to get from sessionStorage if no UTM params in current URL
    const stored = sessionStorage.getItem("deal_scorecard_utm")
    if (stored) {
      return JSON.parse(stored)
    }
  }

  return utmParams
}

export function trackFormStart() {
  if (typeof window === "undefined") return

  // Track form start event
  if (typeof gtag !== "undefined") {
    gtag("event", "form_start", {
      event_category: "deal_scorecard",
      event_label: "business_snapshot",
    })
  }
}

export function trackFormStep(step: number, stepName: string) {
  if (typeof window === "undefined") return

  // Track form step completion
  if (typeof gtag !== "undefined") {
    gtag("event", "form_step_complete", {
      event_category: "deal_scorecard",
      event_label: stepName,
      custom_parameter_1: step,
    })
  }
}

export function trackEmailCapture(email: string) {
  if (typeof window === "undefined") return

  // Track email capture event
  if (typeof gtag !== "undefined") {
    gtag("event", "email_capture", {
      event_category: "deal_scorecard",
      event_label: "cash_flow_unlock",
    })
  }
}

export function trackFormCompletion(overallScore: number) {
  if (typeof window === "undefined") return

  // Track form completion
  if (typeof gtag !== "undefined") {
    gtag("event", "form_complete", {
      event_category: "deal_scorecard",
      event_label: "full_scorecard",
      value: overallScore,
    })
  }
}

// Declare gtag for TypeScript
declare global {
  function gtag(...args: any[]): void
}
