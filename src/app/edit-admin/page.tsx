'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [siteConfig, setSiteConfig] = useState({
    companyName: 'Inmobiliaria Homez',
    primaryColor: '#f97316'
  })
  const [siteBlocks, setSiteBlocks] = useState([])
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const router = useRouter()

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include'
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        router.replace('/edit-admin/login')
        return
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error)
      router.replace('/edit-admin/login')
      return
    }

    setIsLoading(false)
  }

  const loadSiteData = async () => {
    try {
      const [configResponse, blocksResponse] = await Promise.all([
        fetch('/api/site-config'),
        fetch('/api/site-blocks')
      ])

      if (configResponse.ok) {
        const config = await configResponse.json()
        setSiteConfig(config)
      }

      if (blocksResponse.ok) {
        const blocks = await blocksResponse.json()
        setSiteBlocks(blocks)
      }
    } catch (error) {
      console.error('Error loading site data:', error)
    }
  }

  const updateSiteConfig = async (newConfig: typeof siteConfig) => {
    try {
      const response = await fetch('/api/site-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfig),
        credentials: 'include'
      })

      if (response.ok) {
        setSiteConfig(newConfig)
        refreshPreview()
      }
    } catch (error) {
      console.error('Error updating site config:', error)
    }
  }

  const toggleBlock = async (blockId: string, visible: boolean) => {
    try {
      const response = await fetch('/api/site-blocks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blockId, visible }),
        credentials: 'include'
      })

      if (response.ok) {
        setSiteBlocks(prev =>
          prev.map((block: any) =>
            block.id === blockId ? { ...block, visible } : block
          )
        )
        refreshPreview()
      }
    } catch (error) {
      console.error('Error updating block:', error)
    }
  }

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = `/preview?t=${Date.now()}`
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      router.push('/edit-admin/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadSiteData()
    }
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Panel de Administración
              </h1>
            </div>

            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex h-[calc(100vh-64px)]">
        {/* Panel de Control - Izquierda (20%) */}
        <div className="w-1/5 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Configuración del Sitio
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Personaliza los bloques y el contenido de tu sitio web
              </p>
            </div>

            <div className="p-6">
              {/* Información de la Empresa */}
              <div className="mb-8">
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  Información de la Empresa
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Empresa
                    </label>
                    <input
                      type="text"
                      value={siteConfig.companyName}
                      onChange={(e) => updateSiteConfig({ ...siteConfig, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Principal
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={siteConfig.primaryColor}
                        onChange={(e) => updateSiteConfig({ ...siteConfig, primaryColor: e.target.value })}
                        className="w-12 h-10 border border-gray-300 rounded-md"
                      />
                      <span className="text-sm text-gray-500">{siteConfig.primaryColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gestión de Bloques */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  Bloques del Sitio
                </h3>
                <div className="space-y-3">
                  {siteBlocks.map((block: any) => {
                    const getBlockIcon = (type: string) => {
                      switch (type) {
                        case 'hero':
                          return (
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10" />
                              </svg>
                            </div>
                          )
                        case 'featured-properties':
                          return (
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                              </svg>
                            </div>
                          )
                        default:
                          return (
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                            </div>
                          )
                      }
                    }

                    const config = JSON.parse(block.config || '{}')
                    const blockName = config.name || (block.type === 'hero' ? 'Banner Principal' : 'Propiedades Destacadas')
                    const blockDescription = config.description || (block.type === 'hero' ? 'Sección hero con búsqueda' : 'Grid de propiedades principales')

                    return (
                      <div key={block.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getBlockIcon(block.type)}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{blockName}</h4>
                            <p className="text-xs text-gray-500">{blockDescription}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                            Editar
                          </button>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={block.visible}
                              onChange={(e) => toggleBlock(block.id, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>
                      </div>
                    )
                  })}

                  {/* Add Block Button */}
                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-orange-300 hover:bg-orange-50 transition-colors group">
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="text-sm text-gray-600 group-hover:text-orange-600 font-medium">
                        Agregar Nuevo Bloque
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>
        </div>

        {/* Preview del Sitio Web - Derecha (80%) */}
        <div className="flex-1 bg-gray-100">
          <div className="w-full h-full p-4">
            <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                ref={iframeRef}
                src="/preview"
                className="w-full h-full border-0"
                title="Vista Previa del Sitio Web"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}