# Technology Stack

## Core Technologies
- **React 19.1.1** - Latest React with new features and optimizations
- **Vite 7.1.7** - Fast build tool and development server
- **ESLint 9.36.0** - Code linting and quality enforcement
- **Babel React Compiler** - Automatic React optimization

## Build System
- **Vite** as the primary build tool and dev server
- **ES Modules** - Project uses `"type": "module"` in package.json
- **JSX** - React components use .jsx extension

## Development Tools
- ESLint with React-specific plugins (react-hooks, react-refresh)
- Vite HMR (Hot Module Replacement) for fast development
- React StrictMode enabled for development checks

## Common Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Code Quality Rules
- ESLint enforces React hooks rules and refresh patterns
- Unused variables allowed if they match pattern `^[A-Z_]` (constants)
- ECMAScript 2020+ features supported
- Browser globals available