import React, { useState, useEffect } from 'react';
import { governanceService } from '../services/api';

const GovernanceDashboard = () => {
  const [governanceData, setGovernanceData] = useState({
    proposals: [],
    votes: [],
    members: [],
    treasury: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGovernanceData = async () => {
      setLoading(true);
      try {
        const data = await governanceService.getData();
        if (data) {
          setGovernanceData({
            proposals: data.proposals || [],
            votes: data.votes || [],
            members: data.members || [],
            treasury: data.treasury || 0
          });
        }
      } catch (error) {
        console.error('Error fetching governance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGovernanceData();
  }, []);

  if (loading) {
    return <div className="loading">Loading governance data...</div>;
  }

  return (
    <div className="governance-container">
      <h2>DAO Governance Dashboard</h2>

      <div className="governance-stats">
        <div className="stat-card">
          <h3>Treasury Balance</h3>
          <div className="stat-number">${(governanceData.treasury || 0).toLocaleString()}</div>
        </div>

        <div className="stat-card">
          <h3>Active Proposals</h3>
          <div className="stat-number">{(governanceData.proposals || []).filter(p => p?.status === 'active').length}</div>
        </div>

        <div className="stat-card">
          <h3>Total Members</h3>
          <div className="stat-number">{(governanceData.members || []).length}</div>
        </div>

        <div className="stat-card">
          <h3>Voting Power</h3>
          <div className="stat-number">1,234,567</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Active Proposals</h3>
          <div className="proposals-list">
            {(governanceData.proposals || []).map(proposal => (
              <div key={proposal?.id || Math.random()} className="proposal-item">
                <div className="proposal-header">
                  <h4>{proposal?.title || 'Unknown'}</h4>
                  <span className={`status ${proposal?.status || ''}`}>
                    {proposal?.status || 'Unknown'}
                  </span>
                </div>
                <p className="proposal-description">{proposal?.description || ''}</p>

                <div className="proposal-meta">
                  <span>Proposer: {proposal?.proposer || 'Unknown'}</span>
                  <span>Ends: {proposal?.endDate || 'Unknown'}</span>
                </div>

                <div className="voting-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill yes"
                      style={{ width: `${proposal?.votes?.yes || 0}%` }}
                    />
                    <div
                      className="progress-fill no"
                      style={{ width: `${proposal?.votes?.no || 0}%` }}
                    />
                  </div>
                  <div className="vote-stats">
                    <span>Yes: {proposal?.votes?.yes || 0}%</span>
                    <span>No: {proposal?.votes?.no || 0}%</span>
                  </div>
                </div>

                <div className="proposal-actions">
                  <button className="btn btn-success">Vote Yes</button>
                  <button className="btn btn-danger">Vote No</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Community Members</h3>
          <div className="members-list">
            {(governanceData.members || []).map(member => (
              <div key={member?.address || Math.random()} className="member-item">
                <div className="member-info">
                  <img src={member?.avatar || ''} alt={member?.name || 'Unknown'} className="member-avatar" />
                  <div>
                    <h4>{member?.name || 'Unknown'}</h4>
                    <p>{member?.role || 'Member'}</p>
                  </div>
                </div>
                <div className="member-stats">
                  <span>Votes: {member?.votes || 0}</span>
                  <span>Power: {member?.votingPower || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceDashboard;