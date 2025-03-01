from fastapi import FastAPI
from api import user, item, trade, trade_group
from api.db import connect_db, disconnect_db

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

app.include_router(user.router, prefix="/api/py")
app.include_router(item.router, prefix="/api/py")
app.include_router(trade.router, prefix="/api/py")
app.include_router(trade_group.router, prefix="/api/py")

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()
