import React, { useState, useEffect } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'tourist'
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '' });

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

    // Password strength checker
    if (name === 'password') {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    let label = 'Very Weak';
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        label = 'Very Weak';
        break;
      case 2:
        label = 'Weak';
        break;
      case 3:
        label = 'Fair';
        break;
      case 4:
        label = 'Strong';
        break;
      case 5:
        label = 'Very Strong';
        break;
      default:
        label = 'Very Weak';
    }

    return { score, label };
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    if (formData.password.length < 8) {
      setFormStatus({ type: 'error', message: 'Password must be at least 8 characters long.' });
      return;
    }

    setLoading(true);
    setFormStatus({ type: 'loading', message: 'Creating your account...' });

    // Simulate registration
    setTimeout(() => {
      setFormStatus({ 
        type: 'success', 
        message: 'Account created successfully! Redirecting to dashboard...' 
      });
      
      // Simulate redirect
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
      }, 2000);
    }, 2500);
  };

  const userTypes = [
    {
      value: 'tourist',
      label: 'Tourist',
      icon: '🎒',
      description: 'Explore Jharkhand\'s beauty'
    },
    {
      value: 'guide',
      label: 'Tour Guide',
      icon: '👥',
      description: 'Share local expertise'
    },
    {
      value: 'vendor',
      label: 'Local Vendor',
      icon: '🏪',
      description: 'Showcase local products'
    },
    {
      value: 'official',
      label: 'Tourism Official',
      icon: '🏛️',
      description: 'Manage tourism activities'
    }
  ];

  const features = [
    {
      icon: '🔐',
      title: 'Secure Platform',
      description: 'Bank-grade security for your data'
    },
    {
      icon: '🌱',
      title: 'Sustainable Tourism',
      description: 'Promoting eco-friendly practices'
    },
    {
      icon: '🏛️',
      title: 'Cultural Heritage',
      description: 'Authentic tribal experiences'
    },
    {
      icon: '📱',
      title: 'Mobile Ready',
      description: 'Access anywhere, anytime'
    }
  ];

  if (pageLoading) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 animate-spin mx-auto">
              <span className="text-2xl text-white">👤</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Registration...</h3>
            <p className="text-gray-600">Preparing your journey to Jharkhand</p>
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
            <span className="text-4xl">🌟</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Johar Connect</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create your account to explore Jharkhand's hidden gems, connect with local communities, 
            and be part of sustainable tourism.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Registration Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Your Account</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                    placeholder="Create a strong password"
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Password Strength</span>
                        <span className={`font-semibold ${
                          passwordStrength.score <= 2 ? 'text-red-500' :
                          passwordStrength.score <= 3 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength.score <= 2 ? 'bg-red-500' :
                            passwordStrength.score <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                    placeholder="Confirm your password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Account Type *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
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
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-900">{type.label}</div>
                            <div className="text-sm text-gray-600">{type.description}</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
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
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button className="text-emerald-600 font-semibold hover:text-emerald-700">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Join Us?</h3>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Registration Stats</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-bold text-emerald-600">25,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tour Guides</span>
                  <span className="font-bold text-emerald-600">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Local Vendors</span>
                  <span className="font-bold text-emerald-600">1,200+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-bold text-emerald-600">99.2%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-6 border border-emerald-200">
              <div className="text-center">
                <div className="text-3xl mb-2">🎉</div>
                <h4 className="font-bold text-gray-900 mb-2">Welcome Bonus</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Get 20% off your first tour booking when you register today!
                </p>
                <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-semibold">
                  Code: WELCOME20
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;