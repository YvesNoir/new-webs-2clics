-- Migración limpia a PostgreSQL para new-webs-2clics
-- Ejecutar en pgAdmin conectado a la base de datos "db_new2clics"

-- ============================================================================
-- 1. CONFIGURACIÓN INICIAL
-- ============================================================================

-- Establecer el schema por defecto
SET search_path TO "new2clics_schema", public;

-- ============================================================================
-- 2. EXTENSIONES NECESARIAS
-- ============================================================================

-- Extensiones útiles para la aplicación
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================================
-- 3. ELIMINAR TABLAS SI EXISTEN (para ejecutar script múltiples veces)
-- ============================================================================

DROP TABLE IF EXISTS "tasaciones" CASCADE;
DROP TABLE IF EXISTS "contacts" CASCADE;
DROP TABLE IF EXISTS "properties" CASCADE;
DROP TABLE IF EXISTS "agents" CASCADE;
DROP TABLE IF EXISTS "site_blocks" CASCADE;
DROP TABLE IF EXISTS "site_configs" CASCADE;
DROP TABLE IF EXISTS "admins" CASCADE;

-- ============================================================================
-- 4. CREAR TABLAS
-- ============================================================================

-- Tabla de administradores
CREATE TABLE "admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de configuración del sitio
CREATE TABLE "site_configs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "siteTitle" TEXT,
    "siteDescription" TEXT,
    "logo" TEXT,
    "favicon" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#f97316',
    "secondaryColor" TEXT NOT NULL DEFAULT '#1f2937',
    "tagColor" TEXT NOT NULL DEFAULT '#10b981',

    -- Footer customization
    "footerBackgroundColor" TEXT DEFAULT '#1f2937',
    "footerTextColor" TEXT DEFAULT '#ffffff',
    "footerLogo" TEXT,

    "phone" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "address" TEXT,
    "schedule" TEXT,
    "description" TEXT,
    "mapUrl" TEXT,
    "showMap" BOOLEAN NOT NULL DEFAULT true,
    "heroVariant" TEXT NOT NULL DEFAULT 'variant1',
    "videoUrl" TEXT,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,

    -- Redes sociales
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,

    -- Configuración páginas
    "aboutTitle" TEXT DEFAULT 'Sobre Nosotros',
    "aboutSubtitle" TEXT DEFAULT 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.',
    "aboutContent" TEXT,
    "contactTitle" TEXT DEFAULT 'Contacto',
    "contactDescription" TEXT DEFAULT '¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.',
    "nosotrosTitle" TEXT DEFAULT 'Sobre Nosotros',
    "nosotrosDescription" TEXT DEFAULT 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.',
    "nosotrosContent" TEXT,
    "tasacionesTitle" TEXT DEFAULT 'Tasaciones',
    "tasacionesDescription" TEXT DEFAULT 'Obtén una tasación profesional de tu propiedad de forma gratuita.',

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de bloques del sitio
CREATE TABLE "site_blocks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "config" TEXT NOT NULL,
    "siteConfigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "site_blocks_siteConfigId_fkey" FOREIGN KEY ("siteConfigId") REFERENCES "site_configs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla de agentes
CREATE TABLE "agents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "photo" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de propiedades
CREATE TABLE "properties" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "location" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "area" DECIMAL(10,2) NOT NULL,
    "images" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "agentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "properties_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agents" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla de contactos
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "propertyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contacts_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla de tasaciones
CREATE TABLE "tasaciones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contenido" TEXT,
    "direccionPropiedad" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,
    "tipologiaPropiedad" TEXT NOT NULL,
    "operacionPropiedad" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nueva',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. DATOS INICIALES
-- ============================================================================

-- Insertar administrador por defecto
INSERT INTO "admins" ("id", "email", "password", "name", "createdAt", "updatedAt")
VALUES (
    'cmh96dv9i00007m4ia9zstfh0',
    'admin@inmobiliaria.com',
    '$2b$10$HC/agexQG3jxubu36cqGDumkCS1Cy6/v4I34C4u.1PCU.1WZIEj0q',
    'Administrador',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insertar configuración por defecto del sitio
INSERT INTO "site_configs" (
    "id",
    "companyName",
    "siteTitle",
    "siteDescription",
    "logo",
    "favicon",
    "primaryColor",
    "secondaryColor",
    "tagColor",
    "footerBackgroundColor",
    "footerTextColor",
    "footerLogo",
    "phone",
    "whatsapp",
    "email",
    "address",
    "schedule",
    "description",
    "mapUrl",
    "showMap",
    "heroVariant",
    "videoUrl",
    "heroTitle",
    "heroSubtitle",
    "facebook",
    "instagram",
    "twitter",
    "linkedin",
    "tiktok",
    "youtube",
    "aboutTitle",
    "aboutSubtitle",
    "aboutContent",
    "contactTitle",
    "contactDescription",
    "nosotrosTitle",
    "nosotrosDescription",
    "nosotrosContent",
    "tasacionesTitle",
    "tasacionesDescription",
    "createdAt",
    "updatedAt"
) VALUES (
    'default',
    'Mi Inmobiliaria',
    'Mi Inmobiliaria - Propiedades de Calidad',
    'Tu inmobiliaria de confianza, especializada en la venta y alquiler de propiedades',
    '',
    '',
    '#f97316',
    '#1f2937',
    '#10b981',
    '#1f2937',
    '#ffffff',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    true,
    'variant1',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'Sobre Nosotros',
    'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.',
    '',
    'Contacto',
    '¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.',
    'Sobre Nosotros',
    'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.',
    '',
    'Tasaciones',
    'Obtén una tasación profesional de tu propiedad de forma gratuita.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insertar bloques del sitio por defecto
INSERT INTO "site_blocks" ("id", "type", "position", "visible", "config", "siteConfigId", "createdAt", "updatedAt")
VALUES
    ('hero-block-default', 'hero', 1, true, '{}', 'default', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ultimas-prop-1761345231', 'featured-properties', 3, true, '{}', 'default', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('barrios-populares-1761345409', 'popular-neighborhoods', 4, true, '{}', 'default', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insertar agentes de ejemplo
INSERT INTO "agents" ("id", "name", "email", "phone", "photo", "bio", "createdAt", "updatedAt")
VALUES
    (
        'cmh3hy1u900057mmjepowllur',
        'María González',
        'maria@inmobiliaria.com',
        '+54 11 1111-1111',
        NULL,
        'Especialista en propiedades residenciales con más de 10 años de experiencia.',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'cmh3hy1ua00067mmj6g2vaopc',
        'Carlos Rodríguez',
        'carlos@inmobiliaria.com',
        '+54 11 2222-2222',
        NULL,
        'Experto en inversiones inmobiliarias y propiedades comerciales.',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Insertar propiedades de ejemplo
INSERT INTO "properties" (
    "id",
    "title",
    "description",
    "price",
    "location",
    "bedrooms",
    "bathrooms",
    "area",
    "images",
    "featured",
    "status",
    "type",
    "agentId",
    "createdAt",
    "updatedAt"
) VALUES
    (
        'cmh3hy1ub00087mmjnphp0sk2',
        'Casa Moderna en Palermo',
        'Hermosa casa de dos plantas con jardín y parrilla. Ubicada en una zona muy tranquila de Palermo.',
        450000.0,
        'Palermo, Buenos Aires',
        3,
        2,
        120.0,
        '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3"]',
        true,
        'available',
        'sale',
        'cmh3hy1u900057mmjepowllur',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'cmh3hy1ub000c7mmjnctd0lg4',
        'Penthouse con Vista',
        'Exclusivo penthouse con vista panorámica de la ciudad.',
        850000.0,
        'Puerto Madero, Buenos Aires',
        3,
        3,
        150.0,
        '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3"]',
        true,
        'available',
        'sale',
        'cmh3hy1ua00067mmj6g2vaopc',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'cmh3hy1ub000e7mmjea6irvwq',
        'Casa Familiar con Jardín',
        'Perfecta para familias, cuenta con 4 dormitorios y amplio jardín.',
        2800.0,
        'Villa Crespo, Buenos Aires',
        4,
        3,
        180.0,
        '["https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3"]',
        true,
        'available',
        'rent',
        'cmh3hy1u900057mmjepowllur',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'cmh3hy1ub000b7mmjq5wtpwpd',
        'Departamento Luminoso',
        'Amplio departamento de 2 ambientes con excelente iluminación natural.',
        180000.0,
        'Belgrano, Buenos Aires',
        2,
        1,
        75.0,
        '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"]',
        true,
        'available',
        'sale',
        'cmh3hy1ua00067mmj6g2vaopc',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- ============================================================================
-- 6. ÍNDICES PARA PERFORMANCE
-- ============================================================================

CREATE INDEX "idx_admins_email" ON "admins"("email");
CREATE INDEX "idx_site_blocks_siteConfigId" ON "site_blocks"("siteConfigId");
CREATE INDEX "idx_properties_agentId" ON "properties"("agentId");
CREATE INDEX "idx_properties_status" ON "properties"("status");
CREATE INDEX "idx_properties_type" ON "properties"("type");
CREATE INDEX "idx_properties_featured" ON "properties"("featured");
CREATE INDEX "idx_contacts_propertyId" ON "contacts"("propertyId");
CREATE INDEX "idx_contacts_status" ON "contacts"("status");
CREATE INDEX "idx_tasaciones_status" ON "tasaciones"("status");

-- ============================================================================
-- 7. COMENTARIOS DE DOCUMENTACIÓN
-- ============================================================================

COMMENT ON TABLE "admins" IS 'Tabla de administradores del sistema';
COMMENT ON TABLE "site_configs" IS 'Configuración general del sitio web';
COMMENT ON TABLE "site_blocks" IS 'Bloques configurables del sitio';
COMMENT ON TABLE "agents" IS 'Agentes inmobiliarios';
COMMENT ON TABLE "properties" IS 'Propiedades inmobiliarias';
COMMENT ON TABLE "contacts" IS 'Consultas y contactos recibidos';
COMMENT ON TABLE "tasaciones" IS 'Solicitudes de tasación de propiedades';

COMMENT ON COLUMN "site_configs"."footerBackgroundColor" IS 'Color de fondo del footer en formato hexadecimal';
COMMENT ON COLUMN "site_configs"."footerTextColor" IS 'Color del texto del footer en formato hexadecimal';
COMMENT ON COLUMN "site_configs"."footerLogo" IS 'URL del logo que aparece en el footer';

-- ============================================================================
-- 8. MENSAJE FINAL
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Migración completada exitosamente';
    RAISE NOTICE '📊 Tablas creadas: 7 tablas principales';
    RAISE NOTICE '👤 Usuario admin: admin@inmobiliaria.com';
    RAISE NOTICE '🏠 Propiedades de ejemplo: 4 propiedades';
    RAISE NOTICE '🎨 Footer personalizable: Habilitado';
    RAISE NOTICE '';
    RAISE NOTICE '🔧 Próximos pasos:';
    RAISE NOTICE '1. Actualizar .env con DATABASE_URL de PostgreSQL';
    RAISE NOTICE '2. Ejecutar: npx prisma generate';
    RAISE NOTICE '3. Ejecutar: npx prisma db push';
    RAISE NOTICE '4. Reiniciar el servidor: npm run dev';
END $$;