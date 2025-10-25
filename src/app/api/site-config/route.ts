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
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          tagColor: data.tagColor,
          heroVariant: data.heroVariant,
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
          linkedin: data.linkedin,
          tiktok: data.tiktok,
          youtube: data.youtube
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
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          tagColor: data.tagColor,
          heroVariant: data.heroVariant,
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
          linkedin: data.linkedin,
          tiktok: data.tiktok,
          youtube: data.youtube
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