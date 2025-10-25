import { Property, PROPERTY_TYPES, OPERATION_TYPES } from '@/lib/properties-api'
import Link from 'next/link'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: string, currency: string) => {
    const formatter = new Intl.NumberFormat('es-AR')
    return `${currency} ${formatter.format(parseFloat(price))}`
  }

  // Extract data from meta_data
  const getMetaValue = (key: string) => {
    const meta = property.meta_data?.find(m => m.metaKey === key)
    return meta?.metaValue || ''
  }

  const title = getMetaValue('title') || property.address
  const description = getMetaValue('description_plain_text') || ''

  const mainImage = property.images?.[0]?.url || '/placeholder-property.svg'
  const propertyTypeName = property.propertyType?.name || 'Propiedad'
  const operationTypeName = OPERATION_TYPES[property.operationType as keyof typeof OPERATION_TYPES] || property.operationType

  return (
    <Link href={`/propiedad/${property.propertyId}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 group-hover:border-orange-300">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={mainImage}
            alt={property.address}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-property.svg'
            }}
          />

          {/* Operation Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              {operationTypeName}
            </span>
          </div>

          {/* Images Count */}
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-3 right-3">
              <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                {property.images.length}
              </span>
            </div>
          )}

          {/* Heart/Favorite Icon */}
          <div className="absolute top-3 right-3">
            <button className="bg-white bg-opacity-90 hover:bg-white p-2 rounded-full shadow-sm transition-all duration-200 hover:scale-110">
              <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Price */}
          <div className="mb-3">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price, property.currency)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-start text-gray-600 mb-4">
            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm line-clamp-2">
              {property.neighborhood?.name && `${property.neighborhood.name}, `}
              {property.city?.name}
              {property.state?.name && `, ${property.state.name}`}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {property.amountBedroom > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11h8m-4-4v8" />
                  </svg>
                  <span className="font-medium">{property.amountBedroom}</span>
                </div>
              )}

              {property.amountRoom > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-medium">{property.amountRoom} amb</span>
                </div>
              )}

              {property.coveredArea && parseFloat(property.coveredArea) > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="font-medium">{Math.round(parseFloat(property.coveredArea))}m²</span>
                </div>
              )}
            </div>

            {/* Property Type */}
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-medium">
              {propertyTypeName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}