import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY, THEMES } from '../constants/themes.js';
import { ThemeContext } from './contexts.js';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    
    return THEMES.LIGHT;
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!savedTheme) {
        setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  const setLightTheme = () => setTheme(THEMES.LIGHT);
  const setDarkTheme = () => setTheme(THEMES.DARK);
  const setSystemTheme = () => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
    setTheme(systemTheme);
  };

  const value = {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    isLight: theme === THEMES.LIGHT,
    isDark: theme === THEMES.DARK
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};