/*
  Warnings:

  - Made the column `content` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkDemo` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkGithub` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "isFeatured" DROP DEFAULT,
ALTER COLUMN "isShow" DROP DEFAULT,
ALTER COLUMN "linkDemo" SET NOT NULL,
ALTER COLUMN "linkGithub" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;
