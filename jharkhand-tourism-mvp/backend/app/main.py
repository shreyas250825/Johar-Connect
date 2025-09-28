from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import uvicorn

from .config import Settings, get_settings
from .routers import analytics, sentiment, blockchain, providers, marketplace, auth, feedback, governance
from .middlewares.headers_middleware import headers_middleware

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Jharkhand Tourism API",
    description="Backend API for Eco & Cultural Tourism Platform in Jharkhand",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    contact={
        "name": "Jharkhand Tourism Development",
        "email": "tech@jharkhandtourism.com",
    },
    license_info={
        "name": "Johar Connect",
        "url": "https://opensource.org/licenses/MIT",
    }
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add custom middleware
app.middleware("http")(headers_middleware)

# Include routers
app.include_router(auth, prefix="/api/auth", tags=["Authentication"])
app.include_router(analytics, prefix="/api/analytics", tags=["Analytics"])
app.include_router(sentiment, prefix="/api/sentiment", tags=["Sentiment Analysis"])
app.include_router(blockchain, prefix="/api/blockchain", tags=["Blockchain"])
app.include_router(providers, prefix="/api/providers", tags=["Service Providers"])
app.include_router(marketplace, prefix="/api/marketplace", tags=["Marketplace"])
app.include_router(feedback, prefix="/api/feedback", tags=["Feedback"])
app.include_router(governance, prefix="/api/governance", tags=["Governance"])

# Mount static files for AR/VR assets
# app.mount("/static", StaticFiles(directory="static"), name="static")  # Commented out until static directory is created

@app.get("/")
async def root():
    return {
        "message": "Welcome to Jharkhand Tourism API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "active",
        "features": [
            "Blockchain Integration",
            "AI Sentiment Analysis",
            "Real-time Analytics",
            "AR/VR Experiences",
            "Local Marketplace",
            "Guide Verification"
        ]
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy", 
        "timestamp": "2024-01-01T00:00:00Z",
        "service": "jharkhand-tourism-api",
        "version": "1.0.0"
    }

@app.get("/api/info")
async def api_info(settings: Settings = Depends(get_settings)):
    """API information endpoint"""
    return {
        "name": "Jharkhand Tourism API",
        "environment": settings.environment,
        "version": "1.0.0",
        "description": "Smart Digital Platform for Eco & Cultural Tourism in Jharkhand",
        "supported_features": [
            "Blockchain-enabled secure transactions",
            "Guide verification and digital certification",
            "Interactive maps and AR/VR previews",
            "Real-time transport and location info",
            "Integrated local marketplace",
            "AI-driven feedback analysis",
            "Analytics dashboard for officials"
        ]
    }

@app.get("/api/features")
async def get_features():
    """Get all available platform features"""
    return {
        "blockchain": {
            "enabled": True,
            "features": ["guide_verification", "secure_transactions", "digital_certification"]
        },
        "ar_vr": {
            "enabled": True,
            "features": ["site_previews", "immersive_experiences", "3d_models"]
        },
        "analytics": {
            "enabled": True,
            "features": ["real_time_monitoring", "trend_analysis", "visitor_insights"]
        },
        "marketplace": {
            "enabled": True,
            "features": ["tribal_handicrafts", "local_products", "secure_payments"]
        },
        "ai_ml": {
            "enabled": True,
            "features": ["sentiment_analysis", "recommendations", "feedback_analysis"]
        }
    }

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "Resource not found", "path": request.url.path}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error_id": "server_error"}
    )

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
