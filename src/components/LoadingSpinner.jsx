import './LoadingSpinner.css';

function LoadingSpinner({ 
  size = 'medium', 
  variant = 'primary', 
  showPercentage = false, 
  percentage = 0,
  label = '',
  overlay = false 
}) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  const SpinnerContent = () => (
    <div className={`loading-spinner-container spinner-${size}`}>
      <div className={`loading-spinner spinner-${variant}`}>
        <div className="spinner-circle">
          <div className="spinner-path"></div>
        </div>
        {showPercentage && (
          <div className="spinner-percentage">
            {Math.round(clampedPercentage)}%
          </div>
        )}
      </div>
      {label && <div className="spinner-label">{label}</div>}
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-overlay">
        <SpinnerContent />
      </div>
    );
  }

  return <SpinnerContent />;
}

export default LoadingSpinner;