import { useState, useEffect } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import Sidebar from './Sidebar.jsx';
import ContactListPanel from './ContactListPanel.jsx';
import ContactDetailPanel from './ContactDetailPanel.jsx';
import MobileHeader from './MobileHeader.jsx';
import './MainLayout.css';

function MainLayout({ 
  contacts, 
  onAddContact, 
  onEditContact, 
  onDeleteContact,
  availableTags,
  onManageTags,
  onImportExport,
  onBackgroundSelector
}) {
  const [selectedContact, setSelectedContact] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  // Handle contact selection
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    if (isMobile) {
      setDetailPanelOpen(true);
    }
  };

  // Handle contact deselection
  const handleContactDeselect = () => {
    setSelectedContact(null);
    setDetailPanelOpen(false);
  };

  // Filter contacts based on category, search, and tags
  const filteredContacts = contacts.filter(contact => {
    // Category filter
    if (activeCategory === 'favorites' && !contact.isFavorite) return false;
    if (activeCategory === 'businesses' && !contact.isBusinessContact) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query) ||
        (contact.company && contact.company.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }
    
    // Tag filter
    if (selectedTags.length > 0) {
      const hasSelectedTag = selectedTags.some(tagId => 
        contact.tags && contact.tags.includes(tagId)
      );
      if (!hasSelectedTag) return false;
    }
    
    return true;
  });

  // Get contact counts for sidebar
  const contactCounts = {
    all: contacts.length,
    favorites: contacts.filter(c => c.isFavorite).length,
    businesses: contacts.filter(c => c.isBusinessContact).length,
    family: contacts.filter(c => c.tags && c.tags.includes('family')).length,
    friends: contacts.filter(c => c.tags && c.tags.includes('friends')).length,
    work: contacts.filter(c => c.tags && c.tags.includes('work')).length
  };

  return (
    <div className={`main-layout ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`}>
      {/* Mobile Header */}
      {isMobile && (
        <MobileHeader
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onAddContact={onAddContact}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
        />
      )}
      
      {/* Sidebar */}
      <div className={`layout-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          contactCounts={contactCounts}
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onImportExport={onImportExport}
          onBackgroundSelector={onBackgroundSelector}
          onManageTags={onManageTags}
          isMobile={isMobile}
        />
      </div>

      {/* Contact List Panel */}
      <div className={`layout-contact-list ${selectedContact && !isMobile ? 'with-detail' : ''}`}>
        <ContactListPanel
          contacts={filteredContacts}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
          onAddContact={onAddContact}
          onEditContact={onEditContact}
          onDeleteContact={onDeleteContact}
          availableTags={availableTags}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
        />
      </div>

      {/* Contact Detail Panel */}
      <div className={`layout-detail-panel ${
        selectedContact ? 'open' : ''
      } ${detailPanelOpen ? 'mobile-open' : ''}`}>
        {selectedContact ? (
          <ContactDetailPanel
            contact={selectedContact}
            onClose={handleContactDeselect}
            onEdit={() => onEditContact(selectedContact)}
            onDelete={() => {
              onDeleteContact(selectedContact);
              handleContactDeselect();
            }}
            availableTags={availableTags}
            isMobile={isMobile}
          />
        ) : (
          <div className="detail-panel-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>Select a Contact</h3>
              <p>Choose a contact from the list to view their details, reminders, events, and notes.</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile overlay */}
      {isMobile && (detailPanelOpen || !sidebarCollapsed) && (
        <div 
          className="mobile-overlay"
          onClick={() => {
            setDetailPanelOpen(false);
            setSidebarCollapsed(true);
          }}
        />
      )}
    </div>
  );
}

export default MainLayout;