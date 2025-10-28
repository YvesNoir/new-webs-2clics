'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeroVariant4Props {
  config?: {
    companyName: string
    primaryColor: string
    secondaryColor: string
    videoUrl?: string
    heroTitle?: string
    heroSubtitle?: string
  }
}

interface SearchFilters {
  operationType: 'buy' | 'rent' | 'sold'
  propertyType: string
  location: string
  priceMin: string
  priceMax: string
  currency: 'U$D' | 'AR$'
}

export default function HeroVariant4({ config }: HeroVariant4Props = {}) {
  const router = useRouter()
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    operationType: 'buy',
    propertyType: '',
    location: '',
    priceMin: '',
    priceMax: '',
    currency: 'U$D'
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const videoId = config?.videoUrl ? getYouTubeVideoId(config.videoUrl) : null

  const handleSearch = () => {
    // Simple query param based search
    const params = new URLSearchParams()

    // Map operation types to API values
    const operationMap: { [key: string]: string } = {
      'buy': 'VENTA',
      'rent': 'ALQUILER_PERMANENTE',
      'sold': 'ALQUILER_TEMPORARIO'
    }

    // Map property types to API values
    const propertyTypeMap: { [key: string]: string } = {
      '': '',
      'house': '5791', // Casa
      'apartment': '5785', // Departamento
      'office': '5790', // Oficina
      'villa': '5793'  // Chalet
    }

    // Add operation filter
    if (searchFilters.operationType) {
      const apiOperation = operationMap[searchFilters.operationType]
      if (apiOperation) {
        params.set('operacion', apiOperation)
      }
    }

    // Add property type filter
    if (searchFilters.propertyType) {
      params.set('tipo', searchFilters.propertyType)
    }

    // Add other filters
    if (searchFilters.location) params.set('ubicacion', searchFilters.location)
    if (searchFilters.priceMin) params.set('precio-min', searchFilters.priceMin)
    if (searchFilters.priceMax) params.set('precio-max', searchFilters.priceMax)

    // Map API currency values to URL-friendly values
    if (searchFilters.currency) {
      const currencyMap: { [key: string]: string } = {
        'U$D': 'USD',
        'AR$': 'ARS'
      }
      params.set('moneda', currencyMap[searchFilters.currency] || searchFilters.currency)
    }

    // Navigate to simple propiedades page with query params
    const queryString = params.toString()
    const url = queryString ? `/propiedades?${queryString}` : '/propiedades'

    console.log('🚀 Searching with URL:', url)
    router.push(url)
  }

  return (
    <section className="py-12 px-2 sm:px-4 lg:px-6">
      <div className="max-w-[1400px] mx-auto relative min-h-[600px] rounded-2xl overflow-hidden flex items-center justify-start">
        {/* Video Background */}
        {videoId ? (
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&start=0&end=0&enablejsapi=1`}
              className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              frameBorder="0"
              allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
              allowFullScreen
              title="Background Video"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ) : (
          // Fallback gradient background
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl"></div>
        )}

        {/* Content */}
        <div className="relative z-10 w-full max-w-none px-12 sm:px-16 lg:px-20" style={{ width: '70%' }}>
        <div className="text-left mb-12">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {config?.heroTitle || 'Easy Way to Find a Perfect Property'}
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-white/90 mb-12 max-w-xl">
            {config?.heroSubtitle || 'From as low as $10 per day with limited time offer discounts'}
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl">
          <div>
            {/* Operation Type Tabs - Left aligned with background */}
            <div className="flex mb-4">
              {[
                { key: 'buy', label: 'Comprar' },
                { key: 'rent', label: 'Alquilar' },
                { key: 'sold', label: 'Temporario' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSearchFilters(prev => ({ ...prev, operationType: tab.key as any }))}
                  className={`py-2 px-4 font-medium transition-colors first:rounded-l-lg last:rounded-r-lg border-b-2 ${
                    searchFilters.operationType === tab.key
                      ? 'bg-white text-gray-900 border-orange-500 shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:text-gray-900 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Bar with inline buttons */}
            <div className="w-full">
              <div className="flex gap-2 mb-6 bg-white rounded-lg p-2">
                <div className="flex-[3] relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar por ubicación"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border-0 bg-transparent focus:outline-none text-sm"
                  />
                </div>

                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center space-x-1 px-4 py-3 hover:bg-gray-50 transition-colors whitespace-nowrap text-sm rounded"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  <span className="text-gray-700 font-medium">Más filtros</span>
                </button>

                <button
                  onClick={handleSearch}
                  className="p-3 bg-black hover:bg-gray-800 text-white rounded-full transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de propiedad</label>
                    <select
                      value={searchFilters.propertyType}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Todos</option>
                      <option value="house">Casa</option>
                      <option value="apartment">Departamento</option>
                      <option value="office">Oficina</option>
                      <option value="villa">Villa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio mínimo</label>
                    <input
                      type="number"
                      placeholder="Precio.mín"
                      value={searchFilters.priceMin}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio máximo</label>
                    <input
                      type="number"
                      placeholder="Precio.máx"
                      value={searchFilters.priceMax}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                    <div className="flex items-center space-x-3 h-10">
                      <span className={`text-sm font-medium ${searchFilters.currency === 'U$D' ? 'text-orange-600' : 'text-gray-500'}`}>USD</span>
                      <button
                        onClick={() => setSearchFilters(prev => ({ ...prev, currency: prev.currency === 'U$D' ? 'AR$' : 'U$D' }))}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        style={{ backgroundColor: searchFilters.currency === 'U$D' ? '#f97316' : '#d1d5db' }}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            searchFilters.currency === 'U$D' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className={`text-sm font-medium ${searchFilters.currency === 'AR$' ? 'text-orange-600' : 'text-gray-500'}`}>ARS</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}