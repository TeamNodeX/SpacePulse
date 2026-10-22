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
            id: 'floor_2_down',
            floor: 'Second Down Floor',
            totalSeats: 100,
            availableSeats: 45,
            hasPowerOutlets: true,
            isQuietZone: true,
            highSpeedWifi: true,
            landmark: 'Lower Quiet Reading Stacks',
            image: 'assets/images/library.jpg'
        },
        {
            id: 'floor_1_down',
            floor: 'First Down Floor',
            totalSeats: 150,
            availableSeats: 10,
            hasPowerOutlets: true,
            isQuietZone: true,
            highSpeedWifi: true,
            landmark: 'Periodicals & Archive Wing',
            image: 'assets/images/library.jpg'
        },
        {
            id: 'floor_ground',
            floor: 'Ground Floor',
            totalSeats: 200,
            availableSeats: 120,
            hasPowerOutlets: true,
            isQuietZone: false,
            highSpeedWifi: true,
            landmark: 'Central Circulation Desk & Study Commons',
            image: 'assets/images/library.jpg'
        },
        {
            id: 'floor_1',
            floor: 'First Floor',
            totalSeats: 120,
            availableSeats: 5,
            hasPowerOutlets: true,
            isQuietZone: false,
            highSpeedWifi: true,
            landmark: 'Group Discussions & Tech Labs',
            image: 'assets/images/library.jpg'
        }
    ],

    canteens: [
        {
            id: 'canteen_goda_uda',
            name: 'Goda Uda',
            status: 'Open',
            personCount: 45,
            maxCapacity: 100,
            location: 'Upper Academic Complex',
            specialties: 'Sri Lankan Buffet, Fresh Juices, Shorties',
            image: 'assets/images/canteen.jpg'
        },
        {
            id: 'canteen_goda_yata',
            name: 'Goda Yata',
            status: 'Open',
            personCount: 85,
            maxCapacity: 120,
            location: 'Ground Level Academic Complex',
            specialties: 'Fried Rice, Kottu, Tea & Snacks',
            image: 'assets/images/canteen.jpg'
        },
        {
            id: 'canteen_wala',
            name: 'Wala Canteen',
            status: 'Closed',
            personCount: 0,
            maxCapacity: 150,
            location: 'Wala Open Amphitheater Area',
            specialties: 'Breakfast & Lunch Packets',
            image: 'assets/images/canteen.jpg'
        },
        {
            id: 'canteen_l',
            name: 'L Canteen',
            status: 'Open',
            personCount: 120,
            maxCapacity: 200,
            location: 'Sentra Court Area',
            specialties: 'Bakery Items, Coffee, Full Meals',
            image: 'assets/images/canteen.jpg'
        },
        {
            id: 'canteen_civil',
            name: 'Civil Canteen',
            status: 'Open',
            personCount: 30,
            maxCapacity: 80,
            location: 'Civil Engineering Complex',
            specialties: 'Quick Snacks, Rice & Curry, Cold Drinks',
            image: 'assets/images/canteen.jpg'
        }
    ],

    atms: [
        {
            id: 'atm_boc',
            name: 'BOC ATM',
            bankName: 'Bank of Ceylon',
            status: 'Working',
            queueLength: 5,
            location: 'Main Administrative Building Entrance',
            hasCash: true,
            image: 'assets/images/atm.jpg'
        },
        {
            id: 'atm_peoples',
            name: 'Peoples Bank ATM',
            bankName: "People's Bank",
            status: 'Working',
            queueLength: 2,
            location: 'Near University Main Canteen Complex',
            hasCash: true,
            image: 'assets/images/atm.jpg'
        },
        {
            id: 'atm_commercial',
            name: 'Commercial Bank ATM',
            bankName: 'Commercial Bank',
            status: 'Out of Order',
            queueLength: 0,
            location: 'Engineering Faculty Entrance',
            hasCash: false,
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
        { id: 'gate_katubedda', name: 'Katubedda Main Entrance Gate', y: 317, x: 2200 },
        { id: 'dept_arch', name: 'Architecture Building (My Location)', y: 1967, x: 3500 },
        { id: 'bldg_sumanadasa', name: 'Sumanadasa Building', y: 1717, x: 2050 },
        { id: 'floor_ground', name: 'Central Library Plaza', y: 1667, x: 3680 },
        { id: 'dept_it', name: 'Faculty of IT (Phase I & II)', y: 3017, x: 3300 },
        { id: 'canteen_l', name: 'L-Block & Sentra Court', y: 2817, x: 2650 },
        { id: 'facility_gym', name: 'Gymnasium & Sports Ground', y: 2317, x: 1850 },
        { id: 'atm_boc', name: 'Main Administration Building', y: 1267, x: 3350 }
    ],

    // 2D Floor Plan Seats Layout Coordinates (per floor)
    seatsByFloor: {
        floor_2_down: [
            { id: 's_2d_01', seatNumber: 'S-01', x: 70, y: 70, status: 'free', section: 'Silent Study Carrels', powerOutlet: true },
            { id: 's_2d_02', seatNumber: 'S-02', x: 130, y: 70, status: 'occupied', section: 'Silent Study Carrels', powerOutlet: true },
            { id: 's_2d_03', seatNumber: 'S-03', x: 190, y: 70, status: 'free', section: 'Silent Study Carrels', powerOutlet: true },
            { id: 's_2d_04', seatNumber: 'S-04', x: 70, y: 130, status: 'free', section: 'Silent Study Carrels', powerOutlet: true },
            { id: 's_2d_05', seatNumber: 'S-05', x: 130, y: 130, status: 'free', section: 'Silent Study Carrels', powerOutlet: true },
            { id: 's_2d_06', seatNumber: 'S-06', x: 190, y: 130, status: 'occupied', section: 'Silent Study Carrels', powerOutlet: false },
            { id: 's_2d_07', seatNumber: 'W-01', x: 340, y: 70, status: 'free', section: 'Window View Desks', powerOutlet: true },
            { id: 's_2d_08', seatNumber: 'W-02', x: 400, y: 70, status: 'free', section: 'Window View Desks', powerOutlet: true },
            { id: 's_2d_09', seatNumber: 'W-03', x: 460, y: 70, status: 'occupied', section: 'Window View Desks', powerOutlet: true },
            { id: 's_2d_10', seatNumber: 'W-04', x: 520, y: 70, status: 'free', section: 'Window View Desks', powerOutlet: false },
            { id: 's_2d_11', seatNumber: 'T-01', x: 340, y: 190, status: 'free', section: 'Individual Pods', powerOutlet: true },
            { id: 's_2d_12', seatNumber: 'T-02', x: 400, y: 190, status: 'free', section: 'Individual Pods', powerOutlet: true },
            { id: 's_2d_13', seatNumber: 'T-03', x: 460, y: 190, status: 'occupied', section: 'Individual Pods', powerOutlet: true },
            { id: 's_2d_14', seatNumber: 'T-04', x: 520, y: 190, status: 'free', section: 'Individual Pods', powerOutlet: false },
            { id: 's_2d_15', seatNumber: 'C-01', x: 70, y: 240, status: 'free', section: 'Reading Room Alcove', powerOutlet: true },
            { id: 's_2d_16', seatNumber: 'C-02', x: 130, y: 240, status: 'free', section: 'Reading Room Alcove', powerOutlet: true },
            { id: 's_2d_17', seatNumber: 'C-03', x: 190, y: 240, status: 'free', section: 'Reading Room Alcove', powerOutlet: true }
        ],
        floor_1_down: [
            { id: 's_1d_01', seatNumber: 'A-01', x: 80, y: 80, status: 'occupied', section: 'Periodical Carrels', powerOutlet: true },
            { id: 's_1d_02', seatNumber: 'A-02', x: 140, y: 80, status: 'occupied', section: 'Periodical Carrels', powerOutlet: true },
            { id: 's_1d_03', seatNumber: 'A-03', x: 200, y: 80, status: 'occupied', section: 'Periodical Carrels', powerOutlet: true },
            { id: 's_1d_04', seatNumber: 'A-04', x: 80, y: 140, status: 'occupied', section: 'Periodical Carrels', powerOutlet: false },
            { id: 's_1d_05', seatNumber: 'A-05', x: 140, y: 140, status: 'occupied', section: 'Periodical Carrels', powerOutlet: false },
            { id: 's_1d_06', seatNumber: 'A-06', x: 200, y: 140, status: 'free', section: 'Periodical Carrels', powerOutlet: true },
            { id: 's_1d_07', seatNumber: 'B-01', x: 350, y: 80, status: 'occupied', section: 'Research Desks', powerOutlet: true },
            { id: 's_1d_08', seatNumber: 'B-02', x: 410, y: 80, status: 'free', section: 'Research Desks', powerOutlet: true },
            { id: 's_1d_09', seatNumber: 'B-03', x: 470, y: 80, status: 'occupied', section: 'Research Desks', powerOutlet: false }
        ],
        floor_ground: [
            { id: 's_g_01', seatNumber: 'G-01', x: 80, y: 70, status: 'free', section: 'Study Commons Central', powerOutlet: true },
            { id: 's_g_02', seatNumber: 'G-02', x: 140, y: 70, status: 'free', section: 'Study Commons Central', powerOutlet: true },
            { id: 's_g_03', seatNumber: 'G-03', x: 200, y: 70, status: 'free', section: 'Study Commons Central', powerOutlet: true },
            { id: 's_g_04', seatNumber: 'G-04', x: 80, y: 130, status: 'free', section: 'Study Commons Central', powerOutlet: true },
            { id: 's_g_05', seatNumber: 'G-05', x: 140, y: 130, status: 'free', section: 'Study Commons Central', powerOutlet: true },
            { id: 's_g_06', seatNumber: 'G-06', x: 200, y: 130, status: 'occupied', section: 'Study Commons Central', powerOutlet: false },
            { id: 's_g_07', seatNumber: 'D-01', x: 350, y: 70, status: 'free', section: 'Discussion Pods', powerOutlet: true },
            { id: 's_g_08', seatNumber: 'D-02', x: 410, y: 70, status: 'free', section: 'Discussion Pods', powerOutlet: true },
            { id: 's_g_09', seatNumber: 'D-03', x: 470, y: 70, status: 'free', section: 'Discussion Pods', powerOutlet: true },
            { id: 's_g_10', seatNumber: 'D-04', x: 530, y: 70, status: 'occupied', section: 'Discussion Pods', powerOutlet: false },
            { id: 's_g_11', seatNumber: 'PC-01', x: 350, y: 190, status: 'free', section: 'Computer Terminals', powerOutlet: true },
            { id: 's_g_12', seatNumber: 'PC-02', x: 410, y: 190, status: 'free', section: 'Computer Terminals', powerOutlet: true },
            { id: 's_g_13', seatNumber: 'PC-03', x: 470, y: 190, status: 'occupied', section: 'Computer Terminals', powerOutlet: true }
        ],
        floor_1: [
            { id: 's_1f_01', seatNumber: 'F1-01', x: 90, y: 80, status: 'occupied', section: 'Group Tables', powerOutlet: true },
            { id: 's_1f_02', seatNumber: 'F1-02', x: 150, y: 80, status: 'occupied', section: 'Group Tables', powerOutlet: true },
            { id: 's_1f_03', seatNumber: 'F1-03', x: 210, y: 80, status: 'occupied', section: 'Group Tables', powerOutlet: false },
            { id: 's_1f_04', seatNumber: 'F1-04', x: 340, y: 80, status: 'occupied', section: 'Collaboration Lab', powerOutlet: true },
            { id: 's_1f_05', seatNumber: 'F1-05', x: 400, y: 80, status: 'free', section: 'Collaboration Lab', powerOutlet: true }
        ]
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
    mapsSubTab: 'infrastructure', // 'infrastructure', 'osm', or 'floorplans'
    selectedFloorId: 'floor_ground',
    seatFilter: 'all', // 'all', 'free', 'occupied', 'power'
    favorites: JSON.parse(localStorage.getItem('spacepulse_favs') || '["floor_ground", "canteen_goda_uda"]'),
    alerts: JSON.parse(localStorage.getItem('spacepulse_alerts') || '[]'),
    activeReservation: JSON.parse(localStorage.getItem('spacepulse_reservation') || 'null'),
    reservationTimerInterval: null,
    selectedOrigin: 'orig_arch',
    selectedDestination: 'canteen_goda_uda',
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
    selectedBlueprintOrigin: 'gate_katubedda',
    selectedBlueprintDestination: 'floor_ground',
    blueprintMap: null,
    blueprintMarkers: [],
    blueprintRouteLayer: null,
    blueprintZonesLayer: null,
    blueprintImageLayer: null,

    // UoM Student Profile & Authentication
    currentStudent: JSON.parse(localStorage.getItem('spacepulse_student_profile') || 'null'),
    pendingOtpEmail: null,
    pendingOtpCode: null,
    pendingOtpCustomName: null,
    isEnteringOtp: false
};

// Auto-sanitize legacy cached demo profile in localStorage if needed
if (AppState.currentStudent && AppState.currentStudent.email === '210123A@uom.lk') {
    AppState.currentStudent.name = 'Kavindu Dilupa';
    localStorage.setItem('spacepulse_student_profile', JSON.stringify(AppState.currentStudent));
}

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
    let bannersHtml = '';
    if (!student) {
        bannersHtml += `
            <div class="uom-student-banner">
                <div class="uom-banner-left">
                    <div class="uom-banner-icon"><i class="fas fa-graduation-cap"></i></div>
                    <div class="uom-banner-text">
                        <strong>Are you a University of Moratuwa student?</strong>
                        <p>Connect your official @uom.lk student email to unlock 30-minute library seat holds and instant vacancy alerts.</p>
                    </div>
                </div>
                <button class="uom-banner-btn" onclick="openStudentAuthModal()">
                    <i class="fas fa-id-card"></i> Verify Student
                </button>
            </div>
        `;
    }

    bannersHtml += `
        <div class="recommendation-banner">
            <div class="rec-content">
                <span class="rec-tag"><i class="fas fa-sparkles"></i> AI Recommendation</span>
                <h3>Optimal Study Spot: ${stats.bestFloor.floor}</h3>
                <p><strong>${stats.bestFloor.availableSeats} of ${stats.bestFloor.totalSeats} seats free</strong> right now. ${stats.bestFloor.isQuietZone ? '🤫 Silent study zone with high-speed WiFi.' : 'Convenient study floor with power outlets.'}</p>
                <div class="rec-actions" style="margin-top: 14px;">
                    <button class="rec-btn" onclick="navigateTo('maps'); switchFloor('${stats.bestFloor.id}'); switchMapMode('floorplans');">
                        <i class="fas fa-chair"></i> Pick a Seat on 2D Map
                    </button>
                    ${stats.bestCanteen ? `
                    <button class="rec-btn-ghost" onclick="navigateTo('canteen');">
                        <i class="fas fa-utensils"></i> Hungry? Visit ${stats.bestCanteen.name} (${stats.bestCanteen.personCount}/${stats.bestCanteen.maxCapacity} full)
                    </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    return bannersHtml;
}

function renderDefaultHomeSectionsHTML(stats) {
    return `
        <!-- Favorites Carousel Section -->
        ${renderFavoritesSectionHTML()}

        <!-- 4 Hero Facility Navigation Cards -->
        <div class="section-title-wrap">
            <h3><i class="fas fa-compass" style="color: var(--primary-blue);"></i> University Facilities</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="fas fa-rotate"></i> Real-time synced</span>
        </div>

        <div class="hero-facility-grid">
            <div class="hero-facility-card" onclick="navigateTo('library');">
                <img src="assets/images/library.jpg" alt="Library" class="hero-facility-img" onerror="this.src='images.jpeg'">
                <div class="hero-facility-overlay">
                    <div class="hero-card-top">
                        <div class="hero-icon-pill"><i class="fas fa-book-reader"></i></div>
                        <span class="hero-badge green">${stats.availableLibrarySeats} Seats Free</span>
                    </div>
                    <div class="hero-card-bottom">
                        <h3>University Library</h3>
                        <p><i class="fas fa-location-dot"></i> 4 Study Floors • Quiet & Power Outlets</p>
                    </div>
                </div>
            </div>

            <div class="hero-facility-card" onclick="navigateTo('canteen');">
                <img src="assets/images/canteen.jpg" alt="Canteens" class="hero-facility-img" onerror="this.src='images.jpeg'">
                <div class="hero-facility-overlay">
                    <div class="hero-card-top">
                        <div class="hero-icon-pill"><i class="fas fa-utensils"></i></div>
                        <span class="hero-badge green">${stats.openCanteensCount} Open Now</span>
                    </div>
                    <div class="hero-card-bottom">
                        <h3>University Canteens</h3>
                        <p><i class="fas fa-location-dot"></i> Goda Uda, Goda Yata, L & Civil</p>
                    </div>
                </div>
            </div>

            <div class="hero-facility-card" onclick="navigateTo('atm');">
                <img src="assets/images/atm.jpg" alt="ATMs" class="hero-facility-img" onerror="this.src='images.jpeg'">
                <div class="hero-facility-overlay">
                    <div class="hero-card-top">
                        <div class="hero-icon-pill"><i class="fas fa-money-check-dollar"></i></div>
                        <span class="hero-badge amber">${stats.workingAtmsCount} Active ATMs</span>
                    </div>
                    <div class="hero-card-bottom">
                        <h3>University ATMs</h3>
                        <p><i class="fas fa-location-dot"></i> BOC, People's & Commercial Bank</p>
                    </div>
                </div>
            </div>

            <div class="hero-facility-card" onclick="navigateTo('bookshop');">
                <img src="assets/images/bookshop.jpg" alt="Book Shops" class="hero-facility-img" onerror="this.src='images.jpeg'">
                <div class="hero-facility-overlay">
                    <div class="hero-card-top">
                        <div class="hero-icon-pill"><i class="fas fa-book-bookmark"></i></div>
                        <span class="hero-badge purple">${stats.openBookshopsCount} Open</span>
                    </div>
                    <div class="hero-card-bottom">
                        <h3>Book Shops</h3>
                        <p><i class="fas fa-location-dot"></i> Printing, Photocopy, Textbooks</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Telemetry Stats Cards -->
        <div class="section-title-wrap">
            <h3><i class="fas fa-wave-square" style="color: var(--pulse-green);"></i> Real-Time Pulse Overview</h3>
        </div>

        <div class="quick-stats-grid">
            <div class="stat-metric-card" onclick="navigateTo('library');">
                <div class="stat-metric-content">
                    <h4>Total Free Seats</h4>
                    <div class="stat-metric-value">${stats.availableLibrarySeats}</div>
                    <div class="stat-metric-sub">of ${stats.totalLibrarySeats} seats library-wide</div>
                </div>
                <div class="stat-metric-icon green"><i class="fas fa-chair"></i></div>
            </div>

            <div class="stat-metric-card" onclick="navigateTo('atm');">
                <div class="stat-metric-content">
                    <h4>Shortest ATM Line</h4>
                    <div class="stat-metric-value">${stats.shortestAtmQueue} <span style="font-size: 1rem; font-weight: 500;">in queue</span></div>
                    <div class="stat-metric-sub">${stats.shortestAtmName}</div>
                </div>
                <div class="stat-metric-icon amber"><i class="fas fa-users-line"></i></div>
            </div>

            <div class="stat-metric-card" onclick="navigateTo('canteen');">
                <div class="stat-metric-content">
                    <h4>Canteens Serving</h4>
                    <div class="stat-metric-value">${stats.openCanteensCount} / ${stats.totalCanteensCount}</div>
                    <div class="stat-metric-sub">Open for meals & snacks</div>
                </div>
                <div class="stat-metric-icon blue"><i class="fas fa-bowl-rice"></i></div>
            </div>

            <div class="stat-metric-card" onclick="navigateTo('bookshop');">
                <div class="stat-metric-content">
                    <h4>Book Shops Active</h4>
                    <div class="stat-metric-value">${stats.openBookshopsCount}</div>
                    <div class="stat-metric-sub">Photocopying & Stationery</div>
                </div>
                <div class="stat-metric-icon purple"><i class="fas fa-print"></i></div>
            </div>
        </div>
    `;
}

function renderHome() {
    const stats = getStats();
    const isSearching = AppState.searchQuery.trim().length > 0 || AppState.selectedCategory !== 'all';
    const student = AppState.currentStudent;

    if (student) {
        pageTitle.innerHTML = `Welcome back, ${student.name.split(' ')[0]}! 🎓 <span class="status-badge open" style="font-size: 0.72rem; vertical-align: middle; margin-left: 6px;">Verified UoM</span>`;
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

        <!-- Universal Search & Category Filter Section -->
        <div class="search-filter-section">
            <div class="search-input-wrapper">
                <i class="fas fa-magnifying-glass search-icon"></i>
                <input type="text" id="home-search-input" placeholder="Search floors, canteens, ATMs, bookshops, tags ('quiet', 'power', 'kottu')..." value="${AppState.searchQuery}">
                <button class="search-clear-btn" id="home-search-clear" style="display: ${AppState.searchQuery ? 'block' : 'none'};">
                    <i class="fas fa-times-circle"></i>
                </button>
            </div>

            <div class="category-chips-bar">
                <button class="category-chip ${AppState.selectedCategory === 'all' ? 'active' : ''}" data-cat="all">
                    All <span class="chip-count">15</span>
                </button>
                <button class="category-chip ${AppState.selectedCategory === 'library' ? 'active' : ''}" data-cat="library">
                    <i class="fas fa-book-reader"></i> Library Floors <span class="chip-count">4</span>
                </button>
                <button class="category-chip ${AppState.selectedCategory === 'canteen' ? 'active' : ''}" data-cat="canteen">
                    <i class="fas fa-utensils"></i> Canteens <span class="chip-count">5</span>
                </button>
                <button class="category-chip ${AppState.selectedCategory === 'atm' ? 'active' : ''}" data-cat="atm">
                    <i class="fas fa-money-check-dollar"></i> ATMs <span class="chip-count">3</span>
                </button>
                <button class="category-chip ${AppState.selectedCategory === 'bookshop' ? 'active' : ''}" data-cat="bookshop">
                    <i class="fas fa-book"></i> Book Shops <span class="chip-count">3</span>
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
function renderMaps() {
    pageTitle.textContent = 'University & Floor Maps 🗺️';
    pageSubtitle.textContent = 'Official CAD Infrastructure Blueprint & real-time telemetry navigation for University of Moratuwa';

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

    const matchingFloor = spacePulseData.libraryFloors.find(f => f.id === bpDest.id);
    const projectedFree = matchingFloor ? Math.max(0, matchingFloor.availableSeats - Math.floor(bpWalkMins * 1.5)) : null;

    // OSM Travel Calculations (Fallback GIS view)
    const osmOrigin = spacePulseData.originPoints.find(o => o.id === AppState.selectedOrigin) || spacePulseData.originPoints[0];
    const osmDest = spacePulseData.universityGpsNodes.find(n => n.id === AppState.selectedDestination) || spacePulseData.universityGpsNodes[0];
    const osmDistMeters = calculateDistanceMeters(osmOrigin.lat, osmOrigin.lng, osmDest.lat, osmDest.lng);
    const osmWalkMins = Math.max(1, Math.round(osmDistMeters / bpMetersPerMin));

    let html = `
        <div class="maps-hub-container">
            <!-- Map Mode Segmented Bar -->
            <div class="map-segmented-bar" style="max-width: 720px;">
                <button class="map-segment-btn ${AppState.mapsSubTab === 'infrastructure' ? 'active' : ''}" onclick="switchMapMode('infrastructure')">
                    <i class="fas fa-compass-drafting"></i> <span>University Infrastructure Map (CAD)</span> <span class="nav-badge hot">OFFICIAL</span>
                </button>
                <button class="map-segment-btn ${AppState.mapsSubTab === 'osm' ? 'active' : ''}" onclick="switchMapMode('osm')">
                    <i class="fas fa-satellite"></i> <span>Satellite & GIS Basemap</span>
                </button>
                <button class="map-segment-btn ${AppState.mapsSubTab === 'floorplans' ? 'active' : ''}" onclick="switchMapMode('floorplans')">
                    <i class="fas fa-layer-group"></i> <span>Library 2D Floor Plans</span>
                </button>
            </div>

            <!-- 1. Official Infrastructure Blueprint CAD Map Subview (Primary) -->
            <div id="infrastructure-subview" style="display: ${AppState.mapsSubTab === 'infrastructure' ? 'block' : 'none'};">
                <!-- Navigation HUD Bar -->
                <div class="travel-hud-bar">
                    <div class="hud-location-selector">
                        <div class="hud-select-group">
                            <label for="bp-hud-origin"><i class="fas fa-street-view"></i> Your Start Point</label>
                            <select id="bp-hud-origin" onchange="updateBlueprintOrigin(this.value)">
                                ${spacePulseData.blueprintOrigins.map(p => `
                                    <option value="${p.id}" ${p.id === AppState.selectedBlueprintOrigin ? 'selected' : ''}>${p.name}</option>
                                `).join('')}
                            </select>
                        </div>

                        <div class="hud-select-group">
                            <label for="bp-hud-dest"><i class="fas fa-location-dot"></i> Destination Building / Facility</label>
                            <select id="bp-hud-dest" onchange="updateBlueprintDestination(this.value)">
                                ${spacePulseData.blueprintNodes.map(n => `
                                    <option value="${n.id}" ${n.id === AppState.selectedBlueprintDestination ? 'selected' : ''}>${n.name} (${n.category.toUpperCase()})</option>
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
                            <span>Ground Distance</span>
                            <strong>${bpDistMeters} m</strong>
                        </div>
                        <div class="hud-metric-item">
                            <span>Estimated Walk</span>
                            <strong>${bpWalkMins} min</strong>
                        </div>
                        ${projectedFree !== null ? `
                        <div class="hud-metric-item">
                            <span>Free Seats on Arrival</span>
                            <strong style="color: var(--pulse-green);">~${projectedFree} seats</strong>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Blueprint Meta Information & Search Bar Strip -->
                <div class="blueprint-meta-strip">
                    <div class="blueprint-meta-badge">
                        <i class="fas fa-building-columns"></i>
                        <span>University of Moratuwa • Map of Infrastructure</span>
                    </div>

                    <div class="blueprint-scale-tag">
                        <span><i class="fas fa-ruler-combined"></i> Scale 1 : 1000</span>
                        <span><i class="fas fa-layer-group"></i> 28 Telemetry Nodes Active</span>
                    </div>

                    <div class="map-search-group">
                        <i class="fas fa-magnifying-glass map-search-icon"></i>
                        <input type="text" id="blueprint-search-input" class="map-search-input" 
                               placeholder="Search department, canteen, ATM, gym..." 
                               value="${AppState.blueprintSearchQuery}"
                               oninput="handleBlueprintSearch(this.value)">
                    </div>
                </div>

                <!-- Category Filter Chips Bar -->
                <div class="map-category-filter-bar">
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'all' ? 'active' : ''}" onclick="filterBlueprintCategory('all')">
                        <i class="fas fa-border-all"></i> All Landmarks (28)
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'library' ? 'active' : ''}" onclick="filterBlueprintCategory('library')">
                        <i class="fas fa-book-reader"></i> Library
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'canteen' ? 'active' : ''}" onclick="filterBlueprintCategory('canteen')">
                        <i class="fas fa-utensils"></i> Canteens (5)
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'atm' ? 'active' : ''}" onclick="filterBlueprintCategory('atm')">
                        <i class="fas fa-money-check-dollar"></i> ATMs (3)
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'bookshop' ? 'active' : ''}" onclick="filterBlueprintCategory('bookshop')">
                        <i class="fas fa-book-bookmark"></i> Bookshops (2)
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'academic' ? 'active' : ''}" onclick="filterBlueprintCategory('academic')">
                        <i class="fas fa-graduation-cap"></i> Academic Depts (8)
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'facility' ? 'active' : ''}" onclick="filterBlueprintCategory('facility')">
                        <i class="fas fa-hospital"></i> Health & Auditoriums
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'sports' ? 'active' : ''}" onclick="filterBlueprintCategory('sports')">
                        <i class="fas fa-dumbbell"></i> Sports & Ground
                    </button>
                    <button class="map-cat-chip ${AppState.blueprintCategory === 'gate' ? 'active' : ''}" onclick="filterBlueprintCategory('gate')">
                        <i class="fas fa-archway"></i> Gates & Exits (4)
                    </button>
                </div>

                <!-- Blueprint Map Wrapper with Leaflet Container -->
                <div class="osm-map-wrapper blueprint-map-wrapper">
                    <div id="blueprint-map-container"></div>

                    <!-- Floating Navigation Toolbar -->
                    <div class="map-floating-toolbar">
                        <button class="map-tool-btn" id="bp-locate-btn" title="Center Core (Library & Sumanadasa)">
                            <i class="fas fa-crosshairs"></i>
                        </button>
                        <button class="map-tool-btn" id="bp-zoom-in-btn" title="Zoom In">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="map-tool-btn" id="bp-zoom-out-btn" title="Zoom Out">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="map-tool-btn ${AppState.blueprintContrastMode === 'dark' || (AppState.blueprintContrastMode === 'auto' && AppState.theme === 'dark') ? 'active-branch' : ''}" id="bp-contrast-btn" title="Toggle Cyber Dark Hologram / Light CAD Blueprint">
                            <i class="fas fa-circle-half-stroke"></i>
                        </button>
                        <button class="map-tool-btn ${AppState.blueprintShowZones ? 'active-branch' : ''}" id="bp-zones-btn" title="Toggle CAD Cleaning Boundaries & Zones">
                            <i class="fas fa-shield-halved"></i>
                        </button>
                        <button class="map-tool-btn" id="bp-fullscreen-btn" title="Toggle Fullscreen Map">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>

                    <!-- Floating Action Button for University AI -->
                    <button class="map-fab-btn" onclick="toggleChatbot()" title="Ask SpacePulse University AI">
                        <i class="fas fa-robot"></i>
                    </button>
                </div>

                <!-- CAD Service Boundaries Legend Strip -->
                <div class="zone-legend-strip">
                    <span style="font-size: 0.76rem; font-weight: 800; color: var(--text-primary); margin-right: 6px;">
                        <i class="fas fa-vector-square"></i> CAD Boundaries:
                    </span>
                    <button class="zone-pill-btn zone-01" onclick="focusBlueprintZone('zone_01')">
                        <i class="fas fa-square" style="color: #16a34a;"></i> <strong>ZONE - 01</strong> (Academic Core, Admin & Central Canteen)
                    </button>
                    <button class="zone-pill-btn zone-02" onclick="focusBlueprintZone('zone_02')">
                        <i class="fas fa-square" style="color: #c026d3;"></i> <strong>ZONE - 02</strong> (IT Faculty, Architecture, ENTC & Auditorium)
                    </button>
                    <button class="zone-pill-btn zone-03" onclick="focusBlueprintZone('zone_03')">
                        <i class="fas fa-square" style="color: #2563eb;"></i> <strong>ZONE - 03</strong> (Sports Ground, Gym, Textile & Bolgoda Lake)
                    </button>
                </div>
            </div>

            <!-- 2. Satellite & GIS Street Map Subview -->
            <div id="osm-subview" style="display: ${AppState.mapsSubTab === 'osm' ? 'block' : 'none'};">
                <div class="travel-hud-bar">
                    <div class="hud-location-selector">
                        <div class="hud-select-group">
                            <label for="hud-origin"><i class="fas fa-street-view"></i> Your Location</label>
                            <select id="hud-origin" onchange="updateTravelOrigin(this.value)">
                                ${spacePulseData.originPoints.map(p => `
                                    <option value="${p.id}" ${p.id === AppState.selectedOrigin ? 'selected' : ''}>${p.name}</option>
                                `).join('')}
                            </select>
                        </div>

                        <div class="hud-select-group">
                            <label for="hud-dest"><i class="fas fa-location-dot"></i> Destination Node</label>
                            <select id="hud-dest" onchange="updateTravelDestination(this.value)">
                                ${spacePulseData.universityGpsNodes.map(n => `
                                    <option value="${n.id}" ${n.id === AppState.selectedDestination ? 'selected' : ''}>${n.name} (${n.category})</option>
                                `).join('')}
                            </select>
                        </div>
                    </div>

                    <div class="hud-speed-modes">
                        <button class="speed-mode-btn ${AppState.selectedSpeed === 4.5 ? 'active' : ''}" onclick="updateTravelSpeed(4.5)">
                            <i class="fas fa-person-walking"></i> Walk (4.5)
                        </button>
                        <button class="speed-mode-btn ${AppState.selectedSpeed === 5.8 ? 'active' : ''}" onclick="updateTravelSpeed(5.8)">
                            <i class="fas fa-person-walking-dashed-line-arrow-right"></i> Fast (5.8)
                        </button>
                        <button class="speed-mode-btn ${AppState.selectedSpeed === 9.0 ? 'active' : ''}" onclick="updateTravelSpeed(9.0)">
                            <i class="fas fa-person-running"></i> Run (9.0)
                        </button>
                        <button class="speed-mode-btn ${AppState.selectedSpeed === 15.0 ? 'active' : ''}" onclick="updateTravelSpeed(15.0)">
                            <i class="fas fa-bicycle"></i> Cycle (15)
                        </button>
                    </div>

                    <div class="hud-metrics-pill">
                        <div class="hud-metric-item">
                            <span>Distance</span>
                            <strong>${osmDistMeters} m</strong>
                        </div>
                        <div class="hud-metric-item">
                            <span>Est. Travel</span>
                            <strong>${osmWalkMins} min</strong>
                        </div>
                    </div>
                </div>

                <div class="osm-map-wrapper">
                    <div id="osm-map-container"></div>

                    <!-- Floating Navigation Controls Matching Screenshot -->
                    <div class="map-floating-toolbar">
                        <button class="map-tool-btn" id="map-locate-btn" title="Locate Me (Architecture)">
                            <i class="fas fa-crosshairs"></i>
                        </button>
                        <button class="map-tool-btn" id="map-zoom-in-btn" title="Zoom In">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="map-tool-btn" id="map-zoom-out-btn" title="Zoom Out">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="map-tool-btn active-branch" id="map-network-toggle-btn" title="Toggle University Network Mesh & Zones">
                            <i class="fas fa-code-branch"></i>
                        </button>
                    </div>

                    <button class="map-fab-btn" id="map-ai-fab-btn" onclick="toggleChatbot()" title="Ask SpacePulse University AI">
                        <i class="fas fa-robot"></i>
                    </button>
                </div>
            </div>

            <!-- 3. 2D Architectural Floor Plans Subview -->
            <div id="floorplans-subview" style="display: ${AppState.mapsSubTab === 'floorplans' ? 'block' : 'none'};">
                <div class="floor-plan-card">
                    <div class="floor-plan-header">
                        <div class="floor-nav-pills">
                            ${spacePulseData.libraryFloors.map(f => `
                                <button class="floor-nav-pill ${f.id === AppState.selectedFloorId ? 'active' : ''}" onclick="switchFloor('${f.id}')">
                                    ${f.floor} (${f.availableSeats} Free)
                                </button>
                            `).join('')}
                        </div>

                        <div class="seat-filter-chips">
                            <span style="font-size: 0.76rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Filter:</span>
                            <button class="seat-filter-chip ${AppState.seatFilter === 'all' ? 'active' : ''}" onclick="filterSeats('all')">All</button>
                            <button class="seat-filter-chip ${AppState.seatFilter === 'free' ? 'active' : ''}" onclick="filterSeats('free')">🟢 Free</button>
                            <button class="seat-filter-chip ${AppState.seatFilter === 'occupied' ? 'active' : ''}" onclick="filterSeats('occupied')">🔴 Occupied</button>
                            <button class="seat-filter-chip ${AppState.seatFilter === 'power' ? 'active' : ''}" onclick="filterSeats('power')">🔌 Power Outlets</button>
                        </div>
                    </div>

                    <div class="floor-canvas-wrapper">
                        ${renderFloorSvgHTML(AppState.selectedFloorId)}
                    </div>

                    <div class="floor-plan-legend">
                        <div class="legend-item"><span class="legend-dot free"></span> Available / Click to Hold</div>
                        <div class="legend-item"><span class="legend-dot reserved"></span> Reserved Pending Arrival</div>
                        <div class="legend-item"><span class="legend-dot occupied"></span> Currently Occupied</div>
                        <div class="legend-item"><i class="fas fa-plug" style="color: var(--pulse-green);"></i> AC Power Outlet</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    contentArea.innerHTML = html;

    if (AppState.mapsSubTab === 'infrastructure') {
        setTimeout(initBlueprintMap, 100);
    } else if (AppState.mapsSubTab === 'osm') {
        setTimeout(initLeafletMap, 100);
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

function renderFloorSvgHTML(floorId) {
    const seats = spacePulseData.seatsByFloor[floorId] || spacePulseData.seatsByFloor['floor_ground'];

    const visibleSeats = seats.filter(s => {
        if (AppState.seatFilter === 'free') return s.status === 'free';
        if (AppState.seatFilter === 'occupied') return s.status === 'occupied';
        if (AppState.seatFilter === 'power') return s.powerOutlet;
        return true;
    });

    let seatNodesSVG = '';
    visibleSeats.forEach(s => {
        const isUserReserved = AppState.activeReservation && AppState.activeReservation.seatId === s.id;
        const effectiveStatus = isUserReserved ? 'reserved' : s.status;

        seatNodesSVG += `
            <g class="seat-node ${effectiveStatus}" transform="translate(${s.x}, ${s.y})" onclick="openSeatModal('${s.id}', '${floorId}')">
                ${effectiveStatus === 'free' || isUserReserved ? `
                    <circle class="seat-halo" cx="0" cy="0" r="16"></circle>
                ` : ''}
                <circle class="seat-circle" cx="0" cy="0" r="13"></circle>
                <text class="seat-node-text" x="0" y="0">${s.seatNumber}</text>
                ${s.powerOutlet ? `
                    <circle cx="9" cy="-9" r="4" fill="#3b82f6" stroke="#ffffff" stroke-width="1"></circle>
                ` : ''}
            </g>
        `;
    });

    return `
        <svg class="architectural-svg" viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="590" height="290" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
            
            <rect class="svg-zone-box" x="40" y="40" width="230" height="130"/>
            <text class="svg-zone-label" x="50" y="60">Zone A: Silent Study Carrels</text>

            <rect class="svg-zone-box" x="300" y="40" width="280" height="100"/>
            <text class="svg-zone-label" x="310" y="60">Zone B: Window Desks</text>

            <rect class="svg-zone-box" x="300" y="160" width="280" height="120"/>
            <text class="svg-zone-label" x="310" y="180">Zone C: Tech & Computer Pods</text>

            <rect class="svg-zone-box" x="40" y="190" width="230" height="90"/>
            <text class="svg-zone-label" x="50" y="210">Zone D: Circulation & Archive</text>

            <line x1="285" y1="30" x2="285" y2="290" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 4"/>
            <text x="285" y="300" font-size="9" fill="var(--text-muted)" text-anchor="middle">CENTRAL WALKWAY</text>

            ${seatNodesSVG}
        </svg>
    `;
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
    const estWait = isOpen ? Math.max(1, Math.round(c.personCount * 0.12)) : 0;

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
                    <span class="status-badge ${isOpen ? 'open' : 'closed'}">${c.status}</span>
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

                <div class="card-tags">
                    <span class="tag-pill"><i class="fas fa-bowl-food"></i> ${c.specialties}</span>
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
    const estWaitMins = a.queueLength * 3;

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
                    <span class="status-badge ${isWorking ? 'working' : 'out-of-order'}">${a.status}</span>
                </div>

                <div class="stat-row">
                    <span class="stat-label">Location Landmark:</span>
                    <span class="stat-value" style="font-size: 0.82rem;">${a.location}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Cash Dispensing:</span>
                    <span class="stat-value ${a.hasCash ? 'available' : ''}" style="color: ${a.hasCash ? 'var(--pulse-green)' : 'var(--danger)'}">
                        ${a.hasCash ? '<i class="fas fa-check-circle"></i> Cash Available' : '<i class="fas fa-times-circle"></i> Out of Cash'}
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

                <div class="card-tags" style="margin-top: 10px;">
                    ${Array.from({ length: Math.min(a.queueLength, 6) }).map(() => '<i class="fas fa-user" style="color: var(--amber); font-size: 0.85rem;"></i>').join(' ')}
                    ${a.queueLength > 6 ? `<span style="font-size: 0.76rem; color: var(--text-muted);">+${a.queueLength - 6} more</span>` : ''}
                </div>
            </div>

            <div class="card-footer-actions">
                <button class="card-action-btn" onclick="openFacilityDetail('${a.id}')">
                    <i class="fas fa-compass"></i> Walking Directions
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

    new Chart(ctxLib, {
        type: 'line',
        data: {
            labels: profile.hours,
            datasets: [{
                label: 'Library Occupancy %',
                data: profile.libraryOccupancy,
                borderColor: '#00008b',
                backgroundColor: 'rgba(0, 0, 139, 0.1)',
                tension: 0.35,
                fill: true,
                pointBackgroundColor: '#10b981',
                pointRadius: 4
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

    new Chart(ctxCan, {
        type: 'bar',
        data: {
            labels: profile.hours,
            datasets: [{
                label: 'Canteen Foot Traffic %',
                data: profile.canteenOccupancy,
                backgroundColor: profile.canteenOccupancy.map(v => v > 80 ? '#ef4444' : (v > 50 ? '#f59e0b' : '#10b981')),
                borderRadius: 6
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
    showStudentLoginPage();
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
        // Step 1: Email Form + Domain Chips + One-Click Demo Button + Guest link
        body.innerHTML = `
            <div class="portal-section-intro">
                <h4>Sign in with University Email</h4>
                <p>Connect your official @uom.lk account to access real-time vacancy tracking and library reservations.</p>
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

                <button type="submit" class="portal-submit-btn">
                    <i class="fas fa-paper-plane"></i> Send 6-Digit Verification Code
                </button>
            </form>

            <div class="portal-divider">
                <span>OR INSTANT ONE-CLICK EVALUATION</span>
            </div>

            <button type="button" class="portal-demo-btn" onclick="handlePortalDemoLogin()">
                <i class="fas fa-bolt" style="color: var(--amber);"></i> One-Click Demo Student Sign In (Kavindu Dilupa • 210123A)
            </button>

            <div class="portal-guest-link-wrap">
                <a href="javascript:void(0)" onclick="hideStudentLoginPage()" class="portal-guest-link">
                    Continue to Dashboard as Guest <i class="fas fa-chevron-right"></i>
                </a>
            </div>
        `;
    } else {
        // Step 2: OTP Verification
        body.innerHTML = `
            <div style="text-align: center; margin-bottom: 16px;">
                <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">Enter 6-Digit OTP</h4>
                <p style="font-size: 0.84rem; color: var(--text-secondary);">
                    Verification code sent to <strong>${AppState.pendingOtpEmail}</strong>
                </p>
            </div>

            <!-- Demo Mode Helper Code Pill -->
            <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); padding: 10px 14px; text-align: center; margin-bottom: 16px;">
                <span style="font-size: 0.78rem; color: var(--pulse-green); font-weight: 700;">Demo Mode Helper:</span>
                <button type="button" style="background: transparent; border: none; font-weight: 800; color: var(--pulse-green); cursor: pointer; text-decoration: underline; margin-left: 6px;" onclick="autofillPortalOtp()">
                    Autofill Demo Code (${AppState.pendingOtpCode})
                </button>
            </div>

            <form id="portal-otp-form" onsubmit="event.preventDefault(); handlePortalVerifyOtp();">
                <div class="otp-box-container">
                    <input type="text" id="portal-otp-input" class="otp-input-field" maxlength="6" pattern="[0-9]{6}" placeholder="••••••" required autofocus>
                </div>

                <button type="submit" class="portal-submit-btn" style="margin-bottom: 10px;">
                    <i class="fas fa-shield-check"></i> Verify & Enter University Dashboard
                </button>

                <button type="button" class="portal-signout-btn" style="color: var(--text-secondary); border-color: var(--border);" onclick="AppState.isEnteringOtp = false; renderPortalAuthBody();">
                    <i class="fas fa-arrow-left"></i> Change Email
                </button>
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

function handlePortalSendOtp() {
    const emailInput = document.getElementById('portal-email-input');
    const nameInput = document.getElementById('portal-name-input');
    const email = emailInput ? emailInput.value.trim() : '';
    const customName = nameInput ? nameInput.value.trim() : '';

    if (!isValidUomEmail(email)) {
        showToast('Please enter a valid @uom.lk or @*.mrt.ac.lk university email.', true);
        return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    AppState.pendingOtpEmail = email;
    AppState.pendingOtpCode = code;
    AppState.pendingOtpCustomName = customName;
    AppState.isEnteringOtp = true;

    showToast(`Code sent to ${email} (Demo Code: ${code}) 📩`);
    renderPortalAuthBody();
    renderStudentAuthModalBody();
}

function autofillPortalOtp() {
    const input = document.getElementById('portal-otp-input');
    if (input && AppState.pendingOtpCode) {
        input.value = AppState.pendingOtpCode;
        handlePortalVerifyOtp();
    }
}

function handlePortalVerifyOtp() {
    const input = document.getElementById('portal-otp-input');
    const entered = input ? input.value.trim() : '';

    if (entered !== AppState.pendingOtpCode) {
        showToast('Invalid verification code. Please check and re-enter.', true);
        return;
    }

    const studentProfile = parseStudentProfileFromEmail(AppState.pendingOtpEmail, AppState.pendingOtpCustomName);
    AppState.currentStudent = studentProfile;
    localStorage.setItem('spacepulse_student_profile', JSON.stringify(studentProfile));

    AppState.isEnteringOtp = false;
    AppState.pendingOtpEmail = null;
    AppState.pendingOtpCode = null;

    showToast(`Welcome, ${studentProfile.name}! Verified as ${studentProfile.department} 🎓`);
    updateStudentHeaderElements();
    renderPortalAuthBody();
    renderStudentAuthModalBody();
    hideStudentLoginPage();
    if (AppState.currentTab === 'home') renderHome();
}

function handlePortalDemoLogin() {
    const studentProfile = {
        email: '210123A@uom.lk',
        indexNumber: '210123A',
        batch: 'Batch 21',
        department: 'Computer Science & Engineering',
        name: 'Kavindu Dilupa',
        isVerified: true,
        verifiedAt: new Date().toISOString()
    };
    AppState.currentStudent = studentProfile;
    localStorage.setItem('spacepulse_student_profile', JSON.stringify(studentProfile));
    AppState.isEnteringOtp = false;
    AppState.pendingOtpEmail = null;
    AppState.pendingOtpCode = null;

    showToast(`Welcome, Kavindu Dilupa! Verified as CSE Undergraduate 🎓`);
    updateStudentHeaderElements();
    renderPortalAuthBody();
    renderStudentAuthModalBody();
    hideStudentLoginPage();
    if (AppState.currentTab === 'home') renderHome();
}

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
                <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">Connect Your UoM Student Email</h4>
                <p style="font-size: 0.84rem; color: var(--text-secondary);">
                    Enter your official university email to unlock 30-minute desk reservations and personalized university telemetry.
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
        `;
    } else {
        body.innerHTML = `
            <div style="text-align: center; margin-bottom: 16px;">
                <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">Enter 6-Digit OTP</h4>
                <p style="font-size: 0.84rem; color: var(--text-secondary);">
                    Verification code sent to <strong>${AppState.pendingOtpEmail}</strong>
                </p>
            </div>

            <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); padding: 10px 14px; text-align: center; margin-bottom: 16px;">
                <span style="font-size: 0.78rem; color: var(--pulse-green); font-weight: 700;">Demo Mode Helper:</span>
                <button type="button" style="background: transparent; border: none; font-weight: 800; color: var(--pulse-green); cursor: pointer; text-decoration: underline; margin-left: 6px;" onclick="autofillDemoOtp()">
                    Autofill Demo Code (${AppState.pendingOtpCode})
                </button>
            </div>

            <form id="student-otp-form" onsubmit="event.preventDefault(); handleVerifyOtp();">
                <div class="otp-box-container">
                    <input type="text" id="otp-code-input" class="otp-input-field" maxlength="6" pattern="[0-9]{6}" placeholder="••••••" required autofocus>
                </div>

                <button type="submit" class="primary-btn" style="margin-bottom: 10px;">
                    <i class="fas fa-shield-check"></i> Verify & Unlock Student Features
                </button>

                <button type="button" class="secondary-btn" onclick="AppState.isEnteringOtp = false; renderStudentAuthModalBody();">
                    <i class="fas fa-arrow-left"></i> Change Email
                </button>
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

function handleSendOtp() {
    const email = document.getElementById('uom-email-input').value.trim();
    const customName = document.getElementById('uom-name-input').value.trim();

    if (!isValidUomEmail(email)) {
        showToast('Please enter a valid @uom.lk or @*.mrt.ac.lk university email.', true);
        return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    AppState.pendingOtpEmail = email;
    AppState.pendingOtpCode = code;
    AppState.pendingOtpCustomName = customName;
    AppState.isEnteringOtp = true;

    showToast(`Code sent to ${email} (Demo Code: ${code}) 📩`);
    renderStudentAuthModalBody();
    renderPortalAuthBody();
}

function autofillDemoOtp() {
    const input = document.getElementById('otp-code-input');
    if (input && AppState.pendingOtpCode) {
        input.value = AppState.pendingOtpCode;
        handleVerifyOtp();
    }
}

function handleVerifyOtp() {
    const input = document.getElementById('otp-code-input');
    const entered = input ? input.value.trim() : '';

    if (entered !== AppState.pendingOtpCode) {
        showToast('Invalid verification code. Please check and re-enter.', true);
        return;
    }

    const studentProfile = parseStudentProfileFromEmail(AppState.pendingOtpEmail, AppState.pendingOtpCustomName);
    AppState.currentStudent = studentProfile;
    localStorage.setItem('spacepulse_student_profile', JSON.stringify(studentProfile));

    AppState.isEnteringOtp = false;
    AppState.pendingOtpEmail = null;
    AppState.pendingOtpCode = null;

    showToast(`Welcome, ${studentProfile.name}! Verified as ${studentProfile.department} 🎓`);
    updateStudentHeaderElements();
    renderStudentAuthModalBody();
    renderPortalAuthBody();
    const modal = document.getElementById('student-auth-modal');
    if (modal) modal.style.display = 'none';
    if (AppState.currentTab === 'home') renderHome();
}

function signOutStudent() {
    AppState.currentStudent = null;
    localStorage.removeItem('spacepulse_student_profile');
    AppState.isEnteringOtp = false;
    AppState.pendingOtpEmail = null;
    AppState.pendingOtpCode = null;

    showToast('Signed out of student account.');
    updateStudentHeaderElements();
    renderStudentAuthModalBody();
    renderPortalAuthBody();
    showStudentLoginPage();
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

    // Show student login page as first page in the web application
    showStudentLoginPage();
});
