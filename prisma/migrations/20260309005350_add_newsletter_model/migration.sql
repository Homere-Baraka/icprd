-- AlterTable
ALTER TABLE "achievement" ALTER COLUMN "date" DROP NOT NULL;

-- CreateTable
CREATE TABLE "newsletter" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "blogId" UUID NOT NULL,
    "subscriberId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like" (
    "id" UUID NOT NULL,
    "blogId" UUID NOT NULL,
    "subscriberId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_email_key" ON "newsletter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "like_blogId_subscriberId_key" ON "like"("blogId", "subscriberId");

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "newsletter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "newsletter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
