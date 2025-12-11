import { getSiteConfig } from '@/lib/site-config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PropertiesClientComponent from '../propiedades/PropertiesClientComponent'
import DynamicStyles from '@/components/DynamicStyles'
import DynamicFavicon from '@/components/DynamicFavicon'
import { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()

  return {
    title: `Casas en Venta | ${config.companyName}`,
    description: 'Encuentra las mejores casas en venta. Tu próximo hogar te está esperando.',
  }
}

export default async function CasasEnVentaPage() {
  const config = await getSiteConfig()

  return (
    <>
      <DynamicStyles primaryColor={config.primaryColor} secondaryColor={config.secondaryColor} />
      <DynamicFavicon faviconUrl={config.favicon} />

      <div className="min-h-screen bg-gray-50">
        <Header config={config} />
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Cargando propiedades...</div>
        </div>}>
          <PropertiesClientComponent pageTitle="Casas en Venta" />
        </Suspense>
        <Footer config={config} />
      </div>
    </>
  )
}