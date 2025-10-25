import { memo, useState, useRef } from 'react';
import './ContactCard.css';
import ContactAvatar from './ContactAvatar.jsx';
import CallOptionsDropup from './CallOptionsDropup.jsx';
import { Edit2, Trash2, Phone, MessageCircle } from 'lucide-react';

function ContactCard({ contact, animationDelay = 0, onEdit, onDelete, availableTags = [], viewMode = 'grid', isHighlighted = false, onContactSelect }) {
  const [showCallOptions, setShowCallOptions] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef(null);
  const phoneButtonRef = useRef(null);
  const isLongPressingRef = useRef(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(contact);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(contact);
  };

  // Phone button handlers
  const handlePhoneClick = (e) => {
    e.stopPropagation();
    // Only allow regular click if not long pressing
    if (!isLongPressingRef.current && !isLongPressing) {
      handleVoiceCall();
    }
  };

  const handlePhoneLongPressStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Long press started');
    setIsLongPressing(true);
    isLongPressingRef.current = true;
    longPressTimer.current = setTimeout(() => {
      console.log('Long press completed - showing options');
      setShowCallOptions(true);
      isLongPressingRef.current = false;
    }, 500); // 500ms long press
  };

  const handlePhoneLongPressEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Long press ended');
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    // Reset long pressing state after a delay
    setTimeout(() => {
      setIsLongPressing(false);
      isLongPressingRef.current = false;
    }, 200);
  };

  // Handle card click - prevent if long pressing
  const handleCardClick = (e) => {
    console.log('Card clicked - isLongPressing:', isLongPressing, 'isLongPressingRef:', isLongPressingRef.current, 'showCallOptions:', showCallOptions);
    if (isLongPressing || isLongPressingRef.current || showCallOptions) {
      console.log('Blocking card click due to long press or open options');
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    console.log('Allowing card selection');
    if (onContactSelect) {
      onContactSelect(contact);
    }
  };

  const handleMessageClick = (e) => {
    e.stopPropagation();
    // Open messaging app or send SMS
    window.open(`sms:${contact.phone}`, '_blank');
  };

  const handleVoiceCall = () => {
    // Open phone app for voice call
    window.open(`tel:${contact.phone}`, '_blank');
  };

  const handleVideoCall = () => {
    // Open video calling app (could be WhatsApp, FaceTime, etc.)
    console.log(`Starting video call with ${contact.name}`);
    // You could integrate with specific video calling services here
  };

  // Get tag objects from tag IDs
  const contactTags = (contact.tags || [])
    .map(tagId => availableTags.find(tag => tag.id === tagId))
    .filter(Boolean);

  return (
    <div
      className={`contact-card ${viewMode === 'list' ? 'list-view' : 'grid-view'} ${isHighlighted ? 'alphabet-highlight' : ''}`}
      onClick={handleCardClick}
      style={{ animationDelay: `${animationDelay}s` }}
      role="button"
      tabIndex={0}
      aria-label={`Contact: ${contact.name}, ${contact.email}, ${contact.phone}`}
      data-contact-id={contact.id}
      data-contact-letter={contact.name.charAt(0).toUpperCase()}
    >
      <div className={`contact-card-actions ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
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
        {viewMode === 'list' ? (
          <>
            {/* Action buttons for list view - left side */}
            <div className="list-action-buttons">
              <div className="phone-button-wrapper">
                <button
                  ref={phoneButtonRef}
                  className="action-btn phone-btn"
                  onClick={handlePhoneClick}
                  onMouseDown={handlePhoneLongPressStart}
                  onMouseUp={handlePhoneLongPressEnd}
                  onMouseLeave={handlePhoneLongPressEnd}
                  onTouchStart={handlePhoneLongPressStart}
                  onTouchEnd={handlePhoneLongPressEnd}
                  onTouchCancel={handlePhoneLongPressEnd}
                  onContextMenu={(e) => e.preventDefault()}
                  title="Call (long press for options)"
                >
                  <Phone size={16} />
                </button>
                <CallOptionsDropup
                  isOpen={showCallOptions}
                  onClose={() => setShowCallOptions(false)}
                  onVoiceCall={handleVoiceCall}
                  onVideoCall={handleVideoCall}
                  contactName={contact.name}
                />
              </div>
              <button
                className="action-btn message-btn"
                onClick={handleMessageClick}
                title="Send message"
              >
                <MessageCircle size={16} />
              </button>
            </div>

            {/* NEW: Contact Avatar and Info Group for list view */}
            <div className="contact-details-group">
              <ContactAvatar
                name={contact.name}
                image={contact.image}
                size="small" // list view size
              />
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
              {/* Tags are not displayed in list view based on original logic */}
            </div>
          </>
        ) : (
          <>
            {/* Phone button for grid view - left side */}
            <div className="grid-phone-button">
              <div className="phone-button-wrapper">
                <button
                  ref={phoneButtonRef}
                  className="action-btn phone-btn"
                  onClick={handlePhoneClick}
                  onMouseDown={handlePhoneLongPressStart}
                  onMouseUp={handlePhoneLongPressEnd}
                  onMouseLeave={handlePhoneLongPressEnd}
                  onTouchStart={handlePhoneLongPressStart}
                  onTouchEnd={handlePhoneLongPressEnd}
                  onTouchCancel={handlePhoneLongPressEnd}
                  onContextMenu={(e) => e.preventDefault()}
                  title="Call (long press for options)"
                >
                  <Phone size={16} />
                </button>
                <CallOptionsDropup
                  isOpen={showCallOptions}
                  onClose={() => setShowCallOptions(false)}
                  onVoiceCall={handleVoiceCall}
                  onVideoCall={handleVideoCall}
                  contactName={contact.name}
                />
              </div>
            </div>

            {/* NEW: Contact Avatar, Info, and Tags Group for grid view */}
            <div className="contact-details-group">
              <ContactAvatar
                name={contact.name}
                image={contact.image}
                size="medium" // grid view size
              />

              <div className="contact-info">
                <h3 className="contact-name">{contact.name}</h3>
                <p className="contact-email">{contact.email}</p>
                <p className="contact-phone">{contact.phone}</p>
              </div>

              {contactTags.length > 0 && ( // viewMode !== 'list' is implied here
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

            {/* Message button for grid view - right side */}
            <div className="grid-message-button">
              <button
                className="action-btn message-btn"
                onClick={handleMessageClick}
                title="Send message"
              >
                <MessageCircle size={16} />
              </button>
            </div>
          </>
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