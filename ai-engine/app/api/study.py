from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.llm_service import llm_service
from app.services.embedding_service import embedding_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class GenerateContentRequest(BaseModel):
    topic: str

@router.post("/generate-content")
async def generate_content(request: GenerateContentRequest):
    """
    Generate study material for a given topic
    Returns interview questions, explanations, and examples
    """
    try:
        content = await llm_service.generate_study_content(request.topic)
        
        # Generate embedding for the content
        embedding = embedding_service.generate_embedding(request.topic)
        
        return {
            "questions": [],  # Parse from content
            "explanation": content.get("content", ""),
            "embedding": embedding
        }
    except Exception as e:
        logger.error(f"Content generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
