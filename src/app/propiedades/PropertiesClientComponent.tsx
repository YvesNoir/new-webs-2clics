'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { fetchProperties, PropertyFilters as PropertyFiltersType, PropertyResponse } from '@/lib/properties-api'
import PropertyCard from '@/components/PropertyCard'
import PropertyFilters from '@/components/PropertyFilters'

interface PropertiesClientComponentProps {
  pageTitle?: string
  initialFilters?: PropertyFiltersType
}

export default function PropertiesClientComponent({ pageTitle, initialFilters }: PropertiesClientComponentProps = {}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [properties, setProperties] = useState<PropertyResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PropertyFiltersType>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [config, setConfig] = useState<any>(null)

  const propertiesPerPage = 12

  // Function to update URL with current filters
  const updateURLWithFilters = useCallback((newFilters: PropertyFiltersType) => {
    const params = new URLSearchParams()

    if (newFilters.property_type?.[0]) params.set('tipo', newFilters.property_type[0])
    if (newFilters.operation_type?.[0]) params.set('operacion', newFilters.operation_type[0])
    if (newFilters.location) params.set('ubicacion', newFilters.location)
    if (newFilters.min_price) params.set('precio-min', newFilters.min_price)
    if (newFilters.max_price) params.set('precio-max', newFilters.max_price)

    // Map API currency values to URL-friendly values
    if (newFilters.currency) {
      const currencyMap: { [key: string]: string } = {
        'U$D': 'USD',
        'AR$': 'ARS'
      }
      params.set('moneda', currencyMap[newFilters.currency] || newFilters.currency)
    }

    const queryString = params.toString()
    const newURL = queryString ? `/propiedades?${queryString}` : '/propiedades'

    // Update URL without redirect
    router.replace(newURL)
  }, [router])

  // Initialize filters from URL query params and initialFilters
  useEffect(() => {
    const combinedFilters: PropertyFiltersType = { ...initialFilters }

    // Read URL parameters and convert them to filters (URL params take priority)
    const tipo = searchParams.get('tipo')
    const operacion = searchParams.get('operacion')
    const ubicacion = searchParams.get('ubicacion')
    const precioMin = searchParams.get('precio-min')
    const precioMax = searchParams.get('precio-max')
    const moneda = searchParams.get('moneda')

    if (tipo) combinedFilters.property_type = [tipo]
    if (operacion) combinedFilters.operation_type = [operacion]
    if (ubicacion) combinedFilters.location = ubicacion
    if (precioMin) combinedFilters.min_price = precioMin
    if (precioMax) combinedFilters.max_price = precioMax

    // Map URL currency values to API values
    if (moneda) {
      const currencyMap: { [key: string]: string } = {
        'USD': 'U$D',
        'ARS': 'AR$'
      }
      combinedFilters.currency = (currencyMap[moneda] || moneda) as "U$D" | "AR$"
    }

    setFilters(combinedFilters)

    // Debug: log filters being set
    console.log('🎯 Setting filters from URL params and initialFilters:', combinedFilters)
  }, [searchParams, initialFilters])

  // Load site configuration
  useEffect(() => {
    fetch('/api/site-config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Error loading site config:', err))
  }, [])

  // Load properties
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true)
      setError(null)

      try {
        const offset = (currentPage - 1) * propertiesPerPage
        const finalFilters = Object.keys(filters).length > 0 ? filters : undefined

        console.log('🔍 About to call fetchProperties with:', {
          offset,
          limit: propertiesPerPage,
          filters: finalFilters
        })

        const response = await fetchProperties({
          offset,
          limit: propertiesPerPage,
          filters: finalFilters
        })

        setProperties(response)
      } catch (err) {
        setError('Error al cargar las propiedades')
        console.error('Error loading properties:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [filters, currentPage])


  const handleFiltersChange = (newFilters: PropertyFiltersType) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
    // Update URL with query parameters
    updateURLWithFilters(newFilters)
  }

  const totalPages = properties ? Math.ceil(properties.total / propertiesPerPage) : 0

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar propiedades</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {(() => {
            if (pageTitle) return pageTitle

            const operationType = filters.operation_type?.[0]
            const propertyType = filters.property_type?.[0]

            // Property type mapping for display (API IDs to display names in plural)
            const propertyDisplayMap: { [key: string]: string } = {
              '5791': 'Casas',
              '5785': 'Departamentos',
              '5790': 'Oficinas',
              '5793': 'Chalets',
              '5781': 'Casas Quinta',
              '5795': 'Dúplex',
              '5792': 'PH',
              '5794': 'Terrenos',
              '5780': 'Locales Comerciales'
            }

            // Operation type mapping for display (API values to display names)
            const operationDisplayMap: { [key: string]: string } = {
              'VENTA': 'en Venta',
              'ALQUILER_PERMANENTE': 'en Alquiler',
              'ALQUILER_TEMPORARIO': 'Alquiler Temporario'
            }

            if (operationType) {
              const location = filters.location

              if (propertyType) {
                // Case: Tipología + Operación -> "Departamentos en Venta"
                const propertyName = propertyDisplayMap[propertyType]
                const operationName = operationDisplayMap[operationType]
                let title = `${propertyName} ${operationName}`

                // Add location if present: "Departamentos en Venta en Coghlan"
                if (location) {
                  title += ` en ${location}`
                }

                return title
              } else {
                // Case: Solo Operación -> "Propiedades en Venta"
                let title = ''
                if (operationType === 'VENTA') title = 'Propiedades en Venta'
                else if (operationType === 'ALQUILER_PERMANENTE') title = 'Propiedades en Alquiler'
                else if (operationType === 'ALQUILER_TEMPORARIO') title = 'Propiedades Alquiler Temporario'

                // Add location if present: "Propiedades en Venta en Coghlan"
                if (location && title) {
                  title += ` en ${location}`
                }

                return title
              }
            }

            return pageTitle || 'Propiedades'
          })()}
        </h1>
        <p className="text-gray-600">
          {properties && !loading ? (
            `${properties.total} propiedades encontradas`
          ) : (
            'Buscando propiedades...'
          )}
        </p>
      </div>

      {/* Horizontal Filters */}
      <PropertyFilters
        onFiltersChange={handleFiltersChange}
        isLoading={loading}
        initialFilters={filters}
        config={config}
      />

      {/* Results Section */}
      <div>
        {loading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: propertiesPerPage }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 animate-pulse">
                <div className="h-56 bg-gray-300"></div>
                <div className="p-5">
                  <div className="h-8 bg-gray-300 rounded mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                        <div className="h-4 bg-gray-300 rounded w-14"></div>
                      </div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : properties && properties.data && properties.data.length > 0 ? (
          <>
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Mostrando {((currentPage - 1) * propertiesPerPage) + 1} - {Math.min(currentPage * propertiesPerPage, properties.total)} de {properties.total} propiedades
              </p>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-orange-500 focus:border-orange-500">
                  <option value="newest">Más recientes</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="area">Superficie</option>
                </select>
              </div>
            </div>

            {/* Properties Grid - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {properties.data.map((property) => (
                <PropertyCard key={property.propertyId} property={property} config={config} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNumber
                  if (totalPages <= 7) {
                    pageNumber = i + 1
                  } else if (currentPage <= 4) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 3) {
                    pageNumber = totalPages - 6 + i
                  } else {
                    pageNumber = currentPage - 3 + i
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          /* No Properties Found */
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron propiedades</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              No pudimos encontrar propiedades que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros.
            </p>
            <button
              onClick={() => handleFiltersChange({})}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Limpiar todos los filtros
            </button>
          </div>
        )}
      </div>
    </main>
  )
}