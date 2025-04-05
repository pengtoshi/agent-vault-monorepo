/*
  Warnings:

  - You are about to drop the column `privateKey` on the `Agent` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Agent_privateKey_key";

-- AlterTable
ALTER TABLE "Agent" DROP COLUMN "privateKey";

-- CreateTable
CREATE TABLE "AgentAccount" (
    "address" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentAccount_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgentAccount_address_key" ON "AgentAccount"("address");

-- CreateIndex
CREATE UNIQUE INDEX "AgentAccount_privateKey_key" ON "AgentAccount"("privateKey");

-- AddForeignKey
ALTER TABLE "AgentAccount" ADD CONSTRAINT "AgentAccount_address_fkey" FOREIGN KEY ("address") REFERENCES "Agent"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
