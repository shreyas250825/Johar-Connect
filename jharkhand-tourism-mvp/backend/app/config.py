from pydantic_settings import BaseSettings
from functools import lru_cache
import os

class Settings(BaseSettings):
    app_name: str = "Jharkhand Tourism API"
    environment: str = os.getenv("ENVIRONMENT", "development")
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./tourism.db")
    
    # JWT Settings
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key")
    algorithm: str = os.getenv("ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # Blockchain Settings
    web3_provider_url: str = os.getenv("WEB3_PROVIDER_URL", "")
    contract_address: str = os.getenv("CONTRACT_ADDRESS", "")
    
    # API Keys
    sentiment_api_key: str = os.getenv("SENTIMENT_API_KEY", "")
    maps_api_key: str = os.getenv("MAPS_API_KEY", "")
    
    # CORS
    allowed_origins: list = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()