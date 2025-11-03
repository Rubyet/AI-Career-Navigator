from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.api import jobs, matching, study, chat
from app.core.config import settings
from app.db.database import init_db
from app.services.redis_service import init_redis

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting AI Engine...")
    await init_db()
    await init_redis()
    logger.info("AI Engine started successfully")
    yield
    # Shutdown
    logger.info("Shutting down AI Engine...")

app = FastAPI(
    title="AI Career Navigator - AI Engine",
    description="AI/ML microservice for job matching, content generation, and chatbot",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "ai-engine"}

# Include routers
app.include_router(jobs.router, prefix="/api", tags=["jobs"])
app.include_router(matching.router, prefix="/api", tags=["matching"])
app.include_router(study.router, prefix="/api", tags=["study"])
app.include_router(chat.router, prefix="/api", tags=["chat"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
