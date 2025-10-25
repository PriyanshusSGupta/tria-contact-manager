import { useState } from 'react';
import { Plus, Grid3X3, List, Filter, SortAsc, MoreVertical } from 'lucide-react';
import ContactCard from '../ContactCard.jsx';
import './ContactListPanel.css';

function ContactListPanel({
  contacts,
  selectedContact,
  onContactSelect,
  onAddContact,
  onEditContact,
  onDeleteContact,
  availableTags,
  searchQuery,
  activeCategory
}) {
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'recent', 'frequency'
  const [showFilters, setShowFilters] = useState(false);

  // Sort contacts
  const sortedContacts = [...contacts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'recent':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'frequency':
        return (b.interactionCount || 0) - (a.interactionCount || 0);
      default:
        return 0;
    }
  });

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

  const getResultsText = () => {
    const count = contacts.length;
    if (searchQuery) {
      return `${count} result${count !== 1 ? 's' : ''} for "${searchQuery}"`;
    }
    return `${count} contact${count !== 1 ? 's' : ''}`;
  };

  return (
    <div className="contact-list-panel">
      {/* Header */}
      <div className="panel-header">
        <div className="header-title">
          <h2>{getCategoryTitle()}</h2>
          <span className="results-count">{getResultsText()}</span>
        </div>
        
        <div className="header-actions">
          <div className="view-controls">
            <button
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List size={16} />
            </button>
          </div>
          
          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="recent">Recently Added</option>
              <option value="frequency">Most Contacted</option>
            </select>
          </div>
          
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
            title="Filters"
          >
            <Filter size={16} />
          </button>
          
          <button
            className="add-contact-button"
            onClick={onAddContact}
            title="Add new contact"
          >
            <Plus size={16} />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Filters (if shown) */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Contact Type</label>
            <div className="filter-options">
              <button className="filter-chip active">All</button>
              <button className="filter-chip">People</button>
              <button className="filter-chip">Businesses</button>
            </div>
          </div>
          <div className="filter-group">
            <label>Has Photo</label>
            <div className="filter-options">
              <button className="filter-chip">Any</button>
              <button className="filter-chip">With Photo</button>
              <button className="filter-chip">No Photo</button>
            </div>
          </div>
        </div>
      )}

      {/* Contact List */}
      <div className={`contact-list ${viewMode}-view`}>
        {sortedContacts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Plus size={48} />
            </div>
            <h3>No contacts found</h3>
            <p>
              {searchQuery 
                ? `No contacts match "${searchQuery}"`
                : "Start building your contact list by adding your first contact"
              }
            </p>
            {!searchQuery && (
              <button 
                className="empty-action-button"
                onClick={onAddContact}
              >
                <Plus size={16} />
                Add Your First Contact
              </button>
            )}
          </div>
        ) : (
          <div className="contacts-grid">
            {sortedContacts.map((contact, index) => (
              <div
                key={contact.id}
                className={`contact-item ${
                  selectedContact?.id === contact.id ? 'selected' : ''
                }`}
                onClick={() => onContactSelect(contact)}
              >
                <ContactCard
                  contact={contact}
                  animationDelay={index * 0.05}
                  onEdit={onEditContact}
                  onDelete={onDeleteContact}
                  availableTags={availableTags}
                  viewMode={viewMode}
                  isHighlighted={selectedContact?.id === contact.id}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactListPanel;