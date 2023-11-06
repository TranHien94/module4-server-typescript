-- AlterTable
ALTER TABLE `guestReceipts` MODIFY `acceptTime` DATETIME(3) NULL,
    MODIFY `shippingTime` DATETIME(3) NULL,
    MODIFY `doneTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `userReceipts` MODIFY `acceptTime` DATETIME(3) NULL,
    MODIFY `shippingTime` DATETIME(3) NULL,
    MODIFY `doneTime` DATETIME(3) NULL;
