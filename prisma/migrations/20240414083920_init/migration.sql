/*
  Warnings:

  - You are about to drop the column `name` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `recipe_name` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `name`,
    ADD COLUMN `recipe_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL;
