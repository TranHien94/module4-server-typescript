-- CreateTable
CREATE TABLE `userReceipts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `state` ENUM('PENDING', 'ACCEPTED', 'SHIPPING', 'DONE') NOT NULL DEFAULT 'PENDING',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `acceptTime` DATETIME(3) NOT NULL,
    `shippingTime` DATETIME(3) NOT NULL,
    `doneTime` DATETIME(3) NOT NULL,
    `total` DOUBLE NOT NULL,
    `payMode` ENUM('ZALO', 'CASH') NOT NULL,
    `paid` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guestReceipts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `state` ENUM('PENDING', 'ACCEPTED', 'SHIPPING', 'DONE') NOT NULL DEFAULT 'PENDING',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `acceptTime` DATETIME(3) NOT NULL,
    `shippingTime` DATETIME(3) NOT NULL,
    `doneTime` DATETIME(3) NOT NULL,
    `total` DOUBLE NOT NULL,
    `payMode` ENUM('ZALO', 'CASH') NOT NULL,
    `paid` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guestReceiptDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `guestReceiptId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userReceiptDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `userReceiptId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userReceipts` ADD CONSTRAINT `userReceipts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guestReceiptDetail` ADD CONSTRAINT `guestReceiptDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guestReceiptDetail` ADD CONSTRAINT `guestReceiptDetail_guestReceiptId_fkey` FOREIGN KEY (`guestReceiptId`) REFERENCES `guestReceipts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userReceiptDetail` ADD CONSTRAINT `userReceiptDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userReceiptDetail` ADD CONSTRAINT `userReceiptDetail_userReceiptId_fkey` FOREIGN KEY (`userReceiptId`) REFERENCES `userReceipts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
