/*
  Warnings:

  - You are about to drop the `direccion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `direccion` DROP FOREIGN KEY `direccion_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `bloque` VARCHAR(191) NULL,
    ADD COLUMN `ciudad` VARCHAR(191) NULL,
    ADD COLUMN `colonia` VARCHAR(191) NULL,
    ADD COLUMN `direccion` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `direccion`;
