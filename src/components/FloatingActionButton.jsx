import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import './FloatingActionButton.css';

function FloatingActionButton({ onClick, isActive = false }) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onClick();
    
    // Reset pressed state after animation
    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  };

  return (
    <button 
      className={`fab ${isActive ? 'fab-active' : ''} ${isPressed ? 'fab-pressed' : ''}`}
      onClick={handleClick}
      aria-label={isActive ? 'Close add contact form' : 'Add new contact'}
      title={isActive ? 'Close' : 'Add Contact'}
    >
      <div className="fab-icon-container">
        <Plus 
          className={`fab-icon fab-plus ${isActive ? 'fab-icon-hidden' : 'fab-icon-visible'}`} 
          size={24} 
        />
        <X 
          className={`fab-icon fab-x ${isActive ? 'fab-icon-visible' : 'fab-icon-hidden'}`} 
          size={24} 
        />
      </div>
      
      {/* Ripple effect */}
      <div className="fab-ripple"></div>
      
      {/* Background pulse */}
      <div className="fab-pulse"></div>
    </button>
  );
}

export default FloatingActionButton;