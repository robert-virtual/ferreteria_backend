/*
  Warnings:

  - Made the column `imagenUrl` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefono` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bloque` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ciudad` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `colonia` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `direccion` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `nombre` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `clave` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `imagenUrl` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `telefono` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `bloque` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `ciudad` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `colonia` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `direccion` VARCHAR(191) NOT NULL DEFAULT '';
