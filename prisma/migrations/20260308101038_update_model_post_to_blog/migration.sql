/*
  Warnings:

  - The values [USER,MEMBER,CONTRIBUTOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `achievement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `postId` on the `testimonial` table. All the data in the column will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[blogId]` on the table `testimonial` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AchievementStatus" AS ENUM ('PENDING', 'FINISHED', 'CANCELED');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('PARAGRAPH', 'HEADING', 'IMAGE', 'LIST', 'CODE', 'QUOTE', 'LINK');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
COMMIT;

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_teamId_fkey";

-- DropForeignKey
ALTER TABLE "testimonial" DROP CONSTRAINT "testimonial_postId_fkey";

-- DropIndex
DROP INDEX "testimonial_postId_key";

-- AlterTable
ALTER TABLE "achievement" ADD COLUMN     "countries" INTEGER DEFAULT 0,
ADD COLUMN     "province" INTEGER DEFAULT 0,
ADD COLUMN     "revenue" DOUBLE PRECISION DEFAULT 0.0,
DROP COLUMN "status",
ADD COLUMN     "status" "AchievementStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "testimonial" DROP COLUMN "postId",
ADD COLUMN     "blogId" UUID;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- DropTable
DROP TABLE "post";

-- DropEnum
DROP TYPE "AchievementStaus";

-- CreateTable
CREATE TABLE "blog" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "video" TEXT,
    "category" TEXT,
    "teamId" UUID NOT NULL,
    "publishedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_content" (
    "id" UUID NOT NULL,
    "blogId" UUID NOT NULL,
    "type" "ContentType" NOT NULL,
    "value" TEXT,
    "metadata" JSONB,
    "label" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "blog_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blog_content_blogId_idx" ON "blog_content"("blogId");

-- CreateIndex
CREATE UNIQUE INDEX "testimonial_blogId_key" ON "testimonial"("blogId");

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_content" ADD CONSTRAINT "blog_content_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonial" ADD CONSTRAINT "testimonial_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
