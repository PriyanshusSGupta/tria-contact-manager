import { useState } from 'react';
import { 
  Users, 
  Star, 
  Building2, 
  Search, 
  Tag, 
  Calendar, 
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import SettingsButton from './SettingsButton.jsx';
import SettingsDropup from './SettingsDropup.jsx';
import './Sidebar.css';

function Sidebar({
  activeCategory,
  onCategoryChange,
  contactCounts,
  availableTags,
  selectedTags,
  onTagsChange,
  collapsed,
  onToggleCollapse,
  searchQuery,
  onSearchChange,
  onImportExport,
  onBackgroundSelector,
  onManageTags,
  isMobile
}) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    tags: true,
    smart: false
  });
  const [showSettings, setShowSettings] = useState(false);

  const toggleSection = (section) => {
    if (collapsed) return;
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTagToggle = (tagId) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    onTagsChange(newSelectedTags);
  };

  const categories = [
    {
      id: 'all',
      label: 'All People',
      icon: <Users size={18} />,
      count: contactCounts.all
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <Star size={18} />,
      count: contactCounts.favorites
    },
    {
      id: 'businesses',
      label: 'Businesses',
      icon: <Building2 size={18} />,
      count: contactCounts.businesses
    }
  ];

  const smartCategories = [
    {
      id: 'recent',
      label: 'Recently Added',
      icon: <Calendar size={18} />,
      count: 5
    },
    {
      id: 'reminders',
      label: 'Reminders',
      icon: <Bell size={18} />,
      count: 3
    }
  ];

  // Get tag categories
  const tagCategories = {
    family: availableTags.filter(tag => 
      ['family', 'parents', 'siblings', 'relatives'].includes(tag.name.toLowerCase())
    ),
    friends: availableTags.filter(tag => 
      ['friends', 'close friends', 'college', 'school'].includes(tag.name.toLowerCase())
    ),
    work: availableTags.filter(tag => 
      ['work', 'colleagues', 'business', 'professional'].includes(tag.name.toLowerCase())
    ),
    other: availableTags.filter(tag => 
      !['family', 'parents', 'siblings', 'relatives', 'friends', 'close friends', 
        'college', 'school', 'work', 'colleagues', 'business', 'professional']
        .includes(tag.name.toLowerCase())
    )
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Users size={24} />
          </div>
          {!collapsed && (
            <div className="brand-text">
              <h1>Tria</h1>
              <span>Contacts</span>
            </div>
          )}
        </div>
        <button 
          className="sidebar-toggle"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Search - Hidden on mobile since we have MobileHeader search */}
      {!collapsed && !isMobile && (
        <div className="sidebar-search">
          <div className="search-input-wrapper">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="sidebar-nav">
        {/* Main Categories */}
        <div className="nav-section">
          <button 
            className="section-header"
            onClick={() => toggleSection('categories')}
            disabled={collapsed}
          >
            {!collapsed && (
              <>
                <span>Categories</span>
                {expandedSections.categories ? 
                  <ChevronDown size={16} /> : 
                  <ChevronRight size={16} />
                }
              </>
            )}
          </button>
          
          {(collapsed || expandedSections.categories) && (
            <div className="nav-items">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`nav-item ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => onCategoryChange(category.id)}
                  title={collapsed ? category.label : undefined}
                >
                  <span className="nav-icon">{category.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="nav-label">{category.label}</span>
                      <span className="nav-count">{category.count}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="nav-section">
          <button 
            className="section-header"
            onClick={() => toggleSection('tags')}
            disabled={collapsed}
          >
            {!collapsed && (
              <>
                <span>Tags</span>
                {expandedSections.tags ? 
                  <ChevronDown size={16} /> : 
                  <ChevronRight size={16} />
                }
              </>
            )}
          </button>
          
          {(collapsed || expandedSections.tags) && (
            <div className="nav-items">
              {Object.entries(tagCategories).map(([categoryName, tags]) => (
                tags.length > 0 && (
                  <div key={categoryName} className="tag-category">
                    {!collapsed && (
                      <div className="tag-category-label">
                        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                      </div>
                    )}
                    {tags.map(tag => (
                      <button
                        key={tag.id}
                        className={`nav-item tag-item ${
                          selectedTags.includes(tag.id) ? 'active' : ''
                        }`}
                        onClick={() => handleTagToggle(tag.id)}
                        title={collapsed ? tag.name : undefined}
                      >
                        <span className="nav-icon">
                          <Tag size={16} />
                        </span>
                        {!collapsed && (
                          <>
                            <span className="nav-label">{tag.name}</span>
                            <span 
                              className="tag-color"
                              style={{ backgroundColor: tag.color }}
                            />
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Smart Categories */}
        <div className="nav-section">
          <button 
            className="section-header"
            onClick={() => toggleSection('smart')}
            disabled={collapsed}
          >
            {!collapsed && (
              <>
                <span>Smart Lists</span>
                {expandedSections.smart ? 
                  <ChevronDown size={16} /> : 
                  <ChevronRight size={16} />
                }
              </>
            )}
          </button>
          
          {(collapsed || expandedSections.smart) && (
            <div className="nav-items">
              {smartCategories.map(category => (
                <button
                  key={category.id}
                  className={`nav-item ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => onCategoryChange(category.id)}
                  title={collapsed ? category.label : undefined}
                >
                  <span className="nav-icon">{category.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="nav-label">{category.label}</span>
                      <span className="nav-count">{category.count}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="footer-settings">
          <SettingsButton 
            onClick={() => setShowSettings(!showSettings)}
            isActive={showSettings}
          />
          
          {showSettings && (
            <SettingsDropup
              onImportExport={onImportExport}
              onBackgroundSelector={onBackgroundSelector}
              onManageTags={onManageTags}
              onClose={() => setShowSettings(false)}
            />
          )}
        </div>
        
        {!collapsed && (
          <div className="sidebar-brand-footer">
            <span className="brand-name">Tria</span>
            <span className="brand-version">v1.0</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;