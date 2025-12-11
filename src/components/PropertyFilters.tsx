'use client'

import { useState, useEffect, useRef } from 'react'
import { PropertyFilters as IPropertyFilters, PROPERTY_TYPES, OPERATION_TYPES, BEDROOMS_OPTIONS, ROOMS_OPTIONS, CURRENCY_OPTIONS } from '@/lib/properties-api'
import LocationAutocomplete from './LocationAutocomplete'

interface PropertyFiltersProps {
  onFiltersChange: (filters: IPropertyFilters) => void
  isLoading?: boolean
  initialFilters?: IPropertyFilters
  config?: {
    primaryColor?: string
    secondaryColor?: string
  }
}

export default function PropertyFilters({ onFiltersChange, isLoading = false, initialFilters = {}, config }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<IPropertyFilters>(initialFilters)
  // Estado temporal para los precios (no afecta filtros hasta que se presiona buscar)
  const [tempPrices, setTempPrices] = useState({
    min_price: initialFilters.min_price || '',
    max_price: initialFilters.max_price || ''
  })
  const locationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Sync with external filters
  useEffect(() => {
    setFilters(initialFilters)
    setTempPrices({
      min_price: initialFilters.min_price || '',
      max_price: initialFilters.max_price || ''
    })
  }, [initialFilters])
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Cleanup timeout cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (locationTimeoutRef.current) {
        clearTimeout(locationTimeoutRef.current)
      }
    }
  }, [])

  const handleFilterChange = (key: keyof IPropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleArrayFilterChange = (key: keyof IPropertyFilters, value: string, checked: boolean) => {
    const currentArray = (filters[key] as string[]) || []
    let newArray: string[]

    if (checked) {
      newArray = [...currentArray, value]
    } else {
      newArray = currentArray.filter(item => item !== value)
    }

    handleFilterChange(key, newArray.length > 0 ? newArray : undefined)
  }

  const applyPriceFilters = () => {
    const newFilters = { ...filters }
    if (tempPrices.min_price) {
      newFilters.min_price = tempPrices.min_price
    } else {
      delete newFilters.min_price
    }
    if (tempPrices.max_price) {
      newFilters.max_price = tempPrices.max_price
    } else {
      delete newFilters.max_price
    }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    setFilters({})
    setTempPrices({ min_price: '', max_price: '' })
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof IPropertyFilters]
    return value && (Array.isArray(value) ? value.length > 0 : true)
  })

  const getActiveFiltersCount = () => {
    return Object.keys(filters).filter(key => {
      const value = filters[key as keyof IPropertyFilters]
      return value && (Array.isArray(value) ? value.length > 0 : true)
    }).length
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      {/* Main Filters Row */}
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Location Autocomplete */}
          <div className="min-w-[168px] w-[240px]">
            <LocationAutocomplete
              value={filters.location || ''}
              onInputChange={(value) => {
                // Solo actualizar el estado local, NO disparar búsquedas
                const newFilters = { ...filters }
                // Limpiar IDs anteriores cuando se escribe texto libre
                delete newFilters.neighborhood_id
                delete newFilters.city_id
                newFilters.location = value || undefined

                setFilters(newFilters)

                // Solo disparar búsqueda si se borra completamente el campo
                if (!value) {
                  onFiltersChange(newFilters)
                }
              }}
              onLocationSelect={(value, locationId, locationType) => {
                // Clear previous location filters
                const newFilters = { ...filters }
                delete newFilters.neighborhood_id
                delete newFilters.city_id

                if (value && locationId && locationType) {
                  newFilters.location = value
                  if (locationType === 'neighborhood') {
                    newFilters.neighborhood_id = [locationId]
                  } else if (locationType === 'city') {
                    newFilters.city_id = [locationId]
                  }
                } else {
                  newFilters.location = value || undefined
                }

                setFilters(newFilters)
                onFiltersChange(newFilters) // Solo aquí se actualizan los filtros y URL
              }}
              placeholder="Ubicación"
              disabled={isLoading}
            />
          </div>

          {/* Operation Type */}
          <div className="min-w-[140px]">
            <select
              value={filters.operation_type?.[0] || ''}
              onChange={(e) => handleFilterChange('operation_type', e.target.value ? [e.target.value] : undefined)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 bg-white"
              disabled={isLoading}
            >
              <option value="">Operación</option>
              {Object.entries(OPERATION_TYPES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="min-w-[160px]">
            <select
              value={filters.property_type?.[0] || ''}
              onChange={(e) => handleFilterChange('property_type', e.target.value ? [e.target.value] : undefined)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 bg-white"
              disabled={isLoading}
            >
              <option value="">Tipo de Propiedad</option>
              {Object.entries(PROPERTY_TYPES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tempPrices.min_price}
              onChange={(e) => setTempPrices(prev => ({ ...prev, min_price: e.target.value }))}
              placeholder="Precio mín"
              className="w-28 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyPriceFilters()
                }
              }}
            />
            <span className="text-gray-400 text-sm">-</span>
            <input
              type="number"
              value={tempPrices.max_price}
              onChange={(e) => setTempPrices(prev => ({ ...prev, max_price: e.target.value }))}
              placeholder="Precio máx"
              className="w-28 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyPriceFilters()
                }
              }}
            />
          </div>

          {/* Currency Checkboxes */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.currency === 'U$D'}
                onChange={(e) => handleFilterChange('currency', e.target.checked ? 'U$D' : undefined)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 focus:ring-offset-0"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-700">USD</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.currency === 'AR$'}
                onChange={(e) => handleFilterChange('currency', e.target.checked ? 'AR$' : undefined)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 focus:ring-offset-0"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-700">ARS</span>
            </label>
          </div>

          {/* Search Button */}
          <button
            onClick={applyPriceFilters}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md transition-colors flex items-center gap-2"
            disabled={isLoading}
            title="Buscar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Buscar</span>
          </button>

          {/* Advanced Filters Button */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors"
            style={{
              color: config?.primaryColor || '#f97316',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${config?.primaryColor || '#f97316'}10`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            disabled={isLoading}
          >
            <span className="text-lg font-bold">+</span>
            filtros
          </button>

        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Rooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ambientes
              </label>
              <div className="flex flex-wrap gap-2">
                {ROOMS_OPTIONS.map(room => (
                  <label key={room} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(filters.amount_room || []).includes(room)}
                      onChange={(e) => handleArrayFilterChange('amount_room', room, e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 focus:ring-offset-0"
                      disabled={isLoading}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {room === '5' ? '5+' : room}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Multiple Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dormitorios (múltiples)
              </label>
              <div className="flex flex-wrap gap-2">
                {BEDROOMS_OPTIONS.map(bedroom => (
                  <label key={bedroom} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(filters.amount_bedroom || []).includes(bedroom)}
                      onChange={(e) => handleArrayFilterChange('amount_bedroom', bedroom, e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 focus:ring-offset-0"
                      disabled={isLoading}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {bedroom === '5' ? '5+' : bedroom}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Placeholder for future filters */}
            <div className="flex items-end">
              <button
                onClick={() => setShowAdvanced(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Ocultar filtros avanzados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}