/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId,size]` on the table `Bag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Bag_productId_userId_key` ON `Bag`;

-- CreateTable
CREATE TABLE `Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `minPurchase` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL,
    `expiryDate` DATETIME(3) NOT NULL,
    `expiryTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Bag_productId_userId_size_key` ON `Bag`(`productId`, `userId`, `size`);
