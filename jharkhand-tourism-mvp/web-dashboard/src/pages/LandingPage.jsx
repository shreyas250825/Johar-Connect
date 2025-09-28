import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const statsRef = useRef(null);
  const statsAnimatedRef = useRef(false);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));

            // Trigger stats animation
            if (entry.target.id === 'stats-section' && !statsAnimatedRef.current) {
              statsAnimatedRef.current = true;
              setStatsAnimated(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Animated counter hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!statsAnimated) return;

      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [end, duration]);

    return count;
  };

  const features = [
    {
      icon: '🔐',
      title: 'Blockchain Security',
      description: 'Secure transactions and verified guides using blockchain technology',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: '🌍',
      title: 'AR/VR Experiences',
      description: 'Immersive previews of tourist sites using augmented and virtual reality',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: '🛍️',
      title: 'Local Marketplace',
      description: 'Authentic tribal handicrafts and products from local artisans',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: '🧭',
      title: 'Smart Guides',
      description: 'AI-powered tour guides with real-time location information',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights for tourism officials and service providers',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: '🤖',
      title: 'AI Sentiment Analysis',
      description: 'Real-time feedback analysis for continuous improvement',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  const stats = [
    { label: 'Tourist Sites', value: 50, suffix: '+' },
    { label: 'Verified Guides', value: 200, suffix: '+' },
    { label: 'Happy Tourists', value: 1000, suffix: '+' },
    { label: 'Local Products', value: 500, suffix: '+' }
  ];

  // Counter instances for each stat
  const counts = [
    useCounter(stats[0].value),
    useCounter(stats[1].value),
    useCounter(stats[2].value),
    useCounter(stats[3].value)
  ];

  const handleExplore = () => {
    navigate('/dashboard');
  };

  const handleJoinUs = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section with 3D Parallax */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 overflow-hidden">
        {/* Parallax Background Layers */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img 
            src="/assets/jharkhand5.jpeg" 
            alt="Jharkhand Mountains"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img 
            src="/assets/jharkhand4.jpg" 
            alt="Jharkhand Forests"
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="absolute inset-0 opacity-10"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <img 
            src="/assets/jharkhand3.jpeg" 
            alt="Tribal Art"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-transparent to-teal-900/80 animate-pulse"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>

        {/* Hero Content */}
        <div 
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        >
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
                Discover Jharkhand's
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">
                Hidden Treasures
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Experience eco & cultural tourism like never before with our smart digital platform 
              powered by blockchain and AI technologies
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={handleExplore}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full text-lg shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Explore Now 
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              <button 
                onClick={handleJoinUs}
                className="group px-8 py-4 border-2 border-white text-white font-semibold rounded-full text-lg hover:bg-white hover:text-emerald-900 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Join Us
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features-section"
        data-animate
        className="py-24 bg-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-20 transform transition-all duration-1000 ${
            isVisible['features-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Choose Our 
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Platform?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary technology meets authentic cultural experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-500 border border-gray-100 hover:-translate-y-2 ${
                  isVisible['features-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-emerald-200 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        id="stats-section"
        data-animate
        ref={statsRef}
        className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full opacity-10 -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full opacity-10 translate-y-48 -translate-x-48"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible['stats-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const count = counts[index];
              return (
                <div 
                  key={index}
                  className={`text-center group transform transition-all duration-700 ${
                    isVisible['stats-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                      {count}{stat.suffix}
                    </div>
                    <div className="text-xl font-semibold text-gray-700 mb-2">
                      {stat.label}
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto group-hover:w-24 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/20 to-teal-800/20 animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to <span className="bg-gradient-to-r from-yellow-300 to-emerald-300 bg-clip-text text-transparent">Explore?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Join our platform to discover authentic experiences, support local communities, 
            and create unforgettable memories in the heart of Jharkhand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={handleExplore}
              className="group px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full text-xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Start Your Journey
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            
            <button 
              onClick={handleJoinUs}
              className="px-10 py-5 border-2 border-white text-white font-bold rounded-full text-xl hover:bg-white hover:text-emerald-900 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Join Our Community
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        @media (max-width: 768px) {
          .text-6xl {
            font-size: 3rem;
          }
          .text-8xl {
            font-size: 4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;