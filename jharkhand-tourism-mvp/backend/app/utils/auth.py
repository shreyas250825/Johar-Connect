from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
import os
import hashlib

# Security configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

# Mock user database (in production, use real database)
fake_users_db = {
    "user@example.com": {
        "id": "user_123",
        "email": "user@example.com",
        "name": "Demo User",
        "role": "tourist",
        "hashed_password": pwd_context.hash("password"),
        "wallet_address": "0x742d35Cc6634C0532925a3b8D...",
        "is_active": True,
        "created_at": "2024-01-01T00:00:00Z"
    }
}

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Generate password hash"""
    return pwd_context.hash(password)

def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
    """Authenticate user with email and password"""
    user = fake_users_db.get(email)
    if not user:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)) -> Dict[str, Any]:
    """Get current user from JWT token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        user_id: str = payload.get("user_id")
        if email is None or user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # In production, fetch user from database
    user = None
    for user_data in fake_users_db.values():
        if user_data["email"] == email and user_data["id"] == user_id:
            user = user_data
            break
    
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    """Get current active user"""
    if not current_user.get("is_active", True):
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def verify_user_role(user: Dict[str, Any], required_roles: list) -> bool:
    """Verify if user has required role"""
    return user.get("role") in required_roles

def get_user_by_wallet(wallet_address: str) -> Optional[Dict[str, Any]]:
    """Get user by wallet address"""
    for user in fake_users_db.values():
        if user.get("wallet_address") == wallet_address:
            return user
    return None

def generate_user_id(email: str) -> str:
    """Generate unique user ID"""
    return f"user_{hashlib.sha256(email.encode()).hexdigest()[:16]}"

# Role-based access control
class RoleChecker:
    def __init__(self, allowed_roles: list):
        self.allowed_roles = allowed_roles
    
    def __call__(self, user: Dict[str, Any] = Depends(get_current_user)):
        if user.get("role") not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted"
            )
        return user

# Role checkers
allow_tourist = RoleChecker(["tourist"])
allow_guide = RoleChecker(["guide", "admin"])
allow_vendor = RoleChecker(["vendor", "admin"])
allow_official = RoleChecker(["official", "admin"])
allow_admin = RoleChecker(["admin"])