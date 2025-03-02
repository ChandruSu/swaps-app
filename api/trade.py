from fastapi import APIRouter, HTTPException
from api.db import db
from collections import defaultdict

router = APIRouter()

@router.get("/trades")
async def get_all_trades():
    trades = await db.tradegraphedge.find_many(
        include={"fromUser": True, "toUser": True, "fromItem": True, "toItem": True}
    )
    return trades

@router.post("/trades")
async def create_trade(from_user_id: str, from_item_id: str, to_user_id: str, to_item_id: str):
    trade = await db.tradegraphedge.create(
        data={
            "fromUserId": from_user_id,
            "fromItemId": from_item_id,
            "toUserId": to_user_id,
            "toItemId": to_item_id,
            "status": "pending",
        }
    )
    return trade

@router.get("/trades/detect-cycles")
async def detect_trade_cycles():
    trades = await db.tradegraphedge.find_many()
    trade_graph = defaultdict(list)
    for trade in trades:
        trade_graph[f"{trade.fromUserId}_{trade.fromItemId}"].append(f"{trade.toUserId}_{trade.toItemId}")

    def find_cycles(graph):
        def dfs(node, visited, stack):
            if node in stack:
                return stack[stack.index(node):]
            if node in visited:
                return None
            visited.add(node)
            stack.append(node)
            for neighbor in graph.get(node, []):
                cycle = dfs(neighbor, visited, stack)
                if cycle:
                    return cycle
            stack.pop()
            return None
        
        for node in graph:
            cycle = dfs(node, set(), [])
            if cycle:
                return {"cycle_found": True, "cycle": cycle}
        return {"cycle_found": False}

    return find_cycles(trade_graph)


