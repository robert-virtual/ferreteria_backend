/*
  Warnings:

  - Added the required column `clave` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `clave` VARCHAR(191) NOT NULL,
    ADD COLUMN `correo` VARCHAR(191) NOT NULL,
    ADD COLUMN `imagenUrl` VARCHAR(191) NULL,
    MODIFY `tipo` ENUM('cliente', 'administrador') NOT NULL DEFAULT 'cliente';
