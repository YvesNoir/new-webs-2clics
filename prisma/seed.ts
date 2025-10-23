import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Comenzando a popular la base de datos...')

  // Crear usuario administrador por defecto
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@inmobiliaria.com' },
    update: {},
    create: {
      email: 'admin@inmobiliaria.com',
      password: hashedPassword,
      name: 'Administrador'
    }
  })

  console.log('✅ Administrador creado:', admin)

  // Crear configuración inicial del sitio
  const siteConfig = await prisma.siteConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      companyName: 'Inmobiliaria Homez',
      primaryColor: '#f97316',
      secondaryColor: '#64748b',
      phone: '+54 11 1234-5678',
      email: 'contacto@inmobiliaria.com',
      address: 'Av. Corrientes 1234, CABA',
      description: 'Tu socio confiable en bienes raíces. Ayudamos a encontrar el hogar perfecto para ti y tu familia.',
      facebook: 'https://facebook.com/inmobiliaria',
      instagram: 'https://instagram.com/inmobiliaria',
    }
  })

  console.log('✅ Configuración del sitio creada:', siteConfig)

  // Crear bloques por defecto
  const heroBlock = await prisma.siteBlock.create({
    data: {
      type: 'hero',
      position: 1,
      visible: true,
      siteConfigId: siteConfig.id,
      config: JSON.stringify({
        title: 'Encontrar tu',
        titleHighlight: 'Hogar Ideal',
        subtitle: 'LA MEJOR FORMA DE',
        description: 'Tenemos más de 745,000 apartamentos, casas y terrenos disponibles.',
        showSearchForm: true,
        backgroundStyle: 'geometric'
      })
    }
  })

  const featuredPropertiesBlock = await prisma.siteBlock.create({
    data: {
      type: 'featured-properties',
      position: 2,
      visible: true,
      siteConfigId: siteConfig.id,
      config: JSON.stringify({
        title: 'Propiedades Destacadas',
        description: 'Descubre nuestra selección de las mejores propiedades disponibles en las ubicaciones más deseadas.',
        maxProperties: 4,
        showViewAllButton: true
      })
    }
  })

  console.log('✅ Bloques creados:')
  console.log('  - Hero:', heroBlock)
  console.log('  - Featured Properties:', featuredPropertiesBlock)

  // Crear algunos agentes de ejemplo
  const agent1 = await prisma.agent.create({
    data: {
      name: 'María González',
      email: 'maria@inmobiliaria.com',
      phone: '+54 11 1111-1111',
      bio: 'Especialista en propiedades residenciales con más de 10 años de experiencia.'
    }
  })

  const agent2 = await prisma.agent.create({
    data: {
      name: 'Carlos Rodríguez',
      email: 'carlos@inmobiliaria.com',
      phone: '+54 11 2222-2222',
      bio: 'Experto en inversiones inmobiliarias y propiedades comerciales.'
    }
  })

  console.log('✅ Agentes creados:', [agent1, agent2])

  // Crear propiedades de ejemplo
  const properties = await Promise.all([
    prisma.property.create({
      data: {
        title: 'Casa Moderna en Palermo',
        description: 'Hermosa casa de dos plantas con jardín y parrilla. Ubicada en una zona muy tranquila de Palermo.',
        price: 450000,
        location: 'Palermo, Buenos Aires',
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3'
        ]),
        featured: true,
        status: 'available',
        type: 'sale',
        agentId: agent1.id
      }
    }),
    prisma.property.create({
      data: {
        title: 'Departamento Luminoso',
        description: 'Amplio departamento de 2 ambientes con excelente iluminación natural.',
        price: 180000,
        location: 'Belgrano, Buenos Aires',
        bedrooms: 2,
        bathrooms: 1,
        area: 75,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3'
        ]),
        featured: true,
        status: 'available',
        type: 'sale',
        agentId: agent2.id
      }
    }),
    prisma.property.create({
      data: {
        title: 'Casa Familiar con Jardín',
        description: 'Perfecta para familias, cuenta con 4 dormitorios y amplio jardín.',
        price: 2800,
        location: 'Villa Crespo, Buenos Aires',
        bedrooms: 4,
        bathrooms: 3,
        area: 180,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3'
        ]),
        featured: true,
        status: 'available',
        type: 'rent',
        agentId: agent1.id
      }
    }),
    prisma.property.create({
      data: {
        title: 'Penthouse con Vista',
        description: 'Exclusivo penthouse con vista panorámica de la ciudad.',
        price: 850000,
        location: 'Puerto Madero, Buenos Aires',
        bedrooms: 3,
        bathrooms: 3,
        area: 150,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3'
        ]),
        featured: true,
        status: 'available',
        type: 'sale',
        agentId: agent2.id
      }
    })
  ])

  console.log('✅ Propiedades creadas:', properties.length)

  console.log('🎉 Base de datos popolada exitosamente!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })