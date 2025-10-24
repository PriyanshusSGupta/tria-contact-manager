import './BackgroundPattern.css';

function BackgroundPattern({ pattern = 'dots', opacity = 0.05, color = 'currentColor' }) {
  const patterns = {
    dots: (
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill={color} />
      </pattern>
    ),
    grid: (
      <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.5" />
      </pattern>
    ),
    diagonal: (
      <pattern id="diagonal" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 0 20 L 20 0" stroke={color} strokeWidth="0.5" />
      </pattern>
    ),
    hexagon: (
      <pattern id="hexagon" x="0" y="0" width="28" height="24" patternUnits="userSpaceOnUse">
        <polygon 
          points="14,2 22,7 22,17 14,22 6,17 6,7" 
          fill="none" 
          stroke={color} 
          strokeWidth="0.5"
        />
      </pattern>
    ),
    waves: (
      <pattern id="waves" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
        <path 
          d="M 0 10 Q 10 0 20 10 T 40 10" 
          fill="none" 
          stroke={color} 
          strokeWidth="0.5"
        />
      </pattern>
    )
  };

  return (
    <div className="background-pattern" style={{ opacity }}>
      <svg width="100%" height="100%" className="pattern-svg">
        <defs>
          {patterns[pattern] || patterns.dots}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pattern})`} />
      </svg>
    </div>
  );
}

export default BackgroundPattern;