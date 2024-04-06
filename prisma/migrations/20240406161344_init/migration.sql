/*
  Warnings:

  - You are about to drop the `difficulty_formula` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[levelId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `levelId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `difficulty_formula` DROP FOREIGN KEY `Difficulty_formula_recipe_id_fkey`;

-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `levelId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `difficulty_formula`;

-- CreateTable
CREATE TABLE `Level` (
    `id` INTEGER NOT NULL,
    `level_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Recipe_levelId_key` ON `Recipe`(`levelId`);

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `Level`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
