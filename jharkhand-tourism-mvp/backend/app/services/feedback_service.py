import json
import os
from typing import List, Dict, Any
from datetime import datetime
from ..models.feedback_model import Feedback, FeedbackCreate, FeedbackResponse

class FeedbackService:
    def __init__(self):
        self.data_file = os.path.join(os.path.dirname(__file__), "../data/mock_data.json")
        self._ensure_data_file()

    def _ensure_data_file(self):
        if not os.path.exists(self.data_file):
            os.makedirs(os.path.dirname(self.data_file), exist_ok=True)
            with open(self.data_file, 'w') as f:
                json.dump({"feedback": []}, f, indent=2)

    def _load_data(self) -> Dict[str, Any]:
        with open(self.data_file, 'r') as f:
            return json.load(f)

    def _save_data(self, data: Dict[str, Any]):
        with open(self.data_file, 'w') as f:
            json.dump(data, f, indent=2, default=str)

    def get_all_feedback(self) -> List[Feedback]:
        """Get all feedback entries"""
        data = self._load_data()
        feedback_list = data.get("feedback", [])
        return [Feedback(**item) for item in feedback_list]

    def get_feedback_by_id(self, feedback_id: str) -> Feedback:
        """Get a specific feedback entry by ID"""
        data = self._load_data()
        feedback_list = data.get("feedback", [])
        for item in feedback_list:
            if item["id"] == feedback_id:
                return Feedback(**item)
        raise ValueError(f"Feedback with ID {feedback_id} not found")

    def create_feedback(self, feedback_data: FeedbackCreate) -> Feedback:
        """Create a new feedback entry"""
        data = self._load_data()
        feedback_list = data.get("feedback", [])

        # Generate ID
        feedback_id = str(len(feedback_list) + 1)

        new_feedback = Feedback(
            id=feedback_id,
            **feedback_data.dict(),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        feedback_list.append(new_feedback.dict())
        data["feedback"] = feedback_list
        self._save_data(data)

        return new_feedback

    def update_feedback(self, feedback_id: str, update_data: Dict[str, Any]) -> Feedback:
        """Update an existing feedback entry"""
        data = self._load_data()
        feedback_list = data.get("feedback", [])

        for i, item in enumerate(feedback_list):
            if item["id"] == feedback_id:
                item.update(update_data)
                item["updated_at"] = datetime.utcnow().isoformat()
                data["feedback"] = feedback_list
                self._save_data(data)
                return Feedback(**item)

        raise ValueError(f"Feedback with ID {feedback_id} not found")

    def delete_feedback(self, feedback_id: str) -> bool:
        """Delete a feedback entry"""
        data = self._load_data()
        feedback_list = data.get("feedback", [])

        for i, item in enumerate(feedback_list):
            if item["id"] == feedback_id:
                del feedback_list[i]
                data["feedback"] = feedback_list
                self._save_data(data)
                return True

        return False

    def get_feedback_stats(self) -> Dict[str, Any]:
        """Get feedback statistics"""
        feedback_list = self.get_all_feedback()

        total_feedback = len(feedback_list)
        avg_rating = sum(f.rating for f in feedback_list) / total_feedback if total_feedback > 0 else 0

        categories = {}
        for feedback in feedback_list:
            cat = feedback.category
            if cat not in categories:
                categories[cat] = 0
            categories[cat] += 1

        return {
            "total_feedback": total_feedback,
            "average_rating": round(avg_rating, 2),
            "categories": categories
        }
