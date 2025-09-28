from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class ProductCategory(str, Enum):
    HANDICRAFT = "handicraft"
    TEXTILE = "textile"
    JEWELRY = "jewelry"
    ORGANIC = "organic"
    ART = "art"
    POTTERY = "pottery"

class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class PaymentMethod(str, Enum):
    BLOCKCHAIN = "blockchain"
    CARD = "card"
    UPI = "upi"
    CASH = "cash"

class ProductBase(BaseModel):
    name: str
    category: ProductCategory
    description: str
    price: float
    artisan: str
    materials: List[str]
    dimensions: str
    weight: str
    stock: int = 1

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str
    image: str
    rating: float
    authenticity: str
    delivery_time: str
    sustainability: str
    created_date: str

    class Config:
        from_attributes = True

class OrderItem(BaseModel):
    product_id: str
    quantity: int
    price: float

class OrderBase(BaseModel):
    products: List[OrderItem]
    delivery_address: str
    payment_method: PaymentMethod = PaymentMethod.BLOCKCHAIN

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: str
    user_id: str
    total_amount: float
    status: OrderStatus
    order_date: str
    tracking_number: Optional[str] = None
    blockchain_tx: Optional[str] = None

    class Config:
        from_attributes = True

class MarketplaceStats(BaseModel):
    total_products: int
    total_orders: int
    completed_orders: int
    total_revenue: float
    category_distribution: Dict[str, int]
    average_order_value: float
    artisan_count: int

class CategoryInfo(BaseModel):
    name: str
    count: int
    image: str

class ArtisanInfo(BaseModel):
    name: str
    product_count: int
    rating: float
    location: str
    specialty: str