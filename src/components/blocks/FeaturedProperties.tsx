'use client'

import Image from 'next/image'
import Link from 'next/link'

interface FeaturedPropertiesProps {
  config?: {
    companyName: string
    primaryColor: string
  }
}

// Mock data - esto luego vendrá de la base de datos
const featuredProperties = [
  {
    id: '1',
    title: 'Casa Moderna en Palermo',
    price: 450000,
    location: 'Palermo, Buenos Aires',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80',
    type: 'sale',
    featured: true
  },
  {
    id: '2',
    title: 'Departamento Luminoso',
    price: 180000,
    location: 'Belgrano, Buenos Aires',
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    type: 'sale',
    featured: true
  },
  {
    id: '3',
    title: 'Casa Familiar con Jardín',
    price: 2800,
    location: 'Villa Crespo, Buenos Aires',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    type: 'rent',
    featured: true
  },
  {
    id: '4',
    title: 'Penthouse con Vista',
    price: 850000,
    location: 'Puerto Madero, Buenos Aires',
    bedrooms: 3,
    bathrooms: 3,
    area: 150,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    type: 'sale',
    featured: true
  }
]

const formatPrice = (price: number, type: string) => {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)

  return type === 'rent' ? `${formattedPrice}/mes` : formattedPrice
}

export default function FeaturedProperties({ config }: FeaturedPropertiesProps = {}) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Propiedades Destacadas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de las mejores propiedades disponibles en las ubicaciones más deseadas.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Property Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    property.type === 'sale' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {property.type === 'sale' ? 'Venta' : 'Alquiler'}
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {property.title}
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
                    {property.location}
                  </p>
                </div>

                {/* Property Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    {property.bedrooms} hab
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    {property.bathrooms} baños
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    {property.area}m²
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-primary-600">
                    {formatPrice(property.price, property.type)}
                  </div>
                  <Link
                    href={`/propiedades/${property.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                  >
                    Ver detalles →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

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