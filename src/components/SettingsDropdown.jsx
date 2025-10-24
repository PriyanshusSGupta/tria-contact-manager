import { useState, useRef, useEffect } from 'react';
import './SettingsDropdown.css';
import { Settings, Upload, Image, X } from 'lucide-react';

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
        <Settings size={18} />
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
                <Upload size={18} />
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
                <Image size={18} />
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