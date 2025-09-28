from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
import json
import os

from ..services.analytics_service import AnalyticsService
from ..models.analytics_model import AnalyticsResponse, TrendData

router = APIRouter()
analytics_service = AnalyticsService()

@router.get("/", response_model=AnalyticsResponse)
async def get_analytics():
    """
    Get overall analytics data for the tourism platform
    """
    try:
        analytics_data = analytics_service.get_overall_analytics()
        return analytics_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching analytics: {str(e)}")

@router.get("/trends", response_model=List[TrendData])
async def get_trends(period: str = "monthly"):
    """
    Get trend data for specified period
    """
    try:
        trends = analytics_service.get_trends(period)
        return trends
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trends: {str(e)}")

@router.get("/popular-sites")
async def get_popular_sites(limit: int = 10):
    """
    Get most popular tourist sites
    """
    try:
        popular_sites = analytics_service.get_popular_sites(limit)
        return {"sites": popular_sites}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching popular sites: {str(e)}")

@router.get("/revenue")
async def get_revenue_analytics():
    """
    Get revenue analytics data
    """
    try:
        revenue_data = analytics_service.get_revenue_analytics()
        return revenue_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching revenue data: {str(e)}")

@router.get("/visitor-demographics")
async def get_visitor_demographics():
    """
    Get visitor demographics data
    """
    try:
        demographics = analytics_service.get_visitor_demographics()
        return demographics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching demographics: {str(e)}")

@router.get("/real-time")
async def get_real_time_metrics():
    """
    Get real-time platform metrics
    """
    try:
        real_time_data = analytics_service.get_real_time_metrics()
        return real_time_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching real-time metrics: {str(e)}")