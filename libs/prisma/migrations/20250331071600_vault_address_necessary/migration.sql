/*
  Warnings:

  - A unique constraint covering the columns `[vaultAddress]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - Made the column `vaultAddress` on table `Agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "vaultAddress" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Agent_vaultAddress_key" ON "Agent"("vaultAddress");
