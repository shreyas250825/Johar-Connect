from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class AnalyticsResponse(BaseModel):
    total_visitors: int
    revenue: float
    active_guides: int
    marketplace_orders: int
    average_rating: float
    completion_rate: float

class TrendData(BaseModel):
    period: str
    visitors: int
    revenue: float
    bookings: int

class VisitorDemographics(BaseModel):
    domestic: float
    international: float
    age_groups: Dict[str, float]

class PopularSite(BaseModel):
    id: int
    name: str
    visitors: int
    rating: float

class RevenueAnalytics(BaseModel):
    total_revenue: float
    revenue_sources: Dict[str, float]
    monthly_growth: float
    projected_revenue: float

class RealTimeMetrics(BaseModel):
    active_users: int
    ongoing_tours: int
    pending_orders: int
    online_guides: int
    system_health: float

class GuidePerformance(BaseModel):
    name: str
    tours_completed: int
    rating: float
    earnings: float

class PlatformStats(BaseModel):
    total_users: int
    total_bookings: int
    total_revenue: float
    active_providers: int
    satisfaction_rate: float