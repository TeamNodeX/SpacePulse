from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time

app = FastAPI(title="SpacePulse API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Updated to match Sithumina's exact frontend data structure
current_state = {
    "library": [
        { "floor": "Second Down Floor", "totalSeats": 100, "availableSeats": 45 },
        { "floor": "First Down Floor", "totalSeats": 150, "availableSeats": 10 },
        { "floor": "Ground Floor", "totalSeats": 200, "availableSeats": 120 },
        { "floor": "First Floor", "totalSeats": 120, "availableSeats": 5 }
    ],
    "canteen": [
        { "name": "Goda Uda", "status": "Open", "personCount": 45, "maxCapacity": 100 },
        { "name": "Goda Yata", "status": "Open", "personCount": 85, "maxCapacity": 120 },
        { "name": "Wala Canteen", "status": "Closed", "personCount": 0, "maxCapacity": 150 },
        { "name": "L Canteen", "status": "Open", "personCount": 120, "maxCapacity": 200 },
        { "name": "Civil Canteen", "status": "Open", "personCount": 30, "maxCapacity": 80 }
    ],
    "atm": [
        { "name": "BOC ATM", "status": "Working", "queueLength": 5 },
        { "name": "Peoples Bank ATM", "status": "Working", "queueLength": 2 },
        { "name": "Commercial Bank ATM", "status": "Out of Order", "queueLength": 0 }
    ],
    "bookshop": [
        { "name": "Main Book Shop", "status": "Open", "crowdedness": "High" },
        { "name": "Engineering Book Shop", "status": "Open", "crowdedness": "Low" },
        { "name": "Science Book Shop", "status": "Closed", "crowdedness": "None" }
    ]
}

@app.get("/api/occupancy")
def get_occupancy():
    return current_state

# Defines what the camera's JSON payload should look like
class CameraPayload(BaseModel):
    canteen_name: str
    person_count: int

# Mihin's temporal hysteresis tracker
state_tracker = {}

@app.post("/api/telemetry")
def update_telemetry(payload: CameraPayload):
    """Accepts spatial telemetry data and applies a 3-second temporal hysteresis delay."""
    canteen_name = payload.canteen_name
    detected_count = payload.person_count
    current_time = time.time()

    # Initialize tracker if it is the first time seeing this canteen
    if canteen_name not in state_tracker:
        state_tracker[canteen_name] = {"pending_count": detected_count, "time_detected": current_time}
    
    tracker = state_tracker[canteen_name]

    # If the camera detects a count different from what we are currently tracking
    if detected_count != tracker["pending_count"]:
        # The camera saw a change (potential flicker) - reset the timer
        tracker["pending_count"] = detected_count
        tracker["time_detected"] = current_time
        return {"message": f"New count detected for {canteen_name}. Timer reset."}
    else:
        # The count has remained the same. Check if 3 seconds have passed.
        if current_time - tracker["time_detected"] >= 3.0:
            # Officially update the frontend state
            for canteen in current_state["canteen"]:
                if canteen["name"] == canteen_name:
                    canteen["personCount"] = detected_count
                    return {"message": f"Threshold reached. Updated {canteen_name} to {detected_count} people."}
        
    return {"message": f"Tracking {detected_count}. Waiting for 3-second threshold..."}