import { useTheme } from '../contexts/ThemeContext.jsx';
import './ThemeToggle.css';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          {isDark ? (
            <Moon className="theme-icon moon" size={16} />
          ) : (
            <Sun className="theme-icon sun" size={16} />
          )}
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;