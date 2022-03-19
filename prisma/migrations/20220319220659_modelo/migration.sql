-- CreateTable
CREATE TABLE `detallecarrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioFk` INTEGER NOT NULL,
    `productoFk` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detallecarrito` ADD CONSTRAINT `detallecarrito_productoFk_fkey` FOREIGN KEY (`productoFk`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detallecarrito` ADD CONSTRAINT `detallecarrito_usuarioFk_fkey` FOREIGN KEY (`usuarioFk`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
