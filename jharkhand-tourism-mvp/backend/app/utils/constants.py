# Application Constants

# User Roles
USER_ROLES = {
    "TOURIST": "tourist",
    "GUIDE": "guide",
    "VENDOR": "vendor",
    "OFFICIAL": "official",
    "ADMIN": "admin"
}

# Provider Types
PROVIDER_TYPES = {
    "GUIDE": "guide",
    "HOMESTAY": "homestay",
    "TRANSPORT": "transport",
    "ACTIVITY": "activity"
}

# Product Categories
PRODUCT_CATEGORIES = {
    "HANDICRAFT": "handicraft",
    "TEXTILE": "textile",
    "JEWELRY": "jewelry",
    "ORGANIC": "organic",
    "ART": "art",
    "POTTERY": "pottery"
}

# Order Status
ORDER_STATUS = {
    "PENDING": "pending",
    "CONFIRMED": "confirmed",
    "SHIPPED": "shipped",
    "DELIVERED": "delivered",
    "CANCELLED": "cancelled"
}

# Feedback Categories
FEEDBACK_CATEGORIES = {
    "GENERAL": "general",
    "GUIDE": "guide",
    "ACCOMMODATION": "accommodation",
    "TRANSPORT": "transport",
    "MARKETPLACE": "marketplace",
    "PLATFORM": "platform"
}

# Sentiment Labels
SENTIMENT_LABELS = {
    "POSITIVE": "positive",
    "NEUTRAL": "neutral",
    "NEGATIVE": "negative"
}

# Blockchain
BLOCKCHAIN_CONSTANTS = {
    "GAS_LIMIT": 300000,
    "CONTRACT_TYPES": ["verification", "marketplace", "booking", "certification"],
    "NETWORKS": {
        "MAINNET": "mainnet",
        "TESTNET": "testnet",
        "LOCAL": "local"
    }
}

# API Response Messages
API_MESSAGES = {
    "SUCCESS": "Operation completed successfully",
    "ERROR": "An error occurred",
    "NOT_FOUND": "Resource not found",
    "UNAUTHORIZED": "Unauthorized access",
    "FORBIDDEN": "Access forbidden"
}

# File upload constraints
FILE_CONSTRAINTS = {
    "MAX_FILE_SIZE": 10 * 1024 * 1024,  # 10MB
    "ALLOWED_IMAGE_TYPES": ["image/jpeg", "image/png", "image/gif"],
    "ALLOWED_DOC_TYPES": ["application/pdf", "application/msword"]
}

# Platform Limits
PLATFORM_LIMITS = {
    "MAX_PRODUCTS_PER_VENDOR": 100,
    "MAX_GUIDE_SPECIALTIES": 5,
    "MAX_FEEDBACK_LENGTH": 1000,
    "MAX_ORDER_ITEMS": 10
}

# Tourist Sites in Jharkhand
TOURIST_SITES = [
    {
        "id": 1,
        "name": "Dassam Falls",
        "location": "Near Ranchi",
        "type": "waterfall",
        "description": "Beautiful waterfall in the Ranchi plateau"
    },
    {
        "id": 2,
        "name": "Jagannath Temple",
        "location": "Ranchi",
        "type": "temple",
        "description": "Ancient temple dedicated to Lord Jagannath"
    },
    {
        "id": 3,
        "name": "Betla National Park",
        "location": "Latehar District",
        "type": "wildlife",
        "description": "Wildlife sanctuary with rich biodiversity"
    },
    {
        "id": 4,
        "name": "Hundru Falls",
        "location": "Ranchi District",
        "type": "waterfall",
        "description": "Scenic waterfall on the Subarnarekha River"
    },
    {
        "id": 5,
        "name": "Sun Temple",
        "location": "Near Ranchi",
        "type": "temple",
        "description": "Modern temple shaped like a giant chariot"
    }
]

# Default configuration
DEFAULT_CONFIG = {
    "PLATFORM_FEE_PERCENT": 5.0,
    "MINIMUM_BOOKING_HOURS": 2,
    "MAX_BOOKING_ADVANCE_DAYS": 90,
    "REFUND_POLICY_DAYS": 7
}
