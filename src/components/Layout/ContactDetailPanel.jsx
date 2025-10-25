import { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Bell, 
  Edit3, 
  Trash2, 
  Star,
  Building2,
  Globe,
  MessageCircle,
  Video,
  Plus,
  Clock,
  StickyNote
} from 'lucide-react';
import ContactAvatar from '../ContactAvatar.jsx';
import './ContactDetailPanel.css';

function ContactDetailPanel({
  contact,
  onClose,
  onEdit,
  onDelete,
  availableTags
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [reminders] = useState([
    {
      id: 1,
      text: "Call Bobby Crown to discuss a present for mom",
      dueDate: "2024-01-15",
      time: "10:00 AM",
      completed: false
    }
  ]);
  const [events] = useState([
    {
      id: 1,
      title: "Bobby Crown's Birthday Party",
      date: "2024-01-14",
      type: "birthday"
    }
  ]);
  const [notes] = useState([
    {
      id: 1,
      title: "Gift Ideas",
      content: "Love talking about wine, gift ideas for mom. I bought it would be a good idea if we brainstormed some ideas together and came up with something that she would really love. Maybe getting her tickets to a show or something fun to do on the weekend perhaps for us.",
      createdAt: "2024-01-10"
    }
  ]);

  // Get contact tags
  const contactTags = (contact.tags || [])
    .map(tagId => availableTags.find(tag => tag.id === tagId))
    .filter(Boolean);

  const handleToggleFavorite = () => {
    // This would be handled by parent component
    console.log('Toggle favorite for:', contact.id);
  };

  const handleAddReminder = () => {
    // This would open a reminder creation modal
    console.log('Add reminder for:', contact.id);
  };

  const handleAddEvent = () => {
    // This would open an event creation modal
    console.log('Add event for:', contact.id);
  };

  const handleAddNote = () => {
    // This would open a note creation modal
    console.log('Add note for:', contact.id);
  };

  const formatPhoneNumber = (phone) => {
    // Simple phone formatting
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const getRelationshipLabel = () => {
    if (contactTags.some(tag => tag.name.toLowerCase().includes('family'))) {
      return 'Family';
    }
    if (contactTags.some(tag => tag.name.toLowerCase().includes('work'))) {
      return 'Work';
    }
    if (contactTags.some(tag => tag.name.toLowerCase().includes('friend'))) {
      return 'Friend';
    }
    return null;
  };

  return (
    <div className="contact-detail-panel">
      {/* Header */}
      <div className="detail-header">
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Close contact details"
        >
          <X size={20} />
        </button>
        
        <div className="header-actions">
          <button 
            className={`action-button favorite ${contact.isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
            title={contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star size={16} />
          </button>
          <button 
            className="action-button edit"
            onClick={onEdit}
            title="Edit contact"
          >
            <Edit3 size={16} />
          </button>
          <button 
            className="action-button delete"
            onClick={onDelete}
            title="Delete contact"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-avatar">
          <ContactAvatar 
            name={contact.name}
            image={contact.image}
            size="xlarge"
          />
          <div className="online-indicator" />
        </div>
        
        <div className="profile-info">
          <h1 className="contact-name">{contact.name}</h1>
          {getRelationshipLabel() && (
            <span className="relationship-label">{getRelationshipLabel()}</span>
          )}
          {contact.company && (
            <div className="company-info">
              <Building2 size={14} />
              <span>{contact.company}</span>
              {contact.jobTitle && <span className="job-title">• {contact.jobTitle}</span>}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="quick-action-button call">
            <Phone size={18} />
          </button>
          <button className="quick-action-button message">
            <MessageCircle size={18} />
          </button>
          <button className="quick-action-button email">
            <Mail size={18} />
          </button>
          <button className="quick-action-button video">
            <Video size={18} />
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="contact-info-section">
        <div className="info-item">
          <div className="info-icon">
            <Phone size={16} />
          </div>
          <div className="info-content">
            <span className="info-value">{formatPhoneNumber(contact.phone)}</span>
            <span className="info-label">Mobile</span>
          </div>
          <button className="info-action">
            <Phone size={14} />
          </button>
        </div>

        <div className="info-item">
          <div className="info-icon">
            <Mail size={16} />
          </div>
          <div className="info-content">
            <span className="info-value">{contact.email}</span>
            <span className="info-label">Email</span>
          </div>
          <button className="info-action">
            <Mail size={14} />
          </button>
        </div>

        {contact.address && (
          <div className="info-item">
            <div className="info-icon">
              <MapPin size={16} />
            </div>
            <div className="info-content">
              <span className="info-value">{contact.address}</span>
              <span className="info-label">Address</span>
            </div>
            <button className="info-action">
              <MapPin size={14} />
            </button>
          </div>
        )}

        {contact.birthday && (
          <div className="info-item">
            <div className="info-icon">
              <Calendar size={16} />
            </div>
            <div className="info-content">
              <span className="info-value">{contact.birthday}</span>
              <span className="info-label">Birthday</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'reminders' ? 'active' : ''}`}
          onClick={() => setActiveTab('reminders')}
        >
          Reminders
          {reminders.length > 0 && (
            <span className="tab-badge">{reminders.length}</span>
          )}
        </button>
        <button 
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
          {events.length > 0 && (
            <span className="tab-badge">{events.length}</span>
          )}
        </button>
        <button 
          className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Notes
          {notes.length > 0 && (
            <span className="tab-badge">{notes.length}</span>
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            {contactTags.length > 0 && (
              <div className="tags-section">
                <h3>Tags</h3>
                <div className="tags-list">
                  {contactTags.map(tag => (
                    <span 
                      key={tag.id}
                      className="contact-tag"
                      style={{ 
                        backgroundColor: `${tag.color}20`,
                        borderColor: tag.color,
                        color: tag.color
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-item">
                <Clock size={14} />
                <span>Last contacted 3 days ago</span>
              </div>
              <div className="activity-item">
                <Calendar size={14} />
                <span>Added to contacts 2 weeks ago</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="reminders-content">
            <div className="section-header">
              <h3>Reminders</h3>
              <button 
                className="add-button"
                onClick={handleAddReminder}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="reminders-list">
              {reminders.map(reminder => (
                <div key={reminder.id} className="reminder-item">
                  <div className="reminder-content">
                    <p>{reminder.text}</p>
                    <div className="reminder-meta">
                      <span className="reminder-date">{reminder.dueDate}</span>
                      <span className="reminder-time">{reminder.time}</span>
                    </div>
                  </div>
                  <button className="reminder-complete">
                    <Bell size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-content">
            <div className="section-header">
              <h3>Upcoming Events</h3>
              <button 
                className="add-button"
                onClick={handleAddEvent}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="events-list">
              {events.map(event => (
                <div key={event.id} className="event-item">
                  <div className="event-date">
                    <span className="event-day">14</span>
                    <span className="event-month">Jan</span>
                  </div>
                  <div className="event-content">
                    <h4>{event.title}</h4>
                    <span className="event-type">{event.type}</span>
                  </div>
                  <div className="event-attendees">
                    <span className="attendee-count">+10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="notes-content">
            <div className="section-header">
              <h3>Notes</h3>
              <button 
                className="add-button"
                onClick={handleAddNote}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="notes-list">
              {notes.map(note => (
                <div key={note.id} className="note-item">
                  <div className="note-header">
                    <h4>{note.title}</h4>
                    <span className="note-date">{note.createdAt}</span>
                  </div>
                  <p className="note-content">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactDetailPanel;