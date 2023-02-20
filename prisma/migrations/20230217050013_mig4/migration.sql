/*
  Warnings:

  - You are about to alter the column `selected` on the `Bag` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - A unique constraint covering the columns `[productId,userId]` on the table `Bag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Bag` MODIFY `quantity` INTEGER NOT NULL DEFAULT 1,
    MODIFY `couponDiscount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `selected` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `Bag_productId_userId_key` ON `Bag`(`productId`, `userId`);
