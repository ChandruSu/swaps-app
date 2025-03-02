/*
  Warnings:

  - You are about to drop the column `toItemId` on the `TradeGraphEdge` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TradeGraphEdge" DROP CONSTRAINT "TradeGraphEdge_fromItemId_fkey";

-- DropForeignKey
ALTER TABLE "TradeGraphEdge" DROP CONSTRAINT "TradeGraphEdge_toItemId_fkey";

-- AlterTable
ALTER TABLE "TradeGraphEdge" DROP COLUMN "toItemId";
