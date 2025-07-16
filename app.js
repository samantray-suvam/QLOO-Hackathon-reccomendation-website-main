// QLOO API Configuration
const QLOO_API_KEY = 'your_qloo_api_key_here';
const QLOO_API_BASE_URL = 'https://api.qloo.com/v1';

// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const navItems = document.querySelectorAll('.nav-item');

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// QLOO API Functions
async function searchQLOO(query, type) {
    try {
        const response = await fetch(`${QLOO_API_BASE_URL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${QLOO_API_KEY}`
            },
            body: JSON.stringify({
                query: query,
                type: type,
                limit: 20
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching QLOO:', error);
        return [];
    }
}

async function getRecommendations(itemId, type) {
    try {
        const response = await fetch(`${QLOO_API_BASE_URL}/recommendations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${QLOO_API_KEY}`
            },
            body: JSON.stringify({
                item_id: itemId,
                type: type,
                limit: 10
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.recommendations;
    } catch (error) {
        console.error('Error getting recommendations:', error);
        return [];
    }
}

// Search functionality
async function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        const currentPage = window.location.pathname.split('/').pop().split('.')[0];
        const type = currentPage === 'index' ? 'all' : currentPage;
        
        const results = await searchQLOO(searchTerm, type);
        // Emit custom event for page-specific handling
        window.dispatchEvent(new CustomEvent('qlooSearchResults', { detail: results }));
    }
}

// Event Listeners for search
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission if within a form
        handleSearch();
        searchButton.classList.add('button-pressed'); // Add visual feedback
        setTimeout(() => {
            searchButton.classList.remove('button-pressed');
        }, 200);
    }
});

function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // TODO: Implement search functionality with QLOO API
        console.log('Searching for:', searchTerm);
    }
}

// Add hover effect to nav items
navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-2px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});
