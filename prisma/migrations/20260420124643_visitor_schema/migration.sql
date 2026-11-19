-- CreateTable
CREATE TABLE `visitor` (
    `id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `userAgent` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `region` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `totalVisits` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visitor_session` (
    `id` VARCHAR(191) NOT NULL,
    `visitorId` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastActivity` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `durationSeconds` INTEGER NOT NULL DEFAULT 0,
    `pagesCount` INTEGER NOT NULL DEFAULT 1,

    INDEX `visitor_session_visitorId_idx`(`visitorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PageView` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PageView_sessionId_idx`(`sessionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `visitor_session` ADD CONSTRAINT `visitor_session_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `visitor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PageView` ADD CONSTRAINT `PageView_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `visitor_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
