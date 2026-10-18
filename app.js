/**
 * SpacePulse - University Vacancy Tracker & Live Campus Telemetry
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

    // Campus GPS Nodes for OpenStreetMap (University of Moratuwa)
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

    // Campus Origin Landmarks for Travel Time HUD
    originPoints: [
        { id: 'orig_gate', name: 'Main Campus Gate', lat: 6.798500, lng: 79.901800 },
        { id: 'orig_sentra', name: 'Sentra Court', lat: 6.796500, lng: 79.900800 },
        { id: 'orig_entc', name: 'ENTC Department', lat: 6.795800, lng: 79.902100 },
        { id: 'orig_civil', name: 'Civil Engineering Dept', lat: 6.796000, lng: 79.899100 },
        { id: 'orig_hostel', name: 'University Hostels', lat: 6.799200, lng: 79.899400 },
        { id: 'orig_lib', name: 'Central Library Plaza', lat: 6.795340, lng: 79.901050 }
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
    mapsSubTab: 'osm', // 'osm' or 'floorplans'
    selectedFloorId: 'floor_ground',
    seatFilter: 'all', // 'all', 'free', 'occupied', 'power'
    favorites: JSON.parse(localStorage.getItem('spacepulse_favs') || '["floor_ground", "canteen_goda_uda"]'),
    alerts: JSON.parse(localStorage.getItem('spacepulse_alerts') || '[]'),
    activeReservation: JSON.parse(localStorage.getItem('spacepulse_reservation') || 'null'),
    reservationTimerInterval: null,
    selectedOrigin: 'orig_sentra',
    selectedDestination: 'floor_ground',
    selectedSpeed: 4.5, // km/h
    searchQuery: '',
    selectedCategory: 'all',
    geminiApiKey: localStorage.getItem('spacepulse_gemini_key') || '',
    activeChart: null,
    leafletMap: null,
    currentTrendsProfile: 'weekday'
};

// ==========================================================================
// 3. UI Helpers & Calculations
// ==========================================================================

function getStats() {
    const totalLibrarySeats = spacePulseData.libraryFloors.reduce((acc, f) => acc + f.totalSeats, 0);
    const availableLibrarySeats = spacePulseData.libraryFloors.reduce((acc, f) => acc + f.availableSeats, 0);
    const openCanteensCount = spacePulseData.canteens.filter(c => c.status === 'Open').length;
    const workingAtms = spacePulseData.atms.filter(a => a.status === 'Working');
    const shortestAtm = workingAtms.sort((a, b) => a.queueLength - b.queueLength)[0] || { name: 'None', queueLength: 0 };
    const openBookshops = spacePulseData.bookshops.filter(b => b.status === 'Open').length;

    // Optimal study spot: quiet zone floor with highest vacancy
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

// Distance Calculation (Haversine in meters)
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
// 4. Page View Renderers
// ==========================================================================

const contentArea = document.getElementById('content-area');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

// --- 4.1 Home Dashboard ---
function renderHome() {
    pageTitle.textContent = 'Welcome to SpacePulse 👋';
    pageSubtitle.textContent = 'Live vacancy tracking and intelligent crowd monitoring at University of Moratuwa';
    
    const stats = getStats();
    const isSearching = AppState.searchQuery.trim().length > 0 || AppState.selectedCategory !== 'all';

    let html = `
        <!-- AI Recommendation Banner -->
        ${!isSearching ? `
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
        ` : ''}

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
    `;

    // Render Filter/Search Results OR Standard Dashboard
    if (isSearching) {
        html += renderSearchResultsHTML();
    } else {
        html += `
            <!-- Favorites Carousel Section -->
            ${renderFavoritesSectionHTML()}

            <!-- 4 Hero Facility Navigation Cards (Mirroring Mobile App) -->
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
                            <h3>Campus Canteens</h3>
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
                            <h3>Campus ATMs</h3>
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

    contentArea.innerHTML = html;
    attachHomeEventListeners();
}

function renderFavoritesSectionHTML() {
    if (!AppState.favorites || AppState.favorites.length === 0) return '';

    let favCards = '';
    AppState.favorites.forEach(id => {
        // match floor
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

        // match canteen
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

        // match ATM
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

    // Render floor cards
    filteredFloors.forEach(f => {
        resHtml += createFloorCardHTML(f);
    });

    // Render canteen cards
    filteredCanteens.forEach(c => {
        resHtml += createCanteenCardHTML(c);
    });

    // Render ATM cards
    filteredAtms.forEach(a => {
        resHtml += createAtmCardHTML(a);
    });

    // Render Bookshop cards
    filteredBookshops.forEach(b => {
        resHtml += createBookshopCardHTML(b);
    });

    resHtml += '</div>';
    return resHtml;
}

function attachHomeEventListeners() {
    const searchInput = document.getElementById('home-search-input');
    const searchClear = document.getElementById('home-search-clear');
    const resetBtn = document.getElementById('reset-search-btn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            AppState.searchQuery = e.target.value;
            if (searchClear) searchClear.style.display = AppState.searchQuery ? 'block' : 'none';
            renderHome();
        });
    }

    if (searchClear) {
        searchClear.addEventListener('click', () => {
            AppState.searchQuery = '';
            renderHome();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            AppState.searchQuery = '';
            AppState.selectedCategory = 'all';
            renderHome();
        });
    }

    document.querySelectorAll('.category-chip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = e.currentTarget.getAttribute('data-cat');
            AppState.selectedCategory = cat;
            renderHome();
        });
    });
}

// --- 4.2 Maps & 2D Floor Plans Hub ---
function renderMaps() {
    pageTitle.textContent = 'Campus & 2D Floor Maps 🗺️';
    pageSubtitle.textContent = 'Authentic OpenStreetMap GPS navigation & architectural 2D floor plans with seat reservation';

    const origin = spacePulseData.originPoints.find(o => o.id === AppState.selectedOrigin) || spacePulseData.originPoints[0];
    const destinationNode = spacePulseData.universityGpsNodes.find(n => n.id === AppState.selectedDestination) || spacePulseData.universityGpsNodes[0];

    const distanceMeters = calculateDistanceMeters(origin.lat, origin.lng, destinationNode.lat, destinationNode.lng);
    // Speed: speed in km/h -> m/min = (speed * 1000) / 60
    const metersPerMin = (AppState.selectedSpeed * 1000) / 60;
    const walkMins = Math.max(1, Math.round(distanceMeters / metersPerMin));

    // Projected arrival vacancy
    const matchingFloor = spacePulseData.libraryFloors.find(f => f.id === destinationNode.id);
    const projectedFree = matchingFloor ? Math.max(0, matchingFloor.availableSeats - Math.floor(walkMins * 1.5)) : 'N/A';

    let html = `
        <div class="maps-hub-container">
            <!-- Segmented View Toggle -->
            <div class="map-segmented-bar">
                <button class="map-segment-btn ${AppState.mapsSubTab === 'osm' ? 'active' : ''}" onclick="switchMapMode('osm')">
                    <i class="fas fa-map-location-dot"></i> University Ground (OSM)
                </button>
                <button class="map-segment-btn ${AppState.mapsSubTab === 'floorplans' ? 'active' : ''}" onclick="switchMapMode('floorplans')">
                    <i class="fas fa-layer-group"></i> Library 2D Floor Plans
                </button>
            </div>

            <!-- SUB-VIEW 1: OpenStreetMap & Travel Time HUD -->
            <div id="osm-subview" style="display: ${AppState.mapsSubTab === 'osm' ? 'block' : 'none'};">
                <!-- Travel Time & Speed Mode HUD -->
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
                            <strong>${distanceMeters} m</strong>
                        </div>
                        <div class="hud-metric-item">
                            <span>Est. Travel</span>
                            <strong>${walkMins} min</strong>
                        </div>
                        ${matchingFloor ? `
                        <div class="hud-metric-item">
                            <span>Expected Free</span>
                            <strong>~${projectedFree} seats</strong>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <div id="osm-map-container" style="margin-top: 16px;"></div>
            </div>

            <!-- SUB-VIEW 2: Architectural 2D Floor Plan with Seat Reservation -->
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

    if (AppState.mapsSubTab === 'osm') {
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

// Leaflet Map Initialization
function initLeafletMap() {
    const mapElement = document.getElementById('osm-map-container');
    if (!mapElement) return;

    if (AppState.leafletMap) {
        AppState.leafletMap.remove();
        AppState.leafletMap = null;
    }

    // Centered at University of Moratuwa
    const moratuwaCenter = [6.7965, 79.9005];
    const map = L.map('osm-map-container', {
        center: moratuwaCenter,
        zoom: 17,
        zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | SpacePulse Team NodeX',
        maxZoom: 19
    }).addTo(map);

    // Place Campus Nodes with styled marker popups
    spacePulseData.universityGpsNodes.forEach(node => {
        let iconHtml = '<i class="fas fa-location-dot" style="font-size: 22px; color: #00008b;"></i>';
        if (node.category === 'library') iconHtml = '<i class="fas fa-book-reader" style="font-size: 22px; color: #10b981;"></i>';
        if (node.category === 'canteen') iconHtml = '<i class="fas fa-utensils" style="font-size: 22px; color: #f59e0b;"></i>';
        if (node.category === 'atm') iconHtml = '<i class="fas fa-money-check-dollar" style="font-size: 22px; color: #3b82f6;"></i>';
        if (node.category === 'bookshop') iconHtml = '<i class="fas fa-book" style="font-size: 22px; color: #8b5cf6;"></i>';

        const customIcon = L.divIcon({
            html: `<div style="text-align: center; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));">${iconHtml}</div>`,
            className: 'custom-map-pin',
            iconSize: [26, 26],
            iconAnchor: [13, 26]
        });

        const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);

        // Calculate dynamic popup content
        let popupText = `<strong>${node.name}</strong><br><small>${node.landmark}</small>`;
        if (node.category === 'library') {
            const stats = getStats();
            popupText += `<br><span style="color: #10b981; font-weight: bold;">${stats.availableLibrarySeats} Seats Free</span>`;
        }

        marker.bindPopup(popupText);
    });

    // Draw route line between selected origin and destination
    const origin = spacePulseData.originPoints.find(o => o.id === AppState.selectedOrigin);
    const destination = spacePulseData.universityGpsNodes.find(n => n.id === AppState.selectedDestination);

    if (origin && destination) {
        const polyline = L.polyline([
            [origin.lat, origin.lng],
            [destination.lat, destination.lng]
        ], {
            color: '#10b981',
            weight: 4,
            opacity: 0.85,
            dashArray: '8, 8'
        }).addTo(map);

        // Fit map bounds to show route
        map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }

    AppState.leafletMap = map;
}

// Architectural 2D Floor SVG Layout
function renderFloorSvgHTML(floorId) {
    const seats = spacePulseData.seatsByFloor[floorId] || spacePulseData.seatsByFloor['floor_ground'];
    const activeFloor = spacePulseData.libraryFloors.find(f => f.id === floorId) || spacePulseData.libraryFloors[0];

    // Filter seats based on current filter
    const visibleSeats = seats.filter(s => {
        if (AppState.seatFilter === 'free') return s.status === 'free';
        if (AppState.seatFilter === 'occupied') return s.status === 'occupied';
        if (AppState.seatFilter === 'power') return s.powerOutlet;
        return true;
    });

    let seatNodesSVG = '';
    visibleSeats.forEach(s => {
        // If seat is currently reserved by user
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
            <!-- Floor Outer Perimeter Boundary -->
            <rect x="15" y="15" width="590" height="290" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
            
            <!-- Zone A: Silent Carrels -->
            <rect class="svg-zone-box" x="40" y="40" width="230" height="130"/>
            <text class="svg-zone-label" x="50" y="60">Zone A: Silent Study Carrels</text>

            <!-- Zone B: Windows & Pods -->
            <rect class="svg-zone-box" x="300" y="40" width="280" height="100"/>
            <text class="svg-zone-label" x="310" y="60">Zone B: Window Desks</text>

            <!-- Zone C: Collaborative Workstations -->
            <rect class="svg-zone-box" x="300" y="160" width="280" height="120"/>
            <text class="svg-zone-label" x="310" y="180">Zone C: Tech & Computer Pods</text>

            <!-- Zone D: Reading Commons -->
            <rect class="svg-zone-box" x="40" y="190" width="230" height="90"/>
            <text class="svg-zone-label" x="50" y="210">Zone D: Circulation & Archive</text>

            <!-- Center Corridor -->
            <line x1="285" y1="30" x2="285" y2="290" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 4"/>
            <text x="285" y="300" font-size="9" fill="var(--text-muted)" text-anchor="middle">CENTRAL WALKWAY</text>

            <!-- Render Clickable Seat Nodes -->
            ${seatNodesSVG}
        </svg>
    `;
}

// --- 4.3 Library Screen ---
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

// --- 4.4 Canteens Screen ---
function renderCanteen() {
    pageTitle.textContent = 'Campus Canteens & Dining 🍽️';
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

// --- 4.5 ATMs Screen ---
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

// --- 4.6 Book Shops Screen ---
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

// --- 4.7 Historical Trends & Analytics Screen ---
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
// 5. Interactive Seat Details & Reservation Modal
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
        const text = `Let's study together at Seat ${seat.seatNumber} (${floor.floor})! SpacePulse shows free seats right now.`;
        navigator.clipboard.writeText(text);
        showToast('Spot link and invitation copied to clipboard! 📋');
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

    // match floor
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

    // match canteen
    const canteen = spacePulseData.canteens.find(c => c.id === facilityId);
    if (canteen) {
        title.textContent = canteen.name;
        subtitle.textContent = canteen.location;
        body.innerHTML = `
            <div class="stat-row"><span>Operating Status:</span><strong>${canteen.status}</strong></div>
            <div class="stat-row"><span>Occupancy Count:</span><strong>${canteen.personCount} / ${canteen.maxCapacity} persons</strong></div>
            <div class="stat-row"><span>Specialty Foods:</span><strong>${canteen.specialties}</strong></div>
            <div class="stat-row"><span>Estimated Line Wait:</span><strong>~${Math.max(1, Math.round(canteen.personCount * 0.12))} mins</strong></div>
            <button class="primary-btn" style="margin-top: 18px;" onclick="document.getElementById('facility-detail-modal').style.display='none'; navigateTo('maps'); updateTravelDestination('${canteen.id}'); switchMapMode('osm');">
                <i class="fas fa-location-arrow"></i> Navigate on Campus Ground Map
            </button>
        `;
        modal.style.display = 'flex';
        return;
    }

    // match ATM
    const atm = spacePulseData.atms.find(a => a.id === facilityId);
    if (atm) {
        title.textContent = atm.name;
        subtitle.textContent = atm.bankName;
        body.innerHTML = `
            <div class="stat-row"><span>Status:</span><strong>${atm.status}</strong></div>
            <div class="stat-row"><span>Cash Available:</span><strong>${atm.hasCash ? 'Yes' : 'Out of Order / No Cash'}</strong></div>
            <div class="stat-row"><span>Queue Count:</span><strong>${atm.queueLength} persons</strong></div>
            <div class="stat-row"><span>Location:</span><strong>${atm.location}</strong></div>
            <button class="primary-btn" style="margin-top: 18px;" onclick="document.getElementById('facility-detail-modal').style.display='none'; navigateTo('maps'); updateTravelDestination('${atm.id}'); switchMapMode('osm');">
                <i class="fas fa-location-arrow"></i> Walking Directions
            </button>
        `;
        modal.style.display = 'flex';
        return;
    }

    // match Bookshop
    const shop = spacePulseData.bookshops.find(b => b.id === facilityId);
    if (shop) {
        title.textContent = shop.name;
        subtitle.textContent = shop.location;
        body.innerHTML = `
            <div class="stat-row"><span>Status:</span><strong>${shop.status}</strong></div>
            <div class="stat-row"><span>Crowdedness:</span><strong>${shop.crowdedness}</strong></div>
            <div class="stat-row"><span>Services Offered:</span><strong>${shop.services.join(', ')}</strong></div>
            <button class="primary-btn" style="margin-top: 18px;" onclick="document.getElementById('facility-detail-modal').style.display='none'; navigateTo('maps'); updateTravelDestination('${shop.id}'); switchMapMode('osm');">
                <i class="fas fa-location-arrow"></i> Walking Directions
            </button>
        `;
        modal.style.display = 'flex';
    }
}

// ==========================================================================
// 6. Navigation Router
// ==========================================================================

function navigateTo(target) {
    AppState.currentTab = target;

    // Update active nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('data-target') === target) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Close mobile drawer if open
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

// Favorites system
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

// Toast notification helper
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
// 7. SpacePulse AI Campus Assistant (Chatbot)
// ==========================================================================

const chatbotDrawer = document.getElementById('chatbot-drawer');
const chatbotOverlay = document.getElementById('chatbot-overlay');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');

function initChatbot() {
    // Initial greeting from SpacePulse AI
    if (chatMessages.children.length === 0) {
        addChatMessage('bot', "Hello! I am **SpacePulse AI**, your live campus assistant for University of Moratuwa. I have real-time telemetry on library vacancies, canteen crowds, and ATM queues. What can I help you find right now?");
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

    // Gemini API key config
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
    // Simple bold markdown conversion
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleChatSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    addChatMessage('user', text);
    chatInput.value = '';

    // Generate intelligent AI response based on live campus snapshot
    const reply = await generateAiResponse(text);
    addChatMessage('bot', reply);
}

async function generateAiResponse(query) {
    const q = query.toLowerCase();
    const stats = getStats();

    // If Google Gemini key is present, invoke Gemini API
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

    // High-performance intelligent deterministic context reasoning engine
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
// 8. Smart Threshold Alerts Engine
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
// 9. Real-Time Telemetry Simulation Engine
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

        // Subtle realistic fluctuations
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

        // Evaluate triggers
        evaluateAlertThresholds();

        // Refresh currently visible tab without losing scroll or state
        if (AppState.currentTab === 'home') renderHome();
        else if (AppState.currentTab === 'library') renderLibrary();
        else if (AppState.currentTab === 'canteen') renderCanteen();
        else if (AppState.currentTab === 'atm') renderAtm();
    }, 8000);
}

// ==========================================================================
// 10. Theme & Navigation Setup
// ==========================================================================

function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        AppState.theme = theme;
        localStorage.setItem('spacepulse_theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
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
            navigateTo(target);
        });
    });

    // Close seat modal
    document.getElementById('seat-modal-close').addEventListener('click', () => {
        document.getElementById('seat-modal').style.display = 'none';
    });

    // Close facility detail modal
    document.getElementById('fac-modal-close').addEventListener('click', () => {
        document.getElementById('facility-detail-modal').style.display = 'none';
    });

    // Reservation banner button handlers
    document.getElementById('res-view-map-btn').addEventListener('click', () => {
        if (AppState.activeReservation) {
            navigateTo('maps');
            switchFloor(AppState.activeReservation.floorId);
            switchMapMode('floorplans');
        }
    });

    document.getElementById('res-cancel-btn').addEventListener('click', cancelReservation);
}

// Check deep link hash upon page load (e.g. #facility?id=floor_ground)
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
// Initialization
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initChatbot();
    initAlerts();
    initSimulationEngine();
    updateReservationBanner();
    navigateTo('home');
    checkInitialDeepLink();
});
