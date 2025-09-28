import React, { useRef, useEffect } from 'react';

const VRView = () => {
  const vrContainerRef = useRef(null);

  useEffect(() => {
    // Initialize VR scene
    // This would integrate with A-Frame or similar library
    const initializeVR = () => {
      console.log('Initializing VR scene...');
      // VR initialization code would go here
    };

    initializeVR();

    return () => {
      // Cleanup VR scene
    };
  }, []);

  const vrExperiences = [
    {
      id: 1,
      name: 'Jharkhand Heritage Tour',
      duration: '15 min',
      description: 'Virtual tour of historical and cultural sites',
      points: ['Ancient Temples', 'Tribal Villages', 'Historical Monuments']
    },
    {
      id: 2,
      name: 'Wildlife Sanctuary',
      duration: '20 min',
      description: 'Immersive experience in Betla National Park',
      points: ['Animal Encounters', 'Jungle Safari', 'Bird Watching']
    },
    {
      id: 3,
      name: 'Waterfall Adventure',
      duration: '10 min',
      description: '360° experience of Jharkhand\'s beautiful waterfalls',
      points: ['Dassam Falls', 'Hundru Falls', 'Jonha Falls']
    }
  ];

  return (
    <div className="vr-container">
      <div className="vr-header">
        <h2>Virtual Reality Experiences</h2>
        <p>Immerse yourself in Jharkhand\'s beauty through VR</p>
      </div>

      <div className="vr-content">
        <div className="vr-scene" ref={vrContainerRef}>
          <div className="vr-placeholder">
            <h3>VR Experience</h3>
            <p>Put on your VR headset or use your phone with a VR viewer</p>
            <div className="vr-mode-selector">
              <button className="btn btn-primary">Desktop VR</button>
              <button className="btn btn-outline">Mobile VR</button>
              <button className="btn btn-outline">VR Headset</button>
            </div>
          </div>
        </div>

        <div className="vr-experiences">
          <h3>Available VR Tours</h3>
          <div className="experiences-grid">
            {vrExperiences.map(experience => (
              <div key={experience.id} className="experience-card">
                <div className="experience-header">
                  <h4>{experience.name}</h4>
                  <span className="duration">{experience.duration}</span>
                </div>
                
                <p className="description">{experience.description}</p>
                
                <ul className="experience-points">
                  {experience.points.map((point, index) => (
                    <li key={index}>✓ {point}</li>
                  ))}
                </ul>

                <div className="experience-actions">
                  <button className="btn btn-primary">Start VR Tour</button>
                  <button className="btn btn-outline">Preview 360°</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="vr-requirements">
        <h4>VR Requirements:</h4>
        <div className="requirements-grid">
          <div className="requirement">
            <strong>Desktop</strong>
            <p>WebGL enabled browser</p>
            <p>VR headset optional</p>
          </div>
          <div className="requirement">
            <strong>Mobile</strong>
            <p>Gyroscope support</p>
            <p>VR viewer recommended</p>
          </div>
          <div className="requirement">
            <strong>Headset</strong>
            <p>Oculus, HTC Vive, etc.</p>
            <p>WebVR compatible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRView;