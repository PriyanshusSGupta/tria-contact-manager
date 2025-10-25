import { Menu, Search, Plus } from 'lucide-react';
import './MobileHeader.css';

function MobileHeader({ 
  onToggleSidebar, 
  onAddContact, 
  searchQuery, 
  onSearchChange,
  activeCategory 
}) {
  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'all':
        return 'All Contacts';
      case 'favorites':
        return 'Favorites';
      case 'businesses':
        return 'Business Contacts';
      case 'recent':
        return 'Recently Added';
      case 'reminders':
        return 'Contacts with Reminders';
      default:
        return 'Contacts';
    }
  };

  return (
    <div className="mobile-header">
      <div className="mobile-header-top">
        <button 
          className="mobile-menu-button"
          onClick={onToggleSidebar}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        
        <h1 className="mobile-title">{getCategoryTitle()}</h1>
        
        <button 
          className="mobile-add-button"
          onClick={onAddContact}
          aria-label="Add contact"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="mobile-search">
        <div className="mobile-search-wrapper">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="mobile-search-input"
          />
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;