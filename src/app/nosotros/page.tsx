'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DynamicStyles from '@/components/DynamicStyles'
import DynamicFavicon from '@/components/DynamicFavicon'

export default function NosotrosPage() {
  const [config, setConfig] = useState({
    companyName: 'Inmobiliaria Homez',
    siteTitle: 'Inmobiliaria Homez - Propiedades de Calidad',
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
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestra Historia
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Con más de 15 años de experiencia en el mercado inmobiliario, nos hemos consolidado como
                una de las inmobiliarias más confiables de la región. Comenzamos como un pequeño emprendimiento
                familiar y hoy somos un equipo de profesionales especializados en ayudar a las personas a
                encontrar su hogar perfecto.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestra Misión
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Facilitar el proceso de compra, venta y alquiler de propiedades, brindando un servicio
                personalizado y transparente. Nos enfocamos en entender las necesidades específicas de
                cada cliente para ofrecerle las mejores opciones del mercado.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestros Valores
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-800 mb-2">Transparencia</h3>
                  <p className="text-gray-700">
                    Información clara y honesta en cada transacción. Sin sorpresas ni costos ocultos.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Profesionalismo</h3>
                  <p className="text-gray-700">
                    Equipo capacitado y experimentado para brindar el mejor asesoramiento.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Confianza</h3>
                  <p className="text-gray-700">
                    Construimos relaciones duraderas basadas en la confianza mutua.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Compromiso</h3>
                  <p className="text-gray-700">
                    Dedicados a lograr los objetivos de nuestros clientes con excelencia.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Por Qué Elegirnos
              </h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 text-xl">•</span>
                  <span>Amplio portafolio de propiedades en las mejores ubicaciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 text-xl">•</span>
                  <span>Asesoramiento legal y financiero especializado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 text-xl">•</span>
                  <span>Atención personalizada las 24 horas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 text-xl">•</span>
                  <span>Tecnología de vanguardia para búsquedas más eficientes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 text-xl">•</span>
                  <span>Garantía de satisfacción en todos nuestros servicios</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

        <Footer config={config} />
      </div>
    </>
  )
}