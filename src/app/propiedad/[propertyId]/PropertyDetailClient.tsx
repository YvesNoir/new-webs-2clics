'use client'

import { useState, useEffect } from 'react'
import { Property, OPERATION_TYPES } from '@/lib/properties-api'
import Link from 'next/link'

interface PropertyDetailClientProps {
  propertyId: string
}

export default function PropertyDetailClient({ propertyId }: PropertyDetailClientProps) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true)
      setError(null)

      try {
        // Use the specific property endpoint to get all details including all images
        const response = await fetch(`https://api.2clics.com.ar/api/external/property/${propertyId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'api_key': 'kyw-ucv3ebh@dnp*JQVfed4ktw*yan!rqm'
          }
        })

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        // Check for API errors
        if (data.status === 'fail' || data.errors) {
          throw new Error(`Error de la API: ${data.errors ? data.errors.join(', ') : 'Error desconocido'}`)
        }

        if (!data.property) {
          throw new Error('Propiedad no encontrada. Es posible que el ID no sea válido o la propiedad ya no esté disponible.')
        }

        const foundProperty = data.property

        setProperty(foundProperty)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la propiedad')
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId])

  const formatPrice = (price: string, currency: string) => {
    const formatter = new Intl.NumberFormat('es-AR')
    return `${currency} ${formatter.format(parseFloat(price))}`
  }

  const getMetaValue = (key: string) => {
    const meta = property?.meta_data?.find(m => m.metaKey === key)
    return meta?.metaValue || ''
  }

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-64 mb-6"></div>

          {/* Gallery Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
            <div className="lg:col-span-3">
              <div className="h-96 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-20 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-4 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !property) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h1>
          <p className="text-gray-600 mb-8">{error || 'No se pudo cargar la información de esta propiedad.'}</p>
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al listado
          </Link>
        </div>
      </main>
    )
  }

  const title = getMetaValue('title') || property.address
  const description = getMetaValue('description_plain_text') || ''
  const operationTypeName = OPERATION_TYPES[property.operationType as keyof typeof OPERATION_TYPES] || property.operationType
  const images = property.images || []

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-orange-600">Inicio</Link>
        <span>/</span>
        <Link href="/propiedades" className="hover:text-orange-600">Propiedades</Link>
        <span>/</span>
        <span className="text-gray-900">{title}</span>
      </nav>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        {/* Main Image */}
        <div className="lg:col-span-3">
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden cursor-pointer group"
               onClick={() => setShowImageModal(true)}>
            <img
              src={images[selectedImageIndex]?.url || '/placeholder-property.svg'}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-property.svg'
              }}
            />
            {/* Overlay with view more button */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-opacity duration-300">
                Ver todas las fotos ({images.length})
              </button>
            </div>

            {/* Operation Type Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                {operationTypeName}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="space-y-4">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={image.imageId}
              className={`relative h-20 lg:h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                selectedImageIndex === index ? 'border-orange-500' : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image.thumbnailUrl || image.url}
                alt={`${title} - Imagen ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-property.svg'
                }}
              />
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    +{images.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Property Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    {property.neighborhood?.name && `${property.neighborhood.name}, `}
                    {property.city?.name}
                    {property.state?.name && `, ${property.state.name}`}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {formatPrice(property.price, property.currency)}
                </div>
                <div className="text-sm text-gray-600">
                  {property.operationType === 'ALQUILER_PERMANENTE' ? 'por mes' : ''}
                </div>
              </div>
            </div>

            {/* Property Features */}
            <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-lg">
              {property.amountBedroom > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  <span className="font-medium">{property.amountBedroom}</span>
                  <span className="text-gray-600">Dormitorios</span>
                </div>
              )}

              {property.amountRoom > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-medium">{property.amountRoom}</span>
                  <span className="text-gray-600">Ambientes</span>
                </div>
              )}

              {property.coveredArea && parseFloat(property.coveredArea) > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="font-medium">{Math.round(parseFloat(property.coveredArea))}</span>
                  <span className="text-gray-600">m² cubiertos</span>
                </div>
              )}

              {property.totalArea && parseFloat(property.totalArea) > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="font-medium">{Math.round(parseFloat(property.totalArea))}</span>
                  <span className="text-gray-600">m² totales</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-medium">{property.propertyType?.name}</span>
                <span className="text-gray-600">Tipo</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Descripción</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
          )}

          {/* Property Details */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Detalles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID de propiedad:</span>
                  <span className="font-medium">{property.propertyId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo de operación:</span>
                  <span className="font-medium">{operationTypeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo de propiedad:</span>
                  <span className="font-medium">{property.propertyType?.name}</span>
                </div>
                {property.amountBedroom > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dormitorios:</span>
                    <span className="font-medium">{property.amountBedroom}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {property.amountRoom > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ambientes:</span>
                    <span className="font-medium">{property.amountRoom}</span>
                  </div>
                )}
                {property.coveredArea && parseFloat(property.coveredArea) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Superficie cubierta:</span>
                    <span className="font-medium">{parseFloat(property.coveredArea)} m²</span>
                  </div>
                )}
                {property.totalArea && parseFloat(property.totalArea) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Superficie total:</span>
                    <span className="font-medium">{parseFloat(property.totalArea)} m²</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Moneda:</span>
                  <span className="font-medium">{property.currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Map */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ubicación</h2>

            {/* Address Info */}
            <div className="mb-6">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">{property.address}</div>
                  <div className="text-sm text-gray-600">
                    {property.neighborhood?.name && `${property.neighborhood.name}, `}
                    {property.city?.name}
                    {property.state?.name && `, ${property.state.name}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
              {property.lat && property.long ? (
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${property.lat},${property.long}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  onError={() => {
                    // Fallback to static map if Google Maps API fails
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm">Ubicación en el mapa</p>
                  </div>
                </div>
              )}

              {/* Map Overlay with coordinates */}
              {property.lat && property.long && (
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg text-sm">
                  <span className="text-gray-600">Coordenadas:</span>
                  <span className="font-medium ml-1">{property.lat.toFixed(6)}, {property.long.toFixed(6)}</span>
                </div>
              )}

              {/* Open in Maps Button */}
              {property.lat && property.long && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${property.lat},${property.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 bg-white hover:bg-gray-50 p-2 rounded-lg shadow-sm transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

            {/* Quick directions */}
            {property.lat && property.long && (
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${property.lat},${property.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Cómo llegar
                </a>
                <a
                  href={`https://www.google.com/maps/search/restaurants+near+${property.lat},${property.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Lugares cercanos
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contactar</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Mensaje"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  defaultValue={`Hola, estoy interesado en la propiedad ${title}. ¿Podrían brindarme más información?`}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Enviar consulta
              </button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Acciones</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                </svg>
                WhatsApp
              </button>

              <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar
              </button>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Guardar
              </button>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={images[selectedImageIndex]?.url}
              alt={title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}