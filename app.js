/**
 * SpacePulse - University Vacancy Tracker & Live University Telemetry
 * Complete Client-side Application Logic
 * Team NodeX - University of Moratuwa
 */

// ==========================================================================
// 1. Core Data Models (Mirroring SpacePulse-MobileApp)
// ==========================================================================

const spacePulseData = {
    libraryFloors: [
        {
            id: 'floor_ground',
            floor: 'Ground Floor: Library',
            totalSeats: 150,
            availableSeats: 43,
            hasPowerOutlets: true,
            isQuietZone: false,
            highSpeedWifi: true,
            landmark: 'AQ Section, Technical Services, Staff Rooms & Central Stacks',
            tags: ['#Power Outlets', '#5G WiFi'],
            image: 'assets/images/library.jpg'
        },
        {
            id: 'floor_1',
            floor: 'First Floor: Library',
            totalSeats: 180,
            availableSeats: 40,
            hasPowerOutlets: true,
            isQuietZone: false,
            highSpeedWifi: true,
            landmark: 'Computer Laboratory, Discussion Room & Main Study Areas',
            tags: ['#Power Outlets', '#5G WiFi'],
            image: 'assets/images/library.jpg'
        },
        {
            id: 'floor_2',
            floor: 'Second Floor: Library',
            totalSeats: 220,
            availableSeats: 57,
            hasPowerOutlets: true,
            isQuietZone: true,
            highSpeedWifi: true,
            landmark: 'Upper Study Area, Computer Lab, Reader Services & Main Entrance',
            tags: ['#Silent Zone', '#Power Outlets', '#5G WiFi'],
            image: 'assets/images/library.jpg'
        },
        {
            id: 'floor_3',
            floor: 'Third Floor: Library',
            totalSeats: 200,
            availableSeats: 35,
            hasPowerOutlets: true,
            isQuietZone: true,
            highSpeedWifi: true,
            landmark: 'Lending Library Collections, Central Atrium & OPAC Terminals',
            tags: ['#Silent Zone', '#Power Outlets', '#5G WiFi'],
            image: 'assets/images/library.jpg'
        }
    ],

    canteens: [
        {
            id: 'canteen_goda',
            name: 'Goda Canteen',
            status: 'Open',
            personCount: 66,
            maxCapacity: 150,
            location: 'Student Centre Complex',
            queueTimeMinutes: 8,
            specialties: 'Sri Lankan Buffet, Fresh Juices, Shorties',
            tags: ['Sri Lankan Buffet', 'Fresh Juices', 'Shorties'],
            image: 'assets/images/canteen.jpg'
        },
        {
            id: 'canteen_wala',
            name: 'Wala Canteen',
            status: 'Open',
            personCount: 40,
            maxCapacity: 150,
            location: 'Wala Open Amphitheater Area',
            queueTimeMinutes: 5,
            specialties: 'Breakfast & Lunch Packets, Tea & Snacks',
            tags: ['Breakfast & Lunch Packets', 'Tea & Snacks'],
            image: 'assets/images/canteen.jpg'
        },
        {
            id: 'canteen_l',
            name: 'L Canteen',
            status: 'Open',
            personCount: 110,
            maxCapacity: 200,
            location: 'Sentra Court Area',
            queueTimeMinutes: 13,
            specialties: 'Bakery Items, Coffee, Full Meals',
            tags: ['Bakery Items', 'Coffee', 'Full Meals'],
            image: 'assets/images/canteen.jpg'
        }
    ],

    atms: [
        {
            id: 'atm_boc',
            name: 'BOC ATM',
            bankName: 'Bank of Ceylon',
            status: 'Working',
            queueLength: 4,
            queuePersons: 4,
            estimatedWaitMins: 12,
            location: 'Main Administrative Building Entrance',
            hasCash: true,
            image: 'assets/images/atm.jpg'
        }
    ],

    bookshops: [
        {
            id: 'bookshop_main',
            name: 'Main Book Shop',
            status: 'Open',
            crowdedness: 'High',
            location: 'Student Center Ground Floor',
            services: ['Textbooks', 'Photocopying', 'Binding', 'Art Supplies'],
            image: 'assets/images/bookshop.jpg'
        },
        {
            id: 'bookshop_engineering',
            name: 'Engineering Book Shop',
            status: 'Open',
            crowdedness: 'Low',
            location: 'Engineering Complex Hub',
            services: ['Calculators', 'Lab Manuals', 'Engineering Instruments'],
            image: 'assets/images/bookshop.jpg'
        },
        {
            id: 'bookshop_science',
            name: 'Science Book Shop',
            status: 'Closed',
            crowdedness: 'None',
            location: 'Science Complex Lane',
            services: ['Stationery', 'Printing'],
            image: 'assets/images/bookshop.jpg'
        }
    ],

    // University GPS Nodes for OpenStreetMap (University of Moratuwa)
    universityGpsNodes: [
        { id: 'floor_ground', name: 'Central Library', category: 'library', lat: 6.7953420, lng: 79.9010599, landmark: 'Central Academic Core' },
        { id: 'canteen_goda_uda', name: 'Goda Uda Canteen', category: 'canteen', lat: 6.7964500, lng: 79.9001536, landmark: 'Student Centre (Upper Level)' },
        { id: 'canteen_goda_yata', name: 'Goda Yata Canteen', category: 'canteen', lat: 6.7963658, lng: 79.9002200, landmark: 'Student Centre (Ground Level)' },
        { id: 'canteen_wala', name: 'Wala Canteen', category: 'canteen', lat: 6.7969319, lng: 79.8995506, landmark: 'Open Air Amphitheatre ("Wala")' },
        { id: 'canteen_l', name: 'L Canteen (C3)', category: 'canteen', lat: 6.7966000, lng: 79.9012000, landmark: 'Sentra Court / L-Block' },
        { id: 'canteen_civil', name: 'Civil Canteen', category: 'canteen', lat: 6.7961000, lng: 79.8990000, landmark: 'Civil Engineering Complex' },
        { id: 'atm_boc', name: 'Bank of Ceylon ATM', category: 'atm', lat: 6.7982000, lng: 79.9016500, landmark: 'Main Gate & Old Gym Entrance' },
        { id: 'atm_peoples', name: "People's Bank ATM", category: 'atm', lat: 6.7983500, lng: 79.9017500, landmark: 'Main Gate Front Area' },
        { id: 'atm_commercial', name: 'Commercial Bank ATM', category: 'atm', lat: 6.7978000, lng: 79.9012000, landmark: 'Administrative Access Road' },
        { id: 'bookshop_main', name: 'Student Center Bookshop', category: 'bookshop', lat: 6.7963800, lng: 79.9003500, landmark: 'WUS Welfare Centre' },
        { id: 'bookshop_engineering', name: 'Engineering Bookshop', category: 'bookshop', lat: 6.7971000, lng: 79.9004000, landmark: 'Engineering Complex Wing' }
    ],

    // University Origin Landmarks for Travel Time HUD
    originPoints: [
        { id: 'orig_arch', name: 'Architecture New Building (My Location)', lat: 6.795800, lng: 79.901800 },
        { id: 'orig_gate', name: 'Main University Gate', lat: 6.798500, lng: 79.901800 },
        { id: 'orig_sentra', name: 'Sentra Court', lat: 6.796500, lng: 79.900800 },
        { id: 'orig_entc', name: 'ENTC Department', lat: 6.795800, lng: 79.902100 },
        { id: 'orig_civil', name: 'Civil Engineering Dept', lat: 6.796000, lng: 79.899100 },
        { id: 'orig_hostel', name: 'University Hostels', lat: 6.799200, lng: 79.899400 },
        { id: 'orig_lib', name: 'Central Library Plaza', lat: 6.795340, lng: 79.901050 }
    ],

    // Official University of Moratuwa CAD Infrastructure Map Data (Scale 1:1000, 7021 x 4967)
    infrastructureMap: {
        width: 7021,
        height: 4967,
        scaleRatio: 5.8, // ~5.8 px = 1 meter on CAD 1:1000 scale
        imageSrc: 'assets/images/uom_infrastructure_map.webp',
        imageFallback: 'assets/images/uom_infrastructure_map.png',
        title: 'University of Moratuwa Map of Infrastructure'
    },

    blueprintNodes: [
        {
            id: 'floor_ground',
            name: 'Central Library',
            category: 'library',
            subtext: '4 Reading Floors • Air-conditioned Stacks & Commons',
            px: 3680, py: 3300, y: 1667, x: 3680,
            zone: 'zone_01', icon: 'fa-book-reader', color: '#10b981',
            badge: '175 Free Seats', isPrimary: true
        },
        {
            id: 'canteen_goda_uda',
            name: 'Goda Uda Canteen',
            category: 'canteen',
            subtext: 'Student Centre Upper Level • Buffet, Juices & Shorties',
            px: 2950, py: 3450, y: 1517, x: 2950,
            zone: 'zone_01', icon: 'fa-utensils', color: '#f59e0b',
            badge: '45 Students', isPrimary: true
        },
        {
            id: 'canteen_goda_yata',
            name: 'Goda Yata Canteen',
            category: 'canteen',
            subtext: 'Student Centre Ground Level • Shorties, Tea & Lunch',
            px: 2920, py: 3500, y: 1467, x: 2920,
            zone: 'zone_01', icon: 'fa-utensils', color: '#ef4444',
            badge: '85 Students', isPrimary: true
        },
        {
            id: 'canteen_l',
            name: 'L Canteen (Sentra Court)',
            category: 'canteen',
            subtext: 'L-Block Dining • Bakery, Coffee & Set Meals',
            px: 2650, py: 2150, y: 2817, x: 2650,
            zone: 'zone_02', icon: 'fa-utensils', color: '#f97316',
            badge: '120 Students', isPrimary: true
        },
        {
            id: 'canteen_wala',
            name: 'Wala Canteen (Amphitheater)',
            category: 'canteen',
            subtext: 'Canteen No 02 • Open Air Amphitheatre',
            px: 1750, py: 3550, y: 1417, x: 1750,
            zone: 'zone_01', icon: 'fa-utensils', color: '#8b5cf6',
            badge: 'Snack Bar', isPrimary: true
        },
        {
            id: 'canteen_civil',
            name: 'Civil Canteen',
            category: 'canteen',
            subtext: 'Civil Engineering Complex Canteen & Snacks',
            px: 2100, py: 3700, y: 1267, x: 2100,
            zone: 'zone_01', icon: 'fa-utensils', color: '#06b6d4',
            badge: '30 Students', isPrimary: true
        },
        {
            id: 'atm_boc',
            name: 'Bank of Ceylon ATM',
            category: 'atm',
            subtext: 'Administration Building Plaza • Fast Cash & CDM',
            px: 3350, py: 3700, y: 1267, x: 3350,
            zone: 'zone_01', icon: 'fa-money-check-dollar', color: '#3b82f6',
            badge: 'Cash OK (5 line)', isPrimary: true
        },
        {
            id: 'atm_peoples',
            name: "People's Bank ATM",
            category: 'atm',
            subtext: 'New Administration Building Entrance',
            px: 3450, py: 3750, y: 1217, x: 3450,
            zone: 'zone_01', icon: 'fa-money-check-dollar', color: '#2563eb',
            badge: 'Cash OK (2 line)', isPrimary: true
        },
        {
            id: 'atm_commercial',
            name: 'Commercial Bank ATM',
            category: 'atm',
            subtext: 'Engineering Faculty Access Road',
            px: 3550, py: 3800, y: 1167, x: 3550,
            zone: 'zone_01', icon: 'fa-money-check-dollar', color: '#64748b',
            badge: 'Out of Order', isPrimary: true
        },
        {
            id: 'bookshop_main',
            name: 'Student Center Bookshop & WUS Welfare',
            category: 'bookshop',
            subtext: 'Textbooks, Stationery, Binding & Xerox',
            px: 2950, py: 3350, y: 1617, x: 2950,
            zone: 'zone_01', icon: 'fa-book-bookmark', color: '#ec4899',
            badge: 'Open Now', isPrimary: true
        },
        {
            id: 'bookshop_engineering',
            name: 'Engineering Bookshop',
            category: 'bookshop',
            subtext: 'Sumanadasa Wing • Technical Drawing Tools',
            px: 2050, py: 3300, y: 1667, x: 2050,
            zone: 'zone_01', icon: 'fa-book-bookmark', color: '#a855f7',
            badge: 'Open Now', isPrimary: true
        },
        {
            id: 'dept_it',
            name: 'Faculty of Information Technology',
            category: 'academic',
            subtext: 'IT Phase I & Phase II Complex • Old IT Building',
            px: 3300, py: 1950, y: 3017, x: 3300,
            zone: 'zone_02', icon: 'fa-laptop-code', color: '#0284c7',
            badge: 'IT Labs', isPrimary: true
        },
        {
            id: 'dept_entc',
            name: 'Dept. of Electronic & Telecommunication (ENTC)',
            category: 'academic',
            subtext: 'ENTC Building • Microelectronics & Robotics Labs',
            px: 3350, py: 2750, y: 2217, x: 3350,
            zone: 'zone_02', icon: 'fa-microchip', color: '#4f46e5',
            badge: 'IoT & Telemetry', isPrimary: true
        },
        {
            id: 'dept_arch',
            name: 'Faculty of Architecture',
            category: 'academic',
            subtext: 'Architecture Extension, Integrated Design & Black Box',
            px: 3500, py: 3000, y: 1967, x: 3500,
            zone: 'zone_02', icon: 'fa-drafting-compass', color: '#7c3aed',
            badge: 'Design Studios', isPrimary: true
        },
        {
            id: 'bldg_sumanadasa',
            name: 'Sumanadasa Building (Engineering Core)',
            category: 'academic',
            subtext: 'Central Engineering Theatres, Dean Office & Depts',
            px: 2050, py: 3250, y: 1717, x: 2050,
            zone: 'zone_01', icon: 'fa-building-columns', color: '#1e3a8a',
            badge: 'Academic Hub', isPrimary: true
        },
        {
            id: 'dept_mech',
            name: 'Dept. of Mechanical Engineering',
            category: 'academic',
            subtext: 'Mechanical Workshops & Drafting Laboratories',
            px: 2100, py: 4100, y: 867, x: 2100,
            zone: 'zone_01', icon: 'fa-gears', color: '#ea580c',
            badge: 'Heavy Labs', isPrimary: true
        },
        {
            id: 'dept_chem',
            name: 'Dept. of Chemical & Process Engineering',
            category: 'academic',
            subtext: 'Process Eng Laboratories & Research Facilities',
            px: 2750, py: 3900, y: 1067, x: 2750,
            zone: 'zone_01', icon: 'fa-flask-vial', color: '#059669',
            badge: 'Process Labs', isPrimary: true
        },
        {
            id: 'dept_textile',
            name: 'Dept. of Textile & Clothing Technology',
            category: 'academic',
            subtext: 'Textile Engineering & Fashion Design Building',
            px: 2300, py: 1900, y: 3067, x: 2300,
            zone: 'zone_03', icon: 'fa-shirt', color: '#db2777',
            badge: 'Fashion Wing', isPrimary: true
        },
        {
            id: 'dept_earth',
            name: 'Dept. of Earth Resources & Material Science',
            category: 'academic',
            subtext: 'Earth Resources, Metallurgy & Rock Mechanics',
            px: 2500, py: 3650, y: 1317, x: 2500,
            zone: 'zone_01', icon: 'fa-mountain', color: '#d97706',
            badge: 'Mining Labs', isPrimary: true
        },
        {
            id: 'dept_civil',
            name: 'Civil Engineering Research Center',
            category: 'academic',
            subtext: 'Civil Labs, Structures & Hydraulic Institute',
            px: 3100, py: 1100, y: 3867, x: 3100,
            zone: 'zone_03', icon: 'fa-trowel-bricks', color: '#0891b2',
            badge: 'Research Labs', isPrimary: true
        },
        {
            id: 'bldg_auditorium',
            name: 'The New Auditorium & Examination Hall',
            category: 'facility',
            subtext: 'Main University Convocation & Exam Complex',
            px: 3750, py: 2300, y: 2667, x: 3750,
            zone: 'zone_02', icon: 'fa-masks-theater', color: '#9333ea',
            badge: 'Convocation Hall', isPrimary: true
        },
        {
            id: 'facility_health',
            name: 'University Health Center & Medical Center',
            category: 'facility',
            subtext: 'Sick Room, Doctor Consultation & First Aid',
            px: 3250, py: 2350, y: 2617, x: 3250,
            zone: 'zone_02', icon: 'fa-house-medical', color: '#dc2626',
            badge: 'Doctor on Duty', isPrimary: true
        },
        {
            id: 'facility_gym',
            name: 'Gymnasium & Indoor Sports Complex',
            category: 'sports',
            subtext: 'Badminton, Table Tennis & Fitness Center',
            px: 1850, py: 2650, y: 2317, x: 1850,
            zone: 'zone_03', icon: 'fa-dumbbell', color: '#16a34a',
            badge: 'Gym Open', isPrimary: true
        },
        {
            id: 'facility_ground',
            name: 'University Play Ground & Sports Pavilion',
            category: 'sports',
            subtext: 'Cricket Ground, Athletics Track, Tennis & Basketball',
            px: 1300, py: 3100, y: 1867, x: 1300,
            zone: 'zone_03', icon: 'fa-baseball-bat-ball', color: '#22c55e',
            badge: 'Outdoor Courts', isPrimary: true
        },
        {
            id: 'gate_katubedda',
            name: 'Katubedda Main Entrance Gate',
            category: 'gate',
            subtext: 'Main Highway Gateway from Katubedda Junction',
            px: 2200, py: 4650, y: 317, x: 2200,
            zone: 'zone_01', icon: 'fa-archway', color: '#2563eb',
            badge: 'Security Post', isPrimary: true
        },
        {
            id: 'gate_bandaranayake',
            name: 'Srimat Bandaranayake Mawatha Gate',
            category: 'gate',
            subtext: 'Administration & Library Direct Road Gateway',
            px: 3600, py: 3850, y: 1117, x: 3600,
            zone: 'zone_01', icon: 'fa-door-open', color: '#3b82f6',
            badge: 'Gate S18', isPrimary: true
        },
        {
            id: 'gate_willorawatta',
            name: 'Willorawatta Road Exit Gateway',
            category: 'gate',
            subtext: 'Access toward Willorawatta',
            px: 4200, py: 4100, y: 867, x: 4200,
            zone: 'zone_02', icon: 'fa-road', color: '#6366f1',
            badge: 'East Gate', isPrimary: false
        },
        {
            id: 'gate_piliyandala',
            name: 'Piliyandala Road Exit Gateway',
            category: 'gate',
            subtext: 'Direct route towards Piliyandala',
            px: 4600, py: 3400, y: 1567, x: 4600,
            zone: 'zone_02', icon: 'fa-road', color: '#8b5cf6',
            badge: 'NE Gate', isPrimary: false
        },
        {
            id: 'landmark_bolgoda',
            name: 'The Bolgoda Lake Waterfront',
            category: 'landmark',
            subtext: 'Scenic Lake Promenade & Marine Boat Yard',
            px: 4400, py: 800, y: 4167, x: 4400,
            zone: 'zone_03', icon: 'fa-water', color: '#0284c7',
            badge: 'Scenic Area', isPrimary: false
        }
    ],

    blueprintZones: [
        {
            id: 'zone_01',
            name: 'ZONE - 01',
            label: 'Academic Core & Administration (Green)',
            color: '#16a34a',
            strokeColor: '#22c55e',
            description: 'Sumanadasa, Mech/Civil/Earth Engineering, Admin & Central Canteen',
            polygon: [
                [267, 2150],
                [1267, 1600],
                [1717, 1950],
                [1767, 2400],
                [1867, 2900],
                [1717, 3600],
                [1267, 3900],
                [867, 3600],
                [317, 2600]
            ]
        },
        {
            id: 'zone_02',
            name: 'ZONE - 02',
            label: 'IT, ENTC & Architecture Complex (Magenta)',
            color: '#c026d3',
            strokeColor: '#e879f9',
            description: 'Faculty of IT, ENTC, Architecture, New Auditorium & Exam Halls',
            polygon: [
                [1967, 3300],
                [2217, 3200],
                [3017, 3100],
                [3117, 3650],
                [2667, 4100],
                [1567, 4500],
                [1117, 4000],
                [1567, 3600]
            ]
        },
        {
            id: 'zone_03',
            name: 'ZONE - 03',
            label: 'Sports, Hostels & Lake Boundary (Blue)',
            color: '#2563eb',
            strokeColor: '#60a5fa',
            description: 'Play Ground, Gymnasium, Textile Dept, Student Hostels & Bolgoda Lake',
            polygon: [
                [1867, 800],
                [2400, 1600],
                [3100, 2200],
                [4167, 4200],
                [4300, 3600],
                [3300, 2700],
                [2317, 1700],
                [1500, 1100]
            ]
        }
    ],

        blueprintOrigins: [
        { id: 'orig_lib', name: 'Central Library Plaza (My Location)', y: 1667, x: 3680 },
        { id: 'gate_katubedda', name: 'Katubedda Main Entrance Gate', y: 317, x: 2200 },
        { id: 'dept_arch', name: 'Architecture Building (My Location)', y: 1967, x: 3500 },
        { id: 'bldg_sumanadasa', name: 'Sumanadasa Building', y: 1717, x: 2050 },
        { id: 'floor_ground', name: 'Central Library Plaza', y: 1667, x: 3680 },
        { id: 'dept_it', name: 'Faculty of IT (Phase I & II)', y: 3017, x: 3300 },
        { id: 'canteen_l', name: 'L-Block & Sentra Court', y: 2817, x: 2650 },
        { id: 'facility_gym', name: 'Gymnasium & Sports Ground', y: 2317, x: 1850 },
        { id: 'atm_boc', name: 'Main Administration Building', y: 1267, x: 3350 }
    ],

        // 2D Floor Plan Seats Layout Coordinates (per floor matching PDF architectural blueprints)
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
    },

    // Historical Time-Series Profiles (8 AM to 8 PM)
    historicalProfiles: {
        weekday: {
            title: 'Typical Weekday',
            hours: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'],
            libraryOccupancy: [22, 36, 64, 82, 75, 70, 88, 85, 65, 50, 35, 24, 14],
            canteenOccupancy: [18, 45, 28, 58, 96, 92, 48, 32, 62, 40, 20, 10, 5]
        },
        exam: {
            title: 'Exam Season',
            hours: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'],
            libraryOccupancy: [62, 78, 91, 97, 94, 93, 99, 98, 95, 92, 86, 80, 72],
            canteenOccupancy: [32, 58, 42, 74, 98, 95, 68, 52, 76, 64, 56, 44, 30]
        },
        weekend: {
            title: 'Weekend Profile',
            hours: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'],
            libraryOccupancy: [8, 16, 28, 42, 49, 46, 54, 51, 38, 26, 18, 11, 5],
            canteenOccupancy: [6, 18, 14, 28, 55, 48, 22, 15, 24, 18, 10, 5, 2]
        }
    }
};

// ==========================================================================
// 2. Application State & Storage Management
// ==========================================================================

const AppState = {
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

    // UoM Student Profile & Authentication - Requires University Webmail verification
    currentStudent: JSON.parse(localStorage.getItem('spacepulse_student_profile') || 'null'),
    pendingOtpEmail: null,
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
};

// ==========================================================================
// 3. UoM Student Profile & Email Parser (Mirroring student_profile.dart)
// ==========================================================================

function parseStudentProfileFromEmail(rawEmail, customName = '') {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const parts = cleanEmail.split('@');
    const localPart = parts[0] || '';
    const domain = parts[1] || '';

    let index = localPart.toUpperCase();
    let batch = 'UoM Student';
    let dept = 'Faculty of Engineering';
    let inferredName = customName || '';

    // Department inference from subdomains
    if (domain.includes('cse')) dept = 'Computer Science & Engineering';
    else if (domain.includes('itfac')) dept = 'Faculty of Information Technology';
    else if (domain.includes('mech')) dept = 'Mechanical Engineering';
    else if (domain.includes('civil')) dept = 'Civil Engineering';
    else if (domain.includes('elect')) dept = 'Electrical Engineering';
    else if (domain.includes('ent')) dept = 'Electronic & Telecom Engineering';
    else if (domain.includes('chem')) dept = 'Chemical & Process Engineering';
    else if (domain.includes('math')) dept = 'Department of Mathematics';
    else if (domain.includes('arch')) dept = 'Faculty of Architecture';
    else if (domain.includes('bm') || domain.includes('business')) dept = 'Faculty of Business';
    else dept = 'Faculty of Engineering';

    // Batch and index extraction (e.g. 210123A or 224050T)
    const indexRegex = /^([0-9]{2})[0-9]{4}[a-zA-Z]$/;
    const match = localPart.match(indexRegex);
    if (match) {
        const yearPrefix = match[1];
        batch = `Batch ${yearPrefix}`;
        index = localPart.toUpperCase();
        if (!inferredName) inferredName = `Student ${index}`;
    } else {
        // Name.batch format (e.g. perera.21 or silva.21)
        const dotBatchRegex = /^(.*)\.([0-9]{2})$/;
        const dotMatch = localPart.match(dotBatchRegex);
        if (dotMatch) {
            const prefix = dotMatch[1];
            const year = dotMatch[2];
            batch = `Batch ${year}`;
            index = `${prefix.toUpperCase()}.${year}`;
            if (!inferredName) inferredName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        } else if (!inferredName) {
            inferredName = localPart.charAt(0).toUpperCase() + localPart.slice(1);
        }
    }

    return {
        email: cleanEmail,
        indexNumber: index,
        batch: batch,
        department: dept,
        name: inferredName,
        isVerified: true,
        verifiedAt: new Date().toISOString()
    };
}

function isValidUomEmail(email) {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.includes('@')) return false;
    const parts = trimmed.split('@');
    if (parts.length !== 2) return false;
    const domain = parts[1];
    return (
        domain === 'uom.lk' ||
        domain.endsWith('.uom.lk') ||
        domain === 'mrt.ac.lk' ||
        domain.endsWith('.mrt.ac.lk') ||
        trimmed.endsWith('@spacepulse.lk') ||
        trimmed.endsWith('@test.com')
    );
}

// ==========================================================================
// 4. UI Helpers & Calculations
// ==========================================================================

function getStats() {
    const totalLibrarySeats = spacePulseData.libraryFloors.reduce((acc, f) => acc + f.totalSeats, 0);
    const availableLibrarySeats = spacePulseData.libraryFloors.reduce((acc, f) => acc + f.availableSeats, 0);
    const openCanteensCount = spacePulseData.canteens.filter(c => c.status === 'Open').length;
    const workingAtms = spacePulseData.atms.filter(a => a.status === 'Working');
    const shortestAtm = workingAtms.sort((a, b) => a.queueLength - b.queueLength)[0] || { name: 'None', queueLength: 0 };
    const openBookshops = spacePulseData.bookshops.filter(b => b.status === 'Open').length;

    const bestFloor = [...spacePulseData.libraryFloors].sort((a, b) => b.availableSeats - a.availableSeats)[0];
    const bestCanteen = spacePulseData.canteens
        .filter(c => c.status === 'Open')
        .sort((a, b) => (a.personCount / a.maxCapacity) - (b.personCount / b.maxCapacity))[0];

    return {
        totalLibrarySeats,
        availableLibrarySeats,
        openCanteensCount,
        totalCanteensCount: spacePulseData.canteens.length,
        workingAtmsCount: workingAtms.length,
        shortestAtmName: shortestAtm.name,
        shortestAtmQueue: shortestAtm.queueLength,
        openBookshopsCount: openBookshops,
        bestFloor,
        bestCanteen
    };
}

function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
}

// ==========================================================================
// 5. Page View Renderers
// ==========================================================================

const contentArea = document.getElementById('content-area');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

// --- 5.1 Home Dashboard ---
function renderHomeBannersHTML(stats, student) {
    let loginPromptHTML = '';
    if (!student || !student.isVerified) {
        loginPromptHTML = `
            <div class="webmail-login-banner" onclick="openStudentAuthModal()" style="cursor: pointer; background: linear-gradient(135deg, rgba(136, 19, 55, 0.95) 0%, rgba(76, 5, 25, 0.98) 100%); color: #ffffff; border-radius: var(--radius-lg); padding: 18px 24px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; gap: 20px; box-shadow: 0 10px 25px rgba(136, 19, 55, 0.25); border: 1.5px solid rgba(253, 224, 71, 0.4);">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(255, 255, 255, 0.15); border: 1.5px solid #fde047; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: #fde047; flex-shrink: 0;">
                        <i class="fas fa-envelope-open-text"></i>
                    </div>
                    <div>
                        <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800; color: #fde047; margin-bottom: 2px;">UNIVERSITY OF MORATUWA SSO</div>
                        <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0 0 4px 0; color: #ffffff;">Log in with University Webmail (<span style="color: #fde047;">webmail.uom.lk</span>)</h3>
                        <p style="margin: 0; font-size: 0.82rem; opacity: 0.9; color: #f1f5f9;">Connect your official student email to unlock 30-minute library seat holds, real-time alerts & CAD navigation.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap;">
                    <button type="button" class="btn-primary" style="background: #fde047; color: #4c0519; font-weight: 800; border: none; padding: 10px 18px; border-radius: 8px; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;" onclick="event.stopPropagation(); openStudentAuthModal();">
                        <i class="fas fa-right-to-bracket"></i> Student Login
                    </button>
                    <a href="https://webmail.uom.lk/" target="_blank" rel="noopener noreferrer" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; text-decoration: none; font-weight: 700; border: 1px solid rgba(255, 255, 255, 0.3); padding: 10px 16px; border-radius: 8px; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 6px;" onclick="event.stopPropagation();">
                        <i class="fas fa-arrow-up-right-from-square"></i> Open webmail.uom.lk
                    </a>
                </div>
            </div>
        `;
    }
    return loginPromptHTML + `
        <div class="recommendation-banner">
            <div class="rec-content">
                <span class="rec-tag"><i class="fas fa-sparkles"></i> AI RECOMMENDATION</span>
                <h3>Optimal Study Spot: Second Floor: Library</h3>
                <p>54 of 220 seats free right now. <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #a855f7; margin: 0 4px;"></span> Silent study zone with high-speed WiFi.</p>
                <div class="rec-actions" style="margin-top: 14px;">
                    <button class="rec-btn" onclick="navigateTo('maps'); switchFloor('floor_2'); switchMapMode('floorplans');">
                        <i class="fas fa-landmark"></i> Pick a Seat on 2D Map
                    </button>
                    <button class="rec-btn-ghost" onclick="navigateTo('canteen');">
                        <i class="fas fa-utensils"></i> Hungry? Visit Wala Canteen (39/150 full)
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderDefaultHomeSectionsHTML(stats) {
    return `
        <!-- Favorites Carousel Section -->
        ${renderFavoritesSectionHTML()}

        <!-- Phase 1 University Facilities (Matching Page 8) -->
        <div class="section-title-wrap">
            <h3><i class="fas fa-circle-dot" style="color: #2563eb; font-size: 0.85rem;"></i> Phase 1 University Facilities</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="fas fa-rotate"></i> Real-time synced</span>
        </div>

        <div class="hero-facility-grid">
            <div class="hero-facility-card" onclick="navigateTo('library');">
                <img src="assets/images/library.jpg" alt="Central Library" class="hero-facility-img" onerror="this.src='images.jpeg'">
                <div class="hero-facility-overlay">
                    <div class="hero-card-top">
                        <div class="hero-icon-pill"><i class="fas fa-book-reader"></i></div>
                        <span class="hero-badge green">170 Seats Free</span>
                    </div>
                    <div class="hero-card-bottom">
                        <h3>Central Library</h3>
                        <p><i class="fas fa-location-dot"></i> 4 Study Floors • Quiet & Power Outlets</p>
                    </div>
                </div>
            </div>

            <div class="hero-facility-card" onclick="navigateTo('canteen');">
                <img src="assets/images/canteen.jpg" alt="University Canteens" class="hero-facility-img" onerror="this.src='images.jpeg'">
                <div class="hero-facility-overlay">
                    <div class="hero-card-top">
                        <div class="hero-icon-pill"><i class="fas fa-utensils"></i></div>
                        <span class="hero-badge green">3 Open Now</span>
                    </div>
                    <div class="hero-card-bottom">
                        <h3>University Canteens</h3>
                        <p><i class="fas fa-location-dot"></i> Goda Canteen, Wala Canteen & L Canteen</p>
                    </div>
                </div>
            </div>

            <div class="hero-facility-card" onclick="navigateTo('atm');">
                <img src="assets/images/atm.jpg" alt="BOC ATM" class="hero-facility-img" onerror="this.src='images.jpeg'">
                <div class="hero-facility-overlay">
                    <div class="hero-card-top">
                        <div class="hero-icon-pill"><i class="fas fa-money-check-dollar"></i></div>
                        <span class="hero-badge amber">5 in Queue</span>
                    </div>
                    <div class="hero-card-bottom">
                        <h3>BOC ATM (Bank of Ceylon)</h3>
                        <p><i class="fas fa-location-dot"></i> Main Administrative Entrance • Cash Dispenser</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Real-Time Pulse Overview Cards (Matching Page 8) -->
        <div class="section-title-wrap">
            <h3><i class="fas fa-bolt" style="color: #0284c7;"></i> Real-Time Pulse Overview</h3>
        </div>

        <div class="quick-stats-grid" style="grid-template-columns: repeat(3, 1fr);">
            <div class="stat-metric-card" onclick="navigateTo('library');">
                <div class="stat-metric-content">
                    <h4>TOTAL FREE SEATS</h4>
                    <div class="stat-metric-value">170</div>
                    <div class="stat-metric-sub">of 752 seats library-wide</div>
                </div>
                <div class="stat-metric-icon green"><i class="fas fa-chair"></i></div>
            </div>

            <div class="stat-metric-card" onclick="navigateTo('canteen');">
                <div class="stat-metric-content">
                    <h4>CANTEENS SERVING</h4>
                    <div class="stat-metric-value">3 / 3</div>
                    <div class="stat-metric-sub">Goda, Wala & L Canteens</div>
                </div>
                <div class="stat-metric-icon blue"><i class="fas fa-bowl-rice"></i></div>
            </div>

            <div class="stat-metric-card" onclick="navigateTo('atm');">
                <div class="stat-metric-content">
                    <h4>BOC ATM LINE</h4>
                    <div class="stat-metric-value">5 in queue</div>
                    <div class="stat-metric-sub">Main Admin Building Entrance</div>
                </div>
                <div class="stat-metric-icon amber"><i class="fas fa-money-check-dollar"></i></div>
            </div>
        </div>
    `;
}

function renderHome() {
    const stats = getStats();
    const isSearching = AppState.searchQuery.trim().length > 0 || AppState.selectedCategory !== 'all';
    const student = AppState.currentStudent;

    if (student) {
        pageTitle.innerHTML = `Welcome back, ${student.name.split(' ')[0]}! 👋 <span class="status-badge open" style="font-size: 0.72rem; vertical-align: middle; margin-left: 8px; font-weight: 800; letter-spacing: 0.5px;">VERIFIED UOM</span>`;
        pageSubtitle.textContent = `${student.batch} • ${student.department} • University of Moratuwa`;
    } else {
        pageTitle.textContent = 'Welcome to SpacePulse 👋';
        pageSubtitle.textContent = 'Live vacancy tracking and intelligent crowd monitoring at University of Moratuwa';
    }

    const searchInput = document.getElementById('home-search-input');
    const wasFocused = searchInput && (document.activeElement === searchInput);
    const cursorStart = searchInput ? searchInput.selectionStart : 0;
    const cursorEnd = searchInput ? searchInput.selectionEnd : 0;

    let html = `
        <!-- Home Banners Container -->
        <div id="home-banners-container" style="display: ${isSearching ? 'none' : 'block'};">
            ${renderHomeBannersHTML(stats, student)}
        </div>

        <!-- Universal Search & Category Filter Section (Matching Page 8) -->
        <div class="search-filter-section">
            <div class="search-input-wrapper">
                <i class="fas fa-magnifying-glass search-icon"></i>
                <input type="text" id="home-search-input" placeholder="Search library floors, canteens, BOC ATM, amenities ('quiet', 'power', 'ac', 'kottu')..." value="${AppState.searchQuery}">
                <button class="search-clear-btn" id="home-search-clear" style="display: ${AppState.searchQuery ? 'block' : 'none'};">
                    <i class="fas fa-times-circle"></i>
                </button>
            </div>

            <div class="category-chips-bar">
                <button class="category-chip ${AppState.selectedCategory === 'all' ? 'active' : ''}" data-cat="all">
                    All <span class="chip-count">5 Places</span>
                </button>
                <button class="category-chip ${AppState.selectedCategory === 'library' ? 'active' : ''}" data-cat="library">
                    <i class="fas fa-book-reader"></i> Central Library <span class="chip-count">4 Floors</span>
                </button>
                <button class="category-chip ${AppState.selectedCategory === 'canteen' ? 'active' : ''}" data-cat="canteen">
                    <i class="fas fa-utensils"></i> Canteens <span class="chip-count">3</span>
                </button>
                <button class="category-chip ${AppState.selectedCategory === 'atm' ? 'active' : ''}" data-cat="atm">
                    <i class="fas fa-money-check-dollar"></i> BOC ATM <span class="chip-count">1</span>
                </button>
            </div>
        </div>

        <!-- Dynamic Content Section -->
        <div id="home-dynamic-content">
            ${isSearching ? renderSearchResultsHTML() : renderDefaultHomeSectionsHTML(stats)}
        </div>
    `;

    contentArea.innerHTML = html;
    attachHomeEventListeners();

    if (wasFocused) {
        const newSearchInput = document.getElementById('home-search-input');
        if (newSearchInput) {
            newSearchInput.focus();
            newSearchInput.setSelectionRange(cursorStart, cursorEnd);
        }
    }
}

function renderFavoritesSectionHTML() {
    if (!AppState.favorites || AppState.favorites.length === 0) return '';

    let favCards = '';
    AppState.favorites.forEach(id => {
        const floor = spacePulseData.libraryFloors.find(f => f.id === id);
        if (floor) {
            favCards += `
                <div class="favorite-card" onclick="navigateTo('library');">
                    <div class="fav-card-left">
                        <div class="fav-icon library"><i class="fas fa-book-reader"></i></div>
                        <div class="fav-info">
                            <h4>${floor.floor}</h4>
                            <p>${floor.availableSeats} seats available</p>
                        </div>
                    </div>
                    <button class="fav-star-btn" onclick="event.stopPropagation(); toggleFavorite('${floor.id}');"><i class="fas fa-star"></i></button>
                </div>
            `;
            return;
        }

        const canteen = spacePulseData.canteens.find(c => c.id === id);
        if (canteen) {
            favCards += `
                <div class="favorite-card" onclick="navigateTo('canteen');">
                    <div class="fav-card-left">
                        <div class="fav-icon canteen"><i class="fas fa-utensils"></i></div>
                        <div class="fav-info">
                            <h4>${canteen.name}</h4>
                            <p>${canteen.personCount}/${canteen.maxCapacity} people</p>
                        </div>
                    </div>
                    <button class="fav-star-btn" onclick="event.stopPropagation(); toggleFavorite('${canteen.id}');"><i class="fas fa-star"></i></button>
                </div>
            `;
            return;
        }

        const atm = spacePulseData.atms.find(a => a.id === id);
        if (atm) {
            favCards += `
                <div class="favorite-card" onclick="navigateTo('atm');">
                    <div class="fav-card-left">
                        <div class="fav-icon atm"><i class="fas fa-money-check-dollar"></i></div>
                        <div class="fav-info">
                            <h4>${atm.name}</h4>
                            <p>${atm.queueLength} in line • ${atm.hasCash ? 'Cash OK' : 'No Cash'}</p>
                        </div>
                    </div>
                    <button class="fav-star-btn" onclick="event.stopPropagation(); toggleFavorite('${atm.id}');"><i class="fas fa-star"></i></button>
                </div>
            `;
            return;
        }
    });

    if (!favCards) return '';

    return `
        <div class="favorites-section">
            <div class="section-title-wrap">
                <h3><i class="fas fa-star" style="color: #ec4899;"></i> Bookmarked Facilities</h3>
            </div>
            <div class="favorites-grid">${favCards}</div>
        </div>
    `;
}

function renderSearchResultsHTML() {
    const q = AppState.searchQuery.toLowerCase().trim();
    const cat = AppState.selectedCategory;

    const filteredFloors = (cat === 'all' || cat === 'library')
        ? spacePulseData.libraryFloors.filter(f => f.floor.toLowerCase().includes(q) || (f.isQuietZone && q.includes('quiet')) || (f.hasPowerOutlets && q.includes('power')))
        : [];

    const filteredCanteens = (cat === 'all' || cat === 'canteen')
        ? spacePulseData.canteens.filter(c => c.name.toLowerCase().includes(q) || c.specialties.toLowerCase().includes(q) || c.location.toLowerCase().includes(q))
        : [];

    const filteredAtms = (cat === 'all' || cat === 'atm')
        ? spacePulseData.atms.filter(a => a.name.toLowerCase().includes(q) || a.bankName.toLowerCase().includes(q) || a.location.toLowerCase().includes(q))
        : [];

    const filteredBookshops = (cat === 'all' || cat === 'bookshop')
        ? spacePulseData.bookshops.filter(b => b.name.toLowerCase().includes(q) || b.services.some(s => s.toLowerCase().includes(q)))
        : [];

    const total = filteredFloors.length + filteredCanteens.length + filteredAtms.length + filteredBookshops.length;

    let resHtml = `
        <div class="search-status-bar">
            <div>
                <strong>Search & Filter Results</strong>
                <span>(${total} ${total === 1 ? 'facility' : 'facilities'} found)</span>
            </div>
            <a href="javascript:void(0)" class="search-reset-link" id="reset-search-btn">
                <i class="fas fa-times-circle"></i> Clear Filters
            </a>
        </div>
    `;

    if (total === 0) {
        return resHtml + `
            <div style="text-align: center; padding: 40px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg);">
                <i class="fas fa-search-minus" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 14px;"></i>
                <h3>No facilities match your search</h3>
                <p style="color: var(--text-secondary); margin-top: 6px;">Try searching for library floors, canteens, ATMs or services.</p>
            </div>
        `;
    }

    resHtml += '<div class="dashboard-grid">';
    filteredFloors.forEach(f => resHtml += createFloorCardHTML(f));
    filteredCanteens.forEach(c => resHtml += createCanteenCardHTML(c));
    filteredAtms.forEach(a => resHtml += createAtmCardHTML(a));
    filteredBookshops.forEach(b => resHtml += createBookshopCardHTML(b));
    resHtml += '</div>';
    return resHtml;
}

function updateHomeSearchResults() {
    const isSearching = AppState.searchQuery.trim().length > 0 || AppState.selectedCategory !== 'all';
    const stats = getStats();

    // 1. Toggle Banners Visibility
    const bannersContainer = document.getElementById('home-banners-container');
    if (bannersContainer) {
        bannersContainer.style.display = isSearching ? 'none' : 'block';
    }

    // 2. Toggle Clear Button Visibility
    const searchClear = document.getElementById('home-search-clear');
    if (searchClear) {
        searchClear.style.display = AppState.searchQuery.length > 0 ? 'block' : 'none';
    }

    // 3. Update Category Chips Active State
    document.querySelectorAll('.category-chip').forEach(btn => {
        const cat = btn.getAttribute('data-cat');
        btn.classList.toggle('active', cat === AppState.selectedCategory);
    });

    // 4. Update Dynamic Results Container without re-rendering search bar
    const dynamicContainer = document.getElementById('home-dynamic-content');
    if (dynamicContainer) {
        dynamicContainer.innerHTML = isSearching ? renderSearchResultsHTML() : renderDefaultHomeSectionsHTML(stats);

        // Re-attach clear filters button inside the results if present
        const resetBtn = document.getElementById('reset-search-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', handleResetSearch);
        }
    }
}

function handleClearSearch() {
    AppState.searchQuery = '';
    const searchInput = document.getElementById('home-search-input');
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    updateHomeSearchResults();
}

function handleResetSearch() {
    AppState.searchQuery = '';
    AppState.selectedCategory = 'all';
    const searchInput = document.getElementById('home-search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    updateHomeSearchResults();
}

function attachHomeEventListeners() {
    const searchInput = document.getElementById('home-search-input');
    const searchClear = document.getElementById('home-search-clear');
    const resetBtn = document.getElementById('reset-search-btn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            AppState.searchQuery = e.target.value;
            updateHomeSearchResults();
        });
    }

    if (searchClear) {
        searchClear.addEventListener('click', handleClearSearch);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', handleResetSearch);
    }

    document.querySelectorAll('.category-chip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = e.currentTarget.getAttribute('data-cat');
            AppState.selectedCategory = cat;
            updateHomeSearchResults();
        });
    });
}

// --- 5.2 Maps & 2D Floor Plans Hub ---
const floorMetaMap = {
    floor_1: {
        title: 'First Floor: Library',
        freeBadge: '40 / 90 Free Seats',
        tagBadge: 'High AC Socket Density',
        subtitle: 'Computer Laboratory, Discussion Room & Main Study Areas',
        tags: [
            'Discussion Room (8 PCA)',
            'Computer Laboratory (8 PCA)',
            'Seminar Hall',
            'Current Periodicals',
            'Main Study Areas (6 Tables)',
            'Permanent Reference',
            'Theses Collection',
            'Copy Center'
        ],
        cadTitle: 'FIRST FLOOR: LIBRARY | A 1:50 VECTOR CAD',
        cadMetrics: '40 Free Desks • 20 With AC Sockets'
    },
    floor_3: {
        title: 'Third Floor: Library',
        freeBadge: '35 / 200 Free Seats',
        tagBadge: 'Silent Study Zone • Power Outlets',
        subtitle: 'Lending Library Collections, Central Atrium & OPAC Terminals',
        tags: [
            'Lending Library Collections',
            'Central Designed Atrium',
            'OPAC Online Catalogue',
            'Circulation Counter',
            'General Office',
            'Display of New Books',
            'Study Areas'
        ],
        cadTitle: 'THIRD FLOOR: LIBRARY | A 1:50 VECTOR CAD',
        cadMetrics: '35 Free Desks • 15 With AC Sockets'
    },
    floor_ground: {
        title: 'Ground Floor: Library',
        freeBadge: '45 / 150 Free Seats',
        tagBadge: 'Power Outlets',
        subtitle: 'AQ Section, Technical Services, Staff Rooms & Central Stacks',
        tags: [
            'AQ Section',
            'Disabilities Collection',
            'TS Section',
            'Staff Room',
            'Bindery',
            'Core Lift & Stairs',
            'Central Stacks'
        ],
        cadTitle: 'GROUND FLOOR: LIBRARY | A 1:50 VECTOR CAD',
        cadMetrics: '45 Free Desks • 12 With AC Sockets'
    },
    floor_2: {
        title: 'Second Floor: Library',
        freeBadge: '55 / 220 Free Seats',
        tagBadge: 'Power Outlets',
        subtitle: 'Upper Study Area, Computer Lab, Reader Services & Main Entrance',
        tags: [
            'Upper Study Hall (8 Large Tables)',
            'Computer Laboratory (2 PC)',
            'Reader Service Area',
            'Main Entrance & Cloak Room',
            'Staff Publications',
            'Lower Study Area'
        ],
        cadTitle: 'SECOND FLOOR: LIBRARY | A 1:50 VECTOR CAD',
        cadMetrics: '55 Free Desks • 24 With AC Sockets'
    }
};

function renderMaps() {
    pageTitle.textContent = 'University 2D Infrastructure & Library Floor Plans 🏢';
    pageSubtitle.textContent = 'Official Campus CAD Infrastructure Blueprint & Scanned 4-Floor Library Architectural Plans';

    // Blueprint HUD Travel Calculations
    const bpOrigin = spacePulseData.blueprintOrigins.find(o => o.id === AppState.selectedBlueprintOrigin) || 
                     spacePulseData.blueprintNodes.find(n => n.id === AppState.selectedBlueprintOrigin) || 
                     spacePulseData.blueprintOrigins[0];
    const bpDest = spacePulseData.blueprintNodes.find(n => n.id === AppState.selectedBlueprintDestination) || 
                   spacePulseData.blueprintNodes[0];

    const bpDistPx = Math.hypot(bpDest.x - bpOrigin.x, bpDest.y - bpOrigin.y);
    const bpDistMeters = Math.max(15, Math.round(bpDistPx / spacePulseData.infrastructureMap.scaleRatio));
    const bpMetersPerMin = (AppState.selectedSpeed * 1000) / 60;
    const bpWalkMins = Math.max(1, Math.round(bpDistMeters / bpMetersPerMin));

    const meta = floorMetaMap[AppState.selectedFloorId] || floorMetaMap['floor_1'];

    let html = `
        <div class="maps-hub-container">
            <!-- Map Mode Segmented Bar (Matching PDF: Exactly 2 Buttons) -->
            <div class="map-segmented-bar" style="max-width: 680px;">
                <button class="map-segment-btn ${AppState.mapsSubTab === 'infrastructure' ? 'active' : ''}" onclick="switchMapMode('infrastructure')">
                    <i class="fas fa-landmark"></i> <span>2D Campus Infrastructure Model (Official Blueprint)</span>
                </button>
                <button class="map-segment-btn ${AppState.mapsSubTab === 'floorplans' ? 'active' : ''}" onclick="switchMapMode('floorplans')">
                    <i class="fas fa-layer-group"></i> <span>Library Architectural Floor Plans (4 Floors)</span>
                </button>
            </div>

            <!-- 1. Official Infrastructure Blueprint CAD Map Subview (Page 9) -->
            <div id="infrastructure-subview" style="display: ${AppState.mapsSubTab === 'infrastructure' ? 'block' : 'none'};">
                <!-- Navigation HUD Bar -->
                <div class="travel-hud-bar">
                    <div class="hud-location-selector">
                        <div class="hud-select-group">
                            <label for="bp-hud-origin"><i class="fas fa-street-view"></i> YOUR LOCATION</label>
                            <select id="bp-hud-origin" onchange="updateBlueprintOrigin(this.value)">
                                ${spacePulseData.blueprintOrigins.map(p => `
                                    <option value="${p.id}" ${p.id === AppState.selectedBlueprintOrigin ? 'selected' : ''}>${p.name}</option>
                                `).join('')}
                            </select>
                        </div>

                        <div class="hud-select-group">
                            <label for="bp-hud-dest"><i class="fas fa-location-dot"></i> DESTINATION FACILITY</label>
                            <select id="bp-hud-dest" onchange="updateBlueprintDestination(this.value)">
                                ${spacePulseData.blueprintNodes.map(n => `
                                    <option value="${n.id}" ${n.id === AppState.selectedBlueprintDestination ? 'selected' : ''}>${n.name} (${n.category})</option>
                                `).join('')}
                            </select>
                        </div>
                    </div>

                    <div class="hud-speed-modes">
                        <button class="speed-mode-btn ${AppState.selectedSpeed === 4.5 ? 'active' : ''}" onclick="updateBlueprintSpeed(4.5)">
                            <i class="fas fa-person-walking"></i> Walk (4.5)
                        </button>
                        <button class="speed-mode-btn ${AppState.selectedSpeed === 5.8 ? 'active' : ''}" onclick="updateBlueprintSpeed(5.8)">
                            <i class="fas fa-person-walking-dashed-line-arrow-right"></i> Fast (5.8)
                        </button>
                        <button class="speed-mode-btn ${AppState.selectedSpeed === 9.0 ? 'active' : ''}" onclick="updateBlueprintSpeed(9.0)">
                            <i class="fas fa-person-running"></i> Run (9.0)
                        </button>
                        <button class="speed-mode-btn ${AppState.selectedSpeed === 15.0 ? 'active' : ''}" onclick="updateBlueprintSpeed(15.0)">
                            <i class="fas fa-bicycle"></i> Cycle (15)
                        </button>
                    </div>

                    <div class="hud-metrics-pill">
                        <div class="hud-metric-item">
                            <span>DISTANCE</span>
                            <strong>${bpDistMeters} m</strong>
                        </div>
                        <div class="hud-metric-item">
                            <span>EST. TRAVEL</span>
                            <strong>${bpWalkMins} min</strong>
                        </div>
                    </div>
                </div>

                <!-- Category Filter Chips Bar (Page 9: 4 Chips) -->
                <div class="map-category-filter-bar">
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'all' ? 'active' : ''}" onclick="filterBlueprintCategory('all')">
                        <i class="fas fa-border-all"></i> All (5 Places)
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'library' ? 'active' : ''}" onclick="filterBlueprintCategory('library')">
                        <i class="fas fa-book-reader"></i> Central Library
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'canteen' ? 'active' : ''}" onclick="filterBlueprintCategory('canteen')">
                        <i class="fas fa-utensils"></i> Canteens (Goda, Wala, L)
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'atm' ? 'active' : ''}" onclick="filterBlueprintCategory('atm')">
                        <i class="fas fa-money-check-dollar"></i> BOC ATM
                    </button>
                </div>

                <!-- Blueprint Map Wrapper with Leaflet Container -->
                <div class="osm-map-wrapper blueprint-map-wrapper">
                    <div id="blueprint-map-container"></div>

                    <!-- Floating Navigation Toolbar -->
                    <div class="map-floating-toolbar">
                        <button class="map-tool-btn" id="bp-zoom-in-btn" title="Zoom In"><i class="fas fa-plus"></i></button>
                        <button class="map-tool-btn" id="bp-zoom-out-btn" title="Zoom Out"><i class="fas fa-minus"></i></button>
                        <button class="map-tool-btn" id="bp-locate-btn" title="Center Core"><i class="fas fa-crosshairs"></i></button>
                        <button class="map-tool-btn" id="bp-contrast-btn" title="Toggle Contrast"><i class="fas fa-circle-half-stroke"></i></button>
                    </div>

                    <button class="map-fab-btn" onclick="toggleChatbot()" title="Ask SpacePulse AI">
                        <i class="fas fa-robot"></i>
                    </button>
                </div>
            </div>

            <!-- 2. 2D Architectural Floor Plans Subview (Pages 1-4) -->
            <div id="floorplans-subview" style="display: ${AppState.mapsSubTab === 'floorplans' ? 'block' : 'none'};">
                <div class="floor-plan-card" style="background: transparent; border: none; padding: 0;">
                    <!-- Floor Navigation Pills & Filter Bar -->
                    <div class="floor-plan-header" style="flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
                        <div class="floor-nav-pills">
                            <button class="floor-nav-pill ${AppState.selectedFloorId === 'floor_ground' ? 'active' : ''}" onclick="switchFloor('floor_ground')">
                                Ground Floor (45 Free)
                            </button>
                            <button class="floor-nav-pill ${AppState.selectedFloorId === 'floor_1' ? 'active' : ''}" onclick="switchFloor('floor_1')">
                                First Floor (40 Free)
                            </button>
                            <button class="floor-nav-pill ${AppState.selectedFloorId === 'floor_2' ? 'active' : ''}" onclick="switchFloor('floor_2')">
                                Second Floor (55 Free)
                            </button>
                            <button class="floor-nav-pill ${AppState.selectedFloorId === 'floor_3' ? 'active' : ''}" onclick="switchFloor('floor_3')">
                                Third Floor (35 Free)
                            </button>
                        </div>

                        <div class="seat-filter-chips">
                            <span style="font-size: 0.76rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">FILTER:</span>
                            <button class="seat-filter-chip ${AppState.seatFilter === 'all' ? 'active' : ''}" onclick="filterSeats('all')">All</button>
                            <button class="seat-filter-chip ${AppState.seatFilter === 'free' ? 'active' : ''}" onclick="filterSeats('free')">🟢 Free</button>
                            <button class="seat-filter-chip ${AppState.seatFilter === 'occupied' ? 'active' : ''}" onclick="filterSeats('occupied')">🔴 Occupied</button>
                            <button class="seat-filter-chip ${AppState.seatFilter === 'power' ? 'active' : ''}" onclick="filterSeats('power')">⚡ Power Outlets</button>
                        </div>
                    </div>

                    <!-- Dynamic Subheader Details Strip Matching PDF -->
                    <div class="floor-meta-subheader">
                        <div class="floor-meta-info">
                            <h2>${meta.title} <span style="font-size: 0.82rem; font-weight: 600; color: #38bdf8;">(${meta.freeBadge} • ${meta.tagBadge})</span></h2>
                            <p>${meta.subtitle}</p>
                        </div>
                        <div class="floor-tags-row">
                            ${meta.tags.map(t => `<span class="floor-tag-chip">${t}</span>`).join('')}
                        </div>
                    </div>

                    <!-- CAD Architectural Card with Blue Header Bar -->
                    <div class="cad-viewer-card">
                        <div class="cad-title-bar">
                            <div class="cad-title-left">
                                <i class="fas fa-layer-group"></i>
                                <strong>${meta.cadTitle}</strong>
                            </div>
                            <div class="cad-title-center">
                                ${meta.cadMetrics}
                            </div>
                            <div class="cad-zoom-controls">
                                <button class="cad-zoom-btn" onclick="zoomFloorSvg(-0.1)">-</button>
                                <span id="cad-zoom-level">100%</span>
                                <button class="cad-zoom-btn" onclick="zoomFloorSvg(0.1)">+</button>
                                <button class="cad-zoom-btn" onclick="resetFloorSvgZoom()"><i class="fas fa-rotate"></i></button>
                            </div>
                        </div>

                        <div class="floor-canvas-wrapper" id="floor-canvas-target" style="padding: 16px; overflow-x: auto; text-align: center;">
                            ${renderFloorSvgHTML(AppState.selectedFloorId)}
                        </div>

                        <!-- CAD Legend Strip at Bottom -->
                        <div class="cad-legend-strip">
                            <div class="cad-legend-item"><span class="cad-legend-dot avail"></span> Available / Tap to Hold (30 m)</div>
                            <div class="cad-legend-item"><span class="cad-legend-dot reserved"></span> Reserved / Pending Arrival</div>
                            <div class="cad-legend-item"><span class="cad-legend-dot occupied"></span> Currently Occupied</div>
                            <div class="cad-legend-item"><i class="fas fa-bolt" style="color: #94a3b8;"></i> AC Power Outlet</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    contentArea.innerHTML = html;

    if (AppState.mapsSubTab === 'infrastructure') {
        setTimeout(initBlueprintMap, 100);
    }
}

function switchMapMode(mode) {
    AppState.mapsSubTab = mode;
    renderMaps();
}

function switchFloor(floorId) {
    AppState.selectedFloorId = floorId;
    renderMaps();
}

function filterSeats(filter) {
    AppState.seatFilter = filter;
    renderMaps();
}

function updateTravelOrigin(originId) {
    AppState.selectedOrigin = originId;
    renderMaps();
}

function updateTravelDestination(destId) {
    AppState.selectedDestination = destId;
    renderMaps();
}

function updateTravelSpeed(speed) {
    AppState.selectedSpeed = speed;
    renderMaps();
}

// --- Blueprint Infrastructure Map Handlers ---
function filterBlueprintCategory(category) {
    AppState.blueprintCategory = category;
    renderMaps();
}

function handleBlueprintSearch(query) {
    AppState.blueprintSearchQuery = query;
    if (AppState.blueprintMap) {
        initBlueprintMap();
    }
}

function updateBlueprintOrigin(originId) {
    AppState.selectedBlueprintOrigin = originId;
    renderMaps();
}

function updateBlueprintDestination(destId) {
    AppState.selectedBlueprintDestination = destId;
    renderMaps();
}

function updateBlueprintSpeed(speed) {
    AppState.selectedSpeed = speed;
    renderMaps();
}

function focusBlueprintZone(zoneId) {
    const zone = spacePulseData.blueprintZones.find(z => z.id === zoneId);
    if (!zone || !AppState.blueprintMap) return;
    const poly = L.polygon(zone.polygon);
    AppState.blueprintMap.flyToBounds(poly.getBounds(), { padding: [40, 40], duration: 1.0 });
    showToast(`Focused on ${zone.name}: ${zone.label}`);
}

function jumpToBlueprintNode(nodeId) {
    const node = spacePulseData.blueprintNodes.find(n => n.id === nodeId);
    if (!node || !AppState.blueprintMap) return;
    AppState.blueprintMap.flyTo([node.y, node.x], 0.6, { duration: 1.0 });
    const targetMarker = AppState.blueprintMarkers.find(m => m.id === nodeId);
    if (targetMarker && targetMarker.marker) {
        setTimeout(() => targetMarker.marker.openPopup(), 1100);
    }
}

function calculateBlueprintWaypoints(orig, dest) {
    // Generate authentic road path along UoM campus internal road network
    const waypoints = [[orig.y, orig.x]];

    // Sumanadasa - Canteen central crossroads
    const sumJunction = [1717, 2400];
    // Main Admin road junction
    const adminJunction = [1267, 3350];
    // Architecture junction
    const archJunction = [1967, 3350];
    // Katubedda entrance feeder road
    const gateFeeder = [517, 2300];
    // IT Faculty road
    const itJunction = [2817, 3100];

    // If starting from Katubedda Gate
    if (orig.id === 'gate_katubedda') {
        waypoints.push(gateFeeder);
        if (dest.y > 2000) {
            waypoints.push(sumJunction);
            if (dest.x > 3000) waypoints.push(archJunction);
        } else {
            waypoints.push(adminJunction);
        }
    } else if (dest.id === 'gate_katubedda') {
        if (orig.y > 2000) {
            if (orig.x > 3000) waypoints.push(archJunction);
            waypoints.push(sumJunction);
        } else {
            waypoints.push(adminJunction);
        }
        waypoints.push(gateFeeder);
    } else if (Math.abs(orig.x - dest.x) > 1200 && Math.abs(orig.y - dest.y) > 800) {
        // Intermediate campus road connector
        waypoints.push([Math.round((orig.y + dest.y) / 2), Math.round((orig.x + dest.x) / 2)]);
    }

    waypoints.push([dest.y, dest.x]);
    return waypoints;
}

// --- Blueprint CAD Infrastructure Map Initializer (Leaflet CRS.Simple) ---
function initBlueprintMap() {
    const mapElement = document.getElementById('blueprint-map-container');
    if (!mapElement) return;

    if (AppState.blueprintMap) {
        AppState.blueprintMap.remove();
        AppState.blueprintMap = null;
    }

    const h = spacePulseData.infrastructureMap.height; // 4967
    const w = spacePulseData.infrastructureMap.width;  // 7021
    const bounds = [[0, 0], [h, w]];

    const map = L.map('blueprint-map-container', {
        crs: L.CRS.Simple,
        minZoom: -2.8,
        maxZoom: 2.2,
        zoomSnap: 0.2,
        zoomDelta: 0.4,
        zoomControl: false,
        attributionControl: false,
        maxBounds: [[-600, -800], [h + 600, w + 800]],
        maxBoundsViscosity: 0.8
    });

    const isDark = AppState.blueprintContrastMode === 'dark' || (AppState.blueprintContrastMode === 'auto' && AppState.theme === 'dark');
    const imageLayer = L.imageOverlay(spacePulseData.infrastructureMap.imageSrc, bounds, {
        className: 'blueprint-map-layer' + (isDark ? ' dark-blueprint' : '')
    }).addTo(map);

    AppState.blueprintImageLayer = imageLayer;

    // Layer groups for zones, routes, and markers
    const zonesLayer = L.layerGroup();
    const routeLayer = L.layerGroup();
    const markersLayer = L.layerGroup();

    // 1. Add CAD Service Boundary Zones
    spacePulseData.blueprintZones.forEach(zone => {
        const poly = L.polygon(zone.polygon, {
            color: zone.strokeColor,
            weight: 2.5,
            opacity: 0.85,
            fillColor: zone.color,
            fillOpacity: 0.12,
            dashArray: '6, 6'
        }).bindTooltip(`<strong>${zone.name}</strong><br>${zone.label}<br><span style="font-size:0.75rem; color:#64748b;">${zone.description}</span>`, { sticky: true });
        poly.addTo(zonesLayer);
    });

    if (AppState.blueprintShowZones) {
        zonesLayer.addTo(map);
    }
    AppState.blueprintZonesLayer = zonesLayer;

    // 2. Add Markers for Filtered Category & Search Query
    AppState.blueprintMarkers = [];
    const query = (AppState.blueprintSearchQuery || '').toLowerCase().trim();
    const activeCat = AppState.blueprintCategory;

    const filteredNodes = spacePulseData.blueprintNodes.filter(node => {
        const matchesCat = activeCat === 'all' || node.category === activeCat;
        const matchesQuery = !query || 
            node.name.toLowerCase().includes(query) || 
            node.subtext.toLowerCase().includes(query) || 
            node.category.toLowerCase().includes(query);
        return matchesCat && matchesQuery;
    });

    filteredNodes.forEach(node => {
        let badgeContent = node.badge;
        // Live dynamic sync with core data if available
        if (node.id === 'floor_ground') {
            const stats = getStats();
            badgeContent = `${stats.availableLibrarySeats} Free Seats`;
        } else if (node.id.startsWith('canteen_')) {
            const c = spacePulseData.canteens.find(x => x.id === node.id);
            if (c) badgeContent = `${c.personCount} / ${c.maxCapacity} Seats`;
        } else if (node.id.startsWith('atm_')) {
            const a = spacePulseData.atms.find(x => x.id === node.id);
            if (a) badgeContent = a.hasCash ? `Cash OK (${a.queueLength} in line)` : 'Out of Order';
        }

        const iconHtml = `
            <div class="bp-marker-wrapper" id="bp-marker-${node.id}">
                <div class="bp-pulse-beacon" style="background: ${node.color}; opacity: 0.25;"></div>
                <div class="bp-marker-pin" style="background: linear-gradient(135deg, ${node.color}, #0f172a); border-color: #ffffff;">
                    <i class="fas ${node.icon}"></i>
                </div>
                <div class="bp-marker-badge" style="border-left: 3px solid ${node.color};">
                    ${badgeContent}
                </div>
            </div>
        `;

        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-blueprint-pin',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -18]
        });

        const marker = L.marker([node.y, node.x], { icon: customIcon });

        const popupHtml = `
            <div style="font-family: 'Inter', sans-serif; min-width: 220px; padding: 4px;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
                    <span style="font-size: 0.68rem; font-weight: 800; text-transform: uppercase; color: ${node.color}; letter-spacing: 0.5px;">
                        <i class="fas ${node.icon}"></i> ${node.category.toUpperCase()}
                    </span>
                    <span style="font-size: 0.68rem; background: rgba(0,0,0,0.06); padding: 2px 6px; border-radius: 4px; font-weight: 700; color: #475569;">
                        ${node.zone.toUpperCase().replace('_', ' ')}
                    </span>
                </div>
                <strong style="font-size: 0.98rem; display: block; margin-bottom: 3px; color: var(--text-primary, #0f172a); line-height: 1.25;">
                    ${node.name}
                </strong>
                <p style="font-size: 0.78rem; color: #64748b; margin-bottom: 8px; line-height: 1.3;">
                    ${node.subtext}
                </p>
                <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid ${node.color}; padding: 6px 10px; border-radius: 4px; font-size: 0.78rem; font-weight: 700; color: #047857; margin-bottom: 10px;">
                    <i class="fas fa-circle-check"></i> ${badgeContent}
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    ${node.category === 'library' ? `
                        <button onclick="switchMapMode('floorplans')" style="width: 100%; background: #10b981; color: #fff; border: none; padding: 7px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">
                            <i class="fas fa-chair"></i> View 2D Floor Plan & Hold Seat
                        </button>
                    ` : ''}
                    <button onclick="updateBlueprintOrigin('${node.id}')" style="width: 100%; background: var(--bg-alt, #f1f5f9); color: var(--text-primary, #1e293b); border: 1px solid #cbd5e1; padding: 6px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">
                        <i class="fas fa-street-view"></i> Set as My Starting Location
                    </button>
                    <button onclick="updateBlueprintDestination('${node.id}')" style="width: 100%; background: var(--primary-blue, #00008b); color: #fff; border: none; padding: 7px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">
                        <i class="fas fa-location-arrow"></i> Navigate Here on CAD Map
                    </button>
                </div>
            </div>
        `;

        marker.bindPopup(popupHtml);
        marker.addTo(markersLayer);
        AppState.blueprintMarkers.push({ id: node.id, marker: marker, node: node });
    });

    markersLayer.addTo(map);

    // 3. Render Route between Selected Origin and Destination
    const origNode = spacePulseData.blueprintOrigins.find(o => o.id === AppState.selectedBlueprintOrigin) || 
                     spacePulseData.blueprintNodes.find(n => n.id === AppState.selectedBlueprintOrigin) || 
                     spacePulseData.blueprintOrigins[0];
    const destNode = spacePulseData.blueprintNodes.find(n => n.id === AppState.selectedBlueprintDestination) || 
                     spacePulseData.blueprintNodes[0];

    if (origNode && destNode) {
        // Origin Pin
        const origIcon = L.divIcon({
            html: `
                <div style="
                    background: linear-gradient(135deg, #ef4444, #b91c1c);
                    color: #ffffff;
                    width: 32px;
                    height: 32px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 14px rgba(239, 68, 68, 0.55);
                    border: 2px solid #ffffff;
                ">
                    <i class="fas fa-person-walking" style="transform: rotate(45deg); font-size: 14px;"></i>
                </div>
            `,
            className: 'custom-blueprint-origin-pin',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        L.marker([origNode.y, origNode.x], { icon: origIcon })
            .bindPopup(`<strong>Your Origin:</strong><br>${origNode.name}`)
            .addTo(routeLayer);

        // Path line with intermediate road junction waypoints
        const waypoints = calculateBlueprintWaypoints(origNode, destNode);
        const polyline = L.polyline(waypoints, {
            color: '#10b981',
            weight: 5,
            opacity: 0.95,
            dashArray: '8, 8',
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(routeLayer);

        routeLayer.addTo(map);
        AppState.blueprintRouteLayer = routeLayer;

        // Fit bounds to route
        map.fitBounds(polyline.getBounds(), { padding: [80, 80], maxZoom: 0.2 });
    } else {
        // Default initial view: Central Academic Core
        map.fitBounds([[1000, 1800], [3200, 4200]]);
    }

    // 4. Attach Floating Toolbar Click Handlers
    const locateBtn = document.getElementById('bp-locate-btn');
    if (locateBtn) {
        locateBtn.onclick = () => {
            map.flyToBounds([[1000, 1800], [3200, 4200]], { duration: 1.2 });
            showToast('Centered on Central University Core (Library & Sumanadasa) 🏛️');
        };
    }

    const zoomInBtn = document.getElementById('bp-zoom-in-btn');
    if (zoomInBtn) {
        zoomInBtn.onclick = () => map.zoomIn();
    }

    const zoomOutBtn = document.getElementById('bp-zoom-out-btn');
    if (zoomOutBtn) {
        zoomOutBtn.onclick = () => map.zoomOut();
    }

    const contrastBtn = document.getElementById('bp-contrast-btn');
    if (contrastBtn) {
        contrastBtn.onclick = () => {
            const imgEl = imageLayer.getElement ? imageLayer.getElement() : (imageLayer._image || document.querySelector('.blueprint-map-layer'));
            if (!imgEl) return;
            const isCurrentlyDark = imgEl.classList.contains('dark-blueprint');
            if (isCurrentlyDark) {
                imgEl.classList.remove('dark-blueprint');
                contrastBtn.classList.remove('active-branch');
                AppState.blueprintContrastMode = 'light';
                showToast('Switched to CAD Architectural Light Mode 📐');
            } else {
                imgEl.classList.add('dark-blueprint');
                contrastBtn.classList.add('active-branch');
                AppState.blueprintContrastMode = 'dark';
                showToast('Switched to Cyber-Dark Holographic Mode 🌙');
            }
        };
    }

    const zonesBtn = document.getElementById('bp-zones-btn');
    if (zonesBtn) {
        zonesBtn.onclick = () => {
            AppState.blueprintShowZones = !AppState.blueprintShowZones;
            if (AppState.blueprintShowZones) {
                map.addLayer(zonesLayer);
                zonesBtn.classList.add('active-branch');
                showToast('CAD Cleaning & Infrastructure Boundaries enabled 🛡️');
            } else {
                map.removeLayer(zonesLayer);
                zonesBtn.classList.remove('active-branch');
                showToast('CAD Boundaries hidden');
            }
        };
    }

    const fsBtn = document.getElementById('bp-fullscreen-btn');
    if (fsBtn) {
        fsBtn.onclick = () => {
            const wrapper = document.querySelector('.blueprint-map-wrapper');
            if (!wrapper) return;
            if (!document.fullscreenElement) {
                wrapper.requestFullscreen().catch(err => console.log(err));
            } else {
                document.exitFullscreen().catch(err => console.log(err));
            }
        };
    }

    setTimeout(() => map.invalidateSize(), 50);
    setTimeout(() => map.invalidateSize(), 200);
    setTimeout(() => map.invalidateSize(), 500);

    AppState.blueprintMap = map;
}

function initLeafletMap() {
    const mapElement = document.getElementById('osm-map-container');
    if (!mapElement) return;

    if (AppState.leafletMap) {
        AppState.leafletMap.remove();
        AppState.leafletMap = null;
    }

    // Precise university core coordinates matching the user screenshot
    const moratuwaCenter = [6.79678, 79.90110];
    const map = L.map('osm-map-container', {
        center: moratuwaCenter,
        zoom: 17,
        zoomControl: false, // Using the floating toolbar controls matching the screenshot
        scrollWheelZoom: true
    });

    const isDark = AppState.theme === 'dark';

    // 1. Google Maps University Street Layer (100% reliable, zero 403 access blocks, ultra-crisp university roads & landmarks)
    const googleStreetLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
    });

    // 2. Google Maps Hybrid (High-resolution aerial satellite photo with building & street names)
    const googleHybridLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
    });

    // 3. Cyber Dark University (Night Mode - Google Maps base with dark theme styling, zero blocks)
    const darkLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        className: 'dark-mode-tiles',
        attribution: '&copy; Google Maps'
    });

    // 4. Esri World Street Map (Official public GIS university street basemap with building footprints)
    const esriStreetLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
    });

    // 5. Esri World Imagery (Aerial satellite photo view)
    const esriSatLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
    });

    // 6. Humanitarian OpenStreetMap (HOT - Open humanitarian mirror without 403 restrictions)
    const osmHotLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
        attribution: '&copy; OpenStreetMap contributors, Humanitarian OpenStreetMap Team'
    });

    // Set default basemap based on active theme
    const activeTileLayer = isDark ? darkLayer : googleStreetLayer;
    activeTileLayer.addTo(map);

    AppState.activeMapTileLayer = activeTileLayer;
    AppState.googleStreetLayer = googleStreetLayer;
    AppState.darkLayer = darkLayer;

    // Basemap Switcher Controller
    const baseLayers = {
        "📍 Google Maps (University Street)": googleStreetLayer,
        "🌍 Google Maps Hybrid (Satellite)": googleHybridLayer,
        "🏛️ Esri World Street Map": esriStreetLayer,
        "🛰️ Esri Aerial Satellite": esriSatLayer,
        "🌙 Cyber Dark (Night Mode)": darkLayer,
        "🗺️ Humanitarian OpenStreetMap": osmHotLayer
    };
    L.control.layers(baseLayers, null, { position: 'topleft' }).addTo(map);

    // --- Building Highlight Zones (Translucent Bounding Boxes from Picture) ---
    const zonesLayer = L.layerGroup();

    // Zone 1: Architecture New Building & Transport Complex (South - Indigo/Purple)
    L.polygon([
        [6.79525, 79.90110],
        [6.79525, 79.90230],
        [6.79630, 79.90230],
        [6.79630, 79.90110]
    ], {
        color: '#6366f1',
        weight: 1.8,
        opacity: 0.85,
        fillColor: '#6366f1',
        fillOpacity: 0.12
    }).bindTooltip("<strong>Architecture & Transport Complex</strong><br>Architecture New Building & Design Studios", { sticky: true }).addTo(zonesLayer);

    // Zone 2: Earth Resources Engineering & Heavy Labs (West - Amber/Orange)
    L.polygon([
        [6.79615, 79.89925],
        [6.79615, 79.90045],
        [6.79690, 79.90045],
        [6.79690, 79.89925]
    ], {
        color: '#f59e0b',
        weight: 1.8,
        opacity: 0.85,
        fillColor: '#f59e0b',
        fillOpacity: 0.12
    }).bindTooltip("<strong>Earth Resources Engineering Complex</strong><br>Dept. of Earth Resources & Goda Uda Canteen", { sticky: true }).addTo(zonesLayer);

    // Zone 3: Food Court and Study Area (Center - Emerald/Teal)
    L.polygon([
        [6.79635, 79.90075],
        [6.79635, 79.90150],
        [6.79690, 79.90150],
        [6.79690, 79.90075]
    ], {
        color: '#10b981',
        weight: 1.8,
        opacity: 0.85,
        fillColor: '#10b981',
        fillOpacity: 0.12
    }).bindTooltip("<strong>Food Court & Student Study Area</strong><br>Central Canteen, WUS Welfare & Study Garden", { sticky: true }).addTo(zonesLayer);

    // Zone 4: New Classroom Block & Sentra Court (East - Violet/Purple)
    L.polygon([
        [6.79670, 79.90160],
        [6.79670, 79.90235],
        [6.79730, 79.90235],
        [6.79730, 79.90160]
    ], {
        color: '#8b5cf6',
        weight: 1.8,
        opacity: 0.85,
        fillColor: '#8b5cf6',
        fillOpacity: 0.12
    }).bindTooltip("<strong>New Classroom Block</strong><br>Lecture Theatres & L Canteen", { sticky: true }).addTo(zonesLayer);

    zonesLayer.addTo(map);

    // --- University Pedestrian Mesh Network Lines (Translucent Interconnecting Links from Picture) ---
    const networkMeshLayer = L.layerGroup();
    const universityMeshSegments = [
        [[6.79580, 79.90180], [6.79720, 79.90120]], // Architecture to Sumanadasa
        [[6.79580, 79.90180], [6.79655, 79.89995]], // Architecture to West Canteen
        [[6.79580, 79.90180], [6.79658, 79.90105]], // Architecture to Food Court
        [[6.79720, 79.90120], [6.79695, 79.90195]], // Sumanadasa to East Canteen
        [[6.79720, 79.90120], [6.79710, 79.90060]], // Sumanadasa to NW Junction
        [[6.79710, 79.90060], [6.79655, 79.89995]], // NW Junction to West Canteen
        [[6.79720, 79.90120], [6.79658, 79.90105]], // Sumanadasa to Food Court
        [[6.79655, 79.89995], [6.79658, 79.90105]], // West Canteen to Food Court
        [[6.79695, 79.90195], [6.79658, 79.90105]]  // East Canteen to Food Court
    ];

    universityMeshSegments.forEach(coords => {
        L.polyline(coords, {
            color: '#4f46e5',
            weight: 2.5,
            opacity: 0.65,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(networkMeshLayer);
    });

    networkMeshLayer.addTo(map);

    // --- Custom Markers Matching The User's Screenshot ---

    // 1. South Node: User Location at Architecture New Building (Pulsing ring + blue circle + orange pin)
    const userLocIcon = L.divIcon({
        html: `
            <div class="map-user-location-pin">
                <div class="user-pulse-ring"></div>
                <div class="user-outer-circle">
                    <div class="user-inner-dot"></div>
                </div>
                <div class="user-badge-pin"><i class="fas fa-location-dot"></i></div>
            </div>
        `,
        className: 'custom-halo-pin-wrap',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
    L.marker([6.79580, 79.90180], { icon: userLocIcon })
        .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; min-width: 175px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: #2563eb; text-transform: uppercase;">Your Current Location</span>
                <strong style="font-size: 0.95rem; display: block; margin: 3px 0; color: #0f172a;">Architecture New Building</strong>
                <p style="font-size: 0.78rem; color: #64748b; margin-bottom: 8px;">Design Studios & Dept. of Transport Engineering</p>
                <button onclick="updateTravelOrigin('orig_arch')" style="width: 100%; background: #2563eb; color: #ffffff; border: none; padding: 6px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">Set as My Start Point 🚶</button>
            </div>
        `)
        .addTo(map);

    // 2. North Node: Sumanadasa Building (Navy Circle + Halo)
    const sumanadasaIcon = L.divIcon({
        html: `
            <div class="map-halo-pin blue">
                <div class="pin-halo"></div>
                <div class="pin-core"><i class="fas fa-graduation-cap"></i></div>
            </div>
        `,
        className: 'custom-halo-pin-wrap',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    });
    L.marker([6.79720, 79.90120], { icon: sumanadasaIcon })
        .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; min-width: 175px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: #1e3a8a; text-transform: uppercase;">Engineering Faculty Core</span>
                <strong style="font-size: 0.95rem; display: block; margin: 3px 0; color: #0f172a;">Sumanadasa Building</strong>
                <p style="font-size: 0.78rem; color: #64748b; margin-bottom: 8px;">Faculty Administration, Lecture Halls & Labs</p>
                <button onclick="updateTravelDestination('floor_ground')" style="width: 100%; background: #00008b; color: #ffffff; border: none; padding: 6px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">Walk to Sumanadasa <i class="fas fa-location-arrow"></i></button>
            </div>
        `)
        .addTo(map);

    // 3. West Node: Goda Uda Canteen (Green Halo Pin)
    const westCanteenIcon = L.divIcon({
        html: `
            <div class="map-halo-pin green">
                <div class="pin-halo"></div>
                <div class="pin-core"><i class="fas fa-utensils"></i></div>
            </div>
        `,
        className: 'custom-halo-pin-wrap',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    });
    const godaUda = spacePulseData.canteens.find(c => c.id === 'canteen_goda_uda');
    L.marker([6.79655, 79.89995], { icon: westCanteenIcon })
        .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; min-width: 180px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: #10b981; text-transform: uppercase;">Canteen (Upper Floor)</span>
                <strong style="font-size: 0.95rem; display: block; margin: 3px 0; color: #0f172a;">Goda Uda Canteen</strong>
                <div style="background: rgba(16, 185, 129, 0.12); padding: 5px 8px; border-radius: 6px; color: #10b981; font-weight: 700; font-size: 0.78rem; margin: 6px 0;">
                    <i class="fas fa-users"></i> ${godaUda ? godaUda.personCount : 45} / 150 students • Short Queue
                </div>
                <button onclick="updateTravelDestination('canteen_goda_uda')" style="width: 100%; background: #10b981; color: #ffffff; border: none; padding: 6px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">Walk to Canteen <i class="fas fa-location-arrow"></i></button>
            </div>
        `)
        .addTo(map);

    // 4. East Node: L Canteen / Sentra Court (Orange Halo Pin)
    const eastCanteenIcon = L.divIcon({
        html: `
            <div class="map-halo-pin orange">
                <div class="pin-halo"></div>
                <div class="pin-core"><i class="fas fa-utensils"></i></div>
            </div>
        `,
        className: 'custom-halo-pin-wrap',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    });
    const canteenL = spacePulseData.canteens.find(c => c.id === 'canteen_l');
    L.marker([6.79695, 79.90195], { icon: eastCanteenIcon })
        .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; min-width: 180px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: #f97316; text-transform: uppercase;">Canteen (Sentra Court)</span>
                <strong style="font-size: 0.95rem; display: block; margin: 3px 0; color: #0f172a;">L Canteen (C3)</strong>
                <div style="background: rgba(249, 115, 22, 0.12); padding: 5px 8px; border-radius: 6px; color: #f97316; font-weight: 700; font-size: 0.78rem; margin: 6px 0;">
                    <i class="fas fa-users"></i> ${canteenL ? canteenL.personCount : 120} students • Bakery & Meals
                </div>
                <button onclick="updateTravelDestination('canteen_l')" style="width: 100%; background: #f97316; color: #ffffff; border: none; padding: 6px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">Walk to Canteen <i class="fas fa-location-arrow"></i></button>
            </div>
        `)
        .addTo(map);

    // 5. Center Node A: Goda Yata Canteen (Red Halo Pin)
    const centerCanteenIcon = L.divIcon({
        html: `
            <div class="map-halo-pin red">
                <div class="pin-halo"></div>
                <div class="pin-core"><i class="fas fa-utensils"></i></div>
            </div>
        `,
        className: 'custom-halo-pin-wrap',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    });
    const godaYata = spacePulseData.canteens.find(c => c.id === 'canteen_goda_yata');
    L.marker([6.79658, 79.90105], { icon: centerCanteenIcon })
        .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; min-width: 180px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: #ef4444; text-transform: uppercase;">Central Food Court</span>
                <strong style="font-size: 0.95rem; display: block; margin: 3px 0; color: #0f172a;">Goda Yata Canteen</strong>
                <div style="background: rgba(239, 68, 68, 0.12); padding: 5px 8px; border-radius: 6px; color: #ef4444; font-weight: 700; font-size: 0.78rem; margin: 6px 0;">
                    <i class="fas fa-users"></i> ${godaYata ? godaYata.personCount : 80} students • Rice & Juice
                </div>
                <button onclick="updateTravelDestination('canteen_goda_yata')" style="width: 100%; background: #ef4444; color: #ffffff; border: none; padding: 6px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">Walk to Food Court <i class="fas fa-location-arrow"></i></button>
            </div>
        `)
        .addTo(map);

    // 6. Center Node B: Student Center Welfare & Bookshop (Red Book Pin)
    const bookshopPinIcon = L.divIcon({
        html: `
            <div class="map-halo-pin red">
                <div class="pin-core" style="background: #b91c1c;"><i class="fas fa-book"></i></div>
            </div>
        `,
        className: 'custom-halo-pin-wrap',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });
    L.marker([6.79648, 79.90125], { icon: bookshopPinIcon })
        .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; min-width: 170px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: #b91c1c; text-transform: uppercase;">Bookshop & Welfare</span>
                <strong style="font-size: 0.95rem; display: block; margin: 3px 0; color: #0f172a;">WUS Welfare Centre</strong>
                <p style="font-size: 0.78rem; color: #64748b; margin-bottom: 8px;">Textbooks, Photocopying, Printing</p>
                <button onclick="updateTravelDestination('bookshop_main')" style="width: 100%; background: #b91c1c; color: #ffffff; border: none; padding: 6px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">Navigate Here <i class="fas fa-location-arrow"></i></button>
            </div>
        `)
        .addTo(map);

    // 7. NW Node: Wala Canteen Lane (White/Purple Pin)
    const walaIcon = L.divIcon({
        html: `
            <div class="map-halo-pin white-purple">
                <div class="pin-core"><i class="fas fa-utensils"></i></div>
            </div>
        `,
        className: 'custom-halo-pin-wrap',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });
    L.marker([6.79710, 79.90060], { icon: walaIcon })
        .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; min-width: 170px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: #8b5cf6; text-transform: uppercase;">Open-Air Canteen</span>
                <strong style="font-size: 0.95rem; display: block; margin: 3px 0; color: #0f172a;">Wala Canteen Lane</strong>
                <p style="font-size: 0.78rem; color: #64748b; margin-bottom: 8px;">Amphitheatre & Quick Snacks</p>
                <button onclick="updateTravelDestination('canteen_wala')" style="width: 100%; background: #8b5cf6; color: #ffffff; border: none; padding: 6px 10px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.78rem;">Walk to Wala Canteen <i class="fas fa-location-arrow"></i></button>
            </div>
        `)
        .addTo(map);

    // 8. Other Key University Landmarks (Central Library, ATMs)
    const otherNodes = spacePulseData.universityGpsNodes.filter(n => 
        !['canteen_goda_uda', 'canteen_goda_yata', 'canteen_l', 'canteen_wala', 'bookshop_main'].includes(n.id)
    );

    otherNodes.forEach(node => {
        let pinColor = '#00008b';
        let iconClass = 'fa-location-dot';
        let bgGradient = 'linear-gradient(135deg, #00008b, #1e3a8a)';

        if (node.category === 'library') {
            pinColor = '#10b981';
            iconClass = 'fa-book-reader';
            bgGradient = 'linear-gradient(135deg, #059669, #10b981)';
        } else if (node.category === 'atm') {
            pinColor = '#3b82f6';
            iconClass = 'fa-money-check-dollar';
            bgGradient = 'linear-gradient(135deg, #2563eb, #3b82f6)';
        } else if (node.category === 'bookshop') {
            pinColor = '#8b5cf6';
            iconClass = 'fa-book';
            bgGradient = 'linear-gradient(135deg, #7c3aed, #8b5cf6)';
        }

        const customIcon = L.divIcon({
            html: `
                <div style="
                    background: ${bgGradient};
                    color: #ffffff;
                    width: 32px;
                    height: 32px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.35);
                    border: 2px solid #ffffff;
                ">
                    <i class="fas ${iconClass}" style="transform: rotate(45deg); font-size: 13px;"></i>
                </div>
            `,
            className: 'custom-map-pin',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);

        let popupText = `
            <div style="min-width: 175px; font-family: 'Inter', sans-serif;">
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                    <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 800; color: ${pinColor}; letter-spacing: 0.5px;">${node.category}</span>
                </div>
                <strong style="font-size: 0.95rem; display: block; margin-bottom: 2px; color: #0f172a;">${node.name}</strong>
                <span style="font-size: 0.78rem; color: #64748b; display: block; margin-bottom: 8px;">${node.landmark}</span>
        `;

        if (node.category === 'library') {
            const stats = getStats();
            popupText += `<div style="background: rgba(16, 185, 129, 0.12); padding: 5px 8px; border-radius: 6px; color: #10b981; font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">
                <i class="fas fa-chair"></i> ${stats.availableLibrarySeats} Seats Free Right Now
            </div>`;
        }

        popupText += `
                <button onclick="updateTravelDestination('${node.id}')" style="
                    width: 100%;
                    background: #00008b;
                    color: #ffffff;
                    border: none;
                    padding: 7px 10px;
                    border-radius: 6px;
                    font-size: 0.78rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                ">Navigate Here <i class="fas fa-location-arrow"></i></button>
            </div>
        `;

        marker.bindPopup(popupText);
    });

    // Render Origin Point, Destination Node & Walking Path
    const origin = spacePulseData.originPoints.find(o => o.id === AppState.selectedOrigin);
    const destination = spacePulseData.universityGpsNodes.find(n => n.id === AppState.selectedDestination);

    if (origin && destination) {
        // Custom Origin Pin (Red Pulsing Pin)
        const originIcon = L.divIcon({
            html: `
                <div style="
                    background: linear-gradient(135deg, #ef4444, #b91c1c);
                    color: #ffffff;
                    width: 32px;
                    height: 32px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
                    border: 2px solid #ffffff;
                ">
                    <i class="fas fa-person-walking" style="transform: rotate(45deg); font-size: 14px;"></i>
                </div>
            `,
            className: 'custom-origin-pin',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        L.marker([origin.lat, origin.lng], { icon: originIcon })
            .bindPopup(`<strong>Your Origin:</strong><br>${origin.name}`)
            .addTo(map);

        const polyline = L.polyline([
            [origin.lat, origin.lng],
            [destination.lat, destination.lng]
        ], {
            color: '#10b981',
            weight: 5,
            opacity: 0.9,
            dashArray: '8, 8'
        }).addTo(map);

        map.fitBounds(polyline.getBounds(), { padding: [55, 55] });
    }

    // --- Floating Controls Click Handlers ---
    const locateBtn = document.getElementById('map-locate-btn');
    if (locateBtn) {
        locateBtn.onclick = () => {
            map.flyTo([6.79580, 79.90180], 17.5, { duration: 1.2 });
            showToast('Centered on your university location: Architecture Building 📍');
        };
    }

    const zoomInBtn = document.getElementById('map-zoom-in-btn');
    if (zoomInBtn) {
        zoomInBtn.onclick = () => map.zoomIn();
    }

    const zoomOutBtn = document.getElementById('map-zoom-out-btn');
    if (zoomOutBtn) {
        zoomOutBtn.onclick = () => map.zoomOut();
    }

    const networkBtn = document.getElementById('map-network-toggle-btn');
    if (networkBtn) {
        let meshVisible = true;
        networkBtn.onclick = () => {
            meshVisible = !meshVisible;
            if (meshVisible) {
                map.addLayer(networkMeshLayer);
                map.addLayer(zonesLayer);
                networkBtn.classList.add('active-branch');
                showToast('University pedestrian network & zones enabled 🕸️');
            } else {
                map.removeLayer(networkMeshLayer);
                map.removeLayer(zonesLayer);
                networkBtn.classList.remove('active-branch');
                showToast('University pedestrian network hidden');
            }
        };
    }

    // Multiple invalidateSize calls to ensure clean canvas without gray areas
    setTimeout(() => map.invalidateSize(), 50);
    setTimeout(() => map.invalidateSize(), 200);
    setTimeout(() => map.invalidateSize(), 500);

    AppState.leafletMap = map;
}

let currentCadZoom = 1.0;

function zoomFloorSvg(delta) {
    currentCadZoom = Math.max(0.6, Math.min(2.0, currentCadZoom + delta));
    const target = document.querySelector('.architectural-svg');
    const levelDisplay = document.getElementById('cad-zoom-level');
    if (target) {
        target.style.transform = `scale(${currentCadZoom})`;
        target.style.transformOrigin = 'center center';
        target.style.transition = 'transform 0.2s ease';
    }
    if (levelDisplay) {
        levelDisplay.textContent = `${Math.round(currentCadZoom * 100)}%`;
    }
}

function resetFloorSvgZoom() {
    currentCadZoom = 1.0;
    const target = document.querySelector('.architectural-svg');
    const levelDisplay = document.getElementById('cad-zoom-level');
    if (target) {
        target.style.transform = 'scale(1)';
    }
    if (levelDisplay) {
        levelDisplay.textContent = '100%';
    }
}

function renderFloor1Svg() {
    const seats = spacePulseData.seatsByFloor['floor_1'] || [];
    const filter = AppState.seatFilter;

    function renderSeat(s) {
        if (filter === 'free' && s.status !== 'free') return '';
        if (filter === 'occupied' && s.status !== 'occupied') return '';
        if (filter === 'power' && !s.powerOutlet) return '';

        const isUserReserved = AppState.activeReservation && AppState.activeReservation.seatId === s.id;
        const effectiveStatus = isUserReserved ? 'reserved' : s.status;

        return `
            <g class="seat-node ${effectiveStatus}" transform="translate(${s.x}, ${s.y})" onclick="openSeatModal('${s.id}', 'floor_1')">
                ${effectiveStatus === 'free' || isUserReserved ? '<circle class="seat-halo" cx="0" cy="0" r="13"></circle>' : ''}
                <circle class="seat-circle" cx="0" cy="0" r="9.5"></circle>
                <text class="seat-node-text" x="0" y="0" font-size="6.5">${s.seatNumber}</text>
                ${s.powerOutlet ? '<circle cx="6.5" cy="-6.5" r="2.8" fill="#38bdf8" stroke="#ffffff" stroke-width="0.7"></circle>' : ''}
            </g>
        `;
    }

    return `
        <svg class="architectural-svg" viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg" style="background: #08111e; border-radius: 8px; width: 100%; height: auto; max-height: 520px;">
            <defs>
                <pattern id="cadGrid1" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30, 41, 59, 0.45)" stroke-width="0.6"/>
                </pattern>
            </defs>
            <rect width="1000" height="560" fill="url(#cadGrid1)" />
            <rect x="340" y="16" width="530" height="528" rx="14" fill="#0d1829" stroke="#1e3a5f" stroke-width="2"/>

            <!-- Discussion Room (Top Left) -->
            <rect x="360" y="36" width="125" height="115" rx="8" fill="#131c2d" stroke="#38bdf8" stroke-width="1.8"/>
            <text x="422" y="58" fill="#38bdf8" font-size="10" font-weight="800" text-anchor="middle" letter-spacing="0.5">DISCUSSION ROOM</text>
            <circle cx="422" cy="107" r="22" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
            ${seats.filter(s => s.section === 'Discussion Room').map(renderSeat).join('')}

            <!-- Computer Laboratory (Top Mid) -->
            <rect x="500" y="36" width="185" height="115" rx="8" fill="#131c2d" stroke="#38bdf8" stroke-width="1.8"/>
            <text x="592" y="58" fill="#38bdf8" font-size="10" font-weight="800" text-anchor="middle" letter-spacing="0.5">COMPUTER LABORATORY</text>
            <rect x="515" y="75" width="155" height="20" rx="4" fill="#1e293b" stroke="#334155"/>
            <rect x="515" y="114" width="155" height="20" rx="4" fill="#1e293b" stroke="#334155"/>
            ${seats.filter(s => s.section === 'Computer Laboratory').map(renderSeat).join('')}

            <!-- Seminar Hall (Top Right) -->
            <rect x="700" y="36" width="155" height="115" rx="8" fill="#241b12" stroke="#f59e0b" stroke-width="1.8"/>
            <text x="777" y="56" fill="#f59e0b" font-size="10" font-weight="800" text-anchor="middle" letter-spacing="0.5">SEMINAR HALL</text>
            <text x="777" y="70" fill="#d97706" font-size="8" text-anchor="middle">Academic Lectures & Forums</text>
            <line x1="718" y1="84" x2="838" y2="84" stroke="#451a03" stroke-width="2.5"/>
            <line x1="718" y1="94" x2="838" y2="94" stroke="#451a03" stroke-width="2.5"/>
            <line x1="718" y1="104" x2="838" y2="104" stroke="#451a03" stroke-width="2.5"/>
            <line x1="718" y1="114" x2="838" y2="114" stroke="#451a03" stroke-width="2.5"/>
            <rect x="755" y="128" width="45" height="14" rx="3" fill="#78350f"/>
            <text x="777" y="138" fill="#fde68a" font-size="7" font-weight="700" text-anchor="middle">PODIUM</text>

            <!-- Mid Row -->
            <rect x="360" y="165" width="125" height="36" rx="6" fill="#15281e" stroke="#22c55e" stroke-width="1.5"/>
            <text x="422" y="188" fill="#4ade80" font-size="9" font-weight="700" text-anchor="middle">Copy Center</text>

            <rect x="360" y="210" width="125" height="34" rx="6" fill="#162234" stroke="#475569" stroke-width="1.2"/>
            <text x="422" y="231" fill="#94a3b8" font-size="8" font-weight="600" text-anchor="middle">Bound Periodicals</text>

            <rect x="500" y="165" width="185" height="80" rx="8" fill="#101e33" stroke="#2563eb" stroke-width="1.8"/>
            <text x="592" y="196" fill="#60a5fa" font-size="10" font-weight="800" text-anchor="middle" letter-spacing="0.5">CURRENT PERIODICALS COLLECTION</text>
            <text x="592" y="214" fill="#94a3b8" font-size="8" text-anchor="middle">Journals, Magazines & Daily News Sheets</text>

            <rect x="700" y="165" width="155" height="80" rx="8" fill="#192333" stroke="#475569" stroke-width="1.5"/>
            <text x="777" y="186" fill="#94a3b8" font-size="9" font-weight="800" text-anchor="middle" letter-spacing="0.5">STAIRCASE</text>
            <line x1="720" y1="198" x2="835" y2="198" stroke="#334155" stroke-width="2"/>
            <line x1="720" y1="206" x2="835" y2="206" stroke="#334155" stroke-width="2"/>
            <line x1="720" y1="214" x2="835" y2="214" stroke="#334155" stroke-width="2"/>
            <line x1="720" y1="222" x2="835" y2="222" stroke="#334155" stroke-width="2"/>

            <!-- Lower Row: Main Study Areas (6 Tables) -->
            <rect x="360" y="260" width="60" height="65" rx="6" fill="#16202e" stroke="#475569"/>
            <text x="390" y="288" fill="#94a3b8" font-size="7.5" font-weight="700" text-anchor="middle">Senior Asst.</text>
            <text x="390" y="300" fill="#94a3b8" font-size="7" text-anchor="middle">Librarian / IPR</text>

            <rect x="430" y="260" width="55" height="65" rx="6" fill="#16202e" stroke="#475569"/>
            <text x="457" y="290" fill="#94a3b8" font-size="7" font-weight="700" text-anchor="middle">Periodicals</text>
            <text x="457" y="302" fill="#94a3b8" font-size="7" text-anchor="middle">Office</text>

            <rect x="495" y="260" width="220" height="155" rx="8" fill="#2d1c10" stroke="#ea580c" stroke-width="2"/>
            <text x="605" y="280" fill="#f97316" font-size="10" font-weight="800" text-anchor="middle" letter-spacing="0.5">MAIN STUDY AREAS (6 TABLES)</text>
            <rect x="508" y="296" width="52" height="32" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="578" y="296" width="52" height="32" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="648" y="296" width="52" height="32" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="508" y="356" width="52" height="32" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="578" y="356" width="52" height="32" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="648" y="356" width="52" height="32" rx="4" fill="#431407" stroke="#7c2d12"/>
            ${seats.filter(s => s.section === 'Main Study Areas').map(renderSeat).join('')}

            <rect x="430" y="340" width="55" height="75" rx="6" fill="#0d291e" stroke="#10b981" stroke-width="1.8"/>
            <text x="457" y="362" fill="#34d399" font-size="8" font-weight="800" text-anchor="middle">PERMANENT</text>
            <text x="457" y="374" fill="#34d399" font-size="8" font-weight="800" text-anchor="middle">REFERENCE</text>
            ${seats.filter(s => s.section === 'Permanent Reference').map(renderSeat).join('')}

            <rect x="725" y="260" width="130" height="155" rx="8" fill="#0c252d" stroke="#06b6d4" stroke-width="1.8"/>
            <text x="790" y="332" fill="#22d3ee" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">THESES</text>
            <text x="790" y="348" fill="#0891b2" font-size="8" text-anchor="middle">Collection</text>

            <rect x="510" y="430" width="190" height="55" rx="8" fill="#132034" stroke="#2563eb" stroke-width="1.5"/>
            <text x="605" y="454" fill="#60a5fa" font-size="9" font-weight="800" text-anchor="middle" letter-spacing="0.5">PERIODICALS COLLECTIONS</text>
            <text x="605" y="468" fill="#94a3b8" font-size="7.5" text-anchor="middle">Back Issues Stacks</text>
        </svg>
    `;
}

function renderFloor3Svg() {
    const seats = spacePulseData.seatsByFloor['floor_3'] || [];
    const filter = AppState.seatFilter;

    function renderSeat(s) {
        if (filter === 'free' && s.status !== 'free') return '';
        if (filter === 'occupied' && s.status !== 'occupied') return '';
        if (filter === 'power' && !s.powerOutlet) return '';

        const isUserReserved = AppState.activeReservation && AppState.activeReservation.seatId === s.id;
        const effectiveStatus = isUserReserved ? 'reserved' : s.status;

        return `
            <g class="seat-node ${effectiveStatus}" transform="translate(${s.x}, ${s.y})" onclick="openSeatModal('${s.id}', 'floor_3')">
                ${effectiveStatus === 'free' || isUserReserved ? '<circle class="seat-halo" cx="0" cy="0" r="13"></circle>' : ''}
                <circle class="seat-circle" cx="0" cy="0" r="9.5"></circle>
                <text class="seat-node-text" x="0" y="0" font-size="6.5">${s.seatNumber}</text>
                ${s.powerOutlet ? '<circle cx="6.5" cy="-6.5" r="2.8" fill="#38bdf8" stroke="#ffffff" stroke-width="0.7"></circle>' : ''}
            </g>
        `;
    }

    return `
        <svg class="architectural-svg" viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg" style="background: #08111e; border-radius: 8px; width: 100%; height: auto; max-height: 520px;">
            <defs>
                <pattern id="cadGrid3" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30, 41, 59, 0.45)" stroke-width="0.6"/>
                </pattern>
            </defs>
            <rect width="1000" height="560" fill="url(#cadGrid3)" />
            <rect x="340" y="16" width="530" height="528" rx="14" fill="#0d1829" stroke="#1e3a5f" stroke-width="2"/>

            <!-- Top Row -->
            <rect x="360" y="36" width="60" height="75" rx="6" fill="#131e2e" stroke="#38bdf8"/>
            <text x="390" y="70" fill="#38bdf8" font-size="7.5" font-weight="800" text-anchor="middle">IT / AV</text>
            <text x="390" y="82" fill="#64748b" font-size="7" text-anchor="middle">Section</text>

            <rect x="430" y="36" width="65" height="75" rx="6" fill="#2d1c10" stroke="#f59e0b"/>
            <text x="462" y="55" fill="#f59e0b" font-size="8" font-weight="700" text-anchor="middle">Study Area</text>
            ${seats.filter(s => s.section === 'Study Area Top').map(renderSeat).join('')}

            <!-- Lending Library Collections (Upper) -->
            <rect x="505" y="36" width="350" height="120" rx="8" fill="#2d2310" stroke="#eab308" stroke-width="2"/>
            <text x="680" y="58" fill="#facc15" font-size="10" font-weight="800" text-anchor="middle" letter-spacing="0.5">LENDING LIBRARY COLLECTIONS (UPPER)</text>
            <text x="680" y="72" fill="#ca8a04" font-size="8" text-anchor="middle">Main Academic Stacks & Seating Desks</text>
            <line x1="525" y1="90" x2="835" y2="90" stroke="#713f12" stroke-width="2.5"/>
            <line x1="525" y1="125" x2="835" y2="125" stroke="#713f12" stroke-width="2.5"/>
            ${seats.filter(s => s.section === 'Lending Upper').map(renderSeat).join('')}

            <!-- Mid Row: Librarian, Lift with red star YOU ARE HERE, Central Open Atrium -->
            <rect x="360" y="120" width="60" height="40" rx="6" fill="#0d291e" stroke="#10b981"/>
            <text x="390" y="144" fill="#34d399" font-size="8" font-weight="800" text-anchor="middle">LIBRARIAN</text>

            <rect x="360" y="170" width="60" height="75" rx="6" fill="#182436" stroke="#64748b"/>
            <text x="382" y="195" fill="#94a3b8" font-size="7.5" font-weight="800">▼ DN</text>
            <rect x="398" y="183" width="18" height="18" rx="3" fill="#334155"/>
            <text x="407" y="195" fill="#f8fafc" font-size="6.5" font-weight="700" text-anchor="middle">LIFT</text>
            <g transform="translate(390, 222)">
                <polygon points="0,-7 2,-2 7,-2 3,2 4,7 0,4 -4,7 -3,2 -7,-2 -2,-2" fill="#ef4444"/>
                <text x="0" y="12" fill="#ef4444" font-size="6" font-weight="800" text-anchor="middle">YOU ARE HERE</text>
            </g>

            <rect x="440" y="170" width="235" height="115" rx="14" fill="#092833" stroke="#06b6d4" stroke-width="2.2"/>
            <rect x="450" y="180" width="215" height="95" rx="10" fill="none" stroke="#22d3ee" stroke-width="1.2" stroke-dasharray="4 3"/>
            <text x="557" y="233" fill="#38bdf8" font-size="12" font-weight="800" text-anchor="middle" letter-spacing="0.5">CENTRAL OPEN ATRIUM</text>
            <text x="557" y="249" fill="#0891b2" font-size="8" text-anchor="middle">Natural Light Well & Architectural Void</text>
            ${seats.filter(s => s.section === 'Central Atrium').map(renderSeat).join('')}

            <rect x="690" y="170" width="55" height="52" rx="6" fill="#2d1c10" stroke="#f59e0b"/>
            <text x="717" y="190" fill="#f59e0b" font-size="7.5" font-weight="700" text-anchor="middle">Study Area</text>
            ${seats.filter(s => s.section === 'Study Area Mid').map(renderSeat).join('')}

            <rect x="690" y="233" width="55" height="52" rx="6" fill="#2d1c10" stroke="#f59e0b"/>
            <text x="717" y="253" fill="#f59e0b" font-size="7.5" font-weight="700" text-anchor="middle">Study Area</text>
            ${seats.filter(s => s.section === 'Study Area Low').map(renderSeat).join('')}

            <rect x="760" y="170" width="95" height="115" rx="8" fill="#131e2e" stroke="#38bdf8"/>
            <text x="807" y="195" fill="#38bdf8" font-size="8.5" font-weight="800" text-anchor="middle">OPAC Online</text>
            <line x1="775" y1="210" x2="840" y2="210" stroke="#334155" stroke-width="2"/>
            <line x1="775" y1="220" x2="840" y2="220" stroke="#334155" stroke-width="2"/>
            <line x1="775" y1="230" x2="840" y2="230" stroke="#334155" stroke-width="2"/>
            <line x1="775" y1="240" x2="840" y2="240" stroke="#334155" stroke-width="2"/>

            <!-- Bottom Row: General Office, Circulation Counter, OPAC Catalogue, Lending Lower -->
            <rect x="360" y="255" width="65" height="150" rx="8" fill="#0d291e" stroke="#10b981" stroke-width="1.8"/>
            <text x="392" y="335" fill="#34d399" font-size="9" font-weight="800" text-anchor="middle">GENERAL</text>
            <text x="392" y="349" fill="#34d399" font-size="9" font-weight="800" text-anchor="middle">OFFICE</text>

            <rect x="440" y="300" width="75" height="85" rx="8" fill="#251333" stroke="#a855f7" stroke-width="1.8"/>
            <text x="477" y="337" fill="#c084fc" font-size="8" font-weight="800" text-anchor="middle">CIRCULATION</text>
            <text x="477" y="349" fill="#c084fc" font-size="8" font-weight="800" text-anchor="middle">COUNTER</text>

            <rect x="525" y="310" width="70" height="40" rx="6" fill="#101e33" stroke="#2563eb" stroke-width="1.5"/>
            <text x="560" y="327" fill="#60a5fa" font-size="7.5" font-weight="800" text-anchor="middle">OPAC CATALOGUE</text>
            ${seats.filter(s => s.section === 'OPAC Catalogue').map(renderSeat).join('')}

            <rect x="605" y="300" width="250" height="85" rx="8" fill="#2d2310" stroke="#eab308" stroke-width="2"/>
            <text x="730" y="320" fill="#facc15" font-size="9.5" font-weight="800" text-anchor="middle" letter-spacing="0.5">LENDING LIBRARY COLLECTIONS (LOWER)</text>
            <text x="730" y="333" fill="#ca8a04" font-size="7.5" text-anchor="middle">Open Stacks, Borrowing & Return Stations</text>
            <line x1="620" y1="347" x2="840" y2="347" stroke="#713f12" stroke-width="2.5"/>
            ${seats.filter(s => s.section === 'Lending Lower').map(renderSeat).join('')}
        </svg>
    `;
}

function renderFloorGroundSvg() {
    const seats = spacePulseData.seatsByFloor['floor_ground'] || [];
    const filter = AppState.seatFilter;

    function renderSeat(s) {
        if (filter === 'free' && s.status !== 'free') return '';
        if (filter === 'occupied' && s.status !== 'occupied') return '';
        if (filter === 'power' && !s.powerOutlet) return '';

        const isUserReserved = AppState.activeReservation && AppState.activeReservation.seatId === s.id;
        const effectiveStatus = isUserReserved ? 'reserved' : s.status;

        return `
            <g class="seat-node ${effectiveStatus}" transform="translate(${s.x}, ${s.y})" onclick="openSeatModal('${s.id}', 'floor_ground')">
                ${effectiveStatus === 'free' || isUserReserved ? '<circle class="seat-halo" cx="0" cy="0" r="13"></circle>' : ''}
                <circle class="seat-circle" cx="0" cy="0" r="9.5"></circle>
                <text class="seat-node-text" x="0" y="0" font-size="6.5">${s.seatNumber}</text>
                ${s.powerOutlet ? '<circle cx="6.5" cy="-6.5" r="2.8" fill="#38bdf8" stroke="#ffffff" stroke-width="0.7"></circle>' : ''}
            </g>
        `;
    }

    return `
        <svg class="architectural-svg" viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg" style="background: #08111e; border-radius: 8px; width: 100%; height: auto; max-height: 520px;">
            <defs>
                <pattern id="cadGridG" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30, 41, 59, 0.45)" stroke-width="0.6"/>
                </pattern>
            </defs>
            <rect width="1000" height="560" fill="url(#cadGridG)" />
            <rect x="340" y="16" width="530" height="528" rx="14" fill="#0d1829" stroke="#1e3a5f" stroke-width="2"/>

            <!-- Top Row: Toilets, Staff Room, Bindery, Staff Room -->
            <rect x="360" y="36" width="65" height="70" rx="6" fill="#2d1710" stroke="#ea580c"/>
            <text x="392" y="66" fill="#f97316" font-size="8" font-weight="800" text-anchor="middle">■ TOILETS</text>
            <text x="392" y="78" fill="#9a3412" font-size="6.5" text-anchor="middle">Staff & Student Facility</text>

            <rect x="435" y="36" width="85" height="70" rx="6" fill="#181c30" stroke="#6366f1"/>
            <text x="477" y="74" fill="#818cf8" font-size="8.5" font-weight="800" text-anchor="middle">STAFF ROOM</text>

            <rect x="530" y="36" width="100" height="70" rx="6" fill="#262010" stroke="#eab308"/>
            <text x="580" y="68" fill="#facc15" font-size="8.5" font-weight="800" text-anchor="middle">BINDERY</text>
            <text x="580" y="80" fill="#ca8a04" font-size="6.5" text-anchor="middle">Book Restoration & Archiving</text>

            <rect x="640" y="36" width="165" height="70" rx="6" fill="#131e2e" stroke="#38bdf8"/>
            <text x="722" y="74" fill="#38bdf8" font-size="8.5" font-weight="800" text-anchor="middle">STAFF ROOM</text>

            <!-- Mid Row: Toilets, Lift, Central Commons, Staircase -->
            <rect x="360" y="116" width="65" height="60" rx="6" fill="#2d1710" stroke="#ea580c"/>
            <text x="392" y="150" fill="#f97316" font-size="8" font-weight="800" text-anchor="middle">■ TOILETS</text>

            <rect x="435" y="116" width="85" height="60" rx="6" fill="#2b141d" stroke="#f43f5e"/>
            <text x="455" y="150" fill="#fb7185" font-size="8" font-weight="800">▲ UP</text>
            <rect x="480" y="134" width="26" height="24" rx="3" fill="#4c0519"/>
            <text x="493" y="150" fill="#ffffff" font-size="7" font-weight="800" text-anchor="middle">LIFT</text>

            <rect x="530" y="116" width="155" height="145" rx="8" fill="#101e33" stroke="#2563eb" stroke-width="2"/>
            <text x="607" y="136" fill="#60a5fa" font-size="9" font-weight="800" text-anchor="middle" letter-spacing="0.5">CENTRAL STUDY COMMONS & STACKS</text>
            <rect x="545" y="148" width="55" height="30" rx="4" fill="#1e293b"/>
            <rect x="615" y="148" width="55" height="30" rx="4" fill="#1e293b"/>
            <rect x="545" y="206" width="55" height="30" rx="4" fill="#1e293b"/>
            <rect x="615" y="206" width="55" height="30" rx="4" fill="#1e293b"/>
            ${seats.filter(s => s.section === 'Central Study Commons').map(renderSeat).join('')}

            <rect x="695" y="116" width="110" height="145" rx="8" fill="#192333" stroke="#475569" stroke-width="1.5"/>
            <text x="750" y="190" fill="#94a3b8" font-size="8.5" font-weight="800" text-anchor="middle">STAIRCASE</text>
            <line x1="710" y1="205" x2="790" y2="205" stroke="#334155" stroke-width="2"/>
            <line x1="710" y1="213" x2="790" y2="213" stroke="#334155" stroke-width="2"/>
            <line x1="710" y1="221" x2="790" y2="221" stroke="#334155" stroke-width="2"/>

            <!-- Bottom Row: Admin, AQ, TS, Staff Room -->
            <rect x="360" y="270" width="70" height="75" rx="6" fill="#182332" stroke="#64748b"/>
            <text x="395" y="305" fill="#94a3b8" font-size="7" font-weight="800" text-anchor="middle">SENIOR ASSISTANT</text>
            <text x="395" y="317" fill="#94a3b8" font-size="7" font-weight="800" text-anchor="middle">REGISTRAR</text>

            <rect x="440" y="270" width="45" height="75" rx="6" fill="#281e10" stroke="#eab308"/>
            <text x="462" y="305" fill="#facc15" font-size="6.5" font-weight="700" text-anchor="middle">Asst. Librarian</text>
            <text x="462" y="317" fill="#facc15" font-size="6.5" font-weight="700" text-anchor="middle">(AQ)</text>

            <rect x="495" y="270" width="85" height="75" rx="6" fill="#0d291e" stroke="#10b981" stroke-width="1.8"/>
            <text x="537" y="290" fill="#34d399" font-size="8.5" font-weight="800" text-anchor="middle">AQ SECTION</text>
            <text x="537" y="301" fill="#059669" font-size="6.5" text-anchor="middle">Acquisitions & Cataloging</text>
            ${seats.filter(s => s.section === 'AQ Section').map(renderSeat).join('')}

            <rect x="590" y="270" width="45" height="75" rx="6" fill="#251333" stroke="#a855f7"/>
            <text x="612" y="305" fill="#c084fc" font-size="6.5" font-weight="700" text-anchor="middle">Disabilities</text>
            <text x="612" y="317" fill="#c084fc" font-size="6.5" font-weight="700" text-anchor="middle">Collection</text>

            <rect x="645" y="270" width="90" height="75" rx="6" fill="#2d1710" stroke="#ea580c"/>
            <text x="690" y="290" fill="#f97316" font-size="8.5" font-weight="800" text-anchor="middle">TS SECTION</text>
            <text x="690" y="301" fill="#9a3412" font-size="6.5" text-anchor="middle">Technical Services Division</text>
            <text x="690" y="335" fill="#f97316" font-size="6" text-anchor="middle">Sr. Asst. Librarian (TS)</text>
            ${seats.filter(s => s.section === 'TS Section').map(renderSeat).join('')}

            <rect x="745" y="270" width="60" height="75" rx="6" fill="#131e2e" stroke="#38bdf8"/>
            <text x="775" y="310" fill="#38bdf8" font-size="8.5" font-weight="800" text-anchor="middle">STAFF ROOM</text>
        </svg>
    `;
}

function renderFloor2Svg() {
    const seats = spacePulseData.seatsByFloor['floor_2'] || [];
    const filter = AppState.seatFilter;

    function renderSeat(s) {
        if (filter === 'free' && s.status !== 'free') return '';
        if (filter === 'occupied' && s.status !== 'occupied') return '';
        if (filter === 'power' && !s.powerOutlet) return '';

        const isUserReserved = AppState.activeReservation && AppState.activeReservation.seatId === s.id;
        const effectiveStatus = isUserReserved ? 'reserved' : s.status;

        return `
            <g class="seat-node ${effectiveStatus}" transform="translate(${s.x}, ${s.y})" onclick="openSeatModal('${s.id}', 'floor_2')">
                ${effectiveStatus === 'free' || isUserReserved ? '<circle class="seat-halo" cx="0" cy="0" r="13"></circle>' : ''}
                <circle class="seat-circle" cx="0" cy="0" r="9.5"></circle>
                <text class="seat-node-text" x="0" y="0" font-size="6.5">${s.seatNumber}</text>
                ${s.powerOutlet ? '<circle cx="6.5" cy="-6.5" r="2.8" fill="#38bdf8" stroke="#ffffff" stroke-width="0.7"></circle>' : ''}
            </g>
        `;
    }

    return `
        <svg class="architectural-svg" viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg" style="background: #08111e; border-radius: 8px; width: 100%; height: auto; max-height: 520px;">
            <defs>
                <pattern id="cadGrid2" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30, 41, 59, 0.45)" stroke-width="0.6"/>
                </pattern>
            </defs>
            <rect width="1000" height="560" fill="url(#cadGrid2)" />
            <rect x="340" y="16" width="530" height="528" rx="14" fill="#0d1829" stroke="#1e3a5f" stroke-width="2"/>

            <!-- Upper Study Hall (8 Large Study Tables) -->
            <rect x="360" y="36" width="445" height="175" rx="8" fill="#2d1c10" stroke="#ea580c" stroke-width="2"/>
            <text x="582" y="60" fill="#f97316" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">UPPER STUDY HALL (8 LARGE STUDY TABLES)</text>
            <text x="582" y="74" fill="#c2410c" font-size="8" text-anchor="middle">Dedicated Silent Carrels, 5G WiFi & High-Density Laptop Stations</text>
            
            <rect x="375" y="90" width="48" height="30" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="435" y="90" width="48" height="30" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="495" y="90" width="48" height="30" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="555" y="90" width="48" height="30" rx="4" fill="#431407" stroke="#7c2d12"/>

            <rect x="375" y="150" width="48" height="30" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="435" y="150" width="48" height="30" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="495" y="150" width="48" height="30" rx="4" fill="#431407" stroke="#7c2d12"/>
            <rect x="555" y="150" width="48" height="30" rx="4" fill="#431407" stroke="#7c2d12"/>
            ${seats.filter(s => s.section === 'Upper Study Hall').map(renderSeat).join('')}

            <!-- Mid Row: Lift, Staff Publications, Staircase -->
            <rect x="360" y="220" width="60" height="65" rx="6" fill="#28111e" stroke="#ec4899"/>
            <text x="375" y="252" fill="#f472b6" font-size="8" font-weight="800">▲ UP</text>
            <rect x="395" y="238" width="20" height="20" rx="3" fill="#831843"/>
            <text x="405" y="252" fill="#ffffff" font-size="7" font-weight="800" text-anchor="middle">LIFT</text>

            <rect x="430" y="220" width="90" height="65" rx="6" fill="#09252c" stroke="#06b6d4"/>
            <text x="475" y="247" fill="#22d3ee" font-size="7.5" font-weight="700" text-anchor="middle">Staff Publications</text>
            <text x="475" y="259" fill="#0891b2" font-size="6.5" text-anchor="middle">Zero Catalogue</text>

            <rect x="530" y="220" width="275" height="65" rx="6" fill="#192333" stroke="#475569"/>
            <line x1="550" y1="235" x2="780" y2="235" stroke="#334155" stroke-width="2"/>
            <line x1="550" y1="245" x2="780" y2="245" stroke="#334155" stroke-width="2"/>
            <line x1="550" y1="255" x2="780" y2="255" stroke="#334155" stroke-width="2"/>
            <line x1="550" y1="265" x2="780" y2="265" stroke="#334155" stroke-width="2"/>

            <!-- Bottom Row: Computer Lab, Reader Services, Main Entrance, Cloak Room, Lower Study Area -->
            <rect x="360" y="295" width="110" height="75" rx="6" fill="#0e1c30" stroke="#38bdf8"/>
            <text x="415" y="318" fill="#38bdf8" font-size="8.5" font-weight="800" text-anchor="middle">COMPUTER LAB</text>
            ${seats.filter(s => s.section === 'Computer Lab').map(renderSeat).join('')}

            <rect x="480" y="295" width="50" height="75" rx="6" fill="#1c260f" stroke="#84cc16"/>
            <text x="505" y="330" fill="#a3e635" font-size="6.5" font-weight="700" text-anchor="middle">Reader</text>
            <text x="505" y="342" fill="#a3e635" font-size="6.5" font-weight="700" text-anchor="middle">Services</text>

            <rect x="540" y="295" width="55" height="75" rx="6" fill="#101e38" stroke="#2563eb"/>
            <text x="567" y="330" fill="#60a5fa" font-size="7" font-weight="800" text-anchor="middle">MAIN</text>
            <text x="567" y="342" fill="#60a5fa" font-size="7" font-weight="800" text-anchor="middle">ENTRANCE</text>

            <rect x="605" y="295" width="65" height="75" rx="6" fill="#221032" stroke="#9333ea"/>
            <text x="637" y="338" fill="#c084fc" font-size="7.5" font-weight="800" text-anchor="middle">CLOAK ROOM</text>

            <rect x="680" y="295" width="125" height="75" rx="6" fill="#2b1d11" stroke="#f59e0b"/>
            <text x="742" y="318" fill="#f59e0b" font-size="8" font-weight="800" text-anchor="middle">STUDY AREA</text>
            ${seats.filter(s => s.section === 'Lower Study Area').map(renderSeat).join('')}
        </svg>
    `;
}

function renderFloorSvgHTML(floorId) {
    if (floorId === 'floor_1') return renderFloor1Svg();
    if (floorId === 'floor_3') return renderFloor3Svg();
    if (floorId === 'floor_ground') return renderFloorGroundSvg();
    if (floorId === 'floor_2') return renderFloor2Svg();
    return renderFloor1Svg();
}

// --- 5.3 Library Screen ---
function renderLibrary() {
    pageTitle.textContent = 'Library & Study Vacancies 📚';
    pageSubtitle.textContent = 'Detailed real-time floor occupancy, quiet study areas and power socket tracking';

    let html = '<div class="dashboard-grid">';
    spacePulseData.libraryFloors.forEach(f => {
        html += createFloorCardHTML(f);
    });
    html += '</div>';

    contentArea.innerHTML = html;
}

function createFloorCardHTML(f) {
    const isFav = AppState.favorites.includes(f.id);
    const occupancyRate = Math.round(((f.totalSeats - f.availableSeats) / f.totalSeats) * 100);
    const barClass = occupancyRate < 50 ? 'green' : (occupancyRate < 85 ? 'amber' : 'red');

    return `
        <div class="facility-card">
            <div>
                <div class="card-header">
                    <div class="card-header-left">
                        <div class="card-icon blue"><i class="fas fa-book-reader"></i></div>
                        <div class="card-title-group">
                            <h3>${f.floor}</h3>
                            <p>${f.landmark}</p>
                        </div>
                    </div>
                    <span class="status-badge ${f.availableSeats > 15 ? 'open' : 'closed'}">
                        ${f.availableSeats > 0 ? `${f.availableSeats} Available` : 'Full'}
                    </span>
                </div>

                <div class="stat-row">
                    <span class="stat-label">Available Desks:</span>
                    <span class="stat-value available">${f.availableSeats}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Total Floor Capacity:</span>
                    <span class="stat-value">${f.totalSeats} seats</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Occupancy Rate:</span>
                    <span class="stat-value">${occupancyRate}%</span>
                </div>

                <div class="progress-container">
                    <div class="progress-bar ${barClass}" style="width: ${occupancyRate}%"></div>
                </div>

                <div class="card-tags">
                    ${f.isQuietZone ? '<span class="tag-pill"><i class="fas fa-volume-xmark"></i> Silent Zone</span>' : ''}
                    ${f.hasPowerOutlets ? '<span class="tag-pill"><i class="fas fa-plug"></i> Power Outlets</span>' : ''}
                    ${f.highSpeedWifi ? '<span class="tag-pill"><i class="fas fa-wifi"></i> 5G WiFi</span>' : ''}
                </div>
            </div>

            <div class="card-footer-actions">
                <button class="card-action-btn" onclick="navigateTo('maps'); switchFloor('${f.id}'); switchMapMode('floorplans');">
                    <i class="fas fa-chair"></i> View 2D Map & Hold Seat
                </button>
                <button class="card-star-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${f.id}')" title="Star Facility">
                    <i class="fas fa-star"></i>
                </button>
            </div>
        </div>
    `;
}

// --- 5.4 Canteens Screen ---
function renderCanteen() {
    pageTitle.textContent = 'University Canteens & Dining 🍽️';
    pageSubtitle.textContent = 'Live crowd count, open status and food availability across University of Moratuwa dining halls';

    let html = '<div class="dashboard-grid">';
    spacePulseData.canteens.forEach(c => {
        html += createCanteenCardHTML(c);
    });
    html += '</div>';

    contentArea.innerHTML = html;
}

function createCanteenCardHTML(c) {
    const isOpen = c.status === 'Open';
    const isFav = AppState.favorites.includes(c.id);
    const occupancyRate = isOpen ? Math.round((c.personCount / c.maxCapacity) * 100) : 0;
    const barClass = occupancyRate < 45 ? 'green' : (occupancyRate < 75 ? 'amber' : 'red');
    const estWait = c.queueTimeMinutes || (isOpen ? Math.max(1, Math.round(c.personCount * 0.12)) : 0);

    return `
        <div class="facility-card">
            <div>
                <div class="card-header">
                    <div class="card-header-left">
                        <div class="card-icon green"><i class="fas fa-utensils"></i></div>
                        <div class="card-title-group">
                            <h3>${c.name}</h3>
                            <p>${c.location}</p>
                        </div>
                    </div>
                    <span class="status-badge ${isOpen ? 'open' : 'closed'}">${c.status.toUpperCase()}</span>
                </div>

                <div class="stat-row">
                    <span class="stat-label">Students Present:</span>
                    <span class="stat-value">${c.personCount}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Max Seating Capacity:</span>
                    <span class="stat-value">${c.maxCapacity}</span>
                </div>
                ${isOpen ? `
                <div class="stat-row">
                    <span class="stat-label">Estimated Queue Wait:</span>
                    <span class="stat-value">~${estWait} mins</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar ${barClass}" style="width: ${occupancyRate}%"></div>
                </div>
                ` : '<p style="color: var(--danger); font-size: 0.85rem; margin: 12px 0;">Currently closed for service.</p>'}

                <div class="card-tags" style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">
                    ${(c.tags || [c.specialties]).map(t => `<span class="tag-pill">${t}</span>`).join('')}
                </div>
            </div>

            <div class="card-footer-actions">
                <button class="card-action-btn" onclick="openFacilityDetail('${c.id}')">
                    <i class="fas fa-circle-info"></i> View Details & Directions
                </button>
                <button class="card-star-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${c.id}')" title="Star Facility">
                    <i class="fas fa-star"></i>
                </button>
            </div>
        </div>
    `;
}

// --- 5.5 ATMs Screen ---
function renderAtm() {
    pageTitle.textContent = 'University ATMs & Cash Queues 🏧';
    pageSubtitle.textContent = 'Live monitoring of ATM queue lengths, cash availability, and operating health';

    let html = '<div class="dashboard-grid">';
    spacePulseData.atms.forEach(a => {
        html += createAtmCardHTML(a);
    });
    html += '</div>';

    contentArea.innerHTML = html;
}

function createAtmCardHTML(a) {
    const isWorking = a.status === 'Working';
    const isFav = AppState.favorites.includes(a.id);
    const estWaitMins = a.estimatedWaitMins || (a.queueLength * 3);

    return `
        <div class="facility-card">
            <div>
                <div class="card-header">
                    <div class="card-header-left">
                        <div class="card-icon amber"><i class="fas fa-money-check-dollar"></i></div>
                        <div class="card-title-group">
                            <h3>${a.name}</h3>
                            <p>${a.bankName}</p>
                        </div>
                    </div>
                    <span class="status-badge ${isWorking ? 'open' : 'closed'}">${a.status.toUpperCase()}</span>
                </div>

                <div class="stat-row">
                    <span class="stat-label">Location:</span>
                    <span class="stat-value" style="font-size: 0.82rem;">Main Administrative Building</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Landmark:</span>
                    <span class="stat-value" style="font-size: 0.82rem;">Entrance</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Cash Dispensing:</span>
                    <span class="stat-value" style="color: #10b981; font-weight: 700;">
                        <i class="fas fa-circle-check"></i> Cash Available
                    </span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Queue Length:</span>
                    <span class="stat-value">${a.queueLength} persons</span>
                </div>
                ${isWorking ? `
                <div class="stat-row">
                    <span class="stat-label">Est. Wait Time:</span>
                    <span class="stat-value">~${estWaitMins} mins</span>
                </div>
                ` : ''}

                <!-- 4 Yellow Person Avatars Matching Page 7 -->
                <div class="atm-person-icons">
                    <i class="fas fa-user"></i>
                    <i class="fas fa-user"></i>
                    <i class="fas fa-user"></i>
                    <i class="fas fa-user"></i>
                </div>
            </div>

            <div class="card-footer-actions">
                <button class="card-action-btn" onclick="openFacilityDetail('${a.id}')">
                    <i class="fas fa-person-walking"></i> Walking Directions
                </button>
                <button class="card-star-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${a.id}')" title="Star Facility">
                    <i class="fas fa-star"></i>
                </button>
            </div>
        </div>
    `;
}

// --- 5.6 Book Shops Screen ---
function renderBookshop() {
    pageTitle.textContent = 'Book Shops & Printing Hubs 📖';
    pageSubtitle.textContent = 'Status of photocopy centers, textbook stores and engineering stationery';

    let html = '<div class="dashboard-grid">';
    spacePulseData.bookshops.forEach(b => {
        html += createBookshopCardHTML(b);
    });
    html += '</div>';

    contentArea.innerHTML = html;
}

function createBookshopCardHTML(b) {
    const isOpen = b.status === 'Open';
    const isFav = AppState.favorites.includes(b.id);

    return `
        <div class="facility-card">
            <div>
                <div class="card-header">
                    <div class="card-header-left">
                        <div class="card-icon purple"><i class="fas fa-book-bookmark"></i></div>
                        <div class="card-title-group">
                            <h3>${b.name}</h3>
                            <p>${b.location}</p>
                        </div>
                    </div>
                    <span class="status-badge ${isOpen ? 'open' : 'closed'}">${b.status}</span>
                </div>

                <div class="stat-row">
                    <span class="stat-label">Crowd Density:</span>
                    <span class="stat-value">${b.crowdedness}</span>
                </div>

                <div class="card-tags" style="margin-top: 12px;">
                    ${b.services.map(s => `<span class="tag-pill"><i class="fas fa-tag"></i> ${s}</span>`).join('')}
                </div>
            </div>

            <div class="card-footer-actions">
                <button class="card-action-btn" onclick="openFacilityDetail('${b.id}')">
                    <i class="fas fa-circle-info"></i> View Services
                </button>
                <button class="card-star-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${b.id}')" title="Star Facility">
                    <i class="fas fa-star"></i>
                </button>
            </div>
        </div>
    `;
}

// --- 5.7 Historical Trends & Analytics Screen ---
function renderTrends() {
    pageTitle.textContent = 'Historical Occupancy Trends 📊';
    pageSubtitle.textContent = 'Time-series foot-traffic analytics and day-profile crowd forecasting';

    let html = `
        <div class="trends-container">
            <div class="profile-selector-bar">
                <span style="font-weight: 700; font-size: 0.9rem;"><i class="fas fa-calendar-day"></i> Select Day Profile:</span>
                <div class="profile-pills">
                    <button class="profile-pill ${AppState.currentTrendsProfile === 'weekday' ? 'active' : ''}" onclick="switchTrendsProfile('weekday')">
                        📅 Typical Weekday
                    </button>
                    <button class="profile-pill ${AppState.currentTrendsProfile === 'exam' ? 'active' : ''}" onclick="switchTrendsProfile('exam')">
                        🎓 Exam Season
                    </button>
                    <button class="profile-pill ${AppState.currentTrendsProfile === 'weekend' ? 'active' : ''}" onclick="switchTrendsProfile('weekend')">
                        ☕ Weekend Profile
                    </button>
                </div>
            </div>

            <div class="trends-grid">
                <div class="chart-card">
                    <h3>Library Average Occupancy (%)</h3>
                    <p>Hourly seat occupancy rate from 8:00 AM to 8:00 PM</p>
                    <div class="chart-canvas-wrapper">
                        <canvas id="libraryChart"></canvas>
                    </div>
                </div>

                <div class="chart-card">
                    <h3>Canteen Crowd Demand (%)</h3>
                    <p>Peak lunch hours and dining room occupancy levels</p>
                    <div class="chart-canvas-wrapper">
                        <canvas id="canteenChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;

    contentArea.innerHTML = html;
    setTimeout(initTrendsCharts, 100);
}

function switchTrendsProfile(profileKey) {
    AppState.currentTrendsProfile = profileKey;
    renderTrends();
}

function initTrendsCharts() {
    const profile = spacePulseData.historicalProfiles[AppState.currentTrendsProfile] || spacePulseData.historicalProfiles.weekday;

    const ctxLib = document.getElementById('libraryChart');
    const ctxCan = document.getElementById('canteenChart');

    if (!ctxLib || !ctxCan || typeof Chart === 'undefined') return;

    if (AppState.activeChartLib) AppState.activeChartLib.destroy();
    if (AppState.activeChartCan) AppState.activeChartCan.destroy();

    AppState.activeChartLib = new Chart(ctxLib, {
        type: 'line',
        data: {
            labels: profile.hours,
            datasets: [{
                label: 'Library Occupancy %',
                data: profile.libraryOccupancy,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
                borderWidth: 2.5,
                tension: 0.35,
                fill: true,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1.5,
                pointRadius: 4.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } }
            }
        }
    });

    AppState.activeChartCan = new Chart(ctxCan, {
        type: 'bar',
        data: {
            labels: profile.hours,
            datasets: [{
                label: 'Canteen Foot Traffic %',
                data: profile.canteenOccupancy,
                backgroundColor: profile.canteenOccupancy.map(v => v >= 70 ? '#ef4444' : (v >= 40 ? '#f59e0b' : '#10b981')),
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } }
            }
        }
    });
}

// ==========================================================================
// 6. UoM Student Verification & Portal Login System
// ==========================================================================

function showStudentLoginPage() {
    const page = document.getElementById('student-login-page');
    if (!page) return;

    // Update live telemetry ticker on portal
    const stats = getStats();
    const libStat = document.getElementById('portal-lib-stat');
    const canteenStat = document.getElementById('portal-canteen-stat');
    const atmStat = document.getElementById('portal-atm-stat');

    if (libStat) libStat.textContent = `${stats.availableLibrarySeats} Free Seats`;
    if (canteenStat) canteenStat.textContent = `${stats.openCanteensCount} Canteens Open`;
    if (atmStat) atmStat.textContent = `${stats.shortestAtmName} (${stats.shortestAtmQueue} in line)`;

    const portalThemeIcon = document.getElementById('portal-theme-icon');
    if (portalThemeIcon) {
        portalThemeIcon.className = AppState.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    renderPortalAuthBody();
    page.style.display = 'flex';
}

function hideStudentLoginPage() {
    const page = document.getElementById('student-login-page');
    if (page) {
        page.style.display = 'none';
    }
}

function togglePortalTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.click();
    } else {
        const nextTheme = AppState.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        AppState.theme = nextTheme;
        localStorage.setItem('spacepulse_theme', nextTheme);
    }
    const portalThemeIcon = document.getElementById('portal-theme-icon');
    if (portalThemeIcon) {
        portalThemeIcon.className = AppState.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function openStudentAuthModal() {
    const modal = document.getElementById('student-auth-modal');
    if (modal) {
        renderStudentAuthModalBody();
        modal.style.display = 'flex';
    }
}

function closeStudentAuthModal() {
    const modal = document.getElementById('student-auth-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function renderPortalAuthBody() {
    const body = document.getElementById('portal-auth-body');
    if (!body) return;
    const student = AppState.currentStudent;

    if (student) {
        // Authenticated Student Digital ID Card
        body.innerHTML = `
            <div class="digital-student-card">
                <div class="student-card-top">
                    <div>
                        <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 2px;">${student.name}</h3>
                        <p style="font-size: 0.84rem; color: var(--text-secondary);">${student.email}</p>
                    </div>
                    <div class="student-badge-verified">
                        <i class="fas fa-circle-check"></i> Verified UoM
                    </div>
                </div>

                <div class="seat-properties-grid" style="margin-bottom: 12px;">
                    <div class="prop-card">
                        <span class="prop-label">Student Index</span>
                        <strong class="prop-val">${student.indexNumber}</strong>
                    </div>
                    <div class="prop-card">
                        <span class="prop-label">Academic Batch</span>
                        <strong class="prop-val">${student.batch}</strong>
                    </div>
                </div>

                <div class="prop-card" style="margin-bottom: 12px;">
                    <span class="prop-label">Faculty / Department</span>
                    <strong class="prop-val" style="font-size: 0.9rem;">${student.department}</strong>
                </div>

                <div class="student-privileges-box">
                    <h5>University Telemetry Privileges Active:</h5>
                    <div class="privilege-item"><i class="fas fa-check-circle" style="color: var(--pulse-green);"></i> 30-Minute Library Desk Holds & Reservations</div>
                    <div class="privilege-item"><i class="fas fa-check-circle" style="color: var(--pulse-green);"></i> Real-Time Threshold Push Notifications</div>
                    <div class="privilege-item"><i class="fas fa-check-circle" style="color: var(--pulse-green);"></i> Personalized Speed Mode & GPS Navigation</div>
                </div>

                <button class="portal-enter-btn" onclick="hideStudentLoginPage()">
                    <i class="fas fa-compass"></i> Enter University Dashboard <i class="fas fa-arrow-right"></i>
                </button>

                <button class="portal-signout-btn" onclick="signOutStudent()">
                    <i class="fas fa-arrow-right-from-bracket"></i> Sign In as Different Student
                </button>
            </div>
        `;
    } else if (!AppState.isEnteringOtp) {
        // Step 1: Email Form + Domain Chips
        body.innerHTML = `
            <div class="portal-section-intro">
                <h4>Sign in with University Webmail</h4>
                <p>Connect your official <strong>@uom.lk</strong> student webmail. A single-use 6-digit verification code will be dispatched to your webmail inbox.</p>
            </div>

            <form id="portal-email-form" onsubmit="event.preventDefault(); handlePortalSendOtp();">
                <div class="portal-form-group">
                    <label for="portal-email-input">Official Student Email Address</label>
                    <div class="portal-input-wrap">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="portal-email-input" placeholder="e.g. 210123A@uom.lk or name.21@cse.mrt.ac.lk" required value="${AppState.pendingOtpEmail || ''}">
                    </div>
                </div>

                <!-- Domain Shortcut Chips -->
                <div class="domain-chips-grid" style="margin-top: 4px; margin-bottom: 14px;">
                    <button type="button" class="domain-chip" onclick="appendPortalDomain('@uom.lk')">@uom.lk</button>
                    <button type="button" class="domain-chip" onclick="appendPortalDomain('@cse.mrt.ac.lk')">@cse.mrt.ac.lk</button>
                    <button type="button" class="domain-chip" onclick="appendPortalDomain('@itfac.mrt.ac.lk')">@itfac.mrt.ac.lk</button>
                    <button type="button" class="domain-chip" onclick="appendPortalDomain('@mech.mrt.ac.lk')">@mech.mrt.ac.lk</button>
                    <button type="button" class="domain-chip" onclick="appendPortalDomain('@civil.mrt.ac.lk')">@civil.mrt.ac.lk</button>
                    <button type="button" class="domain-chip" onclick="appendPortalDomain('@ent.mrt.ac.lk')">@ent.mrt.ac.lk</button>
                </div>

                <div class="portal-form-group">
                    <label for="portal-name-input">Full Name (Optional)</label>
                    <div class="portal-input-wrap">
                        <i class="fas fa-user-graduate"></i>
                        <input type="text" id="portal-name-input" placeholder="e.g. Kavindu Dilupa" value="${AppState.pendingOtpCustomName || ''}">
                    </div>
                </div>

                <button type="submit" class="portal-submit-btn" id="portal-send-btn">
                    <i class="fas fa-paper-plane"></i> Send 6-Digit Verification Code to Webmail
                </button>
            </form>

            <div class="portal-divider">
                <span>OFFICIAL UNIVERSITY WEBMAIL SERVICE</span>
            </div>

            <div style="display: flex; gap: 8px;">
                <a href="https://webmail.uom.lk/" target="_blank" rel="noopener noreferrer" class="portal-webmail-btn" style="flex: 1; justify-content: center; padding: 12px; text-decoration: none;">
                    <i class="fas fa-arrow-up-right-from-square" style="color: var(--uom-crimson);"></i> webmail.uom.lk ↗
                </a>
                <button type="button" class="portal-webmail-btn" style="flex: 1; justify-content: center; padding: 12px;" onclick="openUniversityWebmailModal(document.getElementById('portal-email-input')?.value)">
                    <i class="fas fa-inbox" style="color: var(--primary-blue);"></i> Webmail Inbox
                </button>
            </div>
        `;
    } else {
        // Step 2: OTP Verification
        body.innerHTML = `
            <div style="text-align: center; margin-bottom: 16px;">
                <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">Enter 6-Digit Verification Code</h4>
                <p style="font-size: 0.84rem; color: var(--text-secondary);">
                    Verification code dispatched to <strong>${AppState.pendingOtpEmail}</strong>
                </p>
            </div>

            <!-- Webmail Notice & Inbox Launcher -->
            <div class="webmail-helper-card">
                <i class="fas fa-envelope-circle-check" style="font-size: 1.8rem; color: #0284c7;"></i>
                <div style="flex: 1;">
                    <div style="font-weight: 800; font-size: 0.86rem; color: var(--text-primary);">Check University Webmail</div>
                    <div style="font-size: 0.76rem; color: var(--text-secondary);">Your verification code is only viewable in your university webmail inbox.</div>
                </div>
                <div style="display: flex; gap: 6px; flex-shrink: 0;">
                    <a href="https://webmail.uom.lk/" target="_blank" rel="noopener noreferrer" class="webmail-open-action-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                        <i class="fas fa-arrow-up-right-from-square"></i> webmail.uom.lk
                    </a>
                    <button type="button" class="webmail-open-action-btn" onclick="openUniversityWebmailModal('${AppState.pendingOtpEmail}')">
                        <i class="fas fa-inbox"></i> Inbox
                    </button>
                </div>
            </div>

            <form id="portal-otp-form" onsubmit="event.preventDefault(); handlePortalVerifyOtp();">
                <div class="otp-box-container">
                    <input type="text" id="portal-otp-input" class="otp-input-field" maxlength="6" pattern="[0-9]{6}" placeholder="••••••" required autofocus autocomplete="one-time-code">
                </div>

                <button type="submit" class="portal-submit-btn" id="portal-verify-btn" style="margin-bottom: 10px;">
                    <i class="fas fa-shield-check"></i> Verify Code & Enter SpacePulse
                </button>

                <div style="display: flex; gap: 8px;">
                    <button type="button" class="portal-signout-btn" style="color: var(--text-secondary); border-color: var(--border); flex: 1;" onclick="AppState.isEnteringOtp = false; renderPortalAuthBody();">
                        <i class="fas fa-arrow-left"></i> Change Email
                    </button>
                    <button type="button" class="portal-signout-btn" style="color: #0284c7; border-color: rgba(2, 132, 199, 0.4); flex: 1;" onclick="handlePortalSendOtp(true)">
                        <i class="fas fa-rotate"></i> Resend Code
                    </button>
                </div>
            </form>
        `;
    }
}

function appendPortalDomain(domain) {
    const input = document.getElementById('portal-email-input');
    if (!input) return;
    const current = input.value.trim();
    if (current.includes('@')) {
        const prefix = current.split('@')[0];
        input.value = prefix + domain;
    } else {
        input.value = current + domain;
    }
    input.focus();
}

async function handlePortalSendOtp(isResend = false) {
    const emailInput = document.getElementById('portal-email-input');
    const nameInput = document.getElementById('portal-name-input');
    const email = isResend ? (AppState.pendingOtpEmail || '') : (emailInput ? emailInput.value.trim() : '');
    const customName = isResend ? (AppState.pendingOtpCustomName || '') : (nameInput ? nameInput.value.trim() : '');

    if (!isValidUomEmail(email)) {
        showToast('Please enter a valid @uom.lk or @*.mrt.ac.lk university email.', true);
        return;
    }

    const sendBtn = document.getElementById('portal-send-btn');
    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Dispatching code to Webmail...';
    }

    try {
        const resp = await fetch('http://127.0.0.1:8000/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, name: customName })
        });
        const data = await resp.json();

        if (!resp.ok) {
            throw new Error(data.detail || 'Failed to dispatch verification code.');
        }

        AppState.pendingOtpEmail = email;
        AppState.pendingOtpCustomName = customName;
        AppState.isEnteringOtp = true;

        showToast('Verification code dispatched to your University Webmail. Check your inbox at webmail.uom.lk 📩');
        renderPortalAuthBody();
        renderStudentAuthModalBody();
    } catch (err) {
        showToast(err.message || 'Failed to connect to backend auth service.', true);
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send 6-Digit Verification Code to Webmail';
        }
    }
}

async function handlePortalVerifyOtp() {
    const input = document.getElementById('portal-otp-input');
    const code = input ? input.value.trim() : '';

    if (!code || code.length !== 6) {
        showToast('Please enter the full 6-digit code from your university webmail.', true);
        return;
    }

    const verifyBtn = document.getElementById('portal-verify-btn');
    if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying with Webmail...';
    }

    try {
        const resp = await fetch('http://127.0.0.1:8000/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: AppState.pendingOtpEmail,
                code: code,
                name: AppState.pendingOtpCustomName
            })
        });
        const data = await resp.json();

        if (!resp.ok) {
            throw new Error(data.detail || 'Invalid or expired verification code.');
        }

        const studentProfile = data.student;
        AppState.currentStudent = studentProfile;
        localStorage.setItem('spacepulse_student_profile', JSON.stringify(studentProfile));
        if (data.token) {
            localStorage.setItem('spacepulse_auth_token', data.token);
        }

        AppState.isEnteringOtp = false;
        AppState.pendingOtpEmail = null;
        AppState.pendingOtpCustomName = null;

        showToast(`Welcome, ${studentProfile.name}! Verified via University Webmail 🎓`);
        updateStudentHeaderElements();
        renderPortalAuthBody();
        renderStudentAuthModalBody();
        hideStudentLoginPage();
        if (AppState.currentTab === 'home') renderHome();
    } catch (err) {
        showToast(err.message || 'Invalid verification code. Please check your webmail.', true);
        if (verifyBtn) {
            verifyBtn.disabled = false;
            verifyBtn.innerHTML = '<i class="fas fa-shield-check"></i> Verify Code & Enter SpacePulse';
        }
        if (input) {
            input.focus();
            input.select();
        }
    }
}

// ==========================================================================
// University of Moratuwa Webmail Service (webmail.uom.lk) Interface
// ==========================================================================

let activeWebmailMessages = [];
let selectedWebmailMessageId = null;

function openUniversityWebmailModal(email) {
    const modal = document.getElementById('webmail-modal');
    if (!modal) return;
    const targetEmail = email || AppState.pendingOtpEmail || (AppState.currentStudent ? AppState.currentStudent.email : 'student@uom.lk');
    const accountEl = document.getElementById('webmail-active-account');
    if (accountEl) accountEl.textContent = targetEmail;

    modal.style.display = 'flex';
    refreshWebmailInbox(targetEmail);
}

function closeUniversityWebmailModal() {
    const modal = document.getElementById('webmail-modal');
    if (modal) modal.style.display = 'none';
}

async function refreshWebmailInbox(filterEmail) {
    const listEl = document.getElementById('webmail-messages-list');
    const readerEl = document.getElementById('webmail-reader-pane');
    const unreadEl = document.getElementById('webmail-unread-count');
    const countSubEl = document.getElementById('webmail-msg-count-sub');
    const icon = document.getElementById('webmail-refresh-icon');

    if (icon) icon.classList.add('fa-spin');
    if (listEl) {
        listEl.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
                <i class="fas fa-spinner fa-spin" style="margin-right: 6px;"></i> Checking webmail.uom.lk...
            </div>
        `;
    }

    try {
        const emailQuery = filterEmail ? `?email=${encodeURIComponent(filterEmail.trim().toLowerCase())}` : '';
        const resp = await fetch(`http://127.0.0.1:8000/api/webmail/inbox${emailQuery}`);
        const messages = await resp.json();
        activeWebmailMessages = Array.isArray(messages) ? messages : [];

        if (unreadEl) {
            const unreadCount = activeWebmailMessages.filter(m => !m.is_read).length;
            unreadEl.textContent = unreadCount;
        }
        if (countSubEl) {
            countSubEl.textContent = `${activeWebmailMessages.length} message${activeWebmailMessages.length === 1 ? '' : 's'}`;
        }

        renderWebmailInboxList();

        if (activeWebmailMessages.length > 0) {
            selectWebmailMessage(activeWebmailMessages[0].id);
        } else {
            if (readerEl) {
                readerEl.innerHTML = `
                    <div class="webmail-reader-empty">
                        <i class="fas fa-inbox"></i>
                        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 6px;">Your Webmail Inbox is Empty</h4>
                        <p style="font-size: 0.84rem; max-width: 360px; margin: 0 auto 16px auto;">Enter your @uom.lk email on the SpacePulse login screen and click "Send Verification Code" to receive your code here.</p>
                    </div>
                `;
            }
        }
    } catch (err) {
        if (listEl) {
            listEl.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--danger); font-size: 0.8rem;">
                    <i class="fas fa-triangle-exclamation"></i> Could not connect to University Webmail store. Ensure backend is running.
                </div>
            `;
        }
    } finally {
        if (icon) icon.classList.remove('fa-spin');
    }
}

function renderWebmailInboxList() {
    const listEl = document.getElementById('webmail-messages-list');
    if (!listEl) return;

    if (activeWebmailMessages.length === 0) {
        listEl.innerHTML = `
            <div style="padding: 24px 16px; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
                No messages found for this account.
            </div>
        `;
        return;
    }

    listEl.innerHTML = activeWebmailMessages.map(msg => {
        const isSelected = msg.id === selectedWebmailMessageId;
        return `
            <div class="webmail-msg-item ${isSelected ? 'active' : ''} ${!msg.is_read ? 'unread' : ''}" onclick="selectWebmailMessage('${msg.id}')">
                <div class="webmail-msg-top">
                    <span class="webmail-msg-sender">
                        ${!msg.is_read ? '<span class="webmail-unread-dot"></span>' : ''}
                        ${msg.sender.split('<')[0].trim()}
                    </span>
                    <span class="webmail-msg-time">${msg.date_str.split('-')[1] || msg.date_str}</span>
                </div>
                <div class="webmail-msg-subject">${msg.subject}</div>
                <div class="webmail-msg-snippet">${msg.body_text || 'SpacePulse verification code inside...'}</div>
            </div>
        `;
    }).join('');
}

function selectWebmailMessage(msgId) {
    selectedWebmailMessageId = msgId;
    const msg = activeWebmailMessages.find(m => m.id === msgId);
    if (msg) {
        msg.is_read = true;
        renderWebmailInboxList();
        renderWebmailMessageDetail(msg);
    }
}

function renderWebmailMessageDetail(msg) {
    const readerEl = document.getElementById('webmail-reader-pane');
    if (!readerEl || !msg) return;

    const code = msg.code || (msg.subject.match(/(\d{3}\s?\d{3})/)?.[1]?.replace(/\s+/g, '') || '');

    readerEl.innerHTML = `
        <div class="webmail-reader-card">
            <div class="webmail-reader-head">
                <div class="webmail-reader-subject">${msg.subject}</div>
                <div class="webmail-reader-meta">
                    <div>
                        <strong>From:</strong> ${msg.sender} &nbsp;•&nbsp;
                        <strong>To:</strong> ${msg.recipient}
                    </div>
                    <div><i class="fas fa-clock"></i> ${msg.date_str}</div>
                </div>
            </div>

            ${code ? `
                <div class="webmail-fast-actions-bar">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; color: var(--text-secondary);">Your Code:</span>
                        <span class="webmail-code-badge">${code.slice(0,3)} ${code.slice(3)}</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" class="webmail-copy-code-btn" onclick="copyWebmailCode('${code}')">
                            <i class="fas fa-copy"></i> Copy Code
                        </button>
                        <button type="button" class="webmail-insert-code-btn" onclick="insertWebmailCodeAndVerify('${code}')">
                            <i class="fas fa-arrow-right-to-bracket"></i> Insert Code & Log In
                        </button>
                    </div>
                </div>
            ` : ''}

            <div class="webmail-reader-body-wrap">
                ${msg.body_html || `<pre style="font-family: inherit;">${msg.body_text}</pre>`}
            </div>
        </div>
    `;
}

function copyWebmailCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showToast(`Verification code ${code} copied to clipboard! 📋`);
    }).catch(() => {
        showToast(`Code: ${code}`);
    });
}

function insertWebmailCodeAndVerify(code) {
    const input = document.getElementById('portal-otp-input');
    if (input) {
        input.value = code;
    }
    const modalInput = document.getElementById('otp-code-input');
    if (modalInput) {
        modalInput.value = code;
    }
    closeUniversityWebmailModal();
    showToast('Code inserted from Webmail! Verifying student identity... 🚀');
    handlePortalVerifyOtp();
}

// Student Auth Modal (Header Modal) Handlers
function renderStudentAuthModalBody() {
    const body = document.getElementById('student-modal-body');
    if (!body) return;
    const student = AppState.currentStudent;

    if (student) {
        body.innerHTML = `
            <div class="digital-student-card">
                <div class="student-card-top">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 2px;">${student.name}</h3>
                        <p style="font-size: 0.8rem; color: var(--text-secondary);">${student.email}</p>
                    </div>
                    <div class="student-badge-verified">
                        <i class="fas fa-circle-check"></i> Verified UoM
                    </div>
                </div>

                <div class="seat-properties-grid" style="margin-bottom: 12px;">
                    <div class="prop-card">
                        <span class="prop-label">Student Index</span>
                        <strong class="prop-val">${student.indexNumber}</strong>
                    </div>
                    <div class="prop-card">
                        <span class="prop-label">Academic Batch</span>
                        <strong class="prop-val">${student.batch}</strong>
                    </div>
                </div>

                <div class="prop-card" style="margin-bottom: 12px;">
                    <span class="prop-label">Faculty / Department</span>
                    <strong class="prop-val" style="font-size: 0.9rem;">${student.department}</strong>
                </div>

                <div class="student-privileges-box">
                    <h5>University Telemetry Privileges Unlocked:</h5>
                    <div class="privilege-item"><i class="fas fa-check-circle text-success" style="color: var(--pulse-green);"></i> 30-Minute Library Desk Holds & Reservations</div>
                    <div class="privilege-item"><i class="fas fa-check-circle text-success" style="color: var(--pulse-green);"></i> Real-Time Threshold Push Notifications</div>
                    <div class="privilege-item"><i class="fas fa-check-circle text-success" style="color: var(--pulse-green);"></i> Personalized Speed Mode & Arrival Projections</div>
                </div>

                <button class="secondary-btn" style="color: var(--danger); border-color: rgba(239, 68, 68, 0.3);" onclick="signOutStudent()">
                    <i class="fas fa-sign-out-alt"></i> Sign Out / Switch Student Account
                </button>
            </div>
        `;
    } else if (!AppState.isEnteringOtp) {
        body.innerHTML = `
            <div style="margin-bottom: 16px;">
                <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">Connect Your UoM Student Webmail</h4>
                <p style="font-size: 0.84rem; color: var(--text-secondary);">
                    Enter your official university email (<a href="https://webmail.uom.lk/" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 700;">webmail.uom.lk</a>) to unlock 30-minute desk reservations and personalized university telemetry.
                </p>
            </div>

            <form id="student-email-form" onsubmit="event.preventDefault(); handleSendOtp();">
                <div class="form-group" style="margin-bottom: 10px;">
                    <label for="uom-email-input">Student Email Address</label>
                    <input type="email" id="uom-email-input" placeholder="e.g. 210123A@uom.lk or name.21@cse.mrt.ac.lk" required value="${AppState.pendingOtpEmail || ''}">
                </div>

                <div class="domain-chips-grid">
                    <button type="button" class="domain-chip" onclick="appendDomainToInput('@uom.lk')">@uom.lk</button>
                    <button type="button" class="domain-chip" onclick="appendDomainToInput('@cse.mrt.ac.lk')">@cse.mrt.ac.lk</button>
                    <button type="button" class="domain-chip" onclick="appendDomainToInput('@itfac.mrt.ac.lk')">@itfac.mrt.ac.lk</button>
                    <button type="button" class="domain-chip" onclick="appendDomainToInput('@mech.mrt.ac.lk')">@mech.mrt.ac.lk</button>
                    <button type="button" class="domain-chip" onclick="appendDomainToInput('@civil.mrt.ac.lk')">@civil.mrt.ac.lk</button>
                    <button type="button" class="domain-chip" onclick="appendDomainToInput('@ent.mrt.ac.lk')">@ent.mrt.ac.lk</button>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label for="uom-name-input">Full Name (Optional)</label>
                    <input type="text" id="uom-name-input" placeholder="e.g. Kavindu Dilupa">
                </div>

                <button type="submit" class="primary-btn uom-btn">
                    <i class="fas fa-paper-plane"></i> Send 6-Digit Verification Code
                </button>
            </form>

            <a href="https://webmail.uom.lk/" target="_blank" rel="noopener noreferrer" class="secondary-btn" style="display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none; margin-top: 10px; color: var(--uom-crimson); font-weight: 700; border-color: rgba(136, 19, 55, 0.3);">
                <i class="fas fa-arrow-up-right-from-square"></i> Open University Webmail (https://webmail.uom.lk/)
            </a>
        `;
    } else {
        body.innerHTML = `
            <div style="text-align: center; margin-bottom: 16px;">
                <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">Enter 6-Digit Verification Code</h4>
                <p style="font-size: 0.84rem; color: var(--text-secondary);">
                    Verification code dispatched to <strong>${AppState.pendingOtpEmail}</strong>
                </p>
            </div>

            <div class="webmail-helper-card" style="margin-bottom: 14px;">
                <i class="fas fa-envelope-open-text" style="font-size: 1.5rem; color: #0284c7;"></i>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 0.82rem;">Delivered to Webmail</div>
                    <div style="font-size: 0.72rem; color: var(--text-secondary);">Your verification code is only viewable in your university webmail inbox.</div>
                </div>
                <div style="display: flex; gap: 6px; flex-shrink: 0;">
                    <a href="https://webmail.uom.lk/" target="_blank" rel="noopener noreferrer" class="webmail-open-action-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                        <i class="fas fa-arrow-up-right-from-square"></i> webmail.uom.lk
                    </a>
                    <button type="button" class="webmail-open-action-btn" onclick="openUniversityWebmailModal('${AppState.pendingOtpEmail}')">
                        <i class="fas fa-inbox"></i> Inbox
                    </button>
                </div>
            </div>

            <form id="student-otp-form" onsubmit="event.preventDefault(); handleVerifyOtp();">
                <div class="otp-box-container">
                    <input type="text" id="otp-code-input" class="otp-input-field" maxlength="6" pattern="[0-9]{6}" placeholder="••••••" required autofocus>
                </div>

                <button type="submit" class="primary-btn" style="margin-bottom: 10px;">
                    <i class="fas fa-shield-check"></i> Verify & Unlock Student Features
                </button>

                <div style="display: flex; gap: 8px;">
                    <button type="button" class="secondary-btn" style="flex: 1;" onclick="AppState.isEnteringOtp = false; renderStudentAuthModalBody();">
                        <i class="fas fa-arrow-left"></i> Change Email
                    </button>
                    <button type="button" class="secondary-btn" style="flex: 1; color: #0284c7; border-color: rgba(2, 132, 199, 0.3);" onclick="handleSendOtp()">
                        <i class="fas fa-rotate"></i> Resend
                    </button>
                </div>
            </form>
        `;
    }
}

function appendDomainToInput(domain) {
    const input = document.getElementById('uom-email-input');
    if (!input) return;
    const current = input.value.trim();
    if (current.includes('@')) {
        const prefix = current.split('@')[0];
        input.value = prefix + domain;
    } else {
        input.value = current + domain;
    }
    input.focus();
}

async function handleSendOtp() {
    const email = document.getElementById('uom-email-input').value.trim();
    const customName = document.getElementById('uom-name-input').value.trim();

    if (!isValidUomEmail(email)) {
        showToast('Please enter a valid @uom.lk or @*.mrt.ac.lk university email.', true);
        return;
    }

    try {
        const resp = await fetch('http://127.0.0.1:8000/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, name: customName })
        });
        const data = await resp.json();

        if (!resp.ok) {
            throw new Error(data.detail || 'Failed to dispatch verification code.');
        }

        AppState.pendingOtpEmail = email;
        AppState.pendingOtpCustomName = customName;
        AppState.isEnteringOtp = true;

        showToast('Verification code dispatched to your University Webmail. Check your inbox at webmail.uom.lk 📩');
        renderStudentAuthModalBody();
        renderPortalAuthBody();
    } catch (err) {
        showToast(err.message || 'Failed to connect to backend auth service.', true);
    }
}

async function handleVerifyOtp() {
    const input = document.getElementById('otp-code-input');
    const code = input ? input.value.trim() : '';

    if (!code || code.length !== 6) {
        showToast('Please enter the 6-digit verification code from your webmail.', true);
        return;
    }

    try {
        const resp = await fetch('http://127.0.0.1:8000/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: AppState.pendingOtpEmail,
                code: code,
                name: AppState.pendingOtpCustomName
            })
        });
        const data = await resp.json();

        if (!resp.ok) {
            throw new Error(data.detail || 'Invalid or expired verification code.');
        }

        const studentProfile = data.student;
        AppState.currentStudent = studentProfile;
        localStorage.setItem('spacepulse_student_profile', JSON.stringify(studentProfile));
        if (data.token) {
            localStorage.setItem('spacepulse_auth_token', data.token);
        }

        AppState.isEnteringOtp = false;
        AppState.pendingOtpEmail = null;
        AppState.pendingOtpCustomName = null;

        showToast(`Welcome, ${studentProfile.name}! Verified as ${studentProfile.department} 🎓`);
        updateStudentHeaderElements();
        renderStudentAuthModalBody();
        renderPortalAuthBody();
        const modal = document.getElementById('student-auth-modal');
        if (modal) modal.style.display = 'none';
        hideStudentLoginPage();
        if (AppState.currentTab === 'home') renderHome();
    } catch (err) {
        showToast(err.message || 'Invalid verification code. Please check your webmail.', true);
    }
}

function signOutStudent() {
    AppState.currentStudent = null;
    localStorage.removeItem('spacepulse_student_profile');
    localStorage.removeItem('spacepulse_auth_token');
    AppState.isEnteringOtp = false;
    AppState.pendingOtpEmail = null;
    AppState.pendingOtpCustomName = null;

    showToast('Signed out of student account. Login with University Webmail anytime.');
    updateStudentHeaderElements();
    renderStudentAuthModalBody();
    renderPortalAuthBody();
    hideStudentLoginPage();
    if (AppState.currentTab === 'home') renderHome();
}

function updateStudentHeaderElements() {
    const topbarBtn = document.getElementById('topbar-student-btn');
    const topbarLabel = document.getElementById('topbar-student-label');
    const sidebarName = document.getElementById('sidebar-student-name');
    const sidebarDept = document.getElementById('sidebar-student-dept');
    const sidebarAvatar = document.getElementById('sidebar-avatar-icon');
    const student = AppState.currentStudent;

    if (student) {
        topbarLabel.textContent = student.name.split(' ')[0];
        topbarBtn.classList.add('verified');

        sidebarName.textContent = student.name;
        sidebarDept.innerHTML = `<i class="fas fa-check-circle" style="color: var(--pulse-green);"></i> ${student.indexNumber}`;
        sidebarAvatar.classList.add('verified');
        sidebarAvatar.innerHTML = '<i class="fas fa-check"></i>';
    } else {
        topbarLabel.textContent = 'Student Login';
        topbarBtn.classList.remove('verified');

        sidebarName.textContent = 'Student Login';
        sidebarDept.innerHTML = '<i class="fas fa-lock"></i> Verify @uom.lk';
        sidebarAvatar.classList.remove('verified');
        sidebarAvatar.innerHTML = '<i class="fas fa-user-graduate"></i>';
    }
}

// ==========================================================================
// 7. Settings & Stream Diagnostics Modal
// ==========================================================================

function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    const studentStatus = document.getElementById('settings-student-status-text');
    if (studentStatus) {
        studentStatus.textContent = AppState.currentStudent
            ? `Verified: ${AppState.currentStudent.name} (${AppState.currentStudent.indexNumber})`
            : 'Guest exploration mode (tap to verify @uom.lk)';
    }
    modal.style.display = 'flex';
}

function resetAllData() {
    if (confirm('Are you sure you want to reset all stored reservations, alerts, and student profile?')) {
        localStorage.clear();
        AppState.favorites = ['floor_ground', 'canteen_goda_uda'];
        AppState.alerts = [];
        AppState.activeReservation = null;
        AppState.currentStudent = null;
        showToast('All local storage data reset.');
        location.reload();
    }
}

// ==========================================================================
// 8. Interactive Seat Details & Reservation Modal
// ==========================================================================

let activeModalSeat = null;

function openSeatModal(seatId, floorId) {
    const seats = spacePulseData.seatsByFloor[floorId] || [];
    const seat = seats.find(s => s.id === seatId);
    if (!seat) return;

    activeModalSeat = { ...seat, floorId };
    const floor = spacePulseData.libraryFloors.find(f => f.id === floorId);

    document.getElementById('seat-modal-title').textContent = `Seat ${seat.seatNumber}`;
    document.getElementById('seat-modal-subtitle').textContent = `${floor.floor} • ${seat.section}`;

    const isReservedByMe = AppState.activeReservation && AppState.activeReservation.seatId === seat.id;
    const statusText = isReservedByMe ? 'Reserved (You)' : (seat.status === 'free' ? 'Available Free' : (seat.status === 'reserved' ? 'Reserved' : 'Occupied'));

    const statusElem = document.getElementById('seat-modal-status');
    statusElem.textContent = statusText;
    statusElem.className = 'prop-val ' + (seat.status === 'free' || isReservedByMe ? 'status-free' : '');

    document.getElementById('seat-modal-power').innerHTML = seat.powerOutlet
        ? '<i class="fas fa-plug" style="color: var(--pulse-green);"></i> Available'
        : '<span style="color: var(--text-muted);">None</span>';

    document.getElementById('seat-modal-zone').innerHTML = floor.isQuietZone
        ? '<i class="fas fa-volume-xmark" style="color: var(--primary-blue);"></i> Silent Zone'
        : '<span>General Study</span>';

    const reserveBtn = document.getElementById('seat-reserve-btn');
    if (isReservedByMe) {
        reserveBtn.innerHTML = '<i class="fas fa-times-circle"></i> Cancel Reservation';
        reserveBtn.onclick = cancelReservation;
    } else if (seat.status === 'free') {
        reserveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Hold / Reserve This Seat (30 Mins)';
        reserveBtn.onclick = () => confirmReservation(seat, floor);
    } else {
        reserveBtn.innerHTML = '<i class="fas fa-ban"></i> Seat Currently Unavailable';
        reserveBtn.onclick = null;
    }

    document.getElementById('seat-share-btn').onclick = () => {
        const text = `Let's study together at Seat ${seat.seatNumber} (${floor.floor})! SpacePulse shows free seats right now: ${SPACEPULSE_PRODUCTION_URL}`;
        navigator.clipboard.writeText(text);
        showToast('Spot link copied! Opening QR code for phone scanning... 📲');
        setTimeout(() => {
            document.getElementById('seat-modal').style.display = 'none';
            openQrModal(SPACEPULSE_PRODUCTION_URL);
        }, 400);
    };

    document.getElementById('seat-modal').style.display = 'flex';
}

function confirmReservation(seat, floor) {
    const expiresAt = Date.now() + (30 * 60 * 1000);
    AppState.activeReservation = {
        seatId: seat.id,
        seatNumber: seat.seatNumber,
        floorId: floor.id,
        floorName: floor.floor,
        reservedBy: AppState.currentStudent ? AppState.currentStudent.indexNumber : 'Guest',
        expiresAt
    };

    localStorage.setItem('spacepulse_reservation', JSON.stringify(AppState.activeReservation));
    document.getElementById('seat-modal').style.display = 'none';

    showToast(`Seat ${seat.seatNumber} held for you for 30 minutes! 🎯`);
    updateReservationBanner();
    renderMaps();
}

function cancelReservation() {
    AppState.activeReservation = null;
    localStorage.removeItem('spacepulse_reservation');
    document.getElementById('seat-modal').style.display = 'none';
    showToast('Reservation cancelled.');
    updateReservationBanner();
    renderMaps();
}

function updateReservationBanner() {
    const banner = document.getElementById('reservation-banner');
    if (!banner) return;

    if (!AppState.activeReservation) {
        banner.style.display = 'none';
        if (AppState.reservationTimerInterval) clearInterval(AppState.reservationTimerInterval);
        return;
    }

    const res = AppState.activeReservation;
    document.getElementById('res-seat-title').textContent = `Seat ${res.seatNumber} on ${res.floorName}`;

    function tickTimer() {
        const remainingMs = res.expiresAt - Date.now();
        if (remainingMs <= 0) {
            cancelReservation();
            showToast('Your seat hold has expired.');
            return;
        }

        const mins = Math.floor(remainingMs / 60000);
        const secs = Math.floor((remainingMs % 60000) / 1000);
        const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        document.getElementById('res-time-remaining').textContent = `Expires in ${timeStr} mins • Keep app open upon arrival`;
    }

    tickTimer();
    if (AppState.reservationTimerInterval) clearInterval(AppState.reservationTimerInterval);
    AppState.reservationTimerInterval = setInterval(tickTimer, 1000);

    banner.style.display = 'flex';
}

// Facility Details Modal
function openFacilityDetail(facilityId) {
    const modal = document.getElementById('facility-detail-modal');
    const title = document.getElementById('fac-modal-title');
    const subtitle = document.getElementById('fac-modal-subtitle');
    const body = document.getElementById('fac-modal-body');

    const floor = spacePulseData.libraryFloors.find(f => f.id === facilityId);
    if (floor) {
        title.textContent = floor.floor;
        subtitle.textContent = 'University Library Study Area';
        body.innerHTML = `
            <div class="stat-row"><span>Available Seats:</span><strong>${floor.availableSeats} of ${floor.totalSeats}</strong></div>
            <div class="stat-row"><span>Location Landmark:</span><strong>${floor.landmark}</strong></div>
            <div class="stat-row"><span>Quiet Study:</span><strong>${floor.isQuietZone ? 'Yes (Silent Zone)' : 'General Commons'}</strong></div>
            <div class="stat-row"><span>Power Outlets:</span><strong>${floor.hasPowerOutlets ? 'Available at all desks' : 'Limited'}</strong></div>
            <button class="primary-btn" style="margin-top: 18px;" onclick="document.getElementById('facility-detail-modal').style.display='none'; navigateTo('maps'); switchFloor('${floor.id}'); switchMapMode('floorplans');">
                <i class="fas fa-chair"></i> Open 2D Floor Plan
            </button>
        `;
        modal.style.display = 'flex';
        return;
    }

    const canteen = spacePulseData.canteens.find(c => c.id === facilityId);
    if (canteen) {
        title.textContent = canteen.name;
        subtitle.textContent = canteen.location;
        body.innerHTML = `
            <div class="stat-row"><span>Operating Status:</span><strong>${canteen.status}</strong></div>
            <div class="stat-row"><span>Occupancy Count:</span><strong>${canteen.personCount} / ${canteen.maxCapacity} persons</strong></div>
            <div class="stat-row"><span>Specialty Foods:</span><strong>${canteen.specialties}</strong></div>
            <div class="stat-row"><span>Estimated Line Wait:</span><strong>~${Math.max(1, Math.round(canteen.personCount * 0.12))} mins</strong></div>
            <button class="primary-btn" style="margin-top: 18px;" onclick="document.getElementById('facility-detail-modal').style.display='none'; navigateTo('maps'); updateBlueprintDestination('${canteen.id}'); switchMapMode('infrastructure'); jumpToBlueprintNode('${canteen.id}');">
                <i class="fas fa-location-arrow"></i> Navigate on CAD Infrastructure Map
            </button>
        `;
        modal.style.display = 'flex';
        return;
    }

    const atm = spacePulseData.atms.find(a => a.id === facilityId);
    if (atm) {
        title.textContent = atm.name;
        subtitle.textContent = atm.bankName;
        body.innerHTML = `
            <div class="stat-row"><span>Status:</span><strong>${atm.status}</strong></div>
            <div class="stat-row"><span>Cash Available:</span><strong>${atm.hasCash ? 'Yes' : 'Out of Order / No Cash'}</strong></div>
            <div class="stat-row"><span>Queue Count:</span><strong>${atm.queueLength} persons</strong></div>
            <div class="stat-row"><span>Location:</span><strong>${atm.location}</strong></div>
            <button class="primary-btn" style="margin-top: 18px;" onclick="document.getElementById('facility-detail-modal').style.display='none'; navigateTo('maps'); updateBlueprintDestination('${atm.id}'); switchMapMode('infrastructure'); jumpToBlueprintNode('${atm.id}');">
                <i class="fas fa-location-arrow"></i> Walking Directions on CAD Map
            </button>
        `;
        modal.style.display = 'flex';
        return;
    }

    const shop = spacePulseData.bookshops.find(b => b.id === facilityId);
    if (shop) {
        title.textContent = shop.name;
        subtitle.textContent = shop.location;
        body.innerHTML = `
            <div class="stat-row"><span>Status:</span><strong>${shop.status}</strong></div>
            <div class="stat-row"><span>Crowdedness:</span><strong>${shop.crowdedness}</strong></div>
            <div class="stat-row"><span>Services Offered:</span><strong>${shop.services.join(', ')}</strong></div>
            <button class="primary-btn" style="margin-top: 18px;" onclick="document.getElementById('facility-detail-modal').style.display='none'; navigateTo('maps'); updateBlueprintDestination('${shop.id}'); switchMapMode('infrastructure'); jumpToBlueprintNode('${shop.id}');">
                <i class="fas fa-location-arrow"></i> Walking Directions on CAD Map
            </button>
        `;
        modal.style.display = 'flex';
    }
}

// ==========================================================================
// 9. Navigation Router
// ==========================================================================

function navigateTo(target) {
    AppState.currentTab = target;

    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('data-target') === target) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    document.getElementById('sidebar').classList.remove('open');

    switch (target) {
        case 'home':
            renderHome();
            break;
        case 'maps':
            renderMaps();
            break;
        case 'library':
            renderLibrary();
            break;
        case 'canteen':
            renderCanteen();
            break;
        case 'atm':
            renderAtm();
            break;
        case 'bookshop':
            renderBookshop();
            break;
        case 'trends':
            renderTrends();
            break;
        case 'kiosk':
            renderKiosk();
            break;
        default:
            renderHome();
    }
}

function toggleFavorite(id) {
    if (AppState.favorites.includes(id)) {
        AppState.favorites = AppState.favorites.filter(fav => fav !== id);
        showToast('Removed from favorites.');
    } else {
        AppState.favorites.push(id);
        showToast('Added to favorites! ⭐');
    }
    localStorage.setItem('spacepulse_favs', JSON.stringify(AppState.favorites));

    if (AppState.currentTab === 'home') renderHome();
    else if (AppState.currentTab === 'library') renderLibrary();
    else if (AppState.currentTab === 'canteen') renderCanteen();
    else if (AppState.currentTab === 'atm') renderAtm();
    else if (AppState.currentTab === 'bookshop') renderBookshop();
}

function showToast(msg, isDanger = false) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast' + (isDanger ? ' danger' : '');
    toast.innerHTML = `<i class="fas ${isDanger ? 'fa-triangle-exclamation' : 'fa-bell'}"></i> <span>${msg}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ==========================================================================
// 10. SpacePulse AI University Assistant (Chatbot)
// ==========================================================================

const chatbotDrawer = document.getElementById('chatbot-drawer');
const chatbotOverlay = document.getElementById('chatbot-overlay');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');

function initChatbot() {
    if (chatMessages.children.length === 0) {
        addChatMessage('bot', "Hello! I am **SpacePulse AI**, your live university assistant for University of Moratuwa. I have real-time telemetry on library vacancies, canteen crowds, and ATM queues. What can I help you find right now?");
    }

    document.getElementById('chatbot-fab').addEventListener('click', toggleChatbot);
    document.getElementById('open-chatbot-btn').addEventListener('click', toggleChatbot);
    document.getElementById('chatbot-close-btn').addEventListener('click', toggleChatbot);
    chatbotOverlay.addEventListener('click', toggleChatbot);

    chatSendBtn.addEventListener('click', handleChatSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSend();
    });

    document.querySelectorAll('#chat-quick-chips .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            chatInput.value = prompt;
            handleChatSend();
        });
    });

    document.getElementById('chatbot-key-btn').addEventListener('click', () => {
        const key = prompt('Enter your Google Gemini API Key (Optional for AI reasoning):', AppState.geminiApiKey);
        if (key !== null) {
            AppState.geminiApiKey = key.trim();
            localStorage.setItem('spacepulse_gemini_key', AppState.geminiApiKey);
            showToast('Gemini API key saved! 🔑');
        }
    });
}

function toggleChatbot() {
    chatbotDrawer.classList.toggle('open');
    chatbotOverlay.classList.toggle('open');
    if (chatbotDrawer.classList.contains('open')) {
        chatInput.focus();
    }
}

function addChatMessage(role, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleChatSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    addChatMessage('user', text);
    chatInput.value = '';

    const reply = await generateAiResponse(text);
    addChatMessage('bot', reply);
}

async function generateAiResponse(query) {
    const q = query.toLowerCase();
    const stats = getStats();

    if (AppState.geminiApiKey) {
        try {
            const systemPrompt = `You are SpacePulse AI for University of Moratuwa. Current snapshot: Total Free Seats: ${stats.availableLibrarySeats}, Best Floor: ${stats.bestFloor.floor} (${stats.bestFloor.availableSeats} free), Best Food: ${stats.bestCanteen ? stats.bestCanteen.name : 'None'}, Shortest ATM: ${stats.shortestAtmName} (${stats.shortestAtmQueue} in line). Answer concisely in friendly tone.`;
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${AppState.geminiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        { role: 'user', parts: [{ text: systemPrompt + '\nStudent asks: ' + query }] }
                    ]
                })
            });
            const data = await res.json();
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                return data.candidates[0].content.parts[0].text;
            }
        } catch (e) {
            console.warn('Gemini API fallback to local reasoning engine:', e);
        }
    }

    if (q.includes('quiet') || q.includes('study') || q.includes('seat') || q.includes('silent')) {
        const quietFloors = spacePulseData.libraryFloors.filter(f => f.isQuietZone && f.availableSeats > 0);
        if (quietFloors.length > 0) {
            const best = quietFloors[0];
            return `The best quiet study area right now is **${best.floor}** with **${best.availableSeats} available desks**. It features dedicated silent carrels, 5G WiFi, and power outlets at every desk!`;
        }
        return `Currently **${stats.bestFloor.floor}** has the most free desks (**${stats.bestFloor.availableSeats} free seats** of ${stats.bestFloor.totalSeats}).`;
    }

    if (q.includes('canteen') || q.includes('eat') || q.includes('food') || q.includes('lunch') || q.includes('hungry')) {
        if (stats.bestCanteen) {
            return `I recommend **${stats.bestCanteen.name}**! It's currently the least crowded with **${stats.bestCanteen.personCount}/${stats.bestCanteen.maxCapacity} people** (~${Math.max(1, Math.round(stats.bestCanteen.personCount * 0.12))} min line). Specialties: ${stats.bestCanteen.specialties}.`;
        }
        return "Canteens are currently experiencing steady crowds. Check the Canteens tab for live seat ratios.";
    }

    if (q.includes('atm') || q.includes('cash') || q.includes('money') || q.includes('bank')) {
        const working = spacePulseData.atms.filter(a => a.status === 'Working' && a.hasCash);
        if (working.length > 0) {
            const shortest = working.sort((a, b) => a.queueLength - b.queueLength)[0];
            return `The shortest queue is at **${shortest.name}** near ${shortest.location} with only **${shortest.queueLength} people in line** and confirmed cash available!`;
        }
        return "Please note that Commercial Bank ATM is currently out of order. Bank of Ceylon and People's Bank are operating.";
    }

    if (q.includes('power') || q.includes('socket') || q.includes('plug') || q.includes('laptop')) {
        return "Both **Second Down Floor** and **Ground Floor** have AC power outlets equipped at study carrels and window desks. Ground Floor currently has 120 available seats!";
    }

    return `At University of Moratuwa right now: We have **${stats.availableLibrarySeats} free library desks**, **${stats.openCanteensCount} open canteens**, and the shortest ATM line is at **${stats.shortestAtmName}** (${stats.shortestAtmQueue} in line). Ask me about study spots, food, or navigation!`;
}

// ==========================================================================
// 11. Smart Threshold Alerts Engine
// ==========================================================================

function initAlerts() {
    const alertBtn = document.getElementById('alerts-modal-btn');
    const modal = document.getElementById('alerts-modal');
    const closeBtn = document.getElementById('alerts-modal-close');
    const form = document.getElementById('add-alert-form');

    alertBtn.addEventListener('click', () => {
        renderActiveAlertsList();
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const facilityId = document.getElementById('alert-facility').value;
        const condition = document.getElementById('alert-condition').value;
        const threshold = parseInt(document.getElementById('alert-threshold').value, 10);

        const newAlert = {
            id: 'alt_' + Date.now(),
            facilityId,
            condition,
            threshold
        };

        AppState.alerts.push(newAlert);
        localStorage.setItem('spacepulse_alerts', JSON.stringify(AppState.alerts));
        updateAlertBadge();
        renderActiveAlertsList();
        showToast('Smart Alert trigger registered! 🔔');
    });

    updateAlertBadge();
}

function updateAlertBadge() {
    const badge = document.getElementById('alert-badge-count');
    if (!badge) return;
    if (AppState.alerts.length > 0) {
        badge.textContent = AppState.alerts.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function renderActiveAlertsList() {
    const list = document.getElementById('active-alerts-list');
    const count = document.getElementById('active-alerts-count');
    if (!list) return;

    count.textContent = AppState.alerts.length;
    if (AppState.alerts.length === 0) {
        list.innerHTML = '<p style="color: var(--text-muted); font-size: 0.82rem;">No active alert triggers. Set one above!</p>';
        return;
    }

    list.innerHTML = AppState.alerts.map(a => {
        const floor = spacePulseData.libraryFloors.find(f => f.id === a.facilityId);
        const canteen = spacePulseData.canteens.find(c => c.id === a.facilityId);
        const name = floor ? floor.floor : (canteen ? canteen.name : a.facilityId);
        const condText = a.condition === 'seats_greater' ? `Seats > ${a.threshold}` : `Crowd < ${a.threshold}`;

        return `
            <div class="alert-item-card">
                <span><strong>${name}</strong>: ${condText}</span>
                <button class="alert-del-btn" onclick="deleteAlert('${a.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
    }).join('');
}

function deleteAlert(alertId) {
    AppState.alerts = AppState.alerts.filter(a => a.id !== alertId);
    localStorage.setItem('spacepulse_alerts', JSON.stringify(AppState.alerts));
    updateAlertBadge();
    renderActiveAlertsList();
}

function evaluateAlertThresholds() {
    AppState.alerts.forEach(a => {
        const floor = spacePulseData.libraryFloors.find(f => f.id === a.facilityId);
        if (floor && a.condition === 'seats_greater' && floor.availableSeats >= a.threshold) {
            showToast(`Alert: ${floor.floor} now has ${floor.availableSeats} available seats! 🔔`);
        }

        const canteen = spacePulseData.canteens.find(c => c.id === a.facilityId);
        if (canteen && a.condition === 'crowd_less' && canteen.personCount <= a.threshold) {
            showToast(`Alert: ${canteen.name} crowd dropped to ${canteen.personCount} students! 🍽️`);
        }
    });
}

// ==========================================================================
// 12. Real-Time Telemetry Simulation Engine
// ==========================================================================

function initSimulationEngine() {
    const syncBtn = document.getElementById('sync-toggle-btn');
    syncBtn.addEventListener('click', () => {
        AppState.simulationActive = !AppState.simulationActive;
        syncBtn.classList.toggle('paused', !AppState.simulationActive);
        showToast(AppState.simulationActive ? 'Live sensor telemetry active.' : 'Simulation paused.');
    });

    setInterval(() => {
        if (!AppState.simulationActive) return;

        spacePulseData.libraryFloors.forEach(floor => {
            const delta = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3);
            floor.availableSeats = Math.max(0, Math.min(floor.totalSeats, floor.availableSeats + delta));
        });

        spacePulseData.canteens.forEach(canteen => {
            if (canteen.status === 'Open') {
                const delta = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 4);
                canteen.personCount = Math.max(5, Math.min(canteen.maxCapacity, canteen.personCount + delta));
            }
        });

        spacePulseData.atms.forEach(atm => {
            if (atm.status === 'Working') {
                const delta = (Math.random() > 0.5 ? 1 : -1);
                atm.queueLength = Math.max(0, Math.min(15, atm.queueLength + delta));
            }
        });

        evaluateAlertThresholds();

        if (AppState.currentTab === 'home') {
            const searchInput = document.getElementById('home-search-input');
            const isFocused = searchInput && document.activeElement === searchInput;
            if (isFocused) {
                updateHomeSearchResults();
            } else {
                renderHome();
            }
        }
        else if (AppState.currentTab === 'library') renderLibrary();
        else if (AppState.currentTab === 'canteen') renderCanteen();
        else if (AppState.currentTab === 'atm') renderAtm();
    }, 8000);
}

// ==========================================================================
// 13. Theme & Navigation Setup
// ==========================================================================

function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        AppState.theme = theme;
        localStorage.setItem('spacepulse_theme', theme);
        if (themeIcon) themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        const portalThemeIcon = document.getElementById('portal-theme-icon');
        if (portalThemeIcon) portalThemeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

        // Dynamically update Leaflet map tile layer to match theme
        if (AppState.leafletMap && AppState.activeMapTileLayer) {
            if (theme === 'dark' && AppState.darkLayer) {
                AppState.leafletMap.removeLayer(AppState.activeMapTileLayer);
                AppState.darkLayer.addTo(AppState.leafletMap);
                AppState.activeMapTileLayer = AppState.darkLayer;
            } else if (theme === 'light' && AppState.googleStreetLayer) {
                AppState.leafletMap.removeLayer(AppState.activeMapTileLayer);
                AppState.googleStreetLayer.addTo(AppState.leafletMap);
                AppState.activeMapTileLayer = AppState.googleStreetLayer;
            }
        }

        // Dynamically update CAD Infrastructure Blueprint layer to match theme
        if (AppState.blueprintImageLayer) {
            const imgEl = AppState.blueprintImageLayer.getElement ? AppState.blueprintImageLayer.getElement() : (AppState.blueprintImageLayer._image || document.querySelector('.blueprint-map-layer'));
            if (imgEl && AppState.blueprintContrastMode === 'auto') {
                if (theme === 'dark') {
                    imgEl.classList.add('dark-blueprint');
                } else {
                    imgEl.classList.remove('dark-blueprint');
                }
            }
        }
    }

    applyTheme(AppState.theme);

    themeBtn.addEventListener('click', () => {
        const nextTheme = AppState.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle-btn');
    const sidebarClose = document.getElementById('sidebar-close-btn');

    menuToggle.addEventListener('click', () => sidebar.classList.add('open'));
    sidebarClose.addEventListener('click', () => sidebar.classList.remove('open'));

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('data-target');
            if (target) navigateTo(target);
        });
    });

    document.getElementById('seat-modal-close').addEventListener('click', () => {
        document.getElementById('seat-modal').style.display = 'none';
    });

    document.getElementById('fac-modal-close').addEventListener('click', () => {
        document.getElementById('facility-detail-modal').style.display = 'none';
    });

    document.getElementById('student-modal-close').addEventListener('click', () => {
        document.getElementById('student-auth-modal').style.display = 'none';
    });

    document.getElementById('settings-modal-close').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'none';
    });

    const qrModalCloseBtn = document.getElementById('qr-modal-close');
    if (qrModalCloseBtn) {
        qrModalCloseBtn.addEventListener('click', closeQrModal);
    }

    const qrModalBackdrop = document.getElementById('qr-modal');
    if (qrModalBackdrop) {
        qrModalBackdrop.addEventListener('click', (e) => {
            if (e.target.id === 'qr-modal') closeQrModal();
        });
    }

    const qrUrlInput = document.getElementById('qr-url-input');
    if (qrUrlInput) {
        qrUrlInput.addEventListener('input', (e) => {
            clearTimeout(qrDebounceTimer);
            qrDebounceTimer = setTimeout(() => {
                const url = e.target.value.trim();
                updateQrPresetChips(url);
                renderQrCodeDisplay(url);
            }, 180);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeQrModal();
        }
    });

    document.getElementById('res-view-map-btn').addEventListener('click', () => {
        if (AppState.activeReservation) {
            navigateTo('maps');
            switchFloor(AppState.activeReservation.floorId);
            switchMapMode('floorplans');
        }
    });

    document.getElementById('res-cancel-btn').addEventListener('click', cancelReservation);

    window.addEventListener('resize', () => {
        if (AppState.leafletMap) {
            AppState.leafletMap.invalidateSize();
        }
    });
}

function checkInitialDeepLink() {
    const hash = window.location.hash;
    if (hash && hash.includes('facility')) {
        const match = hash.match(/id=([^&]+)/);
        if (match && match[1]) {
            const fid = match[1];
            setTimeout(() => openFacilityDetail(fid), 400);
        }
    }
}

// ==========================================================================
// SpacePulse Mobile QR & Sharing System
// ==========================================================================

let qrCodeGeneratorInstance = null;
let qrDebounceTimer = null;
const SPACEPULSE_PRODUCTION_URL = 'https://teamnodex.github.io/SpacePulse/';

function getEffectiveCurrentUrl() {
    try {
        const href = window.location.href;
        if (href && !href.startsWith('file:') && !href.startsWith('about:') && href !== 'blob:') {
            return href;
        }
    } catch (e) {}
    return SPACEPULSE_PRODUCTION_URL;
}

function openQrModal(targetUrl) {
    const modal = document.getElementById('qr-modal');
    if (!modal) return;

    let initialUrl = targetUrl;
    if (!initialUrl) {
        const input = document.getElementById('qr-url-input');
        initialUrl = (input && input.value.trim()) ? input.value.trim() : getEffectiveCurrentUrl();
    }

    // Check if running locally (file:// or localhost)
    const isLocal = window.location.protocol === 'file:' || 
                    window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';
    
    const localNotice = document.getElementById('qr-local-notice');
    if (localNotice) {
        localNotice.style.display = (isLocal && initialUrl !== SPACEPULSE_PRODUCTION_URL) ? 'flex' : 'none';
    }

    // Update preset chips
    updateQrPresetChips(initialUrl);

    // Set input value
    const urlInput = document.getElementById('qr-url-input');
    if (urlInput) {
        urlInput.value = initialUrl;
    }

    // Render the QR Code
    renderQrCodeDisplay(initialUrl);

    modal.style.display = 'flex';
}

function closeQrModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) modal.style.display = 'none';
}

function updateQrPresetChips(currentUrl) {
    const browserBtn = document.getElementById('qr-chip-browser');
    const githubBtn = document.getElementById('qr-chip-github');
    const customBtn = document.getElementById('qr-chip-custom');

    [browserBtn, githubBtn, customBtn].forEach(b => b && b.classList.remove('active'));

    const effectiveBrowserUrl = window.location.href;
    if (currentUrl === effectiveBrowserUrl && window.location.protocol !== 'file:') {
        if (browserBtn) browserBtn.classList.add('active');
    } else if (currentUrl === SPACEPULSE_PRODUCTION_URL) {
        if (githubBtn) githubBtn.classList.add('active');
    } else {
        if (customBtn) customBtn.classList.add('active');
    }
}

function setQrUrlPreset(preset) {
    let newUrl = SPACEPULSE_PRODUCTION_URL;
    const urlInput = document.getElementById('qr-url-input');
    const localNotice = document.getElementById('qr-local-notice');

    if (preset === 'browser') {
        newUrl = (window.location.protocol !== 'file:' && window.location.href) 
            ? window.location.href 
            : SPACEPULSE_PRODUCTION_URL;
        if (localNotice) {
            const isLocal = window.location.protocol === 'file:' || 
                            window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1';
            localNotice.style.display = isLocal ? 'flex' : 'none';
        }
    } else if (preset === 'github') {
        newUrl = SPACEPULSE_PRODUCTION_URL;
        if (localNotice) localNotice.style.display = 'none';
    } else if (preset === 'custom') {
        if (urlInput) {
            urlInput.focus();
            urlInput.select();
        }
        updateQrPresetChips('custom');
        return;
    }

    if (urlInput) urlInput.value = newUrl;
    updateQrPresetChips(newUrl);
    renderQrCodeDisplay(newUrl);
}

function renderQrCodeDisplay(url) {
    const container = document.getElementById('qr-code-target');
    if (!container) return;

    const sanitizedUrl = (url && url.trim()) ? url.trim() : SPACEPULSE_PRODUCTION_URL;

    container.innerHTML = '';

    if (typeof QRCode !== 'undefined') {
        try {
            qrCodeGeneratorInstance = new QRCode(container, {
                text: sanitizedUrl,
                width: 220,
                height: 220,
                colorDark: '#0b1528',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            return;
        } catch (e) {
            console.error('QRCode generation error:', e);
        }
    }

    // Graceful fallback to static pre-rendered image if QRCode library not loaded
    const fallbackImg = document.createElement('img');
    fallbackImg.src = 'assets/images/spacepulse_qr.png';
    fallbackImg.alt = 'SpacePulse QR Code';
    fallbackImg.style.width = '220px';
    fallbackImg.style.height = '220px';
    fallbackImg.style.borderRadius = '8px';
    container.appendChild(fallbackImg);
}

function copyQrUrl() {
    const input = document.getElementById('qr-url-input');
    const url = input ? input.value.trim() : SPACEPULSE_PRODUCTION_URL;

    navigator.clipboard.writeText(url).then(() => {
        const copyBtn = document.getElementById('qr-copy-btn');
        const copyText = document.getElementById('qr-copy-text');
        const copyIcon = document.getElementById('qr-copy-icon');

        if (copyBtn) copyBtn.classList.add('copied');
        if (copyText) copyText.textContent = 'Copied!';
        if (copyIcon) copyIcon.className = 'fas fa-check';

        showToast('Link copied to clipboard! 📋');

        setTimeout(() => {
            if (copyBtn) copyBtn.classList.remove('copied');
            if (copyText) copyText.textContent = 'Copy';
            if (copyIcon) copyIcon.className = 'fas fa-copy';
        }, 2000);
    }).catch(() => {
        showToast('Could not copy link. Please copy manually.');
    });
}

function downloadQrImage() {
    const target = document.getElementById('qr-code-target');
    const sourceCanvas = target ? target.querySelector('canvas') : null;
    const sourceImg = target ? target.querySelector('img') : null;

    // Build a high-res branded composite canvas (880x880)
    const exportCanvas = document.createElement('canvas');
    const exportSize = 880;
    exportCanvas.width = exportSize;
    exportCanvas.height = exportSize;
    const ctx = exportCanvas.getContext('2d');

    // Fill clean white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportSize, exportSize);

    function triggerDownload(canvas) {
        try {
            const dataUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = 'spacepulse_mobile_qr.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            showToast('SpacePulse QR code downloaded! 📲');
        } catch (e) {
            const a = document.createElement('a');
            a.href = 'assets/images/spacepulse_qr.png';
            a.download = 'spacepulse_qr.png';
            a.click();
            showToast('High-res SpacePulse QR code saved! 📲');
        }
    }

    const drawCenterLogoAndFinish = () => {
        const badgeSize = Math.floor(exportSize * 0.22);
        const badgeX = (exportSize - badgeSize) / 2;
        const badgeY = (exportSize - badgeSize) / 2;
        const radius = Math.floor(badgeSize * 0.24);

        // White badge backing with dark navy border
        ctx.save();
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, radius);
        } else {
            ctx.rect(badgeX, badgeY, badgeSize, badgeSize);
        }
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#0b1528';
        ctx.stroke();
        ctx.restore();

        // Load SpacePulse logo
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        logo.onload = () => {
            const pad = Math.floor(badgeSize * 0.12);
            const logoSize = badgeSize - pad * 2;
            ctx.save();
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(badgeX + pad, badgeY + pad, logoSize, logoSize, Math.floor(radius * 0.8));
            } else {
                ctx.rect(badgeX + pad, badgeY + pad, logoSize, logoSize);
            }
            ctx.clip();
            ctx.drawImage(logo, badgeX + pad, badgeY + pad, logoSize, logoSize);
            ctx.restore();
            triggerDownload(exportCanvas);
        };
        logo.onerror = () => {
            ctx.fillStyle = '#881337';
            ctx.font = 'bold 70px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('S', exportSize / 2, exportSize / 2);
            triggerDownload(exportCanvas);
        };
        logo.src = 'assets/images/app_icon.png';
    };

    if (sourceCanvas) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sourceCanvas, 40, 40, exportSize - 80, exportSize - 80);
        drawCenterLogoAndFinish();
    } else if (sourceImg && sourceImg.src) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            ctx.drawImage(img, 40, 40, exportSize - 80, exportSize - 80);
            drawCenterLogoAndFinish();
        };
        img.onerror = () => {
            window.open('assets/images/spacepulse_qr.png', '_blank');
        };
        img.src = sourceImg.src;
    } else {
        window.open('assets/images/spacepulse_qr.png', '_blank');
    }
}

function printQrCard() {
    const input = document.getElementById('qr-url-input');
    const url = input ? input.value.trim() : SPACEPULSE_PRODUCTION_URL;
    const target = document.getElementById('qr-code-target');
    const canvas = target ? target.querySelector('canvas') : null;
    const imgSrc = canvas ? canvas.toDataURL('image/png') : 'assets/images/spacepulse_qr.png';

    const printWin = window.open('', '_blank', 'width=750,height=900');
    if (!printWin) {
        showToast('Please allow popups to print poster card.');
        return;
    }

    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>SpacePulse Noticeboard Poster - University of Moratuwa</title>
            <style>
                @page { size: A4 portrait; margin: 20mm; }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    background: #f8fafc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    color: #0f172a;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .poster-card {
                    background: #ffffff;
                    border: 3px solid #00008b;
                    border-radius: 28px;
                    padding: 44px 36px;
                    max-width: 540px;
                    width: 100%;
                    box-sizing: border-box;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                }
                .uom-crest {
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #881337;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                }
                h1 {
                    margin: 0 0 6px 0;
                    font-size: 34px;
                    color: #00008b;
                    font-weight: 800;
                }
                .tagline {
                    font-size: 15px;
                    color: #475569;
                    margin: 0 0 26px 0;
                }
                .qr-frame {
                    background: #ffffff;
                    border: 2px dashed #00008b;
                    border-radius: 20px;
                    padding: 24px;
                    display: inline-block;
                    margin: 0 auto 24px auto;
                }
                .qr-frame img {
                    width: 260px;
                    height: 260px;
                    display: block;
                }
                .scan-prompt {
                    background: #f1f5f9;
                    border-radius: 12px;
                    padding: 14px 18px;
                    font-size: 15px;
                    font-weight: 600;
                    color: #0f172a;
                    margin-bottom: 22px;
                }
                .feature-pills {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-bottom: 26px;
                }
                .pill {
                    background: #e0f2fe;
                    color: #0369a1;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 700;
                }
                .dest-link {
                    font-size: 12px;
                    color: #64748b;
                    word-break: break-all;
                    font-family: monospace;
                    margin-top: 10px;
                }
                .footer {
                    border-top: 1px solid #e2e8f0;
                    padding-top: 18px;
                    font-size: 12px;
                    color: #94a3b8;
                    display: flex;
                    justify-content: space-between;
                }
            </style>
        </head>
        <body>
            <div class="poster-card">
                <div class="uom-crest">University of Moratuwa</div>
                <h1>SpacePulse</h1>
                <p class="tagline">Live Vacancy Tracking & University Navigation</p>
                <div class="qr-frame">
                    <img src="${imgSrc}" alt="SpacePulse QR">
                </div>
                <div class="scan-prompt">
                    📱 Point your phone camera at this QR code to open SpacePulse instantly
                </div>
                <div class="feature-pills">
                    <span class="pill">📚 Library Seats</span>
                    <span class="pill">🍽️ Canteen Queues</span>
                    <span class="pill">🏧 ATM Status</span>
                    <span class="pill">🗺️ GPS Campus Map</span>
                </div>
                <div class="dest-link">${url}</div>
                <div class="footer">
                    <span>Designed for UoM Undergraduates</span>
                    <span>Team NodeX Telemetry</span>
                </div>
            </div>
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 400);
                };
            <\/script>
        </body>
        </html>
    `);
    printWin.document.close();
}

// ==========================================================================
// Initialization
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initChatbot();
    initAlerts();
    initSimulationEngine();
    updateStudentHeaderElements();
    updateReservationBanner();
    navigateTo('home');
    checkInitialDeepLink();
    initBackendSync();
});

// ==========================================================================
// 10. SpacePulse Live Telemetry & Kiosk (Page 11)
// ==========================================================================

function toggleKioskMode() {
    if (AppState.currentTab === 'kiosk') {
        navigateTo('home');
    } else {
        navigateTo('kiosk');
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}

function updateDebounceSlider(val) {
    const num = parseFloat(val);
    AppState.kioskState.debounceSec = num;
    const disp = document.getElementById('debounce-val-display');
    if (disp) disp.textContent = `${num.toFixed(1)}s`;
    saveHysteresisToBackend();
}

function updateGraceSlider(val) {
    const num = parseFloat(val);
    AppState.kioskState.graceSec = num;
    const disp = document.getElementById('grace-val-display');
    if (disp) disp.textContent = `${num.toFixed(1)}s`;
    saveHysteresisToBackend();
}

function applyKioskPreset(preset) {
    AppState.kioskState.activePreset = preset;
    if (preset === 'showcase') {
        AppState.kioskState.debounceSec = 3.0;
        AppState.kioskState.graceSec = 4.0;
    } else if (preset === 'library') {
        AppState.kioskState.debounceSec = 1.5;
        AppState.kioskState.graceSec = 8.0;
    } else if (preset === 'break') {
        AppState.kioskState.debounceSec = 3.0;
        AppState.kioskState.graceSec = 15.0;
    } else if (preset === 'jitter') {
        AppState.kioskState.debounceSec = 0.1;
        AppState.kioskState.graceSec = 0.1;
    }

    const dDisp = document.getElementById('debounce-val-display');
    const gDisp = document.getElementById('grace-val-display');
    if (dDisp) dDisp.textContent = `${AppState.kioskState.debounceSec.toFixed(1)}s`;
    if (gDisp) gDisp.textContent = `${AppState.kioskState.graceSec.toFixed(1)}s`;

    document.querySelectorAll('.preset-pill').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(preset));
    });

    saveHysteresisToBackend();
    showToast(`Preset "${preset}" applied to telemetry engine.`);
}

function saveHysteresisToBackend() {
    fetch('http://127.0.0.1:8000/api/hysteresis/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            occupy_debounce_sec: AppState.kioskState.debounceSec,
            release_hysteresis_sec: AppState.kioskState.graceSec
        })
    }).catch(() => {});
}

function triggerKioskSimEvent(eventType, zoneId = 'S-01') {
    fetch('http://127.0.0.1:8000/api/simulate/camera_event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            zone_id: zoneId,
            event_type: eventType
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.status === 'ok') {
            fetchKioskStats();
            showToast(`Event [${eventType}] triggered on ${zoneId}`);
        }
    })
    .catch(() => {
        // Fallback local toggle
        const z = AppState.kioskState.zones.find(item => item.id === zoneId);
        if (z) {
            z.status = (eventType === 'sit' || z.status === 'free') ? 'occupied' : 'free';
            updateKioskUIElements();
        }
    });
}

function fetchKioskStats() {
    fetch('http://127.0.0.1:8000/api/telemetry/stats')
        .then(r => r.json())
        .then(data => {
            AppState.kioskState.availableSeats = data.available_seats ?? 19;
            AppState.kioskState.occupiedSeats = data.occupied_seats ?? 0;
            AppState.kioskState.jitterRejections = data.jitter_rejections ?? 0;
            AppState.kioskState.pollIntervalMs = 4;
            if (data.zones && Array.isArray(data.zones)) {
                AppState.kioskState.zones = data.zones;
            }
            updateKioskUIElements();
        })
        .catch(() => {});
}

function updateKioskUIElements() {
    const k = AppState.kioskState;
    const availEl = document.getElementById('kiosk-avail-stat');
    const occEl = document.getElementById('kiosk-occ-stat');
    const jitterEl = document.getElementById('kiosk-jitter-stat');
    const pollEl = document.getElementById('kiosk-poll-stat');

    if (availEl) availEl.textContent = k.availableSeats;
    if (occEl) occEl.textContent = k.occupiedSeats;
    if (jitterEl) jitterEl.textContent = k.jitterRejections;
    if (pollEl) pollEl.textContent = `${k.pollIntervalMs} ms`;

    k.zones.forEach(z => {
        const card = document.getElementById(`kiosk-card-${z.id}`);
        if (card) {
            card.className = `kiosk-seat-card ${z.status}`;
            const statusText = card.querySelector('.kiosk-seat-status');
            if (statusText) {
                statusText.textContent = z.status === 'free' ? 'FREE SEAT' : (z.status === 'holding' ? 'HOLDING' : 'OCCUPIED');
            }
        }
        // Update spatial view nodes if matching
        const spNode = document.getElementById(`spatial-${z.id.toLowerCase()}`);
        if (spNode) {
            spNode.className = `seat-node ${z.status}`;
            const circle = spNode.querySelector('.seat-circle');
            if (circle) {
                circle.setAttribute('fill', z.status === 'free' ? '#10b981' : (z.status === 'holding' ? '#f59e0b' : '#ef4444'));
            }
        }
    });
}

function resetSpatialView() {
    AppState.kioskState.zones.forEach(z => z.status = 'free');
    AppState.kioskState.availableSeats = 19;
    AppState.kioskState.occupiedSeats = 0;
    updateKioskUIElements();
    showToast('Spatial architectural view reset.');
}

function renderKiosk() {
    pageTitle.textContent = 'SpacePulse Live Telemetry & Kiosk';
    pageSubtitle.textContent = 'University of Moratuwa • Full NodeX Project Showcase';

    const k = AppState.kioskState;
    const nowTime = new Date().toLocaleTimeString();

    let html = `
        <div class="kiosk-page-view">
            <!-- Kiosk Header Bar Matching Page 11 -->
            <div class="kiosk-header-bar">
                <div class="kiosk-header-left">
                    <h1><i class="fas fa-desktop" style="color: #38bdf8;"></i> SpacePulse Live Telemetry & Kiosk</h1>
                    <p>University of Moratuwa • Full NodeX Project Showcase</p>
                </div>
                <div class="kiosk-header-actions">
                    <button class="kiosk-btn" onclick="showToast('Showcase demonstration mode active.')"><i class="fas fa-flask"></i> Showcase Lab Controls</button>
                    <button class="kiosk-btn" onclick="toggleFullscreen()"><i class="fas fa-expand"></i> Fullscreen</button>
                    <div class="kiosk-status-badge">
                        <span class="live-dot-beacon"></span> BACKEND CONNECTED (1000ms POLL)
                    </div>
                    <div class="kiosk-clock" id="kiosk-clock">${nowTime}</div>
                </div>
            </div>

            <!-- Temporal Hysteresis & Demonstration Controls Box -->
            <div class="kiosk-controls-box">
                <div class="kiosk-controls-title">
                    <span><i class="fas fa-sliders"></i> Temporal Hysteresis & Live Demonstration Controls</span>
                    <span class="kiosk-controls-endpoint">API: //localhost/config & /api/telemetry | Target: Seat S-1</span>
                </div>

                <div class="kiosk-sliders-row">
                    <div class="kiosk-slider-group">
                        <div class="kiosk-slider-label">
                            <span>Occupancy Confirm (10t Debounce):</span>
                            <strong id="debounce-val-display">${k.debounceSec.toFixed(1)}s</strong>
                        </div>
                        <input type="range" class="kiosk-range-input" min="0.1" max="5.0" step="0.1" 
                               value="${k.debounceSec}" oninput="updateDebounceSlider(this.value)">
                    </div>

                    <div class="kiosk-slider-group">
                        <div class="kiosk-slider-label">
                            <span>Vacant Confirm (Library Grace):</span>
                            <strong id="grace-val-display">${k.graceSec.toFixed(1)}s</strong>
                        </div>
                        <input type="range" class="kiosk-range-input" min="0.5" max="15.0" step="0.5" 
                               value="${k.graceSec}" oninput="updateGraceSlider(this.value)">
                    </div>
                </div>

                <div class="kiosk-buttons-row">
                    <div class="kiosk-presets-group">
                        <span class="kiosk-group-label">Application Presets:</span>
                        <button class="preset-pill ${k.activePreset === 'showcase' ? 'active' : ''}" onclick="applyKioskPreset('showcase')">Live Showcase (3s/4s)</button>
                        <button class="preset-pill ${k.activePreset === 'library' ? 'active' : ''}" onclick="applyKioskPreset('library')">Library Hall (1.5s/8s)</button>
                        <button class="preset-pill ${k.activePreset === 'break' ? 'active' : ''}" onclick="applyKioskPreset('break')">Break Grace (3s/15s)</button>
                        <button class="preset-pill ${k.activePreset === 'jitter' ? 'active' : ''}" onclick="applyKioskPreset('jitter')">Raw Jitter (0.1s)</button>
                    </div>

                    <div class="kiosk-simulate-group">
                        <span class="kiosk-group-label"><i class="fas fa-video"></i> Simulate Live Camera Events:</span>
                        <button class="simulate-btn" onclick="triggerKioskSimEvent('sit', 'S-01')"><i class="fas fa-user"></i> Sit in Seat 1</button>
                        <button class="simulate-btn" onclick="triggerKioskSimEvent('leave_belongings', 'S-01')"><i class="fas fa-laptop"></i> Leave Laptop (S-1)</button>
                        <button class="simulate-btn" onclick="triggerKioskSimEvent('vacate', 'S-01')"><i class="fas fa-person-walking-arrow-right"></i> Vacate Seat 1</button>
                        <button class="simulate-btn" onclick="triggerKioskSimEvent('jitter', 'S-01')"><i class="fas fa-bolt"></i> Inject 30s Jitter</button>
                    </div>
                </div>
            </div>

            <!-- 4 Telemetry Stats Cards -->
            <div class="kiosk-stats-grid">
                <div class="kiosk-stat-card">
                    <div class="kiosk-stat-icon green"><i class="fas fa-chair"></i></div>
                    <div class="kiosk-stat-val green" id="kiosk-avail-stat">${k.availableSeats}</div>
                    <div class="kiosk-stat-label">AVAILABLE STUDY SEATS</div>
                </div>
                <div class="kiosk-stat-card">
                    <div class="kiosk-stat-icon red"><i class="fas fa-user-lock"></i></div>
                    <div class="kiosk-stat-val amber" id="kiosk-occ-stat">${k.occupiedSeats}</div>
                    <div class="kiosk-stat-label">OCCUPIED SEATS</div>
                </div>
                <div class="kiosk-stat-card">
                    <div class="kiosk-stat-icon purple"><i class="fas fa-shield-virus"></i></div>
                    <div class="kiosk-stat-val purple" id="kiosk-jitter-stat">${k.jitterRejections}</div>
                    <div class="kiosk-stat-label">SENSOR JITTER REJECTIONS</div>
                </div>
                <div class="kiosk-stat-card">
                    <div class="kiosk-stat-icon pink"><i class="fas fa-clock-rotate-left"></i></div>
                    <div class="kiosk-stat-val pink" id="kiosk-poll-stat">${k.pollIntervalMs} ms</div>
                    <div class="kiosk-stat-label">TELEMETRY POLL INTERVAL (1000MS)</div>
                </div>
            </div>

            <!-- Split View: Live Seat Monitor Zones vs Spatial Architectural View -->
            <div class="kiosk-split-view">
                <!-- Left Panel: 19 Zones -->
                <div class="kiosk-panel-box">
                    <div class="kiosk-panel-header">
                        <span><i class="fas fa-table-cells"></i> Live Seat Monitor Zones</span>
                        <span style="color: #64748b; font-size: 11px;">19 Zones Active</span>
                    </div>
                    <div class="kiosk-zones-grid" id="kiosk-zones-container">
                        ${k.zones.map(z => `
                            <div class="kiosk-seat-card ${z.status}" id="kiosk-card-${z.id}" onclick="triggerKioskSimEvent('toggle', '${z.id}')">
                                <i class="fas fa-chair kiosk-seat-icon"></i>
                                <span class="kiosk-seat-name">${z.name}</span>
                                <span class="kiosk-seat-status">${z.status === 'free' ? 'FREE SEAT' : (z.status === 'holding' ? 'HOLDING' : 'OCCUPIED')}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Right Panel: Spatial Architectural View -->
                <div class="kiosk-panel-box">
                    <div class="kiosk-panel-header">
                        <span><i class="fas fa-compass-drafting"></i> Spatial Architectural View</span>
                        <div style="display: flex; gap: 6px;">
                            <button class="kiosk-btn" style="padding: 3px 8px; font-size: 10px;">Camera Zone A & B</button>
                            <button class="kiosk-btn" style="padding: 3px 8px; font-size: 10px;" onclick="resetSpatialView()"><i class="fas fa-rotate"></i> Reset</button>
                        </div>
                    </div>
                    <div style="background: #08111e; border: 1px solid #1e293b; border-radius: 8px; padding: 14px; min-height: 380px; display: flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 540 340" style="width: 100%; height: auto;" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="520" height="320" rx="10" fill="#0c1626" stroke="#1e3a5f" stroke-width="1.5"/>

                            <!-- Camera Monitored Zone -->
                            <rect x="30" y="30" width="220" height="190" rx="8" fill="#112035" stroke="#2563eb" stroke-dasharray="4 3"/>
                            <text x="140" y="50" fill="#60a5fa" font-size="8.5" font-weight="700" text-anchor="middle">CAMERA-MONITORED ZONE</text>
                            
                            <!-- Table 01 with S-1 and S-2 -->
                            <rect x="70" y="80" width="140" height="85" rx="6" fill="#1e293b" stroke="#334155"/>
                            <text x="140" y="125" fill="#94a3b8" font-size="8" font-weight="700" text-anchor="middle">TABLE 01</text>
                            
                            <g class="seat-node ${k.zones.find(z => z.id === 'S-01')?.status || 'free'}" id="spatial-s-01" transform="translate(100, 105)" onclick="triggerKioskSimEvent('toggle', 'S-01')">
                                <circle class="seat-circle" cx="0" cy="0" r="14" fill="#10b981"/>
                                <text class="seat-node-text" x="0" y="0" font-size="8">S-1</text>
                            </g>
                            <g class="seat-node ${k.zones.find(z => z.id === 'S-02')?.status || 'free'}" id="spatial-s-02" transform="translate(180, 105)" onclick="triggerKioskSimEvent('toggle', 'S-02')">
                                <circle class="seat-circle" cx="0" cy="0" r="14" fill="#10b981"/>
                                <text class="seat-node-text" x="0" y="0" font-size="8">S-2</text>
                            </g>

                            <!-- Quiet Study Stacks Zone -->
                            <rect x="270" y="30" width="240" height="190" rx="8" fill="#112035" stroke="#38bdf8" stroke-dasharray="4 3"/>
                            <text x="390" y="50" fill="#38bdf8" font-size="8.5" font-weight="700" text-anchor="middle">QUIET STUDY STACKS</text>
                            
                            <!-- Table 02 with S-3 and S-4 -->
                            <rect x="320" y="80" width="140" height="85" rx="6" fill="#1e293b" stroke="#334155"/>
                            <text x="390" y="125" fill="#94a3b8" font-size="8" font-weight="700" text-anchor="middle">TABLE 02</text>
                            
                            <g class="seat-node ${k.zones.find(z => z.id === 'S-03')?.status || 'free'}" id="spatial-s-03" transform="translate(350, 105)" onclick="triggerKioskSimEvent('toggle', 'S-03')">
                                <circle class="seat-circle" cx="0" cy="0" r="14" fill="#10b981"/>
                                <text class="seat-node-text" x="0" y="0" font-size="8">S-3</text>
                            </g>
                            <g class="seat-node ${k.zones.find(z => z.id === 'S-04')?.status || 'free'}" id="spatial-s-04" transform="translate(430, 105)" onclick="triggerKioskSimEvent('toggle', 'S-04')">
                                <circle class="seat-circle" cx="0" cy="0" r="14" fill="#10b981"/>
                                <text class="seat-node-text" x="0" y="0" font-size="8">S-4</text>
                            </g>

                            <!-- Bottom Stacks Seats Row -->
                            <g transform="translate(330, 200)">
                                <circle cx="20" cy="0" r="10" fill="#10b981"/>
                                <circle cx="50" cy="0" r="10" fill="#10b981"/>
                                <circle cx="80" cy="0" r="10" fill="#10b981"/>
                                <circle cx="110" cy="0" r="10" fill="#10b981"/>
                            </g>

                            <!-- Circulation & Help Desk -->
                            <rect x="70" y="240" width="160" height="50" rx="6" fill="#1a2538" stroke="#475569"/>
                            <text x="150" y="270" fill="#cbd5e1" font-size="9" font-weight="700" text-anchor="middle">Circulation & Help Desk</text>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Kiosk Footer Strip -->
            <div class="kiosk-footer-strip">
                <div>Team NodeX (4 Members): Dilusha • Supun • Dineth • Kavindu</div>
                <div><a href="http://127.0.0.1:8000/docs" target="_blank"><i class="fas fa-bolt"></i> SpacePulse v2.0 • FastAPI Swagger API Docs</a></div>
            </div>
        </div>
    `;

    contentArea.innerHTML = html;

    if (!AppState.kioskClockInterval) {
        AppState.kioskClockInterval = setInterval(() => {
            const clockEl = document.getElementById('kiosk-clock');
            if (clockEl) clockEl.textContent = new Date().toLocaleTimeString();
        }, 1000);
    }

    fetchKioskStats();
    if (!AppState.kioskPollInterval) {
        AppState.kioskPollInterval = setInterval(fetchKioskStats, 1000);
    }
}

// ==========================================================================
// 11. Backend Live Synchronization & WebSocket Streaming
// ==========================================================================

let occupancyWs = null;

function initBackendSync() {
    // 1. Initial REST Fetch for Occupancy
    fetch('http://127.0.0.1:8000/api/occupancy')
        .then(r => r.json())
        .then(data => {
            if (data.floors && Array.isArray(data.floors)) {
                data.floors.forEach(f => {
                    const match = spacePulseData.libraryFloors.find(lf => lf.id === f.id);
                    if (match) {
                        match.availableSeats = f.availableSeats;
                        match.totalSeats = f.totalSeats;
                    }
                });
                if (AppState.currentTab === 'home') renderHome();
                else if (AppState.currentTab === 'library') renderLibrary();
                else if (AppState.currentTab === 'maps' && AppState.mapsSubTab === 'floorplans') renderMaps();
            }
        })
        .catch(() => {});

    // 2. Poll Occupancy every 1500ms
    setInterval(() => {
        fetch('http://127.0.0.1:8000/api/occupancy')
            .then(r => r.json())
            .then(data => {
                if (data.floors && Array.isArray(data.floors)) {
                    data.floors.forEach(f => {
                        const match = spacePulseData.libraryFloors.find(lf => lf.id === f.id);
                        if (match) {
                            match.availableSeats = f.availableSeats;
                        }
                    });
                }
            })
            .catch(() => {});
    }, 1500);

    // 3. Connect Live WebSocket
    try {
        occupancyWs = new WebSocket('ws://127.0.0.1:8000/ws/occupancy');
        occupancyWs.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);
                if (msg.type === 'occupancy_update' || msg.floors) {
                    if (msg.floors) {
                        msg.floors.forEach(f => {
                            const match = spacePulseData.libraryFloors.find(lf => lf.id === f.id);
                            if (match) match.availableSeats = f.availableSeats;
                        });
                    }
                    if (AppState.currentTab === 'kiosk') fetchKioskStats();
                }
            } catch (e) {}
        };
        occupancyWs.onerror = () => {};
    } catch (e) {}
}
