import { useEffect, useRef } from 'react';
import {
  Upload,
  Image,
  Tag,
  Palette
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle.jsx';
import './SettingsDropup.css';

function SettingsDropup({
  onImportExport,
  onBackgroundSelector,
  onManageTags,
  onClose
}) {
  const dropupRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is on settings button or dropdown
      const isSettingsButton = event.target.closest('.settings-button');
      const isDropdown = dropupRef.current && dropupRef.current.contains(event.target);
      
      if (!isSettingsButton && !isDropdown) {
        onClose();
      }
    };

    // Add delay to prevent immediate closing
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  const handleItemClick = (action) => {
    action();
    onClose();
  };

  return (
    <div ref={dropupRef} className="settings-dropup">
      <div className="dropup-item">
        <div className="item-content">
          <Palette size={16} />
          <span>Theme</span>
        </div>
        <ThemeToggle />
      </div>

      <div className="dropup-item" onClick={() => handleItemClick(onBackgroundSelector)}>
        <div className="item-content">
          <Image size={16} />
          <span>Backgrounds</span>
        </div>
      </div>

      <div className="dropup-item" onClick={() => handleItemClick(onImportExport)}>
        <div className="item-content">
          <Upload size={16} />
          <span>Import & Export</span>
        </div>
      </div>

      <div className="dropup-item" onClick={() => handleItemClick(onManageTags)}>
        <div className="item-content">
          <Tag size={16} />
          <span>Manage Tags</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsDropup;