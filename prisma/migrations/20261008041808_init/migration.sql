/*
  Warnings:

  - You are about to drop the column `apartmentId` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `checkIn` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the `apartment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deposit` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `months` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moveIn` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentMonth` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renterId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDue` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_apartmentId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_userId_fkey`;

-- DropIndex
DROP INDEX `Reservation_apartmentId_fkey` ON `reservation`;

-- DropIndex
DROP INDEX `Reservation_userId_fkey` ON `reservation`;

-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `apartmentId`,
    DROP COLUMN `checkIn`,
    DROP COLUMN `checkOut`,
    DROP COLUMN `userId`,
    ADD COLUMN `deposit` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `listingId` INTEGER NOT NULL,
    ADD COLUMN `months` INTEGER NOT NULL,
    ADD COLUMN `moveIn` DATE NOT NULL,
    ADD COLUMN `rentMonth` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `renterId` INTEGER NOT NULL,
    ADD COLUMN `status` ENUM('pending', 'confirmed', 'cancelled', 'expired') NOT NULL DEFAULT 'pending',
    ADD COLUMN `totalDue` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('renter', 'owner') NOT NULL DEFAULT 'renter';

-- DropTable
DROP TABLE `apartment`;

-- CreateTable
CREATE TABLE `Listing` (
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

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `type` ENUM('deposit', 'rent') NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `status` ENUM('paid', 'refunded') NOT NULL DEFAULT 'paid',
    `paidAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_renterId_fkey` FOREIGN KEY (`renterId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
