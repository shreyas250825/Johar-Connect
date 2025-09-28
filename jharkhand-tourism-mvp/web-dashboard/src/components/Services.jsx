import React, { useState } from 'react';
import Providers from './Providers';
import Feedback from './Feedback';

// Main Services Component
const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const serviceCategories = [
    { id: 'all', label: 'All Services', icon: '🏢', description: 'Complete range of tourism services' },
    { id: 'Tour Operators', label: 'Tour Operators', icon: '🗺️', description: 'Professional guided tours' },
    { id: 'Adventure Sports', label: 'Adventure', icon: '🏔️', description: 'Thrilling outdoor activities' },
    { id: 'Accommodation', label: 'Accommodation', icon: '🏨', description: 'Comfortable stays' },
    { id: 'Cultural Programs', label: 'Cultural', icon: '🎭', description: 'Authentic cultural experiences' },
    { id: 'Religious Tours', label: 'Religious', icon: '🙏', description: 'Spiritual journeys' },
    { id: 'Transportation', label: 'Transport', icon: '🚌', description: 'Reliable travel solutions' }
  ];

  const mainServices = [
    {
      title: 'Heritage & Cultural Tours',
      description: 'Discover Jharkhand\'s rich tribal heritage and cultural landmarks',
      icon: '🏛️',
      features: ['Expert Local Guides', 'Traditional Performances', 'Handicraft Workshops', 'Historical Sites'],
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Adventure & Eco Tourism',
      description: 'Thrilling outdoor adventures in pristine natural environments',
      icon: '🏞️',
      features: ['Trekking & Hiking', 'Wildlife Safaris', 'Water Sports', 'Camping'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Spiritual & Wellness',
      description: 'Rejuvenating spiritual experiences and wellness retreats',
      icon: '🧘‍♀️',
      features: ['Temple Tours', 'Meditation Retreats', 'Ayurveda Therapy', 'Yoga Sessions'],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Tribal Marketplace',
      description: 'Authentic tribal products and sustainable shopping experiences',
      icon: '🛍️',
      features: ['Handmade Crafts', 'Organic Products', 'Fair Trade', 'Artisan Workshops'],
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const whyChooseUs = [
    {
      icon: '🏆',
      title: 'Local Expertise',
      description: 'Our providers have deep knowledge of Jharkhand\'s hidden gems and cultural nuances'
    },
    {
      icon: '💎',
      title: 'Quality Assured',
      description: 'All service providers are verified and maintain high quality standards'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden costs and flexible payment options'
    },
    {
      icon: '🌱',
      title: 'Sustainable Tourism',
      description: 'Committed to eco-friendly practices and supporting local communities'
    },
    {
      icon: '🛡️',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your travel needs'
    },
    {
      icon: '⭐',
      title: 'Trusted Reviews',
      description: 'Authentic feedback from verified travelers to help you choose'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/20 rounded-full -translate-y-24 translate-x-24 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-teal-200/20 rounded-full translate-y-24 -translate-x-24 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Comprehensive tourism services designed to showcase Jharkhand's natural beauty, 
            rich culture, and authentic experiences through trusted local partners.
          </p>

          {/* Service Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Service Providers', value: '50+', icon: '🤝' },
              { label: 'Service Categories', value: '15+', icon: '📋' },
              { label: 'Happy Customers', value: '8K+', icon: '😊' },
              { label: 'Years Experience', value: '12+', icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Services Overview */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}></div>
                
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <span className="text-emerald-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 bg-gradient-to-r ${service.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/20">
            {[
              { id: 'overview', label: 'Service Overview', icon: '📋' },
              { id: 'providers', label: 'Service Providers', icon: '🤝' },
              { id: 'feedback', label: 'Customer Feedback', icon: '💬' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100/50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-16">
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* Service Categories */}
              <div>
                <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Service Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {serviceCategories.map((category, index) => (
                    <div
                      key={category.id}
                      className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20 cursor-pointer"
                      onClick={() => {
                        setActiveCategory(category.id);
                        setActiveTab('providers');
                      }}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                          {category.label}
                        </h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/20">
                <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Services?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {whyChooseUs.map((feature, index) => (
                    <div
                      key={index}
                      className="group text-center p-6 rounded-2xl hover:bg-white/60 transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'providers' && (
            <div className="space-y-8">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                        : 'bg-white/80 text-gray-700 hover:bg-white/90'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>

              {/* Providers Grid */}
              <Providers
                category={activeCategory}
              />
            </div>
          )}

          {activeTab === 'feedback' && (
            <Feedback />
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Explore Jharkhand?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let us help you create unforgettable memories with our trusted service providers
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  📞 Contact Us
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  📋 Browse All Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
