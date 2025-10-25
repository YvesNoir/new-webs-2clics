'use client'

import { useState } from 'react'

interface HeroVariant3Props {
  config?: {
    companyName: string
    primaryColor: string
  }
}

export default function HeroVariant3({ config }: HeroVariant3Props = {}) {
  const [activeTab, setActiveTab] = useState('Buy')

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-160px)]">
          {/* Left Content */}
          <div className="lg:pr-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              Encuentra el lugar perfecto
              <span className="block">Para vos y tu familia</span>
            </h1>

            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              {/* Tabs */}
              <div className="flex space-x-1 mb-6">
                <button
                  onClick={() => setActiveTab('Buy')}
                  className={`py-2 px-6 font-medium transition-all border-b-2 ${
                    activeTab === 'Buy'
                      ? 'border-orange-500 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Comprar
                </button>
                <button
                  onClick={() => setActiveTab('Rent')}
                  className={`py-2 px-6 font-medium transition-all border-b-2 ${
                    activeTab === 'Rent'
                      ? 'border-orange-500 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Alquilar
                </button>
                <button
                  onClick={() => setActiveTab('Sold')}
                  className={`py-2 px-6 font-medium transition-all border-b-2 ${
                    activeTab === 'Sold'
                      ? 'border-orange-500 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Vender
                </button>
              </div>

              {/* Search Form */}
              <form className="space-y-4">
                <div className="flex">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Ingresar ubicación"
                      className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <select className="px-4 py-3 border border-gray-300 border-l-0 text-gray-600">
                    <option>Departamento</option>
                    <option>Casa</option>
                    <option>Lotes</option>
                    <option>Oficinas</option>
                  </select>
                  <button
                    type="button"
                    className="px-4 py-3 border border-gray-300 border-l-0 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    filtrar
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
              </form>
            </div>
          </div>

          {/* Right Content - Property Gallery */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 h-96">
              {/* Large Property Image */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Beautiful turquoise house"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Right Column with 2 images */}
              <div className="space-y-4">
                <div className="relative h-44">
                  <img
                    src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Modern house exterior"
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div className="relative h-44">
                  <img
                    src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Contemporary home"
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Agents Section */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                    alt="Agent 1"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                    alt="Agent 2"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                    alt="Agent 3"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <div className="w-8 h-8 bg-gray-800 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">10k+ Exclusive Agents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}