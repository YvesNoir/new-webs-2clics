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
INSERT INTO _prisma_migrations VALUES('911d09d1-04a5-4ba9-a8ee-846103a5683e','24813f50df69e4f02abf94595541af8e1d43bf15d6c54219e1370db5c20ae23f',1761571789070,'20251023140556_init',NULL,NULL,1761571789068,1);
INSERT INTO _prisma_migrations VALUES('46aa0d22-1720-400c-92a1-1db332e9d06f','3586666d4d45ebbce779a63f4ba698fe9fe01ad73ddc0519c20602ee8f6a9f5e',1761571789071,'20251024143301_add_site_config_fields',NULL,NULL,1761571789070,1);
INSERT INTO _prisma_migrations VALUES('4988d2e1-bb21-4d2b-b610-956b6270faf1','8c033a43ee066b4e39ffd77ad38ac203900f91b549295c1dd63de8785d70dd2d',1761571789072,'20251024150113_add_hero_variant',NULL,NULL,1761571789071,1);
INSERT INTO _prisma_migrations VALUES('8de35905-7a2a-4800-8139-11a2315b32e3','2ba1b07ddf92313945e747a116313843ac6f95869b96f2357ad4e153bc793b14',1761571789073,'20251024230429_add_tag_color',NULL,NULL,1761571789072,1);
INSERT INTO _prisma_migrations VALUES('140c1549-91ec-4bf5-8006-155791bc90df','006962ac1a8c11ddc4e9477fb15e8e148cff78e1193e2edfc2294796cd3bdd23',1761571796690,'20251027132956_add_show_map_field',NULL,NULL,1761571796689,1);
INSERT INTO _prisma_migrations VALUES('360663a9-aa46-46c5-85b3-9c59a83304d8','d10fefefc8e4c4e583d3d23be6e07df8384099cab26e5a90848bc281160bd36d',1761573055777,'20251027135055_add_video_hero_fields',NULL,NULL,1761573055776,1);
INSERT INTO _prisma_migrations VALUES('52cdf1f8-9a62-4291-b8d8-03dd39a91f5f','40776a1e8a4e4130d93b75ed1542e579ae8f6bfda7e4148910a534f6628d949a',1764256677007,'20251127151757_add_about_fields',NULL,NULL,1764256677006,1);
INSERT INTO _prisma_migrations VALUES('7818c6b8-0627-4c64-906c-23fd2129f048','5cca5524c4d47f2e2113de2fce070cc62c2ef0bd56c228d4b76fd28c9b76fdf4',1764267617309,'20251127182017_add_contact_fields',NULL,NULL,1764267617308,1);
INSERT INTO _prisma_migrations VALUES('73d255a5-f2dc-4fc3-a184-71b07a145772','db84b4de2e201a49104fd4927f91ab763fad79f3bfd35e1ff46da4441008bbb4',1764268605348,'20251127183645_add_nosotros_fields',NULL,NULL,1764268605347,1);
INSERT INTO _prisma_migrations VALUES('a6bf3622-932f-4371-b559-d36e64462a16','84a71e2c26837da0fefdad12314ce335d38656665bbadf842441054951e1e910',1764269102206,'20251127184502_add_nosotros_content_field',NULL,NULL,1764269102205,1);
INSERT INTO _prisma_migrations VALUES('970dbe8e-272a-46d1-9b36-43630dad74d0','a18d714f60f7c29eb24fbbd57749f8c4c3df87124f8b37f75f86393de19c7ff9',1764271547009,'20251127192547_add_tasaciones_functionality',NULL,NULL,1764271547008,1);
INSERT INTO _prisma_migrations VALUES('8f40894b-2385-4b5d-b1a0-42589e32cc8a','b5719cab16849cd5abcf5b4544aa7278731cc0d8d6498c176769b6e07a9e4af4',1765390144880,'20251210180904_add_footer_colors',NULL,NULL,1765390144879,1);
INSERT INTO _prisma_migrations VALUES('3aece110-e504-4b92-a807-403b4a150808','d113e81da3c88a32779ceb2a189b18d77a45c0feb5bb5854c273a85f13d8971b',1765390484326,'20251210181444_add_footer_logo',NULL,NULL,1765390484326,1);
CREATE TABLE IF NOT EXISTS "admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO admins VALUES('cmh96dv9i00007m4ia9zstfh0','admin@inmobiliaria.com','$2b$10$HC/agexQG3jxubu36cqGDumkCS1Cy6/v4I34C4u.1PCU.1WZIEj0q','Administrador',1761571830149,1761571830149);
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
INSERT INTO site_blocks VALUES('ultimas-prop-1761345231','featured-properties',3,1,'{}','default','2025-10-24 22:33:51',1764615548577);
INSERT INTO site_blocks VALUES('barrios-populares-1761345409','popular-neighborhoods',4,1,'{}','default','2025-10-24 22:36:49',1761591832493);
INSERT INTO site_blocks VALUES('hero-block-default','hero',1,1,'{}','default','2025-10-27 13:36:03','2025-10-27 13:36:03');
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
    "mapUrl" TEXT,
    "showMap" BOOLEAN NOT NULL DEFAULT true,
    "heroVariant" TEXT NOT NULL DEFAULT 'variant1',
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
, "heroSubtitle" TEXT, "heroTitle" TEXT, "videoUrl" TEXT, "aboutContent" TEXT, "aboutSubtitle" TEXT DEFAULT 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.', "aboutTitle" TEXT DEFAULT 'Sobre Nosotros', "contactDescription" TEXT DEFAULT '¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.', "contactTitle" TEXT DEFAULT 'Contacto', "nosotrosDescription" TEXT DEFAULT 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.', "nosotrosTitle" TEXT DEFAULT 'Sobre Nosotros', "nosotrosContent" TEXT, "tasacionesDescription" TEXT DEFAULT 'Obtén una tasación profesional de tu propiedad de forma gratuita.', "tasacionesTitle" TEXT DEFAULT 'Tasaciones', "footerBackgroundColor" TEXT DEFAULT '#1f2937', "footerTextColor" TEXT DEFAULT '#ffffff', "footerLogo" TEXT);
INSERT INTO site_configs VALUES('default','Buelo Marketing Inmobiliario','Buelo Marketing Inmobiliario','Inmuebles en venta y alquiler','/uploads/logos/logo_1761317447334.png','/uploads/favicons/favicon_1761317456528.png','#bea680','#836b44','#edaf02','+54 11 1234-5678','+54 11 1234-5678','contacto@inmobiliaria.com','Av. Corrientes 1234, CABA','','Tu socio confiable en bienes raíces. Ayudamos a encontrar el hogar perfecto para ti y tu familia.','https://www.google.com.ar/maps/place/Buelo+Real+Estate+%26+Marketing/@-34.6064217,-58.3671725,17z/data=\!4m6\!3m5\!1s0x95a335005e0804d3:0x8ce55606b479519c\!8m2\!3d-34.605936\!4d-58.3664537\!16s%2Fg%2F11vwkpd8_z?hl=es&entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D',1,'variant4','','https://www.instagram.com/bueloinmobiliario/','','https://www.youtube.com/@buelorealestate','https://www.tiktok.com/@buelo.inmo','https://www.youtube.com/@buelorealestate',1761228450511,1765390208858,'Servicio de bienes raíces e inmobiliaria de excelencia pura.','¡Vive la Experiencia Buelo! ','https://www.youtube.com/watch?v=ObDgomocKZY',NULL,'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.','Sobre Nosotros','Descriocion','Contactate con nuestra inmobilairia','Prueba 2','Prueba','aklsjdlkasjdakljdslkajdlksajdlkajsdlkajdklajslkdjalkjdsalkdsj}<div>}</div><h2>asdasdasd</h2>','asdasdad','asdasdasd','#fafafa','#bea680',NULL);
CREATE TABLE IF NOT EXISTS "tasaciones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contenido" TEXT,
    "direccionPropiedad" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,
    "tipologiaPropiedad" TEXT NOT NULL,
    "operacionPropiedad" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
CREATE UNIQUE INDEX "agents_email_key" ON "agents"("email");
COMMIT;
