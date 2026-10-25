"""
SpacePulse - Pydantic Schemas & Data Contracts
Sub-Team 2: Backend & Architecture (Sandaru & Mihin)
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import time

class TelemetryItem(BaseModel):
    """Telemetry payload from vision pipeline (Sajana)"""
    seat_id: str = Field(..., description="Unique identifier for the seat (e.g., s_01 or seat_1)")
    has_person: bool = Field(..., description="Whether a person is detected in the seat polygon")
    has_items: bool = Field(default=False, description="Whether items/backpack/laptop are detected")
    timestamp: Optional[float] = Field(default_factory=time.time, description="Detection timestamp (seconds since epoch)")
    confidence: Optional[float] = Field(default=None, description="Detection confidence score")

class BatchTelemetryPayload(BaseModel):
    """Batch of telemetry items from a single camera feed"""
    camera_id: Optional[str] = Field(default="cam_default", description="Camera identifier")
    floor_id: Optional[str] = Field(default="floor_2", description="Associated library floor")
    telemetry: List[TelemetryItem] = Field(..., description="List of seat detections")

class SeatState(BaseModel):
    """Stabilized seat state after Mihin's hysteresis processing"""
    id: str
    seatNumber: str
    status: str = Field(..., description="Status: 'free', 'occupied', 'holding', 'reserved'")
    floor_id: str
    section: str
    powerOutlet: bool = True
    x: Optional[int] = None
    y: Optional[int] = None
    has_person: bool = False
    has_items: bool = False
    raw_has_person: bool = False
    raw_has_items: bool = False
    occupied_since: Optional[float] = None
    last_state_change: float = Field(default_factory=time.time)
    last_seen: float = Field(default_factory=time.time)
    reserved_by: Optional[str] = None
    reservation_expires_at: Optional[float] = None

class FloorSummary(BaseModel):
    id: str
    name: str
    floorNumber: int
    totalSeats: int
    availableSeats: int
    occupiedSeats: int
    isQuietZone: bool = False
    hasPowerSockets: bool = True

class OccupancySummary(BaseModel):
    totalSeats: int
    availableSeats: int
    occupiedSeats: int
    holdingSeats: int
    reservedSeats: int
    occupancyRate: float
    totalFloors: int
    activeSensors: int

class OccupancyResponse(BaseModel):
    """Aggregated occupancy data served to Sithumina's frontend and mobile app"""
    summary: OccupancySummary
    floors: List[FloorSummary]
    seats: List[SeatState]
    timestamp: float = Field(default_factory=time.time)
    status: str = "ok"

class ReservationRequest(BaseModel):
    seat_id: str
    student_id: str
    student_name: Optional[str] = "Student"
    duration_minutes: int = Field(default=30, ge=5, le=120)

class ReservationResponse(BaseModel):
    success: bool
    message: str
    seat_id: str
    expires_at: Optional[float] = None
    duration_minutes: Optional[int] = None

class HysteresisConfigRequest(BaseModel):
    occupy_debounce_sec: Optional[float] = None
    release_hysteresis_sec: Optional[float] = None
    holding_debounce_sec: Optional[float] = None

class HealthResponse(BaseModel):
    status: str
    app: str
    version: str
    uptime_seconds: float
    connected_ws_clients: int
    active_seat_count: int
    telemetry_packets_received: int
    last_telemetry_timestamp: Optional[float] = None

class SendOtpRequest(BaseModel):
    email: str
    name: Optional[str] = None

class SendOtpResponse(BaseModel):
    status: str
    message: str
    email: str

class VerifyOtpRequest(BaseModel):
    email: str
    code: str
    name: Optional[str] = None

class StudentProfile(BaseModel):
    email: str
    indexNumber: str
    batch: str
    department: str
    name: str
    isVerified: bool = True
    verifiedAt: str

class VerifyOtpResponse(BaseModel):
    status: str
    message: str
    student: StudentProfile
    token: str

class WebmailMessageResponse(BaseModel):
    id: str
    sender: str
    recipient: str
    subject: str
    code: Optional[str] = None
    body_text: str
    body_html: str
    timestamp: float
    date_str: str
    is_read: bool = False

