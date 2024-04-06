/*
  Warnings:

  - You are about to drop the column `isNew` on the `Learn` table. All the data in the column will be lost.
  - Added the required column `isFeatured` to the `Learn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Learn" DROP COLUMN "isNew",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL;
