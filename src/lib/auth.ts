import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from './db'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here'

export interface AdminTokenPayload {
  adminId: string
  email: string
}

export async function validateAdmin(email: string, password: string) {
  try {
    const admin = await db.admin.findUnique({
      where: { email }
    })

    if (!admin) {
      return null
    }

    const isValidPassword = await bcrypt.compare(password, admin.password)

    if (!isValidPassword) {
      return null
    }

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name
    }
  } catch (error) {
    console.error('Error validating admin:', error)
    return null
  }
}

export function generateAdminToken(adminId: string, email: string): string {
  return jwt.sign(
    { adminId, email },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminTokenPayload
    return decoded
  } catch (error) {
    return null
  }
}