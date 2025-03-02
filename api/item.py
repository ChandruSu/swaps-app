from fastapi import APIRouter, HTTPException, Query
from api.db import db
# from prisma.enums import Tag
from typing import List

router = APIRouter()

tag_enums = {
  "ELECTRONICS",
  "CLOTHING",
  "FURNITURE",
  "BOOKS",
  "SPORTS",
  "TOYS",
  "VEHICLES",
  "ART",
  "MUSIC",
  "APPLIANCES",
  "JEWELRY",
  "COLLECTIBLES",
  "GARDEN",
  "PETS",
  "HEALTH",
  "BEAUTY",
  "FOOD",
  "HANDMADE",
  "GAMING",
  "OFFICE",
  "OUTDOORS",
  "HOME_DECOR",
  "BABY",
  "INDUSTRIAL",
  "OTHER"
}


@router.get("/items")
async def get_items():
    items = await db.item.find_many(include={"owner": True})
    return items

@router.post("/items")
async def create_item(owner_id: str, title: str, description: str = None, image_url: str = None, tags: List[str] = Query(default=[])):
    # validate owner ID
    owner = await db.user.find_unique(where={"id": owner_id})
    if not owner:
        raise HTTPException(status_code=404, detail="Owner not found")
    # validate tags against Prisma enum
    for t in tags:
        if t.upper() not in tag_enums:
            raise HTTPException(status_code=400, detail=f"Invalid tag: {t}")

    item = await db.item.create(
        data={
            "ownerId": owner_id,
            "title": title,
            "description": description,
            "imageUrl": image_url,
            "tags": tags
        }
    )
    return item


@router.get("/items/user/{user_id}")
async def get_items_by_user(user_id: str):
    items = await db.item.find_many(
        where={"ownerId": user_id},
        include={"owner": True}
    )
    if not items:
        raise HTTPException(status_code=404, detail="No items found for this user")
    return items


@router.get("/items/by-tags")
async def get_items_by_tags(tags: List[str] = Query(default=[])):
    items = await db.item.find_many(
        where={"tags": {"has_some": tags}}
    )
    if not items:
        raise HTTPException(status_code=404, detail="No items found for these tags")
    return items
