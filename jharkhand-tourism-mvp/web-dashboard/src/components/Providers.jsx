import React, { useState, useEffect } from 'react';
import { providersService } from '../services/api';

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await providersService.getProviders();
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };
    
    fetchProviders();
  }, []);

  const filteredProviders = providers.filter(provider => 
    filter === 'all' || provider.type === filter
  );

  return (
    <div className="providers-container">
      <div className="providers-header">
        <h2>Verified Tour Guides & Service Providers</h2>
        <p>Blockchain-verified local experts for authentic experiences</p>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Providers
        </button>
        <button 
          className={`filter-btn ${filter === 'guide' ? 'active' : ''}`}
          onClick={() => setFilter('guide')}
        >
          Tour Guides
        </button>
        <button 
          className={`filter-btn ${filter === 'homestay' ? 'active' : ''}`}
          onClick={() => setFilter('homestay')}
        >
          Homestays
        </button>
        <button 
          className={`filter-btn ${filter === 'transport' ? 'active' : ''}`}
          onClick={() => setFilter('transport')}
        >
          Transport
        </button>
      </div>

      <div className="providers-grid">
        {filteredProviders.map(provider => (
          <div key={provider.id} className="provider-card">
            <div className="provider-header">
              <img 
                src={provider.avatar} 
                alt={provider.name}
                className="provider-avatar"
              />
              <div className="provider-info">
                <h3>{provider.name}</h3>
                <span className="provider-type">{provider.type}</span>
                <div className="verification-badge">
                  <span>✅ Verified</span>
                </div>
              </div>
            </div>

            <div className="provider-details">
              <p>{provider.description}</p>
              
              <div className="specialties">
                {provider.specialties.map(specialty => (
                  <span key={specialty} className="specialty-tag">
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="provider-stats">
                <div className="stat">
                  <strong>{provider.rating}</strong>
                  <span>Rating</span>
                </div>
                <div className="stat">
                  <strong>{provider.toursCompleted}</strong>
                  <span>Tours</span>
                </div>
                <div className="stat">
                  <strong>{provider.experience}</strong>
                  <span>Years</span>
                </div>
              </div>

              <div className="provider-actions">
                <button className="btn btn-primary">Book Now</button>
                <button className="btn btn-outline">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers;