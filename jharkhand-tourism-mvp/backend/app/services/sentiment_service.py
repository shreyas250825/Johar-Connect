import json
import os
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import random
from textblob import TextBlob
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import re

# Download required NLTK data
try:
    nltk.data.find('vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon')

class SentimentService:
    def __init__(self):
        self.sia = SentimentIntensityAnalyzer()
        self.feedback_data = self.load_feedback_data()
        self.sentiment_history = self.initialize_sentiment_history()
        
        # Tourism-specific keywords for better analysis
        self.tourism_keywords = {
            "positive": [
                "amazing", "beautiful", "wonderful", "excellent", "fantastic", "great",
                "knowledgeable", "friendly", "helpful", "professional", "memorable",
                "breathtaking", "picturesque", "authentic", "cultural", "heritage"
            ],
            "negative": [
                "disappointing", "poor", "bad", "terrible", "awful", "horrible",
                "crowded", "dirty", "expensive", "rude", "unprofessional", "delayed",
                "cancelled", "misleading", "overpriced"
            ],
            "improvement": [
                "improve", "better", "could be", "should have", "suggest", "recommend",
                "need", "lack", "missing", "issue", "problem", "concern"
            ]
        }
    
    def load_feedback_data(self) -> List[Dict[str, Any]]:
        """Load sample feedback data"""
        return [
            {
                "id": 1,
                "user": "Tourist123",
                "rating": 5,
                "comment": "Amazing experience! The tour guide was very knowledgeable about local culture and heritage. The waterfalls were breathtaking.",
                "category": "guide",
                "date": "2024-01-15",
                "sentiment": "positive",
                "language": "en"
            },
            {
                "id": 2,
                "user": "Traveler456",
                "rating": 4,
                "comment": "Good service but the transportation could be improved. The destinations were beautiful though.",
                "category": "transport",
                "date": "2024-01-14",
                "sentiment": "neutral",
                "language": "en"
            },
            {
                "id": 3,
                "user": "Visitor789",
                "rating": 2,
                "comment": "Disappointing accommodation. Not worth the price we paid. Expected better facilities.",
                "category": "accommodation",
                "date": "2024-01-13",
                "sentiment": "negative",
                "language": "en"
            },
            {
                "id": 4,
                "user": "Explorer101",
                "rating": 5,
                "comment": "Fantastic platform! Easy to book tours and the local handicrafts marketplace is wonderful. Supporting local artisans feels great.",
                "category": "platform",
                "date": "2024-01-12",
                "sentiment": "positive",
                "language": "en"
            },
            {
                "id": 5,
                "user": "Adventurer202",
                "rating": 3,
                "comment": "Average experience. Some sites were overcrowded. Guide was good but the itinerary could be better planned.",
                "category": "general",
                "date": "2024-01-11",
                "sentiment": "neutral",
                "language": "en"
            }
        ]
    
    def initialize_sentiment_history(self) -> List[Dict[str, Any]]:
        """Initialize sentiment history data"""
        history = []
        base_date = datetime.now() - timedelta(days=30)
        
        for i in range(30):
            date = (base_date + timedelta(days=i)).strftime("%Y-%m-%d")
            history.append({
                "date": date,
                "positive": random.randint(60, 80),
                "neutral": random.randint(15, 25),
                "negative": random.randint(5, 15),
                "total_feedback": random.randint(20, 50),
                "average_rating": round(random.uniform(3.8, 4.8), 1)
            })
        
        return history
    
    def analyze_single_text(self, text: str, language: str = "en") -> Dict[str, Any]:
        """Analyze sentiment for a single text with tourism context"""
        if not text or text.strip() == "":
            return {
                "text": text,
                "sentiment": "neutral",
                "score": 0,
                "confidence": 0,
                "subjectivity": 0,
                "keywords": [],
                "tourism_context": {},
                "timestamp": datetime.utcnow().isoformat()
            }
        
        # TextBlob analysis
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity  # -1 to 1
        subjectivity = blob.sentiment.subjectivity  # 0 to 1
        
        # VADER sentiment analysis
        vader_scores = self.sia.polarity_scores(text)
        
        # Enhanced sentiment analysis with tourism context
        tourism_context = self.analyze_tourism_context(text)
        
        # Combined score (weighted average)
        combined_score = (polarity + vader_scores['compound']) / 2
        
        # Determine sentiment label with confidence
        if combined_score > 0.1:
            sentiment_label = "positive"
            confidence = min(combined_score, 1.0)
        elif combined_score < -0.1:
            sentiment_label = "negative"
            confidence = min(abs(combined_score), 1.0)
        else:
            sentiment_label = "neutral"
            confidence = 1.0 - abs(combined_score)
        
        # Extract keywords
        keywords = self.extract_keywords(text)
        
        return {
            "text": text,
            "sentiment": sentiment_label,
            "score": combined_score,
            "confidence": confidence,
            "subjectivity": subjectivity,
            "vader_scores": vader_scores,
            "textblob_polarity": polarity,
            "keywords": keywords,
            "tourism_context": tourism_context,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def analyze_tourism_context(self, text: str) -> Dict[str, Any]:
        """Analyze tourism-specific context in text"""
        text_lower = text.lower()
        
        # Count keyword occurrences
        positive_count = sum(1 for word in self.tourism_keywords["positive"] if word in text_lower)
        negative_count = sum(1 for word in self.tourism_keywords["negative"] if word in text_lower)
        improvement_count = sum(1 for word in self.tourism_keywords["improvement"] if word in text_lower)
        
        # Detect specific aspects
        aspects = {
            "guide_mentioned": any(word in text_lower for word in ["guide", "tour guide", "leader"]),
            "accommodation_mentioned": any(word in text_lower for word in ["hotel", "accommodation", "stay", "room"]),
            "transport_mentioned": any(word in text_lower for word in ["transport", "vehicle", "car", "bus", "travel"]),
            "food_mentioned": any(word in text_lower for word in ["food", "meal", "restaurant", "dining"]),
            "location_mentioned": any(word in text_lower for word in ["place", "location", "site", "destination"]),
            "price_mentioned": any(word in text_lower for word in ["price", "cost", "expensive", "cheap", "value"])
        }
        
        return {
            "positive_keywords": positive_count,
            "negative_keywords": negative_count,
            "improvement_suggestions": improvement_count,
            "aspects_mentioned": aspects,
            "tourism_focus_score": (positive_count + negative_count + improvement_count) / len(text.split()) * 100
        }
    
    def extract_keywords(self, text: str, num_keywords: int = 10) -> List[str]:
        """Extract keywords from text with tourism focus"""
        # Remove common stop words and punctuation
        stop_words = {
            "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", 
            "of", "with", "by", "as", "is", "was", "were", "be", "been", "have",
            "has", "had", "do", "does", "did", "will", "would", "could", "should",
            "may", "might", "must", "can", "this", "that", "these", "those", "i",
            "you", "he", "she", "it", "we", "they", "my", "your", "his", "her"
        }
        
        # Clean and tokenize text
        words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
        
        # Filter stop words and count frequencies
        word_freq = {}
        for word in words:
            if word not in stop_words:
                word_freq[word] = word_freq.get(word, 0) + 1
        
        # Sort by frequency and return top keywords
        sorted_keywords = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        return [word for word, freq in sorted_keywords[:num_keywords]]
    
    def analyze_batch_texts(self, texts: List[str], language: str = "en") -> List[Dict[str, Any]]:
        """Analyze sentiment for multiple texts"""
        results = []
        for text in texts:
            result = self.analyze_single_text(text, language)
            results.append(result)
        return results
    
    def get_overall_sentiment(self) -> Dict[str, Any]:
        """Get overall sentiment analysis from all feedback"""
        total_feedback = len(self.feedback_data)
        if total_feedback == 0:
            return {
                "overall_score": 0,
                "sentiment_distribution": {"positive": 0, "neutral": 0, "negative": 0},
                "total_feedback": 0,
                "average_rating": 0,
                "confidence": 0
            }
        
        # Calculate sentiment distribution
        sentiment_count = {"positive": 0, "neutral": 0, "negative": 0}
        total_score = 0
        total_rating = 0
        
        for feedback in self.feedback_data:
            sentiment = feedback.get("sentiment", "neutral")
            sentiment_count[sentiment] += 1
            
            # Convert sentiment to numerical score for average
            if sentiment == "positive":
                total_score += 1
            elif sentiment == "negative":
                total_score -= 1
            
            total_rating += feedback.get("rating", 0)
        
        overall_score = total_score / total_feedback
        average_rating = total_rating / total_feedback
        
        # Convert counts to percentages
        sentiment_distribution = {
            sentiment: (count / total_feedback) * 100 
            for sentiment, count in sentiment_count.items()
        }
        
        # Calculate confidence based on data volume and consistency
        confidence = min(total_feedback / 100, 1.0)  # More data = more confidence
        
        return {
            "overall_score": overall_score,
            "sentiment_distribution": sentiment_distribution,
            "total_feedback": total_feedback,
            "average_rating": round(average_rating, 1),
            "confidence": confidence,
            "last_updated": datetime.utcnow().isoformat()
        }
    
    def get_sentiment_trends(self, days: int = 30) -> List[Dict[str, Any]]:
        """Get sentiment trends over time"""
        if days > len(self.sentiment_history):
            days = len(self.sentiment_history)
        
        return self.sentiment_history[-days:]
    
    def get_sentiment_by_category(self) -> Dict[str, Any]:
        """Get sentiment analysis by category"""
        categories = {}
        
        for feedback in self.feedback_data:
            category = feedback.get("category", "general")
            sentiment = feedback.get("sentiment", "neutral")
            
            if category not in categories:
                categories[category] = {
                    "positive": 0, 
                    "neutral": 0, 
                    "negative": 0, 
                    "total": 0,
                    "average_rating": 0,
                    "total_rating": 0
                }
            
            categories[category][sentiment] += 1
            categories[category]["total"] += 1
            categories[category]["total_rating"] += feedback.get("rating", 0)
        
        # Calculate percentages and averages
        for category, data in categories.items():
            total = data["total"]
            if total > 0:
                data["positive_percent"] = (data["positive"] / total) * 100
                data["neutral_percent"] = (data["neutral"] / total) * 100
                data["negative_percent"] = (data["negative"] / total) * 100
                data["average_rating"] = round(data["total_rating"] / total, 1)
        
        return categories
    
    def process_feedback(self, feedback_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process new feedback and return sentiment analysis"""
        # Analyze sentiment of the feedback comment
        sentiment_result = self.analyze_single_text(feedback_data.get("comment", ""))
        
        # Create new feedback entry
        new_feedback = {
            "id": len(self.feedback_data) + 1,
            "user": feedback_data.get("user", "Anonymous"),
            "rating": feedback_data.get("rating", 0),
            "comment": feedback_data.get("comment", ""),
            "category": feedback_data.get("category", "general"),
            "date": datetime.utcnow().strftime("%Y-%m-%d"),
            "sentiment": sentiment_result["sentiment"],
            "language": feedback_data.get("language", "en"),
            "source": feedback_data.get("source", "web_platform")
        }
        
        self.feedback_data.append(new_feedback)
        
        # Update sentiment history
        self.update_sentiment_history(new_feedback)
        
        return {
            "feedback": new_feedback,
            "sentiment_analysis": sentiment_result,
            "message": "Feedback submitted successfully"
        }
    
    def update_sentiment_history(self, feedback: Dict[str, Any]):
        """Update sentiment history with new feedback"""
        today = datetime.utcnow().strftime("%Y-%m-%d")
        
        # Find today's entry or create new one
        today_entry = None
        for entry in self.sentiment_history:
            if entry["date"] == today:
                today_entry = entry
                break
        
        if not today_entry:
            today_entry = {
                "date": today,
                "positive": 0,
                "neutral": 0,
                "negative": 0,
                "total_feedback": 0,
                "average_rating": 0
            }
            self.sentiment_history.append(today_entry)
        
        # Update counts
        today_entry["total_feedback"] += 1
        sentiment = feedback.get("sentiment", "neutral")
        today_entry[sentiment] += 1
        
        # Update average rating
        total_rating = sum(fb.get("rating", 0) for fb in self.feedback_data 
                          if fb.get("date") == today)
        today_entry["average_rating"] = round(total_rating / today_entry["total_feedback"], 1)
    
    def get_improvement_suggestions(self) -> List[Dict[str, Any]]:
        """Get actionable improvement suggestions from feedback"""
        suggestions = []
        
        # Analyze negative and neutral feedback for improvement areas
        for feedback in self.feedback_data:
            if feedback["sentiment"] in ["negative", "neutral"]:
                analysis = self.analyze_single_text(feedback["comment"])
                
                if analysis["tourism_context"]["improvement_suggestions"] > 0:
                    suggestion = {
                        "feedback_id": feedback["id"],
                        "category": feedback["category"],
                        "suggestion_text": feedback["comment"],
                        "priority": "high" if feedback["sentiment"] == "negative" else "medium",
                        "aspects": analysis["tourism_context"]["aspects_mentioned"],
                        "keywords": analysis["keywords"][:5]
                    }
                    suggestions.append(suggestion)
        
        return suggestions[:10]  # Return top 10 suggestions
    
    def get_sentiment_summary(self) -> Dict[str, Any]:
        """Get comprehensive sentiment summary"""
        overall = self.get_overall_sentiment()
        by_category = self.get_sentiment_by_category()
        trends = self.get_sentiment_trends(7)  # Last 7 days
        suggestions = self.get_improvement_suggestions()
        
        return {
            "overall": overall,
            "by_category": by_category,
            "recent_trends": trends,
            "improvement_suggestions": suggestions,
            "summary": self.generate_summary_text(overall, by_category),
            "last_analysis_date": datetime.utcnow().isoformat()
        }
    
    def generate_summary_text(self, overall: Dict[str, Any], by_category: Dict[str, Any]) -> str:
        """Generate human-readable summary text"""
        positive_percent = overall["sentiment_distribution"]["positive"]
        negative_percent = overall["sentiment_distribution"]["negative"]
        
        if positive_percent > 70:
            sentiment_text = "overwhelmingly positive"
        elif positive_percent > 50:
            sentiment_text = "generally positive"
        elif negative_percent > 30:
            sentiment_text = "mixed with some concerns"
        else:
            sentiment_text = "balanced with room for improvement"
        
        # Find strongest and weakest categories
        categories_sorted = sorted(
            by_category.items(),
            key=lambda x: x[1]["positive_percent"],
            reverse=True
        )
        
        strongest_category = categories_sorted[0][0] if categories_sorted else "N/A"
        weakest_category = categories_sorted[-1][0] if categories_sorted else "N/A"
        
        return f"""
        Overall sentiment is {sentiment_text} with {positive_percent:.1f}% positive feedback.
        The platform receives an average rating of {overall['average_rating']}/5.
        {strongest_category.title()} receives the most positive feedback, 
        while {weakest_category} could benefit from improvements.
        """
    
    def analyze_social_media_sentiment(self, platform: str, query: str) -> Dict[str, Any]:
        """Analyze sentiment from social media (mock implementation)"""
        # In a real implementation, this would connect to social media APIs
        mock_posts = [
            "Loved my trip to Jharkhand! The eco-tourism initiatives are amazing. 🌿",
            "The tribal handicrafts marketplace is fantastic! Supporting local artisans. 🛍️",
            "Had some issues with transportation but the guides were knowledgeable.",
            "Beautiful waterfalls and rich cultural heritage. Highly recommended!",
            "Platform needs better customer support, but overall good experience."
        ]
        
        analysis_results = self.analyze_batch_texts(mock_posts)
        
        return {
            "platform": platform,
            "query": query,
            "total_posts_analyzed": len(mock_posts),
            "sentiment_analysis": analysis_results,
            "summary": self.get_overall_sentiment_from_analysis(analysis_results),
            "topics_discussed": self.extract_topics(mock_posts)
        }
    
    def get_overall_sentiment_from_analysis(self, analysis_results: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate overall sentiment from analysis results"""
        if not analysis_results:
            return {"sentiment": "neutral", "score": 0}
        
        positive_count = sum(1 for r in analysis_results if r["sentiment"] == "positive")
        negative_count = sum(1 for r in analysis_results if r["sentiment"] == "negative")
        total = len(analysis_results)
        
        return {
            "sentiment": "positive" if positive_count > negative_count else "negative",
            "positive_percent": (positive_count / total) * 100,
            "negative_percent": (negative_count / total) * 100,
            "neutral_percent": ((total - positive_count - negative_count) / total) * 100
        }
    
    def extract_topics(self, texts: List[str]) -> List[str]:
        """Extract common topics from texts"""
        all_keywords = []
        for text in texts:
            keywords = self.extract_keywords(text, 5)
            all_keywords.extend(keywords)
        
        # Count keyword frequencies
        from collections import Counter
        keyword_counts = Counter(all_keywords)
        
        return [keyword for keyword, count in keyword_counts.most_common(10)]