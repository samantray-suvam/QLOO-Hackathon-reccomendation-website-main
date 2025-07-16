class BooksPage {
    constructor() {
        this.booksGrid = document.querySelector('.books-grid');
        this.currentBooks = [];
        this.initializeEventListeners();
        this.loadInitialBooks();
    }

    initializeEventListeners() {
        window.addEventListener('qlooSearchResults', async (event) => {
            await this.displayBooks(event.detail);
        });
    }

    createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        
        const imageUrl = book.cover_image || 'https://via.placeholder.com/300x450?text=No+Cover';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${book.title}" class="book-image">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author || 'Unknown Author'}</p>
                <div class="book-rating">${book.rating ? book.rating.toFixed(1) : 'N/A'}</div>
            </div>
        `;

        card.addEventListener('click', async () => {
            const recommendations = await this.getRecommendations(book.id);
            await this.displayBooks(recommendations);
        });

        return card;
    }

    async displayBooks(books) {
        this.booksGrid.innerHTML = '';
        this.currentBooks = books;
        
        if (!books || books.length === 0) {
            this.booksGrid.innerHTML = '<div class="no-results">No books found</div>';
            return;
        }

        books.forEach(book => {
            const card = this.createBookCard(book);
            this.booksGrid.appendChild(card);
        });
    }

    async getRecommendations(bookId) {
        try {
            const response = await fetch(`${QLOO_API_BASE_URL}/recommendations/books/${bookId}`, {
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

    async loadInitialBooks() {
        try {
            const response = await fetch(`${QLOO_API_BASE_URL}/discover/books`, {
                headers: {
                    'Authorization': `Bearer ${QLOO_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch popular books');
            }

            const data = await response.json();
            await this.displayBooks(data.results || []);
        } catch (error) {
            console.error('Error loading initial books:', error);
            this.booksGrid.innerHTML = '<div class="error">Failed to load books</div>';
        }
    }
}

// Initialize the books page
document.addEventListener('DOMContentLoaded', () => {
    new BooksPage();
});
