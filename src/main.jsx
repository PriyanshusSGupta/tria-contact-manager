import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { BackgroundProvider } from './contexts/BackgroundContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BackgroundProvider>
        <App />
      </BackgroundProvider>
    </ThemeProvider>
  </StrictMode>,
)
