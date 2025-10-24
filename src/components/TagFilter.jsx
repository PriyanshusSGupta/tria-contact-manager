import './TagFilter.css';

function TagFilter({ availableTags, selectedTags, onTagsChange, contactCounts }) {
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

  const handleClearAll = () => {
    onTagsChange([]);
  };

  if (availableTags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filter">
      <div className="tag-filter-header">
        <h3>Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button 
            className="clear-filters-btn"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="tag-filter-options">
        {availableTags.map(tag => {
          const isSelected = selectedTags.includes(tag.id);
          const count = contactCounts[tag.id] || 0;
          
          return (
            <button
              key={tag.id}
              className={`tag-filter-option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleTagToggle(tag.id)}
              disabled={count === 0}
            >
              <span 
                className="tag-color-indicator"
                style={{ backgroundColor: tag.color }}
              ></span>
              <span className="tag-name">{tag.name}</span>
              <span className="tag-count">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TagFilter;