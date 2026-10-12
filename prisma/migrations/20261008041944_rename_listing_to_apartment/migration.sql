/*
  Warnings:

  - You are about to drop the column `listingId` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the `listing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apartmentId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `listing` DROP FOREIGN KEY `Listing_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_listingId_fkey`;

-- DropIndex
DROP INDEX `Reservation_listingId_fkey` ON `reservation`;

-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `listingId`,
    ADD COLUMN `apartmentId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `listing`;

-- CreateTable
CREATE TABLE `Apartment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `type` ENUM('studio', 'one_bed', 'two_bed') NOT NULL,
    `beds` INTEGER NOT NULL,
    `baths` INTEGER NOT NULL,
    `sizeM2` DOUBLE NOT NULL,
    `rentMonth` DECIMAL(10, 2) NOT NULL,
    `deposit` DECIMAL(10, 2) NOT NULL,
    `amenities` JSON NOT NULL,
    `photos` JSON NOT NULL,
    `isOpen` BOOLEAN NOT NULL DEFAULT true,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Apartment` ADD CONSTRAINT `Apartment_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
