# -*- coding: utf-8 -*-
import os
import re

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

print("Original code length:", len(code))

# 1. Update blueprintOrigins
orig_lib_def = """    blueprintOrigins: [
        { id: 'orig_lib', name: 'Central Library Plaza (My Location)', y: 1667, x: 3680 },
        { id: 'gate_katubedda', name: 'Katubedda Main Entrance Gate', y: 317, x: 2200 },
        { id: 'dept_arch', name: 'Architecture Building (My Location)', y: 1967, x: 3500 },
        { id: 'bldg_sumanadasa', name: 'Sumanadasa Building', y: 1717, x: 2050 },
        { id: 'floor_ground', name: 'Central Library Plaza', y: 1667, x: 3680 },
        { id: 'dept_it', name: 'Faculty of IT (Phase I & II)', y: 3017, x: 3300 },
        { id: 'canteen_l', name: 'L-Block & Sentra Court', y: 2817, x: 2650 },
        { id: 'facility_gym', name: 'Gymnasium & Sports Ground', y: 2317, x: 1850 },
        { id: 'atm_boc', name: 'Main Administration Building', y: 1267, x: 3350 }
    ],"""

code = re.sub(r'blueprintOrigins:\s*\[[\s\S]*?\],', orig_lib_def, code, count=1)

# 2. Update seatsByFloor with detailed CAD seats for all 4 floors
new_seats_by_floor = """    // 2D Floor Plan Seats Layout Coordinates (per floor matching PDF architectural blueprints)
    seatsByFloor: {
        floor_1: [
            // Discussion Room (4 seats)
            { id: 's_f1_d01', seatNumber: 'D-01', x: 400, y: 92, status: 'occupied', section: 'Discussion Room', powerOutlet: true },
            { id: 's_f1_d02', seatNumber: 'D-02', x: 444, y: 92, status: 'occupied', section: 'Discussion Room', powerOutlet: true },
            { id: 's_f1_d03', seatNumber: 'D-03', x: 400, y: 122, status: 'occupied', section: 'Discussion Room', powerOutlet: true },
            { id: 's_f1_d04', seatNumber: 'D-04', x: 444, y: 122, status: 'occupied', section: 'Discussion Room', powerOutlet: true },

            // Computer Laboratory (8 PC workstations)
            { id: 's_f1_pc01', seatNumber: 'PC-1', x: 532, y: 86, status: 'free', section: 'Computer Laboratory', powerOutlet: true },
            { id: 's_f1_pc02', seatNumber: 'PC-2', x: 572, y: 86, status: 'free', section: 'Computer Laboratory', powerOutlet: true },
            { id: 's_f1_pc03', seatNumber: 'PC-3', x: 612, y: 86, status: 'free', section: 'Computer Laboratory', powerOutlet: true },
            { id: 's_f1_pc04', seatNumber: 'PC-4', x: 652, y: 86, status: 'free', section: 'Computer Laboratory', powerOutlet: true },
            { id: 's_f1_pc05', seatNumber: 'PC-5', x: 532, y: 123, status: 'free', section: 'Computer Laboratory', powerOutlet: true },
            { id: 's_f1_pc06', seatNumber: 'PC-6', x: 572, y: 123, status: 'free', section: 'Computer Laboratory', powerOutlet: true },
            { id: 's_f1_pc07', seatNumber: 'PC-7', x: 612, y: 123, status: 'free', section: 'Computer Laboratory', powerOutlet: true },
            { id: 's_f1_pc08', seatNumber: 'PC-8', x: 652, y: 123, status: 'free', section: 'Computer Laboratory', powerOutlet: true },

            // Main Study Areas (6 Tables, 4-6 seats each)
            { id: 's_f1_t1_01', seatNumber: '01', x: 520, y: 304, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t1_02', seatNumber: '02', x: 550, y: 304, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t1_03', seatNumber: '03', x: 520, y: 330, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t1_04', seatNumber: '04', x: 550, y: 330, status: 'free', section: 'Main Study Areas', powerOutlet: true },

            { id: 's_f1_t2_01', seatNumber: '05', x: 590, y: 304, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t2_02', seatNumber: '06', x: 620, y: 304, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t2_03', seatNumber: '07', x: 590, y: 330, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t2_04', seatNumber: '08', x: 620, y: 330, status: 'free', section: 'Main Study Areas', powerOutlet: true },

            { id: 's_f1_t3_01', seatNumber: '09', x: 660, y: 304, status: 'free', section: 'Main Study Areas', powerOutlet: false },
            { id: 's_f1_t3_02', seatNumber: '10', x: 690, y: 304, status: 'free', section: 'Main Study Areas', powerOutlet: false },
            { id: 's_f1_t3_03', seatNumber: '11', x: 660, y: 330, status: 'free', section: 'Main Study Areas', powerOutlet: false },
            { id: 's_f1_t3_04', seatNumber: '12', x: 690, y: 330, status: 'free', section: 'Main Study Areas', powerOutlet: false },

            { id: 's_f1_t4_01', seatNumber: '13', x: 520, y: 364, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t4_02', seatNumber: '14', x: 550, y: 364, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t4_03', seatNumber: '15', x: 520, y: 390, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t4_04', seatNumber: '16', x: 550, y: 390, status: 'free', section: 'Main Study Areas', powerOutlet: true },

            { id: 's_f1_t5_01', seatNumber: '17', x: 590, y: 364, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t5_02', seatNumber: '18', x: 620, y: 364, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t5_03', seatNumber: '19', x: 590, y: 390, status: 'free', section: 'Main Study Areas', powerOutlet: true },
            { id: 's_f1_t5_04', seatNumber: '20', x: 620, y: 390, status: 'free', section: 'Main Study Areas', powerOutlet: true },

            { id: 's_f1_t6_01', seatNumber: '21', x: 660, y: 364, status: 'free', section: 'Main Study Areas', powerOutlet: false },
            { id: 's_f1_t6_02', seatNumber: '22', x: 690, y: 364, status: 'free', section: 'Main Study Areas', powerOutlet: false },
            { id: 's_f1_t6_03', seatNumber: '23', x: 660, y: 390, status: 'free', section: 'Main Study Areas', powerOutlet: false },
            { id: 's_f1_t6_04', seatNumber: '24', x: 690, y: 390, status: 'free', section: 'Main Study Areas', powerOutlet: false },

            // Permanent Reference (4 seats)
            { id: 's_f1_pr01', seatNumber: 'P-1', x: 445, y: 405, status: 'free', section: 'Permanent Reference', powerOutlet: true },
            { id: 's_f1_pr02', seatNumber: 'P-2', x: 470, y: 405, status: 'free', section: 'Permanent Reference', powerOutlet: true },
            { id: 's_f1_pr03', seatNumber: 'P-3', x: 445, y: 418, status: 'free', section: 'Permanent Reference', powerOutlet: true },
            { id: 's_f1_pr04', seatNumber: 'P-4', x: 470, y: 418, status: 'free', section: 'Permanent Reference', powerOutlet: true }
        ],
        floor_3: [
            // Study Area Top Left (4 seats)
            { id: 's_f3_st01', seatNumber: 'S-1', x: 445, y: 80, status: 'free', section: 'Study Area Top', powerOutlet: true },
            { id: 's_f3_st02', seatNumber: 'S-2', x: 475, y: 80, status: 'free', section: 'Study Area Top', powerOutlet: true },
            { id: 's_f3_st03', seatNumber: 'S-3', x: 445, y: 105, status: 'free', section: 'Study Area Top', powerOutlet: false },
            { id: 's_f3_st04', seatNumber: 'S-4', x: 475, y: 105, status: 'free', section: 'Study Area Top', powerOutlet: false },

            // Lending Library Upper Stacks (8 seats)
            { id: 's_f3_lu01', seatNumber: 'L-1', x: 550, y: 92, status: 'free', section: 'Lending Upper', powerOutlet: true },
            { id: 's_f3_lu02', seatNumber: 'L-2', x: 620, y: 92, status: 'free', section: 'Lending Upper', powerOutlet: true },
            { id: 's_f3_lu03', seatNumber: 'L-3', x: 710, y: 92, status: 'free', section: 'Lending Upper', powerOutlet: true },
            { id: 's_f3_lu04', seatNumber: 'L-4', x: 790, y: 92, status: 'free', section: 'Lending Upper', powerOutlet: true },
            { id: 's_f3_lu05', seatNumber: 'L-5', x: 550, y: 138, status: 'free', section: 'Lending Upper', powerOutlet: true },
            { id: 's_f3_lu06', seatNumber: 'L-6', x: 620, y: 138, status: 'free', section: 'Lending Upper', powerOutlet: true },
            { id: 's_f3_lu07', seatNumber: 'L-7', x: 710, y: 138, status: 'free', section: 'Lending Upper', powerOutlet: true },
            { id: 's_f3_lu08', seatNumber: 'L-8', x: 790, y: 138, status: 'free', section: 'Lending Upper', powerOutlet: true },

            // Central Open Atrium Corner Seats (4 seats)
            { id: 's_f3_at01', seatNumber: 'A-1', x: 465, y: 198, status: 'free', section: 'Central Atrium', powerOutlet: true },
            { id: 's_f3_at02', seatNumber: 'A-2', x: 650, y: 198, status: 'free', section: 'Central Atrium', powerOutlet: true },
            { id: 's_f3_at03', seatNumber: 'A-3', x: 465, y: 270, status: 'free', section: 'Central Atrium', powerOutlet: true },
            { id: 's_f3_at04', seatNumber: 'A-4', x: 650, y: 270, status: 'free', section: 'Central Atrium', powerOutlet: true },

            // Study Area Mid/Low Right
            { id: 's_f3_sm01', seatNumber: 'M-1', x: 705, y: 215, status: 'free', section: 'Study Area Mid', powerOutlet: true },
            { id: 's_f3_sm02', seatNumber: 'M-2', x: 730, y: 215, status: 'free', section: 'Study Area Mid', powerOutlet: true },
            { id: 's_f3_sl01', seatNumber: 'W-1', x: 705, y: 278, status: 'free', section: 'Study Area Low', powerOutlet: false },
            { id: 's_f3_sl02', seatNumber: 'W-2', x: 730, y: 278, status: 'free', section: 'Study Area Low', powerOutlet: false },

            // OPAC Catalogue (2 terminals)
            { id: 's_f3_op01', seatNumber: 'O-1', x: 545, y: 342, status: 'free', section: 'OPAC Catalogue', powerOutlet: true },
            { id: 's_f3_op02', seatNumber: 'O-2', x: 575, y: 342, status: 'free', section: 'OPAC Catalogue', powerOutlet: true },

            // Lending Library Lower (6 seats)
            { id: 's_f3_ll01', seatNumber: 'LL-1', x: 640, y: 370, status: 'free', section: 'Lending Lower', powerOutlet: true },
            { id: 's_f3_ll02', seatNumber: 'LL-2', x: 700, y: 370, status: 'free', section: 'Lending Lower', powerOutlet: true },
            { id: 's_f3_ll03', seatNumber: 'LL-3', x: 760, y: 370, status: 'free', section: 'Lending Lower', powerOutlet: true }
        ],
        floor_ground: [
            // Central Study Commons & Stacks (12 seats)
            { id: 's_fg_c01', seatNumber: 'G-01', x: 560, y: 167, status: 'free', section: 'Central Study Commons', powerOutlet: true },
            { id: 's_fg_c02', seatNumber: 'G-02', x: 585, y: 167, status: 'free', section: 'Central Study Commons', powerOutlet: true },
            { id: 's_fg_c03', seatNumber: 'G-03', x: 630, y: 167, status: 'free', section: 'Central Study Commons', powerOutlet: true },
            { id: 's_fg_c04', seatNumber: 'G-04', x: 655, y: 167, status: 'free', section: 'Central Study Commons', powerOutlet: true },

            { id: 's_fg_c05', seatNumber: 'G-05', x: 560, y: 225, status: 'free', section: 'Central Study Commons', powerOutlet: true },
            { id: 's_fg_c06', seatNumber: 'G-06', x: 585, y: 225, status: 'free', section: 'Central Study Commons', powerOutlet: true },
            { id: 's_fg_c07', seatNumber: 'G-07', x: 630, y: 225, status: 'free', section: 'Central Study Commons', powerOutlet: true },
            { id: 's_fg_c08', seatNumber: 'G-08', x: 655, y: 225, status: 'free', section: 'Central Study Commons', powerOutlet: true },

            // AQ Section (4 seats)
            { id: 's_fg_aq01', seatNumber: 'AQ-1', x: 515, y: 330, status: 'free', section: 'AQ Section', powerOutlet: true },
            { id: 's_fg_aq02', seatNumber: 'AQ-2', x: 555, y: 330, status: 'free', section: 'AQ Section', powerOutlet: true },

            // TS Section (1 red seat)
            { id: 's_fg_ts01', seatNumber: 'TS-1', x: 690, y: 325, status: 'occupied', section: 'TS Section', powerOutlet: true }
        ],
        floor_2: [
            // Upper Study Hall (8 Large Tables, 4 seats each)
            { id: 's_f2_u01', seatNumber: 'U-01', x: 395, y: 100, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u02', seatNumber: 'U-02', x: 415, y: 100, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u03', seatNumber: 'U-03', x: 395, y: 122, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u04', seatNumber: 'U-04', x: 415, y: 122, status: 'free', section: 'Upper Study Hall', powerOutlet: true },

            { id: 's_f2_u05', seatNumber: 'U-05', x: 455, y: 100, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u06', seatNumber: 'U-06', x: 475, y: 100, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u07', seatNumber: 'U-07', x: 455, y: 122, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u08', seatNumber: 'U-08', x: 475, y: 122, status: 'free', section: 'Upper Study Hall', powerOutlet: true },

            { id: 's_f2_u09', seatNumber: 'U-09', x: 515, y: 100, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u10', seatNumber: 'U-10', x: 535, y: 100, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u11', seatNumber: 'U-11', x: 515, y: 122, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u12', seatNumber: 'U-12', x: 535, y: 122, status: 'free', section: 'Upper Study Hall', powerOutlet: true },

            { id: 's_f2_u13', seatNumber: 'U-13', x: 575, y: 100, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u14', seatNumber: 'U-14', x: 595, y: 100, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u15', seatNumber: 'U-15', x: 575, y: 122, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u16', seatNumber: 'U-16', x: 595, y: 122, status: 'free', section: 'Upper Study Hall', powerOutlet: true },

            { id: 's_f2_u17', seatNumber: 'U-17', x: 395, y: 160, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u18', seatNumber: 'U-18', x: 415, y: 160, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u19', seatNumber: 'U-19', x: 395, y: 182, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u20', seatNumber: 'U-20', x: 415, y: 182, status: 'free', section: 'Upper Study Hall', powerOutlet: true },

            { id: 's_f2_u21', seatNumber: 'U-21', x: 455, y: 160, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u22', seatNumber: 'U-22', x: 475, y: 160, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u23', seatNumber: 'U-23', x: 455, y: 182, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u24', seatNumber: 'U-24', x: 475, y: 182, status: 'free', section: 'Upper Study Hall', powerOutlet: true },

            { id: 's_f2_u25', seatNumber: 'U-25', x: 515, y: 160, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u26', seatNumber: 'U-26', x: 535, y: 160, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u27', seatNumber: 'U-27', x: 515, y: 182, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u28', seatNumber: 'U-28', x: 535, y: 182, status: 'free', section: 'Upper Study Hall', powerOutlet: true },

            { id: 's_f2_u29', seatNumber: 'U-29', x: 575, y: 160, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u30', seatNumber: 'U-30', x: 595, y: 160, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u31', seatNumber: 'U-31', x: 575, y: 182, status: 'free', section: 'Upper Study Hall', powerOutlet: true },
            { id: 's_f2_u32', seatNumber: 'U-32', x: 595, y: 182, status: 'free', section: 'Upper Study Hall', powerOutlet: true },

            // Computer Lab (CAM-01 to CAM-04)
            { id: 's_f2_cam01', seatNumber: 'C-1', x: 385, y: 345, status: 'free', section: 'Computer Lab', powerOutlet: true },
            { id: 's_f2_cam02', seatNumber: 'C-2', x: 410, y: 345, status: 'free', section: 'Computer Lab', powerOutlet: true },
            { id: 's_f2_cam03', seatNumber: 'C-3', x: 435, y: 345, status: 'free', section: 'Computer Lab', powerOutlet: true },
            { id: 's_f2_cam04', seatNumber: 'C-4', x: 455, y: 345, status: 'free', section: 'Computer Lab', powerOutlet: true },

            // Lower Study Area (4 seats)
            { id: 's_f2_ls01', seatNumber: 'S-1', x: 710, y: 345, status: 'free', section: 'Lower Study Area', powerOutlet: true },
            { id: 's_f2_ls02', seatNumber: 'S-2', x: 735, y: 345, status: 'free', section: 'Lower Study Area', powerOutlet: true },
            { id: 's_f2_ls03', seatNumber: 'S-3', x: 760, y: 345, status: 'free', section: 'Lower Study Area', powerOutlet: true },
            { id: 's_f2_ls04', seatNumber: 'S-4', x: 785, y: 345, status: 'free', section: 'Lower Study Area', powerOutlet: true }
        ],
        // Legacy keys mapped for compatibility
        floor_2_down: [],
        floor_1_down: []
    },"""

code = re.sub(r'// 2D Floor Plan Seats Layout Coordinates \(per floor\)[\s\S]*?seatsByFloor:\s*\{[\s\S]*?historicalProfiles:', new_seats_by_floor + "\n\n    // Historical Time-Series Profiles (8 AM to 8 PM)\n    historicalProfiles:", code, count=1)

# 3. Update AppState definition
new_app_state = """const AppState = {
    currentTab: 'home',
    theme: localStorage.getItem('spacepulse_theme') || 'light',
    simulationActive: true,
    mapsSubTab: 'floorplans', // 'infrastructure' or 'floorplans'
    selectedFloorId: 'floor_1',
    seatFilter: 'all', // 'all', 'free', 'occupied', 'power'
    favorites: JSON.parse(localStorage.getItem('spacepulse_favs') || '["floor_ground", "canteen_goda"]'),
    alerts: JSON.parse(localStorage.getItem('spacepulse_alerts') || '[]'),
    activeReservation: JSON.parse(localStorage.getItem('spacepulse_reservation') || 'null'),
    reservationTimerInterval: null,
    selectedOrigin: 'orig_lib',
    selectedDestination: 'canteen_goda',
    selectedSpeed: 4.5, // km/h
    searchQuery: '',
    selectedCategory: 'all',
    geminiApiKey: localStorage.getItem('spacepulse_gemini_key') || '',
    activeChart: null,
    leafletMap: null,
    currentTrendsProfile: 'weekday',

    // Official CAD Infrastructure Map State
    blueprintCategory: 'all',
    blueprintSearchQuery: '',
    blueprintShowZones: true,
    blueprintContrastMode: 'auto',
    selectedBlueprintOrigin: 'orig_lib',
    selectedBlueprintDestination: 'canteen_goda',
    blueprintMap: null,
    blueprintMarkers: [],
    blueprintRouteLayer: null,
    blueprintZonesLayer: null,
    blueprintImageLayer: null,

    // UoM Student Profile & Authentication - Default to Verified student Kavindu Dilupa
    currentStudent: JSON.parse(localStorage.getItem('spacepulse_student_profile') || 'null') || {
        email: '210123A@uom.lk',
        indexNumber: '210123A',
        name: 'Kavindu Dilupa',
        department: 'Computer Science & Engineering',
        batch: 'Batch 21',
        isVerified: true
    },
    pendingOtpEmail: null,
    pendingOtpCode: null,
    pendingOtpCustomName: null,
    isEnteringOtp: false,

    // SpacePulse Live Telemetry & Kiosk (Page 11) State
    kioskClockInterval: null,
    kioskPollInterval: null,
    kioskState: {
        debounceSec: 2.0,
        graceSec: 4.0,
        availableSeats: 19,
        occupiedSeats: 0,
        jitterRejections: 0,
        pollIntervalMs: 4,
        activePreset: 'showcase',
        backendConnected: true,
        zones: [
            { id: 'S-01', name: 'S-01', status: 'free' },
            { id: 'S-02', name: 'S-02', status: 'free' },
            { id: 'S-03', name: 'S-03', status: 'free' },
            { id: 'S-04', name: 'S-04', status: 'free' },
            { id: 'S-05', name: 'S-05', status: 'free' },
            { id: 'S-06', name: 'S-06', status: 'free' },
            { id: 'W-01', name: 'W-01', status: 'free' },
            { id: 'W-02', name: 'W-02', status: 'free' },
            { id: 'W-03', name: 'W-03', status: 'free' },
            { id: 'W-04', name: 'W-04', status: 'free' },
            { id: 'Q-01', name: 'Q-01', status: 'free' },
            { id: 'Q-02', name: 'Q-02', status: 'free' },
            { id: 'Q-03', name: 'Q-03', status: 'free' },
            { id: 'Q-04', name: 'Q-04', status: 'free' },
            { id: 'Q-05', name: 'Q-05', status: 'free' },
            { id: 'CAM-01', name: 'CAM-01', status: 'free' },
            { id: 'CAM-02', name: 'CAM-02', status: 'free' },
            { id: 'CAM-03', name: 'CAM-03', status: 'free' },
            { id: 'CAM-04', name: 'CAM-04', status: 'free' }
        ]
    }
};"""

code = re.sub(r'const AppState = \{[\s\S]*?\n\};', new_app_state, code, count=1)

print("Blueprint and AppState updated successfully.")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)
