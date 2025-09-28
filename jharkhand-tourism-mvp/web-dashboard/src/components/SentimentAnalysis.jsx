import React, { useState, useEffect } from 'react';
import { sentimentService } from '../services/api';

const SentimentAnalysis = () => {
  const [sentimentData, setSentimentData] = useState({
    overall: 0,
    trends: [],
    categories: {},
    recentAnalysis: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSentimentData = async () => {
      setLoading(true);
      try {
        const data = await sentimentService.getAnalysis();
        if (data) {
          setSentimentData({
            overall: data.overall || 0,
            trends: data.trends || [],
            categories: data.categories || {},
            recentAnalysis: data.recentAnalysis || []
          });
        }
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSentimentData();
  }, []);

  const getSentimentColor = (score) => {
    if (score >= 0.7) return '#4CAF50'; // Positive
    if (score >= 0.4) return '#FFC107'; // Neutral
    return '#F44336'; // Negative
  };

  const getSentimentText = (score) => {
    if (score >= 0.7) return 'Positive';
    if (score >= 0.4) return 'Neutral';
    return 'Negative';
  };

  if (loading) {
    return <div className="loading">Loading sentiment analysis...</div>;
  }

  return (
    <div className="sentiment-container">
      <h2>AI-Powered Sentiment Analysis</h2>
      
      <div className="sentiment-overview">
        <div className="overview-card">
          <h3>Overall Sentiment Score</h3>
          <div 
            className="sentiment-score"
            style={{ color: getSentimentColor(sentimentData.overall) }}
          >
            {(sentimentData.overall * 100).toFixed(1)}%
          </div>
          <p>{getSentimentText(sentimentData.overall)}</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Sentiment by Category</h3>
          <div className="category-sentiment">
            {Object.entries(sentimentData.categories || {}).map(([category, score]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <div className="sentiment-bar">
                  <div 
                    className="sentiment-fill"
                    style={{
                      width: `${(score || 0) * 100}%`,
                      backgroundColor: getSentimentColor(score)
                    }}
                  />
                </div>
                <span className="category-score">
                  {((score || 0) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Sentiment Trends</h3>
          <div className="trends-chart">
            {/* In real app, this would be a line chart */}
            <div className="chart-placeholder">
              <p>Sentiment trends over time</p>
              <p>Weekly/Monthly analysis chart</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Analysis</h3>
        <div className="analysis-list">
          {(sentimentData.recentAnalysis || []).map((analysis, index) => (
            <div key={index} className="analysis-item">
              <div className="analysis-header">
                <span className="source">{analysis?.source || 'Unknown'}</span>
                <span 
                  className="sentiment-badge"
                  style={{ backgroundColor: getSentimentColor(analysis?.score) }}
                >
                  {getSentimentText(analysis?.score)}
                </span>
              </div>
              <p className="analysis-text">{analysis?.text || ''}</p>
              <div className="analysis-meta">
                <span>Score: {((analysis?.score || 0) * 100).toFixed(1)}%</span>
                <span>Confidence: {((analysis?.confidence || 0) * 100).toFixed(1)}%</span>
                <span>{analysis?.timestamp || ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;