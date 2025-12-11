'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DynamicStyles from '@/components/DynamicStyles'
import DynamicFavicon from '@/components/DynamicFavicon'

export default function TasacionesPage() {
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
    tasacionesTitle: 'Tasaciones',
    tasacionesDescription: 'Obtén una tasación profesional de tu propiedad de forma gratuita.',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
  })

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    contenido: '',
    direccionPropiedad: '',
    barrio: '',
    tipologiaPropiedad: 'casa',
    operacionPropiedad: 'venta'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const getTasacionesData = async () => {
    try {
      const response = await fetch('/api/site-config')
      if (response.ok) {
        const configData = await response.json()
        setConfig(configData)
      }
    } catch (error) {
      console.error('Error loading tasaciones data:', error)
    }
  }

  useEffect(() => {
    getTasacionesData()

    // Escuchar mensajes del admin panel para actualizaciones en tiempo real
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'updateSiteConfig') {
        setConfig(event.data.config)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/tasaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage('¡Solicitud enviada exitosamente! Nos contactaremos contigo pronto.')
        setFormData({
          nombre: '',
          telefono: '',
          correo: '',
          contenido: '',
          direccionPropiedad: '',
          barrio: '',
          tipologiaPropiedad: 'casa',
          operacionPropiedad: 'venta'
        })
      } else {
        setSubmitMessage('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                {config.tasacionesTitle || 'Tasaciones'}
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                {config.tasacionesDescription || 'Obtén una tasación profesional de tu propiedad de forma gratuita.'}
              </p>
            </div>
          </div>
        </div>

        {/* Formulario Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Solicitar Tasación Gratuita
              </h2>
              <p className="text-lg text-gray-600">
                Completa el formulario y nuestro equipo de expertos te contactará para brindarte una tasación profesional de tu propiedad.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Datos Personales */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+54 11 1234-5678"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  required
                  value={formData.correo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Información de la Propiedad */}
              <div className="border-t pt-6 mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Información de la Propiedad</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="direccionPropiedad" className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección de la Propiedad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="direccionPropiedad"
                      name="direccionPropiedad"
                      required
                      value={formData.direccionPropiedad}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Av. Corrientes 1234, Buenos Aires"
                    />
                  </div>

                  <div>
                    <label htmlFor="barrio" className="block text-sm font-medium text-gray-700 mb-2">
                      Barrio <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="barrio"
                      name="barrio"
                      required
                      value={formData.barrio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Palermo, Belgrano, etc."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="tipologiaPropiedad" className="block text-sm font-medium text-gray-700 mb-2">
                      Tipología de Propiedad <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="tipologiaPropiedad"
                      name="tipologiaPropiedad"
                      required
                      value={formData.tipologiaPropiedad}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="casa">Casa</option>
                      <option value="departamento">Departamento</option>
                      <option value="ph">PH (Casa Chorizo)</option>
                      <option value="duplex">Dúplex</option>
                      <option value="oficina">Oficina</option>
                      <option value="local">Local Comercial</option>
                      <option value="terreno">Terreno</option>
                      <option value="quinta">Quinta</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="operacionPropiedad" className="block text-sm font-medium text-gray-700 mb-2">
                      Operación <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="operacionPropiedad"
                      name="operacionPropiedad"
                      required
                      value={formData.operacionPropiedad}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="venta">Venta</option>
                      <option value="alquiler">Alquiler</option>
                      <option value="alquiler-temporal">Alquiler Temporal</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mensaje Adicional */}
              <div>
                <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-2">
                  Información Adicional
                </label>
                <textarea
                  id="contenido"
                  name="contenido"
                  rows={4}
                  value={formData.contenido}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Cuéntanos más detalles sobre tu propiedad: metros cuadrados, habitaciones, características especiales, etc."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    'Solicitar Tasación Gratuita'
                  )}
                </button>

                {/* Success/Error Message */}
                {submitMessage && (
                  <div className={`mt-4 p-4 rounded-md text-center ${
                    submitMessage.includes('exitosamente')
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitMessage}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <Footer config={config} />
      </div>
    </>
  )
}