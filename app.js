// Local Data (Changed to 'let' so the backend can overwrite it)
let mockData = {
    library: [
        { floor: 'Second Down Floor', totalSeats: 100, availableSeats: 45 },
        { floor: 'First Down Floor', totalSeats: 150, availableSeats: 10 },
        { floor: 'Ground Floor', totalSeats: 200, availableSeats: 120 },
        { floor: 'First Floor', totalSeats: 120, availableSeats: 5 }
    ],
    canteen: [
        { name: 'Goda Uda', status: 'Open', personCount: 45, maxCapacity: 100 },
        { name: 'Goda Yata', status: 'Open', personCount: 85, maxCapacity: 120 },
        { name: 'Wala Canteen', status: 'Closed', personCount: 0, maxCapacity: 150 },
        { name: 'L Canteen', status: 'Open', personCount: 120, maxCapacity: 200 },
        { name: 'Civil Canteen', status: 'Open', personCount: 30, maxCapacity: 80 }
    ],
    atm: [
        { name: 'BOC ATM', status: 'Working', queueLength: 5 },
        { name: 'Peoples Bank ATM', status: 'Working', queueLength: 2 },
        { name: 'Commercial Bank ATM', status: 'Out of Order', queueLength: 0 }
    ],
    bookshop: [
        { name: 'Main Book Shop', status: 'Open', crowdedness: 'High' },
        { name: 'Engineering Book Shop', status: 'Open', crowdedness: 'Low' },
        { name: 'Science Book Shop', status: 'Closed', crowdedness: 'None' }
    ]
};

// DOM Elements
const contentArea = document.getElementById('content-area');
const pageTitle = document.getElementById('page-title');
const navLinks = document.querySelectorAll('.nav-links a');

// Render functions
function renderHome() {
    pageTitle.textContent = 'Welcome to Space Plus';
    contentArea.innerHTML = `
        <p>Select a facility to view current vacancies and availability.</p>
        <div class="home-menu">
            <button class="home-btn" data-target="library">
                <i class="fas fa-book-reader"></i> Library
            </button>
            <button class="home-btn" data-target="canteen">
                <i class="fas fa-utensils"></i> Canteens
            </button>
            <button class="home-btn" data-target="atm">
                <i class="fas fa-money-check-alt"></i> ATMs
            </button>
            <button class="home-btn" data-target="bookshop">
                <i class="fas fa-book"></i> Book Shops
            </button>
        </div>
    `;

    // Attach listeners to newly created home buttons
    document.querySelectorAll('.home-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-target');
            navigateTo(target);
        });
    });
}

function renderLibrary() {
    pageTitle.textContent = 'Library Status';
    let html = '<div class="dashboard-grid">';

    mockData.library.forEach(floor => {
        const occupancyRate = ((floor.totalSeats - floor.availableSeats) / floor.totalSeats) * 100;

        html += `
            <div class="card">
                <div class="card-header">
                    <h3>${floor.floor}</h3>
                    <i class="fas fa-book-reader" style="color: var(--primary-green); font-size: 1.5rem;"></i>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Total Seats:</span>
                    <span class="stat-value">${floor.totalSeats}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Available:</span>
                    <span class="stat-value available">${floor.availableSeats}</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${occupancyRate}%"></div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    contentArea.innerHTML = html;
}

function renderCanteen() {
    pageTitle.textContent = 'Canteen Status';
    let html = '<div class="dashboard-grid">';

    mockData.canteen.forEach(c => {
        const isOpen = c.status === 'Open';
        const badgeClass = isOpen ? 'status-open' : 'status-closed';
        const occupancyRate = (c.personCount / c.maxCapacity) * 100;

        html += `
            <div class="card">
                <div class="card-header">
                    <h3>${c.name}</h3>
                    <span class="status-badge ${badgeClass}">${c.status}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Persons Present:</span>
                    <span class="stat-value">${c.personCount}</span>
                </div>
                ${isOpen ? `
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${occupancyRate}%"></div>
                </div>
                ` : ''}
            </div>
        `;
    });

    html += '</div>';
    contentArea.innerHTML = html;
}

function renderAtm() {
    pageTitle.textContent = 'ATM Status';
    let html = '<div class="dashboard-grid">';

    mockData.atm.forEach(atm => {
        const isWorking = atm.status === 'Working';
        const badgeClass = isWorking ? 'status-open' : 'status-closed';

        html += `
            <div class="card">
                <div class="card-header">
                    <h3>${atm.name}</h3>
                    <span class="status-badge ${badgeClass}">${atm.status}</span>
                </div>
                ${isWorking ? `
                <div class="stat-row">
                    <span class="stat-label">Queue Length:</span>
                    <span class="stat-value">${atm.queueLength} persons</span>
                </div>
                ` : '<p style="color: var(--primary-blue);">Currently out of service.</p>'}
            </div>
        `;
    });

    html += '</div>';
    contentArea.innerHTML = html;
}

function renderBookshop() {
    pageTitle.textContent = 'Book Shops Status';
    let html = '<div class="dashboard-grid">';

    mockData.bookshop.forEach(shop => {
        const isOpen = shop.status === 'Open';
        const badgeClass = isOpen ? 'status-open' : 'status-closed';

        html += `
            <div class="card">
                <div class="card-header">
                    <h3>${shop.name}</h3>
                    <span class="status-badge ${badgeClass}">${shop.status}</span>
                </div>
                ${isOpen ? `
                <div class="stat-row">
                    <span class="stat-label">Crowdedness:</span>
                    <span class="stat-value">${shop.crowdedness}</span>
                </div>
                ` : '<p style="color: var(--primary-blue);">Currently closed.</p>'}
            </div>
        `;
    });

    html += '</div>';
    contentArea.innerHTML = html;
}

// Navigation Logic
function navigateTo(target) {
    // Update active nav link
    navLinks.forEach(link => {
        if(link.getAttribute('data-target') === target) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Render corresponding view
    switch(target) {
        case 'home':
            renderHome();
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
        default:
            renderHome();
    }
}

// Attach listeners to sidebar nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget.getAttribute('data-target');
        navigateTo(target);
    });
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});


// --- SPACEPULSE BACKEND API INTEGRATION ---
async function fetchLiveTelemetry() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/occupancy");
        
        if (response.ok) {
            // Overwrite the local data with the live server state
            mockData = await response.json();
            
            // Identify which tab the user is currently viewing
            const activeLink = document.querySelector('.nav-links a.active');
            if (activeLink) {
                const activeTab = activeLink.getAttribute('data-target');
                // Redraw the UI to reflect the new numbers without reloading the page
                navigateTo(activeTab);
            }
        }
    } catch (error) {
        console.error("Waiting for backend connection...", error);
    }
}

// Poll the FastAPI backend every 1000ms
setInterval(fetchLiveTelemetry, 1000);