/*
  Warnings:

  - You are about to drop the column `address` on the `StoreLocation` table. All the data in the column will be lost.
  - Added the required column `addressLine1` to the `StoreLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressLine2` to the `StoreLocation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StoreLocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "postalCode" TEXT,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_StoreLocation" ("city", "country", "createdAt", "email", "id", "lat", "lng", "name", "notes", "phone", "postalCode", "shop", "state", "updatedAt") SELECT "city", "country", "createdAt", "email", "id", "lat", "lng", "name", "notes", "phone", "postalCode", "shop", "state", "updatedAt" FROM "StoreLocation";
DROP TABLE "StoreLocation";
ALTER TABLE "new_StoreLocation" RENAME TO "StoreLocation";
CREATE INDEX "StoreLocation_shop_idx" ON "StoreLocation"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
