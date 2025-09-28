import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard';
  const isMarketplace = location.pathname === '/marketplace';
  const isTourGuides = location.pathname === '/tour-guides';
  const isServices = location.pathname === '/services';
  const isBlockchainHub = location.pathname === '/blockchain-hub';
  const isVR = location.pathname === '/vr';
  const isContact = location.pathname === '/contact';
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Marketplace', to: '/marketplace' },
    { name: 'Tour Guides', to: '/tour-guides' },
    { name: 'Services', to: '/services' },
    { name: 'Blockchain Hub', to: '/blockchain-hub' },
    { name: 'Contact', to: '/contact' }
  ];

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const hasBackground = isScrolled || isDashboard || isMarketplace || isTourGuides || isServices || isBlockchainHub || isVR || isContact || isLogin || isRegister;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVR
          ? 'bg-black/80 backdrop-blur-xl shadow-2xl border-b border-white/20'
          : hasBackground
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-emerald-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300 group-hover:scale-110">
                <span className="text-2xl">🌿</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isVR ? 'text-white' : hasBackground ? 'text-gray-900' : 'text-white'
              }`}>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Johar
                </span>
                <span className={isVR ? 'text-white' : hasBackground ? 'text-gray-900' : 'text-white'}>
                  {' '}Connect
                </span>
              </h1>
              <p className={`text-xs transition-colors duration-300 ${
                isVR ? 'text-white/70' : hasBackground ? 'text-gray-500' : 'text-emerald-200'
              }`}>
                Discover Jharkhand
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isVR
                    ? 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                    : hasBackground
                    ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-3 px-4 py-2 rounded-xl ${
                  isVR ? 'bg-black/20 border border-white/20' : hasBackground ? 'bg-gray-50' : 'bg-white/10 backdrop-blur-sm'
                }`}>
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${
                    isVR ? 'text-white' : hasBackground ? 'text-gray-700' : 'text-white'
                  }`}>
                    Welcome, {user.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isVR
                      ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                      : hasBackground
                      ? 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                      : 'border-2 border-white text-white hover:bg-white hover:text-emerald-900'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRegister}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isVR
                      ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                      : hasBackground
                      ? 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                      : 'border-2 border-white text-white hover:bg-white hover:text-emerald-900'
                  }`}
                >
                  Register
                </button>
                <button
                  onClick={handleLogin}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                >
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors duration-300 ${
              isVR
                ? 'text-white hover:bg-white/10'
                : hasBackground
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen pb-6' : 'max-h-0'
        }`}>
          <div className={`rounded-2xl p-6 mt-4 ${
            isVR
              ? 'bg-black/80 backdrop-blur-xl shadow-2xl border border-white/20'
              : hasBackground
              ? 'bg-white shadow-xl border border-gray-100'
              : 'bg-white/10 backdrop-blur-xl'
          }`}>
            <nav className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isVR
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : hasBackground
                      ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: isVR ? 'rgba(255,255,255,0.2)' : 'rgba(156,163,175,0.2)' }}>
              {user ? (
                <div className="space-y-3">
                  <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${
                    isVR ? 'bg-black/20 border border-white/20' : hasBackground ? 'bg-gray-50' : 'bg-white/10'
                  }`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className={`font-medium ${
                      isVR ? 'text-white' : hasBackground ? 'text-gray-700' : 'text-white'
                    }`}>
                      {user.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isVR
                        ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                        : hasBackground
                        ? 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                        : 'border-2 border-white text-white hover:bg-white hover:text-emerald-900'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleRegister}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isVR
                        ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                        : hasBackground
                        ? 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                        : 'border-2 border-white text-white hover:bg-white hover:text-emerald-900'
                    }`}
                  >
                    Register
                  </button>
                  <button
                    onClick={handleLogin}
                    className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-medium shadow-lg transition-all duration-300"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
