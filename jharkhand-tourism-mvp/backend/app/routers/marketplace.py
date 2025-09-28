from fastapi import APIRouter, HTTPException, Depends, Query, status
from typing import List, Optional, Dict, Any
import hashlib
from datetime import datetime

from ..services.marketplace_service import MarketplaceService
from ..models.marketplace_model import Product, ProductCreate, Order, OrderCreate
from ..utils.auth import get_current_user, RoleChecker

router = APIRouter()
marketplace_service = MarketplaceService()

@router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = Query(None, description="Filter by product category"),
    artisan: Optional[str] = Query(None, description="Filter by artisan"),
    min_price: Optional[float] = Query(None, description="Minimum price"),
    max_price: Optional[float] = Query(None, description="Maximum price"),
    search: Optional[str] = Query(None, description="Search in product name and description"),
    limit: int = Query(20, description="Number of products to return", le=100),
    skip: int = Query(0, description="Number of products to skip")
):
    """
    Get marketplace products with optional filtering and search
    """
    try:
        products = marketplace_service.get_products(
            category=category,
            artisan=artisan,
            min_price=min_price,
            max_price=max_price,
            search_query=search,
            limit=limit,
            skip=skip
        )
        return products
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching products: {str(e)}"
        )

@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """
    Get a specific product by ID
    """
    try:
        product = marketplace_service.get_product(product_id)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        return product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching product: {str(e)}"
        )

@router.post("/products", response_model=Product)
async def create_product(
    product: ProductCreate,
    current_user: dict = Depends(RoleChecker(["vendor", "admin"]))
):
    """
    Create a new marketplace product (Vendors and Admins only)
    """
    try:
        new_product = marketplace_service.create_product(
            product.dict(),
            current_user
        )
        return new_product
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating product: {str(e)}"
        )

@router.put("/products/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product_update: dict,
    current_user: dict = Depends(RoleChecker(["vendor", "admin"]))
):
    """
    Update a marketplace product (Vendors and Admins only)
    """
    try:
        updated_product = marketplace_service.update_product(
            product_id,
            product_update,
            current_user
        )
        if not updated_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found or access denied"
            )
        return updated_product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating product: {str(e)}"
        )

@router.delete("/products/{product_id}")
async def delete_product(
    product_id: str,
    current_user: dict = Depends(RoleChecker(["vendor", "admin"]))
):
    """
    Delete a marketplace product (Vendors and Admins only)
    """
    try:
        success = marketplace_service.delete_product(product_id, current_user)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found or access denied"
            )
        return {"message": "Product deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting product: {str(e)}"
        )

@router.get("/categories")
async def get_categories():
    """
    Get all product categories with statistics
    """
    try:
        categories = marketplace_service.get_categories()
        return {"categories": categories}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching categories: {str(e)}"
        )

@router.get("/artisans")
async def get_artisans():
    """
    Get all artisans with their product counts and ratings
    """
    try:
        artisans = marketplace_service.get_artisans()
        return {"artisans": artisans}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching artisans: {str(e)}"
        )

@router.get("/artisans/{artisan_name}")
async def get_artisan_details(artisan_name: str):
    """
    Get detailed information about a specific artisan
    """
    try:
        artisan_details = marketplace_service.get_artisan_details(artisan_name)
        if not artisan_details:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Artisan not found"
            )
        return artisan_details
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching artisan details: {str(e)}"
        )

@router.get("/orders", response_model=List[Order])
async def get_orders(current_user: dict = Depends(get_current_user)):
    """
    Get user's orders
    """
    try:
        orders = marketplace_service.get_user_orders(current_user["id"])
        return orders
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching orders: {str(e)}"
        )

@router.post("/orders", response_model=Order)
async def create_order(
    order: OrderCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new order
    """
    try:
        new_order = marketplace_service.create_order(
            order.dict(),
            current_user
        )
        return new_order
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating order: {str(e)}"
        )

@router.get("/orders/{order_id}", response_model=Order)
async def get_order(
    order_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get a specific order
    """
    try:
        order = marketplace_service.get_order(order_id, current_user["id"])
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )
        return order
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching order: {str(e)}"
        )

@router.post("/orders/{order_id}/complete")
async def complete_order(
    order_id: str,
    payment_data: dict,
    current_user: dict = Depends(get_current_user)
):
    """
    Complete an order using blockchain transaction
    """
    try:
        result = marketplace_service.complete_order(
            order_id,
            current_user,
            payment_data
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error completing order: {str(e)}"
        )

@router.post("/orders/{order_id}/cancel")
async def cancel_order(
    order_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Cancel an order
    """
    try:
        result = marketplace_service.cancel_order(order_id, current_user["id"])
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found or cannot be cancelled"
            )
        return {"message": "Order cancelled successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error cancelling order: {str(e)}"
        )

@router.get("/stats")
async def get_marketplace_stats():
    """
    Get marketplace statistics
    """
    try:
        stats = marketplace_service.get_marketplace_stats()
        return stats
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching marketplace stats: {str(e)}"
        )

@router.get("/vendor/stats")
async def get_vendor_stats(current_user: dict = Depends(RoleChecker(["vendor", "admin"]))):
    """
    Get vendor-specific statistics
    """
    try:
        vendor_stats = marketplace_service.get_vendor_stats(current_user["id"])
        return vendor_stats
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching vendor stats: {str(e)}"
        )

@router.post("/products/{product_id}/review")
async def add_product_review(
    product_id: str,
    review_data: dict,
    current_user: dict = Depends(get_current_user)
):
    """
    Add a review to a product
    """
    try:
        result = marketplace_service.add_product_review(
            product_id,
            current_user["id"],
            review_data
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error adding review: {str(e)}"
        )

@router.get("/featured")
async def get_featured_products():
    """
    Get featured products (highly rated and popular)
    """
    try:
        featured_products = marketplace_service.get_featured_products()
        return {"featured_products": featured_products}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching featured products: {str(e)}"
        )
    