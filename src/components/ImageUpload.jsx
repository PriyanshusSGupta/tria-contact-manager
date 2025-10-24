import { useState, useRef } from 'react';
import { Camera, Upload, X, User } from 'lucide-react';
import './ImageUpload.css';

function ImageUpload({ currentImage, onImageChange, onImageRemove, name = '' }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for resizing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate dimensions (max 300x300)
        const maxSize = 300;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        onImageChange(compressedDataUrl);
        setIsLoading(false);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="image-upload">
      <div 
        className={`image-upload-area ${
          isDragging ? 'dragging' : ''
        } ${currentImage ? 'has-image' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {isLoading ? (
          <div className="image-loading">
            <div className="loading-spinner"></div>
            <span>Processing image...</span>
          </div>
        ) : currentImage ? (
          <div className="image-preview">
            <img src={currentImage} alt={`${name} profile`} />
            <div className="image-overlay">
              <Camera size={24} />
              <span>Change Photo</span>
            </div>
            {onImageRemove && (
              <button 
                className="remove-image-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onImageRemove();
                }}
                type="button"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className="image-placeholder">
            <div className="placeholder-avatar">
              {name ? getInitials(name) : <User size={32} />}
            </div>
            <div className="upload-content">
              <Camera size={24} />
              <span className="upload-text">Add Photo</span>
              <span className="upload-hint">Click or drag image here</span>
            </div>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      
      <div className="image-upload-info">
        <span>Supports JPG, PNG, GIF up to 5MB</span>
      </div>
    </div>
  );
}

export default ImageUpload;