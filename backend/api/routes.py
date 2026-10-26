"""
SpacePulse - REST API Routes & Endpoints
Sub-Team 2: Sandaru (API Infrastructure) & Mihin (State Management)
"""
import time
import logging
from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query, HTTPException, status
from ..models.schemas import (
    TelemetryItem, BatchTelemetryPayload, OccupancyResponse,
    SeatState, ReservationRequest, ReservationResponse, HealthResponse,
    HysteresisConfigRequest, SendOtpRequest, SendOtpResponse,
    VerifyOtpRequest, VerifyOtpResponse, WebmailMessageResponse
)
from ..core.state_manager import state_manager
from ..core.email_service import email_service
from ..api.websocket_manager import ws_manager

logger = logging.getLogger("spacepulse.routes")
router = APIRouter(prefix="/api", tags=["SpacePulse API"])

# ==============================================================================
# 1. Vision & Telemetry Ingestion (Sajana -> Sandaru)
# ==============================================================================

@router.post("/telemetry", response_model=Dict[str, Any], status_code=status.HTTP_200_OK)
async def ingest_telemetry(payload: TelemetryItem):
    """
    Primary endpoint called by Sajana's YOLOv8 vision pipeline.
    Applies Mihin's temporal hysteresis logic to stabilize rapid camera fluctuations.
    """
    updated_seat = state_manager.process_telemetry(payload)
    return {
        "status": "success",
        "seat_id": payload.seat_id,
        "stabilized_status": updated_seat.status if updated_seat else "unchanged",
        "timestamp": payload.timestamp or time.time()
    }

@router.post("/telemetry/batch", response_model=Dict[str, Any], status_code=status.HTTP_200_OK)
async def ingest_batch_telemetry(payload: BatchTelemetryPayload):
    """
    Ingests batch telemetry items for an entire camera field of view.
    """
    updated_seats = state_manager.batch_process_telemetry(payload.telemetry)
    return {
        "status": "success",
        "camera_id": payload.camera_id,
        "processed_count": len(payload.telemetry),
        "updated_count": len(updated_seats),
        "timestamp": time.time()
    }

@router.get("/telemetry/stats")
async def get_telemetry_stats():
    """Returns telemetry statistics for Page 11 Kiosk / Showcase view."""
    return state_manager.get_telemetry_stats()

# ==============================================================================
# 2. Temporal Hysteresis & Demonstration Controls (PDF Page 11)
# ==============================================================================

@router.get("/hysteresis/config")
async def get_hysteresis_config():
    """Returns current temporal hysteresis thresholds and demonstration presets."""
    return state_manager.get_hysteresis_config()

@router.post("/hysteresis/config")
async def update_hysteresis_config(req: HysteresisConfigRequest):
    """Updates debounce & release hysteresis duration for live showcase demonstration."""
    return state_manager.update_hysteresis_config(
        occupy=req.occupy_debounce_sec,
        release=req.release_hysteresis_sec,
        holding=req.holding_debounce_sec
    )

class SimulateEventRequest(BaseModel):
    action: Optional[str] = None
    event_type: Optional[str] = None
    seat_id: Optional[str] = None
    zone_id: Optional[str] = None

@router.post("/simulate/camera_event")
async def simulate_camera_event(
    req: Optional[SimulateEventRequest] = None,
    action: Optional[str] = Query(None, description="sit, laptop, vacate, jitter"),
    seat_id: Optional[str] = Query(None)
):
    """Simulates live camera detections directly for testing temporal hysteresis."""
    eff_action = "sit"
    eff_seat = "S-01"
    if req:
        eff_action = req.event_type or req.action or eff_action
        eff_seat = req.zone_id or req.seat_id or eff_seat
    if action:
        eff_action = action
    if seat_id:
        eff_seat = seat_id
    return state_manager.simulate_event(action=eff_action, seat_id=eff_seat)

# ==============================================================================
# 3. Occupancy & Aggregation (Sandaru -> Sithumina)
# ==============================================================================

@router.get("/occupancy", response_model=OccupancyResponse)
async def get_occupancy():
    """
    Primary endpoint polled every 1000ms by Sithumina's vanilla JS frontend.
    Returns aggregated occupancy statistics and seat states across all floors.
    """
    return state_manager.get_occupancy_response()

@router.get("/seats", response_model=List[SeatState])
@router.get("/library/seats", response_model=List[SeatState])
async def get_seats(floor: Optional[str] = Query(None, description="Optional floor ID filter")):
    """
    Returns real-time seat states, optionally filtered by floor.
    Compatible with both Web Frontend and Flutter Mobile App.
    """
    return state_manager.get_all_seats(floor_id=floor)

@router.get("/seats/{seat_id}", response_model=SeatState)
async def get_seat_detail(seat_id: str):
    seat = state_manager.get_seat(seat_id)
    if not seat:
        raise HTTPException(status_code=404, detail=f"Seat '{seat_id}' not found")
    return seat

# ==============================================================================
# 4. University Facilities (Library, Canteens, ATMs, Bookshops)
# ==============================================================================

@router.get("/library")
async def get_library_floors():
    """Returns library floor occupancy details."""
    res = state_manager.get_occupancy_response()
    return res.floors

@router.get("/canteens")
async def get_canteens():
    """Returns live canteen crowd statistics matching PDF Page 6."""
    return [
        {
            "id": "canteen_goda",
            "name": "Goda Canteen",
            "personCount": 66,
            "maxCapacity": 150,
            "status": "Open",
            "queueTimeMinutes": 8,
            "popularMeal": "Sri Lankan Buffet, Fresh Juices, Shorties",
            "floor": "Student Centre Complex",
            "tags": ["Sri Lankan Buffet", "Fresh Juices", "Shorties"]
        },
        {
            "id": "canteen_wala",
            "name": "Wala Canteen",
            "personCount": 40,
            "maxCapacity": 150,
            "status": "Open",
            "queueTimeMinutes": 5,
            "popularMeal": "Breakfast & Lunch Packets, Tea & Snacks",
            "floor": "Wala Open Amphitheater Area",
            "tags": ["Breakfast & Lunch Packets", "Tea & Snacks"]
        },
        {
            "id": "canteen_l",
            "name": "L Canteen",
            "personCount": 110,
            "maxCapacity": 200,
            "status": "Open",
            "queueTimeMinutes": 13,
            "popularMeal": "Bakery Items, Coffee, Full Meals",
            "floor": "Sentra Court Area",
            "tags": ["Bakery Items", "Coffee", "Full Meals"]
        }
    ]

@router.get("/atms")
async def get_atms():
    """Returns ATM queue lengths and cash availability matching PDF Page 7."""
    return [
        {
            "id": "atm_boc",
            "name": "BOC ATM",
            "bankName": "Bank of Ceylon",
            "location": "Main Administrative Building Entrance",
            "queueLength": 4,
            "status": "Working",
            "hasCash": True,
            "estimatedWaitMins": 12
        }
    ]

@router.get("/bookshops")
async def get_bookshops():
    """Returns university stationery and bookshop statuses."""
    return [
        {
            "id": "bookshop_main",
            "name": "University Main Bookshop",
            "location": "Near Canteen Complex",
            "status": "Open",
            "queueLength": 2,
            "services": ["Course Books", "Stationery", "Past Papers"]
        }
    ]

@router.get("/trends")
async def get_trends(profile: str = Query("weekday", description="weekday, exam, or weekend")):
    """Historical occupancy profiles for analytical charting matching PDF Page 10."""
    profiles = {
        "weekday": {
            "hours": ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"],
            "libraryOccupancy": [22, 36, 64, 82, 75, 70, 88, 85, 65, 50, 35, 24, 14],
            "canteenOccupancy": [18, 45, 28, 58, 96, 92, 48, 32, 62, 40, 20, 10, 5]
        },
        "exam": {
            "hours": ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"],
            "libraryOccupancy": [62, 78, 91, 97, 94, 93, 99, 98, 95, 92, 86, 80, 72],
            "canteenOccupancy": [32, 58, 42, 74, 98, 95, 68, 52, 76, 64, 56, 44, 30]
        },
        "weekend": {
            "hours": ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"],
            "libraryOccupancy": [8, 16, 28, 42, 49, 46, 54, 51, 38, 26, 18, 11, 5],
            "canteenOccupancy": [6, 18, 14, 28, 55, 48, 22, 15, 24, 18, 10, 5, 2]
        }
    }
    return profiles.get(profile.lower(), profiles["weekday"])

# ==============================================================================
# 5. Student Desk Reservations & Holds
# ==============================================================================

@router.post("/reserve", response_model=ReservationResponse)
async def reserve_seat(req: ReservationRequest):
    success = state_manager.reserve_seat(
        seat_id=req.seat_id,
        student_id=req.student_id,
        duration_minutes=req.duration_minutes
    )
    if not success:
        return ReservationResponse(
            success=False,
            message="Desk is not available for reservation.",
            seat_id=req.seat_id
        )
    return ReservationResponse(
        success=True,
        message=f"Seat {req.seat_id} reserved for {req.duration_minutes} minutes.",
        seat_id=req.seat_id,
        duration_minutes=req.duration_minutes,
        expires_at=time.time() + (req.duration_minutes * 60)
    )

@router.post("/release", response_model=Dict[str, Any])
async def release_seat(seat_id: str = Query(..., description="Seat ID to release")):
    success = state_manager.release_seat(seat_id)
    return {"success": success, "seat_id": seat_id, "message": "Reservation cancelled or seat cleared."}

# ==============================================================================
# 6. System Health & Diagnostics
# ==============================================================================

@router.get("/health", response_model=HealthResponse)
async def health_check():
    stats = state_manager.get_stats()
    return HealthResponse(
        status="healthy",
        app="SpacePulse Backend (Team NodeX)",
        version="2.0.0",
        uptime_seconds=round(stats["uptime"], 1),
        connected_ws_clients=len(ws_manager.active_connections),
        active_seat_count=stats["seat_count"],
        telemetry_packets_received=stats["telemetry_packet_count"],
        last_telemetry_timestamp=stats["last_telemetry"]
    )

# ==============================================================================
# 7. University Webmail Authentication & Mailbox Endpoints
# ==============================================================================

@router.post("/auth/send-otp", response_model=SendOtpResponse)
async def send_auth_otp(req: SendOtpRequest):
    """
    Sends a 6-digit verification code to the student's University Webmail.
    The code is delivered strictly to the webmail inbox and is NEVER returned in this API response.
    """
    try:
        res = state_manager.send_auth_otp(req.email, req.name)
        return SendOtpResponse(
            status="ok",
            message="Verification code has been dispatched to your University Webmail.",
            email=res["email"],
            smtp_dispatched=res.get("smtp_dispatched", False),
            stored_in_webmail=res.get("stored_in_webmail", True)
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        logger.error(f"Error sending OTP: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to dispatch verification code.")

@router.post("/auth/verify-otp", response_model=VerifyOtpResponse)
async def verify_auth_otp(req: VerifyOtpRequest):
    """
    Verifies the 6-digit code received via University Webmail.
    Returns the verified Student Profile and session token.
    """
    try:
        res = state_manager.verify_auth_otp(req.email, req.code, req.name)
        return VerifyOtpResponse(
            status="ok",
            message=res["message"],
            student=res["student"],
            token=res["token"]
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        logger.error(f"Error verifying OTP: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to verify code.")

@router.get("/webmail/inbox", response_model=List[WebmailMessageResponse])
async def get_webmail_inbox(email: Optional[str] = Query(None, description="Filter by recipient student webmail")):
    """
    Retrieves incoming official emails for the student's University Webmail mailbox.
    Used by the in-app Webmail Reader modal to check the official SpacePulse verification email.
    """
    messages = email_service.get_inbox_messages(email)
    return [WebmailMessageResponse(**msg) for msg in messages]

@router.get("/webmail/message/{msg_id}", response_model=WebmailMessageResponse)
async def get_webmail_message(msg_id: str):
    """Retrieves a single email message from the University Webmail store and marks it as read."""
    msg = email_service.get_message_by_id(msg_id)
    if not msg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found in webmail.")
    return WebmailMessageResponse(**msg)

@router.delete("/webmail/clear")
async def clear_webmail_inbox():
    """Clears the simulated university webmail inbox."""
    email_service.inbox_store.clear()
    return {"status": "ok", "message": "University Webmail inbox cleared."}

@router.get("/refresh")
@router.post("/refresh")
async def refresh_clients():
    """Broadcasts a live refresh event to all connected SpacePulse web app tabs."""
    await ws_manager.broadcast({"type": "reload"})
    return {"status": "ok", "message": "Refresh command broadcasted to all active web clients."}


