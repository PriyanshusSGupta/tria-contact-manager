# Project Structure

## Root Level
- `index.html` - Main HTML entry point with root div
- `vite.config.js` - Vite configuration with React plugin
- `eslint.config.js` - ESLint configuration with React rules
- `package.json` - Dependencies and scripts

## Source Code (`src/`)
- `main.jsx` - Application entry point, renders App in StrictMode
- `App.jsx` - Main application component
- `App.css` - Application-specific styles
- `index.css` - Global styles
- `assets/` - Static assets like images and icons

## Public Assets (`public/`)
- Static files served directly (e.g., `vite.svg`)
- Referenced with absolute paths from root

## File Naming Conventions
- React components use `.jsx` extension
- Component files use PascalCase (e.g., `App.jsx`)
- CSS files use kebab-case or match component names
- Assets organized in dedicated folders

## Import Patterns
- Relative imports for local files (`./App.jsx`)
- Absolute imports for public assets (`/vite.svg`)
- Named imports for React features (`{ useState }`)
- Default exports for components

## Architecture Notes
- Single-page application structure
- Component-based architecture
- CSS co-located with components
- Assets referenced through imports or public folder