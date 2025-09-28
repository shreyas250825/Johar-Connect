from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import hashlib

from ..utils.auth import (
    authenticate_user,
    create_access_token,
    get_password_hash,
    verify_password,
    get_current_user,
    get_current_active_user,
    RoleChecker
)
from ..models.provider_model import User, UserCreate, Token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

# Mock user database - in production, use real database
users_db = {
    "tourist@example.com": {
        "id": "user_1",
        "email": "tourist@example.com",
        "name": "Demo Tourist",
        "role": "tourist",
        "hashed_password": get_password_hash("password123"),
        "wallet_address": "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
        "is_active": True,
        "created_at": "2024-01-01T00:00:00Z",
        "profile_complete": True
    },
    "guide@example.com": {
        "id": "user_2",
        "email": "guide@example.com",
        "name": "Raj Kumar - Certified Guide",
        "role": "guide",
        "hashed_password": get_password_hash("password123"),
        "wallet_address": "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1",
        "is_active": True,
        "created_at": "2024-01-01T00:00:00Z",
        "profile_complete": True,
        "guide_license": "JH-GD-2024-001",
        "specialties": ["Cultural Tours", "Wildlife", "Adventure"],
        "languages": ["Hindi", "English", "Santhali"]
    },
    "vendor@example.com": {
        "id": "user_3",
        "email": "vendor@example.com",
        "name": "Tribal Artisans Collective",
        "role": "vendor",
        "hashed_password": get_password_hash("password123"),
        "wallet_address": "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2",
        "is_active": True,
        "created_at": "2024-01-01T00:00:00Z",
        "profile_complete": True,
        "business_name": "Tribal Artisans Collective",
        "products_category": ["handicraft", "textile"],
        "artisan_count": 15
    },
    "official@example.com": {
        "id": "user_4",
        "email": "official@example.com",
        "name": "Tourism Department Official",
        "role": "official",
        "hashed_password": get_password_hash("password123"),
        "wallet_address": "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3",
        "is_active": True,
        "created_at": "2024-01-01T00:00:00Z",
        "profile_complete": True,
        "department": "Jharkhand Tourism Development Corporation",
        "designation": "Senior Officer"
    }
}

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user["email"], "user_id": user["id"], "role": user["role"]},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 1800,  # 30 minutes in seconds
        "user": user
    }

@router.post("/register", response_model=Token)
async def register_user(user_data: UserCreate):
    """
    Register a new user
    """
    # Check if user already exists
    if user_data.email in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Generate user ID
    user_id = f"user_{hashlib.sha256(user_data.email.encode()).hexdigest()[:16]}"
    
    # Create new user
    new_user = {
        "id": user_id,
        "email": user_data.email,
        "name": user_data.name,
        "role": user_data.role,
        "hashed_password": get_password_hash(user_data.password),
        "wallet_address": user_data.wallet_address,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
        "profile_complete": False
    }
    
    # Add role-specific fields
    if user_data.role == "guide":
        new_user.update({
            "guide_license": None,
            "specialties": [],
            "languages": ["Hindi"],
            "verification_status": "pending"
        })
    elif user_data.role == "vendor":
        new_user.update({
            "business_name": user_data.name,
            "products_category": [],
            "artisan_count": 0,
            "verification_status": "pending"
        })
    elif user_data.role == "official":
        new_user.update({
            "department": "Jharkhand Tourism",
            "designation": "Officer"
        })
    
    # Add to database
    users_db[user_data.email] = new_user
    
    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": new_user["email"], "user_id": new_user["id"], "role": new_user["role"]},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 1800,
        "user": new_user
    }

@router.get("/me", response_model=User)
async def read_users_me(current_user: dict = Depends(get_current_active_user)):
    """
    Get current user information
    """
    return current_user

@router.put("/me")
async def update_user_profile(
    update_data: dict,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Update current user profile
    """
    user_email = current_user["email"]
    
    # Update user data
    for key, value in update_data.items():
        if key not in ["id", "email", "hashed_password"]:  # Protected fields
            users_db[user_email][key] = value
    
    users_db[user_email]["profile_complete"] = True
    users_db[user_email]["updated_at"] = datetime.utcnow().isoformat()
    
    return {
        "message": "Profile updated successfully",
        "user": users_db[user_email]
    }

@router.post("/refresh")
async def refresh_token(current_user: dict = Depends(get_current_user)):
    """
    Refresh access token
    """
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={
            "sub": current_user["email"], 
            "user_id": current_user["id"],
            "role": current_user["role"]
        },
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 1800
    }

@router.post("/logout")
async def logout():
    """
    Logout user (invalidate token on client side)
    """
    return {"message": "Successfully logged out"}

@router.post("/change-password")
async def change_password(
    current_password: str,
    new_password: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Change user password
    """
    if not verify_password(current_password, current_user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Update password
    users_db[current_user["email"]]["hashed_password"] = get_password_hash(new_password)
    users_db[current_user["email"]]["password_changed_at"] = datetime.utcnow().isoformat()
    
    return {"message": "Password updated successfully"}

@router.get("/wallet/{wallet_address}")
async def get_user_by_wallet(wallet_address: str):
    """
    Get user information by wallet address
    """
    for user in users_db.values():
        if user.get("wallet_address") == wallet_address:
            # Return public profile only
            public_profile = {
                "id": user["id"],
                "name": user["name"],
                "role": user["role"],
                "wallet_address": user["wallet_address"]
            }
            
            # Add role-specific public info
            if user["role"] == "guide":
                public_profile.update({
                    "specialties": user.get("specialties", []),
                    "languages": user.get("languages", []),
                    "verification_status": user.get("verification_status", "pending")
                })
            elif user["role"] == "vendor":
                public_profile.update({
                    "business_name": user.get("business_name"),
                    "products_category": user.get("products_category", [])
                })
            
            return public_profile
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found with this wallet address"
    )

@router.get("/stats")
async def get_auth_stats(current_user: dict = Depends(RoleChecker(["official", "admin"]))):
    """
    Get authentication statistics (Officials and Admins only)
    """
    total_users = len(users_db)
    users_by_role = {}
    active_users = 0
    
    for user in users_db.values():
        role = user["role"]
        users_by_role[role] = users_by_role.get(role, 0) + 1
        if user.get("is_active", True):
            active_users += 1
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "users_by_role": users_by_role,
        "profile_completion_rate": round(
            len([u for u in users_db.values() if u.get("profile_complete", False)]) / total_users * 100, 2
        )
    }

@router.post("/request-verification")
async def request_verification(
    verification_data: dict,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Request verification for guide or vendor
    """
    if current_user["role"] not in ["guide", "vendor"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verification only available for guides and vendors"
        )
    
    # Update verification status
    users_db[current_user["email"]]["verification_status"] = "submitted"
    users_db[current_user["email"]]["verification_data"] = verification_data
    users_db[current_user["email"]]["verification_requested_at"] = datetime.utcnow().isoformat()
    
    return {
        "message": "Verification request submitted successfully",
        "status": "submitted",
        "request_id": f"VR-{hashlib.sha256(current_user['email'].encode()).hexdigest()[:12]}"
    }