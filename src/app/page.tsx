import { PrismaClient } from '@prisma/client'
import { Metadata } from 'next'
import { getSiteConfig } from '@/lib/site-config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/blocks/HeroSection'
import FeaturedProperties from '@/components/blocks/FeaturedProperties'
import PopularNeighborhoods from '@/components/blocks/PopularNeighborhoods'
import DynamicStyles from '@/components/DynamicStyles'
import DynamicFavicon from '@/components/DynamicFavicon'

const prisma = new PrismaClient()

async function getHomeData() {
  const [config, blocks] = await Promise.all([
    getSiteConfig(),
    prisma.siteBlock.findMany({
      where: { visible: true },
      orderBy: { position: 'asc' }
    })
  ])

  return {
    config,
    blocks: blocks || []
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getHomeData()

  // Crear el título combinando siteTitle y siteDescription
  const pageTitle = config.siteTitle && config.siteDescription
    ? `${config.siteTitle} | ${config.siteDescription}`
    : config.siteTitle || config.siteDescription || 'Inmobiliaria - Encuentra tu hogar ideal'

  return {
    title: pageTitle,
    description: config.siteDescription || 'Descubre las mejores propiedades en venta y alquiler. Tu hogar ideal te está esperando.',
  }
}

export default async function HomePage() {
  const { config, blocks } = await getHomeData()

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

  return (
    <>
      <DynamicStyles primaryColor={config.primaryColor} secondaryColor={config.secondaryColor} />
      <DynamicFavicon faviconUrl={config.favicon} />

      <main className="min-h-screen">
        <Header config={config} />

        {/* Hero Section - Always rendered from config */}
        <HeroSection config={config} />

        {/* Other blocks from database */}
        {blocks.map(renderBlock)}

        <Footer config={config} />
      </main>
    </>
  )
}