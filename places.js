class PlacesPage {
    constructor() {
        this.placesGrid = document.querySelector('.places-grid');
        this.currentPlaces = [];
        this.initializeEventListeners();
        this.loadInitialPlaces();
    }

    initializeEventListeners() {
        window.addEventListener('qlooSearchResults', async (event) => {
            await this.displayPlaces(event.detail);
        });
    }

    createPlaceCard(place) {
        const card = document.createElement('div');
        card.className = 'place-card';
        
        const imageUrl = place.image_url || 'https://via.placeholder.com/300x200?text=No+Image';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${place.name}" class="place-image">
            <div class="place-info">
                <h3 class="place-name">${place.name}</h3>
                <p class="place-location">${place.location || 'Location Unknown'}</p>
                <p class="place-type">${place.type || 'Tourist Attraction'}</p>
                <div class="place-rating">${place.rating ? place.rating.toFixed(1) : 'N/A'}</div>
            </div>
        `;

        card.addEventListener('click', async () => {
            const recommendations = await this.getRecommendations(place.id);
            await this.displayPlaces(recommendations);
        });

        return card;
    }

    async displayPlaces(places) {
        this.placesGrid.innerHTML = '';
        this.currentPlaces = places;
        
        if (!places || places.length === 0) {
            this.placesGrid.innerHTML = '<div class="no-results">No places found</div>';
            return;
        }

        places.forEach(place => {
            const card = this.createPlaceCard(place);
            this.placesGrid.appendChild(card);
        });
    }

    async getRecommendations(placeId) {
        try {
            const response = await fetch(`${QLOO_API_BASE_URL}/recommendations/places/${placeId}`, {
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

    async loadInitialPlaces() {
        try {
            const response = await fetch(`${QLOO_API_BASE_URL}/discover/places`, {
                headers: {
                    'Authorization': `Bearer ${QLOO_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch popular places');
            }

            const data = await response.json();
            await this.displayPlaces(data.results || []);
        } catch (error) {
            console.error('Error loading initial places:', error);
            this.placesGrid.innerHTML = '<div class="error">Failed to load places</div>';
        }
    }
}

// Initialize the places page
document.addEventListener('DOMContentLoaded', () => {
    new PlacesPage();
});
