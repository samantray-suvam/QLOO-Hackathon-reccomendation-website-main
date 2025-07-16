class SongsPage {
    constructor() {
        this.songsGrid = document.querySelector('.songs-grid');
        this.currentSongs = [];
        this.initializeEventListeners();
        this.loadInitialSongs();
    }

    initializeEventListeners() {
        window.addEventListener('qlooSearchResults', async (event) => {
            await this.displaySongs(event.detail);
        });
    }

    createSongCard(song) {
        const card = document.createElement('div');
        card.className = 'song-card';
        
        const imageUrl = song.album_art || 'https://via.placeholder.com/300x300?text=No+Album+Art';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${song.title}" class="song-image">
            <div class="song-info">
                <h3 class="song-title">${song.title}</h3>
                <p class="song-artist">${song.artist || 'Unknown Artist'}</p>
                <p class="song-album">${song.album || 'Single'}</p>
                <div class="song-rating">${song.rating ? song.rating.toFixed(1) : 'N/A'}</div>
            </div>
        `;

        card.addEventListener('click', async () => {
            const recommendations = await this.getRecommendations(song.id);
            await this.displaySongs(recommendations);
        });

        return card;
    }

    async displaySongs(songs) {
        this.songsGrid.innerHTML = '';
        this.currentSongs = songs;
        
        if (!songs || songs.length === 0) {
            this.songsGrid.innerHTML = '<div class="no-results">No songs found</div>';
            return;
        }

        songs.forEach(song => {
            const card = this.createSongCard(song);
            this.songsGrid.appendChild(card);
        });
    }

    async getRecommendations(songId) {
        try {
            const response = await fetch(`${QLOO_API_BASE_URL}/recommendations/songs/${songId}`, {
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

    async loadInitialSongs() {
        try {
            const response = await fetch(`${QLOO_API_BASE_URL}/discover/songs`, {
                headers: {
                    'Authorization': `Bearer ${QLOO_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch popular songs');
            }

            const data = await response.json();
            await this.displaySongs(data.results || []);
        } catch (error) {
            console.error('Error loading initial songs:', error);
            this.songsGrid.innerHTML = '<div class="error">Failed to load songs</div>';
        }
    }
}

// Initialize the songs page
document.addEventListener('DOMContentLoaded', () => {
    new SongsPage();
});
