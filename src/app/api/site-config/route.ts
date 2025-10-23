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
          primaryColor: '#f97316'
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

    const config = await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        companyName: data.companyName,
        primaryColor: data.primaryColor
      },
      create: {
        companyName: data.companyName,
        primaryColor: data.primaryColor
      }
    })

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error updating site config:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}