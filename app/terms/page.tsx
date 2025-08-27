import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Acquire & Build - Learn about the terms and conditions for using our website and services.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://acquireandbuild.com/terms",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using the Acquire & Build website and services, you accept and agree to be bound by the
                terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
              <p className="mb-4">
                Acquire & Build provides educational content, newsletters, tools, and resources related to business
                acquisition. Our services include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Newsletter subscription and educational content</li>
                <li>Deal Readiness Scorecard assessment tool</li>
                <li>Deal Kit resources and templates</li>
                <li>Blog articles and business acquisition insights</li>
                <li>Contact and consultation services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and complete information when using our services</li>
                <li>Use our services for lawful purposes only</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not distribute malware or engage in harmful activities</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Educational Content Disclaimer</h2>
              <p className="mb-4">
                The information provided on this website is for educational purposes only and should not be considered
                as professional financial, legal, or business advice. Always consult with qualified professionals before
                making business acquisition decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including text, graphics, logos, images, and software, is the property of
                Acquire & Build and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                Acquire & Build shall not be liable for any direct, indirect, incidental, special, or consequential
                damages resulting from the use or inability to use our services, even if we have been advised of the
                possibility of such damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting on this website. Your continued use of our services constitutes acceptance of any modifications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your access to our services at any time, without prior notice, for conduct
                that we believe violates these terms or is harmful to other users or our business.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p className="mb-4">
                These terms shall be governed by and construed in accordance with the laws of the United States, without
                regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="mb-4">If you have any questions about these Terms of Service, please contact us at:</p>
              <p className="mb-2">
                <strong>Email:</strong> legal@acquireandbuild.com
              </p>
              <p className="mb-2">
                <strong>Website:</strong>{" "}
                <a href="/contact" className="text-blue-600 hover:underline">
                  Contact Form
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
