'use client'

import { useState } from 'react'

interface HeroVariant1Props {
  config?: {
    companyName: string
    primaryColor: string
  }
}

export default function HeroVariant1({ config }: HeroVariant1Props = {}) {
  const [activeTab, setActiveTab] = useState('comprar')

  return (
    <section className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background with geometric pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-orange-100 to-orange-200 transform skew-x-12 origin-top-right"></div>
        <div className="absolute top-20 right-40 w-64 h-64 bg-orange-500 rounded-full opacity-10"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-300 rounded-full opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-160px)]">
          {/* Left Content */}
          <div>
            <div className="mb-6">
              <span className="text-orange-500 font-semibold text-lg tracking-wide uppercase">
                LA MEJOR FORMA DE
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Encontrar tu
              <span className="text-orange-500 block">Hogar Ideal</span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-lg">
              Tenemos más de 745,000 apartamentos, casas y terrenos disponibles.
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setActiveTab('comprar')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                    activeTab === 'comprar'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Comprar
                </button>
                <button
                  onClick={() => setActiveTab('alquilar')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                    activeTab === 'alquilar'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Alquilar
                </button>
                <button
                  onClick={() => setActiveTab('vendido')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                    activeTab === 'vendido'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Vendido
                </button>
              </div>

              {/* Search Form */}
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación
                    </label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Ingresa una ciudad, barrio..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Propiedad
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Todos los tipos</option>
                      <option>Departamento</option>
                      <option>Casa</option>
                      <option>Condominio</option>
                      <option>Villa</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rango de Precio
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>$50k - $100k</option>
                      <option>$100k - $200k</option>
                      <option>$200k - $500k</option>
                      <option>$500k+</option>
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dormitorios
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Cualquiera</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                      <option>4+</option>
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Baños
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Cualquiera</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                      <option>4+</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Buscar Propiedades</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Modern home"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Propiedades Verificadas</p>
                  <p className="font-semibold text-gray-900">745K+ Propiedades</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Clientes Felices</p>
                  <p className="font-semibold text-gray-900">180K+ Ventas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}