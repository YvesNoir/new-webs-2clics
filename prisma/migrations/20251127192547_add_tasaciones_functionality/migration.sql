-- AlterTable
ALTER TABLE "site_configs" ADD COLUMN "tasacionesDescription" TEXT DEFAULT 'Obtén una tasación profesional de tu propiedad de forma gratuita.';
ALTER TABLE "site_configs" ADD COLUMN "tasacionesTitle" TEXT DEFAULT 'Tasaciones';

-- CreateTable
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
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
