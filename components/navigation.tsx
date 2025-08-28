"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  hideNavigation?: boolean
}

export default function Navigation({ hideNavigation = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (hideNavigation) {
    return null
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Acquire & Build Home">
            <Image src="/apple-touch-icon.png" alt="Acquire & Build" width={32} height={32} className="rounded-md" />
            <span className="font-black text-xl text-black hidden sm:inline">Acquire & Build</span>
            <span className="font-black text-xl text-black sm:hidden">A&B</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/am-i-ready"
              className="text-gray-700 hover:text-[#1A73E8] font-medium transition-colors"
              aria-label="Am I Ready Assessment"
            >
              Am I Ready?
            </Link>
            <Link
              href="/deal-kit"
              className="text-gray-700 hover:text-[#1A73E8] font-medium transition-colors"
              aria-label="Deal Kit"
            >
              Deal Kit
            </Link>
            <Link
              href="/newsletter"
              className="text-gray-700 hover:text-[#1A73E8] font-medium transition-colors"
              aria-label="Newsletter"
            >
              Newsletter
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <Link
              href="/am-i-ready"
              className="block text-gray-700 hover:text-[#1A73E8] font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Am I Ready?
            </Link>
            <Link
              href="/deal-kit"
              className="block text-gray-700 hover:text-[#1A73E8] font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Deal Kit
            </Link>
            <Link
              href="/newsletter"
              className="block text-gray-700 hover:text-[#1A73E8] font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Newsletter
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
