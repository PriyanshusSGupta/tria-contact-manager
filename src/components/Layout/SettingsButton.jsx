import { useState } from 'react';
import { Settings } from 'lucide-react';
import './SettingsButton.css';

function SettingsButton({ onClick, isActive }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      className={`settings-button ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Settings"
      aria-label="Open settings panel"
      aria-expanded={isActive}
    >
      <Settings 
        size={20} 
        className={`settings-icon ${isActive ? 'spinning' : ''}`}
      />
    </button>
  );
}

export default SettingsButton;