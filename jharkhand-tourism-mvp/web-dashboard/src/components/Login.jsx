import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'tourist'
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Simulate initial page loading
    setTimeout(() => {
      setPageLoading(false);
    }, 800);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.email || !formData.password) {
      setFormStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setFormStatus({ type: 'loading', message: 'Signing you in...' });

    // Simulate login
    setTimeout(() => {
      // Mock successful login
      setFormStatus({
        type: 'success',
        message: 'Login successful! Redirecting to your dashboard...'
      });

      // Set user in auth context and redirect
      login({
        name: 'Mock User',
        email: formData.email,
        userType: formData.userType
      }, 'mock-jwt-token');

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2500);
  };

  const userTypes = [
    {
      value: 'tourist',
      label: 'Tourist',
      icon: '🎒',
      description: 'Explore destinations'
    },
    {
      value: 'guide',
      label: 'Tour Guide',
      icon: '👥',
      description: 'Lead adventures'
    },
    {
      value: 'vendor',
      label: 'Local Vendor',
      icon: '🏪',
      description: 'Sell products'
    },
    {
      value: 'official',
      label: 'Tourism Official',
      icon: '🏛️',
      description: 'Manage tourism'
    }
  ];

  const features = [
    {
      icon: '🔐',
      title: 'Blockchain Secure',
      description: 'Advanced security protocols'
    },
    {
      icon: '🌱',
      title: 'Eco Tourism',
      description: 'Sustainable travel practices'
    },
    {
      icon: '🏛️',
      title: 'Cultural Heritage',
      description: 'Authentic experiences'
    }
  ];

  const quickStats = [
    { label: 'Active Users', value: '25K+' },
    { label: 'Success Rate', value: '99.8%' },
    { label: 'Destinations', value: '100+' },
    { label: 'Reviews', value: '4.9/5' }
  ];

  if (pageLoading) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 animate-spin mx-auto">
              <span className="text-2xl text-white">🔑</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Login...</h3>
            <p className="text-gray-600">Welcome back to Jharkhand Tourism</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full translate-y-48 -translate-x-48 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-xl">
            <span className="text-4xl">🏞️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Johar Connect</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sign in to access your personalized dashboard and continue your journey through 
            Jharkhand's natural wonders and cultural treasures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Login Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign In</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {userTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`flex items-center p-3 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.userType === type.value
                            ? 'border-emerald-400 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value={type.value}
                          checked={formData.userType === type.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center text-center w-full">
                          <span className="text-xl mb-1">{type.icon}</span>
                          <div className="text-xs font-semibold text-gray-900">{type.label}</div>
                          <div className="text-xs text-gray-600">{type.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-400"
                    />
                    <span className="text-sm text-gray-700">Remember me</span>
                  </label>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                    Forgot Password?
                  </button>
                </div>

                {formStatus.message && (
                  <div className={`p-4 rounded-2xl ${
                    formStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                    formStatus.type === 'loading' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                    'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {formStatus.type === 'loading' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>{formStatus.message}</span>
                      </div>
                    )}
                    {formStatus.type !== 'loading' && formStatus.message}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button className="text-emerald-600 font-semibold hover:text-emerald-700">
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features & Info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Platform Features */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Platform?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center p-6 rounded-2xl hover:bg-white/60 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto shadow-lg">
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 text-center hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    👤
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">New tour guide registered</div>
                    <div className="text-xs text-gray-600">2 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white">
                    🏞️
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Hundru Falls tour booked</div>
                    <div className="text-xs text-gray-600">4 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white">
                    🛍️
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Local vendor added products</div>
                    <div className="text-xs text-gray-600">6 hours ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Promotional Banner */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">🎉 Welcome Back Offer!</h3>
                <p className="text-white/90 mb-6">
                  Get 15% off your next booking when you sign in today. 
                  Explore more of Jharkhand's beauty for less!
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-xl text-sm font-semibold">
                  Code: WELCOME15
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;