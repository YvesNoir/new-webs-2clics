-- AlterTable
ALTER TABLE "site_configs" ADD COLUMN "aboutContent" TEXT;
ALTER TABLE "site_configs" ADD COLUMN "aboutSubtitle" TEXT DEFAULT 'Somos una inmobiliaria comprometida con brindar el mejor servicio para que encuentres tu hogar ideal.';
ALTER TABLE "site_configs" ADD COLUMN "aboutTitle" TEXT DEFAULT 'Sobre Nosotros';
