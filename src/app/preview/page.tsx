import { PrismaClient } from '@prisma/client'
import Header from '@/components/layout/Header'
import HeroSection from '@/components/blocks/HeroSection'
import FeaturedProperties from '@/components/blocks/FeaturedProperties'
import Footer from '@/components/layout/Footer'
import DynamicStyles from '@/components/DynamicStyles'

const prisma = new PrismaClient()

async function getPreviewData() {
  const [config, blocks] = await Promise.all([
    prisma.siteConfig.findFirst(),
    prisma.siteBlock.findMany({
      where: { visible: true },
      orderBy: { position: 'asc' }
    })
  ])

  return {
    config: config || {
      companyName: 'Inmobiliaria Homez',
      primaryColor: '#f97316'
    },
    blocks: blocks || []
  }
}

export default async function PreviewPage() {
  const { config, blocks } = await getPreviewData()

  const renderBlock = (block: any) => {
    switch (block.type) {
      case 'hero':
        return <HeroSection key={block.id} config={config} />
      case 'featured-properties':
        return <FeaturedProperties key={block.id} config={config} />
      default:
        return null
    }
  }

  return (
    <>
      <DynamicStyles primaryColor={config.primaryColor} />

      <div className="min-h-screen">
        <Header config={config} />

        <main>
          {blocks.map(renderBlock)}
        </main>

        <Footer config={config} />
      </div>
    </>
  )
}