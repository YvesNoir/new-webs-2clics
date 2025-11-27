import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyAdminToken } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const config = await prisma.siteConfig.findFirst()

    if (!config) {
      const defaultConfig = await prisma.siteConfig.create({
        data: {
          companyName: 'Inmobiliaria Homez',
          siteTitle: 'Inmobiliaria Homez - Propiedades de Calidad',
          siteDescription: 'Tu inmobiliaria de confianza, especializada en la venta y alquiler de propiedades',
          logo: '',
          favicon: '',
          address: '',
          schedule: '',
          mapUrl: '',
          showMap: true,
          phone: '',
          whatsapp: '',
          email: '',
          primaryColor: '#f97316',
          secondaryColor: '#1f2937',
          tagColor: '#10b981',
          heroVariant: 'variant1',
          videoUrl: '',
          heroTitle: '',
          heroSubtitle: '',
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
          contactDescription: '¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.'
        }
      })
      return NextResponse.json(defaultConfig)
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error fetching site config:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const data = await request.json()

    // Primero intentamos encontrar la configuración existente
    let config = await prisma.siteConfig.findFirst()

    if (config) {
      // Si existe, la actualizamos
      config = await prisma.siteConfig.update({
        where: { id: config.id },
        data: {
          companyName: data.companyName,
          siteTitle: data.siteTitle,
          siteDescription: data.siteDescription,
          logo: data.logo,
          favicon: data.favicon,
          address: data.address,
          schedule: data.schedule,
          mapUrl: data.mapUrl,
          showMap: data.showMap,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          tagColor: data.tagColor,
          heroVariant: data.heroVariant,
          videoUrl: data.videoUrl,
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
          linkedin: data.linkedin,
          tiktok: data.tiktok,
          youtube: data.youtube,
          aboutTitle: data.aboutTitle,
          aboutSubtitle: data.aboutSubtitle,
          aboutContent: data.aboutContent,
          contactTitle: data.contactTitle,
          contactDescription: data.contactDescription
        }
      })
    } else {
      // Si no existe, la creamos
      config = await prisma.siteConfig.create({
        data: {
          companyName: data.companyName,
          siteTitle: data.siteTitle,
          siteDescription: data.siteDescription,
          logo: data.logo,
          favicon: data.favicon,
          address: data.address,
          schedule: data.schedule,
          mapUrl: data.mapUrl,
          showMap: data.showMap,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          tagColor: data.tagColor,
          heroVariant: data.heroVariant,
          videoUrl: data.videoUrl,
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
          linkedin: data.linkedin,
          tiktok: data.tiktok,
          youtube: data.youtube,
          aboutTitle: data.aboutTitle,
          aboutSubtitle: data.aboutSubtitle,
          aboutContent: data.aboutContent,
          contactTitle: data.contactTitle,
          contactDescription: data.contactDescription
        }
      })
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error updating site config:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}