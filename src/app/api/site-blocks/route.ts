import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyAdminToken } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // First, ensure we have a site config
    let siteConfig = await prisma.siteConfig.findFirst()
    if (!siteConfig) {
      siteConfig = await prisma.siteConfig.create({
        data: {
          companyName: 'Inmobiliaria Homez',
          primaryColor: '#f97316'
        }
      })
    }

    const blocks = await prisma.siteBlock.findMany({
      orderBy: { position: 'asc' }
    })

    if (blocks.length === 0) {
      await prisma.siteBlock.createMany({
        data: [
          {
            type: 'hero',
            position: 1,
            visible: true,
            config: JSON.stringify({ name: 'Banner Principal', description: 'Sección hero con búsqueda' }),
            siteConfigId: siteConfig.id
          },
          {
            type: 'featured-properties',
            position: 2,
            visible: true,
            config: JSON.stringify({ name: 'Últimas propiedades', description: 'Muestra los inmuebles que fueron cargados más recientemente.' }),
            siteConfigId: siteConfig.id
          },
          {
            type: 'popular-neighborhoods',
            position: 3,
            visible: true,
            config: JSON.stringify({ name: 'Barrios Populares', description: 'Muestra los barrios con mayor cantidad de propiedades disponibles.' }),
            siteConfigId: siteConfig.id
          }
        ]
      })

      return NextResponse.json(await prisma.siteBlock.findMany({
        orderBy: { position: 'asc' }
      }))
    }

    return NextResponse.json(blocks)
  } catch (error) {
    console.error('Error fetching site blocks:', error)
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

    const { blockId, visible, config } = await request.json()

    const updatedBlock = await prisma.siteBlock.update({
      where: { id: blockId },
      data: {
        visible,
        config: config ? JSON.stringify(config) : JSON.stringify({})
      }
    })

    return NextResponse.json(updatedBlock)
  } catch (error) {
    console.error('Error updating site block:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}