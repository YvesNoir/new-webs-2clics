import { Property, PROPERTY_TYPES, OPERATION_TYPES } from '@/lib/properties-api'
import Link from 'next/link'

interface PropertyCardProps {
  property: Property
  config?: {
    tagColor?: string
    primaryColor?: string
    secondaryColor?: string
  }
}

export default function PropertyCard({ property, config }: PropertyCardProps) {
  const primaryColor = config?.primaryColor || '#f97316' // fallback to orange
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
    <Link href={`/propiedad/${property.propertyId}`} className="block group h-full">
      <div
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 h-full flex flex-col"
        style={{
          borderColor: 'rgb(229, 231, 235)', // default gray-200
          '--hover-border-color': primaryColor
        } as React.CSSProperties & { '--hover-border-color': string }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = primaryColor
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'
        }}
      >
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
            <span
              className="text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
              style={{ backgroundColor: config?.tagColor || '#10b981' }}
            >
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
        <div className="p-5 flex-1 flex flex-col">
          {/* Price */}
          <div className="mb-3">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price, property.currency)}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 transition-colors leading-tight"
            style={{
              color: 'rgb(17, 24, 39)', // default gray-900
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = primaryColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgb(17, 24, 39)'
            }}
          >
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-start text-gray-600 mb-4 flex-1">
            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm line-clamp-2">
              {property.neighborhood?.name && property.city?.name
                ? `${property.neighborhood.name} / ${property.city.name}`
                : property.neighborhood?.name || property.city?.name || ''
              }
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {property.amountBedroom > 0 && (
                <div className="flex items-center gap-1">
                  <img
                    src="/icons/bedroom.svg"
                    alt="Dormitorios"
                    className="w-4 h-4 text-gray-500"
                    style={{ filter: 'invert(0.4) sepia(0) saturate(0) hue-rotate(0deg)' }}
                  />
                  <span className="font-medium">{property.amountBedroom}</span>
                </div>
              )}

              {property.amountRoom > 0 && (
                <div className="flex items-center gap-1">
                  <img
                    src="/icons/rooms.svg"
                    alt="Ambientes"
                    className="w-4 h-4 text-gray-500"
                    style={{ filter: 'invert(0.4) sepia(0) saturate(0) hue-rotate(0deg)' }}
                  />
                  <span className="font-medium">{property.amountRoom} amb</span>
                </div>
              )}

              {property.coveredArea && parseFloat(property.coveredArea) > 0 && (
                <div className="flex items-center gap-1">
                  <img
                    src="/icons/area.svg"
                    alt="Superficie"
                    className="w-4 h-4 text-gray-500"
                    style={{ filter: 'invert(0.4) sepia(0) saturate(0) hue-rotate(0deg)' }}
                  />
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