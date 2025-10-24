import ContactCard from './ContactCard.jsx';
import EmptyState from './EmptyState.jsx';
import './ContactList.css';

function ContactList({ 
  contacts, 
  searchTerm, 
  availableTags, 
  onEditContact, 
  onDeleteContact, 
  viewMode = 'grid', 
  highlightedContactId,
  onAddContact,
  onImportContacts 
}) {
  if (contacts.length === 0) {
    // Show search-specific empty state
    if (searchTerm) {
      return (
        <div className="contact-list-empty">
          <p>No contacts found matching "{searchTerm}"</p>
        </div>
      );
    }
    
    // Show enhanced empty state for no contacts
    return (
      <EmptyState 
        onAddContact={onAddContact}
        onImportContacts={onImportContacts}
      />
    );
  }

  return (
    <div className="contact-list">
      <div className="contact-list-header">
        <p className="contact-count">
          {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>
      <div className={`contacts-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {contacts.map((contact, index) => (
          <ContactCard 
            key={contact.id} 
            contact={contact} 
            animationDelay={index * 0.1}
            availableTags={availableTags}
            onEdit={onEditContact}
            onDelete={onDeleteContact}
            viewMode={viewMode}
            isHighlighted={highlightedContactId === contact.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ContactList;