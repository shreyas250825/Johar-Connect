import json
import os
from typing import List, Dict, Any, Optional
import random

class ProvidersService:
    def __init__(self):
        self.providers = self.generate_mock_providers()
    
    def generate_mock_providers(self) -> List[Dict[str, Any]]:
        """Generate mock service provider data"""
        provider_types = ["guide", "homestay", "transport", "activity"]
        specialties = {
            "guide": ["Cultural Tours", "Wildlife", "Adventure", "Heritage", "Photography"],
            "homestay": ["Traditional", "Eco-friendly", "Luxury", "Budget", "Family"],
            "transport": ["Car", "Bike", "Bus", "Boat", "Jeep"],
            "activity": ["Trekking", "Bird Watching", "Fishing", "Camping", "Yoga"]
        }
        
        names = ["Raj Kumar", "Priya Singh", "Amit Sharma", "Sneha Patel", "Vikram Das", 
                "Anjali Mehta", "Rahul Verma", "Pooja Reddy", "Sanjay Joshi", "Kavita Malhotra"]
        
        locations = ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih"]
        
        providers = []
        
        for i in range(50):
            provider_type = random.choice(provider_types)
            name = random.choice(names)
            location = random.choice(locations)
            
            provider = {
                "id": f"provider_{i+1}",
                "name": name,
                "type": provider_type,
                "description": f"Experienced {provider_type} providing excellent services in {location}",
                "location": location,
                "rating": round(random.uniform(3.5, 5.0), 1),
                "experience": random.randint(1, 20),
                "specialties": random.sample(specialties[provider_type], random.randint(1, 3)),
                "languages": random.sample(["Hindi", "English", "Santhali", "Bengali", "Odia"], random.randint(1, 3)),
                "verified": random.choice([True, True, True, False]),  # 75% verified
                "avatar": f"https://ui-avatars.com/api/?name={name.replace(' ', '+')}&background=4ECDC4&color=fff",
                "tours_completed": random.randint(10, 100),
                "hourly_rate": random.randint(200, 1000) if provider_type == "guide" else None,
                "contact": f"+91-{random.randint(90000, 99999)}{random.randint(10000, 99999)}",
                "availability": random.choice(["available", "busy", "offline"])
            }
            
            providers.append(provider)
        
        return providers
    
    def get_providers(self, provider_type: Optional[str] = None, verified: Optional[bool] = None, 
                     limit: int = 50, skip: int = 0) -> List[Dict[str, Any]]:
        """Get providers with optional filtering"""
        filtered_providers = self.providers
        
        if provider_type:
            filtered_providers = [p for p in filtered_providers if p["type"] == provider_type]
        
        if verified is not None:
            filtered_providers = [p for p in filtered_providers if p["verified"] == verified]
        
        # Sort by rating (highest first)
        filtered_providers.sort(key=lambda x: x["rating"], reverse=True)
        
        return filtered_providers[skip:skip + limit]
    
    def get_provider(self, provider_id: str) -> Optional[Dict[str, Any]]:
        """Get a specific provider by ID"""
        for provider in self.providers:
            if provider["id"] == provider_id:
                return provider
        return None
    
    def create_provider(self, provider_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new service provider"""
        new_provider = {
            "id": f"provider_{len(self.providers) + 1}",
            **provider_data,
            "verified": False,
            "rating": 0,
            "tours_completed": 0,
            "avatar": f"https://ui-avatars.com/api/?name={provider_data.get('name', 'Provider').replace(' ', '+')}&background=4ECDC4&color=fff"
        }
        
        self.providers.append(new_provider)
        return new_provider
    
    def update_provider(self, provider_id: str, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update a service provider"""
        for i, provider in enumerate(self.providers):
            if provider["id"] == provider_id:
                # Update provider data
                for key, value in update_data.items():
                    if value is not None:
                        self.providers[i][key] = value
                return self.providers[i]
        return None
    
    def verify_provider(self, provider_id: str) -> Dict[str, Any]:
        """Verify a service provider using blockchain"""
        provider = self.get_provider(provider_id)
        if not provider:
            return {"success": False, "message": "Provider not found"}
        
        # Update verification status
        for i, p in enumerate(self.providers):
            if p["id"] == provider_id:
                self.providers[i]["verified"] = True
                break
        
        return {
            "success": True,
            "message": "Provider verified successfully",
            "provider_id": provider_id,
            "verified": True,
            "verification_date": "2024-01-01",  # In real app, use current date
            "blockchain_transaction": f"0x{hashlib.sha256(provider_id.encode()).hexdigest()[:64]}"
        }
    
    def get_provider_reviews(self, provider_id: str) -> List[Dict[str, Any]]:
        """Get reviews for a specific provider"""
        # Mock reviews data
        review_templates = [
            "Excellent service! Highly recommended.",
            "Very knowledgeable and professional.",
            "Good experience overall.",
            "Could be better in some areas.",
            "Outstanding service! Will book again."
        ]
        
        reviewers = ["Traveler123", "Tourist456", "Visitor789", "Explorer101", "Adventurer202"]
        
        reviews = []
        for i in range(random.randint(3, 15)):
            reviews.append({
                "id": f"review_{provider_id}_{i}",
                "reviewer": random.choice(reviewers),
                "rating": random.randint(3, 5),
                "comment": random.choice(review_templates),
                "date": f"2024-01-{random.randint(1, 28):02d}",
                "verified_booking": random.choice([True, False])
            })
        
        return reviews
    
    def get_provider_type_stats(self) -> Dict[str, Any]:
        """Get statistics by provider type"""
        stats = {}
        for provider in self.providers:
            provider_type = provider["type"]
            if provider_type not in stats:
                stats[provider_type] = {
                    "count": 0,
                    "average_rating": 0,
                    "verified_count": 0,
                    "total_experience": 0
                }
            
            stats[provider_type]["count"] += 1
            stats[provider_type]["average_rating"] += provider["rating"]
            stats[provider_type]["total_experience"] += provider["experience"]
            if provider["verified"]:
                stats[provider_type]["verified_count"] += 1
        
        # Calculate averages
        for provider_type in stats:
            count = stats[provider_type]["count"]
            if count > 0:
                stats[provider_type]["average_rating"] = round(stats[provider_type]["average_rating"] / count, 1)
                stats[provider_type]["average_experience"] = round(stats[provider_type]["total_experience"] / count, 1)
                stats[provider_type]["verification_rate"] = round((stats[provider_type]["verified_count"] / count) * 100, 1)
        
        return stats
    
    def search_providers(self, query: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Search providers by name, specialty, or location"""
        query = query.lower()
        results = []
        
        for provider in self.providers:
            # Search in name, location, specialties, and description
            if (query in provider["name"].lower() or
                query in provider["location"].lower() or
                any(query in specialty.lower() for specialty in provider["specialties"]) or
                query in provider["description"].lower()):
                
                results.append(provider)
                
                if len(results) >= limit:
                    break
        
        return results