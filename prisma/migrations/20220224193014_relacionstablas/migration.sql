/*
  Warnings:

  - Added the required column `productoFk` to the `detalleventa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clienteFk` to the `venta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detalleventa` ADD COLUMN `productoFk` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `tipo` ENUM('cliente', 'administrador') NOT NULL;

-- AlterTable
ALTER TABLE `venta` ADD COLUMN `clienteFk` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_clienteFk_fkey` FOREIGN KEY (`clienteFk`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleventa` ADD CONSTRAINT `detalleventa_productoFk_fkey` FOREIGN KEY (`productoFk`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
