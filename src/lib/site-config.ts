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
  footerBackgroundColor?: string
  footerTextColor?: string
  footerLogo?: string
  heroVariant?: string
  videoUrl?: string
  heroTitle?: string
  heroSubtitle?: string
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

    if (config) {
      // Convert null values to undefined to match SiteConfig interface
      return {
        ...config,
        siteTitle: config.siteTitle ?? undefined,
        siteDescription: config.siteDescription ?? undefined,
        logo: config.logo ?? undefined,
        favicon: config.favicon ?? undefined,
        address: config.address ?? undefined,
        schedule: config.schedule ?? undefined,
        phone: config.phone ?? undefined,
        whatsapp: config.whatsapp ?? undefined,
        email: config.email ?? undefined,
        footerBackgroundColor: config.footerBackgroundColor ?? undefined,
        footerTextColor: config.footerTextColor ?? undefined,
        footerLogo: config.footerLogo ?? undefined,
        heroVariant: config.heroVariant ?? undefined,
        mapUrl: config.mapUrl ?? undefined,
        showMap: config.showMap ?? undefined,
        facebook: config.facebook ?? undefined,
        instagram: config.instagram ?? undefined,
        twitter: config.twitter ?? undefined,
        linkedin: config.linkedin ?? undefined,
        tiktok: config.tiktok ?? undefined,
        youtube: config.youtube ?? undefined,
        aboutTitle: config.aboutTitle ?? undefined,
        aboutSubtitle: config.aboutSubtitle ?? undefined,
        aboutContent: config.aboutContent ?? undefined,
        contactTitle: config.contactTitle ?? undefined,
        contactDescription: config.contactDescription ?? undefined,
        nosotrosTitle: config.nosotrosTitle ?? undefined,
        nosotrosDescription: config.nosotrosDescription ?? undefined,
        nosotrosContent: config.nosotrosContent ?? undefined,
        tasacionesTitle: config.tasacionesTitle ?? undefined,
        tasacionesDescription: config.tasacionesDescription ?? undefined,
        videoUrl: config.videoUrl ?? undefined,
        heroTitle: config.heroTitle ?? undefined,
        heroSubtitle: config.heroSubtitle ?? undefined
      }
    }

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
      footerBackgroundColor: '#1f2937',
      footerTextColor: '#ffffff',
      footerLogo: '',
      heroVariant: 'variant1',
      videoUrl: '',
      heroTitle: '',
      heroSubtitle: '',
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
      footerBackgroundColor: '#1f2937',
      footerTextColor: '#ffffff',
      footerLogo: '',
      heroVariant: 'variant1',
      videoUrl: '',
      heroTitle: '',
      heroSubtitle: '',
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