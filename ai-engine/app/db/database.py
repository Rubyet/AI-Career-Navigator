import asyncpg
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# Connection pool
pool = None

async def init_db():
    global pool
    try:
        pool = await asyncpg.create_pool(
            settings.DATABASE_URL,
            min_size=2,
            max_size=10
        )
        logger.info("Database connection pool created")
    except Exception as e:
        logger.error(f"Failed to create database pool: {e}")
        raise

async def get_db():
    async with pool.acquire() as connection:
        yield connection
