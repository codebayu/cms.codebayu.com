/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Career` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Made the column `endDate` on table `Career` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `Career` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Career" ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "link" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Career_id_key" ON "Career"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");
