-- AlterTable
ALTER TABLE `producto` ADD COLUMN `categoriaFk` INTEGER NULL;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_categoriaFk_fkey` FOREIGN KEY (`categoriaFk`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
