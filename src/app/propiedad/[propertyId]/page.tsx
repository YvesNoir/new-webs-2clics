import { getSiteConfig } from '@/lib/site-config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PropertyDetailClient from './PropertyDetailClient'
import DynamicStyles from '@/components/DynamicStyles'
import DynamicFavicon from '@/components/DynamicFavicon'
import { Metadata } from 'next'

interface PropertyDetailPageProps {
  params: Promise<{
    propertyId: string
  }>
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { propertyId } = await params
  const config = await getSiteConfig()

  return {
    title: `Propiedad ${propertyId} | ${config.companyName}`,
    description: config.siteDescription || 'Detalle de propiedad - Encuentra tu hogar ideal',
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { propertyId } = await params
  const config = await getSiteConfig()

  return (
    <>
      <DynamicStyles primaryColor={config.primaryColor} secondaryColor={config.secondaryColor} />
      <DynamicFavicon faviconUrl={config.favicon} />

      <div className="min-h-screen bg-gray-50">
        <Header config={config} />
        <PropertyDetailClient propertyId={propertyId} />
        <Footer config={config} />
      </div>
    </>
  )
}