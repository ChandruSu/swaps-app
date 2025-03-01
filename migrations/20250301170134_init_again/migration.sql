/*
  Warnings:

  - You are about to drop the column `tradeProposalId` on the `TradeGraphEdge` table. All the data in the column will be lost.
  - You are about to drop the `TradeProposal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TradeGraphEdge" DROP CONSTRAINT "TradeGraphEdge_tradeProposalId_fkey";

-- AlterTable
ALTER TABLE "TradeGraphEdge" DROP COLUMN "tradeProposalId",
ADD COLUMN     "tradeGroupId" TEXT;

-- DropTable
DROP TABLE "TradeProposal";

-- CreateTable
CREATE TABLE "TradeGroup" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantIds" TEXT[],

    CONSTRAINT "TradeGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TradeGraphEdge" ADD CONSTRAINT "TradeGraphEdge_tradeGroupId_fkey" FOREIGN KEY ("tradeGroupId") REFERENCES "TradeGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
