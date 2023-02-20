-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `alternateMobileNumber` VARCHAR(191) NOT NULL,
    `hintName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OtpTable` (
    `mobileNumber` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `OtpTable_mobileNumber_key`(`mobileNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `locality` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `typeOfAddress` VARCHAR(191) NOT NULL,
    `satOpen` BOOLEAN NOT NULL,
    `sunOpen` BOOLEAN NOT NULL,
    `defaultAddr` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `categoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categories_categoryId_key`(`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategories` (
    `subCatId` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `subCatName` VARCHAR(191) NOT NULL,
    `subCatImage` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SubCategories_subCatId_key`(`subCatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SuperSubCategories` (
    `childCategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `subCatId` INTEGER NOT NULL,
    `childCategoryName` VARCHAR(191) NOT NULL,
    `superSubCatImage` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SuperSubCategories_childCategoryId_key`(`childCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `childCategoryId` INTEGER NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `discount` INTEGER NOT NULL,
    `mrp` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `seller` VARCHAR(191) NOT NULL,
    `ratings` INTEGER NOT NULL,
    `star` DOUBLE NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `offer` VARCHAR(191) NOT NULL,
    `emiOption` VARCHAR(191) NOT NULL,
    `productDetails` VARCHAR(191) NOT NULL,
    `sizeFit` VARCHAR(191) NOT NULL,
    `isWishlisted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `xsamount` INTEGER NOT NULL,
    `samount` INTEGER NOT NULL,
    `mamount` INTEGER NOT NULL,
    `lamount` INTEGER NOT NULL,
    `xlamount` INTEGER NOT NULL,
    `xxlamount` INTEGER NOT NULL,
    `xsavailable` INTEGER NOT NULL,
    `savailable` INTEGER NOT NULL,
    `mavailable` INTEGER NOT NULL,
    `lavailable` INTEGER NOT NULL,
    `xlavailable` INTEGER NOT NULL,
    `xxlavailable` INTEGER NOT NULL,

    UNIQUE INDEX `Sizes_id_key`(`id`),
    UNIQUE INDEX `Sizes_productId_key`(`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Specification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `s1` VARCHAR(191) NOT NULL,
    `v1` VARCHAR(191) NOT NULL,
    `s2` VARCHAR(191) NOT NULL,
    `v2` VARCHAR(191) NOT NULL,
    `s3` VARCHAR(191) NOT NULL,
    `v3` VARCHAR(191) NOT NULL,
    `s4` VARCHAR(191) NOT NULL,
    `v4` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Specification_id_key`(`id`),
    UNIQUE INDEX `Specification_productId_key`(`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductImage` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `imageLink` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProductImage_imageId_key`(`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WishList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Addresses` ADD CONSTRAINT `Addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SuperSubCategories` ADD CONSTRAINT `SuperSubCategories_subCatId_fkey` FOREIGN KEY (`subCatId`) REFERENCES `SubCategories`(`subCatId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_childCategoryId_fkey` FOREIGN KEY (`childCategoryId`) REFERENCES `SuperSubCategories`(`childCategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sizes` ADD CONSTRAINT `Sizes_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Specification` ADD CONSTRAINT `Specification_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
