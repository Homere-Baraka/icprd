/*
  Warnings:

  - You are about to drop the column `description` on the `achievement` table. All the data in the column will be lost.
  - Added the required column `content` to the `achievement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AchievementStaus" AS ENUM ('PENDING', 'FINISHED', 'CANCELED');

-- AlterTable
ALTER TABLE "achievement" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "AchievementStaus" NOT NULL DEFAULT 'PENDING';
