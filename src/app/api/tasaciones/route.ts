import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validar campos requeridos
    const requiredFields = [
      'nombre',
      'telefono',
      'correo',
      'direccionPropiedad',
      'barrio',
      'tipologiaPropiedad',
      'operacionPropiedad'
    ]

    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        return NextResponse.json(
          { error: `El campo ${field} es requerido` },
          { status: 400 }
        )
      }
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.correo)) {
      return NextResponse.json(
        { error: 'El formato del correo electrónico no es válido' },
        { status: 400 }
      )
    }

    // Validar tipología de propiedad
    const tiposValidos = [
      'casa',
      'departamento',
      'ph',
      'duplex',
      'oficina',
      'local',
      'terreno',
      'quinta',
      'otros'
    ]
    if (!tiposValidos.includes(data.tipologiaPropiedad)) {
      return NextResponse.json(
        { error: 'Tipología de propiedad no válida' },
        { status: 400 }
      )
    }

    // Validar operación
    const operacionesValidas = ['venta', 'alquiler', 'alquiler-temporal']
    if (!operacionesValidas.includes(data.operacionPropiedad)) {
      return NextResponse.json(
        { error: 'Operación no válida' },
        { status: 400 }
      )
    }

    // Crear solicitud de tasación
    const tasacion = await prisma.tasacion.create({
      data: {
        nombre: data.nombre.trim(),
        telefono: data.telefono.trim(),
        correo: data.correo.trim().toLowerCase(),
        contenido: data.contenido?.trim() || '',
        direccionPropiedad: data.direccionPropiedad.trim(),
        barrio: data.barrio.trim(),
        tipologiaPropiedad: data.tipologiaPropiedad,
        operacionPropiedad: data.operacionPropiedad,
        status: 'new'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Solicitud de tasación enviada exitosamente',
      id: tasacion.id
    })

  } catch (error) {
    console.error('Error creating tasacion:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Obtener todas las solicitudes de tasación ordenadas por fecha de creación
    const tasaciones = await prisma.tasacion.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(tasaciones)
  } catch (error) {
    console.error('Error fetching tasaciones:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}