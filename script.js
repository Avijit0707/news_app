// ===========================
// GLOBAL VARIABLES & CONFIG
// ===========================
const CONFIG = {
    // NewsAPI.org API configuration
    API_KEY: 'd0616f5b1ead4984bb9c75b99b8c9eee', // Replace with your actual API key
    BASE_URL: 'https://newsapi.org/v2',
    // CORS Proxy fallback for deployment issues
    CORS_PROXY: 'https://api.allorigins.win/raw?url=',
    DEFAULT_COUNTRY: 'us',
    DEFAULT_CATEGORY: 'general',
    
    PAGE_SIZE: 20,
    
    // Local storage keys
    STORAGE_KEYS: {
        THEME: 'news-portal-theme',
        LANGUAGE: 'news-portal-language',
        FAVORITES: 'news-portal-favorites'
    }
};

// Global state management
const AppState = {
    currentPage: 1,
    currentCategory: 'general',
    currentSearchQuery: '',
    isLoadingNews: false,
    newsArticles: [],
    favoriteArticles: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES)) || [],
    currentLanguage: localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE) || 'en',
    showingFavorites: false,
    navigationHistory: JSON.parse(localStorage.getItem('nav-history') || '[]')
};

// ===========================
// MULTILINGUAL SUPPORT
// ===========================
const translations = {
    en: {
        'college-name': 'Excellence University News Portal',
        'home': 'Home',
        'contact': 'Contact Us',
        'hero-title': 'Stay Updated with Latest News',
        'hero-subtitle': 'Get the most recent news from around the world',
        'search-placeholder': 'Search for news...',
        'general': 'General',
        'business': 'Business',
        'technology': 'Technology',
        'sports': 'Sports',
        'health': 'Health',
        'entertainment': 'Entertainment',
        'latest-news': 'Latest News',
        'view-favorites': 'View Favorites',
        'view-all-news': 'View All News',
        'loading': 'Loading news...',
        'load-more': 'Load More News',
        'by': 'By',
        'source': 'Source',
        'read-more': 'Read More',
        'add-to-favorites': 'Add to Favorites',
        'remove-from-favorites': 'Remove from Favorites',
        'share': 'Share',
        'back-to-news': 'Back to News',
        'read-full-article': 'Read Full Article at Source',
        'related-articles': 'Related Articles',
        'no-news-found': 'No news articles found',
        'error-loading-news': 'Error loading news. Please try again later.',
        'article-not-found': 'Article not found or no longer available.',
        'contact-title': 'Contact Us',
        'contact-subtitle': "We'd love to hear from you. Send us a message!",
        'name-label': 'Full Name',
        'name-placeholder': 'Enter your full name',
        'email-label': 'Email Address',
        'email-placeholder': 'Enter your email address',
        'subject-label': 'Subject',
        'subject-placeholder': 'Select a subject',
        'message-label': 'Message',
        'message-placeholder': 'Enter your message here...',
        'send-message-btn': 'Send Message',
        'sending': 'Sending...',
        'message-sent': 'Thank you! Your message has been sent successfully.',
        'footer-description': 'Your trusted source for the latest news and updates.',
        'quick-links': 'Quick Links',
        'connect': 'Connect With Us',
        'rights': 'All rights reserved.'
    },
    hi: {
        'college-name': 'एक्सीलेंस यूनिवर्सिटी न्यूज पोर्टल',
        'home': 'होम',
        'contact': 'संपर्क करें',
        'hero-title': 'ताज़ा समाचारों के साथ अपडेट रहें',
        'hero-subtitle': 'दुनिया भर की नवीनतम खबरें प्राप्त करें',
        'search-placeholder': 'समाचार खोजें...',
        'general': 'सामान्य',
        'business': 'व्यापार',
        'technology': 'तकनीक',
        'sports': 'खेल',
        'health': 'स्वास्थ्य',
        'entertainment': 'मनोरंजन',
        'latest-news': 'ताज़ा समाचार',
        'view-favorites': 'पसंदीदा देखें',
        'view-all-news': 'सभी समाचार देखें',
        'loading': 'समाचार लोड हो रहे हैं...',
        'load-more': 'और समाचार लोड करें',
        'by': 'द्वारा',
        'source': 'स्रोत',
        'read-more': 'और पढ़ें',
        'add-to-favorites': 'पसंदीदा में जोड़ें',
        'remove-from-favorites': 'पसंदीदा से हटाएं',
        'share': 'साझा करें',
        'back-to-news': 'समाचार पर वापस जाएं',
        'read-full-article': 'स्रोत पर पूरा लेख पढ़ें',
        'related-articles': 'संबंधित लेख',
        'no-news-found': 'कोई समाचार लेख नहीं मिला',
        'error-loading-news': 'समाचार लोड करने में त्रुटि। कृपया बाद में पुनः प्रयास करें।',
        'article-not-found': 'लेख नहीं मिला या अब उपलब्ध नहीं है।',
        'contact-title': 'संपर्क करें',
        'contact-subtitle': 'हम आपसे सुनना चाहते हैं। हमें संदेश भेजें!',
        'name-label': 'पूरा नाम',
        'name-placeholder': 'अपना पूरा नाम दर्ज करें',
        'email-label': 'ईमेल पता',
        'email-placeholder': 'अपना ईमेल पता दर्ज करें',
        'subject-label': 'विषय',
        'subject-placeholder': 'एक विषय चुनें',
        'message-label': 'संदेश',
        'message-placeholder': 'यहाँ अपना संदेश दर्ज करें...',
        'send-message-btn': 'संदेश भेजें',
        'sending': 'भेजा जा रहा है...',
        'message-sent': 'धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।',
        'footer-description': 'नवीनतम समाचार और अपडेट के लिए आपका भरोसेमंद स्रोत।',
        'quick-links': 'त्वरित लिंक',
        'connect': 'हमसे जुड़ें',
        'rights': 'सभी अधिकार सुरक्षित।'
    }
};

// ===========================
// UTILITY FUNCTIONS
// ===========================
function translatePage(language = AppState.currentLanguage) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
    // Handle placeholder translations
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[language] && translations[language][key]) {
            element.placeholder = translations[language][key];
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(AppState.currentLanguage === 'hi' ? 'hi-IN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getTimeAgo(dateString) {
    const now = new Date();
    const articleDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - articleDate) / 1000);
    
    const intervals = [
        { label: AppState.currentLanguage === 'hi' ? 'साल' : 'year', seconds: 31536000 },
        { label: AppState.currentLanguage === 'hi' ? 'महीना' : 'month', seconds: 2592000 },
        { label: AppState.currentLanguage === 'hi' ? 'दिन' : 'day', seconds: 86400 },
        { label: AppState.currentLanguage === 'hi' ? 'घंटा' : 'hour', seconds: 3600 },
        { label: AppState.currentLanguage === 'hi' ? 'मिनट' : 'minute', seconds: 60 }
    ];
    
    for (let interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            const suffix = AppState.currentLanguage === 'hi' ? 'पहले' : 'ago';
            return `${count} ${interval.label}${count > 1 && AppState.currentLanguage === 'en' ? 's' : ''} ${suffix}`;
        }
    }
    
    return AppState.currentLanguage === 'hi' ? 'अभी' : 'just now';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--info-color)'};
        color: white;
        padding: 1rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Remove on click
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
}

// ===========================
// NEWS API FUNCTIONS
// ===========================
async function fetchNews(category = AppState.currentCategory, searchQuery = '', page = 1) {
    try {
        AppState.isLoadingNews = true;
        showLoadingSpinner(true);
        
        let url = `${CONFIG.BASE_URL}/top-headlines?`;
        
        if (searchQuery.trim()) {
            url = `${CONFIG.BASE_URL}/everything?q=${encodeURIComponent(searchQuery)}&`;
        } else {
            url += `category=${category}&country=${CONFIG.DEFAULT_COUNTRY}&`;
        }
        
        url += `apiKey=${CONFIG.API_KEY}&pageSize=${CONFIG.PAGE_SIZE}&page=${page}&sortBy=publishedAt`;
        
        // Try direct API call first
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'NewsPortal/1.0',
            }
        });
        
        // If direct call fails with CORS/426 error, try with CORS proxy
        if (!response.ok && (response.status === 426 || response.status === 0)) {
            console.log('Direct API call failed, trying CORS proxy...');
            const proxiedUrl = `${CONFIG.CORS_PROXY}${encodeURIComponent(url)}`;
            response = await fetch(proxiedUrl);
        }
        
        if (!response.ok) {
            // Provide specific error messages for different status codes
            let errorMessage = 'Failed to fetch news';
            switch (response.status) {
                case 426:
                    errorMessage = 'HTTPS required - API access blocked. Please deploy on HTTPS or use a CORS proxy.';
                    break;
                case 429:
                    errorMessage = 'API rate limit exceeded. Please try again later.';
                    break;
                case 401:
                    errorMessage = 'Invalid API key. Please check your NewsAPI key.';
                    break;
                case 403:
                    errorMessage = 'API access forbidden. Check your NewsAPI plan.';
                    break;
                default:
                    errorMessage = `HTTP error! status: ${response.status}`;
            }
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        if (data.status === 'error') {
            throw new Error(data.message || 'API Error');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        
        // Show specific error message if available
        const errorMsg = error.message.includes('426') ? 
            'News service requires HTTPS. Please access this site via HTTPS or contact support.' :
            translations[AppState.currentLanguage]['error-loading-news'];
            
        showNotification(errorMsg, 'error');
        
        // Return mock data for development/demo purposes when API fails
        return getMockNewsData();
    } finally {
        AppState.isLoadingNews = false;
        showLoadingSpinner(false);
    }
}

// Mock data function for fallback when API is not accessible
function getMockNewsData() {
    return {
        articles: [
            {
                title: "Sample News Article 1",
                description: "This is a sample news article for demonstration purposes. The actual NewsAPI requires HTTPS access.",
                url: "https://example.com/news1",
                urlToImage: "https://via.placeholder.com/400x300/2563eb/ffffff?text=Sample+News+1",
                publishedAt: new Date().toISOString(),
                source: { name: "Sample Source" },
                author: "Demo Author",
                content: "This is sample content for the news article..."
            },
            {
                title: "Sample News Article 2", 
                description: "Another sample news article. To access real news, ensure your site is served over HTTPS.",
                url: "https://example.com/news2",
                urlToImage: "https://via.placeholder.com/400x300/10b981/ffffff?text=Sample+News+2",
                publishedAt: new Date(Date.now() - 3600000).toISOString(),
                source: { name: "Demo News" },
                author: "Sample Reporter",
                content: "Sample content for demonstration purposes..."
            },
            {
                title: "Technology Update Sample",
                description: "Sample technology news article. Deploy this project on HTTPS to access real NewsAPI data.",
                url: "https://example.com/news3", 
                urlToImage: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Tech+News",
                publishedAt: new Date(Date.now() - 7200000).toISOString(),
                source: { name: "Tech Weekly" },
                author: "Tech Writer",
                content: "Sample technology content..."
            }
        ],
        totalResults: 3
    };
}

async function loadNews(reset = false) {
    if (AppState.isLoadingNews) return;
    
    if (reset) {
        AppState.currentPage = 1;
        AppState.newsArticles = [];
    }
    
    const data = await fetchNews(AppState.currentCategory, AppState.currentSearchQuery, AppState.currentPage);
    
    if (data.articles && data.articles.length > 0) {
        // Filter out articles with null/undefined values
        const validArticles = data.articles.filter(article => 
            article.title && 
            article.title !== '[Removed]' &&
            article.description &&
            article.url
        );
        
        if (reset) {
            AppState.newsArticles = validArticles;
        } else {
            AppState.newsArticles.push(...validArticles);
        }
        
        renderNewsGrid(AppState.newsArticles);
        
        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = validArticles.length >= CONFIG.PAGE_SIZE ? 'block' : 'none';
        }
    } else if (reset) {
        // No articles found
        renderNewsGrid([]);
    }
}

// ===========================
// DOM MANIPULATION FUNCTIONS
// ===========================
function showLoadingSpinner(show) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = show ? 'block' : 'none';
    }
}

function createNewsCard(article, index) {
    const isFavorite = AppState.favoriteArticles.some(fav => fav.url === article.url);
    
    // Better fallback image with multiple options
    let imageUrl = article.urlToImage;
    
    // If no image or invalid image URL, use fallback
    if (!imageUrl || imageUrl.includes('removed') || imageUrl === 'null') {
        imageUrl = `https://via.placeholder.com/400x300/2563eb/ffffff?text=${encodeURIComponent(article.source?.name || 'News')}`;
    }
    
    const defaultImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="200" y="150" text-anchor="middle" dy=".3em" fill="%2364748b" font-family="sans-serif" font-size="16"%3ENo Image Available%3C/text%3E%3C/svg%3E';
    
    // Create unique identifiers for this article
    const articleId = `article-${Date.now()}-${index}`;
    
    // Store article data safely
    window.tempArticleData = window.tempArticleData || {};
    window.tempArticleData[articleId] = article;
    
    return `
        <article class="news-card fade-in" data-article-id="${articleId}" 
                 style="animation-delay: ${index * 0.1}s">
            <button class="favorite-btn-card ${isFavorite ? 'active' : ''}" 
                    data-article-id="${articleId}" data-action="favorite"
                    title="${isFavorite ? translations[AppState.currentLanguage]['remove-from-favorites'] : translations[AppState.currentLanguage]['add-to-favorites']}">
                <i class="fas fa-heart"></i>
            </button>
            <img class="news-card-image" 
                 src="${imageUrl}" 
                 alt="${article.title?.replace(/"/g, '&quot;') || 'News Article'}"
                 onerror="this.onerror=null; this.src='${defaultImage}'; console.log('Image failed to load:', this.src);">
            <div class="news-card-content">
                <div class="news-card-category">${article.source?.name || 'Unknown'}</div>
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-description">${article.description || ''}</p>
                <div class="news-card-meta">
                    <span class="news-card-source">${article.author || 'Unknown Author'}</span>
                    <span class="news-card-date">
                        <i class="fas fa-clock"></i>
                        ${getTimeAgo(article.publishedAt)}
                    </span>
                </div>
            </div>
        </article>
    `;
}

function renderNewsGrid(articles) {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;
    
    if (articles.length === 0) {
        newsGrid.innerHTML = `
            <div class="no-news-message">
                <i class="fas fa-newspaper" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3>${translations[AppState.currentLanguage]['no-news-found']}</h3>
                <p>Try adjusting your search criteria or check back later.</p>
            </div>
        `;
        return;
    }
    
    const articlesToShow = AppState.showingFavorites ? AppState.favoriteArticles : articles;
    newsGrid.innerHTML = articlesToShow.map((article, index) => createNewsCard(article, index)).join('');
    
    // Add event listeners after rendering
    addNewsCardEventListeners();
}

// Add event listeners to news cards
function addNewsCardEventListeners(container = null) {
    // Add click listeners to news cards
    const targetContainer = container || document;
    targetContainer.querySelectorAll('.news-card').forEach(card => {
        const articleId = card.getAttribute('data-article-id');
        if (articleId && window.tempArticleData && window.tempArticleData[articleId]) {
            card.addEventListener('click', (event) => {
                // Don't trigger if clicking on favorite button
                if (event.target.closest('.favorite-btn-card')) return;
                
                const article = window.tempArticleData[articleId];
                openArticleDetailsFromData(article);
            });
        }
    });
    
    // Add click listeners to favorite buttons
    targetContainer.querySelectorAll('.favorite-btn-card').forEach(btn => {
        const articleId = btn.getAttribute('data-article-id');
        if (articleId && window.tempArticleData && window.tempArticleData[articleId]) {
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                const article = window.tempArticleData[articleId];
                toggleFavoriteFromData(article);
            });
        }
    });
}

function openArticleDetailsFromData(article) {
    try {
        // Store article data in localStorage for details page
        localStorage.setItem('current-article', JSON.stringify(article));
        
        // Simple navigation: just go to details page
        window.location.href = 'details.html';
    } catch (error) {
        console.error('Error opening article details:', error);
        showNotification('Error opening article details', 'error');
    }
}

function openArticleDetails(encodedArticle) {
    try {
        const article = JSON.parse(decodeURIComponent(encodedArticle));
        
        // Store article data in localStorage for details page
        localStorage.setItem('current-article', JSON.stringify(article));
        
        // Simple navigation: just go to details page
        window.location.href = 'details.html';
    } catch (error) {
        console.error('Error opening article details:', error);
        showNotification('Error opening article details', 'error');
    }
}

// ===========================
// FAVORITES FUNCTIONALITY
// ===========================
function toggleFavorite(encodedArticle) {
    try {
        const article = JSON.parse(decodeURIComponent(encodedArticle));
        
        const existingIndex = AppState.favoriteArticles.findIndex(fav => fav.url === article.url);
        
        if (existingIndex !== -1) {
            // Remove from favorites
            AppState.favoriteArticles.splice(existingIndex, 1);
            showNotification(translations[AppState.currentLanguage]['remove-from-favorites'], 'success');
        } else {
            // Add to favorites
            AppState.favoriteArticles.push(article);
            showNotification(translations[AppState.currentLanguage]['add-to-favorites'], 'success');
        }
        
        // Save to localStorage
        localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(AppState.favoriteArticles));
        
        // Re-render the current view
        if (AppState.showingFavorites) {
            renderNewsGrid(AppState.favoriteArticles);
        } else {
            renderNewsGrid(AppState.newsArticles);
        }
        
        // Update favorites button text
        updateFavoritesButton();
    } catch (error) {
        console.error('Error toggling favorite:', error);
        showNotification('Error updating favorites', 'error');
    }
}

function toggleFavoriteFromData(article) {
    try {
        const existingIndex = AppState.favoriteArticles.findIndex(fav => fav.url === article.url);
        
        if (existingIndex !== -1) {
            // Remove from favorites
            AppState.favoriteArticles.splice(existingIndex, 1);
            showNotification(translations[AppState.currentLanguage]['remove-from-favorites'], 'success');
        } else {
            // Add to favorites
            AppState.favoriteArticles.push(article);
            showNotification(translations[AppState.currentLanguage]['add-to-favorites'], 'success');
        }
        
        // Save to localStorage
        localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(AppState.favoriteArticles));
        
        // Re-render the current view
        if (AppState.showingFavorites) {
            renderNewsGrid(AppState.favoriteArticles);
        } else {
            renderNewsGrid(AppState.newsArticles);
        }
        
        // Update favorites button text
        updateFavoritesButton();
    } catch (error) {
        console.error('Error toggling favorite:', error);
        showNotification('Error updating favorites', 'error');
    }
}

function toggleFavoritesView() {
    AppState.showingFavorites = !AppState.showingFavorites;
    
    if (AppState.showingFavorites) {
        renderNewsGrid(AppState.favoriteArticles);
    } else {
        renderNewsGrid(AppState.newsArticles);
    }
    
    updateFavoritesButton();
}

function updateFavoritesButton() {
    const favoritesBtn = document.getElementById('favorites-toggle');
    if (favoritesBtn) {
        const textSpan = favoritesBtn.querySelector('span');
        if (textSpan) {
            textSpan.textContent = AppState.showingFavorites ? 
                translations[AppState.currentLanguage]['view-all-news'] : 
                translations[AppState.currentLanguage]['view-favorites'];
        }
    }
}

// ===========================
// THEME MANAGEMENT
// ===========================
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, newTheme);
    
    // Update theme toggle icon
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// ===========================
// NAVIGATION & MOBILE MENU
// ===========================
function initializeNavigation() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navMenu && mobileMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// ===========================
// SEARCH FUNCTIONALITY
// ===========================
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        // Search button click
        searchBtn.addEventListener('click', performSearch);
        
        // Enter key press in search input
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
        
        // Clear search when input is empty
        searchInput.addEventListener('input', (event) => {
            if (event.target.value.trim() === '') {
                AppState.currentSearchQuery = '';
                AppState.currentCategory = 'general';
                loadNews(true);
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    if (!query) return;
    
    AppState.currentSearchQuery = query;
    AppState.showingFavorites = false;
    updateFavoritesButton();
    
    loadNews(true);
}

// ===========================
// CATEGORY FILTERING
// ===========================
function initializeCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update state and load news
            AppState.currentCategory = btn.getAttribute('data-category');
            AppState.currentSearchQuery = '';
            AppState.showingFavorites = false;
            
            // Clear search input
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';
            
            updateFavoritesButton();
            loadNews(true);
        });
    });
}

// ===========================
// LANGUAGE SWITCHING
// ===========================
function initializeLanguageSwitch() {
    const languageSelect = document.getElementById('language-select');
    
    if (languageSelect) {
        languageSelect.value = AppState.currentLanguage;
        
        languageSelect.addEventListener('change', (event) => {
            AppState.currentLanguage = event.target.value;
            localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE, AppState.currentLanguage);
            translatePage();
            
            // Reload news to update time formatting
            if (AppState.newsArticles.length > 0) {
                renderNewsGrid(AppState.newsArticles);
            }
        });
    }
}

// ===========================
// CONTACT FORM FUNCTIONALITY
// ===========================
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field.type || field.tagName.toLowerCase()) {
        case 'text':
            if (field.name === 'name' && value.length < 2) {
                isValid = false;
                errorMessage = AppState.currentLanguage === 'hi' ? 
                    'नाम कम से कम 2 अक्षर का होना चाहिए' : 
                    'Name must be at least 2 characters long';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = AppState.currentLanguage === 'hi' ? 
                    'कृपया एक वैध ईमेल पता दर्ज करें' : 
                    'Please enter a valid email address';
            }
            break;
            
        case 'select':
            if (!value) {
                isValid = false;
                errorMessage = AppState.currentLanguage === 'hi' ? 
                    'कृपया एक विषय चुनें' : 
                    'Please select a subject';
            }
            break;
            
        case 'textarea':
            if (value.length < 10) {
                isValid = false;
                errorMessage = AppState.currentLanguage === 'hi' ? 
                    'संदेश कम से कम 10 अक्षर का होना चाहिए' : 
                    'Message must be at least 10 characters long';
            }
            break;
            
        case 'checkbox':
            if (field.name === 'privacy' && !field.checked) {
                isValid = false;
                errorMessage = AppState.currentLanguage === 'hi' ? 
                    'कृपया गोपनीयता नीति से सहमति दें' : 
                    'Please agree to the privacy policy';
            }
            break;
    }
    
    showFieldError(field, isValid ? '' : errorMessage);
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
    }
    
    field.classList.toggle('error', !!message);
}

function clearFieldError(field) {
    showFieldError(field, '');
}

async function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submit-btn');
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification(
            AppState.currentLanguage === 'hi' ? 
                'कृपया सभी फ़ील्ड्स को सही तरीके से भरें' : 
                'Please fill all fields correctly', 
            'error'
        );
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'flex';
    
    try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.style.display = 'flex';
            formMessage.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Reset form
        form.reset();
        
        showNotification(
            translations[AppState.currentLanguage]['message-sent'], 
            'success'
        );
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification(
            AppState.currentLanguage === 'hi' ? 
                'संदेश भेजने में त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।' : 
                'Error sending message. Please try again later.', 
            'error'
        );
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'block';
        if (btnLoading) btnLoading.style.display = 'none';
    }
}

// ===========================
// ARTICLE DETAILS PAGE
// ===========================
function initializeDetailsPage() {
    // Load article from localStorage
    const articleData = localStorage.getItem('current-article');
    
    if (!articleData) {
        showArticleError();
        return;
    }
    
    try {
        const article = JSON.parse(articleData);
        renderArticleDetails(article);
        loadRelatedArticles(article);
    } catch (error) {
        console.error('Error loading article:', error);
        showArticleError();
    }
    
    // Initialize back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
           
                window.location.href = 'index.html';
            
        });
    }
}

function renderArticleDetails(article) {
    const articleContent = document.getElementById('article-content');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if (!articleContent || !loadingSpinner) return;
    
    // Hide loading spinner
    loadingSpinner.style.display = 'none';
    
    // Show article content
    articleContent.style.display = 'block';
    
    // Populate article data
    const elements = {
        'article-category': article.source?.name || 'Unknown Source',
        'article-title': article.title,
        'article-author': article.author || 'Unknown Author',
        'article-date': formatDate(article.publishedAt),
        'article-source': article.source?.name || 'Unknown Source',
        'article-description': article.description || '',
        'article-full-content': article.content ? article.content.split('[+')[0] : article.description || ''
    };
    
    Object.entries(elements).forEach(([id, content]) => {
        const element = document.getElementById(id);
        if (element && content) {
            element.textContent = content;
        }
    });
    
    // Set article image with better handling
    const articleImage = document.getElementById('article-image');
    if (articleImage) {
        let imageUrl = article.urlToImage;
        
        // Check if image URL is valid
        if (!imageUrl || imageUrl.includes('removed') || imageUrl === 'null' || imageUrl.trim() === '') {
            // Use placeholder with source name
            const sourceName = (article.source?.name || 'News Article').replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 20);
            imageUrl = `https://via.placeholder.com/800x400/2563eb/ffffff?text=${encodeURIComponent(sourceName)}`;
        }
        
        articleImage.src = imageUrl;
        articleImage.alt = (article.title || 'News Article').replace(/"/g, '');
        
        // Add error handling for article image
        articleImage.onerror = function() {
            this.onerror = null; // Prevent infinite loop
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23e2e8f0"/%3E%3Ctext x="400" y="200" text-anchor="middle" dy=".3em" fill="%2364748b" font-family="sans-serif" font-size="24"%3EImage Not Available%3C/text%3E%3C/svg%3E';
        };
        
        articleImage.style.display = 'block';
    }
    
    // Set read full article link
    const readFullArticle = document.getElementById('read-full-article');
    if (readFullArticle && article.url) {
        readFullArticle.href = article.url;
    }
    
    // Initialize favorite button
    initializeArticleFavoriteButton(article);
    
    // Initialize share button
    initializeArticleShareButton(article);
}

function initializeArticleFavoriteButton(article) {
    const favoriteBtn = document.getElementById('favorite-btn');
    if (!favoriteBtn) return;
    
    const isFavorite = AppState.favoriteArticles.some(fav => fav.url === article.url);
    
    // Update button appearance
    favoriteBtn.classList.toggle('active', isFavorite);
    const btnText = favoriteBtn.querySelector('span');
    if (btnText) {
        btnText.textContent = isFavorite ? 
            translations[AppState.currentLanguage]['remove-from-favorites'] : 
            translations[AppState.currentLanguage]['add-to-favorites'];
    }
    
    // Add click handler
    favoriteBtn.addEventListener('click', () => {
        toggleFavorite(encodeURIComponent(JSON.stringify(article)));
        
        // Update button immediately
        const newIsFavorite = AppState.favoriteArticles.some(fav => fav.url === article.url);
        favoriteBtn.classList.toggle('active', newIsFavorite);
        if (btnText) {
            btnText.textContent = newIsFavorite ? 
                translations[AppState.currentLanguage]['remove-from-favorites'] : 
                translations[AppState.currentLanguage]['add-to-favorites'];
        }
    });
}

function initializeArticleShareButton(article) {
    const shareBtn = document.getElementById('share-btn');
    if (!shareBtn) return;
    
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            // Use native Web Share API if available
            navigator.share({
                title: article.title,
                text: article.description,
                url: article.url
            }).catch(console.error);
        } else {
            // Fallback: copy URL to clipboard
            navigator.clipboard.writeText(article.url).then(() => {
                showNotification(
                    AppState.currentLanguage === 'hi' ? 
                        'लिंक क्लिपबोर्ड पर कॉपी कर दिया गया' : 
                        'Link copied to clipboard', 
                    'success'
                );
            }).catch(() => {
                showNotification(
                    AppState.currentLanguage === 'hi' ? 
                        'लिंक कॉपी करने में त्रुटि' : 
                        'Error copying link', 
                    'error'
                );
            });
        }
    });
}

function showArticleError() {
    const articleContent = document.getElementById('article-content');
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    
    if (loadingSpinner) loadingSpinner.style.display = 'none';
    if (articleContent) articleContent.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'block';
}

async function loadRelatedArticles(currentArticle) {
    const relatedSection = document.getElementById('related-articles');
    if (!relatedSection) return;
    
    try {
        // Get related articles based on category or source
        const category = currentArticle.source?.name || 'general';
        const data = await fetchNews('general', '', 1);
        
        if (data.articles && data.articles.length > 0) {
            // Filter out current article and get random related articles
            const relatedArticles = data.articles
                .filter(article => article.url !== currentArticle.url)
                .slice(0, 3);
            
            const relatedGrid = document.getElementById('related-news-grid');
            if (relatedGrid && relatedArticles.length > 0) {
                relatedGrid.innerHTML = relatedArticles
                    .map((article, index) => createNewsCard(article, index))
                    .join('');
                
                // Add event listeners to related article cards
                addNewsCardEventListeners(relatedGrid);
                
                relatedSection.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error loading related articles:', error);
        relatedSection.style.display = 'none';
    }
}

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize theme first
        initializeTheme();
        
        // Initialize language and translate page
        translatePage();
        
        // Initialize navigation
        initializeNavigation();
        
        // Page-specific initialization
        const currentPage = window.location.pathname.split('/').pop();
        
        switch (currentPage) {
            case 'index.html':
            case '':
                // Home page initialization
                initializeSearch();
                initializeCategoryFilter();
                initializeLanguageSwitch();
                
                // Initialize favorites toggle
                const favoritesToggle = document.getElementById('favorites-toggle');
                if (favoritesToggle) {
                    favoritesToggle.addEventListener('click', toggleFavoritesView);
                }
                
                // Initialize load more button
                const loadMoreBtn = document.getElementById('load-more-btn');
                if (loadMoreBtn) {
                    loadMoreBtn.addEventListener('click', () => {
                        if (!AppState.showingFavorites) {
                            AppState.currentPage++;
                            loadNews(false);
                        }
                    });
                }
                
                // Load initial news
                await loadNews(true);
                break;
                
            case 'details.html':
                // Details page initialization
                initializeLanguageSwitch();
                initializeDetailsPage();
                break;
                
            case 'contact.html':
                // Contact page initialization
                initializeLanguageSwitch();
                initializeContactForm();
                break;
        }
        
        // Initialize theme toggle for all pages
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Initialize language switcher for all pages
        initializeLanguageSwitch();
        
        console.log('News Portal initialized successfully');
        
    } catch (error) {
        console.error('Error initializing application:', error);
        showNotification('Error initializing application', 'error');
    }
});

// ===========================
// ERROR HANDLING & CLEANUP
// ===========================
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Functions are now accessed via event listeners instead of global onclick handlers

// ===========================
// NAVIGATION HISTORY MANAGEMENT
// ===========================
function generateArticleId(article) {
    // Generate a unique ID for article based on title and URL
    return btoa(encodeURIComponent(article.title + '|' + article.url)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
}

function getCurrentPageType() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'details.html') return 'detail';
    if (currentPage === 'contact.html') return 'contact';
    return 'home';
}

function navigateBack() {
    try {
        const navHistory = JSON.parse(localStorage.getItem('nav-history') || '[]');
        
        if (navHistory.length <= 1) {
            // No history, go to home page
            window.location.href = 'index.html';
            return;
        }
        
        // Remove current page from history
        navHistory.pop();
        
        // Get the previous page
        const previousPage = navHistory[navHistory.length - 1];
        
        // Update history in localStorage
        localStorage.setItem('nav-history', JSON.stringify(navHistory));
        
        if (previousPage.page === 'detail') {
            // Navigate to previous detail page
            console.log('Navigating back to previous detail page:', previousPage.articleTitle);
            if (previousPage.articleData) {
                // Use stored article data directly
                console.log('Using stored article data for navigation');
                localStorage.setItem('current-article', JSON.stringify(previousPage.articleData));
                window.location.href = 'details.html';
            } else {
                // Fallback: try to find article in current data
                console.log('Article data not found in history, searching in current articles');
                const allArticles = [...AppState.newsArticles, ...AppState.favoriteArticles];
                const targetArticle = allArticles.find(article => 
                    generateArticleId(article) === previousPage.articleId
                );
                
                if (targetArticle) {
                    console.log('Found article in current data, navigating');
                    localStorage.setItem('current-article', JSON.stringify(targetArticle));
                    window.location.href = 'details.html';
                } else {
                    // Article not found, go to home
                    console.log('Previous article not found, returning to home');
                    window.location.href = 'index.html';
                }
            }
        } else {
            // Navigate to previous non-detail page
            window.location.href = previousPage.url.includes('http') ? 'index.html' : previousPage.url;
        }
    } catch (error) {
        console.error('Error in navigation:', error);
        // Fallback to browser back or home
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    }
}

function clearNavigationHistory() {
    localStorage.removeItem('nav-history');
    AppState.navigationHistory = [];
    console.log('Navigation history cleared');
}

function debugNavigationHistory() {
    const navHistory = JSON.parse(localStorage.getItem('nav-history') || '[]');
    console.log('Current navigation history:', navHistory);
    return navHistory;
}

function initializeNavigationHistory() {
    // Initialize navigation history for current page
    const currentUrl = window.location.href;
    const currentPage = getCurrentPageType();
    
    let navHistory = JSON.parse(localStorage.getItem('nav-history') || '[]');
    
    // Only add current page if it's not already the last entry
    if (navHistory.length === 0 || navHistory[navHistory.length - 1].url !== currentUrl) {
        const historyEntry = {
            url: currentUrl,
            page: currentPage,
            timestamp: Date.now()
        };
        
        if (currentPage === 'detail') {
            const currentArticle = JSON.parse(localStorage.getItem('current-article') || 'null');
            if (currentArticle) {
                historyEntry.articleId = generateArticleId(currentArticle);
                historyEntry.articleTitle = currentArticle.title;
                historyEntry.articleData = currentArticle; // Store complete article data
            }
        }
        
        navHistory.push(historyEntry);
        localStorage.setItem('nav-history', JSON.stringify(navHistory));
    }
}