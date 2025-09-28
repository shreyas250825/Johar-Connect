from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Any

from ..services.sentiment_service import SentimentService


from ..models.feedback_model import SentimentAnalysis, FeedbackSubmission

router = APIRouter()
sentiment_service = SentimentService()

class AnalyzeTextRequest(BaseModel):
    text: str
    language: str = "en"

class BatchAnalysisRequest(BaseModel):
    texts: List[str]
    language: str = "en"

@router.get("/analysis", response_model=Dict[str, Any])
async def get_sentiment_analysis():
    """
    Get overall sentiment analysis
    """
    try:
        analysis = sentiment_service.get_overall_sentiment()
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error performing sentiment analysis: {str(e)}")

@router.post("/analyze", response_model=SentimentAnalysis)
async def analyze_text(request: AnalyzeTextRequest):
    """
    Analyze sentiment for a single text
    """
    try:
        result = sentiment_service.analyze_single_text(request.text, request.language)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing text: {str(e)}")

@router.post("/analyze-batch")
async def analyze_batch(request: BatchAnalysisRequest):
    """
    Analyze sentiment for multiple texts
    """
    try:
        results = sentiment_service.analyze_batch_texts(request.texts, request.language)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing batch texts: {str(e)}")

@router.get("/feedback-trends")
async def get_feedback_trends(days: int = 30):
    """
    Get sentiment trends over time
    """
    try:
        trends = sentiment_service.get_sentiment_trends(days)
        return trends
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching sentiment trends: {str(e)}")

@router.get("/category-sentiment")
async def get_category_sentiment():
    """
    Get sentiment analysis by category
    """
    try:
        category_sentiment = sentiment_service.get_sentiment_by_category()
        return category_sentiment
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching category sentiment: {str(e)}")

@router.post("/feedback")
async def submit_feedback(feedback: FeedbackSubmission):
    """
    Submit new feedback and get sentiment analysis
    """
    try:
        result = sentiment_service.process_feedback(feedback)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing feedback: {str(e)}")