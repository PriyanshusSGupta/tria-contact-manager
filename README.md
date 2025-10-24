# Tria Contact Management App

A modern, feature-rich contact management application built with React 19 and Vite. Tria offers a comprehensive solution for organizing, managing, and customizing your contact experience with advanced features like theme-aware backgrounds, smart search, and flexible viewing options.

## 🚀 Live Demo

**[View Live Application](https://tria-contact-manager.vercel.app)** *(Will be live after Vercel deployment)*

## ✨ Features

### Core Functionality
- **Complete CRUD Operations**: Create, read, update, and delete contacts
- **Smart Search**: Fuzzy search with auto-suggestions and real-time filtering
- **Contact Tags**: Color-coded tagging system with filtering capabilities
- **Data Persistence**: All data saved locally with automatic backup

### Advanced Features
- **Theme System**: Dark/Light mode with system preference detection
- **Theme-Aware Backgrounds**: 12+ customizable backgrounds that adapt to your theme
- **Grid/List Views**: Toggle between card-based grid and table-like list layouts
- **Import/Export**: CSV and JSON support for data portability
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience
- **Unified Settings**: Clean dropdown interface for all customization options
- **Smart Avatars**: Auto-generated avatars with intelligent color coding
- **Loading States**: Smooth animations and loading indicators
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Technology Stack

### Core Technologies
- **React 19.1.1** - Latest React with new features and optimizations
- **Vite 7.1.7** - Fast build tool and development server
- **JavaScript (ES2020+)** - Modern JavaScript features
- **CSS3** - Custom properties, Grid, Flexbox, and animations

### Architecture Patterns
- **Context API** - State management for themes and backgrounds
- **Custom Hooks** - Reusable logic for localStorage and data management
- **Component Composition** - Modular, reusable component architecture
- **CSS Modules** - Scoped styling with CSS custom properties

### Development Tools
- **ESLint 9.36.0** - Code linting and quality enforcement
- **Babel React Compiler** - Automatic React optimization
- **Vite HMR** - Hot Module Replacement for fast development

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ContactCard.jsx     # Individual contact display
│   ├── ContactList.jsx     # Contact grid/list container
│   ├── SearchBar.jsx       # Search with fuzzy matching
│   ├── TagFilter.jsx       # Tag-based filtering
│   ├── ViewToggle.jsx      # Grid/List view switcher
│   ├── SettingsDropdown.jsx # Unified settings interface
│   └── ...
├── contexts/            # React Context providers
│   ├── ThemeContext.jsx    # Dark/Light theme management
│   └── BackgroundContext.jsx # Background customization
├── hooks/               # Custom React hooks
│   └── useLocalStorage.js  # Persistent state management
├── utils/               # Utility functions
│   ├── fuzzySearch.js      # Smart search algorithms
│   ├── importExport.js     # Data import/export logic
│   └── dataMigration.js    # Data structure migrations
├── data/                # Static data and configurations
└── assets/              # Images and static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PriyanshusSGupta/tria-contact-manager.git
   cd tria-contact-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎨 Design Decisions

### Theme-Aware Architecture
The application features a sophisticated theme system that goes beyond simple dark/light modes:
- **Automatic Background Switching**: Backgrounds automatically adapt when themes change
- **Smart Color Mapping**: Each background has light and dark variants that maintain readability
- **System Integration**: Respects user's system theme preferences

### Performance Optimizations
- **React.memo**: Prevents unnecessary re-renders of contact cards
- **Lazy Loading**: Components load only when needed
- **Efficient State Management**: Minimal re-renders with optimized Context usage
- **Local Storage Caching**: Instant app startup with cached data

### Accessibility First
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color schemes
- **Focus Management**: Visible focus indicators and logical tab order

### Mobile-First Design
- **Responsive Grid**: CSS Grid with flexible breakpoints
- **Touch Optimization**: Larger touch targets and gesture support
- **Progressive Enhancement**: Core functionality works on all devices
- **Adaptive UI**: Interface adapts to screen size and input method

## 📚 Libraries and Dependencies

### Core Dependencies
- **React 19** - Chosen for latest features, improved performance, and concurrent rendering
- **Vite** - Selected for fast development experience and optimized production builds

### Why No External Libraries?
This project intentionally uses minimal external dependencies to demonstrate:
- **Vanilla JavaScript Proficiency**: Custom implementations of common patterns
- **CSS Mastery**: Advanced layouts and animations without frameworks
- **React Expertise**: Deep understanding of React patterns and best practices
- **Performance Awareness**: Reduced bundle size and faster load times

### Custom Implementations
- **Fuzzy Search**: Custom algorithm for intelligent contact searching
- **State Management**: Context API with custom hooks instead of Redux
- **Styling System**: CSS custom properties instead of styled-components
- **Data Persistence**: Custom localStorage utilities instead of external libraries

## 🔧 Configuration

### Environment Setup
The application uses Vite's built-in environment handling. No additional configuration required for basic setup.

### Deployment Configuration
For production deployment, the app includes:
- Optimized build configuration
- Proper asset handling
- SPA routing support

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings (Vite is auto-detected)

### Manual Build
```bash
npm run build
npm run preview  # Test production build locally
```

## 🎯 Key Features Showcase

### Smart Contact Management
- **Intelligent Search**: Finds contacts even with typos or partial matches
- **Flexible Tagging**: Organize contacts with color-coded categories
- **Bulk Operations**: Import/export entire contact databases

### Advanced Customization
- **12+ Backgrounds**: From subtle patterns to vibrant gradients
- **Theme Intelligence**: Backgrounds automatically switch with themes
- **View Flexibility**: Choose between visual cards or efficient lists

### Professional UX
- **Unified Settings**: All customization options in one clean interface
- **Smooth Animations**: Polished transitions and micro-interactions
- **Error Recovery**: Graceful handling of edge cases and errors

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Share design improvements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Priyanshu S Gupta**
- GitHub: [@PriyanshusSGupta](https://github.com/PriyanshusSGupta)
- Repository: [tria-contact-manager](https://github.com/PriyanshusSGupta/tria-contact-manager)

---

*Built with ❤️ using React 19 and modern web technologies*