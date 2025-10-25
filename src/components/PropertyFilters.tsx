'use client'

import { useState } from 'react'
import { PropertyFilters as IPropertyFilters, PROPERTY_TYPES, OPERATION_TYPES, BEDROOMS_OPTIONS, ROOMS_OPTIONS, CURRENCY_OPTIONS } from '@/lib/properties-api'

interface PropertyFiltersProps {
  onFiltersChange: (filters: IPropertyFilters) => void
  isLoading?: boolean
}

export default function PropertyFilters({ onFiltersChange, isLoading = false }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<IPropertyFilters>({})
  const [showAdvanced, setShowAdvanced] = useState(false)

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

  const clearFilters = () => {
    setFilters({})
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
              value={filters.min_price || ''}
              onChange={(e) => handleFilterChange('min_price', e.target.value || undefined)}
              placeholder="Precio mín"
              className="w-28 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              disabled={isLoading}
            />
            <span className="text-gray-400 text-sm">-</span>
            <input
              type="number"
              value={filters.max_price || ''}
              onChange={(e) => handleFilterChange('max_price', e.target.value || undefined)}
              placeholder="Precio máx"
              className="w-28 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              disabled={isLoading}
            />
          </div>

          {/* Bedrooms */}
          <div className="min-w-[120px]">
            <select
              value={filters.amount_bedroom?.[0] || ''}
              onChange={(e) => handleFilterChange('amount_bedroom', e.target.value ? [e.target.value] : undefined)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 bg-white"
              disabled={isLoading}
            >
              <option value="">Dormitorios</option>
              {BEDROOMS_OPTIONS.map(bedroom => (
                <option key={bedroom} value={bedroom}>
                  {bedroom === '5' ? '5+' : bedroom} dorm
                </option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div className="min-w-[100px]">
            <select
              value={filters.currency || ''}
              onChange={(e) => handleFilterChange('currency', e.target.value || undefined)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 bg-white"
              disabled={isLoading}
            >
              <option value="">Moneda</option>
              {CURRENCY_OPTIONS.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          {/* Advanced Filters Button */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md transition-colors"
            disabled={isLoading}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Más filtros
            {getActiveFiltersCount() > 0 && (
              <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px]">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              disabled={isLoading}
            >
              Limpiar filtros
            </button>
          )}
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