import { getSiteConfig } from '@/lib/site-config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PropertiesClientComponent from '../propiedades/PropertiesClientComponent'
import DynamicStyles from '@/components/DynamicStyles'
import DynamicFavicon from '@/components/DynamicFavicon'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()

  return {
    title: `Departamentos en Alquiler | ${config.companyName}`,
    description: 'Encuentra los mejores departamentos en alquiler. Tu próximo hogar te está esperando.',
  }
}

export default async function DepartamentosEnAlquilerPage() {
  const config = await getSiteConfig()

  return (
    <>
      <DynamicStyles primaryColor={config.primaryColor} secondaryColor={config.secondaryColor} />
      <DynamicFavicon faviconUrl={config.favicon} />

      <div className="min-h-screen bg-gray-50">
        <Header config={config} />
        <PropertiesClientComponent pageTitle="Departamentos en Alquiler" />
        <Footer config={config} />
      </div>
    </>
  )
}