import './ContactAvatar.css';

function ContactAvatar({ name, image, size = 'medium', className = '' }) {
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    
    const words = name.trim().split(' ').filter(word => word.length > 0);
    
    if (words.length === 0) return '?';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    
    // Take first letter of first name and first letter of last name
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  // Generate consistent color based on name
  const getAvatarColor = (name) => {
    if (!name) return '#6c757d';
    
    // Create a hash from the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Convert hash to HSL color for better color distribution
    const hue = Math.abs(hash) % 360;
    const saturation = 65 + (Math.abs(hash) % 20); // 65-85%
    const lightness = 45 + (Math.abs(hash) % 15); // 45-60%
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(name);

  // If image is provided, show image instead of initials
  if (image) {
    return (
      <div 
        className={`contact-avatar contact-avatar-${size} contact-avatar-image ${className}`}
        title={name}
        aria-label={`Avatar for ${name}`}
      >
        <img 
          src={image} 
          alt={`${name} profile`}
          className="contact-avatar-img"
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div 
          className="contact-avatar-fallback"
          style={{ backgroundColor, display: 'none' }}
        >
          <span className="contact-avatar-initials">{initials}</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`contact-avatar contact-avatar-${size} ${className}`}
      style={{ backgroundColor }}
      title={name}
      aria-label={`Avatar for ${name}`}
    >
      <span className="contact-avatar-initials">{initials}</span>
    </div>
  );
}

export default ContactAvatar;