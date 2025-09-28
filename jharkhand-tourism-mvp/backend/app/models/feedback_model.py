from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class FeedbackCategory(str, Enum):
    GENERAL = "general"
    GUIDE = "guide"
    ACCOMMODATION = "accommodation"
    TRANSPORT = "transport"
    MARKETPLACE = "marketplace"
    PLATFORM = "platform"

class SentimentLabel(str, Enum):
    POSITIVE = "positive"
    NEUTRAL = "neutral"
    NEGATIVE = "negative"

class FeedbackBase(BaseModel):
    rating: int
    comment: str
    category: FeedbackCategory = FeedbackCategory.GENERAL

class FeedbackSubmission(FeedbackBase):
    user: Optional[str] = "Anonymous"

class Feedback(FeedbackBase):
    id: str
    user: str
    sentiment: SentimentLabel
    date: str
    analyzed_at: Optional[str] = None

    class Config:
        from_attributes = True

# Aliases for API compatibility
FeedbackCreate = FeedbackSubmission
FeedbackResponse = Feedback

class SentimentAnalysis(BaseModel):
    text: str
    sentiment: SentimentLabel
    score: float
    confidence: float
    subjectivity: float
    vader_scores: Dict[str, float]
    timestamp: str
    keywords: Optional[List[str]] = None

class SentimentOverview(BaseModel):
    overall_score: float
    sentiment_distribution: Dict[SentimentLabel, float]
    total_feedback: int
    average_rating: float

class SentimentTrend(BaseModel):
    date: str
    positive: float
    neutral: float
    negative: float
    total_feedback: int

class CategorySentiment(BaseModel):
    category: str
    positive: int
    neutral: int
    negative: int
    total: int
    positive_percent: float
    neutral_percent: float
    negative_percent: float