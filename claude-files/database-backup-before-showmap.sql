PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('2114d7e2-20fc-4c62-a4e3-7aca93bf05a8','24813f50df69e4f02abf94595541af8e1d43bf15d6c54219e1370db5c20ae23f',1761228356676,'20251023140556_init',NULL,NULL,1761228356675,1);
INSERT INTO _prisma_migrations VALUES('7101a223-210d-42d3-8bd9-aef4eed6af8b','3586666d4d45ebbce779a63f4ba698fe9fe01ad73ddc0519c20602ee8f6a9f5e',1761316381946,'20251024143301_add_site_config_fields',NULL,NULL,1761316381944,1);
INSERT INTO _prisma_migrations VALUES('637e68ed-614d-4523-b808-1d8d06b3bcb2','8c033a43ee066b4e39ffd77ad38ac203900f91b549295c1dd63de8785d70dd2d',1761318073721,'20251024150113_add_hero_variant',NULL,NULL,1761318073720,1);
INSERT INTO _prisma_migrations VALUES('33877a9c-babf-4c09-a7b9-26c29ec80f70','2ba1b07ddf92313945e747a116313843ac6f95869b96f2357ad4e153bc793b14',1761347069066,'20251024230429_add_tag_color',NULL,NULL,1761347069064,1);
CREATE TABLE IF NOT EXISTS "admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO admins VALUES('cmh3hy1u200007mmjmtxkm7db','admin@inmobiliaria.com','$2b$10$L96FLGHesJx5ggVOI3xWCuMzQQ9fD8ATAQg9WysQw97.yb8w9Ty8m','Administrador',1761228450507,1761231009261);
CREATE TABLE IF NOT EXISTS "site_blocks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "config" TEXT NOT NULL,
    "siteConfigId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "site_blocks_siteConfigId_fkey" FOREIGN KEY ("siteConfigId") REFERENCES "site_configs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO site_blocks VALUES('ultimas-prop-1761345231','featured-properties',3,1,'{}','default','2025-10-24 22:33:51',1761416349795);
INSERT INTO site_blocks VALUES('barrios-populares-1761345409','popular-neighborhoods',4,1,'{}','default','2025-10-24 22:36:49',1761347181166);
CREATE TABLE IF NOT EXISTS "properties" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "location" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "area" REAL NOT NULL,
    "images" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "agentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "properties_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agents" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO properties VALUES('cmh3hy1ub00087mmjnphp0sk2','Casa Moderna en Palermo','Hermosa casa de dos plantas con jardín y parrilla. Ubicada en una zona muy tranquila de Palermo.',450000.0,'Palermo, Buenos Aires',3,2,120.0,'["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3"]',1,'available','sale','cmh3hy1u900057mmjepowllur',1761228450516,1761228450516);
INSERT INTO properties VALUES('cmh3hy1ub000c7mmjnctd0lg4','Penthouse con Vista','Exclusivo penthouse con vista panorámica de la ciudad.',850000.0,'Puerto Madero, Buenos Aires',3,3,150.0,'["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3"]',1,'available','sale','cmh3hy1ua00067mmj6g2vaopc',1761228450516,1761228450516);
INSERT INTO properties VALUES('cmh3hy1ub000e7mmjea6irvwq','Casa Familiar con Jardín','Perfecta para familias, cuenta con 4 dormitorios y amplio jardín.',2800.0,'Villa Crespo, Buenos Aires',4,3,180.0,'["https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3"]',1,'available','rent','cmh3hy1u900057mmjepowllur',1761228450516,1761228450516);
INSERT INTO properties VALUES('cmh3hy1ub000b7mmjq5wtpwpd','Departamento Luminoso','Amplio departamento de 2 ambientes con excelente iluminación natural.',180000.0,'Belgrano, Buenos Aires',2,1,75.0,'["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"]',1,'available','sale','cmh3hy1ua00067mmj6g2vaopc',1761228450516,1761228450516);
CREATE TABLE IF NOT EXISTS "agents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "photo" TEXT,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO agents VALUES('cmh3hy1u900057mmjepowllur','María González','maria@inmobiliaria.com','+54 11 1111-1111',NULL,'Especialista en propiedades residenciales con más de 10 años de experiencia.',1761228450514,1761228450514);
INSERT INTO agents VALUES('cmh3hy1ua00067mmj6g2vaopc','Carlos Rodríguez','carlos@inmobiliaria.com','+54 11 2222-2222',NULL,'Experto en inversiones inmobiliarias y propiedades comerciales.',1761228450515,1761228450515);
CREATE TABLE IF NOT EXISTS "contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "propertyId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "contacts_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "site_configs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "siteTitle" TEXT,
    "siteDescription" TEXT,
    "logo" TEXT,
    "favicon" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#f97316',
    "secondaryColor" TEXT NOT NULL DEFAULT '#1f2937',
    "tagColor" TEXT NOT NULL DEFAULT '#10b981',
    "phone" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "address" TEXT,
    "schedule" TEXT,
    "description" TEXT,
    "heroVariant" TEXT NOT NULL DEFAULT 'variant1',
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
, "tiktok" TEXT, "youtube" TEXT, "mapUrl" TEXT);
INSERT INTO site_configs VALUES('default','Inmobiliaria Homez','Buelo Marketing Inmobiliario','Descripcion del sitio','/uploads/logos/logo_1761317447334.png','/uploads/favicons/favicon_1761317456528.png','#bea680','#836b44','#ff0000','+54 11 1234-5678','+54 11 1234-5678','contacto@inmobiliaria.com','Av. Corrientes 1234, CABA','','Tu socio confiable en bienes raíces. Ayudamos a encontrar el hogar perfecto para ti y tu familia.','variant3','','https://www.instagram.com/bueloinmobiliario/','','',1761228450511,1761570841329,'https://www.tiktok.com/@buelo.inmo','https://www.youtube.com/@buelorealestate','https://www.google.com.ar/maps/place/Buelo+Real+Estate+%26+Marketing/@-34.6064217,-58.3671725,17z/data=!4m6!3m5!1s0x95a335005e0804d3:0x8ce55606b479519c!8m2!3d-34.605936!4d-58.3664537!16s%2Fg%2F11vwkpd8_z?hl=es&entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D');
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
CREATE UNIQUE INDEX "agents_email_key" ON "agents"("email");
COMMIT;