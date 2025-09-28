from fastapi import APIRouter, HTTPException, Depends, Query, status
from typing import List, Optional, Dict, Any
import hashlib

from ..services.providers_service import ProvidersService
from ..models.provider_model import Provider, ProviderCreate, ProviderUpdate

from ..utils.auth import get_current_user, RoleChecker

router = APIRouter()
providers_service = ProvidersService()

@router.get("/", response_model=List[Provider])
async def get_providers(
    provider_type: Optional[str] = Query(None, description="Filter by provider type"),
    verified: Optional[bool] = Query(None, description="Filter by verification status"),
    location: Optional[str] = Query(None, description="Filter by location"),
    specialty: Optional[str] = Query(None, description="Filter by specialty"),
    min_rating: Optional[float] = Query(None, description="Minimum rating"),
    limit: int = Query(20, description="Number of providers to return", le=100),
    skip: int = Query(0, description="Number of providers to skip")
):
    """
    Get all service providers with advanced filtering
    """
    try:
        providers = providers_service.get_providers(
            provider_type=provider_type,
            verified=verified,
            location=location,
            specialty=specialty,
            min_rating=min_rating,
            limit=limit,
            skip=skip
        )
        return providers
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching providers: {str(e)}"
        )

@router.get("/{provider_id}", response_model=Provider)
async def get_provider(provider_id: str):
    """
    Get a specific provider by ID
    """
    try:
        provider = providers_service.get_provider(provider_id)
        if not provider:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Provider not found"
            )
        return provider
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching provider: {str(e)}"
        )

@router.post("/", response_model=Provider)
async def create_provider(
    provider: ProviderCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new service provider
    """
    try:
        # Check if user is guide or vendor
        if current_user["role"] not in ["guide", "vendor"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only guides and vendors can create provider profiles"
            )
        
        new_provider = providers_service.create_provider(
            provider.dict(),
            current_user
        )
        return new_provider
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating provider: {str(e)}"
        )

@router.put("/{provider_id}", response_model=Provider)
async def update_provider(
    provider_id: str,
    provider_update: ProviderUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Update a service provider
    """
    try:
        updated_provider = providers_service.update_provider(
            provider_id,
            provider_update.dict(exclude_unset=True),
            current_user
        )
        if not updated_provider:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Provider not found or access denied"
            )
        return updated_provider
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating provider: {str(e)}"
        )

@router.post("/{provider_id}/verify")
async def verify_provider(
    provider_id: str,
    verification_data: dict,
    current_user: dict = Depends(RoleChecker(["official", "admin"]))
):
    """
    Verify a service provider using blockchain (Officials and Admins only)
    """
    try:
        verification_result = providers_service.verify_provider(
            provider_id,
            verification_data,
            current_user
        )
        return verification_result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error verifying provider: {str(e)}"
        )

@router.get("/{provider_id}/reviews")
async def get_provider_reviews(provider_id: str):
    """
    Get reviews for a specific provider
    """
    try:
        reviews = providers_service.get_provider_reviews(provider_id)
        return {"reviews": reviews}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching reviews: {str(e)}"
        )

@router.post("/{provider_id}/reviews")
async def add_provider_review(
    provider_id: str,
    review_data: dict,
    current_user: dict = Depends(get_current_user)
):
    """
    Add a review for a provider
    """
    try:
        result = providers_service.add_provider_review(
            provider_id,
            current_user["id"],
            review_data
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error adding review: {str(e)}"
        )

@router.get("/{provider_id}/availability")
async def get_provider_availability(
    provider_id: str,
    date: str
):
    """
    Get provider availability for a specific date
    """
    try:
        availability = providers_service.get_provider_availability(provider_id, date)
        return {"availability": availability}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching availability: {str(e)}"
        )

@router.post("/{provider_id}/book")
async def book_provider(
    provider_id: str,
    booking_data: dict,
    current_user: dict = Depends(get_current_user)
):
    """
    Book a service provider
    """
    try:
        booking_result = providers_service.book_provider(
            provider_id,
            current_user["id"],
            booking_data
        )
        return booking_result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error booking provider: {str(e)}"
        )

@router.get("/types/stats")
async def get_provider_type_stats():
    """
    Get statistics by provider type
    """
    try:
        stats = providers_service.get_provider_type_stats()
        return stats
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching provider stats: {str(e)}"
        )

@router.get("/search/{query}")
async def search_providers(
    query: str,
    limit: int = Query(20, description="Number of results to return", le=50)
):
    """
    Search providers by name, specialty, or location
    """
    try:
        results = providers_service.search_providers(query, limit)
        return {"results": results}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error searching providers: {str(e)}"
        )

@router.get("/locations/popular")
async def get_popular_locations():
    """
    Get popular provider locations
    """
    try:
        locations = providers_service.get_popular_locations()
        return {"popular_locations": locations}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching popular locations: {str(e)}"
        )

@router.get("/featured/guides")
async def get_featured_guides():
    """
    Get featured tour guides (highly rated and verified)
    """
    try:
        featured_guides = providers_service.get_featured_guides()
        return {"featured_guides": featured_guides}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching featured guides: {str(e)}"
        )

@router.get("/{provider_id}/earnings")
async def get_provider_earnings(
    provider_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get earnings statistics for a provider (Provider only)
    """
    try:
        # Check if user owns this provider profile
        provider = providers_service.get_provider(provider_id)
        if not provider or provider.get("user_id") != current_user["id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        earnings = providers_service.get_provider_earnings(provider_id)
        return earnings
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching earnings: {str(e)}"
        )

@router.post("/{provider_id}/availability")
async def update_availability(
    provider_id: str,
    availability_data: dict,
    current_user: dict = Depends(get_current_user)
):
    """
    Update provider availability schedule
    """
    try:
        result = providers_service.update_availability(
            provider_id,
            current_user["id"],
            availability_data
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating availability: {str(e)}"
        )