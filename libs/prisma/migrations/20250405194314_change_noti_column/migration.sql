/*
  Warnings:

  - You are about to drop the column `activeChatId` on the `Subscriber` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Subscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscriber" DROP COLUMN "activeChatId",
ADD COLUMN     "chatId" TEXT NOT NULL;
