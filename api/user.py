from fastapi import APIRouter, HTTPException
from api.db import db

router = APIRouter()

@router.get("/users")
async def get_users():
    users = await db.user.find_many()
    return users

@router.get("/users/{user_id}")
async def get_user(user_id: str):
    user = await db.user.find_unique(where={"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
