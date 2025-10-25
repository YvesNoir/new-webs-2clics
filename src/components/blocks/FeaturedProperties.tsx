'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Property, OPERATION_TYPES } from '@/lib/properties-api'

interface FeaturedPropertiesProps {
  config?: {
    companyName: string
    primaryColor: string
  }
}

const formatPrice = (price: string, currency: string) => {
  const formatter = new Intl.NumberFormat('es-AR')
  return `${currency} ${formatter.format(parseFloat(price))}`
}

export default function FeaturedProperties({ config }: FeaturedPropertiesProps = {}) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch latest properties from API
  useEffect(() => {
    const fetchLatestProperties = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://api.2clics.com.ar/api/external/properties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api_key': 'kyw-ucv3ebh@dnp*JQVfed4ktw*yan!rqm'
          },
          body: JSON.stringify({
            offset: 0,
            limit: 8,
            filters: {}
          })
        })

        if (!response.ok) {
          throw new Error('Error al cargar las propiedades')
        }

        const data = await response.json()

        if (data.status === 'fail' || data.errors) {
          throw new Error('Error de la API al cargar propiedades')
        }

        // Take the first 8 properties (latest ones)
        const latestProperties = (data.properties || []).slice(0, 8)
        setProperties(latestProperties)
      } catch (err) {
        console.error('Error loading latest properties:', err)
        setError('Error al cargar las propiedades')
      } finally {
        setLoading(false)
      }
    }

    fetchLatestProperties()
  }, [])

  // Helper function to get property title
  const getPropertyTitle = (property: Property) => {
    const titleMeta = property.meta_data?.find(m => m.metaKey === 'title')
    return titleMeta?.metaValue || `${property.propertyType?.name || 'Propiedad'} en ${property.neighborhood?.name || property.city?.name}`
  }

  // Helper function to get property description
  const getPropertyDescription = (property: Property) => {
    const descMeta = property.meta_data?.find(m => m.metaKey === 'description_plain_text')
    return descMeta?.metaValue || ''
  }

  // Helper function to limit title to 7 words
  const getLimitedTitle = (property: Property) => {
    const fullTitle = getPropertyTitle(property)
    const words = fullTitle.split(' ')
    if (words.length <= 7) {
      return fullTitle
    }
    return words.slice(0, 7).join(' ') + '...'
  }

  return (
    <section className="py-52 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Últimas Propiedades
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre las propiedades más recientes que hemos añadido a nuestro catálogo.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">
              {error}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Intentar nuevamente
            </button>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {properties.map((property) => (
            <div
              key={property.propertyId}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Property Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={property.images?.[0]?.url || '/placeholder-property.svg'}
                  alt={getPropertyTitle(property)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-property.svg'
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    property.operationType === 'VENTA' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {OPERATION_TYPES[property.operationType as keyof typeof OPERATION_TYPES] || property.operationType}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                    <svg
                      className="w-4 h-4 text-gray-600 hover:text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight h-12 overflow-hidden">
                    {getLimitedTitle(property)}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {property.neighborhood?.name && `${property.neighborhood.name}, `}
                    {property.city?.name}
                  </p>
                </div>

                {/* Property Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  {property.amountBedroom > 0 && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      {property.amountBedroom} hab
                    </div>
                  )}
                  {property.amountRoom > 0 && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      {property.amountRoom} amb
                    </div>
                  )}
                  {property.coveredArea && parseFloat(property.coveredArea) > 0 && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      {Math.round(parseFloat(property.coveredArea))}m²
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="text-xl font-bold" style={{ color: config?.primaryColor || '#ea5a0c' }}>
                  {formatPrice(property.price, property.currency)}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/propiedades"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Ver Todas las Propiedades</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}