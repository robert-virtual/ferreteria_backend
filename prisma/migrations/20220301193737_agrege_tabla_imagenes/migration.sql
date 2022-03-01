/*
  Warnings:

  - Added the required column `precio` to the `producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producto` ADD COLUMN `descripcion` VARCHAR(191) NULL,
    ADD COLUMN `precio` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `stock` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `imagen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagenUrl` VARCHAR(191) NULL,
    `productoPk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `imagen` ADD CONSTRAINT `imagen_productoPk_fkey` FOREIGN KEY (`productoPk`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
