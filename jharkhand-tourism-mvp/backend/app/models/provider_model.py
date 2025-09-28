from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str = "tourist"
    wallet_address: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str
    is_active: bool = True
    created_at: str
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[str] = None

class ProviderBase(BaseModel):
    name: str
    type: str
    description: str
    location: str
    experience: int
    specialties: List[str]
    languages: List[str]
    contact: str

class ProviderCreate(ProviderBase):
    pass

class ProviderUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    experience: Optional[int] = None
    specialties: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    contact: Optional[str] = None
    availability: Optional[str] = None

class Provider(ProviderBase):
    id: str
    rating: float
    verified: bool
    avatar: str
    tours_completed: int
    hourly_rate: Optional[float] = None
    availability: str
    
    class Config:
        from_attributes = True

class GuideVerification(BaseModel):
    guide_id: str
    license_number: str
    verification_date: str
    verified_by: str
    blockchain_tx: str
    status: str

class ProviderStats(BaseModel):
    total_providers: int
    verified_count: int
    average_rating: float
    by_type: Dict[str, Any]