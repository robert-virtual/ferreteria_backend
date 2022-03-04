/*
  Warnings:

  - Made the column `categoriaFk` on table `producto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `producto` DROP FOREIGN KEY `producto_categoriaFk_fkey`;

-- AlterTable
ALTER TABLE `producto` MODIFY `categoriaFk` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_categoriaFk_fkey` FOREIGN KEY (`categoriaFk`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
