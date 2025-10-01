import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// VR Scene Components
const PanoramicBackground = ({ imageUrl }) => {
  const texture = useLoader(TextureLoader, imageUrl);

  // Configure texture for 360° panoramic view
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(-1, 1);
  texture.offset.set(1, 0);

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

const FloatingTitle = ({ visible }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && visible) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2 + 2;
    }
  });

  if (!visible) return null;

  return (
    <group ref={meshRef} position={[0, 2, -10]}>
      <Text
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        Hundru Falls – Jharkhand
      </Text>
    </group>
  );
};

const VREnvironment = ({ imageUrl, titleVisible }) => {
  return (
    <>
      <PanoramicBackground imageUrl={imageUrl} />
      <FloatingTitle visible={titleVisible} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
    </>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
      <div className="text-lg font-semibold">Loading VR Experience...</div>
      <div className="text-sm opacity-75">Please wait while we prepare the scene</div>
    </div>
  </Html>
);



// Main VR Component
const VRCanvas = ({ imageUrl, isVRSupported, onEnterVR }) => {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(window.devicePixelRatio);
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <VREnvironment imageUrl={imageUrl} titleVisible={titleVisible} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={-0.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={5 * Math.PI / 6}
          />
        </Suspense>
      </Canvas>

      {/* VR Controls Overlay */}
      <div className="absolute bottom-6 right-6 flex flex-col space-y-4">
        {isVRSupported && (
          <button
            onClick={onEnterVR}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
          >
            <span className="text-xl">🥽</span>
            <span>Enter VR</span>
          </button>
        )}

        <button className="px-6 py-3 bg-white/20 backdrop-blur-xl text-white font-semibold rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center space-x-2">
          <span className="text-xl">🎮</span>
          <span>Controls</span>
        </button>
      </div>

      {/* Instructions Overlay */}
      <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-xl text-white p-4 rounded-2xl max-w-sm">
        <h4 className="font-bold mb-2">How to Navigate:</h4>
        <ul className="text-sm space-y-1 opacity-90">
          <li>• Drag to look around</li>
          <li>• Use mouse wheel on desktop</li>
          <li>• Touch and swipe on mobile</li>
          <li>• Click VR button for immersive mode</li>
        </ul>
      </div>
    </div>
  );
};

// Main HundruVR Component
const HundruVR = () => {
  const [loading, setLoading] = useState(true);
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const imageUrl = '/assets/hundru360.jpg';

  useEffect(() => {
    // Check VR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        setIsVRSupported(supported);
      }).catch(() => {
        setIsVRSupported(false);
      });
    }

    // Simulate loading and fade-in effect
    const loadTimer = setTimeout(() => {
      setLoading(false);
      setFadeIn(true);
    }, 2000);

    return () => clearTimeout(loadTimer);
  }, []);

  const handleEnterVR = async () => {
    try {
      if (navigator.xr) {
        const session = await navigator.xr.requestSession('immersive-vr');
        console.log('VR session started:', session);
        // Additional VR session handling would go here
      }
    } catch (error) {
      console.error('Failed to enter VR mode:', error);
      alert('VR mode not available. Please ensure you have a VR headset connected.');
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full translate-y-48 -translate-x-48 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Header Space & Navigation */}
      <div className="relative z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <span className="text-xl">←</span>
            <span className="hidden md:block font-medium">Back to Tours</span>
          </button>

          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Hundru Falls VR Experience
              </span>
            </h1>
            <p className="text-white/70 text-sm mt-1">Immersive 360° Virtual Tour</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">
              LIVE
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-6 animate-spin mx-auto">
              <span className="text-3xl">🌊</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Loading Hundru Falls</h2>
            <p className="text-white/70 mb-6 max-w-md">
              Preparing your immersive journey to one of Jharkhand's most spectacular waterfalls
            </p>
            <div className="flex justify-center">
              <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main VR Content */}
      <div
        className={`absolute inset-0 pt-32 transition-opacity duration-1000 ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full h-full">
          {!loading && (
            <VRCanvas
              imageUrl={imageUrl}
              isVRSupported={isVRSupported}
              onEnterVR={handleEnterVR}
            />
          )}
        </div>
      </div>

      {/* Feature Info Panel */}
      {!loading && (
        <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-xl text-white p-6 rounded-2xl max-w-sm z-30">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-xl">💧</span>
            </div>
            <div>
              <h3 className="font-bold">Hundru Falls</h3>
              <p className="text-sm opacity-75">Ranchi District, Jharkhand</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="opacity-75">Height:</span>
              <span className="font-semibold">320 feet</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Best Season:</span>
              <span className="font-semibold">July - October</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Distance from Ranchi:</span>
              <span className="font-semibold">45 km</span>
            </div>
          </div>

          <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
            Plan Your Visit
          </button>
        </div>
      )}

      {/* VR Status Indicator */}
      {!loading && (
        <div className="absolute top-32 right-6 z-30">
          <div className="bg-black/50 backdrop-blur-xl text-white px-4 py-2 rounded-xl border border-white/20">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isVRSupported ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className="text-sm font-medium">
                VR {isVRSupported ? 'Ready' : 'Not Available'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HundruVR;
