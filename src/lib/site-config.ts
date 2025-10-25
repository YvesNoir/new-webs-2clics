import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface SiteConfig {
  id?: string
  companyName: string
  siteTitle?: string
  siteDescription?: string
  logo?: string
  favicon?: string
  address?: string
  schedule?: string
  phone?: string
  whatsapp?: string
  email?: string
  primaryColor: string
  secondaryColor: string
  tagColor: string
  heroVariant?: string
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  tiktok?: string
  youtube?: string
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const config = await prisma.siteConfig.findFirst()

    return config || {
      companyName: 'Inmobiliaria Homez',
      siteTitle: 'Inmobiliaria Homez - Propiedades de Calidad',
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
      heroVariant: 'variant1',
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      tiktok: '',
      youtube: ''
    }
  } catch (error) {
    console.error('Error fetching site config:', error)
    // Return default config if error
    return {
      companyName: 'Inmobiliaria Homez',
      siteTitle: 'Inmobiliaria Homez - Propiedades de Calidad',
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
      heroVariant: 'variant1',
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      tiktok: '',
      youtube: ''
    }
  }
}