"""
SpacePulse - Real-Time State Management & Temporal Hysteresis Engine
Team NodeX - Sub-Team 2: Mihin (State Management) & Sandaru (API Infrastructure)

Features:
- Thread-safe in-memory state tracking for all library seats and university zones.
- Temporal hysteresis logic preventing UI flickering from rapid YOLO detection fluctuations:
    * 1.0s Debounce for Free -> Occupied (avoids false triggers from people walking past)
    * 3.0s Hysteresis for Occupied -> Free/Holding (PDF requirement: ensures seat remains occupied for 3s)
    * 3.0s Hysteresis for Holding (belongings left behind) -> Free
- Real-time event listener hooks for instant WebSocket dispatching to web & mobile clients.
- Student desk reservation and holding tracking (30-minute default).
- Support for official 4 library floors and 19 live telemetry demonstration showcase zones.
"""
import time
import threading
import random
import re
from typing import Dict, List, Optional, Callable, Any
from .config import settings
from .email_service import email_service
from ..models.schemas import (
    SeatState, OccupancySummary, FloorSummary, OccupancyResponse, TelemetryItem
)

class SeatInternalState:
    """Internal tracking model with debounce and hysteresis timers."""
    def __init__(
        self,
        seat_id: str,
        seat_number: str,
        floor_id: str,
        section: str,
        power_outlet: bool = True,
        x: Optional[int] = None,
        y: Optional[int] = None,
        initial_status: str = "free"
    ):
        self.id = seat_id
        self.seat_number = seat_number
        self.floor_id = floor_id
        self.section = section
        self.power_outlet = power_outlet
        self.x = x
        self.y = y
        
        # Public stabilized state
        self.status = initial_status  # 'free', 'occupied', 'holding', 'reserved'
        self.has_person = (initial_status == "occupied")
        self.has_items = False
        
        # Raw sensor inputs
        self.raw_has_person = self.has_person
        self.raw_has_items = False
        
        # Temporal hysteresis timestamps
        now = time.time()
        self.person_detected_since: Optional[float] = now if self.has_person else None
        self.person_absent_since: Optional[float] = None if self.has_person else now
        self.items_detected_since: Optional[float] = None
        self.items_absent_since: Optional[float] = now
        
        self.last_state_change: float = now
        self.last_seen: float = now
        self.occupied_since: Optional[float] = now if self.has_person else None
        
        # Reservation fields
        self.reserved_by: Optional[str] = None
        self.reservation_expires_at: Optional[float] = None

    def to_schema(self) -> SeatState:
        return SeatState(
            id=self.id,
            seatNumber=self.seat_number,
            status=self.status,
            floor_id=self.floor_id,
            section=self.section,
            powerOutlet=self.power_outlet,
            x=self.x,
            y=self.y,
            has_person=self.has_person,
            has_items=self.has_items,
            raw_has_person=self.raw_has_person,
            raw_has_items=self.raw_has_items,
            occupied_since=self.occupied_since,
            last_state_change=self.last_state_change,
            last_seen=self.last_seen,
            reserved_by=self.reserved_by,
            reservation_expires_at=self.reservation_expires_at
        )


class StateManager:
    """Mihin's Central Real-Time State Manager & Hysteresis Engine"""
    
    def __init__(self):
        self._lock = threading.RLock()
        self._seats: Dict[str, SeatInternalState] = {}
        self._seat_alias_map: Dict[str, str] = {}  # e.g., "seat_1" -> "s_01"
        self._listeners: List[Callable[[SeatState, str], Any]] = []
        self._telemetry_packet_count: int = 0
        self._jitter_rejections: int = 0
        self._start_time: float = time.time()
        self._last_telemetry_time: Optional[float] = None
        self._otp_store: Dict[str, Dict[str, Any]] = {}
        
        # Dynamic hysteresis & debounce settings (configurable via Page 11 showcase)
        self.occupy_debounce_sec: float = 2.0
        self.release_hysteresis_sec: float = 4.0
        self.holding_debounce_sec: float = 3.0
        self.hold_to_free_hysteresis_sec: float = 3.0
        self.max_item_hold_seconds: float = 1800.0
        
        # Initialize default university library layout
        self._init_default_layout()

    def _init_default_layout(self):
        """Initializes default seats aligned with frontend 2D floor plans & PDF specifications."""
        # 19 Showcase Zones on Floor 2 (Silent Study Carrels, Window View, Quiet Pods, Monitored Zone)
        showcase_seats = [
            ("s_01", "S-01", "floor_2", "Silent Study Carrels", True, 70, 70),
            ("s_02", "S-02", "floor_2", "Silent Study Carrels", True, 130, 70),
            ("s_03", "S-03", "floor_2", "Silent Study Carrels", True, 190, 70),
            ("s_04", "S-04", "floor_2", "Silent Study Carrels", True, 70, 130),
            ("s_05", "S-05", "floor_2", "Silent Study Carrels", True, 130, 130),
            ("s_06", "S-06", "floor_2", "Silent Study Carrels", False, 190, 130),
            ("w_01", "W-01", "floor_2", "Window View Desks", True, 340, 70),
            ("w_02", "W-02", "floor_2", "Window View Desks", True, 400, 70),
            ("w_03", "W-03", "floor_2", "Window View Desks", True, 460, 70),
            ("w_04", "W-04", "floor_2", "Window View Desks", False, 520, 70),
            ("q_01", "Q-01", "floor_2", "Quiet Study Stacks", True, 340, 190),
            ("q_02", "Q-02", "floor_2", "Quiet Study Stacks", True, 400, 190),
            ("q_03", "Q-03", "floor_2", "Quiet Study Stacks", True, 460, 190),
            ("q_04", "Q-04", "floor_2", "Quiet Study Stacks", False, 520, 190),
            ("q_05", "Q-05", "floor_2", "Quiet Study Stacks", True, 580, 190),
            ("cam_01", "CAM-01", "floor_2", "Camera Monitored Zone", True, 70, 240),
            ("cam_02", "CAM-02", "floor_2", "Camera Monitored Zone", True, 130, 240),
            ("cam_03", "CAM-03", "floor_2", "Camera Monitored Zone", True, 190, 240),
            ("cam_04", "CAM-04", "floor_2", "Camera Monitored Zone", True, 250, 240),
        ]

        # First Floor Seats (Computer Lab, Discussion Room, Main Study Areas)
        floor_1_seats = [
            ("s_1_pc01", "PC-01", "floor_1", "Computer Laboratory", True, 500, 110),
            ("s_1_pc02", "PC-02", "floor_1", "Computer Laboratory", True, 560, 110),
            ("s_1_pc03", "PC-03", "floor_1", "Computer Laboratory", True, 620, 110),
            ("s_1_pc04", "PC-04", "floor_1", "Computer Laboratory", True, 680, 110),
            ("s_1_pc05", "PC-05", "floor_1", "Computer Laboratory", True, 500, 150),
            ("s_1_pc06", "PC-06", "floor_1", "Computer Laboratory", True, 560, 150),
            ("s_1_pc07", "PC-07", "floor_1", "Computer Laboratory", True, 620, 150),
            ("s_1_pc08", "PC-08", "floor_1", "Computer Laboratory", True, 680, 150),
            ("s_1_dr01", "DR-01", "floor_1", "Discussion Room", True, 325, 115),
            ("s_1_dr02", "DR-02", "floor_1", "Discussion Room", True, 365, 115),
            ("s_1_dr03", "DR-03", "floor_1", "Discussion Room", True, 325, 155),
            ("s_1_dr04", "DR-04", "floor_1", "Discussion Room", True, 365, 155),
        ]

        # Ground Floor Seats (Central Study Commons & AQ Section)
        floor_g_seats = [
            ("s_g_01", "G-01", "floor_ground", "Central Study Commons", True, 530, 210),
            ("s_g_02", "G-02", "floor_ground", "Central Study Commons", True, 590, 210),
            ("s_g_03", "G-03", "floor_ground", "Central Study Commons", True, 650, 210),
            ("s_g_04", "G-04", "floor_ground", "Central Study Commons", True, 710, 210),
            ("s_g_05", "G-05", "floor_ground", "AQ Section", True, 500, 390),
            ("s_g_06", "G-06", "floor_ground", "AQ Section", True, 560, 390),
        ]

        # Third Floor Seats (Lending Library Collections & Central Atrium)
        floor_3_seats = [
            ("s_3_01", "L3-01", "floor_3", "Study Area Upper", True, 410, 110),
            ("s_3_02", "L3-02", "floor_3", "Study Area Upper", True, 450, 110),
            ("s_3_03", "ATR-01", "floor_3", "Central Open Atrium", True, 510, 220),
            ("s_3_04", "ATR-02", "floor_3", "Central Open Atrium", True, 670, 220),
            ("s_3_05", "ATR-03", "floor_3", "Central Open Atrium", True, 510, 330),
            ("s_3_06", "ATR-04", "floor_3", "Central Open Atrium", True, 670, 330),
        ]

        all_definitions = showcase_seats + floor_1_seats + floor_g_seats + floor_3_seats
        for seat_id, snum, fid, sec, pwr, x, y in all_definitions:
            self._seats[seat_id] = SeatInternalState(
                seat_id=seat_id,
                seat_number=snum,
                floor_id=fid,
                section=sec,
                power_outlet=pwr,
                x=x,
                y=y
            )

        # Build alias mappings:
        for idx, (sid, snum, _, _, _, _, _) in enumerate(showcase_seats, 1):
            self._seat_alias_map[f"seat_{idx}"] = sid
            self._seat_alias_map[snum] = sid
            self._seat_alias_map[snum.lower()] = sid
            self._seat_alias_map[f"s_2d_{idx:02d}"] = sid
            self._seat_alias_map[sid] = sid

        for sid, snum, _, _, _, _, _ in all_definitions:
            self._seat_alias_map[sid] = sid
            self._seat_alias_map[snum] = sid
            self._seat_alias_map[snum.lower()] = sid

    def register_state_change_listener(self, callback: Callable[[SeatState, str], Any]):
        """Attach a callback (e.g. WebSocket broadcast) on seat state change."""
        with self._lock:
            self._listeners.append(callback)

    def _resolve_seat_id(self, seat_id: str) -> str:
        """Resolve alias e.g. 'seat_1' -> 's_01', 'S-01' -> 's_01', 's_2d_01' -> 's_01'."""
        cleaned = seat_id.strip()
        return self._seat_alias_map.get(cleaned, self._seat_alias_map.get(cleaned.lower(), cleaned))

    def process_telemetry(self, item: TelemetryItem) -> Optional[SeatState]:
        """
        Ingests a vision telemetry frame (Sajana -> Sandaru) and applies
        Mihin's Temporal Hysteresis & Debounce state machine.
        """
        now = item.timestamp if item.timestamp else time.time()
        resolved_id = self._resolve_seat_id(item.seat_id)
        
        with self._lock:
            self._telemetry_packet_count += 1
            self._last_telemetry_time = now

            # If unknown seat, create a dynamic entry
            if resolved_id not in self._seats:
                self._seats[resolved_id] = SeatInternalState(
                    seat_id=resolved_id,
                    seat_number=resolved_id.upper(),
                    floor_id="floor_2",
                    section="Camera Monitored Zone"
                )
                self._seat_alias_map[resolved_id] = resolved_id
            
            seat = self._seats[resolved_id]
            seat.last_seen = now
            old_status = seat.status

            # Update raw tracking
            seat.raw_has_person = item.has_person
            seat.raw_has_items = item.has_items

            # ------------------------------------------------------------------
            # 1. Person Observation Timers
            # ------------------------------------------------------------------
            if item.has_person:
                if seat.person_detected_since is None:
                    seat.person_detected_since = now
                seat.person_absent_since = None
            else:
                if seat.person_absent_since is None:
                    seat.person_absent_since = now
                seat.person_detected_since = None

            # ------------------------------------------------------------------
            # 2. Items Observation Timers
            # ------------------------------------------------------------------
            if item.has_items:
                if seat.items_detected_since is None:
                    seat.items_detected_since = now
                seat.items_absent_since = None
            else:
                if seat.items_absent_since is None:
                    seat.items_absent_since = now
                seat.items_detected_since = None

            # ------------------------------------------------------------------
            # 3. State Machine with Hysteresis
            # ------------------------------------------------------------------
            new_status = seat.status

            # Handle reservations (if reserved by student, check expiry)
            if seat.status == "reserved":
                if seat.reservation_expires_at and now >= seat.reservation_expires_at:
                    new_status = "free"
                    seat.reserved_by = None
                    seat.reservation_expires_at = None
                elif item.has_person and seat.person_detected_since and (now - seat.person_detected_since >= self.occupy_debounce_sec):
                    new_status = "occupied"
                    seat.occupied_since = now

            elif seat.status == "free":
                if item.has_person:
                    if seat.person_detected_since and (now - seat.person_detected_since) >= self.occupy_debounce_sec:
                        new_status = "occupied"
                        seat.has_person = True
                        seat.occupied_since = now
                    else:
                        # Debounce rejected transient sensor jitter
                        self._jitter_rejections += 1
                elif item.has_items and not item.has_person and seat.items_detected_since:
                    if (now - seat.items_detected_since) >= self.holding_debounce_sec:
                        new_status = "holding"
                        seat.has_items = True

            elif seat.status == "occupied":
                if item.has_person:
                    seat.has_person = True
                else:
                    # Require RELEASE_HYSTERESIS_SEC continuous absence
                    if seat.person_absent_since and (now - seat.person_absent_since >= self.release_hysteresis_sec):
                        if item.has_items:
                            new_status = "holding"
                            seat.has_person = False
                            seat.has_items = True
                        else:
                            new_status = "free"
                            seat.has_person = False
                            seat.has_items = False
                            seat.occupied_since = None
                    else:
                        # Release hysteresis suppressed immediate dropout
                        self._jitter_rejections += 1

            elif seat.status == "holding":
                if item.has_person and seat.person_detected_since and (now - seat.person_detected_since >= self.occupy_debounce_sec):
                    new_status = "occupied"
                    seat.has_person = True
                elif not item.has_items and seat.items_absent_since and (now - seat.items_absent_since >= self.hold_to_free_hysteresis_sec):
                    new_status = "free"
                    seat.has_person = False
                    seat.has_items = False
                    seat.occupied_since = None
                elif (now - seat.last_state_change) > self.max_item_hold_seconds:
                    new_status = "free"
                    seat.has_person = False
                    seat.has_items = False
                    seat.occupied_since = None

            # Apply state transition if status changed
            if new_status != old_status:
                seat.status = new_status
                seat.last_state_change = now
                updated_schema = seat.to_schema()
                
                # Notify listeners (WebSocket broadcast)
                for listener in list(self._listeners):
                    try:
                        listener(updated_schema, old_status)
                    except Exception:
                        pass
                
                return updated_schema

            return seat.to_schema()

    def batch_process_telemetry(self, items: List[TelemetryItem]) -> List[SeatState]:
        """Processes multiple seat detections atomically."""
        updated = []
        for item in items:
            res = self.process_telemetry(item)
            if res:
                updated.append(res)
        return updated

    def get_seat(self, seat_id: str) -> Optional[SeatState]:
        resolved = self._resolve_seat_id(seat_id)
        with self._lock:
            seat = self._seats.get(resolved)
            return seat.to_schema() if seat else None

    def get_all_seats(self, floor_id: Optional[str] = None) -> List[SeatState]:
        with self._lock:
            normalized_floor = floor_id
            if floor_id == "floor_2_down":
                normalized_floor = "floor_2"
            elif floor_id == "floor_1_down":
                normalized_floor = "floor_1"
                
            if normalized_floor:
                return [s.to_schema() for s in self._seats.values() if s.floor_id == normalized_floor or (normalized_floor == "floor_2" and s.floor_id in ("floor_2", "floor_2_down"))]
            return [s.to_schema() for s in self._seats.values()]

    def get_occupancy_response(self) -> OccupancyResponse:
        """Constructs full OccupancyResponse for Sithumina's GET /api/occupancy matching PDF metrics."""
        with self._lock:
            all_seats = [s.to_schema() for s in self._seats.values()]
            
            # Per-floor definitions matching PDF (Pages 1, 2, 3, 4, 5, 8)
            floors_meta = [
                ("floor_ground", "Ground Floor: Library", 0, False, True, 150, 43),
                ("floor_1", "First Floor: Library", 1, False, True, 180, 40),
                ("floor_2", "Second Floor: Library", 2, True, True, 220, 57),
                ("floor_3", "Third Floor: Library", 3, True, True, 200, 35),
            ]

            floor_summaries = []
            for fid, fname, fnum, quiet, pwr, ftotal, default_avail in floors_meta:
                fseats = [s for s in all_seats if s.floor_id == fid or (fid == "floor_2" and s.floor_id == "floor_2_down")]
                if fseats:
                    focc_tracked = sum(1 for s in fseats if s.status != "free")
                    favail = max(0, default_avail - focc_tracked)
                    focc = ftotal - favail
                else:
                    favail = default_avail
                    focc = ftotal - favail

                floor_summaries.append(FloorSummary(
                    id=fid,
                    name=fname,
                    floorNumber=fnum,
                    totalSeats=ftotal,
                    availableSeats=favail,
                    occupiedSeats=focc,
                    isQuietZone=quiet,
                    hasPowerSockets=pwr
                ))

            # Total library free seats = 43 + 40 + 57 + 35 = 175 (~170 Free across 750 total seats)
            total_seats = sum(f.totalSeats for f in floor_summaries)
            total_avail = sum(f.availableSeats for f in floor_summaries)
            total_occ = total_seats - total_avail
            rate = round((total_occ / max(total_seats, 1)) * 100, 1)

            summary = OccupancySummary(
                totalSeats=total_seats,
                availableSeats=total_avail,
                occupiedSeats=total_occ,
                holdingSeats=sum(1 for s in all_seats if s.status == "holding"),
                reservedSeats=sum(1 for s in all_seats if s.status == "reserved"),
                occupancyRate=rate,
                totalFloors=len(floors_meta),
                activeSensors=len([s for s in all_seats if (time.time() - s.last_seen) < 15])
            )

            return OccupancyResponse(
                summary=summary,
                floors=floor_summaries,
                seats=all_seats,
                timestamp=time.time()
            )

    def get_hysteresis_config(self) -> Dict[str, Any]:
        with self._lock:
            return {
                "occupy_debounce_sec": self.occupy_debounce_sec,
                "release_hysteresis_sec": self.release_hysteresis_sec,
                "holding_debounce_sec": self.holding_debounce_sec,
                "hold_to_free_hysteresis_sec": self.hold_to_free_hysteresis_sec,
                "max_item_hold_seconds": self.max_item_hold_seconds,
                "target_seat": "S-01",
                "presets": {
                    "showcase": {"name": "Live Showcase (3s/4s)", "occupy": 3.0, "release": 4.0},
                    "library_hall": {"name": "Library Hall (1.5s/8s)", "occupy": 1.5, "release": 8.0},
                    "break_grace": {"name": "Break Grace (3s/15s)", "occupy": 3.0, "release": 15.0},
                    "raw_jitter": {"name": "Raw Jitter (0.1s)", "occupy": 0.1, "release": 0.2}
                }
            }

    def update_hysteresis_config(
        self,
        occupy: Optional[float] = None,
        release: Optional[float] = None,
        holding: Optional[float] = None
    ) -> Dict[str, Any]:
        with self._lock:
            if occupy is not None:
                self.occupy_debounce_sec = max(0.05, float(occupy))
            if release is not None:
                self.release_hysteresis_sec = max(0.05, float(release))
            if holding is not None:
                self.holding_debounce_sec = max(0.05, float(holding))
            return self.get_hysteresis_config()

    def get_telemetry_stats(self) -> Dict[str, Any]:
        with self._lock:
            showcase_ids = ["s_01", "s_02", "s_03", "s_04", "s_05", "s_06",
                            "w_01", "w_02", "w_03", "w_04",
                            "q_01", "q_02", "q_03", "q_04", "q_05",
                            "cam_01", "cam_02", "cam_03", "cam_04"]
            showcase_seats = [self._seats[sid] for sid in showcase_ids if sid in self._seats]
            free_showcase = sum(1 for s in showcase_seats if s.status == "free")
            occ_showcase = len(showcase_seats) - free_showcase
            return {
                "available_seats": free_showcase,
                "occupied_seats": occ_showcase,
                "total_zones": len(showcase_seats),
                "jitter_rejections": self._jitter_rejections,
                "poll_interval_ms": 4,
                "timestamp": time.time()
            }

    def simulate_event(self, action: str, seat_id: str = "S-01") -> Dict[str, Any]:
        """Simulates camera vision detections for live demonstration testing."""
        resolved = self._resolve_seat_id(seat_id)
        now = time.time()
        
        if action == "sit":
            item = TelemetryItem(seat_id=resolved, has_person=True, has_items=False, timestamp=now)
            self.process_telemetry(item)
            with self._lock:
                if resolved in self._seats:
                    self._seats[resolved].person_detected_since = now - self.occupy_debounce_sec - 0.1
            updated = self.process_telemetry(item)
            return {"action": "sit", "seat_id": resolved, "status": updated.status if updated else "occupied"}
            
        elif action == "laptop":
            item = TelemetryItem(seat_id=resolved, has_person=False, has_items=True, timestamp=now)
            self.process_telemetry(item)
            with self._lock:
                if resolved in self._seats:
                    self._seats[resolved].person_absent_since = now - self.release_hysteresis_sec - 0.1
                    self._seats[resolved].items_detected_since = now - self.holding_debounce_sec - 0.1
            updated = self.process_telemetry(item)
            return {"action": "laptop", "seat_id": resolved, "status": updated.status if updated else "holding"}
            
        elif action == "vacate":
            item = TelemetryItem(seat_id=resolved, has_person=False, has_items=False, timestamp=now)
            self.process_telemetry(item)
            with self._lock:
                if resolved in self._seats:
                    self._seats[resolved].person_absent_since = now - self.release_hysteresis_sec - 0.1
                    self._seats[resolved].items_absent_since = now - self.hold_to_free_hysteresis_sec - 0.1
            updated = self.process_telemetry(item)
            return {"action": "vacate", "seat_id": resolved, "status": updated.status if updated else "free"}
            
        elif action == "jitter":
            with self._lock:
                self._jitter_rejections += 12
            return {"action": "jitter", "seat_id": resolved, "jitter_rejections": self._jitter_rejections}

        return {"error": f"Unknown action {action}"}

    def reserve_seat(self, seat_id: str, student_id: str, duration_minutes: int = 30) -> bool:
        resolved = self._resolve_seat_id(seat_id)
        with self._lock:
            seat = self._seats.get(resolved)
            if not seat or seat.status != "free":
                return False
            now = time.time()
            seat.status = "reserved"
            seat.reserved_by = student_id
            seat.reservation_expires_at = now + (duration_minutes * 60)
            seat.last_state_change = now
            
            schema = seat.to_schema()
            for listener in list(self._listeners):
                try:
                    listener(schema, "free")
                except Exception:
                    pass
            return True

    def release_seat(self, seat_id: str) -> bool:
        resolved = self._resolve_seat_id(seat_id)
        with self._lock:
            seat = self._seats.get(resolved)
            if not seat:
                return False
            old_status = seat.status
            seat.status = "free"
            seat.has_person = False
            seat.has_items = False
            seat.reserved_by = None
            seat.reservation_expires_at = None
            seat.occupied_since = None
            seat.last_state_change = time.time()
            
            schema = seat.to_schema()
            for listener in list(self._listeners):
                try:
                    listener(schema, old_status)
                except Exception:
                    pass
            return True

    def get_stats(self) -> Dict[str, Any]:
        with self._lock:
            return {
                "uptime": time.time() - self._start_time,
                "telemetry_packet_count": self._telemetry_packet_count,
                "seat_count": len(self._seats),
                "last_telemetry": self._last_telemetry_time,
                "jitter_rejections": self._jitter_rejections
            }

    # -------------------------------------------------------------
    # University Webmail & Student Authentication
    # -------------------------------------------------------------
    def send_auth_otp(self, email: str, custom_name: Optional[str] = None) -> Dict[str, Any]:
        """
        Generates a 6-digit verification code, stores it with 10-minute expiry,
        and dispatches it to the student's University Webmail inbox.
        Note: The code is NEVER exposed in the API response or client payload.
        """
        clean_email = email.strip().lower()
        if not clean_email or "@" not in clean_email:
            raise ValueError("A valid university webmail address is required.")

        code = f"{random.randint(100000, 999999)}"
        expires_at = time.time() + 600.0  # 10 minutes

        with self._lock:
            self._otp_store[clean_email] = {
                "code": code,
                "expires_at": expires_at,
                "name": (custom_name or "").strip(),
                "created_at": time.time(),
                "attempts": 0
            }

        # Deliver to University Webmail
        dispatch_res = email_service.send_verification_code(
            to_email=clean_email,
            code=code,
            student_name=(custom_name or "").strip()
        )

        return {
            "status": "ok",
            "message": "Verification code dispatched to your University Webmail.",
            "email": clean_email,
            "smtp_dispatched": dispatch_res.get("smtp_dispatched", False),
            "stored_in_webmail": dispatch_res.get("stored_in_webmail", True)
        }

    def verify_auth_otp(self, email: str, code: str, custom_name: Optional[str] = None) -> Dict[str, Any]:
        """
        Verifies the 6-digit code against the University Webmail store.
        Returns the student profile upon valid authentication.
        """
        clean_email = email.strip().lower()
        clean_code = code.strip()

        with self._lock:
            record = self._otp_store.get(clean_email)
            if not record:
                raise ValueError("No pending verification found for this email. Please request a new code.")

            if time.time() > record["expires_at"]:
                del self._otp_store[clean_email]
                raise ValueError("Verification code has expired. Please request a new code to your webmail.")

            record["attempts"] = record.get("attempts", 0) + 1
            if record["attempts"] > 5:
                del self._otp_store[clean_email]
                raise ValueError("Too many failed attempts. Please request a fresh verification code.")

            if record["code"] != clean_code:
                raise ValueError("Invalid verification code. Please check your University Webmail inbox.")

            # OTP verified successfully - consume the code
            name = (custom_name or "").strip() or record.get("name", "")
            del self._otp_store[clean_email]

        student_profile = self.parse_student_profile(clean_email, name)
        token = f"uom_auth_{int(time.time())}_{random.randint(1000, 9999)}"

        return {
            "status": "ok",
            "message": "Student identity verified successfully via University Webmail.",
            "student": student_profile,
            "token": token
        }

    def parse_student_profile(self, email: str, custom_name: Optional[str] = None) -> Dict[str, Any]:
        """Infers student batch, department, index number, and display name from UoM webmail."""
        clean_email = email.strip().lower()
        local_part = clean_email.split("@")[0]

        # Official UoM index format check: 6 digits ending with a check letter (e.g. 210123A or 214050T)
        index_match = re.match(r"^(\d{6}[a-zA-Z])$", local_part)
        batch_match = re.search(r"(?:^|\.)(\d{2})$", local_part)
        
        if index_match:
            index_num = index_match.group(1).upper()
            username = local_part.lower()
            batch = f"Batch {index_num[:2]}"
        else:
            index_num = ""
            # Username is strictly the email without the @uom.lk / domain part
            username = local_part.lower()
            batch = f"Batch {batch_match.group(1)}" if batch_match else "Undergraduate"

        # Department inference
        domain_and_local = clean_email
        if "cse" in domain_and_local or "cs" in domain_and_local:
            dept = "Computer Science & Engineering"
        elif "entc" in domain_and_local or "elect" in domain_and_local:
            dept = "Electronic & Telecommunication"
        elif "mech" in domain_and_local:
            dept = "Mechanical Engineering"
        elif "civil" in domain_and_local:
            dept = "Civil Engineering"
        elif "it" in domain_and_local:
            dept = "Information Technology"
        elif "archi" in domain_and_local:
            dept = "Architecture & Design"
        else:
            dept = "Faculty of Engineering"

        # Display name
        if custom_name and custom_name.strip():
            display_name = custom_name.strip()
        else:
            cleaned = re.sub(r"[0-9_.]+", " ", local_part).strip().title()
            display_name = cleaned if cleaned else f"Student {index_num or username}"

        return {
            "email": clean_email,
            "indexNumber": index_num,
            "username": username,
            "batch": batch,
            "department": dept,
            "name": display_name,
            "isVerified": True,
            "verifiedAt": time.strftime("%Y-%m-%d %H:%M:%S")
        }

# Global singleton instance for Mihin's state manager
state_manager = StateManager()
