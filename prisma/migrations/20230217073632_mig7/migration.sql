/*
  Warnings:

  - You are about to alter the column `expiryDate` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `expiryTime` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Coupon` MODIFY `expiryDate` DATETIME(3) NOT NULL,
    MODIFY `expiryTime` DATETIME(3) NOT NULL;
