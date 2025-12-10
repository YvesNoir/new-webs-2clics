'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DynamicStyles from '@/components/DynamicStyles'
import DynamicFavicon from '@/components/DynamicFavicon'

export default function NosotrosPage() {
  const [config, setConfig] = useState({
    companyName: '',
    siteTitle: '',
    siteDescription: 'Tu inmobiliaria de confianza, especializada en la venta y alquiler de propiedades',
    logo: '',
    favicon: '',
    address: '',
    schedule: '',
    phone: '',
    whatsapp: '',
    email: '',
    primaryColor: '#f97316',
    secondaryColor: '#1f2937',
    nosotrosTitle: 'Sobre Nosotros',
    nosotrosDescription: 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
  })

  const getNosotrosData = async () => {
    try {
      const response = await fetch('/api/site-config')
      if (response.ok) {
        const configData = await response.json()
        setConfig(configData)
      }
    } catch (error) {
      console.error('Error loading nosotros data:', error)
    }
  }

  useEffect(() => {
    getNosotrosData()

    // Escuchar mensajes del admin panel para actualizaciones en tiempo real
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'updateSiteConfig') {
        setConfig(event.data.config)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <>
      <DynamicStyles primaryColor={config.primaryColor} secondaryColor={config.secondaryColor} />
      <DynamicFavicon faviconUrl={config.favicon} />

      <div className="min-h-screen bg-gray-50">
        <Header config={config} />
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              {config.nosotrosTitle || 'Sobre Nosotros'}
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              {config.nosotrosDescription || 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="space-y-8">
            {/* Contenido Adicional Dinámico */}
            {config.nosotrosContent && (
              <div>
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: config.nosotrosContent
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        <Footer config={config} />
      </div>
    </>
  )
}