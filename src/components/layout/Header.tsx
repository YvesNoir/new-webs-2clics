'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
  config?: {
    companyName: string
    siteTitle?: string
    logo?: string
    primaryColor: string
    phone?: string
    whatsapp?: string
    email?: string
  }
}

export default function Header({ config }: HeaderProps = {}) {
  const companyName = config?.companyName || 'Homez'
  const primaryColor = config?.primaryColor || '#f97316'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              {config?.logo ? (
                <img
                  src={config.logo}
                  alt={companyName}
                  className="h-10 max-w-[180px] object-contain"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span className="text-white font-bold text-xl">
                      {companyName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{companyName}</span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ml-auto">
            <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium">
              Inicio
            </Link>

            <Link href="/propiedades" className="text-gray-700 hover:text-orange-500 font-medium">
              Propiedades
            </Link>


            <Link href="/nosotros" className="text-gray-700 hover:text-orange-500 font-medium">
              Nosotros
            </Link>

            <Link href="/tasaciones" className="text-gray-700 hover:text-orange-500 font-medium">
              Tasaciones
            </Link>

            <Link href="/contacto" className="text-gray-700 hover:text-orange-500 font-medium">
              Contacto
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link href="/" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
                Inicio
              </Link>
              <Link href="/propiedades" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
                Propiedades
              </Link>
              <Link href="/nosotros" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
                Nosotros
              </Link>
              <Link href="/tasaciones" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
                Tasaciones
              </Link>
              <Link href="/contacto" className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">
                Contacto
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}