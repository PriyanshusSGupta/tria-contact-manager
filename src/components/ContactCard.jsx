import { memo } from 'react';
import './ContactCard.css';
import ContactAvatar from './ContactAvatar.jsx';
import { Edit2, Trash2 } from 'lucide-react';

function ContactCard({ contact, animationDelay = 0, onEdit, onDelete, availableTags = [], viewMode = 'grid', isHighlighted = false }) {

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
      className={`contact-card ${viewMode === 'list' ? 'list-view' : 'grid-view'} ${isHighlighted ? 'alphabet-highlight' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
      role="button"
      tabIndex={0}
      aria-label={`Contact: ${contact.name}, ${contact.email}, ${contact.phone}`}
      data-contact-id={contact.id}
      data-contact-letter={contact.name.charAt(0).toUpperCase()}
    >
      <div className="contact-card-actions">
        <button 
          className="contact-action-btn edit-btn"
          onClick={handleEdit}
          aria-label={`Edit ${contact.name}`}
          title="Edit contact"
        >
          <Edit2 size={16} />
        </button>
        <button 
          className="contact-action-btn delete-btn"
          onClick={handleDelete}
          aria-label={`Delete ${contact.name}`}
          title="Delete contact"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="contact-main-content">
        <ContactAvatar 
          name={contact.name} 
          image={contact.image}
          size={viewMode === 'list' ? 'small' : 'medium'} 
        />
        
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

// Custom comparison function to prevent unnecessary re-renders
const areEqual = (prevProps, nextProps) => {
  // Check if contact data is the same
  if (prevProps.contact.id !== nextProps.contact.id) return false;
  if (prevProps.contact.name !== nextProps.contact.name) return false;
  if (prevProps.contact.email !== nextProps.contact.email) return false;
  if (prevProps.contact.phone !== nextProps.contact.phone) return false;
  
  // Check if view mode changed
  if (prevProps.viewMode !== nextProps.viewMode) return false;
  
  // Check if highlight state changed
  if (prevProps.isHighlighted !== nextProps.isHighlighted) return false;
  
  // Check if animation delay changed (only for initial render)
  if (prevProps.animationDelay !== nextProps.animationDelay) return false;
  
  // Check if tags changed (shallow comparison)
  const prevTags = prevProps.contact.tags || [];
  const nextTags = nextProps.contact.tags || [];
  if (prevTags.length !== nextTags.length) return false;
  if (prevTags.some((tag, index) => tag !== nextTags[index])) return false;
  
  // Functions are stable, so we don't need to check them
  return true;
};

export default memo(ContactCard, areEqual);