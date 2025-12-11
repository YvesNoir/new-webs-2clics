'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import HeroSection from '@/components/blocks/HeroSection'
import FeaturedProperties from '@/components/blocks/FeaturedProperties'
import PopularNeighborhoods from '@/components/blocks/PopularNeighborhoods'
import Footer from '@/components/layout/Footer'
import DynamicStyles from '@/components/DynamicStyles'
import DynamicFavicon from '@/components/DynamicFavicon'
import PreviewSkeleton from '@/components/PreviewSkeleton'

export default function PreviewPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [config, setConfig] = useState({
    companyName: '',
    siteTitle: '',
    siteDescription: 'Tu inmobiliaria de confianza, especializada en la venta y alquiler de propiedades',
    logo: '',
    favicon: '',
    address: '',
    schedule: '',
    phone: '',
    whatsapp: '',
    email: '',
    primaryColor: '#f97316',
    secondaryColor: '#1f2937',
    tagColor: '#10b981',
    heroVariant: 'variant1'
  })
  const [blocks, setBlocks] = useState([])

  const getPreviewData = async () => {
    try {
      setIsLoading(true)

      const [configResponse, blocksResponse] = await Promise.all([
        fetch('/api/site-config'),
        fetch('/api/site-blocks')
      ])

      if (configResponse.ok) {
        const configData = await configResponse.json()
        setConfig(configData)
      }

      if (blocksResponse.ok) {
        const blocksData = await blocksResponse.json()
        setBlocks(blocksData.filter((block: any) => block.visible))
      }
    } catch (error) {
      console.error('Error loading preview data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPreviewData()

    // Escuchar mensajes del admin panel para actualizaciones en tiempo real
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'updateSiteConfig') {
        setConfig(event.data.config)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const renderBlock = (block: any) => {
    switch (block.type) {
      case 'featured-properties':
        return <FeaturedProperties key={block.id} config={config} />
      case 'popular-neighborhoods':
        return <PopularNeighborhoods key={block.id} config={config} />
      default:
        return null
    }
  }

  // Crear el título dinámico para la pestaña del navegador
  const pageTitle = config.siteTitle && config.siteDescription
    ? `${config.siteTitle} | ${config.siteDescription}`
    : config.siteTitle || config.siteDescription || 'Vista Previa - Inmobiliaria'

  // Mostrar skeleton mientras carga
  if (isLoading) {
    return (
      <>
        <title>{pageTitle}</title>
        <DynamicStyles primaryColor={config.primaryColor} secondaryColor={config.secondaryColor} />
        <DynamicFavicon faviconUrl={config.favicon} />
        <PreviewSkeleton />
      </>
    )
  }

  return (
    <>
      <title>{pageTitle}</title>
      <DynamicStyles primaryColor={config.primaryColor} secondaryColor={config.secondaryColor} />
      <DynamicFavicon faviconUrl={config.favicon} />

      <div className="min-h-screen">
        <Header config={config} />

        <main>
          {/* Hero Section - Always rendered from config */}
          <HeroSection config={config} />

          {/* Other blocks from database */}
          {blocks.map(renderBlock)}
        </main>

        <Footer config={config} />
      </div>
    </>
  )
}