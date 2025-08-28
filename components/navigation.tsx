"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Responsive */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Acquire & Build Home">
            {/* Mobile: Icon + A&B */}
            <div className="md:hidden flex items-center space-x-2">
              <Image src="/icon-192.png" alt="Acquire & Build" width={32} height={32} className="rounded" />
              <span className="text-xl font-black text-black">A&B</span>
            </div>

            {/* Desktop: Full Text */}
            <div className="hidden md:block">
              <span className="text-2xl font-black text-black">Acquire & Build</span>
            </div>
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
              href="/deal-scorecard"
              className="text-gray-700 hover:text-[#1A73E8] font-medium transition-colors"
              aria-label="Deal Score"
            >
              Deal Score     
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
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#1A73E8] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <Link
              href="/am-i-ready"
              className="block px-4 py-2 text-gray-700 hover:text-[#1A73E8] hover:bg-gray-50 font-medium transition-colors rounded-md"
              onClick={closeMenu}
              aria-label="Am I Ready Assessment"
            >
              Am I Ready?
            </Link>
             <Link
              href="/deal-scorecard"
              className="block px-4 py-2 text-gray-700 hover:text-[#1A73E8] hover:bg-gray-50 font-medium transition-colors rounded-md"
              onClick={closeMenu}
              aria-label="Deal Score"
            >
              Deal Score
            </Link>
            <Link
              href="/deal-kit"
              className="block px-4 py-2 text-gray-700 hover:text-[#1A73E8] hover:bg-gray-50 font-medium transition-colors rounded-md"
              onClick={closeMenu}
              aria-label="Deal Kit"
            >
              Deal Kit
            </Link>
            <Link
              href="/newsletter"
              className="block px-4 py-2 text-gray-700 hover:text-[#1A73E8] hover:bg-gray-50 font-medium transition-colors rounded-md"
              onClick={closeMenu}
              aria-label="Newsletter"
            >
              Newsletter
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
