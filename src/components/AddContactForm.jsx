import { useState } from 'react';
import './AddContactForm.css';
import TagSelector from './TagSelector.jsx';
import ImageUpload from './ImageUpload.jsx';

function AddContactForm({ onAddContact, onCancel, availableTags, onManageTags }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tags: [],
    image: null
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s\-()]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newContact = {
        id: Date.now(), // Simple ID generation
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        tags: formData.tags,
        image: formData.image
      };
      
      onAddContact(newContact);
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', tags: [], image: null });
      setErrors({});
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTagsChange = (selectedTags) => {
    setFormData(prev => ({ ...prev, tags: selectedTags }));
  };

  const handleImageChange = (imageDataUrl) => {
    setFormData(prev => ({ ...prev, image: imageDataUrl }));
  };

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, image: null }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="add-contact-form-overlay" onClick={handleOverlayClick}>
      <div className="add-contact-form">
        <div className="form-header">
          <h2>Add New Contact</h2>
          <button 
            className="close-button"
            onClick={onCancel}
            aria-label="Close form"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group image-upload-group">
            <label>Profile Photo</label>
            <ImageUpload
              currentImage={formData.image}
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
              name={formData.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'error' : ''}
              placeholder="Enter full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'error' : ''}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter phone number"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <TagSelector
            availableTags={availableTags}
            selectedTags={formData.tags}
            onTagsChange={handleTagsChange}
            onManageTags={onManageTags}
          />

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContactForm;