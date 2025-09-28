import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock Components (replace with your actual components)
const Analytics = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Total Visitors', value: '12,543', change: '+12%', icon: '👥', color: 'from-blue-500 to-purple-600' },
        { title: 'Revenue', value: '₹2,45,000', change: '+8%', icon: '💰', color: 'from-green-500 to-emerald-600' },
        { title: 'Bookings', value: '847', change: '+24%', icon: '📅', color: 'from-orange-500 to-red-600' },
        { title: 'Rating', value: '4.8/5', change: '+0.2', icon: '⭐', color: 'from-yellow-500 to-orange-600' }
      ].map((stat, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            {stat.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
          <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
          <span className="text-green-500 text-xs font-semibold">{stat.change}</span>
        </div>
      ))}
    </div>
    
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Visitor Analytics</h3>
      <div className="h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-600">Interactive Charts Coming Soon</p>
        </div>
      </div>
    </div>
  </div>
);

const Marketplace = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Tribal Handicrafts', price: '₹2,500', image: '🏺', rating: 4.8, sales: 234 },
        { name: 'Traditional Jewelry', price: '₹5,000', image: '💎', rating: 4.9, sales: 189 },
        { name: 'Handwoven Textiles', price: '₹3,200', image: '🧵', rating: 4.7, sales: 156 },
        { name: 'Bamboo Crafts', price: '₹1,800', image: '🎋', rating: 4.6, sales: 267 },
        { name: 'Metal Artwork', price: '₹4,500', image: '🔨', rating: 4.8, sales: 123 },
        { name: 'Wooden Sculptures', price: '₹3,800', image: '🪵', rating: 4.7, sales: 198 }
      ].map((product, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{product.image}</div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h4>
          <p className="text-2xl font-bold text-emerald-600 mb-2">{product.price}</p>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>⭐ {product.rating}</span>
            <span>{product.sales} sold</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ARView = () => (
  <div className="space-y-6">
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Augmented Reality Experiences</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Deoghar Temple VR Tour', status: 'Active', users: '1,234' },
          { name: 'Betla National Park Safari', status: 'Active', users: '987' },
          { name: 'Tribal Museum Experience', status: 'Coming Soon', users: '0' },
          { name: 'Waterfalls Virtual Trek', status: 'Active', users: '756' }
        ].map((experience, index) => (
          <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h4 className="text-lg font-bold text-gray-800 mb-2">{experience.name}</h4>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                experience.status === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {experience.status}
              </span>
              <span className="text-gray-600">{experience.users} users</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VRView = () => {
  const navigate = useNavigate();

  const handleLaunchVR = () => {
    navigate('/vr');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Virtual Reality Tours</h3>
        <div className="h-96 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-6">🥽</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Immersive VR Experience</h4>
            <p className="text-gray-600 mb-6">Explore Jharkhand's beauty in virtual reality</p>
            <button
              onClick={handleLaunchVR}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Launch VR Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useState({ name: 'Arjun Kumar', role: 'Tourism Guide' }); // Mock user

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <Analytics />;
      case 'marketplace':
        return <Marketplace />;
      case 'ar-view':
        return <ARView />;
      case 'vr-view':
        return <VRView />;
      default:
        return <Analytics />;
    }
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: '📊', color: 'from-blue-500 to-purple-600' },
    { id: 'marketplace', label: 'Marketplace', icon: '🛍️', color: 'from-orange-500 to-red-600' },
    { id: 'ar-view', label: 'AR View', icon: '📱', color: 'from-green-500 to-emerald-600' },
    { id: 'vr-view', label: 'VR View', icon: '🥽', color: 'from-purple-500 to-indigo-600' }
  ];

  const quickActions = [
    { name: 'New Booking', icon: '➕', color: 'from-emerald-500 to-teal-600' },
    { name: 'Messages', icon: '💬', color: 'from-blue-500 to-cyan-600' },
    { name: 'Reports', icon: '📄', color: 'from-orange-500 to-red-600' },
    { name: 'Settings', icon: '⚙️', color: 'from-gray-500 to-slate-600' }
  ];

  const displayName = user?.name || 'Guest';
  const displayRole = user?.role || 'Visitor';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 animate-spin">
            <span className="text-3xl text-white">🌿</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Dashboard...</h2>
          <p className="text-gray-600">Preparing your personalized experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/30 rounded-full translate-y-48 -translate-x-48 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 pt-20 flex h-screen">
        {/* Enhanced Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 flex flex-col">
          {/* Header */}
          <div className="p-8 border-b border-gray-100/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Johar
                  </span>
                  <span className="text-gray-900">Connect</span>
                </h2>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>

            {/* User Profile */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                  {displayName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{displayName}</h3>
                  <p className="text-emerald-100 text-sm">{displayRole}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">Premium</span>
                <span>⭐ 4.9 Rating</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Navigation</h4>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl'
                      : 'text-gray-700 hover:bg-gray-100/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    {tab.icon}
                  </div>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`p-4 bg-gradient-to-br ${action.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {action.icon}
                    </div>
                    <div className="text-xs font-semibold">{action.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="p-6 border-t border-gray-100/50">
            <div className="bg-gray-50/50 rounded-2xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-3">Contact our support team</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300">
                Get Support
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  <span className="text-4xl mr-3">
                    {tabs.find(tab => tab.id === activeTab)?.icon}
                  </span>
                  {tabs.find(tab => tab.id === activeTab)?.label} Dashboard
                </h1>
                <p className="text-gray-600">Welcome back, {displayName}! Here's your comprehensive overview.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-xl">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-emerald-700">Live</span>
                </div>
                
                <button className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300">
                  <span className="text-xl">🔔</span>
                </button>
                
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  Export Data
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 overflow-auto">
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;