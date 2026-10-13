-- AlterTable
ALTER TABLE `apartment` ADD COLUMN `availableFrom` DATETIME(3) NULL,
    ADD COLUMN `included` JSON NULL,
    ADD COLUMN `minStayMonths` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `petsAllowed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `smokingAllowed` BOOLEAN NOT NULL DEFAULT false;
