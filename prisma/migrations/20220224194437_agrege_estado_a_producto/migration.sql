/*
  Warnings:

  - Added the required column `estado` to the `producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producto` ADD COLUMN `estado` BOOLEAN NOT NULL;
