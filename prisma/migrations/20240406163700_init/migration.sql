/*
  Warnings:

  - You are about to drop the column `duration` on the `recipe` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[durationId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `durationId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `duration`,
    ADD COLUMN `durationId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Recipe_durationId_key` ON `Recipe`(`durationId`);

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_durationId_fkey` FOREIGN KEY (`durationId`) REFERENCES `Duration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
