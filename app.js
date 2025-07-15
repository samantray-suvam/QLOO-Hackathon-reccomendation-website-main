// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const navItems = document.querySelectorAll('.nav-item');

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // TODO: Implement search functionality with QLOO API
        console.log('Searching for:', searchTerm);
        // You can add your search logic here
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
