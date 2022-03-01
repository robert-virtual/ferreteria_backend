/*
  Warnings:

  - You are about to alter the column `precio` on the `producto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(7,2)`.

*/
-- AlterTable
ALTER TABLE `producto` MODIFY `precio` DECIMAL(7, 2) NOT NULL;
