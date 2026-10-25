# -*- coding: utf-8 -*-
import os
import re

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

print("Initial code length:", len(code))

# =========================================================================
# 1. NEW FLOOR SVG BLUEPRINT GENERATORS AND ZOOM HELPERS
# =========================================================================
new_floor_svgs = """let currentCadZoom = 1.0;

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
}"""

# Replace old renderFloorSvgHTML
floor_svg_pattern = r'function renderFloorSvgHTML\(floorId\)[\s\S]*?\n\}'
code = re.sub(floor_svg_pattern, new_floor_svgs, code, count=1)
print("Floor SVG Blueprints integrated.")

# =========================================================================
# 2. UPDATE createCanteenCardHTML (Page 6) AND createAtmCardHTML (Page 7)
# =========================================================================
new_canteen_card = """function createCanteenCardHTML(c) {
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
}"""

code = re.sub(r'function createCanteenCardHTML\(c\)[\s\S]*?\n\}', new_canteen_card, code, count=1)
print("createCanteenCardHTML updated.")

new_atm_card = """function createAtmCardHTML(a) {
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
}"""

code = re.sub(r'function createAtmCardHTML\(a\)[\s\S]*?\n\}', new_atm_card, code, count=1)
print("createAtmCardHTML updated.")

# =========================================================================
# 3. UPDATE initTrendsCharts() (Page 10: Colors & Thresholds)
# =========================================================================
new_trends_charts = """function initTrendsCharts() {
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
}"""

code = re.sub(r'function initTrendsCharts\(\)[\s\S]*?\n\}', new_trends_charts, code, count=1)
print("initTrendsCharts updated.")

# =========================================================================
# 4. ADD KIOSK / TELEMETRY SHOWCASE (Page 11) & LIVE BACKEND SYNC
# =========================================================================
kiosk_and_sync_code = """
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
"""

# Append kiosk_and_sync_code before printQrCard or at end
code += kiosk_and_sync_code
print("Kiosk and Backend Sync added.")

# =========================================================================
# 5. UPDATE navigateTo(target) TO INCLUDE 'kiosk'
# =========================================================================
code = code.replace(
    "case 'trends':\n            renderTrends();\n            break;",
    "case 'trends':\n            renderTrends();\n            break;\n        case 'kiosk':\n            renderKiosk();\n            break;"
)
print("navigateTo updated with 'kiosk'.")

# =========================================================================
# 6. UPDATE DOMContentLoaded TO REMOVE showStudentLoginPage() & CALL initBackendSync()
# =========================================================================
old_dom = """document.addEventListener('DOMContentLoaded', () => {
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
});"""

new_dom = """document.addEventListener('DOMContentLoaded', () => {
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
});"""

code = code.replace(old_dom, new_dom)
print("DOMContentLoaded updated.")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("All updates successfully written to app.js!")
