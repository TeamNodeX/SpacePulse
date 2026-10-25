"""
SpacePulse - FastAPI Application Entry Point
Team NodeX - Sub-Team 2: Backend & Architecture (Sandaru & Mihin)
"""
import asyncio
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .core.config import settings
from .core.state_manager import state_manager
from .api.routes import router as api_router
from .api.websocket_manager import ws_manager

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("spacepulse.main")

# Background ticker task handle
_ticker_task = None

async def periodic_maintenance_ticker():
    """Runs periodic state cleanup and broadcasts periodic heartbeats."""
    while True:
        try:
            await asyncio.sleep(2.0)
            # Periodic heartbeat broadcast to keep WebSockets fresh
            if ws_manager.active_connections:
                occ = state_manager.get_occupancy_response()
                await ws_manager.broadcast({
                    "type": "heartbeat",
                    "timestamp": occ.timestamp,
                    "summary": occ.summary.model_dump(),
                    "occupancyRate": occ.summary.occupancyRate
                })
        except asyncio.CancelledError:
            break
        except Exception as e:
            logger.warning(f"Error in maintenance ticker: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan for clean startup and shutdown."""
    loop = asyncio.get_running_loop()
    ws_manager.set_event_loop(loop)
    
    # Register Mihin's state change listener to broadcast real-time events via WebSocket
    def on_seat_state_change(updated_seat, old_status):
        ws_manager.dispatch_from_thread({
            "type": "seat_update",
            "seat": updated_seat.model_dump(),
            "old_status": old_status,
            "timestamp": updated_seat.last_state_change
        })
    
    state_manager.register_state_change_listener(on_seat_state_change)
    logger.info("Registered state manager listener to WebSocket broadcaster.")
    
    # Start background ticker
    global _ticker_task
    _ticker_task = asyncio.create_task(periodic_maintenance_ticker())
    logger.info("SpacePulse Backend initialized and ready on port %s", settings.PORT)
    
    yield
    
    # Shutdown
    if _ticker_task:
        _ticker_task.cancel()
    logger.info("SpacePulse Backend shutdown completed.")

# Instantiate FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Backend API infrastructure and temporal hysteresis engine for Team NodeX (Sandaru & Mihin).",
    lifespan=lifespan
)

# Configure CORS Middleware (Sandaru's Task)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows web dashboard, Live Server, and Flutter mobile app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router)

# Real-time WebSocket Endpoints
@app.websocket("/ws/occupancy")
@app.websocket("/ws/live")
async def websocket_occupancy_endpoint(websocket: WebSocket):
    """
    Real-time push WebSocket for instant, zero-latency seat status updates.
    Sends initial full state snapshot on connection, then streams live deltas.
    """
    await ws_manager.connect(websocket)
    try:
        # Send initial full occupancy snapshot immediately upon connect
        initial_data = state_manager.get_occupancy_response()
        await websocket.send_json({
            "type": "snapshot",
            "data": initial_data.model_dump()
        })
        
        while True:
            # Keep connection alive; clients can send ping/commands
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_text("pong")
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception:
        ws_manager.disconnect(websocket)

@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "SpacePulse REST API is online",
        "team": "NodeX (University of Moratuwa)",
        "subteams": {
            "vision": "Shaluka & Sajana",
            "backend": "Sandaru & Mihin",
            "frontend": "Kavindu & Sithumina",
            "devops": "Tharusha & Disanda"
        },
        "docs": "/docs",
        "endpoints": {
            "occupancy": "/api/occupancy",
            "telemetry": "/api/telemetry",
            "seats": "/api/seats",
            "canteens": "/api/canteens",
            "atms": "/api/atms",
            "health": "/api/health",
            "websocket": "/ws/occupancy"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
