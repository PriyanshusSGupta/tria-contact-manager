import './Divider.css';

function Divider({ 
  variant = 'solid', 
  orientation = 'horizontal', 
  spacing = 'medium',
  color = 'default',
  children 
}) {
  const hasLabel = Boolean(children);

  return (
    <div 
      className={`divider divider-${orientation} divider-${spacing} divider-${color} ${hasLabel ? 'divider-labeled' : ''}`}
      role="separator"
    >
      {hasLabel ? (
        <>
          <div className={`divider-line divider-${variant}`}></div>
          <div className="divider-label">{children}</div>
          <div className={`divider-line divider-${variant}`}></div>
        </>
      ) : (
        <div className={`divider-line divider-${variant}`}></div>
      )}
    </div>
  );
}

export default Divider;