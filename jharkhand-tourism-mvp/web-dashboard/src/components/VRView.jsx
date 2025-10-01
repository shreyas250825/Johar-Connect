import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Environment, Float, Stars } from '@react-three/drei';

// VR Scene Component
const VRScene = ({ selectedExperience }) => {
  const { camera } = useThree();

  // Set up VR camera position
  React.useEffect(() => {
    camera.position.set(0, 1.6, 5);
  }, [camera]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="sunset" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshLambertMaterial color="#2d5a27" />
      </mesh>

      {/* Jharkhand-themed 3D elements */}
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <Box position={[-3, 0, -2]} args={[1, 2, 1]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        <Text
          position={[-3, 2.5, -2]}
          fontSize={0.3}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          Tribal Hut
        </Text>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere position={[3, 1, -3]} args={[0.8]}>
          <meshStandardMaterial color="#4169E1" />
        </Sphere>
        <Text
          position={[3, 2.8, -3]}
          fontSize={0.3}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          Waterfall
        </Text>
      </Float>

      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1}>
        <Box position={[0, 0.5, -4]} args={[2, 1, 1]}>
          <meshStandardMaterial color="#DAA520" />
        </Box>
        <Text
          position={[0, 2, -4]}
          fontSize={0.3}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          Temple
        </Text>
      </Float>

      {/* Welcome text */}
      <Text
        position={[0, 3, -5]}
        fontSize={0.8}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        Welcome to Jharkhand VR
      </Text>

      <Text
        position={[0, 2.2, -5]}
        fontSize={0.4}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {selectedExperience ? selectedExperience.name : 'Select an experience to begin'}
      </Text>

      {/* VR Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
      />
    </>
  );
};

// Loading component
const VRLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white">Loading VR Experience...</p>
    </div>
  </div>
);

const VRView = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isVRActive, setIsVRActive] = useState(false);
  const canvasRef = useRef();

  const vrExperiences = [
    {
      id: 1,
      name: 'Jharkhand Heritage Tour',
      duration: '15 min',
      description: 'Virtual tour of historical and cultural sites',
      points: ['Ancient Temples', 'Tribal Villages', 'Historical Monuments'],
      scene: 'heritage'
    },
    {
      id: 2,
      name: 'Wildlife Sanctuary',
      duration: '20 min',
      description: 'Immersive experience in Betla National Park',
      points: ['Animal Encounters', 'Jungle Safari', 'Bird Watching'],
      scene: 'wildlife'
    },
    {
      id: 3,
      name: 'Waterfall Adventure',
      duration: '10 min',
      description: '360° experience of Jharkhand\'s beautiful waterfalls',
      points: ['Dassam Falls', 'Hundru Falls', 'Jonha Falls'],
      scene: 'waterfall'
    }
  ];

  const startVRExperience = (experience) => {
    setSelectedExperience(experience);
    setIsVRActive(true);
  };

  const exitVR = () => {
    setIsVRActive(false);
    setSelectedExperience(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Virtual Reality <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Experiences</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Immerse yourself in Jharkhand's breathtaking landscapes and rich cultural heritage through cutting-edge VR technology
          </p>
        </div>

        {!isVRActive ? (
          <>
            {/* VR Scene Preview */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="text-2xl font-bold text-white mb-2">VR Preview</h3>
                  <p className="text-gray-300">Select an experience below to start your VR journey</p>
                </div>
              </div>
            </div>

            {/* Available VR Tours */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Available VR Tours</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vrExperiences.map(experience => (
                  <div
                    key={experience.id}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {experience.name}
                      </h3>
                      <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                        {experience.duration}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-6">{experience.description}</p>

                    <ul className="space-y-2 mb-6">
                      {experience.points.map((point, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="text-emerald-400 mr-2">✓</span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3">
                      <button
                        onClick={() => startVRExperience(experience)}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
                      >
                        Start VR Tour
                      </button>
                      <button className="w-full border-2 border-emerald-400 text-emerald-400 font-semibold py-3 px-6 rounded-xl hover:bg-emerald-400 hover:text-white transition-all duration-300">
                        Preview 360°
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VR Requirements */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">VR Requirements & Tips</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🖥️</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Desktop</h4>
                  <p className="text-gray-300 text-sm">WebGL enabled browser, mouse/keyboard controls</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📱</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Mobile</h4>
                  <p className="text-gray-300 text-sm">Gyroscope support, VR viewer recommended</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🥽</div>
                  <h4 className="text-lg font-semibold text-white mb-2">VR Headset</h4>
                  <p className="text-gray-300 text-sm">Oculus, HTC Vive, WebVR compatible</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* VR Experience Active */
          <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Experiencing: {selectedExperience?.name}
              </h2>
              <button
                onClick={exitVR}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Exit VR
              </button>
            </div>

            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/20">
              <Canvas
                ref={canvasRef}
                camera={{ position: [0, 1.6, 5], fov: 75 }}
                gl={{ antialias: true }}
                style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)' }}
              >
                <Suspense fallback={<VRLoader />}>
                  <VRScene selectedExperience={selectedExperience} />
                </Suspense>
              </Canvas>
            </div>

            {/* VR Controls Info */}
            <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3">Controls</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div>🖱️ <strong>Mouse:</strong> Look around</div>
                <div>🔄 <strong>Scroll:</strong> Zoom in/out</div>
                <div>👆 <strong>Drag:</strong> Rotate view</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VRView;
