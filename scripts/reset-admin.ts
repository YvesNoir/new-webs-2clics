import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetAdmin() {
  console.log('🔄 Actualizando contraseña del administrador...')

  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.admin.update({
    where: { email: 'admin@inmobiliaria.com' },
    data: {
      password: hashedPassword
    }
  })

  console.log('✅ Contraseña del administrador actualizada:')
  console.log('   Email:', admin.email)
  console.log('   Contraseña: admin123')
  console.log('   Password hash:', hashedPassword.substring(0, 20) + '...')
}

resetAdmin()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })