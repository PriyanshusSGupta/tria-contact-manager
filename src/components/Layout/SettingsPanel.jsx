import { useState, useEffect, useRef } from 'react';
import {
  Settings,
  X,
  Upload,
  Image,
  Tag,
  Palette,
  FileText
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle.jsx';
import './SettingsPanel.css';

function SettingsPanel({
  isOpen,
  onClose,
  onImportExport,
  onBackgroundSelector,
  onManageTags
}) {
  const [activeSection, setActiveSection] = useState('general');
  const panelRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Handle ESC key and touch gestures
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden';
      // Add viewport meta tag behavior for mobile
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
      // Restore viewport behavior
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1');
      }
    };
  }, [isOpen, onClose]);

  // Touch gesture handlers for swipe-to-close
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 50) {
      // Swipe right to close (only on mobile)
      if (window.innerWidth <= 768) {
        onClose();
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  const handleFeatureClick = (action) => {
    action();
    // Keep panel open so user can access multiple features
  };

  const sections = {
    general: {
      title: 'General Settings',
      icon: <Settings size={18} />,
      description: 'Core application preferences and behavior',
      items: [
        {
          id: 'theme',
          title: 'Theme',
          description: 'Switch between light and dark mode for better visibility',
          icon: <Palette size={16} />,
          component: <ThemeToggle />,
          category: 'appearance'
        }
      ]
    },
    appearance: {
      title: 'Appearance',
      icon: <Image size={18} />,
      description: 'Customize the visual appearance of your workspace',
      items: [
        {
          id: 'backgrounds',
          title: 'Backgrounds',
          description: 'Customize app background patterns and colors',
          icon: <Image size={16} />,
          action: onBackgroundSelector,
          category: 'visual',
          badge: 'New'
        }
      ]
    },
    data: {
      title: 'Data Management',
      icon: <FileText size={18} />,
      description: 'Import, export, and organize your contact data',
      items: [
        {
          id: 'import-export',
          title: 'Import & Export',
          description: 'Backup and restore your contacts in various formats',
          icon: <Upload size={16} />,
          action: onImportExport,
          category: 'data',
          shortcut: 'Ctrl+Shift+E'
        },
        {
          id: 'tags',
          title: 'Manage Tags',
          description: 'Create, edit, and organize contact categories and labels',
          icon: <Tag size={16} />,
          action: onManageTags,
          category: 'organization',
          shortcut: 'Ctrl+T'
        }
      ]
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="settings-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Settings Panel */}
      <div
        ref={panelRef}
        className={`settings-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="settings-header">
          <div className="settings-title">
            <Settings size={20} />
            <h2 id="settings-title">Settings</h2>
          </div>
          <button
            className="settings-close"
            onClick={onClose}
            aria-label="Close settings panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="settings-nav" role="tablist">
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              className={`nav-item ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
              role="tab"
              aria-selected={activeSection === key}
              aria-controls={`settings-${key}`}
            >
              {section.icon}
              <span>{section.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          <div className="section-header">
            <h3>{sections[activeSection].title}</h3>
            <p className="section-description">{sections[activeSection].description}</p>
          </div>

          <div
            className="settings-items"
            role="tabpanel"
            id={`settings-${activeSection}`}
            aria-labelledby={`settings-${activeSection}-tab`}
          >
            {sections[activeSection].items.map((item, index) => (
              <div
                key={item.id}
                className={`settings-item ${item.category ? `category-${item.category}` : ''}`}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <div className="item-info">
                  <div className="item-header">
                    <div className="item-icon-wrapper">
                      {item.icon}
                    </div>
                    <div className="item-title-wrapper">
                      <h4>{item.title}</h4>
                      {item.badge && (
                        <span className={`item-badge badge-${item.badge.toLowerCase()}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <p>{item.description}</p>
                  {item.shortcut && (
                    <div className="item-shortcut">
                      <kbd>{item.shortcut}</kbd>
                    </div>
                  )}
                </div>

                <div className="item-action">
                  {item.component ? (
                    <div className="component-wrapper">
                      {item.component}
                    </div>
                  ) : (
                    <button
                      className="action-button"
                      onClick={() => handleFeatureClick(item.action)}
                      title={`Open ${item.title}`}
                    >
                      <span>Open</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <div className="app-info">
            <h4>Tria Contacts</h4>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPanel;