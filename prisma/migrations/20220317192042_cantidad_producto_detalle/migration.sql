/*
  Warnings:

  - Added the required column `cantidad` to the `detalleventa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detalleventa` ADD COLUMN `cantidad` INTEGER NOT NULL;
