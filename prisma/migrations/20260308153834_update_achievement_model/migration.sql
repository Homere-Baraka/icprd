/*
  Warnings:

  - You are about to drop the column `content` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `achievement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "achievement" DROP COLUMN "content",
DROP COLUMN "excerpt";

-- AlterTable
ALTER TABLE "blog" ALTER COLUMN "order" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "achievement_content" (
    "id" UUID NOT NULL,
    "achievementId" UUID NOT NULL,
    "type" "ContentType" NOT NULL,
    "value" TEXT,
    "metadata" JSONB,
    "label" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "achievement_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "achievement_content_achievementId_idx" ON "achievement_content"("achievementId");

-- AddForeignKey
ALTER TABLE "achievement_content" ADD CONSTRAINT "achievement_content_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
