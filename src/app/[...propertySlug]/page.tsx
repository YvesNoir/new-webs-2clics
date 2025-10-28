import { getSiteConfig } from '@/lib/site-config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PropertiesClientComponent from '../propiedades/PropertiesClientComponent'
import DynamicStyles from '@/components/DynamicStyles'
import DynamicFavicon from '@/components/DynamicFavicon'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    propertySlug: string[]
  }>
}

// Function to parse slug and extract property type, operation, and location
function parsePropertySlug(slug: string[]): { propertyType?: string, operation?: string, location?: string, title?: string } | null {
  if (!slug || slug.length === 0) return null

  const fullSlug = slug.join('/')

  // Property type mappings (URL → API ID)
  const propertyTypeMap: { [key: string]: string } = {
    'casas': '5791',
    'departamentos': '5785',
    'oficinas': '5790',
    'chalets': '5793',
    'casas-quinta': '5781',
    'duplex': '5795',
    'ph': '5792',
    'terrenos': '5794',
    'locales-comerciales': '5780'
  }

  // Operation mappings (URL → API value)
  const operationMap: { [key: string]: string } = {
    'venta': 'VENTA',
    'alquiler': 'ALQUILER_PERMANENTE',
    'alquiler-temporario': 'ALQUILER_TEMPORARIO'
  }

  // Title mappings for display
  const propertyTitleMap: { [key: string]: string } = {
    'casas': 'Casas',
    'departamentos': 'Departamentos',
    'oficinas': 'Oficinas',
    'chalets': 'Chalets',
    'casas-quinta': 'Casas Quinta',
    'duplex': 'Dúplex',
    'ph': 'PH',
    'terrenos': 'Terrenos',
    'locales-comerciales': 'Locales Comerciales'
  }

  const operationTitleMap: { [key: string]: string } = {
    'venta': 'en Venta',
    'alquiler': 'en Alquiler',
    'alquiler-temporario': 'Alquiler Temporario'
  }

  // Function to convert location slug back to title case
  const formatLocationTitle = (locationSlug: string): string => {
    return locationSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // First check for operation-only patterns
  if (fullSlug === 'propiedades-en-venta') {
    return {
      operation: 'VENTA',
      title: 'Propiedades en Venta'
    }
  }
  if (fullSlug === 'propiedades-en-alquiler') {
    return {
      operation: 'ALQUILER_PERMANENTE',
      title: 'Propiedades en Alquiler'
    }
  }
  if (fullSlug === 'propiedades-alquiler-temporario') {
    return {
      operation: 'ALQUILER_TEMPORARIO',
      title: 'Propiedades Alquiler Temporario'
    }
  }

  // Check for property+operation+location patterns like: departamentos-en-venta-en-coghlan
  for (const [propertyKey, propertyValue] of Object.entries(propertyTypeMap)) {
    for (const [operationKey, operationValue] of Object.entries(operationMap)) {
      let basePattern: string

      if (operationKey === 'alquiler-temporario') {
        basePattern = `${propertyKey}-${operationKey}`
      } else {
        basePattern = `${propertyKey}-en-${operationKey}`
      }

      // Check for pattern with location suffix: pattern-en-location
      const locationMatch = fullSlug.match(new RegExp(`^${basePattern}-en-(.+)$`))
      if (locationMatch) {
        const locationSlug = locationMatch[1]
        const locationTitle = formatLocationTitle(locationSlug)
        const propertyTitle = propertyTitleMap[propertyKey]
        const operationTitle = operationTitleMap[operationKey]

        return {
          propertyType: propertyValue,
          operation: operationValue,
          location: locationTitle,
          title: `${propertyTitle} ${operationTitle} en ${locationTitle}`
        }
      }

      // Check for exact pattern match (without location)
      if (fullSlug === basePattern) {
        const propertyTitle = propertyTitleMap[propertyKey]
        const operationTitle = operationTitleMap[operationKey]

        return {
          propertyType: propertyValue,
          operation: operationValue,
          title: `${propertyTitle} ${operationTitle}`
        }
      }
    }
  }

  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = await getSiteConfig()
  const resolvedParams = await params
  const parsed = parsePropertySlug(resolvedParams.propertySlug)

  if (!parsed) {
    return {
      title: `Página no encontrada | ${config.companyName}`,
    }
  }

  return {
    title: `${parsed.title} | ${config.companyName}`,
    description: `Encuentra las mejores ${parsed.title.toLowerCase()}. Tu próximo hogar te está esperando.`,
  }
}

export default async function DynamicPropertyPage({ params }: PageProps) {
  const config = await getSiteConfig()
  const resolvedParams = await params
  const parsed = parsePropertySlug(resolvedParams.propertySlug)

  // If slug doesn't match any pattern, return 404
  if (!parsed) {
    notFound()
  }

  // Create query params for the component
  const searchParams = new URLSearchParams()

  if (parsed.propertyType) {
    searchParams.set('tipo', parsed.propertyType)
  }

  if (parsed.operation) {
    searchParams.set('operacion', parsed.operation)
  }

  if (parsed.location) {
    searchParams.set('ubicacion', parsed.location)
  }

  return (
    <>
      <DynamicStyles config={config} />
      <DynamicFavicon config={config} />
      <Header config={config} />
      <main>
        <PropertiesClientComponent
          pageTitle={parsed.title}
          initialFilters={{
            ...(parsed.propertyType && { property_type: [parsed.propertyType] }),
            ...(parsed.operation && { operation_type: [parsed.operation] }),
            ...(parsed.location && { location: parsed.location })
          }}
        />
      </main>
      <Footer config={config} />
    </>
  )
}