import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://acquiretobuild.com"

  // Paths we never want crawled/indexed (internal tools, PII, debug, raw APIs)
  const DISALLOW = [
    "/admin",
    "/api/",
    "/datocms-setup",
    "/deal-kit-setup",
    "/deal-kit-analytics",
    "/debug-datocms",
    "/debug-homepage",
    "/debug-newsletter",
    "/lead-magnet-subscribers",
    "/subscribers",
  ]

  return {
    rules: [
      // One sensible default for everyone (Google, Bing, LLM bots, etc.)
      {
        userAgent: "*",
        allow: "/",
        // IMPORTANT: do NOT list "/_next/" here — Google may need JS/CSS to render.
        // No need to block favicon/manifest either; they’re small and harmless.
        disallow: DISALLOW,
      },

      // (Optional) If you ever want different treatment for a specific bot,
      // add a new entry here. Otherwise the "*" rule above is sufficient.
      // {
      //   userAgent: "Googlebot",
      //   allow: "/",
      //   disallow: DISALLOW,
      // },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // Google ignores the "host" directive; keeping it out avoids confusion.
    // host: baseUrl,
  }
}
