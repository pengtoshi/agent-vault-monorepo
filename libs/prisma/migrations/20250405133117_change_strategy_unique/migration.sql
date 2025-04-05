/*
  Warnings:

  - A unique constraint covering the columns `[address,chainId]` on the table `Strategy` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Strategy_address_key";

-- CreateIndex
CREATE UNIQUE INDEX "Strategy_address_chainId_key" ON "Strategy"("address", "chainId");
