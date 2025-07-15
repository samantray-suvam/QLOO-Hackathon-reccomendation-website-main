// DOM Elements
const moviesGrid = document.querySelector('.movies-grid');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

// Sample data (replace with QLOO API data)
const sampleMovies = [
    {
        title: 'Sample Movie 1',
        year: 2023,
        image: 'https://via.placeholder.com/300x450'
    },
    // Add more sample movies here
];

// Functions
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}" class="movie-image">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-year">${movie.year}</p>
        </div>
    `;

    card.addEventListener('click', () => {
        // TODO: Implement navigation to movie details page
        window.location.href = `movie-details.html?id=${movie.id}`;
    });

    return card;
}

function displayMovies(movies) {
    moviesGrid.innerHTML = '';
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        moviesGrid.appendChild(card);
    });
}

// Event Listeners
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // TODO: Implement search with QLOO API
        console.log('Searching for:', searchTerm);
    }
}

// Initial load
// TODO: Replace with actual API call
displayMovies(sampleMovies);
