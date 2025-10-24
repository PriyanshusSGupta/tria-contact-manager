import { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from './ThemeContext.jsx';

const BackgroundContext = createContext();

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

const DEFAULT_BACKGROUNDS = {
  light: {
    id: 'default',
    name: 'Default',
    type: 'solid',
    value: '#f8f9fa',
    preview: '#f8f9fa',
    compatibility: 'universal'
  },
  dark: {
    id: 'default-dark',
    name: 'Default',
    type: 'solid',
    value: '#1a1a1a',
    preview: '#1a1a1a',
    compatibility: 'universal'
  }
};

// Background mapping for theme switching
const THEME_BACKGROUND_MAPPING = {
  // Light to Dark mappings
  'default': 'default-dark',
  'gradient-blue': 'gradient-blue-dark',
  'gradient-purple': 'gradient-purple-dark',
  'gradient-sunset': 'gradient-sunset-dark',
  'gradient-forest': 'gradient-forest-dark',
  'gradient-cosmic': 'gradient-cosmic-dark',
  'pattern-dots': 'pattern-dots-dark',
  'pattern-grid': 'pattern-grid-dark',
  'solid-mint': 'solid-charcoal',
  'solid-lavender': 'solid-midnight',
  'solid-peach': 'solid-forest',
  'solid-sky': 'solid-wine',
  
  // Dark to Light mappings (reverse)
  'default-dark': 'default',
  'gradient-blue-dark': 'gradient-blue',
  'gradient-purple-dark': 'gradient-purple',
  'gradient-sunset-dark': 'gradient-sunset',
  'gradient-forest-dark': 'gradient-forest',
  'gradient-cosmic-dark': 'gradient-cosmic',
  'pattern-dots-dark': 'pattern-dots',
  'pattern-grid-dark': 'pattern-grid',
  'solid-charcoal': 'solid-mint',
  'solid-midnight': 'solid-lavender',
  'solid-forest': 'solid-peach',
  'solid-wine': 'solid-sky'
};

// All available backgrounds by theme
const ALL_BACKGROUNDS = {
  light: [
    DEFAULT_BACKGROUNDS.light,
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
    DEFAULT_BACKGROUNDS.dark,
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

export const BackgroundProvider = ({ children }) => {
  const { theme } = useTheme();
  const [background, setBackground] = useState(() => {
    // Load saved background from localStorage
    const savedBackground = localStorage.getItem('tria-background');
    if (savedBackground) {
      try {
        return JSON.parse(savedBackground);
      } catch {
        return DEFAULT_BACKGROUNDS[theme] || DEFAULT_BACKGROUNDS.light;
      }
    }
    return DEFAULT_BACKGROUNDS[theme] || DEFAULT_BACKGROUNDS.light;
  });

  // Handle theme changes - automatically switch to appropriate background
  useEffect(() => {
    const currentBackgroundId = background.id;
    const mappedBackgroundId = THEME_BACKGROUND_MAPPING[currentBackgroundId];
    
    if (mappedBackgroundId) {
      // Find the mapped background in the current theme's backgrounds
      const themeBackgrounds = ALL_BACKGROUNDS[theme] || ALL_BACKGROUNDS.light;
      const mappedBackground = themeBackgrounds.find(bg => bg.id === mappedBackgroundId);
      
      if (mappedBackground && mappedBackground.id !== currentBackgroundId) {
        setBackground(mappedBackground);
        
        // Background auto-switched for theme compatibility
        // Could trigger a notification in the parent app if needed
      }
    } else {
      // If no mapping exists, use default for current theme
      const defaultBg = DEFAULT_BACKGROUNDS[theme] || DEFAULT_BACKGROUNDS.light;
      if (defaultBg.id !== currentBackgroundId) {
        setBackground(defaultBg);
      }
    }
  }, [theme]); // Only depend on theme changes

  // Apply background to document and save to localStorage
  useEffect(() => {
    const applyBackground = () => {
      const body = document.body;
      
      // Reset all background properties
      body.style.background = '';
      body.style.backgroundColor = '';
      body.style.backgroundImage = '';
      body.style.backgroundSize = '';
      body.style.backgroundRepeat = '';
      body.style.backgroundAttachment = '';

      // Apply new background
      if (background.type === 'solid') {
        body.style.backgroundColor = background.value;
      } else if (background.type === 'gradient') {
        body.style.background = background.value;
      } else if (background.type === 'pattern') {
        body.style.background = background.value;
        body.style.backgroundSize = background.backgroundSize || '20px 20px';
        body.style.backgroundRepeat = 'repeat';
        body.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#f8f9fa';
      }

      // Save to localStorage
      localStorage.setItem('tria-background', JSON.stringify(background));
    };

    applyBackground();
  }, [background, theme]);

  const changeBackground = (newBackground) => {
    setBackground(newBackground);
  };

  const resetBackground = () => {
    setBackground(DEFAULT_BACKGROUNDS[theme] || DEFAULT_BACKGROUNDS.light);
  };

  const getAvailableBackgrounds = () => {
    return ALL_BACKGROUNDS[theme] || ALL_BACKGROUNDS.light;
  };

  const value = {
    background,
    changeBackground,
    resetBackground,
    getAvailableBackgrounds,
    isDefault: background.id === DEFAULT_BACKGROUNDS[theme]?.id
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
};