from fastapi import APIRouter, HTTPException
from api.db import db

router = APIRouter()

@router.get("/trade-groups")
async def get_trade_groups():
    groups = await db.tradegroup.find_many()
    return groups

@router.post("/trade-groups/create")
async def create_trade_group(status: str, participant_ids: list[str]):
    trade_group = await db.tradegroup.create(
        data={
            "status": status,
            "participantIds": participant_ids,
        }
    )
    return trade_group

@router.put("/trade-groups/{group_id}/update-status")
async def update_trade_group_status(group_id: str, status: str):
    if status not in ["accepted", "rejected", "completed"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    trade_group = await db.tradegroup.update(
        where={"id": group_id},
        data={"status": status}
    )
    return trade_group
