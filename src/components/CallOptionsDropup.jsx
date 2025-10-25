import { useEffect, useRef } from 'react';
import { Phone, Video } from 'lucide-react';
import './CallOptionsDropup.css';

function CallOptionsDropup({ 
  isOpen,
  onClose,
  onVoiceCall,
  onVideoCall,
  contactName
}) {
  const dropupRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropupRef.current && !dropupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      // Add delay to prevent immediate closing
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleOptionClick = (action) => {
    action();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={dropupRef} className="call-options-dropup">
      <div 
        className="call-option-item"
        onClick={() => handleOptionClick(onVoiceCall)}
      >
        <Phone size={16} />
        <span>Voice Call</span>
      </div>
      
      <div 
        className="call-option-item"
        onClick={() => handleOptionClick(onVideoCall)}
      >
        <Video size={16} />
        <span>Video Call</span>
      </div>
    </div>
  );
}

export default CallOptionsDropup;