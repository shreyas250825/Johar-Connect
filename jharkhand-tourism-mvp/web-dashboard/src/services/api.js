import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Analytics Service
export const analyticsService = {
  getAnalytics: async () => {
    const response = await api.get('/analytics');
    return response.data;
  },
  
  getTrends: async (period) => {
    const response = await api.get(`/analytics/trends?period=${period}`);
    return response.data;
  }
};

// Sentiment Service
export const sentimentService = {
  getAnalysis: async () => {
    const response = await api.get('/sentiment/analysis');
    return response.data;
  },
  
  analyzeText: async (text) => {
    const response = await api.post('/sentiment/analyze', { text });
    return response.data;
  }
};

// Blockchain Service
export const blockchainService = {
  getContracts: async () => {
    const response = await api.get('/blockchain/contracts');
    return response.data;
  },
  
  getTransactions: async () => {
    const response = await api.get('/blockchain/transactions');
    return response.data;
  },
  
  getNetworkData: async () => {
    const response = await api.get('/blockchain/network');
    return response.data;
  },
  
  deployContract: async (contractData) => {
    const response = await api.post('/blockchain/deploy', contractData);
    return response.data;
  }
};

// Providers Service
export const providersService = {
  getProviders: async () => {
    const response = await api.get('/providers');
    return response.data;
  },
  
  verifyProvider: async (providerId) => {
    const response = await api.post(`/providers/${providerId}/verify`);
    return response.data;
  },
  
  createProvider: async (providerData) => {
    const response = await api.post('/providers', providerData);
    return response.data;
  }
};

// Marketplace Service
export const marketplaceService = {
  getProducts: async () => {
    const response = await api.get('/marketplace/products');
    return response.data;
  },
  
  createOrder: async (orderData) => {
    const response = await api.post('/marketplace/orders', orderData);
    return response.data;
  },
  
  getOrders: async () => {
    const response = await api.get('/marketplace/orders');
    return response.data;
  }
};

// Feedback Service
export const feedbackService = {
  getFeedbacks: async () => {
    const response = await api.get('/feedback');
    return response.data;
  },
  
  submitFeedback: async (feedbackData) => {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  }
};

// Governance Service
export const governanceService = {
  getData: async () => {
    const response = await api.get('/governance');
    return response.data;
  },
  
  createProposal: async (proposalData) => {
    const response = await api.post('/governance/proposals', proposalData);
    return response.data;
  },
  
  vote: async (proposalId, voteData) => {
    const response = await api.post(`/governance/proposals/${proposalId}/vote`, voteData);
    return response.data;
  }
};

// Auth Service
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

export default api;