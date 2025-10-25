import { useEffect, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';
import './Toast.css';

function Toast({ message, type = 'success', duration = 4000, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <CheckCircle size={20} />;
    }
  };

  return (
    <div 
      className={`toast toast-${type} ${isVisible ? 'toast-visible' : ''} ${isExiting ? 'toast-exiting' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className="toast-content">
        <div className="toast-icon">
          {getIcon()}
        </div>
        <div className="toast-message">
          {message}
        </div>
        <button 
          className="toast-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
      <div className="toast-progress">
        <div 
          className="toast-progress-bar"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
}

export default Toast;