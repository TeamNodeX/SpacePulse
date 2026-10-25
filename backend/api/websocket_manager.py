"""
SpacePulse - Real-Time WebSocket Manager
Team NodeX - Sub-Team 2: Sandaru (API Infrastructure) & Mihin (State Management)
"""
import asyncio
import json
import logging
from typing import List, Dict, Any
from fastapi import WebSocket

logger = logging.getLogger("spacepulse.websocket")

class ConnectionManager:
    """Manages active WebSocket connections for instant live UI updates."""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self._loop: asyncio.AbstractEventLoop = None

    def set_event_loop(self, loop: asyncio.AbstractEventLoop):
        self._loop = loop

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket client connected. Total active: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            logger.info(f"WebSocket client disconnected. Total active: {len(self.active_connections)}")

    async def broadcast(self, message: Dict[str, Any]):
        """Broadcasts a JSON serializable dict to all connected clients."""
        if not self.active_connections:
            return
        
        dead_connections = []
        payload = json.dumps(message)

        for connection in self.active_connections:
            try:
                await connection.send_text(payload)
            except Exception:
                dead_connections.append(connection)

        for dead in dead_connections:
            self.disconnect(dead)

    def dispatch_from_thread(self, message: Dict[str, Any]):
        """Thread-safe dispatch for callbacks triggered from vision/background threads."""
        if self._loop and self._loop.is_running() and self.active_connections:
            asyncio.run_coroutine_threadsafe(self.broadcast(message), self._loop)

ws_manager = ConnectionManager()
