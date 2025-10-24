import './ViewToggle.css';
import { Grid3X3, List } from 'lucide-react';

function ViewToggle({ viewMode, onViewModeChange }) {
  return (
    <div className="view-toggle">
      <button
        className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
        onClick={() => onViewModeChange('grid')}
        title="Grid view"
        aria-label="Switch to grid view"
      >
        <Grid3X3 size={16} />
      </button>
      
      <button
        className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
        onClick={() => onViewModeChange('list')}
        title="List view"
        aria-label="Switch to list view"
      >
        <List size={16} />
      </button>
    </div>
  );
}

export default ViewToggle;