import { useEffect, useState } from 'react';
import './ProgressBar.css';

function ProgressBar({ 
  progress = 0, 
  label = '', 
  showPercentage = true, 
  variant = 'primary',
  size = 'medium',
  animated = true 
}) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Animate progress changes
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);

    return () => clearTimeout(timer);
  }, [progress]);

  const clampedProgress = Math.max(0, Math.min(100, displayProgress));

  return (
    <div className={`progress-bar-container progress-${size}`}>
      {label && (
        <div className="progress-label">
          <span className="progress-text">{label}</span>
          {showPercentage && (
            <span className="progress-percentage">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      
      <div className={`progress-bar progress-${variant}`}>
        <div 
          className={`progress-fill ${animated ? 'animated' : ''}`}
          style={{ width: `${clampedProgress}%` }}
        >
          {animated && <div className="progress-shine"></div>}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;