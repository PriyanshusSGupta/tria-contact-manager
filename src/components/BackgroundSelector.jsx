import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import './BackgroundSelector.css';

// Theme-aware background definitions
const BACKGROUND_OPTIONS = {
  light: [
    {
      id: 'default',
      name: 'Default',
      type: 'solid',
      value: '#f8f9fa',
      preview: '#f8f9fa',
      compatibility: 'universal'
    },
    {
      id: 'gradient-blue',
      name: 'Ocean Blue',
      type: 'gradient',
      value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      compatibility: 'universal'
    },
    {
      id: 'gradient-purple',
      name: 'Purple Dream',
      type: 'gradient',
      value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      preview: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      compatibility: 'light'
    },
    {
      id: 'gradient-sunset',
      name: 'Sunset',
      type: 'gradient',
      value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      preview: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      compatibility: 'light'
    },
    {
      id: 'gradient-forest',
      name: 'Forest',
      type: 'gradient',
      value: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      preview: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      compatibility: 'universal'
    },
    {
      id: 'gradient-cosmic',
      name: 'Cosmic',
      type: 'gradient',
      value: 'linear-gradient(135deg, #243949 0%, #517fa4 100%)',
      preview: 'linear-gradient(135deg, #243949 0%, #517fa4 100%)',
      compatibility: 'universal'
    },
    {
      id: 'pattern-dots',
      name: 'Dots',
      type: 'pattern',
      value: 'radial-gradient(circle, #e0e0e0 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      preview: 'radial-gradient(circle, #e0e0e0 1px, transparent 1px)',
      compatibility: 'light'
    },
    {
      id: 'pattern-grid',
      name: 'Grid',
      type: 'pattern',
      value: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      preview: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)',
      compatibility: 'light'
    },
    {
      id: 'solid-mint',
      name: 'Mint',
      type: 'solid',
      value: '#f0fff4',
      preview: '#f0fff4',
      compatibility: 'light'
    },
    {
      id: 'solid-lavender',
      name: 'Lavender',
      type: 'solid',
      value: '#f8f4ff',
      preview: '#f8f4ff',
      compatibility: 'light'
    },
    {
      id: 'solid-peach',
      name: 'Peach',
      type: 'solid',
      value: '#fff8f0',
      preview: '#fff8f0',
      compatibility: 'light'
    },
    {
      id: 'solid-sky',
      name: 'Sky',
      type: 'solid',
      value: '#f0f8ff',
      preview: '#f0f8ff',
      compatibility: 'light'
    }
  ],
  dark: [
    {
      id: 'default-dark',
      name: 'Default',
      type: 'solid',
      value: '#1a1a1a',
      preview: '#1a1a1a',
      compatibility: 'universal'
    },
    {
      id: 'gradient-blue-dark',
      name: 'Ocean Blue',
      type: 'gradient',
      value: 'linear-gradient(135deg, #2c3e50 0%, #4a6741 100%)',
      preview: 'linear-gradient(135deg, #2c3e50 0%, #4a6741 100%)',
      compatibility: 'universal'
    },
    {
      id: 'gradient-purple-dark',
      name: 'Purple Dream',
      type: 'gradient',
      value: 'linear-gradient(135deg, #2c1810 0%, #614385 100%)',
      preview: 'linear-gradient(135deg, #2c1810 0%, #614385 100%)',
      compatibility: 'dark'
    },
    {
      id: 'gradient-sunset-dark',
      name: 'Sunset',
      type: 'gradient',
      value: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #8e24aa 100%)',
      preview: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #8e24aa 100%)',
      compatibility: 'dark'
    },
    {
      id: 'gradient-forest-dark',
      name: 'Forest',
      type: 'gradient',
      value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      preview: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      compatibility: 'universal'
    },
    {
      id: 'gradient-cosmic-dark',
      name: 'Cosmic',
      type: 'gradient',
      value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      preview: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      compatibility: 'universal'
    },
    {
      id: 'pattern-dots-dark',
      name: 'Dots',
      type: 'pattern',
      value: 'radial-gradient(circle, #404040 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      preview: 'radial-gradient(circle, #404040 1px, transparent 1px)',
      compatibility: 'dark'
    },
    {
      id: 'pattern-grid-dark',
      name: 'Grid',
      type: 'pattern',
      value: 'linear-gradient(#404040 1px, transparent 1px), linear-gradient(90deg, #404040 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      preview: 'linear-gradient(#404040 1px, transparent 1px), linear-gradient(90deg, #404040 1px, transparent 1px)',
      compatibility: 'dark'
    },
    {
      id: 'solid-charcoal',
      name: 'Charcoal',
      type: 'solid',
      value: '#2d2d2d',
      preview: '#2d2d2d',
      compatibility: 'dark'
    },
    {
      id: 'solid-midnight',
      name: 'Midnight',
      type: 'solid',
      value: '#191970',
      preview: '#191970',
      compatibility: 'dark'
    },
    {
      id: 'solid-forest',
      name: 'Forest',
      type: 'solid',
      value: '#1b4332',
      preview: '#1b4332',
      compatibility: 'dark'
    },
    {
      id: 'solid-wine',
      name: 'Wine',
      type: 'solid',
      value: '#4a0e4e',
      preview: '#4a0e4e',
      compatibility: 'dark'
    }
  ]
};

function BackgroundSelector({ currentBackground, onBackgroundChange, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { theme } = useTheme();

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'solid', name: 'Solid Colors' },
    { id: 'gradient', name: 'Gradients' },
    { id: 'pattern', name: 'Patterns' }
  ];

  // Get backgrounds for current theme
  const currentThemeBackgrounds = BACKGROUND_OPTIONS[theme] || BACKGROUND_OPTIONS.light;
  
  const filteredBackgrounds = selectedCategory === 'all' 
    ? currentThemeBackgrounds 
    : currentThemeBackgrounds.filter(bg => bg.type === selectedCategory);

  const handleBackgroundSelect = (background) => {
    onBackgroundChange(background);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="background-selector-overlay" onClick={handleOverlayClick}>
      <div className="background-selector-modal">
        <div className="modal-header">
          <div className="header-content">
            <h2>Choose Background</h2>
            <div className="theme-indicator">
              <span className="theme-label">{theme === 'dark' ? '🌙' : '☀️'} {theme === 'dark' ? 'Dark' : 'Light'} Theme</span>
            </div>
          </div>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close background selector"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="background-grid">
            {filteredBackgrounds.map(background => (
              <div
                key={background.id}
                className={`background-option ${currentBackground?.id === background.id ? 'selected' : ''}`}
                onClick={() => handleBackgroundSelect(background)}
              >
                <div 
                  className="background-preview"
                  style={{
                    background: background.preview,
                    backgroundSize: background.backgroundSize || 'cover'
                  }}
                >
                  {currentBackground?.id === background.id && (
                    <div className="selected-indicator">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    </div>
                  )}
                  {background.compatibility === 'universal' && (
                    <div className="compatibility-badge universal" title="Works great in both light and dark themes">
                      ✨
                    </div>
                  )}
                </div>
                <div className="background-info">
                  <span className="background-name">{background.name}</span>
                  {background.compatibility === theme && (
                    <span className="optimized-badge" title={`Optimized for ${theme} theme`}>
                      {theme === 'dark' ? '🌙' : '☀️'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="done-button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default BackgroundSelector;