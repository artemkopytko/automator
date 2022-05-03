-- CreateTable
CREATE TABLE `ControlPanel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `login_url` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NULL,
    `port` INTEGER NULL,
    `login` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `apiKey` VARCHAR(191) NULL,
    `DigitalOceanAccountId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Domain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `ttl` INTEGER NULL,
    `zone_file` VARCHAR(191) NULL,
    `DigitalOceanAccountId` INTEGER NULL,
    `ControlPanelId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DomainRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `ttl` INTEGER NULL,
    `DomainId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DigitalOceanAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `accessToken` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ControlPanel` ADD CONSTRAINT `ControlPanel_DigitalOceanAccountId_fkey` FOREIGN KEY (`DigitalOceanAccountId`) REFERENCES `DigitalOceanAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Domain` ADD CONSTRAINT `Domain_ControlPanelId_fkey` FOREIGN KEY (`ControlPanelId`) REFERENCES `ControlPanel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Domain` ADD CONSTRAINT `Domain_DigitalOceanAccountId_fkey` FOREIGN KEY (`DigitalOceanAccountId`) REFERENCES `DigitalOceanAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DomainRecord` ADD CONSTRAINT `DomainRecord_DomainId_fkey` FOREIGN KEY (`DomainId`) REFERENCES `Domain`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
