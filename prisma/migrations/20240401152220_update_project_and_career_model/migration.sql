/*
  Warnings:

  - You are about to drop the column `is_featured` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `is_show` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `link_demo` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `link_github` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "is_featured",
DROP COLUMN "is_show",
DROP COLUMN "link_demo",
DROP COLUMN "link_github",
DROP COLUMN "updated_at",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isShow" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "linkDemo" TEXT,
ADD COLUMN     "linkGithub" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationType" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "link" TEXT,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Career_slug_key" ON "Career"("slug");
