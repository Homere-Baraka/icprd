/*
  Warnings:

  - You are about to drop the column `date_bith` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "team" DROP COLUMN "date_bith",
DROP COLUMN "imageUrl",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "last_name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "team_email_key" ON "team"("email");
