'use client'

import { useState, useEffect, useRef } from 'react'
import { searchLocations, LocationSuggestion } from '@/lib/properties-api'

interface LocationAutocompleteProps {
  value: string
  onInputChange: (value: string) => void
  onLocationSelect: (value: string, locationId?: string, locationType?: 'neighborhood' | 'city') => void
  placeholder?: string
  disabled?: boolean
}

export default function LocationAutocomplete({
  value,
  onInputChange,
  onLocationSelect,
  placeholder = "Ingrese ubicación",
  disabled = false
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Search for locations when input changes
  useEffect(() => {
    const searchQuery = value.trim()

    if (searchQuery.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const searchDebounced = setTimeout(async () => {
      setLoading(true)
      try {
        const results = await searchLocations(searchQuery)
        setSuggestions(results)
        setShowSuggestions(results.length > 0)
      } catch (error) {
        console.error('Error searching locations:', error)
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setLoading(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(searchDebounced)
  }, [value])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value)
  }

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    // Extract the ID from the suggestion ID (format: "neighborhood:123" or "city:123")
    const locationId = suggestion.id.split(':')[1]
    onLocationSelect(suggestion.name, locationId, suggestion.type)
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 12.414a6 6 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-orange-50 focus:bg-orange-50 focus:outline-none border-b border-gray-100 last:border-b-0 flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">{suggestion.name}</span>
              <span className="text-xs text-gray-500 capitalize">
                {suggestion.type === 'neighborhood' ? 'Barrio' : 'Ciudad'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}