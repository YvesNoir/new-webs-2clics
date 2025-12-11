'use client'

import { useState } from 'react'

interface HeroVariant2Props {
  config?: {
    companyName: string
    primaryColor: string
  }
}

export default function HeroVariant2({ config }: HeroVariant2Props = {}) {
  const [activeTab, setActiveTab] = useState('Buy')

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-1/4 w-72 h-72 bg-orange-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-blue-200 rounded-full opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-160px)]">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Encuentra el inmueble
              <span className="text-orange-500 block">que siempre soñaste</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Utilice los filtros para encontrar el inmueble que desea
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setActiveTab('Buy')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all text-sm ${
                    activeTab === 'Buy'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Comprar
                </button>
                <button
                  onClick={() => setActiveTab('Rent')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all text-sm ${
                    activeTab === 'Rent'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Alquilar
                </button>
                <button
                  onClick={() => setActiveTab('Sold')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all text-sm ${
                    activeTab === 'Sold'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Comprar
                </button>
              </div>

              {/* Search Form */}
              <form className="space-y-4">
                <div className="flex">
                  <div className="flex-1 relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Ingrese ciudad, barrio o ubicación"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-4 py-3 border border-gray-300 border-l-0 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Filtrar más
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-r-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Property Type Filters */}
                <div className="flex space-x-4 pt-2">
                  <button type="button" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                    <span>Casas</span>
                  </button>
                  <button type="button" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Departamentos</span>
                  </button>
                  <button type="button" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l7-3 7 3z" />
                    </svg>
                    <span>Oficina</span>
                  </button>
                  <button type="button" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                    <span>Lotes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative">
            {/* Main House Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Beautiful house"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />

              {/* Watch Video Button */}
              <button className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:block">Watch Video</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}