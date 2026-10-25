"""
SpacePulse - Backend Configuration
Team NodeX - Sub-Team 2: Sandaru (API Infrastructure) & Mihin (State Management)
"""
from pydantic import BaseModel
from typing import List
import os

class Settings(BaseModel):
    # API Server Settings
    APP_NAME: str = "SpacePulse - Real-time Vacancy & Telemetry Platform"
    APP_VERSION: str = "2.0.0"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # CORS Configuration - Allow web frontend and Flutter mobile app
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5000",
        "http://localhost:5500",
        "http://localhost:8080",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5000",
        "http://127.0.0.1:5500",
        "http://127.0.0.1:8080",
        "http://10.0.2.2:8000",  # Android Emulator host loopback
        "*"
    ]
    
    # Temporal Hysteresis & Debounce Settings (Mihin's Task)
    # 1. Minimum continuous person detection before transitioning to OCCUPIED (anti-glitch / walk-by filter)
    OCCUPY_DEBOUNCE_SEC: float = 1.0
    
    # 2. Minimum continuous person absence before transitioning from OCCUPIED to FREE / HOLDING (official 3-sec hysteresis)
    RELEASE_HYSTERESIS_SEC: float = 3.0
    
    # 3. Time before seat with items left is marked as HOLDING (student stepped out briefly)
    HOLDING_DEBOUNCE_SEC: float = 3.0
    
    # 4. Debounce time before clearing HOLDING back to FREE once items are removed
    HOLD_TO_FREE_HYSTERESIS_SEC: float = 3.0
    
    # 5. Maximum duration (seconds) a seat can remain in HOLDING before expiring (e.g., 30 mins)
    MAX_ITEM_HOLD_SECONDS: float = 1800.0
    
    # Client polling & stream intervals
    FRONTEND_POLL_INTERVAL_MS: int = 1000
    SIMULATION_UPDATE_INTERVAL_SEC: float = 2.0

settings = Settings()
