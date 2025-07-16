class MoviesPage {
    constructor() {
        this.moviesGrid = document.querySelector('.movies-grid');
        this.currentMovies = [];
        this.initializeEventListeners();
        this.loadInitialMovies();
    }

    initializeEventListeners() {
        window.addEventListener('qlooSearchResults', async (event) => {
            await this.displayMovies(event.detail);
        });
    }

    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        const imageUrl = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/300x450';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${movie.title}" class="movie-image">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-year">${new Date(movie.release_date).getFullYear()}</p>
                <div class="movie-rating">${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</div>
            </div>
        `;

        card.addEventListener('click', async () => {
            const recommendations = await this.getRecommendations(movie.id);
            await this.displayMovies(recommendations);
        });

        return card;
    }

    async displayMovies(movies) {
        this.moviesGrid.innerHTML = '';
        this.currentMovies = movies;
        
        if (!movies || movies.length === 0) {
            this.moviesGrid.innerHTML = '<div class="no-results">No movies found</div>';
            return;
        }

        movies.forEach(movie => {
            const card = this.createMovieCard(movie);
            this.moviesGrid.appendChild(card);
        });
    }

    async getRecommendations(movieId) {
        try {
            const response = await fetch(`${QLOO_API_BASE_URL}/recommendations/movies/${movieId}`, {
                headers: {
                    'Authorization': `Bearer ${QLOO_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }

            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error getting recommendations:', error);
            return [];
        }
    }

    async loadInitialMovies() {
        try {
            const response = await fetch(`${QLOO_API_BASE_URL}/discover/movie`, {
                headers: {
                    'Authorization': `Bearer ${QLOO_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch popular movies');
            }

            const data = await response.json();
            await this.displayMovies(data.results || []);
        } catch (error) {
            console.error('Error loading initial movies:', error);
            this.moviesGrid.innerHTML = '<div class="error">Failed to load movies</div>';
        }
    }
}

// Initialize the movies page
document.addEventListener('DOMContentLoaded', () => {
    new MoviesPage();
});
