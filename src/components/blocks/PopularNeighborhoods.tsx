'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Property } from '@/lib/properties-api'

interface PopularNeighborhoodsProps {
  config?: {
    companyName: string
    primaryColor: string
  }
}

interface NeighborhoodData {
  id: number
  name: string
  count: number
  image?: string
}

export default function PopularNeighborhoods({ config }: PopularNeighborhoodsProps = {}) {
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch properties and calculate neighborhood popularity
  useEffect(() => {
    const fetchAllProperties = async () => {
      const allProperties: Property[] = []
      let offset = 0
      const limit = 20 // API seems to have a hard limit of 20 per request
      let totalCount = 0
      const maxRetries = 20 // Limit to prevent infinite loops

      try {
        console.log('Starting to fetch ALL properties with pagination (20 per batch)...')

        // First call to get total count
        const firstResponse = await fetch('https://api.2clics.com.ar/api/external/properties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api_key': 'kyw-ucv3ebh@dnp*JQVfed4ktw*yan!rqm'
          },
          body: JSON.stringify({
            offset: 0,
            limit: limit,
            filters: {}
          })
        })

        if (!firstResponse.ok) {
          throw new Error('Error al cargar las propiedades')
        }

        const firstData = await firstResponse.json()
        if (firstData.status === 'fail' || firstData.errors) {
          throw new Error('Error de la API al cargar propiedades')
        }

        totalCount = firstData.count || 0
        console.log(`🎯 API says there are ${totalCount} total properties`)

        // Add first batch
        const firstBatch = firstData.properties || []
        allProperties.push(...firstBatch)
        console.log(`📦 Batch 1: Got ${firstBatch.length} properties (offset: 0)`)

        // Continue fetching while we keep getting full batches of 20
        offset = limit
        let batchNumber = 2
        let consecutiveEmptyBatches = 0

        while (batchNumber <= maxRetries && offset < totalCount) {
          try {
            const response = await fetch('https://api.2clics.com.ar/api/external/properties', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'api_key': 'kyw-ucv3ebh@dnp*JQVfed4ktw*yan!rqm'
              },
              body: JSON.stringify({
                offset,
                limit,
                filters: {}
              })
            })

            if (!response.ok) {
              console.error(`❌ Failed to fetch batch ${batchNumber} at offset ${offset}`)
              break
            }

            const data = await response.json()
            if (data.status === 'fail' || data.errors) {
              console.error(`❌ API error for batch ${batchNumber} at offset ${offset}`)
              break
            }

            const properties = data.properties || []
            console.log(`📦 Batch ${batchNumber}: Got ${properties.length} properties (offset: ${offset})`)

            if (properties.length === 0) {
              consecutiveEmptyBatches++
              console.log(`⚠️ Empty batch ${batchNumber} (${consecutiveEmptyBatches} consecutive)`)

              if (consecutiveEmptyBatches >= 3) {
                console.log('🛑 3 consecutive empty batches, stopping')
                break
              }
            } else {
              consecutiveEmptyBatches = 0
              allProperties.push(...properties)

              // If we got fewer than 20, we might be at the end
              if (properties.length < 20) {
                console.log(`🏁 Got ${properties.length} < 20 properties, likely reached the end`)
                break
              }
            }

            offset += limit
            batchNumber++
          } catch (error) {
            console.error(`💥 Error fetching batch ${batchNumber} at offset ${offset}:`, error)
            break
          }
        }

        console.log(`✅ Successfully fetched ${allProperties.length} out of ${totalCount} total properties (${Math.round((allProperties.length/totalCount)*100)}%)`)

        if (allProperties.length < totalCount) {
          console.log(`⚠️ Note: Only got ${allProperties.length}/${totalCount} properties. API may have access restrictions.`)
        }

        return allProperties

      } catch (error) {
        console.error('💥 Error in fetchAllProperties:', error)
        return []
      }
    }

    const fetchNeighborhoods = async () => {
      setLoading(true)
      setError(null)

      try {
        const allProperties = await fetchAllProperties()

        // Count properties by neighborhood
        const neighborhoodCount: { [key: string]: { count: number, id: number, image?: string } } = {}

        allProperties.forEach((property: Property) => {
          if (property.neighborhood?.name) {
            const name = property.neighborhood.name.trim()

            if (!neighborhoodCount[name]) {
              neighborhoodCount[name] = {
                count: 0,
                id: property.neighborhood.neighborhoodId,
                image: property.images?.[0]?.url
              }
            }
            neighborhoodCount[name].count++

            // Use the first image found for this neighborhood if we don't have one yet
            if (!neighborhoodCount[name].image && property.images?.[0]?.url) {
              neighborhoodCount[name].image = property.images[0].url
            }
          }
        })

        // Show all neighborhoods with their counts for debugging
        const allNeighborhoods = Object.entries(neighborhoodCount)
          .map(([name, data]) => ({
            name,
            count: data.count
          }))
          .sort((a, b) => b.count - a.count)

        console.log('📊 All neighborhoods with counts:', allNeighborhoods)

        // Convert to array and sort by count, take top 4
        const sortedNeighborhoods = Object.entries(neighborhoodCount)
          .map(([name, data]) => ({
            id: data.id,
            name,
            count: data.count,
            image: data.image
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4)

        console.log('🏆 Final top 4 neighborhoods for display:', sortedNeighborhoods)
        setNeighborhoods(sortedNeighborhoods)
      } catch (err) {
        console.error('Error loading neighborhoods:', err)
        setError('Error al cargar los barrios')
      } finally {
        setLoading(false)
      }
    }

    fetchNeighborhoods()
  }, [])

  return (
    <section className="py-52 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Barrios Populares
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre los barrios con mayor cantidad de propiedades disponibles
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="relative h-64 bg-gray-300 rounded-xl animate-pulse">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-1/2"></div>
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

        {/* Neighborhoods Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoods.map((neighborhood, index) => (
              <Link
                key={neighborhood.id}
                href={`/propiedades?neighborhood=${encodeURIComponent(neighborhood.name)}`}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={neighborhood.image || '/placeholder-neighborhood.jpg'}
                    alt={neighborhood.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-neighborhood.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-orange-300 transition-colors">
                    {neighborhood.name}
                  </h3>
                  <p className="text-sm opacity-90">
                    {neighborhood.count} {neighborhood.count === 1 ? 'propiedad' : 'propiedades'}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-20 rounded-full p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}