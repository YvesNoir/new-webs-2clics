-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_site_configs" (
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
);
INSERT INTO "new_site_configs" ("address", "companyName", "createdAt", "description", "email", "facebook", "favicon", "heroVariant", "id", "instagram", "linkedin", "logo", "phone", "primaryColor", "schedule", "secondaryColor", "siteDescription", "siteTitle", "tagColor", "twitter", "updatedAt", "whatsapp") SELECT "address", "companyName", "createdAt", "description", "email", "facebook", "favicon", "heroVariant", "id", "instagram", "linkedin", "logo", "phone", "primaryColor", "schedule", "secondaryColor", "siteDescription", "siteTitle", "tagColor", "twitter", "updatedAt", "whatsapp" FROM "site_configs";
DROP TABLE "site_configs";
ALTER TABLE "new_site_configs" RENAME TO "site_configs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
