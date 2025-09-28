import React, { useState, useEffect } from 'react';
import { analyticsService } from '../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    revenue: 0,
    popularSites: [],
    visitorTrends: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const data = await analyticsService.getAnalytics();
        if (data) {
          setAnalytics(data);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-dashboard">
      <h2>Tourism Analytics Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Visitors</h3>
          <div className="stat-number">{analytics?.totalVisitors?.toLocaleString() || '0'}</div>
          <div className="stat-trend">↑ 12% from last month</div>
        </div>
        
        <div className="stat-card">
          <h3>Revenue Generated</h3>
          <div className="stat-number">₹{analytics?.revenue?.toLocaleString() || '0'}</div>
          <div className="stat-trend">↑ 8% from last month</div>
        </div>
        
        <div className="stat-card">
          <h3>Active Guides</h3>
          <div className="stat-number">47</div>
          <div className="stat-trend">↑ 5% from last month</div>
        </div>
        
        <div className="stat-card">
          <h3>Marketplace Orders</h3>
          <div className="stat-number">1,234</div>
          <div className="stat-trend">↑ 15% from last month</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Popular Tourist Sites</h3>
          <div className="sites-list">
            {analytics?.popularSites?.map((site, index) => (
              <div key={site?.id || index} className="site-item">
                <span className="rank">#{index + 1}</span>
                <span className="site-name">{site?.name || 'Unknown'}</span>
                <span className="visitor-count">{site?.visitors || 0} visitors</span>
              </div>
            )) || []}
          </div>
        </div>

        <div className="card">
          <h3>Visitor Trends</h3>
          <div className="trend-chart">
            {/* In real app, this would be a chart component */}
            <div className="chart-placeholder">
              <p>Visitor trends chart will be displayed here</p>
              <p>Using Chart.js or similar library</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;