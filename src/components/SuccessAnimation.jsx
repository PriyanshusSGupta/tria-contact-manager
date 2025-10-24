import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import './SuccessAnimation.css';

function SuccessAnimation({ show, onComplete }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show && !isVisible) return null;

  return (
    <div className={`success-animation ${isVisible ? 'visible' : ''}`}>
      <div className="success-circle">
        <CheckCircle className="success-icon" size={48} />
      </div>
      <div className="success-ripple"></div>
    </div>
  );
}

export default SuccessAnimation;