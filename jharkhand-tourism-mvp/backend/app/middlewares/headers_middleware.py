from fastapi import Request
from fastapi.responses import JSONResponse
import time
from ..utils.headers import add_security_headers, check_rate_limit, get_client_ip

async def headers_middleware(request: Request, call_next):
    """
    Custom middleware for adding security headers and rate limiting
    """
    # Rate limiting check
    client_ip = get_client_ip(request)

    # Exclude health check from rate limiting
    if request.url.path != "/health" and not check_rate_limit(client_ip):
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests"},
            headers={"Retry-After": "60"}
        )

    # Add security headers
    response = await add_security_headers(request, call_next)

    return response

async def logging_middleware(request: Request, call_next):
    """
    Middleware for request logging
    """
    start_time = time.time()
    
    # Process request
    response = await call_next(request)
    
    # Calculate processing time
    process_time = time.time() - start_time
    
    # Log request details
    log_data = {
        "method": request.method,
        "url": str(request.url),
        "client_ip": get_client_ip(request),
        "status_code": response.status_code,
        "process_time": process_time,
        "user_agent": request.headers.get("user-agent", ""),
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    
    # In production, log to file or logging service
    print(f"API Request: {log_data}")
    
    return response

async def error_handling_middleware(request: Request, call_next):
    """
    Middleware for global error handling
    """
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        # Log the error
        print(f"Unhandled error: {str(e)}")
        
        # Return generic error response
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Internal server error",
                "error_id": str(hash(str(e)))  # Simple error ID for tracking
            }
        )