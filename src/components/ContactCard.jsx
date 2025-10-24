import { memo } from 'react';
import './ContactCard.css';
import ContactAvatar from './ContactAvatar.jsx';

function ContactCard({ contact, animationDelay = 0, onEdit, onDelete, availableTags = [], viewMode = 'grid' }) {

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(contact);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(contact);
  };

  // Get tag objects from tag IDs
  const contactTags = (contact.tags || [])
    .map(tagId => availableTags.find(tag => tag.id === tagId))
    .filter(Boolean);

  return (
    <div 
      className={`contact-card ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
      style={{ animationDelay: `${animationDelay}s` }}
      role="button"
      tabIndex={0}
      aria-label={`Contact: ${contact.name}, ${contact.email}, ${contact.phone}`}
    >
      <div className="contact-card-actions">
        <button 
          className="contact-action-btn edit-btn"
          onClick={handleEdit}
          aria-label={`Edit ${contact.name}`}
          title="Edit contact"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button 
          className="contact-action-btn delete-btn"
          onClick={handleDelete}
          aria-label={`Delete ${contact.name}`}
          title="Delete contact"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
      
      <div className="contact-main-content">
        <ContactAvatar name={contact.name} size={viewMode === 'list' ? 'small' : 'medium'} />
        
        {viewMode === 'list' ? (
          <>
            <div className="contact-name-section">
              <span className="section-label">Name</span>
              <h3 className="contact-name">{contact.name}</h3>
            </div>
            <div className="contact-email-section">
              <span className="section-label">Email</span>
              <p className="contact-email">{contact.email}</p>
            </div>
            <div className="contact-phone-section">
              <span className="section-label">Phone</span>
              <p className="contact-phone">{contact.phone}</p>
            </div>
          </>
        ) : (
          <div className="contact-info">
            <h3 className="contact-name">{contact.name}</h3>
            <p className="contact-email">{contact.email}</p>
            <p className="contact-phone">{contact.phone}</p>
          </div>
        )}
        
        {contactTags.length > 0 && (
          <div className="contact-tags">
            {contactTags.map(tag => (
              <span 
                key={tag.id}
                className="contact-tag"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ContactCard);