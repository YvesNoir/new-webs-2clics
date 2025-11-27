'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from '@/components/admin/RichTextEditor'

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<'site-config' | 'page-config' | 'contact-config' | 'nosotros-config' | 'tasaciones-config'>('site-config')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [isSavingPage, setIsSavingPage] = useState(false)
  const [pageSaveMessage, setPageSaveMessage] = useState('')
  const [isSavingContact, setIsSavingContact] = useState(false)
  const [contactSaveMessage, setContactSaveMessage] = useState('')
  const [isSavingNosotros, setIsSavingNosotros] = useState(false)
  const [nosotrosSaveMessage, setNosotrosSaveMessage] = useState('')
  const [isSavingTasaciones, setIsSavingTasaciones] = useState(false)
  const [tasacionesSaveMessage, setTasacionesSaveMessage] = useState('')
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [siteConfig, setSiteConfig] = useState({
    // Información básica
    companyName: '',
    siteTitle: '',
    siteDescription: '',
    logo: '',
    favicon: '',

    // Información de contacto
    address: '',
    schedule: '',
    mapUrl: '',
    showMap: true,
    phone: '',
    whatsapp: '',
    email: '',

    // Colores
    primaryColor: '#f97316',
    secondaryColor: '#1f2937',
    tagColor: '#10b981',

    // Hero Banner
    heroVariant: 'variant1',
    videoUrl: '',
    heroTitle: '',
    heroSubtitle: '',
    contactTitle: '',
    contactDescription: '',
    nosotrosTitle: '',
    nosotrosDescription: '',
    tasacionesTitle: '',
    tasacionesDescription: '',

    // Redes sociales
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
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
        setSiteConfig({
          companyName: config.companyName || '',
          siteTitle: config.siteTitle || '',
          siteDescription: config.siteDescription || '',
          logo: config.logo || '',
          favicon: config.favicon || '',
          address: config.address || '',
          schedule: config.schedule || '',
          mapUrl: config.mapUrl || '',
          showMap: config.showMap !== undefined ? config.showMap : true,
          phone: config.phone || '',
          whatsapp: config.whatsapp || '',
          email: config.email || '',
          primaryColor: config.primaryColor || '#f97316',
          secondaryColor: config.secondaryColor || '#1f2937',
          tagColor: config.tagColor || '#10b981',
          heroVariant: config.heroVariant || 'variant1',
          videoUrl: config.videoUrl || '',
          heroTitle: config.heroTitle || '',
          heroSubtitle: config.heroSubtitle || '',
          contactTitle: config.contactTitle || '',
          contactDescription: config.contactDescription || '',
          nosotrosTitle: config.nosotrosTitle || '',
          nosotrosDescription: config.nosotrosDescription || '',
          tasacionesTitle: config.tasacionesTitle || '',
          tasacionesDescription: config.tasacionesDescription || '',
          facebook: config.facebook || '',
          instagram: config.instagram || '',
          twitter: config.twitter || '',
          linkedin: config.linkedin || '',
          tiktok: config.tiktok || '',
          youtube: config.youtube || ''
        })
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
    setIsSaving(true)
    setSaveMessage('')

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
        setSaveMessage('¡Configuración guardada exitosamente!')
        // Refrescar el preview después de guardar en el servidor
        refreshPreview()

        // Limpiar mensaje después de 3 segundos
        setTimeout(() => {
          setSaveMessage('')
        }, 3000)
      } else {
        setSaveMessage('Error al guardar la configuración')
      }
    } catch (error) {
      console.error('Error updating site config:', error)
      setSaveMessage('Error al guardar la configuración')
    } finally {
      setIsSaving(false)
    }
  }

  // Función para guardar configuración de la página (heroVariant)
  const updatePageConfig = async () => {
    setIsSavingPage(true)
    setPageSaveMessage('')

    try {
      // Guardar configuración completa incluyendo heroVariant, heroTitle, heroSubtitle
      const response = await fetch('/api/site-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(siteConfig),
        credentials: 'include'
      })

      if (response.ok) {
        setPageSaveMessage('¡Configuración de la página guardada exitosamente!')
        // Refrescar el preview después de guardar en el servidor
        refreshPreview()

        // Limpiar mensaje después de 3 segundos
        setTimeout(() => {
          setPageSaveMessage('')
        }, 3000)
      } else {
        setPageSaveMessage('Error al guardar la configuración de la página')
      }
    } catch (error) {
      console.error('Error updating page config:', error)
      setPageSaveMessage('Error al guardar la configuración de la página')
    } finally {
      setIsSavingPage(false)
    }
  }

  // Función para guardar configuración de contacto
  const updateContactConfig = async () => {
    setIsSavingContact(true)
    setContactSaveMessage('')
    try {
      // Guardar configuración completa incluyendo contactTitle y contactDescription
      const response = await fetch('/api/site-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(siteConfig),
        credentials: 'include'
      })

      if (response.ok) {
        setContactSaveMessage('¡Configuración de contacto guardada exitosamente!')
        // Refrescar el preview después de guardar en el servidor
        refreshPreview()
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setContactSaveMessage(''), 3000)
      } else {
        setContactSaveMessage('Error al guardar la configuración de contacto')
      }
    } catch (error) {
      console.error('Error updating contact config:', error)
      setContactSaveMessage('Error al guardar la configuración de contacto')
    } finally {
      setIsSavingContact(false)
    }
  }

  // Función para guardar configuración de nosotros
  const updateNosotrosConfig = async () => {
    setIsSavingNosotros(true)
    setNosotrosSaveMessage('')
    try {
      // Guardar configuración completa incluyendo nosotrosTitle y nosotrosDescription
      const response = await fetch('/api/site-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(siteConfig),
        credentials: 'include'
      })

      if (response.ok) {
        setNosotrosSaveMessage('¡Configuración de nosotros guardada exitosamente!')
        // Refrescar el preview después de guardar en el servidor
        refreshPreview()
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setNosotrosSaveMessage(''), 3000)
      } else {
        setNosotrosSaveMessage('Error al guardar la configuración de nosotros')
      }
    } catch (error) {
      console.error('Error updating nosotros config:', error)
      setNosotrosSaveMessage('Error al guardar la configuración de nosotros')
    } finally {
      setIsSavingNosotros(false)
    }
  }

  // Función para guardar configuración de tasaciones
  const updateTasacionesConfig = async () => {
    setIsSavingTasaciones(true)
    setTasacionesSaveMessage('')
    try {
      // Guardar configuración completa incluyendo tasacionesTitle y tasacionesDescription
      const response = await fetch('/api/site-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(siteConfig),
        credentials: 'include'
      })

      if (response.ok) {
        setTasacionesSaveMessage('¡Configuración de tasaciones guardada exitosamente!')
        // Refrescar el preview después de guardar en el servidor
        refreshPreview()
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setTasacionesSaveMessage(''), 3000)
      } else {
        setTasacionesSaveMessage('Error al guardar la configuración de tasaciones')
      }
    } catch (error) {
      console.error('Error updating tasaciones config:', error)
      setTasacionesSaveMessage('Error al guardar la configuración de tasaciones')
    } finally {
      setIsSavingTasaciones(false)
    }
  }

  // Función para actualizar config sin guardar (solo preview en tiempo real)
  const updateSiteConfigLocal = (newConfig: typeof siteConfig) => {
    setSiteConfig(newConfig)

    // Enviar los cambios al iframe vía postMessage para actualización inmediata del preview
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'updateSiteConfig',
        config: newConfig
      }, '*')
    }
  }

  // Función para subir archivos (logo o favicon)
  const handleFileUpload = async (file: File, type: 'logo' | 'favicon') => {
    if (type === 'logo') setIsUploadingLogo(true)
    if (type === 'favicon') setIsUploadingFavicon(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (response.ok) {
        const result = await response.json()

        // Actualizar configuración con la nueva URL
        const updatedConfig = {
          ...siteConfig,
          [type]: result.url
        }

        updateSiteConfigLocal(updatedConfig)

        // Mostrar mensaje de éxito
        setSaveMessage(`${type === 'logo' ? 'Logo' : 'Favicon'} subido exitosamente`)
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        const error = await response.json()
        setSaveMessage(`Error al subir ${type === 'logo' ? 'logo' : 'favicon'}: ${error.error}`)
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error)
      setSaveMessage(`Error al subir ${type === 'logo' ? 'logo' : 'favicon'}`)
    } finally {
      if (type === 'logo') setIsUploadingLogo(false)
      if (type === 'favicon') setIsUploadingFavicon(false)
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
      const baseUrl =
        activeTab === 'contact-config' ? '/contacto' :
        activeTab === 'nosotros-config' ? '/nosotros' :
        activeTab === 'tasaciones-config' ? '/tasaciones' :
        '/preview'
      iframeRef.current.src = `${baseUrl}?t=${Date.now()}`
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

  // Actualizar iframe cuando cambia activeTab
  useEffect(() => {
    refreshPreview()
  }, [activeTab])

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Main Content - Pantalla Completa */}
      <main className="flex h-screen">
        {/* Panel de Control - Izquierda (20%) */}
        <div className="w-1/5 bg-white border-r border-gray-200 overflow-y-auto">
            {/* Selector de Configuración */}
            <div className="p-6 border-b bg-gradient-to-r from-orange-50 to-orange-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Panel de Configuración
                </h2>
              </div>
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full py-2 px-3 pr-8 text-sm font-medium bg-white border border-gray-300 rounded-md hover:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-left"
                >
                  {activeTab === 'site-config' && 'Configuración del Sitio Web'}
                  {activeTab === 'page-config' && 'Configuración de la Página de Inicio'}
                  {activeTab === 'contact-config' && 'Configuración de Contacto'}
                  {activeTab === 'nosotros-config' && 'Configuración de Nosotros'}
                  {activeTab === 'tasaciones-config' && 'Configuración de Tasaciones'}
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    <button
                      onClick={() => { setActiveTab('site-config'); setIsDropdownOpen(false) }}
                      className={`w-full text-left py-2 px-3 text-sm hover:bg-gray-50 transition-colors ${
                        activeTab === 'site-config' ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Configuración del Sitio Web
                      </div>
                    </button>
                    <button
                      onClick={() => { setActiveTab('page-config'); setIsDropdownOpen(false) }}
                      className={`w-full text-left py-2 px-3 text-sm hover:bg-gray-50 transition-colors ${
                        activeTab === 'page-config' ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Configuración de la Página de Inicio
                      </div>
                    </button>
                    <button
                      onClick={() => { setActiveTab('contact-config'); setIsDropdownOpen(false) }}
                      className={`w-full text-left py-2 px-3 text-sm hover:bg-gray-50 transition-colors ${
                        activeTab === 'contact-config' ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        Configuración de Contacto
                      </div>
                    </button>
                    <button
                      onClick={() => { setActiveTab('nosotros-config'); setIsDropdownOpen(false) }}
                      className={`w-full text-left py-2 px-3 text-sm hover:bg-gray-50 transition-colors ${
                        activeTab === 'nosotros-config' ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        Configuración de Nosotros
                      </div>
                    </button>
                    <button
                      onClick={() => { setActiveTab('tasaciones-config'); setIsDropdownOpen(false) }}
                      className={`w-full text-left py-2 px-3 text-sm hover:bg-gray-50 transition-colors ${
                        activeTab === 'tasaciones-config' ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        Configuración de Tasaciones
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'site-config' && (
                <div className="space-y-6">
                  {/* Información Básica */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Información Básica
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título del Sitio
                        </label>
                        <input
                          type="text"
                          value={siteConfig.siteTitle}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, siteTitle: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Ej: Inmobiliaria Homez - Propiedades de Calidad"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descripción del Sitio
                        </label>
                        <textarea
                          value={siteConfig.siteDescription}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, siteDescription: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Descripción breve de tu inmobiliaria..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logo de la Inmobiliaria
                        </label>
                        <div className="space-y-3">
                          {siteConfig.logo && (
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <img
                                src={siteConfig.logo}
                                alt="Logo actual"
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm text-gray-600">Logo actual</p>
                                <p className="text-xs text-gray-400">{siteConfig.logo}</p>
                              </div>
                            </div>
                          )}
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/svg+xml,image/webp"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleFileUpload(file, 'logo')
                                }
                              }}
                              disabled={isUploadingLogo}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
                            />
                            {isUploadingLogo && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            Formatos: JPG, PNG, SVG, WebP. Tamaño recomendado: 200x200px
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Favicon
                        </label>
                        <div className="space-y-3">
                          {siteConfig.favicon && (
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <img
                                src={siteConfig.favicon}
                                alt="Favicon actual"
                                className="w-8 h-8 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm text-gray-600">Favicon actual</p>
                                <p className="text-xs text-gray-400">{siteConfig.favicon}</p>
                              </div>
                            </div>
                          )}
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/x-icon,image/vnd.microsoft.icon,image/png,image/svg+xml"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleFileUpload(file, 'favicon')
                                }
                              }}
                              disabled={isUploadingFavicon}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
                            />
                            {isUploadingFavicon && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            Formatos: ICO, PNG, SVG. Tamaño recomendado: 32x32px o 16x16px
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información de Contacto */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Información de Contacto
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dirección
                        </label>
                        <input
                          type="text"
                          value={siteConfig.address}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, address: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Ej: Av. Corrientes 1234, CABA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Horario y Día de Apertura
                        </label>
                        <input
                          type="text"
                          value={siteConfig.schedule}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, schedule: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Ej: Lun-Vie 9:00-18:00, Sáb 9:00-13:00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mapa de Ubicación (URL de Google Maps)
                        </label>
                        <input
                          type="url"
                          value={siteConfig.mapUrl || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, mapUrl: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="https://www.google.com/maps/place/..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Pega la URL completa de Google Maps. Pasos: 1) Ve a Google Maps, 2) Busca tu ubicación, 3) Copia la URL completa del navegador, 4) Pégala aquí.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          value={siteConfig.phone}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Ej: +54 11 1234-5678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={siteConfig.whatsapp}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, whatsapp: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Ej: +54 9 11 1234-5678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          value={siteConfig.email}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Ej: contacto@inmobiliaria.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Redes Sociales */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Redes Sociales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facebook
                        </label>
                        <input
                          type="url"
                          value={siteConfig.facebook || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, facebook: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="https://facebook.com/tu-pagina"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram
                        </label>
                        <input
                          type="url"
                          value={siteConfig.instagram || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, instagram: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="https://instagram.com/tu-cuenta"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          X (Twitter)
                        </label>
                        <input
                          type="url"
                          value={siteConfig.twitter || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, twitter: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="https://x.com/tu-cuenta"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={siteConfig.linkedin || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, linkedin: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="https://linkedin.com/company/tu-empresa"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          TikTok
                        </label>
                        <input
                          type="url"
                          value={siteConfig.tiktok || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, tiktok: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="https://tiktok.com/@tu-cuenta"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          YouTube
                        </label>
                        <input
                          type="url"
                          value={siteConfig.youtube || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, youtube: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          placeholder="https://youtube.com/c/tu-canal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Colores */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Colores del Sitio
                    </h3>
                    <div className="space-y-4">
                      {/* Primera fila: Primario y Secundario */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Color Primario
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={siteConfig.primaryColor}
                              onChange={(e) => updateSiteConfigLocal({ ...siteConfig, primaryColor: e.target.value })}
                              className="w-12 h-10 border border-gray-300 rounded-md"
                            />
                            <span className="text-sm text-gray-500">{siteConfig.primaryColor}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Color Secundario
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={siteConfig.secondaryColor}
                              onChange={(e) => updateSiteConfigLocal({ ...siteConfig, secondaryColor: e.target.value })}
                              className="w-12 h-10 border border-gray-300 rounded-md"
                            />
                            <span className="text-sm text-gray-500">{siteConfig.secondaryColor}</span>
                          </div>
                        </div>
                      </div>

                      {/* Segunda fila: Color de Etiquetas */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color de Etiquetas
                          <span className="text-xs text-gray-500 ml-2">(para etiquetas de venta/alquiler)</span>
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={siteConfig.tagColor}
                            onChange={(e) => updateSiteConfigLocal({ ...siteConfig, tagColor: e.target.value })}
                            className="w-12 h-10 border border-gray-300 rounded-md"
                          />
                          <span className="text-sm text-gray-500">{siteConfig.tagColor}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-6 border-t">
                    <button
                      onClick={() => updateSiteConfig(siteConfig)}
                      disabled={isSaving}
                      className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${
                        isSaving
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-orange-500 hover:bg-orange-600'
                      } text-white`}
                    >
                      {isSaving ? (
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Guardando...</span>
                        </div>
                      ) : (
                        'Guardar Configuración del Sitio'
                      )}
                    </button>

                    {/* Save Message */}
                    {saveMessage && (
                      <div className={`mt-3 p-3 rounded-lg text-sm text-center ${
                        saveMessage.includes('Error')
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                        <div className="flex items-center justify-center space-x-2">
                          {saveMessage.includes('Error') ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          <span>{saveMessage}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'page-config' && (
                <div className="space-y-6">
                  {/* Configuración del Hero Banner */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Configuración del Banner Principal
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Selecciona el estilo de banner
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {/* Banner Variant 1 */}
                          <label className="relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                            <input
                              type="radio"
                              name="heroVariant"
                              value="variant1"
                              checked={siteConfig.heroVariant === 'variant1'}
                              onChange={(e) => updateSiteConfigLocal({ ...siteConfig, heroVariant: e.target.value })}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                              siteConfig.heroVariant === 'variant1'
                                ? 'border-orange-500 bg-orange-500'
                                : 'border-gray-300'
                            }`}>
                              {siteConfig.heroVariant === 'variant1' && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-8 bg-gradient-to-r from-orange-100 to-orange-200 rounded border"></div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">Banner Clásico</h4>
                                  <p className="text-xs text-gray-500">Formulario de búsqueda central con imagen lateral</p>
                                </div>
                              </div>
                            </div>
                          </label>

                          {/* Banner Variant 2 */}
                          <label className="relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                            <input
                              type="radio"
                              name="heroVariant"
                              value="variant2"
                              checked={siteConfig.heroVariant === 'variant2'}
                              onChange={(e) => updateSiteConfigLocal({ ...siteConfig, heroVariant: e.target.value })}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                              siteConfig.heroVariant === 'variant2'
                                ? 'border-orange-500 bg-orange-500'
                                : 'border-gray-300'
                            }`}>
                              {siteConfig.heroVariant === 'variant2' && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-8 bg-gradient-to-r from-blue-100 to-indigo-200 rounded border"></div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">Banner Moderno</h4>
                                  <p className="text-xs text-gray-500">Búsqueda compacta con botón Watch Video</p>
                                </div>
                              </div>
                            </div>
                          </label>

                          {/* Banner Variant 3 */}
                          <label className="relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                            <input
                              type="radio"
                              name="heroVariant"
                              value="variant3"
                              checked={siteConfig.heroVariant === 'variant3'}
                              onChange={(e) => updateSiteConfigLocal({ ...siteConfig, heroVariant: e.target.value })}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                              siteConfig.heroVariant === 'variant3'
                                ? 'border-orange-500 bg-orange-500'
                                : 'border-gray-300'
                            }`}>
                              {siteConfig.heroVariant === 'variant3' && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded border"></div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">Banner Galería</h4>
                                  <p className="text-xs text-gray-500">Galería de imágenes con agentes exclusivos</p>
                                </div>
                              </div>
                            </div>
                          </label>

                          {/* Banner Variant 4 - Video Background */}
                          <label className="relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                            <input
                              type="radio"
                              name="heroVariant"
                              value="variant4"
                              checked={siteConfig.heroVariant === 'variant4'}
                              onChange={(e) => updateSiteConfigLocal({ ...siteConfig, heroVariant: e.target.value })}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                              siteConfig.heroVariant === 'variant4'
                                ? 'border-orange-500 bg-orange-500'
                                : 'border-gray-300'
                            }`}>
                              {siteConfig.heroVariant === 'variant4' && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-8 bg-gradient-to-r from-red-100 to-red-200 rounded border flex items-center justify-center">
                                  <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">Banner con Video</h4>
                                  <p className="text-xs text-gray-500">Video de YouTube de fondo con búsqueda avanzada</p>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>

                        {/* Configuración específica para Variant 4 */}
                        {siteConfig.heroVariant === 'variant4' && (
                          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
                            <h4 className="text-sm font-medium text-gray-900">Configuración del Video Banner</h4>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL del Video de YouTube
                              </label>
                              <input
                                type="url"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={siteConfig.videoUrl || ''}
                                onChange={(e) => updateSiteConfigLocal({ ...siteConfig, videoUrl: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                El video se reproducirá automáticamente sin sonido como fondo del banner
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Título del Banner
                                </label>
                                <input
                                  type="text"
                                  placeholder="Easy Way to Find a Perfect Property"
                                  value={siteConfig.heroTitle || ''}
                                  onChange={(e) => updateSiteConfigLocal({ ...siteConfig, heroTitle: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Subtítulo del Banner
                                </label>
                                <input
                                  type="text"
                                  placeholder="From as low as $10 per day with limited time offer discounts"
                                  value={siteConfig.heroSubtitle || ''}
                                  onChange={(e) => updateSiteConfigLocal({ ...siteConfig, heroSubtitle: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Gestión de Bloques */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Bloques de la Página de Inicio
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
                            case 'popular-neighborhoods':
                              return (
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
                              {block.type === 'hero' ? (
                                <div className="flex items-center space-x-2">
                                  <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                                  <div className="w-9 h-5 bg-orange-500 rounded-full relative">
                                    <div className="absolute top-[2px] right-[2px] bg-white rounded-full h-4 w-4"></div>
                                  </div>
                                </div>
                              ) : (
                                <>
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
                                </>
                              )}
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
                  <div className="pt-6 border-t">
                    <button
                      onClick={updatePageConfig}
                      disabled={isSavingPage}
                      className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${
                        isSavingPage
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-orange-500 hover:bg-orange-600'
                      } text-white`}
                    >
                      {isSavingPage ? (
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Guardando...</span>
                        </div>
                      ) : (
                        'Guardar Configuración de la Página'
                      )}
                    </button>

                    {/* Page Save Message */}
                    {pageSaveMessage && (
                      <div className={`mt-3 p-3 rounded-lg text-sm text-center ${
                        pageSaveMessage.includes('Error')
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                        <div className="flex items-center justify-center space-x-2">
                          {pageSaveMessage.includes('Error') ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          <span>{pageSaveMessage}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'contact-config' && (
                <div className="space-y-6">
                  {/* Configuración de la Página de Contacto */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Configuración de la Página de Contacto
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título Principal
                        </label>
                        <input
                          type="text"
                          placeholder="Contacto"
                          value={siteConfig.contactTitle || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, contactTitle: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descripción
                        </label>
                        <textarea
                          rows={3}
                          placeholder="¿Tienes alguna pregunta? Estamos aquí para ayudarte..."
                          value={siteConfig.contactDescription || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, contactDescription: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bloques de la Página de Contacto */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Bloques de la Página
                    </h3>

                    <div className="space-y-3">
                      {/* Información de Contacto - Siempre visible */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Información de Contacto</h4>
                            <p className="text-xs text-gray-500">Teléfono, email, dirección, horarios</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <div className="w-9 h-5 bg-orange-500 rounded-full relative">
                            <div className="absolute top-[2px] right-[2px] bg-white rounded-full h-4 w-4"></div>
                          </div>
                        </div>
                      </div>

                      {/* Formulario de Contacto - Siempre visible */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 4z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Formulario de Contacto</h4>
                            <p className="text-xs text-gray-500">Formulario para recibir mensajes</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <div className="w-9 h-5 bg-orange-500 rounded-full relative">
                            <div className="absolute top-[2px] right-[2px] bg-white rounded-full h-4 w-4"></div>
                          </div>
                        </div>
                      </div>

                      {/* Mapa - Con Switch */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Mapa de Ubicación</h4>
                            <p className="text-xs text-gray-500">
                              {siteConfig.mapUrl && siteConfig.mapUrl.trim() ?
                                'Mostrar mapa en la página de contacto' :
                                'Configurar URL de Google Maps primero'
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {siteConfig.mapUrl && siteConfig.mapUrl.trim() ? (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={siteConfig.showMap}
                                onChange={(e) => updateSiteConfigLocal({ ...siteConfig, showMap: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                          ) : (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-medium">
                              Sin URL
                            </span>
                          )}
                        </div>
                      </div>

                      {/* FAQ - Opcional */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Preguntas Frecuentes</h4>
                            <p className="text-xs text-gray-500">FAQ sobre servicios inmobiliarios</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                            Editar
                          </button>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-6 border-t">
                    <button
                      onClick={updateContactConfig}
                      disabled={isSavingContact}
                      className="w-full font-medium py-3 px-4 rounded-lg transition-colors bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSavingContact ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Guardando...</span>
                        </div>
                      ) : (
                        'Guardar Configuración de Contacto'
                      )}
                    </button>
                    {/* Contact Save Message */}
                    {contactSaveMessage && (
                      <div className={`mt-3 text-center text-sm font-medium ${
                        contactSaveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {contactSaveMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'nosotros-config' && (
                <div className="space-y-6">
                  {/* Configuración de la Página de Nosotros */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Configuración de la Página de Nosotros
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título Principal
                        </label>
                        <input
                          type="text"
                          placeholder="Sobre Nosotros"
                          value={siteConfig.nosotrosTitle || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, nosotrosTitle: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descripción
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Somos una inmobiliaria comprometida con brindar el mejor servicio..."
                          value={siteConfig.nosotrosDescription || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, nosotrosDescription: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contenido Adicional
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                          Puedes agregar información adicional como nuestra historia, misión, valores, etc. Usa las herramientas de formato para crear contenido atractivo.
                        </p>
                        <RichTextEditor
                          content={siteConfig.nosotrosContent || ''}
                          onChange={(content) => updateSiteConfigLocal({ ...siteConfig, nosotrosContent: content })}
                          placeholder="Escribe aquí contenido adicional sobre tu inmobiliaria..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-6 border-t">
                    <button
                      onClick={updateNosotrosConfig}
                      disabled={isSavingNosotros}
                      className="w-full font-medium py-3 px-4 rounded-lg transition-colors bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSavingNosotros ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Guardando...</span>
                        </div>
                      ) : (
                        'Guardar Configuración de Nosotros'
                      )}
                    </button>
                    {/* Nosotros Save Message */}
                    {nosotrosSaveMessage && (
                      <div className={`mt-3 text-center text-sm font-medium ${
                        nosotrosSaveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {nosotrosSaveMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'tasaciones-config' && (
                <div className="space-y-6">
                  {/* Configuración de la Página de Tasaciones */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Configuración de la Página de Tasaciones
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Personaliza el título y descripción que aparecerán en la página de tasaciones.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título Principal
                        </label>
                        <input
                          type="text"
                          placeholder="Tasaciones"
                          value={siteConfig.tasacionesTitle || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, tasacionesTitle: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descripción
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Obtén una tasación profesional de tu propiedad de forma gratuita..."
                          value={siteConfig.tasacionesDescription || ''}
                          onChange={(e) => updateSiteConfigLocal({ ...siteConfig, tasacionesDescription: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>


                  {/* Save Button */}
                  <div className="pt-6 border-t">
                    <button
                      onClick={updateTasacionesConfig}
                      disabled={isSavingTasaciones}
                      className="w-full font-medium py-3 px-4 rounded-lg transition-colors bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSavingTasaciones ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Guardando...</span>
                        </div>
                      ) : (
                        'Guardar Configuración de Tasaciones'
                      )}
                    </button>
                    {/* Tasaciones Save Message */}
                    {tasacionesSaveMessage && (
                      <div className={`mt-3 text-center text-sm font-medium ${
                        tasacionesSaveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {tasacionesSaveMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
        </div>

        {/* Preview del Sitio Web - Derecha (80%) */}
        <div className="flex-1 bg-gray-100 relative">
          <div className="absolute inset-0 p-4">
            <div className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              {/* Barra superior del preview */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-500 ml-4">Vista Previa en Tiempo Real</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={refreshPreview}
                    className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600"
                    title="Refrescar preview"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                    title="Cerrar sesión"
                  >
                    Salir
                  </button>
                </div>
              </div>

              <iframe
                ref={iframeRef}
                src={
                  activeTab === 'contact-config' ? '/contacto' :
                  activeTab === 'nosotros-config' ? '/nosotros' :
                  activeTab === 'tasaciones-config' ? '/tasaciones' :
                  '/preview'
                }
                className="w-full h-[calc(100%-40px)] border-0"
                title="Vista Previa del Sitio Web"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}