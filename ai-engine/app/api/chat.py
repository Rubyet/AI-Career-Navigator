from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.llm_service import llm_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class ChatRequest(BaseModel):
    topic: str
    context: str | None = None
    message: str

@router.post("/chat")
async def chat(request: ChatRequest):
    """
    Handle chatbot interactions for study assistance
    Returns AI-generated response with context awareness
    """
    try:
        response = await llm_service.chat_response(
            request.topic,
            request.context or "",
            request.message
        )
        
        return {"response": response}
    except Exception as e:
        logger.error(f"Chat failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
