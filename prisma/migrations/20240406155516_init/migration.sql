/*
  Warnings:

  - Added the required column `level_name` to the `Difficulty_formula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `difficulty_formula` ADD COLUMN `level_name` VARCHAR(191) NOT NULL;
