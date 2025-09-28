import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false);
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
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({ 
        type: 'error', 
        message: 'Please fill in all required fields.' 
      });
      return;
    }

    setFormStatus({ type: 'loading', message: 'Sending message...' });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.' 
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📞',
      title: 'Phone Support',
      subtitle: 'Speak with our team',
      details: ['+91 651 2345 678', '+91 651 2345 679'],
      description: 'Available Mon-Sat, 9 AM - 6 PM',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: '📧',
      title: 'Email Us',
      subtitle: 'Send us a message',
      details: ['info@jharkhantourism.com', 'support@jharkhantourism.com'],
      description: 'Response within 24 hours',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: '📍',
      title: 'Visit Our Office',
      subtitle: 'Come meet us in person',
      details: ['Tourism Department', 'Jharkhand Government'],
      description: 'Project Building, HEC, Dhurwa, Ranchi - 834004',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      subtitle: 'Instant assistance',
      details: ['Available 24/7', 'Quick responses'],
      description: 'Click the chat bubble below',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const officeLocations = [
    {
      city: 'Ranchi',
      address: 'Project Building, HEC, Dhurwa, Ranchi - 834004',
      phone: '+91 651 2345 678',
      email: 'ranchi@jharkhantourism.com',
      timings: 'Mon-Sat: 9:00 AM - 6:00 PM'
    },
    {
      city: 'Jamshedpur',
      address: 'Tourism Information Center, Station Road, Jamshedpur - 831001',
      phone: '+91 657 2345 678',
      email: 'jamshedpur@jharkhantourism.com',
      timings: 'Mon-Sat: 9:00 AM - 5:00 PM'
    },
    {
      city: 'Dhanbad',
      address: 'District Tourism Office, Civil Lines, Dhanbad - 826001',
      phone: '+91 326 2345 678',
      email: 'dhanbad@jharkhantourism.com',
      timings: 'Mon-Fri: 10:00 AM - 5:00 PM'
    }
  ];

  const faqData = [
    {
      question: 'What are the best times to visit Jharkhand?',
      answer: 'October to March is ideal for pleasant weather. Monsoon season (July-September) is great for waterfalls but travel may be challenging.'
    },
    {
      question: 'Do I need permits to visit tribal areas?',
      answer: 'Some areas require permits for non-locals. We can help arrange necessary documentation for your visit.'
    },
    {
      question: 'What languages are spoken by your guides?',
      answer: 'Our guides speak Hindi, English, and local languages including Santali, Ho, Mundari, and Oraon.'
    },
    {
      question: 'Are there eco-friendly accommodation options?',
      answer: 'Yes, we partner with several eco-lodges and community homestays that follow sustainable practices.'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 animate-spin mx-auto">
              <span className="text-2xl text-white">📞</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Contact Information...</h3>
            <p className="text-gray-600">Preparing our support channels</p>
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-xl">
            <span className="text-4xl">📞</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about Jharkhand tourism? Need help planning your perfect trip? 
            Our expert team is here to assist you every step of the way.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {method.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {method.title}
              </h3>
              
              <p className="text-gray-600 mb-4">{method.subtitle}</p>
              
              <div className="space-y-1 mb-4">
                {method.details.map((detail, i) => (
                  <p key={i} className="text-sm font-semibold text-gray-800">{detail}</p>
                ))}
              </div>
              
              <p className="text-xs text-gray-500">{method.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">Tour Booking</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300 resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                {formStatus.message && (
                  <div className={`p-4 rounded-2xl ${(
                    formStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                    formStatus.type === 'loading' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                    'bg-red-100 text-red-700 border border-red-200'
                  )}`}>
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
                  disabled={formStatus.type === 'loading'}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {formStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>

          {/* Office Locations */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Office Locations</h3>
              
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                    <h4 className="text-lg font-bold text-emerald-600 mb-3">{office.city}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{office.address}</p>
                      <p><span className="font-semibold">Phone:</span> {office.phone}</p>
                      <p><span className="font-semibold">Email:</span> {office.email}</p>
                      <p><span className="font-semibold">Timings:</span> {office.timings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Response Stats</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <span className="font-bold text-emerald-600">Less than 2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Satisfaction</span>
                  <span className="font-bold text-emerald-600">98.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Queries Resolved</span>
                  <span className="font-bold text-emerald-600">15K+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Our tourism experts are standing by to help you plan the perfect Jharkhand adventure
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  Call Now
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;