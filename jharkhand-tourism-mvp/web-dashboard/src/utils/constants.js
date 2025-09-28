// Application constants
export const APP_CONSTANTS = {
  APP_NAME: 'Jharkhand Eco & Cultural Tourism',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@jharkhandtourism.com',
  CONTACT_PHONE: '+91-XXX-XXXX-XXX',
};

// Blockchain constants
export const BLOCKCHAIN = {
  NETWORK: {
    MAINNET: 'mainnet',
    TESTNET: 'testnet',
    LOCAL: 'local'
  },
  CONTRACT_ADDRESSES: {
    GUIDE_VERIFICATION: '0x742d35Cc6634C0532925a3b8D...',
    MARKETPLACE: '0x89205A3A3b2A69De6Dbf7f01ED...',
    GOVERNANCE: '0x1F4E6A7A7b2A69De6Dbf7f01ED...'
  },
  GAS_LIMITS: {
    DEFAULT: 300000,
    DEPLOYMENT: 2000000
  }
};

// User roles
export const USER_ROLES = {
  TOURIST: 'tourist',
  GUIDE: 'guide',
  VENDOR: 'vendor',
  OFFICIAL: 'official',
  ADMIN: 'admin'
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout'
  },
  ANALYTICS: {
    BASE: '/analytics',
    TRENDS: '/analytics/trends'
  },
  PROVIDERS: {
    BASE: '/providers',
    VERIFY: '/providers/verify'
  },
  MARKETPLACE: {
    PRODUCTS: '/marketplace/products',
    ORDERS: '/marketplace/orders'
  },
  FEEDBACK: {
    BASE: '/feedback',
    SENTIMENT: '/feedback/sentiment'
  },
  BLOCKCHAIN: {
    CONTRACTS: '/blockchain/contracts',
    TRANSACTIONS: '/blockchain/transactions'
  }
};

// Feature flags
export const FEATURE_FLAGS = {
  AR_ENABLED: true,
  VR_ENABLED: true,
  BLOCKCHAIN_ENABLED: true,
  AI_SENTIMENT_ENABLED: true
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  CART_ITEMS: 'cartItems',
  PREFERENCES: 'userPreferences'
};

export default APP_CONSTANTS;