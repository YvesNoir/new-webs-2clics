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
  mapUrl?: string
  showMap?: boolean
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  tiktok?: string
  youtube?: string
  // Configuración página Nosotros
  aboutTitle?: string
  aboutSubtitle?: string
  aboutContent?: string
  // Configuración página Contacto
  contactTitle?: string
  contactDescription?: string
  // Configuración página Nosotros
  nosotrosTitle?: string
  nosotrosDescription?: string
  nosotrosContent?: string
  // Configuración página Tasaciones
  tasacionesTitle?: string
  tasacionesDescription?: string
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
      mapUrl: '',
      showMap: true,
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      tiktok: '',
      youtube: '',
      aboutTitle: 'Sobre Nosotros',
      aboutSubtitle: 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.',
      aboutContent: '',
      contactTitle: 'Contacto',
      contactDescription: '¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.',
      nosotrosTitle: 'Sobre Nosotros',
      nosotrosDescription: 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.',
      nosotrosContent: '',
      tasacionesTitle: 'Tasaciones',
      tasacionesDescription: 'Obtén una tasación profesional de tu propiedad de forma gratuita.'
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
      mapUrl: '',
      showMap: true,
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      tiktok: '',
      youtube: '',
      aboutTitle: 'Sobre Nosotros',
      aboutSubtitle: 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.',
      aboutContent: '',
      contactTitle: 'Contacto',
      contactDescription: '¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.',
      nosotrosTitle: 'Sobre Nosotros',
      nosotrosDescription: 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.',
      nosotrosContent: '',
      tasacionesTitle: 'Tasaciones',
      tasacionesDescription: 'Obtén una tasación profesional de tu propiedad de forma gratuita.'
    }
  }
}