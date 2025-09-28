import json
import os
from typing import List, Dict, Any, Optional
import random
from datetime import datetime
import hashlib

class MarketplaceService:
    def __init__(self):
        self.products = self.generate_mock_products()
        self.orders = self.generate_mock_orders()
        self.categories = self.get_categories()
    
    def generate_mock_products(self) -> List[Dict[str, Any]]:
        """Generate mock marketplace products"""
        categories = ["handicraft", "textile", "jewelry", "organic", "art", "pottery"]
        
        product_names = {
            "handicraft": ["Wooden Elephant", "Bamboo Basket", "Stone Carving", "Tribal Mask", "Handwoven Mat"],
            "textile": ["Saree", "Shawl", "Stole", "Traditional Dress", "Embroidered Fabric"],
            "jewelry": ["Silver Necklace", "Bead Bracelet", "Tribal Earrings", "Stone Pendant", "Anklet"],
            "organic": ["Wild Honey", "Herbal Tea", "Spices", "Forest Produce", "Medicinal Herbs"],
            "art": ["Traditional Painting", "Wall Hanging", "Sculpture", "Folk Art", "Miniature"],
            "pottery": ["Clay Pot", "Terracotta Figure", "Decorative Vase", "Water Pot", "Sculpture"]
        }
        
        artisans = ["Tribal Artisans Co-op", "Women Weavers Collective", "Eco Crafts Group", 
                   "Traditional Artists", "Forest Producers", "Heritage Craftsmen"]
        
        products = []
        
        for i in range(100):
            category = random.choice(categories)
            name = random.choice(product_names[category])
            artisan = random.choice(artisans)
            price = random.randint(100, 5000)
            
            product = {
                "id": f"product_{i+1}",
                "name": name,
                "category": category,
                "description": f"Beautiful handmade {name.lower()} crafted by local artisans from Jharkhand",
                "price": price,
                "artisan": artisan,
                "image": f"https://picsum.photos/300/200?random={i}",
                "rating": round(random.uniform(3.8, 5.0), 1),
                "stock": random.randint(1, 50),
                "materials": self.get_materials_for_category(category),
                "dimensions": f"{random.randint(5, 50)}x{random.randint(5, 50)}x{random.randint(5, 50)} cm",
                "weight": f"{random.randint(100, 2000)}g",
                "authenticity": "Verified Tribal Product",
                "delivery_time": f"{random.randint(3, 10)} days",
                "sustainability": random.choice(["Eco-friendly", "Sustainable", "Natural", "Organic"]),
                "created_date": "2024-01-01"
            }
            
            products.append(product)
        
        return products
    
    def get_materials_for_category(self, category: str) -> List[str]:
        """Get appropriate materials for product category"""
        materials_map = {
            "handicraft": ["Wood", "Bamboo", "Stone", "Clay", "Natural Fibers"],
            "textile": ["Cotton", "Silk", "Wool", "Natural Dyes", "Handwoven"],
            "jewelry": ["Silver", "Beads", "Stones", "Seeds", "Bones"],
            "organic": ["Wild Harvested", "Organic", "Natural", "Chemical-free"],
            "art": ["Natural Pigments", "Canvas", "Paper", "Wood"],
            "pottery": ["Clay", "Terracotta", "Natural Glaze"]
        }
        return random.sample(materials_map.get(category, ["Natural Materials"]), random.randint(1, 3))
    
    def generate_mock_orders(self) -> List[Dict[str, Any]]:
        """Generate mock order data"""
        orders = []
        statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
        
        for i in range(50):
            order_date = datetime(2024, 1, random.randint(1, 28))
            orders.append({
                "id": f"order_{i+1}",
                "user_id": f"user_{random.randint(1, 10)}",
                "products": random.sample(self.products, random.randint(1, 3)),
                "total_amount": random.randint(500, 5000),
                "status": random.choice(statuses),
                "order_date": order_date.strftime("%Y-%m-%d"),
                "delivery_address": f"{random.randint(1, 100)} Main St, City, Jharkhand",
                "payment_method": random.choice(["blockchain", "card", "upi", "cash"]),
                "tracking_number": f"TRK{random.randint(100000, 999999)}",
                "blockchain_tx": f"0x{hashlib.sha256(str(i).encode()).hexdigest()[:64]}" if random.choice([True, False]) else None
            })
        

        return orders
    
    def get_products(self, category: Optional[str] = None, artisan: Optional[str] = None,
                    min_price: Optional[float] = None, max_price: Optional[float] = None,
                    limit: int = 50, skip: int = 0) -> List[Dict[str, Any]]:
        """Get products with optional filtering"""
        filtered_products = self.products
        
        if category:
            filtered_products = [p for p in filtered_products if p["category"] == category]
        
        if artisan:
            filtered_products = [p for p in filtered_products if artisan.lower() in p["artisan"].lower()]
        
        if min_price is not None:
            filtered_products = [p for p in filtered_products if p["price"] >= min_price]
        
        if max_price is not None:
            filtered_products = [p for p in filtered_products if p["price"] <= max_price]
        
        # Sort by rating (highest first)
        filtered_products.sort(key=lambda x: x["rating"], reverse=True)
        
        return filtered_products[skip:skip + limit]
    
    def get_product(self, product_id: str) -> Optional[Dict[str, Any]]:
        """Get a specific product by ID"""
        for product in self.products:
            if product["id"] == product_id:
                return product
        return None
    
    def create_product(self, product_data: Dict[str, Any], user: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new marketplace product"""
        new_product = {
            "id": f"product_{len(self.products) + 1}",
            **product_data,
            "rating": 0,
            "stock": product_data.get("stock", 1),
            "authenticity": "Pending Verification",
            "created_date": datetime.utcnow().strftime("%Y-%m-%d"),
            "artisan": user.get("name", "Local Artisan")
        }
        
        self.products.append(new_product)
        return new_product
    
    def get_categories(self) -> List[Dict[str, Any]]:
        """Get all product categories with counts"""
        category_counts = {}
        for product in self.products:
            category = product["category"]
            category_counts[category] = category_counts.get(category, 0) + 1
        
        categories = []
        for category, count in category_counts.items():
            categories.append({
                "name": category,
                "count": count,
                "image": f"https://picsum.photos/100/100?random={hash(category) % 100}"
            })
        
        return categories
    
    def get_artisans(self) -> List[Dict[str, Any]]:
        """Get all artisans with their product counts"""
        artisan_counts = {}
        for product in self.products:
            artisan = product["artisan"]
            artisan_counts[artisan] = artisan_counts.get(artisan, 0) + 1
        
        artisans = []
        for artisan, count in artisan_counts.items():
            artisans.append({
                "name": artisan,
                "product_count": count,
                "rating": round(random.uniform(4.0, 5.0), 1),
                "location": "Jharkhand",
                "specialty": random.choice(["Handicrafts", "Textiles", "Jewelry", "Organic"])
            })
        
        return artisans
    
    def get_user_orders(self, user_id: str) -> List[Dict[str, Any]]:
        """Get orders for a specific user"""
        user_orders = [order for order in self.orders if order["user_id"] == user_id]
        # Sort by order date (newest first)
        user_orders.sort(key=lambda x: x["order_date"], reverse=True)
        return user_orders
    
    def create_order(self, order_data: Dict[str, Any], user: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new order"""
        # Calculate total amount
        product_ids = order_data.get("product_ids", [])
        products = [self.get_product(pid) for pid in product_ids]
        products = [p for p in products if p is not None]
        total_amount = sum(product["price"] for product in products)
        
        new_order = {
            "id": f"order_{len(self.orders) + 1}",
            "user_id": user["id"],
            "products": products,
            "total_amount": total_amount,
            "status": "pending",
            "order_date": datetime.utcnow().strftime("%Y-%m-%d"),
            "delivery_address": order_data.get("delivery_address", ""),
            "payment_method": order_data.get("payment_method", "blockchain"),
            "tracking_number": f"TRK{random.randint(100000, 999999)}",
            "blockchain_tx": None
        }
        
        self.orders.append(new_order)
        return new_order
    
    def get_order(self, order_id: str, user_id: str) -> Optional[Dict[str, Any]]:
        """Get a specific order for a user"""
        for order in self.orders:
            if order["id"] == order_id and order["user_id"] == user_id:
                return order
        return None
    
    def complete_order(self, order_id: str, user: Dict[str, Any]) -> Dict[str, Any]:
        """Complete an order using blockchain transaction"""
        order = self.get_order(order_id, user["id"])
        if not order:
            return {"success": False, "message": "Order not found"}
        
        # Update order status and add blockchain transaction
        for i, o in enumerate(self.orders):
            if o["id"] == order_id:
                self.orders[i]["status"] = "confirmed"
                self.orders[i]["blockchain_tx"] = f"0x{hashlib.sha256(order_id.encode()).hexdigest()[:64]}"
                break
        
        return {
            "success": True,
            "message": "Order completed successfully",
            "order_id": order_id,
            "blockchain_transaction": self.orders[i]["blockchain_tx"],
            "status": "confirmed"
        }
    
    def get_marketplace_stats(self) -> Dict[str, Any]:
        """Get marketplace statistics"""
        total_products = len(self.products)
        total_orders = len(self.orders)
        completed_orders = len([o for o in self.orders if o["status"] == "delivered"])
        total_revenue = sum(o["total_amount"] for o in self.orders if o["status"] in ["delivered", "confirmed"])
        
        # Category distribution
        category_stats = {}
        for product in self.products:
            category = product["category"]
            if category not in category_stats:
                category_stats[category] = 0
            category_stats[category] += 1
        
        return {
            "total_products": total_products,
            "total_orders": total_orders,
            "completed_orders": completed_orders,
            "total_revenue": total_revenue,
            "category_distribution": category_stats,
            "average_order_value": total_revenue / completed_orders if completed_orders > 0 else 0,
            "artisan_count": len(set(p["artisan"] for p in self.products))
        }