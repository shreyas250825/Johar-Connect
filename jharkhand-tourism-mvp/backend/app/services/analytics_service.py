import json
import os
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import random
import hashlib

class AnalyticsService:
    def __init__(self):
        self.data_file = os.path.join(os.path.dirname(__file__), '../data/mock_data.json')
        self.load_mock_data()
        self.initialize_analytics_data()
    
    def load_mock_data(self):
        """Load mock data from JSON file"""
        try:
            with open(self.data_file, 'r') as f:
                self.mock_data = json.load(f)
        except FileNotFoundError:
            self.mock_data = self.generate_mock_data()
    
    def generate_mock_data(self) -> Dict[str, Any]:
        """Generate comprehensive mock analytics data"""
        return {
            "total_visitors": 12500,
            "revenue": 4500000,
            "popular_sites": [
                {"id": 1, "name": "Dassam Falls", "visitors": 3200, "rating": 4.8},
                {"id": 2, "name": "Jagannath Temple", "visitors": 2800, "rating": 4.6},
                {"id": 3, "name": "Betla National Park", "visitors": 2500, "rating": 4.7},
                {"id": 4, "name": "Hundru Falls", "visitors": 1800, "rating": 4.5},
                {"id": 5, "name": "Jonha Falls", "visitors": 1500, "rating": 4.4}
            ],
            "visitor_demographics": {
                "domestic": 85,
                "international": 15,
                "age_groups": {
                    "18-25": 25,
                    "26-35": 40,
                    "36-45": 20,
                    "46+": 15
                }
            }
        }
    
    def initialize_analytics_data(self):
        """Initialize analytics data structures"""
        self.analytics_db = {
            "daily_metrics": self.generate_daily_metrics(),
            "user_engagement": self.generate_user_engagement(),
            "revenue_analytics": self.generate_revenue_analytics(),
            "platform_performance": self.generate_platform_performance()
        }
    
    def generate_daily_metrics(self) -> List[Dict[str, Any]]:
        """Generate daily metrics for the last 30 days"""
        metrics = []
        base_date = datetime.now() - timedelta(days=30)
        
        for i in range(30):
            date = (base_date + timedelta(days=i)).strftime("%Y-%m-%d")
            metrics.append({
                "date": date,
                "active_users": random.randint(150, 300),
                "new_registrations": random.randint(5, 25),
                "total_bookings": random.randint(20, 50),
                "completed_tours": random.randint(15, 40),
                "marketplace_orders": random.randint(10, 30),
                "revenue": random.randint(50000, 150000),
                "page_views": random.randint(1000, 3000)
            })
        
        return metrics
    
    def generate_user_engagement(self) -> Dict[str, Any]:
        """Generate user engagement metrics"""
        return {
            "average_session_duration": "12m 34s",
            "bounce_rate": 32.5,
            "returning_users": 45.2,
            "feature_usage": {
                "ar_vr_experiences": 28.7,
                "marketplace": 65.3,
                "guide_booking": 42.1,
                "sentiment_feedback": 38.9
            },
            "device_distribution": {
                "mobile": 58.3,
                "desktop": 32.7,
                "tablet": 9.0
            }
        }
    
    def generate_revenue_analytics(self) -> Dict[str, Any]:
        """Generate revenue analytics data"""
        return {
            "total_revenue": self.mock_data["revenue"],
            "revenue_sources": {
                "tour_bookings": 45.2,
                "marketplace_sales": 32.8,
                "guide_services": 15.7,
                "premium_features": 6.3
            },
            "monthly_growth": 8.2,
            "average_transaction_value": 2450,
            "revenue_trends": self.generate_revenue_trends()
        }
    
    def generate_revenue_trends(self) -> List[Dict[str, Any]]:
        """Generate revenue trends data"""
        trends = []
        base_revenue = 3500000
        current_date = datetime.now()
        
        for i in range(12):
            month = (current_date.replace(day=1) - timedelta(days=30*i)).strftime("%Y-%m")
            growth_factor = 1 + (i * 0.08)  # 8% monthly growth
            random_factor = random.uniform(0.9, 1.1)
            revenue = int(base_revenue * growth_factor * random_factor)
            
            trends.append({
                "month": month,
                "revenue": revenue,
                "growth": round((growth_factor - 1) * 100, 1)
            })
        
        return list(reversed(trends))
    
    def generate_platform_performance(self) -> Dict[str, Any]:
        """Generate platform performance metrics"""
        return {
            "uptime": 99.8,
            "response_time": "245ms",
            "error_rate": 0.2,
            "active_services": {
                "api_gateway": "healthy",
                "database": "healthy",
                "blockchain": "healthy",
                "ai_services": "healthy",
                "ar_vr_engine": "healthy"
            },
            "system_health": {
                "cpu_usage": 45.2,
                "memory_usage": 62.8,
                "storage_usage": 38.5,
                "network_latency": "125ms"
            }
        }
    
    def get_overall_analytics(self) -> Dict[str, Any]:
        """Get overall analytics data"""
        return {
            "total_visitors": self.mock_data["total_visitors"],
            "revenue": self.mock_data["revenue"],
            "active_guides": 47,
            "marketplace_orders": 1234,
            "average_rating": 4.6,
            "completion_rate": 92,
            "satisfaction_score": 8.7,
            "platform_health": 99.8
        }
    
    def get_trends(self, period: str = "monthly") -> List[Dict[str, Any]]:
        """Get trend data for specified period"""
        if period == "daily":
            return self.analytics_db["daily_metrics"][-7:]  # Last 7 days
        elif period == "weekly":
            return self.generate_weekly_trends()
        else:  # monthly
            return self.analytics_db["revenue_analytics"]["revenue_trends"]
    
    def generate_weekly_trends(self) -> List[Dict[str, Any]]:
        """Generate weekly trend data"""
        trends = []
        base_date = datetime.now() - timedelta(weeks=12)
        
        for i in range(12):
            week_start = (base_date + timedelta(weeks=i)).strftime("%Y-%m-%d")
            trends.append({
                "week": week_start,
                "visitors": random.randint(800, 1200),
                "revenue": random.randint(300000, 500000),
                "bookings": random.randint(150, 250),
                "conversion_rate": round(random.uniform(3.5, 6.5), 1)
            })
        
        return trends
    
    def get_popular_sites(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get most popular tourist sites"""
        return self.mock_data["popular_sites"][:limit]
    
    def get_revenue_analytics(self) -> Dict[str, Any]:
        """Get comprehensive revenue analytics"""
        return self.analytics_db["revenue_analytics"]
    
    def get_visitor_demographics(self) -> Dict[str, Any]:
        """Get visitor demographics"""
        return self.mock_data["visitor_demographics"]
    
    def get_real_time_metrics(self) -> Dict[str, Any]:
        """Get real-time platform metrics"""
        current_hour = datetime.now().hour
        # Simulate daily patterns (more activity during daytime)
        activity_multiplier = 1.0
        if 9 <= current_hour <= 18:  # Business hours
            activity_multiplier = 1.5
        elif 19 <= current_hour <= 22:  # Evening
            activity_multiplier = 1.2
        
        return {
            "active_users": int(random.randint(50, 100) * activity_multiplier),
            "ongoing_tours": random.randint(10, 30),
            "pending_orders": random.randint(5, 20),
            "online_guides": random.randint(15, 25),
            "system_health": 99.8,
            "api_requests_last_hour": random.randint(500, 1500),
            "blockchain_transactions": random.randint(50, 200)
        }
    
    def get_guide_performance(self) -> List[Dict[str, Any]]:
        """Get guide performance metrics"""
        guides = [
            {"name": "Raj Kumar", "tours_completed": 45, "rating": 4.9, "earnings": 45000, "specialty": "Cultural Tours"},
            {"name": "Priya Singh", "tours_completed": 38, "rating": 4.8, "earnings": 38000, "specialty": "Wildlife"},
            {"name": "Amit Sharma", "tours_completed": 32, "rating": 4.7, "earnings": 32000, "specialty": "Adventure"},
            {"name": "Sneha Patel", "tours_completed": 28, "rating": 4.6, "earnings": 28000, "specialty": "Heritage"},
            {"name": "Vikram Das", "tours_completed": 25, "rating": 4.5, "earnings": 25000, "specialty": "Photography"}
        ]
        return guides
    
    def get_marketplace_analytics(self) -> Dict[str, Any]:
        """Get marketplace-specific analytics"""
        return {
            "total_products": 500,
            "active_vendors": 45,
            "total_orders": 1234,
            "completion_rate": 95.2,
            "average_order_value": 2450,
            "popular_categories": {
                "handicraft": 45,
                "textile": 25,
                "jewelry": 15,
                "organic": 10,
                "art": 5
            },
            "revenue_trend": "↑ 12.5% this month"
        }
    
    def get_user_engagement_analytics(self) -> Dict[str, Any]:
        """Get user engagement analytics"""
        return self.analytics_db["user_engagement"]
    
    def get_platform_performance(self) -> Dict[str, Any]:
        """Get platform performance metrics"""
        return self.analytics_db["platform_performance"]
    
    def get_sentiment_analytics(self) -> Dict[str, Any]:
        """Get sentiment analysis summary"""
        return {
            "overall_sentiment": "positive",
            "sentiment_score": 8.2,
            "positive_feedback": 72.5,
            "neutral_feedback": 18.3,
            "negative_feedback": 9.2,
            "improvement_areas": ["Transportation", "Accommodation Quality", "Guide Punctuality"],
            "top_praises": ["Knowledgeable Guides", "Beautiful Locations", "Easy Booking Process"]
        }
    
    def get_blockchain_analytics(self) -> Dict[str, Any]:
        """Get blockchain-related analytics"""
        return {
            "total_transactions": 1234,
            "active_contracts": 15,
            "gas_used": "2.45 ETH",
            "verification_requests": 89,
            "successful_verifications": 76,
            "average_transaction_cost": "0.0021 ETH",
            "network_health": "excellent"
        }
    
    def get_custom_report(self, report_type: str, filters: Dict[str, Any] = None) -> Dict[str, Any]:
        """Generate custom analytics report"""
        if report_type == "financial":
            return self.generate_financial_report(filters)
        elif report_type == "user_behavior":
            return self.generate_user_behavior_report(filters)
        elif report_type == "platform_usage":
            return self.generate_platform_usage_report(filters)
        else:
            return {"error": "Invalid report type"}
    
    def generate_financial_report(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        """Generate financial report"""
        return {
            "report_type": "financial",
            "period": filters.get("period", "monthly"),
            "total_revenue": self.mock_data["revenue"],
            "revenue_breakdown": self.analytics_db["revenue_analytics"]["revenue_sources"],
            "growth_metrics": {
                "monthly_growth": 8.2,
                "quarterly_growth": 25.7,
                "yearly_growth": 89.3
            },
            "projections": {
                "next_month": int(self.mock_data["revenue"] * 1.08),
                "next_quarter": int(self.mock_data["revenue"] * 1.26),
                "next_year": int(self.mock_data["revenue"] * 1.89)
            }
        }
    
    def generate_user_behavior_report(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        """Generate user behavior report"""
        return {
            "report_type": "user_behavior",
            "period": filters.get("period", "monthly"),
            "user_engagement": self.analytics_db["user_engagement"],
            "demographics": self.mock_data["visitor_demographics"],
            "feature_adoption": {
                "ar_vr_experiences": "28.7% of active users",
                "blockchain_verification": "65.2% of guides",
                "marketplace_purchases": "42.8% of tourists",
                "sentiment_feedback": "38.9% of completed tours"
            },
            "retention_metrics": {
                "day_1_retention": 65.2,
                "week_1_retention": 42.8,
                "month_1_retention": 28.3,
                "churn_rate": 12.7
            }
        }
    
    def generate_platform_usage_report(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        """Generate platform usage report"""
        return {
            "report_type": "platform_usage",
            "period": filters.get("period", "monthly"),
            "usage_metrics": {
                "daily_active_users": "250-350",
                "monthly_active_users": "4500-5500",
                "session_duration": "12m 34s average",
                "features_used_per_session": "3.2 average"
            },
            "performance_metrics": self.analytics_db["platform_performance"],
            "geographic_distribution": {
                "jharkhand": 65.2,
                "other_indian_states": 28.7,
                "international": 6.1
            },
            "device_usage": self.analytics_db["user_engagement"]["device_distribution"]
        }