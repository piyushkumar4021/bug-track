-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bug" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "assignedToUserId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Bug_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Bug" ("createdAt", "description", "id", "status", "title", "updatedAt") SELECT "createdAt", "description", "id", "status", "title", "updatedAt" FROM "Bug";
DROP TABLE "Bug";
ALTER TABLE "new_Bug" RENAME TO "Bug";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
