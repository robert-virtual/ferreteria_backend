-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `telefono` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `direccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bloque` VARCHAR(191) NULL,
    `ciudad` VARCHAR(191) NULL,
    `descripcion` VARCHAR(191) NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `direccion` ADD CONSTRAINT `direccion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
