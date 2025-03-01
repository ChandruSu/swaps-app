-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeGraphEdge" (
    "id" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "fromItemId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "toItemId" TEXT NOT NULL,
    "tradeProposalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "TradeGraphEdge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeProposal" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantIds" TEXT[],

    CONSTRAINT "TradeProposal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeGraphEdge" ADD CONSTRAINT "TradeGraphEdge_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeGraphEdge" ADD CONSTRAINT "TradeGraphEdge_fromItemId_fkey" FOREIGN KEY ("fromItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeGraphEdge" ADD CONSTRAINT "TradeGraphEdge_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeGraphEdge" ADD CONSTRAINT "TradeGraphEdge_toItemId_fkey" FOREIGN KEY ("toItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeGraphEdge" ADD CONSTRAINT "TradeGraphEdge_tradeProposalId_fkey" FOREIGN KEY ("tradeProposalId") REFERENCES "TradeProposal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
