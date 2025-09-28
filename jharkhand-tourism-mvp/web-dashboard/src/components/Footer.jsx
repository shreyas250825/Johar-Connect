import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Explore',
      links: [
        { name: 'Tourist Destinations', href: '#destinations' },
        { name: 'Cultural Sites', href: '#culture' },
        { name: 'Adventure Tours', href: '#adventure' },
        { name: 'Eco Tourism', href: '#eco-tourism' },
        { name: 'Heritage Sites', href: '#heritage' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Tour Booking', href: '#booking' },
        { name: 'Guide Services', href: '#guides' },
        { name: 'Travel Planning', href: '#planning' },
        { name: 'Group Tours', href: '#groups' },
        { name: 'Custom Packages', href: '#custom' }
      ]
    },
    {
      title: 'Technology',
      links: [
        { name: 'AR/VR Experiences', href: '#ar-vr' },
        { name: 'Blockchain Security', href: '#blockchain' },
        { name: 'AI Analytics', href: '#analytics' },
        { name: 'Mobile App', href: '#mobile' },
        { name: 'API Documentation', href: '#api' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Contact Us', href: '#contact' },
        { name: 'Live Chat', href: '#chat' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Feedback', href: '#feedback' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#facebook', icon: '📘' },
    { name: 'Twitter', href: '#twitter', icon: '🐦' },
    { name: 'Instagram', href: '#instagram', icon: '📷' },
    { name: 'YouTube', href: '#youtube', icon: '📹' },
    { name: 'LinkedIn', href: '#linkedin', icon: '💼' }
  ];

  const quickStats = [
    { label: 'Active Users', value: '10K+', icon: '👥' },
    { label: 'Tourist Sites', value: '50+', icon: '🏞️' },
    { label: 'Happy Reviews', value: '2K+', icon: '⭐' },
    { label: 'Local Partners', value: '100+', icon: '🤝' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-emerald-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-teal-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10">
        {/* Quick Stats Banner */}
        <div className="border-b border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-emerald-300 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-6 gap-12">
              
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        Johar
                      </span>
                      <span className="text-white">Connect</span>
                    </h3>
                    <p className="text-emerald-200 text-sm">Discover Jharkhand</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Promoting sustainable eco & cultural tourism in the heart of India. 
                  Experience Jharkhand's hidden treasures through our AI-powered digital platform.
                </p>

                {/* Newsletter Signup */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-emerald-300">Stay Updated</h4>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-l-xl border border-white/20 focus:outline-none focus:border-emerald-400 text-white placeholder-gray-400"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-r-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              {footerSections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-lg font-bold text-emerald-300 mb-6">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links & Contact */}
        <div className="border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              
              {/* Contact Info */}
              <div className="text-center md:text-left">
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <span>📧</span>
                    <span>info@joharconnect.com</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <span>📱</span>
                    <span>+91-XXX-XXXX-XXX</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <span>📍</span>
                    <span>Ranchi, Jharkhand, India</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-center text-emerald-300 font-semibold">Follow Us</h4>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl hover:bg-emerald-500/20 hover:scale-110 transition-all duration-300 group border border-white/20"
                      title={social.name}
                    >
                      <span className="group-hover:animate-bounce">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* App Download */}
              <div className="space-y-4 text-center">
                <h4 className="text-emerald-300 font-semibold">Download App</h4>
                <div className="flex flex-col space-y-2">
                  <button className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm">
                    📱 iOS App Store
                  </button>
                  <button className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm">
                    🤖 Google Play
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
              <div className="text-center md:text-left">
                <p>&copy; 2025 Johar Connect. All rights reserved.</p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                <a href="#privacy" className="hover:text-emerald-300 transition-colors">Privacy Policy</a>
                <a href="#terms" className="hover:text-emerald-300 transition-colors">Terms of Service</a>
                <a href="#cookies" className="hover:text-emerald-300 transition-colors">Cookie Policy</a>
                <a href="#sitemap" className="hover:text-emerald-300 transition-colors">Sitemap</a>
              </div>
            </div>
            
            {/* Made with Love */}
            <div className="text-center mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500">
                Made with <span className="text-red-400 animate-pulse">❤️</span> for Jharkhand Tourism
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;