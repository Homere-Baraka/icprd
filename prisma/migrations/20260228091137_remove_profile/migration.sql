/*
  Warnings:

  - You are about to drop the column `email` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `team` table. All the data in the column will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- DropIndex
DROP INDEX "team_email_key";

-- AlterTable
ALTER TABLE "team" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "date_bith" TEXT,
ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "profile";
