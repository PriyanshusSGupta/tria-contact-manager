import { useState } from 'react';
import './TagSelector.css';

function TagSelector({ availableTags, selectedTags = [], onTagsChange, onManageTags }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTagToggle = (tagId) => {
    const isSelected = selectedTags.includes(tagId);
    let newSelectedTags;
    
    if (isSelected) {
      newSelectedTags = selectedTags.filter(id => id !== tagId);
    } else {
      newSelectedTags = [...selectedTags, tagId];
    }
    
    onTagsChange(newSelectedTags);
  };

  const getSelectedTagsDisplay = () => {
    if (selectedTags.length === 0) return 'No tags selected';
    if (selectedTags.length === 1) return '1 tag selected';
    return `${selectedTags.length} tags selected`;
  };

  return (
    <div className="tag-selector">
      <label className="tag-selector-label">Tags</label>
      
      <div className="tag-selector-container">
        <button
          type="button"
          className="tag-selector-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{getSelectedTagsDisplay()}</span>
          <svg 
            className={`tag-selector-arrow ${isOpen ? 'open' : ''}`}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>

        {isOpen && (
          <div className="tag-selector-dropdown">
            <div className="tag-options">
              {availableTags.map(tag => (
                <label key={tag.id} className="tag-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                  />
                  <div 
                    className="tag-option-preview"
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.name}
                  </div>
                </label>
              ))}
            </div>
            
            <div className="tag-selector-actions">
              <button
                type="button"
                className="manage-tags-btn"
                onClick={() => {
                  setIsOpen(false);
                  onManageTags();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Manage Tags
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected tags display */}
      {selectedTags.length > 0 && (
        <div className="selected-tags-display">
          {selectedTags.map(tagId => {
            const tag = availableTags.find(t => t.id === tagId);
            return tag ? (
              <span 
                key={tag.id}
                className="selected-tag"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
                <button
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  className="remove-tag-btn"
                  aria-label={`Remove ${tag.name} tag`}
                >
                  ×
                </button>
              </span>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

export default TagSelector;