import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, BarChart3, Database, Mail } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your website content and subscribers</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Subscribers Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Newsletter Subscribers
              </CardTitle>
              <CardDescription>View and manage newsletter subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/subscribers">
                <Button className="w-full">View Subscribers</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Lead Magnet Subscribers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Lead Magnet Subscribers
              </CardTitle>
              <CardDescription>View lead magnet download subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/lead-magnet-subscribers">
                <Button className="w-full">View Lead Subscribers</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contact Form Submissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Contact Submissions
              </CardTitle>
              <CardDescription>View contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/contacts">
                <Button className="w-full">View Contacts</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Blog Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Blog Posts
              </CardTitle>
              <CardDescription>Manage blog content</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/blog">
                <Button className="w-full">Manage Blog</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Analytics
              </CardTitle>
              <CardDescription>View website analytics and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/deal-kit-analytics">
                <Button className="w-full">View Analytics</Button>
              </Link>
            </CardContent>
          </Card>

          {/* DatoCMS Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                DatoCMS Setup
              </CardTitle>
              <CardDescription>Configure DatoCMS integration</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/datocms-setup">
                <Button className="w-full">Setup DatoCMS</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/debug-datocms">
              <Button variant="outline" className="w-full bg-transparent">
                Debug DatoCMS
              </Button>
            </Link>
            <Link href="/debug-newsletter">
              <Button variant="outline" className="w-full bg-transparent">
                Test Newsletter
              </Button>
            </Link>
            <Link href="/deal-kit-setup">
              <Button variant="outline" className="w-full bg-transparent">
                Deal Kit Setup
              </Button>
            </Link>
            <Link href="/debug-homepage">
              <Button variant="outline" className="w-full bg-transparent">
                Debug Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
