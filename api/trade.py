from fastapi import APIRouter, HTTPException
from api.db import db
from collections import defaultdict
from typing import Dict

router = APIRouter()

@router.get("/trades")
async def get_all_trades():
    trades = await db.tradegraphedge.find_many(
        include={"fromUser": True, "toUser": True, "tradeGroup": True}
    )
    return trades


@router.post("/trades")
async def create_trade(from_user_id: str, from_item_id: str, to_user_id: str):
    """Create a trade where an item is transferred from `fromUser` to `toUser`."""
    trade = await db.tradegraphedge.create(
        data={
            "fromUserId": from_user_id,
            "fromItemId": from_item_id,
            "toUserId": to_user_id,
            "status": "pending",
        },
        include={
            "fromUser": True,
            "toUser": True,
            "tradeGroup": True
        }
    )
    return trade


@router.delete("/trades/{trade_id}")
async def delete_trade(trade_id: str, user_id: str):
    """Allow the `toUser` to reject and delete a trade."""
    trade = await db.tradegraphedge.find_unique(where={"id": trade_id})

    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")

    # Ensure only `toUser` can delete the trade
    if trade.toUserId != user_id and trade.fromUserId != user_id:
        raise HTTPException(status_code=403, detail="Only the buyer ot seller can reject this trade")

    await db.tradegraphedge.delete(where={"id": trade_id})
    return {"message": "Trade successfully deleted"}


@router.get("/trades/detect-cycles")
async def detect_trade_cycles():
    """Find SCCs in the trade graph and create trade groups from them."""

    # Fetch only `pending` trades
    trades = await db.tradegraphedge.find_many(
        where={"status": "pending"},
        include={"fromUser": True, "toUser": True}  # Include user objects
    )

    # Build directed graph & store trade edges
    trade_graph = defaultdict(list)
    trade_edges: Dict[str, List[Dict]] = defaultdict(list)  # Store all trades for a user pair

    for trade in trades:
        from_id, to_id = trade.fromUser.id, trade.toUser.id
        trade_graph[from_id].append(to_id)
        trade_edges[(from_id, to_id)].append({"id": trade.id, "fromItemId": trade.fromItemId})

    # Tarjan's SCC Algorithm
    def find_scc(graph):
        index = 0
        stack = []
        indices = {}
        low_links = {}
        on_stack = set()
        sccs = []

        def strongconnect(node):
            nonlocal index
            indices[node] = low_links[node] = index
            index += 1
            stack.append(node)
            on_stack.add(node)

            for neighbor in graph.get(node, []):
                if neighbor not in indices:
                    strongconnect(neighbor)
                    low_links[node] = min(low_links[node], low_links[neighbor])
                elif neighbor in on_stack:
                    low_links[node] = min(low_links[node], indices[neighbor])

            if low_links[node] == indices[node]:
                scc = []
                while True:
                    popped_node = stack.pop()
                    on_stack.remove(popped_node)
                    scc.append(popped_node)
                    if popped_node == node:
                        break
                if len(scc) > 1:
                    sccs.append(scc)

        for node in graph:
            if node not in indices:
                strongconnect(node)

        return sccs

    sccs = find_scc(trade_graph)

    if not sccs:
        return {"message": "No trade cycles found."}

    # Create trade groups and update trade edges
    trade_group_ids = []
    for scc in sccs:
        # Create Trade Group with SCC Participants
        trade_group = await db.tradegroup.create(
            data={"status": "pending", "participantIds": scc}
        )
        trade_group_ids.append(trade_group.id)

        # Find & update exact edges in the SCC
        for from_user in scc:
            for to_user in trade_graph[from_user]:  # Get actual trades in SCC
                if to_user in scc:
                    edges_to_update = trade_edges.get((from_user, to_user), [])
                    for edge in edges_to_update:
                        await db.tradegraphedge.update(
                            where={"id": edge["id"]},
                            data={"status": "accepted", "tradeGroupId": trade_group.id}
                        )

    return {
        "message": "Trade groups created successfully",
        "trade_groups": trade_group_ids,
        "trade_groups_len": len(trade_group_ids)
    }
