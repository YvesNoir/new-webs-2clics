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
    title: `Propiedades Alquiler Temporario | ${config.companyName}`,
    description: 'Propiedades en alquiler temporario. Estancias cortas, alojamientos temporales y alquileres por temporada.',
  }
}

export default async function PropiedadesAlquilerTemporarioPage() {
  const config = await getSiteConfig()

  return (
    <>
      <DynamicStyles primaryColor={config.primaryColor} secondaryColor={config.secondaryColor} />
      <DynamicFavicon faviconUrl={config.favicon} />

      <div className="min-h-screen bg-gray-50">
        <Header config={config} />
        <PropertiesClientComponent defaultFilter="sold" />
        <Footer config={config} />
      </div>
    </>
  )
}