import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { verifyAdminToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const token = request.cookies.get('admin-token')?.value

    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const type: string = data.get('type') as string // 'logo' or 'favicon'

    if (!file) {
      return NextResponse.json(
        { error: 'No se encontró archivo' },
        { status: 400 }
      )
    }

    if (!type || !['logo', 'favicon'].includes(type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo inválido' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    const allowedTypes = type === 'favicon'
      ? ['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/svg+xml']
      : ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo de archivo no permitido para ${type}` },
        { status: 400 }
      )
    }

    // Crear nombre único para el archivo
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const fileName = `${type}_${timestamp}.${extension}`

    // Definir ruta de destino
    const uploadDir = type === 'logo' ? 'public/uploads/logos' : 'public/uploads/favicons'
    const filePath = join(process.cwd(), uploadDir, fileName)

    // Convertir archivo a buffer y guardar
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Retornar URL pública del archivo
    const publicUrl = `/uploads/${type === 'logo' ? 'logos' : 'favicons'}/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      type
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}