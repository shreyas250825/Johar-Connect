from fastapi import Request
from fastapi.responses import JSONResponse
import time
import hashlib

# Security headers configuration
SECURITY_HEADERS = {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "default-src 'self' https://fastapi.tiangolo.com; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' https://fastapi.tiangolo.com",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
}

# CORS headers
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
}

async def add_security_headers(request: Request, call_next):
    """Add security headers to all responses"""
    start_time = time.time()
    
    # Process request
    response = await call_next(request)
    
    # Add security headers
    for header, value in SECURITY_HEADERS.items():
        response.headers[header] = value
    
    # Add CORS headers
    for header, value in CORS_HEADERS.items():
        response.headers[header] = value
    
    # Add custom headers
    response.headers["X-Platform"] = "Jharkhand-Tourism"
    response.headers["X-API-Version"] = "1.0.0"
    
    # Calculate and add response time
    process_time = time.time() - start_time
    response.headers["X-Response-Time"] = str(process_time)
    
    return response

def generate_etag(content: str) -> str:
    """Generate ETag for content caching"""
    return hashlib.md5(content.encode()).hexdigest()

def add_cache_headers(response: JSONResponse, max_age: int = 300) -> JSONResponse:
    """Add cache control headers"""
    response.headers["Cache-Control"] = f"public, max-age={max_age}"
    response.headers["ETag"] = generate_etag(response.body.decode() if response.body else "")
    return response

def add_no_cache_headers(response: JSONResponse) -> JSONResponse:
    """Add no-cache headers for sensitive data"""
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

# Rate limiting storage (in production, use Redis)
request_counts = {}

def check_rate_limit(client_ip: str, limit: int = 100, window: int = 60) -> bool:
    """Simple rate limiting implementation"""
    current_time = int(time.time())
    window_key = f"{client_ip}:{current_time // window}"
    
    if window_key not in request_counts:
        request_counts[window_key] = 0
    
    request_counts[window_key] += 1
    
    # Clean up old entries (basic cleanup)
    old_keys = [key for key in request_counts.keys() 
               if int(key.split(":")[1]) < (current_time // window) - 10]
    for key in old_keys:
        del request_counts[key]
    
    return request_counts[window_key] <= limit

def get_client_ip(request: Request) -> str:
    """Get client IP address"""
    if "x-forwarded-for" in request.headers:
        return request.headers["x-forwarded-for"].split(",")[0]
    return request.client.host if request.client else "unknown"