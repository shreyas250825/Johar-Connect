import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Marketplace from './components/Marketplace';
import TourGuides from './components/TourGuides';
import Services from './components/Services';
import BlockchainHub from './components/BlockchainHub';
import Contact from './components/Contact';
import Ours from './components/Ours';
import Login from './components/Login';
import Register from './components/Register';
import VRView from './components/VRView';
import HundruVR from './components/HundruVR';

// Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  useEffect(() => {
    if (token) {
      // Optionally validate token on app load
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/tour-guides" element={<TourGuides />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blockchain-hub" element={<BlockchainHub />} />
              <Route path="/vr" element={<VRView />} />
              <Route path="/hundru-vr" element={<HundruVR />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ours" element={<Ours />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
