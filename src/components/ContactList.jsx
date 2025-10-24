import ContactCard from './ContactCard.jsx';
import './ContactList.css';

function ContactList({ contacts, searchTerm, availableTags, onEditContact, onDeleteContact, viewMode = 'grid' }) {
  if (contacts.length === 0) {
    return (
      <div className="contact-list-empty">
        {searchTerm ? (
          <p>No contacts found matching "{searchTerm}"</p>
        ) : (
          <p>No contacts available</p>
        )}
      </div>
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
          />
        ))}
      </div>
    </div>
  );
}

export default ContactList;