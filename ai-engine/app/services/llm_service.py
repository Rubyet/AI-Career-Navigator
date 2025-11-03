from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class LLMService:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.LLM_MODEL,
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY
        )
    
    async def analyze_job_description(self, description: str) -> dict:
        """Extract skills and requirements from job description"""
        prompt = f"""Analyze the following job description and extract:
1. Required technical skills
2. Preferred technical skills
3. Experience level required
4. Key responsibilities

Job Description:
{description}

Return the result in JSON format with keys: required_skills, preferred_skills, experience_level, responsibilities"""

        response = await self.llm.ainvoke([
            SystemMessage(content="You are an expert job description analyzer."),
            HumanMessage(content=prompt)
        ])
        
        # Parse response (simplified - add proper JSON parsing)
        return {"raw_analysis": response.content}
    
    async def match_candidate(self, job_requirements: list[str], candidate_skills: list[str]) -> dict:
        """Calculate match score between job and candidate"""
        prompt = f"""Compare the job requirements with the candidate's skills and provide:
1. Match score (0-100)
2. Matched skills
3. Missing skills (skill gaps)
4. Recommendations for improvement

Job Requirements: {', '.join(job_requirements)}
Candidate Skills: {', '.join(candidate_skills)}

Return as JSON with keys: match_score, matched_skills, missing_skills, recommendations"""

        response = await self.llm.ainvoke([
            SystemMessage(content="You are an expert career advisor and technical recruiter."),
            HumanMessage(content=prompt)
        ])
        
        return {"analysis": response.content}
    
    async def generate_study_content(self, topic: str) -> dict:
        """Generate study material for a given topic"""
        prompt = f"""Create comprehensive study material for: {topic}

Include:
1. Brief explanation
2. 5 common interview questions with detailed answers
3. Code examples (if applicable)
4. Key concepts to remember
5. Resources for further learning

Format as JSON with keys: explanation, questions, examples, key_concepts, resources"""

        response = await self.llm.ainvoke([
            SystemMessage(content="You are an expert technical educator and interviewer."),
            HumanMessage(content=prompt)
        ])
        
        return {"content": response.content}
    
    async def chat_response(self, topic: str, context: str, message: str) -> str:
        """Generate chatbot response with context awareness"""
        prompt = f"""You are a helpful study assistant for the topic: {topic}

Context:
{context}

User Question: {message}

Provide a clear, concise answer that helps the user understand the concept."""

        response = await self.llm.ainvoke([
            SystemMessage(content="You are a patient and knowledgeable study assistant."),
            HumanMessage(content=prompt)
        ])
        
        return response.content

# Singleton instance
llm_service = LLMService()
