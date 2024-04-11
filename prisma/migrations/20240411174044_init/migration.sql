/*
  Warnings:

  - You are about to drop the column `time` on the `duration` table. All the data in the column will be lost.
  - Added the required column `time_end` to the `Duration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_start` to the `Duration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `duration` DROP COLUMN `time`,
    ADD COLUMN `time_end` INTEGER NOT NULL,
    ADD COLUMN `time_start` INTEGER NOT NULL;
