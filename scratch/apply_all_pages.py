# -*- coding: utf-8 -*-
import os
import re

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

print("Initial code length:", len(code))

# =========================================================================
# 1. UPDATE renderHomeBannersHTML, renderDefaultHomeSectionsHTML, renderHome
# =========================================================================
new_home_code = """function renderHomeBannersHTML(stats, student) {
    return `
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
}"""

home_pattern = r'function renderHomeBannersHTML[\s\S]*?function renderHome\(\)\s*\{[\s\S]*?attachHomeEventListeners\(\);\s*if \(wasFocused\) \{[\s\S]*?\}\s*\}'
code = re.sub(home_pattern, new_home_code, code, count=1)
print("Home Dashboard renderers updated.")

# =========================================================================
# 2. UPDATE renderMaps() WITH 2-MODE SEGMENTED BAR, FLOOR CAD & HUD
# =========================================================================
new_render_maps = """const floorMetaMap = {
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
}"""

maps_pattern = r'function renderMaps\(\)\s*\{[\s\S]*?if \(AppState\.mapsSubTab === \'infrastructure\'\) \{[\s\S]*?\}\s*\}'
code = re.sub(maps_pattern, new_render_maps, code, count=1)
print("renderMaps() updated.")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)
