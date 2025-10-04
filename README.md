# 🌟 Excellence News Portal

A modern, responsive news portal built with **HTML**, **CSS**, and **JavaScript** that fetches the latest news articles using the NewsAPI.org API.

## ✨ Features

### 🏠 **Home Page**
- **Prominent Navigation Bar** with portal branding and mobile-responsive menu
- **Advanced Search Bar** to filter news by keywords
- **Category Filter** buttons (General, Business, Technology, Sports, Health, Entertainment)
- **Responsive Card Layout** displaying news with:
  - High-quality images with fallback placeholders
  - Article title, description, and category
  - Author information and publication date
  - Smooth hover animations and transitions
- **Click to Read** - Navigate to detailed article view

### 📄 **Article Details Page**
- **Complete Article Information**:
  - Full title and description
  - Author and publication date
  - High-resolution article image
  - Source information and external link
- **Interactive Elements**:
  - Add/Remove from favorites
  - Share functionality (Web Share API + clipboard fallback)
  - Back navigation
- **Related Articles** section with similar content

### 📞 **Contact Us Page**
- **Professional Contact Form** with:
  - Real-time form validation
  - Name, Email, Subject, and Message fields
  - Privacy policy agreement checkbox
- **Contact Information Display**:
  - Portal headquarters address, phone, email
  - Office hours
  - Social media links
- **FAQ Section** with common questions and answers

### 🌙 **Dark Mode Toggle**
- **System Theme Support** with manual override
- **Persistent Storage** - remembers user preference
- **Smooth Transitions** between light and dark modes
- **Comprehensive Coverage** - all components support both themes

### ❤️ **Favorites System**
- **Local Storage** for persistent favorite articles
- **Toggle Favorites View** to see only saved articles
- **Visual Indicators** showing favorite status
- **Cross-page Synchronization** - favorites work on all pages

### 🌍 **Multi-language Support**
- **English + Hindi (हिंदी)** language options
- **Real-time Translation** of all interface elements
- **Localized Date/Time Formatting**
- **Persistent Language Preference**

### 📱 **Fully Responsive Design**
- **Mobile-first Approach** with progressive enhancement
- **Breakpoints**: Mobile (≤767px), Tablet (768px-1023px), Desktop (≥1024px)
- **Touch-friendly Interface** with appropriate tap targets
- **Optimized Performance** across all devices

## 🚀 **Getting Started**

### Prerequisites
1. **NewsAPI.org Account** - Sign up at [newsapi.org](https://newsapi.org/) for a free API key
2. **Web Browser** - Modern browser with JavaScript enabled
3. **Local Web Server** (optional but recommended) - Live Server, Python HTTP server, or similar

### Installation & Setup

1. **Clone or Download** this repository to your local machine
2. **Get Your API Key**:
   - Visit [newsapi.org](https://newsapi.org/)
   - Sign up for a free account
   - Copy your API key from the dashboard
3. **Configure API Key**:
   - Open `script.js`
   - Find line 11: `API_KEY: '1234567890abcdef1234567890abcdef'`
   - Replace the placeholder with your actual API key
4. **Launch the Application**:
   - **Option A**: Use Live Server extension in VS Code
   - **Option B**: Python HTTP server: `python -m http.server 8000`
   - **Option C**: Node.js HTTP server: `npx http-server`
   - **Option D**: Open `index.html` directly (may have CORS issues)

## 🚨 **Deployment Troubleshooting**

### **HTTP 426 Error (Upgrade Required)**
If you encounter this error when deploying:
```
Failed to load resource: the server responded with a status of 426
```

**Root Cause:** NewsAPI requires HTTPS connections for security.

**Solutions:**
1. **Deploy on HTTPS-enabled hosting:**
   - **GitHub Pages** (free) - Automatically serves over HTTPS
   - **Netlify** (free) - Auto HTTPS with custom domains
   - **Vercel** (free) - Built-in HTTPS support
   - **Firebase Hosting** (free) - HTTPS by default

2. **Force HTTPS redirect** (add to your HTML head):
   ```html
   <script>
   if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
       location.replace('https:' + window.location.href.substring(window.location.protocol.length));
   }
   </script>
   ```

3. **Alternative APIs** for HTTP environments:
   - Use the built-in fallback mock data
   - Consider alternative news APIs that support HTTP
   - Implement a backend proxy server

4. **Local Development:**
   - Use `localhost` or `127.0.0.1` (works with HTTP)
   - Use Live Server extension in VS Code
   - Python: `python -m http.server 8000`

### Project Structure
```
news_app/
├── index.html          # Home page with news grid
├── details.html        # Article details page
├── contact.html        # Contact form page
├── style.css          # Complete styling system
├── script.js          # Core JavaScript functionality
└── README.md          # This documentation
```

## 🔧 **Technical Implementation**

### **API Integration**
- **NewsAPI.org** REST API for real-time news data
- **Error Handling** with user-friendly fallbacks
- **Pagination** support for loading more articles
- **Search & Category Filtering** capabilities

### **State Management**
```javascript
const AppState = {
    currentPage: 1,
    currentCategory: 'general',
    currentSearchQuery: '',
    newsArticles: [],
    favoriteArticles: [],
    currentLanguage: 'en',
    showingFavorites: false
};
```

### **Local Storage Usage**
- `news-portal-theme`: Dark/light mode preference
- `news-portal-language`: User's selected language
- `news-portal-favorites`: Array of favorite articles
- `current-article`: Temporary storage for article details navigation

### **CSS Architecture**
- **CSS Custom Properties** for theming and consistency
- **Mobile-first Responsive Design** with fluid grids
- **Component-based Styling** for maintainability
- **Animation System** with CSS transitions and keyframes

## 🎨 **Design Features**

### **Color Scheme**
- **Light Theme**: Clean whites and subtle grays with blue accents
- **Dark Theme**: Rich darks with high contrast and warm accents
- **Accessibility**: High contrast ratios and focus indicators

### **Typography**
- **System Font Stack** for optimal performance and familiarity
- **Responsive Text Sizing** with fluid typography
- **Clear Hierarchy** with consistent spacing and weights

### **Animations**
- **Smooth Transitions** on all interactive elements
- **Hover Effects** with subtle transforms and shadows
- **Loading Animations** with CSS spinners
- **Staggered Animations** for content reveals

## 📋 **Usage Guide**

### **Browsing News**
1. **Homepage** displays latest general news by default
2. **Search** using the prominent search bar
3. **Filter by Category** using the category buttons
4. **Load More** articles with the load more button
5. **Click any Article** to view full details

### **Managing Favorites**
1. **Click the Heart Icon** on any article card
2. **Toggle Favorites View** to see only saved articles
3. **Favorites Sync** across all pages automatically

### **Customizing Experience**
1. **Theme Toggle** - Click moon/sun icon in navigation
2. **Language Switch** - Select English/Hindi from dropdown
3. **Settings Persist** across browser sessions

### **Contact Form**
1. **Fill Required Fields** with real-time validation
2. **Submit Message** with loading feedback
3. **Success Confirmation** upon submission

## 🛠️ **Customization Options**

### **Adding New Languages**
1. **Edit `translations` object** in `script.js`
2. **Add new language code** and translations
3. **Update language selector** in HTML files

### **Changing News Sources**
1. **Modify API parameters** in `fetchNews()` function
2. **Update `CONFIG` object** with new settings
3. **Adjust country/language codes** as needed

### **Styling Modifications**
1. **CSS Custom Properties** in `:root` for global changes
2. **Component-specific styles** for targeted modifications
3. **Dark theme overrides** in `[data-theme="dark"]` selector

## 🔒 **Security & Performance**

### **API Key Security**
- ⚠️ **Client-side API keys are visible to users**
- 🔒 **Use environment variables in production**
- 🛡️ **Implement rate limiting on server-side**

### **Performance Optimizations**
- **Lazy Loading** for images with intersection observer
- **Debounced Search** to reduce API calls
- **Efficient DOM Updates** with minimal reflows
- **CSS Grid & Flexbox** for performant layouts

### **Error Handling**
- **Graceful API Failures** with fallback messages
- **Image Loading Errors** with placeholder fallbacks
- **Network Issues** with retry mechanisms
- **User-friendly Notifications** for all errors

## 📱 **Browser Compatibility**

### **Supported Browsers**
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### **Required Features**
- CSS Grid and Flexbox support
- ES6+ JavaScript features
- Local Storage API
- Fetch API

## 🤝 **Contributing**

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 **License**

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 🙏 **Acknowledgments**

- **NewsAPI.org** for providing the news data API
- **Font Awesome** for the comprehensive icon library
- **CSS Grid** and **Flexbox** for modern layout capabilities
- **Web APIs** for native browser functionality

## 📞 **Support**

For support, email **contact@excellencenews.com** or create an issue in this repository.

---

**Built with ❤️ by Excellence News Portal Development Team**