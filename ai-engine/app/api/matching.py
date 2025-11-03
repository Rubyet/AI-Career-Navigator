from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.llm_service import llm_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class JobMatchRequest(BaseModel):
    job_description: str
    required_skills: list[str]
    user_skills: list[str]

@router.post("/match-job")
async def match_job(request: JobMatchRequest):
    """
    Analyze job match between requirements and user skills
    Returns match score, matched skills, and skill gaps
    """
    try:
        # Calculate match
        result = await llm_service.match_candidate(
            request.required_skills,
            request.user_skills
        )
        
        # Simple match calculation
        matched = set(request.required_skills) & set(request.user_skills)
        missing = set(request.required_skills) - set(request.user_skills)
        
        match_score = int((len(matched) / len(request.required_skills)) * 100) if request.required_skills else 0
        
        return {
            "match_score": match_score,
            "matched_skills": list(matched),
            "missing_skills": list(missing),
            "ai_analysis": result
        }
    except Exception as e:
        logger.error(f"Job matching failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
