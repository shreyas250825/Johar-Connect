import React, { useState, useEffect } from 'react';
import { feedbackService } from '../services/api';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    comment: '',
    category: 'general'
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await feedbackService.getFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await feedbackService.submitFeedback(newFeedback);
      setNewFeedback({ rating: 5, comment: '', category: 'general' });
      // Refresh feedback list
      const data = await feedbackService.getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="feedback-container">
      <div className="grid-2">
        <div className="card">
          <h3>Submit Your Feedback</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Rating</label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${star <= newFeedback.rating ? 'active' : ''}`}
                    onClick={() => setNewFeedback({...newFeedback, rating: star})}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={newFeedback.category}
                onChange={(e) => setNewFeedback({...newFeedback, category: e.target.value})}
              >
                <option value="general">General</option>
                <option value="guide">Tour Guide</option>
                <option value="accommodation">Accommodation</option>
                <option value="transport">Transport</option>
                <option value="marketplace">Marketplace</option>
              </select>
            </div>

            <div className="form-group">
              <label>Your Feedback</label>
              <textarea
                value={newFeedback.comment}
                onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                placeholder="Share your experience..."
                rows="4"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Feedback
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Recent Feedback</h3>
          <div className="feedback-list">
            {feedbacks.map(feedback => (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-header">
                  <span className="user">{feedback.user}</span>
                  <span className="rating">{"★".repeat(feedback.rating)}</span>
                  <span className="category">{feedback.category}</span>
                </div>
                <p className="comment">{feedback.comment}</p>
                <div className="feedback-meta">
                  <span className="date">{feedback.date}</span>
                  <span className={`sentiment ${feedback.sentiment}`}>
                    {feedback.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;