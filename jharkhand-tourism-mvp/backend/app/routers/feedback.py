from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
import json
import os

from ..services.feedback_service import FeedbackService
from ..models.feedback_model import Feedback, FeedbackCreate, FeedbackResponse

router = APIRouter()
feedback_service = FeedbackService()

@router.get("/", response_model=List[Feedback])
async def get_all_feedback():
    """
    Get all feedback entries
    """
    try:
        feedback = feedback_service.get_all_feedback()
        return feedback
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching feedback: {str(e)}")

@router.get("/{feedback_id}", response_model=Feedback)
async def get_feedback(feedback_id: str):
    """
    Get a specific feedback entry by ID
    """
    try:
        feedback = feedback_service.get_feedback_by_id(feedback_id)
        return feedback
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching feedback: {str(e)}")

@router.post("/", response_model=Feedback)
async def create_feedback(feedback: FeedbackCreate):
    """
    Create a new feedback entry
    """
    try:
        new_feedback = feedback_service.create_feedback(feedback)
        return new_feedback
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating feedback: {str(e)}")

@router.put("/{feedback_id}", response_model=Feedback)
async def update_feedback(feedback_id: str, update_data: Dict[str, Any]):
    """
    Update an existing feedback entry
    """
    try:
        updated_feedback = feedback_service.update_feedback(feedback_id, update_data)
        return updated_feedback
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating feedback: {str(e)}")

@router.delete("/{feedback_id}")
async def delete_feedback(feedback_id: str):
    """
    Delete a feedback entry
    """
    try:
        deleted = feedback_service.delete_feedback(feedback_id)
        if not deleted:
            raise HTTPException(status_code=404, detail=f"Feedback with ID {feedback_id} not found")
        return {"message": "Feedback deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting feedback: {str(e)}")

@router.get("/stats", response_model=Dict[str, Any])
async def get_feedback_stats():
    """
    Get feedback statistics
    """
    try:
        stats = feedback_service.get_feedback_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching feedback stats: {str(e)}")
