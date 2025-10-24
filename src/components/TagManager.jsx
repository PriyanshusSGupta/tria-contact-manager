import { useState } from 'react';
import './TagManager.css';

const DEFAULT_TAGS = [
  { id: 'work', name: 'Work', color: '#007bff' },
  { id: 'family', name: 'Family', color: '#28a745' },
  { id: 'friends', name: 'Friends', color: '#ffc107' },
  { id: 'business', name: 'Business', color: '#6f42c1' },
  { id: 'emergency', name: 'Emergency', color: '#dc3545' },
];

function TagManager({ availableTags, onTagsChange, onClose }) {
  const [tags, setTags] = useState(availableTags.length > 0 ? availableTags : DEFAULT_TAGS);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#007bff');

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    const newTag = {
      id: Date.now().toString(),
      name: newTagName.trim(),
      color: newTagColor
    };

    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    onTagsChange(updatedTags);
    setNewTagName('');
  };

  const handleDeleteTag = (tagId) => {
    const updatedTags = tags.filter(tag => tag.id !== tagId);
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  const handleColorChange = (tagId, newColor) => {
    const updatedTags = tags.map(tag => 
      tag.id === tagId ? { ...tag, color: newColor } : tag
    );
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="tag-manager-overlay" onClick={handleOverlayClick}>
      <div className="tag-manager">
        <div className="tag-manager-header">
          <h2>Manage Tags</h2>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close tag manager"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="tag-manager-content">
          <div className="existing-tags">
            <h3>Existing Tags</h3>
            <div className="tags-list">
              {tags.map(tag => (
                <div key={tag.id} className="tag-item">
                  <div className="tag-preview" style={{ backgroundColor: tag.color }}>
                    {tag.name}
                  </div>
                  <input
                    type="color"
                    value={tag.color}
                    onChange={(e) => handleColorChange(tag.id, e.target.value)}
                    className="tag-color-picker"
                    title="Change tag color"
                  />
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="tag-delete-btn"
                    aria-label={`Delete ${tag.name} tag`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="add-tag-section">
            <h3>Add New Tag</h3>
            <form onSubmit={handleAddTag} className="add-tag-form">
              <div className="form-row">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Tag name"
                  className="tag-name-input"
                  maxLength={20}
                />
                <input
                  type="color"
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  className="tag-color-input"
                  title="Choose tag color"
                />
                <button type="submit" className="add-tag-btn">
                  Add Tag
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="tag-manager-actions">
          <button onClick={onClose} className="done-button">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default TagManager;