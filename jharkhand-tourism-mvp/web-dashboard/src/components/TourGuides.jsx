import React, { useState, useEffect } from 'react';

const TourGuides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock tour guides data
  const mockGuides = [
    {
      id: 1,
      name: 'Ramesh Kumar Munda',
      specialization: 'Cultural Heritage',
      languages: ['Hindi', 'English', 'Mundari'],
      rating: 4.9,
      reviews: 127,
      experience: '8 years',
      location: 'Ranchi',
      price: 1500,
      avatar: '👨‍🏫',
      verified: true,
      featured: true,
      description: 'Expert in tribal culture and traditional practices. Specialized in heritage site tours.',
      expertise: ['Tribal History', 'Cultural Sites', 'Traditional Crafts'],
      tours: 342,
      certification: 'Government Certified',
      availability: 'Available',
      contact: '+91-9876543210'
    },
    {
      id: 2,
      name: 'Sita Devi Oraon',
      specialization: 'Eco Tourism',
      languages: ['Hindi', 'English', 'Kurukh'],
      rating: 4.8,
      reviews: 98,
      experience: '6 years',
      location: 'Jamshedpur',
      price: 1200,
      avatar: '👩‍🌾',
      verified: true,
      featured: true,
      description: 'Nature enthusiast specializing in wildlife and forest tours. Expert botanist.',
      expertise: ['Wildlife Tours', 'Forest Walks', 'Bird Watching'],
      tours: 256,
      certification: 'Eco Guide Certified',
      availability: 'Available',
      contact: '+91-9876543211'
    },
    {
      id: 3,
      name: 'Arjun Singh Santhal',
      specialization: 'Adventure Tours',
      languages: ['Hindi', 'English', 'Santhali'],
      rating: 4.7,
      reviews: 156,
      experience: '10 years',
      location: 'Deoghar',
      price: 1800,
      avatar: '🧗‍♂️',
      verified: true,
      featured: false,
      description: 'Adventure sports expert with extensive trekking and camping experience.',
      expertise: ['Trekking', 'Rock Climbing', 'Camping'],
      tours: 423,
      certification: 'Adventure Sports Certified',
      availability: 'Busy',
      contact: '+91-9876543212'
    },
    {
      id: 4,
      name: 'Lakshmi Kumari Ho',
      specialization: 'Spiritual Tours',
      languages: ['Hindi', 'English', 'Ho'],
      rating: 4.9,
      reviews: 89,
      experience: '5 years',
      location: 'Chaibasa',
      price: 1000,
      avatar: '👩‍🙏',
      verified: true,
      featured: false,
      description: 'Spiritual guide specializing in temple tours and meditation retreats.',
      expertise: ['Temple Tours', 'Spiritual Practices', 'Meditation'],
      tours: 178,
      certification: 'Spiritual Guide Certified',
      availability: 'Available',
      contact: '+91-9876543213'
    },
    {
      id: 5,
      name: 'Birsa Mahato',
      specialization: 'Historical Tours',
      languages: ['Hindi', 'English', 'Bengali'],
      rating: 4.8,
      reviews: 134,
      experience: '12 years',
      location: 'Dhanbad',
      price: 1600,
      avatar: '👨‍📚',
      verified: true,
      featured: true,
      description: 'History professor turned guide, expert in Jharkhand\'s rich historical heritage.',
      expertise: ['Historical Sites', 'Museums', 'Archaeological Tours'],
      tours: 567,
      certification: 'History Expert Certified',
      availability: 'Available',
      contact: '+91-9876543214'
    },
    {
      id: 6,
      name: 'Phoolmani Devi Kharia',
      specialization: 'Handicraft Tours',
      languages: ['Hindi', 'Kharia', 'English'],
      rating: 4.6,
      reviews: 67,
      experience: '4 years',
      location: 'Gumla',
      price: 900,
      avatar: '👩‍🎨',
      verified: true,
      featured: false,
      description: 'Artisan and guide showcasing traditional handicrafts and local markets.',
      expertise: ['Handicraft Markets', 'Artisan Workshops', 'Traditional Arts'],
      tours: 123,
      certification: 'Handicraft Expert',
      availability: 'Available',
      contact: '+91-9876543215'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchGuides = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setGuides(mockGuides);
      setLoading(false);
    };

    fetchGuides();
  }, []);

  const specializations = [
    { id: 'all', label: 'All Guides', icon: '👥', count: guides.length },
    { id: 'Cultural Heritage', label: 'Cultural', icon: '🏛️', count: guides.filter(g => g.specialization === 'Cultural Heritage').length },
    { id: 'Eco Tourism', label: 'Eco Tours', icon: '🌿', count: guides.filter(g => g.specialization === 'Eco Tourism').length },
    { id: 'Adventure Tours', label: 'Adventure', icon: '🏔️', count: guides.filter(g => g.specialization === 'Adventure Tours').length },
    { id: 'Spiritual Tours', label: 'Spiritual', icon: '🙏', count: guides.filter(g => g.specialization === 'Spiritual Tours').length },
    { id: 'Historical Tours', label: 'Historical', icon: '📚', count: guides.filter(g => g.specialization === 'Historical Tours').length },
    { id: 'Handicraft Tours', label: 'Handicrafts', icon: '🎨', count: guides.filter(g => g.specialization === 'Handicraft Tours').length }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesFilter = filter === 'all' || guide.specialization === filter;
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBookGuide = (guide) => {
    console.log('Booking guide:', guide.name);
    // Add booking logic here
  };

  const handleContactGuide = (guide) => {
    setSelectedGuide(guide);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-24">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 animate-spin mx-auto">
              <span className="text-2xl text-white">🧭</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Loading Tour Guides...</h2>
            <p className="text-gray-600">Finding the best guides for you</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/20 rounded-full -translate-y-24 translate-x-24 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-teal-200/20 rounded-full translate-y-24 -translate-x-24 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Expert <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Tour Guides</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover Jharkhand with our verified local guides. Experience authentic culture, 
            hidden gems, and unforgettable adventures with certified professionals.
          </p>
          
          {/* Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Verified Guides', value: '200+', icon: '✅' },
              { label: 'Languages Spoken', value: '15+', icon: '🗣️' },
              { label: 'Happy Tourists', value: '5K+', icon: '😊' },
              { label: 'Average Rating', value: '4.8', icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search guides by name, location, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg text-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                🔍
              </div>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {specializations.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setFilter(spec.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                filter === spec.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white shadow-md hover:shadow-lg hover:scale-102'
              }`}
            >
              <span className="text-xl">{spec.icon}</span>
              <span>{spec.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                filter === spec.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {spec.count}
              </span>
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredGuides.map((guide, index) => (
            <div
              key={guide.id}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Featured Badge */}
              {guide.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  ⭐ Featured
                </div>
              )}

              {/* Availability Status */}
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                guide.availability === 'Available' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {guide.availability === 'Available' ? '🟢 Available' : '🔴 Busy'}
              </div>

              {/* Guide Profile */}
              <div className="text-center mb-6 mt-8">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {guide.avatar}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {guide.name}
                </h3>
                <p className="text-emerald-600 font-semibold mb-2">{guide.specialization}</p>
                <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(guide.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({guide.reviews} reviews)</span>
                </div>
              </div>

              {/* Guide Details */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="font-semibold text-gray-700">📍 Location</div>
                    <div className="text-gray-600">{guide.location}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="font-semibold text-gray-700">💼 Experience</div>
                    <div className="text-gray-600">{guide.experience}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="font-semibold text-gray-700">🎯 Tours</div>
                    <div className="text-gray-600">{guide.tours} completed</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="font-semibold text-gray-700">💰 Price</div>
                    <div className="text-gray-600">₹{guide.price}/day</div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <div className="font-semibold text-gray-700 mb-2">🗣️ Languages:</div>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((lang, i) => (
                      <span key={i} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expertise */}
                <div>
                  <div className="font-semibold text-gray-700 mb-2">🎯 Expertise:</div>
                  <div className="flex flex-wrap gap-2">
                    {guide.expertise.map((skill, i) => (
                      <span key={i} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-600">✅</span>
                    <span className="text-emerald-700 font-medium text-sm">{guide.certification}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleBookGuide(guide)}
                  disabled={guide.availability !== 'Available'}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    guide.availability === 'Available'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {guide.availability === 'Available' ? '📅 Book Now' : '❌ Currently Unavailable'}
                </button>
                
                <button
                  onClick={() => handleContactGuide(guide)}
                  className="w-full py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300"
                >
                  📞 Contact Guide
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No guides found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* How It Works Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/20 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Guide', desc: 'Browse and select from our verified guides', icon: '🔍' },
              { step: '2', title: 'Book Tour', desc: 'Schedule your tour and make secure payment', icon: '📅' },
              { step: '3', title: 'Meet Guide', desc: 'Connect with your guide at designated location', icon: '🤝' },
              { step: '4', title: 'Explore', desc: 'Enjoy your personalized Jharkhand experience', icon: '🌟' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedGuide.avatar}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedGuide.name}</h3>
              <p className="text-emerald-600 font-semibold">{selectedGuide.specialization}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📞</span>
                <span className="font-medium">{selectedGuide.contact}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📍</span>
                <span>{selectedGuide.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">💰</span>
                <span>₹{selectedGuide.price}/day</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedGuide(null)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  console.log('Calling guide:', selectedGuide.name);
                  setSelectedGuide(null);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourGuides;