import { useState, useRef, useEffect } from 'react';
import './SettingsDropdown.css';

function SettingsDropdown({ 
  onImportExport, 
  onBackgroundSelector, 
  onClose 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    if (!isOpen) {
      setIsAnimating(true);
      setIsOpen(true);
      // Reset animation after it completes
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      setIsOpen(false);
      setIsAnimating(false);
    }
  };

  const handleImportExport = () => {
    onImportExport();
    setIsOpen(false);
    setIsAnimating(false);
  };

  const handleBackgroundSelector = () => {
    onBackgroundSelector();
    setIsOpen(false);
    setIsAnimating(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setIsAnimating(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setIsAnimating(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div className="settings-dropdown-container">
      <button 
        ref={buttonRef}
        className={`settings-btn ${isAnimating ? 'rotating' : ''} ${isOpen ? 'active' : ''}`}
        onClick={toggleDropdown}
        title="Settings"
        aria-label="Open settings menu"
        aria-expanded={isOpen}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {isOpen && (
        <div 
          ref={dropdownRef}
          className="settings-dropdown"
          role="menu"
          aria-label="Settings menu"
        >
          <div className="dropdown-arrow"></div>
          
          <div className="dropdown-header">
            <h3>Settings</h3>
          </div>

          <div className="dropdown-content">
            <button 
              className="dropdown-item"
              onClick={handleImportExport}
              role="menuitem"
            >
              <div className="item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17,8 12,3 7,8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <div className="item-content">
                <span className="item-title">Import/Export</span>
                <span className="item-description">Manage your contacts data</span>
              </div>
            </button>

            <button 
              className="dropdown-item"
              onClick={handleBackgroundSelector}
              role="menuitem"
            >
              <div className="item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21,15 16,10 5,21"></polyline>
                </svg>
              </div>
              <div className="item-content">
                <span className="item-title">Background</span>
                <span className="item-description">Customize your theme</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsDropdown;